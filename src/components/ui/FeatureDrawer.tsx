import React from 'react';
import { 
  X, 
  MapPin, 
  Navigation, 
  Clock, 
  AlertCircle, 
  Building, 
  Accessibility, 
  ShieldCheck,
  Award,
  Calendar,
  Sparkles
} from 'lucide-react';
import type { CampusFeature } from '../../types/campus';

interface FeatureDrawerProps {
  feature: CampusFeature | null;
  onClose: () => void;
  onStartRoute: (feature: CampusFeature) => void;
}

// Architectural metadata mapping for photorealistic digital twin
const ARCHITECTURAL_METADATA: Record<string, {
  image: string;
  architecturalStyle: string;
  materials: string;
  awsEventRole?: string;
  award?: string;
}> = {
  'ADM-01': {
    image: '/images/buildings/admin-block.svg',
    architecturalStyle: 'Neoclassical Institutional with Central Clock Tower',
    materials: 'White & cream masonry plaster, Punjabi red-brick accent friezes, granite steps',
    awsEventRole: 'VIP Speaker Reception, Institute Welcome & Institutional Relations',
  },
  'ACA-02': {
    image: '/images/buildings/it-building.svg',
    architecturalStyle: 'High-Tech Contemporary by Avinash Khosla & Associates',
    materials: 'Jodhpur & Dholpur sandstone cladding, dark stone grit horizontal bands, triple-height structural glass curtain wall, suspended cantilevered staircase',
    awsEventRole: 'AWS Hands-on Cloud Labs, Serverless Workshops & Hackathon War-Rooms',
    award: 'UltraTech Concrete Design Award Winner (8,200 sq. m)',
  },
  'ACA-01': {
    image: '/images/buildings/cse-building.svg',
    architecturalStyle: 'Exposed Red-Brick Academic Pavilion with Solar PV Farm',
    materials: 'Deep red Punjabi brickwork, white concrete spandrel floor slabs, punched window matrix, rooftop solar PV array',
    awsEventRole: 'DevOps & AI/ML Breakout Tracks, Technical Code Labs',
  },
  'CEN-01': {
    image: '/images/buildings/seminar-hall.svg',
    architecturalStyle: 'Tiered Octagonal Auditorium with Patina Copper Roof',
    materials: 'Stepped verdigris copper roofing tiers, curved double-height glass curtain foyer, polished steel mullions',
    awsEventRole: 'Official Keynote Stage: AWS Community Day 2027 Main Track & Opening Keynotes',
  },
  'CEN-02': {
    image: '/images/buildings/central-library.svg',
    architecturalStyle: 'Square Pavilion with Vertical Brise-Soleil Sun Louvers',
    materials: 'Fair-faced concrete, architectural aluminum solar shading fins, central pyramidal skylight atrium',
    awsEventRole: 'Quiet Study, AWS Certification Prep Zone & Mentor Lounge',
  },
  'ACA-03': {
    image: '/images/buildings/civil-building.svg',
    architecturalStyle: 'Terracotta Academic Block + High-Bay Structural Shed',
    materials: 'Terracotta wall tiles, corrugated industrial steel roof, outdoor yellow heavy-duty gantry crane',
    awsEventRole: 'IoT & Smart Cities Cloud Demonstration Exhibits',
  },
  'HST-08': {
    image: '/images/buildings/mega-boys-hostel.svg',
    architecturalStyle: '7-Story High-Rise Residential Quadrangle',
    materials: 'Textured concrete, exposed red brick, modular balcony grid trays, central landscaped courtyard',
    awsEventRole: 'Student Delegate Accommodation & Night Logistics',
  },
  'ENT-01': {
    image: '/images/buildings/main-gate.svg',
    architecturalStyle: 'Monumental GT Road Gateway Portal (NH-44 Bypass)',
    materials: 'Dholpur sandstone monumental pillars, black granite plinths, institute crest beam, security cabins',
    awsEventRole: 'Main Attendee Arrival, Shuttle Drop-Off & Registration Signboard Checkpoint',
  },
};

export const FeatureDrawer: React.FC<FeatureDrawerProps> = ({
  feature,
  onClose,
  onStartRoute,
}) => {
  if (!feature) return null;

  const isVerified = feature.verification === 'verified';
  const arch = ARCHITECTURAL_METADATA[feature.id];

  return (
    <div className="absolute bottom-0 left-0 right-0 sm:left-4 sm:bottom-4 sm:right-auto sm:w-[410px] max-h-[85vh] bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-t-2xl sm:rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 z-30 flex flex-col overflow-hidden animate-slide-up">
      {/* Architectural Photo Banner */}
      {arch && (
        <div className="relative w-full h-36 bg-slate-950 overflow-hidden border-b border-slate-200 dark:border-slate-800 group">
          <img
            src={arch.image}
            alt={feature.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
          <div className="absolute top-2.5 left-3">
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-950/80 backdrop-blur-md text-amber-400 border border-amber-500/30 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Photorealistic Twin</span>
            </span>
          </div>
          <button
            onClick={onClose}
            className="absolute top-2.5 right-3 p-1.5 rounded-full bg-slate-950/70 hover:bg-slate-900 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Header bar */}
      <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-start justify-between bg-slate-50/50 dark:bg-slate-800/40">
        <div className="flex-1 pr-2">
          <div className="flex items-center space-x-2 mb-1">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">
              {feature.category}
            </span>
            <span
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                isVerified
                  ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300'
                  : 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300'
              }`}
            >
              {isVerified ? (
                <>
                  <ShieldCheck className="w-3 h-3" /> Ground Verified
                </>
              ) : (
                <>
                  <AlertCircle className="w-3 h-3" /> Zone Verified
                </>
              )}
            </span>
          </div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 leading-snug">
            {feature.name}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span>NITJ Campus Core</span>
            <span>•</span>
            <span className="font-mono text-[10px]">
              {feature.coordinates[1].toFixed(5)}° N, {feature.coordinates[0].toFixed(5)}° E
            </span>
          </p>
        </div>
        {!arch && (
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Body content */}
      <div className="p-4 overflow-y-auto space-y-3.5 text-xs text-slate-600 dark:text-slate-300">
        {/* AWS Community Day 2027 Role Banner */}
        {arch?.awsEventRole && (
          <div className="p-2.5 rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-200">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-amber-600 dark:text-amber-400 mb-0.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>AWS Student Community Day 2027</span>
            </div>
            <p className="text-[11px] font-medium leading-relaxed">{arch.awsEventRole}</p>
          </div>
        )}

        {/* Architectural Award */}
        {arch?.award && (
          <div className="p-2 rounded-lg bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 text-sky-800 dark:text-sky-300 flex items-center gap-2">
            <Award className="w-4 h-4 text-sky-500 shrink-0" />
            <span className="text-[11px] font-semibold">{arch.award}</span>
          </div>
        )}

        {/* Architectural & Structural Specifications */}
        {arch && (
          <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800 space-y-2">
            <h4 className="text-[11px] font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-blue-500" />
              <span>Architectural Specifications</span>
            </h4>
            <div className="space-y-1 text-[11px]">
              <div>
                <span className="text-slate-400 font-medium">Style: </span>
                <span className="text-slate-700 dark:text-slate-200">{arch.architecturalStyle}</span>
              </div>
              <div>
                <span className="text-slate-400 font-medium">Materials: </span>
                <span className="text-slate-700 dark:text-slate-200">{arch.materials}</span>
              </div>
            </div>
          </div>
        )}

        <div>
          <h4 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
            About Location
          </h4>
          <p className="leading-relaxed">{feature.description}</p>
        </div>

        {/* Key Attributes Grid */}
        <div className="grid grid-cols-2 gap-2 bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
          {feature.operatingHours && (
            <div className="space-y-0.5">
              <span className="text-[10px] text-slate-400 flex items-center gap-1 font-medium">
                <Clock className="w-3 h-3" /> Operating Hours
              </span>
              <p className="text-[11px] font-semibold text-slate-800 dark:text-slate-200">
                {feature.operatingHours}
              </p>
            </div>
          )}
          {feature.floors && (
            <div className="space-y-0.5">
              <span className="text-[10px] text-slate-400 flex items-center gap-1 font-medium">
                <Building className="w-3 h-3" /> Structural Floors
              </span>
              <p className="text-[11px] font-semibold text-slate-800 dark:text-slate-200">
                {feature.floors} Floors (G+{feature.floors - 1})
              </p>
            </div>
          )}
          {feature.accessibility && (
            <div className="col-span-2 space-y-0.5">
              <span className="text-[10px] text-slate-400 flex items-center gap-1 font-medium">
                <Accessibility className="w-3 h-3" /> Accessibility
              </span>
              <p className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                {feature.accessibility}
              </p>
            </div>
          )}
        </div>

        {/* Facilities list */}
        {feature.facilities && feature.facilities.length > 0 && (
          <div>
            <h4 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
              Key Facilities & Wings
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {feature.facilities.map((fac, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-md text-[11px]"
                >
                  {fac}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Source Verification Audit */}
        <div className="p-2.5 rounded-lg bg-blue-50/60 dark:bg-slate-800/80 border border-blue-100 dark:border-slate-700/60 text-[11px]">
          <span className="font-semibold text-blue-900 dark:text-blue-300 block">
            Data Source & Provenance
          </span>
          <span className="text-slate-600 dark:text-slate-400">
            {feature.source}
          </span>
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-3 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-100 dark:border-slate-800 flex items-center space-x-2">
        <button
          onClick={() => onStartRoute(feature)}
          className="flex-1 py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/25 transition-all"
        >
          <Navigation className="w-4 h-4" />
          <span>Directions to Here</span>
        </button>
      </div>
    </div>
  );
};
