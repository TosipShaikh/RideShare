const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  feedbackText: {
    type: String,
    trim: true,
    maxlength: 1000
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  userRouteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'userRoute',
    required: true
  }
},{timestamps: true });

module.exports = mongoose.model('feedback', feedbackSchema);
