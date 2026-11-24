import React from 'react';
import { 
  Box, 
  Map, 
  Compass, 
  RotateCcw 
} from 'lucide-react';

interface Controls3DProps {
  viewMode: '3d' | '2d';
  onToggleViewMode: () => void;
  cameraPerspective: 'isometric' | 'top_down';
  onTogglePerspective: () => void;
  onResetCamera: () => void;
}

export const Controls3D: React.FC<Controls3DProps> = ({
  viewMode,
  onToggleViewMode,
  cameraPerspective,
  onTogglePerspective,
  onResetCamera,
}) => {
  return (
    <div className="absolute left-4 top-36 z-20 flex flex-col space-y-2 select-none">
      {/* 2D / 3D Mode Toggle Pill */}
      <div className="bg-slate-900/95 backdrop-blur-md p-1 rounded-2xl shadow-2xl border border-slate-700/80 flex items-center space-x-1">
        <button
          onClick={onToggleViewMode}
          className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
            viewMode === '3d'
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
          title="Switch to 3D Digital Twin Representation"
        >
          <Box className="w-3.5 h-3.5" />
          <span>3D Twin</span>
        </button>

        <button
          onClick={onToggleViewMode}
          className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${
            viewMode === '2d'
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
          title="Switch to 2D Topo GIS Map"
        >
          <Map className="w-3.5 h-3.5" />
          <span>2D GIS</span>
        </button>
      </div>

      {/* 3D Perspective Controls */}
      {viewMode === '3d' && (
        <div className="bg-slate-900/95 backdrop-blur-md rounded-2xl shadow-xl border border-slate-700/80 p-1 flex flex-col divide-y divide-slate-800">
          <button
            onClick={onTogglePerspective}
            className="p-2.5 text-slate-300 hover:text-white hover:bg-slate-800/80 rounded-xl transition-all flex items-center gap-2 text-xs font-bold"
            title="Switch between Isometric 3D Angle & Top-Down Overview"
          >
            <Compass className="w-4 h-4 text-amber-500" />
            <span className="hidden sm:inline">
              {cameraPerspective === 'isometric' ? 'Top-Down View' : 'Isometric 3D'}
            </span>
          </button>

          <button
            onClick={onResetCamera}
            className="p-2.5 text-slate-300 hover:text-white hover:bg-slate-800/80 rounded-xl transition-all flex items-center gap-2 text-xs font-bold"
            title="Reset to Full Campus View"
          >
            <RotateCcw className="w-4 h-4 text-blue-400" />
            <span className="hidden sm:inline">Full Campus</span>
          </button>
        </div>
      )}
    </div>
  );
};
