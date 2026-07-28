import React from 'react';
import { MapPin, Clock, IndianRupee, User, Star, Bike, Search, ArrowRight , ArrowLeft } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const RideResults = () => {
  
  const navigate = useNavigate();
  const location = useLocation();
  const {rides, userStartLocation, userEndLocation, date, time} = location.state || {};

  console.log("om  ",{rides, userStartLocation, userEndLocation, date, time});

  const handleSubmit = async (ride) => {
    navigate("/ridedetails", {state : {ride , userStartLocation , userEndLocation , date , time}} );
    console.log("Ride Id:", ride.rideId);
  };

  const handleSearchRide = () => {
    navigate("/searchride"); // Navigate to search page
  };

  const handleGoBack = () => {
    navigate(-1);
  };
    
  if (!Array.isArray(rides)) {
    console.error('Rides prop must be an array');
    return null;
  }

return (
  <div className="min-h-screen bg-indigo-100">
    {/* Header - Full width background, and acts as the main flex container for its content */}
    {/* px-4 applies the padding from the screen edge, py-4/py-6 for vertical padding */}
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 sm:py-6 px-4">
      {/* This inner div creates the max-width and centers the main content of the header */}
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        
        {/* Leftmost item: Back Button */}
        {/* -ml-2 pushes the button slightly into the px-4 padding, making it visually more "leftmost" */}
        <button
          onClick={handleGoBack}
          className="p-2 -ml-2 rounded-full hover:bg-white/20 transition-colors flex-shrink-0"
          aria-label="Go back"
        >
          <ArrowLeft size={24} />
        </button>

        {/* Center Area: Title and Subtitle (flex-grow allows it to take available space) */}
        <div className="flex-grow text-center mx-4"> {/* mx-4 provides horizontal space from buttons */}
          <h1 className="text-xl sm:text-2xl font-bold truncate">Available Rides</h1> {/* Adjusted size, added truncate */}
          <p className="text-indigo-100 text-sm">
            Found {rides.length} ride{rides.length !== 1 ? 's' : ''} for your journey
          </p>
        </div>

        {/* Rightmost item: Search Ride Button */}
        <button
          onClick={handleSearchRide}
          className="bg-white text-indigo-600 hover:bg-indigo-50 px-4 py-2 sm:px-6 sm:py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl text-sm flex-shrink-0"
        >
          <Search size={18} />
          <span className="hidden sm:inline">Search</span> {/* Hide text on small screens if too cramped */}
        </button>
      </div>
    </div>

    {/* Results Section (rest of your page content) */}
    {/* This section still uses its own max-width and padding for content alignment */}
    <div className="max-w-6xl mx-auto px-4 py-8">
      {rides.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {rides.map((ride, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group"
            >
              <div className="p-6">
                {/* Driver Info Section */}
                <div className="flex items-start space-x-4 mb-6">
                  {/* Profile Photo */}
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center">
                      <User className="w-7 h-7 text-indigo-600" />
                    </div>
                  </div>

                  {/* Driver Details */}
                  <div className="flex-grow min-w-0">
                    <div className="flex justify-between items-start">
                      <div className="min-w-0 flex-1">
                        <h2 className="text-lg font-semibold text-gray-800 mb-1 truncate">
                          {ride.driverName}
                        </h2>
                        <div className="flex items-center text-sm text-gray-500">
                          <Star size={14} className="fill-yellow-400 text-yellow-400 mr-1" />
                          <span>4.8 (120 rides)</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end ml-4">
                        <div className="flex items-center text-xl font-bold text-green-600 mb-1">
                          <IndianRupee size={18} />
                          <span>{ride.rideCost}</span>
                        </div>
                        <span className="text-sm text-gray-500">per seat</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Route Section */}
                <div className="mb-6">
                  <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                    <div className="flex items-start space-x-3">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-500">From</p>
                        <p className="text-gray-800 font-medium break-words">{ride.rideStart}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-center">
                      <div className="w-px h-6 bg-gray-300"></div>
                    </div>
                    
                    <div className="flex items-start space-x-3">
                      <div className="w-3 h-3 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-500">To</p>
                        <p className="text-gray-800 font-medium break-words">{ride.rideEnd}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Vehicle & Time Info */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                      <Clock className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-500">Departure</p>
                      <p className="text-gray-800 font-medium text-sm">{ride.rideStartTime}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Bike className="w-5 h-5 text-purple-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-500">Vehicle</p>
                      <p className="text-gray-800 font-medium text-sm truncate">{ride.vehicleName}</p>
                    </div>
                  </div>
                </div>
                
                {/* Action Button */}
                <button 
                  onClick={() => handleSubmit(ride)}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-lg"
                >
                  Check Out Ride
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="bg-gradient-to-br from-red-100 to-pink-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
            <MapPin className="w-12 h-12 text-red-600" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">No Rides Available</h2>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            We couldn't find any rides for your route at the moment. 
            Try adjusting your search criteria or check back later.
          </p>
          <button 
            onClick={handleSearchRide}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-200 inline-flex items-center gap-2"
          >
            <Search size={18} />
            Search Again
          </button>
        </div>
      )}
    </div>
  </div>
);
};

export default RideResults;