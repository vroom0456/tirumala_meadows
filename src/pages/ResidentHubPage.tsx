import { useState } from 'react'
import {
  Users,
  ShieldCheck,
  Calendar,
  Building2,
  Phone,
  FileText,
  Clock,
  CheckCircle2,
  Lock
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const notices = [
  {
    title: 'Clubhouse Mini Theatre Weekend Movie Screening',
    date: 'Every Saturday & Sunday · 6:30 PM',
    tag: 'Entertainment',
    desc: 'Resident family screening scheduled this weekend in the Mini Cinema. Popcorn & refreshments permitted.',
  },
  {
    title: 'Bi-Monthly Overhead Tank Cleaning & Water Testing',
    date: 'Next Tuesday · 9:00 AM - 1:00 PM',
    tag: 'Maintenance',
    desc: 'Regular scheduled disinfection and TDS water quality testing for the community water supply.',
  },
  {
    title: 'Society Annual General Body Meeting (AGM)',
    date: 'Last Sunday of the Month · 10:00 AM',
    tag: 'Society',
    desc: 'Discussion on avenue solar lighting expansion and festive celebration budget in the Conference Hall.',
  },
]

export default function ResidentHubPage() {
  const [ticketType, setTicketType] = useState('Maintenance')
  const [submitted, setSubmitted] = useState(false)

  return (
    <div className="min-h-screen bg-soft text-navy font-sans antialiased selection:bg-brandLogo-blue selection:text-white">
      <Navbar />

      {/* Hero Header */}
      <section className="bg-soft pt-32 pb-14 border-b border-slate-200 text-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 space-y-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 border border-slate-200 px-3.5 py-1 text-xs font-bold text-navy uppercase tracking-wider">
            Resident Welfare & Community Association
          </span>
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-navy">
            Tirumala Meadows Resident Hub
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
            Dedicated portal for the residents of our gated villa community. Check society announcements, view security contact numbers, or log a maintenance request.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-soft border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-12 items-start">
            
            {/* Left Column: Notices & Emergency Contacts */}
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-xl font-bold text-forest font-display">Society Notices & Events</h2>
              
              <div className="space-y-4">
                {notices.map((n, idx) => (
                  <div key={idx} className="rounded-2xl border border-stone-200 bg-white p-6 space-y-2 shadow-2xs">
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-forest-subtle px-3 py-0.5 text-xs font-bold text-forest border border-forest/15">
                        {n.tag}
                      </span>
                      <span className="text-xs text-stone-600 font-medium">{n.date}</span>
                    </div>
                    <h3 className="text-base font-bold text-forest font-display">{n.title}</h3>
                    <p className="text-xs text-stone-700 leading-relaxed font-medium">{n.desc}</p>
                  </div>
                ))}
              </div>

              {/* Emergency Contacts Box */}
              <div className="rounded-2xl border border-stone-200 bg-white p-6 space-y-3 shadow-2xs">
                <h3 className="text-sm font-bold text-forest font-display flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-700" />
                  <span>Important Colony Contacts</span>
                </h3>
                <div className="grid sm:grid-cols-2 gap-3 text-xs">
                  <div className="bg-ivory p-3 rounded-xl border border-stone-200">
                    <p className="text-stone-600 font-medium">Main Security Gate Desk</p>
                    <p className="text-forest font-bold mt-0.5">+91 95508 28688</p>
                  </div>
                  <div className="bg-ivory p-3 rounded-xl border border-stone-200">
                    <p className="text-stone-600 font-medium">Society Management Office</p>
                    <p className="text-forest font-bold mt-0.5">+91 95508 28688</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Maintenance Helpdesk Form */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-stone-200 bg-white p-6 sm:p-8 shadow-corporate">
                <h3 className="text-lg font-bold text-forest font-display mb-1">Resident Service Desk</h3>
                <p className="text-xs text-stone-600 mb-6 font-medium">Log a request with the community facility management team.</p>

                {submitted ? (
                  <div className="text-center py-8 space-y-3">
                    <div className="h-12 w-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto border border-emerald-300">
                      <CheckCircle2 className="h-6 w-6" />
                    </div>
                    <p className="text-sm font-bold text-forest">Service Request Logged</p>
                    <p className="text-xs text-stone-700 font-medium">Your ticket has been dispatched to the society maintenance desk.</p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-2 rounded-full border border-stone-200 bg-ivory px-4 py-1.5 text-xs font-semibold text-forest hover:bg-white transition uppercase tracking-wider"
                    >
                      Log Another Request
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      setSubmitted(true)
                    }}
                    className="space-y-4 text-xs"
                  >
                    <div>
                      <label className="block font-semibold text-stone-900 mb-1 uppercase tracking-wide">Villa Number</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Villa #42, Avenue 3"
                        className="w-full rounded-xl border border-stone-200 bg-ivory px-4 py-2.5 text-xs text-stone-900 focus:bg-white focus:border-forest focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-stone-900 mb-1 uppercase tracking-wide">Resident Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. S. Venkat"
                        className="w-full rounded-xl border border-stone-200 bg-ivory px-4 py-2.5 text-xs text-stone-900 focus:bg-white focus:border-forest focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-stone-900 mb-1 uppercase tracking-wide">Contact Phone</label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 95508 28688"
                        className="w-full rounded-xl border border-stone-200 bg-ivory px-4 py-2.5 text-xs text-stone-900 focus:bg-white focus:border-forest focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-stone-900 mb-1 uppercase tracking-wide">Issue Category</label>
                      <select
                        value={ticketType}
                        onChange={(e) => setTicketType(e.target.value)}
                        className="w-full rounded-xl border border-stone-200 bg-ivory px-4 py-2.5 text-xs text-stone-900 focus:bg-white focus:border-forest focus:outline-none"
                      >
                        <option>Plumbing / Water Pressure</option>
                        <option>Electrical / Streetlight</option>
                        <option>Clubhouse / Event Booking</option>
                        <option>Security / RFID Barrier</option>
                        <option>Landscaping / Garden</option>
                        <option>General Society Inquiry</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold text-stone-900 mb-1 uppercase tracking-wide">Details</label>
                      <textarea
                        rows={3}
                        placeholder="Describe the issue or request in detail..."
                        className="w-full rounded-xl border border-stone-200 bg-ivory px-4 py-2.5 text-xs text-stone-900 focus:bg-white focus:border-forest focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full rounded-full bg-forest py-3 text-xs font-bold text-ivory hover:bg-forest-light transition shadow-xs uppercase tracking-wider"
                    >
                      Submit Service Request
                    </button>
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
