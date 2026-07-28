const {
  searchLocations,
  reverseGeocode,
  getRouteDirections,
} = require("../APIs/openstreetmap.js");

async function handleSearchLocations(req, res) {
  const query = req.query.query || req.query.q || "";

  if (!query.trim()) {
    return res.status(400).json({ error: "Query is required" });
  }

  try {
    const results = await searchLocations(query);
    return res.status(200).json({ results });
  } catch (error) {
    console.error("Error searching locations:", error.response?.data || error.message);
    return res.status(500).json({ error: "Failed to search locations" });
  }
}

async function handleReverseGeocode(req, res) {
  const lat = req.query.lat || req.body?.lat;
  const lng = req.query.lng || req.body?.lng;

  if (lat == null || lng == null) {
    return res.status(400).json({ error: "Latitude and longitude are required" });
  }

  try {
    const result = await reverseGeocode(lat, lng);
    return res.status(200).json({ result });
  } catch (error) {
    console.error("Error reverse geocoding location:", error.response?.data || error.message);
    return res.status(500).json({ error: "Failed to reverse geocode location" });
  }
}

async function handleRoutePreview(req, res) {
  const { origin, destination } = req.body || {};

  if (!origin || !destination) {
    return res.status(400).json({ error: "Origin and destination are required" });
  }

  try {
    const routeDetails = await getRouteDirections(origin, destination);
    return res.status(200).json({ routeDetails });
  } catch (error) {
    console.error("Error getting route preview:", error.response?.data || error.message);
    return res.status(500).json({ error: "Failed to get route preview" });
  }
}

module.exports = {
  handleSearchLocations,
  handleReverseGeocode,
  handleRoutePreview,
};