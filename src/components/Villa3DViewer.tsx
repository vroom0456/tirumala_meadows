import { useState } from 'react'
import {
  Layers,
  Compass,
  Eye,
  Maximize2,
  Sparkles,
  Sun,
  Ruler,
  Navigation,
  ArrowRight,
  Check,
  RotateCw,
  Box,
  ShieldCheck,
  ExternalLink,
  ChevronRight,
  Home,
  CheckCircle2,
  Layers3
} from 'lucide-react'

type ViewMode = '3d-model' | 'cad-plan' | 'walkthrough'
type FloorLevel = 'ground' | 'first' | 'terrace'

interface RoomData {
  id: string
  name: string
  area: string
  dim: string
  spec: string
  vastu: string
  doorTag: string
  windowTag: string
  image: string
}

const villa3DModels = [
  {
    id: 'pool-villa',
    name: 'Palatial Villa with Pool',
    tag: 'Signature 4BHK',
    embedId: '579249e48fc942b79405cc39224cccb8',
    description: 'Modern luxury double-story villa with private swimming pool, glass facades, and cantilevered sun decks.',
  },
  {
    id: 'contemporary-duplex',
    name: 'Two-Story Contemporary Villa',
    tag: 'Premium 3/4BHK',
    embedId: 'ae33c782f5b44c1e83007f3de950d0c7',
    description: 'Clean geometric lines, expansive double-height windows, covered portico, and rooftop garden deck.',
  },
  {
    id: 'modern-house',
    name: 'Modern Geometric Residence',
    tag: 'Executive Villa',
    embedId: 'ececbc0627d54471880ae442ef61fc47',
    description: 'Architectural residential house featuring open-plan daylight spaces and manicured landscaped grounds.',
  },
]

const floorRooms: Record<FloorLevel, RoomData[]> = {
  ground: [
    {
      id: 'living',
      name: 'Grand Reception Living Lounge',
      area: '252 sq.ft',
      dim: '18\'0" × 14\'0"',
      spec: 'Italian-finish polished marble, double-height void, ceiling-recessed cove lighting',
      vastu: 'North & East open light alignment',
      doorTag: 'D1 (Teak Wood)',
      windowTag: 'W1 (UPVC Double Glazed)',
      image: '/portfolio/jubilee-hills-facade-dusk.jpg',
    },
    {
      id: 'puja',
      name: 'East-Facing Puja Sanctuary',
      area: '30 sq.ft',
      dim: '6\'0" × 5\'0"',
      spec: 'Seasoned Indian Teak frame with carved brass trims & marble altar',
      vastu: 'Ishan (North-East sacred quadrant)',
      doorTag: 'D2 (Carved Teak)',
      windowTag: 'W2 (Louvered Vent)',
      image: '/portfolio/jubilee-hills-regal-estate.jpg',
    },
    {
      id: 'dining_kitchen',
      name: 'Modular Granite Kitchen & Dining',
      area: '180 sq.ft',
      dim: '15\'0" × 12\'0"',
      spec: 'Black Galaxy granite counters, 7ft glazed tile dadoing, stainless sink & wet yard',
      vastu: 'Agneya (South-East fire zone)',
      doorTag: 'D3 (Flush Door)',
      windowTag: 'W3 (Granite Sill Window)',
      image: '/portfolio/contemporary-villa-daylight.jpg',
    },
    {
      id: 'parent_suite',
      name: 'Ground Floor Parent Suite',
      area: '156 sq.ft',
      dim: '13\'0" × 12\'0"',
      spec: 'Zero-threshold step-free entry, attached bath with anti-skid ceramic tiling',
      vastu: 'Morning East daylight for wellness',
      doorTag: 'D2 (Teak Frame)',
      windowTag: 'W1 (Panoramic Window)',
      image: '/portfolio/modern-minimalist-villa-night.jpg',
    },
    {
      id: 'portico',
      name: 'Covered Car Portico & Driveway',
      area: '252 sq.ft',
      dim: '14\'0" × 18\'0"',
      spec: 'Heavy-duty interlocking pavers, EV charging point pre-wired, automated gate sensor',
      vastu: 'North-West driveway ingress',
      doorTag: 'Main Gate',
      windowTag: 'Open Eaves',
      image: '/portfolio/premium-apartments-tower.jpg',
    },
  ],
  first: [
    {
      id: 'master',
      name: 'King Master Bedroom Suite',
      area: '240 sq.ft',
      dim: '16\'0" × 15\'0"',
      spec: 'Vitrified wood-finish flooring, walk-in dressing alcove & five-fixture luxury bath',
      vastu: 'Nairuthi (South-West master grounding)',
      doorTag: 'D2 (Teak Frame)',
      windowTag: 'W1 (Balcony Slider)',
      image: '/portfolio/jubilee-hills-facade-dusk.jpg',
    },
    {
      id: 'balcony',
      name: 'Private Sit-Out Balcony',
      area: '84 sq.ft',
      dim: '14\'0" × 6\'0"',
      spec: 'Toughened glass railings with 316-grade stainless steel balustrade',
      vastu: 'North-East open sky view',
      doorTag: 'D1 (Sliding UPVC)',
      windowTag: 'W1 (Open View)',
      image: '/portfolio/contemporary-villa-daylight.jpg',
    },
    {
      id: 'family_lounge',
      name: 'First Floor Family Lounge',
      area: '168 sq.ft',
      dim: '14\'0" × 12\'0"',
      spec: 'Acoustic wall paneling, informal library seating, overlook to ground living void',
      vastu: 'Central Brahmasthan light well',
      doorTag: 'Open Archway',
      windowTag: 'W2 (Corner Window)',
      image: '/portfolio/modern-minimalist-villa-night.jpg',
    },
    {
      id: 'guest_suite',
      name: 'Executive Guest Suite',
      area: '144 sq.ft',
      dim: '12\'0" × 12\'0"',
      spec: 'Attached en-suite bathroom with Grohe/Kohler sanitaryware fittings',
      vastu: 'Vayu (North-West cross ventilation)',
      doorTag: 'D2 (Teak Frame)',
      windowTag: 'W2 (UPVC Slider)',
      image: '/portfolio/jubilee-hills-regal-estate.jpg',
    },
  ],
  terrace: [
    {
      id: 'terrace_lounge',
      name: 'Open-Air Sky Party Terrace',
      area: '420 sq.ft',
      dim: 'Full Rooftop',
      spec: 'Waterproofed multi-layer ceramic tiles, perimeter parapet & party pergola with pantry counter',
      vastu: 'Unobstructed 360° solar prana absorption',
      doorTag: 'D1 (Weatherproof)',
      windowTag: 'Open Sky',
      image: '/portfolio/premium-apartments-tower.jpg',
    },
  ],
}

export default function Villa3DViewer() {
  const [mode, setMode] = useState<ViewMode>('3d-model')
  const [selected3DModel, setSelected3DModel] = useState(villa3DModels[0])
  const [floor, setFloor] = useState<FloorLevel>('ground')
  const [selectedRoom, setSelectedRoom] = useState<RoomData>(floorRooms.ground[0])
  const [showColumns, setShowColumns] = useState(true)
  const [showDimensions, setShowDimensions] = useState(true)
  const [showVastuGrid, setShowVastuGrid] = useState(true)

  const currentRooms = floorRooms[floor]

  return (
    <div className="rounded-3xl border border-stone-200 bg-white shadow-corporate overflow-hidden">
      
      {/* ─── Top Control Toolbar (Clean, Apple-grade Precision) ─── */}
      <div className="border-b border-stone-200 bg-ivory p-3 sm:p-4 flex flex-wrap items-center justify-between gap-3">
        
        {/* Mode Switcher */}
        <div className="flex items-center gap-1 p-1 rounded-full bg-white border border-stone-200 shadow-2xs w-full sm:w-auto">
          <button
            onClick={() => setMode('3d-model')}
            className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition ${
              mode === '3d-model'
                ? 'bg-navy text-white shadow-xs'
                : 'text-stone-700 hover:text-navy'
            }`}
          >
            <Box className="h-3.5 w-3.5 text-brandLogo-red" />
            <span>3D House View</span>
          </button>

          <button
            onClick={() => setMode('cad-plan')}
            className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition ${
              mode === 'cad-plan'
                ? 'bg-navy text-white shadow-xs'
                : 'text-stone-700 hover:text-navy'
            }`}
          >
            <Layers className="h-3.5 w-3.5 text-brandLogo-blue" />
            <span>2D CAD Blueprint</span>
          </button>

          <button
            onClick={() => setMode('walkthrough')}
            className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition ${
              mode === 'walkthrough'
                ? 'bg-navy text-white shadow-xs'
                : 'text-stone-700 hover:text-navy'
            }`}
          >
            <Eye className="h-3.5 w-3.5 text-brandLogo-green" />
            <span>Room Walkthrough</span>
          </button>
        </div>

        {/* Right Toolbar Controls */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
          
          {/* 3D Model Picker (Shown in 3D Mode) */}
          {mode === '3d-model' && (
            <div className="flex items-center gap-1 p-0.5 rounded-full bg-white border border-stone-200 shadow-2xs">
              {villa3DModels.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setSelected3DModel(m)}
                  className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider transition ${
                    selected3DModel.id === m.id
                      ? 'bg-forest text-ivory shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                  title={m.description}
                >
                  {m.tag}
                </button>
              ))}
            </div>
          )}

          {/* Floor Level Selector (Shown in CAD & Walkthrough Modes) */}
          {mode !== '3d-model' && (
            <div className="flex items-center gap-1 p-0.5 rounded-full bg-white border border-stone-200 shadow-2xs">
              {(['ground', 'first', 'terrace'] as FloorLevel[]).map((f) => (
                <button
                  key={f}
                  onClick={() => {
                    setFloor(f)
                    setSelectedRoom(floorRooms[f][0])
                  }}
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider transition ${
                    floor === f
                      ? 'bg-forest text-ivory shadow-xs'
                      : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {f === 'ground' ? 'Ground Fl.' : f === 'first' ? '1st Floor' : 'Terrace'}
                </button>
              ))}
            </div>
          )}

          {/* CAD Layer Toggles */}
          {mode === 'cad-plan' && (
            <div className="hidden md:flex items-center gap-1.5">
              <button
                onClick={() => setShowColumns(!showColumns)}
                className={`px-2.5 py-1 rounded-full text-[11px] font-bold border transition ${
                  showColumns
                    ? 'bg-forest text-ivory border-forest'
                    : 'bg-white text-stone-700 border-stone-200'
                }`}
              >
                Columns
              </button>
              <button
                onClick={() => setShowDimensions(!showDimensions)}
                className={`px-2.5 py-1 rounded-full text-[11px] font-bold border transition ${
                  showDimensions
                    ? 'bg-forest text-ivory border-forest'
                    : 'bg-white text-stone-700 border-stone-200'
                }`}
              >
                Dimensions
              </button>
              <button
                onClick={() => setShowVastuGrid(!showVastuGrid)}
                className={`px-2.5 py-1 rounded-full text-[11px] font-bold border transition ${
                  showVastuGrid
                    ? 'bg-forest text-ivory border-forest'
                    : 'bg-white text-stone-700 border-stone-200'
                }`}
              >
                Vastu Grid
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ─── Main Viewer Stage ─── */}
      <div className="relative min-h-[500px] sm:min-h-[560px] bg-[#0A131F] overflow-hidden flex items-center justify-center p-2 sm:p-4">
        
        {/* ═════════════════════════════════════════════════════════════ */}
        {/* MODE 1: INTERACTIVE 3D VILLA HOUSE MODEL                     */}
        {/* ═════════════════════════════════════════════════════════════ */}
        {mode === '3d-model' && (
          <div className="relative w-full h-[500px] sm:h-[560px] rounded-2xl overflow-hidden bg-black flex flex-col">
            {/* Live Interactive 3D Villa House Model (Real architectural building embed) */}
            <iframe
              key={selected3DModel.embedId}
              title={`Tirumala Meadows ${selected3DModel.name}`}
              src={`https://sketchfab.com/models/${selected3DModel.embedId}/embed?autostart=1&autospin=0.15&ui_controls=1&ui_infos=0&ui_watermark=0&ui_hint=2`}
              className="w-full h-full border-0"
              allow="autoplay; fullscreen; vr"
              allowFullScreen
            />

            {/* Floating 3D Navigation HUD */}
            <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-xs font-bold text-white flex items-center gap-2 pointer-events-none">
              <RotateCw className="h-3.5 w-3.5 text-brandLogo-red animate-spin-slow" />
              <span>{selected3DModel.name} · Click & Drag to Orbit 360°</span>
            </div>

            <div className="absolute bottom-3 left-3 hidden sm:flex items-center gap-2 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-[11px] font-medium text-white/90 pointer-events-none">
              <span>Scroll to Zoom · Right Click to Pan</span>
            </div>

            <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 text-[11px] font-bold text-white pointer-events-none">
              {selected3DModel.tag}
            </div>
          </div>
        )}

        {/* ═════════════════════════════════════════════════════════════ */}
        {/* MODE 2: AUTHENTIC ARCHITECTURAL 2D CAD BLUEPRINT             */}
        {/* ═════════════════════════════════════════════════════════════ */}
        {mode === 'cad-plan' && (
          <div className="relative w-full max-w-4xl rounded-2xl bg-[#07101E] border-2 border-cyan-500/40 p-4 sm:p-6 shadow-2xl font-mono text-cyan-400 overflow-hidden">
            
            {/* Blueprint Grid Watermark Background */}
            <div className="absolute inset-0 bg-[radial-gradient(#1E3A5F_1px,transparent_1px)] [background-size:20px_20px] opacity-50 pointer-events-none" />

            {/* CAD Header Banner */}
            <div className="relative flex flex-wrap items-center justify-between border-b border-cyan-500/40 pb-2.5 mb-4 text-[10px] sm:text-xs text-cyan-300 font-bold uppercase tracking-widest gap-2">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                <span>DWG NO: TM-HYD-V4-{floor.toUpperCase()}</span>
              </div>
              <span>ORIENTATION: EAST FACING (100% VASTU)</span>
              <span>SCALE: 1:100 (MM / FT-IN)</span>
            </div>

            {/* Architectural SVG Plan Blueprint */}
            <div className="relative w-full overflow-x-auto py-2">
              <svg
                viewBox="0 0 800 520"
                className="w-full h-auto min-w-[620px] select-none"
              >
                {/* Outer Dimension Annotations */}
                {showDimensions && (
                  <g className="text-cyan-300 text-[11px] font-mono">
                    {/* Top Width Dimension 36'-0" */}
                    <line x1="80" y1="30" x2="720" y2="30" stroke="#06B6D4" strokeWidth="1.5" strokeDasharray="3 3" />
                    <line x1="80" y1="22" x2="80" y2="38" stroke="#06B6D4" strokeWidth="2" />
                    <line x1="720" y1="22" x2="720" y2="38" stroke="#06B6D4" strokeWidth="2" />
                    <rect x="340" y="18" width="120" height="22" rx="4" fill="#07101E" stroke="#06B6D4" strokeWidth="1" />
                    <text x="400" y="34" fill="#67E8F9" textAnchor="middle" fontWeight="bold">↔ WIDTH: 36'-0" [10,970 mm]</text>

                    {/* Left Height Dimension 55'-0" */}
                    <line x1="45" y1="60" x2="45" y2="480" stroke="#06B6D4" strokeWidth="1.5" strokeDasharray="3 3" />
                    <line x1="37" y1="60" x2="53" y2="60" stroke="#06B6D4" strokeWidth="2" />
                    <line x1="37" y1="480" x2="53" y2="480" stroke="#06B6D4" strokeWidth="2" />
                    <text x="25" y="275" fill="#67E8F9" textAnchor="middle" transform="rotate(-90 25 275)" fontWeight="bold">
                      ↕ DEPTH: 55'-0" [16,760 mm]
                    </text>
                  </g>
                )}

                {/* Vastu Mandala Directional Zones */}
                {showVastuGrid && (
                  <g opacity="0.18">
                    <line x1="80" y1="270" x2="720" y2="270" stroke="#F59E0B" strokeWidth="1" strokeDasharray="4 4" />
                    <line x1="400" y1="60" x2="400" y2="480" stroke="#F59E0B" strokeWidth="1" strokeDasharray="4 4" />
                    <text x="700" y="80" fill="#FBBF24" fontSize="10" textAnchor="end" fontWeight="bold">ISHAN (NE) · SACRED</text>
                    <text x="700" y="470" fill="#FBBF24" fontSize="10" textAnchor="end" fontWeight="bold">AGNEYA (SE) · FIRE/KITCHEN</text>
                    <text x="100" y="470" fill="#FBBF24" fontSize="10" textAnchor="start" fontWeight="bold">NAIRUTHI (SW) · MASTER</text>
                    <text x="100" y="80" fill="#FBBF24" fontSize="10" textAnchor="start" fontWeight="bold">VAYAVYA (NW) · AIR</text>
                  </g>
                )}

                {/* Outer Perimeter Foundation Wall (Double-line architectural hatch) */}
                <rect x="80" y="60" width="640" height="420" fill="none" stroke="#0891B2" strokeWidth="6" rx="2" />
                <rect x="86" y="66" width="628" height="408" fill="#0A182E" stroke="#06B6D4" strokeWidth="1" />

                {/* ── GROUND FLOOR ROOMS ── */}
                {floor === 'ground' && (
                  <g>
                    {/* Zone 1: Portico / Driveway (Top Left NW) */}
                    <g
                      onClick={() => setSelectedRoom(floorRooms.ground[4])}
                      className="cursor-pointer transition-all"
                    >
                      <rect
                        x="90" y="70" width="280" height="180"
                        fill={selectedRoom.id === 'portico' ? 'rgba(197, 168, 128, 0.25)' : 'rgba(14, 116, 144, 0.12)'}
                        stroke={selectedRoom.id === 'portico' ? '#C5A880' : '#0891B2'}
                        strokeWidth={selectedRoom.id === 'portico' ? '2.5' : '1.5'}
                        strokeDasharray="4 2"
                      />
                      <text x="230" y="140" fill={selectedRoom.id === 'portico' ? '#FBBF24' : '#67E8F9'} textAnchor="middle" fontSize="13" fontWeight="bold">
                        COVERED CAR PORTICO
                      </text>
                      <text x="230" y="160" fill="#94A3B8" textAnchor="middle" fontSize="11">14'0" × 18'0" (Pavers)</text>
                      <text x="230" y="180" fill="#38BDF8" textAnchor="middle" fontSize="10">GATEWAY / EV READY</text>
                    </g>

                    {/* Zone 2: Grand Reception Living Lounge (Center & NE) */}
                    <g
                      onClick={() => setSelectedRoom(floorRooms.ground[0])}
                      className="cursor-pointer transition-all"
                    >
                      <rect
                        x="374" y="70" width="240" height="220"
                        fill={selectedRoom.id === 'living' ? 'rgba(197, 168, 128, 0.25)' : 'rgba(15, 23, 42, 0.7)'}
                        stroke={selectedRoom.id === 'living' ? '#C5A880' : '#06B6D4'}
                        strokeWidth={selectedRoom.id === 'living' ? '2.5' : '1.5'}
                      />
                      <text x="494" y="160" fill={selectedRoom.id === 'living' ? '#FBBF24' : '#FFFFFF'} textAnchor="middle" fontSize="13" fontWeight="bold">
                        GRAND LIVING LOUNGE
                      </text>
                      <text x="494" y="180" fill="#94A3B8" textAnchor="middle" fontSize="11">18'0" × 14'0" (Marble)</text>
                      <text x="494" y="200" fill="#34D399" textAnchor="middle" fontSize="10">DOUBLE HEIGHT VOID</text>
                    </g>

                    {/* Zone 3: East Puja Sanctuary (Top Right NE) */}
                    <g
                      onClick={() => setSelectedRoom(floorRooms.ground[1])}
                      className="cursor-pointer transition-all"
                    >
                      <rect
                        x="618" y="70" width="92" height="110"
                        fill={selectedRoom.id === 'puja' ? 'rgba(197, 168, 128, 0.35)' : 'rgba(245, 158, 11, 0.15)'}
                        stroke={selectedRoom.id === 'puja' ? '#C5A880' : '#F59E0B'}
                        strokeWidth={selectedRoom.id === 'puja' ? '2.5' : '1.5'}
                      />
                      <text x="664" y="120" fill={selectedRoom.id === 'puja' ? '#FBBF24' : '#FCD34D'} textAnchor="middle" fontSize="11" fontWeight="bold">
                        PUJA
                      </text>
                      <text x="664" y="136" fill="#FDE68A" textAnchor="middle" fontSize="9">6'0" × 5'0"</text>
                      <text x="664" y="150" fill="#34D399" textAnchor="middle" fontSize="8">ISHAN 100%</text>
                    </g>

                    {/* Zone 4: Parent Suite Bedroom (Bottom Left SW) */}
                    <g
                      onClick={() => setSelectedRoom(floorRooms.ground[3])}
                      className="cursor-pointer transition-all"
                    >
                      <rect
                        x="90" y="254" width="280" height="216"
                        fill={selectedRoom.id === 'parent_suite' ? 'rgba(197, 168, 128, 0.25)' : 'rgba(15, 23, 42, 0.7)'}
                        stroke={selectedRoom.id === 'parent_suite' ? '#C5A880' : '#06B6D4'}
                        strokeWidth={selectedRoom.id === 'parent_suite' ? '2.5' : '1.5'}
                      />
                      <text x="230" y="340" fill={selectedRoom.id === 'parent_suite' ? '#FBBF24' : '#FFFFFF'} textAnchor="middle" fontSize="13" fontWeight="bold">
                        PARENT BEDROOM SUITE
                      </text>
                      <text x="230" y="360" fill="#94A3B8" textAnchor="middle" fontSize="11">13'0" × 12'0" + Bath</text>
                      <text x="230" y="380" fill="#38BDF8" textAnchor="middle" fontSize="10">STEP-FREE ACCESS</text>
                    </g>

                    {/* Zone 5: Modular Granite Kitchen & Dining (Bottom Right SE) */}
                    <g
                      onClick={() => setSelectedRoom(floorRooms.ground[2])}
                      className="cursor-pointer transition-all"
                    >
                      <rect
                        x="374" y="294" width="336" height="176"
                        fill={selectedRoom.id === 'dining_kitchen' ? 'rgba(197, 168, 128, 0.25)' : 'rgba(15, 23, 42, 0.7)'}
                        stroke={selectedRoom.id === 'dining_kitchen' ? '#C5A880' : '#06B6D4'}
                        strokeWidth={selectedRoom.id === 'dining_kitchen' ? '2.5' : '1.5'}
                      />
                      <text x="542" y="365" fill={selectedRoom.id === 'dining_kitchen' ? '#FBBF24' : '#FFFFFF'} textAnchor="middle" fontSize="13" fontWeight="bold">
                        KITCHEN & DINING
                      </text>
                      <text x="542" y="385" fill="#94A3B8" textAnchor="middle" fontSize="11">15'0" × 12'0" (Black Galaxy Granite)</text>
                      <text x="542" y="405" fill="#F87171" textAnchor="middle" fontSize="10">AGNEYA FIRE QUADRANT</text>
                    </g>
                  </g>
                )}

                {/* ── FIRST FLOOR ROOMS ── */}
                {floor === 'first' && (
                  <g>
                    {/* Master Bedroom (SW) */}
                    <g
                      onClick={() => setSelectedRoom(floorRooms.first[0])}
                      className="cursor-pointer transition-all"
                    >
                      <rect
                        x="90" y="70" width="360" height="240"
                        fill={selectedRoom.id === 'master' ? 'rgba(197, 168, 128, 0.25)' : 'rgba(15, 23, 42, 0.7)'}
                        stroke={selectedRoom.id === 'master' ? '#C5A880' : '#06B6D4'}
                        strokeWidth={selectedRoom.id === 'master' ? '2.5' : '1.5'}
                      />
                      <text x="270" y="170" fill={selectedRoom.id === 'master' ? '#FBBF24' : '#FFFFFF'} textAnchor="middle" fontSize="13" fontWeight="bold">
                        KING MASTER BEDROOM
                      </text>
                      <text x="270" y="190" fill="#94A3B8" textAnchor="middle" fontSize="11">16'0" × 15'0" (Wood Finish)</text>
                      <text x="270" y="210" fill="#34D399" textAnchor="middle" fontSize="10">WALK-IN DRESSING & BATH</text>
                    </g>

                    {/* Sit-Out Balcony (East/Front) */}
                    <g
                      onClick={() => setSelectedRoom(floorRooms.first[1])}
                      className="cursor-pointer transition-all"
                    >
                      <rect
                        x="454" y="70" width="256" height="120"
                        fill={selectedRoom.id === 'balcony' ? 'rgba(197, 168, 128, 0.25)' : 'rgba(14, 116, 144, 0.15)'}
                        stroke={selectedRoom.id === 'balcony' ? '#C5A880' : '#0891B2'}
                        strokeWidth={selectedRoom.id === 'balcony' ? '2.5' : '1.5'}
                      />
                      <text x="582" y="125" fill={selectedRoom.id === 'balcony' ? '#FBBF24' : '#67E8F9'} textAnchor="middle" fontSize="12" fontWeight="bold">
                        PANORAMIC BALCONY
                      </text>
                      <text x="582" y="145" fill="#94A3B8" textAnchor="middle" fontSize="10">14'0" × 6'0" (Toughened Glass)</text>
                    </g>

                    {/* Family Lounge (Center) */}
                    <g
                      onClick={() => setSelectedRoom(floorRooms.first[2])}
                      className="cursor-pointer transition-all"
                    >
                      <rect
                        x="90" y="314" width="310" height="156"
                        fill={selectedRoom.id === 'family_lounge' ? 'rgba(197, 168, 128, 0.25)' : 'rgba(15, 23, 42, 0.7)'}
                        stroke={selectedRoom.id === 'family_lounge' ? '#C5A880' : '#06B6D4'}
                        strokeWidth={selectedRoom.id === 'family_lounge' ? '2.5' : '1.5'}
                      />
                      <text x="245" y="385" fill={selectedRoom.id === 'family_lounge' ? '#FBBF24' : '#FFFFFF'} textAnchor="middle" fontSize="12" fontWeight="bold">
                        FAMILY MEDIA LOUNGE
                      </text>
                      <text x="245" y="405" fill="#94A3B8" textAnchor="middle" fontSize="10">14'0" × 12'0" (Acoustic Study)</text>
                    </g>

                    {/* Guest Bedroom Suite 2 */}
                    <g
                      onClick={() => setSelectedRoom(floorRooms.first[3])}
                      className="cursor-pointer transition-all"
                    >
                      <rect
                        x="404" y="194" width="306" height="276"
                        fill={selectedRoom.id === 'guest_suite' ? 'rgba(197, 168, 128, 0.25)' : 'rgba(15, 23, 42, 0.7)'}
                        stroke={selectedRoom.id === 'guest_suite' ? '#C5A880' : '#06B6D4'}
                        strokeWidth={selectedRoom.id === 'guest_suite' ? '2.5' : '1.5'}
                      />
                      <text x="557" y="325" fill={selectedRoom.id === 'guest_suite' ? '#FBBF24' : '#FFFFFF'} textAnchor="middle" fontSize="12" fontWeight="bold">
                        GUEST BEDROOM SUITE
                      </text>
                      <text x="557" y="345" fill="#94A3B8" textAnchor="middle" fontSize="10">12'0" × 12'0" + Bath</text>
                    </g>
                  </g>
                )}

                {/* ── TERRACE LEVEL ── */}
                {floor === 'terrace' && (
                  <g>
                    <g
                      onClick={() => setSelectedRoom(floorRooms.terrace[0])}
                      className="cursor-pointer transition-all"
                    >
                      <rect
                        x="90" y="70" width="620" height="400"
                        fill={selectedRoom.id === 'terrace_lounge' ? 'rgba(197, 168, 128, 0.25)' : 'rgba(14, 116, 144, 0.12)'}
                        stroke={selectedRoom.id === 'terrace_lounge' ? '#C5A880' : '#06B6D4'}
                        strokeWidth="2"
                        strokeDasharray="6 3"
                      />
                      <text x="400" y="240" fill={selectedRoom.id === 'terrace_lounge' ? '#FBBF24' : '#FFFFFF'} textAnchor="middle" fontSize="16" fontWeight="bold">
                        OPEN-AIR SKY PARTY TERRACE & SOLAR PERGOLA
                      </text>
                      <text x="400" y="270" fill="#94A3B8" textAnchor="middle" fontSize="12">420 sq.ft Private Open Rooftop</text>
                      <text x="400" y="295" fill="#34D399" textAnchor="middle" fontSize="11">Waterproofed Ceramic Flooring · Unobstructed Horizon Vista</text>
                    </g>
                  </g>
                )}

                {/* Architectural Column Markers (RCC C1 - C8) */}
                {showColumns && (
                  <g>
                    {[
                      { x: 80, y: 60, id: 'C1' },
                      { x: 368, y: 60, id: 'C2' },
                      { x: 612, y: 60, id: 'C3' },
                      { x: 714, y: 60, id: 'C4' },
                      { x: 80, y: 264, id: 'C5' },
                      { x: 368, y: 264, id: 'C6' },
                      { x: 714, y: 264, id: 'C7' },
                      { x: 80, y: 474, id: 'C8' },
                      { x: 368, y: 474, id: 'C9' },
                      { x: 714, y: 474, id: 'C10' },
                    ].map((col) => (
                      <g key={col.id}>
                        <rect x={col.x - 6} y={col.y - 6} width="12" height="12" fill="#F59E0B" stroke="#000" strokeWidth="1" />
                        <text x={col.x} y={col.y + 3} fill="#000" fontSize="7" fontWeight="bold" textAnchor="middle">{col.id}</text>
                      </g>
                    ))}
                  </g>
                )}

                {/* Compass Rose Indicator (North Facing Marker) */}
                <g transform="translate(735, 110)">
                  <circle cx="0" cy="0" r="18" fill="#0A182E" stroke="#06B6D4" strokeWidth="1.5" />
                  <polygon points="0,-14 5,2 0,0 -5,2" fill="#EF4444" />
                  <polygon points="0,14 5,0 0,0 -5,0" fill="#94A3B8" />
                  <text x="0" y="-18" fill="#EF4444" fontSize="9" fontWeight="bold" textAnchor="middle">N</text>
                </g>
              </svg>
            </div>

            {/* Click to inspect helper */}
            <div className="mt-3 pt-2.5 border-t border-cyan-500/30 flex items-center justify-between text-[11px] text-cyan-300">
              <span>💡 Click any zone on the blueprint to view engineering specs below</span>
              <span className="font-bold text-white">ACTIVE: {selectedRoom.name}</span>
            </div>
          </div>
        )}

        {/* ═════════════════════════════════════════════════════════════ */}
        {/* MODE 3: HIGH-DEFINITION ROOM WALKTHROUGH                     */}
        {/* ═════════════════════════════════════════════════════════════ */}
        {mode === 'walkthrough' && (
          <div className="relative w-full max-w-4xl h-[500px] sm:h-[560px] rounded-2xl overflow-hidden bg-black shadow-2xl flex flex-col justify-between">
            {/* Visual Photographic Plate */}
            <img
              src={selectedRoom.image}
              alt={selectedRoom.name}
              className="absolute inset-0 w-full h-full object-cover filter brightness-95 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/40" />

            {/* Top Walkthrough Info Tag */}
            <div className="relative z-10 p-4 sm:p-5 flex items-center justify-between">
              <div className="inline-flex items-center gap-2 rounded-full bg-black/60 backdrop-blur-md px-3.5 py-1 text-xs font-bold text-white border border-white/20">
                <Compass className="h-3.5 w-3.5 text-brandLogo-red" />
                <span>{selectedRoom.vastu}</span>
              </div>

              <div className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white border border-white/20">
                Floor: {floor === 'ground' ? 'Ground Floor' : floor === 'first' ? '1st Floor' : 'Rooftop'}
              </div>
            </div>

            {/* Bottom Room Navigation Dock */}
            <div className="relative z-10 p-4 sm:p-6 bg-black/80 backdrop-blur-md border-t border-white/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-brandLogo-blue block">
                  Current Room Position
                </span>
                <h4 className="text-base sm:text-lg font-bold text-white font-display mt-0.5">
                  {selectedRoom.name} ({selectedRoom.dim})
                </h4>
                <p className="text-xs text-white/80 mt-0.5 line-clamp-1">
                  {selectedRoom.spec}
                </p>
              </div>

              {/* Room Buttons */}
              <div className="flex flex-wrap items-center gap-1.5 shrink-0">
                {currentRooms.map((r, i) => (
                  <button
                    key={r.id}
                    onClick={() => setSelectedRoom(r)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition ${
                      selectedRoom.id === r.id
                        ? 'bg-brandLogo-red text-white shadow-sm'
                        : 'bg-white/15 text-white hover:bg-white/25'
                    }`}
                  >
                    Room 0{i + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* ─── Bottom Active Room Specifications Detail (High Contrast) ─── */}
      <div className="border-t border-stone-200 bg-white p-5 sm:p-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
          <div className="md:col-span-8 space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-emerald-50 border border-emerald-300 px-2.5 py-0.5 text-xs font-bold text-emerald-900">
                Verified Architectural Zone
              </span>
              <span className="text-xs font-bold text-stone-900">
                {selectedRoom.dim} · {selectedRoom.area} Carpet
              </span>
            </div>
            <h4 className="text-lg sm:text-xl font-display font-extrabold text-stone-900">
              {selectedRoom.name}
            </h4>
            <p className="text-xs sm:text-sm text-stone-700 font-medium leading-relaxed">
              {selectedRoom.spec}
            </p>
            <div className="pt-1 flex items-center gap-2 text-xs text-emerald-900 font-bold">
              <Check className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>Vastu Harmony: {selectedRoom.vastu}</span>
            </div>
          </div>

          <div className="md:col-span-4 bg-ivory rounded-2xl p-4 border border-stone-200 text-center">
            <span className="text-[10px] font-bold uppercase tracking-wider text-stone-600 block">
              Architectural Standard
            </span>
            <p className="text-xs font-bold text-stone-950 mt-1">Fe-550 TMT Steel & RCC M25 Concrete</p>
            <p className="text-[11px] text-stone-700 font-medium mt-0.5">9" external brick walls with thermal isolation</p>
          </div>
        </div>
      </div>

    </div>
  )
}
