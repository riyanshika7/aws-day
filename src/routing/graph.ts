import type { GraphNode, GraphEdge } from './types';
import { haversineDistanceMeters } from '../utils/geoUtils';
import pedestrianPathsData from '../data/geojson/pedestrian_paths.geojson';

export class CampusRoutingGraph {
  nodes: Map<string, GraphNode> = new Map();
  adjacency: Map<string, GraphEdge[]> = new Map();

  constructor() {
    this.buildGraphFromGeoJSON();
  }

  private buildGraphFromGeoJSON() {
    // Ingest lines from pedestrian paths
    const features = (pedestrianPathsData as any).features || [];

    features.forEach((feature: any) => {
      const coords = feature.geometry.coordinates as [number, number][];
      const props = feature.properties || {};

      for (let i = 0; i < coords.length; i++) {
        const coord = coords[i];
        const nodeId = this.getOrCreateNodeAt(coord, props.wheelchairAccessible ?? true);

        if (i > 0) {
          const prevCoord = coords[i - 1];
          const prevNodeId = this.getOrCreateNodeAt(prevCoord, props.wheelchairAccessible ?? true);

          const dist = haversineDistanceMeters(prevCoord, coord);
          const accessible = props.wheelchairAccessible !== false && props.hasStairs !== true;
          const lit = props.lit !== false;
          const surface = props.surface || 'paved';

          // Bidirectional pedestrian edges
          this.addEdge({
            fromNodeId: prevNodeId,
            toNodeId: nodeId,
            distanceMeters: dist,
            weight: dist,
            accessible,
            hasStairs: props.hasStairs || false,
            lit,
            surface
          });

          this.addEdge({
            fromNodeId: nodeId,
            toNodeId: prevNodeId,
            distanceMeters: dist,
            weight: dist,
            accessible,
            hasStairs: props.hasStairs || false,
            lit,
            surface
          });
        }
      }
    });
  }

  private getOrCreateNodeAt(coord: [number, number], accessible: boolean): string {
    const precision = 5;
    const key = `NODE_${coord[0].toFixed(precision)}_${coord[1].toFixed(precision)}`;

    if (!this.nodes.has(key)) {
      this.nodes.set(key, {
        id: key,
        coordinates: coord,
        accessible
      });
      this.adjacency.set(key, []);
    }
    return key;
  }

  private addEdge(edge: GraphEdge) {
    const list = this.adjacency.get(edge.fromNodeId) || [];
    list.push(edge);
    this.adjacency.set(edge.fromNodeId, list);
  }

  /**
   * Find nearest graph node to given coordinates
   */
  findNearestNode(coord: [number, number]): GraphNode | null {
    let nearestNode: GraphNode | null = null;
    let minDistance = Infinity;

    for (const node of this.nodes.values()) {
      const dist = haversineDistanceMeters(coord, node.coordinates);
      if (dist < minDistance) {
        minDistance = dist;
        nearestNode = node;
      }
    }
    return nearestNode;
  }
}

export const campusGraph = new CampusRoutingGraph();
