import React, { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import {
  NITJ_CAMPUS_BOUNDS,
  INITIAL_VIEWPORT,
  MAP_STYLES,
} from '../../config/mapConfig';
import type { CampusFeature, CampusRoute } from '../../types/campus';
import type { LayerVisibilityState } from '../../types/map';
import type { Signboard } from '../../types/signage';

import buildingsData from '../../data/geojson/buildings.geojson';
import roadsData from '../../data/geojson/roads.geojson';
import pedestrianPathsData from '../../data/geojson/pedestrian_paths.geojson';
import gatesData from '../../data/geojson/gates.geojson';
import greenAreasData from '../../data/geojson/green_areas.geojson';
import parkingData from '../../data/geojson/parking.geojson';
import landmarksData from '../../data/geojson/landmarks.geojson';

interface CampusMapProps {
  selectedFeature: CampusFeature | null;
  onSelectFeature: (feature: CampusFeature | null) => void;
  selectedSignboard?: Signboard | null;
  onSelectSignboard?: (sign: Signboard | null) => void;
  signboards?: Signboard[];
  activeRoute: CampusRoute | null;
  layerVisibility: LayerVisibilityState;
  allFeatures: CampusFeature[];
  mapRefOut?: React.MutableRefObject<maplibregl.Map | null>;
}

export const CampusMap: React.FC<CampusMapProps> = ({
  selectedFeature,
  onSelectFeature,
  selectedSignboard,
  onSelectSignboard,
  signboards = [],
  activeRoute,
  layerVisibility,
  allFeatures,
  mapRefOut,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<maplibregl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: MAP_STYLES.vector,
      center: INITIAL_VIEWPORT.center,
      zoom: INITIAL_VIEWPORT.zoom,
      pitch: INITIAL_VIEWPORT.pitch,
      bearing: INITIAL_VIEWPORT.bearing,
      maxBounds: NITJ_CAMPUS_BOUNDS,
      attributionControl: { compact: true },
    });

    map.addControl(new maplibregl.ScaleControl({ unit: 'metric' }), 'bottom-right');

    map.on('load', () => {
      // 1. Add Campus Boundary & Green Areas
      map.addSource('green-areas-source', {
        type: 'geojson',
        data: greenAreasData as any,
      });

      map.addLayer({
        id: 'green-areas-fill',
        type: 'fill',
        source: 'green-areas-source',
        paint: {
          'fill-color': '#10b981',
          'fill-opacity': 0.25,
        },
      });

      map.addLayer({
        id: 'green-areas-line',
        type: 'line',
        source: 'green-areas-source',
        paint: {
          'line-color': '#059669',
          'line-width': 1.5,
          'line-opacity': 0.6,
        },
      });

      // 2. Add Parking Bays
      map.addSource('parking-source', {
        type: 'geojson',
        data: parkingData as any,
      });

      map.addLayer({
        id: 'parking-fill',
        type: 'fill',
        source: 'parking-source',
        paint: {
          'fill-color': '#64748b',
          'fill-opacity': 0.35,
        },
      });

      map.addLayer({
        id: 'parking-line',
        type: 'line',
        source: 'parking-source',
        paint: {
          'line-color': '#475569',
          'line-width': 1.5,
          'line-dasharray': [2, 1],
        },
      });

      // 3. Add Vehicular Roads
      map.addSource('roads-source', {
        type: 'geojson',
        data: roadsData as any,
      });

      map.addLayer({
        id: 'roads-casing',
        type: 'line',
        source: 'roads-source',
        paint: {
          'line-color': '#94a3b8',
          'line-width': 8,
          'line-opacity': 0.7,
        },
      });

      map.addLayer({
        id: 'roads-inner',
        type: 'line',
        source: 'roads-source',
        paint: {
          'line-color': '#ffffff',
          'line-width': 5,
        },
      });

      // 4. Add Pedestrian Walkways
      map.addSource('pedestrian-paths-source', {
        type: 'geojson',
        data: pedestrianPathsData as any,
      });

      map.addLayer({
        id: 'pedestrian-paths-line',
        type: 'line',
        source: 'pedestrian-paths-source',
        paint: {
          'line-color': '#f59e0b',
          'line-width': 3,
          'line-dasharray': [2, 1.5],
          'line-opacity': 0.9,
        },
      });

      // 5. Add Buildings (3D extrusion + 2D fill)
      map.addSource('buildings-source', {
        type: 'geojson',
        data: buildingsData as any,
      });

      // 3D Extruded Buildings
      map.addLayer({
        id: 'buildings-3d',
        type: 'fill-extrusion',
        source: 'buildings-source',
        filter: ['!=', ['get', 'category'], 'boundary'],
        paint: {
          'fill-extrusion-color': [
            'coalesce',
            ['get', 'color'],
            '#2563eb',
          ],
          'fill-extrusion-height': [
            'coalesce',
            ['get', 'height'],
            12.0,
          ],
          'fill-extrusion-base': 0,
          'fill-extrusion-opacity': 0.85,
        },
      });

      // Campus Outer Boundary line
      map.addLayer({
        id: 'campus-boundary-line',
        type: 'line',
        source: 'buildings-source',
        filter: ['==', ['get', 'category'], 'boundary'],
        paint: {
          'line-color': '#1a365d',
          'line-width': 3,
          'line-dasharray': [3, 2],
          'line-opacity': 0.8,
        },
      });

      // 6. Add Gates
      map.addSource('gates-source', {
        type: 'geojson',
        data: gatesData as any,
      });

      map.addLayer({
        id: 'gates-circle',
        type: 'circle',
        source: 'gates-source',
        paint: {
          'circle-radius': 7,
          'circle-color': '#dc2626',
          'circle-stroke-width': 2,
          'circle-stroke-color': '#ffffff',
        },
      });

      // 7. Add Landmarks / POIs
      map.addSource('landmarks-source', {
        type: 'geojson',
        data: landmarksData as any,
      });

      map.addLayer({
        id: 'landmarks-circle',
        type: 'circle',
        source: 'landmarks-source',
        paint: {
          'circle-radius': 6,
          'circle-color': '#d97706',
          'circle-stroke-width': 2,
          'circle-stroke-color': '#ffffff',
        },
      });

      // 7B. Add AWS Event Signboard Markers Layer
      map.addSource('signboards-source', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: signboards.map((s) => ({
            type: 'Feature',
            id: s.id,
            geometry: {
              type: 'Point',
              coordinates: s.coordinates,
            },
            properties: {
              id: s.id,
              title: s.title,
              type: s.type,
              destinationName: s.destinationName,
              arrowDirection: s.arrowDirection,
              installationStatus: s.installationStatus,
            },
          })),
        },
      });

      map.addLayer({
        id: 'signboards-halo',
        type: 'circle',
        source: 'signboards-source',
        paint: {
          'circle-radius': 13,
          'circle-color': '#ff9900',
          'circle-opacity': 0.35,
        },
      });

      map.addLayer({
        id: 'signboards-circle',
        type: 'circle',
        source: 'signboards-source',
        paint: {
          'circle-radius': 8,
          'circle-color': '#ff9900',
          'circle-stroke-width': 2.5,
          'circle-stroke-color': '#232f3e',
        },
      });

      // 8. Add Active Navigation Route Line
      map.addSource('active-route-source', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [],
        },
      });

      map.addLayer({
        id: 'active-route-glow',
        type: 'line',
        source: 'active-route-source',
        paint: {
          'line-color': '#60a5fa',
          'line-width': 8,
          'line-opacity': 0.5,
          'line-blur': 3,
        },
      });

      map.addLayer({
        id: 'active-route-line',
        type: 'line',
        source: 'active-route-source',
        paint: {
          'line-color': '#2563eb',
          'line-width': 4.5,
          'line-opacity': 1.0,
        },
      });

      // Cursor & Click Interactivity for Buildings
      map.on('click', 'buildings-3d', (e) => {
        if (!e.features || e.features.length === 0) return;
        const featureProps = e.features[0].properties;
        if (!featureProps || !featureProps.id) return;

        const matched = allFeatures.find((f) => f.id === featureProps.id);
        if (matched) {
          onSelectFeature(matched);
        }
      });

      map.on('mouseenter', 'buildings-3d', () => {
        map.getCanvas().style.cursor = 'pointer';
      });
      map.on('mouseleave', 'buildings-3d', () => {
        map.getCanvas().style.cursor = '';
      });

      // Click on Gates & Landmarks
      map.on('click', 'gates-circle', (e) => {
        if (!e.features || e.features.length === 0) return;
        const gateProps = e.features[0].properties;
        const matched = allFeatures.find((f) => f.id === gateProps?.id);
        if (matched) onSelectFeature(matched);
      });

      map.on('click', 'landmarks-circle', (e) => {
        if (!e.features || e.features.length === 0) return;
        const lmProps = e.features[0].properties;
        const matched = allFeatures.find((f) => f.id === lmProps?.id);
        if (matched) onSelectFeature(matched);
      });

      // Click on AWS Signboards
      map.on('click', 'signboards-circle', (e) => {
        if (!e.features || e.features.length === 0) return;
        const signProps = e.features[0].properties;
        const matchedSign = signboards.find((s) => s.id === signProps?.id);
        if (matchedSign && onSelectSignboard) {
          onSelectSignboard(matchedSign);
        }
      });

      map.on('mouseenter', 'signboards-circle', () => {
        map.getCanvas().style.cursor = 'pointer';
      });
      map.on('mouseleave', 'signboards-circle', () => {
        map.getCanvas().style.cursor = '';
      });

      setMapLoaded(true);
    });

    mapInstanceRef.current = map;
    if (mapRefOut) mapRefOut.current = map;

    return () => {
      map.remove();
    };
  }, []);

  // Update Signboards Source on Map
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !mapLoaded) return;

    const source = map.getSource('signboards-source') as maplibregl.GeoJSONSource;
    if (!source) return;

    source.setData({
      type: 'FeatureCollection',
      features: signboards.map((s) => ({
        type: 'Feature',
        id: s.id,
        geometry: {
          type: 'Point',
          coordinates: s.coordinates,
        },
        properties: {
          id: s.id,
          title: s.title,
          type: s.type,
          destinationName: s.destinationName,
          arrowDirection: s.arrowDirection,
          installationStatus: s.installationStatus,
        },
      })),
    });
  }, [signboards, mapLoaded]);

  // Handle Selected Signboard FlyTo
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !mapLoaded || !selectedSignboard) return;

    map.flyTo({
      center: selectedSignboard.coordinates,
      zoom: 17.5,
      pitch: 45,
      duration: 1200,
    });
  }, [selectedSignboard, mapLoaded]);

  // Update Active Route on Map
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !mapLoaded) return;

    const source = map.getSource('active-route-source') as maplibregl.GeoJSONSource;
    if (!source) return;

    if (activeRoute && activeRoute.pathCoordinates.length > 0) {
      source.setData({
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: activeRoute.pathCoordinates,
            },
            properties: {},
          },
        ],
      });

      // Fit bounds to route
      const coordinates = activeRoute.pathCoordinates;
      const bounds = coordinates.reduce(
        (acc, coord) => acc.extend(coord),
        new maplibregl.LngLatBounds(coordinates[0], coordinates[0])
      );

      map.fitBounds(bounds, { padding: 80, maxZoom: 17.5, duration: 1000 });
    } else {
      source.setData({
        type: 'FeatureCollection',
        features: [],
      });
    }
  }, [activeRoute, mapLoaded]);

  // Handle Selected Feature FlyTo
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !mapLoaded || !selectedFeature) return;

    map.flyTo({
      center: selectedFeature.coordinates,
      zoom: 17.2,
      pitch: 45,
      duration: 1200,
    });
  }, [selectedFeature, mapLoaded]);

  // Handle Layer Visibility Toggles
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !mapLoaded) return;

    const setVisibility = (layerId: string, visible: boolean) => {
      if (map.getLayer(layerId)) {
        map.setLayoutProperty(layerId, 'visibility', visible ? 'visible' : 'none');
      }
    };

    setVisibility('buildings-3d', layerVisibility.buildings && layerVisibility.buildingExtrusion3D);
    setVisibility('roads-casing', layerVisibility.roads);
    setVisibility('roads-inner', layerVisibility.roads);
    setVisibility('pedestrian-paths-line', layerVisibility.pedestrianPaths);
    setVisibility('green-areas-fill', layerVisibility.greenAreas);
    setVisibility('green-areas-line', layerVisibility.greenAreas);
    setVisibility('parking-fill', layerVisibility.parking);
    setVisibility('parking-line', layerVisibility.parking);
    setVisibility('gates-circle', layerVisibility.gates);
    setVisibility('landmarks-circle', layerVisibility.landmarks);
    setVisibility('signboards-halo', layerVisibility.signage);
    setVisibility('signboards-circle', layerVisibility.signage);
  }, [layerVisibility, mapLoaded]);

  return <div ref={mapContainerRef} className="w-full h-full relative" />;
};
