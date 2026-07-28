import React, { useState } from "react";
import { Lock, User, Smartphone , Check , AlertCircle } from "lucide-react";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../Features/authSlice";
import { toast } from "react-toastify";
import { useLocation , useNavigate} from "react-router-dom";
const UserLoginPage = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    mobileNumber: "",
    password: "",
  });

  
  const location = useLocation();
  const navigate = useNavigate();
  const previousPath = (location.state?.from === 'usersignup'); 
  const previousPath2 = (location.state?.from === 'loginoptions');
  const [errors, setErrors] = useState({});

  const [login, setlogin] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

   
    // Mobile number validation
    const mobileNumberRegex = /^[0-9]{10}$/;
    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = "Mobile number is required";
    } else if (!mobileNumberRegex.test(formData.mobileNumber)) {
      newErrors.mobileNumber = "Invalid mobile number (10 digits required)";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        // Replace with your actual backend login endpoint
        const response = await fetch("http://localhost:5001/user/login", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const data = await response.json();
          
          
          dispatch(setUserDetails({role : "user" , userId : data.userid}));
          setlogin(1);

          toast.success("SignIn Successful");

          if(previousPath)
          {
            navigate(-3);
          }
          else if(previousPath2)
          {
            navigate(-2);
          }
          else{
            navigate(-1);
          }
        
        } else {
          // Handle login failure
          setlogin(2);
          toast.error("SignIn Failed!");
        }
      } catch (error) {
        if(login === 2)
        {
            toast.error("SignIn Failed!");
        }
        setlogin(2);
      }
    }
  };

  return (
    <div className="min-h-screen bg-indigo-100 pt-20">
      <div className="bg-white shadow-2xl rounded-2xl max-w-sm w-full mx-auto p-8 space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800">User Login</h2>
          <p className="text-gray-600 mt-2">
            Welcome back! Please enter your details.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Input */}

          {/* Mobile Number Input */}
          <div>
            <label
              htmlFor="mobileNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Mobile Number
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Smartphone className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="tel"
                id="mobileNumber"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                className={`pl-10 pr-3 py-2 block w-full border rounded-lg focus:outline-none ${
                  errors.mobileNumber ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter mobile number"
              />
            </div>
            {errors.mobileNumber && (
              <p className="text-red-500 text-xs mt-1">{errors.mobileNumber}</p>
            )}
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`pl-10 pr-3 py-2 block w-full border rounded-lg focus:outline-none ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your password"
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-br from-indigo-600 to-purple-600 text-white py-2 rounded-lg hover:opacity-90 transition-opacity"
          >
            Login
          </button>
        </form>

        {/* Signup Option */}
        <div className="text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <a
              href="/usersignup"
              className="text-blue-600 hover:underline font-semibold"
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserLoginPage;
