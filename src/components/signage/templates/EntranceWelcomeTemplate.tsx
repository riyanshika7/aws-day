import React from 'react';
import type { Signboard } from '../../../types/signage';
import { DirectionalArrow } from '../DirectionalArrow';
import { MapPin, Calendar, Compass, ShieldCheck } from 'lucide-react';

interface TemplateProps {
  signboard: Signboard;
  qrDataUrl: string;
}

export const EntranceWelcomeTemplate: React.FC<TemplateProps> = ({
  signboard,
  qrDataUrl,
}) => {
  return (
    <div className="relative w-full aspect-[2/1] min-h-[340px] max-w-4xl bg-gradient-to-br from-[#131921] via-[#232f3e] to-[#0f172a] text-white p-6 sm:p-8 rounded-2xl shadow-2xl flex flex-col justify-between border-4 border-amber-500 overflow-hidden font-sans select-none">
      {/* Weatherproof Grommet Eyelet Simulation */}
      <div className="absolute top-3 left-3 w-4 h-4 rounded-full border-2 border-slate-400 bg-slate-800 shadow-inner" title="Grommet Eyelet" />
      <div className="absolute top-3 right-3 w-4 h-4 rounded-full border-2 border-slate-400 bg-slate-800 shadow-inner" title="Grommet Eyelet" />
      <div className="absolute bottom-3 left-3 w-4 h-4 rounded-full border-2 border-slate-400 bg-slate-800 shadow-inner" title="Grommet Eyelet" />
      <div className="absolute bottom-3 right-3 w-4 h-4 rounded-full border-2 border-slate-400 bg-slate-800 shadow-inner" title="Grommet Eyelet" />

      {/* Top Banner Header */}
      <div className="flex items-center justify-between border-b border-slate-700/80 pb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center shadow-lg font-black text-slate-950 text-xl tracking-tighter">
            AWS
          </div>
          <div>
            <div className="text-xs uppercase tracking-widest text-amber-400 font-extrabold flex items-center gap-1.5">
              <span>Student Community Day 2027</span>
              <span>•</span>
              <span className="text-white/80">NIT Jalandhar</span>
            </div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight leading-none mt-1">
              WELCOME BUILDERS & INNOVATORS
            </h1>
          </div>
        </div>

        <div className="text-right hidden sm:block">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
            <Calendar className="w-3.5 h-3.5" /> Feb 27, 2027
          </span>
          <div className="text-[11px] text-slate-400 mt-1 flex items-center justify-end gap-1">
            <MapPin className="w-3 h-3 text-amber-500" />
            <span>NIT Jalandhar Main Campus</span>
          </div>
        </div>
      </div>

      {/* Middle Directional & Destination Section */}
      <div className="my-auto py-4 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex-1 space-y-2 text-center md:text-left">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center justify-center md:justify-start gap-1">
            <Compass className="w-4 h-4 text-amber-400" /> Main Keynote Venue Direction
          </span>
          <div className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            {signboard.destinationName}
          </div>
          <div className="text-sm sm:text-base font-medium text-amber-400 flex items-center justify-center md:justify-start gap-3">
            {signboard.distanceMeters !== null && (
              <span className="bg-slate-800/80 px-3 py-1 rounded-lg border border-slate-700">
                {signboard.distanceMeters} Meters Ahead
              </span>
            )}
            {signboard.estimatedWalkingMinutes !== null && (
              <span className="bg-slate-800/80 px-3 py-1 rounded-lg border border-slate-700">
                ~{signboard.estimatedWalkingMinutes} Min Walk
              </span>
            )}
          </div>
        </div>

        {/* Big Directional Arrow */}
        <div className="flex items-center justify-center p-4 bg-slate-800/70 rounded-2xl border-2 border-amber-500/50 shadow-inner">
          <DirectionalArrow direction={signboard.arrowDirection} size="giant" variant="orange" />
        </div>

        {/* QR Code Container */}
        <div className="bg-white p-3 rounded-2xl shadow-xl flex flex-col items-center justify-center text-center">
          {qrDataUrl ? (
            <img src={qrDataUrl} alt="Scan for Live Navigation" className="w-28 h-28 sm:w-32 sm:h-32 object-contain" />
          ) : (
            <div className="w-28 h-28 bg-slate-100 flex items-center justify-center text-xs text-slate-400">Loading QR...</div>
          )}
          <span className="text-[10px] font-extrabold text-slate-900 tracking-wider uppercase mt-1">
            Scan for Live Map
          </span>
          <span className="text-[9px] text-slate-500">
            No Account Needed
          </span>
        </div>
      </div>

      {/* Footer bar */}
      <div className="border-t border-slate-700/80 pt-3 flex flex-wrap items-center justify-between text-[11px] text-slate-400">
        <div className="flex items-center space-x-2">
          <span className="font-mono text-amber-400 font-bold">{signboard.id}</span>
          <span>•</span>
          <span>Location: {signboard.locationDescription}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-slate-300 font-semibold">{signboard.material || 'Heavy Vinyl Banner'}</span>
          <span>•</span>
          <span className="flex items-center gap-1 text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" /> Verified Path
          </span>
        </div>
      </div>
    </div>
  );
};
