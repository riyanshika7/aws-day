import React, { useRef } from 'react';
import type { Signboard, BannerDimension } from '../../types/signage';
import { SignageRenderer } from './SignageRenderer';
import { X, Printer, Check, Copy } from 'lucide-react';

interface PrintExportModalProps {
  signboard: Signboard | null;
  onClose: () => void;
  onDimensionChange?: (dim: BannerDimension) => void;
}

export const PrintExportModal: React.FC<PrintExportModalProps> = ({
  signboard,
  onClose,
}) => {
  const [copied, setCopied] = React.useState(false);
  const printContainerRef = useRef<HTMLDivElement>(null);

  if (!signboard) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = () => {
    if (signboard.qrUrl) {
      navigator.clipboard.writeText(signboard.qrUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getDimensionLabel = (dim: BannerDimension) => {
    switch (dim) {
      case '6x3_feet':
        return '6 ft × 3 ft (72" × 36") Outdoor Vinyl';
      case '4x2_feet':
        return '4 ft × 2 ft (48" × 24") Directional Vinyl';
      case '3x2_feet':
        return '3 ft × 2 ft (36" × 24") Coroplast Board';
      case '2.5x6_feet':
        return '2.5 ft × 6 ft (30" × 72") Roll-Up Totem';
      case 'a3_kiosk':
        return 'A3 Kiosk (11.7" × 16.5") Post Mount';
      default:
        return dim;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-5xl max-h-[92vh] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        {/* Modal Top Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-amber-500 rounded-xl flex items-center justify-center text-slate-950 font-black text-sm">
              AWS
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-base font-bold text-white">
                  Print-Ready Signage Studio
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {signboard.id}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {getDimensionLabel(signboard.dimension)} • {signboard.material || 'Heavy Vinyl Substrate'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs rounded-xl shadow-md flex items-center gap-1.5 transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Export PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5 bg-slate-950/40">
          {/* Live High-Fidelity Banner Preview */}
          <div className="flex justify-center p-2 sm:p-6 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-inner overflow-x-auto">
            <div ref={printContainerRef} className="w-full flex justify-center">
              <SignageRenderer signboard={signboard} />
            </div>
          </div>

          {/* Print Specifications & Substrate Panel */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                Target Print Dimension
              </span>
              <p className="font-semibold text-white">
                {getDimensionLabel(signboard.dimension)}
              </p>
              <p className="text-[11px] text-slate-400">
                300 DPI vector rendering ready with 0.5" bleed margins.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                Recommended Substrate
              </span>
              <p className="font-semibold text-amber-400">
                {signboard.material || '540 GSM Heavy Outdoor Frontlit Vinyl'}
              </p>
              <p className="text-[11px] text-slate-400">
                Weatherproof UV solvent inks with corner brass eyelets.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">
                Scan Navigation Target
              </span>
              <div className="flex items-center space-x-1.5 mt-1">
                <input
                  type="text"
                  readOnly
                  value={signboard.qrUrl}
                  className="w-full bg-slate-950 text-[10px] text-slate-300 px-2 py-1.5 rounded-lg border border-slate-700 font-mono truncate"
                />
                <button
                  onClick={handleCopyLink}
                  className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg shrink-0"
                  title="Copy QR URL"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
