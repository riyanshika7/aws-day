import type { Signboard, EventConfig } from '../types/signage';
import { AWS_COMMUNITY_DAY_CONFIG, INITIAL_SIGNBOARDS } from '../config/eventConfig';
import { haversineDistanceMeters, estimateWalkingMinutes } from '../utils/geoUtils';

const STORAGE_KEY_SIGNBOARDS = 'nitj_aws_scd_2027_signboards';
const STORAGE_KEY_CONFIG = 'nitj_aws_scd_2027_config';

class SignageService {
  private signboards: Signboard[] = [];
  private eventConfig: EventConfig = AWS_COMMUNITY_DAY_CONFIG;
  private listeners: Set<() => void> = new Set();

  constructor() {
    this.init();
  }

  private init() {
    // Load config
    const savedConfig = localStorage.getItem(STORAGE_KEY_CONFIG);
    if (savedConfig) {
      try {
        this.eventConfig = JSON.parse(savedConfig);
      } catch (e) {
        console.warn('Failed to parse saved event config, using default', e);
      }
    }

    // Load signboards
    const savedSignboards = localStorage.getItem(STORAGE_KEY_SIGNBOARDS);
    if (savedSignboards) {
      try {
        this.signboards = JSON.parse(savedSignboards);
      } catch (e) {
        console.warn('Failed to parse saved signboards, using defaults', e);
        this.signboards = this.buildInitialSignboards();
      }
    } else {
      this.signboards = this.buildInitialSignboards();
      this.saveToStorage();
    }
  }

  private buildInitialSignboards(): Signboard[] {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5173';
    return INITIAL_SIGNBOARDS.map((s) => ({
      ...s,
      qrUrl: `${origin}/?event=aws-scd-2027&sign=${s.id}&dest=${s.destinationId}&from=${s.coordinates[0].toFixed(5)},${s.coordinates[1].toFixed(5)}`
    }));
  }

  private saveToStorage() {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(STORAGE_KEY_SIGNBOARDS, JSON.stringify(this.signboards));
      localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(this.eventConfig));
    }
    this.notify();
  }

  private notify() {
    this.listeners.forEach((fn) => fn());
  }

  public subscribe(callback: () => void): () => void {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  public getSignboards(): Signboard[] {
    return [...this.signboards];
  }

  public getSignboardById(id: string): Signboard | undefined {
    return this.signboards.find((s) => s.id === id);
  }

  public getEventConfig(): EventConfig {
    return { ...this.eventConfig };
  }

  public getActiveVenue() {
    const venue = this.eventConfig.candidateVenues.find(
      (v) => v.id === this.eventConfig.activeVenueId
    );
    return venue || this.eventConfig.candidateVenues[0];
  }

  public generateQrUrl(signboardId: string, destId: string, coords: [number, number]): string {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:5173';
    return `${origin}/?event=aws-scd-2027&sign=${signboardId}&dest=${destId}&from=${coords[0].toFixed(5)},${coords[1].toFixed(5)}`;
  }

  public calculateMetrics(
    signCoords: [number, number],
    destCoords: [number, number]
  ): { distanceMeters: number; walkingMinutes: number } {
    const dist = haversineDistanceMeters(signCoords, destCoords);
    const mins = estimateWalkingMinutes(dist);
    return { distanceMeters: dist, walkingMinutes: mins };
  }

  public addSignboard(data: Omit<Signboard, 'id' | 'createdAt' | 'updatedAt' | 'qrUrl'>): Signboard {
    const nextIdx = this.signboards.length + 1;
    const padNum = String(nextIdx).padStart(3, '0');
    const id = `SIGN-AWS-${padNum}`;
    const now = new Date().toISOString();
    const qrUrl = this.generateQrUrl(id, data.destinationId, data.coordinates);

    const newSign: Signboard = {
      ...data,
      id,
      qrUrl,
      createdAt: now,
      updatedAt: now
    };

    this.signboards.push(newSign);
    this.saveToStorage();
    return newSign;
  }

  public updateSignboard(id: string, updates: Partial<Signboard>): Signboard | undefined {
    const index = this.signboards.findIndex((s) => s.id === id);
    if (index === -1) return undefined;

    const current = this.signboards[index];
    const updated: Signboard = {
      ...current,
      ...updates,
      updatedAt: new Date().toISOString()
    };

    // If coordinates or destination changed, re-compute QR url
    if (updates.coordinates || updates.destinationId) {
      updated.qrUrl = this.generateQrUrl(
        updated.id,
        updated.destinationId,
        updated.coordinates
      );
    }

    this.signboards[index] = updated;
    this.saveToStorage();
    return updated;
  }

  public deleteSignboard(id: string): boolean {
    const initialLen = this.signboards.length;
    this.signboards = this.signboards.filter((s) => s.id !== id);
    if (this.signboards.length !== initialLen) {
      this.saveToStorage();
      return true;
    }
    return false;
  }

  public setActiveVenue(venueId: string) {
    const candidate = this.eventConfig.candidateVenues.find((v) => v.id === venueId);
    if (!candidate) return;

    this.eventConfig.activeVenueId = venueId;
    this.eventConfig.candidateVenues = this.eventConfig.candidateVenues.map((v) => ({
      ...v,
      isConfirmed: v.id === venueId
    }));

    // Modular cascade: update all signboards pointing to the keynote event venue!
    this.signboards = this.signboards.map((s) => {
      // Recompute metrics to candidate venue
      const metrics = this.calculateMetrics(s.coordinates, candidate.coordinates);
      return {
        ...s,
        destinationId: candidate.id,
        destinationName: candidate.name,
        distanceMeters: metrics.distanceMeters,
        estimatedWalkingMinutes: metrics.walkingMinutes,
        qrUrl: this.generateQrUrl(s.id, candidate.id, s.coordinates),
        updatedAt: new Date().toISOString()
      };
    });

    this.saveToStorage();
  }

  public resetToDefaults(): Signboard[] {
    this.eventConfig = AWS_COMMUNITY_DAY_CONFIG;
    this.signboards = this.buildInitialSignboards();
    this.saveToStorage();
    return this.getSignboards();
  }
}

export const signageStore = new SignageService();
