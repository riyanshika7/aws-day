import React, { useState } from 'react';
import { Html } from '@react-three/drei';
import { geoToWorld } from '../../../utils/geoToWorld';
import type { CampusFeature } from '../../../types/campus';

interface Building3DProps {
  feature: CampusFeature;
  isSelected: boolean;
  onSelect: (feature: CampusFeature) => void;
}

export const MegaGirlsHostel3D: React.FC<Building3DProps> = ({
  feature,
  isSelected,
  onSelect,
}) => {
  const [hovered, setHovered] = useState(false);
  const position = geoToWorld(feature.coordinates);

  const mainColor = isSelected ? '#3b82f6' : hovered ? '#4f46e5' : '#059669'; // Emerald
  const accentColor = '#f43f5e'; // Rose accent

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
        <Html position={[0, 24, 0]} center distanceFactor={130}>
          <div className="px-3 py-1.5 bg-slate-900/90 text-white rounded-xl shadow-xl border border-rose-400 text-xs font-bold whitespace-nowrap pointer-events-none flex items-center gap-1.5 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
            <span>{feature.name}</span>
            <span className="text-[10px] text-rose-300 font-mono">6 Floors • MGH</span>
          </div>
        </Html>
      )}

      {/* Main U-Shaped Residential Tower Body (44m x 21m x 32m) */}
      <mesh position={[0, 10.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[44, 21, 32]} />
        <meshStandardMaterial color={mainColor} roughness={0.7} />
      </mesh>

      {/* Internal Courtyard Opening Cutout Accent */}
      <mesh position={[0, 11, 4]} castShadow receiveShadow>
        <boxGeometry args={[22, 21.2, 18]} />
        <meshStandardMaterial color="#ecfdf5" roughness={0.6} />
      </mesh>

      {/* Security Perimeter Boundary Wall */}
      <mesh position={[0, 1.5, 22]} castShadow receiveShadow>
        <boxGeometry args={[48, 3, 0.4]} />
        <meshStandardMaterial color="#64748b" roughness={0.8} />
      </mesh>

      {/* Security Checkpost Cabin */}
      <mesh position={[0, 1.8, 23.5]} castShadow>
        <boxGeometry args={[4, 3.6, 3]} />
        <meshStandardMaterial color={accentColor} roughness={0.4} />
      </mesh>
    </group>
  );
};
