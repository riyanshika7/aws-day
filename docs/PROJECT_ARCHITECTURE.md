# NITJ Campus Navigator - System & Technical Architecture

## 1. Architectural Philosophy & Vision

The **NITJ Campus Navigator** is designed as a carrier-grade, highly responsive, production-ready Geospatial Information System (GIS) and interactive university navigation platform. Unlike toy prototypes or static vector graphics, this architecture is grounded in:
1. **Open GIS Standards**: Built upon standard OGC-compliant GeoJSON specifications (`EPSG:4326`), vector tiles, and client-side WebGL rendering via **MapLibre GL JS**.
2. **Deterministic Routing Graph**: Decoupled topological graph network supporting shortest-path, accessible-path, and multi-modal campus routing (Dijkstra / A* algorithms).
3. **Data Integrity & Decoupling**: Separation of geometric layers (plinths, curb lines, centerlines) from rich institutional metadata (department directories, faculty contacts, operational hours, event schedules).
4. **Mobile-First Progressive Web App (PWA) Readiness**: Seamless operation across desktop monitors, field tablets, and smartphones, with offline caching capabilities.

---

## 2. Technology Stack & Decision Matrix

| Layer | Technology | Version / Specification | Architectural Rationale |
| :--- | :--- | :--- | :--- |
| **Frontend Framework** | **React** | `^18.3.1` or `^19.0.0` | Component-based reactivity, wide ecosystem, strict TypeScript type safety. |
| **Language** | **TypeScript** | `^5.6.0` | Strict type definitions for GIS entities, GeoJSON features, and graph nodes. |
| **Build Tool & Bundler** | **Vite** | `^6.0.0` | Instant HMR, lightning-fast ES module bundling, minimal overhead. |
| **Styling & Design System** | **Tailwind CSS** | `^3.4.15` | Modern responsive utility classes, consistent campus color palette, dark mode support. |
| **Map Rendering Engine** | **MapLibre GL JS** | `^5.0.0` | High-performance WebGL vector rendering, open-source, no proprietary vendor lock-in, full control over custom vector and raster tile styling. |
| **Spatial Data Format** | **GeoJSON** | RFC 7946 (WGS 84) | Universal geospatial format, easily human-readable, natively ingested by MapLibre, QGIS, and PostGIS. |
| **Iconography & UI Assets** | **Lucide React** | `^0.460.0` | Clean, accessible vector icons for categories, navigation arrows, building types. |
| **Graph Pathfinding** | **Custom TS Routing Engine** | Graph Node/Edge (Dijkstra/A*) | Pure client-side zero-latency path computation without external API billing or connectivity dependencies. |

---

## 3. Directory & File Structure

```
c:\Users\riyan\aws\
├── docs/
│   ├── CAMPUS_RESEARCH.md            # Comprehensive research of NITJ campus
│   ├── MAP_DATA_SOURCES.md           # Source-of-truth register & GIS methodology
│   ├── BUILDING_INVENTORY.md         # 60+ cataloged campus features & verification
│   └── PROJECT_ARCHITECTURE.md       # Technical specification & system design
├── public/
│   ├── favicon.svg                   # Navigation compass icon
│   └── tiles/                        # Optional offline tile cache or styling assets
├── src/
│   ├── assets/                       # Static branding and icons
│   ├── components/
│   │   ├── common/
│   │   │   ├── Badge.tsx             # Category & verification tags
│   │   │   └── Modal.tsx             # Modal dialog wrapper
│   │   ├── map/
│   │   │   ├── CampusMap.tsx         # Core MapLibre GL map component & event hooks
│   │   │   ├── MapControls.tsx       # Zoom, pitch, tilt, reset north, locate me
│   │   │   ├── LayerToggle.tsx       # Toggles for buildings, roads, green, parking
│   │   │   └── MapLegend.tsx         # Category color legend & GIS scale indicator
│   │   ├── navigation/
│   │   │   ├── RoutePlanner.tsx      # Origin -> Destination selection & route trigger
│   │   │   ├── StepDirections.tsx    # Turn-by-turn pedestrian instruction list
│   │   │   └── AccessibilityToggle.tsx # Wheelchair accessible path preference
│   │   ├── search/
│   │   │   ├── SearchBar.tsx         # Auto-complete search across campus inventory
│   │   │   └── CategoryFilter.tsx    # Filter pills (Academic, Hostels, Food, Sports)
│   │   └── ui/
│   │       ├── Header.tsx            # Top branding bar with search & status indicators
│   │       ├── FeatureDrawer.tsx     # Sliding sheet displaying building details
│   │       └── VerificationBadge.tsx # Visual indicator of data verification grade
│   ├── config/
│   │   └── mapConfig.ts              # Bounds, center, zoom thresholds, style URLs
│   ├── data/
│   │   ├── geojson/
│   │   │   ├── buildings.geojson     # Verified / anchor building footprints
│   │   │   ├── roads.geojson         # Campus vehicular roads
│   │   │   ├── pedestrian_paths.geojson # Walkways, paths & corridors
│   │   │   ├── gates.geojson         # Campus access gates & checkpoints
│   │   │   ├── green_areas.geojson   # Lawns, sports fields & green belts
│   │   │   ├── parking.geojson       # Verified parking bays
│   │   │   └── landmarks.geojson     # POIs, ATMs, canteens, bus stops
│   │   └── inventory.json            # Rich building attributes & metadata
│   ├── routing/
│   │   ├── graph.ts                  # Graph builder from pedestrian paths
│   │   ├── dijkstra.ts               # Shortest-path & accessible routing algorithms
│   │   └── types.ts                  # Graph node, edge, and route calculation types
│   ├── types/
│   │   ├── campus.ts                 # Building, Amenity, Category domain models
│   │   ├── geojson.ts                # Strong typing for FeatureCollections
│   │   └── map.ts                    # Map viewport, layer state, and click events
│   ├── utils/
│   │   ├── geoUtils.ts               # Haversine distance, bounding box calculations
│   │   └── formatters.ts             # Walking time, distance formatting (m / km)
│   ├── App.tsx                       # Root application container & state orchestration
│   ├── main.tsx                      # Vite React entrypoint
│   └── index.css                     # Tailwind directives & MapLibre GL overrides
├── .gitignore
├── index.html                        # HTML template with mobile viewport tags
├── package.json                      # Dependencies and scripts
├── postcss.config.js                 # PostCSS plugin pipeline
├── tailwind.config.js                # Custom campus theme tokens
├── tsconfig.json                     # TypeScript compiler options
├── tsconfig.node.json                # Vite config TS settings
├── vite.config.ts                    # Vite build configuration
└── README.md                         # Project documentation and developer quickstart
```

---

## 4. GeoJSON Data Architecture & Schema Specifications

All spatial data layers reside in `src/data/geojson/` conforming to RFC 7946.

### 4.1 Buildings Layer (`buildings.geojson`)
```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "id": "ADM-01",
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[75.5355, 31.3960], [75.5361, 31.3960], [75.5361, 31.3964], [75.5355, 31.3964], [75.5355, 31.3960]]]
      },
      "properties": {
        "id": "ADM-01",
        "name": "Administrative Block",
        "shortName": "Admin",
        "category": "administrative",
        "floors": 3,
        "height": 12.0,
        "minHeight": 0,
        "color": "#1e3a8a",
        "verification": "partially_verified",
        "source": "NITJ Website / SMILE",
        "accessible": true,
        "entryPoints": [
          { "name": "Main Foyer Entrance", "coordinates": [75.5358, 31.3960], "accessible": true }
        ]
      }
    }
  ]
}
```

### 4.2 Pedestrian Paths Layer (`pedestrian_paths.geojson`)
```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "id": "PATH-001",
      "geometry": {
        "type": "LineString",
        "coordinates": [[75.5365, 31.3982], [75.5365, 31.3965]]
      },
      "properties": {
        "id": "PATH-001",
        "name": "Main Avenue Walkway",
        "surface": "paved_paver_blocks",
        "lit": true,
        "wheelchairAccessible": true,
        "hasStairs": false,
        "widthMeters": 3.0,
        "verification": "verified"
      }
    }
  ]
}
```

### 4.3 Gates Layer (`gates.geojson`)
```json
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "id": "ENT-01",
      "geometry": {
        "type": "Point",
        "coordinates": [75.5365, 31.3982]
      },
      "properties": {
        "id": "ENT-01",
        "name": "Main Gate (Gate No. 1)",
        "type": "vehicular_and_pedestrian",
        "access": "public_authorized",
        "operatingHours": "24x7",
        "verification": "verified"
      }
    }
  ]
}
```

---

## 5. Pedestrian Routing Graph Architecture

### 5.1 Graph Formalism
The campus pathway network is modeled as an undirected weighted multigraph:
$$G = (V, E)$$
Where:
- **$V$ (Vertices / Nodes)**: Walkway intersections, building entry points, gate checkpoints, pedestrian crossings.
  - Each node $v_i \in V$ is defined by: `(id, [longitude, latitude], elevation, accessible)`.
- **$E$ (Edges / Links)**: Physical walkable path segments connecting nodes.
  - Each edge $e_{ij} = (v_i, v_j) \in E$ carries attributes:
    - Distance: $d(e_{ij})$ in meters (computed via geodesic Haversine / Vincenty formula).
    - Surface type: `paved`, `asphalt`, `gravel`, `grass`.
    - Accessibility: `isWheelchairAccessible` (boolean), `hasStairs` (boolean), `stepCount` (integer), `rampSlope` (percentage).
    - Lighting: `isLitAtNight` (boolean).
    - Impedance Weight:
      $$W(e_{ij}) = d(e_{ij}) \times C_{\text{surface}} \times C_{\text{accessibility}} \times C_{\text{safety}}$$

### 5.2 Routing Algorithms
1. **Dijkstra's Algorithm**:
   - Used for guaranteed single-source shortest path across campus paths.
   - Dynamic weight filters allow users to toggle:
     - *Shortest Walk* (minimizes physical distance).
     - *Accessible / Step-Free* (infinite weight on stairs or high curbs).
     - *Night Safe / Well-Lit* (penalizes unlit pathways after dark).
2. **Turn-by-Turn Instruction Generator**:
   - Analyzes angle $\theta$ between consecutive edge vectors $(\vec{v}_{k-1}v_k, \vec{v}_k v_{k+1})$ to produce human-readable guidance:
     - $|\theta| < 20^\circ \implies$ "Continue straight along Main Avenue"
     - $20^\circ \le \theta \le 120^\circ \implies$ "Turn right past Central Library"
     - $-120^\circ \le \theta \le -20^\circ \implies$ "Turn left towards Student Activity Centre"
     - "Arrive at your destination on your right"

---

## 6. Component Hierarchy & State Management

```
[App.tsx]
 │
 ├── [Header]
 │    ├── Logo & Title ("NITJ Campus Navigator")
 │    ├── [SearchBar] (Debounced input, instant dropdown)
 │    └── Active Route Summary Badge
 │
 ├── [CategoryFilter] (Horizontal scrollable pills: Academic, Hostels, Food, Sports, Medical, Banks)
 │
 ├── [Main Viewport] (Flex row on desktop, stacked on mobile)
 │    │
 │    ├── [MapContainer] (MapLibre GL instance)
 │    │    ├── WebGL Canvas (Vector base layer + GeoJSON sources + extruded 3D buildings)
 │    │    ├── [MapControls] (Zoom in/out, reset pitch/bearing, geolocate)
 │    │    ├── [LayerToggle] (Toggles: Buildings, Roads, Walkways, Amenities, Satellite raster)
 │    │    ├── [MapLegend] (Category color keys, GIS scale bar)
 │    │    └── Dynamic Route Line Layer (Animated dash array for active path)
 │    │
 │    └── [Sidebar / Drawer]
 │         ├── View A: [BuildingDetailCard] (Photo, departments, facilities, floor count, verification badge)
 │         ├── View B: [RoutePlanner] (Origin, Destination, Accessibility toggles, "Start Navigation")
 │         └── View C: [StepDirections] (Calculated distance, ETA walking time, turn list)
```

---

## 7. Future Scalability Roadmap

1. **Phase 2 (Geometry Extraction & Ground-Truthing)**:
   - Ingestion of georeferenced CAD master plan from NITJ Estate Office.
   - Vectorization of 100% of campus building footprints, inner courts, and exact road centerlines.
2. **Phase 3 (Indoor & Multi-Floor Navigation)**:
   - Support for floor-level switching (`level: 0, 1, 2, 3`) inside mega structures (Mega Hostels, Central Library, IT Building).
3. **Phase 4 (Live Campus Intelligence & Event Overlays)**:
   - Integration with XCEED event schedules (e.g. Utkansh, Techniti, Convocations) with temporary venue pins, parking diversions, and food stall pop-ups.
4. **Phase 5 (PWA Offline First)**:
   - Service worker caching vector tiles and GeoJSON datasets for uninterrupted on-campus navigation even with spotty cellular coverage.
