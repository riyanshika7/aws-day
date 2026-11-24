import React, { useRef, useLayoutEffect, useMemo } from 'react';
import * as THREE from 'three';

export const InstancedTrees3D: React.FC = () => {
  const trunkMeshRef = useRef<THREE.InstancedMesh>(null);
  const foliageLowerMeshRef = useRef<THREE.InstancedMesh>(null);
  const foliageUpperMeshRef = useRef<THREE.InstancedMesh>(null);

  // Generate verified tree coordinates along roads, lawns, and buffers
  const treePositions = useMemo(() => {
    const coords: [number, number, number, number, number][] = []; // [x, y, z, scale, rotationY]

    // 1. Avenue Trees along Main Boulevard (Left & Right Flanks)
    for (let z = -250; z <= -80; z += 14) {
      coords.push([-14, 0, z, 1.0 + ((z * 3) % 4) * 0.08, (z * 0.7) % Math.PI]);
      coords.push([14, 0, z, 1.0 + ((z * 5) % 4) * 0.08, (z * 1.3) % Math.PI]);
    }

    // 2. Botanical Gardens & Front Lawns
    for (let x = -80; x <= -25; x += 16) {
      for (let z = -200; z <= -90; z += 20) {
        coords.push([x, 0, z, 0.95 + Math.sin(x * z) * 0.2, (x + z) % Math.PI]);
      }
    }

    // 3. Central Academic Circle Perimeter
    for (let angle = 0; angle < Math.PI * 2; angle += 0.35) {
      const radius = 68;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius - 40;
      coords.push([x, 0, z, 1.1 + Math.sin(angle * 4) * 0.15, angle]);
    }

    // 4. Perimeter Buffer Trees along GT Road Boundary
    for (let x = -300; x <= 300; x += 15) {
      coords.push([x, 0, -255, 1.25 + ((x * 7) % 3) * 0.1, (x * 0.4) % Math.PI]);
    }

    // 5. Hostels Quadrangle Green Trees
    for (let x = -340; x <= -200; x += 24) {
      for (let z = 200; z <= 350; z += 26) {
        coords.push([x, 0, z, 1.05 + ((x * z) % 3) * 0.12, (x * z) % Math.PI]);
      }
    }

    return coords;
  }, []);

  useLayoutEffect(() => {
    if (!trunkMeshRef.current || !foliageLowerMeshRef.current || !foliageUpperMeshRef.current) return;

    const dummy = new THREE.Object3D();

    treePositions.forEach(([x, y, z, scale, rotY], i) => {
      // 1. Trunk instance
      dummy.position.set(x, y + 2.4 * scale, z);
      dummy.scale.set(scale, scale, scale);
      dummy.rotation.set(0, rotY, 0);
      dummy.updateMatrix();
      trunkMeshRef.current!.setMatrixAt(i, dummy.matrix);

      // 2. Lower spreading canopy dome
      dummy.position.set(x, y + 5.2 * scale, z);
      dummy.scale.set(scale * 1.15, scale * 0.85, scale * 1.15);
      dummy.rotation.set(0, rotY + 0.4, 0);
      dummy.updateMatrix();
      foliageLowerMeshRef.current!.setMatrixAt(i, dummy.matrix);

      // 3. Upper rounded foliage crown
      dummy.position.set(x, y + 7.2 * scale, z);
      dummy.scale.set(scale * 0.85, scale * 0.95, scale * 0.85);
      dummy.rotation.set(0, rotY + 1.2, 0);
      dummy.updateMatrix();
      foliageUpperMeshRef.current!.setMatrixAt(i, dummy.matrix);
    });

    trunkMeshRef.current.instanceMatrix.needsUpdate = true;
    foliageLowerMeshRef.current.instanceMatrix.needsUpdate = true;
    foliageUpperMeshRef.current.instanceMatrix.needsUpdate = true;
  }, [treePositions]);

  const treeCount = treePositions.length;

  return (
    <group>
      {/* Instanced Realistic Tree Trunks (Tapered Cylinder) */}
      <instancedMesh
        ref={trunkMeshRef}
        args={[undefined as any, undefined as any, treeCount]}
        castShadow
        receiveShadow
      >
        <cylinderGeometry args={[0.3, 0.52, 4.8, 8]} />
        <meshStandardMaterial color="#423934" roughness={0.92} metalness={0.05} />
      </instancedMesh>

      {/* Instanced Lower Spreading Foliage Canopy (Dark Forest Olive) */}
      <instancedMesh
        ref={foliageLowerMeshRef}
        args={[undefined as any, undefined as any, treeCount]}
        castShadow
        receiveShadow
      >
        <sphereGeometry args={[3.2, 8, 7]} />
        <meshStandardMaterial color="#2c422b" roughness={0.82} metalness={0.02} />
      </instancedMesh>

      {/* Instanced Upper Foliage Crown (Natural Punjabi Neem / Gulmohar Green) */}
      <instancedMesh
        ref={foliageUpperMeshRef}
        args={[undefined as any, undefined as any, treeCount]}
        castShadow
        receiveShadow
      >
        <sphereGeometry args={[2.5, 8, 7]} />
        <meshStandardMaterial color="#3a5c37" roughness={0.8} metalness={0.02} />
      </instancedMesh>
    </group>
  );
};
