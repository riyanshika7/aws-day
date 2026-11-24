import React, { useState, useMemo } from 'react';
import { useGLTF, Html } from '@react-three/drei';
import * as THREE from 'three';
import { geoToWorld } from '../../../utils/geoToWorld';
import type { CampusFeature } from '../../../types/campus';

interface GLBBuildingProps {
  modelUrl: string;
  feature: CampusFeature;
  isSelected: boolean;
  onSelect: (feature: CampusFeature) => void;
  rotationY?: number;
  scale?: number | [number, number, number];
  badgeText?: string;
  isEventVenue?: boolean;
}

export const GLBBuilding: React.FC<GLBBuildingProps> = ({
  modelUrl,
  feature,
  isSelected,
  onSelect,
  rotationY = 0,
  scale = 1,
  badgeText,
  isEventVenue = false,
}) => {
  const [hovered, setHovered] = useState(false);
  const position = geoToWorld(feature.coordinates);

  const { scene } = useGLTF(modelUrl);

  // Clone scene so multiple instances don't share identical scene-graph nodes
  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });
    return clone;
  }, [scene]);

  // Dynamic architectural elevation indicator height based on verified building height
  const labelHeight = (feature.height || (feature.floors ? feature.floors * 3.6 : 12)) + 3.5;

  return (
    <group
      position={position}
      rotation={[0, rotationY, 0]}
      scale={scale}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(feature);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
    >
      {/* Cloned Photorealistic GLB Asset */}
      <primitive object={clonedScene} />

      {/* Subtle Ground Architectural Anchor Ring on Select */}
      {isSelected && (
        <mesh position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[14, 15.5, 32]} />
          <meshBasicMaterial color="#ff9900" transparent opacity={0.65} side={THREE.DoubleSide} />
        </mesh>
      )}

      {/* Event Venue Beacon Ring (AWS SCD 2027) */}
      {isEventVenue && (
        <mesh position={[0, 0.15, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[16.5, 17.5, 32]} />
          <meshBasicMaterial color="#0284c7" transparent opacity={0.7} side={THREE.DoubleSide} />
        </mesh>
      )}

      {/* Interactive Floating Architectural Tag */}
      {(hovered || isSelected || isEventVenue) && (
        <Html position={[0, labelHeight, 0]} center distanceFactor={140}>
          <div
            className={`px-3 py-1.5 rounded-xl shadow-2xl backdrop-blur-md transition-all duration-300 pointer-events-none flex items-center gap-2 border ${
              isSelected
                ? 'bg-slate-900/95 text-white border-amber-500 ring-2 ring-amber-500/30'
                : isEventVenue
                ? 'bg-slate-900/95 text-white border-blue-500 ring-2 ring-blue-500/20'
                : 'bg-slate-900/90 text-slate-100 border-slate-700'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                isSelected
                  ? 'bg-amber-400 animate-pulse'
                  : isEventVenue
                  ? 'bg-blue-400 animate-pulse'
                  : 'bg-emerald-400'
              }`}
            />
            <div className="flex flex-col">
              <span className="text-xs font-bold whitespace-nowrap">{feature.name}</span>
              {(badgeText || feature.floors) && (
                <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1.5">
                  {badgeText && <span className="text-amber-400 font-semibold">{badgeText}</span>}
                  {feature.floors && <span>• G+{feature.floors - 1} Floors</span>}
                </span>
              )}
            </div>
          </div>
        </Html>
      )}
    </group>
  );
};

// Preload models for instantaneous rendering without popping
useGLTF.preload('/models/buildings/admin-block.glb');
useGLTF.preload('/models/buildings/it-building.glb');
useGLTF.preload('/models/buildings/cse-building.glb');
useGLTF.preload('/models/buildings/civil-building.glb');
useGLTF.preload('/models/buildings/seminar-hall.glb');
useGLTF.preload('/models/buildings/central-library.glb');
useGLTF.preload('/models/buildings/lhc-building.glb');
useGLTF.preload('/models/buildings/sac-complex.glb');
useGLTF.preload('/models/buildings/mega-boys-hostel.glb');
useGLTF.preload('/models/buildings/mega-girls-hostel.glb');
useGLTF.preload('/models/buildings/main-gate.glb');
useGLTF.preload('/models/buildings/guest-house.glb');
useGLTF.preload('/models/buildings/amenities-block.glb');
