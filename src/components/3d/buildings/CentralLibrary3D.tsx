import React, { useState } from 'react';
import { Html } from '@react-three/drei';
import { geoToWorld } from '../../../utils/geoToWorld';
import type { CampusFeature } from '../../../types/campus';

interface Building3DProps {
  feature: CampusFeature;
  isSelected: boolean;
  onSelect: (feature: CampusFeature) => void;
}

export const CentralLibrary3D: React.FC<Building3DProps> = ({
  feature,
  isSelected,
  onSelect,
}) => {
  const [hovered, setHovered] = useState(false);
  const position = geoToWorld(feature.coordinates);

  const mainColor = isSelected ? '#3b82f6' : hovered ? '#4f46e5' : '#1e3a8a'; // Deep academic navy
  const finColor = '#b45309'; // Red brick brise-soleil
  const glassColor = '#60a5fa'; // Tinted glass

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
        <Html position={[0, 17, 0]} center distanceFactor={120}>
          <div className="px-3 py-1.5 bg-slate-900/90 text-white rounded-xl shadow-xl border border-blue-500 text-xs font-bold whitespace-nowrap pointer-events-none flex items-center gap-1.5 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span>{feature.name}</span>
            <span className="text-[10px] text-slate-400 font-mono">100k+ Books</span>
          </div>
        </Html>
      )}

      {/* Main Square 3-Story Pavilion (36m x 36m x 13.5m) */}
      <mesh position={[0, 6.75, 0]} castShadow receiveShadow>
        <boxGeometry args={[36, 13.5, 36]} />
        <meshStandardMaterial color={mainColor} roughness={0.6} metalness={0.1} />
      </mesh>

      {/* Recessed Large Glass Atrium Facade (Front) */}
      <mesh position={[0, 6.75, 18.2]}>
        <boxGeometry args={[26, 11, 0.4]} />
        <meshStandardMaterial color={glassColor} transparent opacity={0.65} roughness={0.1} metalness={0.8} />
      </mesh>

      {/* Vertical Sun-Shading Fins (Brise-Soleil) */}
      {[-12, -9, -6, -3, 0, 3, 6, 9, 12].map((x, i) => (
        <mesh key={i} position={[x, 6.75, 19]} castShadow>
          <boxGeometry args={[0.3, 11, 1.2]} />
          <meshStandardMaterial color={finColor} roughness={0.7} />
        </mesh>
      ))}

      {/* Cantilevered Entrance Canopy */}
      <mesh position={[0, 3.8, 21]} castShadow>
        <boxGeometry args={[14, 0.6, 5]} />
        <meshStandardMaterial color="#f1f5f9" roughness={0.3} metalness={0.2} />
      </mesh>

      {/* Canopy Columns */}
      <mesh position={[-6, 1.9, 23]} castShadow>
        <cylinderGeometry args={[0.25, 0.25, 3.8, 16]} />
        <meshStandardMaterial color="#334155" />
      </mesh>
      <mesh position={[6, 1.9, 23]} castShadow>
        <cylinderGeometry args={[0.25, 0.25, 3.8, 16]} />
        <meshStandardMaterial color="#334155" />
      </mesh>

      {/* Central Roof Pyramidal Skylight */}
      <mesh position={[0, 14.5, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
        <coneGeometry args={[8, 3.5, 4]} />
        <meshStandardMaterial color="#93c5fd" transparent opacity={0.8} roughness={0.1} metalness={0.9} />
      </mesh>
    </group>
  );
};
