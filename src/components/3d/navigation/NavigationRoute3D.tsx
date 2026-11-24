import React, { useMemo } from 'react';
import * as THREE from 'three';
import { Html } from '@react-three/drei';
import { geoToWorld } from '../../../utils/geoToWorld';
import type { CampusRoute } from '../../../types/campus';
import { Footprints, MapPin } from 'lucide-react';
import { formatDistance } from '../../../utils/geoUtils';

interface NavigationRoute3DProps {
  activeRoute: CampusRoute | null;
}

export const NavigationRoute3D: React.FC<NavigationRoute3DProps> = ({ activeRoute }) => {
  if (!activeRoute || activeRoute.pathCoordinates.length < 2) return null;

  // Convert GPS coordinates to 3D points
  const points = useMemo(() => {
    return activeRoute.pathCoordinates.map((coord) => {
      const [x, , z] = geoToWorld(coord);
      return new THREE.Vector3(x, 0.45, z); // Elevated slightly above walkways
    });
  }, [activeRoute.pathCoordinates]);

  // Build 3D curve for smooth navigation path ribbon
  const tubeGeometry = useMemo(() => {
    if (points.length < 2) return null;
    const curve = new THREE.CatmullRomCurve3(points, false, 'centripetal', 0.2);
    return new THREE.TubeGeometry(curve, points.length * 8, 0.6, 8, false);
  }, [points]);

  const originPoint = points[0];
  const destPoint = points[points.length - 1];

  return (
    <group>
      {/* 3D Glowing Navigation Route Tube */}
      {tubeGeometry && (
        <>
          <mesh geometry={tubeGeometry}>
            <meshStandardMaterial
              color="#3b82f6"
              emissive="#2563eb"
              emissiveIntensity={0.8}
              roughness={0.2}
              metalness={0.3}
            />
          </mesh>
          {/* Subtle Outer Glow Tube */}
          <mesh geometry={tubeGeometry} scale={[1.4, 1.4, 1.4]}>
            <meshBasicMaterial color="#60a5fa" transparent opacity={0.35} />
          </mesh>
        </>
      )}

      {/* Origin Pin in 3D */}
      <group position={[originPoint.x, originPoint.y, originPoint.z]}>
        <mesh position={[0, 1.5, 0]}>
          <cylinderGeometry args={[0.4, 0.1, 2.5, 12]} />
          <meshStandardMaterial color="#10b981" emissive="#059669" emissiveIntensity={0.5} />
        </mesh>
        <Html position={[0, 3.5, 0]} center distanceFactor={80}>
          <div className="px-2.5 py-1 bg-emerald-600 text-white font-black text-[10px] rounded-lg shadow-xl uppercase tracking-wider flex items-center gap-1">
            <Footprints className="w-3 h-3" />
            <span>Start: {activeRoute.originName}</span>
          </div>
        </Html>
      </group>

      {/* Destination Pin in 3D */}
      <group position={[destPoint.x, destPoint.y, destPoint.z]}>
        <mesh position={[0, 2, 0]}>
          <cylinderGeometry args={[0.6, 0.1, 3.5, 16]} />
          <meshStandardMaterial color="#ef4444" emissive="#dc2626" emissiveIntensity={0.7} />
        </mesh>
        <Html position={[0, 4.5, 0]} center distanceFactor={90}>
          <div className="px-3 py-1.5 bg-rose-600 text-white font-black text-xs rounded-xl shadow-2xl uppercase tracking-wider flex flex-col items-center gap-0.5 border border-white">
            <div className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" />
              <span>{activeRoute.destinationName}</span>
            </div>
            <span className="text-[10px] font-bold text-rose-200">
              {formatDistance(activeRoute.totalDistanceMeters)} • ~{activeRoute.estimatedWalkingMinutes} min
            </span>
          </div>
        </Html>
      </group>
    </group>
  );
};
