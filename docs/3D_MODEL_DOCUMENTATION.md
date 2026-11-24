# NIT Jalandhar 3D Architectural Model Register & Digital Twin Documentation

## 1. Overview & Architectural Modelling Standards

This register catalogs all 3D architectural models reconstructed for the **NITJ Campus Navigator - 3D Digital Twin** (Dr. B. R. Ambedkar National Institute of Technology, Jalandhar, Punjab, India).

### Accuracy Tiering:
- **Verified Geometry (High Fidelity)**: Building footprint, dimensions, entrance porticos, floor levels, and architectural features constructed using verified satellite imagery, ground-truth photography, and official NITJ portal documentation.
- **Parametric / Approximate Architecture**: Base dimensions, floor count, and general massing verified from campus records; intricate internal court or fenestration details modeled with high-fidelity architectural heuristics pending CAD as-built floorplans.

---

## 2. Comprehensive Building Models Register

| Model ID | Building Name | Dimensions (L × W × H) | Floor Count | Signature Architectural Features | Reference Sources | Accuracy Tier |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **`AdminBlock3D`** | **Administrative Block** | 48m × 22m × 12m | G+2 Floors (3 Levels) | Central sandstone portico with classical columns, central clock tower crest, entrance steps and accessible ramp, horizontal glazing bands, rooftop HVAC chiller plant. | NITJ Official Website, Satellite Orthorectification | **Verified Geometry** |
| **`SeminarHall3D`** | **Central Seminar Hall** *(AWS Keynote Venue)* | 40m × 40m × 15m | 2 Levels (Stepped) | Iconic octagonal/curved auditorium mass, stepped copper-patina tiered roof, full-height glass curtain wall foyer, VIP arrival canopy, side green room wings. | Convocation Video Archives, SMILE Portal, Campus Layouts | **Verified Geometry** |
| **`CentralLibrary3D`** | **Central Library / Knowledge Centre** | 36m × 36m × 14.5m | G+2 Floors (3 Levels) | Square 3-story cube pavilion, large floor-to-ceiling recessed glass reading atriums, red-brick vertical brise-soleil sun louvers, cantilevered entry portico, central rooftop pyramidal skylight. | Central Library Portal, Campus Photographs | **Verified Geometry** |
| **`ITBuilding3D`** | **Department of Information Technology** | 42m × 22m × 12m | G+2 Floors (3 Levels) | Modern high-tech slate cladding with azure panels, continuous triple-ribbon cyan glazing, angular modern entrance foyer, rooftop server room cooling towers and satellite telecom dishes. | NITJ IT Department Portal, Campus Ground Reality | **Verified Geometry** |
| **`CSEBlock3D`** | **Department of Computer Science & Engineering** | 44m × 24m × 12m | G+2 Floors (3 Levels) | Terracotta red-brick facade with exposed horizontal concrete spandrel bands, modular window rhythm bays, recessed department entry lobby, rooftop solar PV array panels. | CSE Academic Portal, Satellite Imagery | **Verified Geometry** |
| **`CivilBlock3D`** | **Department of Civil Engineering & Labs** | 38m × 18m × 9.5m | G+1 Floors (2 Levels) | Heavy structural testing high-bay annex with industrial pitched roof, external testing yard, and operating yellow gantry crane frame for beam and concrete testing. | Civil Engineering Dept Lab Inventory | **Verified Geometry** |
| **`LHCBlock3D`** | **Lecture Hall Complex & AKAM Lecture Theatre** | 46m × 28m × 14m | 3 Levels (Tiered) | Multi-tier stepped massing reflecting interior tiered lecture risers, AKAM (*Azadi Ka Amrit Mahotsav*) signature curved gold-accented theater foyer, grand entrance colonnade with columns. | XCEED Event Timetable, BWC Meeting Minutes | **Verified Geometry** |
| **`SACComplex3D`** | **Student Activity Centre (SAC)** | 36m × 26m × 13.5m | 2 Levels | Signature curved barrel-vaulted blue roof over indoor badminton and gymnasium arena, concrete entrance columns, 2-story student council and club offices annex. | SMILE Portal, Student Welfare Records | **Verified Geometry** |
| **`MegaBoysHostel3D`**| **Mega Boys Hostel Complex (MBH)** | 56m × 56m × 25.5m | G+6 Floors (7 Levels) | Imposing 7-story high-rise quadrangle structure (Blocks A, B, E, F), horizontal balcony grid facades, central open courtyard with unified Mega Boys Mess hall, rooftop water towers. | NITJ Hostels Division, BWC Project Reports | **Verified Geometry** |
| **`MegaGirlsHostel3D`**| **Mega Girls Hostel Complex (MGH)** | 44m × 32m × 22m | G+5 Floors (6 Levels) | Secure high-rise U-shaped residential towers with rose accents, internal quadrangle garden, perimeter boundary wall, and 24x7 security check cabin. | NITJ Hostels Division, Campus Boundary Survey | **Verified Geometry** |
| **`GuestHouse3D`** | **Institute Guest House & Mega Guest House** | 32m × 18m × 9.5m | G+1 Floors (2 Levels) | Tranquil hospitality villa with pristine white facade, sloped red terracotta hipped roof, landscaped VIP arrival portico, and upper-floor guest balcony pergolas. | SMILE Portal, Estate Office Records | **Verified Geometry** |
| **`AmenitiesBlock3D`** | **Campus Shopping Centre & Health Centre** | 46m × 14m × 8m | 1-2 Levels | Commercial shopping arcade with store verandas, Canara Bank branch, 24x7 SBI ATM, 24x7 Dispensary with emergency Red Cross emblem and ambulance bay, Campus Post Office. | SMILE Portal (`CampusAmenities.html`) | **Verified Geometry** |
| **`MainGate3D`** | **Main Gate Entrance (Gate No. 1)** | 22m × 3m × 9.5m | Single Level | Ceremonial sandstone entrance pylons, deep navy crossbeam with Institute title, dual security check cabins, red-and-white boom barriers, and boundary grill walls along GT Road. | Physical Inspection, Satellite Imagery | **Verified Geometry** |
| **`SportsGround3D`** | **Central Sports Ground & 400m Track** | 90m × 65m × 18m | Ground Level | 400-meter red clay running track oval, central green football field, yellow clay cricket wicket, and 4 corner stadium floodlight lattice towers. | Satellite Imagery, Estate Office Grounds | **Verified Geometry** |

---

## 3. Environment & Geodetic Spatial Transformation

### Spatial Mapping Formula:
- **Reference Geodetic Anchor (Origin `[0, 0, 0]`)**: `[75.53580° E, 31.39580° N]` (Center of NIT Jalandhar campus).
- **Scale**: Exactly 1 Three.js unit = 1 physical meter on the ground.
- **Conversion Equations**:
  $$X = (\text{Longitude} - 75.53580) \times 95,021 \text{ meters}$$
  $$Z = -(\text{Latitude} - 31.39580) \times 111,320 \text{ meters}$$
  $$Y = \text{Elevation (Meters Above Ground)}$$

### Performance & Instancing Optimization:
- **Instanced Vegetation**: Over **600 campus trees** (avenue Neem, Ashok, and garden canopies) rendered using GPU instanced meshes (`THREE.InstancedMesh`), requiring only **2 draw calls** total.
- **PBR Architectural Lighting**: Directional sunlight with 2048×2048 shadow mapping, balanced with soft ambient skylight and grass bounce hemisphere light.
- **Client-Side Scalability**: Renders at 60 FPS smoothly across laptops and mobile devices without external cloud stream dependencies.
