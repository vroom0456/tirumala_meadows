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
    <div className="min-h-screen bg-soft text-navy font-sans selection:bg-brandLogo-blue selection:text-white">
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-14 bg-soft border-b border-slate-200 text-center">
        <div className="mx-auto max-w-4xl px-6 space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full bg-white border border-slate-200 px-3.5 py-1 text-xs font-bold text-navy uppercase tracking-wider shadow-2xs">
            <span className="flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-brandLogo-red" />
              <span className="h-1.5 w-1.5 rounded-full bg-brandLogo-blue" />
              <span className="h-1.5 w-1.5 rounded-full bg-brandLogo-green" />
            </span>
            <span>Official Corporate Desk</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-navy tracking-tight">
            Schedule a Private Visit
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-xl mx-auto leading-relaxed">
            Experience our completed luxury villas in Jubilee Hills and explore landmark plotted developments.
          </p>
        </div>
      </section>

      {/* Main Section */}
      <section className="py-16 sm:py-20 bg-soft">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-12 lg:grid-cols-12 items-start">
            
            {/* Left Column: Direct Info */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-navy font-display">Tirumala Meadows Private Limited</h2>
                <p className="text-xs text-brandLogo-red font-bold uppercase tracking-wider mt-0.5">
                  Corporate Office & Project Inquiries · Jubilee Hills, Hyderabad
                </p>
                <p className="text-sm text-slate-600 mt-3 leading-relaxed font-medium">
                  For over 28 years, Tirumala Meadows Private Limited has delivered architectural distinction across 30+ exclusive villas. Our corporate desk assists prospective homeowners, institutional partners, and investors.
                </p>
              </div>

              <div className="rounded-2xl bg-white border border-slate-200 p-6 space-y-4 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-navy shrink-0">
                    <MapPin className="h-5 w-5 text-brandLogo-red" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-navy uppercase tracking-wider">Registered Corporate Address</p>
                    <p className="text-xs sm:text-sm text-slate-600 mt-0.5 leading-relaxed font-medium">
                      Road No. 36 & 45 Enclave, Jubilee Hills, Hyderabad (500 034), Telangana, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-navy shrink-0">
                    <Phone className="h-5 w-5 text-brandLogo-blue" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-navy uppercase tracking-wider">Direct Corporate Desk</p>
                    <a href="tel:+919550828688" className="text-xs sm:text-sm font-bold text-navy hover:text-brandLogo-blue transition mt-0.5 block">
                      +91 95508 28688
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-navy shrink-0">
                    <Mail className="h-5 w-5 text-brandLogo-green" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-navy uppercase tracking-wider">Official Email</p>
                    <a href="mailto:info@tirumalameadows.com" className="text-xs sm:text-sm font-bold text-navy hover:text-brandLogo-blue transition mt-0.5 block">
                      info@tirumalameadows.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-navy shrink-0">
                    <Clock className="h-5 w-5 text-slate-500" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-navy uppercase tracking-wider">Office Hours</p>
                    <p className="text-xs sm:text-sm text-slate-600 mt-0.5 font-medium">
                      Monday – Saturday: 9:30 AM – 7:30 PM (Prior appointment recommended)
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 text-xs text-slate-600 space-y-2 shadow-2xs">
                <div className="flex items-center gap-2 font-bold text-navy">
                  <ShieldCheck className="h-4 w-4 text-brandLogo-green" />
                  <span>28 Years of Real Estate Excellence</span>
                </div>
                <p className="leading-relaxed font-medium">
                  Tirumala Meadows Private Limited. In-House Architects, In-House Interior Designers, In-House Technology Team & In-House Engineers.
                </p>
              </div>
            </div>

            {/* Right Column: Clean Form */}
            <div className="lg:col-span-7">
              <div className="rounded-3xl border border-slate-200 bg-white p-7 sm:p-10 shadow-sm">
                {submitted ? (
                  <div className="text-center py-10 space-y-4">
                    <div className="h-16 w-16 rounded-full bg-emerald-50 text-brandLogo-green flex items-center justify-center mx-auto border border-emerald-300">
                      <CheckCircle2 className="h-8 w-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-navy font-display">Appointment Request Recorded</h3>
                    <p className="text-sm text-slate-600 max-w-md mx-auto font-medium">
                      Thank you, <strong className="text-navy">{form.name || 'Valued Visitor'}</strong>. Our representative will contact you at <strong className="text-navy">{form.phone}</strong> to confirm your site visit.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-4 rounded-full border border-slate-200 bg-slate-50 px-6 py-2.5 text-xs font-bold text-navy hover:bg-white transition uppercase tracking-wider"
                    >
                      Book Another Appointment
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="mb-2">
                      <h3 className="text-xl font-bold text-navy font-display">Inquire or Book Appointment</h3>
                      <p className="text-xs text-slate-500 mt-0.5 font-medium">Fill out your details below and our team will get in touch.</p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                          Full Name <span className="text-brandLogo-red">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Ramesh Varma"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs sm:text-sm text-navy focus:bg-white focus:border-navy focus:outline-none transition"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                          Phone Number <span className="text-brandLogo-red">*</span>
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="e.g. +91 98765 43210"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs sm:text-sm text-navy focus:bg-white focus:border-navy focus:outline-none transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="e.g. ramesh@example.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs sm:text-sm text-navy focus:bg-white focus:border-navy focus:outline-none transition"
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                          Villa Configuration
                        </label>
                        <select
                          value={form.config}
                          onChange={(e) => setForm({ ...form, config: e.target.value })}
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs sm:text-sm text-navy focus:bg-white focus:border-navy focus:outline-none transition"
                        >
                          <option>2 BHK Premium Villa</option>
                          <option>3 BHK Joint-Family Villa</option>
                          <option>4 BHK Luxury Villa</option>
                          <option>Any Configuration</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                          Preferred Date
                        </label>
                        <input
                          type="date"
                          value={form.preferredDate}
                          onChange={(e) => setForm({ ...form, preferredDate: e.target.value })}
                          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs sm:text-sm text-navy focus:bg-white focus:border-navy focus:outline-none transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                        Inquiry Purpose
                      </label>
                      <select
                        value={form.purpose}
                        onChange={(e) => setForm({ ...form, purpose: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs sm:text-sm text-navy focus:bg-white focus:border-navy focus:outline-none transition"
                      >
                        <option>Buying Luxury Villa</option>
                        <option>Strategic Land Parcel / Acreage</option>
                        <option>General Corporate Inquiry</option>
                      </select>
                    </div>

                    <div className="pt-3">
                      <button
                        type="submit"
                        className="w-full rounded-full bg-brandLogo-red py-3.5 text-sm font-bold text-white shadow-md hover:bg-red-700 transition-all flex items-center justify-center gap-2 uppercase tracking-wider"
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
