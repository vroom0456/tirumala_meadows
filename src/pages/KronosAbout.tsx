import KronosNavbar from '../components/KronosNavbar'
import KronosFooter from '../components/KronosFooter'
import { ArrowRight, Check, Shield, Compass, Award } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function KronosAbout() {
  return (
    <div className="bg-[#171A1C] text-white font-sans selection:bg-bronze selection:text-white">
      <KronosNavbar />

      {/* Hero Header */}
      <section className="relative pt-36 pb-20 bg-[#171A1C] border-b border-charcoal-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs uppercase tracking-architectural text-concrete font-medium border-l border-bronze pl-3">
              Studio & Philosophy
            </span>
            <h1 className="font-display text-4xl sm:text-6xl font-light text-white tracking-tight leading-tight">
              An obsession with permanence, honesty, and precision.
            </h1>
            <p className="text-base sm:text-lg text-concrete font-light leading-relaxed pt-2">
              KRONOS was founded to solve a fundamental fracture in modern construction: the gap between the poetic aspirations of high architecture and the practical realities of heavy civil engineering.
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy Section (Warm Ivory) */}
      <section className="py-24 sm:py-32 bg-[#F4F3EF] text-[#171A1C]">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid gap-16 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs uppercase tracking-architectural text-concrete-dark font-semibold">
                Core Ethos
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-light text-[#171A1C] tracking-tight">
                Material Honesty & Structural Truth
              </h2>
              <div className="space-y-4 text-sm sm:text-base text-[#171A1C]/80 font-normal leading-relaxed">
                <p>
                  We believe that great architecture should never rely on superficial veneers. Concrete should celebrate its aggregate and formwork textures; structural steel should articulate load paths with pride; and natural stone should reflect millennia of geological formation.
                </p>
                <p>
                  By treating construction as a tactile craft rather than an industrial commodity, our structures gain character as they age, withstanding extreme seasonal shifts while retaining their spatial dignity.
                </p>
              </div>

              <div className="pt-4 border-t border-[#171A1C]/10 grid grid-cols-2 gap-6 text-xs">
                <div>
                  <strong className="block text-[#171A1C] font-semibold text-sm">Millimeter Tolerances</strong>
                  <span className="text-concrete-dark">Laser-guided positioning across all structural members</span>
                </div>
                <div>
                  <strong className="block text-[#171A1C] font-semibold text-sm">Carbon-Smart Concrete</strong>
                  <span className="text-concrete-dark">Fly-ash & GGBS blended mixes reducing embodied carbon</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="arch-image-zoom rounded-sm overflow-hidden shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=85"
                  alt="Interior architecture by Kronos"
                  className="w-full h-[450px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership & Heritage (Midnight Charcoal) */}
      <section className="py-24 sm:py-32 bg-[#171A1C] border-t border-charcoal-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="max-w-2xl mb-16">
            <span className="text-xs uppercase tracking-architectural text-concrete font-medium block">
              Leadership Directorate
            </span>
            <h2 className="font-display text-3xl sm:text-5xl font-light text-white tracking-tight mt-2">
              Stewards of Built Environment
            </h2>
            <p className="text-sm text-concrete font-light leading-relaxed mt-4">
              Our directors combine academic credentials from premier engineering institutions with decades of active high-rise and luxury estate construction oversight.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {[
              {
                name: 'K. V. Ramanathan, PE',
                role: 'Managing Director & Chief Structural Engineer',
                bio: '30+ years in seismic structural engineering and post-tensioned slab innovation. Former chief consultant for landmark commercial developments across South Asia.',
              },
              {
                name: 'Devika Mansani, M.Arch',
                role: 'Director of Architectural Integration',
                bio: 'Bridges aesthetic design intent with on-site constructability. Specializes in advanced BIM coordination, facade engineering, and natural material curation.',
              },
              {
                name: 'Aditya S. Rao',
                role: 'Director of Construction Operations & QA',
                bio: 'Spearheads site logistics, ISO 9001 quality audits, and critical path scheduling, maintaining our unblemished zero-delay track record.',
              },
            ].map((leader, i) => (
              <div key={i} className="rounded-sm border border-charcoal-border bg-[#1F2326]/50 p-8 space-y-4">
                <span className="font-mono text-xs text-bronze">0{i + 1}</span>
                <h3 className="font-display text-xl font-medium text-white">{leader.name}</h3>
                <p className="text-xs uppercase tracking-architectural text-concrete font-medium">{leader.role}</p>
                <p className="text-xs text-concrete/80 font-light leading-relaxed pt-2 border-t border-charcoal-border">
                  {leader.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety & Standards (Warm Ivory) */}
      <section id="safety" className="py-24 bg-[#F4F3EF] text-[#171A1C] border-t border-[#171A1C]/10">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid gap-12 lg:grid-cols-12 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs uppercase tracking-architectural text-concrete-dark font-semibold">
                Safety & Certification
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-light text-[#171A1C] tracking-tight">
                Zero Incident Culture
              </h2>
              <p className="text-sm text-[#171A1C]/80 font-light leading-relaxed">
                We believe that engineering excellence cannot exist without an uncompromising commitment to human safety. Every project operates under strict international safety management benchmarks.
              </p>
            </div>

            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6 text-xs">
              <div className="bg-white p-6 rounded-sm border border-[#171A1C]/10 space-y-2">
                <p className="font-bold text-[#171A1C] text-sm">ISO 45001:2018 Certified</p>
                <p className="text-concrete-dark font-light leading-relaxed">
                  International standard for occupational health and safety across all active construction sites and fabrication yards.
                </p>
              </div>
              <div className="bg-white p-6 rounded-sm border border-[#171A1C]/10 space-y-2">
                <p className="font-bold text-[#171A1C] text-sm">Daily Tool-Box Safety Talks</p>
                <p className="text-concrete-dark font-light leading-relaxed">
                  Mandatory safety briefings and hazard identification procedures before every daily work shift begins.
                </p>
              </div>
              <div className="bg-white p-6 rounded-sm border border-[#171A1C]/10 space-y-2">
                <p className="font-bold text-[#171A1C] text-sm">Third-Party Concrete Audits</p>
                <p className="text-concrete-dark font-light leading-relaxed">
                  Certified NABL laboratory testing of all cube compressive strength and rebar tensile properties.
                </p>
              </div>
              <div className="bg-white p-6 rounded-sm border border-[#171A1C]/10 space-y-2">
                <p className="font-bold text-[#171A1C] text-sm">Environmental Compliance</p>
                <p className="text-concrete-dark font-light leading-relaxed">
                  Active dust mitigation, noise dampening barriers, and 100% compliant construction waste recycling protocols.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <KronosFooter />
    </div>
  )
}

