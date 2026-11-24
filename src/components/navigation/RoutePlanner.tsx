import React, { useState } from 'react';
import { 
  Navigation, 
  X, 
  ArrowUpDown, 
  Accessibility, 
  Footprints 
} from 'lucide-react';
import type { CampusFeature, CampusRoute } from '../../types/campus';
import { formatDistance } from '../../utils/geoUtils';

interface RoutePlannerProps {
  features: CampusFeature[];
  activeRoute: CampusRoute | null;
  onCalculateRoute: (
    origin: CampusFeature,
    destination: CampusFeature,
    wheelchairOnly: boolean
  ) => void;
  onClearRoute: () => void;
  onClose: () => void;
  preselectedDest: CampusFeature | null;
}

export const RoutePlanner: React.FC<RoutePlannerProps> = ({
  features,
  activeRoute,
  onCalculateRoute,
  onClearRoute,
  onClose,
  preselectedDest,
}) => {
  // Default origin: Main Gate
  const mainGate = features.find((f) => f.id === 'ENT-01') || features[0];
  const [originId, setOriginId] = useState<string>(mainGate.id);
  const [destId, setDestId] = useState<string>(
    preselectedDest ? preselectedDest.id : features[1]?.id || ''
  );
  const [wheelchairOnly, setWheelchairOnly] = useState(false);

  const handleSwap = () => {
    setOriginId(destId);
    setDestId(originId);
  };

  const handleFindRoute = () => {
    const origin = features.find((f) => f.id === originId);
    const dest = features.find((f) => f.id === destId);
    if (origin && dest) {
      onCalculateRoute(origin, dest, wheelchairOnly);
    }
  };

  return (
    <div className="absolute top-16 left-0 right-0 sm:left-4 sm:top-16 sm:right-auto sm:w-96 max-h-[85vh] bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 z-40 flex flex-col overflow-hidden animate-fade-in">
      {/* Title */}
      <div className="p-3.5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/60 dark:bg-slate-800/50">
        <div className="flex items-center space-x-2">
          <div className="p-1.5 bg-blue-600 text-white rounded-lg">
            <Navigation className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
            Campus Pedestrian Route
          </h3>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Selectors */}
      <div className="p-3.5 space-y-2.5 border-b border-slate-100 dark:border-slate-800">
        <div className="relative flex items-center space-x-2">
          <div className="flex flex-col items-center justify-center pl-1">
            <div className="w-3 h-3 rounded-full bg-emerald-500 border-2 border-white shadow-sm" />
            <div className="w-0.5 h-7 bg-slate-300 dark:bg-slate-700 my-0.5" />
            <div className="w-3 h-3 rounded-full bg-rose-500 border-2 border-white shadow-sm" />
          </div>

          <div className="flex-1 space-y-2">
            <div>
              <label className="text-[10px] uppercase font-semibold text-slate-400 block mb-0.5">
                Starting Point
              </label>
              <select
                value={originId}
                onChange={(e) => setOriginId(e.target.value)}
                className="w-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-lg p-2 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {features.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.name} ({f.shortName})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[10px] uppercase font-semibold text-slate-400 block mb-0.5">
                Destination
              </label>
              <select
                value={destId}
                onChange={(e) => setDestId(e.target.value)}
                className="w-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-lg p-2 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {features.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.name} ({f.shortName})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={handleSwap}
            className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-200"
            title="Swap Origin and Destination"
          >
            <ArrowUpDown className="w-4 h-4" />
          </button>
        </div>

        {/* Accessibility checkbox */}
        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center space-x-2 text-xs text-slate-600 dark:text-slate-300 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={wheelchairOnly}
              onChange={(e) => setWheelchairOnly(e.target.checked)}
              className="rounded text-blue-600 focus:ring-blue-500 w-3.5 h-3.5"
            />
            <span className="flex items-center gap-1 font-medium">
              <Accessibility className="w-3.5 h-3.5 text-blue-500" />
              Wheelchair / Step-Free Path
            </span>
          </label>

          <button
            onClick={handleFindRoute}
            className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-all"
          >
            Find Route
          </button>
        </div>
      </div>

      {/* Active Route Summary & Turn Steps */}
      {activeRoute ? (
        <div className="flex-1 overflow-y-auto p-3.5 space-y-3">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-800/80 p-3 rounded-xl border border-blue-100 dark:border-slate-700 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-600 text-white rounded-lg">
                <Footprints className="w-5 h-5" />
              </div>
              <div>
                <div className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                  <span>{activeRoute.estimatedWalkingMinutes} min</span>
                  <span className="text-xs font-normal text-slate-500">
                    ({formatDistance(activeRoute.totalDistanceMeters)})
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  Pedestrian shortest path
                </div>
              </div>
            </div>

            <button
              onClick={onClearRoute}
              className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 underline"
            >
              Clear
            </button>
          </div>

          {/* Turn Guidance List */}
          <div>
            <h4 className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Turn-by-Turn Guidance
            </h4>
            <div className="space-y-2 border-l-2 border-blue-200 dark:border-slate-700 ml-2 pl-3">
              {activeRoute.steps.map((step, idx) => (
                <div key={idx} className="relative text-xs">
                  <div className="absolute -left-[19px] top-0.5 w-2.5 h-2.5 rounded-full bg-blue-500 ring-4 ring-white dark:ring-slate-900" />
                  <div className="text-slate-800 dark:text-slate-200 font-medium">
                    {step.instruction}
                  </div>
                  {step.distanceMeters > 0 && (
                    <div className="text-[10px] text-slate-400 font-mono">
                      {formatDistance(step.distanceMeters)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="p-6 text-center text-slate-400 text-xs">
          Select origin and destination above, then click <strong>Find Route</strong> to view pedestrian turn instructions.
        </div>
      )}
    </div>
  );
};
