import React, { useState, useRef, useEffect } from 'react';
import maplibregl from 'maplibre-gl';
import { Header } from './components/ui/Header';
import { SearchBar } from './components/search/SearchBar';
import { CategoryFilter } from './components/search/CategoryFilter';
import { FeatureDrawer } from './components/ui/FeatureDrawer';
import { RoutePlanner } from './components/navigation/RoutePlanner';
import { CampusMap } from './components/map/CampusMap';
import { MapControls } from './components/map/MapControls';
import { LayerToggle } from './components/map/LayerToggle';
import { MapLegend } from './components/map/MapLegend';

// Phase 2: Signage Components
import { SignboardDetailDrawer } from './components/signage/SignboardDetailDrawer';
import { SignageAdminPanel } from './components/signage/SignageAdminPanel';
import { PrintExportModal } from './components/signage/PrintExportModal';
import { AttendeeArrivalModal } from './components/signage/AttendeeArrivalModal';
import { signageStore } from './services/signageStore';

// Phase 3: 3D Digital Twin Components
import { CampusScene3D } from './components/3d/CampusScene3D';
import { Controls3D } from './components/3d/Controls3D';

import type { CampusFeature, CampusRoute } from './types/campus';
import type { LayerVisibilityState } from './types/map';
import type { Signboard } from './types/signage';
import { DEFAULT_LAYER_VISIBILITY, NITJ_CAMPUS_CENTER } from './config/mapConfig';
import { findPedestrianRoute } from './routing/dijkstra';
import rawInventory from './data/inventory.json';

export const App: React.FC = () => {
  const allFeatures = rawInventory as CampusFeature[];

  // General Campus State
  const [selectedFeature, setSelectedFeature] = useState<CampusFeature | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeRoute, setActiveRoute] = useState<CampusRoute | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const [showLayers, setShowLayers] = useState(false);
  const [layerVisibility, setLayerVisibility] = useState<LayerVisibilityState>(
    DEFAULT_LAYER_VISIBILITY
  );

  // Phase 2: AWS Student Community Day 2027 Signage State
  const [signboards, setSignboards] = useState<Signboard[]>(signageStore.getSignboards());
  const [selectedSignboard, setSelectedSignboard] = useState<Signboard | null>(null);
  const [showSignageAdmin, setShowSignageAdmin] = useState(false);
  const [printSignboard, setPrintSignboard] = useState<Signboard | null>(null);
  const [scannedSignboard, setScannedSignboard] = useState<Signboard | null>(null);
  const [isEventMode, setIsEventMode] = useState(true);

  // Phase 3: 3D Digital Twin View State (Default to 3D Twin)
  const [viewMode, setViewMode] = useState<'3d' | '2d'>('3d');
  const [cameraPerspective, setCameraPerspective] = useState<'isometric' | 'top_down'>('isometric');

  const mapRef = useRef<maplibregl.Map | null>(null);

  // Subscribe to Signage Store updates
  useEffect(() => {
    const unsubscribe = signageStore.subscribe(() => {
      setSignboards(signageStore.getSignboards());
    });
    return unsubscribe;
  }, []);

  // Handle URL Query Parameters (Attendee scanning physical QR code)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const signId = params.get('sign');
    const isEvent = params.get('event');

    if (isEvent || signId) {
      setIsEventMode(true);
    }

    if (signId) {
      const found = signageStore.getSignboardById(signId);
      if (found) {
        setScannedSignboard(found);
        setSelectedSignboard(found);
      }
    }
  }, []);

  // Filter features based on active category
  const displayedFeatures = activeCategory
    ? allFeatures.filter((f) => f.category === activeCategory)
    : allFeatures;

  const handleSelectFeature = (feature: CampusFeature | null) => {
    setSelectedFeature(feature);
    setSelectedSignboard(null);
  };

  const handleSelectSignboard = (sign: Signboard | null) => {
    setSelectedSignboard(sign);
    setSelectedFeature(null);
  };

  const handleStartRoute = (dest: CampusFeature) => {
    setSelectedFeature(null);
    setIsNavigating(true);
    const mainGate = allFeatures.find((f) => f.id === 'ENT-01') || allFeatures[0];
    const route = findPedestrianRoute(
      mainGate.coordinates,
      dest.coordinates,
      mainGate.name,
      dest.name,
      { wheelchairOnly: false }
    );
    setActiveRoute(route);
  };

  const handleStartRouteFromSign = (sign: Signboard) => {
    setSelectedSignboard(null);
    setScannedSignboard(null);
    setIsNavigating(true);

    const activeVenue = signageStore.getActiveVenue();
    const route = findPedestrianRoute(
      sign.coordinates,
      activeVenue.coordinates,
      `${sign.title} (${sign.locationDescription})`,
      sign.destinationName,
      { wheelchairOnly: false }
    );
    setActiveRoute(route);
  };

  const handleCalculateRoute = (
    origin: CampusFeature,
    destination: CampusFeature,
    wheelchairOnly: boolean
  ) => {
    const route = findPedestrianRoute(
      origin.coordinates,
      destination.coordinates,
      origin.name,
      destination.name,
      { wheelchairOnly }
    );
    setActiveRoute(route);
  };

  const handleToggleLayer = (layerName: keyof LayerVisibilityState) => {
    setLayerVisibility((prev) => ({
      ...prev,
      [layerName]: !prev[layerName],
    }));
  };

  // Map Controls callbacks
  const handleZoomIn = () => mapRef.current?.zoomIn();
  const handleZoomOut = () => mapRef.current?.zoomOut();
  const handleResetNorth = () => {
    mapRef.current?.resetNorthPitch({ duration: 800 });
  };
  const handleToggle3D = () => {
    setLayerVisibility((prev) => ({
      ...prev,
      buildingExtrusion3D: !prev.buildingExtrusion3D,
    }));
    const currentPitch = mapRef.current?.getPitch() || 0;
    mapRef.current?.easeTo({
      pitch: currentPitch > 20 ? 0 : 45,
      duration: 600,
    });
  };
  const handleCenterCampus = () => {
    mapRef.current?.flyTo({
      center: NITJ_CAMPUS_CENTER,
      zoom: 16.2,
      pitch: 40,
      bearing: -15,
      duration: 1000,
    });
  };
  const handleLocateMe = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const userCoord: [number, number] = [pos.coords.longitude, pos.coords.latitude];
          mapRef.current?.flyTo({
            center: userCoord,
            zoom: 17,
            duration: 1000,
          });
        },
        () => {
          alert('Could not determine current location. Defaulting to campus center.');
          handleCenterCampus();
        }
      );
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-slate-950 select-none">
      {/* Top Header */}
      <Header
        onToggleNavigation={() => setIsNavigating(!isNavigating)}
        isNavigating={isNavigating}
        onToggleLayers={() => setShowLayers(!showLayers)}
        showLayers={showLayers}
        onOpenSignageAdmin={() => setShowSignageAdmin(true)}
        isEventMode={isEventMode}
        onToggleEventMode={() => setIsEventMode(!isEventMode)}
      />

      {/* Floating Search & Category Pills bar */}
      <div className="absolute top-16 left-4 right-4 sm:right-auto sm:w-auto z-20 flex flex-col space-y-2 pointer-events-none">
        <div className="pointer-events-auto">
          <SearchBar
            features={displayedFeatures}
            onSelectFeature={handleSelectFeature}
          />
        </div>
        <div className="pointer-events-auto">
          <CategoryFilter
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
          />
        </div>
      </div>

      {/* Phase 3: 3D Viewport & Perspective Controls */}
      <Controls3D
        viewMode={viewMode}
        onToggleViewMode={() => setViewMode(viewMode === '3d' ? '2d' : '3d')}
        cameraPerspective={cameraPerspective}
        onTogglePerspective={() =>
          setCameraPerspective(cameraPerspective === 'isometric' ? 'top_down' : 'isometric')
        }
        onResetCamera={() => {
          setSelectedFeature(null);
          setSelectedSignboard(null);
          setCameraPerspective('isometric');
        }}
      />

      {/* Event Banner Quick Pill */}
      {isEventMode && (
        <div className="hidden lg:flex absolute top-16 right-4 z-20 items-center space-x-2 bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-amber-500/50 shadow-lg text-xs">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
          <span className="text-amber-300 font-bold">AWS Student Community Day 2027</span>
          <span className="text-slate-400">•</span>
          <span className="text-slate-200">Venue: {signageStore.getActiveVenue().shortName}</span>
          <button
            onClick={() => setShowSignageAdmin(true)}
            className="ml-2 text-amber-400 hover:text-amber-300 font-semibold underline text-[11px]"
          >
            Manage Signs
          </button>
        </div>
      )}

      {/* Active View Canvas: 3D Digital Twin vs. 2D MapLibre GIS */}
      {viewMode === '3d' ? (
        <CampusScene3D
          features={allFeatures}
          selectedFeature={selectedFeature}
          onSelectFeature={handleSelectFeature}
          signboards={isEventMode ? signboards : []}
          selectedSignboard={selectedSignboard}
          onSelectSignboard={handleSelectSignboard}
          activeRoute={activeRoute}
          cameraPerspective={cameraPerspective}
          isEventMode={isEventMode}
        />
      ) : (
        <CampusMap
          selectedFeature={selectedFeature}
          onSelectFeature={handleSelectFeature}
          selectedSignboard={selectedSignboard}
          onSelectSignboard={handleSelectSignboard}
          signboards={isEventMode ? signboards : []}
          activeRoute={activeRoute}
          layerVisibility={layerVisibility}
          allFeatures={allFeatures}
          mapRefOut={mapRef}
        />
      )}

      {/* Feature Details Drawer */}
      <FeatureDrawer
        feature={selectedFeature}
        onClose={() => setSelectedFeature(null)}
        onStartRoute={handleStartRoute}
      />

      {/* Phase 2: Signboard Detail Drawer */}
      <SignboardDetailDrawer
        signboard={selectedSignboard}
        onClose={() => setSelectedSignboard(null)}
        onStartRouteFromSign={handleStartRouteFromSign}
        onOpenPrintModal={(sign) => setPrintSignboard(sign)}
        onSimulateQrScan={(sign) => setScannedSignboard(sign)}
      />

      {/* Route Navigation Planner */}
      {isNavigating && (
        <RoutePlanner
          features={allFeatures}
          activeRoute={activeRoute}
          onCalculateRoute={handleCalculateRoute}
          onClearRoute={() => setActiveRoute(null)}
          onClose={() => setIsNavigating(false)}
          preselectedDest={selectedFeature}
        />
      )}

      {/* Layer Toggle Floating Panel (2D Mode) */}
      {showLayers && (
        <LayerToggle
          layers={layerVisibility}
          onToggleLayer={handleToggleLayer}
          onClose={() => setShowLayers(false)}
        />
      )}

      {/* Map Controls (2D Mode) */}
      {viewMode === '2d' && (
        <MapControls
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onResetNorth={handleResetNorth}
          onToggle3D={handleToggle3D}
          is3D={layerVisibility.buildingExtrusion3D}
          onCenterCampus={handleCenterCampus}
          onLocateMe={handleLocateMe}
        />
      )}

      {/* GIS Legend */}
      <MapLegend />

      {/* Phase 2: Signage Admin Panel */}
      {showSignageAdmin && (
        <SignageAdminPanel
          onClose={() => setShowSignageAdmin(false)}
          onPreviewPrint={(sign) => setPrintSignboard(sign)}
          onSelectSignboardOnMap={(sign) => {
            setSelectedSignboard(sign);
          }}
        />
      )}

      {/* Phase 2: Print-Ready Export Modal */}
      {printSignboard && (
        <PrintExportModal
          signboard={printSignboard}
          onClose={() => setPrintSignboard(null)}
        />
      )}

      {/* Phase 2: Attendee QR Scan Arrival Experience Modal */}
      {scannedSignboard && (
        <AttendeeArrivalModal
          signboard={scannedSignboard}
          onStartRoute={handleStartRouteFromSign}
          onClose={() => setScannedSignboard(null)}
        />
      )}
    </div>
  );
};

export default App;
