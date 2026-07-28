import React from 'react';
import { 
  LineChart, BarChart, Line, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { 
  MapPin, Fuel, Users, Share2, Leaf, 
  PieChart, DollarSign , Hash, Bike, Clock, TrendingUp
} from 'lucide-react';
import { useLocation, useNavigate} from 'react-router-dom';

const DriverProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {name , image ,vehicleName,vehicleNumber } = location.state || {};

  const offerRide = () => {
    navigate("/offer");
  }

  const navigateToRideHistoryPage = () => {
    navigate("/driverridehistory");
  }

  // Sample data focused on personal ride-sharing metrics
  const userInfo = {
    name: name || "MotoShare Driver", // Fallback for name if not passed
    vehicleName: vehicleName || "Royal Enfield", // Fallback
    vehicleNumber : vehicleNumber || "MH12AB1234", // Fallback
    image : image || "https://via.placeholder.com/150", // Fallback image
    totalRides: 42,
    ridesSaved: 18,
    co2Reduced: 95, // in kg
    fuelSaved: {
      liters: 65,
      monetary: "₹3,250"
    },
    monthlyRideSharing: [
      { month: 'Oct', rides: 5 },
      { month: 'Nov', rides: 7 },
      { month: 'Dec', rides: 6 },
      { month: 'Jan', rides: 8 },
      { month: 'Feb', rides: 9 },
      { month: 'Mar', rides: 11 },
    ],
    fuelSavings: [
      { month: 'Oct', savings: 8 },
      { month: 'Nov', savings: 10 },
      { month: 'Dec', savings: 9 },
      { month: 'Jan', savings: 12 },
      { month: 'Feb', savings: 14 },
      { month: 'Mar', savings: 16 },
    ]
  };

  const recentRides = [
    { 
      id: 1, 
      date: "23 Mar, 2025", 
      from: "Pune", 
      to: "Mumbai", 
      passengers: 2, 
      fuelSaved: "₹120" 
    },
    { 
      id: 2, 
      date: "22 Mar, 2025", 
      from: "Nashik", 
      to: "Pune", 
      passengers: 3, 
      fuelSaved: "₹180" 
    },
    { 
        id: 3, 
        date: "21 Mar, 2025", 
        from: "Satara", 
        to: "Kolhapur", 
        passengers: 1, 
        fuelSaved: "₹80" 
      },
      { 
        id: 4, 
        date: "20 Mar, 2025", 
        from: "Goa", 
        to: "Pune", 
        passengers: 2, 
        fuelSaved: "₹200" 
      },
  ];

  return (
    <div className="min-h-screen bg-indigo-100 p-4 md:p-8">
      {/* User Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 transform hover:scale-[1.005] transition-transform duration-300 ease-in-out">
        <div className="flex flex-col md:flex-row items-center justify-between w-full">
          {/* Left Side: User Photo and Info */}
          <div className="flex flex-col md:flex-row items-center text-center md:text-left mb-6 md:mb-0">
            <div className="relative mb-4 md:mb-0 md:mr-6">
              <img
                src={userInfo.image}
                alt="Driver photo"
                className="h-28 w-28 rounded-full border-4 border-purple-500 object-cover shadow-md"
              />
              <span className="absolute bottom-2 right-2 h-5 w-5 bg-green-500 rounded-full border-3 border-white shadow-sm"></span>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-extrabold text-gray-800 tracking-tight">
                {userInfo.name}'s Ride Sharing Impact
              </span>
              <p className="text-purple-600 font-medium mt-2 text-lg">Personal Bike • Ride Sharing Contributor</p>
            </div>
          </div>

          {/* Right Side: Vehicle Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full md:w-auto">
            {/* Vehicle Name Box */}
            <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-4 flex items-center space-x-4 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="bg-indigo-100 p-3 rounded-full">
                <Bike className="h-7 w-7 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-md font-semibold text-gray-700">Bike Model</h3>
                <p className="text-xl font-bold text-indigo-800">{userInfo.vehicleName}</p>
              </div>
            </div>

            {/* Vehicle Number Box */}
            <div className="bg-purple-50 border border-purple-200 rounded-xl p-4 flex items-center space-x-4 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="bg-purple-100 p-3 rounded-full">
                <Hash className="h-7 w-7 text-purple-600" />
              </div>
              <div>
                <h3 className="text-md font-semibold text-gray-700">Bike Number</h3>
                <p className="text-xl font-bold text-purple-800">{userInfo.vehicleNumber}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Impact Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-5 rounded-2xl shadow-sm flex flex-col items-center justify-center text-center transition-transform hover:scale-105 duration-200">
          <div className="p-3 bg-indigo-100 rounded-full mb-2">
            <Users className="h-6 w-6 text-indigo-600" />
          </div>
          <p className="text-sm text-gray-600 font-medium">Total Shared Rides</p>
          <p className="mt-1 text-2xl font-bold text-indigo-800">{userInfo.totalRides}</p>
        </div>
        
        <div className="bg-white p-5 rounded-2xl shadow-sm flex flex-col items-center justify-center text-center transition-transform hover:scale-105 duration-200">
          <div className="p-3 bg-green-100 rounded-full mb-2">
            <Leaf className="h-6 w-6 text-green-600" />
          </div>
          <p className="text-sm text-gray-600 font-medium">CO2 Reduced</p>
          <p className="mt-1 text-2xl font-bold text-green-800">{userInfo.co2Reduced} kg</p>
        </div>
        
        <div className="bg-white p-5 rounded-2xl shadow-sm flex flex-col items-center justify-center text-center transition-transform hover:scale-105 duration-200">
          <div className="p-3 bg-purple-100 rounded-full mb-2">
            <Fuel className="h-6 w-6 text-purple-600" />
          </div>
          <p className="text-sm text-gray-600 font-medium">Fuel Saved</p>
          <p className="mt-1 text-2xl font-bold text-purple-800">{userInfo.fuelSaved.liters} L</p>
        </div>
        
        <div className="bg-white p-5 rounded-2xl shadow-sm flex flex-col items-center justify-center text-center transition-transform hover:scale-105 duration-200">
          <div className="p-3 bg-pink-100 rounded-full mb-2"> {/* Changed to pink for contrast with purple */}
            <DollarSign className="h-6 w-6 text-pink-600" />
          </div>
          <p className="text-sm text-gray-600 font-medium">Fuel Cost Saved</p>
          <p className="mt-1 text-2xl font-bold text-pink-800">{userInfo.fuelSaved.monetary}</p>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Charts */}
        <div className="lg:col-span-2 space-y-6">
          {/* Ride Sharing Performance */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-5">Ride Sharing Performance</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Monthly Rides Chart */}
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
                    <TrendingUp className="h-5 w-5 text-indigo-500 mr-2" /> Monthly Shared Rides
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={userInfo.monthlyRideSharing} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} style={{ fontSize: '12px' }} />
                      <YAxis axisLine={false} tickLine={false} style={{ fontSize: '12px' }} />
                      <Tooltip cursor={{ fill: 'rgba(100, 100, 200, 0.1)' }} />
                      <Bar dataKey="rides" fill="#6a0dad" radius={[4, 4, 0, 0]} /> {/* Darker purple */}
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              {/* Fuel Savings Chart */}
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center">
                    <Fuel className="h-5 w-5 text-purple-500 mr-2" /> Fuel Savings (Liters)
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={userInfo.fuelSavings} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} style={{ fontSize: '12px' }} />
                      <YAxis axisLine={false} tickLine={false} style={{ fontSize: '12px' }} />
                      <Tooltip formatter={(value) => [`${value} L`, 'Fuel Saved']} cursor={{ fill: 'rgba(100, 100, 200, 0.1)' }} />
                      <Line 
                        type="monotone" 
                        dataKey="savings" 
                        stroke="#8a2be2" // A vibrant purple
                        strokeWidth={3} 
                        dot={{ r: 5, fill: '#8a2be2', stroke: '#fff', strokeWidth: 2 }} 
                        activeDot={{ r: 8, fill: '#8a2be2', stroke: '#fff', strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Additional Information */}
        <div className="space-y-6">
          {/* Environmental Impact */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-5">Your Green Impact</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <Leaf className="h-6 w-6 text-green-600 mr-2" />
                  <span className="text-base text-gray-700 font-medium">Trees Saved (Equivalent)</span>
                </div>
                <span className="font-bold text-xl text-green-800">2.4</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-indigo-50 rounded-lg shadow-sm">
                <div className="flex items-center">
                  <Share2 className="h-6 w-6 text-indigo-600 mr-2" />
                  <span className="text-base text-gray-700 font-medium">Rides Shared</span>
                </div>
                <span className="font-bold text-xl text-indigo-800">{userInfo.ridesSaved}</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-5">Quick Actions</h2>
            
            <div className="space-y-4">
              <button 
                onClick={offerRide}
                className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-lg transform hover:scale-[1.01]"
              >
                <Bike className="h-5 w-5 mr-2" />
                Offer a New Ride
              </button>
              <button 
              onClick={navigateToRideHistoryPage}
              className="w-full flex items-center justify-center px-6 py-3 bg-white border-2 border-indigo-300 text-indigo-700 font-semibold rounded-xl hover:bg-indigo-50 transition-all duration-300 shadow-sm transform hover:scale-[1.01]">
                <Clock className="h-5 w-5 mr-2" />
                View Ride History
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Rides Table */}
      <div className="bg-white rounded-2xl shadow-lg p-6 m-6 mt-6"> {/* Added margin top for separation */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold text-gray-800">Recent Shared Rides</h2>
          <button className="text-md text-indigo-600 hover:text-indigo-800 font-semibold transition-colors duration-200">
            View all
            <span className="ml-1 inline-block transform translate-y-[1px]">&rarr;</span>
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-indigo-50">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider rounded-tl-xl">Date</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">From</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">To</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">Passengers</th>
                <th className="px-5 py-3 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider rounded-tr-xl">Fuel Saved</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {recentRides.map((ride) => (
                <tr key={ride.id} className="hover:bg-purple-50 transition-colors duration-150">
                  <td className="px-5 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">{ride.date}</td>
                  <td className="px-5 py-4 text-sm text-gray-600 whitespace-nowrap">{ride.from}</td>
                  <td className="px-5 py-4 text-sm text-gray-600 whitespace-nowrap">{ride.to}</td>
                  <td className="px-5 py-4 text-sm font-semibold text-indigo-600 whitespace-nowrap">{ride.passengers}</td>
                  <td className="px-5 py-4 text-sm font-bold text-green-700 whitespace-nowrap">{ride.fuelSaved}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DriverProfile;