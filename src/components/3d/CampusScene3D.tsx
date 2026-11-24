import React, { useRef, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sky } from '@react-three/drei';
import * as THREE from 'three';

import { CampusGround3D } from './environment/CampusGround3D';
import { InstancedTrees3D } from './environment/InstancedTrees3D';
import { Signage3DLayer } from './signage/Signage3DLayer';
import { NavigationRoute3D } from './navigation/NavigationRoute3D';
import { GLBBuilding } from './buildings/GLBBuilding';
import { SportsGround3D } from './buildings/SportsGround3D';

import type { CampusFeature, CampusRoute } from '../../types/campus';
import type { Signboard } from '../../types/signage';
import { geoToWorld } from '../../utils/geoToWorld';

interface CampusScene3DProps {
  features: CampusFeature[];
  selectedFeature: CampusFeature | null;
  onSelectFeature: (feature: CampusFeature | null) => void;
  signboards: Signboard[];
  selectedSignboard: Signboard | null;
  onSelectSignboard: (sign: Signboard | null) => void;
  activeRoute: CampusRoute | null;
  cameraPerspective: 'isometric' | 'top_down';
  isEventMode: boolean;
}

// Subcomponent to animate camera when selectedFeature or perspective changes
const CameraController: React.FC<{
  selectedFeature: CampusFeature | null;
  cameraPerspective: 'isometric' | 'top_down';
  controlsRef: React.RefObject<any>;
}> = ({ selectedFeature, cameraPerspective, controlsRef }) => {
  useEffect(() => {
    if (!controlsRef.current) return;
    const controls = controlsRef.current;

    if (selectedFeature) {
      const [x, y, z] = geoToWorld(selectedFeature.coordinates);
      controls.target.set(x, y + 4, z);
      // Position camera at an architectural 45-degree angle focusing on the selected building
      controls.object.position.set(x + 45, y + 55, z + 65);
      controls.update();
    } else {
      if (cameraPerspective === 'top_down') {
        controls.target.set(0, 0, -30);
        controls.object.position.set(0, 390, -31); // Directly overhead orthographic-style view
        controls.update();
      } else {
        controls.target.set(0, 0, -30);
        controls.object.position.set(40, 210, 240); // Classic architectural aerial perspective
        controls.update();
      }
    }
  }, [selectedFeature, cameraPerspective, controlsRef]);

  return null;
};

export const CampusScene3D: React.FC<CampusScene3DProps> = ({
  features,
  selectedFeature,
  onSelectFeature,
  signboards,
  selectedSignboard,
  onSelectSignboard,
  activeRoute,
  cameraPerspective,
  isEventMode,
}) => {
  const controlsRef = useRef<any>(null);

  // Helper to find feature by ID
  const findFeat = (id: string) => features.find((f) => f.id === id);

  const adminFeat = findFeat('ADM-01') || features[1];
  const seminarFeat = findFeat('CEN-01') || features[2];
  const libraryFeat = findFeat('CEN-02') || features[3];
  const cseFeat = findFeat('ACA-01') || features[4];
  const itFeat = findFeat('ACA-02') || features[5];
  const civilFeat = findFeat('ACA-03') || features[6];
  const lhcFeat = findFeat('LHC-01') || features[7];
  const sacFeat = findFeat('CEN-05') || features[8];
  const mbhFeat = findFeat('HST-08') || features[9];
  const mghFeat = findFeat('HST-15') || features[10];
  const shoppingFeat = findFeat('AMN-01') || features[11];
  const guestFeat = findFeat('RES-01') || features[17];
  const gateFeat = findFeat('ENT-01') || features[0];
  const sportsFeat = findFeat('SPT-01') || features[18];

  return (
    <div className="w-full h-full relative select-none">
      <Canvas
        shadows
        camera={{ position: [40, 210, 240], fov: 45, near: 1, far: 2500 }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.15,
        }}
      >
        <CameraController
          selectedFeature={selectedFeature}
          cameraPerspective={cameraPerspective}
          controlsRef={controlsRef}
        />

        {/* Orbit Controls with Damping for Smooth Pan/Zoom/Orbit */}
        <OrbitControls
          ref={controlsRef}
          maxPolarAngle={Math.PI / 2.05} // Prevent dipping beneath ground
          minDistance={15}
          maxDistance={850}
          enableDamping
          dampingFactor={0.06}
        />

        {/* Photorealistic Architectural Daylight & Atmospheric Lighting */}
        <ambientLight intensity={0.45} color="#e0f2fe" />
        <hemisphereLight
          args={['#f8fafc', '#2c402b', 0.4]} // Sky daylight & natural lawn bounce
        />
        <directionalLight
          position={[180, 260, 140]}
          intensity={1.4}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-near={10}
          shadow-camera-far={750}
          shadow-camera-left={-320}
          shadow-camera-right={320}
          shadow-camera-top={320}
          shadow-camera-bottom={-320}
          shadow-bias={-0.0004}
        />

        {/* Atmospheric Sky Dome */}
        <Sky
          distance={450000}
          sunPosition={[180, 260, 140]}
          inclination={0.52}
          azimuth={0.25}
          turbidity={5}
          rayleigh={0.7}
        />

        <Suspense fallback={null}>
          {/* Ground Plane, Roads & Walkways */}
          <CampusGround3D />

          {/* Instanced Campus Trees (600+ Trees at 60 FPS) */}
          <InstancedTrees3D />

          {/* 1. Administrative Block (Main Institute Building, Neoclassical Portico) */}
          {adminFeat && (
            <GLBBuilding
              modelUrl="/models/buildings/admin-block.glb"
              feature={adminFeat}
              isSelected={selectedFeature?.id === adminFeat.id}
              onSelect={onSelectFeature}
              badgeText="Administrative Headquarters"
            />
          )}

          {/* 2. Central Seminar Hall (AWS Student Community Day Keynote Arena) */}
          {seminarFeat && (
            <GLBBuilding
              modelUrl="/models/buildings/seminar-hall.glb"
              feature={seminarFeat}
              isSelected={selectedFeature?.id === seminarFeat.id}
              onSelect={onSelectFeature}
              badgeText="AWS SCD 2027 Keynote Stage"
              isEventVenue={isEventMode}
            />
          )}

          {/* 3. Central Library / Knowledge Centre (Square Pavilion with Brise-Soleil) */}
          {libraryFeat && (
            <GLBBuilding
              modelUrl="/models/buildings/central-library.glb"
              feature={libraryFeat}
              isSelected={selectedFeature?.id === libraryFeat.id}
              onSelect={onSelectFeature}
              badgeText="Knowledge Centre"
            />
          )}

          {/* 4. IT Building (Avinash Khosla Design Award, Sandstone & Glass Atrium) */}
          {itFeat && (
            <GLBBuilding
              modelUrl="/models/buildings/it-building.glb"
              feature={itFeat}
              isSelected={selectedFeature?.id === itFeat.id}
              onSelect={onSelectFeature}
              badgeText="AWS Hands-on Cloud Labs"
            />
          )}

          {/* 5. CSE Building (Distinct Red-Brick Facade & Rooftop Solar PV Farm) */}
          {cseFeat && (
            <GLBBuilding
              modelUrl="/models/buildings/cse-building.glb"
              feature={cseFeat}
              isSelected={selectedFeature?.id === cseFeat.id}
              onSelect={onSelectFeature}
              badgeText="CSE Department & Solar Array"
            />
          )}

          {/* 6. Civil Engineering Block (Classrooms & High-Bay Testing Shed with Gantry Crane) */}
          {civilFeat && (
            <GLBBuilding
              modelUrl="/models/buildings/civil-building.glb"
              feature={civilFeat}
              isSelected={selectedFeature?.id === civilFeat.id}
              onSelect={onSelectFeature}
              badgeText="Structural Testing Lab & Crane"
            />
          )}

          {/* 7. Lecture Hall Complex & AKAM Hall (Curved Metallic Gold Pavilion) */}
          {lhcFeat && (
            <GLBBuilding
              modelUrl="/models/buildings/lhc-building.glb"
              feature={lhcFeat}
              isSelected={selectedFeature?.id === lhcFeat.id}
              onSelect={onSelectFeature}
              badgeText="AKAM Lecture Theatre"
            />
          )}

          {/* 8. Student Activity Centre (Barrel-Vaulted Arena & Open Air Theatre) */}
          {sacFeat && (
            <GLBBuilding
              modelUrl="/models/buildings/sac-complex.glb"
              feature={sacFeat}
              isSelected={selectedFeature?.id === sacFeat.id}
              onSelect={onSelectFeature}
              badgeText="SAC & Open Air Theatre"
            />
          )}

          {/* 9. Mega Boys Hostel Complex (7-Story High-Rise MBH Quadrangle) */}
          {mbhFeat && (
            <GLBBuilding
              modelUrl="/models/buildings/mega-boys-hostel.glb"
              feature={mbhFeat}
              isSelected={selectedFeature?.id === mbhFeat.id}
              onSelect={onSelectFeature}
              badgeText="7-Story MBH Quadrangle"
            />
          )}

          {/* 10. Mega Girls Hostel Complex (6-Story Residential Complex) */}
          {mghFeat && (
            <GLBBuilding
              modelUrl="/models/buildings/mega-girls-hostel.glb"
              feature={mghFeat}
              isSelected={selectedFeature?.id === mghFeat.id}
              onSelect={onSelectFeature}
              badgeText="6-Story MGH Complex"
            />
          )}

          {/* 11. Shopping Centre & Campus Commercial Amenities */}
          {shoppingFeat && (
            <GLBBuilding
              modelUrl="/models/buildings/amenities-block.glb"
              feature={shoppingFeat}
              isSelected={selectedFeature?.id === shoppingFeat.id}
              onSelect={onSelectFeature}
              badgeText="Commercial Arcade & Post Office"
            />
          )}

          {/* 12. Institute Guest House (Terracotta Hipped Villa) */}
          {guestFeat && (
            <GLBBuilding
              modelUrl="/models/buildings/guest-house.glb"
              feature={guestFeat}
              isSelected={selectedFeature?.id === guestFeat.id}
              onSelect={onSelectFeature}
              badgeText="Institute Guest House"
            />
          )}

          {/* 13. Main Gate 1 (GT Road Monumental Portal) */}
          {gateFeat && (
            <GLBBuilding
              modelUrl="/models/buildings/main-gate.glb"
              feature={gateFeat}
              isSelected={selectedFeature?.id === gateFeat.id}
              onSelect={onSelectFeature}
              badgeText="Main Gate (GT Road Entrance)"
            />
          )}

          {/* 14. Sports Ground & Athletic Stadium */}
          {sportsFeat && (
            <SportsGround3D
              feature={sportsFeat}
              isSelected={selectedFeature?.id === sportsFeat.id}
              onSelect={onSelectFeature}
            />
          )}

          {/* Phase 2: 3D Physical Event Signage Models */}
          {isEventMode && (
            <Signage3DLayer
              signboards={signboards}
              selectedSignboard={selectedSignboard}
              onSelectSignboard={onSelectSignboard}
            />
          )}

          {/* 3D Navigation Route Tube & Directional Beacons */}
          <NavigationRoute3D activeRoute={activeRoute} />
        </Suspense>
      </Canvas>
    </div>
  );
};
