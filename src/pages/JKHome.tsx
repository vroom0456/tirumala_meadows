import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import {
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  ShieldCheck,
  Clock,
  HardHat,
  Award,
  ChevronDown,
  Calculator,
  ArrowRight,
  ExternalLink,
  Building2,
  Home as HomeIcon,
  Sparkles,
  FileText,
  BadgePercent,
  Check,
  Star,
  Compass,
  Zap,
  Droplets,
  Layers,
  Send,
  MessageSquare,
  X
} from 'lucide-react'

// Construction packages from https://jkassociatesonline.com/
interface PackageSpec {
  name: string
  price: number
  popular?: boolean
  description: string
  specs: string[]
}

const packages: PackageSpec[] = [
  {
    name: 'Silver Package',
    price: 1850,
    description: 'Ideal for standard residential homes with high quality essentials and zero compromise on durability.',
    specs: [
      'Tirupathi / Ultra TMT steel',
      '53-grade cement (RAMCO / Sagar)',
      'UPVC windows – 80 series',
      'Imported teak main door',
      'Vitrified tile flooring throughout',
      'Solecera sanitaryware fittings',
      'Asian Tractor + Ace exterior paint',
      'Stainless steel SS-202 railing',
      'Anchor Penta switches & fire-proof wiring',
      'Dedicated on-site engineer + supervisor',
    ],
  },
  {
    name: 'Gold Package',
    price: 2050,
    popular: true,
    description: 'Our most popular package for modern family homes with premium fittings and branded architectural finishes.',
    specs: [
      'Shree / Sarvottam Fe-550 TMT steel',
      'UltraTech Super 53-grade cement',
      'UPVC windows – 90 series (Green Tech)',
      'Double-charged premium vitrified tiles',
      'Imported teak main door with carving',
      'CERA / Parryware sanitaryware & CP fittings',
      'Finolex fire-retardant wiring + Legrand MCBs',
      'Asian Apex weatherproof elevation paint',
      'Complete 2D/3D design package + Soil test report',
      'Anti-termite & pest control warranty support',
    ],
  },
  {
    name: 'Platinum Package',
    price: 2250,
    description: 'Designed for luxury duplexes and independent villas with premium timber, granite, and executive styling.',
    specs: [
      'Vizag / Jairaj TMT structural steel',
      'UltraTech Super 53-grade cement',
      'UPVC windows – 90 series with toughened glass',
      'Burma teak internal doors + Godrej mortise locks',
      'Authentic Indian teak main door (grand entrance)',
      '2×4 double-charged large format tiles',
      'Sadarahalli granite with half-moulding platform',
      'Asian Premium interior + Ultima exterior paint',
      'SS-304 grade architectural railing',
      'Premium Cera / Hindware sanitary collection',
    ],
  },
  {
    name: 'Diamond Package',
    price: 2550,
    description: 'Ultra-luxury bespoke architectural construction with tier-1 materials and European fittings.',
    specs: [
      'TATA Tiscon / JSW structural steel',
      'Fenesta acoustic UPVC windows – 90 series',
      'Maharaja 8ft Indian teak grand entrance door',
      'Indian teak internal doors throughout',
      'Kajaria double-glazed designer tiles',
      'Premium Z-Black granite kitchen platform',
      'Lapothora / Tandur natural stone parking tiles',
      'Asian Royale luxury interior + textured exterior',
      'Havells modular electrical automation ready',
      'Jaquar / Hindware high-end sanitary + Carysil quartz sink',
    ],
  },
]

const services = [
  {
    title: 'Luxury Villas & Duplex Houses',
    desc: 'Custom-designed luxury duplex and independent villas tailored to your lifestyle, complete with vastu planning and modern elevations.',
    img: '/luxury-villas.jpg',
    tag: 'Premium Living',
  },
  {
    title: 'Apartment & Gated Community',
    desc: 'High-yield residential apartments, stilt+5 residential buildings, and boutique gated complexes built with speed and structural integrity.',
    img: '/apartment.jpg',
    tag: 'Multi-Family',
  },
  {
    title: 'Commercial Construction',
    desc: 'Showrooms, office towers, clinic spaces, and commercial hubs engineered for maximum floor efficiency and GHMC compliance.',
    img: '/commercial.png',
    tag: 'Commercial',
  },
  {
    title: 'Turnkey Residential Homes',
    desc: 'End-to-end house construction from soil excavation to key handover with zero advance and stage-wise client approvals.',
    img: '/residential.jpg',
    tag: 'Turnkey',
  },
]

const complementaryServices = [
  { icon: Building2, title: 'Building Permission', desc: 'Complete GHMC / HMDA municipal drawing approvals and NOC coordination.' },
  { icon: Zap, title: 'Electricity Permission', desc: 'TSSPDCL transformer and 3-phase meter sanctions arranged smoothly.' },
  { icon: Droplets, title: 'Borewell Drilling', desc: 'Geologist scientific water divining and deep borewell installation.' },
  { icon: FileText, title: 'Bank Loan Assistance', desc: 'Approved project estimates with SBI, HDFC, ICICI, and Axis Bank.' },
  { icon: Compass, title: 'Architectural Floor Plans', desc: '100% Vastu-compliant 2D plans and photorealistic 3D elevations.' },
  { icon: Layers, title: 'Structural & Soil Testing', desc: 'Certified soil bearing test and IIT/NIT standard structural design calculations.' },
  { icon: ShieldCheck, title: 'Anti-Termite Treatment', desc: 'Pre-construction and post-construction chemical pest barrier with certificate.' },
  { icon: HardHat, title: 'On-Site Quality Supervision', desc: 'Daily cube strength tests, slump tests, and engineer checks on site.' },
]

const projectsList = [
  { id: 1, name: 'Royal Residency Villa', category: 'Luxury Villa', loc: 'Jubilee Hills, Hyderabad', area: '4,800 sq.ft', duration: '14 Months', status: 'Completed', img: '/luxury-villas.jpg' },
  { id: 2, name: 'Sri Venkateshwara Heights', category: 'Apartment', loc: 'Kondapur, Hyderabad', area: '12,500 sq.ft', duration: '18 Months', status: 'Completed', img: '/apartment.jpg' },
  { id: 3, name: 'Orchid Commercial Plaza', category: 'Commercial', loc: 'Gachibowli, Hyderabad', area: '8,200 sq.ft', duration: '12 Months', status: 'Completed', img: '/commercial.png' },
  { id: 4, name: 'Lakshmi Nilayam Duplex', category: 'Residential', loc: 'Kukatpally, Hyderabad', area: '2,600 sq.ft', duration: '11 Months', status: 'Completed', img: '/residential.jpg' },
  { id: 5, name: 'Greenfield Luxury Home', category: 'Luxury Villa', loc: 'Shamshabad, Hyderabad', area: '3,900 sq.ft', duration: '13 Months', status: 'Completed', img: '/luxury-villas.jpg' },
  { id: 6, name: 'Malkajgiri Independent House', category: 'Residential', loc: 'Malkajgiri, Hyderabad', area: '2,200 sq.ft', duration: '10 Months', status: 'Completed', img: '/residential.jpg' },
]

const brandPartners = [
  'TATA Tiscon',
  'JSW Steel',
  'UltraTech Cement',
  'Ramco Cement',
  'Kajaria Tiles',
  'Asian Paints',
  'Finolex Cables',
  'Havells',
  'Legrand',
  'Jaquar',
  'Cera',
  'Fenesta Windows',
  'Godrej Locks',
  'Parryware',
]

const testimonials = [
  {
    name: 'K. Rajendra Prasad',
    role: 'Homeowner, Kukatpally (G+2 House)',
    rating: 5,
    text: 'The Zero Advance model gave me complete peace of mind. Every other builder in Hyderabad asked for 20-30% upfront. With JK Associates, I only paid for the foundation after my structural engineer inspected it on site. The quality of materials was 100% genuine.',
  },
  {
    name: 'Srinivas Varma',
    role: 'Villa Owner, Jubilee Hills',
    rating: 5,
    text: 'Daily WhatsApp photos and weekly site progress reports kept us fully informed even when I was travelling for work. Handover was completed in 13 months with zero cost escalation from the original BOQ quotation.',
  },
  {
    name: 'Dr. Ananya Reddy',
    role: 'Duplex Home, Kondapur',
    rating: 5,
    text: 'JK Associates handled our GHMC building permissions, borewell drilling, and structural designs in-house. We did not have to run around govt offices. Truly an end-to-end honest construction firm.',
  },
]

const faqs = [
  {
    q: 'How does the "Zero Advance" construction system work?',
    a: 'We sign a clear legal contract and begin work immediately using our own capital. You do not pay a single rupee in advance. The first payment milestone is triggered only after the foundation work is physically completed, inspected, and approved by you on your site.',
  },
  {
    q: 'What is the typical timeline to construct a house in Hyderabad?',
    a: 'For a standard G+1 home of 1,200–2,400 sq.ft, construction typically takes 10–13 months. Larger custom villas and multi-unit buildings take 14–18 months. All timelines are written into the agreement with penalties for delayed delivery.',
  },
  {
    q: 'Do you take care of GHMC / municipal building permissions?',
    a: 'Yes! We handle the complete process: municipal architectural drawings, GHMC / HMDA online submission, structural stability certificates, and occupancy certificates so you have zero hassle.',
  },
  {
    q: 'Which areas in Telangana do you build in?',
    a: 'We serve all areas of Hyderabad and Secunderabad (including Kukatpally, Miyapur, Kondapur, Gachibowli, Madhapur, Banjara Hills, Jubilee Hills, Malkajgiri, Uppal, LB Nagar, Kompally, Shamshabad) as well as Warangal and Karimnagar.',
  },
  {
    q: 'Can I customize the materials in the packages?',
    a: 'Absolutely. The packages define our transparent quality benchmarks. You can freely upgrade or substitute any item (e.g. Italian marble, specific sanitary fixtures, solar panels). All adjustments are priced transparently at actual market differentials.',
  },
  {
    q: 'What warranty do you provide after house handover?',
    a: 'Every home built by JK Associates comes with a comprehensive 10-Year Structural Warranty on foundation, columns, and RCC slabs, plus a 1-Year Free Maintenance guarantee covering plumbing, electrical, and finishing works.',
  },
]

export default function JKHome() {
  // Cost calculator states
  const [calcPackage, setCalcPackage] = useState(packages[1])
  const [calcArea, setCalcArea] = useState(2400)
  const [calcFloors, setCalcFloors] = useState('G+1')
  const [calcSubmitted, setCalcSubmitted] = useState(false)

  // Consultation modal & contact form
  const [isConsultOpen, setIsConsultOpen] = useState(false)
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', location: '', plotArea: '', package: 'Gold Package', message: '' })
  const [formSuccess, setFormSuccess] = useState(false)

  // Filter for projects gallery
  const [projectFilter, setProjectFilter] = useState('All')

  // FAQ accordion
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  const floorMultiplier = calcFloors === 'Ground Only' ? 1 : calcFloors === 'G+1' ? 1.02 : calcFloors === 'G+2' ? 1.05 : 1.08
  const estimatedCost = Math.round(calcArea * calcPackage.price * floorMultiplier)
  const estMonths = calcArea < 2000 ? '9 - 11' : calcArea < 3500 ? '11 - 14' : '14 - 18'

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault()
    setFormSuccess(true)
    setTimeout(() => {
      setFormSuccess(false)
      setIsConsultOpen(false)
      setFormData({ name: '', phone: '', email: '', location: '', plotArea: '', package: 'Gold Package', message: '' })
    }, 2500)
  }

  const filteredProjects = projectFilter === 'All'
    ? projectsList
    : projectsList.filter((p) => p.category === projectFilter)

  return (
    <div className="min-h-screen bg-charcoal-bg text-fg font-sans selection:bg-gold selection:text-ink">
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="border-b border-charcoal-border bg-[#0B0B0E] px-4 py-2 text-xs text-mute">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-4">
            <span className="flex items-center gap-1.5 text-gold-light">
              <Award className="h-3.5 w-3.5 text-gold" />
              <span>Hyderabad’s Trusted Construction Company Since 1994</span>
            </span>
            <span className="hidden sm:inline text-charcoal-border">|</span>
            <span className="hidden sm:flex items-center gap-1 text-fg/80">
              <MapPin className="h-3 w-3 text-gold" /> Malkajgiri, Hyderabad & Secunderabad
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a href="tel:+919700760120" className="flex items-center gap-1 text-fg hover:text-gold transition">
              <Phone className="h-3 w-3 text-gold" />
              <span className="font-semibold">+91 9700760120</span>
            </a>
            <span className="text-charcoal-border">|</span>
            <a href="mailto:info@jkassociatesonline.com" className="hidden md:flex items-center gap-1 hover:text-gold transition">
              <Mail className="h-3 w-3 text-gold" />
              <span>info@jkassociatesonline.com</span>
            </a>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVIGATION */}
      <header className="sticky top-0 z-40 border-b border-charcoal-border/80 bg-charcoal-bg/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <Link to="/" className="flex items-center gap-3">
            <img src="/jk-logo.png" alt="JK Associates Logo" className="h-10 sm:h-12 w-auto object-contain" />
            <div className="hidden sm:block">
              <span className="block text-base font-bold tracking-tight text-fg">JK ASSOCIATES</span>
              <span className="block text-[10px] uppercase tracking-widest text-gold">Top Builders Hyderabad</span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
            <a href="#services" className="text-fg/80 hover:text-gold transition">Services</a>
            <a href="#zero-advance" className="text-fg/80 hover:text-gold transition flex items-center gap-1">
              <Sparkles className="h-3.5 w-3.5 text-gold" /> Zero Advance
            </a>
            <a href="#packages" className="text-fg/80 hover:text-gold transition">Packages</a>
            <a href="#calculator" className="text-fg/80 hover:text-gold transition">Cost Calculator</a>
            <a href="#projects" className="text-fg/80 hover:text-gold transition">Projects</a>
            <a href="#process" className="text-fg/80 hover:text-gold transition">How It Works</a>
            <a href="#faq" className="text-fg/80 hover:text-gold transition">FAQs</a>
            <a href="#contact" className="text-fg/80 hover:text-gold transition">Contact</a>
          </nav>

          <div className="flex items-center gap-2.5">
            {/* Link to BuildTrack Portal */}
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 rounded-md border border-gold/40 bg-gold/10 px-3 py-1.5 text-xs font-semibold text-gold-light hover:bg-gold hover:text-ink transition"
            >
              <HardHat className="h-3.5 w-3.5" />
              <span>Client Portal</span>
            </Link>

            <button
              onClick={() => setIsConsultOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-md bg-gold px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-ink shadow-lg shadow-gold/20 hover:bg-gold-light transition"
            >
              <span>Free Consultation</span>
            </button>
          </div>
        </div>
      </header>

      {/* 3. HERO SECTION */}
      <section className="relative overflow-hidden border-b border-charcoal-border pt-12 pb-16 lg:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(229,169,60,0.15),rgba(255,255,255,0))]" />
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
            {/* Left Column: Heading & Value Props */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3.5 py-1 text-xs font-semibold text-gold-light">
                <ShieldCheck className="h-4 w-4 text-gold" />
                <span>Hyderabad’s Trusted Builder Since 1994</span>
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-white leading-tight">
                Build Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-light via-gold to-amber-400">Dream Home</span> with <span className="underline decoration-gold decoration-4 underline-offset-8">Zero Advance</span>
              </h1>

              <p className="text-base sm:text-lg text-mute max-w-2xl leading-relaxed">
                Premium-quality home construction in Hyderabad with honest market pricing, transparent costing, verified materials, and stage-wise payment only after work progress.
              </p>

              {/* 6 Trust Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
                {[
                  '₹0 Advance Payment',
                  'Complimentary Services',
                  'Honest Market Price',
                  'End-to-End Construction',
                  'Premium Material Quality',
                  '10+ Years Warranty',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 rounded-md border border-charcoal-border bg-charcoal-panel/60 p-2 text-xs font-medium text-fg">
                    <CheckCircle2 className="h-4 w-4 text-gold shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-4">
                <button
                  onClick={() => setIsConsultOpen(true)}
                  className="inline-flex items-center gap-2 rounded-md bg-gold px-5 py-3 text-sm font-semibold text-ink shadow-xl shadow-gold/25 hover:bg-gold-light transition"
                >
                  <span>Start with Zero Advance</span>
                  <ArrowRight className="h-4 w-4" />
                </button>

                <a
                  href="#calculator"
                  className="inline-flex items-center gap-2 rounded-md border border-charcoal-border bg-charcoal-panel px-5 py-3 text-sm font-semibold text-fg hover:border-gold/50 hover:bg-charcoal-panel2 transition"
                >
                  <Calculator className="h-4 w-4 text-gold" />
                  <span>Cost Calculator</span>
                </a>
              </div>
            </div>

            {/* Right Column: Hero Visual & Fast Quote Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl border border-charcoal-border bg-gradient-to-b from-charcoal-panel to-charcoal-bg p-5 sm:p-6 shadow-2xl">
                <div className="mb-4 flex items-center justify-between border-b border-charcoal-border pb-3">
                  <div>
                    <h3 className="text-base font-semibold text-white">Start Your Construction Journey</h3>
                    <p className="text-xs text-mute">Free Expert Site Visit & Specification Quote</p>
                  </div>
                  <span className="rounded bg-gold/20 px-2 py-0.5 text-[10px] font-bold text-gold uppercase">Free</span>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-3 text-xs">
                  <div>
                    <label className="block mb-1 text-mute">Full Name *</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Ramesh Kumar"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-md border border-charcoal-border bg-charcoal-panel2 px-3 py-2 text-fg placeholder:text-mute/60 focus:border-gold focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block mb-1 text-mute">Mobile Number *</label>
                      <input
                        required
                        type="tel"
                        placeholder="10-digit number"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full rounded-md border border-charcoal-border bg-charcoal-panel2 px-3 py-2 text-fg placeholder:text-mute/60 focus:border-gold focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block mb-1 text-mute">Plot Area (sq.ft / yards)</label>
                      <input
                        type="text"
                        placeholder="e.g. 200 sq.yds"
                        value={formData.plotArea}
                        onChange={(e) => setFormData({ ...formData, plotArea: e.target.value })}
                        className="w-full rounded-md border border-charcoal-border bg-charcoal-panel2 px-3 py-2 text-fg placeholder:text-mute/60 focus:border-gold focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block mb-1 text-mute">Construction Location in Hyderabad</label>
                    <input
                      type="text"
                      placeholder="e.g. Kukatpally / Miyapur / Gachibowli"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full rounded-md border border-charcoal-border bg-charcoal-panel2 px-3 py-2 text-fg placeholder:text-mute/60 focus:border-gold focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block mb-1 text-mute">Preferred Construction Package</label>
                    <select
                      value={formData.package}
                      onChange={(e) => setFormData({ ...formData, package: e.target.value })}
                      className="w-full rounded-md border border-charcoal-border bg-charcoal-panel2 px-3 py-2 text-fg focus:border-gold focus:outline-none"
                    >
                      <option value="Gold Package">Gold Package (₹2,050/sq.ft) - Most Popular</option>
                      <option value="Silver Package">Silver Package (₹1,850/sq.ft)</option>
                      <option value="Platinum Package">Platinum Package (₹2,250/sq.ft)</option>
                      <option value="Diamond Package">Diamond Package (₹2,550/sq.ft)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-2 rounded-md bg-gold py-2.5 text-center font-bold text-ink hover:bg-gold-light transition"
                  >
                    {formSuccess ? 'Request Submitted! We will call you.' : 'Get Free Consultation & Site Visit'}
                  </button>

                  <p className="text-center text-[10px] text-mute">
                    🔒 Your details are safe. No spam, no unsolicited calls.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. STATS BANNER */}
      <section className="border-b border-charcoal-border bg-[#0E0E12] py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <div className="border-l-2 border-gold pl-4">
              <p className="text-3xl sm:text-4xl font-extrabold text-white">30+</p>
              <p className="text-xs sm:text-sm font-medium text-mute mt-1">Years of Construction Experience</p>
            </div>
            <div className="border-l-2 border-gold pl-4">
              <p className="text-3xl sm:text-4xl font-extrabold text-white">200+</p>
              <p className="text-xs sm:text-sm font-medium text-mute mt-1">Skilled Labour & Engineer Team</p>
            </div>
            <div className="border-l-2 border-gold pl-4">
              <p className="text-3xl sm:text-4xl font-extrabold text-white">800+</p>
              <p className="text-xs sm:text-sm font-medium text-mute mt-1">Residential & Commercial Completed</p>
            </div>
            <div className="border-l-2 border-gold pl-4">
              <p className="text-3xl sm:text-4xl font-extrabold text-white">100%</p>
              <p className="text-xs sm:text-sm font-medium text-mute mt-1">Transparent Stage-wise Verified</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. THE ZERO ADVANCE SYSTEM SECTION */}
      <section id="zero-advance" className="border-b border-charcoal-border py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-gold">Our Unique Promise</span>
            <h2 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">The Zero Advance System</h2>
            <p className="mt-3 text-mute text-sm sm:text-base">
              Why risk your hard-earned money with traditional builders who demand huge advances? We construct first, verify with you on-site, and only then accept stage payment.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-charcoal-border bg-charcoal-panel p-6 hover:border-gold/50 transition">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gold/10 text-gold">
                <BadgePercent className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-white">Stage-wise Payment Only</h3>
              <p className="mt-2 text-xs text-mute leading-relaxed">
                Payment is released only when each construction stage is physically verified and approved by you on your site.
              </p>
            </div>

            <div className="rounded-xl border border-charcoal-border bg-charcoal-panel p-6 hover:border-gold/50 transition">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gold/10 text-gold">
                <FileText className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-white">Transparent Bill of Quantities</h3>
              <p className="mt-2 text-xs text-mute leading-relaxed">
                Every material quantity, brand, and gauge is defined in advance. Zero hidden charges, zero surprise escalation.
              </p>
            </div>

            <div className="rounded-xl border border-charcoal-border bg-charcoal-panel p-6 hover:border-gold/50 transition">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gold/10 text-gold">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-white">Verified Material Procurement</h3>
              <p className="mt-2 text-xs text-mute leading-relaxed">
                All steel, cement, and fittings are procured directly from verified brand manufacturers (TATA, UltraTech, Kajaria, etc.).
              </p>
            </div>

            <div className="rounded-xl border border-charcoal-border bg-charcoal-panel p-6 hover:border-gold/50 transition">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gold/10 text-gold">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-white">Daily WhatsApp & Live Updates</h3>
              <p className="mt-2 text-xs text-mute leading-relaxed">
                Receive daily WhatsApp site photo updates and access our live digital portal for labor, milestone progress, and stage logs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SERVICES SECTION */}
      <section id="services" className="border-b border-charcoal-border bg-[#0C0C10] py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-gold">What We Build</span>
              <h2 className="mt-1 text-3xl font-extrabold text-white sm:text-4xl">Our Construction Services</h2>
              <p className="mt-2 text-mute text-sm max-w-xl">
                End-to-end construction expertise across every home and commercial project type in Hyderabad.
              </p>
            </div>
            <button
              onClick={() => setIsConsultOpen(true)}
              className="inline-flex items-center gap-1.5 self-start text-xs font-semibold text-gold hover:text-gold-light"
            >
              <span>Discuss Your Project Requirements</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((srv, idx) => (
              <div key={idx} className="group overflow-hidden rounded-xl border border-charcoal-border bg-charcoal-panel transition hover:border-gold/50">
                <div className="relative h-48 w-full overflow-hidden bg-charcoal-panel2">
                  <img
                    src={srv.img}
                    alt={srv.title}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 rounded bg-charcoal-bg/85 backdrop-blur-sm px-2.5 py-0.5 text-[10px] font-bold text-gold uppercase">
                    {srv.tag}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="text-base font-bold text-white group-hover:text-gold transition">{srv.title}</h3>
                  <p className="mt-2 text-xs text-mute line-clamp-3">{srv.desc}</p>
                  <button
                    onClick={() => setIsConsultOpen(true)}
                    className="mt-4 flex items-center gap-1 text-xs font-semibold text-gold hover:text-gold-light"
                  >
                    <span>Get Detailed Quote</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. INTERACTIVE COST CALCULATOR */}
      <section id="calculator" className="border-b border-charcoal-border py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="rounded-2xl border border-charcoal-border bg-charcoal-panel p-6 sm:p-10 shadow-2xl">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-bold uppercase tracking-wider text-gold">Free Construction Estimator</span>
              <h2 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">Instant Construction Cost Calculator</h2>
              <p className="mt-2 text-xs sm:text-sm text-mute">
                Calculate the accurate estimated cost to build your house in Hyderabad based on package rates and built-up area.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
              {/* Controls */}
              <div className="lg:col-span-7 space-y-6">
                {/* 1. Select Package */}
                <div>
                  <label className="block text-xs font-semibold text-white mb-2">1. Choose Construction Package</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {packages.map((pkg) => (
                      <button
                        key={pkg.name}
                        type="button"
                        onClick={() => setCalcPackage(pkg)}
                        className={`rounded-lg border p-3 text-left transition ${
                          calcPackage.name === pkg.name
                            ? 'border-gold bg-gold/10 text-white'
                            : 'border-charcoal-border bg-charcoal-panel2 text-mute hover:border-gold/40'
                        }`}
                      >
                        <p className="text-xs font-bold text-fg">{pkg.name.replace(' Package', '')}</p>
                        <p className="text-sm font-extrabold text-gold mt-1">₹{pkg.price}</p>
                        <p className="text-[10px] text-mute">/ sq.ft</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Built up area slider */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-semibold text-white">2. Total Built-up Area (Sq.Ft)</label>
                    <span className="text-sm font-bold text-gold">{calcArea.toLocaleString()} sq.ft</span>
                  </div>
                  <input
                    type="range"
                    min={800}
                    max={10000}
                    step={100}
                    value={calcArea}
                    onChange={(e) => setCalcArea(Number(e.target.value))}
                    className="w-full accent-gold h-2 bg-charcoal-panel2 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-mute mt-1">
                    <span>800 sq.ft (Standard 2BHK)</span>
                    <span>2,400 sq.ft (G+1 Villa)</span>
                    <span>10,000 sq.ft (Apartment)</span>
                  </div>
                </div>

                {/* 3. Floors */}
                <div>
                  <label className="block text-xs font-semibold text-white mb-2">3. Number of Floors</label>
                  <div className="grid grid-cols-4 gap-2">
                    {['Ground Only', 'G+1', 'G+2', 'G+3'].map((flr) => (
                      <button
                        key={flr}
                        type="button"
                        onClick={() => setCalcFloors(flr)}
                        className={`rounded-md border py-2 text-xs font-semibold transition ${
                          calcFloors === flr
                            ? 'border-gold bg-gold text-ink'
                            : 'border-charcoal-border bg-charcoal-panel2 text-fg hover:border-gold/30'
                        }`}
                      >
                        {flr}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Estimate Summary Box */}
              <div className="lg:col-span-5">
                <div className="rounded-xl border border-gold/40 bg-gradient-to-b from-charcoal-panel2 to-charcoal-bg p-6 text-center shadow-xl">
                  <span className="inline-block rounded-full bg-gold/15 px-3 py-1 text-[11px] font-bold text-gold uppercase tracking-wider">
                    {calcPackage.name} Estimate
                  </span>

                  <p className="text-xs text-mute mt-3">Estimated Total Construction Budget</p>
                  <p className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
                    ₹{estimatedCost.toLocaleString('en-IN')}
                  </p>
                  <p className="text-xs text-gold-light mt-1">
                    Approx. ₹{(estimatedCost / 100000).toFixed(2)} Lakhs (Zero Advance Required)
                  </p>

                  <div className="mt-5 border-t border-charcoal-border pt-4 space-y-2 text-left text-xs">
                    <div className="flex justify-between text-mute">
                      <span>Rate per sq.ft:</span>
                      <span className="font-semibold text-fg">₹{calcPackage.price} / sq.ft</span>
                    </div>
                    <div className="flex justify-between text-mute">
                      <span>Total Built-up:</span>
                      <span className="font-semibold text-fg">{calcArea} sq.ft ({calcFloors})</span>
                    </div>
                    <div className="flex justify-between text-mute">
                      <span>Estimated Timeline:</span>
                      <span className="font-semibold text-fg">{estMonths} Months</span>
                    </div>
                    <div className="flex justify-between text-mute">
                      <span>Warranty:</span>
                      <span className="font-semibold text-emerald-400">10-Year Structural Guarantee</span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setFormData({ ...formData, package: calcPackage.name, plotArea: `${calcArea} sq.ft` })
                      setIsConsultOpen(true)
                    }}
                    className="w-full mt-6 rounded-md bg-gold py-3 text-sm font-bold text-ink hover:bg-gold-light transition shadow-lg shadow-gold/20"
                  >
                    Lock This Estimate with Free Site Visit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. PACKAGES SECTION */}
      <section id="packages" className="border-b border-charcoal-border bg-[#0C0C10] py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-gold">Construction Packages</span>
            <h2 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">Transparent Construction Packages</h2>
            <p className="mt-3 text-mute text-sm sm:text-base">
              All packages include zero advance, transparent bill of quantities, verified materials, and dedicated site supervision.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className={`relative flex flex-col rounded-2xl border p-6 transition ${
                  pkg.popular
                    ? 'border-gold bg-charcoal-panel shadow-2xl shadow-gold/10'
                    : 'border-charcoal-border bg-charcoal-panel hover:border-charcoal-border/80'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold px-3 py-0.5 text-[10px] font-extrabold text-ink uppercase tracking-wide">
                    Most Popular in Hyderabad
                  </div>
                )}

                <div className="mb-4">
                  <h3 className="text-lg font-bold text-white">{pkg.name}</h3>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-2xl sm:text-3xl font-extrabold text-gold">₹{pkg.price}</span>
                    <span className="text-xs text-mute">/ sq.ft</span>
                  </div>
                  <p className="mt-2 text-xs text-mute min-h-[36px]">{pkg.description}</p>
                </div>

                <div className="flex-1 space-y-2.5 border-t border-charcoal-border pt-4 text-xs">
                  {pkg.specs.map((spec, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Check className="h-3.5 w-3.5 text-gold shrink-0 mt-0.5" />
                      <span className="text-fg/90">{spec}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => {
                    setFormData({ ...formData, package: pkg.name })
                    setIsConsultOpen(true)
                  }}
                  className={`mt-6 w-full rounded-md py-2.5 text-xs font-bold transition ${
                    pkg.popular
                      ? 'bg-gold text-ink hover:bg-gold-light'
                      : 'border border-gold/40 text-gold hover:bg-gold hover:text-ink'
                  }`}
                >
                  Get Detailed BOQ Quote
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. THE 7-STEP PROCESS */}
      <section id="process" className="border-b border-charcoal-border py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-gold">The Process</span>
            <h2 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">How It Works</h2>
            <p className="mt-3 text-mute text-sm sm:text-base">
              Our house construction steps are simple, transparent, and easy to understand.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { num: '01', title: '20-Minute Quick Connect', desc: 'Contact us and our engineering team will reach out within 20 minutes to understand your plot and vision.' },
              { num: '02', title: 'Free Site Visit & Evaluation', desc: 'Our structural expert visits your plot, checks soil levels, road access, and prepares an exhaustive specification draft.' },
              { num: '03', title: 'Custom Package & BOQ', desc: 'Choose from our construction packages or customize materials. Every kilogram of steel and bag of cement is itemized.' },
              { num: '04', title: 'Transparent Agreement', desc: 'Sign an agreement with milestone-based stage payments. No advance is collected at signing.' },
              { num: '05', title: 'Architectural 2D & 3D Plans', desc: 'Our architects create vastu-compliant floor plans, structural drawings, and photorealistic 3D elevations for GHMC approval.' },
              { num: '06', title: 'Construction & WhatsApp Updates', desc: 'Work begins with daily quality checks. Receive daily WhatsApp photos and log tracking directly on your phone.' },
              { num: '07', title: 'Stage-Wise Verification', desc: 'Inspect the completed stage physically on site. Only when satisfied, you approve and release that stage payment.' },
              { num: '08', title: 'Handover & 10-Yr Warranty', desc: 'House key handover after deep cleaning, backed by an official 10-year comprehensive structural warranty.' },
            ].map((step, idx) => (
              <div key={idx} className="relative rounded-xl border border-charcoal-border bg-charcoal-panel p-5">
                <span className="text-2xl font-black text-gold/30">{step.num}</span>
                <h3 className="mt-2 text-sm font-bold text-white">{step.title}</h3>
                <p className="mt-2 text-xs text-mute leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. COMPLEMENTARY SERVICES */}
      <section className="border-b border-charcoal-border bg-[#0C0C10] py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-gold">Complementary Services</span>
            <h2 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">Everything Handled, Nothing Outsourced</h2>
            <p className="mt-3 text-mute text-sm sm:text-base">
              Beyond construction, JK Associates manages every municipal approval, survey, and design step your project needs — coordinated in-house, at no extra running around for you.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {complementaryServices.map((comp, idx) => (
              <div key={idx} className="flex gap-3.5 rounded-xl border border-charcoal-border bg-charcoal-panel p-4">
                <comp.icon className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white">{comp.title}</h4>
                  <p className="mt-1 text-[11px] text-mute leading-relaxed">{comp.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. PROJECTS SHOWCASE */}
      <section id="projects" className="border-b border-charcoal-border py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-gold">Our Projects</span>
            <h2 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">Homes We’ve Built Across Hyderabad</h2>
            <p className="mt-3 text-mute text-sm sm:text-base">
              From compact modern homes in Kukatpally to luxury duplex villas in Jubilee Hills — every project reflects our craft.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {['All', 'Residential', 'Luxury Villa', 'Apartment', 'Commercial'].map((f) => (
              <button
                key={f}
                onClick={() => setProjectFilter(f)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                  projectFilter === f
                    ? 'bg-gold text-ink'
                    : 'border border-charcoal-border bg-charcoal-panel text-mute hover:text-fg'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((p) => (
              <div key={p.id} className="group overflow-hidden rounded-xl border border-charcoal-border bg-charcoal-panel transition hover:border-gold/50">
                <div className="relative h-56 w-full overflow-hidden bg-charcoal-panel2">
                  <img
                    src={p.img}
                    alt={p.name}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-3 right-3 rounded bg-charcoal-bg/90 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                    {p.status}
                  </div>
                  <div className="absolute top-3 left-3 rounded bg-charcoal-bg/90 px-2.5 py-0.5 text-[10px] font-bold text-gold">
                    {p.category}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-base font-bold text-white">{p.name}</h3>
                  <p className="mt-1 flex items-center gap-1 text-xs text-mute">
                    <MapPin className="h-3 w-3 text-gold" />
                    <span>{p.loc}</span>
                  </p>
                  <div className="mt-4 flex items-center justify-between border-t border-charcoal-border pt-3 text-xs text-mute">
                    <span>Built-up: <strong className="text-fg">{p.area}</strong></span>
                    <span>Timeline: <strong className="text-fg">{p.duration}</strong></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. BRAND PARTNERS */}
      <section className="border-b border-charcoal-border bg-[#0B0B0E] py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="text-center text-xs font-bold uppercase tracking-wider text-mute mb-8">
            Built with 100% Verified Tier-1 Brand Partners
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
            {brandPartners.map((brand, idx) => (
              <span
                key={idx}
                className="rounded-md border border-charcoal-border/70 bg-charcoal-panel/50 px-3.5 py-2 text-xs font-bold text-fg/80 hover:border-gold/40 hover:text-gold transition"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 13. TESTIMONIALS */}
      <section className="border-b border-charcoal-border py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-gold">Client Stories</span>
            <h2 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">What Hyderabad Homeowners Say</h2>
            <p className="mt-3 text-mute text-sm sm:text-base">
              Real families. Real homes. Real experiences with JK Associates.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t, idx) => (
              <div key={idx} className="flex flex-col justify-between rounded-xl border border-charcoal-border bg-charcoal-panel p-6">
                <div>
                  <div className="flex items-center gap-1 text-gold mb-3">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                    ))}
                  </div>
                  <p className="text-xs text-mute/90 leading-relaxed italic">"{t.text}"</p>
                </div>
                <div className="mt-6 border-t border-charcoal-border pt-4">
                  <p className="text-sm font-bold text-white">{t.name}</p>
                  <p className="text-xs text-gold-light">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 14. FAQS ACCORDION */}
      <section id="faq" className="border-b border-charcoal-border bg-[#0C0C10] py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-gold">Questions Answered</span>
            <h2 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-3">
            {faqs.map((f, i) => (
              <div key={i} className="rounded-xl border border-charcoal-border bg-charcoal-panel overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between p-4 sm:p-5 text-left text-sm sm:text-base font-semibold text-white hover:text-gold transition"
                >
                  <span>{f.q}</span>
                  <ChevronDown className={`h-4 w-4 text-gold shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="border-t border-charcoal-border px-4 py-3 sm:px-5 sm:py-4 text-xs sm:text-sm text-mute leading-relaxed bg-charcoal-panel2/50">
                    {f.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 15. CONTACT US & OFFICE */}
      <section id="contact" className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-gold">Ready to Build? Let’s Talk.</span>
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl leading-tight">
                Your Dream Home Awaits in Hyderabad
              </h2>
              <p className="text-sm text-mute leading-relaxed">
                Get a free consultation with our expert team. We’ll visit your site, understand your vision, and give you a transparent quote — no obligations, no advance.
              </p>

              <div className="space-y-4 pt-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-white">Office Address:</strong>
                    <span className="text-mute">
                      18-282/1/1, Mallikarjuna Nagar, Malkajgiri, Hyderabad, Secunderabad, Telangana 500047 India
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-gold shrink-0" />
                  <div>
                    <strong className="block text-white">Direct Phone:</strong>
                    <a href="tel:+919700760120" className="text-gold hover:underline font-semibold">
                      +91 9700760120
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-gold shrink-0" />
                  <div>
                    <strong className="block text-white">Email Us:</strong>
                    <a href="mailto:info@jkassociatesonline.com" className="text-mute hover:text-fg">
                      info@jkassociatesonline.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Service Areas */}
              <div className="rounded-xl border border-charcoal-border bg-charcoal-panel p-4 text-xs">
                <p className="font-semibold text-white mb-2">Service Areas Covered:</p>
                <div className="flex flex-wrap gap-1.5 text-mute">
                  {['Hyderabad', 'Secunderabad', 'Warangal', 'Karimnagar', 'Kukatpally', 'Gachibowli', 'Kondapur', 'Miyapur', 'Banjara Hills', 'Jubilee Hills', 'Malkajgiri'].map((a) => (
                    <span key={a} className="rounded bg-charcoal-panel2 px-2 py-0.5 text-[11px] text-fg/80">
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Direct Form */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-charcoal-border bg-charcoal-panel p-6 sm:p-8">
                <h3 className="text-lg font-bold text-white mb-2">Schedule a Free Site Inspection</h3>
                <p className="text-xs text-mute mb-6">Fill the form and an engineer will connect with you in 20 minutes.</p>

                <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-1 font-medium text-white">Full Name *</label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. Anand Rao"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full rounded-md border border-charcoal-border bg-charcoal-panel2 px-3.5 py-2.5 text-fg placeholder:text-mute/60 focus:border-gold focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block mb-1 font-medium text-white">Phone Number *</label>
                      <input
                        required
                        type="tel"
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full rounded-md border border-charcoal-border bg-charcoal-panel2 px-3.5 py-2.5 text-fg placeholder:text-mute/60 focus:border-gold focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-1 font-medium text-white">Email Address</label>
                      <input
                        type="email"
                        placeholder="name@gmail.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full rounded-md border border-charcoal-border bg-charcoal-panel2 px-3.5 py-2.5 text-fg placeholder:text-mute/60 focus:border-gold focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block mb-1 font-medium text-white">Plot Location in Hyderabad *</label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. Miyapur / Kukatpally"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full rounded-md border border-charcoal-border bg-charcoal-panel2 px-3.5 py-2.5 text-fg placeholder:text-mute/60 focus:border-gold focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block mb-1 font-medium text-white">Tell us about your plot or requirements</label>
                    <textarea
                      rows={3}
                      placeholder="e.g. 250 sq.yards plot, planning G+2 duplex home for family..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full rounded-md border border-charcoal-border bg-charcoal-panel2 px-3.5 py-2.5 text-fg placeholder:text-mute/60 focus:border-gold focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-md bg-gold py-3 text-sm font-bold text-ink hover:bg-gold-light transition shadow-lg shadow-gold/20 flex items-center justify-center gap-2"
                  >
                    <Send className="h-4 w-4" />
                    <span>{formSuccess ? 'Request Sent Successfully!' : 'Submit Free Consultation Request'}</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 16. FOOTER */}
      <footer className="border-t border-charcoal-border bg-[#09090C] pt-12 pb-8 text-xs text-mute">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5 pb-12">
            <div className="lg:col-span-2 space-y-3">
              <div className="flex items-center gap-3">
                <img src="/jk-logo.png" alt="JK Associates" className="h-10 w-auto" />
                <span className="text-base font-bold text-white">JK ASSOCIATES</span>
              </div>
              <p className="text-xs text-mute max-w-sm">
                Building premium homes in Hyderabad since 1994 with transparent pricing, verified materials, and zero advance. Trusted by 800+ families.
              </p>
              <div className="pt-2 text-xs">
                <strong className="text-white block">Client Portal & Project Tracking:</strong>
                <Link to="/login" className="text-gold hover:underline flex items-center gap-1 mt-1 font-medium">
                  <HardHat className="h-3.5 w-3.5" />
                  <span>Access BuildTrack Site Management Portal →</span>
                </Link>
              </div>
            </div>

            <div>
              <p className="font-bold text-white uppercase tracking-wider mb-3">Our Services</p>
              <ul className="space-y-2">
                <li><a href="#services" className="hover:text-gold">Residential Construction</a></li>
                <li><a href="#services" className="hover:text-gold">Luxury Villas & Duplex</a></li>
                <li><a href="#services" className="hover:text-gold">Apartment Construction</a></li>
                <li><a href="#services" className="hover:text-gold">Commercial Buildings</a></li>
                <li><a href="#services" className="hover:text-gold">Interior Design & Fitouts</a></li>
                <li><a href="#services" className="hover:text-gold">Renovation Works</a></li>
              </ul>
            </div>

            <div>
              <p className="font-bold text-white uppercase tracking-wider mb-3">Quick Links</p>
              <ul className="space-y-2">
                <li><a href="#zero-advance" className="hover:text-gold">The Zero Advance Promise</a></li>
                <li><a href="#packages" className="hover:text-gold">Construction Packages</a></li>
                <li><a href="#calculator" className="hover:text-gold">Cost Calculator</a></li>
                <li><a href="#projects" className="hover:text-gold">Completed Projects</a></li>
                <li><a href="#process" className="hover:text-gold">How It Works</a></li>
                <li><a href="#faq" className="hover:text-gold">FAQs</a></li>
              </ul>
            </div>

            <div>
              <p className="font-bold text-white uppercase tracking-wider mb-3">Contact Us</p>
              <p className="text-xs text-mute leading-relaxed mb-2">
                18-282/1/1, Mallikarjuna Nagar, Malkajgiri, Hyderabad, Telangana 500047
              </p>
              <a href="tel:+919700760120" className="block text-gold font-bold mb-1">
                +91 9700760120
              </a>
              <a href="mailto:info@jkassociatesonline.com" className="block hover:text-white">
                info@jkassociatesonline.com
              </a>
            </div>
          </div>

          <div className="border-t border-charcoal-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
            <p>© {new Date().getFullYear()} JK Associates. All rights reserved. Top Construction Company in Hyderabad.</p>
            <p className="text-mute/70">Academic project & demo replica of jkassociatesonline.com</p>
          </div>
        </div>
      </footer>

      {/* 17. FLOATING QUICK ACTIONS */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2.5">
        {/* WhatsApp Quick Connect */}
        <a
          href="https://wa.me/919700760120?text=Hello%20JK%20Associates,%20I%20am%20interested%20in%20home%20construction%20with%20Zero%20Advance."
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-2.5 text-xs font-bold text-white shadow-xl hover:bg-emerald-600 transition"
        >
          <MessageSquare className="h-4 w-4" />
          <span className="hidden sm:inline">WhatsApp Us</span>
        </a>

        {/* Call Now Button */}
        <a
          href="tel:+919700760120"
          className="flex items-center gap-2 rounded-full bg-gold px-4 py-2.5 text-xs font-bold text-ink shadow-xl hover:bg-gold-light transition"
        >
          <Phone className="h-4 w-4" />
          <span className="hidden sm:inline">Call +91 9700760120</span>
        </a>
      </div>

      {/* 18. MODAL: CONSULTATION FORM */}
      {isConsultOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-lg rounded-2xl border border-charcoal-border bg-charcoal-panel p-6 shadow-2xl">
            <button
              onClick={() => setIsConsultOpen(false)}
              className="absolute top-4 right-4 rounded-md p-1 text-mute hover:text-fg"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="mb-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gold">Zero Advance Guarantee</span>
              <h3 className="text-xl font-bold text-white mt-1">Book Free Site Consultation</h3>
              <p className="text-xs text-mute mt-1">
                Our site engineer will visit your plot in Hyderabad, inspect soil and road levels, and draft your customized BOQ quote.
              </p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block mb-1 font-medium text-white">Full Name *</label>
                <input
                  required
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-md border border-charcoal-border bg-charcoal-panel2 px-3 py-2 text-fg focus:border-gold focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block mb-1 font-medium text-white">Phone *</label>
                  <input
                    required
                    type="tel"
                    placeholder="Mobile Number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full rounded-md border border-charcoal-border bg-charcoal-panel2 px-3 py-2 text-fg focus:border-gold focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium text-white">Plot Location in Hyd *</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Miyapur"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full rounded-md border border-charcoal-border bg-charcoal-panel2 px-3 py-2 text-fg focus:border-gold focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-1 font-medium text-white">Package Choice</label>
                <select
                  value={formData.package}
                  onChange={(e) => setFormData({ ...formData, package: e.target.value })}
                  className="w-full rounded-md border border-charcoal-border bg-charcoal-panel2 px-3 py-2 text-fg focus:border-gold focus:outline-none"
                >
                  <option value="Gold Package">Gold Package (₹2,050 / sq.ft) - Most Popular</option>
                  <option value="Silver Package">Silver Package (₹1,850 / sq.ft)</option>
                  <option value="Platinum Package">Platinum Package (₹2,250 / sq.ft)</option>
                  <option value="Diamond Package">Diamond Package (₹2,550 / sq.ft)</option>
                </select>
              </div>

              <div>
                <label className="block mb-1 font-medium text-white">Additional Notes</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Plot size 200 sq.yds, east facing, want G+2 construction"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full rounded-md border border-charcoal-border bg-charcoal-panel2 px-3 py-2 text-fg focus:border-gold focus:outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsConsultOpen(false)}
                  className="rounded-md border border-charcoal-border px-4 py-2 text-mute hover:text-fg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-gold px-5 py-2 font-bold text-ink hover:bg-gold-light"
                >
                  {formSuccess ? 'Request Sent!' : 'Confirm Free Site Visit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

