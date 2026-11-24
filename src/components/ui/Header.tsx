import React from 'react';
import { Compass, Navigation, Layers, Sparkles, Sliders } from 'lucide-react';

interface HeaderProps {
  onToggleNavigation: () => void;
  isNavigating: boolean;
  onToggleLayers: () => void;
  showLayers: boolean;
  onOpenSignageAdmin: () => void;
  isEventMode: boolean;
  onToggleEventMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onToggleNavigation,
  isNavigating,
  onToggleLayers,
  showLayers,
  onOpenSignageAdmin,
  isEventMode,
  onToggleEventMode,
}) => {
  return (
    <header className="absolute top-0 left-0 right-0 z-20 bg-slate-900/90 backdrop-blur-md text-white border-b border-slate-700/60 shadow-lg px-4 py-2.5 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 via-indigo-700 to-amber-600 flex items-center justify-center shadow-md border border-white/20">
          <Compass className="w-5 h-5 text-white animate-spin-slow" />
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
              NITJ Campus Navigator
            </h1>
            <button
              onClick={onToggleEventMode}
              className={`inline-flex items-center gap-1 px-2.5 py-0.5 text-[10px] font-black rounded-full transition-all border ${
                isEventMode
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-sm shadow-amber-500/30'
                  : 'bg-slate-800 text-amber-400 border-amber-500/40 hover:bg-slate-700'
              }`}
              title="Toggle AWS Student Community Day 2027 Event Wayfinding"
            >
              <Sparkles className="w-3 h-3" /> AWS SCD 2027
            </button>
          </div>
          <p className="text-[11px] text-slate-300 font-medium hidden sm:block">
            Dr. B. R. Ambedkar National Institute of Technology, Jalandhar
          </p>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={onOpenSignageAdmin}
          className="px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-md transition-all"
          title="Open Physical Signage & Wayfinding Admin Studio"
        >
          <Sliders className="w-3.5 h-3.5 fill-slate-950" />
          <span className="hidden sm:inline">Signage Studio</span>
        </button>

        <button
          onClick={onToggleNavigation}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm ${
            isNavigating
              ? 'bg-blue-600 text-white shadow-blue-500/30'
              : 'bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700'
          }`}
          title="Campus Pedestrian Directions"
        >
          <Navigation className="w-3.5 h-3.5" />
          <span className="hidden xs:inline">Directions</span>
        </button>

        <button
          onClick={onToggleLayers}
          className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm ${
            showLayers
              ? 'bg-indigo-600 text-white shadow-indigo-500/30'
              : 'bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-700'
          }`}
          title="Toggle Map Layers"
        >
          <Layers className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};

