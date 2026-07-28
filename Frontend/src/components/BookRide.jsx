import React, { useState } from 'react';
import { User, Phone, MapPin } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

const BookRide = () => {
    const location = useLocation();
    const {userStartLocation , userEndLocation , rideId} = location.state || {};
  const [userName, setUserName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [isValidMobile, setIsValidMobile] = useState(true);

  const handleMobileChange = (e) => {
    const inputMobile = e.target.value;
    setMobileNumber(inputMobile);
    // Basic mobile number validation
    setIsValidMobile(
      /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im.test(inputMobile)
    );
  };

  const handleConfirmBooking = async () => {
    if (userName.trim() && isValidMobile) {
      console.log('Booking Confirmed', { userName, mobileNumber });
        try{
            const userData = {
                name : userName,
                mobileNumber : mobileNumber,
                startLocation : userStartLocation,
                endLocation : userEndLocation,
                rideId : rideId
            }
            console.log(userData);
            const response = await fetch("http://localhost:5001/offer/matchride",
               {
                 method : "POST",
                headers : {"Content-Type": "application/json"},
                 body : JSON.stringify(userData)
               }
            );
            toast.success("Ride booked successfully!!");
        }
        catch(error)
        {
            toast.error("Error while booking Ride!");
        }
    } else {
      // Optionally show error or prevent submission
      alert('Please enter valid name and mobile number');
    }
  };

  return (
    <div className="min-h-screen bg-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
          <h2 className="text-2xl font-bold text-white text-center">
            Book Your Ride
          </h2>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Name Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="w-5 h-5 text-gray-400" />
            </div>
            <input 
              type="text"
              placeholder="Your Full Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 
              rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 
              focus:border-transparent transition duration-300"
            />
          </div>

          {/* Mobile Number Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Phone className="w-5 h-5 text-gray-400" />
            </div>
            <input 
              type="tel"
              placeholder="Mobile Number"
              value={mobileNumber}
              onChange={handleMobileChange}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg 
              focus:outline-none focus:ring-2 transition duration-300
              ${isValidMobile 
                ? 'border-gray-300 focus:ring-blue-500' 
                : 'border-red-500 focus:ring-red-500 text-red-600'}`}
            />
            {!isValidMobile && mobileNumber && (
              <p className="text-red-500 text-sm mt-1">
                Please enter a valid mobile number
              </p>
            )}
          </div>

          {/* Confirm Booking Button */}
          <button 
            onClick={handleConfirmBooking}
            disabled={!userName.trim() || !isValidMobile}
            className="w-full py-3 bg-blue-600 text-white rounded-lg 
            hover:bg-blue-700 transition duration-300 flex items-center 
            justify-center space-x-2 
            disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            <MapPin className="w-5 h-5" />
            <span>Confirm Booking</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookRide;