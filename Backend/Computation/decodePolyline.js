function decodePolyline(encoded) {
    let index = 0, lat = 0, lng = 0;
    const coordinates = [];
  
    while (index < encoded.length) {
      let shift = 0, result = 0, byte;
  
      // Decode latitude
      do {
        byte = encoded.charCodeAt(index++) - 63;
        result |= (byte & 0x1F) << shift;
        shift += 5;
      } while (byte >= 0x20);
      
      let deltaLat = (result & 1) ? ~(result >> 1) : (result >> 1);
      lat += deltaLat;
  
      // Decode longitude
      shift = 0;
      result = 0;
      do {
        byte = encoded.charCodeAt(index++) - 63;
        result |= (byte & 0x1F) << shift;
        shift += 5;
      } while (byte >= 0x20);
  
      let deltaLng = (result & 1) ? ~(result >> 1) : (result >> 1);
      lng += deltaLng;
  
      // Apply scaling AFTER decoding
      coordinates.push({ lat: lat / 1e5, lng: lng / 1e5 });
    }
     console.log(coordinates);
    return coordinates;
  }

module.exports = { decodePolyline };

