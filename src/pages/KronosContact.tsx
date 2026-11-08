import { useState, type FormEvent } from 'react'
import KronosNavbar from '../components/KronosNavbar'
import KronosFooter from '../components/KronosFooter'
import { Send, Check, MapPin, Phone, Mail, Clock, Shield } from 'lucide-react'

export default function KronosContact() {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    phone: '',
    projectType: 'Bespoke Residential Estate',
    budget: '₹5 Cr – ₹15 Cr',
    timeline: '3 to 6 Months',
    siteAddress: '',
    hasArchitect: 'Yes, Drawings are ready',
    message: '',
  })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setFormSubmitted(true)
    setTimeout(() => {
      setFormSubmitted(false)
      setFormData({
        name: '',
        organization: '',
        email: '',
        phone: '',
        projectType: 'Bespoke Residential Estate',
        budget: '₹5 Cr – ₹15 Cr',
        timeline: '3 to 6 Months',
        siteAddress: '',
        hasArchitect: 'Yes, Drawings are ready',
        message: '',
      })
    }, 4000)
  }

  return (
    <div className="bg-[#171A1C] text-white font-sans selection:bg-bronze selection:text-white">
      <KronosNavbar />

      {/* Hero Header */}
      <section className="relative pt-36 pb-20 bg-[#171A1C] border-b border-charcoal-border">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs uppercase tracking-architectural text-concrete font-medium border-l border-bronze pl-3">
              Initiate Dialogue
            </span>
            <h1 className="font-display text-4xl sm:text-6xl font-light text-white tracking-tight leading-tight">
              Request for Proposal & Site Consultation
            </h1>
            <p className="text-base sm:text-lg text-concrete font-light leading-relaxed pt-2">
              Every commission begins with a confidential feasibility dialogue. Share your project parameters to schedule an executive engineering consultation.
            </p>
          </div>
        </div>
      </section>

      {/* Main Section (Midnight Charcoal) */}
      <section className="py-24 sm:py-32 bg-[#171A1C]">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid gap-16 lg:grid-cols-12">
            {/* Left Column: Office Intelligence */}
            <div className="lg:col-span-5 space-y-8">
              <div className="space-y-3">
                <span className="text-xs uppercase tracking-architectural text-concrete font-medium block">
                  Studio Directory
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-light text-white tracking-tight">
                  Central Engineering Directorate
                </h2>
                <p className="text-sm text-concrete font-light leading-relaxed">
                  Our central engineering studio houses senior civil directors, BIM modelers, geotechnical consultants, and procurement managers.
                </p>
              </div>

              <div className="space-y-6 pt-6 border-t border-charcoal-border text-xs">
                <div className="space-y-1.5">
                  <span className="text-[11px] uppercase tracking-architectural text-concrete/70 font-medium">Headquarters Address</span>
                  <p className="text-white font-medium text-sm">
                    Tower 4, Level 12, Financial District, Gachibowli, Hyderabad, Telangana 500032
                  </p>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[11px] uppercase tracking-architectural text-concrete/70 font-medium">Direct Telephone</span>
                  <a href="tel:+919700760120" className="text-white font-semibold block text-sm hover:text-bronze transition">
                    +91 (0) 97007 60120
                  </a>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[11px] uppercase tracking-architectural text-concrete/70 font-medium">Direct Electronic Dispatch</span>
                  <a href="mailto:inquiries@kronosbuild.com" className="text-bronze font-medium block text-sm hover:underline">
                    inquiries@kronosbuild.com
                  </a>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[11px] uppercase tracking-architectural text-concrete/70 font-medium">Office Hours</span>
                  <p className="text-concrete">
                    Monday — Friday: 08:30 – 18:30 IST<br />
                    Saturday: By Prior Appointment
                  </p>
                </div>
              </div>

              <div className="rounded-sm border border-charcoal-border bg-[#1F2326]/50 p-6 space-y-2 text-xs">
                <strong className="text-white block font-medium">Confidentiality Guarantee:</strong>
                <p className="text-concrete font-light leading-relaxed">
                  All submitted drawings, site plots, budgets, and client identities are held under strict non-disclosure covenants.
                </p>
              </div>
            </div>

            {/* Right Column: Clean Form */}
            <div className="lg:col-span-7">
              <div className="rounded-sm border border-charcoal-border bg-[#1F2326]/60 p-8 sm:p-12">
                <h3 className="font-display text-xl font-medium text-white mb-2">Project Brief Submission</h3>
                <p className="text-xs text-concrete font-light mb-8">
                  Please complete the technical parameters below. Our engineering director will review your submission within 24 hours.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6 text-xs">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-concrete text-[11px] uppercase tracking-architectural mb-2 font-medium">
                        Full Legal Name *
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
                      <label className="block text-concrete text-[11px] uppercase tracking-architectural mb-2 font-medium">
                        Organization / Family Office
                      </label>
                      <input
                        type="text"
                        placeholder="Company or Private Trust"
                        value={formData.organization}
                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                        className="w-full rounded-sm border border-charcoal-border bg-[#171A1C] p-3 text-white placeholder:text-concrete/40 focus:border-bronze focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-concrete text-[11px] uppercase tracking-architectural mb-2 font-medium">
                        Official Email *
                      </label>
                      <input
                        required
                        type="email"
                        placeholder="name@domain.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full rounded-sm border border-charcoal-border bg-[#171A1C] p-3 text-white placeholder:text-concrete/40 focus:border-bronze focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-concrete text-[11px] uppercase tracking-architectural mb-2 font-medium">
                        Telephone Number *
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
                      <label className="block text-concrete text-[11px] uppercase tracking-architectural mb-2 font-medium">
                        Project Sector
                      </label>
                      <select
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className="w-full rounded-sm border border-charcoal-border bg-[#171A1C] p-3 text-white focus:border-bronze focus:outline-none"
                      >
                        <option value="Bespoke Residential Estate">Bespoke Residential Estate</option>
                        <option value="Commercial Landmark">Commercial Headquarters / Office</option>
                        <option value="Industrial Infrastructure">High-Tech Industrial Facility</option>
                        <option value="Heritage Restoration">Heritage Restoration / Adaptive Reuse</option>
                        <option value="Civil Infrastructure">Civil Infrastructure</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-concrete text-[11px] uppercase tracking-architectural mb-2 font-medium">
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
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-concrete text-[11px] uppercase tracking-architectural mb-2 font-medium">
                        Site Location / City
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Jubilee Hills, Hyderabad"
                        value={formData.siteAddress}
                        onChange={(e) => setFormData({ ...formData, siteAddress: e.target.value })}
                        className="w-full rounded-sm border border-charcoal-border bg-[#171A1C] p-3 text-white placeholder:text-concrete/40 focus:border-bronze focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-concrete text-[11px] uppercase tracking-architectural mb-2 font-medium">
                        Architectural Drawings Status
                      </label>
                      <select
                        value={formData.hasArchitect}
                        onChange={(e) => setFormData({ ...formData, hasArchitect: e.target.value })}
                        className="w-full rounded-sm border border-charcoal-border bg-[#171A1C] p-3 text-white focus:border-bronze focus:outline-none"
                      >
                        <option value="Yes, Drawings are ready">Drawings Complete (Ready for tender)</option>
                        <option value="Concept Stage">Concept Stage (In architectural design)</option>
                        <option value="Need Architect Recommendation">Need Architect Recommendation</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-concrete text-[11px] uppercase tracking-architectural mb-2 font-medium">
                      Project Vision & Specific Engineering Requirements
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Outline target square footage, site terrain, special materials (e.g. board-formed concrete, cantilevered structures), and schedule requirements..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full rounded-sm border border-charcoal-border bg-[#171A1C] p-3 text-white placeholder:text-concrete/40 focus:border-bronze focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-sm border border-bronze bg-bronze/90 py-4 text-xs font-semibold uppercase tracking-architectural text-white transition hover:bg-bronze hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>{formSubmitted ? 'Project Brief Transmitted. We Will Connect.' : 'Submit Confidential Project Brief'}</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <KronosFooter />
    </div>
  )
}

