export interface GraphNode {
  id: string;
  coordinates: [number, number]; // [lng, lat]
  name?: string;
  isEntryPoint?: boolean;
  featureId?: string;
  accessible: boolean;
}

export interface GraphEdge {
  fromNodeId: string;
  toNodeId: string;
  distanceMeters: number;
  weight: number;
  accessible: boolean;
  hasStairs: boolean;
  lit: boolean;
  surface: string;
}

export interface RoutingOptions {
  wheelchairOnly?: boolean;
  preferLit?: boolean;
}

export interface PathResult {
  found: boolean;
  totalDistanceMeters: number;
  estimatedWalkingMinutes: number;
  pathCoordinates: [number, number][];
  nodeIds: string[];
}
