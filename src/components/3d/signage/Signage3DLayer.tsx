import React from 'react';
import { Html } from '@react-three/drei';
import { geoToWorld } from '../../../utils/geoToWorld';
import type { Signboard } from '../../../types/signage';
import { DirectionalArrow } from '../../signage/DirectionalArrow';

interface Signage3DLayerProps {
  signboards: Signboard[];
  selectedSignboard: Signboard | null;
  onSelectSignboard: (sign: Signboard) => void;
}

export const Signage3DLayer: React.FC<Signage3DLayerProps> = ({
  signboards,
  selectedSignboard,
  onSelectSignboard,
}) => {
  return (
    <group>
      {signboards.map((sign) => {
        const position = geoToWorld(sign.coordinates);
        const isSelected = selectedSignboard?.id === sign.id;

        return (
          <group
            key={sign.id}
            position={position}
            onClick={(e) => {
              e.stopPropagation();
              onSelectSignboard(sign);
            }}
          >
            {/* Ground Pulsing Target Circle */}
            <mesh position={[0, 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[1.5, 2.2, 24]} />
              <meshBasicMaterial color="#ff9900" transparent opacity={isSelected ? 0.9 : 0.5} />
            </mesh>

            {/* Dual Steel Mounting Posts */}
            <mesh position={[-0.8, 1.2, 0]} castShadow>
              <cylinderGeometry args={[0.06, 0.06, 2.4, 8]} />
              <meshStandardMaterial color="#475569" metalness={0.8} roughness={0.2} />
            </mesh>
            <mesh position={[0.8, 1.2, 0]} castShadow>
              <cylinderGeometry args={[0.06, 0.06, 2.4, 8]} />
              <meshStandardMaterial color="#475569" metalness={0.8} roughness={0.2} />
            </mesh>

            {/* Physical Signboard Board (Face) */}
            <mesh position={[0, 2.6, 0]} castShadow receiveShadow>
              <boxGeometry args={[2.4, 1.5, 0.1]} />
              <meshStandardMaterial
                color={isSelected ? '#f59e0b' : '#232f3e'}
                roughness={0.4}
                metalness={0.2}
              />
            </mesh>

            {/* AWS Smile Orange Border Frame */}
            <mesh position={[0, 2.6, 0.06]}>
              <boxGeometry args={[2.5, 1.6, 0.02]} />
              <meshStandardMaterial color="#ff9900" roughness={0.3} />
            </mesh>

            {/* 3D Floating Interactive Signboard Pin & Tooltip */}
            <Html position={[0, 4.2, 0]} center distanceFactor={70}>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectSignboard(sign);
                }}
                className={`cursor-pointer px-2.5 py-1 rounded-xl shadow-2xl border-2 transition-all flex items-center gap-1.5 whitespace-nowrap select-none ${
                  isSelected
                    ? 'bg-amber-500 text-slate-950 border-white scale-110'
                    : 'bg-[#232f3e]/95 text-white border-amber-500 hover:scale-105'
                }`}
              >
                <div className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
                <span className="font-mono text-[10px] font-black">{sign.id}</span>
                <span className="text-[10px] font-bold truncate max-w-[120px]">{sign.destinationName}</span>
                {sign.arrowDirection !== 'none' && (
                  <DirectionalArrow direction={sign.arrowDirection} size="sm" variant={isSelected ? 'dark' : 'orange'} />
                )}
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
};
