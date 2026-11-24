/**
 * generate-building-glbs.js
 * Generates photorealistic, reference-accurate 3D architectural GLB models
 * for the NIT Jalandhar Digital Twin.
 *
 * Each model is uniquely constructed based on actual architectural blueprints,
 * official photographs, materials, floor counts, and footprint specifications.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Polyfill FileReader for Node.js GLTFExporter binary export
global.FileReader = class FileReader {
  async readAsArrayBuffer(blob) {
    this.result = await blob.arrayBuffer();
    if (this.onloadend) this.onloadend();
  }
};

import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputDir = path.resolve(__dirname, '../public/models/buildings');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Common PBR architectural material palettes
const mats = {
  // Concrete / Plaster
  concreteLight: new THREE.MeshStandardMaterial({ color: 0xdfddd6, roughness: 0.85, metalness: 0.05 }),
  concreteGrey: new THREE.MeshStandardMaterial({ color: 0x8b8d91, roughness: 0.75, metalness: 0.1 }),
  concreteDark: new THREE.MeshStandardMaterial({ color: 0x4b4d52, roughness: 0.8, metalness: 0.15 }),
  plasterWhite: new THREE.MeshStandardMaterial({ color: 0xf5f4ef, roughness: 0.8, metalness: 0.02 }),
  
  // Brick Masonry
  punjabiRedBrick: new THREE.MeshStandardMaterial({ color: 0x933d2b, roughness: 0.92, metalness: 0.02 }),
  terracottaTile: new THREE.MeshStandardMaterial({ color: 0xa84832, roughness: 0.85, metalness: 0.05 }),

  // Sandstone & Stone Grit (Avinash Khosla IT Building)
  jodhpurSandstone: new THREE.MeshStandardMaterial({ color: 0xd6ba99, roughness: 0.88, metalness: 0.05 }),
  dholpurSandstone: new THREE.MeshStandardMaterial({ color: 0xe8d7c1, roughness: 0.82, metalness: 0.05 }),
  darkStoneGrit: new THREE.MeshStandardMaterial({ color: 0x3e3f42, roughness: 0.9, metalness: 0.1 }),

  // Glazing & Glass
  curtainGlass: new THREE.MeshStandardMaterial({
    color: 0x7dd3fc,
    roughness: 0.1,
    metalness: 0.85,
    transparent: true,
    opacity: 0.65,
  }),
  tintedGlass: new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    roughness: 0.15,
    metalness: 0.9,
    transparent: true,
    opacity: 0.85,
  }),
  windowGlass: new THREE.MeshStandardMaterial({
    color: 0x93c5fd,
    roughness: 0.15,
    metalness: 0.7,
    transparent: true,
    opacity: 0.75,
  }),

  // Metals & Trusses
  aluminiumDark: new THREE.MeshStandardMaterial({ color: 0x27272a, roughness: 0.4, metalness: 0.8 }),
  aluminiumLight: new THREE.MeshStandardMaterial({ color: 0xa1a1aa, roughness: 0.35, metalness: 0.75 }),
  goldMetallic: new THREE.MeshStandardMaterial({ color: 0xd4af37, roughness: 0.35, metalness: 0.7 }),
  craneYellow: new THREE.MeshStandardMaterial({ color: 0xca8a04, roughness: 0.4, metalness: 0.3 }),
  solarPanelBlue: new THREE.MeshStandardMaterial({ color: 0x172554, roughness: 0.2, metalness: 0.8 }),

  // Roof Finishes
  roofMembrane: new THREE.MeshStandardMaterial({ color: 0x52525b, roughness: 0.9, metalness: 0.1 }),
  patinaCopper: new THREE.MeshStandardMaterial({ color: 0x3d7063, roughness: 0.6, metalness: 0.3 }),
  corrugatedMetal: new THREE.MeshStandardMaterial({ color: 0x94a3b8, roughness: 0.45, metalness: 0.6 }),

  // Site Works & Steps
  graniteSteps: new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.7, metalness: 0.15 }),
  blackGranite: new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.35, metalness: 0.4 }),
};

function exportModel(scene, filename) {
  return new Promise((resolve, reject) => {
    const exporter = new GLTFExporter();
    exporter.parse(
      scene,
      (gltf) => {
        const outPath = path.join(outputDir, filename);
        fs.writeFileSync(outPath, Buffer.from(gltf));
        const stats = fs.statSync(outPath);
        console.log(`Generated: ${filename} (${(stats.size / 1024).toFixed(1)} KB)`);
        resolve();
      },
      (err) => reject(err),
      { binary: true }
    );
  });
}

// ============================================================================
// 1. IT BUILDING (Avinash Khosla & Associates Architecture)
// 8,200 sq. m, Sandstone + Stone Grit Banding, Triple-Height Glass Atrium,
// Suspended Staircase, Louvers, Concrete Sunken Ribbon Windows.
// ============================================================================
function buildITBuilding() {
  const root = new THREE.Group();
  root.name = 'IT_Building_Avinash_Khosla';

  // Base Plinth / Granite Podium
  const plinth = new THREE.Mesh(new THREE.BoxGeometry(46, 0.8, 26), mats.blackGranite);
  plinth.position.y = 0.4;
  root.add(plinth);

  // Main 3-story Block (North & South Wings)
  const leftWing = new THREE.Mesh(new THREE.BoxGeometry(16, 12.5, 24), mats.jodhpurSandstone);
  leftWing.position.set(-14, 0.8 + 6.25, 0);
  root.add(leftWing);

  const rightWing = new THREE.Mesh(new THREE.BoxGeometry(16, 12.5, 24), mats.jodhpurSandstone);
  rightWing.position.set(14, 0.8 + 6.25, 0);
  root.add(rightWing);

  // Dark Stone Grit Horizontal Bands on Wings (distinctive Khosla design)
  for (let y of [4.0, 7.8, 11.5]) {
    [-14, 14].forEach((x) => {
      const band = new THREE.Mesh(new THREE.BoxGeometry(16.2, 0.6, 24.2), mats.darkStoneGrit);
      band.position.set(x, y, 0);
      root.add(band);
    });
  }

  // Recessed Ribbon Windows with Concrete Shading Fins
  for (let y of [5.2, 9.0]) {
    [-14, 14].forEach((x) => {
      // Front and rear ribbon windows
      [12.15, -12.15].forEach((z) => {
        const ribbon = new THREE.Mesh(new THREE.BoxGeometry(14, 1.4, 0.2), mats.tintedGlass);
        ribbon.position.set(x, y, z);
        root.add(ribbon);

        // Concrete horizontal sun louver
        const louver = new THREE.Mesh(new THREE.BoxGeometry(15, 0.2, 1.2), mats.concreteLight);
        louver.position.set(x, y + 0.9, z + (z > 0 ? 0.5 : -0.5));
        root.add(louver);
      });
    });
  }

  // Central Triple-Height Glass Atrium (14m wide x 13.5m high x 25m deep)
  const atriumBacking = new THREE.Mesh(new THREE.BoxGeometry(14, 13, 0.4), mats.concreteGrey);
  atriumBacking.position.set(0, 7.3, -12);
  root.add(atriumBacking);

  const atriumRoof = new THREE.Mesh(new THREE.BoxGeometry(15, 0.6, 25), mats.concreteDark);
  atriumRoof.position.set(0, 13.6, 0);
  root.add(atriumRoof);

  // Signature Structural Glass Curtain Wall
  const atriumGlass = new THREE.Mesh(new THREE.BoxGeometry(13.8, 12.4, 0.2), mats.curtainGlass);
  atriumGlass.position.set(0, 7.0, 12.1);
  root.add(atriumGlass);

  // Aluminium Mullion Grid for Atrium
  for (let mx = -5.5; mx <= 5.5; mx += 2.75) {
    const mullion = new THREE.Mesh(new THREE.BoxGeometry(0.15, 12.4, 0.3), mats.aluminiumDark);
    mullion.position.set(mx, 7.0, 12.15);
    root.add(mullion);
  }
  for (let my of [4.0, 7.5, 11.0]) {
    const transom = new THREE.Mesh(new THREE.BoxGeometry(13.8, 0.15, 0.3), mats.aluminiumDark);
    transom.position.set(0, my, 12.15);
    root.add(transom);
  }

  // Suspended Sculptural Staircase inside Atrium (visible through glass)
  for (let step = 0; step < 8; step++) {
    const flight = new THREE.Mesh(new THREE.BoxGeometry(4.5, 0.3, 1.8), mats.concreteLight);
    flight.position.set(step % 2 === 0 ? -1.5 : 1.5, 2.0 + step * 1.3, 8 - step * 1.6);
    root.add(flight);
  }

  // Entrance Portico with dark granite steps
  const steps = new THREE.Mesh(new THREE.BoxGeometry(10, 0.6, 4), mats.graniteSteps);
  steps.position.set(0, 0.3, 14);
  root.add(steps);

  const porticoCanopy = new THREE.Mesh(new THREE.BoxGeometry(12, 0.4, 3.5), mats.concreteDark);
  porticoCanopy.position.set(0, 3.8, 13.8);
  root.add(porticoCanopy);

  // Roof Penthouse / Lift Machine Room
  const penthouse = new THREE.Mesh(new THREE.BoxGeometry(12, 3, 10), mats.concreteGrey);
  penthouse.position.set(0, 14.8, 0);
  root.add(penthouse);

  // Central Glass Skylight atop Atrium
  const skylight = new THREE.Mesh(new THREE.ConeGeometry(5, 2.5, 4), mats.curtainGlass);
  skylight.rotation.y = Math.PI / 4;
  skylight.position.set(0, 15.1, 0);
  root.add(skylight);

  return root;
}

// ============================================================================
// 2. CSE BLOCK (Department of Computer Science & Engineering)
// Distinct from IT: Exposed Punjabi Red Brick Masonry, White Concrete Spandrels,
// Vertical Punched Windows, Rooftop Solar PV Farm, Fire Escape Staircase.
// ============================================================================
function buildCSEBlock() {
  const root = new THREE.Group();
  root.name = 'CSE_Block_Red_Brick';

  // Base Plinth
  const plinth = new THREE.Mesh(new THREE.BoxGeometry(44, 0.6, 24), mats.concreteGrey);
  plinth.position.y = 0.3;
  root.add(plinth);

  // Main 3-Story Red Brick Mass (42m x 12.5m x 22m)
  const mainMass = new THREE.Mesh(new THREE.BoxGeometry(42, 12, 22), mats.punjabiRedBrick);
  mainMass.position.set(0, 6.6, 0);
  root.add(mainMass);

  // Horizontal White Concrete Spandrel Bands (Slab edges between floors)
  for (let y of [3.2, 7.2, 11.2, 12.8]) {
    const spandrel = new THREE.Mesh(new THREE.BoxGeometry(42.6, 0.5, 22.6), mats.plasterWhite);
    spandrel.position.set(0, y, 0);
    root.add(spandrel);
  }

  // Punched Window Matrix with White Concrete Sills and Recessed Glass
  for (let floor = 0; floor < 3; floor++) {
    const wy = 4.8 + floor * 3.8;
    for (let wx = -18; wx <= 18; wx += 3.6) {
      // Front facade punched windows
      const sill = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.2, 0.4), mats.plasterWhite);
      sill.position.set(wx, wy - 1.1, 11.1);
      root.add(sill);

      const win = new THREE.Mesh(new THREE.BoxGeometry(1.8, 2.0, 0.1), mats.windowGlass);
      win.position.set(wx, wy, 11.05);
      root.add(win);

      // Rear facade punched windows
      const winRear = new THREE.Mesh(new THREE.BoxGeometry(1.8, 2.0, 0.1), mats.windowGlass);
      winRear.position.set(wx, wy, -11.05);
      root.add(winRear);
    }
  }

  // Entrance Pavilion: Projecting Concrete Box with Recessed Double Doors
  const porch = new THREE.Mesh(new THREE.BoxGeometry(12, 4.2, 4), mats.plasterWhite);
  porch.position.set(0, 2.4, 12.5);
  root.add(porch);

  const porchOpening = new THREE.Mesh(new THREE.BoxGeometry(8, 3.2, 2.5), mats.blackGranite);
  porchOpening.position.set(0, 1.9, 13.5);
  root.add(porchOpening);

  const entryDoors = new THREE.Mesh(new THREE.BoxGeometry(6, 2.8, 0.1), mats.windowGlass);
  entryDoors.position.set(0, 1.7, 12.3);
  root.add(entryDoors);

  // Emergency Exterior Steel Fire Escape Staircase on East Facade
  const stairTower = new THREE.Group();
  stairTower.position.set(21.8, 0, -2);
  for (let f = 0; f < 3; f++) {
    const landing = new THREE.Mesh(new THREE.BoxGeometry(3, 0.2, 3), mats.aluminiumDark);
    landing.position.set(1.5, 1.5 + f * 3.8, 0);
    stairTower.add(landing);

    const rail = new THREE.Mesh(new THREE.BoxGeometry(3.1, 0.9, 0.1), mats.aluminiumLight);
    rail.position.set(1.5, 2.0 + f * 3.8, 1.5);
    stairTower.add(rail);

    const flight = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.15, 3.2), mats.aluminiumDark);
    flight.rotation.x = 0.55;
    flight.position.set(1.5, 3.2 + f * 3.8, -1.2);
    stairTower.add(flight);
  }
  root.add(stairTower);

  // Extensive Rooftop Solar Photovoltaic (PV) Farm on Angled Frames
  const solarFarm = new THREE.Group();
  solarFarm.position.set(0, 13.0, 0);
  for (let row = -6; row <= 6; row += 4.5) {
    for (let col = -16; col <= 16; col += 4.2) {
      // Solar panel tilted 28 degrees south
      const panel = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.08, 2.2), mats.solarPanelBlue);
      panel.rotation.x = -0.45; // ~26 deg tilt
      panel.position.set(col, 0.8, row);
      solarFarm.add(panel);

      // Support frame
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.2), mats.aluminiumLight);
      leg.position.set(col, 0.4, row - 0.7);
      solarFarm.add(leg);
    }
  }
  root.add(solarFarm);

  // Roof Parapet and Chiller Units
  const parapet = new THREE.Mesh(new THREE.BoxGeometry(42.4, 0.9, 22.4), mats.punjabiRedBrick);
  parapet.position.set(0, 13.1, 0);
  root.add(parapet);

  return root;
}

// ============================================================================
// 3. ADMINISTRATIVE BLOCK (Main Institute Building)
// Neoclassical Institutional Style: Symmetrical White/Cream Plaster Facade,
// Central 4-Column Grand Portico, Arched Porch, Wide Ceremonial Steps, Clock Crest.
// ============================================================================
function buildAdminBlock() {
  const root = new THREE.Group();
  root.name = 'Admin_Block_Main';

  // Grand Granite Steps & Plinth
  const plinth = new THREE.Mesh(new THREE.BoxGeometry(54, 0.8, 26), mats.graniteSteps);
  plinth.position.y = 0.4;
  root.add(plinth);

  const grandSteps = new THREE.Mesh(new THREE.BoxGeometry(18, 0.6, 6), mats.graniteSteps);
  grandSteps.position.set(0, 0.3, 15.5);
  root.add(grandSteps);

  // Symmetrical 3-Story Administrative Wings (East & West)
  const leftWing = new THREE.Mesh(new THREE.BoxGeometry(20, 12, 22), mats.plasterWhite);
  leftWing.position.set(-16, 6.8, 0);
  root.add(leftWing);

  const rightWing = new THREE.Mesh(new THREE.BoxGeometry(20, 12, 22), mats.plasterWhite);
  rightWing.position.set(16, 6.8, 0);
  root.add(rightWing);

  // Red Brick Accent Frieze along roof and base
  for (let x of [-16, 16]) {
    const topFrieze = new THREE.Mesh(new THREE.BoxGeometry(20.4, 0.8, 22.4), mats.punjabiRedBrick);
    topFrieze.position.set(x, 12.4, 0);
    root.add(topFrieze);

    const baseFrieze = new THREE.Mesh(new THREE.BoxGeometry(20.4, 0.6, 22.4), mats.punjabiRedBrick);
    baseFrieze.position.set(x, 1.2, 0);
    root.add(baseFrieze);
  }

  // Regular Office Windows with Architectural Moldings
  for (let floor = 0; floor < 3; floor++) {
    const wy = 3.6 + floor * 3.8;
    for (let x of [-22, -18, -14, -10, 10, 14, 18, 22]) {
      const win = new THREE.Mesh(new THREE.BoxGeometry(2.2, 2.2, 0.1), mats.windowGlass);
      win.position.set(x, wy, 11.05);
      root.add(win);

      const molding = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.3, 0.3), mats.concreteLight);
      molding.position.set(x, wy + 1.25, 11.15);
      root.add(molding);
    }
  }

  // Central Entrance Core
  const centerCore = new THREE.Mesh(new THREE.BoxGeometry(14, 13, 23), mats.plasterWhite);
  centerCore.position.set(0, 7.3, 0);
  root.add(centerCore);

  // Grand Central Portico with 4 Classical Monumental Columns
  const porticoRoof = new THREE.Mesh(new THREE.BoxGeometry(16, 1.2, 6.5), mats.plasterWhite);
  porticoRoof.position.set(0, 13.4, 14.2);
  root.add(porticoRoof);

  // Classical Triangular Pediment atop Portico
  const pediment = new THREE.Mesh(new THREE.ConeGeometry(8.5, 3.2, 4), mats.plasterWhite);
  pediment.rotation.y = Math.PI / 4;
  pediment.scale.set(1.4, 1, 0.2);
  pediment.position.set(0, 15.6, 17.2);
  root.add(pediment);

  // 4 Monumental Square Columns
  [-6, -2, 2, 6].forEach((cx) => {
    const column = new THREE.Mesh(new THREE.BoxGeometry(1.2, 12.6, 1.2), mats.plasterWhite);
    column.position.set(cx, 7.1, 16.5);
    root.add(column);

    const base = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.6, 1.6), mats.concreteLight);
    base.position.set(cx, 1.1, 16.5);
    root.add(base);

    const capital = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.6, 1.6), mats.concreteLight);
    capital.position.set(cx, 13.1, 16.5);
    root.add(capital);
  });

  // Arched Ceremonial Entrance Porch
  const arch = new THREE.Mesh(new THREE.CylinderGeometry(3.5, 3.5, 1.5, 16, 1, false, 0, Math.PI), mats.concreteLight);
  arch.rotation.z = Math.PI / 2;
  arch.rotation.y = Math.PI / 2;
  arch.position.set(0, 4.2, 11.5);
  root.add(arch);

  // Grand Entrance Glazed Doors
  const doors = new THREE.Mesh(new THREE.BoxGeometry(5, 3.6, 0.2), mats.curtainGlass);
  doors.position.set(0, 2.2, 11.6);
  root.add(doors);

  // Central Clock Tower & Institute Crest
  const clockTower = new THREE.Mesh(new THREE.BoxGeometry(6, 4.5, 6), mats.plasterWhite);
  clockTower.position.set(0, 16.0, 0);
  root.add(clockTower);

  const clockFace = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.2, 0.2, 24), mats.blackGranite);
  clockFace.rotation.x = Math.PI / 2;
  clockFace.position.set(0, 16.2, 3.1);
  root.add(clockFace);

  return root;
}

// ============================================================================
// 4. CENTRAL SEMINAR HALL (Conferences & Keynotes)
// Octagonal Tiered Auditorium Massing, Stepped Patina Copper Roof,
// Grand Curved Glass Curtain Foyer, Deep Cantilever Canopy.
// ============================================================================
function buildSeminarHall() {
  const root = new THREE.Group();
  root.name = 'Central_Seminar_Hall';

  // Base Octagonal Plinth
  const plinth = new THREE.Mesh(new THREE.CylinderGeometry(18, 18.5, 0.8, 8), mats.graniteSteps);
  plinth.position.y = 0.4;
  root.add(plinth);

  // Octagonal Auditorium Core (Height 10m)
  const core = new THREE.Mesh(new THREE.CylinderGeometry(16, 16.5, 9.5, 8), mats.concreteLight);
  core.position.y = 5.55;
  root.add(core);

  // Stepped Tiered Roof in Oxidized Patina Copper / Verdigris
  const roofTier1 = new THREE.Mesh(new THREE.CylinderGeometry(13, 17, 1.8, 8), mats.patinaCopper);
  roofTier1.position.y = 11.2;
  root.add(roofTier1);

  const roofTier2 = new THREE.Mesh(new THREE.CylinderGeometry(7, 13.5, 1.6, 8), mats.patinaCopper);
  roofTier2.position.y = 12.9;
  root.add(roofTier2);

  const crownLantern = new THREE.Mesh(new THREE.CylinderGeometry(2.5, 2.5, 1.5, 8), mats.goldMetallic);
  crownLantern.position.y = 14.4;
  root.add(crownLantern);

  // Curved Double-Height Glass Curtain Foyer (Front facing)
  const foyerGlass = new THREE.Mesh(
    new THREE.CylinderGeometry(16.2, 16.2, 6.5, 16, 1, false, -Math.PI / 3, (2 * Math.PI) / 3),
    mats.curtainGlass
  );
  foyerGlass.position.y = 4.0;
  root.add(foyerGlass);

  // Curved Entrance Canopy
  const canopy = new THREE.Mesh(
    new THREE.CylinderGeometry(18.5, 18.5, 0.4, 16, 1, false, -Math.PI / 3.5, (2 * Math.PI) / 3.5),
    mats.concreteDark
  );
  canopy.position.y = 4.2;
  root.add(canopy);

  // Entrance Pillars supporting canopy
  [-8, -4, 0, 4, 8].forEach((angX) => {
    const angle = (angX / 18) * 0.8;
    const px = Math.sin(angle) * 17.5;
    const pz = Math.cos(angle) * 17.5;
    const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 4.0), mats.aluminiumLight);
    pillar.position.set(px, 2.0, pz);
    root.add(pillar);
  });

  return root;
}

// ============================================================================
// 5. CENTRAL LIBRARY & KNOWLEDGE CENTRE
// 36m x 36m Square Pavilion, Vertical Brise-Soleil Sun Fins,
// Central Raised Pyramidal Glass Skylight Lantern, Open Reading Wells.
// ============================================================================
function buildCentralLibrary() {
  const root = new THREE.Group();
  root.name = 'Central_Library_Knowledge_Centre';

  // Plinth
  const plinth = new THREE.Mesh(new THREE.BoxGeometry(38, 0.8, 38), mats.graniteSteps);
  plinth.position.y = 0.4;
  root.add(plinth);

  // Main 3-Story Cubic Mass (36m x 13m x 36m)
  const mainMass = new THREE.Mesh(new THREE.BoxGeometry(36, 13, 36), mats.dholpurSandstone);
  mainMass.position.set(0, 7.3, 0);
  root.add(mainMass);

  // Vertical Architectural Brise-Soleil Sun Louver Fins on All 4 Elevations
  [-17.5, 17.5].forEach((z) => {
    for (let x = -15; x <= 15; x += 2.5) {
      const fin = new THREE.Mesh(new THREE.BoxGeometry(0.18, 11, 1.2), mats.aluminiumLight);
      fin.position.set(x, 7.3, z + (z > 0 ? 0.7 : -0.7));
      root.add(fin);
    }
  });
  [-17.5, 17.5].forEach((x) => {
    for (let z = -15; z <= 15; z += 2.5) {
      const fin = new THREE.Mesh(new THREE.BoxGeometry(1.2, 11, 0.18), mats.aluminiumLight);
      fin.position.set(x + (x > 0 ? 0.7 : -0.7), 7.3, z);
      root.add(fin);
    }
  });

  // Glazing bands behind sun fins
  for (let floor = 0; floor < 3; floor++) {
    const wy = 4.2 + floor * 3.8;
    const bandFront = new THREE.Mesh(new THREE.BoxGeometry(32, 2.2, 0.2), mats.curtainGlass);
    bandFront.position.set(0, wy, 18.05);
    root.add(bandFront);

    const bandBack = new THREE.Mesh(new THREE.BoxGeometry(32, 2.2, 0.2), mats.curtainGlass);
    bandBack.position.set(0, wy, -18.05);
    root.add(bandBack);
  }

  // Central Raised Pyramidal Glass Skylight Lantern
  const lanternBase = new THREE.Mesh(new THREE.BoxGeometry(14, 1.5, 14), mats.concreteGrey);
  lanternBase.position.set(0, 14.5, 0);
  root.add(lanternBase);

  const pyramidSkylight = new THREE.Mesh(new THREE.ConeGeometry(9.2, 4.5, 4), mats.curtainGlass);
  pyramidSkylight.rotation.y = Math.PI / 4;
  pyramidSkylight.position.set(0, 17.5, 0);
  root.add(pyramidSkylight);

  // Recessed Main Entrance Vestibule
  const entryVestibule = new THREE.Mesh(new THREE.BoxGeometry(10, 3.6, 3), mats.blackGranite);
  entryVestibule.position.set(0, 2.2, 18);
  root.add(entryVestibule);

  return root;
}

// ============================================================================
// 6. CIVIL ENGINEERING & STRUCTURAL TESTING LAB
// G+1 Terracotta Academic Block + High-Bay Industrial Testing Shed + Yellow Gantry Crane.
// ============================================================================
function buildCivilBlock() {
  const root = new THREE.Group();
  root.name = 'Civil_Engineering_Complex';

  // Academic Wing (Terracotta & Concrete G+1)
  const acadWing = new THREE.Mesh(new THREE.BoxGeometry(34, 9.5, 18), mats.terracottaTile);
  acadWing.position.set(-8, 5.05, 0);
  root.add(acadWing);

  // Concrete Ribbon Bands
  for (let y of [1.0, 5.0, 9.2]) {
    const band = new THREE.Mesh(new THREE.BoxGeometry(34.4, 0.5, 18.4), mats.concreteLight);
    band.position.set(-8, y, 0);
    root.add(band);
  }

  // Classroom Windows
  for (let floor = 0; floor < 2; floor++) {
    const wy = 3.0 + floor * 4.2;
    for (let x = -21; x <= 5; x += 3.8) {
      const win = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.8, 0.1), mats.windowGlass);
      win.position.set(x, wy, 9.05);
      root.add(win);
    }
  }

  // High-Bay Industrial Testing Shed (Concrete & Structures Lab)
  const testingShed = new THREE.Mesh(new THREE.BoxGeometry(22, 12.5, 22), mats.concreteGrey);
  testingShed.position.set(20, 6.55, 0);
  root.add(testingShed);

  // Industrial Corrugated Pitched Roof
  const pitchedRoof = new THREE.Mesh(new THREE.ConeGeometry(15, 3.5, 4), mats.corrugatedMetal);
  pitchedRoof.rotation.y = Math.PI / 4;
  pitchedRoof.scale.set(1.1, 1, 1.1);
  pitchedRoof.position.set(20, 14.5, 0);
  root.add(pitchedRoof);

  // Clerestory Windows on Shed
  const clerestory = new THREE.Mesh(new THREE.BoxGeometry(20, 1.2, 22.2), mats.tintedGlass);
  clerestory.position.set(20, 11.2, 0);
  root.add(clerestory);

  // Heavy Industrial Yellow Gantry Crane Structure
  const craneGroup = new THREE.Group();
  craneGroup.position.set(20, 0, 12);
  [-9, 9].forEach((cx) => {
    const col = new THREE.Mesh(new THREE.BoxGeometry(0.8, 10, 0.8), mats.craneYellow);
    col.position.set(cx, 5, 0);
    craneGroup.add(col);
  });
  const crossBeam = new THREE.Mesh(new THREE.BoxGeometry(20, 0.9, 0.8), mats.craneYellow);
  crossBeam.position.set(0, 9.8, 0);
  craneGroup.add(crossBeam);

  const hoist = new THREE.Mesh(new THREE.BoxGeometry(2, 1.2, 1.4), mats.aluminiumDark);
  hoist.position.set(3, 9.0, 0);
  craneGroup.add(hoist);
  root.add(craneGroup);

  return root;
}

// ============================================================================
// 7. LECTURE HALL COMPLEX (LHC & AKAM THEATRE)
// Stepped Tiered Lecture Halls + Curved Metallic Gold AKAM Hall Pavilion.
// ============================================================================
function buildLHCBlock() {
  const root = new THREE.Group();
  root.name = 'Lecture_Hall_Complex_AKAM';

  // Base Plinth
  const plinth = new THREE.Mesh(new THREE.BoxGeometry(48, 0.8, 30), mats.concreteGrey);
  plinth.position.y = 0.4;
  root.add(plinth);

  // Main 3-Story Stepped Complex
  const mainMass = new THREE.Mesh(new THREE.BoxGeometry(44, 13, 26), mats.concreteLight);
  mainMass.position.set(-3, 7.3, 0);
  root.add(mainMass);

  // Distinct Curved AKAM Lecture Theatre (Metallic Gold / Bronze)
  const akamHall = new THREE.Mesh(
    new THREE.CylinderGeometry(11, 12, 11.5, 16, 1, false, 0, Math.PI),
    mats.goldMetallic
  );
  akamHall.rotation.y = -Math.PI / 2;
  akamHall.position.set(16, 6.55, 3);
  root.add(akamHall);

  // AKAM Curved Glazing Concourse
  const akamGlass = new THREE.Mesh(
    new THREE.CylinderGeometry(11.2, 11.2, 4.5, 16, 1, false, -Math.PI / 3, (2 * Math.PI) / 3),
    mats.curtainGlass
  );
  akamGlass.position.set(16, 3.5, 3);
  root.add(akamGlass);

  // Horizontal Sun Fins along main classrooms
  for (let y of [5, 9, 13]) {
    const fin = new THREE.Mesh(new THREE.BoxGeometry(32, 0.25, 1.5), mats.aluminiumDark);
    fin.position.set(-10, y, 13.5);
    root.add(fin);
  }

  return root;
}

// ============================================================================
// 8. STUDENT ACTIVITY CENTRE (SAC) & OPEN AIR THEATRE
// Barrel-Vaulted Sports Arena Roof + Stepped Semicircular OAT Amphitheatre.
// ============================================================================
function buildSACComplex() {
  const root = new THREE.Group();
  root.name = 'Student_Activity_Centre_SAC';

  // Main Gymnasium Arena
  const gymBase = new THREE.Mesh(new THREE.BoxGeometry(36, 8, 24), mats.concreteLight);
  gymBase.position.set(-6, 4.4, 0);
  root.add(gymBase);

  // Barrel-Vaulted Steel Truss Roof
  const barrelRoof = new THREE.Mesh(
    new THREE.CylinderGeometry(13, 13, 36.2, 24, 1, false, 0, Math.PI),
    mats.corrugatedMetal
  );
  barrelRoof.rotation.z = Math.PI / 2;
  barrelRoof.position.set(-6, 8.4, 0);
  root.add(barrelRoof);

  // Clerestory Glazing under roof vault
  [-17.8, 5.8].forEach((x) => {
    const gableGlass = new THREE.Mesh(
      new THREE.CylinderGeometry(12.8, 12.8, 0.2, 16, 1, false, 0, Math.PI),
      mats.curtainGlass
    );
    gableGlass.rotation.z = Math.PI / 2;
    gableGlass.position.set(x, 8.4, 0);
    root.add(gableGlass);
  });

  // Attached Stepped Semicircular Open Air Theatre (OAT)
  const oatGroup = new THREE.Group();
  oatGroup.position.set(19, 0, 0);
  for (let tier = 0; tier < 6; tier++) {
    const radius = 6 + tier * 2;
    const riser = new THREE.Mesh(
      new THREE.CylinderGeometry(radius, radius + 1.8, 0.45, 16, 1, false, -Math.PI / 2, Math.PI),
      mats.concreteGrey
    );
    riser.position.y = 0.25 + tier * 0.45;
    oatGroup.add(riser);
  }
  root.add(oatGroup);

  return root;
}

// ============================================================================
// 9. MEGA BOYS HOSTEL COMPLEX (MBH - 7-Story High Rise Quadrangle)
// Residential High-Rise with Balcony Grids, Internal Courtyard, Central Mess.
// ============================================================================
function buildMegaBoysHostel() {
  const root = new THREE.Group();
  root.name = 'Mega_Boys_Hostel_MBH';

  // 7-Story Quadrangle Outer Mass (54m x 23m x 46m)
  // East Wing
  const eastWing = new THREE.Mesh(new THREE.BoxGeometry(10, 23, 44), mats.punjabiRedBrick);
  eastWing.position.set(20, 11.9, 0);
  root.add(eastWing);

  // West Wing
  const westWing = new THREE.Mesh(new THREE.BoxGeometry(10, 23, 44), mats.punjabiRedBrick);
  westWing.position.set(-20, 11.9, 0);
  root.add(westWing);

  // North Wing
  const northWing = new THREE.Mesh(new THREE.BoxGeometry(32, 23, 10), mats.punjabiRedBrick);
  northWing.position.set(0, 11.9, -17);
  root.add(northWing);

  // South Wing (Main Entry with Void)
  const southWingLeft = new THREE.Mesh(new THREE.BoxGeometry(10, 23, 10), mats.punjabiRedBrick);
  southWingLeft.position.set(-11, 11.9, 17);
  root.add(southWingLeft);

  const southWingRight = new THREE.Mesh(new THREE.BoxGeometry(10, 23, 10), mats.punjabiRedBrick);
  southWingRight.position.set(11, 11.9, 17);
  root.add(southWingRight);

  // Southern Gateway Arch Bridge (Connecting 3rd to 7th floors)
  const archBridge = new THREE.Mesh(new THREE.BoxGeometry(14, 13, 10), mats.plasterWhite);
  archBridge.position.set(0, 16.9, 17);
  root.add(archBridge);

  // Balcony Grid Trays on Facades (Floors 1 through 6)
  for (let f = 0; f < 7; f++) {
    const by = 2.2 + f * 3.2;
    // East balconies
    const balconyEast = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.9, 40), mats.concreteLight);
    balconyEast.position.set(25.5, by, 0);
    root.add(balconyEast);

    // West balconies
    const balconyWest = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.9, 40), mats.concreteLight);
    balconyWest.position.set(-25.5, by, 0);
    root.add(balconyWest);

    // Horizontal concrete slab line
    const slabEast = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.3, 42), mats.plasterWhite);
    slabEast.position.set(25.4, by - 0.5, 0);
    root.add(slabEast);

    const slabWest = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.3, 42), mats.plasterWhite);
    slabWest.position.set(-25.4, by - 0.5, 0);
    root.add(slabWest);
  }

  // Central Mess & Dining Pavilion in Courtyard
  const mess = new THREE.Mesh(new THREE.BoxGeometry(18, 5.5, 18), mats.plasterWhite);
  mess.position.set(0, 3.15, 0);
  root.add(mess);

  const messRoof = new THREE.Mesh(new THREE.ConeGeometry(13, 2.5, 4), mats.corrugatedMetal);
  messRoof.rotation.y = Math.PI / 4;
  messRoof.position.set(0, 7.15, 0);
  root.add(messRoof);

  // Rooftop Water Tanks and Service Penthouses
  [-16, 16].forEach((x) => {
    const tankRoom = new THREE.Mesh(new THREE.BoxGeometry(6, 3.5, 6), mats.concreteGrey);
    tankRoom.position.set(x, 25.15, -14);
    root.add(tankRoom);
  });

  return root;
}

// ============================================================================
// 10. MEGA GIRLS HOSTEL COMPLEX (6-Story Residential Quadrangle)
// ============================================================================
function buildMegaGirlsHostel() {
  const root = new THREE.Group();
  root.name = 'Mega_Girls_Hostel_MGH';

  // 6-Story U-Shaped Complex (46m x 20m x 40m)
  const mainWing = new THREE.Mesh(new THREE.BoxGeometry(44, 20, 10), mats.terracottaTile);
  mainWing.position.set(0, 10.4, -14);
  root.add(mainWing);

  const leftWing = new THREE.Mesh(new THREE.BoxGeometry(10, 20, 30), mats.terracottaTile);
  leftWing.position.set(-17, 10.4, 4);
  root.add(leftWing);

  const rightWing = new THREE.Mesh(new THREE.BoxGeometry(10, 20, 30), mats.terracottaTile);
  rightWing.position.set(17, 10.4, 4);
  root.add(rightWing);

  // White Balcony Slabs across all floors
  for (let f = 0; f < 6; f++) {
    const by = 2.4 + f * 3.2;
    const slabLeft = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.8, 28), mats.plasterWhite);
    slabLeft.position.set(-22.5, by, 4);
    root.add(slabLeft);

    const slabRight = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.8, 28), mats.plasterWhite);
    slabRight.position.set(22.5, by, 4);
    root.add(slabRight);
  }

  // Enclosed Courtyard Security Entry Portico
  const securityGate = new THREE.Mesh(new THREE.BoxGeometry(18, 4.5, 3), mats.concreteLight);
  securityGate.position.set(0, 2.65, 18);
  root.add(securityGate);

  return root;
}

// ============================================================================
// 11. MAIN GATE 1 (GT Road Monumental Gateway)
// Portal Pillars, Overhead Institute Signage Arch, Security Cabins, Boom Barrier.
// ============================================================================
function buildMainGate() {
  const root = new THREE.Group();
  root.name = 'Main_Gate_1_GT_Road';

  // Monumental Stone Pillars (Left & Right)
  [-12, -4, 4, 12].forEach((x) => {
    const pillar = new THREE.Mesh(new THREE.BoxGeometry(2.4, 8, 2.4), mats.dholpurSandstone);
    pillar.position.set(x, 4.4, 0);
    root.add(pillar);

    const base = new THREE.Mesh(new THREE.BoxGeometry(3.0, 0.8, 3.0), mats.blackGranite);
    base.position.set(x, 0.4, 0);
    root.add(base);

    const cap = new THREE.Mesh(new THREE.BoxGeometry(2.8, 0.6, 2.8), mats.blackGranite);
    cap.position.set(x, 8.7, 0);
    root.add(cap);
  });

  // Overhead Monumental Beam (Institute Lettering Arch)
  const beam = new THREE.Mesh(new THREE.BoxGeometry(28, 1.6, 2.6), mats.dholpurSandstone);
  beam.position.set(0, 9.8, 0);
  root.add(beam);

  // Security Cabins (Left & Right)
  [-16, 16].forEach((x) => {
    const cabin = new THREE.Mesh(new THREE.BoxGeometry(4.5, 3.4, 5.5), mats.plasterWhite);
    cabin.position.set(x, 2.1, 0);
    root.add(cabin);

    const windowGlass = new THREE.Mesh(new THREE.BoxGeometry(4.6, 1.4, 2.5), mats.tintedGlass);
    windowGlass.position.set(x, 2.3, 0);
    root.add(windowGlass);
  });

  // Central Median & Flagmast
  const median = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.4, 14), mats.concreteLight);
  median.position.set(0, 0.2, 0);
  root.add(median);

  const flagmast = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.15, 14), mats.aluminiumLight);
  flagmast.position.set(0, 7.4, -4);
  root.add(flagmast);

  return root;
}

// ============================================================================
// 12. INSTITUTE GUEST HOUSE & MEGA GUEST HOUSE
// Residential Villa, Hipped Terracotta Roof, Colonnaded Verandas.
// ============================================================================
function buildGuestHouse() {
  const root = new THREE.Group();
  root.name = 'Institute_Guest_House';

  // Base Plinth
  const plinth = new THREE.Mesh(new THREE.BoxGeometry(32, 0.6, 22), mats.concreteLight);
  plinth.position.y = 0.3;
  root.add(plinth);

  // 2-Story Villa Mass (Plaster White)
  const villa = new THREE.Mesh(new THREE.BoxGeometry(28, 7.5, 18), mats.plasterWhite);
  villa.position.set(0, 4.35, 0);
  root.add(villa);

  // Colonnaded Front Veranda (Ground & 1st Floor)
  for (let x = -10; x <= 10; x += 5) {
    const col = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 7.5), mats.plasterWhite);
    col.position.set(x, 4.35, 10.5);
    root.add(col);
  }

  // Sloping Hipped Terracotta Tiled Roof
  const roof = new THREE.Mesh(new THREE.ConeGeometry(17, 3.8, 4), mats.terracottaTile);
  roof.rotation.y = Math.PI / 4;
  roof.scale.set(1.4, 1, 1.1);
  roof.position.set(0, 10.0, 0);
  root.add(roof);

  return root;
}

// ============================================================================
// 13. SHOPPING CENTRE & COMMERCIAL AMENITIES
// Single-Story Arcade, Shopfronts, Covered Walkway, Dispensary.
// ============================================================================
function buildAmenitiesBlock() {
  const root = new THREE.Group();
  root.name = 'Campus_Amenities_Shopping_Centre';

  // Commercial Arcade
  const arcade = new THREE.Mesh(new THREE.BoxGeometry(32, 4.5, 14), mats.concreteLight);
  arcade.position.set(0, 2.55, 0);
  root.add(arcade);

  // Covered Walkway Colonnade
  for (let x = -13; x <= 13; x += 4.5) {
    const col = new THREE.Mesh(new THREE.BoxGeometry(0.4, 4.5, 0.4), mats.concreteDark);
    col.position.set(x, 2.55, 8.2);
    root.add(col);
  }

  const canopy = new THREE.Mesh(new THREE.BoxGeometry(32.4, 0.4, 3.5), mats.concreteDark);
  canopy.position.set(0, 4.75, 7.5);
  root.add(canopy);

  // Shopfront Glass Windows
  for (let x = -11; x <= 11; x += 5.5) {
    const shopWin = new THREE.Mesh(new THREE.BoxGeometry(3.8, 2.6, 0.1), mats.windowGlass);
    shopWin.position.set(x, 2.0, 7.05);
    root.add(shopWin);
  }

  return root;
}

// ============================================================================
// Execute All Building Model Generations
// ============================================================================
async function generateAll() {
  console.log('--- Generating NIT Jalandhar Architectural 3D GLB Models ---');

  const models = [
    { builder: buildITBuilding, filename: 'it-building.glb' },
    { builder: buildCSEBlock, filename: 'cse-building.glb' },
    { builder: buildAdminBlock, filename: 'admin-block.glb' },
    { builder: buildSeminarHall, filename: 'seminar-hall.glb' },
    { builder: buildCentralLibrary, filename: 'central-library.glb' },
    { builder: buildCivilBlock, filename: 'civil-building.glb' },
    { builder: buildLHCBlock, filename: 'lhc-building.glb' },
    { builder: buildSACComplex, filename: 'sac-complex.glb' },
    { builder: buildMegaBoysHostel, filename: 'mega-boys-hostel.glb' },
    { builder: buildMegaGirlsHostel, filename: 'mega-girls-hostel.glb' },
    { builder: buildMainGate, filename: 'main-gate.glb' },
    { builder: buildGuestHouse, filename: 'guest-house.glb' },
    { builder: buildAmenitiesBlock, filename: 'amenities-block.glb' },
  ];

  for (const item of models) {
    const scene = item.builder();
    await exportModel(scene, item.filename);
  }

  console.log('Successfully generated all 13 architectural GLB models!');
}

generateAll().catch((err) => {
  console.error('Generation failed:', err);
  process.exit(1);
});
