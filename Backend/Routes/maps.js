const express = require("express");
const {
  handleSearchLocations,
  handleReverseGeocode,
  handleRoutePreview,
} = require("../Handlers/maps.js");

const router = express.Router();

router.get("/search", handleSearchLocations);
router.get("/reverse", handleReverseGeocode);
router.post("/route", handleRoutePreview);

module.exports = router;