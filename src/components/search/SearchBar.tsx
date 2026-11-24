import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Building, GraduationCap, Coffee, Home, Stethoscope } from 'lucide-react';
import type { CampusFeature } from '../../types/campus';

interface SearchBarProps {
  features: CampusFeature[];
  onSelectFeature: (feature: CampusFeature) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  features,
  onSelectFeature,
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredFeatures = query.trim()
    ? features.filter((f) => {
        const q = query.toLowerCase();
        return (
          f.name.toLowerCase().includes(q) ||
          f.shortName.toLowerCase().includes(q) ||
          f.category.toLowerCase().includes(q) ||
          f.tags.some((t) => t.toLowerCase().includes(q))
        );
      })
    : [];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (feature: CampusFeature) => {
    onSelectFeature(feature);
    setQuery(feature.name);
    setIsOpen(false);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'academic':
        return <GraduationCap className="w-4 h-4 text-blue-500" />;
      case 'hostel':
        return <Home className="w-4 h-4 text-emerald-500" />;
      case 'dining':
        return <Coffee className="w-4 h-4 text-amber-500" />;
      case 'medical':
        return <Stethoscope className="w-4 h-4 text-rose-500" />;
      default:
        return <Building className="w-4 h-4 text-purple-500" />;
    }
  };

  return (
    <div ref={dropdownRef} className="relative w-full max-w-md">
      <div className="relative flex items-center bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 transition-all focus-within:ring-2 focus-within:ring-blue-500">
        <div className="pl-3.5 pr-2 py-2.5 text-slate-400">
          <Search className="w-4 h-4" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search NITJ departments, hostels, amenities..."
          className="w-full bg-transparent text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none py-2 pr-8"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setIsOpen(false);
            }}
            className="absolute right-2.5 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Results Dropdown */}
      {isOpen && filteredFeatures.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1.5 max-h-72 overflow-y-auto bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 z-50 divide-y divide-slate-100 dark:divide-slate-800">
          {filteredFeatures.map((feature) => (
            <button
              key={feature.id}
              onClick={() => handleSelect(feature)}
              className="w-full text-left px-3.5 py-2.5 hover:bg-blue-50/80 dark:hover:bg-slate-800/80 flex items-start space-x-3 transition-colors"
            >
              <div className="mt-0.5 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg">
                {getCategoryIcon(feature.category)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">
                  {feature.name}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-0.5">
                  <span className="capitalize">{feature.category}</span>
                  <span>•</span>
                  <span className="truncate">{feature.shortName}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
