import React, { useState } from 'react';
import { Html } from '@react-three/drei';
import { geoToWorld } from '../../../utils/geoToWorld';
import type { CampusFeature } from '../../../types/campus';

interface Building3DProps {
  feature: CampusFeature;
  isSelected: boolean;
  onSelect: (feature: CampusFeature) => void;
}

export const CivilBlock3D: React.FC<Building3DProps> = ({
  feature,
  isSelected,
  onSelect,
}) => {
  const [hovered, setHovered] = useState(false);
  const position = geoToWorld(feature.coordinates);

  const mainColor = isSelected ? '#3b82f6' : hovered ? '#4f46e5' : '#78716c'; // Concrete & stone
  const shedColor = '#334155'; // Industrial testing bay
  const craneYellow = '#eab308'; // Heavy gantry crane

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
          <div className="px-3 py-1.5 bg-slate-900/90 text-white rounded-xl shadow-xl border border-stone-400 text-xs font-bold whitespace-nowrap pointer-events-none flex items-center gap-1.5 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-stone-400 animate-pulse" />
            <span>{feature.name}</span>
            <span className="text-[10px] text-stone-300 font-mono">Structures Lab</span>
          </div>
        </Html>
      )}

      {/* Main Civil Classrooms Block (38m x 9.5m x 18m) */}
      <mesh position={[0, 4.75, 4]} castShadow receiveShadow>
        <boxGeometry args={[38, 9.5, 18]} />
        <meshStandardMaterial color={mainColor} roughness={0.8} />
      </mesh>

      {/* Heavy Structural Testing High-Bay Annex */}
      <mesh position={[0, 6, -11]} castShadow receiveShadow>
        <boxGeometry args={[34, 12, 12]} />
        <meshStandardMaterial color={shedColor} roughness={0.6} metalness={0.4} />
      </mesh>

      {/* Pitched Industrial Roof for Heavy Lab */}
      <mesh position={[0, 12.8, -11]} rotation={[0, 0, Math.PI / 4]} castShadow>
        <boxGeometry args={[10, 10, 12.2]} />
        <meshStandardMaterial color="#1e293b" roughness={0.5} metalness={0.5} />
      </mesh>

      {/* Concrete Testing Outdoor Yard with Overhead Gantry Crane */}
      <mesh position={[24, 0.2, 0]} receiveShadow>
        <boxGeometry args={[14, 0.4, 24]} />
        <meshStandardMaterial color="#a8a29e" roughness={0.9} />
      </mesh>

      {/* Yellow Gantry Crane Frame */}
      <mesh position={[24, 4.5, -9]} castShadow>
        <cylinderGeometry args={[0.25, 0.25, 9, 8]} />
        <meshStandardMaterial color={craneYellow} metalness={0.6} roughness={0.3} />
      </mesh>
      <mesh position={[24, 4.5, 9]} castShadow>
        <cylinderGeometry args={[0.25, 0.25, 9, 8]} />
        <meshStandardMaterial color={craneYellow} metalness={0.6} roughness={0.3} />
      </mesh>
      <mesh position={[24, 9, 0]} castShadow>
        <boxGeometry args={[1, 0.8, 18]} />
        <meshStandardMaterial color={craneYellow} metalness={0.6} roughness={0.3} />
      </mesh>
    </group>
  );
};
