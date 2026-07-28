import React, { useState, useEffect } from "react";
import {
  User,
  Bell,
  CircleUser,
  Bike,
  Menu,
  X,
  ChevronDown,
  MapPin,
  CreditCard,
  Shield,
  HelpCircle,
  Settings,
  Star,
  Car,
  Calendar,
  Users,
} from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Navbar() {
  const [role, setRole] = useState(null);
  const [userid, setUserid] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);

  const navigate = useNavigate();
  const { userType, userId } = useSelector((state) => state.auth);

  useEffect(() => {
    setUserid(userId);
    setRole(userType);
  }, [userType, userId]);

  const fetchUserRole = async () => {
    try {
      const response = await fetch("http://localhost:5001/gettokendetails/get-token", {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        console.error("Token fetch failed:", response.statusText);
        return { role: null, userid: null };
      }

      const data = await response.json();
      console.log("--->>" , data);
      return { role: data.role, userid: data.userid };

    } catch (error) {
      console.error("Error fetching user role:", error);
      return { role: null, userid: null };
    }
  };

  useEffect(() => {
    const checkUserRole = async () => {
      const { role, userid } = await fetchUserRole();
      console.log(role ," -- ", userid);
      setRole(role);
      setUserid(userid);
    };
    checkUserRole();
  }, []);

  const navigateAboutUs = () => navigate("/aboutus");
  const navigateContactUs = () => navigate("/contactus");

  const navigateToDriverProfile = async () => {
    console.log(userid);
    try {
      const response = await axios.get("http://localhost:5001/driver/profile", {
        withCredentials: true,
      });

      if (response.status !== 200) {
        console.log("Error while getting user details from Backend!!");
      }
      const data = response.data;
      navigate("/driverprofile", { state: data });
    } catch (error) {
      console.log("Error while getting user info!!", error);
    }
  };


  const navigateToUserProfile = ()=> navigate("/userprofile");
  const navigateToRegisterOptionsPagePage = () => navigate("/registrationoptions");
  const navigateToLogInOptionsPage = ()=> navigate("/loginoptions");
  const navigateToHomePage = () => navigate("/");
  const navigateToSearchRide = () => navigate("/searchride");
  const navigateToOfferRide = () => navigate("/offer");
  const navigateToSupport = () => navigate("/support");
  const navigateToSafety = () => navigate("/safety");
  const navigateToRideHistory = () => navigate("/userridehistory");
  const navigateToRideDetails = () => navigate("/driverridehistory");
  const handlerToLogOutUser = async () => {
    try {
      const response = await fetch("http://localhost:5001/user/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        console.error("Logout failed:", response.statusText);
        return;
      }

      setRole(null);
      setUserid(null);
      navigateToLogInOptionsPage();
    } catch (error) {
      console.error("Error during logout:", error);
    }
  }

  const handlerToLogOutDriver = async () => {
    try {
      const response = await fetch("http://localhost:5001/driver/logout", {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        console.error("Logout failed:", response.statusText);
        return;
      }

      setRole(null);
      setUserid(null);
      navigateToLogInOptionsPage();
    } catch (error) {
      console.error("Error during logout:", error);
    }
  }

  return (
    <div className="flex flex-col h-20 bg-indigo-100 to-purple-100 text-white">
      <header className="fixed top-0 left-0 w-full bg-indigo-100 text-white shadow-md p-4 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center max-w-7xl h-10">
        {/* Logo */}
        <div className="flex items-center space-x-3 group">
          <div
            className="h-12 w-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center 
            transform transition-all duration-300 group-hover:rotate-12 group-hover:scale-110 shadow-lg"
          >
            <Bike className="text-white w-6 h-6" />
          </div>
          <button
            onClick={navigateToHomePage}
            className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent
            transition-all duration-300 group-hover:from-indigo-700 group-hover:to-purple-700"
          >
            RideShare
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          {/* Services Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
              className="flex items-center space-x-1 text-slate-700 hover:text-indigo-600 transition-colors duration-300 font-medium group"
            >
              <span>Services</span>
              <ChevronDown
                className={`w-4 h-4 transform transition-transform duration-300 ${
                  isServicesDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isServicesDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-indigo-100 backdrop-blur-md rounded-xl shadow-xl border border-indigo-100/50 py-3 z-50">
                <div className="px-4 py-2 border-b border-slate-100 mb-2">
                  <p className="text-sm font-semibold text-slate-600">
                    Quick Actions
                  </p>
                </div>
                <button
                  onClick={navigateToSearchRide}
                  className="w-full px-4 py-3 text-left hover:bg-indigo-200 transition-colors duration-200 flex items-center space-x-3"
                >
                  <Car className="w-5 h-5 text-indigo-600" />
                  <div>
                    <p className="font-medium text-slate-700">Book a Ride</p>
                    <p className="text-sm text-slate-500">
                      Find rides going your way
                    </p>
                  </div>
                </button>
                <button
                  onClick={navigateToOfferRide}
                  className="w-full px-4 py-3 text-left hover:bg-indigo-200 transition-colors duration-200 flex items-center space-x-3"
                >
                  <Users className="w-5 h-5 text-indigo-600" />
                  <div>
                    <p className="font-medium text-slate-700">Offer a Ride</p>
                    <p className="text-sm text-slate-500">Share your journey</p>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            <button
              onClick={navigateAboutUs}
              className="text-slate-700 hover:text-indigo-600 transition-colors duration-300 relative group font-medium"
            >
              About Us
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button
              onClick={navigateToSafety}
              className="text-slate-700 hover:text-indigo-600 transition-colors duration-300 relative group font-medium"
            >
              Safety
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button
              onClick={navigateToSupport}
              className="text-slate-700 hover:text-indigo-600 transition-colors duration-300 relative group font-medium"
            >
              Support
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button
              onClick={navigateContactUs}
              className="text-slate-700 hover:text-indigo-600 transition-colors duration-300 relative group font-medium"
            >
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-300 group-hover:w-full"></span>
            </button>
          </div>

          {/* User-specific UI */}
          {role === "driver" && (
            <div className="flex items-center space-x-4">

              <div className="relative">
              <button
                  onClick={() =>
                    setIsProfileDropdownOpen(!isProfileDropdownOpen)
                  }
                  className="flex items-center space-x-2 p-2 rounded-full hover:bg-purple-300 transition-colors duration-300 group"
                >
                  <CircleUser className="w-8 h-8 text-slate-600 group-hover:text-indigo-600 transition-colors" />
                  <ChevronDown
                    className={`w-4 h-4 text-slate-600 transform transition-transform duration-300 ${
                      isProfileDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isProfileDropdownOpen && (
                  <div className="absolute top-full right-0 mt-2 w-64 bg-indigo-100 backdrop-blur-md rounded-xl shadow-xl border border-indigo-100/50 py-3 z-50">
                    <div className="px-4 py-2 border-b border-slate-100 mb-2">
                      <p className="font-semibold text-slate-700">
                        Driver Dashboard
                      </p>
                      <p className="text-sm text-slate-500">
                        Manage your rides
                      </p>
                    </div>
                    <button
                      onClick={navigateToDriverProfile}
                      className="w-full px-4 py-2 text-left hover:bg-indigo-200 transition-colors duration-200 flex items-center space-x-3"
                    >
                      <User className="w-4 h-4 text-indigo-600" />
                      <span className="text-slate-700">Profile</span>
                    </button>
                    <button
                      onClick={navigateToRideDetails}
                      className="w-full px-4 py-2 text-left hover:bg-indigo-200 transition-colors duration-200 flex items-center space-x-3"
                    >
                      <Settings className="w-4 h-4 text-indigo-600" />
                      <span className="text-slate-700">Ride Details</span>
                    </button>
                    <button
                      onClick={handlerToLogOutDriver}
                      className="w-full px-4 py-2 text-left hover:bg-indigo-200 transition-colors duration-200 flex items-center space-x-3"
                    >
                      <Star className="w-4 h-4 text-red-900" />
                      <span className="text-red-900">Log Out</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {role === "user" && (
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button
                  onClick={() =>
                    setIsProfileDropdownOpen(!isProfileDropdownOpen)
                  }
                  className="flex items-center space-x-2 p-2 rounded-full hover:bg-purple-300 transition-colors duration-300 group"
                >
                  <CircleUser className="w-8 h-8 text-slate-600 group-hover:text-indigo-600 transition-colors" />
                  <ChevronDown
                    className={`w-4 h-4 text-slate-600 transform transition-transform duration-300 ${
                      isProfileDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isProfileDropdownOpen && (
                  <div className="absolute top-full right-0 mt-2 w-64 bg-indigo-100 backdrop-blur-md rounded-xl shadow-xl border border-indigo-100/50 py-3 z-50">
                    <div className="px-4 py-2 border-b border-slate-100 mb-2">
                      <p className="font-semibold text-slate-700">
                        User Account
                      </p>
                      <p className="text-sm text-slate-500">
                        Manage your account
                      </p>
                    </div>
                    <button
                      onClick={navigateToUserProfile}
                      className="w-full px-4 py-2 text-left hover:bg-indigo-200 transition-colors duration-200 flex items-center space-x-3"
                    >
                      <User className="w-4 h-4 text-indigo-600" />
                      <span className="text-slate-700">Profile</span>
                    </button>
                    <button
                      onClick={navigateToRideHistory}
                      className="w-full px-4 py-2 text-left hover:bg-indigo-200 transition-colors duration-200 flex items-center space-x-3"
                    >
                      <Calendar className="w-4 h-4 text-indigo-600" />
                      <span className="text-slate-700">Ride History</span>
                    </button>
                    <button
                      onClick={handlerToLogOutUser}
                      className="w-full px-4 py-2 text-left hover:bg-indigo-200 transition-colors duration-200 flex items-center space-x-3"
                    >
                      <Star className="w-4 h-4 text-red-900" />
                      <span className="text-red-900">Log Out</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Unauthenticated User UI */}
          {role === null && (
            <div className="flex items-center space-x-4">
              <button 
              onClick = {navigateToLogInOptionsPage}
              className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 flex items-center space-x-2 
                  shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95">
                Login
              </button>
              <button
                className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg 
                  hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 flex items-center space-x-2 
                  shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
                onClick={navigateToRegisterOptionsPagePage}
              >
                <User className="w-4 h-4" />
                <span className="font-medium">Register</span>
              </button>
            </div>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden p-2 rounded-lg hover:bg-indigo-50 transition-colors duration-300"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6 text-slate-600" />
          ) : (
            <Menu className="w-6 h-6 text-slate-600" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-indigo-100 backdrop-blur-md border-t border-indigo-100/50 shadow-lg">
          <div className="px-4 py-6 space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide">
                Services
              </p>
              <button
                onClick={navigateToSearchRide}
                className="w-full text-left px-4 py-2 text-slate-700 hover:bg-indigo-50 rounded-lg transition-colors duration-200"
              >
                Book a Ride
              </button>
              <button
                onClick={navigateToOfferRide}
                className="w-full text-left px-4 py-2 text-slate-700 hover:bg-indigo-50 rounded-lg transition-colors duration-200"
              >
                Offer a Ride
              </button>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide">
                Company
              </p>
              <button
                onClick={navigateAboutUs}
                className="w-full text-left px-4 py-2 text-slate-700 hover:bg-indigo-50 rounded-lg transition-colors duration-200"
              >
                About Us
              </button>
              <button
                onClick={navigateToSafety}
                className="w-full text-left px-4 py-2 text-slate-700 hover:bg-indigo-50 rounded-lg transition-colors duration-200"
              >
                Safety
              </button>
              <button
                onClick={navigateToSupport}
                className="w-full text-left px-4 py-2 text-slate-700 hover:bg-indigo-50 rounded-lg transition-colors duration-200"
              >
                Support
              </button>
              <button
                onClick={navigateContactUs}
                className="w-full text-left px-4 py-2 text-slate-700 hover:bg-indigo-50 rounded-lg transition-colors duration-200"
              >
                Contact
              </button>
            </div>

            {role === null && (
              <div className="pt-4 border-t border-slate-200 space-y-3">
                <button 
                
                className="w-full px-4 py-3 text-slate-700 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors duration-200">
                  Login
                </button>
                <button
                  onClick={navigateToRegisterPage}
                  className="w-full px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 font-medium"
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
    </div>
  );
}

export default Navbar;
