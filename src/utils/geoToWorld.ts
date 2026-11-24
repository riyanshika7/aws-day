import { NITJ_CAMPUS_CENTER } from '../config/mapConfig';

// Reference anchor at NITJ center
const REF_LNG = NITJ_CAMPUS_CENTER[0]; // 75.53580
const REF_LAT = NITJ_CAMPUS_CENTER[1]; // 31.39580

// Metric scaling factors around latitude 31.3958° N
const METERS_PER_LAT = 111320;
const METERS_PER_LNG = 111320 * Math.cos((REF_LAT * Math.PI) / 180); // ~95021 m/deg

/**
 * Converts WGS84 Geographic Coordinates [lng, lat] into Three.js 3D Cartesian coordinates [x, y, z].
 * Standard spatial mapping:
 * - East: +X
 * - West: -X
 * - North: -Z
 * - South: +Z
 * - Elevation / Up: +Y (meters above ground)
 */
export function geoToWorld(coord: [number, number], elevationMeters = 0): [number, number, number] {
  const [lng, lat] = coord;
  const x = (lng - REF_LNG) * METERS_PER_LNG;
  const z = -(lat - REF_LAT) * METERS_PER_LAT;
  return [x, elevationMeters, z];
}

/**
 * Converts Three.js 3D Cartesian coordinates [x, z] back to WGS84 [lng, lat].
 */
export function worldToGeo(x: number, z: number): [number, number] {
  const lng = REF_LNG + x / METERS_PER_LNG;
  const lat = REF_LAT - z / METERS_PER_LAT;
  return [lng, lat];
}
