import React, { useEffect, useState } from 'react';
import { Clock, MapPin, User, Phone, CheckCircle, XCircle, Car, ChevronRight, ArrowLeft } from 'lucide-react';
import axios from 'axios'; // Make sure to import axios

const DriverRideHistory = () => {
  const [ridesChanges, setRidesChanges] = useState(true);
  const [rides, setRides] = useState([]);
  const [showAcceptPopup, setShowAcceptPopup] = useState(false);
  const [showDeclinePopup, setShowDeclinePopup] = useState(false);
  const [selectedRideId, setSelectedRideId] = useState(null);
  const [loading, setLoading] = useState(true); // Added loading state
  const [error, setError] = useState(null); // Added error state

  const fetchDriverRideDetails = async () => {
    try {
      console.log("Fetching ride details...");
      const response = await fetch(`http://localhost:5001/offer/getridedetails`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch driver ride details");
      }

      const data = await response.json();
      console.log("Received ride data:", data);
      setRides(data.rides);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching driver rides:", error);
      setError("Failed to fetch rides");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDriverRideDetails();
  }, [ridesChanges]);


  const [showMoreCompleted, setShowMoreCompleted] = useState(false);
  const [activeTab, setActiveTab] = useState('current');

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800 border-green-300';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'ongoing': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'completed': return 'bg-gray-100 text-gray-800 border-gray-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'available': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'ongoing': return <Car className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const showAcceptConfirmation = (rideId) => {
    setSelectedRideId(rideId);
    setShowAcceptPopup(true);
  };

  const showDeclineConfirmation = (rideId) => {
    setSelectedRideId(rideId);
    setShowDeclinePopup(true);
  };

  const handleAccept = async () => {
    console.log(`Accepting ride ${selectedRideId}`);
    try {
      const response = await axios.put(`http://localhost:5001/offer/enteracceptedrides/${selectedRideId}`,
        {},
        {
          withCredentials: true,
        });

      if (response.status === 200) {
        console.log("Ride accepted successfully");
        setRidesChanges(!ridesChanges);
        setShowAcceptPopup(false);
        setSelectedRideId(null);
      }
      else {
        console.error("Failed to accept ride");
        alert("Failed to accept ride. Please try again.");
      }
    }
    catch (error) {
      console.error("Error accepting ride:", error);
      alert("Failed to accept ride. Please try again.");
      setShowAcceptPopup(false);
      setSelectedRideId(null);
    };
  }

  const handleDecline = async () => {
    console.log(`Declining ride ${selectedRideId}`);
    try {
      const response = await axios.put(`http://localhost:5001/offer/enterdeclinedrides/${selectedRideId}`,
        {},
        {
          withCredentials: true,
        });

      if (response.status === 200) {
        console.log("Ride declined successfully");
        setRidesChanges(!ridesChanges);
        setShowDeclinePopup(false);
        setSelectedRideId(null);
      }
      else {
        console.error("Failed to decline ride");
        alert("Failed to decline ride. Please try again.");
      }
    }
    catch (error) {
      console.error("Error declining ride:", error);
      alert("Failed to decline ride. Please try again.");
      setShowDeclinePopup(false);
      setSelectedRideId(null);
    };
  }

  const currentRides = rides.filter(ride =>
    ride.status === 'available' || ride.status === 'pending' || ride.status === 'ongoing'
  );

  const completedRides = rides.filter(ride => ride.status === 'completed');
  const displayedCompletedRides = showMoreCompleted ? completedRides : completedRides.slice(0, 4);

  const AcceptConfirmationPopup = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Accept Ride Request</h3>
          <p className="text-gray-600 mb-6">Are you sure you want to accept this ride request? This action cannot be undone.</p>

          <div className="flex gap-3">
            <button
              onClick={() => {
                setShowAcceptPopup(false);
                setSelectedRideId(null);
              }}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-3 rounded-xl font-semibold transition-all duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleAccept}
              className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            >
              <CheckCircle className="w-5 h-5" />
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );


  const DeclineConfirmationPopup = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <XCircle className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Decline Ride Request</h3>
          <p className="text-gray-600 mb-6">Are you sure you want to decline this ride request? The passenger will be notified.</p>

          <div className="flex gap-3">
            <button
              onClick={() => {
                setShowDeclinePopup(false);
                setSelectedRideId(null);
              }}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-3 rounded-xl font-semibold transition-all duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleDecline}
              className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            >
              <XCircle className="w-5 h-5" />
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const RideCard = ({ ride, index, isCompleted = false }) => (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      {/* Enhanced Card Header */}
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 p-5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-16 -mt-16"></div>
        <div className="relative flex items-center justify-between">
          <div className={`px-4 py-2 rounded-full text-sm font-semibold border-2 ${getStatusColor(ride.status)} bg-white backdrop-blur-sm`}>
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

      {/* Enhanced Card Body */}
      <div className="p-6">
        {/* Driver's Route with enhanced styling */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
              <MapPin className="w-4 h-4 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-800">Your Route</h3>
          </div>

          <div className="relative">
            <div className="absolute left-4 top-8 bottom-2 w-0.5"></div>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800 text-sm">{ride.startLocation}</p>
                  <p className="text-xs text-green-600 font-medium mt-1">Pickup Point</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800 text-sm">{ride.endLocation}</p>
                  <p className="text-xs text-red-600 font-medium mt-1">Drop Point</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-4 p-3 bg-indigo-50 rounded-lg">
            <Clock className="w-4 h-4 text-indigo-600" />
            <span className="text-sm font-medium text-indigo-800">{ride.time} • {ride.date}</span>
          </div>
        </div>

        {/* Status-specific content with enhanced styling */}
        <div className="border-t border-gray-100 pt-6">
          {ride.status === 'available' && (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-indigo-600" />
              </div>
              <p className="text-gray-600 font-medium">No user yet. Stay tuned!</p>
              <p className="text-sm text-gray-500 mt-1">Waiting for ride requests...</p>
            </div>
          )}

          {ride.status === 'pending' && ride.matchedUser && (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <h4 className="text-lg font-bold text-gray-800">Passenger Details</h4>
              </div>

              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4 mb-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm">
                      <User className="w-3 h-3 text-gray-600" />
                    </div>
                    <span className="font-semibold text-gray-800">{ride.matchedUser.fullName}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm">
                      <Phone className="w-3 h-3 text-gray-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{ride.matchedUser.mobileNumber}</span>
                  </div>
                  <div className="text-sm text-gray-700 pl-9">
                    <p className="mb-1"><span className="font-semibold">From:</span> {ride.matchedUser.startLocation}</p>
                    <p className="mb-1"><span className="font-semibold">To:</span> {ride.matchedUser.endLocation}</p>
                    <p><span className="font-semibold">Time:</span> {ride.matchedUser.time}</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => showAcceptConfirmation(ride.routeId)}
                  className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                >
                  <CheckCircle className="w-5 h-5" />
                  Accept
                </button>
                <button
                  onClick={() => showDeclineConfirmation(ride.routeId)}
                  className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                >
                  <XCircle className="w-5 h-5" />
                  Decline
                </button>
              </div>
            </div>
          )}

          {ride.status === 'ongoing' && ride.matchedUser && (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center">
                  <Car className="w-4 h-4 text-white" />
                </div>
                <h4 className="text-lg font-bold text-gray-800">Current Passenger</h4>
              </div>

              <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-4 mb-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm">
                      <User className="w-3 h-3 text-gray-600" />
                    </div>
                    <span className="font-semibold text-gray-800">{ride.matchedUser.fullName}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm">
                      <Phone className="w-3 h-3 text-gray-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">{ride.matchedUser.mobileNumber}</span>
                  </div>
                  <div className="text-sm text-gray-700 pl-9">
                    <p className="mb-1"><span className="font-semibold">From:</span> {ride.matchedUser.startLocation}</p>
                    <p><span className="font-semibold">To:</span> {ride.matchedUser.endLocation}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-4 text-center shadow-lg">
                <div className="flex items-center justify-center gap-3 text-white font-bold">
                  <Car className="w-5 h-5" />
                  <span>🚕 Ride in Progress</span>
                </div>
              </div>
            </div>
          )}

          {ride.status === 'completed' && ride.matchedUser && (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <h4 className="text-lg font-bold text-gray-800">Completed Ride</h4>
              </div>

              <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 mb-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm">
                      <User className="w-3 h-3 text-gray-600" />
                    </div>
                    <span className="font-semibold text-gray-800">{ride.matchedUser.fullName}</span>
                  </div>
                  <div className="text-sm text-gray-700 pl-9">
                    <p className="mb-1"><span className="font-semibold">From:</span> {ride.matchedUser.startLocation}</p>
                    <p><span className="font-semibold">To:</span> {ride.matchedUser.endLocation}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-gray-500 to-gray-600 rounded-xl p-4 text-center shadow-lg">
                <div className="flex items-center justify-center gap-3 text-white font-bold">
                  <CheckCircle className="w-5 h-5" />
                  <span>Ride Completed Successfully</span>
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
        <p className="text-lg text-gray-700">Loading rides...</p>
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
        <div className="text-center mb-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
           Manage Your Rides
          </h1>
          <p className="text-gray-600">Manage your rides efficiently</p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center justify-center gap-4 mb-4">
          <button
            onClick={() => setActiveTab('current')}
            className={`px-8 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 ${
              activeTab === 'current'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-50 shadow-md'
            }`}
          >
            <Car className="w-5 h-5" />
            Current Rides
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`px-8 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 ${
              activeTab === 'completed'
                ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:bg-gray-50 shadow-md'
            }`}
          >
            <CheckCircle className="w-5 h-5" />
            Completed Rides
          </button>
        </div>

        {/* Current Rides Section */}
        {activeTab === 'current' && (
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                <Car className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Current Rides</h2>
              <div className="flex-1 h-0.5 bg-gradient-to-r from-indigo-200 to-purple-200 ml-4"></div>
            </div>

            {/* MODIFICATION HERE: Changed grid-cols to 1 for single column */}
            <div className="grid gap-6 grid-cols-1 md:grid-cols-1 lg:grid-cols-1">
              {currentRides.map((ride, index) => (
                <RideCard key={index} ride={ride} index={index} />
              ))}
            </div>

            {currentRides.length === 0 && (
              <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
                <div className="w-20 h-20 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Car className="w-10 h-10 text-indigo-600" />
                </div>
                <p className="text-gray-600 text-lg font-medium">No current rides available</p>
                <p className="text-gray-500 text-sm mt-1">Check back later for new ride requests</p>
              </div>
            )}
          </div>
        )}

        {/* Completed Rides Section */}
        {activeTab === 'completed' && (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-gray-500 to-gray-600 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Completed Rides</h2>
              <div className="flex-1 h-0.5 bg-gradient-to-r from-gray-200 to-gray-300 ml-4"></div>
            </div>

            {/* MODIFICATION HERE: Changed grid-cols to 1 for single column */}
            <div className="grid gap-6 grid-cols-1 md:grid-cols-1 lg:grid-cols-1">
              {displayedCompletedRides.map((ride, index) => (
                <RideCard key={index} ride={ride} index={index} isCompleted={true} />
              ))}
            </div>

            {completedRides.length === 0 && (
              <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
                <div className="w-20 h-20 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-10 h-10 text-gray-600" />
                </div>
                <p className="text-gray-600 text-lg font-medium">No completed rides yet</p>
                <p className="text-gray-500 text-sm mt-1">Your ride history will appear here</p>
              </div>
            )}

            {completedRides.length > 4 && (
              <div className="text-center mt-8">
                <button
                  onClick={() => setShowMoreCompleted(!showMoreCompleted)}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 mx-auto shadow-lg hover:shadow-xl"
                >
                  {showMoreCompleted ? 'Show Less' : 'View More'}
                  <ChevronRight className={`w-5 h-5 transition-transform ${showMoreCompleted ? 'rotate-90' : ''}`} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {showAcceptPopup && <AcceptConfirmationPopup />}
      {showDeclinePopup && <DeclineConfirmationPopup />}
    </div>
  );
};

export default DriverRideHistory;