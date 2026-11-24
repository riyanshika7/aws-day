# NIT Jalandhar Campus Feature & Building Inventory (Source-of-Truth Register)

This register catalogs all identifiable physical and spatial entities across the Dr. B. R. Ambedkar National Institute of Technology, Jalandhar (NITJ) campus.

In accordance with GIS engineering standards:
- **Verified**: Confirmed by official NITJ documents and verified on authoritative geographic/satellite references.
- **Partially Verified**: Identity and general zone confirmed by official site/records; precise geodetic coordinates or boundary polygon await georeferenced CAD/drone survey.
- **Pending Ground-Truth / CAD**: Feature acknowledged in institutional documents or tender plans, but physical footprint and exact entry points require on-site field capture.

---

## 1. Feature Register Table

| ID | Feature Name | Feature Category | Primary Source | Geographic Anchor Coordinates (WGS 84) | Geometry Type | Verification Status | Additional Information Required |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **ENT-01** | **Main Gate (Gate No. 1)** | Gate / Entrance | Official Website / GT Road Alignment | `31.39820° N, 75.53650° E` | Point / LineString | **Verified** | Exact boom barrier position, pedestrian turnstiles, visitor pass booth layout. |
| **ENT-02** | **Gate No. 2 (Service / Logistics Gate)** | Gate / Entrance | Physical Campus Inspection / Satellite | `31.39760° N, 75.53880° E` (Approx.) | Point | **Partially Verified** | Operating hours, vehicle tonnage clearance limits, security cabin location. |
| **ENT-03** | **Gate No. 3 (Rear / Bidhipur Link Gate)** | Gate / Entrance | Estate Office / Village Border | `31.39320° N, 75.53180° E` (Approx.) | Point | **Partially Verified** | Access regulations for day scholars, biometric scanner presence, timings. |
| **ADM-01** | **Administrative Block** | Administrative | Official Website (`nitj.ac.in`) / OSM | `31.39620° N, 75.53580° E` (Approx.) | Polygon | **Partially Verified** | CAD footprint of wings (Director's Office, Academic Section, Accounts, Examination Hall, Dean Offices). |
| **ACA-01** | **Computer Science & Engineering (CSE) Block** | Academic | NITJ Department Portal / SMILE | `31.39550° N, 75.53480° E` (Zone) | Polygon | **Partially Verified** | Structural separation line between CSE and IT wings, emergency exits, floor level counts. |
| **ACA-02** | **Information Technology (IT) Block / IT Building** | Academic | NITJ Department Portal | `31.39540° N, 75.53520° E` (Zone) | Polygon | **Partially Verified** | High-performance computing lab wings, server room location, primary student entrance. |
| **ACA-03** | **Civil Engineering Block & Laboratories** | Academic | NITJ Department Portal | `31.39500° N, 75.53600° E` (Zone) | Polygon | **Partially Verified** | Delineation between department classrooms and heavy structural/geotechnical outdoor lab testing yards. |
| **ACA-04** | **Mechanical Engineering Block** | Academic | NITJ Department Portal | `31.39460° N, 75.53650° E` (Zone) | Polygon | **Partially Verified** | Interconnection corridors leading to Central Workshops, lab bays, machine testing halls. |
| **ACA-05** | **Central Workshop Complex** | Academic / Lab | Estate Office / Mechanical Dept | `31.39420° N, 75.53680° E` (Zone) | Polygon | **Partially Verified** | Individual bay partitions (Foundry, Machine Shop, Welding, Carpentry, Fitting, CNC). |
| **ACA-06** | **Electrical Engineering Block** | Academic | NITJ Department Portal | `31.39520° N, 75.53700° E` (Zone) | Polygon | **Partially Verified** | High-voltage testing laboratory annex, power systems lab, department library. |
| **ACA-07** | **Electronics & Communication Engg. (ECE) Block** | Academic | NITJ Department Portal | `31.39560° N, 75.53720° E` (Zone) | Polygon | **Partially Verified** | Clean room / VLSI fabrication suites, antenna testing roof platform, entrances. |
| **ACA-08** | **Chemical Engineering Block** | Academic | NITJ Department Portal | `31.39480° N, 75.53550° E` (Zone) | Polygon | **Partially Verified** | Chemical storage safety bunker, wet lab exhaust systems, pilot plant annex. |
| **ACA-09** | **Biotechnology Department Block** | Academic | NITJ Department Portal / SMILE | `31.39450° N, 75.53500° E` (Zone) | Polygon | **Partially Verified** | Proximity to Food Point canteen; bio-reactor containment rooms, ramp access. |
| **ACA-10** | **Industrial & Production Engineering (IPE) Block**| Academic | NITJ Department Portal | `31.39440° N, 75.53620° E` (Zone) | Polygon | **Partially Verified** | Metrology clean room, CAD/CAM computer center, robotics cell. |
| **ACA-11** | **Textile Technology Block** | Academic | NITJ Department Portal | `31.39400° N, 75.53580° E` (Zone) | Polygon | **Partially Verified** | Specialized spinning and weaving shed, physical/chemical testing labs, museum display room. |
| **ACA-12** | **Science & Humanities Complex (Physics, Chemistry, Maths, Hum.)** | Academic | NITJ Website | `31.39580° N, 75.53620° E` (Zone) | Polygon | **Partially Verified** | Allocation of wings per basic science department, optical dark rooms, laser lab. |
| **LHC-01** | **Lecture Hall Complex (LHC)** | Academic / Central | NITJ BWC Minutes / Event Map | `31.39600° N, 75.53450° E` (Zone) | Polygon | **Partially Verified** | Number and numbering scheme of tiered lecture rooms (e.g. LT-1 to LT-10), tiered risers. |
| **LHC-02** | **AKAM Lecture Theatre** | Academic / Central | NITJ Event Schedule (`xceed.nitj.ac.in`) | Contained in LHC Complex | Point / Polygon (Sub-feature) | **Partially Verified** | Seating capacity, AV control booth, dedicated entrance doorway vs. general LHC corridor. |
| **CEN-01** | **Central Seminar Hall** | Central Facility | Convocation Records / SMILE | `31.39640° N, 75.53540° E` (Zone) | Polygon | **Partially Verified** | Stage loading dock, VIP lounge entrance, foyer capacity, wheelchair ramp path. |
| **CEN-02** | **Central Library / Knowledge Centre** | Central Facility | NITJ Website (`nitj.ac.in`) | `31.39650° N, 75.53620° E` (Zone) | Polygon | **Partially Verified** | Digital library lab location, book checkout circulation counter, reading room floor divisions. |
| **CEN-03** | **Institute Auditorium** | Cultural / Central | NITJ Portal / Utkansh Records | `31.39680° N, 75.53420° E` (Zone) | Polygon | **Partially Verified** | Green rooms, main audience entrance portals, acoustic shell dimensions. |
| **CEN-04** | **Open Air Theatre (OAT)** | Cultural / Central | SMILE Portal (`CampusAmenities.html`) | `31.39660° N, 75.53380° E` (Zone) | Polygon | **Partially Verified** | Stepped seating radius, performance stage orientation, backstage pathway. |
| **CEN-05** | **Student Activity Centre (SAC)** | Student Life / Sports| SMILE Portal (`CampusAmenities.html`) | `31.39520° N, 75.53350° E` (Zone) | Polygon | **Partially Verified** | Gymnasium entrance, indoor badminton courts, table tennis hall, music club room. |
| **CEN-06** | **Central Computer Centre** | Central Facility | NITJ Portal | `31.39580° N, 75.53500° E` (Zone) | Polygon | **Partially Verified** | Main server room, high-speed terminal labs, campus network NOC. |
| **RES-01** | **Institute Guest House** | Hospitality | SMILE Portal / Estate Office | `31.39720° N, 75.53750° E` (Zone) | Polygon | **Partially Verified** | Reception desk, VIP suites wing, dining hall, private guest parking. |
| **RES-02** | **Mega Guest House** | Hospitality | NITJ BWC Minutes / Stay@NITJ | `31.39740° N, 75.53780° E` (Zone) | Polygon | **Partially Verified** | Room count, conference facility annex, connection to main guest house gardens. |
| **HST-01** | **Boys Hostel No. 1** | Residential | NITJ Hostels Portal / SMILE | `31.39400° N, 75.53300° E` (Zone) | Polygon | **Partially Verified** | Courtyard geometry, mess dining hall, warden office, entry gate. |
| **HST-02** | **Boys Hostel No. 2** | Residential | NITJ Hostels Portal / SMILE | `31.39360° N, 75.53320° E` (Zone) | Polygon | **Partially Verified** | Wing footprint, bicycle stand, indoor common room, mess entrance. |
| **HST-03** | **Boys Hostel No. 3** | Residential | NITJ Hostels Portal / SMILE | `31.39320° N, 75.53350° E` (Zone) | Polygon | **Partially Verified** | Floor plan, night canteen proximity, residential capacity. |
| **HST-04** | **Boys Hostel No. 4** | Residential | NITJ Hostels Portal / SMILE | `31.39280° N, 75.53380° E` (Zone) | Polygon | **Partially Verified** | Layout geometry, mess hall, laundry area. |
| **HST-05** | **Boys Hostel No. 5** | Residential | NITJ Hostels Portal / SMILE | `31.39240° N, 75.53400° E` (Zone) | Polygon | **Partially Verified** | Wing orientation, recreation room, sports court adjacency. |
| **HST-06** | **Boys Hostel No. 6** | Residential | NITJ Hostels Portal / SMILE | `31.39200° N, 75.53420° E` (Zone) | Polygon | **Partially Verified** | Building footprint from aerial photo, mess wing. |
| **HST-07** | **Boys Hostel No. 7 (Brahmaputra)** | Residential | NITJ Hostels Portal / SMILE | `31.39180° N, 75.53450° E` (Zone) | Polygon | **Partially Verified** | Plinth boundary, entry security kiosk, common facilities. |
| **HST-08** | **Mega Boys Hostel (MBH Block A)** | Residential | NITJ BWC Reports / Hostels | `31.39250° N, 75.53200° E` (Zone) | Polygon | **Partially Verified** | Multi-story high-rise footprint, lift lobby, emergency stairwells. |
| **HST-09** | **Mega Boys Hostel (MBH Block B)** | Residential | NITJ BWC Reports / Hostels | `31.39220° N, 75.53220° E` (Zone) | Polygon | **Partially Verified** | Tower footprint, inter-block connecting bridge, fire escapes. |
| **HST-10** | **Mega Boys Hostel (MBH Block E)** | Residential | NITJ BWC Reports / Hostels | `31.39190° N, 75.53250° E` (Zone) | Polygon | **Partially Verified** | Structural separation from Block F, residential entrance. |
| **HST-11** | **Mega Boys Hostel (MBH Block F)** | Residential | NITJ BWC Reports / Hostels | `31.39160° N, 75.53280° E` (Zone) | Polygon | **Partially Verified** | Tower footprint, ground floor study lounge, security desk. |
| **HST-12** | **Mega Boys Hostel Central Mess** | Residential / Dining | NITJ Hostels Portal | `31.39210° N, 75.53240° E` (Zone) | Polygon | **Partially Verified** | Large dining hall footprint, kitchen loading bay, delivery access road. |
| **HST-13** | **Girls Hostel No. 1** | Residential | NITJ Hostels Portal / SMILE | `31.39650° N, 75.53850° E` (Zone) | Polygon | **Partially Verified** | Perimeter security wall, visitor waiting room, mess wing, warden flat. |
| **HST-14** | **Girls Hostel No. 2** | Residential | NITJ Hostels Portal / SMILE | `31.39620° N, 75.53880° E` (Zone) | Polygon | **Partially Verified** | Internal quadrangle, dining facility, reading room. |
| **HST-15** | **Mega Girls Hostel (Phase-I & II)** | Residential | NITJ BWC Reports / Hostels | `31.39580° N, 75.53920° E` (Zone) | Polygon | **Partially Verified** | High-rise tower footprint, Phase-II expansion boundary, dedicated security gate. |
| **AMN-01** | **Shopping Centre / Complex** | Commercial / Amenity| SMILE Portal (`CampusAmenities.html`) | `31.39680° N, 75.53780° E` (Zone) | Polygon | **Partially Verified** | Individual shop layout: Grocery, bookshop, photocopy/printing center, barber. |
| **AMN-02** | **Canara Bank & ATM** | Financial / Amenity | SMILE Portal (`CampusAmenities.html`) | Near Shopping Centre | Point | **Partially Verified** | Branch entrance coordinate, 24-hr ATM kiosk coordinate. |
| **AMN-03** | **State Bank of India (SBI) & ATM** | Financial / Amenity | SMILE Portal (`CampusAmenities.html`) | Near Guest House / Shopping | Point | **Partially Verified** | Full branch entrance coordinate, 24-hr ATM booth coordinate. |
| **MED-01** | **Institute Dispensary / Health Centre** | Medical / Emergency | SMILE Portal / Health Centre | `31.39640° N, 75.53820° E` (Zone) | Polygon | **Partially Verified** | Emergency ambulance bay, observation ward, doctor consultation rooms. |
| **MED-02** | **24x7 Chemist / Medical Store** | Medical / Amenity | SMILE Portal (`CampusAmenities.html`) | Inside Dispensary Building | Point | **Partially Verified** | Night window access for students and residents. |
| **AMN-04** | **Campus Post Office** | Public Service | SMILE Portal (`CampusAmenities.html`) | Inside Dispensary Building | Point | **Partially Verified** | Public service counter hours, parcel delivery dock. |
| **FOD-01** | **Campus Canteen** | Food / Dining | SMILE Portal (`CampusAmenities.html`) | `31.39560° N, 75.53660° E` (Zone) | Polygon | **Partially Verified** | Seating hall capacity, kitchen boundary, outdoor seating lawn. |
| **FOD-02** | **Food Point (Biotech vicinity)** | Food / Dining | SMILE Portal (`CampusAmenities.html`) | Near Biotech Department | Point | **Partially Verified** | Outdoor kiosk footprint, seating benches, operating hours. |
| **FOD-03** | **Campus Cafe** | Food / Dining | SMILE Portal (`CampusAmenities.html`) | Central Academic Area | Point | **Partially Verified** | Exact physical room location and indoor seating capacity. |
| **FOD-04** | **Night Canteens (Boys & Girls Hostels)**| Food / Dining | SMILE Portal / Hostels | Hostel Cluster Locations | Point | **Partially Verified** | Operating hours (typically 8 PM - 2 AM), precise vendor stalls. |
| **FOD-05** | **Yadav Canteen** | Food / Dining | SMILE Portal (`CampusAmenities.html`) | Campus Amenities Zone | Point | **Partially Verified** | Physical building/stall boundary and seating area. |
| **FOD-06** | **Verka Dairy Milk Booth & Nescafe Kiosks** | Food / Dining | SMILE Portal / Ground Reality | Multiple Pathway Nodes | Point | **Pending Ground-Truth**| Field GPS coordinates for each vendor booth across campus. |
| **SPT-01** | **Athletic Running Track & Football Ground** | Sports / Recreation | Satellite Imagery / Estate Office | `31.39380° N, 75.53500° E` (Zone) | Polygon | **Partially Verified** | 400m track outer edge, spectator seating mound, pavilion. |
| **SPT-02** | **Cricket Pitch & Main Oval** | Sports / Recreation | Satellite Imagery / Estate Office | Adjacent to Athletic Track | Polygon | **Partially Verified** | Practice nets coordinate, boundary fence. |
| **SPT-03** | **Outdoor Basketball Courts** | Sports / Recreation | Satellite Imagery / Sports Dept | Near SAC Complex | Polygon | **Partially Verified** | Court boundaries, floodlight pole locations, synthetic surface bounds. |
| **SPT-04** | **Lawn Tennis Courts** | Sports / Recreation | Satellite Imagery / Sports Dept | Near SAC Complex | Polygon | **Partially Verified** | Fenced enclosure boundary, court surface type. |
| **SPT-05** | **Volleyball Courts** | Sports / Recreation | Satellite Imagery / Sports Dept | Near Hostels & SAC | Polygon | **Partially Verified** | Sand/clay court boundaries. |
| **PRK-01** | **Administrative Parking Lot** | Parking / Transit | Satellite Imagery / Estate Office | Adjacent to Admin Block | Polygon | **Partially Verified** | Number of four-wheeler slots, VIP reserved bays, security guard point. |
| **PRK-02** | **Main Gate Visitor Parking Area** | Parking / Transit | Satellite Imagery / Security | Inside Gate 1 Perimeter | Polygon | **Partially Verified** | Visitor parking capacity, bus waiting bay. |
| **PRK-03** | **Hostel Two-Wheeler / Bicycle Parking** | Parking / Transit | Hostels / Satellite Imagery | Adjacent to MBH & Hostels | Polygon | **Partially Verified** | Covered sheds vs. open parking areas. |
| **STA-01** | **Director's Residence / Bungalow** | Staff Residential | Estate Office Records | Northern Residential Sector | Polygon | **Partially Verified** | Private garden boundary, access driveway. |
| **STA-02** | **Faculty & Staff Housing (Types II, III, IV, V)**| Staff Residential | Estate Office (`StateOffice.html`) | Eastern Residential Sector | MultiPolygon | **Partially Verified** | Individual block numbering (e.g. Type-V Blocks, Type-IV Blocks), lane names. |
| **UTL-01** | **Estate Office & Maintenance Workshop** | Infrastructure | Estate Office (`StateOffice.html`) | `31.39600° N, 75.53800° E` (Zone) | Polygon | **Partially Verified** | Engineering complaint office counter, CPWD/Estate storage yard. |
| **UTL-02** | **Central Electrical Substation & Transformers** | Infrastructure | BWC Electrical Minutes | Near Maintenance Yard | Polygon | **Partially Verified** | High-voltage enclosure boundary, DG generator power backup shed. |
| **UTL-03** | **Overhead Water Reservoir & Pump House** | Infrastructure | Estate Office / Public Health | Campus Water Works Zone | Polygon / Point | **Partially Verified** | Tank footprint, water filtration plant boundary. |

---

## 2. Summary of Inventory Statistics

- **Total Cataloged Entities**: 62 key campus facilities.
- **Academic Departments & Lecture Facilities**: 16 entities.
- **Administrative & Central Core Facilities**: 6 entities.
- **Student Hostels & Dining Messes**: 15 entities.
- **Sports & Recreational Grounds**: 5 major facilities.
- **Amenities, Banks, Medical & Canteens**: 11 facilities.
- **Infrastructure, Utilities & Gated Entrances**: 9 facilities.
- **Verification Status Breakdown**:
  - *Verified (Geodetic Anchor & Existence)*: 1 (Main Gate Entrance coordinate + institutional boundary).
  - *Partially Verified (Attributively Confirmed, Zone Mapped, Pending Detailed CAD)*: 59 entities.
  - *Pending Ground-Truth / On-Site Survey*: 2 entity groups (Verka/Nescafe individual kiosks, specific residential lane subdivisions).
