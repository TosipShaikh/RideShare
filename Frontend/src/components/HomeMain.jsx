import React, { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft, Users, Bike, Calendar, MapPin, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

function HomeMain() {
  const navigate = useNavigate();

  const images = ["rideshare1.png", "rideshare2.png","rideshare3.png","rideshare4.png","rideshare5.png"];

  const navigateToBookPage = () => navigate("/searchride");
  const navigateToOfferRide = () => navigate("/offer");

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const autoRotateInterval = 5000; // Extended to 5 seconds for better visibility

  const nextImage = () => setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  const prevImage = () => setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));

  const [progressBarKey, setProgressBarKey] = useState(0); 
  useEffect(() => {
    setProgressBarKey(prevKey => prevKey + 1); 
  }, [currentImageIndex, isPaused]);

  useEffect(() => {
    let intervalId;
    if (!isPaused) {
      intervalId = setInterval(() => {
        nextImage();
      }, autoRotateInterval);
    }
    return () => clearInterval(intervalId);
  }, [isPaused, currentImageIndex]); 

  return (
    <div className="relative min-h-screen bg-indigo-100 font-sans overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-60 -right-60 w-[400px] h-[400px] bg-gradient-to-br from-indigo-300/10 to-purple-300/10 rounded-full blur-3xl opacity-70"></div>
        <div className="absolute -bottom-60 -left-60 w-[400px] h-[400px] bg-gradient-to-tr from-blue-300/10 to-cyan-300/10 rounded-full blur-3xl opacity-70"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-gradient-to-r from-violet-300/5 to-pink-300/5 rounded-full blur-3xl opacity-60"></div>
      </div>
      
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.02)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      
      <div className="container mx-auto px-6 py-10 md:py-16 relative z-10"> {/* Decreased py- values here */}
        {/* Main Content Container */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-20">
          
          {/* Left Column - Text Content */}
          <div className="w-full md:w-1/2 text-slate-800 space-y-8 lg:space-y-10">
            <div className="space-y-6 lg:space-y-8">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-indigo-500/15 to-purple-500/15 border border-indigo-300/40 backdrop-blur-sm shadow-sm">
                <div className="w-2.5 h-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-indigo-800 tracking-wide">
                  #1 Community Ridesharing
                </span>
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight">
                <span className="bg-gradient-to-r from-slate-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent">
                  Smarter Commutes,
                </span>
                <br />
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent drop-shadow-md">
                  Better Journeys
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl md:text-2xl text-slate-600 max-w-xl leading-relaxed font-light">
                Connect with fellow travelers heading your way. Share rides,
                reduce costs, and contribute to a greener planet while forging
                new connections.
              </p>
            </div>
            
            {/* Call to Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 pt-4">
              <button
                className="group relative px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden flex items-center justify-center"
                onClick={navigateToBookPage}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center justify-center gap-3">
                  <Users className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                  Search a Ride
                </div>
              </button>
              
              <button
                className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden flex items-center justify-center"
                onClick={navigateToOfferRide}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center justify-center gap-3">
                  <Bike className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                  Offer a Ride
                </div>
              </button>
            </div>
            
            {/* Social Proof Section */}
            <div className="pt-8 border-t border-slate-200/50 mt-10">
              <p className="text-sm text-slate-500 mb-3 font-medium">Trusted by millions of commuters worldwide</p>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 text-amber-400 fill-current drop-shadow-sm" />
                  ))}
                </div>
                <span className="ml-2 text-slate-700 font-semibold text-lg">4.9/5</span>
                <span className="text-slate-500 text-base">from 100+ satisfied users</span>
              </div>
            </div>
          </div>
          
          {/* Right Column - Image Carousel */}
          <div
            className="relative w-full max-w-2xl mx-auto md:mx-0 lg:max-w-2xl" 
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/50 backdrop-blur-sm bg-white/5">
              {/* Main Image Container with Fixed Dimensions */}
              <div className="relative w-full" style={{ paddingBottom: "66.67%" }}> 
                <img
                  src={images[currentImageIndex]}
                  alt={`Rideshare experience ${currentImageIndex + 1}`}
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out"
                  style={{
                    position: 'absolute',
                    height: '100%',
                    width: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center'
                  }}
                />
                
                {/* Image Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
              </div>
              
              {/* Progress Bar */}
              <div className="absolute bottom-0 left-0 w-full h-2 bg-white/20 backdrop-blur-sm">
                <div
                  key={progressBarKey}
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg"
                  style={{
                    width: isPaused ? "0%" : "100%",
                    transitionDuration: isPaused ? "0ms" : `${autoRotateInterval}ms`,
                    transitionProperty: "width",
                    transitionTimingFunction: "linear",
                  }}
                />
              </div>
              
              {/* Navigation Buttons */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm text-slate-800 rounded-full p-3 shadow-xl hover:bg-white hover:shadow-2xl transition-all duration-300 hover:scale-110"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm text-slate-800 rounded-full p-3 shadow-xl hover:bg-white hover:shadow-2xl transition-all duration-300 hover:scale-110"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
              
              {/* Image Counter */}
              <div className="absolute bottom-6 right-6 bg-slate-900/70 backdrop-blur-sm text-white px-5 py-2.5 rounded-full text-sm font-medium shadow-xl">
                {currentImageIndex + 1} / {images.length}
              </div>
            </div>
            
            {/* Image Indicators */}
            <div className="flex justify-center mt-6 space-x-3">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`h-3.5 rounded-full transition-all duration-300 shadow-sm ${
                    index === currentImageIndex 
                      ? "bg-gradient-to-r from-indigo-500 to-purple-500 w-8 shadow-lg" 
                      : "bg-slate-400 hover:bg-slate-500 w-3.5"
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
            
            {/* Image Caption */}
            <div className="text-center mt-8 text-slate-600 italic text-md font-medium max-w-sm mx-auto">
              Join thousands of satisfied commuters on their daily journeys and make a positive impact!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeMain;