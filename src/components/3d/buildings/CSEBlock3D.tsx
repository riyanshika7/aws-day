import React, { useState } from 'react';
import { Html } from '@react-three/drei';
import { geoToWorld } from '../../../utils/geoToWorld';
import type { CampusFeature } from '../../../types/campus';

interface Building3DProps {
  feature: CampusFeature;
  isSelected: boolean;
  onSelect: (feature: CampusFeature) => void;
}

export const CSEBlock3D: React.FC<Building3DProps> = ({
  feature,
  isSelected,
  onSelect,
}) => {
  const [hovered, setHovered] = useState(false);
  const position = geoToWorld(feature.coordinates);

  const mainColor = isSelected ? '#3b82f6' : hovered ? '#4f46e5' : '#9a3412'; // Brick terracotta
  const concreteColor = '#cbd5e1'; // Exposed architectural concrete bands
  const glassColor = '#60a5fa';

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
          <div className="px-3 py-1.5 bg-slate-900/90 text-white rounded-xl shadow-xl border border-orange-500 text-xs font-bold whitespace-nowrap pointer-events-none flex items-center gap-1.5 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <span>{feature.name}</span>
            <span className="text-[10px] text-orange-300 font-mono">AI & HPC</span>
          </div>
        </Html>
      )}

      {/* Main CSE Department Wing (44m x 12m x 24m) */}
      <mesh position={[0, 6, 0]} castShadow receiveShadow>
        <boxGeometry args={[44, 12, 24]} />
        <meshStandardMaterial color={mainColor} roughness={0.7} />
      </mesh>

      {/* Horizontal Concrete Spandrel Bands */}
      {[0.5, 4.5, 8.5, 12.2].map((y, i) => (
        <mesh key={i} position={[0, y, 0]} castShadow receiveShadow>
          <boxGeometry args={[45, 0.6, 25]} />
          <meshStandardMaterial color={concreteColor} roughness={0.5} />
        </mesh>
      ))}

      {/* Window Rhythm Units */}
      {[-16, -8, 0, 8, 16].map((x, i) => (
        <React.Fragment key={i}>
          <mesh position={[x, 6.5, 12.2]}>
            <boxGeometry args={[5, 2.4, 0.2]} />
            <meshStandardMaterial color={glassColor} transparent opacity={0.7} roughness={0.1} metalness={0.8} />
          </mesh>
          <mesh position={[x, 10.5, 12.2]}>
            <boxGeometry args={[5, 2.4, 0.2]} />
            <meshStandardMaterial color={glassColor} transparent opacity={0.7} roughness={0.1} metalness={0.8} />
          </mesh>
        </React.Fragment>
      ))}

      {/* Recessed Entrance Portico */}
      <mesh position={[0, 2.5, 13]} castShadow receiveShadow>
        <boxGeometry args={[14, 4.5, 4]} />
        <meshStandardMaterial color="#1e293b" roughness={0.3} metalness={0.4} />
      </mesh>

      {/* Rooftop Solar PV Panels (Renewable Campus Initiative) */}
      {[-12, -4, 4, 12].map((x, i) => (
        <mesh key={i} position={[x, 13.5, 0]} rotation={[-0.25, 0, 0]} castShadow>
          <boxGeometry args={[6, 0.2, 10]} />
          <meshStandardMaterial color="#1e3a8a" roughness={0.1} metalness={0.9} />
        </mesh>
      ))}
    </group>
  );
};
