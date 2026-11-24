import React, { useState } from 'react';
import { Html } from '@react-three/drei';
import { geoToWorld } from '../../../utils/geoToWorld';
import type { CampusFeature } from '../../../types/campus';

interface Building3DProps {
  feature: CampusFeature;
  isSelected: boolean;
  onSelect: (feature: CampusFeature) => void;
}

export const SportsGround3D: React.FC<Building3DProps> = ({
  feature,
  isSelected,
  onSelect,
}) => {
  const [hovered, setHovered] = useState(false);
  const position = geoToWorld(feature.coordinates);

  const trackColor = '#b91c1c'; // Red clay athletic track
  const grassColor = '#15803d'; // Football turf
  const towerColor = '#94a3b8'; // Floodlight steel towers

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
        <Html position={[0, 10, 0]} center distanceFactor={140}>
          <div className="px-3 py-1.5 bg-slate-900/90 text-white rounded-xl shadow-xl border border-red-500 text-xs font-bold whitespace-nowrap pointer-events-none flex items-center gap-1.5 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span>{feature.name}</span>
            <span className="text-[10px] text-red-300 font-mono">400m Track</span>
          </div>
        </Html>
      )}

      {/* 400-Meter Athletic Running Track (Outer Red Ring Oval, 90m x 65m) */}
      <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[90, 65]} />
        <meshStandardMaterial color={trackColor} roughness={0.9} />
      </mesh>

      {/* Inner Green Football Pitch */}
      <mesh position={[0, 0.08, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[70, 45]} />
        <meshStandardMaterial color={grassColor} roughness={0.9} />
      </mesh>

      {/* White Cricket Pitch Strip */}
      <mesh position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 3]} />
        <meshStandardMaterial color="#fef08a" roughness={0.8} />
      </mesh>

      {/* 4 Stadium Floodlight Towers */}
      {[
        [-44, -30],
        [44, -30],
        [-44, 30],
        [44, 30],
      ].map(([x, z], i) => (
        <group key={i} position={[x, 0, z]}>
          {/* Steel Lattice Pole */}
          <mesh position={[0, 9, 0]} castShadow>
            <cylinderGeometry args={[0.3, 0.6, 18, 8]} />
            <meshStandardMaterial color={towerColor} metalness={0.7} roughness={0.3} />
          </mesh>
          {/* Floodlight Head Panel */}
          <mesh position={[0, 18, 0]} castShadow>
            <boxGeometry args={[3, 1.8, 0.6]} />
            <meshStandardMaterial color="#ffffff" roughness={0.1} metalness={0.9} />
          </mesh>
        </group>
      ))}
    </group>
  );
};
