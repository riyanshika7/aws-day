import React from 'react';
import type { Signboard } from '../../../types/signage';
import { DirectionalArrow } from '../DirectionalArrow';
import { Footprints, MapPin } from 'lucide-react';

interface TemplateProps {
  signboard: Signboard;
  qrDataUrl: string;
}

export const DirectionalArrowTemplate: React.FC<TemplateProps> = ({
  signboard,
  qrDataUrl,
}) => {
  return (
    <div className="relative w-full aspect-[3/2] min-h-[300px] max-w-3xl bg-[#232f3e] text-white p-6 sm:p-7 rounded-2xl shadow-2xl flex flex-col justify-between border-4 border-amber-500 overflow-hidden font-sans select-none">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b-2 border-slate-700 pb-3">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center font-black text-slate-950 text-sm">
            AWS
          </div>
          <div>
            <div className="text-[11px] font-extrabold text-amber-400 tracking-wider uppercase leading-none">
              Student Community Day 2027
            </div>
            <div className="text-[10px] text-slate-300">NIT Jalandhar Campus</div>
          </div>
        </div>
        <div className="font-mono text-xs font-bold text-slate-400 bg-slate-800 px-2.5 py-1 rounded-md">
          {signboard.id}
        </div>
      </div>

      {/* Main Core: Massive Arrow + Big Destination + Metrics */}
      <div className="my-auto py-3 flex items-center justify-between gap-4">
        {/* Massive Direction Arrow */}
        <div className="p-4 bg-slate-900 rounded-2xl border-2 border-amber-500/60 shadow-xl flex items-center justify-center min-w-[120px]">
          <DirectionalArrow direction={signboard.arrowDirection} size="giant" variant="orange" />
        </div>

        {/* Destination & Metrics */}
        <div className="flex-1 space-y-1 pl-2">
          <div className="text-xs uppercase font-extrabold text-amber-400 tracking-wider">
            Wayfinding Direction
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white leading-tight">
            {signboard.destinationName}
          </div>
          {signboard.customMessage && (
            <p className="text-xs text-slate-300 font-medium">
              {signboard.customMessage}
            </p>
          )}

          <div className="flex items-center gap-2 pt-2">
            {signboard.distanceMeters !== null && (
              <span className="bg-amber-500 text-slate-950 font-black text-xs px-2.5 py-1 rounded-lg">
                {signboard.distanceMeters} METERS
              </span>
            )}
            {signboard.estimatedWalkingMinutes !== null && (
              <span className="bg-slate-800 text-slate-200 font-semibold text-xs px-2.5 py-1 rounded-lg flex items-center gap-1 border border-slate-700">
                <Footprints className="w-3.5 h-3.5 text-amber-400" />
                ~{signboard.estimatedWalkingMinutes} min
              </span>
            )}
          </div>
        </div>

        {/* QR Code */}
        <div className="bg-white p-2 rounded-xl shadow-lg flex flex-col items-center justify-center">
          {qrDataUrl ? (
            <img src={qrDataUrl} alt="Scan for Navigation" className="w-20 h-20 sm:w-24 sm:h-24 object-contain" />
          ) : (
            <div className="w-20 h-20 bg-slate-100 text-[10px] flex items-center justify-center">QR Code</div>
          )}
          <span className="text-[8px] font-black text-slate-900 uppercase mt-0.5">
            Scan To Walk
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-700/80 pt-2 flex items-center justify-between text-[10px] text-slate-400">
        <span className="flex items-center gap-1">
          <MapPin className="w-3 h-3 text-amber-500" />
          {signboard.locationDescription}
        </span>
        <span className="text-slate-300">{signboard.material || 'Rigid Coroplast Board'}</span>
      </div>
    </div>
  );
};
