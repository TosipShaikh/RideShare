const express = require("express");
const route = require("../Model/dirverRoute.js");
const driver = require("../Model/driver.js");
const user = require("../Model/user.js");
const { getCoords, getRouteDirections } = require("../APIs/openstreetmap.js");
const { findIntersections } = require("../Computation/intersection.js");
const userRoute = require("../Model/userRoute.js");
const feedback = require("../Model/feedback.js");
require("dotenv").config();
const { sendEmailToDriver } = require("../Computation/sendemail.js");

async function handleSearchRides(req, res) {
  const { startLocation, endLocation, date, time } = req.body;

  console.log("Booking a ride for:", {
    startLocation,
    endLocation,
    date,
    time,
  });
  const coordinates = await getCoords(startLocation, endLocation);
  console.log("Received coordinates:", coordinates);
  if (!coordinates || !coordinates.start || !coordinates.end) {
    return res.status(400).json({
      error: "Unable to resolve one or both locations right now. Please try again in a moment.",
    });
  }
  const userstart = coordinates.start;
  const userend = coordinates.end;
  let distance = 0;
  let ridetime = 0;
  let distanceNumber = 0;
  await getRouteDirections(userstart, userend).then(async (routeDetails) => {
    console.log("Route Details :", routeDetails);
    distance = routeDetails.routes[0].legs[0].readable_distance;
    distanceNumber = routeDetails.routes[0].legs[0].distance;
    ridetime = routeDetails.routes[0].legs[0].duration;
  });
  const rideCost = Math.floor(distanceNumber * 0.0060);
  console.log("Cost of ride : ", rideCost);

  const allrides = await route.find({});
  // console.log(allrides);
  let matchrides = [];
  let counts = 0;
  await Promise.all(
    allrides.map(async (ride) => {
      const driversPath = ride.routePath;
      if (
        ride.status === "available" &&
        date == ride.date &&  
        time <= ride.rideStartTime
      ) {
        const intersection = findIntersections(driversPath, userstart, userend);
        if (
          intersection.firstIntersection != null &&
          intersection.lastIntersection != null
        ) {
          counts++;
          const driverDetails = await driver.findOne(ride.driverId);
          // console.log(driverDetails);
          matchrides.push({
            rideStart: ride.source,
            rideEnd: ride.destination,
            rideStartTime: ride.rideStartTime,
            driverName: `${driverDetails.firstName} ${driverDetails.lastName}`,
            driverNumber: driverDetails.mobileNumber,
            driverImage : driverDetails.image,
            vehicleName: driverDetails.vehicleName,
            rideId: ride._id,
            rideCost: rideCost,
          });
        }
      }
    })
  );

  console.log(matchrides);
  console.log("Total matched rides: ", counts);
  return res.status(200).json({ rides: matchrides });
}


async function handlePostMatchRidesInDatabase(req, res) {
  const {
    startLocation,
    endLocation,
    rideId,
    rideCost,
    date,
    time,
  } = req.body;
  console.log({
    startLocation,
    endLocation,
    rideId,
    date,
    time,
  });

  const userId = req.user.userId;
  console.log("User id>> ",userId);
  const User = await user.findById(userId);

  
  const routeDetails = await route.findById(rideId);

  const userRides = await userRoute.create({
          userId : userId,
          rideId : rideId,
          startLocation : startLocation,
          endLocation : endLocation,  
          status : "requested",
          time : time,
          date : date,
          rideCost : rideCost
      })


      const ride = await route.findByIdAndUpdate(
        rideId,
        {
          $set: { status: "pending" ,
            matchedUser: {
              userId: userId,
              userRouteId: userRides._id,
              status: "requested",
            },
          },
        },
        { new: true }
      );
      
      const driverId = routeDetails.driverId;
      const Driver = await driver.findById(driverId);
      const driverEmail = Driver.emailId;
      console.log("Driver email: ", driverEmail);
      
      const userDetails = {
        name: User.fullName,
        phone : User.mobileNumber,
        userStart : startLocation,
        userEnd : endLocation,
        userTime : time,
        estimatedCost : rideCost,
      }

      const rideDetails = {
        rideStart: routeDetails.source,
        rideEnd: routeDetails.destination,
        rideDate: routeDetails.date,
        rideTime: routeDetails.rideStartTime,
      }

      sendEmailToDriver(driverEmail, userDetails, rideDetails);
      console.log("Email sent to driver with ride details");

console.log("matched user: ",ride);
  console.log(userRides);
  console.log({
    msg: "Ride request is send to rider he will connect you in shortyl",
  });
  return res
    .status(200)
    .json({
      msg: "Ride request is send to rider he will connect you in shortyl",
    });
}

async function handleToGetUserRideHistory(req, res) {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const rides = await userRoute.find({ userId: userId }).populate({
      path: "rideId",
      populate: {
        path: "driverId",
        model: "driver",
        select:
          "firstName lastName mobileNumber image vehicleName vehicleNumber",
      },
    });

    const userRides = rides.map((ride) => {


      const driver = ride.rideId?.driverId;

      return {
        userRouteId: ride._id,
        startLocation: ride.startLocation,
        endLocation: ride.endLocation,
        status: ride.status,
        rideCost: ride.rideCost,
        date: ride.date,
        time: ride.time,
        matchedDriver: ride.rideId && driver
          ? {
              startLocation: ride.rideId.source,
              endLocation: ride.rideId.destination,
              date: ride.rideId.date,
              status: ride.rideId.status,
              rideStartTime: ride.rideId.rideStartTime,
              name: driver.firstName + " " + driver.lastName,
              mobileNumber: driver.mobileNumber,
              vehicleName: driver.vehicleName,
              vehicleNumber: driver.vehicleNumber,
              image: driver.image,
            }
          : null,
      };
    });

    return res.status(200).json({ userRides });
  } catch (error) {
    console.error("Error fetching user ride history:", error);
    return res.status(500).json({
      error: "Something went wrong while fetching ride history.",
      message: error.message,
    });
  }
}


async function handleToMarkRideAsCompleted(req, res) {
  const userRouteId = req.params.userRouteId;
  const userId = req.user.userId;

  if (!userRouteId || !userId) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {

    const usersRoute = await userRoute.findByIdAndUpdate(
      userRouteId,
      { status: "completed" },
      { new: true }
    );

    if (!usersRoute) {
      return res.status(404).json({ error: "User route not found" });
    }

    await route.findByIdAndUpdate(
      usersRoute.rideId,
      {
        $set: {
          "matchedUser.status": "completed",
          status: "completed"
        }
      }
    );

    return res.status(200).json({ message: "Ride marked as completed successfully" });
  } catch (error) {
    console.error("Error marking ride as completed:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function handleSubmitFeedback(req, res) {

  const {feedbackText, rating } = req.body;

  const userRouteId = req.params.userRouteId;

  const userId = req.user.userId;

  console.log({feedbackText , rating , userId , userRouteId});

  if (!userId || !rating || !userRouteId) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const feedbackFill = await feedback.create({
      feedbackText: feedbackText,
      rating: rating,
      userId: userId,
      userRouteId: userRouteId
    });

    console.log(feedbackFill);

    return res.status(201).json({ message: "Feedback submitted successfully"});
  } catch (error) {
    console.error("Error submitting feedback:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}





module.exports = {
  handleSearchRides,
  handlePostMatchRidesInDatabase,
  handleToGetUserRideHistory,
  handleToMarkRideAsCompleted,
  handleSubmitFeedback
};
