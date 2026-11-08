import { useState } from 'react'
import {
  Layers,
  Compass,
  Eye,
  Maximize2,
  Sparkles,
  Sun,
  Moon,
  Ruler,
  Navigation,
  ArrowRight,
  Check,
  RotateCw,
  Box,
  Map,
  ShieldCheck
} from 'lucide-react'

type ViewMode = 'isometric' | 'cad' | 'walkthrough'
type FloorLevel = 'ground' | 'first' | 'terrace'
type VillaType = '2bhk' | '3bhk' | '4bhk'

interface RoomHotspot {
  id: string
  name: string
  coords: { x: number; y: number } // percentages
  dim: string
  spec: string
  vastu: string
  walkthroughImg: string
}

const roomHotspots: Record<FloorLevel, RoomHotspot[]> = {
  ground: [
    {
      id: 'porch',
      name: 'Covered Car Porch & Portico',
      coords: { x: 18, y: 78 },
      dim: '14\'0" × 12\'0"',
      spec: 'Heavy-duty interlocking pavers with drainage gradient',
      vastu: 'North-East Entry for Positive Energy',
      walkthroughImg: '/residential.jpg',
    },
    {
      id: 'living',
      name: 'Grand Reception Living Lounge',
      coords: { x: 42, y: 55 },
      dim: '18\'0" × 14\'0"',
      spec: 'Polished high-gloss Italian marble finish with double-height ceiling',
      vastu: 'North & East cross-breeze alignment',
      walkthroughImg: '/residential.jpg',
    },
    {
      id: 'puja',
      name: 'Traditional East-Facing Puja Room',
      coords: { x: 70, y: 35 },
      dim: '6\'0" × 5\'0"',
      spec: 'Seasoned teak wood frame with brass bell inlay',
      vastu: 'Ishan (North-East) sacred quadrant',
      walkthroughImg: '/luxury-villas.jpg',
    },
    {
      id: 'kitchen',
      name: 'Modular Granite Kitchen & Utility',
      coords: { x: 82, y: 68 },
      dim: '12\'0" × 10\'0"',
      spec: 'Black granite slab, 7ft glazed tile dado, dedicated dry/wet wash yard',
      vastu: 'Agneya (South-East fire quadrant)',
      walkthroughImg: '/commercial.jpg',
    },
    {
      id: 'guest_bed',
      name: 'Ground Floor Parent Suite',
      coords: { x: 28, y: 28 },
      dim: '13\'0" × 12\'0"',
      spec: 'Zero-step entrance, attached bathroom with anti-skid ceramic tiles',
      vastu: 'Elder comfort with morning east daylight',
      walkthroughImg: '/apartment.jpg',
    },
  ],
  first: [
    {
      id: 'master',
      name: 'King Master Bedroom Suite',
      coords: { x: 30, y: 35 },
      dim: '16\'0" × 15\'0"',
      spec: 'Vitrified wooden-texture tiles, walk-in wardrobe alcove, luxury en-suite',
      vastu: 'Nairuthi (South-West) grounding stability',
      walkthroughImg: '/luxury-villas.jpg',
    },
    {
      id: 'balcony',
      name: 'Panoramic Front Sit-Out Balcony',
      coords: { x: 18, y: 75 },
      dim: '14\'0" × 6\'0"',
      spec: 'Toughened glass railings with stainless steel handrails',
      vastu: 'North-East open sky vista',
      walkthroughImg: '/residential.jpg',
    },
    {
      id: 'child_bed',
      name: 'Youth / Guest Bedroom 2',
      coords: { x: 75, y: 40 },
      dim: '13\'0" × 13\'0"',
      spec: 'Attached modern bathroom, wardrobe niche, double-glazed window',
      vastu: 'Vayu (North-West) natural airflow',
      walkthroughImg: '/apartment.jpg',
    },
    {
      id: 'lounge',
      name: 'Family Media & Study Lounge',
      coords: { x: 50, y: 65 },
      dim: '14\'0" × 11\'0"',
      spec: 'Acoustic-ready walls, high-speed fiber internet point',
      vastu: 'Central Brahmasthan connection',
      walkthroughImg: '/commercial.jpg',
    },
  ],
  terrace: [
    {
      id: 'terrace_main',
      name: 'Open-Air Sky Party Terrace',
      coords: { x: 50, y: 50 },
      dim: '400+ sq.ft Area',
      spec: 'Waterproofed tile flooring, exterior perimeter lighting, perimeter parapet',
      vastu: 'Unobstructed 360° solar prana absorption',
      walkthroughImg: '/apartment.jpg',
    },
    {
      id: 'solar_zone',
      name: 'Overhead Reservoir & Solar Deck',
      coords: { x: 80, y: 30 },
      dim: 'Dedicated Utility Area',
      spec: 'Dual 2000L water storage tanks, solar water heater provisions',
      vastu: 'South-West elevated placement for gravity flow',
      walkthroughImg: '/industrial.jpg',
    },
  ],
}

export default function Villa3DViewer() {
  const [mode, setMode] = useState<ViewMode>('isometric')
  const [floor, setFloor] = useState<FloorLevel>('ground')
  const [villa, setVilla] = useState<VillaType>('3bhk')
  const [selectedHotspot, setSelectedHotspot] = useState<RoomHotspot>(roomHotspots.ground[1])
  const [showDimensions, setShowDimensions] = useState(true)
  const [showVastu, setShowVastu] = useState(false)
  const [lighting, setLighting] = useState<'day' | 'night'>('day')

  const currentHotspots = roomHotspots[floor]

  return (
    <div className="rounded-3xl border border-border bg-white shadow-corporate overflow-hidden">
      
      {/* ─── Top Control Toolbar ─── */}
      <div className="border-b border-border bg-soft p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
        
        {/* Left: Mode Selector */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-full bg-white border border-border">
          <button
            onClick={() => setMode('isometric')}
            className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition ${
              mode === 'isometric'
                ? 'bg-navy text-white shadow-xs'
                : 'text-slate-grey hover:text-navy'
            }`}
          >
            <Box className="h-3.5 w-3.5 text-hotpink" />
            <span>3D Isometric Model</span>
          </button>

          <button
            onClick={() => setMode('cad')}
            className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition ${
              mode === 'cad'
                ? 'bg-navy text-white shadow-xs'
                : 'text-slate-grey hover:text-navy'
            }`}
          >
            <Layers className="h-3.5 w-3.5 text-hotpink" />
            <span>2D Engineering CAD</span>
          </button>

          <button
            onClick={() => setMode('walkthrough')}
            className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition ${
              mode === 'walkthrough'
                ? 'bg-navy text-white shadow-xs'
                : 'text-slate-grey hover:text-navy'
            }`}
          >
            <Eye className="h-3.5 w-3.5 text-hotpink" />
            <span>Virtual Walkthrough</span>
          </button>
        </div>

        {/* Right: Floor Level & Toggles */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Floor Level */}
          <div className="flex items-center gap-1 p-1 rounded-full bg-white border border-border">
            {[
              { id: 'ground', label: 'Ground Floor' },
              { id: 'first', label: 'First Floor' },
              { id: 'terrace', label: 'Rooftop Terrace' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => {
                  setFloor(f.id as FloorLevel)
                  setSelectedHotspot(roomHotspots[f.id as FloorLevel][0])
                }}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
                  floor === f.id
                    ? 'bg-navy text-white font-bold'
                    : 'text-slate-grey hover:text-navy'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Quick Toggles */}
          <button
            onClick={() => setShowDimensions(!showDimensions)}
            title="Toggle Dimensions & Calipers"
            className={`h-8 w-8 rounded-full border border-border flex items-center justify-center transition ${
              showDimensions ? 'bg-navy text-white border-navy' : 'bg-white text-slate-grey hover:text-navy'
            }`}
          >
            <Ruler className="h-3.5 w-3.5 text-hotpink" />
          </button>

          <button
            onClick={() => setShowVastu(!showVastu)}
            title="Toggle Vastu Shastra Flow Grid"
            className={`h-8 w-8 rounded-full border border-border flex items-center justify-center transition ${
              showVastu ? 'bg-navy text-white border-navy' : 'bg-white text-slate-grey hover:text-navy'
            }`}
          >
            <Compass className="h-3.5 w-3.5 text-hotpink" />
          </button>

          <button
            onClick={() => setLighting(lighting === 'day' ? 'night' : 'day')}
            title="Day / Night Ambient Simulation"
            className="h-8 w-8 rounded-full border border-border bg-white flex items-center justify-center text-slate-grey hover:text-navy transition"
          >
            {lighting === 'day' ? <Sun className="h-3.5 w-3.5 text-amber-500" /> : <Moon className="h-3.5 w-3.5 text-indigo-400" />}
          </button>
        </div>
      </div>

      {/* ─── Main 3D Canvas / Viewport Area ─── */}
      <div className={`relative min-h-[460px] sm:min-h-[520px] transition-colors duration-500 ${
        lighting === 'day'
          ? mode === 'cad' ? 'bg-[#0F172A]' : 'bg-gradient-to-br from-slate-100 via-soft to-slate-200'
          : 'bg-[#070D18]'
      } overflow-hidden p-4 sm:p-8 flex items-center justify-center`}>
        
        {/* Background Grid Accent (CAD style or 3D isometric perspective) */}
        {mode === 'cad' ? (
          <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:20px_20px] opacity-40 pointer-events-none" />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(#CBD5E1_1px,transparent_1px)] [background-size:28px_28px] opacity-50 pointer-events-none" />
        )}

        {/* ═════════════════════════════════════════════════════════════ */}
        {/* MODE 1: 3D ISOMETRIC CUTAWAY MODEL                            */}
        {/* ═════════════════════════════════════════════════════════════ */}
        {mode === 'isometric' && (
          <div className="relative w-full max-w-2xl aspect-[4/3] rounded-2xl bg-white shadow-2xl border border-border overflow-hidden transition-all duration-500 [transform:perspective(1200px)_rotateX(20deg)_rotateZ(-4deg)] hover:[transform:perspective(1200px)_rotateX(12deg)_rotateZ(0deg)]">
            
            {/* Visual architectural 3D render plate */}
            <div className="absolute inset-0">
              <img
                src={floor === 'terrace' ? '/apartment.jpg' : floor === 'first' ? '/luxury-villas.jpg' : '/residential.jpg'}
                alt="3D Isometric Cutaway Model"
                className="h-full w-full object-cover filter contrast-105 brightness-95"
              />
              <div className="absolute inset-0 bg-navy/20 backdrop-blur-[0.5px]" />
            </div>

            {/* Room Zone Outlines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
              {/* Ground level wall boundaries */}
              <rect x="10" y="10" width="80" height="80" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="0.8" strokeDasharray="3 2" />
              <line x1="50" y1="10" x2="50" y2="90" stroke="rgba(255,255,255,0.4)" strokeWidth="0.6" />
              <line x1="10" y1="50" x2="90" y2="50" stroke="rgba(255,255,255,0.4)" strokeWidth="0.6" />
            </svg>

            {/* Interactive Room Pins */}
            {currentHotspots.map((h) => {
              const isSelected = selectedHotspot.id === h.id
              return (
                <button
                  key={h.id}
                  onClick={() => setSelectedHotspot(h)}
                  style={{ left: `${h.coords.x}%`, top: `${h.coords.y}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer transition-all duration-300 z-20 ${
                    isSelected ? 'scale-125' : 'hover:scale-110'
                  }`}
                >
                  <div className="relative">
                    <span className={`flex h-8 w-8 items-center justify-center rounded-full text-white shadow-lg transition ${
                      isSelected
                        ? 'bg-hotpink ring-4 ring-hotpink/40 animate-pulse'
                        : 'bg-navy/90 hover:bg-hotpink'
                    }`}>
                      <Box className="h-3.5 w-3.5" />
                    </span>

                    {/* Room Label Badge */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block whitespace-nowrap rounded-lg bg-navy/95 backdrop-blur-md px-2.5 py-1 text-[10px] font-bold text-white shadow-xl pointer-events-none">
                      {h.name}
                    </div>
                  </div>
                </button>
              )
            })}

            {/* Perspective HUD Overlay */}
            <div className="absolute top-3 left-3 rounded-lg bg-black/60 backdrop-blur-md px-3 py-1 text-[10px] font-bold text-white flex items-center gap-1.5">
              <RotateCw className="h-3 w-3 text-hotpink" />
              <span>3D Cutaway Angle: 20° Tilt</span>
            </div>

            <div className="absolute bottom-3 right-3 rounded-lg bg-black/60 backdrop-blur-md px-3 py-1 text-[10px] font-bold text-white">
              Ground + 1 Independent Structure
            </div>
          </div>
        )}

        {/* ═════════════════════════════════════════════════════════════ */}
        {/* MODE 2: 2D ENGINEERING CAD / BLUEPRINT VIEW                 */}
        {/* ═════════════════════════════════════════════════════════════ */}
        {mode === 'cad' && (
          <div className="relative w-full max-w-2xl aspect-[4/3] rounded-2xl bg-[#09101F] border-2 border-[#1E293B] p-6 shadow-2xl flex flex-col justify-between font-mono text-cyan-400">
            
            {/* Engineering Grid and Axis Labels */}
            <div className="absolute top-2 left-6 right-6 flex justify-between text-[9px] text-slate-500 font-bold uppercase tracking-widest border-b border-slate-800 pb-1">
              <span>AXIS A</span>
              <span>AXIS B (Columns C1–C4)</span>
              <span>AXIS C</span>
              <span>AXIS D</span>
            </div>

            <div className="relative flex-1 mt-4 mb-2 border border-cyan-500/30 rounded-xl bg-cyan-950/10 p-4 flex flex-col justify-between">
              
              {/* CAD Rooms Geometry */}
              <div className="grid grid-cols-2 gap-3 h-full">
                {currentHotspots.slice(0, 4).map((h, i) => {
                  const isSelected = selectedHotspot.id === h.id
                  return (
                    <div
                      key={h.id}
                      onClick={() => setSelectedHotspot(h)}
                      className={`rounded-lg border p-3 flex flex-col justify-between cursor-pointer transition ${
                        isSelected
                          ? 'border-hotpink bg-hotpink/10 shadow-[0_0_15px_rgba(247,37,133,0.2)]'
                          : 'border-cyan-500/30 bg-cyan-950/20 hover:border-cyan-400'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between text-[10px]">
                          <span className="font-bold text-cyan-300">ZONE 0{i + 1}</span>
                          <span className="text-hotpink font-bold">{h.dim}</span>
                        </div>
                        <p className="text-xs font-bold text-white font-sans mt-1">{h.name}</p>
                      </div>

                      <div className="pt-2 border-t border-cyan-500/20 flex items-center justify-between text-[9px] text-slate-400">
                        <span>RCC 9" Wall</span>
                        <span className="text-emerald-400">Vastu OK</span>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Dimension Calipers Display */}
              {showDimensions && (
                <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-navy border border-cyan-500/40 rounded-full px-3 py-0.5 text-[9px] text-cyan-300 font-bold">
                  ↔ Total Outer Plot Width: 32' 0" · Depth: 50' 0"
                </div>
              )}
            </div>

            {/* CAD Blueprint Title Block (Standard Architectural Box) */}
            <div className="border-t border-slate-800 pt-3 flex flex-wrap items-center justify-between text-[10px] text-slate-400">
              <div>
                <span className="text-white font-bold">DWG: TM-VILLA-{villa.toUpperCase()}-01</span>
                <span className="mx-2">·</span>
                <span>SCALE: 1:100 (NTS)</span>
              </div>
              <div className="text-slate-400">
                <span>APPROVED BY: <strong>MANSANI CONSTRUCTIONS ARCHITECTURAL CELL</strong></span>
              </div>
            </div>
          </div>
        )}

        {/* ═════════════════════════════════════════════════════════════ */}
        {/* MODE 3: FIRST-PERSON VIRTUAL WALKTHROUGH                     */}
        {/* ═════════════════════════════════════════════════════════════ */}
        {mode === 'walkthrough' && (
          <div className="relative w-full max-w-3xl aspect-[16/10] rounded-2xl bg-black overflow-hidden shadow-2xl border border-border">
            
            <img
              src={selectedHotspot.walkthroughImg}
              alt={selectedHotspot.name}
              className="h-full w-full object-cover filter brightness-95 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

            {/* Virtual Room Selector Carousel on Bottom */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 bg-black/60 backdrop-blur-md p-3 rounded-2xl border border-white/10">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-hotpink block">
                  Current Walkthrough Position
                </span>
                <p className="text-sm font-bold text-white font-display">
                  {selectedHotspot.name} ({selectedHotspot.dim})
                </p>
                <p className="text-xs text-white/70 line-clamp-1 mt-0.5">
                  {selectedHotspot.spec}
                </p>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                {currentHotspots.map((h, idx) => (
                  <button
                    key={h.id}
                    onClick={() => setSelectedHotspot(h)}
                    className={`h-7 px-3 rounded-lg text-xs font-bold transition ${
                      selectedHotspot.id === h.id
                        ? 'bg-hotpink text-white shadow-xs'
                        : 'bg-white/10 text-white/80 hover:bg-white/20'
                    }`}
                  >
                    0{idx + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Top Compass Indicator */}
            <div className="absolute top-4 left-4 rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-xs text-white flex items-center gap-1.5 border border-white/10">
              <Compass className="h-3.5 w-3.5 text-hotpink" />
              <span>{selectedHotspot.vastu}</span>
            </div>
          </div>
        )}

      </div>

      {/* ─── Bottom Inspection Detail Card ─── */}
      <div className="border-t border-border bg-white p-6 sm:p-8">
        <div className="grid gap-6 md:grid-cols-12 items-center">
          
          <div className="md:col-span-8 space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-hotpink rounded-full bg-hotpink/10 px-3 py-0.5">
                Active Zone Inspector
              </span>
              <span className="text-xs font-bold text-navy font-display">
                {selectedHotspot.dim} Dimension
              </span>
            </div>

            <h4 className="text-xl font-bold text-navy font-display">{selectedHotspot.name}</h4>
            <p className="text-xs sm:text-sm text-slate-grey leading-relaxed">{selectedHotspot.spec}</p>

            {/* Vastu Detail */}
            <div className="flex items-center gap-2 text-xs text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-1.5 w-fit">
              <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
              <span className="font-semibold">Vastu Verification: {selectedHotspot.vastu}</span>
            </div>
          </div>

          <div className="md:col-span-4 flex flex-col gap-2.5">
            <div className="rounded-2xl border border-border bg-soft p-4 text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-grey block">
                Standard Construction Material
              </span>
              <p className="text-xs font-bold text-navy mt-1">Fe-550 TMT Steel & RCC M25 Concrete</p>
              <p className="text-[11px] text-slate-grey mt-0.5">9" external brick walls for thermal insulation</p>
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}
