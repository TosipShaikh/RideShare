const axios = require("axios");
require("dotenv").config();

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org";
const OSRM_BASE_URL = "https://router.project-osrm.org";
const USER_AGENT = process.env.OSM_USER_AGENT || "RideShare/1.0 (OpenStreetMap migration)";
const CACHE_TTL_MS = 10 * 60 * 1000;
const cache = new Map();

function getHeaders() {
  return {
    "User-Agent": USER_AGENT,
    Accept: "application/json",
    "Accept-Language": "en",
  };
}

function getCacheKey(prefix, value) {
  return `${prefix}:${String(value).trim().toLowerCase()}`;
}

function readCache(key) {
  const entry = cache.get(key);
  if (!entry) {
    return null;
  }

  if (Date.now() > entry.expiresAt) {
    cache.delete(key);
    return null;
  }

  return entry.value;
}

function writeCache(key, value) {
  cache.set(key, {
    value,
    expiresAt: Date.now() + CACHE_TTL_MS,
  });
}

function toNumber(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function formatDistance(distanceInMeters) {
  if (!Number.isFinite(distanceInMeters)) {
    return "0 m";
  }

  if (distanceInMeters >= 1000) {
    const km = distanceInMeters / 1000;
    return `${km >= 10 ? km.toFixed(0) : km.toFixed(1)} km`;
  }

  return `${Math.round(distanceInMeters)} m`;
}

function formatDuration(durationInSeconds) {
  if (!Number.isFinite(durationInSeconds)) {
    return "0 min";
  }

  const totalMinutes = Math.max(1, Math.round(durationInSeconds / 60));

  if (totalMinutes >= 60) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    if (minutes === 0) {
      return `${hours} hr`;
    }

    return `${hours} hr ${minutes} min`;
  }

  return `${totalMinutes} min`;
}

function encodeSignedValue(value) {
  let shiftedValue = value < 0 ? ~(value << 1) : value << 1;
  let encoded = "";

  while (shiftedValue >= 0x20) {
    encoded += String.fromCharCode((0x20 | (shiftedValue & 0x1f)) + 63);
    shiftedValue >>= 5;
  }

  encoded += String.fromCharCode(shiftedValue + 63);
  return encoded;
}

function encodePolyline(coordinates) {
  let lastLatitude = 0;
  let lastLongitude = 0;
  let polyline = "";

  for (const [longitude, latitude] of coordinates) {
    const latitudeE5 = Math.round(latitude * 1e5);
    const longitudeE5 = Math.round(longitude * 1e5);
    const latitudeDelta = latitudeE5 - lastLatitude;
    const longitudeDelta = longitudeE5 - lastLongitude;

    polyline += encodeSignedValue(latitudeDelta);
    polyline += encodeSignedValue(longitudeDelta);

    lastLatitude = latitudeE5;
    lastLongitude = longitudeE5;
  }

  return polyline;
}

function mapNominatimResult(result) {
  return {
    display_name: result.display_name,
    lat: toNumber(result.lat),
    lng: toNumber(result.lon),
    place_id: result.place_id,
    type: result.type,
    class: result.class,
    importance: result.importance,
    address: result.address,
  };
}

async function searchLocations(query, limit = 5) {
  if (!query || !query.trim()) {
    return [];
  }

  const cacheKey = getCacheKey(`search:${limit}`, query);
  const cached = readCache(cacheKey);
  if (cached) {
    return cached;
  }

  const response = await axios.get(`${NOMINATIM_BASE_URL}/search`, {
    headers: getHeaders(),
    params: {
      q: query.trim(),
      format: "jsonv2",
      addressdetails: 1,
      limit,
    },
  });

  const results = Array.isArray(response.data) ? response.data.map(mapNominatimResult) : [];
  writeCache(cacheKey, results);
  return results;
}

async function geocodeAddress(address) {
  const cacheKey = getCacheKey("geocode", address);
  const cached = readCache(cacheKey);
  if (cached) {
    return cached;
  }

  const matches = await searchLocations(address, 1);
  const result = matches[0] || null;
  writeCache(cacheKey, result);
  return result;
}

async function reverseGeocode(lat, lng) {
  const cacheKey = `reverse:${lat},${lng}`;
  const cached = readCache(cacheKey);
  if (cached) {
    return cached;
  }

  const response = await axios.get(`${NOMINATIM_BASE_URL}/reverse`, {
    headers: getHeaders(),
    params: {
      lat,
      lon: lng,
      format: "jsonv2",
      addressdetails: 1,
    },
  });

  if (!response.data || !response.data.display_name) {
    return null;
  }

  const result = mapNominatimResult(response.data);
  writeCache(cacheKey, result);
  return result;
}

async function getCoords(address1, address2) {
  try {
    const [start, end] = await Promise.all([
      geocodeAddress(address1),
      geocodeAddress(address2),
    ]);

    return {
      start,
      end,
    };
  } catch (error) {
    console.error("Error in getCoords:", error.response?.data || error.message);
    return null;
  }
}

function mapOsrmSteps(steps = []) {
  return steps.map((step, index) => ({
    index: index + 1,
    distance: step.distance,
    duration: step.duration,
    readable_distance: formatDistance(step.distance),
    readable_duration: formatDuration(step.duration),
    name: step.name,
    mode: step.mode,
    maneuver: step.maneuver,
    instruction: step.maneuver?.instruction || step.maneuver?.type || step.name || "Continue",
    geometry: step.geometry,
  }));
}

async function getRouteDirections(origin, destination) {
  if (!origin || !destination || origin.lat == null || origin.lng == null || destination.lat == null || destination.lng == null) {
    throw new Error("Invalid origin or destination coordinates");
  }

  const url = `${OSRM_BASE_URL}/route/v1/driving/${origin.lng},${origin.lat};${destination.lng},${destination.lat}`;

  const cacheKey = `route:${origin.lat},${origin.lng}|${destination.lat},${destination.lng}`;
  const cached = readCache(cacheKey);
  if (cached) {
    return cached;
  }

  const response = await axios.get(url, {
    headers: getHeaders(),
    params: {
      overview: "full",
      geometries: "geojson",
      steps: "true",
    },
  });

  const route = response.data?.routes?.[0];

  if (!route) {
    throw new Error("No route found from OSRM");
  }

  const eta = new Date(Date.now() + route.duration * 1000).toISOString();
  const steps = mapOsrmSteps(route.legs?.[0]?.steps || []);
  const encodedPolyline = encodePolyline(route.geometry?.coordinates || []);

  const result = {
    code: "Ok",
    routes: [
      {
        distance: route.distance,
        duration: route.duration,
        eta,
        overview_polyline: encodedPolyline,
        geometry: route.geometry,
        legs: [
          {
            distance: route.distance,
            duration: route.duration,
            readable_distance: formatDistance(route.distance),
            readable_duration: formatDuration(route.duration),
            steps,
            eta,
          },
        ],
      },
    ],
    waypoints: response.data?.waypoints || [],
  };

  writeCache(cacheKey, result);
  return result;
}

module.exports = {
  searchLocations,
  reverseGeocode,
  getCoords,
  getRouteDirections,
  formatDistance,
  formatDuration,
};