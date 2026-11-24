import React from 'react';
import type { Signboard } from '../../../types/signage';
import { DirectionalArrow } from '../DirectionalArrow';
import { Accessibility, Car, MapPin } from 'lucide-react';

interface TemplateProps {
  signboard: Signboard;
  qrDataUrl: string;
}

export const ParkingAccessibilityTemplate: React.FC<TemplateProps> = ({
  signboard,
  qrDataUrl,
}) => {
  return (
    <div className="relative w-full aspect-[2/1] min-h-[300px] max-w-4xl bg-[#131921] text-white p-6 sm:p-7 rounded-2xl shadow-2xl flex flex-col justify-between border-4 border-amber-500 overflow-hidden font-sans select-none">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b-2 border-slate-700 pb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center font-black text-slate-950 text-base">
            AWS
          </div>
          <div>
            <div className="text-xs uppercase font-extrabold text-amber-400 tracking-wider">
              Parking & Accessible Mobility
            </div>
            <div className="text-sm font-bold text-white">AWS Student Community Day 2027</div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="p-1.5 bg-blue-600 rounded-lg text-white" title="Wheelchair Accessible">
            <Accessibility className="w-5 h-5" />
          </span>
          <span className="p-1.5 bg-slate-800 rounded-lg text-amber-400" title="Parking Bays">
            <Car className="w-5 h-5" />
          </span>
        </div>
      </div>

      {/* Core Guidance */}
      <div className="my-auto py-3 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        {/* Left: Big Arrow */}
        <div className="p-4 bg-slate-900 rounded-2xl border-2 border-amber-500/60 shadow-xl flex items-center justify-center">
          <DirectionalArrow direction={signboard.arrowDirection} size="giant" variant="orange" />
        </div>

        {/* Center: Guidelines */}
        <div className="space-y-2">
          <div className="text-xs uppercase font-extrabold text-amber-400 tracking-wider">
            Accessible Path & Reserved Bays
          </div>
          <div className="text-xl sm:text-2xl font-black text-white leading-tight">
            {signboard.destinationName}
          </div>
          <p className="text-xs text-slate-300 font-medium">
            {signboard.customMessage || 'Paved barrier-free walkway with continuous ramps and step-free portico entrance.'}
          </p>
          <div className="flex items-center gap-2 pt-1">
            {signboard.distanceMeters !== null && (
              <span className="bg-amber-500 text-slate-950 font-black text-xs px-2.5 py-1 rounded-lg">
                {signboard.distanceMeters}M Ahead
              </span>
            )}
            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs px-2.5 py-1 rounded-lg font-bold">
              100% Step-Free
            </span>
          </div>
        </div>

        {/* Right: QR */}
        <div className="bg-white p-3 rounded-2xl shadow-xl flex flex-col items-center justify-center text-center mx-auto md:ml-auto">
          {qrDataUrl && (
            <img src={qrDataUrl} alt="Scan for Accessibility Route" className="w-20 h-20 sm:w-24 sm:h-24 object-contain" />
          )}
          <span className="text-[9px] font-black text-slate-900 uppercase mt-1">
            Scan Accessible Map
          </span>
          <span className="text-[8px] text-slate-500">
            Wheelchair Verified
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-700/80 pt-2 flex items-center justify-between text-[11px] text-slate-400">
        <span className="flex items-center gap-1 font-mono text-amber-400">
          {signboard.id}
        </span>
        <span className="flex items-center gap-1 text-slate-300">
          <MapPin className="w-3 h-3 text-amber-500" />
          {signboard.locationDescription}
        </span>
        <span className="text-slate-400 font-mono text-[10px]">
          Reflective Outdoor Aluminum
        </span>
      </div>
    </div>
  );
};
