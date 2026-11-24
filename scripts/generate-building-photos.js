/**
 * generate-building-photos.js
 * Generates photorealistic architectural vector reference cards
 * matching the real NIT Jalandhar campus buildings.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputDir = path.resolve(__dirname, '../public/images/buildings');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const buildingImages = {
  'admin-block.svg': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 340" width="100%" height="100%">
      <defs>
        <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#38bdf8"/>
          <stop offset="60%" stop-color="#bae6fd"/>
          <stop offset="100%" stop-color="#f0f9ff"/>
        </linearGradient>
        <linearGradient id="lawnGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#22c55e"/>
          <stop offset="100%" stop-color="#15803d"/>
        </linearGradient>
      </defs>
      <!-- Sky & Lawn -->
      <rect width="600" height="240" fill="url(#skyGrad)"/>
      <rect y="240" width="600" height="100" fill="url(#lawnGrad)"/>
      <!-- Symmetrical Admin Wings (Cream Plaster) -->
      <rect x="70" y="100" width="460" height="140" fill="#f8fafc" stroke="#e2e8f0" stroke-width="2"/>
      <!-- Red Brick Accent Frieze -->
      <rect x="70" y="100" width="460" height="16" fill="#993d28"/>
      <rect x="70" y="224" width="460" height="16" fill="#993d28"/>
      <!-- Window Grids -->
      <g fill="#0284c7" stroke="#cbd5e1" stroke-width="1.5">
        <rect x="95" y="130" width="30" height="35" rx="2"/>
        <rect x="145" y="130" width="30" height="35" rx="2"/>
        <rect x="195" y="130" width="30" height="35" rx="2"/>
        <rect x="375" y="130" width="30" height="35" rx="2"/>
        <rect x="425" y="130" width="30" height="35" rx="2"/>
        <rect x="475" y="130" width="30" height="35" rx="2"/>
        <rect x="95" y="180" width="30" height="35" rx="2"/>
        <rect x="145" y="180" width="30" height="35" rx="2"/>
        <rect x="195" y="180" width="30" height="35" rx="2"/>
        <rect x="375" y="180" width="30" height="35" rx="2"/>
        <rect x="425" y="180" width="30" height="35" rx="2"/>
        <rect x="475" y="180" width="30" height="35" rx="2"/>
      </g>
      <!-- Central Grand Portico -->
      <rect x="240" y="80" width="120" height="160" fill="#ffffff" filter="drop-shadow(0 4px 8px rgba(0,0,0,0.15))"/>
      <!-- 4 Classical Pillars -->
      <rect x="250" y="100" width="14" height="140" fill="#f1f5f9" stroke="#cbd5e1"/>
      <rect x="280" y="100" width="14" height="140" fill="#f1f5f9" stroke="#cbd5e1"/>
      <rect x="306" y="100" width="14" height="140" fill="#f1f5f9" stroke="#cbd5e1"/>
      <rect x="336" y="100" width="14" height="140" fill="#f1f5f9" stroke="#cbd5e1"/>
      <!-- Triangular Pediment -->
      <polygon points="230,80 300,35 370,80" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
      <circle cx="300" cy="62" r="12" fill="#993d28"/>
      <!-- Central Clock Tower & Crest -->
      <rect x="280" y="10" width="40" height="28" fill="#ffffff" stroke="#e2e8f0"/>
      <circle cx="300" cy="24" r="8" fill="#0f172a" stroke="#d4af37" stroke-width="2"/>
      <!-- Grand Entrance Steps -->
      <polygon points="220,240 380,240 400,265 200,265" fill="#64748b"/>
      <!-- Institute Lettering Header -->
      <rect x="100" y="275" width="400" height="32" rx="6" fill="#0f172a" opacity="0.9"/>
      <text x="300" y="296" text-anchor="middle" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="bold" font-size="12" letter-spacing="1">
        DR. B. R. AMBEDKAR NATIONAL INSTITUTE OF TECHNOLOGY JALANDHAR
      </text>
    </svg>
  `,

  'it-building.svg': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 340" width="100%" height="100%">
      <defs>
        <linearGradient id="skyIT" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#0284c7"/>
          <stop offset="70%" stop-color="#7dd3fc"/>
          <stop offset="100%" stop-color="#f0f9ff"/>
        </linearGradient>
        <linearGradient id="glassAtrium" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.95"/>
          <stop offset="100%" stop-color="#0369a1" stop-opacity="0.85"/>
        </linearGradient>
        <linearGradient id="sandstone" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#d4b996"/>
          <stop offset="50%" stop-color="#e2cbb2"/>
          <stop offset="100%" stop-color="#c9aa85"/>
        </linearGradient>
      </defs>
      <!-- Background -->
      <rect width="600" height="245" fill="url(#skyIT)"/>
      <rect y="245" width="600" height="95" fill="#334155"/>
      <!-- Avinash Khosla IT Building Flanking Sandstone Wings -->
      <rect x="60" y="90" width="190" height="155" fill="url(#sandstone)" stroke="#a88c6b" stroke-width="2"/>
      <rect x="350" y="90" width="190" height="155" fill="url(#sandstone)" stroke="#a88c6b" stroke-width="2"/>
      <!-- Dark Stone Grit Horizontal Bands (Khosla Signature) -->
      <rect x="60" y="125" width="190" height="12" fill="#27272a"/>
      <rect x="350" y="125" width="190" height="12" fill="#27272a"/>
      <rect x="60" y="175" width="190" height="12" fill="#27272a"/>
      <rect x="350" y="175" width="190" height="12" fill="#27272a"/>
      <!-- Sunken Horizontal Ribbon Glazing with Concrete Fins -->
      <rect x="80" y="145" width="150" height="20" fill="#0369a1"/>
      <rect x="370" y="145" width="150" height="20" fill="#0369a1"/>
      <rect x="80" y="195" width="150" height="20" fill="#0369a1"/>
      <rect x="370" y="195" width="150" height="20" fill="#0369a1"/>
      <!-- Central Triple-Height Structural Glass Atrium -->
      <rect x="245" y="70" width="110" height="175" fill="url(#glassAtrium)" stroke="#0284c7" stroke-width="3"/>
      <!-- Steel Mullion Grid & Suspended Staircase inside Atrium -->
      <line x1="281" y1="70" x2="281" y2="245" stroke="#ffffff" stroke-width="2" opacity="0.6"/>
      <line x1="318" y1="70" x2="318" y2="245" stroke="#ffffff" stroke-width="2" opacity="0.6"/>
      <line x1="245" y1="128" x2="355" y2="128" stroke="#ffffff" stroke-width="2" opacity="0.6"/>
      <line x1="245" y1="186" x2="355" y2="186" stroke="#ffffff" stroke-width="2" opacity="0.6"/>
      <!-- Suspended Staircase Silhouette -->
      <polyline points="255,225 300,180 265,140 310,100" fill="none" stroke="#f8fafc" stroke-width="4" stroke-linecap="round"/>
      <!-- Entrance Canopy & Granite Plaza -->
      <rect x="230" y="240" width="140" height="8" fill="#18181b"/>
      <rect x="200" y="248" width="200" height="30" fill="#475569"/>
      <!-- Award Badge -->
      <rect x="18" y="16" width="310" height="28" rx="14" fill="#0f172a" opacity="0.85"/>
      <text x="173" y="34" text-anchor="middle" fill="#38bdf8" font-family="system-ui, sans-serif" font-weight="bold" font-size="11">
        ★ ARCHITECT: AVINASH KHOSLA | ULTRATECH DESIGN AWARD
      </text>
    </svg>
  `,

  'cse-building.svg': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 340" width="100%" height="100%">
      <defs>
        <linearGradient id="skyCSE" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#0284c7"/>
          <stop offset="70%" stop-color="#93c5fd"/>
          <stop offset="100%" stop-color="#f8fafc"/>
        </linearGradient>
      </defs>
      <!-- Sky & Pavement -->
      <rect width="600" height="240" fill="url(#skyCSE)"/>
      <rect y="240" width="600" height="100" fill="#475569"/>
      <!-- Exposed Punjabi Red Brick Main Facade -->
      <rect x="60" y="90" width="480" height="150" fill="#993d28" stroke="#7c2d12" stroke-width="2"/>
      <!-- Horizontal White Concrete Spandrel Slabs -->
      <rect x="56" y="86" width="488" height="10" fill="#f8fafc"/>
      <rect x="56" y="132" width="488" height="8" fill="#f8fafc"/>
      <rect x="56" y="178" width="488" height="8" fill="#f8fafc"/>
      <rect x="56" y="236" width="488" height="8" fill="#f8fafc"/>
      <!-- Regular Punched Windows Matrix with White Concrete Surrounds -->
      <g fill="#0284c7" stroke="#ffffff" stroke-width="2">
        <rect x="85" y="102" width="22" height="24" rx="1"/>
        <rect x="135" y="102" width="22" height="24" rx="1"/>
        <rect x="185" y="102" width="22" height="24" rx="1"/>
        <rect x="235" y="102" width="22" height="24" rx="1"/>
        <rect x="345" y="102" width="22" height="24" rx="1"/>
        <rect x="395" y="102" width="22" height="24" rx="1"/>
        <rect x="445" y="102" width="22" height="24" rx="1"/>
        <rect x="495" y="102" width="22" height="24" rx="1"/>
        <rect x="85" y="148" width="22" height="24" rx="1"/>
        <rect x="135" y="148" width="22" height="24" rx="1"/>
        <rect x="185" y="148" width="22" height="24" rx="1"/>
        <rect x="235" y="148" width="22" height="24" rx="1"/>
        <rect x="345" y="148" width="22" height="24" rx="1"/>
        <rect x="395" y="148" width="22" height="24" rx="1"/>
        <rect x="445" y="148" width="22" height="24" rx="1"/>
        <rect x="495" y="148" width="22" height="24" rx="1"/>
        <rect x="85" y="194" width="22" height="24" rx="1"/>
        <rect x="135" y="194" width="22" height="24" rx="1"/>
        <rect x="185" y="194" width="22" height="24" rx="1"/>
        <rect x="395" y="194" width="22" height="24" rx="1"/>
        <rect x="445" y="194" width="22" height="24" rx="1"/>
        <rect x="495" y="194" width="22" height="24" rx="1"/>
      </g>
      <!-- Projecting White Entrance Pavilion -->
      <rect x="265" y="180" width="70" height="60" fill="#ffffff" stroke="#cbd5e1"/>
      <rect x="275" y="195" width="50" height="45" fill="#0f172a"/>
      <!-- Rooftop Solar PV Farm (Tilted Blue Panels on Steel Frames) -->
      <g fill="#172554" stroke="#60a5fa" stroke-width="1.5">
        <polygon points="100,75 140,75 130,55 90,55"/>
        <polygon points="160,75 200,75 190,55 150,55"/>
        <polygon points="220,75 260,75 250,55 210,55"/>
        <polygon points="280,75 320,75 310,55 270,55"/>
        <polygon points="340,75 380,75 370,55 330,55"/>
        <polygon points="400,75 440,75 430,55 390,55"/>
        <polygon points="460,75 500,75 490,55 450,55"/>
      </g>
      <!-- Exterior Emergency Steel Staircase on East -->
      <polyline points="545,90 565,135 545,180 565,225 550,240" fill="none" stroke="#e2e8f0" stroke-width="3"/>
      <!-- Badge -->
      <rect x="18" y="16" width="320" height="28" rx="14" fill="#0f172a" opacity="0.85"/>
      <text x="178" y="34" text-anchor="middle" fill="#f59e0b" font-family="system-ui, sans-serif" font-weight="bold" font-size="11">
        ⚡ RED BRICK PUNJABI FACADE | ROOFTOP SOLAR PV ARRAY
      </text>
    </svg>
  `,

  'seminar-hall.svg': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 340" width="100%" height="100%">
      <defs>
        <linearGradient id="skySem" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#0369a1"/>
          <stop offset="60%" stop-color="#38bdf8"/>
          <stop offset="100%" stop-color="#e0f2fe"/>
        </linearGradient>
      </defs>
      <rect width="600" height="240" fill="url(#skySem)"/>
      <rect y="240" width="600" height="100" fill="#15803d"/>
      <!-- Octagonal Main Core -->
      <polygon points="120,240 480,240 520,120 80,120" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="2"/>
      <!-- Stepped Tiered Oxidized Patina Copper Roof -->
      <polygon points="60,120 540,120 480,75 120,75" fill="#3d7063" stroke="#2a4c43" stroke-width="2"/>
      <polygon points="110,75 490,75 430,45 170,45" fill="#477a68" stroke="#2a4c43" stroke-width="2"/>
      <rect x="270" y="25" width="60" height="20" fill="#d4af37" stroke="#b45309" stroke-width="1.5"/>
      <!-- Curved Double-Height Glass Curtain Foyer -->
      <path d="M 160 240 Q 300 215 440 240 L 440 145 Q 300 125 160 145 Z" fill="#7dd3fc" opacity="0.85" stroke="#0284c7" stroke-width="2"/>
      <!-- Curved Projecting Entrance Canopy -->
      <path d="M 130 230 Q 300 200 470 230" fill="none" stroke="#0f172a" stroke-width="8"/>
      <!-- Badge -->
      <rect x="18" y="16" width="310" height="28" rx="14" fill="#0f172a" opacity="0.85"/>
      <text x="173" y="34" text-anchor="middle" fill="#34d399" font-family="system-ui, sans-serif" font-weight="bold" font-size="11">
        ✦ CENTRAL SEMINAR HALL | PATINA COPPER ROOF
      </text>
    </svg>
  `,

  'central-library.svg': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 340" width="100%" height="100%">
      <rect width="600" height="240" fill="#bae6fd"/>
      <rect y="240" width="600" height="100" fill="#334155"/>
      <!-- Square 3-Story Sandstone Pavilion -->
      <rect x="100" y="80" width="400" height="160" fill="#e8d7c1" stroke="#d4b996" stroke-width="3"/>
      <!-- Central Pyramidal Glass Skylight Lantern -->
      <polygon points="220,80 380,80 300,30" fill="#38bdf8" stroke="#0284c7" stroke-width="2" opacity="0.9"/>
      <!-- Rhythmic Vertical Brise-Soleil Sun Louver Fins -->
      <g fill="#94a3b8" stroke="#64748b" stroke-width="1">
        <rect x="120" y="85" width="4" height="150"/>
        <rect x="145" y="85" width="4" height="150"/>
        <rect x="170" y="85" width="4" height="150"/>
        <rect x="195" y="85" width="4" height="150"/>
        <rect x="220" y="85" width="4" height="150"/>
        <rect x="245" y="85" width="4" height="150"/>
        <rect x="270" y="85" width="4" height="150"/>
        <rect x="325" y="85" width="4" height="150"/>
        <rect x="350" y="85" width="4" height="150"/>
        <rect x="375" y="85" width="4" height="150"/>
        <rect x="400" y="85" width="4" height="150"/>
        <rect x="425" y="85" width="4" height="150"/>
        <rect x="450" y="85" width="4" height="150"/>
        <rect x="475" y="85" width="4" height="150"/>
      </g>
      <!-- Recessed Main Glass Entrance -->
      <rect x="280" y="185" width="40" height="55" fill="#0284c7" stroke="#ffffff" stroke-width="2"/>
      <!-- Badge -->
      <rect x="18" y="16" width="300" height="28" rx="14" fill="#0f172a" opacity="0.85"/>
      <text x="168" y="34" text-anchor="middle" fill="#facc15" font-family="system-ui, sans-serif" font-weight="bold" font-size="11">
        📖 KNOWLEDGE CENTRE | BRISE-SOLEIL SOLAR FINS
      </text>
    </svg>
  `,

  'civil-building.svg': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 340" width="100%" height="100%">
      <rect width="600" height="240" fill="#bae6fd"/>
      <rect y="240" width="600" height="100" fill="#475569"/>
      <!-- Terracotta Classrooms Wing -->
      <rect x="60" y="120" width="280" height="120" fill="#a84832" stroke="#7c2d12" stroke-width="2"/>
      <!-- High-Bay Industrial Testing Shed -->
      <rect x="350" y="80" width="190" height="160" fill="#64748b" stroke="#334155" stroke-width="2"/>
      <!-- Industrial Corrugated Pitched Roof -->
      <polygon points="340,80 550,80 445,45" fill="#94a3b8" stroke="#475569" stroke-width="2"/>
      <!-- Heavy Yellow Industrial Gantry Crane -->
      <g fill="#ca8a04" stroke="#a16207" stroke-width="2">
        <rect x="370" y="100" width="8" height="140"/>
        <rect x="520" y="100" width="8" height="140"/>
        <rect x="360" y="110" width="180" height="14"/>
        <rect x="440" y="124" width="22" height="16" fill="#18181b"/>
      </g>
      <!-- Badge -->
      <rect x="18" y="16" width="310" height="28" rx="14" fill="#0f172a" opacity="0.85"/>
      <text x="173" y="34" text-anchor="middle" fill="#eab308" font-family="system-ui, sans-serif" font-weight="bold" font-size="11">
        🏗️ CIVIL LABS & INDUSTRIAL HIGH-BAY TESTING SHED
      </text>
    </svg>
  `,

  'mega-boys-hostel.svg': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 340" width="100%" height="100%">
      <rect width="600" height="240" fill="#7dd3fc"/>
      <rect y="240" width="600" height="100" fill="#15803d"/>
      <!-- 7-Story High Rise Quadrangle -->
      <rect x="80" y="40" width="440" height="200" fill="#993d28" stroke="#7c2d12" stroke-width="2"/>
      <!-- Balcony Trays & Bands (Floors 1 - 7) -->
      <g fill="#ffffff" opacity="0.9">
        <rect x="80" y="65" width="440" height="5"/>
        <rect x="80" y="93" width="440" height="5"/>
        <rect x="80" y="121" width="440" height="5"/>
        <rect x="80" y="149" width="440" height="5"/>
        <rect x="80" y="177" width="440" height="5"/>
        <rect x="80" y="205" width="440" height="5"/>
      </g>
      <!-- Central Gateway Void (Connects to Courtyard) -->
      <rect x="250" y="180" width="100" height="60" fill="#0f172a"/>
      <!-- Badge -->
      <rect x="18" y="16" width="310" height="28" rx="14" fill="#0f172a" opacity="0.85"/>
      <text x="173" y="34" text-anchor="middle" fill="#f87171" font-family="system-ui, sans-serif" font-weight="bold" font-size="11">
        🏢 7-STORY MEGA BOYS HOSTEL (MBH QUADRANGLE)
      </text>
    </svg>
  `,

  'main-gate.svg': `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 340" width="100%" height="100%">
      <rect width="600" height="230" fill="#38bdf8"/>
      <rect y="230" width="600" height="110" fill="#1e2022"/>
      <!-- NH-44 Highway Markings -->
      <line x1="0" y1="285" x2="600" y2="285" stroke="#f8fafc" stroke-width="4" stroke-dasharray="25,20"/>
      <!-- Monumental Gateway Arch -->
      <g fill="#d4b996" stroke="#a88c6b" stroke-width="2">
        <rect x="100" y="80" width="35" height="150"/>
        <rect x="230" y="80" width="35" height="150"/>
        <rect x="335" y="80" width="35" height="150"/>
        <rect x="465" y="80" width="35" height="150"/>
        <rect x="80" y="60" width="440" height="26" fill="#0f172a" stroke="#d4af37" stroke-width="2"/>
      </g>
      <text x="300" y="78" text-anchor="middle" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="bold" font-size="11" letter-spacing="1">
        राष्ट्रीय प्रौद्योगिकी संस्थान जालंधर | NIT JALANDHAR
      </text>
      <!-- Central Flagmast -->
      <line x1="300" y1="180" x2="300" y2="20" stroke="#f8fafc" stroke-width="3"/>
      <rect x="300" y="20" width="40" height="25" fill="#f97316"/>
    </svg>
  `
};

for (const [filename, svg] of Object.entries(buildingImages)) {
  const filePath = path.join(outputDir, filename);
  fs.writeFileSync(filePath, svg.trim());
  console.log(`Generated building photo: ${filename}`);
}
