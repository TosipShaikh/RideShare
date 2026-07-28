const express = require("express");
const router = express.Router();
const { handlePostOfferInDatabase  , handleGetRideDetails, handleEnterAcceptedRides , handleEnterDeclinedRides } = require("../Handlers/offer.js");

router.post("/postride", handlePostOfferInDatabase);

router.put("/enteracceptedrides/:routeId",handleEnterAcceptedRides);

router.put("/enterdeclinedrides/:routeId",handleEnterDeclinedRides);

router.get("/getridedetails",handleGetRideDetails)

module.exports = router;

