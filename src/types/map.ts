export interface MapViewport {
  center: [number, number]; // [lng, lat]
  zoom: number;
  pitch: number;
  bearing: number;
}

export interface LayerVisibilityState {
  buildings: boolean;
  roads: boolean;
  pedestrianPaths: boolean;
  gates: boolean;
  greenAreas: boolean;
  parking: boolean;
  landmarks: boolean;
  satellite: boolean;
  buildingExtrusion3D: boolean;
  signage: boolean; // AWS Event Signage markers
}

export type BasemapMode = 'vector' | 'satellite';
