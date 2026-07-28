import React from 'react';
import { 
  MapPin, 
  Clock, 
  IndianRupee, 
  User, 
  Star, 
  Bike, 
  Phone, 
  ArrowLeft, 
  Calendar,
  Users,
  Shield,
  MessageCircle,
  Navigation,
  CheckCircle, // Added for confirmation icon
  XCircle // Added for cancel icon
} from 'lucide-react';
import { useEffect, useState } from 'react'; // useState is needed for the popup
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from 'react-router-dom';

const RideDetails = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const {ride , userStartLocation , userEndLocation , date , time} = location.state;

  // State for controlling the booking confirmation popup visibility
  const [showBookingConfirmation, setShowBookingConfirmation] = useState(false);

  console.log("Ride details data:", { ride, userStartLocation, userEndLocation, date, time });

  // Original handleBookRide logic remains untouched
  const handleBookRide = async () => {
    let errorHandled = false;
    try {
      const userData = {
        startLocation: userStartLocation,
        endLocation: userEndLocation,
        rideId: ride.rideId,
        rideCost: ride.rideCost,
        date: date,
        time: time
      };
  
      console.log(userData);
      console.log("Booking ride with data:", userData);
      const response = await fetch("http://localhost:5001/book/matchride", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
  
      
      if (response.ok) {
        console.log("Ride booked successfully!");
        toast.success("Ride Booked Successfully!");
        // Close popup after successful booking
        setShowBookingConfirmation(false); 
        setTimeout(() => {
          navigate("/ridebooksuccess", {
            state: { ride, userStartLocation, userEndLocation, date, time },
          });
        }, 300); 
      } 
      else 
      {
          toast.error("Error while Booking Ride!");
          errorHandled = true;
      }

    } catch (error) {
      if(!errorHandled)
      {
        toast.error("Error while Booking Ride!");
      }
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleCallDriver = () => {
    if (ride?.driverNumber) {
      window.location.href = `tel:${ride.driverNumber}`;
    }
  };

  const handleMessageDriver = () => {
    if (ride?.driverNumber) {
      window.location.href = `sms:${ride.driverNumber}`;
    }
  };

  // Confirmation Pop-up Component
  const BookingConfirmationPopup = () => (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full mx-auto transform scale-95 animate-scaleIn">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Bike className="w-8 h-8 text-indigo-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Confirm Ride Booking</h3>
          <p className="text-gray-600 text-base">
            Are you sure you want to book this ride for <span className="font-semibold text-indigo-700">₹{ride.rideCost}</span>?
          </p>
          <p className="text-sm text-gray-500 mt-2">
            You will be notified once the driver accepts your request.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => setShowBookingConfirmation(false)} // Cancel action
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl 
                       bg-gray-200 text-gray-800 font-semibold 
                       hover:bg-gray-300 transition-all duration-200"
          >
            <XCircle size={18} />
            Cancel
          </button>
          <button
            onClick={() => {
              handleBookRide(); // Confirm action - calls original booking logic
            }}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl 
                       bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold 
                       hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 shadow-md"
          >
            <CheckCircle size={18} />
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );


  if (!ride) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MapPin className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">No Ride Data Found</h2>
          <p className="text-gray-600 mb-4">Unable to load ride details.</p>
          <button 
            onClick={handleGoBack}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4">
            <button 
              onClick={handleGoBack}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            <div>
              <h1 className="text-2xl font-bold">Ride Details</h1>
              <p className="text-indigo-100">Complete information about your ride</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Driver Information Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-indigo-600" />
                Driver Information
              </h2>
              
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <img 
                    src={ride.driverImage || "https://via.placeholder.com/64"}
                    alt ="Driver Avatar"
                    className="w-8 h-8 text-indigo-600" />
                </div>
                  {console.log("Driver Image:", ride.driverImage)}
                
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{ride.driverName}</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-center text-gray-600">
                      <Phone className="w-4 h-4 mr-2" />
                      <span>{ride.driverNumber}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 mt-4">
                    <button 
                      onClick={handleCallDriver}
                      className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors text-sm"
                    >
                      <Phone size={16} />
                      Call
                    </button>
                    <button 
                      onClick={handleMessageDriver}
                      className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors text-sm"
                    >
                      <MessageCircle size={16} />
                      Message
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Route Information Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Navigation className="w-5 h-5 text-indigo-600" />
                Route Information
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-4 h-4 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-grow">
                    <p className="text-sm font-medium text-gray-500 mb-1">Starting Point</p>
                    <p className="text-gray-800 font-medium">{ride.rideStart}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-center">
                  <div className="w-px h-8 bg-gray-300"></div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-4 h-4 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-grow">
                    <p className="text-sm font-medium text-gray-500 mb-1">Destination</p>
                    <p className="text-gray-800 font-medium">{ride.rideEnd}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Vehicle Information Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Bike className="w-5 h-5 text-indigo-600" />
                Vehicle Information
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Vehicle</p>
                  <p className="text-gray-800 font-medium">{ride.vehicleName}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Available Seats</p>
                  <p className="text-gray-800 font-medium">1 seat</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 sticky top-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Booking Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Ride Cost</span>
                  <div className="flex items-center text-lg font-bold text-green-600">
                    <IndianRupee size={18} />
                    <span>{ride.rideCost}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Date</span>
                  <span className="text-gray-800 font-medium">{date}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Time</span>
                  <span className="text-gray-800 font-medium">{ride.rideStartTime}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Seats</span>
                  <span className="text-gray-800 font-medium">1</span>
                </div>
                
                <hr className="my-4" />
                
                <div className="flex items-center justify-between text-lg font-bold">
                  <span className="text-gray-800">Total</span>
                  <div className="flex items-center text-green-600">
                    <IndianRupee size={20} />
                    <span>{ride.rideCost}</span>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={() => setShowBookingConfirmation(true)} // Open confirmation popup instead of direct booking
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
              >
                Book This Ride
              </button>
              
              <div className="mt-4 p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2 text-green-700">
                  <Shield size={16} />
                  <span className="text-sm font-medium">Safe & Secure</span>
                </div>
                <p className="text-xs text-green-600 mt-1">
                  All rides are verified and tracked for your safety
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Render the confirmation popup conditionally */}
      {showBookingConfirmation && <BookingConfirmationPopup />}
    </div>
  );
};

export default RideDetails;