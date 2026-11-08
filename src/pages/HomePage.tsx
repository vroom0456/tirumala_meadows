import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import BrochureModal from '../components/BrochureModal'
import Villa3DViewer from '../components/Villa3DViewer'
import {
  ArrowRight, Check, MapPin, Calendar, ChevronDown,
  Dumbbell, Film, Trees, ShieldCheck, Users, Droplets,
  Building2, Home, Layers, Zap, Compass, TrendingUp,
  Percent, FileText, CheckCircle2, Award, Landmark,
  Car, Eye, Sparkles, Phone, HelpCircle, MessageSquare, Heart
} from 'lucide-react'

/* ─── Animated Counter Hook (scroll-triggered) ─── */
function useCounter(end: number, duration = 1800) {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setStarted(true); obs.disconnect() } },
      { threshold: 0.4 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    let frame: number
    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * end))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [started, end, duration])

  return { count, ref }
}

/* ─── Fade-in on scroll hook ─── */
function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.12 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return { ref, className: `transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}` }
}

/* ─── Data Definitions ─── */
const villas = [
  {
    id: '2bhk',
    label: '2 BHK Premium',
    area: '850 – 1,400 sq.ft',
    beds: 2,
    baths: 2,
    tag: 'Compact Living',
    price: '₹75 – 95 L (Est.)',
    highlights: [
      'Double-height feeling living lounge',
      'East-facing traditional Puja niche',
      'Granite kitchen with attached utility space',
      'Two bedrooms with en-suite bathrooms',
      'Independent staircase to private open terrace',
    ],
  },
  {
    id: '3bhk',
    label: '3 BHK Joint-Family',
    area: 'Approx 1,600 sq.ft',
    beds: 3,
    baths: 3,
    tag: 'Signature Residence',
    price: '₹1.15 – 1.45 Cr (Est.)',
    highlights: [
      'Large formal living and dining spaces',
      'Three expansive bedrooms with attached baths',
      'Extended private balconies with garden vistas',
      '100% Vastu compliance across rooms',
      'Dedicated covered porch and utility yard',
    ],
  },
  {
    id: '4bhk',
    label: '4 BHK Luxury',
    area: 'Up to 2,200 sq.ft',
    beds: 4,
    baths: 4,
    tag: 'Grand Estate',
    price: '₹1.65 – 1.95 Cr (Est.)',
    highlights: [
      'Palatial living room for executive hosting',
      'Dedicated multipurpose room / home theatre suite',
      'Four oversized bedrooms with anti-skid bathrooms',
      'Over 400 sq.ft private rooftop party terrace',
      'Grand Indian Teak wood main entrance door',
    ],
  },
]

const amenities = [
  { icon: Dumbbell, name: 'Modern Gymnasium', desc: 'Cardio & strength equipment' },
  { icon: Droplets, name: 'Swimming Pool', desc: 'Resort-style filtered water' },
  { icon: Film, name: 'Mini Theatre', desc: 'Private 40-seat cinema hall' },
  { icon: Users, name: 'Central Clubhouse', desc: 'Multi-level resident hub' },
  { icon: Trees, name: 'Landscaped Parks', desc: 'Over 40% open green footprint' },
  { icon: ShieldCheck, name: '24/7 Gate Security', desc: 'RFID boom barriers & CCTV' },
  { icon: Zap, name: 'Power Backup', desc: 'Generator for streetlights & pumps' },
  { icon: Compass, name: 'Jogging Track', desc: '1.2 km paved perimeter trail' },
]

const townshipSectors = [
  {
    id: 'entrance',
    name: 'Sector A: Grand Entrance & Boulevard',
    badge: 'Security & Access',
    stat: '40 ft Wide',
    desc: 'Main access archway equipped with dual RFID boom barriers, 24/7 security cabin, visitor registration bay, and tree-lined concrete avenue.',
    features: ['40-foot wide concrete boulevard', 'Dual-lane separate visitor and resident lanes', 'Underground storm drainage & LED streetlamps'],
  },
  {
    id: 'clubhouse',
    name: 'Sector B: Central Clubhouse & Aquatics',
    badge: 'Recreation Epicentre',
    stat: '15,000+ sq.ft',
    desc: 'The social anchor of the community featuring an adult swimming pool, kids splash zone, mini cinema, banquet hall, and fitness gymnasium.',
    features: ['Direct pedestrian connectivity from all villas', 'Open-air stepped amphitheatre for festivals', 'Indoor games arcade & society boardroom'],
  },
  {
    id: 'phase1',
    name: 'Sector C: East-Facing Villa Enclave',
    badge: 'Phase 1 · 100% Vastu',
    stat: '100% Occupied',
    desc: 'Prime independent duplex cluster engineered to capture early morning sunlight, with dedicated private car porches and individual terraces.',
    features: ['Avenue palm trees with shaded walkways', 'Individual water line connections & underground power', 'Zero high-rise obstruction'],
  },
  {
    id: 'buffer',
    name: 'Sector D: Green Buffer & Jogging Trail',
    badge: 'Eco Infrastructure',
    stat: '1.2 km Track',
    desc: 'Perimeter eco-green zone featuring on-site Sewage Treatment Plant (STP), rainwater harvesting recharge wells, and continuous jogging circuit.',
    features: ['Scientific rainwater recharge pits', 'Continuous 1.2 km rubberized jogging circuit', 'Dense native tree canopy mitigating urban heat'],
  },
]

// Virtual Room Showcase Data
const virtualRooms = [
  {
    id: 'living',
    name: 'Grand Living & Dining Lounge',
    dimension: '18 ft × 14 ft',
    image: '/residential.jpg',
    desc: 'High-gloss marble flooring with double-height ceiling feel, expansive natural light, and direct sit-out access.',
  },
  {
    id: 'master',
    name: 'King Master Bedroom Suite',
    dimension: '16 ft × 15 ft',
    image: '/luxury-villas.jpg',
    desc: 'Private en-suite with walk-in wardrobe alcove, anti-skid bathroom finishes, and private open balcony.',
  },
  {
    id: 'kitchen',
    name: 'Modular Granite Kitchen',
    dimension: '12 ft × 10 ft',
    image: '/commercial.jpg',
    desc: 'Vastu-aligned South-East Agneya placement with 7ft glazed tile dadoing and separate utility wash yard.',
  },
  {
    id: 'terrace',
    name: 'Private Open Sky Rooftop',
    dimension: '400+ sq.ft',
    image: '/apartment.jpg',
    desc: 'Independent terrace for private family gatherings, stargazing, and rooftop garden setup.',
  },
]

// Customer Mindset: Family Generation Personas
const familyPersonas = [
  {
    id: 'parents',
    label: '👴 Elderly Parents',
    title: 'Zero-Barrier Daily Peace & Prana',
    subtitle: 'Designed for healthy senior living without physical barriers',
    desc: 'Senior family members enjoy a complete ground-floor bedroom suite with attached bathroom—eliminating the need to climb stairs. Morning walks along tree-shaded flat concrete avenues and peaceful daily prayer in the East-aligned Puja room make daily life healthy and dignified.',
    features: [
      'Ground-floor master bedroom with zero stair climbing',
      'East-facing peaceful traditional Puja Niche',
      'Flat 40ft wide avenue walking tracks with no traffic hazards',
      'Active community of senior residents & garden gazebos',
    ],
    metric: '100% Flat Ground Floor Living',
  },
  {
    id: 'professionals',
    label: '💼 Working Professionals',
    title: 'Fast Metro Transit & Dedicated Focus Suites',
    subtitle: 'Seamless connection to Hyderabad IT and industrial hubs',
    desc: 'Commute without city traffic fatigue. Reaching Habsiguda or Uppal Blue Line Metro stations takes under 7 minutes, enabling quick transit to Secunderabad, Ameerpet, and Hitec City. For hybrid work days, the first-floor study room provides acoustic quietude and high-speed fiber internet.',
    features: [
      '5–7 mins to Habsiguda & Uppal Blue Line Metro',
      'Dedicated acoustic room suitable for Executive Home Office',
      'High-speed fiber optic broadband readiness',
      '15 mins to Mindspace Pocharam & IDA Nacharam hubs',
    ],
    metric: '45 Mins Saved Daily on Commute',
  },
  {
    id: 'children',
    label: '🧒 Children & Youth',
    title: 'Safe, Screen-Free Outdoor Upbringing',
    subtitle: 'Gated freedom with zero external through-traffic',
    desc: 'Give your children a childhood surrounded by nature and friends. A gated 14-acre perimeter with 24/7 security allows kids to ride bicycles, play in the soft-surface playground, and splash in the supervised pool without parents worrying about vehicular hazards.',
    features: [
      'Zero external through-traffic on internal township roads',
      'Dedicated soft-ground park with swings, slides & sandpit',
      'Shallow kids splash pool with safety grab railings',
      'Top institutions nearby: DPS Nacharam & HPS Ramanthapur',
    ],
    metric: '14 Acres of Secure Play Zones',
  },
  {
    id: 'homemakers',
    label: '👩‍🍳 Homemakers & Hosts',
    title: 'Effortless Daily Living & Elegant Entertaining',
    subtitle: 'Functional spatial flow and community warmth',
    desc: 'A spacious modular granite kitchen with 7ft glazed tile dadoing, separate utility wash yard, and attached pantry storage ensures cooking is a pleasure. The double-height living room and open rooftop terrace make festive celebrations and family get-togethers effortless.',
    features: [
      'Spacious granite kitchen with dry & wet utility yard',
      '300 meters to Chilakanagar daily fresh vegetable market',
      'Over 400 sq.ft private rooftop terrace for kitchen gardens',
      'Air-conditioned banquet clubhouse for family birthday parties',
    ],
    metric: 'Double-Height Living & Terrace',
  },
]

// Customer Objection FAQs
const faqs = [
  {
    q: 'Is Tirumala Meadows fully completed or under construction?',
    a: 'Tirumala Meadows is a 100% completed, fully occupied gated community. There is zero construction delay risk. All internal 40ft roads, central clubhouse, swimming pool, water lines, and security gates are fully operational.',
  },
  {
    q: 'Are bank home loans approved for units in this community?',
    a: 'Yes. The project has clear legal marketable titles and is pre-approved for home loans by major nationalized and private financial institutions including State Bank of India (SBI), HDFC Bank, ICICI Bank, and Axis Bank.',
  },
  {
    q: 'What is the water supply and electrical infrastructure setup?',
    a: 'The township features a pressurized 24-hour dual water supply via large central overhead reservoirs and scientific groundwater recharge pits. A dedicated diesel generator provides backup power for all avenue streetlights, pumping stations, and the central clubhouse.',
  },
  {
    q: 'How does the community handle property maintenance and security?',
    a: 'The township is governed by an active Resident Welfare Association (RWA) with 24/7 manned security guards, RFID boom barriers at the main gate, continuous CCTV coverage, and professional facility maintenance staff for landscaping and street cleaning.',
  },
  {
    q: 'How can I schedule a private visit or check resale unit availability?',
    a: 'You can submit a visit request through our website or call our site desk directly at +91 97007 60120. Our resident representative will assist with gate entry passes and schedule a guided walkthrough.',
  },
]

export default function HomePage() {
  const [activeVilla, setActiveVilla] = useState('3bhk')
  const [activeSector, setActiveSector] = useState('entrance')
  const [activeRoom, setActiveRoom] = useState('living')
  const [activePersona, setActivePersona] = useState('parents')
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [isBrochureOpen, setIsBrochureOpen] = useState(false)

  // Comparison toggle
  const [compareMode, setCompareMode] = useState(false)
  const [compareItems, setCompareItems] = useState<string[]>([])

  // EMI Calculator state
  const [loanAmount, setLoanAmount] = useState(100)
  const [tenure, setTenure] = useState(20)
  const [rate, setRate] = useState(8.5)

  // Institutional ROI Calculator state
  const [investmentAmount, setInvestmentAmount] = useState(120) // in Lakhs
  const [holdingYears, setHoldingYears] = useState(5)
  const appreciationRate = 12.5 // % annual CAGR

  // EMI Calculation
  const monthlyRate = rate / 12 / 100
  const months = tenure * 12
  const emi = loanAmount > 0 && months > 0
    ? Math.round((loanAmount * 100000 * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1))
    : 0
  const totalPayable = emi * months
  const totalInterest = totalPayable - loanAmount * 100000

  // ROI Calculation
  const futureAssetValue = Math.round(investmentAmount * Math.pow(1 + appreciationRate / 100, holdingYears))
  const capitalGain = futureAssetValue - investmentAmount
  const annualRental = Math.round(investmentAmount * 0.04)
  const totalRentEarned = annualRental * holdingYears

  // Scroll counters
  const c1 = useCounter(14)
  const c2 = useCounter(300)
  const c3 = useCounter(3)
  const c4 = useCounter(100)

  // Fade animations
  const f1 = useFadeIn()
  const f2 = useFadeIn()
  const f3 = useFadeIn()
  const f4 = useFadeIn()
  const f5 = useFadeIn()
  const f6 = useFadeIn()

  const toggleCompare = (id: string) => {
    setCompareItems((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : prev.length < 2 ? [...prev, id] : prev
    )
  }

  const selectedSector = townshipSectors.find((s) => s.id === activeSector) || townshipSectors[0]
  const currentRoom = virtualRooms.find((r) => r.id === activeRoom) || virtualRooms[0]
  const currentPersona = familyPersonas.find((p) => p.id === activePersona) || familyPersonas[0]

  const whatsappUrl = `https://wa.me/919700760120?text=${encodeURIComponent(
    'Hello Tirumala Meadows Desk, I would like to inquire about villa resale availability and schedule a private site visit.'
  )}`

  return (
    <div className="min-h-screen bg-white text-navy font-sans antialiased selection:bg-hotpink selection:text-white pb-16 sm:pb-0">
      <Navbar />

      {/* ═══════════════════════════════════════════════════ */}
      {/* 1. HERO SECTION (0–5 Second Customer Filter)         */}
      {/* ═══════════════════════════════════════════════════ */}
      <section className="relative pt-24 pb-16 sm:pt-32 sm:pb-24 overflow-hidden border-b border-border bg-gradient-to-b from-soft via-white to-white">
        <div className="absolute top-10 right-1/4 w-[480px] h-[480px] rounded-full bg-hotpink/[0.03] blur-[120px] pointer-events-none" />

        <div className="mx-auto max-w-6xl px-6 text-center">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-1.5 text-xs font-semibold text-slate-grey shadow-xs mb-6">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-navy font-bold">14-Acre Gated Villa Community</span>
            <span className="text-border">·</span>
            <span className="text-hotpink font-bold">100% Ready To Move In</span>
          </div>

          {/* Main Display Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-navy leading-[1.1] font-display max-w-4xl mx-auto">
            Sophisticated Living.{' '}
            <span className="block text-slate-grey font-medium mt-1">
              Timeless Comfort.
            </span>
          </h1>

          {/* Value Proposition */}
          <p className="mt-6 text-base sm:text-lg text-slate-grey max-w-2xl mx-auto leading-relaxed">
            Welcome to <strong>Tirumala Meadows</strong> — a thoughtfully planned 14-acre gated villa community in East Hyderabad (Uppal / Boduppal), offering independent duplex family living, landscaped green spaces, and direct Blue Line metro connectivity.
          </p>

          {/* Primary Action Buttons */}
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-hotpink px-7 py-3.5 text-xs sm:text-sm font-bold text-white shadow-hotpink-pill hover:bg-hotpink-hover hover:-translate-y-0.5 active:translate-y-0 transition-all"
            >
              <Calendar className="h-4 w-4" />
              <span>Schedule Private Site Visit</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-emerald-50 px-6 py-3.5 text-xs sm:text-sm font-bold text-emerald-800 hover:bg-emerald-100 transition shadow-xs"
            >
              <MessageSquare className="h-4 w-4 text-emerald-600" />
              <span>WhatsApp Concierge</span>
            </a>

            <button
              onClick={() => setIsBrochureOpen(true)}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-6 py-3.5 text-xs sm:text-sm font-semibold text-navy hover:bg-soft hover:border-navy transition shadow-xs"
            >
              <FileText className="h-4 w-4 text-hotpink" />
              <span>Project Factsheet</span>
            </button>
          </div>

          {/* Developer Attribution Subtitle */}
          <p className="mt-5 text-xs text-slate-grey">
            Developed by <strong>Mansani Constructions Pvt Ltd</strong> · Thirumala Meadows Colony, Chilakanagar, Uppal
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════ */}
      {/* 2. TRUST & LEGAL VALIDATION (5–20 Second Filter)    */}
      {/* ═══════════════════════════════════════════════════ */}
      <section className="py-6 bg-soft border-b border-border">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-wrap items-center justify-between gap-6 text-xs text-slate-grey">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
              <span className="font-bold text-navy">Clear Title & GHMC Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-hotpink shrink-0" />
              <span className="font-bold text-navy">Earthquake Resistant RCC Frame</span>
            </div>
            <div className="flex items-center gap-2">
              <Landmark className="h-4 w-4 text-navy shrink-0" />
              <span className="font-semibold text-navy">Bank Approvals: SBI · HDFC · ICICI · Axis</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              <span className="font-bold text-emerald-800">Zero Construction Risk (Completed)</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════ */}
      {/* 3. COMMUNITY SCALE (Statistics Counters)            */}
      {/* ═══════════════════════════════════════════════════ */}
      <section id="overview" className="py-20 bg-white border-b border-border">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { ref: c1.ref, value: c1.count, suffix: ' Acres', label: 'Total Land Area', sub: 'Master-planned layout' },
              { ref: c2.ref, value: c2.count, suffix: '+', label: 'Independent Units', sub: 'Ground + 1 duplexes' },
              { ref: c3.ref, value: c3.count, suffix: ' Options', label: 'Villa Configurations', sub: '2, 3 & 4 BHK layouts' },
              { ref: c4.ref, value: c4.count, suffix: '%', label: 'Ready To Move', sub: 'Fully completed township' },
            ].map((s, i) => (
              <div
                key={i}
                ref={s.ref}
                className="rounded-3xl bg-soft border border-border p-6 text-center hover:shadow-corporate-hover hover:-translate-y-1 transition-all duration-300"
              >
                <p className="text-3xl sm:text-4xl font-extrabold text-navy font-display tracking-tight">
                  {s.value}{s.suffix}
                </p>
                <p className="text-xs font-bold text-navy mt-1.5">{s.label}</p>
                <p className="text-[11px] text-slate-grey mt-0.5">{s.sub}</p>
              </div>
            ))}
          </div>

          <div ref={f1.ref} className={`mt-14 text-center max-w-2xl mx-auto ${f1.className}`}>
            <span className="text-xs font-bold text-hotpink uppercase tracking-wider">Project Story</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy tracking-tight font-display mt-1">
              Space to Live. Freedom to Belong.
            </h2>
            <p className="mt-3 text-sm text-slate-grey leading-relaxed">
              Developed by Mansani Constructions Pvt Ltd, Tirumala Meadows represents the pinnacle of private gated estate living in East Hyderabad. Every villa provides independent ownership, a private rooftop terrace, dedicated parking, and full access to signature community amenities.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════ */}
      {/* 4. VILLA CONFIGURATIONS (20–45 Second Product Fit)   */}
      {/* ═══════════════════════════════════════════════════ */}
      <section id="villas" className="py-20 bg-soft border-b border-border">
        <div ref={f2.ref} className={`mx-auto max-w-6xl px-6 ${f2.className}`}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold text-hotpink uppercase tracking-wider">Independent Duplexes</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-navy tracking-tight font-display mt-1">
                Villa Configurations & Floorplans
              </h2>
              <p className="text-xs sm:text-sm text-slate-grey mt-1">
                Engineered for maximum natural illumination, privacy, and cross-ventilation.
              </p>
            </div>

            {/* Compare Toggle */}
            <button
              onClick={() => { setCompareMode(!compareMode); setCompareItems([]) }}
              className={`rounded-full px-5 py-2 text-xs font-bold transition border shadow-xs ${
                compareMode
                  ? 'bg-navy text-white border-navy'
                  : 'bg-white border-border text-slate-grey hover:text-navy hover:border-navy'
              }`}
            >
              {compareMode ? '✕ Close Comparison' : '⇔ Compare 2 Configurations'}
            </button>
          </div>

          {/* Villa Cards */}
          <div className="grid gap-6 md:grid-cols-3">
            {villas.map((v) => {
              const isSelected = compareItems.includes(v.id)
              return (
                <div
                  key={v.id}
                  onClick={() => compareMode ? toggleCompare(v.id) : setActiveVilla(v.id)}
                  className={`group rounded-3xl border p-6 sm:p-7 cursor-pointer transition-all duration-300 hover:shadow-corporate-hover hover:-translate-y-1 ${
                    compareMode && isSelected
                      ? 'border-hotpink bg-hotpink/[0.04] shadow-[0_0_0_2px_rgba(247,37,133,0.3)]'
                      : activeVilla === v.id && !compareMode
                        ? 'border-navy bg-navy text-white shadow-corporate-hover'
                        : 'border-border bg-white text-navy'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-[10px] font-bold uppercase tracking-wider rounded-full px-3 py-0.5 ${
                      activeVilla === v.id && !compareMode
                        ? 'bg-white/10 text-white'
                        : 'bg-soft text-slate-grey border border-border'
                    }`}>
                      {v.tag}
                    </span>
                    <span className={`text-xs font-bold ${
                      activeVilla === v.id && !compareMode ? 'text-hotpink-light' : 'text-hotpink'
                    }`}>
                      {v.price}
                    </span>
                  </div>

                  <h3 className={`text-2xl font-bold font-display ${activeVilla === v.id && !compareMode ? 'text-white' : 'text-navy'}`}>
                    {v.label}
                  </h3>
                  <p className={`text-lg font-bold font-display mt-0.5 ${activeVilla === v.id && !compareMode ? 'text-white/90' : 'text-navy'}`}>
                    {v.area}
                  </p>

                  <div className={`flex gap-4 mt-3 text-xs ${activeVilla === v.id && !compareMode ? 'text-white/70' : 'text-slate-grey'}`}>
                    <span>{v.beds} Bedrooms</span>
                    <span>·</span>
                    <span>{v.baths} Bathrooms</span>
                    <span>·</span>
                    <span>G + 1 Structure</span>
                  </div>

                  <div className="mt-5 space-y-2.5 border-t pt-4 border-inherit">
                    {v.highlights.map((h, i) => (
                      <div key={i} className={`flex items-start gap-2 text-xs ${activeVilla === v.id && !compareMode ? 'text-white/80' : 'text-slate-grey'}`}>
                        <Check className="h-3.5 w-3.5 text-hotpink shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>

                  {compareMode ? (
                    <div className="mt-5 pt-3 border-t border-inherit text-center">
                      <span className={`text-xs font-bold ${isSelected ? 'text-hotpink' : 'text-slate-grey'}`}>
                        {isSelected ? '✓ Selected for Compare' : 'Tap to Compare'}
                      </span>
                    </div>
                  ) : (
                    <div className="mt-6 pt-2">
                      <Link
                        to="/villas"
                        className={`w-full py-2.5 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 transition ${
                          activeVilla === v.id
                            ? 'bg-hotpink text-white hover:bg-hotpink-hover shadow-xs'
                            : 'bg-soft text-navy hover:bg-white border border-border'
                        }`}
                      >
                        <span>View Detailed Plan</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Comparative Matrix Drawer */}
          {compareMode && compareItems.length === 2 && (
            <div className="mt-8 rounded-3xl border border-border bg-white p-6 sm:p-8 shadow-corporate animate-fade-up">
              <div className="flex items-center justify-between mb-4 border-b border-border pb-3">
                <h3 className="text-lg font-bold text-navy font-display">Side-by-Side Architectural Comparison</h3>
                <span className="text-xs text-slate-grey">Comparative Specification Matrix</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 text-xs text-slate-grey font-bold uppercase">Specification</th>
                      {compareItems.map((id) => {
                        const v = villas.find((x) => x.id === id)!
                        return <th key={id} className="text-center py-3 px-4 font-bold text-navy font-display">{v.label}</th>
                      })}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {[
                      { label: 'Super Built Area', key: 'area' },
                      { label: 'Bedrooms', key: 'beds' },
                      { label: 'Bathrooms', key: 'baths' },
                      { label: 'Market Resale Est.', key: 'price' },
                      { label: 'Rooftop Terrace', key: 'terrace' },
                      { label: 'Car Parking', key: 'parking' },
                    ].map((row) => (
                      <tr key={row.label}>
                        <td className="py-3 px-4 text-xs text-slate-grey font-medium">{row.label}</td>
                        {compareItems.map((id) => {
                          const v = villas.find((x) => x.id === id)!
                          let val = ''
                          if (row.key === 'area') val = v.area
                          else if (row.key === 'beds') val = `${v.beds} Suites`
                          else if (row.key === 'baths') val = `${v.baths} Baths`
                          else if (row.key === 'price') val = v.price
                          else if (row.key === 'terrace') val = 'Included (Private)'
                          else if (row.key === 'parking') val = 'Covered Porch'
                          return <td key={id} className="py-3 px-4 text-center text-xs sm:text-sm font-bold text-navy">{val}</td>
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════ */}
      {/* 5. 3D ARCHITECTURAL STUDIO & VIRTUAL WALKTHROUGH    */}
      {/* ═══════════════════════════════════════════════════ */}
      <section className="py-20 bg-white border-b border-border">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-navy/5 px-3.5 py-1 text-xs font-bold text-navy">
              <Sparkles className="h-3 w-3 text-hotpink" />
              <span>Multi-Mode Architectural Studio</span>
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy font-display tracking-tight mt-2">
              Interactive 3D Cutaway, CAD & Walkthrough
            </h2>
            <p className="text-xs sm:text-sm text-slate-grey mt-2">
              Switch between <strong>3D Isometric Models</strong>, <strong>2D Engineering CAD Blueprints</strong> with dimensional calipers, and <strong>First-Person Virtual Walkthroughs</strong>.
            </p>
          </div>

          <Villa3DViewer />
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════ */}
      {/* 6. DESIGNED FOR EVERY GENERATION (Customer Mindset) */}
      {/* ═══════════════════════════════════════════════════ */}
      <section className="py-20 bg-soft border-b border-border">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1 rounded-full bg-hotpink/10 px-3 py-0.5 text-xs font-bold text-hotpink">
              Family-Centric Living
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy font-display tracking-tight mt-2">
              Designed for Every Generation
            </h2>
            <p className="text-xs sm:text-sm text-slate-grey mt-2">
              A home purchase is a family decision. See how Tirumala Meadows caters to the distinct needs of every member.
            </p>

            {/* Persona Switcher Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
              {familyPersonas.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setActivePersona(p.id)}
                  className={`rounded-full px-4 sm:px-5 py-2 text-xs font-bold transition ${
                    activePersona === p.id
                      ? 'bg-navy text-white shadow-xs'
                      : 'bg-white border border-border text-slate-grey hover:text-navy hover:bg-soft'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Persona Card */}
          <div className="rounded-3xl border border-border bg-white p-6 sm:p-10 shadow-corporate">
            <div className="grid gap-8 lg:grid-cols-12 items-center">
              
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-hotpink bg-hotpink/10 rounded-full px-3 py-0.5">
                    {currentPersona.subtitle}
                  </span>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-2.5 py-0.5">
                    {currentPersona.metric}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-navy font-display">{currentPersona.title}</h3>
                <p className="text-sm text-slate-grey leading-relaxed">{currentPersona.desc}</p>

                <div className="space-y-2 pt-2">
                  {currentPersona.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs text-slate-grey bg-soft p-3 rounded-xl border border-border">
                      <Check className="h-4 w-4 text-hotpink shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-2xl border border-border bg-soft p-6 space-y-4 text-center">
                  <div className="h-14 w-14 rounded-full bg-white border border-border flex items-center justify-center mx-auto text-hotpink shadow-xs">
                    <Heart className="h-7 w-7" />
                  </div>
                  <div>
                    <p className="text-base font-bold text-navy font-display">{currentPersona.label}</p>
                    <p className="text-xs text-slate-grey mt-0.5">Peace of mind, comfort & multi-generational belonging</p>
                  </div>
                  <div className="pt-2">
                    <Link
                      to="/contact"
                      className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-navy py-2.5 text-xs font-bold text-white hover:bg-navy-surface transition shadow-xs"
                    >
                      <Calendar className="h-3.5 w-3.5 text-hotpink" />
                      <span>Book a Family Walkthrough</span>
                    </Link>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════ */}
      {/* 7. 14-ACRE MASTER LAYOUT (Spatial Organization)     */}
      {/* ═══════════════════════════════════════════════════ */}
      <section className="py-20 bg-white border-b border-border">
        <div ref={f3.ref} className={`mx-auto max-w-6xl px-6 ${f3.className}`}>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-hotpink uppercase tracking-wider">Township Master Plan</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy font-display tracking-tight mt-1">
              Explore the 14-Acre Master Layout
            </h2>
            <p className="text-xs sm:text-sm text-slate-grey mt-2">
              Select different sectors of the community to inspect street layout, setbacks, and infrastructure.
            </p>

            {/* Sector Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
              {townshipSectors.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setActiveSector(s.id)}
                  className={`rounded-full px-4 sm:px-5 py-2 text-xs font-semibold transition ${
                    activeSector === s.id
                      ? 'bg-navy text-white shadow-xs'
                      : 'bg-soft border border-border text-slate-grey hover:text-navy hover:bg-white'
                  }`}
                >
                  {s.badge}
                </button>
              ))}
            </div>
          </div>

          {/* Master Layout Interactive Card */}
          <div className="rounded-3xl border border-border bg-soft p-6 sm:p-10 shadow-corporate">
            <div className="grid gap-8 lg:grid-cols-12 items-center">
              
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-hotpink rounded-full bg-hotpink/10 px-3 py-0.5">
                    {selectedSector.badge}
                  </span>
                  <span className="text-xs font-bold text-navy">Metric: {selectedSector.stat}</span>
                </div>

                <h3 className="text-2xl font-bold text-navy font-display">{selectedSector.name}</h3>
                <p className="text-sm text-slate-grey leading-relaxed">{selectedSector.desc}</p>

                <div className="space-y-2 pt-2">
                  {selectedSector.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs text-slate-grey bg-white p-3 rounded-xl border border-border">
                      <Check className="h-4 w-4 text-hotpink shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-2xl border border-border bg-white p-6 space-y-4 text-center">
                  <div className="h-14 w-14 rounded-full bg-soft border border-border flex items-center justify-center mx-auto text-hotpink">
                    <Compass className="h-7 w-7" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-navy font-display">14-Acre Integrated Master Plan</p>
                    <p className="text-xs text-slate-grey mt-0.5">Wide internal BT roads · Underground cabling · Central Park</p>
                  </div>
                  <div className="pt-2">
                    <button
                      onClick={() => setIsBrochureOpen(true)}
                      className="inline-flex items-center gap-2 text-xs font-bold text-hotpink hover:underline"
                    >
                      <FileText className="h-3.5 w-3.5" />
                      <span>Inspect Approved Master Plan Blueprint</span>
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════ */}
      {/* 8. AMENITIES (Lifestyle Infrastructure)             */}
      {/* ═══════════════════════════════════════════════════ */}
      <section id="amenities" className="py-20 bg-soft border-b border-border">
        <div ref={f4.ref} className={`mx-auto max-w-6xl px-6 ${f4.className}`}>
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-hotpink uppercase tracking-wider">Lifestyle Infrastructure</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy tracking-tight font-display mt-1">
              Complete Ecosystem for Health & Leisure
            </h2>
            <p className="text-xs sm:text-sm text-slate-grey mt-1">
              Curated facilities designed for multi-generational recreation and wellness.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {amenities.map((a, i) => {
              const Icon = a.icon
              return (
                <div
                  key={i}
                  className="group rounded-3xl bg-white border border-border p-5 text-center hover:shadow-corporate-hover hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="h-12 w-12 rounded-2xl bg-soft border border-border flex items-center justify-center mx-auto mb-3 group-hover:bg-hotpink/10 group-hover:border-hotpink/20 transition">
                    <Icon className="h-5 w-5 text-slate-grey group-hover:text-hotpink transition" />
                  </div>
                  <p className="text-sm font-bold text-navy font-display">{a.name}</p>
                  <p className="text-[11px] text-slate-grey mt-1">{a.desc}</p>
                </div>
              )
            })}
          </div>

          <div className="text-center mt-9">
            <Link
              to="/amenities"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-hotpink hover:underline uppercase tracking-wide"
            >
              <span>Explore Clubhouse & Lifestyle Facilities</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════ */}
      {/* 9. FINANCIAL SIMULATORS (ROI & EMI CALCULATOR)      */}
      {/* ═══════════════════════════════════════════════════ */}
      <section id="roi" className="py-20 bg-white border-b border-border">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-navy/5 px-3 py-1 text-xs font-bold text-navy">
              Institutional Financial Model
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy font-display tracking-tight mt-2">
              Investor ROI & Capital Appreciation Engine
            </h2>
            <p className="text-xs sm:text-sm text-slate-grey mt-1.5">
              Simulate 5-year capital appreciation and rental cashflow in the rapidly appreciating East Hyderabad Uppal corridor.
            </p>
          </div>

          <div className="rounded-3xl border border-border bg-soft p-6 sm:p-10 shadow-corporate">
            <div className="grid gap-10 lg:grid-cols-12 items-center">
              
              {/* Sliders */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <div className="flex justify-between text-xs font-bold text-navy mb-2">
                    <span>Villa Asset Value</span>
                    <span className="text-hotpink font-display text-sm">₹{investmentAmount} Lakhs</span>
                  </div>
                  <input
                    type="range"
                    min="80"
                    max="220"
                    step="5"
                    value={investmentAmount}
                    onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                    className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-slate-200 accent-hotpink"
                  />
                  <div className="flex justify-between text-[10px] text-slate-grey mt-1">
                    <span>₹80 Lakhs (2 BHK)</span>
                    <span>₹2.2 Crores (4 BHK)</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-navy mb-2">
                    <span>Investment Horizon</span>
                    <span className="text-navy font-display text-sm">{holdingYears} Years</span>
                  </div>
                  <input
                    type="range"
                    min="3"
                    max="10"
                    value={holdingYears}
                    onChange={(e) => setHoldingYears(Number(e.target.value))}
                    className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-slate-200 accent-navy"
                  />
                  <div className="flex justify-between text-[10px] text-slate-grey mt-1">
                    <span>3 Years</span>
                    <span>10 Years</span>
                  </div>
                </div>

                <div className="rounded-2xl bg-white border border-border p-4 text-xs text-slate-grey space-y-1.5">
                  <div className="flex items-center gap-2 font-bold text-navy">
                    <TrendingUp className="h-4 w-4 text-emerald-600" />
                    <span>Historic Corridor Growth Metric (+12.5% CAGR)</span>
                  </div>
                  <p className="leading-relaxed">
                    East Hyderabad has experienced steady price appreciation driven by the Uppal Blue Line Metro, Warangal Highway expansion, and IDA Nacharam tech hubs.
                  </p>
                </div>
              </div>

              {/* Projected Returns Card */}
              <div className="lg:col-span-6">
                <div className="rounded-3xl bg-navy text-white p-6 sm:p-8 shadow-xl space-y-6">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-white/50">
                      Projected Asset Value ({holdingYears} Years)
                    </span>
                    <p className="text-3xl sm:text-4xl font-extrabold font-display mt-1 text-white">
                      ₹{(futureAssetValue / 100).toFixed(2)} Crores
                    </p>
                    <p className="text-xs text-emerald-400 mt-1 font-semibold">
                      +₹{(capitalGain / 100).toFixed(2)} Cr Estimated Capital Gain
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10 text-xs">
                    <div className="rounded-xl bg-white/5 p-3 border border-white/10">
                      <span className="text-white/50 block text-[10px] uppercase">Annual Rental Yield</span>
                      <strong className="text-white text-sm font-display mt-0.5 block">
                        ₹{(annualRental / 100).toFixed(2)} L/yr
                      </strong>
                      <span className="text-[10px] text-white/40">~4.0% p.a. yield</span>
                    </div>

                    <div className="rounded-xl bg-white/5 p-3 border border-white/10">
                      <span className="text-white/50 block text-[10px] uppercase">Total Cumulative Rent</span>
                      <strong className="text-hotpink-light text-sm font-display mt-0.5 block">
                        ₹{(totalRentEarned / 100).toFixed(2)} L
                      </strong>
                      <span className="text-[10px] text-white/40">Over {holdingYears} years</span>
                    </div>
                  </div>

                  <p className="text-[10px] text-white/40 italic">
                    * Projections based on conservative historical property trends in Boduppal/Uppal. Independent villas hold high land-share equity.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* EMI CALCULATOR SECTION */}
      <section id="emi" className="py-20 bg-navy text-white">
        <div ref={f5.ref} className={`mx-auto max-w-6xl px-6 ${f5.className}`}>
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-hotpink uppercase tracking-wider">Financial Planning</span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight font-display mt-1">
              Home Loan Repayment & EMI Simulator
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-white/60 max-w-md mx-auto">
              Real-time loan calculation based on current banking interest rates (SBI, HDFC, ICICI pre-approved).
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Sliders */}
            <div className="space-y-7 rounded-3xl bg-white/5 border border-white/10 p-6 sm:p-8">
              <div>
                <div className="flex justify-between text-xs sm:text-sm mb-2 font-semibold">
                  <span className="text-white/70">Loan Principal</span>
                  <span className="text-white font-display text-base">₹{loanAmount} Lakhs</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="250"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-white/20 accent-hotpink"
                />
                <div className="flex justify-between text-[10px] text-white/40 mt-1">
                  <span>₹20L</span><span>₹250L</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs sm:text-sm mb-2 font-semibold">
                  <span className="text-white/70">Tenure</span>
                  <span className="text-white font-display text-base">{tenure} Years</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="30"
                  value={tenure}
                  onChange={(e) => setTenure(Number(e.target.value))}
                  className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-white/20 accent-hotpink"
                />
                <div className="flex justify-between text-[10px] text-white/40 mt-1">
                  <span>5 Yrs</span><span>30 Yrs</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs sm:text-sm mb-2 font-semibold">
                  <span className="text-white/70">Interest Rate</span>
                  <span className="text-white font-display text-base">{rate}% p.a.</span>
                </div>
                <input
                  type="range"
                  min="7.5"
                  max="12.0"
                  step="0.1"
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-white/20 accent-hotpink"
                />
                <div className="flex justify-between text-[10px] text-white/40 mt-1">
                  <span>7.5%</span><span>12.0%</span>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="rounded-3xl bg-white/5 border border-white/10 p-6 sm:p-8 flex flex-col justify-center">
              <div className="text-center mb-6">
                <p className="text-[11px] text-white/50 uppercase tracking-wider font-bold">Estimated Monthly EMI</p>
                <p className="text-4xl sm:text-5xl font-extrabold text-white font-display mt-2">
                  ₹{emi.toLocaleString('en-IN')}
                </p>
                <p className="text-xs text-white/40 mt-1">per month</p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="rounded-xl bg-white/5 border border-white/10 p-3">
                  <p className="text-[10px] text-white/50 uppercase">Total Repayable</p>
                  <p className="text-sm font-bold text-white mt-0.5">₹{(totalPayable / 100000).toFixed(1)}L</p>
                </div>
                <div className="rounded-xl bg-white/5 border border-white/10 p-3">
                  <p className="text-[10px] text-white/50 uppercase">Total Interest</p>
                  <p className="text-sm font-bold text-hotpink-light mt-0.5">₹{(totalInterest / 100000).toFixed(1)}L</p>
                </div>
              </div>

              <div className="mt-6">
                <div className="h-3 w-full rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-hotpink to-[#FF6B9D] transition-all duration-500"
                    style={{ width: `${Math.min((loanAmount * 100000 / totalPayable) * 100, 100)}%` }}
                  />
                </div>
                <div className="flex justify-between mt-1.5 text-[10px] text-white/40 font-semibold">
                  <span>Principal ({(loanAmount * 100000 / totalPayable * 100).toFixed(0)}%)</span>
                  <span>Interest ({(totalInterest / totalPayable * 100).toFixed(0)}%)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════ */}
      {/* 10. OBJECTION KILLER FAQ (Pre-Conversion Assurance) */}
      {/* ═══════════════════════════════════════════════════ */}
      <section className="py-20 bg-white border-b border-border">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-hotpink uppercase tracking-wider">Buyer Clarifications</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy tracking-tight font-display mt-1">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-slate-grey mt-2">
              Everything you need to know about ownership, legal titles, maintenance, and community living.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((f, idx) => {
              const isOpen = openFaq === idx
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-border bg-soft overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-white transition"
                  >
                    <span className="text-sm font-bold text-navy font-display">{f.q}</span>
                    <div className={`h-7 w-7 rounded-full border border-border bg-white flex items-center justify-center shrink-0 transition-transform ${isOpen ? 'rotate-180 text-hotpink' : 'text-navy'}`}>
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-grey leading-relaxed border-t border-border/50 bg-white">
                      <p>{f.a}</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════ */}
      {/* 11. FINAL CONVERSION SECTION (Site Visit Booking)   */}
      {/* ═══════════════════════════════════════════════════ */}
      <section className="py-20 bg-soft border-t border-border">
        <div ref={f6.ref} className={`mx-auto max-w-6xl px-6 text-center ${f6.className}`}>
          <span className="text-xs font-bold text-hotpink uppercase tracking-wider">Arrange a Site Tour</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy tracking-tight font-display mt-1">
            Your Next Chapter Starts at Tirumala Meadows
          </h2>
          <p className="mt-3 text-sm text-slate-grey max-w-lg mx-auto leading-relaxed">
            Discover the independence and enduring value of gated villa living in East Hyderabad. Contact our desk to schedule a private walkthrough.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-hotpink px-7 py-3.5 text-xs sm:text-sm font-bold text-white shadow-hotpink-pill hover:bg-hotpink-hover hover:-translate-y-0.5 transition-all"
            >
              <span>Schedule a Private Site Visit</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-emerald-50 px-6 py-3.5 text-xs sm:text-sm font-bold text-emerald-800 hover:bg-emerald-100 transition shadow-xs"
            >
              <MessageSquare className="h-4 w-4 text-emerald-600" />
              <span>WhatsApp Inquiries</span>
            </a>
            <a
              href="tel:+919700760120"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-6 py-3.5 text-xs sm:text-sm font-semibold text-navy hover:bg-soft transition"
            >
              Call +91 97007 60120
            </a>
          </div>
          <p className="mt-6 text-[11px] text-slate-grey">
            Developed by Mansani Constructions Pvt Ltd · Completed Gated Community · Resale & Rental Facilitation Desk
          </p>
        </div>
      </section>

      <Footer />

      {/* ═══════════════════════════════════════════════════ */}
      {/* STICKY MOBILE CONVERSION BAR (Mobile UX Upgrade)   */}
      {/* ═══════════════════════════════════════════════════ */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-border p-3 flex sm:hidden items-center justify-between gap-2 shadow-lg">
        <a
          href="tel:+919700760120"
          className="flex-1 flex items-center justify-center gap-1.5 rounded-full border border-border bg-soft py-2.5 text-xs font-bold text-navy"
        >
          <Phone className="h-3.5 w-3.5 text-hotpink" />
          <span>Call Desk</span>
        </a>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 rounded-full bg-emerald-600 py-2.5 text-xs font-bold text-white shadow-xs"
        >
          <MessageSquare className="h-3.5 w-3.5" />
          <span>WhatsApp</span>
        </a>
        <Link
          to="/contact"
          className="flex-1 flex items-center justify-center gap-1.5 rounded-full bg-hotpink py-2.5 text-xs font-bold text-white shadow-hotpink-pill"
        >
          <Calendar className="h-3.5 w-3.5" />
          <span>Visit</span>
        </Link>
      </div>

      {/* Corporate Factsheet Modal */}
      <BrochureModal
        isOpen={isBrochureOpen}
        onClose={() => setIsBrochureOpen(false)}
      />
    </div>
  )
}
