import React, { useState } from 'react';
import { Html } from '@react-three/drei';
import { geoToWorld } from '../../../utils/geoToWorld';
import type { CampusFeature } from '../../../types/campus';

interface Building3DProps {
  feature: CampusFeature;
  isSelected: boolean;
  onSelect: (feature: CampusFeature) => void;
}

export const SACComplex3D: React.FC<Building3DProps> = ({
  feature,
  isSelected,
  onSelect,
}) => {
  const [hovered, setHovered] = useState(false);
  const position = geoToWorld(feature.coordinates);

  const mainColor = isSelected ? '#3b82f6' : hovered ? '#4f46e5' : '#c2410c'; // Athletic rust orange
  const roofColor = '#0284c7'; // Blue barrel-vaulted roof

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
        <Html position={[0, 14, 0]} center distanceFactor={120}>
          <div className="px-3 py-1.5 bg-slate-900/90 text-white rounded-xl shadow-xl border border-orange-500 text-xs font-bold whitespace-nowrap pointer-events-none flex items-center gap-1.5 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <span>{feature.name}</span>
            <span className="text-[10px] text-orange-300 font-mono">Gym & Clubs</span>
          </div>
        </Html>
      )}

      {/* Main Indoor Sports Arena Body (36m x 26m x 9m) */}
      <mesh position={[0, 4.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[36, 9, 26]} />
        <meshStandardMaterial color={mainColor} roughness={0.7} />
      </mesh>

      {/* Curved Barrel-Vaulted Sports Arena Roof */}
      <mesh position={[0, 9, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <cylinderGeometry args={[13.2, 13.2, 36.2, 24, 1, false, 0, Math.PI]} />
        <meshStandardMaterial color={roofColor} roughness={0.3} metalness={0.4} />
      </mesh>

      {/* 2-Story Club Wings & Administration Annex */}
      <mesh position={[21, 3.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[10, 7, 20]} />
        <meshStandardMaterial color="#334155" roughness={0.6} />
      </mesh>

      {/* Entrance Glass Portal */}
      <mesh position={[0, 2.5, 13.2]}>
        <boxGeometry args={[12, 5, 0.4]} />
        <meshStandardMaterial color="#93c5fd" transparent opacity={0.7} roughness={0.1} metalness={0.8} />
      </mesh>
    </group>
  );
};
