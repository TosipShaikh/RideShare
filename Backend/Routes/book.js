const express = require("express");
const router = express.Router();
const { handleSearchRides,handleGetRequestedRideDetails ,handlePostMatchRidesInDatabase , handleToGetUserRideHistory , handleToMarkRideAsCompleted , handleSubmitFeedback} = require("../Handlers/book.js");
const checkForUserAuthenticationCookie = require("../Middleware/UserAuthentication.js");


router.post("/search",handleSearchRides);

router.put("/markridecompleted/:userRouteId",checkForUserAuthenticationCookie("token"), handleToMarkRideAsCompleted);

router.post("/matchride" , checkForUserAuthenticationCookie("token"),  handlePostMatchRidesInDatabase);

router.get("/getridehistory",checkForUserAuthenticationCookie("token"),handleToGetUserRideHistory);

router.post("/submitfeedback/:userRouteId", checkForUserAuthenticationCookie("token"), handleSubmitFeedback);

module.exports = router;