import React, { useRef, useState } from 'react';
import { MapPin, Navigation, Calendar, Clock, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { reverseGeocode, searchLocations } from '../utils/mapApi.js';
import LocationRouteMap from './LocationRouteMap.jsx';

const SearchRidePage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    startLocation: '',
    endLocation: '',
    date: '',
    time: '',
  });
  const [locationCoords, setLocationCoords] = useState({
    startLocation: null,
    endLocation: null,
  });
  const [suggestions, setSuggestions] = useState({ startLocation: [], endLocation: [] });
  const [isLoading, setIsLoading] = useState(false);
  const searchTimersRef = useRef({ startLocation: null, endLocation: null });
  const AUTOCOMPLETE_DELAY_MS = 700;

  const handleSearch = async (query, field) => {
    if (searchTimersRef.current[field]) {
      clearTimeout(searchTimersRef.current[field]);
    }

    if (!query || query.length < 4) {
      setSuggestions((prev) => ({ ...prev, [field]: [] }));
      return;
    }

    searchTimersRef.current[field] = setTimeout(async () => {
      try {
        const predictionsList = await searchLocations(query);
        setSuggestions((prev) => ({
          ...prev,
          [field]: predictionsList,
        }));
      } catch (error) {
        console.error("Error fetching location suggestions:", error);
      }
    }, AUTOCOMPLETE_DELAY_MS);
  };

  const handleLocationSelection = (field, place) => {
    setFormData((prev) => ({
      ...prev,
      [field]: place.description,
    }));

    setLocationCoords((prev) => ({
      ...prev,
      [field]: {
        lat: place.lat,
        lng: place.lng,
      },
    }));

    setSuggestions((prev) => ({ ...prev, [field]: [] }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "startLocation" || name === "endLocation") {
      handleSearch(value, name);
    }
  };

  const handlePickupMove = async ({ lat, lng }) => {
    try {
      const resolved = await reverseGeocode(lat, lng);
      setLocationCoords((prev) => ({
        ...prev,
        startLocation: { lat, lng },
      }));
      if (resolved?.description) {
        setFormData((prev) => ({
          ...prev,
          startLocation: resolved.description,
        }));
      }
    } catch (error) {
      console.error("Error resolving pickup location:", error);
    }
  };

  const handleDropoffMove = async ({ lat, lng }) => {
    try {
      const resolved = await reverseGeocode(lat, lng);
      setLocationCoords((prev) => ({
        ...prev,
        endLocation: { lat, lng },
      }));
      if (resolved?.description) {
        setFormData((prev) => ({
          ...prev,
          endLocation: resolved.description,
        }));
      }
    } catch (error) {
      console.error("Error resolving destination location:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5001/book/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Origin": "http://localhost:5173"
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Failed to search rides: ${response.statusText}`);
      }

      const data = await response.json();
      // Navigate to search results page with the received data
      console.log('Backend Response:', data);
      console.log('Rides from backend:', data.rides);
      
      // Ensure rides is always an array
      const rides = Array.isArray(data.rides) ? data.rides : [];
      console.log('Navigation Data:', {
      rides: rides,
      userStartLocation: formData.startLocation,
      userEndLocation: formData.endLocation,
      date: formData.date,
      time: formData.time
    });
      navigate("/rideresults", { state: { rides: data.rides  , userStartLocation : formData.startLocation , userEndLocation : formData.endLocation , date : formData.date , time : formData.time} });
    } catch (error) {
      console.error("Error searching rides:", error);
      alert("Failed to search rides. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-indigo-100 ">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-3">Search For a Ride</h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Enter your journey details below to find available rides that match your route and schedule.
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Decorative Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 h-16 w-full relative">
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white rounded-full p-3 shadow-md">
              <div className="bg-black rounded-full w-10 h-10 flex items-center justify-center">
                <Navigation className="text-white" size={20} />
              </div>
            </div>
          </div>

              <div className="px-6 pt-6 md:px-10">
                <LocationRouteMap
                  pickup={locationCoords.startLocation}
                  dropoff={locationCoords.endLocation}
                  onPickupMove={handlePickupMove}
                  onDropoffMove={handleDropoffMove}
                />
              </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="pt-12 px-6 pb-8 md:px-10">
            <div className="space-y-6">
              {/* Start Location */}
              <div className="relative">
                <label htmlFor="startLocation" className="block text-sm font-medium text-gray-700 mb-2">Pickup Location</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="startLocation"
                    value={formData.startLocation}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-black focus:border-black"
                    placeholder="Enter your pickup location"
                    required
                  />
                  {suggestions.startLocation.length > 0 && (
                    <ul className="absolute z-10 w-full bg-white border rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto">
                      {suggestions.startLocation.map((place, index) => (
                        <li
                          key={index}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                          onClick={() => handleLocationSelection("startLocation", place)}
                        >
                          {place.description}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* End Location */}
              <div className="relative">
                <label htmlFor="endLocation" className="block text-sm font-medium text-gray-700 mb-2">Destination</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Navigation className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="endLocation"
                    value={formData.endLocation}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your destination"
                    required
                  />
                  {suggestions.endLocation.length > 0 && (
                    <ul className="absolute z-10 w-full bg-white border rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto">
                      {suggestions.endLocation.map((place, index) => (
                        <li
                          key={index}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                          onClick={() => handleLocationSelection("endLocation", place)}
                        >
                          {place.description}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {/* Date and Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>

                <div className="relative">
                  <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Clock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="mt-6">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-6 rounded-lg transition duration-300 flex items-center justify-center font-medium text-lg disabled:bg-blue-400"
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Searching...
                    </span>
                  ) : (
                    <>
                      <Search className="mr-2" size={20} />
                      Find Rides
                    </>
                  )}
                </button>
              </div>
          </form>

          {/* Additional Information */}
          <div className="bg-gray-50 px-6 py-4 md:px-10">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-sm text-gray-600">
                You'll be able to see available rides, their prices, and driver ratings before booking.
              </p>
            </div>
          </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 m-8 md:grid-cols-3 gap-6 mt-10">
          {/* Card 1 */}
          <div className="bg-blue-200 p-6 rounded-lg shadow-xl border border-gray-100">
            <div className="text-blue-600 mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Verified Drivers</h3>
            <p className="text-gray-600">All drivers are verified and rated by other users for your safety.</p>
          </div>

          {/* Card 2 */}
          <div className="bg-green-200 p-6 rounded-lg shadow-xl border border-gray-100">
            <div className="text-green-600 mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Affordable Pricing</h3>
            <p className="text-gray-600">Save money by sharing the cost of your journey with others.</p>
          </div>

          {/* Card 3 */}
          <div className="bg-purple-200  p-6 rounded-lg shadow-xl border border-gray-100">
            <div className="text-purple-600 mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Flexible Timing</h3>
            <p className="text-gray-600">Find rides that match your schedule, morning or evening.</p>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default SearchRidePage;