import React, { useState, useEffect } from 'react';
import { Clock, Bike, Users } from 'lucide-react';

const CounterCards = () => {
  // Initial and target values for counters
  const [ridesBooked, setRidesBooked] = useState(0);
  const [ridesOffered, setRidesOffered] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  
  // Target values
  const targetRidesBooked = 102;
  const targetRidesOffered = 119;
  const targetTotalUsers = 264;
  
  // Animation duration in ms
  const animationDuration = 2000;
  // Number of increments during animation
  const increments = 60;
  
  useEffect(() => {
    // Calculate increment size for each counter
    const incrementRidesBooked = targetRidesBooked / increments;
    const incrementRidesOffered = targetRidesOffered / increments;
    const incrementTotalUsers = targetTotalUsers / increments;
    
    // Calculate interval duration
    const intervalDuration = animationDuration / increments;
    
    // Start the animation
    const interval = setInterval(() => {
      setRidesBooked(prev => {
        const next = prev + incrementRidesBooked;
        return next >= targetRidesBooked ? targetRidesBooked : next;
      });
      
      setRidesOffered(prev => {
        const next = prev + incrementRidesOffered;
        return next >= targetRidesOffered ? targetRidesOffered : next;
      });
      
      setTotalUsers(prev => {
        const next = prev + incrementTotalUsers;
        return next >= targetTotalUsers ? targetTotalUsers : next;
      });
    }, intervalDuration);
    
    // Clear interval when all counters reach their targets
    if (ridesBooked >= targetRidesBooked && 
        ridesOffered >= targetRidesOffered && 
        totalUsers >= targetTotalUsers) {
      clearInterval(interval);
    }
    
    // Clean up on unmount
    return () => clearInterval(interval);
  }, [ridesBooked, ridesOffered, totalUsers]);
  
  // Card data for reusable component
  const cards = [
    {
      title: "Rides Booked",
      value: Math.floor(ridesBooked),
      icon: <Users className="w-12 h-12 text-blue-500" />,
      color: "bg-blue-100 border-blue-300"
    },
    {
      title: "Rides Offered",
      value: Math.floor(ridesOffered),
      icon: <Bike className="w-12 h-12 text-green-500" />,
      color: "bg-green-100 border-green-300"
    },
    {
      title: "Active Users",
      value: Math.floor(totalUsers),
      icon: <Clock className="w-12 h-12 text-purple-500" />,
      color: "bg-purple-100 border-purple-300"
    }
  ];
  
  return (
    <div className='relative bg-indigo-100 font-sans '>
       {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-indigo-300/20 to-purple-300/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-blue-300/20 to-cyan-300/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-violet-300/10 to-pink-300/10 rounded-full blur-3xl"></div>
      </div>
      
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
      
    <div className="w-full max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-8">RideShare Stats</h2>
      <div className="flex flex-row justify-center flex-wrap gap-6">
        {cards.map((card, index) => (
          <div 
            key={index} 
            className={`${card.color} border rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl flex flex-col items-center justify-center text-center w-64 h-64`}
          >
            <div className="mb-4">
              {card.icon}
            </div>
            <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
            <div className="text-4xl font-bold">{card.value.toLocaleString()}</div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default CounterCards;