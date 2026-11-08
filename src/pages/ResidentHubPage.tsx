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
import AppleNavbar from '../components/AppleNavbar'
import AppleFooter from '../components/AppleFooter'

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
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white text-navy font-sans antialiased selection:bg-hotpink selection:text-white">
      <AppleNavbar onOpenVisitModal={() => setIsModalOpen(true)} />

      {/* Hero Header */}
      <section className="bg-soft py-16 border-b border-borderGrey">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-navy/5 px-3.5 py-1 text-xs font-semibold text-navy">
            Resident Welfare & Community Association
          </span>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-navy font-display">
            Mansani Thirumala Meadows Resident Hub
          </h1>
          <p className="text-sm sm:text-base text-slateGrey max-w-2xl mx-auto">
            Dedicated portal for the residents of our 14-acre gated community. Check society announcements, view security contact numbers, or log a maintenance request.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white border-b border-borderGrey">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-10 lg:grid-cols-12 items-start">
            
            {/* Left Column: Notices & Emergency Contacts */}
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-xl font-bold text-navy font-display">Society Notices & Events</h2>
              
              <div className="space-y-4">
                {notices.map((n, idx) => (
                  <div key={idx} className="luxury-card p-6 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="rounded-full bg-hotpink/10 px-3 py-0.5 text-xs font-bold text-hotpink">
                        {n.tag}
                      </span>
                      <span className="text-xs text-slateGrey font-medium">{n.date}</span>
                    </div>
                    <h3 className="text-base font-bold text-navy font-display">{n.title}</h3>
                    <p className="text-xs text-slateGrey leading-relaxed">{n.desc}</p>
                  </div>
                ))}
              </div>

              {/* Emergency Contacts Box */}
              <div className="rounded-2xl border border-borderGrey bg-soft p-6 space-y-3">
                <h3 className="text-sm font-bold text-navy font-display flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-hotpink" />
                  <span>Important Colony Contacts</span>
                </h3>
                <div className="grid sm:grid-cols-2 gap-3 text-xs">
                  <div className="bg-white p-3 rounded-xl border border-borderGrey">
                    <p className="text-slateGrey">Main Security Gate Desk</p>
                    <p className="text-navy font-bold mt-0.5">+91 97007 60120</p>
                  </div>
                  <div className="bg-white p-3 rounded-xl border border-borderGrey">
                    <p className="text-slateGrey">Society Management Office</p>
                    <p className="text-navy font-bold mt-0.5">+91 97007 60121</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Maintenance Helpdesk Form */}
            <div className="lg:col-span-5">
              <div className="luxury-card p-6 sm:p-8">
                <h3 className="text-lg font-bold text-navy font-display mb-1">Resident Service Desk</h3>
                <p className="text-xs text-slateGrey mb-6">Log a request with the community facility management team.</p>

                {submitted ? (
                  <div className="text-center py-8 space-y-3">
                    <div className="h-12 w-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="h-6 w-6" />
                    </div>
                    <p className="text-sm font-bold text-navy">Service Request Logged</p>
                    <p className="text-xs text-slateGrey">Your ticket has been dispatched to the society maintenance desk.</p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-2 rounded-full border border-borderGrey bg-soft px-4 py-1.5 text-xs font-semibold text-navy hover:bg-white transition"
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
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-xs font-semibold text-navy mb-1">Villa Number</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Villa #42, Avenue 3"
                        className="w-full rounded-xl border border-borderGrey bg-soft px-4 py-2.5 text-xs text-navy focus:bg-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-navy mb-1">Resident Name</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. S. Venkat"
                        className="w-full rounded-xl border border-borderGrey bg-soft px-4 py-2.5 text-xs text-navy focus:bg-white focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-navy mb-1">Issue Category</label>
                      <select
                        value={ticketType}
                        onChange={(e) => setTicketType(e.target.value)}
                        className="w-full rounded-xl border border-borderGrey bg-soft px-4 py-2.5 text-xs text-navy focus:bg-white focus:outline-none"
                      >
                        <option>Water Supply / Plumbing</option>
                        <option>Street Lighting / Electrical</option>
                        <option>Landscaping & Tree Pruning</option>
                        <option>Clubhouse Facility Booking</option>
                        <option>Security / RFID Barrier</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-navy mb-1">Description</label>
                      <textarea
                        rows={3}
                        required
                        placeholder="Provide details about the service needed..."
                        className="w-full rounded-xl border border-borderGrey bg-soft px-4 py-2.5 text-xs text-navy focus:bg-white focus:outline-none"
                      />
                    </div>

                    <button type="submit" className="btn-hotpink w-full py-3 text-xs font-semibold">
                      Submit Service Request
                    </button>
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
            <h3 className="text-xl font-bold text-navy font-display">Resident Support</h3>
            <p className="text-xs text-slateGrey">
              For urgent matters, call the main gate security desk at +91 97007 60120.
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
