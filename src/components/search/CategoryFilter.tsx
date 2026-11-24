import React from 'react';
import { 
  Building2, 
  GraduationCap, 
  Home, 
  Dumbbell, 
  Coffee, 
  Stethoscope, 
  Landmark, 
  DoorOpen 
} from 'lucide-react';

interface CategoryFilterProps {
  activeCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

const CATEGORIES: { id: string; label: string; icon: React.ReactNode }[] = [
  { id: 'all', label: 'All', icon: <Building2 className="w-3.5 h-3.5" /> },
  { id: 'academic', label: 'Academic', icon: <GraduationCap className="w-3.5 h-3.5" /> },
  { id: 'administrative', label: 'Admin', icon: <Building2 className="w-3.5 h-3.5" /> },
  { id: 'hostel', label: 'Hostels', icon: <Home className="w-3.5 h-3.5" /> },
  { id: 'dining', label: 'Food & Cafes', icon: <Coffee className="w-3.5 h-3.5" /> },
  { id: 'sports', label: 'Sports & SAC', icon: <Dumbbell className="w-3.5 h-3.5" /> },
  { id: 'medical', label: 'Health', icon: <Stethoscope className="w-3.5 h-3.5" /> },
  { id: 'bank', label: 'Banks / ATMs', icon: <Landmark className="w-3.5 h-3.5" /> },
  { id: 'gate', label: 'Gates', icon: <DoorOpen className="w-3.5 h-3.5" /> }
];

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  activeCategory,
  onSelectCategory,
}) => {
  return (
    <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar py-1">
      {CATEGORIES.map((cat) => {
        const isActive = (cat.id === 'all' && activeCategory === null) || activeCategory === cat.id;
        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id === 'all' ? null : cat.id)}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all shadow-sm ${
              isActive
                ? 'bg-blue-600 text-white shadow-blue-500/25 ring-2 ring-blue-400/30'
                : 'bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 backdrop-blur-sm'
            }`}
          >
            {cat.icon}
            <span>{cat.label}</span>
          </button>
        );
      })}
    </div>
  );
};
