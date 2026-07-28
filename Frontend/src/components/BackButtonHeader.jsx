import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Assuming you're using react-router-dom for navigation

const BackButtonHeader = ({ title = "Go Back" }) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Navigates back to the previous page in history
  };

  return (
    <div className="bg-indigo-100 pl-4 flex items-center justify-between">
      {/* Back Button */}
      <button
        onClick={handleGoBack}
        className="flex items-center justify-center rounded-full 
                   bg-white text-indigo-700 shadow-md 
                   hover:bg-indigo-50 hover:text-indigo-800 
                   transition-all duration-200 
                   focus:outline-none focus:ring-2 focus:ring-indigo-400 
                   w-10 h-10" /* Small button size */
        aria-label="Go back"
      >
        <ArrowLeft className="w-5 h-5" /> {/* Icon size */}
      </button>

      {/* Placeholder for right side content if needed, keeps button left-aligned */}
      <div className="w-10 h-10"></div> {/* Match width/height of button for symmetry if title is hidden */}
    </div>
  );
};

export default BackButtonHeader;