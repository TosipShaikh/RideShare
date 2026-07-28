import React from 'react';
import { MapPin, Phone, Car, CreditCard, User } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const RideBookSuccess = () => {
  // Mock rider data (replace with actual data from props or backend)
  const location = useLocation();
  const {userStartLocation , userEndLocation,ride} = location.state || {};
  const riderDetails = {
    name: ride.driverName,
    phone: ride.driverNumber,
    vehicleType:ride.vehicleName,
    startLocation: ride.rideStart,
    endLocation: ride.rideEnd,
    price: ride.rideCost,
    image : ride.driverImage || "https://via.placeholder.com/150", 
  };
  console.log("Rider Details:", riderDetails);

  return (
    <div className="min-h-screen bg-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Confirmation Header */}
        <div className="bg-white shadow-2xl rounded-t-2xl p-6 text-center">
          <h1 className="text-3xl font-bold text-blue-600 mb-4">Ride Booked!</h1>
          <p className="text-gray-600 text-lg">
            Request to book ride sent. Rider will connect you instantly.
          </p>
        </div>

        {/* Rider Details Card */}
        <div className="bg-white shadow-2xl rounded-b-2xl p-6 space-y-4">
          {/* Rider Profile */}
          <div className="flex items-center space-x-4 border-b pb-4">
            <div className="bg-blue-100  rounded-full">
            <img
        src={riderDetails.image}
        alt="Driver photo"
        className="h-28 w-28 rounded-full border-4 object-cover"
      />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-800">{riderDetails.name}</h2>
              {/* <div className="flex items-center text-gray-600">
                <span className="mr-2">⭐</span>
                <span>{riderDetails.rating} Rating</span>
              </div> */}
            </div>
          </div>

          {/* Ride Details */}
          <div className="space-y-3">
            {/* Location Details */}
            <div className="flex items-center space-x-3">
              <MapPin className="h-6 w-6 text-green-500" />
              <div>
                <p className="font-medium text-gray-700">Start Location</p>
                <p className="text-gray-600">{riderDetails.startLocation}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="h-6 w-6 text-red-500" />
              <div>
                <p className="font-medium text-gray-700">End Location</p>
                <p className="text-gray-600">{riderDetails.endLocation}</p>
              </div>
            </div>

            {/* Vehicle Details */}
            <div className="flex items-center space-x-3">
              <Car className="h-6 w-6 text-blue-500" />
              <div>
                <p className="font-medium text-gray-700">Vehicle</p>
                <p className="text-gray-600">{riderDetails.vehicleType}</p>
              </div>
            </div>

            {/* Contact Details */}
            <div className="flex items-center space-x-3">
              <Phone className="h-6 w-6 text-purple-500" />
              <div>
                <p className="font-medium text-gray-700">Contact Number</p>
                <p className="text-gray-600">{riderDetails.phone}</p>
              </div>
            </div>

            {/* Pricing */}
            <div className="flex items-center space-x-3">
              <CreditCard className="h-6 w-6 text-green-500" />
              <div>
                <p className="font-medium text-gray-700">Ride Cost</p>
                <p className="text-gray-600">₹{riderDetails.price} </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4 mt-4">
            <button className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
              Call Rider
            </button>
            <button className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition">
              Chat
            </button>
          </div>
        </div>

        {/* Additional Information */}
        <div className="bg-white shadow-lg rounded-lg p-4 mt-4 text-center">
          <p className="text-gray-600">
            For further connectivity, you can refer to the rider details above.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RideBookSuccess;