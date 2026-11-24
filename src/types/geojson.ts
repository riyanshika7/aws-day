import type { Feature, FeatureCollection, Geometry, Point, LineString, Polygon, MultiPolygon } from 'geojson';
import type { FeatureCategory, VerificationStatus } from './campus';

export interface BaseCampusProperties {
  id: string;
  name: string;
  shortName?: string;
  category: FeatureCategory | string;
  verification: VerificationStatus;
  source: string;
  description?: string;
}

export interface BuildingProperties extends BaseCampusProperties {
  floors?: number;
  height?: number;
  minHeight?: number;
  color?: string;
  accessible?: boolean;
  areaAcres?: number;
}

export interface RoadProperties extends BaseCampusProperties {
  surface?: string;
  lanes?: number;
  speedLimit?: number;
  widthMeters?: number;
}

export interface PedestrianPathProperties extends BaseCampusProperties {
  surface?: string;
  lit?: boolean;
  wheelchairAccessible?: boolean;
  hasStairs?: boolean;
  widthMeters?: number;
}

export interface GateProperties extends BaseCampusProperties {
  type: string;
  access: string;
  roadAccess?: string;
  operatingHours?: string;
  securityPresent?: boolean;
}

export type CampusBuildingFeature = Feature<Polygon | MultiPolygon, BuildingProperties>;
export type CampusRoadFeature = Feature<LineString, RoadProperties>;
export type CampusPedestrianFeature = Feature<LineString, PedestrianPathProperties>;
export type CampusGateFeature = Feature<Point, GateProperties>;

export type CampusFeatureCollection<G extends Geometry = Geometry, P = Record<string, unknown>> = FeatureCollection<G, P>;
