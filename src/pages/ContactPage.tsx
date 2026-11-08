import { useState, type FormEvent } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Phone, Mail, MapPin, Calendar, CheckCircle2, ArrowRight, ShieldCheck, Clock } from 'lucide-react'

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    config: '3 BHK Joint-Family Villa',
    purpose: 'Buying Resale',
    preferredDate: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-white text-navy font-sans selection:bg-hotpink selection:text-white">
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-16 bg-soft border-b border-border text-center">
        <div className="mx-auto max-w-4xl px-6 space-y-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-hotpink/10 px-3.5 py-1 text-xs font-bold text-hotpink">
            Official Community Desk
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-navy font-display tracking-tight">
            Schedule a Private Visit
          </h1>
          <p className="text-sm sm:text-base text-slate-grey max-w-xl mx-auto leading-relaxed">
            Experience the 14-acre gated township, completed independent villas, and central clubhouse in person.
          </p>
        </div>
      </section>

      {/* Main Section */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-12 lg:grid-cols-12 items-start">
            
            {/* Left Column: Direct Info */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-navy font-display">Tirumala Meadows</h2>
                <p className="text-xs text-hotpink font-semibold uppercase tracking-wider mt-0.5">
                  Gated Villa Township · Uppal / Boduppal
                </p>
                <p className="text-sm text-slate-grey mt-3 leading-relaxed">
                  Our resident association and verified representative desk helps prospective homeowners schedule guided township walkthroughs and explore verified resale units.
                </p>
              </div>

              <div className="rounded-2xl bg-soft border border-border p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-xl bg-white border border-border flex items-center justify-center text-hotpink shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-navy uppercase tracking-wider">Site Location</p>
                    <p className="text-xs sm:text-sm text-slate-grey mt-0.5 leading-relaxed">
                      Thirumala Meadows Colony, Hema Nagar, Chilakanagar, Uppal / Boduppal, Hyderabad 500039
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-xl bg-white border border-border flex items-center justify-center text-hotpink shrink-0">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-navy uppercase tracking-wider">Direct Call</p>
                    <a href="tel:+919700760120" className="text-xs sm:text-sm font-semibold text-navy hover:text-hotpink transition mt-0.5 block">
                      +91 97007 60120
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-xl bg-white border border-border flex items-center justify-center text-hotpink shrink-0">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-navy uppercase tracking-wider">Visiting Hours</p>
                    <p className="text-xs sm:text-sm text-slate-grey mt-0.5">
                      Daily: 9:00 AM – 6:30 PM (Prior appointment recommended)
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-border p-5 text-xs text-slate-grey space-y-2">
                <div className="flex items-center gap-2 font-bold text-navy">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  <span>100% Completed Gated Community</span>
                </div>
                <p className="leading-relaxed">
                  Developed by Mansani Constructions Pvt Ltd. All infrastructure, internal roads, clubhouse, and electricity lines are fully operational.
                </p>
              </div>
            </div>

            {/* Right Column: Clean Form */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl border border-border bg-white p-7 sm:p-10 shadow-[0_12px_40px_rgba(16,29,54,0.06)]">
                {submitted ? (
                  <div className="text-center py-10 space-y-4">
                    <div className="h-16 w-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                      <CheckCircle2 className="h-8 w-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-navy font-display">Appointment Request Recorded</h3>
                    <p className="text-sm text-slate-grey max-w-md mx-auto">
                      Thank you, <strong className="text-navy">{form.name || 'Valued Visitor'}</strong>. Our representative will contact you at <strong className="text-navy">{form.phone}</strong> to confirm your site visit.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-4 rounded-full border border-border bg-soft px-6 py-2.5 text-xs font-bold text-navy hover:bg-white transition"
                    >
                      Book Another Appointment
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="mb-2">
                      <h3 className="text-xl font-bold text-navy font-display">Inquire or Book Appointment</h3>
                      <p className="text-xs text-slate-grey mt-0.5">Fill out your details below and our team will get in touch.</p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-bold text-navy mb-1.5 uppercase tracking-wide">
                          Full Name <span className="text-hotpink">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Ramesh Varma"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="w-full rounded-xl border border-border bg-soft px-4 py-2.5 text-xs sm:text-sm text-navy focus:bg-white focus:border-navy focus:outline-none transition"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-navy mb-1.5 uppercase tracking-wide">
                          Phone Number <span className="text-hotpink">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="e.g. +91 98765 43210"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          className="w-full rounded-xl border border-border bg-soft px-4 py-2.5 text-xs sm:text-sm text-navy focus:bg-white focus:border-navy focus:outline-none transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-navy mb-1.5 uppercase tracking-wide">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="e.g. ramesh@example.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full rounded-xl border border-border bg-soft px-4 py-2.5 text-xs sm:text-sm text-navy focus:bg-white focus:border-navy focus:outline-none transition"
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-bold text-navy mb-1.5 uppercase tracking-wide">
                          Villa Configuration
                        </label>
                        <select
                          value={form.config}
                          onChange={(e) => setForm({ ...form, config: e.target.value })}
                          className="w-full rounded-xl border border-border bg-soft px-4 py-2.5 text-xs sm:text-sm text-navy focus:bg-white focus:border-navy focus:outline-none transition"
                        >
                          <option>2 BHK Premium Villa</option>
                          <option>3 BHK Joint-Family Villa</option>
                          <option>4 BHK Luxury Villa</option>
                          <option>Any Configuration</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-navy mb-1.5 uppercase tracking-wide">
                          Preferred Date
                        </label>
                        <input
                          type="date"
                          value={form.preferredDate}
                          onChange={(e) => setForm({ ...form, preferredDate: e.target.value })}
                          className="w-full rounded-xl border border-border bg-soft px-4 py-2.5 text-xs sm:text-sm text-navy focus:bg-white focus:border-navy focus:outline-none transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-navy mb-1.5 uppercase tracking-wide">
                        Inquiry Purpose
                      </label>
                      <select
                        value={form.purpose}
                        onChange={(e) => setForm({ ...form, purpose: e.target.value })}
                        className="w-full rounded-xl border border-border bg-soft px-4 py-2.5 text-xs sm:text-sm text-navy focus:bg-white focus:border-navy focus:outline-none transition"
                      >
                        <option>Buying Resale Villa</option>
                        <option>Renting Villa</option>
                        <option>General Community Inquiry</option>
                      </select>
                    </div>

                    <div className="pt-3">
                      <button
                        type="submit"
                        className="w-full rounded-full bg-hotpink py-3.5 text-sm font-bold text-white shadow-[0_6px_20px_rgba(247,37,133,0.32)] hover:bg-hotpink-hover hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2"
                      >
                        <Calendar className="h-4 w-4" />
                        <span>Confirm Visit Appointment</span>
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

      <Footer />
    </div>
  )
}

