import React from 'react';
import type { Signboard } from '../../../types/signage';
import { UserCheck, Mic, AlertCircle } from 'lucide-react';

interface TemplateProps {
  signboard: Signboard;
  qrDataUrl: string;
}

export const RegistrationCheckinTemplate: React.FC<TemplateProps> = ({
  signboard,
  qrDataUrl,
}) => {
  return (
    <div className="relative w-full max-w-sm aspect-[5/12] min-h-[520px] bg-[#1a2332] text-white p-6 rounded-2xl shadow-2xl flex flex-col justify-between border-4 border-amber-500 overflow-hidden font-sans select-none mx-auto">
      {/* Top Banner */}
      <div className="text-center border-b-2 border-slate-700 pb-4">
        <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center font-black text-slate-950 text-xl mx-auto shadow-md mb-2">
          AWS
        </div>
        <div className="text-[11px] font-extrabold uppercase text-amber-400 tracking-wider">
          Student Community Day 2027
        </div>
        <h2 className="text-xl font-black text-white uppercase mt-0.5 tracking-tight">
          CHECK-IN & BADGES
        </h2>
        <p className="text-[10px] text-slate-300">NIT Jalandhar Campus</p>
      </div>

      {/* Dual Lane Guidance */}
      <div className="space-y-3.5 my-auto py-2">
        {/* Lane 1: Attendees */}
        <div className="bg-[#232f3e] p-3.5 rounded-xl border-2 border-amber-500/80 shadow-md">
          <div className="flex items-center space-x-2.5 mb-1.5">
            <div className="p-1.5 bg-amber-500 text-slate-950 rounded-lg">
              <UserCheck className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase text-amber-400 block">
                Desk 01 – 04
              </span>
              <h4 className="text-sm font-extrabold text-white">General Attendees</h4>
            </div>
          </div>
          <ul className="text-[11px] text-slate-300 space-y-1 list-disc list-inside">
            <li>Have your registration QR email ready</li>
            <li>Show College Student ID or Govt ID</li>
            <li>Collect Name Badge, T-shirt & Swag Kit</li>
          </ul>
        </div>

        {/* Lane 2: Speakers & VIPs */}
        <div className="bg-slate-900 p-3.5 rounded-xl border border-blue-400/50 shadow-md">
          <div className="flex items-center space-x-2.5 mb-1.5">
            <div className="p-1.5 bg-blue-600 text-white rounded-lg">
              <Mic className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase text-blue-400 block">
                Desk 05 (VIP Lane)
              </span>
              <h4 className="text-sm font-extrabold text-white">Speakers & Mentors</h4>
            </div>
          </div>
          <ul className="text-[11px] text-slate-300 space-y-1 list-disc list-inside">
            <li>Priority speaker badge & lanyard</li>
            <li>Access Green Room & Tech Check lounge</li>
            <li>Collect speaker kit & presenter mic</li>
          </ul>
        </div>

        {/* Requirements Callout */}
        <div className="bg-amber-500/10 border border-amber-500/30 p-2.5 rounded-xl flex items-start space-x-2 text-[10px] text-amber-200">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <span>Keep your badge visible at all times for security access across keynote and lab halls.</span>
        </div>
      </div>

      {/* QR Code & Footer */}
      <div className="border-t-2 border-slate-700 pt-3 text-center">
        <div className="bg-white p-2.5 rounded-xl shadow-lg inline-block">
          {qrDataUrl && (
            <img src={qrDataUrl} alt="Scan for Check-in Portal" className="w-24 h-24 object-contain mx-auto" />
          )}
          <span className="text-[8px] font-black text-slate-900 uppercase block mt-1">
            Need Help? Scan Support
          </span>
        </div>
        <div className="mt-2 text-[10px] font-mono text-slate-400 flex items-center justify-between">
          <span className="text-amber-400">{signboard.id}</span>
          <span>Totem Roll-up</span>
        </div>
      </div>
    </div>
  );
};
