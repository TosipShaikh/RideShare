require("dotenv").config({ path: "../.env" });
const route = require("../Model/dirverRoute.js");
const user = require("../Model/user.js");
const driver = require("../Model/driver.js");
const { getCoords, getRouteDirections } = require("../APIs/openstreetmap.js");
const { decodePolyline } = require("../Computation/decodePolyline.js");
const jwt = require("jsonwebtoken");
const userRoute = require("../Model/userRoute.js");



async function handlePostOfferInDatabase(req, res) {
  const { startLocation, endLocation, date, time } = req.body;

  const driverId = req.user.userId;
  console.log("The drivers id >>>>>>>  ",driverId);

  try {
    console.log("Starting coordinate lookup...");
    // const startLocation = "Katraj Chowk, Santosh Nagar, Ambegaon Bk, Pune, Maharashtra, 411046, India";
    // const endLocation = "Bhosari Bus Terminal, Bhosari, Pimpri-Chinchwad, Haveli, Pune, Maharashtra, 411026, India";

    console.log("Looking up coordinates for:", { startLocation, endLocation });

    const coordinates = await getCoords(startLocation, endLocation);
    console.log("Received coordinates:", coordinates);

    if (!coordinates || !coordinates.start || !coordinates.end) {
      console.error("Failed to get coordinates");
      return res.status(400).json({
        success: false,
        message: "Unable to resolve one or both locations right now. Please try again in a moment.",
      });
    }

    const start = coordinates.start;
    const end = coordinates.end;
    console.log("Start ", start);
    console.log("End ", end);
    const routeDetails = await getRouteDirections(start, end);
    console.log("Route Details :", routeDetails);
    console.log("Distance: ", routeDetails.routes[0].legs[0].distance);
    console.log("Duration: ", routeDetails.routes[0].legs[0].duration);
    console.log("Polyline: ", routeDetails.routes[0].overview_polyline);

    const polyline = routeDetails.routes[0].overview_polyline;
    const decodedPolyline = decodePolyline(polyline);

    console.log("Decoded polyline:", decodedPolyline);
    const created = await route.create({
      driverId: driverId,
      source: startLocation,
      destination: endLocation,
      date: date,
      rideStartTime: time,
      status: "available",
      distance: routeDetails.routes[0].legs[0].readable_distance,
      time: routeDetails.routes[0].legs[0].readable_duration,
      routePath: decodedPolyline,
    });
    if (!created) {
      console.log("Failed to create route");
    }
    console.log("Route created successfully", created);

    return res.status(200).json({
      success: true,
      coordinates: coordinates,
    });
  } catch (error) {
    console.error("Handler error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
}


const handleGetRideDetails = async (req, res) => {
  const driverId = req.user?.userId;

  if (!driverId) {
    return res.status(401).json({ error: "Unauthorized access" });
  }

  try {
    const rides = await route.find({ driverId })
      .populate('matchedUser.userId')
      .populate('matchedUser.userRouteId')
      .lean();

    const formattedRides = rides.map(ride => {
      const formattedRide = {
        routeId: ride._id,
        startLocation: ride.source,
        endLocation: ride.destination,
        time: ride.rideStartTime,
        status: ride.status,
        rideCost: ride.matchedUser?.userRouteId?.rideCost || 0,
        date: ride.date,
        matchedUser: null,
      };

      // Only if ride is not "available" and matched user exists
      if (
        ride.status !== "available" &&
        ride.matchedUser &&
        ride.matchedUser.userId &&
        ride.matchedUser.userRouteId
      ) {
        formattedRide.matchedUser = {
            fullName: ride.matchedUser.userId.fullName,
            mobileNumber: ride.matchedUser.userId.mobileNumber,
            startLocation: ride.matchedUser.userRouteId.startLocation,
            endLocation: ride.matchedUser.userRouteId.endLocation,
            rideCost: ride.matchedUser.userRouteId.rideCost,
            time: ride.matchedUser.userRouteId.time,
            date: ride.matchedUser.userRouteId.date,
            status: ride.matchedUser.userRouteId.status,
          };
      }

      return formattedRide;
    });

    return res.status(200).json({ rides: formattedRides });
  } catch (err) {
    console.error("Error fetching driver rides:", err);

    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const handleEnterAcceptedRides = async (req, res) => {
  const driverId = req.user.userId;
  const routeId = req.params.routeId;

  console.log({ driverId , routeId });

  if (!driverId || !routeId ) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    await route.findByIdAndUpdate(routeId, { status: "ongoing" });

    const driverRoute = await route.findById(routeId);
    const userRouteId = driverRoute.matchedUser.userRouteId;

    if (!userRouteId) {
      return res.status(404).json({ error: "Route not found" });
    }

    await userRoute.findByIdAndUpdate(userRouteId, { status: "accepted" });

    await route.findByIdAndUpdate(routeId, {
      $set: {
        "matchedUser.status": "accepted",
      },
    });

    console.log("Ride accepted successfully");
    return res.status(200).json({ msg: "success" });
  } catch (error) {
    console.error("Error updating ride acceptance:", error);
    return res.status(500).json({ error: "Server error" });
  }
};


const handleEnterDeclinedRides = async (req, res) => {

  const driverId = req.user.userId;
  const routeId = req.params.routeId;

  console.log({ driverId , routeId });

  if (!driverId || !routeId ) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const now = new Date();
  const currentDate = now.toISOString().split("T")[0]; // Format: "YYYY-MM-DD"
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const currentTime = `${hours}:${minutes}`;

  try {
    const driverRoute = await route.findById(routeId);

    if (
      driverRoute.date === currentDate &&
      driverRoute.rideStartTime > currentTime
    ) {

      await route.findByIdAndUpdate(routeId, {
        status: "available",
        matchedUser: {
          userId: null,
          userRouteId: null,
          status: "unmatched",  
        }, 
      });
    } else {

      await route.findByIdAndUpdate(routeId, {
        status: "cancelled",
        "matchedUser.status" : "declined", 
      });
    }

    const userRouteId = driverRoute.matchedUser.userRouteId;
    
    if (!userRouteId) {
      return res.status(404).json({ error: "Route not found" });
    }

    const userRides = await userRoute.findByIdAndUpdate(userRouteId, {
      status: "declined",
      declinedAt: new Date()
    });

    console.log(userRides);
    console.log("Ride declined successfully");
    return res.status(200).json({ msg: "success" });

  } catch (error) {
    console.error("Error while declining ride:", error);
    return res.status(500).json({ error: "Server error" });
  }
};



module.exports = {
  handlePostOfferInDatabase,
  handleEnterAcceptedRides,
  handleEnterDeclinedRides,
  handleGetRideDetails,
};