import React, { useState } from 'react';
import { Html } from '@react-three/drei';
import { geoToWorld } from '../../../utils/geoToWorld';
import type { CampusFeature } from '../../../types/campus';

interface Building3DProps {
  feature: CampusFeature;
  isSelected: boolean;
  onSelect: (feature: CampusFeature) => void;
}

export const MegaBoysHostel3D: React.FC<Building3DProps> = ({
  feature,
  isSelected,
  onSelect,
}) => {
  const [hovered, setHovered] = useState(false);
  const position = geoToWorld(feature.coordinates);

  const mainColor = isSelected ? '#3b82f6' : hovered ? '#4f46e5' : '#047857'; // High-rise emerald
  const balconyColor = '#f1f5f9';
  const messColor = '#d97706';

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
        <Html position={[0, 27, 0]} center distanceFactor={140}>
          <div className="px-3 py-1.5 bg-slate-900/90 text-white rounded-xl shadow-xl border border-emerald-500 text-xs font-bold whitespace-nowrap pointer-events-none flex items-center gap-1.5 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{feature.name}</span>
            <span className="text-[10px] text-emerald-300 font-mono">7 Floors • MBH</span>
          </div>
        </Html>
      )}

      {/* 4 Multi-Story Quadrangle Wings (Blocks A, B, E, F) */}
      {/* North Wing - Block A */}
      <mesh position={[0, 12, -22]} castShadow receiveShadow>
        <boxGeometry args={[56, 24, 12]} />
        <meshStandardMaterial color={mainColor} roughness={0.7} />
      </mesh>

      {/* South Wing - Block B */}
      <mesh position={[0, 12, 22]} castShadow receiveShadow>
        <boxGeometry args={[56, 24, 12]} />
        <meshStandardMaterial color={mainColor} roughness={0.7} />
      </mesh>

      {/* West Wing - Block E */}
      <mesh position={[-22, 12, 0]} castShadow receiveShadow>
        <boxGeometry args={[12, 24, 32]} />
        <meshStandardMaterial color={mainColor} roughness={0.7} />
      </mesh>

      {/* East Wing - Block F */}
      <mesh position={[22, 12, 0]} castShadow receiveShadow>
        <boxGeometry args={[12, 24, 32]} />
        <meshStandardMaterial color={mainColor} roughness={0.7} />
      </mesh>

      {/* Internal Courtyard Mega Dining Mess Pavilion (1 Story) */}
      <mesh position={[0, 3, 0]} castShadow receiveShadow>
        <boxGeometry args={[22, 6, 22]} />
        <meshStandardMaterial color={messColor} roughness={0.6} />
      </mesh>

      {/* Horizontal Balcony Grids on Exterior Facade */}
      {[4, 8, 12, 16, 20].map((y, i) => (
        <React.Fragment key={i}>
          <mesh position={[0, y, 28.2]} castShadow>
            <boxGeometry args={[54, 0.5, 0.6]} />
            <meshStandardMaterial color={balconyColor} roughness={0.3} />
          </mesh>
          <mesh position={[0, y, -28.2]} castShadow>
            <boxGeometry args={[54, 0.5, 0.6]} />
            <meshStandardMaterial color={balconyColor} roughness={0.3} />
          </mesh>
        </React.Fragment>
      ))}

      {/* Rooftop Water Reservoir Towers */}
      {[-18, 18].map((x, i) => (
        <mesh key={i} position={[x, 25.5, -22]} castShadow>
          <cylinderGeometry args={[2.5, 2.5, 3.5, 16]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.5} roughness={0.4} />
        </mesh>
      ))}
    </group>
  );
};
