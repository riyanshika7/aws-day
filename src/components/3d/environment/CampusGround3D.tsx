import React from 'react';
import { geoToWorld } from '../../../utils/geoToWorld';
import roadsData from '../../../data/geojson/roads.geojson';
import pedestrianPathsData from '../../../data/geojson/pedestrian_paths.geojson';

export const CampusGround3D: React.FC = () => {
  // Extract road segments into 3D world coordinates
  const roadFeatures = (roadsData as any).features || [];
  const pedestrianFeatures = (pedestrianPathsData as any).features || [];

  return (
    <group>
      {/* Surrounding Regional Terrain (1600m x 1600m) - Muted Earth Tone */}
      <mesh position={[0, -0.06, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[1600, 1600]} />
        <meshStandardMaterial color="#2d332a" roughness={0.95} />
      </mesh>

      {/* Main 154-Acre Campus Ground - Natural Lush Punjab Turf */}
      <mesh position={[0, -0.03, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[750, 850]} />
        <meshStandardMaterial color="#3d5634" roughness={0.9} />
      </mesh>

      {/* Main Entrance Ceremonial Front Lawns & Estate Landscaping */}
      <mesh position={[30, -0.01, -120]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[180, 240]} />
        <meshStandardMaterial color="#47653c" roughness={0.85} />
      </mesh>

      {/* GT Road Highway (NH-44 Bypass Corridor) - Dark Dense Asphalt */}
      <mesh position={[0, 0.01, -270]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[1100, 36]} />
        <meshStandardMaterial color="#1e2022" roughness={0.75} metalness={0.05} />
      </mesh>

      {/* GT Road Concrete Median Barrier */}
      <mesh position={[0, 0.35, -270]}>
        <boxGeometry args={[1100, 0.7, 1.2]} />
        <meshStandardMaterial color="#888a8d" roughness={0.8} />
      </mesh>

      {/* Highway White Edge Markings */}
      {[-16, 16].map((zOffset, idx) => (
        <mesh key={idx} position={[0, 0.02, -270 + zOffset]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[1100, 0.35]} />
          <meshStandardMaterial color="#e5e7eb" roughness={0.5} />
        </mesh>
      ))}

      {/* Internal Campus Asphalt Roads Rendered from Verified GeoJSON Lines */}
      {roadFeatures.map((feature: any, idx: number) => {
        const coords = feature.geometry.coordinates as [number, number][];
        return (
          <group key={idx}>
            {coords.map((coord, i) => {
              if (i === 0) return null;
              const prevCoord = coords[i - 1];
              const p1 = geoToWorld(prevCoord);
              const p2 = geoToWorld(coord);

              const dx = p2[0] - p1[0];
              const dz = p2[2] - p1[2];
              const length = Math.sqrt(dx * dx + dz * dz);
              const angle = Math.atan2(dx, dz);
              const midX = (p1[0] + p2[0]) / 2;
              const midZ = (p1[2] + p2[2]) / 2;

              return (
                <React.Fragment key={i}>
                  {/* Concrete Road Curbs (Base Width: 8.6m) */}
                  <mesh
                    position={[midX, 0.015, midZ]}
                    rotation={[-Math.PI / 2, 0, angle]}
                    receiveShadow
                  >
                    <planeGeometry args={[8.6, length]} />
                    <meshStandardMaterial color="#9ca3af" roughness={0.85} />
                  </mesh>

                  {/* Dense Asphalt Carriageway (Width: 7.8m) */}
                  <mesh
                    position={[midX, 0.02, midZ]}
                    rotation={[-Math.PI / 2, 0, angle]}
                    receiveShadow
                  >
                    <planeGeometry args={[7.8, length]} />
                    <meshStandardMaterial color="#2d3033" roughness={0.78} metalness={0.08} />
                  </mesh>

                  {/* Subtle Painted Road White Centerline (Width: 0.22m) */}
                  <mesh
                    position={[midX, 0.025, midZ]}
                    rotation={[-Math.PI / 2, 0, angle]}
                  >
                    <planeGeometry args={[0.22, length]} />
                    <meshStandardMaterial color="#f1f5f9" roughness={0.4} />
                  </mesh>
                </React.Fragment>
              );
            })}
          </group>
        );
      })}

      {/* Pedestrian Interlocking Paver Pathways (Sandstone & Kota Stone Paver Finish) */}
      {pedestrianFeatures.map((feature: any, idx: number) => {
        const coords = feature.geometry.coordinates as [number, number][];
        return (
          <group key={`ped-${idx}`}>
            {coords.map((coord, i) => {
              if (i === 0) return null;
              const prevCoord = coords[i - 1];
              const p1 = geoToWorld(prevCoord);
              const p2 = geoToWorld(coord);

              const dx = p2[0] - p1[0];
              const dz = p2[2] - p1[2];
              const length = Math.sqrt(dx * dx + dz * dz);
              const angle = Math.atan2(dx, dz);
              const midX = (p1[0] + p2[0]) / 2;
              const midZ = (p1[2] + p2[2]) / 2;

              return (
                <mesh
                  key={i}
                  position={[midX, 0.03, midZ]}
                  rotation={[-Math.PI / 2, 0, angle]}
                  receiveShadow
                >
                  <planeGeometry args={[2.8, length]} />
                  <meshStandardMaterial color="#c2b69d" roughness={0.88} metalness={0.02} />
                </mesh>
              );
            })}
          </group>
        );
      })}

      {/* Administrative Block Plaza & Parking Area */}
      <mesh position={[50, 0.02, -50]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[42, 52]} />
        <meshStandardMaterial color="#374151" roughness={0.82} />
      </mesh>
      {/* Parking Markings */}
      {[-16, -8, 0, 8, 16].map((offset, i) => (
        <mesh key={i} position={[50, 0.025, -50 + offset]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[36, 0.2]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.4} />
        </mesh>
      ))}
    </group>
  );
};
