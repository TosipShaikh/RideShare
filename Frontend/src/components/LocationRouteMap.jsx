import { useEffect, useMemo, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { getRoutePreview } from "../utils/mapApi.js";

function createMarkerElement(color) {
  const marker = document.createElement("div");
  marker.style.width = "18px";
  marker.style.height = "18px";
  marker.style.borderRadius = "9999px";
  marker.style.background = color;
  marker.style.border = "3px solid white";
  marker.style.boxShadow = "0 8px 24px rgba(15, 23, 42, 0.25)";
  marker.style.cursor = "grab";
  return marker;
}

function toFeature(coordinates) {
  return {
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates,
    },
  };
}

function formatArrival(eta) {
  if (!eta) {
    return "--";
  }

  const date = new Date(eta);
  if (Number.isNaN(date.getTime())) {
    return "--";
  }

  return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

const openStreetMapStyle = {
  version: 8,
  sources: {
    osm: {
      type: "raster",
      tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
      tileSize: 256,
      attribution: "&copy; OpenStreetMap contributors",
    },
  },
  layers: [
    {
      id: "osm-layer",
      type: "raster",
      source: "osm",
    },
  ],
};

const LocationRouteMap = ({ pickup, dropoff, onPickupMove, onDropoffMove }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const pickupMarkerRef = useRef(null);
  const dropoffMarkerRef = useRef(null);
  const currentLocationMarkerRef = useRef(null);
  const routeDetailsRef = useRef(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [routeDetails, setRouteDetails] = useState(null);
  const routeSummary = useMemo(() => {
    const route = routeDetails?.routes?.[0];
    const leg = route?.legs?.[0];

    return {
      distance: leg?.readable_distance || "--",
      duration: leg?.readable_duration || "--",
      eta: formatArrival(leg?.eta || route?.eta),
    };
  }, [routeDetails]);

  routeDetailsRef.current = routeDetails;

  const syncRouteOnMap = () => {
    const map = mapRef.current;
    if (!map || !map.getSource("route")) {
      return;
    }

    const route = routeDetailsRef.current?.routes?.[0];
    const coordinates = route?.geometry?.coordinates || [];
    const source = map.getSource("route");

    if (source) {
      source.setData({
        type: "FeatureCollection",
        features: coordinates.length > 0 ? [toFeature(coordinates)] : [],
      });
    }

    const bounds = new maplibregl.LngLatBounds();
    if (coordinates.length > 0) {
      coordinates.forEach(([lng, lat]) => bounds.extend([lng, lat]));
    } else {
      if (pickup?.lat != null && pickup?.lng != null) {
        bounds.extend([pickup.lng, pickup.lat]);
      }
      if (dropoff?.lat != null && dropoff?.lng != null) {
        bounds.extend([dropoff.lng, dropoff.lat]);
      }
      if (currentLocation?.lat != null && currentLocation?.lng != null) {
        bounds.extend([currentLocation.lng, currentLocation.lat]);
      }
    }

    if (!bounds.isEmpty()) {
      map.fitBounds(bounds, { padding: 48, maxZoom: 15, duration: 500 });
    }
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      return undefined;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => {
        setCurrentLocation(null);
      }
    );

    return undefined;
  }, []);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) {
      return undefined;
    }

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: openStreetMapStyle,
      center: currentLocation ? [currentLocation.lng, currentLocation.lat] : [78.9629, 20.5937],
      zoom: currentLocation ? 12 : 4,
    });

    map.addControl(new maplibregl.NavigationControl(), "top-right");

    map.on("load", () => {
      if (!map.getSource("route")) {
        map.addSource("route", {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [],
          },
        });
      }

      if (!map.getLayer("route-line")) {
        map.addLayer({
          id: "route-line",
          type: "line",
          source: "route",
          paint: {
            "line-color": "#4f46e5",
            "line-width": 5,
            "line-opacity": 0.85,
          },
        });
      }

      syncRouteOnMap();
    });

    mapRef.current = map;

    return () => {
      pickupMarkerRef.current?.remove();
      dropoffMarkerRef.current?.remove();
      currentLocationMarkerRef.current?.remove();
      map.remove();
      mapRef.current = null;
    };
  }, [currentLocation]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) {
      return undefined;
    }

    pickupMarkerRef.current?.remove();
    dropoffMarkerRef.current?.remove();
    currentLocationMarkerRef.current?.remove();

    if (currentLocation) {
      currentLocationMarkerRef.current = new maplibregl.Marker({
        element: createMarkerElement("#2563eb"),
      })
        .setLngLat([currentLocation.lng, currentLocation.lat])
        .addTo(map);
    }

    if (pickup?.lat != null && pickup?.lng != null) {
      const marker = new maplibregl.Marker({
        element: createMarkerElement("#16a34a"),
        draggable: true,
      })
        .setLngLat([pickup.lng, pickup.lat])
        .addTo(map);

      marker.on("dragend", () => {
        const position = marker.getLngLat();
        onPickupMove?.({ lat: position.lat, lng: position.lng });
      });

      pickupMarkerRef.current = marker;
    }

    if (dropoff?.lat != null && dropoff?.lng != null) {
      const marker = new maplibregl.Marker({
        element: createMarkerElement("#dc2626"),
        draggable: true,
      })
        .setLngLat([dropoff.lng, dropoff.lat])
        .addTo(map);

      marker.on("dragend", () => {
        const position = marker.getLngLat();
        onDropoffMove?.({ lat: position.lat, lng: position.lng });
      });

      dropoffMarkerRef.current = marker;
    }

    return undefined;
  }, [currentLocation, dropoff, onDropoffMove, onPickupMove, pickup]);

  useEffect(() => {
    let cancelled = false;

    async function loadRoute() {
      if (pickup?.lat == null || pickup?.lng == null || dropoff?.lat == null || dropoff?.lng == null) {
        setRouteDetails(null);
        return;
      }

      try {
        const route = await getRoutePreview(
          { lat: pickup.lat, lng: pickup.lng },
          { lat: dropoff.lat, lng: dropoff.lng }
        );

        if (!cancelled) {
          setRouteDetails(route);
        }
      } catch (error) {
        if (!cancelled) {
          setRouteDetails(null);
          console.error("Error loading route preview:", error);
        }
      }
    }

    loadRoute();

    return () => {
      cancelled = true;
    };
  }, [dropoff?.lat, dropoff?.lng, pickup?.lat, pickup?.lng]);

  useEffect(() => {
    syncRouteOnMap();
  }, [currentLocation, dropoff, pickup, routeDetails]);

  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
      <div ref={mapContainerRef} className="h-[420px] w-full" />
      <div className="grid grid-cols-1 gap-3 border-t border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-700 md:grid-cols-3">
        <div>
          <p className="font-semibold text-slate-900">Distance</p>
          <p>{routeSummary.distance}</p>
        </div>
        <div>
          <p className="font-semibold text-slate-900">Duration</p>
          <p>{routeSummary.duration}</p>
        </div>
        <div>
          <p className="font-semibold text-slate-900">Estimated Arrival</p>
          <p>{routeSummary.eta}</p>
        </div>
      </div>
    </div>
  );
};

export default LocationRouteMap;