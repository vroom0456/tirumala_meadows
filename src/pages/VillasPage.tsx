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
  Maximize2,
  CheckCircle2
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
    image: '/portfolio/contemporary-villa-daylight.jpg',
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
    image: '/portfolio/jubilee-hills-facade-dusk.jpg',
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
    image: '/portfolio/jubilee-hills-regal-estate.jpg',
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

// Natural Daylight & Vastu Simulation Stages
const daylightStages = [
  {
    id: 'morning',
    label: 'Morning (07:00 AM)',
    icon: Sunrise,
    sunAngle: 'East 25°',
    temp: '24°C Comfort',
    effect: 'Golden dawn sunlight streams directly into East-facing Puja room, porch & kitchen, promoting positive morning prana.',
    cardBg: 'border-blue-200',
    highlightRoom: 'Puja Niche & Kitchen',
  },
  {
    id: 'noon',
    label: 'Noon (12:30 PM)',
    icon: Sun,
    sunAngle: 'Zenith 85°',
    temp: '29°C Balanced',
    effect: 'Overhead solar angle deflected by 9-inch insulated brickwork and extended balcony overhangs, keeping ground floors naturally cool.',
    cardBg: 'border-slate-200',
    highlightRoom: 'Living Hall & Ground Floor',
  },
  {
    id: 'sunset',
    label: 'Evening (05:45 PM)',
    icon: Sunset,
    sunAngle: 'West 20°',
    temp: '26°C Breezy',
    effect: 'Warm golden hour across the open terrace and balconies. Cross-breezes flow through north-south window alignments.',
    cardBg: 'border-red-200',
    highlightRoom: 'Terrace & Upper Balconies',
  },
  {
    id: 'night',
    label: 'Night (09:30 PM)',
    icon: Moon,
    sunAngle: 'Under Horizon',
    temp: '22°C Serene',
    effect: 'Tranquil quietude with ambient colony street lighting, stargazing on private terrace, and 24/7 manned security rounds.',
    cardBg: 'border-indigo-200',
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
    <div className="min-h-screen bg-soft text-navy font-sans selection:bg-brandLogo-blue selection:text-white">
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-14 bg-soft border-b border-slate-200 text-center">
        <div className="mx-auto max-w-4xl px-6 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-white border border-slate-200 px-3.5 py-1 text-xs font-bold text-navy uppercase tracking-wider shadow-2xs">
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-brandLogo-red" />
              <span className="h-1.5 w-1.5 rounded-full bg-brandLogo-blue" />
              <span className="h-1.5 w-1.5 rounded-full bg-brandLogo-green" />
            </span>
            <span>Ground + 1 Independent Duplex Living</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-navy tracking-tight">
            Villas & 3D Architectural Studio
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-xl mx-auto leading-relaxed">
            Engineered for longevity, privacy, and traditional Vastu harmony. Explore full 3D interactive models, 2D CAD floorplans, and room specifications.
          </p>

          {/* Config Switcher */}
          <div className="inline-flex p-1.5 rounded-full bg-white border border-slate-200 shadow-xs mt-6">
            {villasData.map((v) => (
              <button
                key={v.id}
                onClick={() => {
                  setSelectedId(v.id)
                  setFloorTab('ground')
                }}
                className={`rounded-full px-5 sm:px-7 py-2 text-xs sm:text-sm font-bold tracking-wider uppercase transition ${
                  selectedId === v.id
                    ? 'bg-navy text-white shadow-xs'
                    : 'text-slate-600 hover:text-navy'
                }`}
              >
                {v.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3D ARCHITECTURAL STUDIO: Interactive 3D Models & 2D CAD Blueprint */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brandLogo-blue">
              Interactive Architectural Studio
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-navy tracking-tight mt-1">
              Interactive 3D Villa House & 2D CAD Plans
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
              Rotate real 3D villa perspectives, inspect detailed CAD floor vectors, and take a photo walkthrough.
            </p>
          </div>
          <Villa3DViewer />
        </div>
      </section>

      {/* Villa Showcase */}
      <section className="py-16 bg-soft border-b border-slate-200">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-10 lg:grid-cols-12 items-start">
            
            {/* Left Column: Visual Card */}
            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-3xl border border-slate-200 bg-white p-3 overflow-hidden shadow-sm">
                <div className="relative h-72 sm:h-80 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                  <img
                    src={villa.image}
                    alt={villa.name}
                    className="h-full w-full object-cover transition duration-500 hover:scale-103"
                  />
                  <div className="absolute top-3 left-3 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold text-navy shadow-xs">
                    {villa.bhk}
                  </div>
                  <div className="absolute top-3 right-3 rounded-full bg-navy/90 text-white px-3 py-1 text-[11px] font-bold shadow-xs">
                    {villa.area}
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-brandLogo-red uppercase tracking-wider">{villa.tag}</span>
                    <span className="text-sm font-extrabold text-navy font-display">{villa.priceEst}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {villa.desc}
                  </p>
                </div>
              </div>

              {/* Fast Spec Points */}
              <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3 shadow-2xs">
                <p className="text-xs font-bold uppercase tracking-wider text-navy font-display">
                  Architectural Highlights
                </p>
                <div className="space-y-2">
                  {villa.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                      <CheckCircle2 className="h-4 w-4 text-brandLogo-green shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Detailed Floorplans */}
            <div className="lg:col-span-7 space-y-6">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 space-y-6 shadow-sm">
                
                {/* Floor Tabs */}
                <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                  <div>
                    <h3 className="text-xl font-bold text-navy font-display">Floor-by-Floor Anatomy</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Specifications for {villa.name}</p>
                  </div>
                  <div className="flex gap-1.5 p-1 rounded-full bg-slate-100 border border-slate-200">
                    {(['ground', 'first', 'terrace'] as const).map((t) => (
                      <button
                        key={t}
                        onClick={() => setFloorTab(t)}
                        className={`rounded-full px-3.5 py-1 text-xs font-bold capitalize transition ${
                          floorTab === t
                            ? 'bg-navy text-white shadow-xs'
                            : 'text-slate-600 hover:text-navy'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tab Content */}
                <div className="space-y-3 min-h-[220px]">
                  {floorTab === 'ground' && (
                    <div className="space-y-3">
                      <span className="inline-block text-xs font-bold text-brandLogo-blue uppercase tracking-wider">
                        Ground Level: Reception & Active Living
                      </span>
                      <div className="grid gap-2.5 sm:grid-cols-2">
                        {villa.groundFloor.map((item, i) => (
                          <div key={i} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 font-medium">
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {floorTab === 'first' && (
                    <div className="space-y-3">
                      <span className="inline-block text-xs font-bold text-brandLogo-blue uppercase tracking-wider">
                        First Level: Private Suites & Balconies
                      </span>
                      <div className="grid gap-2.5 sm:grid-cols-2">
                        {villa.firstFloor.map((item, i) => (
                          <div key={i} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 font-medium">
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {floorTab === 'terrace' && (
                    <div className="space-y-3">
                      <span className="inline-block text-xs font-bold text-brandLogo-blue uppercase tracking-wider">
                        Rooftop: Open Terrace & Utilities
                      </span>
                      <div className="grid gap-2.5 sm:grid-cols-2">
                        {villa.terrace.map((item, i) => (
                          <div key={i} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 font-medium">
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Vastu Note */}
                <div className="rounded-2xl bg-blue-50 border border-blue-200 p-4 flex items-start gap-3">
                  <ShieldCheck className="h-5 w-5 text-brandLogo-blue shrink-0 mt-0.5" />
                  <div className="text-xs text-blue-950 font-medium leading-relaxed">
                    <strong className="block text-navy font-bold">100% Traditional Vastu Compliance:</strong>
                    East-facing main entrances, South-East fire zone kitchen alignment, and North-East prana flow verified by master Vastu architects.
                  </div>
                </div>

                {/* CTA */}
                <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                  <Link
                    to="/contact"
                    className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-navy py-3 text-xs font-bold text-white hover:bg-navy-light transition shadow-xs uppercase tracking-wider"
                  >
                    <Calendar className="h-4 w-4" />
                    <span>Enquire for {villa.name}</span>
                  </Link>
                  <a
                    href="tel:+919550828688"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-3 text-xs font-bold text-navy hover:bg-slate-50 transition uppercase tracking-wider"
                  >
                    <span>Direct Concierge</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Natural Daylight & Vastu Simulator */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brandLogo-red">
              Architectural Science
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy font-display tracking-tight mt-1">
              Natural Daylight & Vastu Simulator
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 font-medium">
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
                        ? 'bg-navy text-white shadow-xs font-bold'
                        : 'bg-white border border-slate-200 text-slate-600 hover:text-navy hover:bg-slate-50'
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5 text-brandLogo-red" />
                    <span>{s.label}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Simulation Display Card */}
          <div className={`rounded-3xl border border-slate-200 bg-slate-50 p-8 sm:p-10 transition-all duration-500 shadow-sm`}>
            <div className="grid gap-8 lg:grid-cols-12 items-center">
              
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-center justify-center text-navy">
                    <StageIcon className="h-6 w-6 text-brandLogo-red" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-brandLogo-blue">Time of Day Simulation</span>
                    <h3 className="text-2xl font-bold text-navy font-display">{currentStage.label}</h3>
                  </div>
                </div>

                <p className="text-sm text-slate-700 leading-relaxed font-medium">
                  {currentStage.effect}
                </p>

                <div className="grid grid-cols-3 gap-3 pt-2">
                  <div className="rounded-xl bg-white border border-slate-200 p-3 text-center">
                    <p className="text-[10px] text-slate-500 uppercase font-bold">Sun Position</p>
                    <p className="text-xs sm:text-sm font-bold text-navy font-display mt-0.5">{currentStage.sunAngle}</p>
                  </div>
                  <div className="rounded-xl bg-white border border-slate-200 p-3 text-center">
                    <p className="text-[10px] text-slate-500 uppercase font-bold">Ambient Index</p>
                    <p className="text-xs sm:text-sm font-bold text-navy font-display mt-0.5">{currentStage.temp}</p>
                  </div>
                  <div className="rounded-xl bg-white border border-slate-200 p-3 text-center">
                    <p className="text-[10px] text-slate-500 uppercase font-bold">Optimal Room</p>
                    <p className="text-xs sm:text-sm font-bold text-brandLogo-blue font-display mt-0.5 truncate">{currentStage.highlightRoom}</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3 shadow-2xs">
                  <div className="flex items-center justify-between text-xs border-b border-slate-200 pb-2.5">
                    <span className="font-semibold text-slate-600">Thermal Comfort</span>
                    <span className="font-bold text-brandLogo-green">Optimal (9-inch Walls)</span>
                  </div>
                  <div className="flex items-center justify-between text-xs border-b border-slate-200 pb-2.5">
                    <span className="font-semibold text-slate-600">Cross Ventilation</span>
                    <span className="font-bold text-navy">North-East Alignment</span>
                  </div>
                  <div className="flex items-center justify-between text-xs border-b border-slate-200 pb-2.5">
                    <span className="font-semibold text-slate-600">Daylight Autonomy</span>
                    <span className="font-bold text-brandLogo-blue">85% Natural Light</span>
                  </div>
                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="font-semibold text-slate-600">Vastu Solar Score</span>
                    <span className="font-bold text-brandLogo-green">100% Compliant</span>
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
