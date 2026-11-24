import React, { useState } from 'react';
import { Html } from '@react-three/drei';
import { geoToWorld } from '../../../utils/geoToWorld';
import type { CampusFeature } from '../../../types/campus';

interface Building3DProps {
  feature: CampusFeature;
  isSelected: boolean;
  onSelect: (feature: CampusFeature) => void;
}

export const LHCBlock3D: React.FC<Building3DProps> = ({
  feature,
  isSelected,
  onSelect,
}) => {
  const [hovered, setHovered] = useState(false);
  const position = geoToWorld(feature.coordinates);

  const mainColor = isSelected ? '#3b82f6' : hovered ? '#4f46e5' : '#1e3a8a'; // Deep cobalt
  const akamColor = '#d97706'; // AKAM Gold
  const trimColor = '#f8fafc';

  return (
    <group
      position={position}
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
      {(hovered || isSelected) && (
        <Html position={[0, 16, 0]} center distanceFactor={120}>
          <div className="px-3 py-1.5 bg-slate-900/90 text-white rounded-xl shadow-xl border border-amber-500 text-xs font-bold whitespace-nowrap pointer-events-none flex items-center gap-1.5 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span>{feature.name}</span>
            <span className="text-[10px] text-amber-300 font-mono">AKAM Theatre</span>
          </div>
        </Html>
      )}

      {/* Main Stepped Lecture Complex Body */}
      <mesh position={[0, 4.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[46, 9, 28]} />
        <meshStandardMaterial color={mainColor} roughness={0.6} />
      </mesh>

      {/* Second Tier Stepped Classroom Riser Mass */}
      <mesh position={[0, 10.5, -4]} castShadow receiveShadow>
        <boxGeometry args={[36, 4, 18]} />
        <meshStandardMaterial color="#0f172a" roughness={0.5} />
      </mesh>

      {/* AKAM Lecture Theatre Signature Curved Foyer Wing */}
      <mesh position={[-16, 5, 8]} castShadow receiveShadow>
        <cylinderGeometry args={[8, 9, 10, 16]} />
        <meshStandardMaterial color={akamColor} roughness={0.4} metalness={0.2} />
      </mesh>

      {/* Grand Entrance Pillars & Overhead Veranda */}
      <mesh position={[8, 3.5, 16]} castShadow receiveShadow>
        <boxGeometry args={[22, 7, 5]} />
        <meshStandardMaterial color={trimColor} roughness={0.3} />
      </mesh>

      {/* Columns */}
      {[-2, 3, 8, 13, 18].map((x, i) => (
        <mesh key={i} position={[x, 3.5, 19]} castShadow>
          <cylinderGeometry args={[0.3, 0.35, 7, 16]} />
          <meshStandardMaterial color="#94a3b8" />
        </mesh>
      ))}
    </group>
  );
};
