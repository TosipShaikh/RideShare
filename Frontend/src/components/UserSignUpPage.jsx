import React, { useState } from 'react';
import { Lock, User, Smartphone, Mail } from 'lucide-react';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const UserSignUpPage = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobileNumber: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    // Mobile number validation
    const mobileNumberRegex = /^[0-9]{10}$/;
    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = 'Mobile number is required';
    } else if (!mobileNumberRegex.test(formData.mobileNumber)) {
      newErrors.mobileNumber = 'Invalid mobile number (10 digits required)';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters long';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async (e) => {
    console.log("Button clicked just now!!!")
    e.preventDefault();

    // if (validateForm()) {
      try {

        // console.log("Request send!!!");


        const response = await fetch("http://localhost:5001/user/signup", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            mobileNumber: formData.mobileNumber,
            password: formData.password
          })
        });

        // console.log(response);
        let errorHandled = false;
        if (response.ok) {
          const data = await response.json();
          // Handle successful signup (e.g., redirect to login, show success message)
          toast.success('Signup Successfull!!');
          navigate("/userlogin" , {state : {from : 'usersignup' }});

        } else {

          const errorData = await response.json();
          toast.error('Signup Failed');
          errorHandled = true;
        }
      } catch (error) {
         if(errorHandled)
         {
          toast.error("Signup Failed!")
         }
      }
  };

  return (
    <div className="min-h-screen bg-indigo-100 pt-4 p-4">
      <div className="bg-white shadow-2xl rounded-2xl max-w-md w-full mx-auto p-8 space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
          <p className="text-gray-600 mt-2">Sign up to get started</p>
        </div>

        <form className="space-y-4">
          {/* Name Input */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`pl-10 pr-3 py-2 block w-full border rounded-lg focus:outline-none ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your full name"
              />
            </div>
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>


          {/* Mobile Number Input */}
          <div>
            <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700">Mobile Number</label>
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
                  errors.mobileNumber ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter mobile number"
              />
            </div>
            {errors.mobileNumber && <p className="text-red-500 text-xs mt-1">{errors.mobileNumber}</p>}
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
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
                  errors.password ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Create a password"
              />
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          {/* Confirm Password Input */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`pl-10 pr-3 py-2 block w-full border rounded-lg focus:outline-none ${
                  errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Confirm your password"
              />
            </div>
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
          </div>

          {/* Submit Button */}
          <button  onClick={handleSignUp}
            className="w-full bg-gradient-to-br from-indigo-600 to-purple-600 text-white py-2 rounded-lg hover:opacity-90 transition-opacity"
          >
            Sign Up
          </button>
        </form>

        {/* Login Option */}
        <div className="text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <a href="/userlogin" className="text-purple-600 hover:underline font-semibold">
              Log In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserSignUpPage;