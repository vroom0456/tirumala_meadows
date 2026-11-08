import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Villa3DViewer from '../components/Villa3DViewer'
import {
  Check,
  Calendar,
  Compass,
  ArrowRight,
  Sun,
  Sunrise,
  Sunset,
  Moon,
  Wind,
  ShieldCheck,
  Eye,
  Maximize2
} from 'lucide-react'

interface Villa {
  id: string
  name: string
  bhk: string
  area: string
  priceEst: string
  tag: string
  desc: string
  image: string
  highlights: string[]
  groundFloor: string[]
  firstFloor: string[]
  terrace: string[]
}

const villasData: Villa[] = [
  {
    id: '2bhk',
    name: '2 BHK Premium Villa',
    bhk: '2 BHK Duplex',
    area: '850 – 1,400 sq.ft.',
    priceEst: '₹75 – 95 Lakhs (Resale Est.)',
    tag: 'Compact & Functional',
    desc: 'Thoughtfully designed for young couples or nuclear families, balancing independent privacy with low-maintenance duplex living.',
    image: '/residential.jpg',
    highlights: [
      'Double-height feeling living room',
      'East-facing dedicated Puja niche',
      'Granite kitchen with attached utility wash area',
      '2 private bedroom suites with attached baths',
      'Independent staircase to private open terrace',
    ],
    groundFloor: [
      'Covered front porch for car parking',
      'Main reception living lounge (16 ft × 11 ft)',
      'Traditional East-aligned Puja Niche',
      'Granite kitchen with dedicated wash yard',
      'Ground floor bedroom with attached bath',
    ],
    firstFloor: [
      'Master bedroom (13 ft × 14 ft) with en-suite bath',
      'Private sit-out balcony overlooking avenue trees',
      'Hallway connecting to open terrace flight',
    ],
    terrace: [
      'Independent rooftop terrace with panoramic view',
      'Waterproof ceramic tile flooring',
      'Dedicated overhead water storage tanks',
    ],
  },
  {
    id: '3bhk',
    name: '3 BHK Joint-Family Villa',
    bhk: '3 BHK Duplex',
    area: 'Approximately 1,600 sq.ft.',
    priceEst: '₹1.15 – 1.45 Cr (Resale Est.)',
    tag: 'Most Popular Family Villa',
    desc: 'The signature family layout at Tirumala Meadows. Large living-dining hall, 3 airy bedrooms, multiple balconies, and an independent rooftop.',
    image: '/luxury-villas.jpg',
    highlights: [
      'Expansive living and formal dining zone',
      '3 large bedrooms with en-suite bathrooms',
      'Wide private balconies with garden vistas',
      '100% Vastu compliant kitchen & master placement',
      'Independent covered parking porch',
    ],
    groundFloor: [
      'Dual-car covered entry porch & verandah',
      'Formal family living room with marble flooring',
      'Adjoining dining hall with cross-ventilation',
      'Puja room crafted with traditional woodwork',
      'Modular granite kitchen with dry & wet utility zones',
      'Elder-friendly ground floor bedroom with attached bath',
    ],
    firstFloor: [
      'Spacious master bedroom with private balcony',
      'Third bedroom suite with attached modern bathroom',
      'Family informal lounge / study corner',
      'Terrace access stairway with stainless steel railings',
    ],
    terrace: [
      'Independent terrace area suitable for rooftop garden',
      'Waterproofed flooring with solar line provisions',
      'Dual water tank reservoir',
    ],
  },
  {
    id: '4bhk',
    name: '4 BHK Luxury Villa',
    bhk: '4 BHK Duplex + Terrace',
    area: 'Up to 2,200 sq.ft.',
    priceEst: '₹1.65 – 1.95 Cr (Resale Est.)',
    tag: 'Grand Estate Lifestyle',
    desc: 'The pinnacle of private gated estate living. Features 4 oversized bedroom suites, multipurpose home theatre room, and sprawling terraces.',
    image: '/commercial.jpg',
    highlights: [
      'Palatial living room designed for executive hosting',
      'Dedicated multipurpose room / home theatre suite',
      '4 oversized bedrooms with anti-skid luxury bathrooms',
      'Dual open-sky balconies offering panoramic colony views',
      'Grand Indian Teak wood main door with intricate polish',
    ],
    groundFloor: [
      'Oversized covered porch accommodating 2 SUVs',
      'Grand living room with double ceiling height aesthetic',
      'Formal dining hall comfortably seating 10 guests',
      'Granite kitchen counter with attached store & utility',
      'Guest suite with garden-facing windows and attached bath',
    ],
    firstFloor: [
      'Opulent King Master Suite with walk-in wardrobe zone',
      'Two additional expansive bedrooms with en-suite baths',
      'Multipurpose Room / Media Lounge / Executive Study',
      'Two spacious front and corner viewing balconies',
    ],
    terrace: [
      'Over 400 sq.ft private open-air rooftop terrace',
      'Pergola / terrace party zone with lighting provisions',
      'Dedicated utility storage room',
    ],
  },
]

// Natural Daylight & Vastu Simulation Stages (UNIQUE FEATURE)
const daylightStages = [
  {
    id: 'morning',
    label: 'Morning (07:00 AM)',
    icon: Sunrise,
    sunAngle: 'East 25°',
    temp: '24°C Comfort',
    effect: 'Golden dawn sunlight streams directly into East-facing Puja room, porch & kitchen, promoting positive morning prana.',
    cardBg: 'from-amber-500/10 via-orange-500/5 to-transparent border-amber-300',
    highlightRoom: 'Puja Niche & Kitchen',
  },
  {
    id: 'noon',
    label: 'Noon (12:30 PM)',
    icon: Sun,
    sunAngle: 'Zenith 85°',
    temp: '29°C Balanced',
    effect: 'Overhead solar angle deflected by 9-inch insulated brickwork and extended balcony overhangs, keeping ground floors naturally cool.',
    cardBg: 'from-yellow-500/10 via-amber-500/5 to-transparent border-yellow-300',
    highlightRoom: 'Living Hall & Ground Floor',
  },
  {
    id: 'sunset',
    label: 'Evening (05:45 PM)',
    icon: Sunset,
    sunAngle: 'West 20°',
    temp: '26°C Breezy',
    effect: 'Warm golden hour across the open terrace and balconies. Cross-breezes flow through north-south window alignments.',
    cardBg: 'from-rose-500/10 via-pink-500/5 to-transparent border-rose-300',
    highlightRoom: 'Terrace & Upper Balconies',
  },
  {
    id: 'night',
    label: 'Night (09:30 PM)',
    icon: Moon,
    sunAngle: 'Under Horizon',
    temp: '22°C Serene',
    effect: 'Tranquil quietude with ambient colony street lighting, stargazing on private terrace, and 24/7 manned security rounds.',
    cardBg: 'from-indigo-500/10 via-navy/5 to-transparent border-indigo-300',
    highlightRoom: 'Master Bedroom Suites',
  },
]

export default function VillasPage() {
  const [selectedId, setSelectedId] = useState<string>('3bhk')
  const [floorTab, setFloorTab] = useState<'ground' | 'first' | 'terrace'>('ground')
  const [daylightStage, setDaylightStage] = useState<string>('morning')

  const villa = villasData.find((v) => v.id === selectedId) || villasData[1]
  const currentStage = daylightStages.find((s) => s.id === daylightStage) || daylightStages[0]
  const StageIcon = currentStage.icon

  return (
    <div className="min-h-screen bg-white text-navy font-sans selection:bg-hotpink selection:text-white">
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-14 bg-soft border-b border-border text-center">
        <div className="mx-auto max-w-4xl px-6 space-y-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-hotpink/10 px-3.5 py-1 text-xs font-bold text-hotpink">
            Ground + 1 Independent Duplexes
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-navy font-display tracking-tight">
            Villas & Floorplans
          </h1>
          <p className="text-sm sm:text-base text-slate-grey max-w-xl mx-auto leading-relaxed">
            Engineered for longevity, privacy, and traditional Vastu harmony. Explore floor-by-floor specifications.
          </p>

          {/* Config Switcher */}
          <div className="inline-flex p-1.5 rounded-full bg-white border border-border shadow-xs mt-6">
            {villasData.map((v) => (
              <button
                key={v.id}
                onClick={() => {
                  setSelectedId(v.id)
                  setFloorTab('ground')
                }}
                className={`rounded-full px-5 sm:px-7 py-2 text-xs sm:text-sm font-semibold transition ${
                  selectedId === v.id
                    ? 'bg-navy text-white shadow-xs'
                    : 'text-slate-grey hover:text-navy'
                }`}
              >
                {v.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Villa Showcase */}
      <section className="py-16 bg-white border-b border-border">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-10 lg:grid-cols-12 items-start">
            
            {/* Left Column: Visual Card */}
            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-3xl border border-border bg-soft p-3 overflow-hidden shadow-xs">
                <div className="relative h-72 sm:h-80 rounded-2xl overflow-hidden bg-white border border-border">
                  <img
                    src={villa.image}
                    alt={villa.name}
                    className="h-full w-full object-cover transition duration-500 hover:scale-103"
                  />
                  <div className="absolute top-3 left-3 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold text-hotpink shadow-xs">
                    {villa.tag}
                  </div>
                  <div className="absolute bottom-3 right-3 rounded-full bg-navy px-3 py-1 text-[11px] font-bold text-white shadow-xs">
                    100% Ready To Move In
                  </div>
                </div>

                <div className="p-4 space-y-2.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-grey">Super Built-up Area:</span>
                    <strong className="text-navy font-bold font-display">{villa.area}</strong>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-grey">Structure:</span>
                    <strong className="text-navy font-bold">Ground + 1 Floor (+ Terrace)</strong>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-grey">Market Resale Range:</span>
                    <strong className="text-hotpink font-bold">{villa.priceEst}</strong>
                  </div>
                </div>
              </div>

              <Link
                to="/contact"
                className="w-full rounded-full bg-hotpink py-3.5 text-xs sm:text-sm font-bold text-white shadow-[0_4px_16px_rgba(247,37,133,0.32)] hover:bg-hotpink-hover transition flex items-center justify-center gap-2"
              >
                <Calendar className="h-4 w-4" />
                <span>Schedule Walkthrough for {villa.bhk}</span>
              </Link>
            </div>

            {/* Right Column: Floor Breakdown */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-hotpink">{villa.tag}</span>
                <h2 className="text-2xl sm:text-3xl font-bold text-navy mt-1 font-display">{villa.name}</h2>
                <p className="text-sm text-slate-grey mt-2 leading-relaxed">{villa.desc}</p>
              </div>

              {/* Floor Switcher */}
              <div className="flex gap-2 p-1 rounded-full bg-soft border border-border w-fit">
                {[
                  { id: 'ground', label: 'Ground Floor' },
                  { id: 'first', label: 'First Floor' },
                  { id: 'terrace', label: 'Rooftop Terrace' },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setFloorTab(t.id as any)}
                    className={`rounded-full px-4 sm:px-5 py-1.5 text-xs font-semibold transition ${
                      floorTab === t.id
                        ? 'bg-navy text-white shadow-xs'
                        : 'text-slate-grey hover:text-navy'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Floor Features */}
              <div className="rounded-2xl border border-border bg-soft p-6">
                <h3 className="text-xs font-bold uppercase tracking-wider text-navy mb-4 font-display">
                  {floorTab === 'ground' && 'Ground Floor Layout Features'}
                  {floorTab === 'first' && 'First Floor Suites & Balcony Features'}
                  {floorTab === 'terrace' && 'Rooftop Open Terrace Features'}
                </h3>

                <div className="grid gap-3 sm:grid-cols-2">
                  {(floorTab === 'ground'
                    ? villa.groundFloor
                    : floorTab === 'first'
                    ? villa.firstFloor
                    : villa.terrace
                  ).map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-grey bg-white p-3 rounded-xl border border-border">
                      <Check className="h-4 w-4 text-hotpink shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Vastu & Alignment Note */}
              <div className="rounded-2xl border border-border bg-white p-5 flex items-start gap-3">
                <div className="h-9 w-9 rounded-xl bg-soft border border-border flex items-center justify-center text-hotpink shrink-0">
                  <Compass className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-navy font-display uppercase tracking-wide">100% Vastu Architectural Principles</p>
                  <p className="text-xs text-slate-grey mt-1 leading-relaxed">
                    Main entrance orientation, Agneya (South-East) kitchen placement, and Nairuthi (South-West) master bedroom layout have been verified for auspicious cosmic alignment and maximum natural cross-ventilation.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════ */}
      {/* 3D ARCHITECTURAL STUDIO: 3D View, CAD Blueprint & Walkthrough     */}
      {/* ═════════════════════════════════════════════════════════════════ */}
      <Villa3DViewer />

      {/* ═════════════════════════════════════════════════════════════════ */}
      {/* UNIQUE FEATURE FOR PRESENTATION: Interactive Daylight Simulator   */}
      {/* ═════════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-soft border-b border-border">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-navy/5 px-3 py-1 text-xs font-bold text-navy">
              Interactive Architectural Tool
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy font-display tracking-tight mt-2">
              Natural Daylight & Vastu Simulator
            </h2>
            <p className="text-xs sm:text-sm text-slate-grey mt-2">
              Experience how natural sunlight and breeze move through a Tirumala Meadows villa across different times of the day.
            </p>

            {/* Time Controls */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
              {daylightStages.map((s) => {
                const Icon = s.icon
                return (
                  <button
                    key={s.id}
                    onClick={() => setDaylightStage(s.id)}
                    className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold transition ${
                      daylightStage === s.id
                        ? 'bg-navy text-white shadow-xs'
                        : 'bg-white border border-border text-slate-grey hover:text-navy hover:bg-soft'
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5 text-hotpink" />
                    <span>{s.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Simulation Display Card */}
          <div className={`rounded-3xl border bg-gradient-to-br p-8 sm:p-10 transition-all duration-500 bg-white ${currentStage.cardBg}`}>
            <div className="grid gap-8 lg:grid-cols-12 items-center">
              
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-2xl bg-white border border-border shadow-xs flex items-center justify-center text-hotpink">
                    <StageIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-hotpink">Time of Day Simulation</span>
                    <h3 className="text-2xl font-bold text-navy font-display">{currentStage.label}</h3>
                  </div>
                </div>

                <p className="text-sm text-slate-grey leading-relaxed">
                  {currentStage.effect}
                </p>

                <div className="grid grid-cols-3 gap-3 pt-2">
                  <div className="rounded-xl bg-white/80 backdrop-blur-sm border border-border p-3 text-center">
                    <p className="text-[10px] text-slate-grey uppercase font-bold">Sun Position</p>
                    <p className="text-xs sm:text-sm font-bold text-navy font-display mt-0.5">{currentStage.sunAngle}</p>
                  </div>
                  <div className="rounded-xl bg-white/80 backdrop-blur-sm border border-border p-3 text-center">
                    <p className="text-[10px] text-slate-grey uppercase font-bold">Ambient Index</p>
                    <p className="text-xs sm:text-sm font-bold text-navy font-display mt-0.5">{currentStage.temp}</p>
                  </div>
                  <div className="rounded-xl bg-white/80 backdrop-blur-sm border border-border p-3 text-center">
                    <p className="text-[10px] text-slate-grey uppercase font-bold">Optimal Room</p>
                    <p className="text-xs sm:text-sm font-bold text-hotpink font-display mt-0.5 truncate">{currentStage.highlightRoom}</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-2xl border border-border bg-white p-5 space-y-3">
                  <div className="flex items-center justify-between text-xs border-b border-border pb-2.5">
                    <span className="font-semibold text-slate-grey">Thermal Comfort</span>
                    <span className="font-bold text-emerald-600">Optimal (9-inch Walls)</span>
                  </div>
                  <div className="flex items-center justify-between text-xs border-b border-border pb-2.5">
                    <span className="font-semibold text-slate-grey">Cross Ventilation</span>
                    <span className="font-bold text-navy">North-East Alignment</span>
                  </div>
                  <div className="flex items-center justify-between text-xs border-b border-border pb-2.5">
                    <span className="font-semibold text-slate-grey">Daylight Autonomy</span>
                    <span className="font-bold text-hotpink">85% No Artificial Light</span>
                  </div>
                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="font-semibold text-slate-grey">Vastu Solar Score</span>
                    <span className="font-bold text-emerald-600">100% Compliant</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
