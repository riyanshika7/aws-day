import type { MapViewport, LayerVisibilityState } from '../types/map';

export const NITJ_CAMPUS_CENTER: [number, number] = [75.53580, 31.39580]; // [lng, lat]

export const NITJ_CAMPUS_BOUNDS: [[number, number], [number, number]] = [
  [75.52800, 31.38800], // Southwest
  [75.54500, 31.40400]  // Northeast
];

export const INITIAL_VIEWPORT: MapViewport = {
  center: NITJ_CAMPUS_CENTER,
  zoom: 16.2,
  pitch: 40,
  bearing: -15
};

export const DEFAULT_LAYER_VISIBILITY: LayerVisibilityState = {
  buildings: true,
  roads: true,
  pedestrianPaths: true,
  gates: true,
  greenAreas: true,
  parking: true,
  landmarks: true,
  satellite: false,
  buildingExtrusion3D: true,
  signage: true
};

// OpenStreetMap & Carto Positron open style
export const MAP_STYLES = {
  vector: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
  dark: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
  voyager: 'https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json'
};

export const CATEGORY_COLORS: Record<string, string> = {
  academic: '#2563eb',
  administrative: '#7c3aed',
  hostel: '#059669',
  sports: '#ea580c',
  dining: '#d97706',
  medical: '#dc2626',
  amenity: '#0891b2',
  bank: '#0284c7',
  hospitality: '#9333ea',
  gate: '#b91c1c',
  parking: '#475569',
  boundary: '#334155'
};
