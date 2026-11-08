import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import AppleNavbar from '../components/AppleNavbar'
import AppleFooter from '../components/AppleFooter'
import {
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Building2,
  Home,
  Trees,
  Dumbbell,
  Film,
  Sparkles,
  ArrowRight,
  ChevronDown,
  Check,
  Car,
  Layers,
  Droplets,
  Zap,
  Users,
  X,
  Compass
} from 'lucide-react'

// Configurations data as specified in Section 4
interface VillaConfig {
  id: string
  title: string
  badge: string
  tagline: string
  area: string
  bedrooms: number
  bathrooms: number
  floors: string
  summary: string
  highlights: string[]
  roomSpecs: { label: string; desc: string }[]
  image: string
}

const configurations: VillaConfig[] = [
  {
    id: '2bhk',
    title: '2 BHK Premium Villa',
    badge: 'Compact Independent Luxury',
    tagline: 'Ideal for modern young couples and compact families seeking independent gated freedom.',
    area: '850 – 1,400 sq.ft.',
    bedrooms: 2,
    bathrooms: 2,
    floors: 'Ground + 1 Floor',
    summary:
      'A thoughtfully crafted two-bedroom villa offering an efficient layout that maximizes living area, ventilation, and private family space.',
    highlights: [
      'Spacious living room with natural cross-ventilation',
      'Ventilated kitchen with dedicated cooking zone',
      'Attached utility area with washing machine provisions',
      'Two well-proportioned private bedrooms',
      'Two contemporary bathrooms with anti-skid flooring',
      'Dedicated traditional puja niche for daily prayer',
    ],
    roomSpecs: [
      { label: 'Living Room', desc: 'Well-lit living room with high ceiling' },
      { label: 'Kitchen & Dining', desc: 'Granite counter with attached utility space' },
      { label: 'Master Bedroom', desc: 'Spacious bedroom with en-suite bathroom' },
      { label: 'Second Bedroom', desc: 'Comfortable guest or children’s bedroom' },
    ],
    image: '/luxury-villas.jpg',
  },
  {
    id: '3bhk',
    title: '3 BHK Joint-Family Villa',
    badge: 'Signature Community Residence',
    tagline: 'The most popular family configuration, seamlessly balancing shared spaces with personal sanctuaries.',
    area: 'Approximately 1,600 sq.ft.',
    bedrooms: 3,
    bathrooms: 3,
    floors: 'Ground + 1 Floor',
    summary:
      'Engineered for multi-generational living, featuring generous common areas, independent parent/master suites, and private upper-floor balconies.',
    highlights: [
      'Large living and dining spaces designed for family gatherings',
      'Three spacious bedrooms with ample wardrobe spaces',
      'Multiple modern bathrooms with premium CP fittings',
      'Expanded private balconies with serene green vistas',
      'Family-friendly layout adhering to traditional Vastu principles',
      'Independent terrace access for evening leisure',
    ],
    roomSpecs: [
      { label: 'Grand Living Hall', desc: 'Expansive family reception lounge' },
      { label: 'Dining Area', desc: 'Adjoining kitchen with easy dining service' },
      { label: 'Master Suite', desc: 'Oversized master suite with private balcony' },
      { label: 'Bedrooms 2 & 3', desc: 'Well-ventilated suites with dedicated baths' },
    ],
    image: '/luxury-villas.jpg',
  },
  {
    id: '4bhk',
    title: '4 BHK Luxury Villa',
    badge: 'Grand Estate Living',
    tagline: 'The pinnacle of private gated estate living with dedicated entertainment suites and expansive open terraces.',
    area: 'Up to 2,200 sq.ft.',
    bedrooms: 4,
    bathrooms: 4,
    floors: 'Ground + 1 Floor (+ Terrace)',
    summary:
      'A grand four-bedroom residence tailored for spacious luxury, executive hosting, and complete privacy for every family member.',
    highlights: [
      'Four-bedroom configuration with generous private suites',
      'Premium master suites with walk-in closet alcoves',
      'Large open-sky balconies offering panoramic township views',
      'Independent rooftop terrace for private gatherings',
      'Multipurpose room / home theatre zone on the upper level',
      'Dedicated covered porch and visitor parking entry',
    ],
    roomSpecs: [
      { label: 'Formal Living & Dining', desc: 'Double-feel grand entertaining area' },
      { label: 'Multipurpose Zone', desc: 'Acoustic-ready room for media or study' },
      { label: 'Master Suite', desc: 'King suite with luxury dressing zone' },
      { label: 'Private Terrace', desc: 'Open-to-sky independent rooftop retreat' },
    ],
    image: '/luxury-villas.jpg',
  },
]

// Amenities divided into 5 user-requested categories
interface AmenityItem {
  name: string
  desc: string
  category: 'Health' | 'Entertainment' | 'Nature' | 'Family' | 'Safety'
  icon: any
}

const amenitiesData: AmenityItem[] = [
  // Health & Wellness
  { name: 'Gymnasium', desc: 'Equipped with cardio machines, free weights, and fitness zones.', category: 'Health', icon: Dumbbell },
  { name: 'Swimming Pool', desc: 'Resort-style pool with filtered crystal-clear water.', category: 'Health', icon: Droplets },
  { name: 'Cycling Tracks', desc: 'Dedicated tracks along the wide, tree-lined internal roads.', category: 'Health', icon: Sparkles },
  { name: 'Jogging Tracks', desc: 'Paved, shaded tracks designed for morning and evening runs.', category: 'Health', icon: Trees },
  
  // Entertainment & Social
  { name: 'Clubhouse', desc: 'Central resident clubhouse for meetings and recreation.', category: 'Entertainment', icon: Building2 },
  { name: 'Mini Theatre', desc: 'Exclusive community screening venue for films and matches.', category: 'Entertainment', icon: Film },
  { name: 'Amphitheatre', desc: 'Open-air stepped amphitheatre for cultural functions.', category: 'Entertainment', icon: Sparkles },
  { name: 'Party House', desc: 'Indoor banquet hall for private family celebrations.', category: 'Entertainment', icon: Users },
  { name: 'Conference Hall', desc: 'Executive meeting space for society and professional gatherings.', category: 'Entertainment', icon: Building2 },

  // Nature & Sustainability
  { name: 'Landscaped Gardens', desc: 'Lush green lawns and manicured shrubbery throughout.', category: 'Nature', icon: Trees },
  { name: 'Green Plantation', desc: 'Avenue trees providing shade, clean air, and birdsong.', category: 'Nature', icon: Trees },
  { name: 'Vastu-Compliant Layouts', desc: 'Township and individual homes aligned for positive energy flow.', category: 'Nature', icon: Compass },
  { name: 'Rainwater Harvesting', desc: 'Integrated pits replenishing the local groundwater table.', category: 'Nature', icon: Droplets },
  { name: 'Sewage Treatment Plant', desc: 'Eco-conscious on-site STP treating wastewater for landscaping.', category: 'Nature', icon: Sparkles },

  // Family & Convenience
  { name: "Children's Play Zones", desc: 'Safe, soft-ground outdoor zones with swings and slides.', category: 'Family', icon: Users },
  { name: 'Visitor Parking', desc: 'Designated bays for guest vehicles to keep roads clear.', category: 'Family', icon: Car },
  { name: 'Reserved Parking', desc: 'Covered independent parking inside each villa porch.', category: 'Family', icon: Car },
  { name: 'Street Lighting', desc: 'High-illumination LED street lamps lining all avenues.', category: 'Family', icon: Zap },
  { name: 'Secure Compound Walls', desc: 'High perimeter security wall enclosing the entire 14 acres.', category: 'Family', icon: ShieldCheck },

  // Safety
  { name: '24/7 Security', desc: 'Round-the-clock trained security personnel at all gates.', category: 'Safety', icon: ShieldCheck },
  { name: 'CCTV Surveillance', desc: 'Comprehensive camera coverage of perimeter and intersections.', category: 'Safety', icon: ShieldCheck },
  { name: 'Round-the-Clock Water Supply', desc: 'Dedicated overhead reservoirs and groundwater storage.', category: 'Safety', icon: Droplets },
  { name: 'Power Backup', desc: 'Generator backup supporting common lighting and vital services.', category: 'Safety', icon: Zap },
]

// Technical specifications accordions
interface SpecAccordion {
  title: string
  subtitle: string
  details: string
  icon: any
}

const technicalSpecs: SpecAccordion[] = [
  {
    title: 'Structure',
    subtitle: 'Earthquake-Resistant Framework',
    details: 'Earthquake-resistant RCC frame structure with red / fly ash brick masonry walls engineered for structural longevity, high thermal insulation, and lasting stability.',
    icon: Building2,
  },
  {
    title: 'Flooring',
    subtitle: 'Premium Marble & Granite',
    details: 'Premium marble and granite tiles across living rooms, passages, and bedrooms. Anti-skid ceramic tiles in bathrooms, balconies, and utility wash areas.',
    icon: Layers,
  },
  {
    title: 'Kitchen',
    subtitle: 'Granite Countertop & Glazed Dado',
    details: 'Granite kitchen platform with glazed tile dado extending up to 2 feet above platform. Stainless steel sink with premium water tap provisions and utility drain points.',
    icon: Sparkles,
  },
  {
    title: 'Doors & Windows',
    subtitle: 'Polished Teak Wood Main Door',
    details: 'Main door crafted with seasoned teak wood frame and polished aesthetic finish with brass/SS hardware. Internal flush doors with enamel paint and aluminum sliding windows.',
    icon: Home,
  },
  {
    title: 'Bathrooms',
    subtitle: 'Sanitary Ware & CP Fittings',
    details: 'Premium sanitary ware from reputed brands, chrome-plated CP fittings, wall-hung washbasins, hot and cold water mixer units, and anti-skid floor tiles.',
    icon: Droplets,
  },
  {
    title: 'Painting',
    subtitle: 'Emulsion & Weather-Resistant Paint',
    details: 'Smooth luppam finish with premium interior acrylic emulsion paint for living spaces. Weather-resistant premium exterior paint designed to withstand monsoon and sun.',
    icon: Sparkles,
  },
]

// Location categorized destinations
const locationCategories = [
  {
    id: 'metro',
    title: 'Metro & Transport',
    destinations: [
      { name: 'Habsiguda Metro Station', note: 'Blue Line Corridor', dist: '1.5 – 3.0 km' },
      { name: 'Uppal Metro Station', note: 'Major Transit Terminal', dist: '3.0 km' },
      { name: 'Hyderabad–Warangal National Highway', note: 'Direct Arterial Link', dist: 'Immediate Access' },
    ],
  },
  {
    id: 'education',
    title: 'Education',
    destinations: [
      { name: 'Hyderabad Public School (HPS Ramanthapur)', note: 'Prestigious K-12 Institution', dist: '4.2 km' },
      { name: 'Delhi Public School (DPS Nacharam)', note: 'CBSE Excellence', dist: '3.5 km' },
      { name: 'Johnson Grammar School', note: 'ICSE Board', dist: '3.0 km' },
      { name: 'Pallavi Model School', note: 'Quality Primary & Secondary', dist: '2.8 km' },
      { name: 'Little Flower College', note: 'Higher Education Hub', dist: '3.2 km' },
    ],
  },
  {
    id: 'healthcare',
    title: 'Healthcare',
    destinations: [
      { name: 'Matrix Hospital', note: 'Multispecialty 24/7 Care', dist: '2.5 km' },
      { name: 'TX Hospitals Uppal', note: 'Super-Specialty Hospital', dist: '2.8 km' },
      { name: 'Siris Hospital', note: 'General Medicine & Trauma', dist: '3.0 km' },
      { name: 'Abhaya / RBM Multispecialty Hospitals', note: 'Emergency Care', dist: '3.2 km' },
    ],
  },
  {
    id: 'employment',
    title: 'Employment & Tech',
    destinations: [
      { name: 'IDA Nacharam', note: 'Industrial & Technology Cluster', dist: '1.5 km' },
      { name: 'Genpact Uppal Campus', note: 'Global IT & Operations Hub', dist: '3.5 km' },
      { name: 'GE Capital', note: 'Corporate Financial Center', dist: '3.5 km' },
      { name: 'NGRI (National Geophysical Research)', note: 'Premier CSIR Campus', dist: '4.0 km' },
      { name: 'CCMB & IICT Research Institutes', note: 'Central Biotech Hub', dist: '4.5 km' },
    ],
  },
  {
    id: 'entertainment',
    title: 'Entertainment & Shopping',
    destinations: [
      { name: 'INOX Multiplex', note: 'Cinemas & Dining', dist: '2.0 km' },
      { name: 'Vyjayanthi Cinema', note: 'Local Entertainment Screen', dist: '2.2 km' },
      { name: 'DSL Virtue Mall (Uppal)', note: 'Shopping & Food Court', dist: '4.5 km' },
      { name: 'Nearby Daily Shopping Markets', note: 'Chilakanagar Local Stalls', dist: '300 Meters' },
    ],
  },
]

export default function ThirumalaMeadows() {
  const [activeTab, setActiveTab] = useState<'2bhk' | '3bhk' | '4bhk'>('3bhk')
  const [activeAmenityCategory, setActiveAmenityCategory] = useState<string>('All')
  const [activeLocationCategory, setActiveLocationCategory] = useState<string>('metro')
  const [openSpecIndex, setOpenSpecIndex] = useState<number | null>(0)
  const [isVisitModalOpen, setIsVisitModalOpen] = useState(false)

  // Inquiry form states
  const [leadForm, setLeadForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    config: '3 BHK Joint-Family Villa',
    purpose: 'Buying Resale',
  })
  const [formSubmitted, setFormSubmitted] = useState(false)

  const activeConfig = configurations.find((c) => c.id === activeTab) || configurations[1]

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault()
    setFormSubmitted(true)
  }

  const filteredAmenities =
    activeAmenityCategory === 'All'
      ? amenitiesData
      : amenitiesData.filter((a) => {
          if (activeAmenityCategory === 'Health & Wellness') return a.category === 'Health'
          if (activeAmenityCategory === 'Entertainment & Social') return a.category === 'Entertainment'
          if (activeAmenityCategory === 'Nature & Sustainability') return a.category === 'Nature'
          if (activeAmenityCategory === 'Family & Convenience') return a.category === 'Family'
          if (activeAmenityCategory === 'Safety') return a.category === 'Safety'
          return true
        })

  return (
    <div className="min-h-screen bg-white text-navy font-sans antialiased selection:bg-hotpink selection:text-white">
      <AppleNavbar onOpenVisitModal={() => setIsVisitModalOpen(true)} />

      {/* ======================================================== */}
      {/* SECTION 1: HERO SECTION (Above the Fold)                  */}
      {/* ======================================================== */}
      <section className="relative overflow-hidden bg-white pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-borderGrey">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid items-center gap-10 lg:grid-cols-12">
            
            {/* Left Column: Headlines & Call to Actions */}
            <div className="space-y-6 lg:col-span-7">
              {/* Status Pill Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-borderGrey bg-soft px-4 py-1.5 text-xs font-semibold text-slateGrey">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-navy font-bold">Completed Gated Villa Community</span>
                <span className="text-borderGrey">·</span>
                <span className="text-hotpink font-bold">14-Acre Township</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-navy leading-[1.12] font-display">
                Sophisticated Living.{' '}
                <span className="block text-slateGrey font-medium mt-1">
                  Timeless Comfort.
                </span>
              </h1>

              {/* Supporting Text */}
              <p className="text-base sm:text-lg text-slateGrey max-w-2xl leading-relaxed">
                Welcome to <strong>Mansani Thirumala Meadows</strong> — a thoughtfully planned 14-acre gated villa community in East Hyderabad, offering independent family living, green surroundings and excellent urban connectivity.
              </p>

              {/* Primary & Secondary CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => setIsVisitModalOpen(true)}
                  className="btn-hotpink inline-flex items-center gap-2.5 px-7 py-3.5 text-sm font-semibold"
                >
                  <Calendar className="h-4 w-4" />
                  <span>Schedule a Private Site Visit</span>
                  <ArrowRight className="h-4 w-4" />
                </button>

                <a
                  href="#overview"
                  className="inline-flex items-center gap-2 rounded-full border border-borderGrey bg-soft px-6 py-3.5 text-sm font-semibold text-navy hover:bg-white hover:border-navy hover:shadow-sm transition"
                >
                  <span>Explore the Community</span>
                  <ChevronDown className="h-4 w-4 text-slateGrey" />
                </a>
              </div>

              {/* 4 Supporting Highlights */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-borderGrey">
                {[
                  { title: '14 Acres', label: 'Community Living' },
                  { title: 'Ground + 1', label: 'Independent Villas' },
                  { title: '100% Ready', label: 'Fully Completed' },
                  { title: 'Prime Uppal', label: 'East Hyderabad' },
                ].map((item, idx) => (
                  <div key={idx} className="rounded-2xl border border-borderGrey bg-soft p-3.5 text-center">
                    <p className="text-base sm:text-lg font-bold text-navy font-display">{item.title}</p>
                    <p className="text-xs text-slateGrey mt-0.5">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Hero Visual Photography */}
            <div className="lg:col-span-5">
              <div className="luxury-card p-3 relative overflow-hidden">
                <div className="img-zoom-container relative h-80 sm:h-96 w-full bg-soft rounded-2xl overflow-hidden">
                  <img
                    src="/luxury-villas.jpg"
                    alt="Mansani Thirumala Meadows Community Aerial View"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
                  
                  {/* Floating Overlay Card */}
                  <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-white/95 backdrop-blur-md p-4 border border-borderGrey shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-semibold text-hotpink uppercase tracking-wider">Independent Villas</p>
                        <p className="text-sm font-bold text-navy">Mansani Thirumala Meadows</p>
                        <p className="text-xs text-slateGrey mt-0.5">Thirumala Meadows Colony, Chilakanagar, Uppal</p>
                      </div>
                      <div className="h-10 w-10 rounded-full bg-soft border border-borderGrey flex items-center justify-center text-navy shrink-0">
                        <Home className="h-5 w-5 text-hotpink" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-3 text-center">
                  <p className="text-xs text-slateGrey">
                    A completed 14-acre gated residential haven by <strong className="text-navy">Mansani Constructions Pvt Ltd</strong>
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 2: PROJECT OVERVIEW                              */}
      {/* ======================================================== */}
      <section id="overview" className="py-20 bg-soft border-b border-borderGrey">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-navy/5 px-3.5 py-1 text-xs font-semibold text-navy">
              Project Overview
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-navy font-display">
              Space to Live. Freedom to Belong.
            </h2>
            <p className="text-base text-slateGrey leading-relaxed">
              Developed by <strong>Mansani Constructions Pvt Ltd</strong>, Mansani Thirumala Meadows brings together thoughtfully planned independent villas, community amenities and landscaped surroundings in a gated residential environment.
            </p>
          </div>

          {/* Quick Statistics Cards */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5 mt-14">
            {[
              {
                stat: '14 Acres',
                label: 'Total Land Area',
                detail: 'Expansive gated township layout with wide concrete roads and green avenue trees.',
              },
              {
                stat: '278–350',
                label: 'Community Size',
                detail: 'Approximate independent villa units fostering a secure and close-knit neighborhood.',
              },
              {
                stat: '2, 3 & 4 BHK',
                label: 'Villa Configurations',
                detail: 'Thoughtfully designed duplex floor plans tailored for joint and growing families.',
              },
              {
                stat: 'Ready to Move',
                label: 'Completed Project',
                detail: '100% finished infrastructure, occupied homes, active society, and no construction delays.',
              },
              {
                stat: 'Ground + 1',
                label: 'Independent Structure',
                detail: 'Independent private villa architecture with private entrance and rooftop terrace.',
              },
            ].map((item, idx) => (
              <div key={idx} className="luxury-card p-6 flex flex-col justify-between">
                <div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-navy font-display tracking-tight">
                    {item.stat}
                  </p>
                  <p className="text-sm font-semibold text-hotpink mt-1">{item.label}</p>
                </div>
                <p className="text-xs text-slateGrey mt-4 leading-relaxed border-t border-borderGrey pt-3">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 3: VILLA CONFIGURATIONS (Interactive Selector)    */}
      {/* ======================================================== */}
      <section id="villas" className="py-20 bg-white border-b border-borderGrey">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-hotpink/10 px-3.5 py-1 text-xs font-semibold text-hotpink">
                Villa Configurations
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-navy mt-2 font-display">
                Floor Plans Designed Around Family Life
              </h2>
              <p className="text-sm sm:text-base text-slateGrey mt-2 max-w-xl">
                Choose between 2, 3 and 4 BHK independent duplex structures engineered for privacy, ventilation, and daily comfort.
              </p>
            </div>

            {/* Interactive Tab Switcher */}
            <div className="inline-flex p-1.5 rounded-full bg-soft border border-borderGrey self-start md:self-auto">
              {[
                { id: '2bhk', label: '2 BHK Premium' },
                { id: '3bhk', label: '3 BHK Joint-Family' },
                { id: '4bhk', label: '4 BHK Luxury' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as '2bhk' | '3bhk' | '4bhk')}
                  className={`rounded-full px-5 py-2.5 text-xs sm:text-sm font-semibold transition-all ${
                    activeTab === tab.id
                      ? 'bg-hotpink text-white shadow-sm'
                      : 'text-slateGrey hover:text-navy'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Active Configuration Showcase */}
          <div className="luxury-card p-6 sm:p-10">
            <div className="grid gap-10 lg:grid-cols-12 items-center">
              
              {/* Left Column: Specs & Highlights */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-soft px-3.5 py-1 text-xs font-semibold text-slateGrey border border-borderGrey">
                    {activeConfig.badge}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-navy mt-2 font-display">
                    {activeConfig.title}
                  </h3>
                  <p className="text-sm font-medium text-slateGrey mt-1">
                    {activeConfig.tagline}
                  </p>
                </div>

                {/* Key Metrics Pill Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="rounded-2xl bg-soft border border-borderGrey p-3">
                    <p className="text-xs text-slateGrey">Super Built Area</p>
                    <p className="text-sm sm:text-base font-bold text-navy font-display">{activeConfig.area}</p>
                  </div>
                  <div className="rounded-2xl bg-soft border border-borderGrey p-3">
                    <p className="text-xs text-slateGrey">Bedrooms</p>
                    <p className="text-sm sm:text-base font-bold text-navy font-display">{activeConfig.bedrooms} Bedrooms</p>
                  </div>
                  <div className="rounded-2xl bg-soft border border-borderGrey p-3">
                    <p className="text-xs text-slateGrey">Bathrooms</p>
                    <p className="text-sm sm:text-base font-bold text-navy font-display">{activeConfig.bathrooms} Bathrooms</p>
                  </div>
                  <div className="rounded-2xl bg-soft border border-borderGrey p-3">
                    <p className="text-xs text-slateGrey">Structure</p>
                    <p className="text-sm sm:text-base font-bold text-navy font-display">{activeConfig.floors}</p>
                  </div>
                </div>

                <p className="text-sm text-slateGrey leading-relaxed">
                  {activeConfig.summary}
                </p>

                {/* Highlights List */}
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-navy mb-3 font-display">
                    Configuration Highlights
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-2.5">
                    {activeConfig.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slateGrey">
                        <Check className="h-4 w-4 text-hotpink shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap gap-3">
                  <button
                    onClick={() => setIsVisitModalOpen(true)}
                    className="btn-hotpink inline-flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-semibold"
                  >
                    <Calendar className="h-4 w-4" />
                    <span>Inquire About {activeConfig.title}</span>
                  </button>
                  <Link
                    to="/villas"
                    className="inline-flex items-center gap-2 rounded-full border border-borderGrey bg-soft px-5 py-3 text-xs sm:text-sm font-semibold text-navy hover:bg-white transition"
                  >
                    <span>View Floor Dimension Details</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>

              {/* Right Column: Visual Floor-Plan Graphic Container */}
              <div className="lg:col-span-5">
                <div className="rounded-2xl border border-borderGrey bg-soft p-4 text-center">
                  <div className="img-zoom-container relative h-72 sm:h-80 rounded-xl bg-white border border-borderGrey overflow-hidden flex items-center justify-center p-4">
                    <img
                      src={activeConfig.image}
                      alt={`${activeConfig.title} Layout Representation`}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-navy/20 backdrop-blur-[1px]" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-white text-center">
                      <div className="h-12 w-12 rounded-full bg-white text-navy flex items-center justify-center mb-3 shadow-md">
                        <Home className="h-6 w-6 text-hotpink" />
                      </div>
                      <p className="text-base font-bold font-display">{activeConfig.title}</p>
                      <p className="text-xs text-slate-200 mt-1">{activeConfig.area} · {activeConfig.floors}</p>
                      <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 text-navy px-4 py-1 text-xs font-semibold">
                        Ready To Move In
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-2 text-left">
                    {activeConfig.roomSpecs.map((rs, idx) => (
                      <div key={idx} className="rounded-xl bg-white border border-borderGrey p-2.5">
                        <p className="text-[11px] font-bold text-navy">{rs.label}</p>
                        <p className="text-[10px] text-slateGrey mt-0.5">{rs.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 4: AMENITIES GALLERY (Categorized)                */}
      {/* ======================================================== */}
      <section id="amenities" className="py-20 bg-soft border-b border-borderGrey">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-navy/5 px-3.5 py-1 text-xs font-semibold text-navy">
              Community Amenities
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-navy font-display">
              A Complete Ecosystem of Health, Nature & Leisure
            </h2>
            <p className="text-sm sm:text-base text-slateGrey leading-relaxed">
              Mansani Thirumala Meadows features a curated collection of wellness, social and recreational amenities spread across its lush 14 acres.
            </p>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
              {[
                'All',
                'Health & Wellness',
                'Entertainment & Social',
                'Nature & Sustainability',
                'Family & Convenience',
                'Safety',
              ].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveAmenityCategory(cat)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
                    activeAmenityCategory === cat
                      ? 'bg-navy text-white shadow-sm'
                      : 'bg-white border border-borderGrey text-slateGrey hover:text-navy hover:border-navy'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Amenities Grid */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 mt-12">
            {filteredAmenities.map((amenity, index) => {
              const IconComp = amenity.icon
              return (
                <div key={index} className="luxury-card p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-soft border border-borderGrey text-navy mb-4">
                      <IconComp className="h-5 w-5 text-hotpink" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-hotpink">
                      {amenity.category}
                    </span>
                    <h4 className="text-base font-bold text-navy mt-1 font-display">
                      {amenity.name}
                    </h4>
                    <p className="text-xs text-slateGrey mt-2 leading-relaxed">
                      {amenity.desc}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 5: TECHNICAL SPECIFICATIONS (Accordions)          */}
      {/* ======================================================== */}
      <section id="specifications" className="py-20 bg-white border-b border-borderGrey">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-14">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-hotpink/10 px-3.5 py-1 text-xs font-semibold text-hotpink">
              Engineering Excellence
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-navy font-display">
              Technical Specifications & Craftsmanship
            </h2>
            <p className="text-sm sm:text-base text-slateGrey">
              Built by Mansani Constructions Pvt Ltd with durable materials, earthquake-resistant engineering, and refined finishes.
            </p>
          </div>

          {/* Accordion List */}
          <div className="max-w-4xl mx-auto space-y-3">
            {technicalSpecs.map((spec, idx) => {
              const isOpen = openSpecIndex === idx
              const SpecIcon = spec.icon
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-borderGrey bg-soft transition-all duration-200 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenSpecIndex(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-5 text-left transition hover:bg-white"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-borderGrey text-hotpink shrink-0">
                        <SpecIcon className="h-5 w-5" />
                      </div>
                      <div>
                        <span className="text-base font-bold text-navy font-display block">
                          {spec.title}
                        </span>
                        <span className="text-xs text-slateGrey">
                          {spec.subtitle}
                        </span>
                      </div>
                    </div>
                    <div className={`h-8 w-8 rounded-full border border-borderGrey bg-white flex items-center justify-center text-navy transition-transform duration-200 ${isOpen ? 'rotate-180 text-hotpink' : ''}`}>
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slateGrey leading-relaxed border-t border-borderGrey/60 bg-white">
                      <p>{spec.details}</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 6: LOCATION AND CONNECTIVITY                      */}
      {/* ======================================================== */}
      <section id="location" className="py-20 bg-soft border-b border-borderGrey">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-navy/5 px-3.5 py-1 text-xs font-semibold text-navy">
              Prime East Hyderabad Location
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-navy font-display">
              Connected to Everything. Away from the Ordinary.
            </h2>
            <p className="text-sm sm:text-base text-slateGrey">
              Situated in Thirumala Meadows Colony, Chilakanagar, Uppal / Boduppal — offering peaceful independent living with immediate access to Hyderabad’s Blue Line Metro and prime commercial hubs.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-12 items-start">
            
            {/* Left Column: Categorized Destinations */}
            <div className="lg:col-span-7 space-y-4">
              {/* Category selector */}
              <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-white border border-borderGrey">
                {locationCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveLocationCategory(cat.id)}
                    className={`rounded-xl px-4 py-2 text-xs font-semibold transition ${
                      activeLocationCategory === cat.id
                        ? 'bg-navy text-white'
                        : 'text-slateGrey hover:text-navy hover:bg-soft'
                    }`}
                  >
                    {cat.title}
                  </button>
                ))}
              </div>

              {/* Destination list cards */}
              <div className="luxury-card p-6 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slateGrey font-display">
                  {locationCategories.find((c) => c.id === activeLocationCategory)?.title} Points of Interest
                </h4>

                <div className="divide-y divide-borderGrey">
                  {locationCategories
                    .find((c) => c.id === activeLocationCategory)
                    ?.destinations.map((dest, i) => (
                      <div key={i} className="py-3.5 flex items-center justify-between gap-4">
                        <div>
                          <p className="text-sm font-bold text-navy">{dest.name}</p>
                          <p className="text-xs text-slateGrey">{dest.note}</p>
                        </div>
                        <span className="inline-flex items-center rounded-full bg-hotpink/10 px-3 py-1 text-xs font-bold text-hotpink shrink-0">
                          {dest.dist}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Right Column: Address & Map Card */}
            <div className="lg:col-span-5">
              <div className="luxury-card p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-xl bg-hotpink/10 text-hotpink flex items-center justify-center shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-navy font-display">Official Colony Address</h4>
                    <p className="text-xs text-slateGrey mt-1 leading-relaxed">
                      Thirumala Meadows Colony, Hema Nagar, Chilakanagar, Uppal / Boduppal, Hyderabad, Telangana.
                    </p>
                  </div>
                </div>

                {/* Styled Map Representation Container */}
                <div className="rounded-2xl border border-borderGrey bg-soft p-4 text-center">
                  <div className="h-56 rounded-xl bg-white border border-borderGrey flex flex-col items-center justify-center p-6 text-center space-y-3">
                    <div className="h-12 w-12 rounded-full bg-soft text-navy flex items-center justify-center border border-borderGrey">
                      <Compass className="h-6 w-6 text-hotpink" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-navy">Uppal / Boduppal Metro Corridor</p>
                      <p className="text-[11px] text-slateGrey mt-0.5">3 km to Habsiguda & Uppal Blue Line Stations</p>
                    </div>
                    <a
                      href="https://maps.google.com/?q=Mansani+Thirumala+Meadows+Uppal+Hyderabad"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-full border border-borderGrey bg-white px-4 py-1.5 text-xs font-semibold text-navy hover:bg-soft transition shadow-sm"
                    >
                      <span>Open in Google Maps</span>
                      <ArrowRight className="h-3 w-3" />
                    </a>
                  </div>
                </div>

                <div className="rounded-xl bg-soft border border-borderGrey p-3 text-xs text-slateGrey">
                  <strong className="text-navy">Commute Note: </strong>
                  Fast connectivity to Warangal Highway and Nacharam Industrial Corridor without crossing inner city bottlenecks.
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* SECTION 7: CONTACT AND LEAD GENERATION                   */}
      {/* ======================================================== */}
      <section id="contact" className="py-20 bg-white border-b border-borderGrey">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-12 items-center">
            
            {/* Left Column: Context & Developer Attribution */}
            <div className="lg:col-span-5 space-y-6">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-hotpink/10 px-3.5 py-1 text-xs font-semibold text-hotpink">
                Resale & Community Inquiries
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-navy font-display">
                Your Next Chapter Starts Here.
              </h2>
              <p className="text-sm sm:text-base text-slateGrey leading-relaxed">
                Discover the comfort of independent villa living at Mansani Thirumala Meadows. Get in touch to explore available properties and arrange a private visit.
              </p>

              {/* Developer Attribution Box */}
              <div className="rounded-2xl border border-borderGrey bg-soft p-5 space-y-2">
                <p className="text-xs uppercase tracking-wider font-bold text-slateGrey">
                  Developer Attribution
                </p>
                <p className="text-base font-bold text-navy font-display">
                  A Project by Mansani Constructions Pvt Ltd.
                </p>
                <p className="text-xs text-slateGrey leading-relaxed">
                  Mansani Thirumala Meadows is a fully completed, registered residential township. Our inquiry desk assists verified buyers, resale opportunities, and direct site visits.
                </p>
              </div>

              {/* Quick Contact Points */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-xs text-slateGrey">
                  <Phone className="h-4 w-4 text-hotpink" />
                  <a href="tel:+919700760120" className="text-navy font-semibold hover:text-hotpink transition">
                    +91 97007 60120
                  </a>
                </div>
                <div className="flex items-center gap-3 text-xs text-slateGrey">
                  <Mail className="h-4 w-4 text-hotpink" />
                  <span className="text-navy">inquiries@mansaniconstructions.com</span>
                </div>
                <div className="flex items-start gap-3 text-xs text-slateGrey">
                  <MapPin className="h-4 w-4 text-hotpink shrink-0 mt-0.5" />
                  <span>Thirumala Meadows Colony, Chilakanagar, Uppal / Boduppal, Hyderabad</span>
                </div>
              </div>
            </div>

            {/* Right Column: Lead Capture Form Card */}
            <div className="lg:col-span-7">
              <div className="luxury-card p-8 sm:p-10">
                {formSubmitted ? (
                  <div className="text-center py-10 space-y-4">
                    <div className="h-16 w-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="h-8 w-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-navy font-display">Callback Request Received</h3>
                    <p className="text-sm text-slateGrey max-w-md mx-auto">
                      Thank you, <strong className="text-navy">{leadForm.fullName || 'Valued Visitor'}</strong>. Our representative will contact you at <strong className="text-navy">{leadForm.phone}</strong> regarding available units in Mansani Thirumala Meadows.
                    </p>
                    <button
                      onClick={() => setFormSubmitted(false)}
                      className="mt-4 rounded-full border border-borderGrey bg-soft px-6 py-2.5 text-xs font-semibold text-navy hover:bg-white transition"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div className="border-b border-borderGrey pb-4 mb-4">
                      <h3 className="text-xl font-bold text-navy font-display">Inquire About Resale & Site Visits</h3>
                      <p className="text-xs text-slateGrey mt-0.5">Please share your details to arrange an appointment or receive property updates.</p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      {/* Full Name */}
                      <div>
                        <label className="block text-xs font-semibold text-navy mb-1.5">
                          Full Name <span className="text-hotpink">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Rajesh Sharma"
                          value={leadForm.fullName}
                          onChange={(e) => setLeadForm({ ...leadForm, fullName: e.target.value })}
                          className="w-full rounded-xl border border-borderGrey bg-soft px-4 py-2.5 text-xs sm:text-sm text-navy placeholder:text-slateGrey/60 focus:bg-white focus:border-navy focus:outline-none transition"
                        />
                      </div>

                      {/* Phone Number */}
                      <div>
                        <label className="block text-xs font-semibold text-navy mb-1.5">
                          Phone Number <span className="text-hotpink">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="e.g. +91 98765 43210"
                          value={leadForm.phone}
                          onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                          className="w-full rounded-xl border border-borderGrey bg-soft px-4 py-2.5 text-xs sm:text-sm text-navy placeholder:text-slateGrey/60 focus:bg-white focus:border-navy focus:outline-none transition"
                        />
                      </div>
                    </div>

                    {/* Email Address */}
                    <div>
                      <label className="block text-xs font-semibold text-navy mb-1.5">
                        Email Address <span className="text-hotpink">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. rajesh@example.com"
                        value={leadForm.email}
                        onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                        className="w-full rounded-xl border border-borderGrey bg-soft px-4 py-2.5 text-xs sm:text-sm text-navy placeholder:text-slateGrey/60 focus:bg-white focus:border-navy focus:outline-none transition"
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      {/* Interested Configuration */}
                      <div>
                        <label className="block text-xs font-semibold text-navy mb-1.5">
                          Interested Configuration
                        </label>
                        <select
                          value={leadForm.config}
                          onChange={(e) => setLeadForm({ ...leadForm, config: e.target.value })}
                          className="w-full rounded-xl border border-borderGrey bg-soft px-4 py-2.5 text-xs sm:text-sm text-navy focus:bg-white focus:border-navy focus:outline-none transition"
                        >
                          <option>2 BHK Premium Villa</option>
                          <option>3 BHK Joint-Family Villa</option>
                          <option>4 BHK Luxury Villa</option>
                          <option>Any Configuration</option>
                        </select>
                      </div>

                      {/* Purpose */}
                      <div>
                        <label className="block text-xs font-semibold text-navy mb-1.5">
                          Purpose
                        </label>
                        <select
                          value={leadForm.purpose}
                          onChange={(e) => setLeadForm({ ...leadForm, purpose: e.target.value })}
                          className="w-full rounded-xl border border-borderGrey bg-soft px-4 py-2.5 text-xs sm:text-sm text-navy focus:bg-white focus:border-navy focus:outline-none transition"
                        >
                          <option>Buying Resale</option>
                          <option>Renting</option>
                          <option>General Inquiry</option>
                        </select>
                      </div>
                    </div>

                    <p className="text-[11px] text-slateGrey pt-1">
                      Note: This is a completed community. Resale availability is coordinated directly with verified property holders.
                    </p>

                    {/* CTA: Request a Callback */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        className="btn-hotpink w-full py-3.5 text-sm font-semibold flex items-center justify-center gap-2"
                      >
                        <span>Request a Callback</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* VISIT BOOKING MODAL                                       */}
      {/* ======================================================== */}
      {isVisitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/60 backdrop-blur-sm p-4">
          <div className="luxury-card max-w-lg w-full p-6 sm:p-8 relative">
            <button
              onClick={() => setIsVisitModalOpen(false)}
              className="absolute top-5 right-5 h-8 w-8 rounded-full border border-borderGrey bg-soft text-slateGrey hover:text-navy flex items-center justify-center transition"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="space-y-2 mb-6">
              <span className="inline-flex items-center gap-1 rounded-full bg-hotpink/10 px-3 py-0.5 text-xs font-semibold text-hotpink">
                Private Appointment
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-navy font-display">Schedule a Site Visit</h3>
              <p className="text-xs text-slateGrey">
                Tour the 14-acre gated community, explore internal avenue roads, central clubhouse, and inspect completed villa structures in Uppal.
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                setIsVisitModalOpen(false)
                alert('Thank you! Your private site visit request has been recorded. Our team will call you to confirm your date and time.')
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-semibold text-navy mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  className="w-full rounded-xl border border-borderGrey bg-soft px-4 py-2.5 text-xs text-navy focus:bg-white focus:border-navy focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-navy mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    className="w-full rounded-xl border border-borderGrey bg-soft px-4 py-2.5 text-xs text-navy focus:bg-white focus:border-navy focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-navy mb-1">Preferred Date</label>
                  <input
                    type="date"
                    required
                    defaultValue={new Date().toISOString().split('T')[0]}
                    className="w-full rounded-xl border border-borderGrey bg-soft px-4 py-2.5 text-xs text-navy focus:bg-white focus:border-navy focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-navy mb-1">Villa Configuration Preference</label>
                <select className="w-full rounded-xl border border-borderGrey bg-soft px-4 py-2.5 text-xs text-navy focus:bg-white focus:border-navy focus:outline-none">
                  <option>3 BHK Joint-Family Villa (Most Popular)</option>
                  <option>2 BHK Premium Villa</option>
                  <option>4 BHK Luxury Villa</option>
                </select>
              </div>

              <button
                type="submit"
                className="btn-hotpink w-full py-3 text-xs sm:text-sm font-semibold mt-2"
              >
                Confirm Site Visit Booking
              </button>
            </form>
          </div>
        </div>
      )}

      <AppleFooter />
    </div>
  )
}
