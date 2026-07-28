import React, { useState, useEffect } from 'react';
import { User, Phone, Car, DollarSign, Leaf } from 'lucide-react';
import axios from 'axios';

const UserProfile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/user/getuserdetails`, {
          withCredentials: true,
        });

        if (response.status === 200 && response.data.userDetails) {
          setUserDetails(response.data.userDetails);
        } else {
          throw new Error('Failed to fetch user details');
        }
      } catch (err) {
        console.error('Error fetching user details:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  // Example statistics (these could also come from the backend)
  const totalRides = 15;
  const moneySaved = 956;
  const carbonFootprintReduced = 150;

  return (
    <div className="min-h-screen bg-indigo-100 p-6 sm:p-8 lg:p-10">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
        </div>
      ) : error ? (
        <div className="text-center text-red-600 p-4 bg-white rounded-lg shadow">
          <p>{error}</p>
        </div>
      ) : userDetails ? (
        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white p-8 sm:p-10 flex items-center justify-between">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold mb-1">Welcome, {userDetails.fullName}!</h1>
              <p className="text-indigo-100 text-sm sm:text-base">Your RideShare Journey</p>
            </div>
            <div className="p-3 bg-white bg-opacity-20 rounded-full">
              <User className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
          </div>

          {/* User Details Section */}
          <div className="p-6 sm:p-8 border-b border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 bg-indigo-50 p-4 rounded-xl">
                <User className="w-6 h-6 text-indigo-600" />
                <div>
                  <p className="text-sm text-gray-600">Name</p>
                  <p className="font-semibold text-gray-800 text-lg">{userDetails.fullName}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-purple-50 p-4 rounded-xl">
                <Phone className="w-6 h-6 text-purple-600" />
                <div>
                  <p className="text-sm text-gray-600">Mobile Number</p>
                  <p className="font-semibold text-gray-800 text-lg">{userDetails.mobileNumber}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Ride Statistics Section */}
          <div className="p-6 sm:p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Impact</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Total Rides Card */}
              <div className="bg-blue-50 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-md">
                <div className="p-4 bg-blue-200 rounded-full mb-3">
                  <Car className="w-8 h-8 text-blue-700" />
                </div>
                <p className="text-sm text-gray-600 font-medium">Total Rides</p>
                <p className="text-4xl font-bold text-blue-800 mt-1">{totalRides}</p>
              </div>

              {/* Money Saved Card */}
              <div className="bg-green-50 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-md">
                <div className="p-4 bg-green-200 rounded-full mb-3">
                  <DollarSign className="w-8 h-8 text-green-700" />
                </div>
                <p className="text-sm text-gray-600 font-medium">Money Saved (₹)</p>
                <p className="text-4xl font-bold text-green-800 mt-1">₹{moneySaved}</p>
              </div>

              {/* Carbon Footprint Reduced Card */}
              <div className="bg-purple-50 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-md">
                <div className="p-4 bg-purple-200 rounded-full mb-3">
                  <Leaf className="w-8 h-8 text-purple-700" />
                </div>
                <p className="text-sm text-gray-600 font-medium">CO2 Reduced (kg)</p>
                <p className="text-4xl font-bold text-purple-800 mt-1">{carbonFootprintReduced}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-600 p-4 bg-white rounded-lg shadow">
          <p>No user details found</p>
        </div>
      )}
    </div>
  );
};

export default UserProfile;