export type FeatureCategory = 
  | 'academic'
  | 'administrative'
  | 'hostel'
  | 'sports'
  | 'dining'
  | 'medical'
  | 'amenity'
  | 'bank'
  | 'hospitality'
  | 'gate'
  | 'parking'
  | 'boundary';

export type VerificationStatus = 
  | 'verified'
  | 'partially_verified'
  | 'unverified';

export interface CampusFeature {
  id: string;
  name: string;
  shortName: string;
  category: FeatureCategory;
  coordinates: [number, number]; // [lng, lat]
  verification: VerificationStatus;
  source: string;
  description: string;
  tags: string[];
  operatingHours?: string;
  accessibility?: string;
  floors?: number;
  height?: number;
  facilities?: string[];
  phone?: string;
  image?: string;
}

export interface RouteStep {
  instruction: string;
  distanceMeters: number;
  durationSeconds: number;
  coordinate: [number, number];
}

export interface CampusRoute {
  originId: string;
  destinationId: string;
  originName: string;
  destinationName: string;
  totalDistanceMeters: number;
  estimatedWalkingMinutes: number;
  steps: RouteStep[];
  pathCoordinates: [number, number][];
  isWheelchairAccessible: boolean;
}
