import { useState } from 'react'
import {
  Layers,
  Sparkles,
  ShieldCheck,
  Check,
  Building2,
  Home,
  Droplets,
  Zap
} from 'lucide-react'
import AppleNavbar from '../components/AppleNavbar'
import AppleFooter from '../components/AppleFooter'

const specs = [
  {
    category: 'Structure & Masonry',
    icon: Building2,
    title: 'Earthquake-Resistant RCC Frame',
    details: [
      'Earthquake-resistant RCC frame structure with red / fly ash brick masonry walls.',
      'Engineered to withstand seismic zone loads with high safety factor and structural longevity.',
      'External walls 9 inches thick for heat deflection and thermal insulation; internal walls 4.5 inches.',
      'Double-coat cement plastering with smooth finish for flawless paint adhesion.',
    ],
  },
  {
    category: 'Flooring & Cladding',
    icon: Layers,
    title: 'Premium Marble & Granite',
    details: [
      'Premium marble and granite tiles across living rooms, passages, and bedrooms.',
      'Polished granite kitchen platform with edge moulding.',
      'Glazed tile dado extending up to 7 feet height in bathrooms and kitchen.',
      'Anti-skid ceramic tiles in utility, balconies, and wash zones.',
      'Granite stone cladding on internal and porch staircases with sturdy handrails.',
    ],
  },
  {
    category: 'Doors & Windows',
    icon: Home,
    title: 'Teak Wood Main Door & Polished Finish',
    details: [
      'Main door crafted with seasoned teak wood frame and polished aesthetic finish.',
      'Designer brass/SS hardware and secure multi-lever locking system on the main entrance.',
      'Durable internal flush doors with teak wood frames and enamel painted finish.',
      'Glazed window shutters with safety grills and smooth hardware.',
    ],
  },
  {
    category: 'Kitchen Provisions',
    icon: Droplets,
    title: 'Granite Countertop & Glazed Dado',
    details: [
      'Polished granite platform equipped with stainless steel sink.',
      'Glazed tile dado extending above the counter.',
      'Provision for municipal drinking water and 24-hr borewell tap connection.',
      'Electrical provisions for chimney, water purifier (RO point), and mixer grinder.',
    ],
  },
  {
    category: 'Bathrooms & Sanitary',
    icon: Droplets,
    title: 'Reputed Sanitary Ware & CP Fittings',
    details: [
      'Premium sanitary ware and chrome-plated CP fittings from reputed brands.',
      'Wall-hung wash basins with hot and cold mixer units in master bathrooms.',
      'Anti-skid ceramic floor tiles and glazed wall tiles up to 7 feet.',
      'Concealed plumbing using CPVC / UPVC pipes for leak-proof service.',
    ],
  },
  {
    category: 'Electrical & Painting',
    icon: Zap,
    title: 'Concealed Wiring & Weather-Proof Paint',
    details: [
      'Fire-resistant concealed copper wiring with modular switches.',
      'Power outlets for air conditioners in all bedrooms and living room.',
      'Smooth luppam finish with premium interior acrylic emulsion paint.',
      'Weather-resistant premium exterior paint designed to withstand monsoon and sun.',
    ],
  },
]

export default function SpecificationsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white text-navy font-sans antialiased selection:bg-hotpink selection:text-white">
      <AppleNavbar onOpenVisitModal={() => setIsModalOpen(true)} />

      {/* Header */}
      <section className="bg-soft py-16 border-b border-borderGrey">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-hotpink/10 px-3.5 py-1 text-xs font-semibold text-hotpink">
            Engineering & Material Standards
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-navy font-display">
            Technical Specifications Sheet
          </h1>
          <p className="text-sm sm:text-base text-slateGrey max-w-2xl mx-auto">
            Review the structural engineering, teak woodwork, marble and granite masonry built by Mansani Constructions Pvt Ltd.
          </p>
        </div>
      </section>

      {/* Specifications Grid */}
      <section className="py-16 bg-white border-b border-borderGrey">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {specs.map((item, idx) => {
              const IconComp = item.icon
              return (
                <div key={idx} className="luxury-card p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-soft border border-borderGrey text-hotpink mb-4">
                      <IconComp className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-hotpink">
                      {item.category}
                    </span>
                    <h2 className="text-lg font-bold text-navy mt-1 font-display">
                      {item.title}
                    </h2>
                    <ul className="mt-4 space-y-2.5">
                      {item.details.map((point, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-slateGrey">
                          <Check className="h-4 w-4 text-hotpink shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Quality Assurance Card */}
          <div className="mt-12 rounded-2xl border border-borderGrey bg-soft p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-hotpink">Developer Quality Standard</span>
              <h3 className="text-xl font-bold text-navy font-display">Mansani Constructions Pvt Ltd</h3>
              <p className="text-xs text-slateGrey max-w-xl">
                All structural work at Mansani Thirumala Meadows complies with municipal building regulations and earthquake-resistant safety norms.
              </p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="btn-hotpink shrink-0 px-6 py-3 text-xs sm:text-sm font-semibold"
            >
              Request Inspection Walkthrough
            </button>
          </div>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/60 backdrop-blur-sm p-4">
          <div className="luxury-card max-w-md w-full p-6 text-center space-y-4">
            <h3 className="text-xl font-bold text-navy font-display">Technical Inspection</h3>
            <p className="text-xs text-slateGrey">
              Arrange an on-site structural walkthrough with our resident engineering desk.
            </p>
            <button
              onClick={() => setIsModalOpen(false)}
              className="btn-hotpink px-6 py-2.5 text-xs font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <AppleFooter />
    </div>
  )
}
