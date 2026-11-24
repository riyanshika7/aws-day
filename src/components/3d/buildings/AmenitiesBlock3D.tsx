import React, { useState } from 'react';
import { Html } from '@react-three/drei';
import { geoToWorld } from '../../../utils/geoToWorld';
import type { CampusFeature } from '../../../types/campus';

interface Building3DProps {
  feature: CampusFeature;
  isSelected: boolean;
  onSelect: (feature: CampusFeature) => void;
}

export const AmenitiesBlock3D: React.FC<Building3DProps> = ({
  feature,
  isSelected,
  onSelect,
}) => {
  const [hovered, setHovered] = useState(false);
  const position = geoToWorld(feature.coordinates);

  const mainColor = isSelected ? '#3b82f6' : hovered ? '#4f46e5' : '#0284c7'; // Cyan/blue
  const bankColor = '#0369a1'; // Canara/SBI blue
  const dispensaryColor = '#dc2626'; // Red cross clinic

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
        <Html position={[0, 10, 0]} center distanceFactor={120}>
          <div className="px-3 py-1.5 bg-slate-900/90 text-white rounded-xl shadow-xl border border-cyan-400 text-xs font-bold whitespace-nowrap pointer-events-none flex items-center gap-1.5 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>{feature.name}</span>
            <span className="text-[10px] text-cyan-300 font-mono">Banks • Dispensary • Stores</span>
          </div>
        </Html>
      )}

      {/* Shopping Arcade Body (32m x 5m x 14m) */}
      <mesh position={[-6, 2.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[26, 5, 14]} />
        <meshStandardMaterial color={mainColor} roughness={0.6} />
      </mesh>

      {/* Bank & ATM Kiosk Wing */}
      <mesh position={[12, 2.5, 2]} castShadow receiveShadow>
        <boxGeometry args={[10, 5, 10]} />
        <meshStandardMaterial color={bankColor} roughness={0.4} />
      </mesh>

      {/* Health Centre / Dispensary Annex (with Emergency Ambulance Bay) */}
      <mesh position={[24, 3.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[12, 7, 14]} />
        <meshStandardMaterial color="#ffffff" roughness={0.3} />
      </mesh>

      {/* Red Cross Emblem on Dispensary Roof Portico */}
      <mesh position={[24, 8, 4]} castShadow>
        <boxGeometry args={[3, 1, 0.4]} />
        <meshStandardMaterial color={dispensaryColor} />
      </mesh>
      <mesh position={[24, 8, 4]} castShadow>
        <boxGeometry args={[1, 3, 0.4]} />
        <meshStandardMaterial color={dispensaryColor} />
      </mesh>

      {/* Shop Front Veranda & Overhang */}
      <mesh position={[-6, 2.2, 8]} castShadow>
        <boxGeometry args={[26, 0.4, 3]} />
        <meshStandardMaterial color="#334155" roughness={0.5} />
      </mesh>
    </group>
  );
};
