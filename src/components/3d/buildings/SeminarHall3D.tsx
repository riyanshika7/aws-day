import React, { useState } from 'react';
import { Html } from '@react-three/drei';
import { geoToWorld } from '../../../utils/geoToWorld';
import type { CampusFeature } from '../../../types/campus';

interface Building3DProps {
  feature: CampusFeature;
  isSelected: boolean;
  onSelect: (feature: CampusFeature) => void;
  isEventVenue?: boolean;
}

export const SeminarHall3D: React.FC<Building3DProps> = ({
  feature,
  isSelected,
  onSelect,
  isEventVenue = true,
}) => {
  const [hovered, setHovered] = useState(false);
  const position = geoToWorld(feature.coordinates);

  const mainColor = isSelected ? '#3b82f6' : isEventVenue ? '#f59e0b' : hovered ? '#4f46e5' : '#b45309'; // Warm terracotta
  const copperRoofColor = '#0f766e'; // Verdigris / patina stepped copper roof
  const glassColor = '#60a5fa'; // Blue tinted glass curtain wall

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
      {/* 3D Label & Event Venue Tag */}
      {(hovered || isSelected || isEventVenue) && (
        <Html position={[0, 15, 0]} center distanceFactor={120}>
          <div className="px-3 py-1.5 bg-slate-900/95 text-white rounded-xl shadow-2xl border-2 border-amber-500 text-xs font-bold whitespace-nowrap pointer-events-none flex flex-col items-center gap-0.5 animate-fade-in">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
              <span>{feature.name}</span>
            </div>
            {isEventVenue && (
              <span className="text-[9px] uppercase font-black text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded-md">
                ⭐ AWS SCD 2027 Confirmed Venue
              </span>
            )}
          </div>
        </Html>
      )}

      {/* Octagonal / Cylinder Auditorium Core Mass */}
      <mesh position={[0, 5, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[18, 20, 10, 16]} />
        <meshStandardMaterial color={mainColor} roughness={0.6} metalness={0.1} />
      </mesh>

      {/* Stepped Architectural Dome / Roof */}
      <mesh position={[0, 11, 0]} castShadow>
        <cylinderGeometry args={[13, 18, 2.5, 16]} />
        <meshStandardMaterial color={copperRoofColor} roughness={0.4} metalness={0.3} />
      </mesh>
      <mesh position={[0, 12.8, 0]} castShadow>
        <cylinderGeometry args={[7, 13, 1.8, 16]} />
        <meshStandardMaterial color={copperRoofColor} roughness={0.4} metalness={0.3} />
      </mesh>
      <mesh position={[0, 14, 0]} castShadow>
        <cylinderGeometry args={[1.5, 7, 1, 16]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.3} metalness={0.5} />
      </mesh>

      {/* Front Entrance Glass Foyer & VIP Portico */}
      <mesh position={[0, 4, 16]} castShadow receiveShadow>
        <boxGeometry args={[18, 8, 8]} />
        <meshStandardMaterial color={glassColor} transparent opacity={0.7} roughness={0.1} metalness={0.8} />
      </mesh>

      {/* Portico Overhang Roof with AWS Welcome Banner */}
      <mesh position={[0, 8.2, 18]} castShadow>
        <boxGeometry args={[22, 0.8, 6]} />
        <meshStandardMaterial color="#232f3e" roughness={0.5} />
      </mesh>

      {/* Portico Pillars */}
      {[-9, -3, 3, 9].map((x, i) => (
        <mesh key={i} position={[x, 4, 20.5]} castShadow>
          <cylinderGeometry args={[0.35, 0.45, 8, 16]} />
          <meshStandardMaterial color="#ffffff" roughness={0.2} />
        </mesh>
      ))}

      {/* Front Entrance Podium Steps & Accessible Ramp */}
      <mesh position={[0, 0.25, 22]} receiveShadow>
        <boxGeometry args={[22, 0.5, 3]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.8} />
      </mesh>

      {/* Side Hall Wings (Green Rooms & VIP Lounges) */}
      <mesh position={[-16, 3.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[8, 7, 16]} />
        <meshStandardMaterial color={mainColor} roughness={0.7} />
      </mesh>
      <mesh position={[16, 3.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[8, 7, 16]} />
        <meshStandardMaterial color={mainColor} roughness={0.7} />
      </mesh>
    </group>
  );
};
