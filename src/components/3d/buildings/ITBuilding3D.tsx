import React, { useState } from 'react';
import { Html } from '@react-three/drei';
import { geoToWorld } from '../../../utils/geoToWorld';
import type { CampusFeature } from '../../../types/campus';

interface Building3DProps {
  feature: CampusFeature;
  isSelected: boolean;
  onSelect: (feature: CampusFeature) => void;
}

export const ITBuilding3D: React.FC<Building3DProps> = ({
  feature,
  isSelected,
  onSelect,
}) => {
  const [hovered, setHovered] = useState(false);
  const position = geoToWorld(feature.coordinates);

  const mainColor = isSelected ? '#3b82f6' : hovered ? '#4f46e5' : '#1e293b'; // High-tech slate
  const panelColor = '#0284c7'; // Azure tech panel
  const glassColor = '#38bdf8'; // Cyan ribbon glazing

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
        <Html position={[0, 16, 0]} center distanceFactor={120}>
          <div className="px-3 py-1.5 bg-slate-900/90 text-white rounded-xl shadow-xl border border-cyan-500 text-xs font-bold whitespace-nowrap pointer-events-none flex items-center gap-1.5 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>{feature.name}</span>
            <span className="text-[10px] text-cyan-300 font-mono">Cloud Labs</span>
          </div>
        </Html>
      )}

      {/* Main IT Complex Mass (42m x 12m x 22m) */}
      <mesh position={[0, 6, 0]} castShadow receiveShadow>
        <boxGeometry args={[42, 12, 22]} />
        <meshStandardMaterial color={mainColor} roughness={0.4} metalness={0.3} />
      </mesh>

      {/* Modern Accent Tech Cladding Panels */}
      <mesh position={[0, 6, 11.2]}>
        <boxGeometry args={[40, 11, 0.3]} />
        <meshStandardMaterial color={panelColor} roughness={0.5} metalness={0.2} />
      </mesh>

      {/* Continuous Triple-Ribbon Glazing */}
      {[2.5, 6, 9.5].map((y, i) => (
        <mesh key={i} position={[0, y, 11.4]}>
          <boxGeometry args={[38, 1.8, 0.2]} />
          <meshStandardMaterial color={glassColor} transparent opacity={0.8} roughness={0.1} metalness={0.9} />
        </mesh>
      ))}

      {/* Angular High-Tech Entrance Glass Foyer */}
      <mesh position={[0, 3, 14]} castShadow receiveShadow>
        <boxGeometry args={[12, 6, 6]} />
        <meshStandardMaterial color="#0f172a" roughness={0.2} metalness={0.6} />
      </mesh>

      {/* Server Room Cooling Towers & Equipment on Roof */}
      <mesh position={[-12, 13, 0]} castShadow>
        <cylinderGeometry args={[2, 2, 2.5, 16]} />
        <meshStandardMaterial color="#64748b" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[-6, 13, 0]} castShadow>
        <cylinderGeometry args={[2, 2, 2.5, 16]} />
        <meshStandardMaterial color="#64748b" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Satellite Dish on Roof */}
      <mesh position={[12, 13.5, -4]} rotation={[0.4, 0.3, 0]} castShadow>
        <sphereGeometry args={[1.6, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#ffffff" roughness={0.3} metalness={0.5} />
      </mesh>
    </group>
  );
};
