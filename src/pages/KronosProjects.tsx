import { useState } from 'react'
import KronosNavbar from '../components/KronosNavbar'
import KronosFooter from '../components/KronosFooter'
import { ArrowRight, X, Maximize2 } from 'lucide-react'

interface Project {
  id: string
  title: string
  category: 'Residential' | 'Commercial' | 'Industrial' | 'Restoration'
  location: string
  year: string
  area: string
  client: string
  image: string
  scope: string
  specifications: string[]
}

const allProjects: Project[] = [
  {
    id: 'cantilever-residence',
    title: 'The Cantilever Residence',
    category: 'Residential',
    location: 'Jubilee Hills, Hyderabad',
    year: '2024',
    area: '14,200 sq.ft',
    client: 'Private Family Commission',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=85',
    scope: 'Turnkey structural civil engineering, board-formed concrete execution, and acoustic glass envelope installation.',
    specifications: [
      'Post-tensioned 12m cantilevered floor slab',
      'High-grade M40 self-compacting architectural concrete',
      'Custom acoustic double glazed frameless curtain walls',
      'Integrated geothermal ground-source cooling network',
    ],
  },
  {
    id: 'aurora-pavilion',
    title: 'Aurora Technology Pavilion',
    category: 'Commercial',
    location: 'Financial District, Hyderabad',
    year: '2023',
    area: '86,000 sq.ft',
    client: 'Aurora Global Technologies',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85',
    scope: 'Structural composite framing, dynamic solar-tracking facade, and LEED Platinum compliant MEP installation.',
    specifications: [
      'Composite structural steel & post-tensioned decking',
      'Double-glazed Low-E argon filled envelope',
      'Centralized rainwater harvesting with 200kL storage',
      'Acoustic auditorium with 400-seat capacity',
    ],
  },
  {
    id: 'monolith-house',
    title: 'Monolith House',
    category: 'Residential',
    location: 'Banjara Hills, Hyderabad',
    year: '2023',
    area: '9,800 sq.ft',
    client: 'Confidential Executive Estate',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=85',
    scope: 'Architectural cast-in-place concrete villa with central thermal ventilation courtyard and basalt stone pool terrace.',
    specifications: [
      'Raw travertine and textured board-formed concrete',
      'Internal bio-climatic atrium with automated skylights',
      'Custom teak wood pivoting entrance portal (9ft height)',
      'Subterranean 4-car climate-controlled gallery',
    ],
  },
  {
    id: 'foundry-adaptive-reuse',
    title: 'The Foundry Adaptive Reuse',
    category: 'Restoration',
    location: 'Secunderabad Heritage Precinct',
    year: '2022',
    area: '28,500 sq.ft',
    client: 'Design Foundation Trust',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=85',
    scope: 'Conservation of 1920s heritage warehouse into an active studio campus, blending historical masonry with exposed structural steel.',
    specifications: [
      'Structural stabilization with carbon-fiber stitching',
      'Restoration of original timber truss roof structure',
      'Polished industrial screed flooring with underfloor heating',
      'Energy-efficient insulated micro-profile zinc roof cladding',
    ],
  },
  {
    id: 'logistics-hub',
    title: 'Horizon Precision Logistics Center',
    category: 'Industrial',
    location: 'Outer Ring Road (ORR) Corridor',
    year: '2022',
    area: '240,000 sq.ft',
    client: 'Apex Industrial Logistics',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=85',
    scope: 'Heavy civil foundation engineering, super-flat concrete slabs, and 48-meter clear span pre-engineered steel superstructure.',
    specifications: [
      'FM2 laser-screeded jointless concrete floor slab',
      '48m clear span pre-engineered structural steel trusses',
      '24 automated hydraulic dock levelers with climate seals',
      '1.2 MW rooftop solar photovoltaic installation',
    ],
  },
  {
    id: 'minimalist-courtyard-villa',
    title: 'Courtyard Villa',
    category: 'Residential',
    location: 'Gandipet, Hyderabad',
    year: '2021',
    area: '11,500 sq.ft',
    client: 'Private Residence',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85',
    scope: 'Minimalist lakefront residence with rammed-earth feature walls, floating concrete steps, and infinity lap pool.',
    specifications: [
      'Stabilized rammed-earth interior thermal mass walls',
      'Cantilevered architectural concrete floating staircase',
      'Infinity-edge black granite swimming pool structure',
      'Floor-to-ceiling recessed track sliding door systems',
    ],
  },
]

export default function KronosProjects() {
  const [filter, setFilter] = useState<'All' | 'Residential' | 'Commercial' | 'Industrial' | 'Restoration'>('All')
  const [activeModal, setActiveModal] = useState<Project | null>(null)

  const categories = ['All', 'Residential', 'Commercial', 'Industrial', 'Restoration'] as const

  const filtered = filter === 'All'
    ? allProjects
    : allProjects.filter((p) => p.category === filter)

  return (
    <div className="bg-[#171A1C] text-white font-sans selection:bg-bronze selection:text-white">
      <KronosNavbar />

      {/* Hero Header */}
      <section className="relative pt-36 pb-20 bg-[#171A1C] border-b border-charcoal-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs uppercase tracking-architectural text-concrete font-medium border-l border-bronze pl-3">
              Selected Works Archive
            </span>
            <h1 className="font-display text-4xl sm:text-6xl font-light text-white tracking-tight leading-tight">
              An archive of physical permanence.
            </h1>
            <p className="text-base sm:text-lg text-concrete font-light leading-relaxed pt-2">
              Each commission represents an unyielding commitment to structural authenticity, material rigor, and geometric precision.
            </p>

            {/* Filter Pills */}
            <div className="pt-6 flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setFilter(c)}
                  className={`rounded-sm px-5 py-2 text-xs uppercase tracking-architectural font-medium transition ${
                    filter === c
                      ? 'bg-white text-[#171A1C] font-semibold'
                      : 'border border-charcoal-border text-concrete hover:text-white hover:border-white/40'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Gallery (Warm Ivory) */}
      <section className="py-24 sm:py-32 bg-[#F4F3EF] text-[#171A1C]">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid gap-12 sm:grid-cols-2">
            {filtered.map((proj) => (
              <div
                key={proj.id}
                onClick={() => setActiveModal(proj)}
                className="group cursor-pointer space-y-4"
              >
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

                <div className="flex items-baseline justify-between pt-1">
                  <div>
                    <h3 className="font-display text-xl sm:text-2xl font-medium text-[#171A1C] group-hover:text-bronze transition">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-concrete-dark mt-1 font-light tracking-wide">
                      {proj.location} · {proj.year}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-mono text-[#171A1C] font-semibold">{proj.area}</span>
                    <span className="block text-[10px] text-concrete-dark uppercase tracking-architectural">Area</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <KronosFooter />

      {/* Modal View */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-[#171A1C] border border-charcoal-border rounded-sm p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setActiveModal(null)}
              className="absolute top-5 right-5 text-concrete hover:text-white transition"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-architectural text-bronze font-semibold">
                {activeModal.category} Commission · {activeModal.year}
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-light text-white">
                {activeModal.title}
              </h3>
              <p className="text-xs text-concrete font-light">
                {activeModal.location} · {activeModal.area} · Commissioned by {activeModal.client}
              </p>

              <div className="arch-image-zoom rounded-sm overflow-hidden my-4 h-64">
                <img
                  src={activeModal.image}
                  alt={activeModal.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-2">
                <p className="text-[11px] uppercase tracking-architectural text-white font-medium">Scope of Construction:</p>
                <p className="text-xs sm:text-sm text-concrete leading-relaxed font-light">
                  {activeModal.scope}
                </p>
              </div>

              <div className="pt-4 border-t border-charcoal-border">
                <p className="text-[11px] uppercase tracking-architectural text-white font-medium mb-2">Technical & Structural Specifications:</p>
                <ul className="space-y-1.5">
                  {activeModal.specifications.map((s, idx) => (
                    <li key={idx} className="text-xs text-concrete font-light flex items-start gap-2">
                      <span className="text-bronze mt-0.5">•</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setActiveModal(null)}
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

