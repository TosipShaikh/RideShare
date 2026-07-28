import React, { useRef, useState } from "react";
import { AlertCircle } from "lucide-react";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { reverseGeocode, searchLocations } from '../utils/mapApi.js';
import LocationRouteMap from './LocationRouteMap.jsx';


const OfferRide = () => {
  const navigate = useNavigate();
  // const navigateRidePlaced = ()=>{
  //   navigate("/rideplaced");
  // }

  const [formData, setFormData] = useState({
    startLocation: "",
    endLocation: "",
    date: "",
    time: "",
  });
  const [locationCoords, setLocationCoords] = useState({
    startLocation: null,
    endLocation: null,
  });

  const [suggestions, setSuggestions] = useState({ startLocation: [], endLocation: [] });
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
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "startLocation" || name === "endLocation") {
      handleSearch(value, name);
    }
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

  const rideData = {
    startLocation: formData.startLocation,
    endLocation: formData.endLocation,
    date: formData.date,
    time: formData.time,
  };

  try {
    const response = await fetch("http://localhost:5001/offer/postride", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Origin: "http://localhost:5173",
      },
      credentials: "include", // include cookies for auth
      body: JSON.stringify(rideData),
    });

    if (!response.ok) {
      if (response.status === 401) {
        toast.error("Unauthorized User!");
      } else {
        toast.error(`Error: ${response.statusText}`);
      }
      throw new Error(`HTTP error: ${response.status} ${response.statusText}`);
    }

    toast.success("Ride offered successfully!");
    console.log("Ride offer submitted successfully:", rideData);

    setFormData({
      startLocation: "",
      endLocation: "",
      date: "",
      time: "",
    });

    navigate("/rideplaced", {
      state: {
        startLocation: rideData.startLocation,
        endLocation: rideData.endLocation,
      },
    });
  } catch (error) {
    // Only show toast here if it wasn’t already shown above
    if (!error.message.includes("HTTP error")) {
      toast.error("Error while posting ride!");
    }
    console.error("Ride offer error:", error);
  }
};


  

  return (
    <div className="min-h-screen bg-indigo-100">
      <main className="container mx-auto px-4">
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Offer a Ride</h1>
            <p className="text-gray-600">Share your journey and help others travel efficiently</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="mb-6">
              <LocationRouteMap
                pickup={locationCoords.startLocation}
                dropoff={locationCoords.endLocation}
                onPickupMove={handlePickupMove}
                onDropoffMove={handleDropoffMove}
              />
            </div>

            <form onSubmit={handleSubmit} autoComplete="off">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Route Information</h2>
                <div className="space-y-4">
                  <div className="relative">
                    <label className="block text-gray-700 mb-2">Starting Point *</label>
                    <input
                      type="text"
                      name="startLocation"
                      value={formData.startLocation}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Enter your starting location"
                      required
                    />
                    {suggestions.startLocation.length > 0 && (
                      <ul className="absolute z-10 w-full bg-white border rounded shadow-lg max-h-60 overflow-y-auto">
                        {suggestions.startLocation.map((place, index) => (
                          <li
                            key={index}
                            className="px-4 py-2 cursor-pointer hover:bg-gray-200 text-sm"
                            onClick={() => handleLocationSelection("startLocation", place)}
                          >
                            {place.description}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="relative">
                    <label className="block text-gray-700 mb-2">Destination *</label>
                    <input
                      type="text"
                      name="endLocation"
                      value={formData.endLocation}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Enter your destination"
                      required
                    />
                    {suggestions.endLocation.length > 0 && (
                      <ul className="absolute z-10 w-full bg-white border rounded shadow-lg max-h-60 overflow-y-auto">
                        {suggestions.endLocation.map((place, index) => (
                          <li
                            key={index}
                            className="px-4 py-2 cursor-pointer hover:bg-gray-200 text-sm"
                            onClick={() => handleLocationSelection("endLocation", place)}
                          >
                            {place.description}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Schedule</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Date *</label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Time *</label>
                    <input
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium py-2 px-6 rounded-lg transition duration-300 shadow"
                >
                  Post Ride Offer
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OfferRide;