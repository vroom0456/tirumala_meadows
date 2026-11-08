import { useState, type FormEvent } from 'react'
import {
  Building2,
  Calendar,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  ArrowRight
} from 'lucide-react'
import AppleNavbar from '../components/AppleNavbar'
import AppleFooter from '../components/AppleFooter'

export default function InquirePage() {
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    config: '3 BHK Joint-Family Villa',
    purpose: 'Buying Resale',
  })
  const [success, setSuccess] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSuccess(true)
  }

  return (
    <div className="min-h-screen bg-white text-navy font-sans antialiased selection:bg-hotpink selection:text-white">
      <AppleNavbar onOpenVisitModal={() => setIsModalOpen(true)} />

      {/* Hero Header */}
      <section className="bg-soft py-16 border-b border-borderGrey">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-navy/5 px-3.5 py-1 text-xs font-semibold text-navy">
            Resale & Property Inquiries
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-navy font-display">
            Your Next Chapter Starts Here.
          </h1>
          <p className="text-sm sm:text-base text-slateGrey max-w-2xl mx-auto">
            Discover the comfort of independent villa living at Mansani Thirumala Meadows. Get in touch to explore available properties and arrange a private visit.
          </p>
        </div>
      </section>

      {/* Main Form Section */}
      <section className="py-16 bg-white border-b border-borderGrey">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-12 lg:grid-cols-12 items-start">
            
            {/* Left Column: Context & Developer Attribution */}
            <div className="lg:col-span-5 space-y-6">
              <div className="luxury-card p-6 space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-hotpink">Developer Attribution</span>
                <h3 className="text-xl font-bold text-navy font-display">A Project by Mansani Constructions Pvt Ltd.</h3>
                <p className="text-xs text-slateGrey leading-relaxed">
                  Mansani Thirumala Meadows is a completed, fully established gated township in Uppal / Boduppal, Hyderabad. As the project is fully completed, our inquiry desk facilitates verified resale opportunities, tenant rentals, and site visits.
                </p>
                <div className="border-t border-borderGrey pt-4 space-y-3 text-xs text-slateGrey">
                  <div className="flex items-center gap-2.5">
                    <Phone className="h-4 w-4 text-hotpink shrink-0" />
                    <a href="tel:+919700760120" className="text-navy font-semibold hover:text-hotpink">
                      +91 97007 60120
                    </a>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Mail className="h-4 w-4 text-hotpink shrink-0" />
                    <span className="text-navy">inquiries@mansaniconstructions.com</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <MapPin className="h-4 w-4 text-hotpink shrink-0 mt-0.5" />
                    <span>Thirumala Meadows Colony, Chilakanagar, Uppal / Boduppal, Hyderabad</span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-borderGrey bg-soft p-5 text-xs text-slateGrey">
                <strong className="text-navy">Important Notice: </strong>
                This is a completed project. We clearly distinguish verified resale and rental inquiries from direct developer bookings.
              </div>
            </div>

            {/* Right Column: Inquiry Form Card */}
            <div className="lg:col-span-7">
              <div className="luxury-card p-8 sm:p-10">
                {success ? (
                  <div className="text-center py-10 space-y-4">
                    <div className="h-16 w-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="h-8 w-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-navy font-display">Request Submitted</h3>
                    <p className="text-sm text-slateGrey max-w-md mx-auto">
                      Thank you, <strong className="text-navy">{form.fullName}</strong>. A representative will contact you at <strong className="text-navy">{form.phone}</strong> regarding resale availability in Mansani Thirumala Meadows.
                    </p>
                    <button
                      onClick={() => setSuccess(false)}
                      className="mt-4 rounded-full border border-borderGrey bg-soft px-6 py-2.5 text-xs font-semibold text-navy hover:bg-white transition"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="border-b border-borderGrey pb-4 mb-4">
                      <h3 className="text-xl font-bold text-navy font-display">Property Inquiry Form</h3>
                      <p className="text-xs text-slateGrey mt-0.5">Fill out your requirements below to receive verified resale listings and schedule a site visit.</p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-semibold text-navy mb-1.5">
                          Full Name <span className="text-hotpink">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Suresh Reddy"
                          value={form.fullName}
                          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                          className="w-full rounded-xl border border-borderGrey bg-soft px-4 py-2.5 text-xs sm:text-sm text-navy focus:bg-white focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-navy mb-1.5">
                          Phone Number <span className="text-hotpink">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="e.g. +91 98765 43210"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          className="w-full rounded-xl border border-borderGrey bg-soft px-4 py-2.5 text-xs sm:text-sm text-navy focus:bg-white focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-navy mb-1.5">
                        Email Address <span className="text-hotpink">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. suresh@example.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full rounded-xl border border-borderGrey bg-soft px-4 py-2.5 text-xs sm:text-sm text-navy focus:bg-white focus:outline-none"
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-semibold text-navy mb-1.5">
                          Interested Configuration
                        </label>
                        <select
                          value={form.config}
                          onChange={(e) => setForm({ ...form, config: e.target.value })}
                          className="w-full rounded-xl border border-borderGrey bg-soft px-4 py-2.5 text-xs sm:text-sm text-navy focus:bg-white focus:outline-none"
                        >
                          <option>2 BHK Premium Villa</option>
                          <option>3 BHK Joint-Family Villa</option>
                          <option>4 BHK Luxury Villa</option>
                          <option>Any Configuration</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-navy mb-1.5">
                          Purpose
                        </label>
                        <select
                          value={form.purpose}
                          onChange={(e) => setForm({ ...form, purpose: e.target.value })}
                          className="w-full rounded-xl border border-borderGrey bg-soft px-4 py-2.5 text-xs sm:text-sm text-navy focus:bg-white focus:outline-none"
                        >
                          <option>Buying Resale</option>
                          <option>Renting</option>
                          <option>General Inquiry</option>
                        </select>
                      </div>
                    </div>

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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/60 backdrop-blur-sm p-4">
          <div className="luxury-card max-w-md w-full p-6 text-center space-y-4">
            <h3 className="text-xl font-bold text-navy font-display">Schedule a Visit</h3>
            <p className="text-xs text-slateGrey">
              Visit Mansani Thirumala Meadows in Uppal / Boduppal to inspect available units.
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
