import React from 'react';
import type { Signboard } from '../../../types/signage';
import { DirectionalArrow } from '../DirectionalArrow';
import { Compass, Car, ShieldCheck } from 'lucide-react';

interface TemplateProps {
  signboard: Signboard;
  qrDataUrl: string;
}

export const JunctionSignTemplate: React.FC<TemplateProps> = ({
  signboard,
  qrDataUrl,
}) => {
  return (
    <div className="relative w-full aspect-[2/1] min-h-[320px] max-w-4xl bg-[#1a2332] text-white p-6 sm:p-7 rounded-2xl shadow-2xl flex flex-col justify-between border-4 border-amber-500 overflow-hidden font-sans select-none">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b-2 border-slate-700 pb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center font-black text-slate-950 text-base">
            AWS
          </div>
          <div>
            <div className="text-xs uppercase font-extrabold text-amber-400 tracking-wider">
              Campus Road Junction Wayfinding
            </div>
            <div className="text-sm font-bold text-white">AWS Student Community Day 2027</div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs bg-slate-800 text-slate-300 px-3 py-1 rounded-full font-mono font-semibold">
            {signboard.id}
          </span>
        </div>
      </div>

      {/* Multi-Destination Fork Lanes */}
      <div className="my-auto py-3 grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Lane 1: Primary Event Venue */}
        <div className="bg-gradient-to-br from-slate-900 to-[#232f3e] p-3.5 rounded-xl border-2 border-amber-500 flex items-center space-x-3 shadow-md">
          <div className="p-2.5 bg-amber-500 rounded-lg text-slate-950">
            <DirectionalArrow direction={signboard.arrowDirection} size="md" variant="dark" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-black uppercase text-amber-400 block tracking-wider">
              Keynotes & Sessions
            </span>
            <div className="text-sm sm:text-base font-extrabold text-white truncate">
              {signboard.destinationName}
            </div>
            <span className="text-[11px] text-slate-300 font-semibold">
              {signboard.distanceMeters ? `${signboard.distanceMeters}m Ahead` : 'Follow Path'}
            </span>
          </div>
        </div>

        {/* Lane 2: Parking & Transport */}
        <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-700 flex items-center space-x-3 shadow-md">
          <div className="p-2.5 bg-slate-800 rounded-lg text-slate-200">
            <Car className="w-6 h-6 text-blue-400" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-bold uppercase text-slate-400 block tracking-wider">
              Vehicles & Drop-Off
            </span>
            <div className="text-sm font-bold text-slate-100 truncate">
              Admin & Visitor Parking
            </div>
            <span className="text-[11px] text-slate-400">
              East Corridor (Turn Left)
            </span>
          </div>
        </div>

        {/* Lane 3: QR Scanner & Real-Time Navigation */}
        <div className="bg-white p-3 rounded-xl shadow-lg flex items-center space-x-3 text-slate-900">
          {qrDataUrl && (
            <img src={qrDataUrl} alt="QR Navigation" className="w-16 h-16 object-contain" />
          )}
          <div>
            <span className="text-[9px] font-black uppercase text-amber-600 block">
              Lost At This Junction?
            </span>
            <div className="text-xs font-black text-slate-900">
              Scan For Live Map
            </div>
            <span className="text-[9px] text-slate-500">
              Step-by-step guidance
            </span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-700/80 pt-2 flex items-center justify-between text-[11px] text-slate-400">
        <span className="flex items-center gap-1">
          <Compass className="w-3.5 h-3.5 text-amber-500" />
          {signboard.locationDescription}
        </span>
        <span className="text-emerald-400 flex items-center gap-1 font-medium">
          <ShieldCheck className="w-3.5 h-3.5" /> High-Traffic Junction Node
        </span>
      </div>
    </div>
  );
};
