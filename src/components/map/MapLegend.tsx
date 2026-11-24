import React from 'react';
import { ShieldCheck, AlertCircle } from 'lucide-react';
import { CATEGORY_COLORS } from '../../config/mapConfig';

export const MapLegend: React.FC = () => {
  const ITEMS = [
    { label: 'Academic & LHC', color: CATEGORY_COLORS.academic },
    { label: 'Admin & Director', color: CATEGORY_COLORS.administrative },
    { label: 'Hostels (MBH & MGH)', color: CATEGORY_COLORS.hostel },
    { label: 'Sports & SAC', color: CATEGORY_COLORS.sports },
    { label: 'Dining & Cafes', color: CATEGORY_COLORS.dining },
    { label: 'Health Centre', color: CATEGORY_COLORS.medical },
    { label: 'Amenities & Banks', color: CATEGORY_COLORS.amenity },
  ];

  return (
    <div className="hidden md:block absolute left-4 bottom-8 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 p-2.5 z-20 text-[11px] text-slate-700 dark:text-slate-300">
      <div className="font-semibold text-slate-800 dark:text-slate-100 mb-1.5 flex items-center justify-between">
        <span>Campus GIS Legend</span>
        <span className="text-[10px] font-normal text-slate-400">Phase 1</span>
      </div>

      <div className="grid grid-cols-2 gap-x-3 gap-y-1">
        {ITEMS.map((item, idx) => (
          <div key={idx} className="flex items-center space-x-1.5">
            <span
              className="w-2.5 h-2.5 rounded-sm shadow-xs"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-[10px] text-slate-600 dark:text-slate-400 truncate">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center space-x-3 text-[10px] text-slate-500">
        <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
          <ShieldCheck className="w-3 h-3" /> Ground Verified
        </span>
        <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-medium">
          <AlertCircle className="w-3 h-3" /> Zone Verified
        </span>
      </div>
    </div>
  );
};
