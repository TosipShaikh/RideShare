import React from 'react';
import { CheckCircle , Star  } from 'lucide-react';

const ThankingUser = () => {

   const handleSubmitFeedback = async () => {

    setShowFeedbackForm(true);
    };
  
  const [rating, setRating] = React.useState(0);
  const [feedbackText, setFeedbackText] = React.useState('');
  const [showFeedbackForm, setShowFeedbackForm] = React.useState(false);
  const [selectedRideId, setSelectedRideId] = React.useState(null);
  const [ridesChanges, setRidesChanges] = React.useState(false);
  const FeedbackFormPopup = () => (

    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-purple-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <Star className="w-8 h-8 text-purple-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Provide Feedback</h3>
          <p className="text-gray-600 mb-4">Help us improve by rating your ride and providing feedback.</p>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Rating:</label>
            <div className="flex justify-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-8 h-8 cursor-pointer ${
                    star <= rating ? 'text-yellow-500 fill-current' : 'text-gray-400'
                  }`}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="feedback" className="block text-gray-700 text-sm font-bold mb-2">
              Your Feedback:
            </label>
            <textarea
              id="feedback"
              className="shadow appearance-none border rounded-xl w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-all duration-200"
              rows="4"
              placeholder="Tell us about your ride experience..."
              value={feedbackText || ''}
              onChange={(e) => {
                console.log('Feedback text changing:', e.target.value);
                setFeedbackText(e.target.value);
              }}
            ></textarea>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => {
                setShowFeedbackForm(false);
                setSelectedRideId(null);
                setRating(0);
                setFeedbackText('');
              }}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-3 rounded-xl font-semibold transition-all duration-200"
            >
              Skip
            </button>
            <button
              onClick={handleSubmitFeedback}
              className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white px-4 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            >
              <CheckCircle className="w-5 h-5" />
              Submit Feedback
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
  <button onClick={handleSubmitFeedback}>Click</button>
  {showFeedbackForm && <FeedbackFormPopup />}
  </>
  );
};

export default ThankingUser;