import React from 'react';
import { Bike, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RegistrationOptions = () => {
  const navigate = useNavigate();
  const navigateToUserSignUp = ()=>{
    navigate("/usersignup");
  }

  const navigateToDriverSignUp = ()=>{
    navigate("/signup");
  }

  return (
     <div className="min-h-screen bg-indigo-100 pt-20 px-4"> 
    {/* Inner div: Max width, full width on small screens, centered horizontally with mx-auto. */}
    {/* Its height will now be determined by its content, not by stretching. */}
    <div className="max-w-4xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden mx-auto">
        {/* Decorative elements */}
        
        
        <div className="relative flex flex-col md:flex-row">
          {/* Left side - Image/Decorative */}
          <div className="w-full md:w-1/2 bg-gradient-to-r from-indigo-600 to-purple-600 p-12 text-white flex flex-col justify-center">
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-4">Welcome to RideShare</h1>
              <p className="text-blue-100 text-lg">
                Join our community and transform the way you travel. Whether you're offering rides or looking for one, we've got you covered.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-white/20 p-2 rounded-full mr-3">
                  <Bike className="w-6 h-6" />
                </div>
                <p>Save money on your daily commute</p>
              </div>
              <div className="flex items-start">
                <div className="bg-white/20 p-2 rounded-full mr-3">
                  <User className="w-6 h-6" />
                </div>
                <p>Connect with people on your route</p>
              </div>
              <div className="flex items-start">
                <div className="bg-white/20 p-2 rounded-full mr-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p>Reduce carbon emissions together</p>
              </div>
            </div>
          </div>
          
          {/* Right side - Registration Options */}
          <div className="w-full md:w-1/2 p-12 flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Choose Your Path</h2>
            
            <div className="space-y-6">
              <button 
                onClick={navigateToUserSignUp}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600  text-white transition-all py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 duration-300 flex items-center justify-center group"
              >
                <User className="w-6 h-6 mr-3 text-white group-hover:scale-110 transition-transform duration-300" />
                <span className="text-lg font-semibold">Register as Passenger</span>
              </button>
              
              <div className="relative flex items-center justify-center">
                <div className="flex-grow h-px bg-gray-200"></div>
                <div className="mx-4 text-gray-500">or</div>
                <div className="flex-grow h-px bg-gray-200"></div>
              </div>
              
              <button 
                onClick={navigateToDriverSignUp}
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white transition-all py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 duration-300 flex items-center justify-center group"
              >
                <Bike className="w-6 h-6 mr-3 text-white group-hover:scale-110 transition-transform duration-300" />
                <span className="text-lg font-semibold">Register as Rider</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationOptions;