import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {AlertCircle} from "lucide-react"
import { useDispatch } from "react-redux";
import { setUserDetails } from "../Features/authSlice";
import { toast } from "react-toastify";

const DriverLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login,setlogin] = useState(0);
  const navigateToSignUp = () => {
    navigate("/signup");
  };

  const [formData, setFormData] = useState({
    emailId: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.emailId.trim()) {
      newErrors.emailId = "Email ID is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.emailId)) {
      newErrors.emailId = "Email address is invalid";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRememberMe = () => {
    setRememberMe(!rememberMe);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitting(true);

      try {
        const response = await fetch("http://localhost:5001/driver/login", {
          method: "POST",
          credentials: "include",    //this is for fetch request and withCretdentials : true for axios........
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();
        let errorHandled = false;
        console.log("Login response:", data);
        if (response.status === 200) {
        
          toast.success("Login Succeeded!");
          dispatch(setUserDetails({role : "driver" , userId : data.userid}));
          setlogin(1);
          navigate("/offer");
        } else {

          toast.error("Login Failed!!");
          errorHandled = true;
          setlogin(2);
          setErrors({ apiError: data.error || "Login failed. Try again!" });
        }
      } catch (error) {
        // console.error("Error during login:", error);
        if(!errorHandled)
        {
          toast.error("Login Failed!");
        }
        setlogin(2);
        setErrors({
          apiError: "Something went wrong. Please try again later!",
        });
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="min-h-screen bg-indigo-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl mx-auto">
        <div className="relative px-4 py-10 bg-white shadow-lg rounded-3xl sm:p-10">
          <div className="max-w-md mx-auto">
            <div className="flex items-center space-x-5">
              <div className="h-14 w-14 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex flex-shrink-0 justify-center items-center text-white text-2xl font-mono">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                  <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H11a1 1 0 001-1v-1h3.5a1 1 0 00.5-.1.5.5 0 00.3-.4l1.5-7a1 1 0 00-.8-1.2H15V4a1 1 0 00-1-1H3z" />
                </svg>
              </div>
              <div className="block text-2xl font-semibold text-gray-700">
                <h2>Driver Login</h2>
                <p className="text-xs text-gray-500">
                  Welcome back to your account
                </p>
              </div>
            </div>

            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <p className="text-sm text-gray-500">
                  Sign in to access your driver dashboard and manage your rides.
                </p>
              </div>

              <form className="py-8 space-y-6" onSubmit={handleSubmit}>
                {/* Email ID */}
                <div>
                  <label
                    htmlFor="emailId"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email ID
                  </label>
                  <input
                    type="email"
                    name="emailId"
                    id="emailId"
                    value={formData.emailId}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border ${
                      errors.emailId ? "border-red-500" : ""
                    }`}
                    placeholder="your.email@example.com"
                  />
                  {errors.emailId && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.emailId}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border ${
                      errors.password ? "border-red-500" : ""
                    }`}
                    placeholder="Enter your password"
                  />
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      checked={rememberMe}
                      onChange={handleRememberMe}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-gray-700"
                    >
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-medium text-blue-600 hover:text-blue-500"
                    >
                      Forgot your password?
                    </a>
                  </div>
                </div>

                {/* Login Button */}
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:bg-gray-500"
                    onClick={handleSubmit}
                  >
                    {isSubmitting ? "Signing in..." : "Sign in"}
                  </button>
                </div>

                {/* {login === 1 && (
                  <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-md shadow-md flex items-center">
                    <div className="flex-shrink-0">
                      <Check className="h-6 w-6 text-green-500" />
                    </div>
                    <div className="ml-3">
                      <p className="text-green-800 font-medium">
                        Login Successful!
                      </p>
                      <p className="text-green-600 text-sm mt-1">
                        You've been securely logged into your account.
                      </p>
                    </div>
                  </div>
                )}

                {login === 2 && (
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md shadow-md flex items-center">
                    <div className="flex-shrink-0">
                      <AlertCircle className="h-6 w-6 text-red-500" />
                    </div>
                    <div className="ml-3">
                      <p className="text-red-800 font-medium">Login Failed</p>
                      <p className="text-red-600 text-sm mt-1">
                        Please check your password or mobile number and try
                        again.
                      </p>
                    </div>
                  </div>
                )} */}

                {/* Sign Up Link */}
                <div className="text-center mt-4">
                  <p className="text-sm text-gray-600">
                    Don't have an account yet?{" "}
                    <button
                      type="button"
                      // onClick={() => (window.location.href = "/signup")}
                      className="ml-2 px-4 py-1 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                      onClick={navigateToSignUp}
                    >
                      Sign Up
                    </button>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DriverLogin;
