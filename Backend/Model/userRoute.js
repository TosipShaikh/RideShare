const mongoose = require("mongoose");

const userRouteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true
    },
    rideId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "route",
      required: true
    },
    startLocation: {
      type: String,
      required: true
    },
    endLocation: {
      type: String,
      required: true
    },
    time: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "declined", "completed", "requested"],
      default: "pending"
    },
    rideCost: {
      type: Number,
      required: true
    },
    date: {
      type: String,
      required: true
    },

    
    declinedAt: {
      type: Date,
      default: null,
      expires: 86400
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("userRoute", userRouteSchema);
