import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Shield,
  Clock,
  Compass,
  Award,
  Maximize2,
  X,
  Layers,
  Building2,
  HardHat,
  ChevronRight,
  Send,
  Sparkles
} from 'lucide-react'
import KronosNavbar from '../components/KronosNavbar'
import KronosFooter from '../components/KronosFooter'

// Curated architectural project portfolio
interface ProjectItem {
  id: string
  title: string
  category: 'Residential' | 'Commercial' | 'Industrial' | 'Restoration'
  location: string
  year: string
  area: string
  leadArchitect: string
  image: string
  description: string
  materials: string[]
}

const projects: ProjectItem[] = [
  {
    id: 'cantilever-house',
    title: 'The Cantilever Residence',
    category: 'Residential',
    location: 'Jubilee Hills, Hyderabad',
    year: '2024',
    area: '14,200 sq.ft',
    leadArchitect: 'Studio Archon & Partners',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=85',
    description:
      'A private hilltop villa structured with post-tensioned architectural concrete and monolithic floor-to-ceiling structural glazing. Features a 12-meter cantilevered master terrace overlooking the valley.',
    materials: ['Board-formed Architectural Concrete', 'Acoustic Structural Glass', 'Burmese Teak Panelling', 'Raw Basalt Stone'],
  },
  {
    id: 'aurora-pavilion',
    title: 'Aurora Technology Pavilion',
    category: 'Commercial',
    location: 'Financial District, Hyderabad',
    year: '2023',
    area: '86,000 sq.ft',
    leadArchitect: 'Foster + Partner Affiliates',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85',
    description:
      'High-performance commercial headquarters integrating energy-efficient curtain-wall facades, column-free internal spans, and integrated rooftop solar photovoltaics.',
    materials: ['Exposed Structural Steel Framing', 'Double-glazed Low-E Glass', 'Anodized Champagne Aluminum', 'Terrazzo Flooring'],
  },
  {
    id: 'monolith-villa',
    title: 'Monolith House',
    category: 'Residential',
    location: 'Banjara Hills, Hyderabad',
    year: '2023',
    area: '9,800 sq.ft',
    leadArchitect: 'Atelier K',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85',
    description:
      'Sculpted from raw concrete and natural travertine. Designed around an internal courtyard that facilitates passive thermal chimney cooling and privacy in an urban enclave.',
    materials: ['Titanium Zinc Cladding', 'Italian Roman Travertine', 'Cast-in-place Concrete', 'Handcrafted Walnut Joinery'],
  },
  {
    id: 'heritage-restoration',
    title: 'The Foundry Adaptive Reuse',
    category: 'Restoration',
    location: 'Old Quarter, Secunderabad',
    year: '2022',
    area: '28,500 sq.ft',
    leadArchitect: 'Heritage & Conservation Studio',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=85',
    description:
      'Meticulous structural rehabilitation of a 1920s brick and steel warehouse into a collaborative design campus, blending historic masonry with crisp modern architectural steel.',
    materials: ['Restored Load-bearing Brickwork', 'Reclaimed Hardwood Trusses', 'Mild Steel Profiles', 'Polished Cementitious Screed'],
  },
]

export default function KronosHome() {
  const [activeProjectModal, setActiveProjectModal] = useState<ProjectItem | null>(null)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'Bespoke Residential',
    budget: '₹5 Cr – ₹15 Cr',
    timeline: 'Within 6 Months',
    message: '',
  })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setFormSubmitted(true)
    setTimeout(() => {
      setFormSubmitted(false)
      setFormData({
        name: '',
        email: '',
        phone: '',
        projectType: 'Bespoke Residential',
        budget: '₹5 Cr – ₹15 Cr',
        timeline: 'Within 6 Months',
        message: '',
      })
    }, 4000)
  }

  return (
    <div className="bg-[#171A1C] text-white font-sans selection:bg-bronze selection:text-white">
      <KronosNavbar />

      {/* ========================================================
          SECTION 1 & 2: HERO SECTION (MIDNIGHT CHARCOAL)
      ======================================================== */}
      <section className="relative min-h-screen flex items-end pb-20 pt-36 bg-[#171A1C] overflow-hidden">
        {/* Subtle background image overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=85"
            alt="Architectural Construction by Kronos"
            className="h-full w-full object-cover opacity-35 filter brightness-[0.7] contrast-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#171A1C] via-[#171A1C]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#171A1C] via-[#171A1C]/40 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-12 w-full">
          <div className="max-w-3xl space-y-6">
            <span className="inline-block text-xs uppercase tracking-architectural text-concrete font-medium border-l border-bronze pl-3">
              Architectural Construction & Structural Engineering
            </span>

            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-white leading-[1.08]">
              Built with vision.{' '}
              <span className="font-semibold block text-white/95">Crafted to last.</span>
            </h1>

            <p className="text-base sm:text-lg text-concrete max-w-xl font-light leading-relaxed pt-2">
              We translate ambitious architectural concepts into enduring physical reality. Combining the design sensitivity of a luxury studio with the technical rigor of an established engineering firm.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-sm bg-white px-7 py-3.5 text-xs font-semibold uppercase tracking-architectural text-[#171A1C] transition-all hover:bg-ivory hover:shadow-lg"
              >
                <span>Explore Our Projects</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </a>

              <a
                href="#process"
                className="inline-flex items-center gap-2 rounded-sm border border-concrete/30 bg-transparent px-6 py-3.5 text-xs font-medium uppercase tracking-architectural text-white transition-all hover:border-white hover:bg-white/5"
              >
                <span>Discover Our Approach</span>
              </a>
            </div>
          </div>

          {/* Minimal Bottom Bar */}
          <div className="mt-16 pt-8 border-t border-charcoal-border flex flex-wrap items-center justify-between gap-6 text-xs text-concrete font-light">
            <div className="flex items-center gap-6">
              <span>Residential Estates</span>
              <span>·</span>
              <span>Commercial Landmarks</span>
              <span>·</span>
              <span>Specialized Infrastructure</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-bronze" />
              <span className="tracking-wide text-white/80">Delivering in Hyderabad & Regional Hubs</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 3: ABOUT & PHILOSOPHY (WARM IVORY)
      ======================================================== */}
      <section id="about" className="py-24 sm:py-32 bg-[#F4F3EF] text-[#171A1C]">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid gap-16 lg:grid-cols-12 lg:items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-6 space-y-8">
              <div className="space-y-3">
                <span className="text-xs uppercase tracking-architectural text-concrete-dark font-semibold">
                  01 / Company Philosophy
                </span>
                <h2 className="font-display text-3xl sm:text-5xl font-light text-[#171A1C] tracking-tight leading-tight">
                  Where architectural ambition meets engineering truth.
                </h2>
              </div>

              <div className="space-y-4 text-sm sm:text-base text-[#171A1C]/80 font-normal leading-relaxed">
                <p>
                  Founded on the conviction that extraordinary architecture requires extraordinary execution, KRONOS operates as an integrated partner to visionary architects and demanding clients.
                </p>
                <p>
                  We do not compromise on material honesty. Whether pouring self-compacting board-formed concrete, installing precision structural glass curtain walls, or restoring century-old brickwork, our methodology is guided by millimeter tolerances and structural longevity.
                </p>
              </div>

              <div className="pt-2 border-t border-[#171A1C]/10 grid grid-cols-2 gap-8 text-xs">
                <div>
                  <p className="text-[11px] uppercase tracking-architectural text-concrete-dark font-semibold">Methodology</p>
                  <p className="font-medium text-[#171A1C] mt-1">BIM-Integrated Construction & Value Engineering</p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-architectural text-concrete-dark font-semibold">Heritage</p>
                  <p className="font-medium text-[#171A1C] mt-1">28+ Years of Civil & Structural Legacy</p>
                </div>
              </div>
            </div>

            {/* Right Editorial Photography */}
            <div className="lg:col-span-6">
              <div className="relative arch-image-zoom rounded-sm shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=85"
                  alt="Architectural detailing by Kronos"
                  className="w-full h-[480px] object-cover"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-4 text-xs text-[#171A1C]">
                  <p className="font-semibold tracking-wide">Board-Formed Architectural Concrete & Natural Light Study</p>
                  <p className="text-concrete-dark text-[11px] mt-0.5">Private Residence — Jubilee Hills</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 4: SERVICES (MIDNIGHT CHARCOAL)
      ======================================================== */}
      <section id="services" className="py-24 sm:py-32 bg-[#171A1C] border-t border-charcoal-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 pb-8 border-b border-charcoal-border">
            <div>
              <span className="text-xs uppercase tracking-architectural text-concrete font-medium block">
                02 / Core Capabilities
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-light text-white tracking-tight mt-2">
                Disciplines of Construction
              </h2>
            </div>
            <p className="text-sm text-concrete max-w-md font-light leading-relaxed">
              From bespoke private residences to complex institutional frameworks, our teams deliver across five specialized sectors.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                num: '01',
                title: 'Residential Construction',
                desc: 'Bespoke modern villas, luxury estates, and high-specification residences engineered with bespoke joinery, structural glazing, and natural stone.',
                deliverables: 'Private Estates · Modernist Villas · Penthouse Fit-Outs',
              },
              {
                num: '02',
                title: 'Commercial Construction',
                desc: 'Headquarters, high-efficiency corporate complexes, and cultural pavilions designed for spatial efficiency, LEED certification, and corporate gravitas.',
                deliverables: 'Corporate Headquarters · Flagship Retail · Cultural Pavilions',
              },
              {
                num: '03',
                title: 'Industrial Construction',
                desc: 'High-tolerance manufacturing facilities, advanced warehousing, and cleanroom infrastructure requiring precision engineering and heavy-duty performance.',
                deliverables: 'Precision Facilities · Advanced Logistics · Clean Industrial',
              },
              {
                num: '04',
                title: 'Renovation & Restoration',
                desc: 'Sensitive architectural rehabilitation of heritage structures and modern adaptive reuse, stabilizing historical fabric with cutting-edge structural engineering.',
                deliverables: 'Adaptive Reuse · Heritage Conservation · Facade Overhaul',
              },
              {
                num: '05',
                title: 'Infrastructure Development',
                desc: 'Master-planned civil projects, bridges, utility networks, and access corridors executed with rigorous environmental standards and civic responsibility.',
                deliverables: 'Civil Arteries · Master-Planned Utilities · Structural Bridges',
              },
              {
                num: '06',
                title: 'Pre-Construction & Engineering',
                desc: 'Early-stage constructability analysis, digital 3D BIM coordination, cost optimization, and material stress testing before on-site ground-breaking.',
                deliverables: 'BIM 4D/5D Modeling · Geotechnical Audits · Value Engineering',
              },
            ].map((srv) => (
              <div
                key={srv.num}
                className="group relative rounded-sm border border-charcoal-border bg-[#1F2326]/60 p-8 transition-all duration-300 hover:border-bronze/50 hover:bg-[#1F2326]"
              >
                <div className="flex items-center justify-between text-xs text-concrete mb-6">
                  <span className="font-mono text-bronze font-medium">{srv.num}</span>
                  <span className="text-[10px] tracking-architectural uppercase text-concrete/70">Expertise</span>
                </div>

                <h3 className="font-display text-xl font-medium text-white group-hover:text-white transition">
                  {srv.title}
                </h3>

                <p className="mt-3 text-xs sm:text-sm text-concrete leading-relaxed font-light">
                  {srv.desc}
                </p>

                <div className="mt-6 pt-4 border-t border-charcoal-border">
                  <p className="text-[11px] uppercase tracking-architectural text-concrete/80 font-medium">
                    {srv.deliverables}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 5: FEATURED PROJECTS (WARM IVORY)
      ======================================================== */}
      <section id="projects" className="py-24 sm:py-32 bg-[#F4F3EF] text-[#171A1C]">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 pb-8 border-b border-[#171A1C]/10">
            <div>
              <span className="text-xs uppercase tracking-architectural text-concrete-dark font-semibold block">
                03 / Portfolio of Works
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-light text-[#171A1C] tracking-tight mt-2">
                Featured Projects
              </h2>
            </div>
            <p className="text-sm text-[#171A1C]/70 max-w-md font-light leading-relaxed">
              Every commission is an exploration of form, light, and permanence. Click any project to inspect structural specifications.
            </p>
          </div>

          {/* Large Editorial Grid */}
          <div className="grid gap-12 sm:grid-cols-2">
            {projects.map((proj) => (
              <div
                key={proj.id}
                onClick={() => setActiveProjectModal(proj)}
                className="group cursor-pointer space-y-4"
              >
                {/* Image Container with Editorial Zoom */}
                <div className="relative arch-image-zoom rounded-sm overflow-hidden bg-[#EAE8E1] aspect-[16/10] shadow-md">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-[#171A1C]/80 backdrop-blur-sm px-3 py-1 text-[11px] font-medium tracking-architectural uppercase text-white rounded-sm">
                    {proj.category}
                  </div>
                </div>

                {/* Metadata */}
                <div className="flex items-baseline justify-between pt-1">
                  <div>
                    <h3 className="font-display text-xl sm:text-2xl font-medium text-[#171A1C] group-hover:text-bronze transition">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-concrete-dark mt-1 font-light tracking-wide">
                      {proj.location} · Completed {proj.year}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono text-[#171A1C] font-semibold">{proj.area}</span>
                    <span className="block text-[10px] text-concrete-dark uppercase tracking-architectural">Built Area</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 rounded-sm border border-[#171A1C] px-8 py-3.5 text-xs font-semibold uppercase tracking-architectural text-[#171A1C] transition hover:bg-[#171A1C] hover:text-white"
            >
              <span>View Full Architectural Archive</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 6: OUR PROCESS (MIDNIGHT CHARCOAL)
      ======================================================== */}
      <section id="process" className="py-24 sm:py-32 bg-[#171A1C] border-t border-charcoal-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="max-w-2xl mb-16">
            <span className="text-xs uppercase tracking-architectural text-concrete font-medium block">
              04 / Execution Framework
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-light text-white tracking-tight mt-2">
              Our 5-Stage Process
            </h2>
            <p className="text-sm text-concrete font-light leading-relaxed mt-4">
              A disciplined, transparent progression from feasibility to structural commissioning, ensuring zero cost surprises and complete aesthetic fidelity.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-5">
            {[
              {
                step: '01',
                title: 'Consultation',
                subtitle: 'Intelligence & Scope',
                desc: 'In-depth review of architectural drawings, zoning bylaws, geotechnical soil conditions, and client spatial ambitions.',
              },
              {
                step: '02',
                title: 'Planning',
                subtitle: 'Critical Path & BOQ',
                desc: 'Exhaustive Bill of Quantities, master construction schedule, procurement pipeline, and risk mitigation models.',
              },
              {
                step: '03',
                title: 'Engineering',
                subtitle: 'Digital Pre-Build',
                desc: 'Structural calculations, 3D BIM clash detection, seismic audits, and mock-up material testing.',
              },
              {
                step: '04',
                title: 'Execution',
                subtitle: 'Millimeter Precision',
                desc: 'On-site structural casting, steel reinforcement audits, daily QA testing, and continuous photographic client logging.',
              },
              {
                step: '05',
                title: 'Handover',
                subtitle: 'Commissioning & Warranty',
                desc: 'Comprehensive MEP testing, aesthetic snag rectification, occupancy clearances, and multi-year structural warranty.',
              },
            ].map((p, idx) => (
              <div
                key={p.step}
                className="relative rounded-sm border border-charcoal-border bg-[#1F2326]/40 p-6 flex flex-col justify-between"
              >
                <div>
                  <span className="font-mono text-2xl font-light text-bronze block">{p.step}</span>
                  <h3 className="font-display text-base font-medium text-white mt-3">{p.title}</h3>
                  <p className="text-[11px] uppercase tracking-architectural text-concrete/70 font-medium mt-0.5">{p.subtitle}</p>
                  <p className="text-xs text-concrete font-light mt-3 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 7: COMPANY STATISTICS (WARM IVORY)
      ======================================================== */}
      <section className="py-24 bg-[#F4F3EF] text-[#171A1C] border-t border-[#171A1C]/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 text-left">
            <div className="border-l border-[#171A1C]/20 pl-6">
              <p className="font-display text-4xl sm:text-6xl font-light text-[#171A1C] tracking-tight">28+</p>
              <p className="text-xs uppercase tracking-architectural text-concrete-dark font-semibold mt-2">Years of Excellence</p>
              <p className="text-xs text-[#171A1C]/70 mt-1 font-light">Continuously operating across Telangana and regional hubs</p>
            </div>

            <div className="border-l border-[#171A1C]/20 pl-6">
              <p className="font-display text-4xl sm:text-6xl font-light text-[#171A1C] tracking-tight">140+</p>
              <p className="text-xs uppercase tracking-architectural text-concrete-dark font-semibold mt-2">Projects Completed</p>
              <p className="text-xs text-[#171A1C]/70 mt-1 font-light">Custom residences, headquarters, and civic works</p>
            </div>

            <div className="border-l border-[#171A1C]/20 pl-6">
              <p className="font-display text-4xl sm:text-6xl font-light text-[#171A1C] tracking-tight">4.2M</p>
              <p className="text-xs uppercase tracking-architectural text-concrete-dark font-semibold mt-2">Square Feet Delivered</p>
              <p className="text-xs text-[#171A1C]/70 mt-1 font-light">Executed with certified structural integrity</p>
            </div>

            <div className="border-l border-[#171A1C]/20 pl-6">
              <p className="font-display text-4xl sm:text-6xl font-light text-[#171A1C] tracking-tight">100%</p>
              <p className="text-xs uppercase tracking-architectural text-concrete-dark font-semibold mt-2">Milestone Compliance</p>
              <p className="text-xs text-[#171A1C]/70 mt-1 font-light">Zero cost escalation guarantee on approved BOQs</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 8: WHY CHOOSE US (MIDNIGHT CHARCOAL)
      ======================================================== */}
      <section className="py-24 sm:py-32 bg-[#171A1C] border-t border-charcoal-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="max-w-2xl mb-16">
            <span className="text-xs uppercase tracking-architectural text-concrete font-medium block">
              05 / Structural Credibility
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-light text-white tracking-tight mt-2">
              Why Discerning Clients Choose KRONOS
            </h2>
            <p className="text-sm text-concrete font-light leading-relaxed mt-4">
              Constructing a signature property requires more than labor; it demands engineering oversight, certified material traceability, and ethical stewardship.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Rigorous Quality Assurance',
                desc: 'Third-party certified laboratory testing for steel tensile strength, concrete cube compaction, and slump tolerance on every single pour.',
              },
              {
                title: 'Zero-Compromise Safety Standards',
                desc: 'Strict ISO 45001 safety protocols on every job site, managed by full-time certified environmental health and safety directors.',
              },
              {
                title: 'Single-Point Transparent Communication',
                desc: 'Dedicated Senior Project Director assigned to your commission, with weekly photogrammetric drone scans and financial audits.',
              },
              {
                title: 'Contractual Timely Delivery',
                desc: 'Critical Path Method scheduling integrated with automated procurement to anticipate supply chain bottlenecks months in advance.',
              },
              {
                title: 'Master Craftsmen & Licensed Engineers',
                desc: 'Decades-tenured site supervisors, licensed structural engineers, and master artisans in stone, joinery, and structural steel.',
              },
              {
                title: 'Decade-Long Structural Warranty',
                desc: 'Comprehensive 10-year structural guarantee covering foundation, RCC load-bearing columns, and post-tensioned floor slabs.',
              },
            ].map((col, idx) => (
              <div
                key={idx}
                className="rounded-sm border border-charcoal-border bg-[#1F2326]/50 p-6 space-y-3"
              >
                <div className="flex items-center gap-2 text-bronze">
                  <Check className="h-4 w-4" />
                  <span className="text-xs uppercase tracking-architectural font-semibold text-white/90">{col.title}</span>
                </div>
                <p className="text-xs text-concrete font-light leading-relaxed">{col.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 9: TESTIMONIALS (WARM IVORY)
      ======================================================== */}
      <section className="py-24 sm:py-32 bg-[#F4F3EF] text-[#171A1C] border-t border-[#171A1C]/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="max-w-2xl mb-16">
            <span className="text-xs uppercase tracking-architectural text-concrete-dark font-semibold block">
              06 / Client & Architect Endorsements
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-light text-[#171A1C] tracking-tight mt-2">
              Words on Our Craftsmanship
            </h2>
          </div>

          <div className="grid gap-10 md:grid-cols-3">
            {[
              {
                quote:
                  'KRONOS is one of the few construction firms capable of executing 12-meter board-formed concrete cantilevers with true millimeter accuracy. Their engineering team speaks the language of architecture.',
                author: 'K. R. Varma, Principal Architect',
                firm: 'Studio Archon Associates',
              },
              {
                quote:
                  'From day one to handover, their financial transparency and stage-wise progress reporting were impeccable. There were zero surprise escalations on a 15,000 sq.ft private estate build.',
                author: 'S. N. Reddy, Managing Director',
                firm: 'Private Villa Owner, Jubilee Hills',
              },
              {
                quote:
                  'Their scheduling discipline is extraordinary. On our 86,000 sq.ft commercial tech campus, they delivered 2 weeks ahead of our aggressive occupancy deadline without sacrificing structural perfection.',
                author: 'A. Mehra, Head of Infrastructure',
                firm: 'Apex Enterprise Real Estate',
              },
            ].map((t, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-sm border border-[#171A1C]/10 flex flex-col justify-between shadow-sm"
              >
                <p className="text-sm text-[#171A1C]/85 font-light leading-relaxed italic">
                  "{t.quote}"
                </p>
                <div className="pt-6 border-t border-[#171A1C]/10 mt-6">
                  <p className="text-xs font-semibold text-[#171A1C]">{t.author}</p>
                  <p className="text-[11px] text-concrete-dark font-light mt-0.5">{t.firm}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 10: CONTACT / PROJECT INQUIRY (MIDNIGHT CHARCOAL)
      ======================================================== */}
      <section id="contact" className="py-24 sm:py-32 bg-[#171A1C] border-t border-charcoal-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid gap-16 lg:grid-cols-12">
            {/* Left Narrative */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs uppercase tracking-architectural text-concrete font-medium block">
                07 / Project Inquiries
              </span>
              <h2 className="font-display text-3xl sm:text-5xl font-light text-white tracking-tight leading-tight">
                Let us bring your vision into reality.
              </h2>
              <p className="text-sm text-concrete font-light leading-relaxed">
                Whether you have completed architectural blueprints ready for tender or are evaluating pre-construction feasibility for a new residential estate or commercial landmark, our partners are ready to consult.
              </p>

              <div className="space-y-4 pt-6 border-t border-charcoal-border text-xs text-concrete font-light">
                <div>
                  <p className="text-white uppercase tracking-architectural text-[11px] font-semibold">Central Engineering Hub</p>
                  <p className="mt-1">Tower 4, Level 12, Financial District, Gachibowli, Hyderabad 500032</p>
                </div>

                <div>
                  <p className="text-white uppercase tracking-architectural text-[11px] font-semibold">Direct Communication</p>
                  <a href="tel:+919700760120" className="text-white hover:text-bronze transition block mt-1">
                    +91 (0) 97007 60120
                  </a>
                  <a href="mailto:inquiries@kronosbuild.com" className="text-bronze hover:underline block">
                    inquiries@kronosbuild.com
                  </a>
                </div>
              </div>
            </div>

            {/* Right Clean Inquiry Form */}
            <div className="lg:col-span-7">
              <div className="rounded-sm border border-charcoal-border bg-[#1F2326]/60 p-8 sm:p-10">
                <h3 className="font-display text-lg font-medium text-white mb-2">Initiate a Commission</h3>
                <p className="text-xs text-concrete font-light mb-8">
                  Submit project parameters below. Our engineering directorate will review your brief within 24 business hours.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5 text-xs">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-concrete text-[11px] uppercase tracking-architectural mb-1.5 font-medium">
                        Your Full Name *
                      </label>
                      <input
                        required
                        type="text"
                        placeholder="e.g. Vikramaditya Rao"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full rounded-sm border border-charcoal-border bg-[#171A1C] p-3 text-white placeholder:text-concrete/40 focus:border-bronze focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-concrete text-[11px] uppercase tracking-architectural mb-1.5 font-medium">
                        Contact Telephone *
                      </label>
                      <input
                        required
                        type="tel"
                        placeholder="+91 Mobile Number"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full rounded-sm border border-charcoal-border bg-[#171A1C] p-3 text-white placeholder:text-concrete/40 focus:border-bronze focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-concrete text-[11px] uppercase tracking-architectural mb-1.5 font-medium">
                        Email Address *
                      </label>
                      <input
                        required
                        type="email"
                        placeholder="name@organization.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full rounded-sm border border-charcoal-border bg-[#171A1C] p-3 text-white placeholder:text-concrete/40 focus:border-bronze focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-concrete text-[11px] uppercase tracking-architectural mb-1.5 font-medium">
                        Project Typology
                      </label>
                      <select
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className="w-full rounded-sm border border-charcoal-border bg-[#171A1C] p-3 text-white focus:border-bronze focus:outline-none"
                      >
                        <option value="Bespoke Residential">Bespoke Residential Estate</option>
                        <option value="Commercial Landmark">Commercial / Headquarters</option>
                        <option value="Industrial Infrastructure">High-Tech Industrial Facility</option>
                        <option value="Heritage Restoration">Heritage Restoration / Adaptive Reuse</option>
                        <option value="Civil Infrastructure">Civil Infrastructure</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-concrete text-[11px] uppercase tracking-architectural mb-1.5 font-medium">
                        Estimated Budget Scale
                      </label>
                      <select
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full rounded-sm border border-charcoal-border bg-[#171A1C] p-3 text-white focus:border-bronze focus:outline-none"
                      >
                        <option value="₹2 Cr – ₹5 Cr">₹2 Cr – ₹5 Cr</option>
                        <option value="₹5 Cr – ₹15 Cr">₹5 Cr – ₹15 Cr</option>
                        <option value="₹15 Cr – ₹50 Cr">₹15 Cr – ₹50 Cr</option>
                        <option value="Above ₹50 Cr">Institutional / Above ₹50 Cr</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-concrete text-[11px] uppercase tracking-architectural mb-1.5 font-medium">
                        Target Groundbreaking
                      </label>
                      <select
                        value={formData.timeline}
                        onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                        className="w-full rounded-sm border border-charcoal-border bg-[#171A1C] p-3 text-white focus:border-bronze focus:outline-none"
                      >
                        <option value="Immediate (Under 3 Months)">Immediate (Under 3 Months)</option>
                        <option value="Within 6 Months">Within 6 Months</option>
                        <option value="Planning Phase / Next Year">Planning Phase / Next Year</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-concrete text-[11px] uppercase tracking-architectural mb-1.5 font-medium">
                      Project Overview & Site Context
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Brief description of location, plot dimensions, architectural drawings status..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full rounded-sm border border-charcoal-border bg-[#171A1C] p-3 text-white placeholder:text-concrete/40 focus:border-bronze focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-sm border border-bronze bg-bronze/90 py-3.5 text-xs font-semibold uppercase tracking-architectural text-white transition hover:bg-bronze hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>{formSubmitted ? 'Inquiry Submitted. Thank You.' : 'Transmit Project Brief'}</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 11: FOOTER (MIDNIGHT CHARCOAL)
      ======================================================== */}
      <KronosFooter />

      {/* Project Detail Modal */}
      {activeProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-[#171A1C] border border-charcoal-border rounded-sm p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveProjectModal(null)}
              className="absolute top-5 right-5 text-concrete hover:text-white transition"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-architectural text-bronze font-semibold">
                {activeProjectModal.category} Commission · {activeProjectModal.year}
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-light text-white">
                {activeProjectModal.title}
              </h3>
              <p className="text-xs text-concrete font-light">
                {activeProjectModal.location} · {activeProjectModal.area} · Architectural Direction by {activeProjectModal.leadArchitect}
              </p>

              <div className="arch-image-zoom rounded-sm overflow-hidden my-4 h-64">
                <img
                  src={activeProjectModal.image}
                  alt={activeProjectModal.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <p className="text-xs sm:text-sm text-concrete leading-relaxed font-light">
                {activeProjectModal.description}
              </p>

              <div className="pt-4 border-t border-charcoal-border">
                <p className="text-[11px] uppercase tracking-architectural text-white font-medium mb-2">Material Palette & Engineering:</p>
                <div className="flex flex-wrap gap-2">
                  {activeProjectModal.materials.map((m, i) => (
                    <span key={i} className="text-[11px] rounded-sm bg-[#1F2326] border border-charcoal-border px-3 py-1 text-concrete">
                      {m}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setActiveProjectModal(null)}
                  className="rounded-sm border border-concrete/40 px-5 py-2 text-xs uppercase tracking-architectural text-white hover:border-white"
                >
                  Close Inspection
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

