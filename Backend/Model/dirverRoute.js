const mongoose = require("mongoose");

const routeSchema = new mongoose.Schema({
    driverId: {
        type : mongoose.Schema.Types.ObjectId,  // reference of the user
        ref : "driver",
    },
    routePath : [
        {
            lat :Number,
            lng : Number,
            _id : false,
        }
    ],
    distance : {
        type : String,
        required : true,
    },
    time : {
        type : String,
        required : true,
    },
    rideStartTime : {
        type : String,
        required : true,
    },
    date : {
        type : String,
        required : true,
    },
    status : {
        type : String,
        enum : ["completed","cancelled","matched","available","onHold","booked","notBooked","upcoming"],
        required : true,
        default : "available"
    },
    source : {
        type : String,
        required : true,
    },
    destination : {
        type : String,
        required : true,
    },
    matchedUser: {
          userId : {type : mongoose.Schema.Types.ObjectId , ref : "user"},
          userRouteId : {type : mongoose.Schema.Types.ObjectId , ref : "userRoute"},
          status: { type: String, enum: ["requested", "accepted", "declined","matched","unmatched"], default: "unmatched" },
        }
},{timestamps : true});


const route = mongoose.model("route",routeSchema);

module.exports = route;
    