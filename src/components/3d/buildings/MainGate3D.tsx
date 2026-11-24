import React, { useState } from 'react';
import { Html } from '@react-three/drei';
import { geoToWorld } from '../../../utils/geoToWorld';
import type { CampusFeature } from '../../../types/campus';

interface Building3DProps {
  feature: CampusFeature;
  isSelected: boolean;
  onSelect: (feature: CampusFeature) => void;
}

export const MainGate3D: React.FC<Building3DProps> = ({
  feature,
  isSelected,
  onSelect,
}) => {
  const [hovered, setHovered] = useState(false);
  const position = geoToWorld(feature.coordinates);

  const pillarColor = '#f59e0b'; // Ceremonial sandstone / amber
  const beamColor = '#1a365d'; // Deep NITJ navy
  const cabinColor = '#ffffff';

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
        <Html position={[0, 11, 0]} center distanceFactor={110}>
          <div className="px-3 py-1.5 bg-slate-900/90 text-white rounded-xl shadow-xl border border-amber-500 text-xs font-bold whitespace-nowrap pointer-events-none flex items-center gap-1.5 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            <span>{feature.name}</span>
            <span className="text-[10px] text-amber-300 font-mono">GT Road Access</span>
          </div>
        </Html>
      )}

      {/* Main Ceremonial Gate Pillars */}
      <mesh position={[-7, 4.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.5, 9, 2.5]} />
        <meshStandardMaterial color={pillarColor} roughness={0.4} />
      </mesh>
      <mesh position={[7, 4.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.5, 9, 2.5]} />
        <meshStandardMaterial color={pillarColor} roughness={0.4} />
      </mesh>

      {/* Overhead Grand Cross Beam with Institute Name */}
      <mesh position={[0, 8.5, 0]} castShadow>
        <boxGeometry args={[22, 1.8, 2.8]} />
        <meshStandardMaterial color={beamColor} roughness={0.3} metalness={0.2} />
      </mesh>

      {/* Side Security Checkpoint Cabins */}
      <mesh position={[-11, 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[5, 4, 4]} />
        <meshStandardMaterial color={cabinColor} roughness={0.4} />
      </mesh>
      <mesh position={[11, 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[5, 4, 4]} />
        <meshStandardMaterial color={cabinColor} roughness={0.4} />
      </mesh>

      {/* Boom Barrier Arms (Vehicular Regulation) */}
      <mesh position={[-2.5, 1, 1]} rotation={[0, 0, 0.15]} castShadow>
        <boxGeometry args={[5.5, 0.15, 0.15]} />
        <meshStandardMaterial color="#dc2626" />
      </mesh>
      <mesh position={[2.5, 1, 1]} rotation={[0, 0, -0.15]} castShadow>
        <boxGeometry args={[5.5, 0.15, 0.15]} />
        <meshStandardMaterial color="#dc2626" />
      </mesh>

      {/* Front Perimeter Wall Grill Sections */}
      <mesh position={[-24, 1.25, 0]} receiveShadow>
        <boxGeometry args={[20, 2.5, 0.4]} />
        <meshStandardMaterial color="#334155" roughness={0.7} />
      </mesh>
      <mesh position={[24, 1.25, 0]} receiveShadow>
        <boxGeometry args={[20, 2.5, 0.4]} />
        <meshStandardMaterial color="#334155" roughness={0.7} />
      </mesh>
    </group>
  );
};
