import React, { useState, useEffect } from 'react';
import type { Signboard } from '../../types/signage';
import { DirectionalArrow } from './DirectionalArrow';
import { generateQrDataUrl } from '../../utils/qrGenerator';
import { 
  X, 
  MapPin, 
  Navigation, 
  Printer, 
  Scan,
  Compass
} from 'lucide-react';

interface SignboardDetailDrawerProps {
  signboard: Signboard | null;
  onClose: () => void;
  onStartRouteFromSign: (sign: Signboard) => void;
  onOpenPrintModal: (sign: Signboard) => void;
  onSimulateQrScan: (sign: Signboard) => void;
}

export const SignboardDetailDrawer: React.FC<SignboardDetailDrawerProps> = ({
  signboard,
  onClose,
  onStartRouteFromSign,
  onOpenPrintModal,
  onSimulateQrScan,
}) => {
  const [qrDataUrl, setQrDataUrl] = useState<string>('');

  useEffect(() => {
    if (!signboard) return;
    let isMounted = true;
    generateQrDataUrl(signboard.qrUrl || window.location.href, '#232f3e', '#ffffff').then((url) => {
      if (isMounted) setQrDataUrl(url);
    });
    return () => {
      isMounted = false;
    };
  }, [signboard]);

  if (!signboard) return null;

  return (
    <div className="absolute bottom-0 left-0 right-0 sm:left-4 sm:bottom-4 sm:right-auto sm:w-96 max-h-[85vh] bg-[#1a2332]/95 backdrop-blur-md rounded-t-2xl sm:rounded-2xl shadow-2xl border-2 border-amber-500/80 z-30 flex flex-col overflow-hidden animate-slide-up text-white">
      {/* Top Header */}
      <div className="p-4 border-b border-slate-700/80 flex items-start justify-between bg-slate-950/60">
        <div className="flex-1 pr-3">
          <div className="flex items-center space-x-2 mb-1">
            <span className="font-mono text-[10px] font-black bg-amber-500 text-slate-950 px-2 py-0.5 rounded">
              {signboard.id}
            </span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
              signboard.installationStatus === 'installed'
                ? 'bg-emerald-500/20 text-emerald-300'
                : 'bg-amber-500/20 text-amber-300'
            }`}>
              {signboard.installationStatus}
            </span>
          </div>
          <h3 className="text-base font-bold text-white leading-snug">
            {signboard.title}
          </h3>
          <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span className="truncate">{signboard.locationDescription}</span>
          </p>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Body */}
      <div className="p-4 overflow-y-auto space-y-3.5 text-xs text-slate-300">
        {/* Destination & Direction Banner */}
        <div className="bg-slate-900/90 p-3.5 rounded-xl border border-slate-700 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase text-amber-400 flex items-center gap-1">
              <Compass className="w-3.5 h-3.5" /> Intended Wayfinding Direction
            </span>
            <div className="text-base font-extrabold text-white">
              {signboard.destinationName}
            </div>
            <div className="flex items-center gap-2 pt-0.5 text-[11px]">
              {signboard.distanceMeters !== null && (
                <span className="text-amber-400 font-bold">
                  {signboard.distanceMeters}m distance
                </span>
              )}
              {signboard.estimatedWalkingMinutes !== null && (
                <span className="text-slate-400">
                  (~{signboard.estimatedWalkingMinutes} min walk)
                </span>
              )}
            </div>
          </div>

          <div className="p-2.5 bg-slate-800 rounded-xl border border-slate-700">
            <DirectionalArrow direction={signboard.arrowDirection} size="md" variant="orange" />
          </div>
        </div>

        {/* QR Code Preview & Scan Action */}
        <div className="bg-slate-900/90 p-3.5 rounded-xl border border-slate-700 flex items-center space-x-3.5">
          <div className="bg-white p-1.5 rounded-xl shadow-md shrink-0">
            {qrDataUrl ? (
              <img src={qrDataUrl} alt="QR Code" className="w-20 h-20 object-contain" />
            ) : (
              <div className="w-20 h-20 bg-slate-100 flex items-center justify-center text-[9px] text-slate-400">QR Loading</div>
            )}
          </div>
          <div className="space-y-1.5">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">
              Physical Signboard QR Code
            </span>
            <p className="text-[11px] text-slate-300">
              Scanning opens the mobile portal and immediately routes from this signboard.
            </p>
            <button
              onClick={() => onSimulateQrScan(signboard)}
              className="px-2.5 py-1 bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-slate-950 font-bold rounded-lg text-xs flex items-center gap-1.5 transition-all"
            >
              <Scan className="w-3.5 h-3.5" />
              <span>Simulate QR Scan</span>
            </button>
          </div>
        </div>

        {/* Signboard Specifications */}
        <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
          <div>
            <span className="text-[10px] text-slate-500 block">Template Type</span>
            <span className="font-semibold text-slate-200 capitalize">
              {signboard.type.replace('_', ' ')}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 block">Target Dimension</span>
            <span className="font-semibold text-slate-200">
              {signboard.dimension.replace('_', ' ')}
            </span>
          </div>
          <div className="col-span-2">
            <span className="text-[10px] text-slate-500 block">GPS Coordinates (WGS84)</span>
            <span className="font-mono text-slate-300 text-[10px]">
              {signboard.coordinates[1].toFixed(5)}° N, {signboard.coordinates[0].toFixed(5)}° E
            </span>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-3 bg-slate-950/80 border-t border-slate-800 flex items-center space-x-2">
        <button
          onClick={() => onStartRouteFromSign(signboard)}
          className="flex-1 py-2 px-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md transition-all"
        >
          <Navigation className="w-3.5 h-3.5 fill-slate-950" />
          <span>Walk From Here</span>
        </button>

        <button
          onClick={() => onOpenPrintModal(signboard)}
          className="py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl text-xs flex items-center gap-1.5 transition-all border border-slate-700"
          title="Print High-Resolution Signboard Artwork"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Print Design</span>
        </button>
      </div>
    </div>
  );
};
