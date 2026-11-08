import { Link } from 'react-router-dom'
import KronosNavbar from '../components/KronosNavbar'
import KronosFooter from '../components/KronosFooter'
import { ArrowRight, Check, Building, Layers, Factory, Landmark, GitCommit } from 'lucide-react'

const serviceDetails = [
  {
    id: 'residential',
    title: 'Residential Construction',
    tagline: 'Private architectural sanctuaries, bespoke villas, and multi-generational estates.',
    icon: Building,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
    overview:
      'We partner with private clients and premier design studios to build residences of timeless distinction. From complex cantilevered hillside villas to expansive walled courtyard homes, our focus is millimeter-precise craftsmanship and uncompromised privacy.',
    capabilities: [
      'Post-tensioned architectural concrete slabs allowing grand, column-free living halls',
      'High-performance acoustic double and triple glazed structural glass facades',
      'Underground climate-controlled wine cellars, private screening suites, and wellness spas',
      'Integration of geothermal cooling, rooftop solar photovoltaic arrays, and smart home automation',
      'Precision stone joinery (travertine, granite, Italian marble) and bespoke hardwood millwork',
    ],
  },
  {
    id: 'commercial',
    title: 'Commercial Construction',
    tagline: 'Corporate headquarters, boutique retail flagships, and civic cultural institutions.',
    icon: Layers,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85',
    overview:
      'We engineer commercial environments that express institutional vision while maximizing functional spatial efficiency. Designed to meet stringent LEED, IGBC, and WELL building certification standards.',
    capabilities: [
      'Multi-story composite steel and concrete structural framing for fast-track execution',
      'Unitized curtain-wall facade engineering with custom thermal break profiles',
      'High-capacity central MEP plant rooms, energy recovery ventilators, and redundant backup power',
      'Acoustically isolated executive boardroom suites, auditorium facilities, and collaboration atriums',
      'Turnkey handover with full fire-safety NOC, municipal occupancy certificates, and commissioning',
    ],
  },
  {
    id: 'industrial',
    title: 'Industrial Construction',
    tagline: 'High-tolerance engineering, advanced fabrication facilities, and automated logistics centers.',
    icon: Factory,
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=85',
    overview:
      'Modern industrial architecture requires intense structural rigor: vibration-isolated foundations, high-flatness concrete floor slabs, and heavy gantry crane superstructures built to support advanced automation.',
    capabilities: [
      'Super-flat industrial concrete flooring (FM1 / FM2 tolerances) for automated robotic warehousing',
      'Heavy pre-engineered structural steel trusses with spans exceeding 50 meters',
      'ISO-certified cleanroom environments with positive air pressure and HEPA filtration',
      'Hazardous material containment, industrial effluent treatment, and zero liquid discharge systems',
      'Heavy vehicle loading bays, automated dock levelers, and perimeter security perimeters',
    ],
  },
  {
    id: 'restoration',
    title: 'Renovation & Restoration',
    tagline: 'Preserving historical integrity through modern structural stabilization and adaptive reuse.',
    icon: Landmark,
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=85',
    overview:
      'Restoration is an art of restraint. We stabilize fragile masonry, restore timber trusses, and sensitively weave contemporary MEP infrastructure through historic fabric without compromising heritage character.',
    capabilities: [
      'Non-destructive structural testing, ultrasonic pulse velocity checks, and crack monitoring',
      'Lime mortar repointing, traditional brick stitching, and carbon-fiber composite strengthening',
      'Sympathetic integration of modern concealed HVAC, LED illumination, and life-safety systems',
      'Seismic retrofitting of unreinforced historical masonry load-bearing walls',
      'Conversion of historic warehouses and civic buildings into cutting-edge cultural campuses',
    ],
  },
  {
    id: 'infrastructure',
    title: 'Infrastructure Development',
    tagline: 'Master-planned civil projects, structural bridges, and vital utility corridors.',
    icon: GitCommit,
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=85',
    overview:
      'Executing civil works that connect communities and underpin commercial development. From heavy reinforced concrete retaining structures to wide access arteries and stormwater networks.',
    capabilities: [
      'Deep excavation support, soil nailing, contiguous piling, and diaphragm wall engineering',
      'Precast reinforced concrete bridge girders and grade-separated flyover components',
      'High-capacity subterranean stormwater drainage channels and biological rainwater retention basins',
      'Heavy asphalt and fiber-reinforced concrete roadway paving built for heavy axle loads',
      'Substation foundations, underground high-voltage utility ducts, and communication conduits',
    ],
  },
]

export default function KronosServices() {
  return (
    <div className="bg-[#171A1C] text-white font-sans selection:bg-bronze selection:text-white">
      <KronosNavbar />

      {/* Hero Header */}
      <section className="relative pt-36 pb-20 bg-[#171A1C] border-b border-charcoal-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs uppercase tracking-architectural text-concrete font-medium border-l border-bronze pl-3">
              Comprehensive Disciplines
            </span>
            <h1 className="font-display text-4xl sm:text-6xl font-light text-white tracking-tight leading-tight">
              Engineering capabilities for complex architectural challenges.
            </h1>
            <p className="text-base sm:text-lg text-concrete font-light leading-relaxed pt-2">
              KRONOS delivers across five dedicated construction disciplines. Each sector is backed by specialized engineering directors, BIM modelers, and seasoned site personnel.
            </p>
          </div>
        </div>
      </section>

      {/* Services Breakdown with Dark/Light Alternation */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-12 space-y-24">
          {serviceDetails.map((service, index) => {
            const isDark = index % 2 === 0
            return (
              <div
                key={service.id}
                className={`rounded-sm border ${
                  isDark
                    ? 'bg-[#1F2326]/60 border-charcoal-border text-white'
                    : 'bg-[#F4F3EF] border-[#171A1C]/10 text-[#171A1C]'
                } p-8 sm:p-12 shadow-sm`}
              >
                <div className="grid gap-12 lg:grid-cols-12 items-center">
                  <div className="lg:col-span-5 relative arch-image-zoom rounded-sm overflow-hidden h-80 shadow-md">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-[#171A1C]/80 backdrop-blur-sm px-3 py-1 text-[11px] font-mono text-bronze uppercase tracking-architectural">
                      Sector 0{index + 1}
                    </div>
                  </div>

                  <div className="lg:col-span-7 space-y-5">
                    <div>
                      <span className={`text-[11px] uppercase tracking-architectural font-semibold block ${
                        isDark ? 'text-bronze' : 'text-concrete-dark'
                      }`}>
                        Discipline Focus
                      </span>
                      <h2 className="font-display text-2xl sm:text-4xl font-medium tracking-tight mt-1">
                        {service.title}
                      </h2>
                      <p className={`text-xs sm:text-sm mt-1 font-light ${
                        isDark ? 'text-concrete' : 'text-[#171A1C]/70'
                      }`}>
                        {service.tagline}
                      </p>
                    </div>

                    <p className={`text-xs sm:text-sm leading-relaxed font-light ${
                      isDark ? 'text-concrete/90' : 'text-[#171A1C]/80'
                    }`}>
                      {service.overview}
                    </p>

                    <div className={`p-5 rounded-sm border ${
                      isDark ? 'bg-[#171A1C] border-charcoal-border' : 'bg-white border-[#171A1C]/10'
                    }`}>
                      <p className={`text-[11px] uppercase tracking-architectural font-medium mb-3 ${
                        isDark ? 'text-white' : 'text-[#171A1C]'
                      }`}>
                        Engineering Capabilities:
                      </p>
                      <ul className="space-y-2">
                        {service.capabilities.map((cap, i) => (
                          <li key={i} className={`flex items-start gap-2.5 text-xs font-light leading-relaxed ${
                            isDark ? 'text-concrete' : 'text-[#171A1C]/80'
                          }`}>
                            <Check className="h-3.5 w-3.5 text-bronze shrink-0 mt-0.5" />
                            <span>{cap}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Link
                      to="/contact"
                      className={`inline-flex items-center gap-2 text-xs uppercase tracking-architectural font-semibold transition ${
                        isDark ? 'text-white hover:text-bronze' : 'text-[#171A1C] hover:text-bronze'
                      }`}
                    >
                      <span>Inquire About {service.title}</span>
                      <ArrowRight className="h-3.5 w-3.5 text-bronze" />
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <KronosFooter />
    </div>
  )
}

