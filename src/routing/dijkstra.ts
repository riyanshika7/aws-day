import { CampusRoutingGraph, campusGraph } from './graph';
import type { RoutingOptions } from './types';
import type { CampusRoute, RouteStep } from '../types/campus';
import { haversineDistanceMeters, calculateBearingDegrees, estimateWalkingMinutes } from '../utils/geoUtils';

export function findPedestrianRoute(
  originCoord: [number, number],
  destCoord: [number, number],
  originName: string,
  destName: string,
  options: RoutingOptions = {},
  graph: CampusRoutingGraph = campusGraph
): CampusRoute | null {
  const startNode = graph.findNearestNode(originCoord);
  const endNode = graph.findNearestNode(destCoord);

  if (!startNode || !endNode) {
    return null;
  }

  // Priority queue / Dijkstra
  const distances = new Map<string, number>();
  const previous = new Map<string, string | null>();
  const unvisited = new Set<string>();

  for (const nodeId of graph.nodes.keys()) {
    distances.set(nodeId, Infinity);
    previous.set(nodeId, null);
    unvisited.add(nodeId);
  }

  distances.set(startNode.id, 0);

  while (unvisited.size > 0) {
    // Find node with minimum distance
    let currentId: string | null = null;
    let minDistance = Infinity;

    for (const nodeId of unvisited) {
      const dist = distances.get(nodeId)!;
      if (dist < minDistance) {
        minDistance = dist;
        currentId = nodeId;
      }
    }

    if (!currentId || minDistance === Infinity) {
      break;
    }

    if (currentId === endNode.id) {
      break;
    }

    unvisited.delete(currentId);

    const neighbors = graph.adjacency.get(currentId) || [];
    for (const edge of neighbors) {
      if (!unvisited.has(edge.toNodeId)) continue;

      // Wheelchair accessibility constraint
      if (options.wheelchairOnly && (!edge.accessible || edge.hasStairs)) {
        continue;
      }

      let edgeWeight = edge.weight;
      if (options.preferLit && !edge.lit) {
        edgeWeight *= 1.5; // Penalty for unlit path
      }

      const alt = distances.get(currentId)! + edgeWeight;
      if (alt < distances.get(edge.toNodeId)!) {
        distances.set(edge.toNodeId, alt);
        previous.set(edge.toNodeId, currentId);
      }
    }
  }

  // Reconstruct path
  const pathNodeIds: string[] = [];
  let curr: string | null = endNode.id;

  while (curr !== null) {
    pathNodeIds.unshift(curr);
    curr = previous.get(curr) || null;
  }

  if (pathNodeIds.length === 0 || pathNodeIds[0] !== startNode.id) {
    // Direct fall-back connector if graph nodes are sparse
    const directDist = haversineDistanceMeters(originCoord, destCoord);
    return {
      originId: 'origin',
      destinationId: 'dest',
      originName,
      destinationName: destName,
      totalDistanceMeters: directDist,
      estimatedWalkingMinutes: estimateWalkingMinutes(directDist),
      isWheelchairAccessible: options.wheelchairOnly ?? true,
      pathCoordinates: [originCoord, destCoord],
      steps: [
        {
          instruction: `Walk directly towards ${destName}`,
          distanceMeters: directDist,
          durationSeconds: estimateWalkingMinutes(directDist) * 60,
          coordinate: originCoord
        },
        {
          instruction: `Arrive at ${destName}`,
          distanceMeters: 0,
          durationSeconds: 0,
          coordinate: destCoord
        }
      ]
    };
  }

  // Build coordinate list including actual origin and destination
  const pathCoordinates: [number, number][] = [originCoord];
  for (const id of pathNodeIds) {
    const node = graph.nodes.get(id);
    if (node) {
      pathCoordinates.push(node.coordinates);
    }
  }
  pathCoordinates.push(destCoord);

  // Compute total distance & steps
  let totalDistance = 0;
  const steps: RouteStep[] = [];

  steps.push({
    instruction: `Depart from ${originName} and follow the walkway`,
    distanceMeters: haversineDistanceMeters(originCoord, pathCoordinates[1]),
    durationSeconds: estimateWalkingMinutes(haversineDistanceMeters(originCoord, pathCoordinates[1])) * 60,
    coordinate: originCoord
  });

  for (let i = 1; i < pathCoordinates.length - 1; i++) {
    const prev = pathCoordinates[i - 1];
    const currCoord = pathCoordinates[i];
    const next = pathCoordinates[i + 1];

    const segDist = haversineDistanceMeters(currCoord, next);
    totalDistance += segDist;

    const b1 = calculateBearingDegrees(prev, currCoord);
    const b2 = calculateBearingDegrees(currCoord, next);
    let diff = (b2 - b1 + 360) % 360;
    if (diff > 180) diff -= 360;

    let turnPrompt = 'Continue straight along pathway';
    if (diff > 35 && diff <= 130) {
      turnPrompt = 'Turn right at the junction';
    } else if (diff > 130) {
      turnPrompt = 'Make a sharp right';
    } else if (diff < -35 && diff >= -130) {
      turnPrompt = 'Turn left at the junction';
    } else if (diff < -130) {
      turnPrompt = 'Make a sharp left';
    }

    if (i < pathCoordinates.length - 2) {
      steps.push({
        instruction: `${turnPrompt} for ${Math.round(segDist)} m`,
        distanceMeters: segDist,
        durationSeconds: estimateWalkingMinutes(segDist) * 60,
        coordinate: currCoord
      });
    }
  }

  steps.push({
    instruction: `Arrive at ${destName}`,
    distanceMeters: 0,
    durationSeconds: 0,
    coordinate: destCoord
  });

  return {
    originId: 'origin',
    destinationId: 'dest',
    originName,
    destinationName: destName,
    totalDistanceMeters: Math.round(totalDistance),
    estimatedWalkingMinutes: estimateWalkingMinutes(totalDistance),
    isWheelchairAccessible: options.wheelchairOnly ?? true,
    pathCoordinates,
    steps
  };
}
