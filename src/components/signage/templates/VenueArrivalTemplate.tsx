import React from 'react';
import type { Signboard } from '../../../types/signage';
import { CheckCircle2, Sparkles, MapPin } from 'lucide-react';

interface TemplateProps {
  signboard: Signboard;
  qrDataUrl: string;
}

export const VenueArrivalTemplate: React.FC<TemplateProps> = ({
  signboard,
  qrDataUrl,
}) => {
  return (
    <div className="relative w-full aspect-[2/1] min-h-[340px] max-w-4xl bg-gradient-to-r from-[#131921] via-[#232f3e] to-[#1a2332] text-white p-6 sm:p-8 rounded-2xl shadow-2xl flex flex-col justify-between border-4 border-amber-500 overflow-hidden font-sans select-none">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-slate-700/80 pb-3">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center font-black text-slate-950 text-xl shadow-lg">
            AWS
          </div>
          <div>
            <div className="text-xs uppercase font-extrabold text-amber-400 tracking-wider flex items-center gap-1.5">
              <span>Student Community Day 2027</span>
              <span>•</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Destination Reached
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              MAIN KEYNOTE & CONFERENCE VENUE
            </h1>
          </div>
        </div>

        <div className="hidden sm:block text-right">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-slate-950">
            OFFICIAL VENUE
          </span>
        </div>
      </div>

      {/* Main Core */}
      <div className="my-auto py-4 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex-1 space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-lg text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Confirmed Event Hall
          </div>
          <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            {signboard.destinationName}
          </div>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            {signboard.customMessage || 'Please proceed through the main foyer to collect your conference badge, swag bag, and event program guide.'}
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-2 justify-center md:justify-start">
            <span className="px-3 py-1.5 bg-slate-800 text-white font-semibold text-xs rounded-lg border border-slate-700">
              🚪 Registration: Main Foyer
            </span>
            <span className="px-3 py-1.5 bg-slate-800 text-white font-semibold text-xs rounded-lg border border-slate-700">
              ☕ Networking Lounge: East Quad
            </span>
            <span className="px-3 py-1.5 bg-slate-800 text-white font-semibold text-xs rounded-lg border border-slate-700">
              ⚡ Wi-Fi: NITJ-Guest-AWS
            </span>
          </div>
        </div>

        {/* QR Section */}
        <div className="bg-white p-3 rounded-2xl shadow-2xl flex flex-col items-center justify-center text-center">
          {qrDataUrl ? (
            <img src={qrDataUrl} alt="Scan for Live Agenda" className="w-28 h-28 sm:w-32 sm:h-32 object-contain" />
          ) : (
            <div className="w-28 h-28 bg-slate-100 flex items-center justify-center text-xs text-slate-400">Loading QR...</div>
          )}
          <span className="text-[10px] font-black text-slate-900 uppercase mt-1">
            Scan For Live Agenda
          </span>
          <span className="text-[9px] text-slate-500">
            Speakers, Track & Q&A
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-700/80 pt-3 flex items-center justify-between text-[11px] text-slate-400">
        <span className="flex items-center gap-1 font-mono text-amber-400 font-bold">
          {signboard.id}
        </span>
        <span className="flex items-center gap-1 text-slate-300">
          <MapPin className="w-3 h-3 text-amber-500" />
          {signboard.locationDescription}
        </span>
      </div>
    </div>
  );
};
