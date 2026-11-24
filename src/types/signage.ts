export type SignageType = 
  | 'entrance_welcome'      // Main entrance welcome banner
  | 'directional_arrow'     // Directional arrow board
  | 'junction_sign'         // Campus junction sign
  | 'venue_arrival'         // Event venue welcome banner
  | 'registration_checkin'  // Registration and speaker check-in
  | 'parking_accessibility'; // Parking and accessibility directions

export type ArrowDirection = 
  | 'straight' 
  | 'slight_left' 
  | 'slight_right' 
  | 'left' 
  | 'right' 
  | 'u_turn' 
  | 'none';

export type SignageStatus = 
  | 'proposed' 
  | 'in_production' 
  | 'installed' 
  | 'inspected';

export type BannerDimension = 
  | '6x3_feet'   // Outdoor Vinyl Banner - 72" x 36"
  | '4x2_feet'   // Mid-size Directional Vinyl - 48" x 24"
  | '3x2_feet'   // Coroplast Wayfinding Sign - 36" x 24"
  | '2.5x6_feet' // Roll-Up Standee / Totem - 30" x 72"
  | 'a3_kiosk';   // Kiosk Board / Post Mount - 11.7" x 16.5"

export interface Signboard {
  id: string; // e.g. "SIGN-AWS-001"
  title: string;
  locationDescription: string;
  coordinates: [number, number]; // [lng, lat]
  type: SignageType;
  arrowDirection: ArrowDirection;
  destinationId: string; // ID of campus feature (e.g. "CEN-01", "CEN-03", "LHC-01", "ACA-02")
  destinationName: string;
  distanceMeters: number | null; // null if uncomputed or unverified
  estimatedWalkingMinutes: number | null;
  dimension: BannerDimension;
  installationStatus: SignageStatus;
  material?: string;
  notes?: string;
  customMessage?: string;
  qrUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface EventVenueCandidate {
  id: string;
  name: string;
  shortName: string;
  coordinates: [number, number];
  capacity: number;
  description: string;
  isConfirmed: boolean;
}

export interface EventConfig {
  eventName: string;
  eventSubtitle: string;
  editionYear: number;
  hostInstitution: string;
  locationCity: string;
  dates: string;
  themeColorPrimary: string;
  themeColorSecondary: string;
  themeColorAccent: string;
  activeVenueId: string;
  candidateVenues: EventVenueCandidate[];
}
