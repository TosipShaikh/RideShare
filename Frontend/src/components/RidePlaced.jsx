import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
const RidePlaced = () => {
  const location = useLocation();
  const [dots, setDots] = useState('');
  const [progress, setProgress] = useState(0);
  const {startLocation , endLocation} = location.state;
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress(prev => prev < 100 ? prev + 1 : prev);
    }, 100);

    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-indigo-100 flex items-center justify-center px-4">
      <div className="bg-gray-100 rounded-2xl shadow-lg p-8 m-5 w-full max-w-4xl transform transition-all animate-fade-in">
        {/* Success Circle Animation */}
        <div className="w-20 h-20 mx-auto mb-8 relative">
          <div className="absolute inset-0 rounded-full border-4 border-green-500 animate-[circle-scale_0.3s_ease-in-out]"></div>
          <svg 
            className="w-full h-full text-green-500 animate-[check-stroke_0.6s_ease-in-out_forwards]" 
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 6L9 17l-5-5"/>
          </svg>
        </div>

        {/* Updated Success Message */}
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
          Ride Offer Posted Successfully!
        </h2>
        
        {/* Updated Status Message */}
        <p className="text-center text-gray-600 text-lg mb-6">
          Looking for travel partners{dots}
        </p>

        {/* Ride Details Section */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="mb-4">
            <h3 className="font-semibold text-gray-800 mb-2">Your Route</h3>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-sm">A</span>
                </div>
                <p className="text-gray-700 text-sm flex-1">{startLocation}</p>
              </div>
              <div className="h-6 border-l-2 border-dashed border-gray-300 ml-3"></div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-red-600 text-sm">B</span>
                </div>
                <p className="text-gray-700 text-sm flex-1">{endLocation}</p>
              </div>
            </div>
          </div>
          
          {/* Partner Finding Status */}
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                  Finding Travel Partners
                </span>
              </div>
              <div className="text-right">
                <span className="text-xs font-semibold inline-block text-blue-600">
                  {progress}%
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-100">
              <div
                style={{ width: `${progress}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-500"
              ></div>
            </div>
          </div>
        </div>

        {/* Enhanced Driver Guidelines */}
        <div className="border-t pt-6 mt-6">
          <h3 className="font-semibold text-gray-800 mb-6 text-xl text-center">Driver Guidelines</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Punctuality</h4>
                  <p className="text-sm text-gray-600">Arrive 5 minutes early at the pickup point</p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Verify Identity</h4>
                  <p className="text-sm text-gray-600">Check partner's ID before starting journey</p>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Follow Speed Limits</h4>
                  <p className="text-sm text-gray-600">Maintain safe driving speed throughout</p>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Keep Documents Ready</h4>
                  <p className="text-sm text-gray-600">Have license and registration accessible</p>
                </div>
              </div>
            </div>

            <div className="bg-red-50 p-4 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">No Distractions</h4>
                  <p className="text-sm text-gray-600">Avoid phone use while driving</p>
                </div>
              </div>
            </div>

            <div className="bg-teal-50 p-4 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">Vehicle Check</h4>
                  <p className="text-sm text-gray-600">Ensure vehicle is in good condition</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cancel Ride Option */}
        <div className="mt-6 text-center">
          <button className="bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition-colors border-2 border-red-500 hover:border-red-600 rounded-lg px-6 py-2">
            Cancel Ride Offer
          </button>
        </div>

      </div>
    </div>
  );
};

export default RidePlaced;