import React, { useState } from 'react';
import { Html } from '@react-three/drei';
import { geoToWorld } from '../../../utils/geoToWorld';
import type { CampusFeature } from '../../../types/campus';

interface Building3DProps {
  feature: CampusFeature;
  isSelected: boolean;
  onSelect: (feature: CampusFeature) => void;
}

export const AdminBlock3D: React.FC<Building3DProps> = ({
  feature,
  isSelected,
  onSelect,
}) => {
  const [hovered, setHovered] = useState(false);
  const position = geoToWorld(feature.coordinates);

  const mainColor = isSelected ? '#3b82f6' : hovered ? '#4f46e5' : '#c2410c'; // Red brick
  const trimColor = '#fde68a'; // Sandstone portico trim
  const glassColor = '#93c5fd'; // Glazing
  const roofColor = '#475569'; // Slate roof

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
      {/* 3D Floating Building Label */}
      {(hovered || isSelected) && (
        <Html position={[0, 16, 0]} center distanceFactor={120}>
          <div className="px-3 py-1.5 bg-slate-900/90 text-white rounded-xl shadow-xl border border-amber-500 text-xs font-bold whitespace-nowrap pointer-events-none flex items-center gap-1.5 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span>{feature.name}</span>
            <span className="text-[10px] text-slate-400 font-mono">G+2</span>
          </div>
        </Html>
      )}

      {/* Main Administrative Building Mass (G+2 Floors, 50m x 25m x 12m) */}
      <mesh position={[0, 6, 0]} castShadow receiveShadow>
        <boxGeometry args={[48, 12, 22]} />
        <meshStandardMaterial color={mainColor} roughness={0.7} metalness={0.1} />
      </mesh>

      {/* Central High Ceremonial Portico & Clock Tower */}
      <mesh position={[0, 8, 11]} castShadow receiveShadow>
        <boxGeometry args={[16, 16, 6]} />
        <meshStandardMaterial color={trimColor} roughness={0.5} />
      </mesh>

      {/* Grand Arch Entrance Portico */}
      <mesh position={[0, 2.5, 14]} castShadow receiveShadow>
        <boxGeometry args={[14, 5, 4]} />
        <meshStandardMaterial color={trimColor} roughness={0.4} />
      </mesh>

      {/* Portico Entrance Pillars */}
      {[-5, -1.8, 1.8, 5].map((x, i) => (
        <mesh key={i} position={[x, 2.5, 16]} castShadow>
          <cylinderGeometry args={[0.45, 0.55, 5, 16]} />
          <meshStandardMaterial color={trimColor} roughness={0.3} />
        </mesh>
      ))}

      {/* Portico Entrance Steps & Accessible Ramp */}
      <mesh position={[0, 0.25, 17.5]} receiveShadow>
        <boxGeometry args={[16, 0.5, 3]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.8} />
      </mesh>
      <mesh position={[9.5, 0.25, 16.5]} rotation={[0, 0, -0.08]} receiveShadow>
        <boxGeometry args={[3, 0.3, 4]} />
        <meshStandardMaterial color="#64748b" roughness={0.6} />
      </mesh>

      {/* Clock Tower Crest */}
      <mesh position={[0, 16.5, 11]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[1.5, 1.5, 0.4, 24]} />
        <meshStandardMaterial color="#ffffff" roughness={0.2} metalness={0.4} />
      </mesh>

      {/* Continuous Window Fenestration Bands (Floor 1 & 2) */}
      <mesh position={[0, 5, 11.2]}>
        <boxGeometry args={[44, 2.2, 0.2]} />
        <meshStandardMaterial color={glassColor} roughness={0.2} metalness={0.8} />
      </mesh>
      <mesh position={[0, 9, 11.2]}>
        <boxGeometry args={[44, 2.2, 0.2]} />
        <meshStandardMaterial color={glassColor} roughness={0.2} metalness={0.8} />
      </mesh>
      <mesh position={[0, 5, -11.2]}>
        <boxGeometry args={[44, 2.2, 0.2]} />
        <meshStandardMaterial color={glassColor} roughness={0.2} metalness={0.8} />
      </mesh>
      <mesh position={[0, 9, -11.2]}>
        <boxGeometry args={[44, 2.2, 0.2]} />
        <meshStandardMaterial color={glassColor} roughness={0.2} metalness={0.8} />
      </mesh>

      {/* Parapet Roof Border & Solar / AC Equipment */}
      <mesh position={[0, 12.3, 0]} castShadow>
        <boxGeometry args={[49, 0.6, 23]} />
        <meshStandardMaterial color={roofColor} roughness={0.9} />
      </mesh>
      <mesh position={[-12, 13, 0]} castShadow>
        <boxGeometry args={[8, 1.5, 6]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh position={[12, 13, 0]} castShadow>
        <boxGeometry args={[8, 1.5, 6]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.6} roughness={0.4} />
      </mesh>
    </group>
  );
};
