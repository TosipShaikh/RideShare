import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertCircle, Check, X, Clock, Signal, FileText, DollarSign } from 'lucide-react';

const DriverFeedbackForm = ({ driverName, tripDate, onSubmit }) => {
  const [followedRules, setFollowedRules] = useState("yes");
  const [wasPunctual, setWasPunctual] = useState("yes");
  const [wantToReport, setWantToReport] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [overcharged, setOvercharged] = useState(false);
  const [overchargeAmount, setOverchargeAmount] = useState("");
  const [additionalComments, setAdditionalComments] = useState("");
  const [driverBehavior, setDriverBehavior] = useState(5);
  const [vehicleCondition, setVehicleCondition] = useState(5);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (typeof onSubmit === "function") {
      onSubmit({
        followedRules,
        wasPunctual,
        wantToReport,
        reportReason: wantToReport ? reportReason : "",
        overcharged,
        overchargeAmount: overcharged ? overchargeAmount : "",
        additionalComments,
        driverBehavior,
        vehicleCondition,
      });
     
  };
}
 const navigateToUserThanking = ()=>{
  navigate("/thankinguser");
 }

  return (
    <div className="bg-indigo-100 p-8">
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6">
        <h2 className="text-2xl font-bold text-white">Trip Feedback</h2>
        <p className="text-blue-100 mt-1">
          {driverName ? `Driver: ${driverName}` : 'Rate your recent trip'}
          {tripDate && ` • ${tripDate}`}
        </p>
      </div>

      <form className="p-6">
        <div className="space-y-6">
          {/* Traffic Rules */}
          <div>
            <div className="flex items-center mb-3">
              <Signal className="w-5 h-5 text-blue-600 mr-2" />
              <h3 className="text-lg font-medium text-gray-900">Did the driver follow traffic rules?</h3>
            </div>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setFollowedRules(true)}
                className={`flex-1 py-3 px-4 rounded-lg border flex items-center justify-center space-x-2 
                ${
                  followedRules === true
                    ? 'bg-green-100 border-green-500 text-green-700'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Check className={`w-5 h-5 ${followedRules === true ? 'text-green-600' : 'text-gray-500'}`} />
                <span>Yes</span>
              </button>
              <button
                type="button"
                onClick={() => setFollowedRules(false)}
                className={`flex-1 py-3 px-4 rounded-lg border flex items-center justify-center space-x-2 
                ${
                  followedRules === false
                    ? 'bg-red-100 border-red-500 text-red-700'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <X className={`w-5 h-5 ${followedRules === false ? 'text-red-600' : 'text-gray-500'}`} />
                <span>No</span>
              </button>
            </div>
          </div>

          {/* Punctuality */}
          <div>
            <div className="flex items-center mb-3">
              <Clock className="w-5 h-5 text-blue-600 mr-2" />
              <h3 className="text-lg font-medium text-gray-900">Was the driver punctual?</h3>
            </div>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setWasPunctual(true)}
                className={`flex-1 py-3 px-4 rounded-lg border flex items-center justify-center space-x-2 
                ${
                  wasPunctual === true
                    ? 'bg-green-100 border-green-500 text-green-700'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Check className={`w-5 h-5 ${wasPunctual === true ? 'text-green-600' : 'text-gray-500'}`} />
                <span>Yes</span>
              </button>
              <button
                type="button"
                onClick={() => setWasPunctual(false)}
                className={`flex-1 py-3 px-4 rounded-lg border flex items-center justify-center space-x-2 
                ${
                  wasPunctual === false
                    ? 'bg-red-100 border-red-500 text-red-700'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <X className={`w-5 h-5 ${wasPunctual === false ? 'text-red-600' : 'text-gray-500'}`} />
                <span>No</span>
              </button>
            </div>
          </div>

          {/* Vehicle Condition */}
          <div>
            <div className="flex items-center mb-3">
              <FileText className="w-5 h-5 text-blue-600 mr-2" />
              <h3 className="text-lg font-medium text-gray-900">How was the vehicle condition?</h3>
            </div>
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => setVehicleCondition('good')}
                className={`flex-1 py-2 px-3 rounded-lg border text-sm
                ${
                  vehicleCondition === 'good'
                    ? 'bg-green-100 border-green-500 text-green-700'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Good
              </button>
              <button
                type="button"
                onClick={() => setVehicleCondition('average')}
                className={`flex-1 py-2 px-3 rounded-lg border text-sm
                ${
                  vehicleCondition === 'average'
                    ? 'bg-yellow-100 border-yellow-500 text-yellow-700'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Average
              </button>
              <button
                type="button"
                onClick={() => setVehicleCondition('poor')}
                className={`flex-1 py-2 px-3 rounded-lg border text-sm
                ${
                  vehicleCondition === 'poor'
                    ? 'bg-red-100 border-red-500 text-red-700'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Poor
              </button>
            </div>
          </div>

          {/* Driver Behavior */}
          <div>
            <div className="flex items-center mb-3">
              <FileText className="w-5 h-5 text-blue-600 mr-2" />
              <h3 className="text-lg font-medium text-gray-900">How was the driver's behavior?</h3>
            </div>
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => setDriverBehavior('friendly')}
                className={`flex-1 py-2 px-3 rounded-lg border text-sm
                ${
                  driverBehavior === 'friendly'
                    ? 'bg-green-100 border-green-500 text-green-700'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Friendly
              </button>
              <button
                type="button"
                onClick={() => setDriverBehavior('neutral')}
                className={`flex-1 py-2 px-3 rounded-lg border text-sm
                ${
                  driverBehavior === 'neutral'
                    ? 'bg-blue-100 border-blue-500 text-blue-700'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Neutral
              </button>
              <button
                type="button"
                onClick={() => setDriverBehavior('rude')}
                className={`flex-1 py-2 px-3 rounded-lg border text-sm
                ${
                  driverBehavior === 'rude'
                    ? 'bg-red-100 border-red-500 text-red-700'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Rude
              </button>
            </div>
          </div>

          {/* Overcharging */}
          <div>
            <div className="flex items-center mb-3">
              <DollarSign className="w-5 h-5 text-blue-600 mr-2" />
              <h3 className="text-lg font-medium text-gray-900">Did the driver overcharge you?</h3>
            </div>
            <div className="flex space-x-4 mb-3">
              <button
                type="button"
                onClick={() => setOvercharged(true)}
                className={`flex-1 py-3 px-4 rounded-lg border flex items-center justify-center space-x-2 
                ${
                  overcharged === true
                    ? 'bg-red-100 border-red-500 text-red-700'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Check className={`w-5 h-5 ${overcharged === true ? 'text-red-600' : 'text-gray-500'}`} />
                <span>Yes</span>
              </button>
              <button
                type="button"
                onClick={() => setOvercharged(false)}
                className={`flex-1 py-3 px-4 rounded-lg border flex items-center justify-center space-x-2 
                ${
                  overcharged === false
                    ? 'bg-green-100 border-green-500 text-green-700'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <X className={`w-5 h-5 ${overcharged === false ? 'text-green-600' : 'text-gray-500'}`} />
                <span>No</span>
              </button>
            </div>
            {overcharged && (
              <div className="mt-3">
                <label htmlFor="overchargeAmount" className="block text-sm font-medium text-gray-700 mb-1">
                  By how much were you overcharged? (₹)
                </label>
                <input
                  type="number"
                  id="overchargeAmount"
                  value={overchargeAmount}
                  onChange={e => setOverchargeAmount(e.target.value)}
                  placeholder="Amount in ₹"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            )}
          </div>

          {/* Report Driver */}
          <div>
            <div className="flex items-center mb-3">
              <AlertCircle className="w-5 h-5 text-blue-600 mr-2" />
              <h3 className="text-lg font-medium text-gray-900">Do you want to report this driver?</h3>
            </div>
            <div className="flex space-x-4 mb-3">
              <button
                type="button"
                onClick={() => setWantToReport(true)}
                className={`flex-1 py-3 px-4 rounded-lg border flex items-center justify-center space-x-2 
                ${
                  wantToReport === true
                    ? 'bg-red-100 border-red-500 text-red-700'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Check className={`w-5 h-5 ${wantToReport === true ? 'text-red-600' : 'text-gray-500'}`} />
                <span>Yes</span>
              </button>
              <button
                type="button"
                onClick={() => setWantToReport(false)}
                className={`flex-1 py-3 px-4 rounded-lg border flex items-center justify-center space-x-2 
                ${
                  wantToReport === false
                    ? 'bg-green-100 border-green-500 text-green-700'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <X className={`w-5 h-5 ${wantToReport === false ? 'text-green-600' : 'text-gray-500'}`} />
                <span>No</span>
              </button>
            </div>
            {wantToReport && (
              <div className="mt-3">
                <label htmlFor="reportReason" className="block text-sm font-medium text-gray-700 mb-1">
                  Please specify the reason for reporting
                </label>
                <select
                  id="reportReason"
                  value={reportReason}
                  onChange={e => setReportReason(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select a reason</option>
                  <option value="unsafe_driving">Unsafe Driving</option>
                  <option value="rude_behavior">Rude Behavior</option>
                  <option value="incorrect_route">Took Incorrect/Longer Route</option>
                  <option value="vehicle_issues">Vehicle Issues</option>
                  <option value="overcharging">Overcharging</option>
                  <option value="other">Other</option>
                </select>
                {reportReason === 'other' && (
                  <textarea
                    placeholder="Please specify the reason"
                    className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    rows={3}
                  ></textarea>
                )}
              </div>
            )}
          </div>

          {/* Additional Comments */}
          <div>
            <label htmlFor="additionalComments" className="block text-sm font-medium text-gray-700 mb-1">
              Additional Comments (Optional)
            </label>
            <textarea
              id="additionalComments"
              value={additionalComments}
              onChange={e => setAdditionalComments(e.target.value)}
              placeholder="Share any additional feedback about your trip"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              rows={4}
            ></textarea>
          </div>

          {/* Submit Button */}
          <button    
           onClick = {navigateToUserThanking}
            className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-lg transition-colors"
          >
            Submit Feedback
          </button>
        </div>
      </form>
    </div>
    </div>
  );
};

export default DriverFeedbackForm;