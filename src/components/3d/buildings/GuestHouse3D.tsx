import React, { useState } from 'react';
import { Html } from '@react-three/drei';
import { geoToWorld } from '../../../utils/geoToWorld';
import type { CampusFeature } from '../../../types/campus';

interface Building3DProps {
  feature: CampusFeature;
  isSelected: boolean;
  onSelect: (feature: CampusFeature) => void;
}

export const GuestHouse3D: React.FC<Building3DProps> = ({
  feature,
  isSelected,
  onSelect,
}) => {
  const [hovered, setHovered] = useState(false);
  const position = geoToWorld(feature.coordinates);

  const mainColor = isSelected ? '#3b82f6' : hovered ? '#4f46e5' : '#f8fafc'; // Pristine white villa
  const roofColor = '#991b1b'; // Terracotta clay hipped roof

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
        <Html position={[0, 12, 0]} center distanceFactor={120}>
          <div className="px-3 py-1.5 bg-slate-900/90 text-white rounded-xl shadow-xl border border-purple-400 text-xs font-bold whitespace-nowrap pointer-events-none flex items-center gap-1.5 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            <span>{feature.name}</span>
            <span className="text-[10px] text-purple-300 font-mono">VIP Suites</span>
          </div>
        </Html>
      )}

      {/* Main Guest House Villa Body (32m x 8m x 18m) */}
      <mesh position={[0, 4, 0]} castShadow receiveShadow>
        <boxGeometry args={[32, 8, 18]} />
        <meshStandardMaterial color={mainColor} roughness={0.4} />
      </mesh>

      {/* Sloped Hipped Roof */}
      <mesh position={[0, 9.5, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
        <coneGeometry args={[18, 3.5, 4]} />
        <meshStandardMaterial color={roofColor} roughness={0.7} />
      </mesh>

      {/* Front Entrance Garden Portico */}
      <mesh position={[0, 2.5, 11]} castShadow receiveShadow>
        <boxGeometry args={[10, 5, 4]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.3} />
      </mesh>

      {/* Balcony Pergola on Upper Floor */}
      <mesh position={[0, 6.5, 9.5]} castShadow>
        <boxGeometry args={[12, 0.4, 3]} />
        <meshStandardMaterial color="#78350f" roughness={0.8} />
      </mesh>
    </group>
  );
};
