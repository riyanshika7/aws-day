import React, { useState } from 'react';
import type { 
  Signboard, 
  SignageType, 
  ArrowDirection, 
  SignageStatus, 
  BannerDimension 
} from '../../types/signage';
import { signageStore } from '../../services/signageStore';
import { SignageRenderer } from './SignageRenderer';
import { DirectionalArrow } from './DirectionalArrow';
import { 
  X, 
  Plus, 
  Printer, 
  Edit3, 
  Trash2, 
  Compass, 
  MapPin, 
  CheckCircle2, 
  Building2, 
  Layers, 
  RotateCcw,
  Sliders,
  Sparkles
} from 'lucide-react';

interface SignageAdminPanelProps {
  onClose: () => void;
  onPreviewPrint: (sign: Signboard) => void;
  onSelectSignboardOnMap?: (sign: Signboard) => void;
}

export const SignageAdminPanel: React.FC<SignageAdminPanelProps> = ({
  onClose,
  onPreviewPrint,
  onSelectSignboardOnMap,
}) => {
  const [activeTab, setActiveTab] = useState<'list' | 'editor' | 'venue'>('list');
  const [signboards, setSignboards] = useState<Signboard[]>(signageStore.getSignboards());
  const [eventConfig, setEventConfig] = useState(signageStore.getEventConfig());
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [type, setType] = useState<SignageType>('directional_arrow');
  const [arrowDirection, setArrowDirection] = useState<ArrowDirection>('straight');
  const [locationDescription, setLocationDescription] = useState('');
  const [coordinates, setCoordinates] = useState<[number, number]>([75.53650, 31.39820]);
  const [destinationId, setDestinationId] = useState(eventConfig.activeVenueId);
  const [destinationName, setDestinationName] = useState('Central Seminar Hall');
  const [dimension, setDimension] = useState<BannerDimension>('3x2_feet');
  const [status, setStatus] = useState<SignageStatus>('proposed');
  const [customMessage, setCustomMessage] = useState('');
  const [material, setMaterial] = useState('3mm Rigid Coroplast Board');

  const refreshData = () => {
    setSignboards(signageStore.getSignboards());
    setEventConfig(signageStore.getEventConfig());
  };

  const handleStartCreate = () => {
    const venue = signageStore.getActiveVenue();
    setEditingId(null);
    setTitle('New Campus Directional Board');
    setType('directional_arrow');
    setArrowDirection('straight');
    setLocationDescription('Academic Central Ring Junction');
    setCoordinates([75.53580, 31.39610]);
    setDestinationId(venue.id);
    setDestinationName(venue.name);
    setDimension('3x2_feet');
    setStatus('proposed');
    setCustomMessage('Keynotes & Cloud Workshops Ahead');
    setMaterial('3mm Rigid Coroplast Board');
    setActiveTab('editor');
  };

  const handleStartEdit = (sign: Signboard) => {
    setEditingId(sign.id);
    setTitle(sign.title);
    setType(sign.type);
    setArrowDirection(sign.arrowDirection);
    setLocationDescription(sign.locationDescription);
    setCoordinates(sign.coordinates);
    setDestinationId(sign.destinationId);
    setDestinationName(sign.destinationName);
    setDimension(sign.dimension);
    setStatus(sign.installationStatus);
    setCustomMessage(sign.customMessage || '');
    setMaterial(sign.material || '');
    setActiveTab('editor');
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    const destVenue = eventConfig.candidateVenues.find((v) => v.id === destinationId);
    const resolvedDestName = destVenue ? destVenue.name : destinationName;
    const destCoords = destVenue ? destVenue.coordinates : coordinates;
    const metrics = signageStore.calculateMetrics(coordinates, destCoords);

    if (editingId) {
      signageStore.updateSignboard(editingId, {
        title,
        type,
        arrowDirection,
        locationDescription,
        coordinates,
        destinationId,
        destinationName: resolvedDestName,
        distanceMeters: metrics.distanceMeters,
        estimatedWalkingMinutes: metrics.walkingMinutes,
        dimension,
        installationStatus: status,
        customMessage,
        material
      });
    } else {
      signageStore.addSignboard({
        title,
        locationDescription,
        coordinates,
        type,
        arrowDirection,
        destinationId,
        destinationName: resolvedDestName,
        distanceMeters: metrics.distanceMeters,
        estimatedWalkingMinutes: metrics.walkingMinutes,
        dimension,
        installationStatus: status,
        customMessage,
        material
      });
    }

    refreshData();
    setActiveTab('list');
  };

  const handleDelete = (id: string) => {
    if (confirm(`Remove signboard ${id}?`)) {
      signageStore.deleteSignboard(id);
      refreshData();
    }
  };

  const handleSelectVenue = (venueId: string) => {
    signageStore.setActiveVenue(venueId);
    refreshData();
  };

  const handleResetDefaults = () => {
    if (confirm('Reset all signboards to initial verified AWS SCD 2027 layout?')) {
      signageStore.resetToDefaults();
      refreshData();
    }
  };

  // Preview object for real-time editor preview
  const previewSignboard: Signboard = {
    id: editingId || 'SIGN-PREVIEW',
    title: title || 'Signboard Title',
    locationDescription: locationDescription || 'Campus Location',
    coordinates,
    type,
    arrowDirection,
    destinationId,
    destinationName: destinationName || 'Destination Venue',
    distanceMeters: 120,
    estimatedWalkingMinutes: 2,
    dimension,
    installationStatus: status,
    customMessage,
    material,
    qrUrl: typeof window !== 'undefined' ? `${window.location.origin}/?event=aws-scd-2027` : '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-6xl h-[92vh] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center text-slate-950 font-black text-base shadow-md">
              AWS
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-base sm:text-lg font-bold text-white">
                  AWS SCD 2027 Signage & Wayfinding Studio
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Organizer Admin
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Manage physical signboards, dynamic QR codes, print templates, and modular venue routing.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation & Action Bar */}
        <div className="px-5 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 bg-slate-950/40">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveTab('list')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'list'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Signboards Inventory ({signboards.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('editor')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'editor'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{editingId ? 'Edit Signboard' : 'Signboard Designer'}</span>
            </button>

            <button
              onClick={() => setActiveTab('venue')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'venue'
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>Modular Venue Manager</span>
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleStartCreate}
              className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Signboard</span>
            </button>

            <button
              onClick={handleResetDefaults}
              className="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800"
              title="Reset Signage to Verified Defaults"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab 1: Signboards Inventory */}
        {activeTab === 'list' && (
          <div className="flex-1 overflow-y-auto p-5 space-y-3 bg-slate-950/20">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {signboards.map((sign) => (
                <div
                  key={sign.id}
                  className="bg-slate-900/90 border border-slate-800 hover:border-amber-500/50 rounded-2xl p-4 flex flex-col justify-between space-y-3 transition-all shadow-md group"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-amber-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                        {sign.id}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        sign.installationStatus === 'installed'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : sign.installationStatus === 'in_production'
                          ? 'bg-blue-500/20 text-blue-300'
                          : 'bg-amber-500/20 text-amber-300'
                      }`}>
                        {sign.installationStatus}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-white mt-2 group-hover:text-amber-400 transition-colors">
                      {sign.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-amber-500 shrink-0" />
                      <span className="truncate">{sign.locationDescription}</span>
                    </p>
                  </div>

                  {/* Direction & Destination Info */}
                  <div className="bg-slate-950/80 p-2.5 rounded-xl border border-slate-800 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="p-1.5 bg-slate-800 rounded-lg">
                        <DirectionalArrow direction={sign.arrowDirection} size="sm" variant="orange" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[10px] text-slate-400 block uppercase font-semibold">Destination</span>
                        <span className="text-xs font-bold text-slate-200 truncate block">
                          {sign.destinationName}
                        </span>
                      </div>
                    </div>

                    {sign.distanceMeters !== null && (
                      <span className="text-xs font-bold text-amber-400 bg-slate-800 px-2 py-1 rounded-md">
                        {sign.distanceMeters}m
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-1.5">
                      <button
                        onClick={() => onPreviewPrint(sign)}
                        className="px-2.5 py-1 bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-slate-950 rounded-lg font-bold flex items-center gap-1 transition-all"
                        title="Open Print & PDF Studio"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>Print</span>
                      </button>

                      <button
                        onClick={() => {
                          if (onSelectSignboardOnMap) {
                            onSelectSignboardOnMap(sign);
                            onClose();
                          }
                        }}
                        className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg font-medium flex items-center gap-1"
                        title="Locate on Map"
                      >
                        <Compass className="w-3.5 h-3.5" />
                        <span>View</span>
                      </button>
                    </div>

                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => handleStartEdit(sign)}
                        className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
                        title="Edit Signboard"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(sign.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800"
                        title="Delete Signboard"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Signboard Designer & Form */}
        {activeTab === 'editor' && (
          <div className="flex-1 overflow-y-auto p-5 grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-950/20">
            {/* Form Column */}
            <form onSubmit={handleSaveForm} className="space-y-4 bg-slate-900 p-5 rounded-2xl border border-slate-800">
              <h3 className="text-sm font-bold text-white flex items-center gap-1.5 border-b border-slate-800 pb-2.5">
                <Sliders className="w-4 h-4 text-amber-500" />
                <span>{editingId ? `Edit ${editingId}` : 'Design New Signboard'}</span>
              </h3>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Signboard Title
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Main Gate Welcome & Event Directions"
                  className="w-full bg-slate-950 text-xs text-white rounded-xl p-2.5 border border-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Signboard Template Type
                  </label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as SignageType)}
                    className="w-full bg-slate-950 text-xs text-white rounded-xl p-2.5 border border-slate-800 focus:outline-none"
                  >
                    <option value="entrance_welcome">Entrance Welcome Banner</option>
                    <option value="directional_arrow">Directional Arrow Board</option>
                    <option value="junction_sign">Campus Junction Sign</option>
                    <option value="venue_arrival">Venue Arrival Banner</option>
                    <option value="registration_checkin">Registration & Speaker Totem</option>
                    <option value="parking_accessibility">Parking & Accessibility Sign</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Directional Arrow
                  </label>
                  <select
                    value={arrowDirection}
                    onChange={(e) => setArrowDirection(e.target.value as ArrowDirection)}
                    className="w-full bg-slate-950 text-xs text-white rounded-xl p-2.5 border border-slate-800 focus:outline-none"
                  >
                    <option value="straight">Straight Ahead (↑)</option>
                    <option value="slight_right">Slight Right (↗)</option>
                    <option value="slight_left">Slight Left (↖)</option>
                    <option value="right">Sharp Right (→)</option>
                    <option value="left">Sharp Left (←)</option>
                    <option value="u_turn">U-Turn (↵)</option>
                    <option value="none">None (Arrival Banner)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Target Destination (Modular Venue Selector)
                </label>
                <select
                  value={destinationId}
                  onChange={(e) => {
                    setDestinationId(e.target.value);
                    const found = eventConfig.candidateVenues.find((v) => v.id === e.target.value);
                    if (found) setDestinationName(found.name);
                  }}
                  className="w-full bg-slate-950 text-xs text-white rounded-xl p-2.5 border border-slate-800 focus:outline-none"
                >
                  {eventConfig.candidateVenues.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.name} (Capacity: {v.capacity}) {v.isConfirmed ? '⭐ Confirmed' : ''}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Location Description on Campus
                </label>
                <input
                  type="text"
                  required
                  value={locationDescription}
                  onChange={(e) => setLocationDescription(e.target.value)}
                  placeholder="e.g. Near Shopping Centre & Canara Bank Circle"
                  className="w-full bg-slate-950 text-xs text-white rounded-xl p-2.5 border border-slate-800 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Print Banner Dimension
                  </label>
                  <select
                    value={dimension}
                    onChange={(e) => setDimension(e.target.value as BannerDimension)}
                    className="w-full bg-slate-950 text-xs text-white rounded-xl p-2.5 border border-slate-800 focus:outline-none"
                  >
                    <option value="6x3_feet">6 ft × 3 ft Outdoor Vinyl</option>
                    <option value="4x2_feet">4 ft × 2 ft Directional Vinyl</option>
                    <option value="3x2_feet">3 ft × 2 ft Coroplast Board</option>
                    <option value="2.5x6_feet">2.5 ft × 6 ft Roll-up Standee</option>
                    <option value="a3_kiosk">A3 Post Kiosk Sign</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Installation Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as SignageStatus)}
                    className="w-full bg-slate-950 text-xs text-white rounded-xl p-2.5 border border-slate-800 focus:outline-none"
                  >
                    <option value="proposed">Proposed Location</option>
                    <option value="in_production">In Production / Printing</option>
                    <option value="installed">Physically Installed</option>
                    <option value="inspected">Quality Inspected</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">
                  Custom Headline / Wayfinding Message
                </label>
                <input
                  type="text"
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  placeholder="e.g. Follow Promenade to Main Hall Registration"
                  className="w-full bg-slate-950 text-xs text-white rounded-xl p-2.5 border border-slate-800 focus:outline-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('list')}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-bold hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl text-xs font-black shadow-md"
                >
                  Save Signboard
                </button>
              </div>
            </form>

            {/* Live Design Preview Column */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Live Design Preview (Instant High-Fidelity)
                </h4>
                <span className="text-[10px] text-amber-400 font-mono">
                  {type}
                </span>
              </div>
              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 shadow-inner flex items-center justify-center overflow-x-auto">
                <SignageRenderer signboard={previewSignboard} />
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Modular Venue Manager */}
        {activeTab === 'venue' && (
          <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-950/20">
            <div className="max-w-2xl mx-auto space-y-4">
              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-2xl">
                <h3 className="text-sm font-bold text-amber-300 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Modular Event Venue Switcher</span>
                </h3>
                <p className="text-xs text-slate-300 mt-1">
                  Because the final venue might change before February 2027, switching the confirmed venue here automatically recomputes distances, bearings, directions, and QR links for all signboards across campus without manual rework.
                </p>
              </div>

              <div className="space-y-3">
                {eventConfig.candidateVenues.map((venue) => {
                  const isSelected = venue.id === eventConfig.activeVenueId;
                  return (
                    <div
                      key={venue.id}
                      onClick={() => handleSelectVenue(venue.id)}
                      className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'bg-amber-500/10 border-amber-500 shadow-lg'
                          : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="text-base font-bold text-white">
                            {venue.name}
                          </h4>
                          {isSelected && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-500 text-slate-950">
                              ACTIVE CONFIRMED VENUE
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-400">
                          {venue.description}
                        </p>
                        <div className="flex items-center gap-3 text-[11px] text-slate-500 pt-1">
                          <span>Seating Capacity: {venue.capacity} attendees</span>
                          <span>•</span>
                          <span className="font-mono">{venue.coordinates[1].toFixed(5)}° N, {venue.coordinates[0].toFixed(5)}° E</span>
                        </div>
                      </div>

                      <div className="pl-4">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          isSelected ? 'border-amber-500 bg-amber-500 text-slate-950' : 'border-slate-600'
                        }`}>
                          {isSelected && <CheckCircle2 className="w-4 h-4" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
