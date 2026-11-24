# NIT Jalandhar Campus Map Data Sources & Geospatial Evaluation

## 1. Geospatial Integrity & Ground-Truth Mandate

In accordance with strict GIS engineering principles:
- **No artificial coordinates**: Latitudes and longitudes must not be randomized or estimated without verifiable geodetic reference.
- **No speculative geometries**: Polygons, road lines, and building footprints must reflect verified physical boundaries.
- **Explicit verification tiering**: Every spatial entity must carry an explicit verification grade indicating whether it originates from a georeferenced survey, high-resolution satellite orthorectification, verified open spatial databases, or unverified schematic representations.

---

## 2. Source-of-Truth Data Registry

| Source Identifier | Source Name & Originator | Data Format & Type | Coordinate Reference System (CRS) | Spatial Resolution / Accuracy | Content Provided | Verification Status & Limitations |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **SRC-01** | **NITJ Official Website & Portals** (`nitj.ac.in`, `smile.nitj.ac.in`) | HTML, PDF textual listings, institutional notices | N/A (Descriptive textual) | Landmark / Department level | Names of departments, hostels, amenities (banks, post office, health centre, food points) | **Partially Verified (Attributive)**. Confirms existence and operational role; provides no geospatial coordinates or geometry. |
| **SRC-02** | **NITJ Event Layout & Welcome Schedule Map** (`xceed.nitj.ac.in`) | PDF (Raster graphic diagram) | Non-georeferenced schematic | Relative topological scale only | Schematic layout of event venues, major lecture theatres, parking zones, and registration desks | **Schematic Only**. Lacks geodetic control points (GCPs). Useful for topological adjacency, but cannot be traced directly without georeferencing. |
| **SRC-03** | **NITJ Building & Works Committee (BWC) Records** | PDF reports, RFP drawings, tender site plans | CAD drawings / PDF architectural plots | Architectural scale (1:500 to 1:2000) | Site plans for new hostel projects (e.g. 1BHK Unisex Hostel, AC Boys Hostel), substation expansions | **High Relative Accuracy, Pending Georeferencing**. Exact dimensions and layouts exist in civil drawings, but require tie-in to WGS 84 / UTM 43N coordinates. |
| **SRC-04** | **OpenStreetMap (OSM) Global Database** | OSM XML / PBF / Overpass API (Nodes, Ways, Relations) | WGS 84 (EPSG:4326) | ~1-5 meters (crowdsourced GPS & aerial tracing) | Primary campus perimeter polygon, Main Gate coordinate, major building footprints, arterial internal roads | **Verified Geometric Reference (Partial Coverage)**. Excellent starting baseline for campus envelope and primary roads, but contains unmapped or unnamed secondary paths, internal corridors, and newly built wings. |
| **SRC-05** | **ISRO Bhuvan (National Remote Sensing Centre - NRSC)** | WMS / Web Tile Service (Cartosat, Resourcesat) | WGS 84 / LCC India | 0.8m - 2.5m optical resolution | Indian national satellite imagery, land cover, institutional boundaries | **Verified Aerial Reference**. Authoritative Indian national spatial reference. Excellent for boundary validation, tree canopy vs. built-up differentiation. |
| **SRC-06** | **High-Resolution Satellite Imagery (Google Earth / Maxar / Airbus)** | Orthorectified multispectral / RGB satellite basemap | Web Mercator (EPSG:3857) / WGS 84 (EPSG:4326) | Sub-meter (~30cm - 50cm per pixel) | Visible building rooflines, road curbs, walkways, athletic tracks, parking lots, trees, open grounds | **Gold-Standard Visual Aerial Reference**. Crucial for digitizing physical roof outlines, verifying road alignments, and detecting pedestrian desire lines. |
| **SRC-07** | **Estate Office Physical Ground Truth Survey** | Total Station / RTK DGPS / CAD Master Plan | Projected Grid (e.g. UTM Zone 43N) or Local Institute Origin | Centimeter-level (< 5 cm) | Official engineering master plan: underground utilities, building plinths, right-of-way boundaries, gate exact widths | **Pending Acquisition**. This is the ultimate institutional ground-truth. Must be formally requested from the Dean (Planning & Development) and Superintending Engineer (Estate). |

---

## 3. Detailed Geospatial Anchor & Boundary Definition

### 3.1 Geodetic Datum & Map Projection Standards
- **Global Datum**: WGS 84 (World Geodetic System 1984) - `EPSG:4326`
- **Tiled Web Mapping Projection**: WGS 84 / Pseudo-Mercator - `EPSG:3857` (used by MapLibre GL JS, OpenStreetMap, Mapbox, Carto)
- **Local Engineering Projection**: UTM Zone 43N (`EPSG:32643`) - Recommended for accurate metric distance, perimeter, and area calculations across Punjab.

### 3.2 Campus Geographic Envelope (Bounding Box)
Based on authoritative geodetic anchors (G.T. Road frontage to southern boundary; Bidhipur rail corridor to Suranussi fringe):
- **South-West Corner (SW)**: `31.39150° N, 75.53150° E`
- **North-East Corner (NE)**: `31.40100° N, 75.54200° E`
- **Campus Center Point**: `31.39580° N, 75.53580° E`
- **Main Entrance (Gate 1)**: `31.39820° N, 75.53650° E` (approximate anchor on GT Road alignment)

---

## 4. Data Collection Gaps & Discrepancy Matrix

| Feature Domain | Existing Public Data | Ground Truth Required | Critical Gaps & Discrepancies |
| :--- | :--- | :--- | :--- |
| **Academic Buildings** | Major blocks visible on satellite imagery; names confirmed on website. | Building entrances (single vs. multiple doors), internal floor layouts, departmental wings (CSE vs. IT partition). | Exact entryway coordinates for routing; delineation between interconnected department wings. |
| **Lecture Halls** | LHC location known generally; AKAM theatre mentioned in event schedules. | Exact building footprint, number of lecture halls, ramp/stair accessibility access points. | Differentiating AKAM Lecture Theatre within the broader LHC complex. |
| **Hostels & Messes** | Blocks 1-7 and Mega Hostels identified by name and satellite footprints. | Individual block labels (which block is A, B, E, F), warden offices, mess entry points. | Satellite imagery shows multiple high-rise towers in Mega Hostel; exact lettering of blocks requires ground verification or signage confirmation. |
| **Pedestrian Walkways** | Major asphalt roads visible on aerial maps. | Paved footpaths, covered corridors between departments, wheelchair ramps, desire lines across lawns. | OpenStreetMap maps vehicular roads, but lacks comprehensive pedestrian-only paths and indoor/covered connections. |
| **Parking Areas** | Surface parking areas visible near Admin and hostels. | Designated two-wheeler vs. four-wheeler zones, faculty reserved slots, visitor bays. | Parking regulations and barrier locations are not documented in public GIS. |
| **Gates & Access Control**| Main Gate on GT Road clearly identified. | Gate 2, Gate 3 (Bidhipur link), barrier hours, pedestrian turnstiles. | Operational timings and pedestrian vs. vehicular restrictions per gate need verification. |

---

## 5. Protocol for Ground-Truthing & Georeferencing

To advance from Phase 1 (Research & Architecture) to Phase 2 (Accurate Geometry Construction), the following geospatial workflow must be executed:

```
[Official Campus CAD / Master Plan / Tender Drawings]
                       │
                       ▼
    [Georeferencing via QGIS / ArcGIS]
    - Identify 4-8 Ground Control Points (GCPs) on GT Road,
      distinct building corners, boundary markers
    - Transformation: Helmert / 2nd Order Polynomial to EPSG:4326
                       │
                       ▼
[High-Res Aerial Orthorectification (0.3m Satellite / Drone)]
                       │
                       ▼
    [Vector Digitization into GeoJSON]
    - Building plinths (Layer: `buildings.geojson`)
    - Road centerlines & widths (Layer: `roads.geojson`)
    - Pedestrian network & footpaths (Layer: `pedestrian_paths.geojson`)
    - POIs, Gates, Amenities (Layer: `landmarks.geojson`, `gates.geojson`)
                       │
                       ▼
[On-Site Mobile GPS Validation (QField / Mergin Maps / OSM Go!)]
    - Verify building names, room ranges, entrance coordinates,
      wheelchair ramps, ATM brands, cafeteria names.
```

---

## 6. Required Source Files & Institutional Requests

Before digitizing permanent production geometries, the following artifacts should be obtained from NIT Jalandhar administration:
1. **Estate Office Master Plan / CAD Layout (`.dwg` or `.dxf`)**:
   - Master layout showing all current structures, roads, and proposed expansions with native coordinate benchmarks.
2. **Campus Utility & Infrastructure Map**:
   - Road classification (arterial, secondary, pedestrian walkway) and parking slot layout.
3. **Official Floor Directories**:
   - Department-wise room numbering and laboratory indices for future multi-floor navigation.
