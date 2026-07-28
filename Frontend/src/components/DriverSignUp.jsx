import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar , AlertCircle } from "lucide-react";
import { toast } from "react-toastify";

const DriverSignUp = () => {
  const navigate = useNavigate();
  const navigateLogInPage = () => {
    navigate("/login");
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    emailId: "",
    password: "",
    confirmPassword: "",
    vehicleNumber: "",
    address: "",
    state: "",
    drivingLicenseNumber: "",
    dateOfBirth: "",
    gender: "", // Added gender field
    vehicleName: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState("");

  const validateForm = () => {
    const newErrors = {};

    // First name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    // Last name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    // Mobile number validation
    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = "Mobile number is required";
    } else if (!/^\d{10}$/.test(formData.mobileNumber)) {
      newErrors.mobileNumber = "Mobile number must be 10 digits";
    }

    // Email validation
    if (!formData.emailId.trim()) {
      newErrors.emailId = "Email ID is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.emailId)) {
      newErrors.emailId = "Email address is invalid";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    // Confirm password validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Vehicle number validation
    if (!formData.vehicleNumber.trim()) {
      newErrors.vehicleNumber = "Vehicle number is required";
    }

    // Address validation
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    // State validation
    if (!formData.state.trim()) {
      newErrors.state = "State is required";
    }

    // License Number validation
    if (!formData.drivingLicenseNumber.trim()) {
      newErrors.drivingLicenseNumber = "Droving License Number is required";
    }

    // Vehicle Name validation
    if (!formData.vehicleName.trim()) {
      newErrors.vehicleName = "Vehicle Name is required";
    }

    // Gender validation
    if (!formData.gender) {
      newErrors.gender = "Gender is required";
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

  const handleSignUp = async (e) => {
    console.log("Button clicked just now !!")
    e.preventDefault();
    // const validationErrors = validateForm();
      try {
        const response = await fetch("http://localhost:5001/driver/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        });

        console.log(response);
        let errorHandled = false;
        if (response.ok) {
          const data = await response.json();

          // console.log('Signup successful', data);

          toast.success("Sign up successfully!");
          navigate("/login");
        //   alert('Signup Succe
        } else {
          toast.error("Signed up failed!");
          errorHandled = true;
        }
      } catch (error) {
        if(!errorHandled)
        {
          toast.error("Sign up failed!");
        }
      } 
  };

  const stateOptions = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];

  return (
    <div className="min-h-screen bg-indigo-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto">
        <div className="relative px-4 py-10 bg-gray-50 shadow-lg rounded-3xl sm:p-10">
          <div className="max-w-3xl mx-auto">
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
                <h2>Driver Sign Up</h2>
                <p className="text-xs text-gray-500">
                  Join our trusted driver community
                </p>
              </div>
            </div>

            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <p className="text-sm text-gray-500">
                  Safety is our top priority. All information will be verified
                  before approval.
                </p>
              </div>

              <form className="py-8 space-y-6" >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* First Name */}
                  <div className="col-span-1">
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      First Name*
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      id="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border ${
                        errors.firstName ? "border-red-500" : ""
                      }`}
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  {/* Last Name */}
                  <div className="col-span-1">
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Last Name*
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      id="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border ${
                        errors.lastName ? "border-red-500" : ""
                      }`}
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.lastName}
                      </p>
                    )}
                  </div>

                  {/* Gender - Added field */}
                  <div className="col-span-1">
                    <label
                      htmlFor="gender"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Gender*
                    </label>
                    <div className="mt-1 flex items-center space-x-4">
                      <div className="flex items-center">
                        <input
                          id="gender-male"
                          name="gender"
                          type="radio"
                          value="male"
                          checked={formData.gender === "male"}
                          onChange={handleChange}
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                        />
                        <label
                          htmlFor="gender-male"
                          className="ml-2 block text-sm text-gray-700"
                        >
                          Male
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="gender-female"
                          name="gender"
                          type="radio"
                          value="female"
                          checked={formData.gender === "female"}
                          onChange={handleChange}
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                        />
                        <label
                          htmlFor="gender-female"
                          className="ml-2 block text-sm text-gray-700"
                        >
                          Female
                        </label>
                      </div>
                    </div>
                    {errors.gender && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.gender}
                      </p>
                    )}
                  </div>

                  {/* Date of Birth */}
                  <div className="col-span-1">
                    <label
                      htmlFor="dateOfBirth"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Date Of Birth*
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="date"
                        id="dateOfBirth"
                        name="dateOfBirth" // Ensure the name matches formData key
                        value={formData.dateOfBirth}
                        onChange={handleChange} // Use handleChange function
                        className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        required
                      />

                      {errors.dateOfBirth && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.dateOfBirth}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Mobile Number */}
                  <div className="col-span-1">
                    <label
                      htmlFor="mobileNumber"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Mobile Number*
                    </label>
                    <input
                      type="tel"
                      name="mobileNumber"
                      id="mobileNumber"
                      value={formData.mobileNumber}
                      onChange={handleChange}
                      placeholder="10-digit mobile number"
                      className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border ${
                        errors.mobileNumber ? "border-red-500" : ""
                      }`}
                    />
                    {errors.mobileNumber && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.mobileNumber}
                      </p>
                    )}
                  </div>

                  {/* Email ID */}
                  <div className="col-span-1">
                    <label
                      htmlFor="emailId"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email ID*
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
                    />
                    {errors.emailId && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.emailId}
                      </p>
                    )}
                  </div>

                  {/* Password */}
                  <div className="col-span-1">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password*
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Minimum 8 characters"
                      className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border ${
                        errors.password ? "border-red-500" : ""
                      }`}
                    />
                    {errors.password && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.password}
                      </p>
                    )}
                  </div>

                  {/* Confirm Password */}
                  <div className="col-span-1">
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Confirm Password*
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border ${
                        errors.confirmPassword ? "border-red-500" : ""
                      }`}
                    />
                    {errors.confirmPassword && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>

                  {/* Driving Liscense Number */}
                  <div className="col-span-1">
                    <label
                      htmlFor="drivingLicenseNumber"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Driving License Number*
                    </label>
                    <input
                      type="text"
                      name="drivingLicenseNumber"
                      id="drivingLicenseNumber"
                      value={formData.drivingLicenseNumber}
                      onChange={handleChange}
                      placeholder="15 - digit DL number"
                      className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border ${
                        errors.drivingLicenseNumber ? "border-red-500" : ""
                      }`}
                    />
                    {errors.drivingLicenseNumber && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.drivingLicenseNumber}
                      </p>
                    )}
                  </div>

                  {/* Vehicle Number */}
                  <div className="col-span-1">
                    <label
                      htmlFor="vehicleNumber"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Vehicle Number*
                    </label>
                    <input
                      type="text"
                      name="vehicleNumber"
                      id="vehicleNumber"
                      value={formData.vehicleNumber}
                      onChange={handleChange}
                      placeholder="e.g., MH01AB1234"
                      className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border ${
                        errors.vehicleNumber ? "border-red-500" : ""
                      }`}
                    />
                    {errors.vehicleNumber && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.vehicleNumber}
                      </p>
                    )}
                  </div>

                  {/* vehicle name */}
                  <div className="col-span-1">
                    <label
                      htmlFor="vehicleName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Vehicle Name*
                    </label>
                    <input
                      type="text"
                      name="vehicleName"
                      id="vehicleName"
                      value={formData.vehicleName}
                      onChange={handleChange}
                      placeholder="e.g., Honda City"
                      className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border ${
                        errors.vehicleName ? "border-red-500" : ""
                      }`}
                    />
                    {errors.vehicleName && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.vehicleName}
                      </p>
                    )}
                  </div>

                  {/* State */}
                  <div className="col-span-1">
                    <label
                      htmlFor="state"
                      className="block text-sm font-medium text-gray-700"
                    >
                      State*
                    </label>
                    <select
                      name="state"
                      id="state"
                      value={formData.state}
                      onChange={handleChange}
                      className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border ${
                        errors.state ? "border-red-500" : ""
                      }`}
                    >
                      <option value="">Select State</option>
                      {stateOptions.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                    {errors.state && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.state}
                      </p>
                    )}
                  </div>
                </div>

                {/* Address - Full Width */}
                <div className="col-span-2">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Complete Address*
                  </label>
                  <textarea
                    name="address"
                    id="address"
                    rows={3}
                    value={formData.address}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border ${
                      errors.address ? "border-red-500" : ""
                    }`}
                  />
                  {errors.address && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.address}
                    </p>
                  )}
                </div>

                {/* Disclaimer */}
                <div className="col-span-2">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="terms"
                        name="terms"
                        type="checkbox"
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300 rounded"
                        required
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="terms"
                        className="font-medium text-gray-700"
                      >
                        I agree to the Terms and Privacy Policy
                      </label>
                      <p className="text-gray-500">
                        By signing up, you agree to our verification process and
                        background check for safety purposes.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    onClick={handleSignUp}
                    disabled={isSubmitting}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:bg-gray-500"
                  >
                    {isSubmitting ? "Processing..." : "Sign Up as Driver"}
                  </button>
                </div>

                <div className="text-center mt-4">
                  <p className="text-sm text-gray-600">
                    Already have an account?{" "}
                    <button
                      type="button"
                      // onClick={() => (window.location.href = "/login")}
                      className="ml-2 px-4 py-1 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                      onClick={navigateLogInPage}
                    >
                      Log in
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

export default DriverSignUp;
