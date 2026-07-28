function findIntersections(driverRoute, userStart, userEnd, tolerance = 1.0) {
    if (!driverRoute || driverRoute.length === 0) return { firstIntersection: null, lastIntersection: null };

    let firstIntersection = null, lastIntersection = null;
    let firstIndex = -1, lastIndex = -1;

    function haversineDistance(lat1, lon1, lat2, lon2) {
        const R = 6371;
        const toRad = (deg) => (deg * Math.PI) / 180;
        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);
        const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
        return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    }

    let startCandidates = [], endCandidates = [];
    
    for (let i = 0; i < driverRoute.length; i++) {
        let distStart = haversineDistance(driverRoute[i].lat, driverRoute[i].lng, userStart.lat, userStart.lng);
        let distEnd = haversineDistance(driverRoute[i].lat, driverRoute[i].lng, userEnd.lat, userEnd.lng);

        if (distStart <= tolerance) startCandidates.push({ point: driverRoute[i], index: i, distance: distStart });
        if (distEnd <= tolerance) endCandidates.push({ point: driverRoute[i], index: i, distance: distEnd });
    }

    if (startCandidates.length > 0) {
        startCandidates.sort((a, b) => a.distance - b.distance);
        firstIntersection = startCandidates[0].point;
        firstIndex = startCandidates[0].index;
    }

    if (endCandidates.length > 0) {
        endCandidates = endCandidates.filter((e) => e.index > firstIndex);
        if (endCandidates.length > 0) {
            endCandidates.sort((a, b) => a.distance - b.distance);
            lastIntersection = endCandidates[0].point;
            lastIndex = endCandidates[0].index;
        }
    }

    return { firstIntersection, lastIntersection, firstIndex, lastIndex };
}

module.exports = {findIntersections};