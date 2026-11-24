import React from 'react';
import type { Signboard } from '../../types/signage';
import { Footprints, MapPin, Navigation, CheckCircle2, X } from 'lucide-react';

interface AttendeeArrivalModalProps {
  signboard: Signboard;
  onStartRoute: (sign: Signboard) => void;
  onClose: () => void;
}

export const AttendeeArrivalModal: React.FC<AttendeeArrivalModalProps> = ({
  signboard,
  onStartRoute,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md bg-gradient-to-b from-[#1a2332] to-[#0f172a] border-2 border-amber-500 rounded-3xl shadow-2xl p-5 text-white overflow-hidden animate-slide-up">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-800/80 text-slate-400 hover:text-white"
        >
          <X className="w-4 h-4" />
        </button>

        {/* AWS Event Badge */}
        <div className="flex items-center space-x-2.5 mb-3">
          <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center font-black text-slate-950 text-sm shadow">
            AWS
          </div>
          <div>
            <div className="text-[10px] font-black uppercase text-amber-400 tracking-wider">
              AWS Student Community Day 2027
            </div>
            <div className="text-xs text-slate-300 font-semibold">
              NIT Jalandhar Campus Navigator
            </div>
          </div>
        </div>

        {/* Scanned Location Banner */}
        <div className="bg-slate-900/90 border border-slate-700/80 p-3.5 rounded-2xl mb-4 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-amber-500" />
              You Scanned Physical Signboard
            </span>
            <span className="font-mono text-[10px] font-bold text-amber-400 bg-slate-950 px-2 py-0.5 rounded">
              {signboard.id}
            </span>
          </div>
          <h3 className="text-sm font-bold text-white leading-snug">
            {signboard.title}
          </h3>
          <p className="text-[11px] text-slate-400">
            {signboard.locationDescription}
          </p>
        </div>

        {/* Target Destination & Metrics */}
        <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-2xl mb-4 space-y-2">
          <div className="text-[10px] uppercase font-extrabold text-amber-300 tracking-wider">
            Your Event Destination
          </div>
          <div className="text-xl font-black text-white">
            {signboard.destinationName}
          </div>

          <div className="flex items-center gap-2 pt-1">
            {signboard.distanceMeters !== null && (
              <span className="bg-amber-500 text-slate-950 font-black text-xs px-2.5 py-1 rounded-lg">
                {signboard.distanceMeters} METERS
              </span>
            )}
            {signboard.estimatedWalkingMinutes !== null && (
              <span className="bg-slate-800 text-slate-200 font-bold text-xs px-2.5 py-1 rounded-lg flex items-center gap-1 border border-slate-700">
                <Footprints className="w-3.5 h-3.5 text-amber-400" />
                ~{signboard.estimatedWalkingMinutes} min walk
              </span>
            )}
            <span className="text-[10px] text-emerald-400 flex items-center gap-0.5 font-semibold ml-auto">
              <CheckCircle2 className="w-3 h-3" /> Turn-by-Turn Ready
            </span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => onStartRoute(signboard)}
          className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-sm rounded-2xl shadow-lg flex items-center justify-center gap-2 transition-all transform active:scale-[0.98]"
        >
          <Navigation className="w-4 h-4 fill-slate-950" />
          <span>START WALKING ROUTE NOW</span>
        </button>

        <p className="text-center text-[10px] text-slate-400 mt-2.5">
          Interactive client-side navigation • No account or app download required
        </p>
      </div>
    </div>
  );
};
