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
  Car, Eye, Sparkles, Phone, HelpCircle, MessageSquare, Heart,
  Briefcase, Factory, Anchor, Globe, Trophy, Leaf, Palette, Cpu
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
      { threshold: 0.3 }
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
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return { ref, className: `transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}` }
}

/* ─── REAL PORTFOLIO DATA (User Attached Projects) ─── */
const realPortfolio = [
  {
    id: 'jubilee-facade',
    title: 'Signature Luxury Villa Facade',
    location: 'Jubilee Hills, Hyderabad',
    tag: 'Completed Masterpiece',
    category: 'Luxury Villa',
    image: '/portfolio/jubilee-hills-facade-dusk.jpg',
    specs: 'Custom Illuminated Geometric Screen · Palatial Driveway · Contemporary Elevation',
    desc: 'A benchmark in private luxury architecture in Jubilee Hills, featuring parametric warm wall apertures, integrated ambient lighting, and an expansive paved motor court.',
  },
  {
    id: 'jubilee-estate',
    title: 'Regal Classical Villa Estate',
    location: 'Jubilee Hills, Hyderabad',
    tag: 'Landmark Residence',
    category: 'Stately Villa',
    image: '/portfolio/jubilee-hills-regal-estate.jpg',
    specs: 'Classical Arched Colonnades · Landscaped Courtyard · Stately Balustrades',
    desc: 'Timeless neoclassical residential grandeur rendered in pure white stone, complete with lush gardens, arched loggias, and rooftop private entertaining pavilion.',
  },
  {
    id: 'minimalist-night',
    title: 'Modern Geometric Minimalist Villa',
    location: 'Jubilee Hills Enclave',
    tag: 'Architectural Distinction',
    category: 'Ultra-Modern Villa',
    image: '/portfolio/modern-minimalist-villa-night.jpg',
    specs: 'Cantilevered Volumes · Illuminated Portal Framework · Seamless Garden Flow',
    desc: 'Striking cantilevered lines and illuminated geometric portal frame harmonized with manicured turf lawns, crafted for distinguished elite living.',
  },
  {
    id: 'contemporary-daylight',
    title: 'Tri-Level Contemporary Villa',
    location: 'Prime Telangana Corridor',
    tag: 'Signature Architecture',
    category: 'Luxury Residence',
    image: '/portfolio/contemporary-villa-daylight.jpg',
    specs: 'Monochrome Facade Frame · Shaded Deep Eaves · Private Parking Porch',
    desc: 'Three floors of light-filled architectural clarity, maximizing cross-ventilation, panoramic upper balconies, and family privacy with smart louver detailing.',
  },
  {
    id: 'premium-towers',
    title: 'Signature Mid-Rise Residential Tower',
    location: 'Emerging Urban Corridor',
    tag: 'Modern Urban Living',
    category: 'Premium Apartments',
    image: '/portfolio/premium-apartments-tower.jpg',
    specs: 'Vertical Louver Accents · Vastu Compliance · Integrated Landscaped Podium',
    desc: 'Elegant mid-rise residential architecture offering sophisticated spatial layout, sun-shielded windows, and serene landscaped community podium.',
  },
]

/* ─── THE ART OF INTEGRATED LUXURY: IN-HOUSE ECOSYSTEM ─── */
const inHouseEcosystem = [
  {
    icon: Palette,
    title: 'In-House Architects',
    subtitle: 'Distinctive Architectural Expressions',
    desc: 'Crafting bespoke architectural concepts from scratch with bold spatial visions, optimal daylight angles, and 100% Vastu compliance.',
  },
  {
    icon: Sparkles,
    title: 'In-House Interior Designers',
    subtitle: 'Bespoke & Sophisticated Spaces',
    desc: 'Curating refined living spaces with hand-selected Italian marbles, bespoke millwork, concealed mood lighting, and tailored luxury finishes.',
  },
  {
    icon: Cpu,
    title: 'In-House Technology Team',
    subtitle: 'Intelligent Home Automation',
    desc: 'Integrating futuristic home automation, centralized climate intelligence, biometric security, and app-controlled lighting scenes.',
  },
  {
    icon: ShieldCheck,
    title: 'In-House Engineers',
    subtitle: 'Structural Precision & Excellence',
    desc: 'Executing rigorous earthquake-resistant engineering, high-grade concrete masonry, and millimeter-exact civil construction on schedule.',
  },
]

/* ─── BUSINESS VERTICALS ─── */
const businessVerticals = [
  {
    icon: Home,
    title: 'Luxury Residential Villas',
    desc: 'Exclusive bespoke villas created for eminent politicians, celebrated film personalities, and prominent industrialists.',
    tag: '30+ Completed in Jubilee Hills',
  },
  {
    icon: Building2,
    title: 'Premium Apartments',
    desc: 'High-end multi-storey residential communities crafted with thoughtful spatial planning and holistic lifestyle amenities.',
    tag: 'Contemporary Urban Living',
  },
  {
    icon: Compass,
    title: 'Residential Layouts',
    desc: 'Master-planned plotted gated communities with wide concrete avenues, underground cabling, and lush landscaped parks.',
    tag: 'DTCP & HMDA Approved',
  },
  {
    icon: Briefcase,
    title: 'Commercial & Office Spaces',
    desc: 'Architecturally distinctive corporate workspaces engineered for enterprise productivity and prime commercial presence.',
    tag: 'Prime Hyderabad Addresses',
  },
  {
    icon: Factory,
    title: 'Warehousing & Industrial',
    desc: 'Heavy-duty modern logistics hubs and high-clearance warehousing infrastructure supporting critical regional supply chains.',
    tag: 'Strategic Logistics Nodes',
  },
  {
    icon: Landmark,
    title: 'Strategic Land Acquisition',
    desc: 'Proactive acquisition of high-potential land parcels across Kollur, Velimala, Shankarpally, Vikarabad, and Western Telangana.',
    tag: '3,000+ Acres Facilitated',
  },
  {
    icon: Users,
    title: 'Land Aggregation & JVs',
    desc: 'Unlocking massive value through strategic developer partnerships, consortium collaborations, and institutional alliances.',
    tag: 'Value & Wealth Creation',
  },
  {
    icon: TrendingUp,
    title: 'Real Estate Investments',
    desc: 'Capital deployment into high-appreciation asset classes generating enduring wealth and robust generational returns.',
    tag: 'High CAGR Growth',
  },
]

/* ─── FUTURE EXPANSION & DIVERSIFICATION ─── */
const futureExpansions = [
  {
    icon: Anchor,
    title: 'Ports & Maritime Infrastructure',
    desc: 'Expanding into maritime logistics, coastal development, and modern shipping terminal infrastructure.',
  },
  {
    icon: Trees,
    title: 'Golf Courses & Leisure Destinations',
    desc: 'Curating world-class championship golf resorts, lifestyle retreats, and premier sporting communities.',
  },
  {
    icon: Trophy,
    title: 'Hospitality & Luxury Resorts',
    desc: 'Developing ultra-luxury boutique hotels, wellness sanatoria, and experiential eco-resorts.',
  },
]

/* ─── VILLA CONFIGURATIONS (Duplex Specs) ─── */
const villas = [
  {
    id: '2bhk',
    label: '2 BHK Premium',
    area: '850 – 1,400 sq.ft',
    beds: 2,
    baths: 2,
    tag: 'Compact Luxury',
    price: '₹75 – 95 L (Est.)',
    highlights: [
      'Double-height feeling living lounge with garden view',
      'East-facing traditional Puja niche with brass trim',
      'Polished granite modular kitchen with attached utility space',
      'Two master suites with attached anti-skid bathrooms',
      'Independent staircase to private open-sky terrace',
    ],
  },
  {
    id: '3bhk',
    label: '3 BHK Signature Residence',
    area: 'Approx 1,600 sq.ft',
    beds: 3,
    baths: 3,
    tag: 'Most Popular',
    price: '₹1.15 – 1.45 Cr (Est.)',
    highlights: [
      'Large formal living and dining spaces with Italian-feel finish',
      'Three expansive bedrooms with attached luxury baths',
      'Extended private balconies with serene avenue vistas',
      '100% Vastu compliance across entrance, kitchen, and beds',
      'Dedicated covered car porch and paved utility yard',
    ],
  },
  {
    id: '4bhk',
    label: '4 BHK Grand Estate',
    area: 'Up to 2,200 sq.ft',
    beds: 4,
    baths: 4,
    tag: 'Palatial Villa',
    price: '₹1.65 – 1.95 Cr (Est.)',
    highlights: [
      'Palatial living room engineered for distinguished hosting',
      'Dedicated multipurpose room / private home theatre suite',
      'Four oversized bedrooms with walk-in wardrobe niches',
      'Over 400 sq.ft private rooftop party terrace & sky garden',
      'Grand Indian Teak wood main entrance door with brass fittings',
    ],
  },
]

/* ─── AMENITIES ─── */
const amenities = [
  { icon: Dumbbell, name: 'Modern Gymnasium', desc: 'Cardio & strength equipment' },
  { icon: Droplets, name: 'Swimming Pool', desc: 'Filtered water & kids splash zone' },
  { icon: Film, name: 'Mini Theatre', desc: 'Private 40-seat screening lounge' },
  { icon: Users, name: 'Central Clubhouse', desc: 'Multi-level resident community hub' },
  { icon: Trees, name: 'Landscaped Parks', desc: 'Over 40% open green footprint' },
  { icon: ShieldCheck, name: '24/7 Gate Security', desc: 'RFID boom barriers & CCTV surveillance' },
  { icon: Zap, name: 'Power Backup', desc: 'Generator for streetlights & water pumps' },
  { icon: Compass, name: 'Jogging Track', desc: '1.2 km paved perimeter trail' },
]

/* ─── FAMILY PERSONAS ─── */
const familyPersonas = [
  {
    id: 'parents',
    label: '👴 Senior Parents',
    title: 'Zero-Barrier Daily Peace & Prana',
    subtitle: 'Healthy living without physical obstacles',
    desc: 'Elderly family members enjoy a complete ground-floor bedroom suite with attached bathroom—eliminating the need to climb stairs. Morning walks along tree-shaded flat concrete avenues and peaceful daily prayer in the East-aligned Puja room make daily life healthy and dignified.',
    features: [
      'Ground-floor master bedroom with zero stair climbing',
      'East-facing peaceful traditional Puja Niche',
      'Flat 40ft wide avenue walking tracks with zero traffic hazards',
      'Active community of senior residents & garden gazebos',
    ],
    metric: '100% Ground Floor Ease',
  },
  {
    id: 'professionals',
    label: '💼 Working Professionals',
    title: 'Fast Metro Transit & Dedicated Focus Suites',
    subtitle: 'Quick link to Hyderabad IT & business corridors',
    desc: 'Commute without city traffic fatigue. Reaching Habsiguda or Uppal Blue Line Metro stations takes under 7 minutes, enabling quick transit to Secunderabad, Ameerpet, and Hitec City. For hybrid work days, the first-floor study room provides acoustic quietude and high-speed fiber internet.',
    features: [
      '5–7 mins to Habsiguda & Uppal Blue Line Metro',
      'Dedicated acoustic room suitable for Executive Home Office',
      'High-speed fiber optic broadband readiness',
      '15 mins to Mindspace Pocharam & IDA Nacharam hubs',
    ],
    metric: '45 Mins Saved Daily',
  },
  {
    id: 'children',
    label: '🧒 Children & Youth',
    title: 'Safe, Screen-Free Outdoor Upbringing',
    subtitle: 'Gated freedom with zero external traffic',
    desc: 'Give your children a childhood surrounded by nature and friends. A gated 14-acre perimeter with 24/7 security allows kids to ride bicycles, play in the soft-surface playground, and splash in the supervised pool without parents worrying about vehicular hazards.',
    features: [
      'Zero external through-traffic on internal township roads',
      'Dedicated soft-ground park with swings, slides & sandpit',
      'Shallow kids splash pool with safety grab railings',
      'Top institutions nearby: DPS Nacharam & HPS Ramanthapur',
    ],
    metric: '14 Acres Safe Play',
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
    metric: 'Private Sky Terrace',
  },
]

/* ─── OBJECTION KILLER FAQS ─── */
const faqs = [
  {
    q: 'What is the corporate legacy of Tirumala Meadows Private Limited?',
    a: 'For over 28 years, Tirumala Meadows Private Limited has operated at the pinnacle of real estate development and architectural distinction. Our landmark track record includes 30+ completed exclusive luxury residential villas, particularly in Jubilee Hills, Hyderabad — homes cherished by eminent politicians, celebrated film personalities, entrepreneurs, industrialists, and prominent business families.',
  },
  {
    q: 'What distinguishes Tirumala Meadows from ordinary construction builders?',
    a: 'We bring every dimension of luxury creation under one roof through our dedicated in-house ecosystem: In-House Architects, In-House Interior Designers, In-House Technology Team (Smart Home Automation), and In-House Engineers. One Vision. One Team. An Uncompromising Standard of Excellence from conceptualization to final turnkey execution.',
  },
  {
    q: 'What are the company’s ongoing developments and strategic land parcels?',
    a: 'We are currently executing an exclusive luxury villa development in Jubilee Hills, Hyderabad. Simultaneously, we are pursuing strategic land acquisitions and layout facilitation across Western Telangana, including Kollur, Velimala, Shankarpally, Vikarabad, and emerging high-growth corridors.',
  },
  {
    q: 'Are bank home loans and clear titles assured for the properties?',
    a: 'Yes. Every project developed or facilitated by Tirumala Meadows Private Limited undergoes stringent legal verification, title clearance, and compliance with municipal/GHMC/HMDA standards. Projects are pre-approved by leading financial institutions including State Bank of India (SBI), HDFC Bank, ICICI Bank, and Axis Bank.',
  },
  {
    q: 'How does Tirumala Meadows approach environmental sustainability?',
    a: 'Under our "LUXURY WITH A CONSCIENCE" philosophy, we integrate responsible material selection, energy-conscious orientation, rainwater harvesting, sewage treatment systems, and resource-efficient engineering to build extraordinary living spaces while preserving our planet.',
  },
  {
    q: 'How can I schedule a private consultation or explore available properties?',
    a: 'You can connect directly with our corporate desk at +91 95508 28688 or visit our registered office in Jubilee Hills - Hyderabad (500 034). Our team will arrange a bespoke presentation and private on-site inspection.',
  },
]

export default function HomePage() {
  const [activeVilla, setActiveVilla] = useState('3bhk')
  const [activePersona, setActivePersona] = useState('parents')
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [isBrochureOpen, setIsBrochureOpen] = useState(false)
  const [activePortfolioIndex, setActivePortfolioIndex] = useState(0)

  // Comparison toggle
  const [compareMode, setCompareMode] = useState(false)
  const [compareItems, setCompareItems] = useState<string[]>([])

  // Financial Calculators state
  const [investmentAmount, setInvestmentAmount] = useState(120) // in Lakhs
  const [holdingYears, setHoldingYears] = useState(5)
  const appreciationRate = 12.5 // % CAGR
  const [loanAmount, setLoanAmount] = useState(100)
  const [tenure, setTenure] = useState(20)
  const [rate, setRate] = useState(8.5)

  // Calculations
  const monthlyRate = rate / 12 / 100
  const months = tenure * 12
  const emi = loanAmount > 0 && months > 0
    ? Math.round((loanAmount * 100000 * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1))
    : 0
  const totalPayable = emi * months
  const totalInterest = totalPayable - loanAmount * 100000

  const futureAssetValue = Math.round(investmentAmount * Math.pow(1 + appreciationRate / 100, holdingYears))
  const capitalGain = futureAssetValue - investmentAmount
  const annualRental = Math.round(investmentAmount * 0.04)
  const totalRentEarned = annualRental * holdingYears

  // Counters
  const cYears = useCounter(28)
  const cVillas = useCounter(30)
  const cAcres = useCounter(3000)
  const cTeam = useCounter(250)

  // Animations
  const f1 = useFadeIn()
  const f2 = useFadeIn()
  const f3 = useFadeIn()
  const f4 = useFadeIn()
  const f5 = useFadeIn()

  const toggleCompare = (id: string) => {
    setCompareItems((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : prev.length < 2 ? [...prev, id] : prev
    )
  }

  const currentPersona = familyPersonas.find((p) => p.id === activePersona) || familyPersonas[0]
  const selectedPortfolio = realPortfolio[activePortfolioIndex]

  const whatsappUrl = `https://wa.me/919550828688?text=${encodeURIComponent(
    'Hello Tirumala Meadows Private Limited, I would like to inquire about your luxury developments and portfolio.'
  )}`

  return (
    <div className="min-h-screen bg-white text-navy font-sans antialiased selection:bg-hotpink selection:text-white pb-16 sm:pb-0">
      <Navbar />

      {/* ═════════════════════════════════════════════════════════════════ */}
      {/* 1. CORPORATE HERO SECTION (Official Identity & Legacy)            */}
      {/* ═════════════════════════════════════════════════════════════════ */}
      <section className="relative pt-12 pb-12 sm:pt-28 sm:pb-24 overflow-hidden border-b border-border bg-gradient-to-b from-soft via-white to-white">
        <div className="absolute top-10 right-1/4 w-[500px] h-[500px] rounded-full bg-hotpink/[0.03] blur-[130px] pointer-events-none" />

        <div className="mx-auto max-w-6xl px-4 sm:px-6 text-center">
          {/* Corporate Badge */}
          <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-border bg-white px-3 sm:px-4 py-1 sm:py-1.5 text-[10px] sm:text-xs font-semibold text-slate-grey shadow-xs mb-4 sm:mb-6 max-w-full overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="text-navy font-bold">28 Years of Excellence</span>
            <span className="text-border">·</span>
            <span className="text-hotpink font-bold truncate">A Legacy of Distinction</span>
            <span className="text-border hidden sm:inline">·</span>
            <span className="text-slate-grey hidden sm:inline">Jubilee Hills, Hyderabad</span>
          </div>

          {/* Main Title */}
          <h1 className="text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-navy leading-[1.12] sm:leading-[1.08] font-display max-w-4xl mx-auto">
            TIRUMALA MEADOWS{' '}
            <span className="block text-base sm:text-3xl md:text-4xl lg:text-5xl font-serif text-slate-grey font-normal tracking-normal mt-1.5 sm:mt-2 italic">
              "Quality For The Best Living"
            </span>
          </h1>

          {/* Corporate Value Proposition */}
          <p className="mt-3.5 sm:mt-6 text-xs sm:text-base md:text-lg text-slate-grey max-w-3xl mx-auto leading-relaxed px-1">
            For over <strong>28 years</strong>, Tirumala Meadows Private Limited has been driven by an enduring passion for architectural excellence, refined aesthetics, and the creation of extraordinary living spaces. With a distinguished portfolio of <strong>30+ completed exclusive luxury villas</strong> in <strong>Jubilee Hills, Hyderabad</strong>, our residences are cherished by eminent politicians, celebrated film personalities, industrialists, and prominent business families.
          </p>

          {/* Action Buttons (Mobile-Optimized Grid / Stack) */}
          <div className="mt-6 sm:mt-8 flex flex-col xs:flex-row flex-wrap items-stretch xs:items-center justify-center gap-2.5 sm:gap-4 max-w-md sm:max-w-none mx-auto">
            <a
              href="#portfolio"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-hotpink px-5 sm:px-7 py-3 sm:py-3.5 text-xs sm:text-sm font-bold text-white shadow-hotpink-pill hover:bg-hotpink-hover hover:-translate-y-0.5 active:translate-y-0 transition-all text-center"
            >
              <Eye className="h-4 w-4 shrink-0" />
              <span>Explore Landmark Portfolio</span>
              <ArrowRight className="h-4 w-4 shrink-0" />
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-emerald-300 bg-emerald-50 px-4.5 sm:px-6 py-2.5 sm:py-3.5 text-xs sm:text-sm font-bold text-emerald-800 hover:bg-emerald-100 transition shadow-xs text-center"
            >
              <MessageSquare className="h-4 w-4 text-emerald-600 shrink-0" />
              <span>WhatsApp Concierge</span>
            </a>

            <button
              onClick={() => setIsBrochureOpen(true)}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-white px-4.5 sm:px-6 py-2.5 sm:py-3.5 text-xs sm:text-sm font-semibold text-navy hover:bg-soft hover:border-navy transition shadow-xs text-center"
            >
              <FileText className="h-4 w-4 text-hotpink shrink-0" />
              <span>Corporate Factsheet</span>
            </button>
          </div>

          {/* Corporate Subtitle */}
          <p className="mt-4 sm:mt-5 text-[11px] sm:text-xs text-slate-grey leading-relaxed">
            Registered Address: <strong>Jubilee Hills - Hyderabad (500 034)</strong> · Contact:{' '}
            <a href="tel:+919550828688" className="font-bold text-navy hover:underline whitespace-nowrap">
              +91 95508 28688
            </a>
          </p>
        </div>

        {/* HERO FEATURED REAL IMAGES SHOWCASE */}
        <div className="mx-auto max-w-6xl px-4 sm:px-6 mt-8 sm:mt-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 sm:gap-4 items-stretch">
            {/* Main Featured Photo (Jubilee Hills Facade at Dusk) */}
            <div className="md:col-span-7 rounded-2xl sm:rounded-3xl overflow-hidden border border-border bg-navy relative group shadow-corporate">
              <img
                src="/portfolio/jubilee-hills-facade-dusk.jpg"
                alt="Tirumala Meadows Jubilee Hills Luxury Villa Dusk"
                className="w-full h-56 sm:h-80 md:h-96 object-cover object-center group-hover:scale-103 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent flex flex-col justify-end p-4 sm:p-6 md:p-8 text-white">
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-hotpink-light">
                  Completed Signature Villa · Jubilee Hills, Hyderabad
                </span>
                <h3 className="text-base sm:text-xl md:text-2xl font-bold font-display mt-0.5 sm:mt-1">
                  Architectural Distinction & Integrated Lighting
                </h3>
                <p className="text-[11px] sm:text-xs text-white/70 mt-0.5 sm:mt-1 max-w-lg line-clamp-2 sm:line-clamp-none">
                  Custom geometric light portals, double-height motor court, and palatial stone masonry crafted by our in-house team.
                </p>
              </div>
            </div>

            {/* Secondary Photo (Regal White Estate) */}
            <div className="md:col-span-5 rounded-2xl sm:rounded-3xl overflow-hidden border border-border bg-navy relative group shadow-corporate">
              <img
                src="/portfolio/jubilee-hills-regal-estate.jpg"
                alt="Tirumala Meadows Regal Classical Estate"
                className="w-full h-56 sm:h-80 md:h-96 object-cover object-center group-hover:scale-103 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent flex flex-col justify-end p-4 sm:p-6 md:p-8 text-white">
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-emerald-300">
                  Neoclassical Estate · 100% Vastu
                </span>
                <h3 className="text-base sm:text-lg md:text-xl font-bold font-display mt-0.5 sm:mt-1">
                  Classical White Villa Estate
                </h3>
                <p className="text-[11px] sm:text-xs text-white/70 mt-0.5 sm:mt-1 line-clamp-2 sm:line-clamp-none">
                  Arched colonnades, pristine stone finish, private courtyards, and rooftop sky lounge.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════ */}
      {/* 2. CORPORATE FOOTPRINT (Key Real Company Statistics)               */}
      {/* ═════════════════════════════════════════════════════════════════ */}
      <section className="py-12 sm:py-16 bg-navy text-white border-b border-navy-light/40">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <span className="text-[10px] sm:text-xs font-bold text-hotpink-light uppercase tracking-wider">Corporate Footprint</span>
            <h2 className="text-xl sm:text-3xl font-bold font-display mt-1 text-white">
              A Legacy of Distinction Across 28+ Years
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            <div ref={cYears.ref} className="rounded-2xl sm:rounded-3xl bg-white/5 border border-white/10 p-4 sm:p-6 text-center hover:bg-white/10 transition">
              <p className="text-2xl sm:text-5xl font-extrabold text-white font-display tracking-tight">
                {cYears.count}+
              </p>
              <p className="text-[11px] sm:text-xs font-bold text-white/90 mt-1.5 sm:mt-2">Years of Excellence</p>
              <p className="text-[9.5px] sm:text-[11px] text-white/50 mt-0.5">Real estate & construction</p>
            </div>

            <div ref={cVillas.ref} className="rounded-2xl sm:rounded-3xl bg-white/5 border border-white/10 p-4 sm:p-6 text-center hover:bg-white/10 transition">
              <p className="text-2xl sm:text-5xl font-extrabold text-hotpink-light font-display tracking-tight">
                {cVillas.count}+
              </p>
              <p className="text-[11px] sm:text-xs font-bold text-white/90 mt-1.5 sm:mt-2">Completed Luxury Villas</p>
              <p className="text-[9.5px] sm:text-[11px] text-white/50 mt-0.5">Particularly in Jubilee Hills</p>
            </div>

            <div ref={cAcres.ref} className="rounded-2xl sm:rounded-3xl bg-white/5 border border-white/10 p-4 sm:p-6 text-center hover:bg-white/10 transition">
              <p className="text-2xl sm:text-5xl font-extrabold text-white font-display tracking-tight">
                {cAcres.count.toLocaleString()}+
              </p>
              <p className="text-[11px] sm:text-xs font-bold text-white/90 mt-1.5 sm:mt-2">Acres Facilitated</p>
              <p className="text-[9.5px] sm:text-[11px] text-white/50 mt-0.5">Acquired for layout development</p>
            </div>

            <div ref={cTeam.ref} className="rounded-2xl sm:rounded-3xl bg-white/5 border border-white/10 p-4 sm:p-6 text-center hover:bg-white/10 transition">
              <p className="text-2xl sm:text-5xl font-extrabold text-emerald-400 font-display tracking-tight">
                {cTeam.count}+
              </p>
              <p className="text-[11px] sm:text-xs font-bold text-white/90 mt-1.5 sm:mt-2">In-House Professionals</p>
              <p className="text-[9.5px] sm:text-[11px] text-white/50 mt-0.5">Dedicated integrated workforce</p>
            </div>
          </div>

          {/* Distinguished Clientele Strip */}
          <div className="mt-8 sm:mt-12 rounded-2xl bg-white/5 border border-white/10 p-4 sm:p-6 text-center max-w-3xl mx-auto">
            <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-widest text-white/40 block mb-1">
              Distinguished Patrons & Clientele
            </span>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
              "Our homes have been cherished by distinguished clientele comprising <strong>eminent politicians, celebrated film personalities, entrepreneurs, industrialists, and prominent business families</strong>."
            </p>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════ */}
      {/* 3. SIGNATURE REAL PORTFOLIO (Using Real Uploaded Photos)           */}
      {/* ═════════════════════════════════════════════════════════════════ */}
      <section id="portfolio" className="py-20 bg-soft border-b border-border">
        <div ref={f1.ref} className={`mx-auto max-w-6xl px-6 ${f1.className}`}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-bold text-hotpink uppercase tracking-wider">Completed Landmarks</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-navy font-display tracking-tight mt-1">
                Signature Residential Portfolio
              </h2>
              <p className="text-xs sm:text-sm text-slate-grey mt-1">
                Explore real architectural photographs of our exclusive villas and developments in Hyderabad.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-navy bg-white border border-border px-3 py-1.5 rounded-full shadow-xs">
                30+ Exclusive Villas Completed
              </span>
            </div>
          </div>

          {/* Interactive Portfolio Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {realPortfolio.map((p, idx) => (
              <div
                key={p.id}
                onClick={() => setActivePortfolioIndex(idx)}
                className={`group rounded-3xl border overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-corporate-hover hover:-translate-y-1 ${
                  activePortfolioIndex === idx
                    ? 'border-navy bg-white shadow-corporate-hover ring-2 ring-navy/10'
                    : 'border-border bg-white'
                }`}
              >
                <div className="relative h-56 overflow-hidden bg-slate-100">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="rounded-full bg-navy/85 backdrop-blur-md px-3 py-1 text-[10px] font-bold text-white uppercase tracking-wider">
                      {p.tag}
                    </span>
                  </div>
                  <div className="absolute bottom-3 right-3">
                    <span className="rounded-full bg-white/90 backdrop-blur-md px-2.5 py-0.5 text-[10px] font-bold text-navy">
                      {p.location}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <span className="text-[11px] font-bold text-hotpink uppercase tracking-wide">
                    {p.category}
                  </span>
                  <h3 className="text-lg font-bold text-navy font-display mt-1">
                    {p.title}
                  </h3>
                  <p className="text-xs text-slate-grey mt-2 leading-relaxed">
                    {p.desc}
                  </p>

                  <div className="mt-4 pt-3 border-t border-border/60 text-[11px] font-semibold text-navy/80 flex items-center justify-between">
                    <span>{p.specs.split('·')[0]}</span>
                    <span className="text-hotpink font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Inspect <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Active Portfolio Detail Highlight */}
          <div className="mt-10 rounded-3xl border border-border bg-white p-6 sm:p-8 shadow-corporate">
            <div className="grid gap-6 lg:grid-cols-12 items-center">
              <div className="lg:col-span-5 rounded-2xl overflow-hidden border border-border">
                <img
                  src={selectedPortfolio.image}
                  alt={selectedPortfolio.title}
                  className="w-full h-64 object-cover object-center"
                />
              </div>
              <div className="lg:col-span-7 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-emerald-50 border border-emerald-200 px-3 py-0.5 text-xs font-bold text-emerald-800">
                    {selectedPortfolio.tag}
                  </span>
                  <span className="text-xs font-bold text-slate-grey">
                    📍 {selectedPortfolio.location}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-navy font-display">
                  {selectedPortfolio.title}
                </h3>
                <p className="text-sm text-slate-grey leading-relaxed">
                  {selectedPortfolio.desc}
                </p>
                <div className="p-3 bg-soft rounded-xl border border-border text-xs text-navy font-semibold">
                  Key Specifications: {selectedPortfolio.specs}
                </div>
                <div className="pt-2 flex flex-wrap gap-3">
                  <Link
                    to="/villas"
                    className="inline-flex items-center gap-2 rounded-full bg-navy px-5 py-2.5 text-xs font-bold text-white hover:bg-navy-surface transition"
                  >
                    <span>View 3D Architectural CAD</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                  <a
                    href="tel:+919550828688"
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-soft px-5 py-2.5 text-xs font-bold text-navy hover:bg-white transition"
                  >
                    <Phone className="h-3.5 w-3.5 text-hotpink" />
                    <span>Inquire About Project</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════ */}
      {/* 4. THE ART OF INTEGRATED LUXURY (In-House Ecosystem)               */}
      {/* ═════════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white border-b border-border">
        <div ref={f2.ref} className={`mx-auto max-w-6xl px-6 ${f2.className}`}>
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold text-hotpink uppercase tracking-wider">Uncompromising Standards</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy font-display tracking-tight mt-1">
              The Art of Integrated Luxury
            </h2>
            <p className="text-sm sm:text-base text-slate-grey mt-3 leading-relaxed">
              What distinguishes Tirumala Meadows is our ability to bring every dimension of luxury creation under one roof. From conceptualisation and architectural planning to interiors, engineering, technology and final execution, every element is managed through our integrated team.
            </p>
            <p className="text-xs font-bold text-navy uppercase tracking-widest mt-2 font-display">
              One Vision. One Team. An Uncompromising Standard of Excellence.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {inHouseEcosystem.map((item, i) => {
              const Icon = item.icon
              return (
                <div
                  key={i}
                  className="rounded-3xl border border-border bg-soft p-6 sm:p-7 hover:shadow-corporate-hover hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="h-12 w-12 rounded-2xl bg-white border border-border flex items-center justify-center mb-4 text-hotpink shadow-xs">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-bold text-navy font-display">{item.title}</h3>
                  <p className="text-xs font-bold text-hotpink mt-0.5">{item.subtitle}</p>
                  <p className="text-xs text-slate-grey mt-2.5 leading-relaxed">{item.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════ */}
      {/* 5. MULTI-MODE 3D ARCHITECTURAL STUDIO & CAD VIEWER                 */}
      {/* ═════════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-soft border-b border-border">
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

      {/* ═════════════════════════════════════════════════════════════════ */}
      {/* 6. OUR BUSINESS VERTICALS (Corporate Scale)                        */}
      {/* ═════════════════════════════════════════════════════════════════ */}
      <section id="verticals" className="py-20 bg-white border-b border-border">
        <div ref={f3.ref} className={`mx-auto max-w-6xl px-6 ${f3.className}`}>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-hotpink uppercase tracking-wider">Comprehensive Capability</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy font-display tracking-tight mt-1">
              Our Business Verticals
            </h2>
            <p className="text-xs sm:text-sm text-slate-grey mt-2">
              Decades of multidisciplinary mastery spanning luxury residential, plotted layouts, commercial, warehousing, and strategic land aggregation.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {businessVerticals.map((v, i) => {
              const Icon = v.icon
              return (
                <div
                  key={i}
                  className="group rounded-3xl border border-border bg-soft p-6 hover:bg-white hover:shadow-corporate-hover hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="h-10 w-10 rounded-xl bg-white border border-border flex items-center justify-center text-navy group-hover:text-hotpink group-hover:bg-hotpink/10 transition">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-grey bg-white px-2.5 py-0.5 rounded-full border border-border">
                      Vertical 0{i + 1}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-navy font-display">{v.title}</h3>
                  <p className="text-xs text-slate-grey mt-2 leading-relaxed">{v.desc}</p>
                  <div className="mt-4 pt-3 border-t border-border/60">
                    <span className="text-[11px] font-bold text-hotpink">{v.tag}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════ */}
      {/* 7. ONGOING PROJECTS & STRATEGIC LAND ACQUISITIONS                  */}
      {/* ═════════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-soft border-b border-border">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-8 lg:grid-cols-12">
            
            {/* Ongoing Project Card */}
            <div className="lg:col-span-6 rounded-3xl border border-border bg-white p-7 sm:p-9 shadow-corporate space-y-5">
              <span className="rounded-full bg-emerald-50 border border-emerald-200 px-3.5 py-1 text-xs font-bold text-emerald-800 inline-block">
                Ongoing Development
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-navy font-display">
                Exclusive Luxury Villa Development
              </h3>
              <p className="text-xs font-bold text-hotpink uppercase tracking-wide">
                Jubilee Hills, Hyderabad
              </p>
              <p className="text-sm text-slate-grey leading-relaxed">
                An exclusive residential villa project envisioned to embody architectural distinction, refined interiors, and contemporary luxury in Hyderabad's premier pincode.
              </p>

              <div className="space-y-2 pt-2">
                <div className="flex items-center gap-2.5 text-xs text-slate-grey bg-soft p-3 rounded-xl border border-border">
                  <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Curated for eminent industrialists & distinguished patrons</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-grey bg-soft p-3 rounded-xl border border-border">
                  <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Turnkey in-house architectural & interior automation integration</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-slate-grey bg-soft p-3 rounded-xl border border-border">
                  <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Prime Jubilee Hills coveted residential address</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3 text-xs font-bold text-white hover:bg-navy-surface transition shadow-xs"
                >
                  <span>Request Private Project Dossier</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            {/* Land Acquisition & Future Growth Card */}
            <div className="lg:col-span-6 rounded-3xl border border-border bg-white p-7 sm:p-9 shadow-corporate space-y-5">
              <span className="rounded-full bg-navy/5 border border-navy/10 px-3.5 py-1 text-xs font-bold text-navy inline-block">
                Strategic Land Acquisitions
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-navy font-display">
                Western Telangana Land Bank
              </h3>
              <p className="text-xs font-bold text-hotpink uppercase tracking-wide">
                High-Growth Development Parcels
              </p>
              <p className="text-sm text-slate-grey leading-relaxed">
                Actively pursuing strategic land acquisitions and layout facilitation across Western Telangana's fastest-growing corridors with strong long-term capital appreciation.
              </p>

              {/* Hub Tags */}
              <div className="flex flex-wrap gap-2 pt-1">
                {['Kollur', 'Velimala', 'Shankarpally', 'Vikarabad', 'Other Emerging Nodes'].map((loc) => (
                  <span
                    key={loc}
                    className="rounded-full bg-soft border border-border px-3.5 py-1.5 text-xs font-bold text-navy"
                  >
                    📍 {loc}
                  </span>
                ))}
              </div>

              {/* Diversification note */}
              <div className="p-4 rounded-2xl bg-soft border border-border space-y-2">
                <p className="text-xs font-bold text-navy uppercase tracking-wider font-display">
                  Future Expansion & Diversification
                </p>
                <p className="text-xs text-slate-grey leading-relaxed">
                  Our long-term ambition is to evolve into a diversified real estate, infrastructure and lifestyle enterprise spanning <strong>Ports & Maritime Infrastructure</strong>, <strong>Golf Courses & Leisure Destinations</strong>, and <strong>Hospitality & Luxury Resorts</strong>.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════ */}
      {/* 8. SUSTAINABILITY: "LUXURY WITH A CONSCIENCE"                     */}
      {/* ═════════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white border-b border-border">
        <div className="mx-auto max-w-6xl px-6">
          <div className="rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50/50 via-white to-soft p-8 sm:p-12 shadow-corporate">
            <div className="grid gap-8 lg:grid-cols-12 items-center">
              
              <div className="lg:col-span-8 space-y-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100/80 px-3.5 py-1 text-xs font-bold text-emerald-800">
                  <Leaf className="h-3.5 w-3.5 text-emerald-700" />
                  <span>Our Commitment to Sustainability</span>
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-navy font-display tracking-tight">
                  LUXURY WITH A CONSCIENCE.
                </h2>
                <p className="text-sm sm:text-base text-slate-grey leading-relaxed">
                  We believe the future of luxury must be sustainable. Environmental responsibility is integral to our philosophy. From construction materials and architectural planning to interiors and furniture, our team thoughtfully considers the environmental impact of every decision.
                </p>
                <p className="text-sm text-slate-grey leading-relaxed">
                  We strive to embrace responsible material selection, energy-conscious design and efficient resource utilisation, creating spaces that respect nature while elevating modern living.
                </p>
                <p className="text-xs font-bold text-emerald-800 uppercase tracking-wider font-display pt-1">
                  Our aspiration is to build extraordinary spaces while preserving an extraordinary planet.
                </p>
              </div>

              <div className="lg:col-span-4 space-y-3">
                <div className="p-4 rounded-2xl bg-white border border-border shadow-xs">
                  <strong className="text-navy text-xs block mb-1">Energy-Conscious Architecture</strong>
                  <p className="text-[11px] text-slate-grey">Solar cross-ventilation, thermal envelope brickwork & LED infrastructure.</p>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-border shadow-xs">
                  <strong className="text-navy text-xs block mb-1">Resource Conservation</strong>
                  <p className="text-[11px] text-slate-grey">Rainwater recharge aquifers, scientific STP recycling & green buffer corridors.</p>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-border shadow-xs">
                  <strong className="text-navy text-xs block mb-1">Responsible Materials</strong>
                  <p className="text-[11px] text-slate-grey">Sustainably sourced Indian Teak, non-toxic finishes & eco-certified composites.</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════ */}
      {/* 9. VILLA CONFIGURATIONS & DUPLEX SPECIFICATIONS                   */}
      {/* ═════════════════════════════════════════════════════════════════ */}
      <section id="villas" className="py-20 bg-soft border-b border-border">
        <div ref={f4.ref} className={`mx-auto max-w-6xl px-6 ${f4.className}`}>
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

      {/* ═════════════════════════════════════════════════════════════════ */}
      {/* 10. DESIGNED FOR EVERY GENERATION (Customer Mindset)              */}
      {/* ═════════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white border-b border-border">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1 rounded-full bg-hotpink/10 px-3 py-0.5 text-xs font-bold text-hotpink">
              Family-Centric Living
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy font-display tracking-tight mt-2">
              Designed for Every Generation
            </h2>
            <p className="text-xs sm:text-sm text-slate-grey mt-2">
              A home purchase is a family decision. See how our layouts cater to the distinct needs of every family member.
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
          <div className="rounded-3xl border border-border bg-soft p-6 sm:p-10 shadow-corporate">
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
                    <div key={i} className="flex items-center gap-2.5 text-xs text-slate-grey bg-white p-3 rounded-xl border border-border">
                      <Check className="h-4 w-4 text-hotpink shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-2xl border border-border bg-white p-6 space-y-4 text-center">
                  <div className="h-14 w-14 rounded-full bg-soft border border-border flex items-center justify-center mx-auto text-hotpink shadow-xs">
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

      {/* ═════════════════════════════════════════════════════════════════ */}
      {/* 11. FINANCIAL SIMULATORS (ROI & EMI CALCULATOR)                   */}
      {/* ═════════════════════════════════════════════════════════════════ */}
      <section id="roi" className="py-20 bg-soft border-b border-border">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-navy/5 px-3 py-1 text-xs font-bold text-navy">
              Institutional Financial Model
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy font-display tracking-tight mt-2">
              Investor ROI & Capital Appreciation Engine
            </h2>
            <p className="text-xs sm:text-sm text-slate-grey mt-1.5">
              Simulate capital appreciation and wealth creation across strategic Hyderabad and Western Telangana real estate assets.
            </p>
          </div>

          <div className="rounded-3xl border border-border bg-white p-6 sm:p-10 shadow-corporate">
            <div className="grid gap-10 lg:grid-cols-12 items-center">
              
              {/* Sliders */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <div className="flex justify-between text-xs font-bold text-navy mb-2">
                    <span>Asset Value</span>
                    <span className="text-hotpink font-display text-sm">₹{investmentAmount} Lakhs</span>
                  </div>
                  <input
                    type="range"
                    min="80"
                    max="350"
                    step="5"
                    value={investmentAmount}
                    onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                    className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-slate-200 accent-hotpink"
                  />
                  <div className="flex justify-between text-[10px] text-slate-grey mt-1">
                    <span>₹80 Lakhs</span>
                    <span>₹3.5 Crores</span>
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

                <div className="rounded-2xl bg-soft border border-border p-4 text-xs text-slate-grey space-y-1.5">
                  <div className="flex items-center gap-2 font-bold text-navy">
                    <TrendingUp className="h-4 w-4 text-emerald-600" />
                    <span>Historic Corridor Growth Metric (+12.5% CAGR)</span>
                  </div>
                  <p className="leading-relaxed">
                    Prime Hyderabad & Western Telangana corridors experience rapid infrastructure-driven value compounding, backed by high land-share equity.
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
                    * Projections modeled on conservative historical compounding in prime Hyderabad residential zones.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════ */}
      {/* 12. OUR PHILOSOPHY & VISION                                       */}
      {/* ═════════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white border-b border-border">
        <div ref={f5.ref} className={`mx-auto max-w-5xl px-6 text-center ${f5.className}`}>
          <span className="text-xs font-bold text-hotpink uppercase tracking-wider">Corporate Philosophy</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy font-display tracking-tight mt-2">
            "We Conceptualise Aspirations, Create Experiences, Curate Lifestyles and Build Legacies."
          </h2>
          <p className="mt-6 text-base sm:text-lg text-slate-grey leading-relaxed max-w-3xl mx-auto">
            At Tirumala Meadows, we do not simply construct buildings or develop properties. With 28 years of experience behind us and an ambitious vision for tomorrow, we remain committed to architectural excellence, responsible development and creating lasting value.
          </p>
          <div className="mt-8 p-6 rounded-3xl bg-soft border border-border inline-block">
            <p className="text-sm sm:text-base font-extrabold text-navy font-display uppercase tracking-wider">
              We’re Busy Round the Clock CREATING LANDMARKS. BUILDING VALUE & WEALTH.
            </p>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════ */}
      {/* 13. OBJECTION KILLER FAQS (Buyer Assurance)                       */}
      {/* ═════════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-soft border-b border-border">
        <div className="mx-auto max-w-4xl px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-hotpink uppercase tracking-wider">Corporate Inquiries</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-navy tracking-tight font-display mt-1">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-slate-grey mt-2">
              Learn about our legacy, in-house team, land acquisitions, and booking processes.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((f, idx) => {
              const isOpen = openFaq === idx
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-border bg-white overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-soft transition"
                  >
                    <span className="text-sm font-bold text-navy font-display">{f.q}</span>
                    <div className={`h-7 w-7 rounded-full border border-border bg-soft flex items-center justify-center shrink-0 transition-transform ${isOpen ? 'rotate-180 text-hotpink' : 'text-navy'}`}>
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

      {/* ═════════════════════════════════════════════════════════════════ */}
      {/* 14. FINAL CORPORATE CONVERSION & DESK                             */}
      {/* ═════════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white border-t border-border">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <span className="text-xs font-bold text-hotpink uppercase tracking-wider">Connect With Us</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-navy tracking-tight font-display mt-1">
            Build Your Legacy with Tirumala Meadows
          </h2>
          <p className="mt-3 text-sm text-slate-grey max-w-xl mx-auto leading-relaxed">
            Whether inquiring about our exclusive luxury villas in Jubilee Hills, exploring land partnerships across Western Telangana, or planning an institutional acquisition, our corporate team is at your service.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-hotpink px-7 py-3.5 text-xs sm:text-sm font-bold text-white shadow-hotpink-pill hover:bg-hotpink-hover hover:-translate-y-0.5 transition-all"
            >
              <Calendar className="h-4 w-4" />
              <span>Schedule a Private Consultation</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-emerald-50 px-6 py-3.5 text-xs sm:text-sm font-bold text-emerald-800 hover:bg-emerald-100 transition shadow-xs"
            >
              <MessageSquare className="h-4 w-4 text-emerald-600" />
              <span>WhatsApp Corporate Desk</span>
            </a>

            <a
              href="tel:+919550828688"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-6 py-3.5 text-xs sm:text-sm font-semibold text-navy hover:bg-soft transition"
            >
              <Phone className="h-4 w-4 text-hotpink" />
              <span>Call +91 95508 28688</span>
            </a>
          </div>

          <div className="mt-8 pt-6 border-t border-border text-xs text-slate-grey">
            <p><strong>Tirumala Meadows Private Limited</strong> · Registered Address: Jubilee Hills - Hyderabad (500 034)</p>
          </div>
        </div>
      </section>

      <Footer />

      {/* ═════════════════════════════════════════════════════════════════ */}
      {/* STICKY MOBILE CONVERSION BAR                                      */}
      {/* ═════════════════════════════════════════════════════════════════ */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-border px-3 py-2 flex sm:hidden items-center justify-between gap-2 shadow-2xl safe-area-pb">
        <a
          href="tel:+919550828688"
          className="flex-1 flex items-center justify-center gap-1 rounded-full border border-border bg-soft py-2 text-[11px] font-bold text-navy active:scale-97 transition"
        >
          <Phone className="h-3 w-3 text-hotpink shrink-0" />
          <span>Call</span>
        </a>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1 rounded-full bg-emerald-600 py-2 text-[11px] font-bold text-white shadow-xs active:scale-97 transition"
        >
          <MessageSquare className="h-3 w-3 shrink-0" />
          <span>WhatsApp</span>
        </a>
        <Link
          to="/contact"
          className="flex-1 flex items-center justify-center gap-1 rounded-full bg-hotpink py-2 text-[11px] font-bold text-white shadow-hotpink-pill active:scale-97 transition"
        >
          <Calendar className="h-3 w-3 shrink-0" />
          <span>Consult</span>
        </Link>
      </div>

      {/* Factsheet Modal */}
      <BrochureModal
        isOpen={isBrochureOpen}
        onClose={() => setIsBrochureOpen(false)}
      />
    </div>
  )
}
