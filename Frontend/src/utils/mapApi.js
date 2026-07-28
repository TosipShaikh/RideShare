const API_BASE_URL = "http://localhost:5001";
const searchCache = new Map();
const reverseCache = new Map();
const routeCache = new Map();
const searchInFlight = new Map();
const reverseInFlight = new Map();
const routeInFlight = new Map();
const CACHE_TTL_MS = 10 * 60 * 1000;

function cacheKey(prefix, ...parts) {
  return `${prefix}:${parts.map((part) => String(part).trim().toLowerCase()).join("|")}`;
}

function readCache(store, key) {
  const entry = store.get(key);
  if (!entry) {
    return null;
  }

  if (Date.now() > entry.expiresAt) {
    store.delete(key);
    return null;
  }

  return entry.value;
}

function writeCache(store, key, value) {
  store.set(key, {
    value,
    expiresAt: Date.now() + CACHE_TTL_MS,
  });
}

async function readJson(response) {
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
}

async function searchLocations(query) {
  if (!query || query.trim().length < 3) {
    return [];
  }

  const normalizedQuery = query.trim();
  const key = cacheKey("search", normalizedQuery);
  const cached = readCache(searchCache, key);
  if (cached) {
    return cached;
  }

  const existing = searchInFlight.get(key);
  if (existing) {
    return existing;
  }

  const request = (async () => {
    const response = await fetch(`${API_BASE_URL}/maps/search?query=${encodeURIComponent(normalizedQuery)}`, {
      headers: {
        Accept: "application/json",
      },
    });

    const data = await readJson(response);
    const results = (data.results || []).map((result) => ({
      description: result.display_name,
      display_name: result.display_name,
      lat: result.lat,
      lng: result.lng,
      place_id: result.place_id,
      address: result.address,
    }));

    writeCache(searchCache, key, results);
    return results;
  })();

  searchInFlight.set(key, request);

  try {
    return await request;
  } finally {
    searchInFlight.delete(key);
  }
}

async function reverseGeocode(lat, lng) {
  const key = cacheKey("reverse", lat, lng);
  const cached = readCache(reverseCache, key);
  if (cached) {
    return cached;
  }

  const existing = reverseInFlight.get(key);
  if (existing) {
    return existing;
  }

  const request = (async () => {
    const response = await fetch(`${API_BASE_URL}/maps/reverse?lat=${encodeURIComponent(lat)}&lng=${encodeURIComponent(lng)}`, {
      headers: {
        Accept: "application/json",
      },
    });

    const data = await readJson(response);
    const result = data.result;

    if (!result) {
      return null;
    }

    const resolved = {
      description: result.display_name,
      display_name: result.display_name,
      lat: result.lat,
      lng: result.lng,
      place_id: result.place_id,
      address: result.address,
    };

    writeCache(reverseCache, key, resolved);
    return resolved;
  })();

  reverseInFlight.set(key, request);

  try {
    return await request;
  } finally {
    reverseInFlight.delete(key);
  }
}

async function getRoutePreview(origin, destination) {
  const key = cacheKey("route", origin.lat, origin.lng, destination.lat, destination.lng);
  const cached = readCache(routeCache, key);
  if (cached) {
    return cached;
  }

  const existing = routeInFlight.get(key);
  if (existing) {
    return existing;
  }

  const request = (async () => {
    const response = await fetch(`${API_BASE_URL}/maps/route`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ origin, destination }),
    });

    const data = await readJson(response);
    const routeDetails = data.routeDetails || null;
    writeCache(routeCache, key, routeDetails);
    return routeDetails;
  })();

  routeInFlight.set(key, request);

  try {
    return await request;
  } finally {
    routeInFlight.delete(key);
  }
}

export { searchLocations, reverseGeocode, getRoutePreview };