# AWS Student Community Day 2027 | NIT Jalandhar
## Phase 2: Event Wayfinding & Physical Signage Architecture

---

## 1. Executive Summary & Event Context

- **Event**: AWS Student Community Day 2027 (North India Edition)
- **Institution**: Dr. B. R. Ambedkar National Institute of Technology, Jalandhar (NITJ), Punjab, India
- **Anticipated Attendance**: 600 – 1,200 student developers, cloud architects, researchers, and tech leaders
- **Core Challenge**: Navigating a sprawling 154-acre campus with multiple academic blocks, vehicular loop roads, and pedestrian spines.
- **Architectural Solution**: A dual-layer wayfinding system combining:
  1. **High-Impact Physical Signage**: High-contrast outdoor vinyl banners, rigid coroplast boards, junction signs, and roll-up totems placed at critical pedestrian decision points.
  2. **Dynamic QR Code Navigation**: Instant scan-to-walk mobile routing that opens the verified campus map with turn-by-turn pedestrian directions to the confirmed keynote hall, with zero app downloads or accounts required.
  3. **Modular Venue Architecture**: Decoupled destination logic allowing organizers to switch candidate venues (e.g. Central Seminar Hall vs. Auditorium vs. AKAM Lecture Theatre) with instant automatic recalculation of distances, bearings, arrows, and QR URLs across all signboards.

---

## 2. Verified & Proposed Signage Locations

| Signage ID | Signboard Title | Campus Physical Location | GPS Coordinates (WGS 84) | Template Type | Arrow | Destination | Distance (Verified) | Target Substrate |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **SIGN-AWS-001** | **Main Entrance Welcome & Event Wayfinding** | Main Gate (Gate No. 1) on GT Road (Amritsar Bypass) | `31.39820° N, 75.53650° E` | `entrance_welcome` | Straight (↑) | Central Seminar Hall | 235 m (~3 min) | 6ft × 3ft 540 GSM Outdoor Frontlit Vinyl Banner with Brass Eyelets |
| **SIGN-AWS-002** | **Central Avenue & Shopping Complex Junction Sign** | Junction of Central Boulevard, Shopping Complex & Bank Circle | `31.39650° N, 75.53650° E` | `junction_sign` | Slight Right (↗) | Central Seminar Hall | 110 m (~2 min) | 4ft × 2ft 3mm Rigid Coroplast Board with Dual Post Mount |
| **SIGN-AWS-003** | **Academic Core & IT Building Directional Sign** | Academic Ring Road adjacent to Computer Science & IT Block | `31.39535° N, 75.53535° E` | `directional_arrow` | Straight (↑) | Central Seminar Hall | 130 m (~2 min) | 3ft × 2ft 3mm Outdoor Aluminum Composite Panel (ACP) |
| **SIGN-AWS-004** | **Administrative Promenade & LHC Road Junction** | North-west corner of Admin Block & Seminar Hall Foyer | `31.39630° N, 75.53600° E` | `directional_arrow` | Sharp Right (→) | Central Seminar Hall | 55 m (~1 min) | 3ft × 2ft Coroplast Board with Heavy Ground Stake |
| **SIGN-AWS-005** | **Venue Arrival & Welcome Facade Banner** | Exterior Facade & Portico of Keynote Venue | `31.39645° N, 75.53540° E` | `venue_arrival` | None (Arrival) | Central Seminar Hall | 0 m (Arrived) | 6ft × 3ft Premium Backlit/Frontlit Vinyl Banner |
| **SIGN-AWS-006** | **Registration, Speaker & Attendee Check-In Totem** | Keynote Venue Indoor Foyer & Registration Concourse | `31.39640° N, 75.53545° E` | `registration_checkin` | Straight (↑) | Registration Concourse | 10 m (~1 min) | 2.5ft × 6ft Heavy-Duty Retractable Roll-Up Aluminum Standee |
| **SIGN-AWS-007** | **Event Parking & Barrier-Free Accessibility Direction**| Administrative Parking Bay & Ramp Approach | `31.39620° N, 75.53640° E` | `parking_accessibility`| Sharp Left (←) | Accessible Portico | 90 m (~1 min) | 4ft × 2ft Reflective Weatherproof Aluminum Road Panel |

---

## 3. Modular Venue Architecture

Because the final venue selection depends on registration thresholds, committee approvals, and institute logistics, the system treats the venue as a **configurable state entity**:

### Candidate Venues:
1. **Central Seminar Hall (`CEN-01`)** *(Default Confirmed)*:
   - Seating Capacity: ~650 attendees
   - Coordinates: `[75.53540, 31.39645]`
   - Ramped entrance, central AC, multi-tier theater seating.
2. **Institute Auditorium (`CEN-03`)**:
   - Seating Capacity: ~1,200 attendees
   - Coordinates: `[75.53420, 31.39680]`
   - High-capacity hall for plenary sessions and mega-scale keynotes.
3. **Lecture Hall Complex (LHC) & AKAM Lecture Theatre (`LHC-01`)**:
   - Seating Capacity: ~500 attendees
   - Coordinates: `[75.53455, 31.39600]`
   - Tiered smart lecture hall equipped with AV broadcast consoles.
4. **IT Building Complex (`ACA-02`)**:
   - Seating Capacity: ~350 attendees
   - Coordinates: `[75.53535, 31.39535]`
   - Specialized cloud labs and hackathon developer suites.

### Modular Cascade Behavior:
When the event organizer selects a new active venue in the **Signage Studio**:
$$\text{Signboard}_i \to \text{CalculateMetrics}(\text{Coords}_i, \text{Venue}_{\text{new}})$$
- All 7 signboards instantly update their destination name.
- Geodesic walking distances and ETA minutes recalculate from verified coordinates.
- Directional arrow angles adjust according to the relative bearing vector.
- The QR code payload updates to point the attendee to the new venue coordinate.

---

## 4. QR Code Protocol & Attendee Experience

Each signboard displays a high-density QR code generated with **Level-H Error Correction** (allowing up to 30% visual obstruction or weather damage without decode failure).

### URL Schema:
```
https://<domain>/?event=aws-scd-2027&sign=<SIGN_ID>&dest=<DEST_ID>&from=<LNG>,<LAT>
```
*Example*:
`https://navigator.nitj.ac.in/?event=aws-scd-2027&sign=SIGN-AWS-001&dest=CEN-01&from=75.53650,31.39820`

### Zero-Friction Flow:
1. Visitor points smartphone camera at signboard QR code.
2. Browser opens directly into the **NITJ Campus Navigator** with `isEventMode: true`.
3. The **Attendee Arrival Modal** appears immediately:
   - "You scanned: Main Entrance Welcome & Event Wayfinding"
   - "Destination: Central Seminar Hall (235m, ~3 min walk)"
4. Visitor taps **"Start Walking Route Now"**:
   - The map camera flies smoothly to their position.
   - The Dijkstra pedestrian routing engine traces the lighted, paved walkway in illuminated AWS blue.
   - Turn-by-turn walking cards guide them past the Central Circle directly to the venue foyer.

---

## 5. Visual Identity & Design System

### 5.1 Color Tokens
- **AWS Squid Ink Black (`#232f3e` / `#131921`)**: Core high-contrast background ensuring maximum readability under outdoor direct sunlight.
- **AWS Smile Orange (`#ff9900` / `#f59e0b`)**: Primary directional vectors, badges, and attention-grabbing accents.
- **Pure White (`#ffffff`)**: Destination typography and QR code substrate.
- **Accent Emerald (`#10b981`)**: Ground-verified route and accessibility certification badges.

### 5.2 Typography & Sizing
- **Heading 1 (Destination Name)**: 32pt – 48pt Bold Sans-Serif (Inter / Arial), readable from 15–20 meters away.
- **Wayfinding Arrows**: Minimum 100mm – 250mm vector arrows rendered with high-contrast borders.
- **Walking Metrics**: Bold numerical values accompanied by universal pedestrian and wheelchair icons.

### 5.3 Weather-Resistant Outdoor Production Guidelines
- **Substrates**:
  - *Main Gate & Portico*: 540 GSM frontlit matte vinyl (non-reflective under vehicle headlights). Reinforced perimeter hem with nickel/brass grommets placed every 2 feet.
  - *Pathways & Junctions*: 3mm – 5mm UV-printed fluted polypropylene (Coroplast) mounted on dual-post stakes.
  - *Indoor Foyers*: 240 GSM tear-resistant poly-canvas mounted on aluminum spring-loaded roll-up cassette standees.
- **Print Bleed**: Minimum 12.7 mm (0.5 inch) safety margin around all vector artwork.
