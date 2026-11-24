/**
 * Calculate Great Circle distance between two points on WGS84 ellipsoid in meters (Haversine formula)
 */
export function haversineDistanceMeters(
  coord1: [number, number],
  coord2: [number, number]
): number {
  const [lon1, lat1] = coord1;
  const [lon2, lat2] = coord2;

  const R = 6371000; // Radius of Earth in meters
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

/**
 * Calculate bearing in degrees from point A to point B
 */
export function calculateBearingDegrees(
  start: [number, number],
  dest: [number, number]
): number {
  const [startLng, startLat] = start;
  const [destLng, destLat] = dest;

  const y = Math.sin(((destLng - startLng) * Math.PI) / 180) * Math.cos((destLat * Math.PI) / 180);
  const x =
    Math.cos((startLat * Math.PI) / 180) * Math.sin((destLat * Math.PI) / 180) -
    Math.sin((startLat * Math.PI) / 180) *
      Math.cos((destLat * Math.PI) / 180) *
      Math.cos(((destLng - startLng) * Math.PI) / 180);

  const brng = (Math.atan2(y, x) * 180) / Math.PI;
  return (brng + 360) % 360;
}

/**
 * Format meters into human readable distance (m or km)
 */
export function formatDistance(meters: number): string {
  if (meters < 1000) {
    return `${Math.round(meters)} m`;
  }
  return `${(meters / 1000).toFixed(1)} km`;
}

/**
 * Estimate walking duration in minutes at average pedestrian pace (4.5 km/h = 75 m/min)
 */
export function estimateWalkingMinutes(meters: number): number {
  const walkingSpeedMetersPerMin = 75;
  return Math.max(1, Math.ceil(meters / walkingSpeedMetersPerMin));
}
