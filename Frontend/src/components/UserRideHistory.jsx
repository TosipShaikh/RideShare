import React, { useEffect, useState } from "react";
import {
  Clock,
  MapPin,
  User,
  Phone,
  CheckCircle,
  Car,
  ChevronRight,
  Star,
} from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

// Placeholder for user details (replace with actual user data fetching)
const USER_DETAILS = {
  fullName: "Alice Wonderland",
  mobileNumber: "9876543210",
};

const UserRideHistory = () => {
  const [ridesChanges, setRidesChanges] = useState(true);
  const [rides, setRides] = useState([]);
  const [showCompleteRidePopup, setShowCompleteRidePopup] = useState(false);
  const [selectedRideId, setSelectedRideId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState("");
  const [showMoreCompleted, setShowMoreCompleted] = useState(false);
  const [activeTab, setActiveTab] = useState("upcoming");

  // Updated fetch function to get user's ride history
  const fetchUserRideDetails = async () => {
    try {
      console.log("Fetching user ride details...");

      const response = await fetch(
        `http://localhost:5001/book/getridehistory`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user ride details");
      }

      const data = await response.json();
      console.log("Received user ride data:", data);
      setRides(data.userRides || []); // Ensure we always set an array, even if empty
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user rides:", error);
      setError("Failed to fetch rides");
      setRides([]); // Set empty array on error
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserRideDetails();
  }, [ridesChanges]); // Refetch when ride status changes

  const getStatusColor = (status) => {
    switch (status) {
      case "requested":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "declined":
        return "bg-red-300 text-red-800 border-red-900";
      case "accepted":
        return "bg-green-100 text-green-800 border-green-300";
      case "ongoing":
        return "bg-orange-100 text-orange-800 border-orange-300";
      case "completed":
        return "bg-gray-100 text-gray-800 border-gray-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "requested":
        return <Clock className="w-4 h-4" />;
      case "accepted":
        return <CheckCircle className="w-4 h-4" />;
      case "ongoing":
        return <Car className="w-4 h-4" />;
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const showCompleteRideConfirmation = (rideId) => {
    setSelectedRideId(rideId);
    setShowCompleteRidePopup(true);
  };

  const handleMarkAsCompleted = async () => {
    console.log(`Marking ride ${selectedRideId} as completed`);
    try {
      // Assuming an API endpoint to mark a user's ride as completed
      const response = await axios.put(
        `http://localhost:5001/book/markridecompleted/${selectedRideId}`,
        {},
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        console.log("Ride marked as completed successfully");
        setShowCompleteRidePopup(false);
        setShowFeedbackForm(true); 
        setRidesChanges(!ridesChanges); 
      } else {
        console.error("Failed to mark ride as completed");
        alert("Failed to mark ride as completed. Please try again.");
        setSelectedRideId(null);
      }
    } catch (error) {
      console.error("Error marking ride as completed:", error);
      alert("Failed to mark ride as completed. Please try again.");
      setShowCompleteRidePopup(false);
      setSelectedRideId(null);
    }
  };

  const handleSkip = () => {
    setShowFeedbackForm(false);
    setSelectedRideId(null);
    setRating(0);
    setFeedbackText("");
  };

  const handleSubmitFeedback = async () => {
    if (!rating) {
      alert("Please provide a rating before submitting feedback");
      return;
    }

    console.log(
      `Submitting feedback for ride ${selectedRideId}: Rating ${rating}, Feedback: ${feedbackText}`
    );
    try {
      const response = await axios.post(
        `http://localhost:5001/book/submitfeedback/${selectedRideId}`,
        {
          rating,
          feedbackText: feedbackText || "", // Ensure we send an empty string if feedbackText is null/undefined
        },
        {
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        console.log("Feedback submitted successfully");
        setShowFeedbackForm(false);
        setRating(0);
        setFeedbackText("");
        setSelectedRideId(null);
        setRidesChanges(!ridesChanges); // Refresh rides after feedback
      } else {
        console.error("Failed to submit feedback");
        alert("Failed to submit feedback. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Failed to submit feedback. Please try again.");
      setShowFeedbackForm(false);
      setSelectedRideId(null);
    }
  };

  const upcomingOrOngoingRides = (rides || []).filter(
    (ride) =>
      ride.status === "requested" ||
      ride.status === "accepted" ||
      ride.status === "ongoing"  ||
      ride.status === "declined"
  );

  const completedRides = (rides || []).filter(
    (ride) => ride.status === "completed"
  );
  const displayedCompletedRides = showMoreCompleted
    ? completedRides
    : completedRides.slice(0, 4);

  const CompleteRideConfirmationPopup = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            Confirm Ride Completion
          </h3>
          <p className="text-gray-600 mb-6">
            Are you sure you want to mark this ride as completed? You will then
            be able to provide feedback.
          </p>

          <div className="flex gap-3">
            <button
              onClick={() => {
                setShowCompleteRidePopup(false);
                setSelectedRideId(null);
              }}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-3 rounded-xl font-semibold transition-all duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleMarkAsCompleted}
              className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            >
              <CheckCircle className="w-5 h-5" />
              Mark as Completed
            </button>
          </div>
        </div>
      </div>
    </div>
  );


  const RideCard = ({ ride, isUpcoming = false }) => (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Card Header: Ride Cost & Status */}
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 p-5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-16 -mt-16"></div>
        <div className="relative flex items-center justify-between">
          <div
            className={`px-4 py-2 rounded-full text-sm font-semibold border-2 ${getStatusColor(
              ride.status
            )} bg-white backdrop-blur-sm`}
          >
            <div className="flex items-center gap-2">
              {getStatusIcon(ride.status)}
              <span className="capitalize">{ride.status}</span>
            </div>
          </div>
          <div className="text-white">
            <div className="text-2xl font-bold">₹{ride.rideCost}</div>
            <div className="text-sm opacity-80">Ride Cost</div>
          </div>
        </div>
      </div>

      {/* Card Body: Route Details */}
      <div className="p-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
              <MapPin className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-800">Your Ride</h3>
          </div>

          <div className="relative">
            <div className="absolute left-4 top-8 bottom-2 w-0.5 bg-gray-200"></div>{" "}
            {/* Connecting line */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800 text-sm">
                    {ride.startLocation}
                  </p>
                  <p className="text-xs text-green-600 font-medium mt-1">
                    Pickup Point
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800 text-sm">
                    {ride.endLocation}
                  </p>
                  <p className="text-xs text-red-600 font-medium mt-1">
                    Drop Point
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-4 p-3 bg-indigo-50 rounded-lg">
            <Clock className="w-4 h-4 text-indigo-600" />
            <span className="text-sm font-medium text-indigo-800">
              {ride.time} • {ride.date}
            </span>
          </div>
        </div>

        {/* Driver/User Details and Status Messages */}
        <div className="border-t border-gray-100 pt-6">
          {isUpcoming && ride.status === "requested" && (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <p className="text-gray-800 text-lg font-bold mb-2">
                Waiting for driver acceptance
              </p>
              <p className="text-gray-600 text-sm">
                You will be notified once the driver accepts your ride.
              </p>
            </div>
          )}

          {isUpcoming &&
            (ride.status === "accepted" ||
              ride.status === "ongoing" ||
              ride.status == "declined"  ) &&
            ride.matchedDriver && (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-indigo-400 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <h4 className="text-lg font-bold text-gray-800">
                    Driver Details
                  </h4>
                </div>

                {/* Enhanced Driver Details Card for Upcoming/Ongoing/Requested */}
                <div className="bg-green-100 border border-indigo-200 rounded-xl p-5 mb-4 shadow-md flex flex-col md:flex-row items-center gap-5">
                  <img
                    src={ride.matchedDriver.image} // Ensure path is correct
                    alt="Driver"
                    className="w-20 h-20 rounded-full object-cover shadow-lg border-2 border-indigo-400 flex-shrink-0"
                  />
                  <div className="flex-1 text-center md:text-left">
                    {/* Increased font size for driver's name */}
                    <p className="font-bold text-black text-xl mb-1">
                      {ride.matchedDriver.name}
                    </p>
                    <div className="space-y-2 mt-2">
                      {/* Increased font size and changed text color to black */}
                      <p className="text-base text-black flex items-center justify-center md:justify-start gap-2">
                        <Phone className="w-5 h-5 text-indigo-700 flex-shrink-0" />{" "}
                        {/* Larger icon */}
                        <span className="font-medium">
                          {ride.matchedDriver.mobileNumber}
                        </span>
                      </p>
                      {/* Increased font size and changed text color to black */}
                      <p className="text-base text-black flex items-center justify-center md:justify-start gap-2">
                        <Car className="w-5 h-5 text-indigo-700 flex-shrink-0" />{" "}
                        {/* Larger icon */}
                        <span className="font-medium">
                          {ride.matchedDriver.vehicleName} (
                          {ride.matchedDriver.vehicleNumber})
                        </span>
                      </p>

                      {/* Driver's route and ride start details */}
                      {(ride.matchedDriver.startLocation ||
                        ride.matchedDriver.endLocation ||
                        ride.matchedDriver.rideStartTime) && (
                        <div className="border-t border-indigo-100 pt-3 mt-3">
                          <p className="font-semibold text-black text-base mb-2 text-center md:text-left">
                            Driver's Route & Schedule:
                          </p>
                          {ride.matchedDriver.startLocation && (
                            <p className="text-sm text-black flex items-center justify-center md:justify-start gap-2">
                              <MapPin className="w-4 h-4 text-green-700 flex-shrink-0" />{" "}
                              From: {ride.matchedDriver.startLocation}
                            </p>
                          )}
                          {ride.matchedDriver.endLocation && (
                            <p className="text-sm text-black flex items-center justify-center md:justify-start gap-2 mt-1">
                              <MapPin className="w-4 h-4 text-red-700 flex-shrink-0" />{" "}
                              To: {ride.matchedDriver.endLocation}
                            </p>
                          )}
                          {ride.matchedDriver.rideStartTime && (
                            <p className="text-sm text-black flex items-center justify-center md:justify-start gap-2 mt-1">
                              <Clock className="w-4 h-4 text-purple-700 flex-shrink-0" />{" "}
                              Starts: {ride.matchedDriver.rideStartTime}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {ride.status === "accepted" && (
                  <div className="text-center bg-green-100 rounded-xl p-4 mb-4">
                    <p className="text-green-700 font-semibold">
                      Driver has accepted your ride. He will be reaching soon.
                    </p>
                  </div>
                )}
                {ride.status === "declined" && (
                  <div className="text-center bg-green-100 rounded-xl p-4 mb-4">
                    <p className="text-red-700 font-semibold">
                      Oops! The driver couldn't accept your ride this time. No worries — try again and you'll find someone soon!
                    </p>
                  </div>
                )}
                {ride.status === "ongoing" && (
                  <div className="text-center bg-orange-100 rounded-xl p-4 mb-4">
                    <p className="text-orange-700 font-semibold">
                      Your ride is currently ongoing!
                    </p>
                  </div>
                )}

                {ride.status === "accepted" && (
                  <button
                    onClick={() =>
                      showCompleteRideConfirmation(ride.userRouteId)
                    }
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl mt-4"
                  >
                    <CheckCircle className="w-5 h-5" />
                    Ride Completed
                  </button>
                )}
              </div>
            )}

          {!isUpcoming && ride.status === "completed" && ride.matchedDriver && (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <h4 className="text-lg font-bold text-gray-800">
                  Driver Details
                </h4>
              </div>

              {/* Enhanced Driver Details Card for Completed Rides (consistent styling) */}
              <div className="bg-white border border-gray-200 rounded-xl p-5 mb-4 shadow-md flex flex-col md:flex-row items-center gap-5">
                <div className="flex-1 text-center md:text-left">
                  <div className="space-y-2 mt-2">
                    {(ride.matchedDriver.startLocation ||
                      ride.matchedDriver.endLocation ||
                      ride.matchedDriver.rideStartTime) && (
                      <div className="border-t border-gray-100 pt-3 mt-3">
                        <p className="font-semibold text-black text-base mb-2 text-center md:text-left">
                          Driver's Route & Schedule:
                        </p>
                        {ride.matchedDriver.startLocation && (
                          <p className="text-sm text-black flex items-center justify-center md:justify-start gap-2">
                            <MapPin className="w-4 h-4 text-green-700 flex-shrink-0" />{" "}
                            From: {ride.matchedDriver.startLocation}
                          </p>
                        )}
                        {ride.matchedDriver.endLocation && (
                          <p className="text-sm text-black flex items-center justify-center md:justify-start gap-2 mt-1">
                            <MapPin className="w-4 h-4 text-red-700 flex-shrink-0" />{" "}
                            To: {ride.matchedDriver.endLocation}
                          </p>
                        )}
                        {ride.matchedDriver.rideStartTime && (
                          <p className="text-sm text-black flex items-center justify-center md:justify-start gap-2 mt-1">
                            <Clock className="w-4 h-4 text-gray-700 flex-shrink-0" />{" "}
                            Starts: {ride.matchedDriver.rideStartTime}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-4 text-center shadow-lg">
                <div className="flex items-center justify-center gap-3 text-white font-bold">
                  <CheckCircle className="w-5 h-5" />
                  <span>Ride Completed</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-50 to-indigo-100">
        <p className="text-lg text-gray-700">Loading your ride history...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-50 to-indigo-100">
      <p className="text-lg text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Your Ride History
          </h1>
          <p className="text-gray-600">Track your rides and past journeys</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`px-8 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 ${
              activeTab === "upcoming"
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                : "bg-white text-gray-600 hover:bg-gray-50 shadow-md"
            }`}
          >
            <Car className="w-5 h-5" />
            Current Rides
          </button>
          <button
            onClick={() => setActiveTab("completed")}
            className={`px-8 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 ${
              activeTab === "completed"
                ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                : "bg-white text-gray-600 hover:bg-gray-50 shadow-md"
            }`}
          >
            <CheckCircle className="w-5 h-5" />
            Completed Rides
          </button>
        </div>

        {/* Upcoming/Ongoing Rides Section */}
        {activeTab === "upcoming" && (
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                <Car className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                Upcoming & Ongoing Rides
              </h2>
              <div className="flex-1 h-0.5 bg-gradient-to-r from-indigo-200 to-purple-200 ml-4"></div>
            </div>

            <div className="grid gap-6 grid-cols-1 md:grid-cols-1 lg:grid-cols-1">
              {upcomingOrOngoingRides.length > 0 ? (
                upcomingOrOngoingRides.map((ride, index) => (
                  <RideCard key={index} ride={ride} isUpcoming={true} />
                ))
              ) : (
                <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
                  <div className="w-20 h-20 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Car className="w-10 h-10 text-indigo-600" />
                  </div>
                  <p className="text-gray-600 text-lg font-medium">
                    No upcoming or ongoing rides
                  </p>
                  <p className="text-gray-500 text-sm mt-1">
                    Book a new ride to see it here!
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Completed Rides Section */}
        {activeTab === "completed" && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-gray-500 to-gray-600 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                Completed Rides
              </h2>
              <div className="flex-1 h-0.5 bg-gradient-to-r from-gray-200 to-gray-300 ml-4"></div>
            </div>

            <div className="grid gap-6 grid-cols-1 md:grid-cols-1 lg:grid-cols-1">
              {displayedCompletedRides.length > 0 ? (
                displayedCompletedRides.map((ride, index) => (
                  <RideCard key={index} ride={ride} isUpcoming={false} />
                ))
              ) : (
                <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
                  <div className="w-20 h-20 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-10 h-10 text-gray-600" />
                  </div>
                  <p className="text-gray-600 text-lg font-medium">
                    No completed rides yet
                  </p>
                  <p className="text-gray-500 text-sm mt-1">
                    Your ride history will appear here
                  </p>
                </div>
              )}
            </div>

            {completedRides.length > 4 && (
              <div className="text-center mt-8">
                <button
                  onClick={() => setShowMoreCompleted(!showMoreCompleted)}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 mx-auto shadow-lg hover:shadow-xl"
                >
                  {showMoreCompleted ? "Show Less" : "View More"}
                  <ChevronRight
                    className={`w-5 h-5 transition-transform ${
                      showMoreCompleted ? "rotate-90" : ""
                    }`}
                  />
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {showCompleteRidePopup && <CompleteRideConfirmationPopup />}
      {showFeedbackForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-purple-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                Provide Feedback
              </h3>
              <p className="text-gray-600 mb-4">
                Help us improve by rating your ride and providing feedback.
              </p>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Rating:
                </label>
                <div className="flex justify-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-8 h-8 cursor-pointer ${
                        star <= rating
                          ? "text-yellow-500 fill-current"
                          : "text-gray-400"
                      }`}
                      onClick={() => setRating(star)}
                    />
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="feedback"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Your Feedback:
                </label>
                <textarea
                  id="feedback"
                  className="shadow appearance-none border rounded-xl w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-all duration-200"
                  rows="4"
                  placeholder="Tell us about your ride experience..."
                  value={feedbackText}
                  onChange={(e) => {
                    console.log("Feedback text changing:", e.target.value);
                    setFeedbackText(e.target.value);
                  }}
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleSkip}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-3 rounded-xl font-semibold transition-all duration-200"
                >
                  Skip
                </button>
                <button
                  onClick={handleSubmitFeedback}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-4 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                >
                  <CheckCircle className="w-5 h-5" />
                  Submit Feedback
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserRideHistory;
