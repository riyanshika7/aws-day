import React from 'react';
import { Plus, Minus, Compass, Box, Locate, RotateCcw } from 'lucide-react';

interface MapControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetNorth: () => void;
  onToggle3D: () => void;
  is3D: boolean;
  onCenterCampus: () => void;
  onLocateMe: () => void;
}

export const MapControls: React.FC<MapControlsProps> = ({
  onZoomIn,
  onZoomOut,
  onResetNorth,
  onToggle3D,
  is3D,
  onCenterCampus,
  onLocateMe,
}) => {
  return (
    <div className="absolute right-4 bottom-8 z-20 flex flex-col space-y-2">
      <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col divide-y divide-slate-100 dark:divide-slate-800">
        <button
          onClick={onZoomIn}
          className="p-2.5 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="Zoom In"
        >
          <Plus className="w-4 h-4" />
        </button>
        <button
          onClick={onZoomOut}
          className="p-2.5 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="Zoom Out"
        >
          <Minus className="w-4 h-4" />
        </button>
      </div>

      <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col divide-y divide-slate-100 dark:divide-slate-800">
        <button
          onClick={onResetNorth}
          className="p-2.5 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="Reset Bearing (North Up)"
        >
          <Compass className="w-4 h-4 text-blue-600" />
        </button>
        <button
          onClick={onToggle3D}
          className={`p-2.5 transition-colors ${
            is3D
              ? 'text-blue-600 bg-blue-50 dark:bg-slate-800'
              : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
          }`}
          title="Toggle 3D Building Extrusions"
        >
          <Box className="w-4 h-4" />
        </button>
        <button
          onClick={onCenterCampus}
          className="p-2.5 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="Recenter to NITJ Campus"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
        <button
          onClick={onLocateMe}
          className="p-2.5 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="Find My Location"
        >
          <Locate className="w-4 h-4 text-emerald-600" />
        </button>
      </div>
    </div>
  );
};
