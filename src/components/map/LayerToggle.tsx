import React from 'react';
import { 
  X, 
  Layers, 
  Building2, 
  Car, 
  Footprints, 
  DoorOpen, 
  Trees, 
  ParkingCircle, 
  MapPin, 
  Eye, 
  EyeOff 
} from 'lucide-react';
import type { LayerVisibilityState } from '../../types/map';

interface LayerToggleProps {
  layers: LayerVisibilityState;
  onToggleLayer: (layerName: keyof LayerVisibilityState) => void;
  onClose: () => void;
}

export const LayerToggle: React.FC<LayerToggleProps> = ({
  layers,
  onToggleLayer,
  onClose,
}) => {
  const LAYER_ITEMS: { key: keyof LayerVisibilityState; label: string; icon: React.ReactNode }[] = [
    { key: 'buildings', label: 'Building Footprints', icon: <Building2 className="w-4 h-4 text-blue-500" /> },
    { key: 'roads', label: 'Vehicular Roads', icon: <Car className="w-4 h-4 text-slate-500" /> },
    { key: 'pedestrianPaths', label: 'Pedestrian Pathways', icon: <Footprints className="w-4 h-4 text-amber-500" /> },
    { key: 'gates', label: 'Gates & Entrances', icon: <DoorOpen className="w-4 h-4 text-rose-500" /> },
    { key: 'greenAreas', label: 'Green Belts & Sports Fields', icon: <Trees className="w-4 h-4 text-emerald-500" /> },
    { key: 'parking', label: 'Parking Bays', icon: <ParkingCircle className="w-4 h-4 text-indigo-500" /> },
    { key: 'landmarks', label: 'Points of Interest (POIs)', icon: <MapPin className="w-4 h-4 text-red-500" /> },
    { key: 'signage', label: 'AWS 2027 Event Signboards', icon: <MapPin className="w-4 h-4 text-amber-500" /> },
    { key: 'buildingExtrusion3D', label: '3D Building Extrusion', icon: <Building2 className="w-4 h-4 text-purple-500" /> }
  ];

  return (
    <div className="absolute top-16 right-4 w-72 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 z-30 p-3.5 animate-fade-in">
      <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center space-x-2">
          <Layers className="w-4 h-4 text-indigo-600" />
          <h3 className="text-xs font-bold text-slate-900 dark:text-slate-100">
            GIS Layer Control
          </h3>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-1">
        {LAYER_ITEMS.map((item) => {
          const isVisible = layers[item.key];
          return (
            <button
              key={item.key}
              onClick={() => onToggleLayer(item.key)}
              className="w-full flex items-center justify-between p-2 rounded-xl text-xs hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <div className="flex items-center space-x-2.5">
                {item.icon}
                <span className="font-medium text-slate-700 dark:text-slate-200">
                  {item.label}
                </span>
              </div>
              <div className={isVisible ? 'text-blue-600' : 'text-slate-400'}>
                {isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
