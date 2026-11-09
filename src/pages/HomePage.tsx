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
  Percent, FileText, CheckCircle2, Award, Landmark, Calculator,
  Car, Eye, Sparkles, Phone, HelpCircle, MessageSquare, Heart,
  Briefcase, Factory, Anchor, Globe, Trophy, Leaf, Palette, Cpu,
  Maximize2, X, Navigation, Clock, Send
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

/* ─── REAL PORTFOLIO DATA (Categorized Architectural Gallery) ─── */
const galleryItems = [
  {
    id: 'jubilee-facade',
    title: 'Signature Illuminated Facade',
    category: 'Exterior',
    categoryLabel: 'Exterior Architecture',
    location: 'Jubilee Hills, Hyderabad',
    image: '/portfolio/jubilee-hills-facade-dusk.jpg',
    tag: 'Road No. 36 Luxury Enclave',
  },
  {
    id: 'jubilee-estate',
    title: 'Regal Neoclassical Villa',
    category: 'Exterior',
    categoryLabel: 'Landmark Estate',
    location: 'Jubilee Hills, Hyderabad',
    image: '/portfolio/jubilee-hills-regal-estate.jpg',
    tag: 'Private Gated Compound',
  },
  {
    id: 'minimalist-night',
    title: 'Geometric Cantilevered Villa',
    category: 'Exterior',
    categoryLabel: 'Ultra-Modern',
    location: 'Jubilee Hills Enclave',
    image: '/portfolio/modern-minimalist-villa-night.jpg',
    tag: 'Night Illumination & Lawn',
  },
  {
    id: 'contemporary-daylight',
    title: 'Tri-Level Daylight Residence',
    category: 'Interior',
    categoryLabel: 'Spatial Design',
    location: 'Telangana Corridor',
    image: '/portfolio/contemporary-villa-daylight.jpg',
    tag: 'Double-Height Living Void',
  },
  {
    id: 'skyline-civil',
    title: 'Skyline & Civil Engineering',
    category: 'Construction',
    categoryLabel: 'Civil Superstructure',
    location: 'Jubilee Hills, Hyderabad',
    image: '/hero-construction-skyline.jpg',
    tag: 'Tower Cranes & Structural Shell',
  },
  {
    id: 'premium-towers',
    title: 'Integrated Residential Community',
    category: 'Construction',
    categoryLabel: 'Urban Development',
    location: 'Telangana Growth Corridor',
    image: '/portfolio/premium-apartments-tower.jpg',
    tag: 'Landscaped Master Layout',
  },
]

/* ─── PROJECT HIGHLIGHTS DATA (Verified Corporate Metrics) ─── */
const projectHighlights = [
  {
    title: 'Project Location',
    value: 'Jubilee Hills, Hyderabad',
    desc: 'Road 36 & 45 Enclave',
    icon: MapPin,
  },
  {
    title: 'Total Land Area',
    value: '3,000+ Acres',
    desc: 'Facilitated Across Prime Telangana',
    icon: Landmark,
  },
  {
    title: 'Configurations',
    value: '3 & 4 BHK Palatial Villas',
    desc: '1,600 – 2,200+ sq.ft · 100% Vastu',
    icon: Home,
  },
  {
    title: 'Amenities',
    value: 'Clubhouse & Private Reserve',
    desc: 'Pool, Gym & Private Reserve',
    icon: Award,
  },
  {
    title: 'Connectivity',
    value: '5–7 Mins to Metro',
    desc: 'Direct Access to HITEC City',
    icon: Navigation,
  },
  {
    title: 'Project Status',
    value: '30+ Villas Completed',
    desc: 'Ready To Move In · 28+ Yrs',
    icon: CheckCircle2,
  },
]

/* ─── NEARBY LANDMARKS WITH VERIFIED DISTANCES ─── */
const nearbyLandmarks = [
  { category: 'Metro & Transit', name: 'Jubilee Hills Check Post Metro', distance: '1.8 km', time: '4 mins' },
  { category: 'Metro & Transit', name: 'Blue Line Transit Corridor', distance: '2.5 km', time: '6 mins' },
  { category: 'Healthcare', name: 'Apollo Hospitals Jubilee Hills', distance: '3.2 km', time: '8 mins' },
  { category: 'Healthcare', name: 'Care Hospitals Banjara Hills', distance: '4.8 km', time: '12 mins' },
  { category: 'Education', name: 'Oakridge / Chirec International', distance: '5.1 km', time: '14 mins' },
  { category: 'Education', name: 'Hyderabad Public School', distance: '4.5 km', time: '11 mins' },
  { category: 'Leisure & Retail', name: 'Durgam Cheruvu Lake & Cable Bridge', distance: '4.2 km', time: '10 mins' },
  { category: 'Leisure & Retail', name: 'Inorbit Mall & Knowledge City', distance: '5.6 km', time: '14 mins' },
]

/* ─── VILLA SPECIFICATIONS ─── */
const villaConfigs = [
  {
    id: '3bhk',
    label: '3 BHK Signature Residence',
    area: '1,600 sq.ft',
    beds: 3,
    baths: 3,
    tag: 'Most In-Demand',
    price: '₹1.15 – 1.45 Cr (Est.)',
    highlights: [
      'Italian-finish formal living & dining lounge',
      'Three spacious bedrooms with attached designer baths',
      'East-facing traditional Puja niche with brass trim',
      '100% Vastu compliance across suites & kitchen',
      'Covered private car porch & utility yard',
    ],
  },
  {
    id: '4bhk',
    label: '4 BHK Palatial Grand Estate',
    area: '2,200 sq.ft',
    beds: 4,
    baths: 4,
    tag: 'Palatial Villa',
    price: '₹1.65 – 1.95 Cr (Est.)',
    highlights: [
      'Palatial living lounge for distinguished hosting',
      'Dedicated multipurpose suite / home cinema room',
      'Four oversized bedrooms with walk-in wardrobes',
      'Over 400 sq.ft private rooftop party terrace',
      'Seasoned Indian Teak wood main entrance door',
    ],
  },
]

/* ─── FAQS ─── */
const faqs = [
  {
    q: 'What is the corporate legacy of Tirumala Meadows Private Limited?',
    a: 'For over 28 years, Tirumala Meadows Private Limited has operated at the pinnacle of real estate development and architectural distinction. Our landmark track record includes 30+ completed exclusive luxury residential villas, particularly in Jubilee Hills, Hyderabad — homes cherished by eminent politicians, celebrated film personalities, entrepreneurs, industrialists, and prominent business families.',
  },
  {
    q: 'What distinguishes Tirumala Meadows from standard developers?',
    a: 'We bring every dimension of luxury creation under one roof through our dedicated in-house ecosystem: In-House Architects, In-House Interior Designers, In-House Technology Team (Smart Home Automation), and In-House Civil Engineers. One Vision. One Team. An Uncompromising Standard of Excellence from conceptualization to final turnkey handover.',
  },
  {
    q: 'Are title clearances and bank home loan approvals secured?',
    a: 'Yes. Every project developed or facilitated by Tirumala Meadows Private Limited undergoes stringent legal verification and clear title scrutiny. Projects are pre-approved by leading financial institutions including State Bank of India (SBI), HDFC Bank, ICICI Bank, and Axis Bank.',
  },
  {
    q: 'How can I schedule a private property walkthrough?',
    a: 'You can connect directly with our corporate concierge desk at +91 95508 28688 or fill out our enquiry form below. Our private advisory team will coordinate a bespoke presentation and personalized site inspection.',
  },
]

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'3bhk' | '4bhk'>('3bhk')
  const [activeGalleryCategory, setActiveGalleryCategory] = useState<string>('All')
  const [lightboxImage, setLightboxImage] = useState<typeof galleryItems[0] | null>(null)
  const [isBrochureOpen, setIsBrochureOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', configuration: '4bhk' })

  // Counters
  const cYears = useCounter(28)
  const cVillas = useCounter(30)
  const cAcres = useCounter(3000)
  const cTeam = useCounter(250)

  const whatsappUrl = `https://wa.me/919550828688?text=${encodeURIComponent(
    'Hello Tirumala Meadows, I would like to inquire about your luxury residential properties in Jubilee Hills, Hyderabad.'
  )}`

  const filteredGallery = activeGalleryCategory === 'All'
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeGalleryCategory)

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setFormSubmitted(true)
    setTimeout(() => setFormSubmitted(false), 5000)
  }

  return (
    <div className="min-h-screen bg-soft text-navy font-sans selection:bg-brandLogo-blue selection:text-white pb-16 sm:pb-0">
      <Navbar />

      {/* ═════════════════════════════════════════════════════════════════ */}
      {/* 1. HERO SECTION (Minimalist, Aesthetic, Brand Navy & Logo Colors)  */}
      {/* ═════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[86vh] sm:min-h-[90vh] flex items-end justify-start overflow-hidden">
        {/* Full-width Project Photograph with Cinematic Depth */}
        <div className="absolute inset-0 z-0">
          <img
            src="/hero-construction-skyline.jpg"
            alt="Tirumala Meadows Construction & Skyline Development"
            className="w-full h-full object-cover object-center scale-102"
            loading="eager"
          />
          {/* Multi-layered cinematic scrim: rich deep navy gradient from left to ensure pristine typography contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/95 via-navy-dark/75 to-navy-dark/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-navy-dark/40 to-black/50" />
        </div>

        {/* Hero Content (Clean, Minimal, High Contrast) */}
        <div className="relative z-10 mx-auto max-w-6xl w-full px-5 sm:px-8 pb-12 sm:pb-16 pt-28">
          <div className="max-w-2xl">
            {/* Elegant Subtitle / Category Badge with Official Logo Dots */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 backdrop-blur-md px-2.5 sm:px-3.5 py-1 text-[10px] sm:text-xs uppercase tracking-[0.10em] sm:tracking-[0.18em] font-medium text-white mb-3 sm:mb-4 shadow-sm max-w-full">
              <span className="flex items-center gap-1 shrink-0">
                <span className="h-1.5 sm:h-2 w-1.5 sm:w-2 rounded-full bg-brandLogo-red" />
                <span className="h-1.5 sm:h-2 w-1.5 sm:w-2 rounded-full bg-brandLogo-blue" />
                <span className="h-1.5 sm:h-2 w-1.5 sm:w-2 rounded-full bg-brandLogo-green" />
              </span>
              <span className="whitespace-nowrap sm:whitespace-normal">Jubilee Hills, Hyderabad · 28 Years</span>
            </div>

            {/* Headline with Clean Minimal Typographic Structure */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-display font-extrabold text-white tracking-tight leading-[1.08] drop-shadow-sm">
              TIRUMALA MEADOWS
              <span className="block text-base sm:text-xl md:text-2xl font-display font-medium text-slate-200 mt-2 tracking-normal">
                Quality For The Best Living
              </span>
            </h1>

            {/* Editorial Copy with Enhanced Legibility */}
            <p className="mt-4 text-xs sm:text-sm md:text-base text-slate-200 max-w-xl leading-relaxed font-normal">
              Architectural grandeur meets timeless craftsmanship. A premier luxury real estate enterprise shaping Hyderabad's skyline for over 28 years.
            </p>

            {/* Brand Logo Color CTAs: Brand Red + Clean Frosted Glass */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <a
                href="#highlights"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brandLogo-red text-white font-bold px-6 py-2.5 sm:py-3 text-xs sm:text-[13px] uppercase tracking-wider shadow-md hover:bg-red-700 hover:scale-102 active:scale-98 transition-all text-center"
              >
                <span>Explore Project</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </a>

              <a
                href="#enquiry"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-md text-white font-semibold px-6 py-2.5 sm:py-3 text-xs sm:text-[13px] uppercase tracking-wider hover:bg-white/20 hover:border-white/50 active:scale-98 transition-all text-center"
              >
                <Calendar className="h-3.5 w-3.5 text-blue-400" />
                <span>Enquire Now</span>
              </a>
            </div>

            {/* Framed Frosted Glass Stat Card */}
            <div className="mt-8 p-3.5 sm:p-4 rounded-2xl bg-black/40 border border-white/15 backdrop-blur-md grid grid-cols-3 gap-3 max-w-md shadow-xl">
              <div className="border-r border-white/10 pr-2">
                <p className="text-lg sm:text-xl font-display font-black text-white">28+ Yrs</p>
                <p className="text-[9px] sm:text-[10px] text-slate-300 uppercase tracking-widest mt-0.5 font-medium">Excellence</p>
              </div>
              <div className="border-r border-white/10 pr-2">
                <p className="text-lg sm:text-xl font-display font-black text-white">30+ Villas</p>
                <p className="text-[9px] sm:text-[10px] text-slate-300 uppercase tracking-widest mt-0.5 font-medium">Jubilee Hills</p>
              </div>
              <div>
                <p className="text-lg sm:text-xl font-display font-black text-white">3,000+ Ac</p>
                <p className="text-[9px] sm:text-[10px] text-slate-300 uppercase tracking-widest mt-0.5 font-medium">Facilitated</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════ */}
      {/* 2. PROJECT HIGHLIGHTS (Clean, Minimal Cards with High Contrast)   */}
      {/* ═════════════════════════════════════════════════════════════════ */}
      <section id="highlights" className="py-16 sm:py-20 bg-soft border-b border-slate-200">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brandLogo-blue">
              At A Glance
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-navy tracking-tight mt-1">
              Project Highlights & Essentials
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1.5">
              Verified corporate specifications of our luxury residential enclave and master-planned layouts.
            </p>
          </div>

          {/* Clean Info Cards Grid with High Visibility Text */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {projectHighlights.map((item, idx) => {
              const Icon = item.icon
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-white border border-slate-200 p-5 shadow-2xs hover:border-slate-300 hover:shadow-xs transition-all duration-300"
                >
                  <div className="h-9 w-9 rounded-xl bg-slate-100 flex items-center justify-center text-navy mb-3">
                    <Icon className="h-4.5 w-4.5 text-brandLogo-red" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
                    {item.title}
                  </span>
                  <p className="text-base sm:text-lg font-display font-extrabold text-navy mt-0.5">
                    {item.value}
                  </p>
                  <p className="text-xs text-slate-600 font-medium mt-1 leading-snug">
                    {item.desc}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════ */}
      {/* 3. ARCHITECTURAL GALLERY (Symmetrical 3x2 Grid & Lightbox)        */}
      {/* ═════════════════════════════════════════════════════════════════ */}
      <section id="gallery" className="py-20 sm:py-28 bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          {/* Gallery Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-brandLogo-red">
                Visual Distinction
              </span>
              <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-navy tracking-tight mt-1.5">
                Architectural Gallery
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1 max-w-xl">
                Actual completed photographs of private estates, illuminated facades, and crafted living spaces.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1.5 rounded-full border border-slate-200">
              {['All', 'Exterior', 'Interior', 'Construction'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveGalleryCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all ${
                    activeGalleryCategory === cat
                      ? 'bg-navy text-white shadow-xs font-bold'
                      : 'text-slate-600 hover:text-navy'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Symmetrical Luxury Grid (3 Columns x 2 Rows) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGallery.map((item) => (
              <div
                key={item.id}
                onClick={() => setLightboxImage(item)}
                className="group relative rounded-2xl overflow-hidden bg-navy-dark border border-slate-200 cursor-pointer shadow-2xs hover:shadow-xl transition-all duration-300 h-72 sm:h-80"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Subtle dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                {/* Top Category Badge */}
                <div className="absolute top-3.5 left-3.5">
                  <span className="inline-block rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-[10px] uppercase font-bold tracking-[0.14em] text-white border border-white/20 shadow-xs">
                    {item.categoryLabel}
                  </span>
                </div>

                {/* Caption & Full-screen trigger */}
                <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] text-blue-300 font-bold">
                      📍 {item.location}
                    </span>
                    <span className="h-7 w-7 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Maximize2 className="h-3.5 w-3.5 text-white" />
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-display font-extrabold text-white mt-1 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 font-medium">
                    {item.tag}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIGHTBOX MODAL FOR FULL-SCREEN VIEWING */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-[120] bg-black/95 backdrop-blur-lg flex items-center justify-center p-4 sm:p-8"
          onClick={() => setLightboxImage(null)}
        >
          <button
            onClick={() => setLightboxImage(null)}
            className="fixed top-5 right-5 z-[130] h-11 w-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
            aria-label="Close lightbox"
          >
            <X className="h-6 w-6" />
          </button>

          <div
            className="relative max-w-5xl max-h-[90vh] overflow-hidden rounded-2xl bg-navy-dark border border-white/20 shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightboxImage.image}
              alt={lightboxImage.title}
              className="max-h-[75vh] w-auto object-contain mx-auto"
            />
            <div className="p-4 sm:p-6 bg-navy text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-brandLogo-red">
                  {lightboxImage.categoryLabel} · {lightboxImage.location}
                </span>
                <h4 className="text-lg font-display font-bold text-white">{lightboxImage.title}</h4>
                <p className="text-xs text-slate-300 mt-0.5">{lightboxImage.tag}</p>
              </div>
              <a
                href="#enquiry"
                onClick={() => setLightboxImage(null)}
                className="inline-flex items-center gap-1.5 rounded-full bg-brandLogo-red text-white px-5 py-2 text-xs font-bold uppercase tracking-wider shrink-0 hover:bg-red-700 transition"
              >
                <span>Enquire</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ═════════════════════════════════════════════════════════════════ */}
      {/* 4. CONFIGURATIONS & 3D STUDIO SHOWCASE                            */}
      {/* ═════════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 bg-soft border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brandLogo-blue">
              Residential Configurations
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-navy tracking-tight mt-1">
              Palatial 3 & 4 BHK Villa Residences
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1.5">
              Engineered with double-height ceiling voids, 100% Vastu compliance, and private open-sky party terraces.
            </p>
          </div>

          {/* Config Switcher */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex rounded-full bg-white p-1 border border-slate-200 shadow-2xs">
              <button
                onClick={() => setActiveTab('3bhk')}
                className={`px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition ${
                  activeTab === '3bhk' ? 'bg-navy text-white shadow-xs' : 'text-slate-600 hover:text-navy'
                }`}
              >
                3 BHK Signature (1,600 sq.ft)
              </button>
              <button
                onClick={() => setActiveTab('4bhk')}
                className={`px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition ${
                  activeTab === '4bhk' ? 'bg-navy text-white shadow-xs' : 'text-slate-600 hover:text-navy'
                }`}
              >
                4 BHK Palatial (2,200 sq.ft)
              </button>
            </div>
          </div>

          {/* Active Config Overview */}
          {villaConfigs.map((cfg) => {
            if (cfg.id !== activeTab) return null
            return (
              <div key={cfg.id} className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-10 shadow-sm mb-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-200 px-3 py-1 text-xs font-bold text-brandLogo-blue uppercase tracking-wider mb-2">
                      <Award className="h-3.5 w-3.5 text-brandLogo-red" />
                      {cfg.tag}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-navy">{cfg.label}</h3>
                    <p className="text-sm font-bold text-slate-700 mt-1">Carpet Area: <span className="text-navy">{cfg.area}</span> · Estimated: <span className="text-brandLogo-red font-extrabold">{cfg.price}</span></p>
                    
                    <div className="mt-5 space-y-2">
                      {cfg.highlights.map((h, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                          <CheckCircle2 className="h-4 w-4 text-brandLogo-green shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-8 flex flex-wrap gap-3">
                      <a
                        href="#enquiry"
                        className="inline-flex items-center gap-2 rounded-full bg-navy text-white px-6 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-navy-light transition shadow-xs"
                      >
                        <Calendar className="h-3.5 w-3.5" />
                        <span>Enquire for {cfg.label}</span>
                      </a>
                      <button
                        onClick={() => setIsBrochureOpen(true)}
                        className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white text-navy px-6 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-slate-50 transition"
                      >
                        <FileText className="h-3.5 w-3.5 text-brandLogo-blue" />
                        <span>Download Factsheet</span>
                      </button>
                    </div>
                  </div>

                  <div className="lg:col-span-5 rounded-2xl overflow-hidden border border-slate-200 bg-navy-dark">
                    <img
                      src={cfg.id === '3bhk' ? '/portfolio/contemporary-villa-daylight.jpg' : '/portfolio/modern-minimalist-villa-night.jpg'}
                      alt={cfg.label}
                      className="w-full h-72 sm:h-80 object-cover"
                    />
                  </div>
                </div>
              </div>
            )
          })}

          {/* Interactive 3D Studio Spotlight Banner (Directing to /villas) */}
          <div className="rounded-3xl bg-navy p-6 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-md border border-white/10">
            <div className="space-y-1.5">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-brandLogo-red block">
                Interactive Architectural Studio
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                Inspect 3D Villa House Models & 2D CAD Plans
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl font-normal leading-relaxed">
                Rotate real 3D villa perspectives, inspect detailed CAD floor vectors, and simulate natural daylight prana on our dedicated Villas studio page.
              </p>
            </div>
            <Link
              to="/villas"
              className="inline-flex items-center gap-2 rounded-full bg-brandLogo-red hover:bg-red-700 text-white font-bold px-7 py-3 text-xs sm:text-sm uppercase tracking-wider shrink-0 transition shadow-md"
            >
              <span>Launch 3D Studio</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════ */}
      {/* 5. STRATEGIC LOCATION SPOTLIGHT (Clean, Minimal, Fast)            */}
      {/* ═════════════════════════════════════════════════════════════════ */}
      <section id="location" className="py-20 sm:py-28 bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-brandLogo-red">
              Strategic Geography
            </span>
            <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-navy tracking-tight mt-1.5">
              Prime Jubilee Hills Location & Connectivity
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 font-medium">
              Centrally connected to Hyderabad's premier commercial corridors, medical institutes, and transit networks.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Quick Proximity Grid */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {nearbyLandmarks.slice(0, 6).map((lm, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs shadow-2xs flex items-center justify-between"
                >
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500 block">{lm.category}</span>
                    <strong className="text-navy font-bold">{lm.name}</strong>
                  </div>
                  <div className="text-right pl-3 shrink-0">
                    <span className="font-extrabold text-navy block">{lm.distance}</span>
                    <span className="text-[10.5px] text-brandLogo-green font-bold">{lm.time}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Map & Transit Page Callout Card */}
            <div className="lg:col-span-5 rounded-3xl bg-navy p-6 sm:p-8 text-white space-y-4 shadow-sm border border-white/10">
              <span className="text-[10px] font-bold uppercase tracking-widest text-brandLogo-red block">
                Arterial Highway & Metro Transit
              </span>
              <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                Interactive Map & Commute Estimator
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                Explore our full-screen Google Maps integration, calculate drive vs metro times, and inspect active land bank corridors across Western Telangana.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/location"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-brandLogo-red text-white px-6 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-red-700 transition shadow-xs text-center"
                >
                  <Navigation className="h-3.5 w-3.5" />
                  <span>View Full Map & Guide</span>
                </Link>
                <a
                  href="tel:+919550828688"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 text-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-white/20 transition text-center"
                >
                  <Phone className="h-3.5 w-3.5" />
                  <span>Call Us</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════ */}
      {/* 5B. FINANCIAL & INVESTOR SIMULATORS TEASER                        */}
      {/* ═════════════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-24 bg-white border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 border border-slate-200 px-3.5 py-1 text-xs font-semibold text-slate-700 mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-brandLogo-blue" />
              <span className="h-1.5 w-1.5 rounded-full bg-brandLogo-green" />
              <span className="uppercase tracking-[0.16em] text-[10px] font-bold">Institutional Financial Tools</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-navy tracking-tight">
              Financial Engineering & Wealth Engines
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-2xl mx-auto">
              Model precise loan installments with pre-approved banking partner rates or simulate multi-year capital appreciation and compounding rental cashflows.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Card 1: EMI Calculator */}
            <div className="rounded-3xl border border-slate-200 bg-soft p-7 sm:p-9 flex flex-col justify-between hover:shadow-lg transition-all group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="h-12 w-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-brandLogo-blue">
                    <Calculator className="h-6 w-6" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-600">
                    SBI · HDFC · ICICI · Axis
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold font-display text-navy group-hover:text-brandLogo-blue transition">
                    Home Loan EMI & Amortization Simulator
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    Calculate monthly installments, principal vs interest splits, and review pre-approved mortgage rates starting at 8.40% across 5 to 30 year repayment horizons.
                  </p>
                </div>

                <div className="pt-2 grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-white rounded-xl p-3 border border-slate-200">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Benchmark Rate</span>
                    <strong className="text-navy font-display text-sm">8.40% – 8.75%</strong>
                  </div>
                  <div className="bg-white rounded-xl p-3 border border-slate-200">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Pre-Approval</span>
                    <strong className="text-brandLogo-green font-display text-sm">100% Clear Title</strong>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-200">
                <Link
                  to="/emi-calculator"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-brandLogo-blue hover:bg-blue-700 text-white py-3 text-xs font-bold uppercase tracking-wider transition shadow-sm"
                >
                  <span>Launch EMI Calculator</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Card 2: ROI Calculator */}
            <div className="rounded-3xl border border-slate-200 bg-soft p-7 sm:p-9 flex flex-col justify-between hover:shadow-lg transition-all group">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="h-12 w-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-brandLogo-green">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-white border border-slate-200 text-emerald-800">
                    +12.5% Historical CAGR
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold font-display text-navy group-hover:text-brandLogo-green transition">
                    Real Estate ROI & Wealth Engine
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    Simulate capital gains, annual rental yield cashflows, and long-term freehold land-share equity in Jubilee Hills and Hyderabad's fastest-appreciating zones.
                  </p>
                </div>

                <div className="pt-2 grid grid-cols-2 gap-3 text-xs">
                  <div className="bg-white rounded-xl p-3 border border-slate-200">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Corridor CAGR</span>
                    <strong className="text-navy font-display text-sm">+12.5% Annual</strong>
                  </div>
                  <div className="bg-white rounded-xl p-3 border border-slate-200">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Rental Yield</span>
                    <strong className="text-brandLogo-green font-display text-sm">~4.0% p.a. + Escalation</strong>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-200">
                <Link
                  to="/roi-calculator"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-brandLogo-green hover:bg-emerald-800 text-white py-3 text-xs font-bold uppercase tracking-wider transition shadow-sm"
                >
                  <span>Launch ROI Calculator</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════ */}
      {/* 6. ENQUIRY EXPERIENCE (Short Form, WhatsApp, Instant Callback)   */}
      {/* ═════════════════════════════════════════════════════════════════ */}
      <section id="enquiry" className="py-20 sm:py-28 bg-navy text-white border-t border-white/10">
        <div className="mx-auto max-w-5xl px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-brandLogo-red">
                Priority Assistance
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
                Connect with Tirumala Meadows
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                Schedule a confidential consultation, review verified title documentation, or request a private walkthrough with our executive team.
              </p>

              <div className="space-y-3 pt-3">
                <a
                  href="tel:+919550828688"
                  className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition"
                >
                  <div className="h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Direct Concierge</span>
                    <strong className="text-sm font-bold text-white">+91 95508 28688</strong>
                  </div>
                </a>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 hover:bg-emerald-900/40 transition"
                >
                  <div className="h-10 w-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <MessageSquare className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-emerald-300 block">Instant Chat</span>
                    <strong className="text-sm font-bold text-white">WhatsApp Private Desk</strong>
                  </div>
                </a>
              </div>
            </div>

            {/* Right Short Form */}
            <div className="lg:col-span-6 rounded-3xl bg-white text-navy p-6 sm:p-8 shadow-2xl border border-slate-200">
              <h3 className="text-lg font-display font-bold text-navy">Request a Callback & Brochure</h3>
              <p className="text-xs text-slate-600 mt-0.5 mb-5 font-medium">
                Leave your details and our team will get in touch within 2 business hours.
              </p>

              {formSubmitted ? (
                <div className="rounded-2xl bg-emerald-50 border border-emerald-300 p-6 text-center space-y-2">
                  <CheckCircle2 className="h-8 w-8 text-brandLogo-green mx-auto" />
                  <h4 className="text-sm font-display font-bold text-navy">Enquiry Received</h4>
                  <p className="text-xs text-slate-600 font-medium">
                    Thank you. An executive from Tirumala Meadows will connect with you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleEnquirySubmit} className="space-y-3.5">
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. S. Venkat Reddy"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-navy focus:bg-white focus:outline-none focus:border-navy"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block mb-1">
                      Phone Number (Clickable for Verification)
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-navy focus:bg-white focus:outline-none focus:border-navy"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-700 block mb-1">
                      Interested Configuration
                    </label>
                    <select
                      value={formData.configuration}
                      onChange={(e) => setFormData({ ...formData, configuration: e.target.value })}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-navy focus:bg-white focus:outline-none focus:border-navy"
                    >
                      <option value="3bhk">3 BHK Signature Residence (1,600 sq.ft)</option>
                      <option value="4bhk">4 BHK Palatial Grand Estate (2,200 sq.ft)</option>
                      <option value="land">Strategic Plotted Layout / Acreage</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 rounded-full bg-brandLogo-red text-white py-3 text-xs font-bold uppercase tracking-wider hover:bg-red-700 transition shadow-sm mt-2"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>Submit Priority Request</span>
                  </button>

                  <p className="text-[10px] text-center text-slate-500 font-medium">
                    100% Privacy Assured · No Spam Guarantee
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════ */}
      {/* 7. FREQUENTLY ASKED QUESTIONS                                     */}
      {/* ═════════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-soft border-b border-slate-200">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-brandLogo-blue">
              Clarifications & Assurance
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-navy tracking-tight mt-1">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((f, idx) => {
              const isOpen = openFaq === idx
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 bg-white overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition"
                  >
                    <span className="text-xs sm:text-sm font-bold text-navy font-display">{f.q}</span>
                    <div className={`h-7 w-7 rounded-full border border-slate-200 bg-slate-50 flex items-center justify-center shrink-0 transition-transform ${isOpen ? 'rotate-180 text-brandLogo-red' : 'text-navy'}`}>
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-2 text-xs sm:text-sm text-slate-700 font-medium leading-relaxed border-t border-slate-100 bg-white">
                      <p>{f.a}</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <Footer />

      {/* ═════════════════════════════════════════════════════════════════ */}
      {/* FLOATING WHATSAPP BUTTON (Always Visible)                         */}
      {/* ═════════════════════════════════════════════════════════════════ */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40 h-13 w-13 sm:h-14 sm:w-14 rounded-full bg-brandLogo-green text-white flex items-center justify-center shadow-2xl hover:bg-emerald-700 hover:scale-105 active:scale-95 transition-all group"
        aria-label="WhatsApp Concierge"
      >
        <MessageSquare className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
        <span className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full bg-brandLogo-red border-2 border-white animate-pulse" />
      </a>

      {/* ═════════════════════════════════════════════════════════════════ */}
      {/* FIXED MOBILE ENQUIRY ACTION BAR                                  */}
      {/* ═════════════════════════════════════════════════════════════════ */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2 flex sm:hidden items-center justify-between gap-2 shadow-2xl safe-area-pb">
        <a
          href="tel:+919550828688"
          className="flex-1 flex items-center justify-center gap-1 rounded-full border border-slate-200 bg-slate-50 py-2 text-[11px] font-bold text-navy active:scale-97 transition uppercase tracking-wider"
        >
          <Phone className="h-3 w-3 text-brandLogo-blue shrink-0" />
          <span>Call Now</span>
        </a>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1 rounded-full bg-brandLogo-green py-2 text-[11px] font-bold text-white shadow-xs active:scale-97 transition uppercase tracking-wider"
        >
          <MessageSquare className="h-3 w-3 shrink-0" />
          <span>WhatsApp</span>
        </a>
        <a
          href="#enquiry"
          className="flex-1 flex items-center justify-center gap-1 rounded-full bg-brandLogo-red py-2 text-[11px] font-bold text-white active:scale-97 transition uppercase tracking-wider"
        >
          <Calendar className="h-3 w-3 shrink-0" />
          <span>Enquire</span>
        </a>
      </div>

      {/* Factsheet Modal */}
      <BrochureModal
        isOpen={isBrochureOpen}
        onClose={() => setIsBrochureOpen(false)}
      />
    </div>
  )
}
