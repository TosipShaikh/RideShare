import React from 'react';

const AboutUs = () => {
  return (
    <section className="bg-indigo-100 py-4 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">About RideShare</h2>
        
        <div className="grid md:grid-cols-2  gap-8 items-center mb-12">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 rounded-lg text-white">
            <h3 className="text-xl font-semibold mb-4">Our Mission</h3>
            <p className="mb-4">
              At RideShare, we're revolutionizing the way people commute by connecting motorcycle riders with passengers heading in the same direction. Our platform aims to reduce traffic congestion, lower carbon emissions, and create a community of travelers who share resources efficiently.
            </p>
            <p >
              We believe that thousands of empty motorcycle seats represent an untapped transportation resource that can make commuting more affordable, efficient, and environmentally friendly.
            </p>
          </div>
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 rounded-lg text-white">
            <h3 className="text-xl font-semibold mb-4">How It Works</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="bg-white text-black rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-1 font-bold text-sm">1</span>
                <span>Riders register their motorcycle and planned routes</span>
              </li>
              <li className="flex items-start">
                <span className="bg-white text-black rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-1 font-bold text-sm">2</span>
                <span>Passengers enter their start and end locations</span>
              </li>
              <li className="flex items-start">
                <span className="bg-white text-black rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-1 font-bold text-sm">3</span>
                <span>Our system matches compatible riders and passengers</span>
              </li>
              <li className="flex items-start">
                <span className="bg-white text-black rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-1 font-bold text-sm">4</span>
                <span>Passengers pay riders through our secure platform</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-6 text-center text-gray-700">Why Choose RideShare?</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-medium text-gray-800 mb-2">Cost-Effective</h4>
              <p className="text-gray-600 text-sm">Riders earn extra income while passengers save on transport costs</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-medium text-gray-800 mb-2">Eco-Friendly</h4>
              <p className="text-gray-600 text-sm">Reduce carbon emissions by sharing rides and optimizing travel routes</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h4 className="font-medium text-gray-800 mb-2">Community-Driven</h4>
              <p className="text-gray-600 text-sm">Connect with people in your area and build a trusted network of commuters</p>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-700 mb-6">Founded in 2025, RideShare is committed to transforming urban mobility through innovative, community-based solutions.</p>
          <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium transition duration-300">Join Our Community</button>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;