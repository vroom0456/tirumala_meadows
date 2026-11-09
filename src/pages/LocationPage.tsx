import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import {
  MapPin,
  Train,
  GraduationCap,
  Hospital,
  Briefcase,
  Film,
  ArrowRight,
  Compass,
  Car,
  Bike,
  Clock,
  Navigation,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react'

const destinations = [
  {
    id: 'jubilee-checkpost',
    name: 'Jubilee Hills Check Post Metro',
    category: 'Metro & Transit',
    distanceKm: 1.8,
    times: { metro: '3 Mins', drive: '4 Mins', bike: '3 Mins' },
    note: 'Blue Line terminal connecting directly to Ameerpet, Secunderabad, and HITEC City.',
  },
  {
    id: 'road-36',
    name: 'Road No. 36 Commercial Strip',
    category: 'Luxury Retail & Dining',
    distanceKm: 0.8,
    times: { metro: '2 Mins', drive: '3 Mins', bike: '2 Mins' },
    note: 'Hyderabad’s premier avenue for international flagship boutiques and fine dining.',
  },
  {
    id: 'apollo-jubilee',
    name: 'Apollo Hospitals Jubilee Hills',
    category: 'Healthcare',
    distanceKm: 3.2,
    times: { metro: '6 Mins', drive: '8 Mins', bike: '6 Mins' },
    note: 'World-renowned multispecialty hospital with 24/7 advanced cardiac and emergency trauma care.',
  },
  {
    id: 'durgam-cheruvu',
    name: 'Durgam Cheruvu Cable Bridge',
    category: 'Arterial Corridor',
    distanceKm: 4.2,
    times: { metro: '8 Mins', drive: '10 Mins', bike: '7 Mins' },
    note: 'Direct high-speed arterial bridge connecting Jubilee Hills to Mindspace & Knowledge City.',
  },
  {
    id: 'inorbit-mall',
    name: 'Inorbit Mall & HITEC City IT Corridor',
    category: 'Employment & Tech Zone',
    distanceKm: 5.6,
    times: { metro: '11 Mins', drive: '14 Mins', bike: '10 Mins' },
    note: 'Core financial and technology park housing Microsoft, Google, and Amazon headquarters.',
  },
  {
    id: 'hps-school',
    name: 'Hyderabad Public School & Chirec',
    category: 'Elite Education',
    distanceKm: 4.5,
    times: { metro: '9 Mins', drive: '11 Mins', bike: '8 Mins' },
    note: 'Top-tier international baccalaureate and heritage CBSE schooling campuses.',
  },
]

export default function LocationPage() {
  const [selectedDestId, setSelectedDestId] = useState('jubilee-checkpost')
  const [mode, setMode] = useState<'metro' | 'drive' | 'bike'>('drive')

  const currentDest = destinations.find((d) => d.id === selectedDestId) || destinations[0]

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
            <span>Jubilee Hills, Hyderabad · 500 034</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-navy tracking-tight">
            Strategic Location & Map
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-xl mx-auto leading-relaxed">
            Registered Address: Road No. 36 & 45 Enclave, Jubilee Hills, Hyderabad — effortlessly connected to major tech parks, transit metro stations, and healthcare hubs.
          </p>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════ */}
      {/* 1. INTERACTIVE GOOGLE MAP EMBED (Transferred to Location Page)    */}
      {/* ═════════════════════════════════════════════════════════════════ */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-md flex flex-col">
            <iframe
              title="Tirumala Meadows Location Jubilee Hills Hyderabad"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15226.398679116717!2d78.39704257850882!3d17.430983633857503!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9158f201b205%3A0x11bbe7be7792411b!2sJubilee%20Hills%2C%20Hyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              className="w-full h-[400px] sm:h-[480px] border-0"
              loading="lazy"
              allowFullScreen
            />
            <div className="p-4 sm:p-5 bg-navy text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <p className="text-xs sm:text-sm font-bold">Registered Office: Jubilee Hills, Hyderabad (500 034)</p>
                <p className="text-[11px] text-slate-300">Prime Road No. 36 & 45 Arterial Corridor</p>
              </div>
              <a
                href="https://maps.google.com/?q=Jubilee+Hills+Hyderabad"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-brandLogo-red text-white px-5 py-2 text-xs font-bold uppercase tracking-wider hover:bg-red-700 transition self-start sm:self-auto shrink-0 shadow-sm"
              >
                <Navigation className="h-3.5 w-3.5" />
                <span>Open in Google Maps</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════ */}
      {/* 2. INTERACTIVE COMMUTE ESTIMATOR                                  */}
      {/* ═════════════════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 bg-soft border-b border-slate-200">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brandLogo-blue">
              Commute Intelligence
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-navy mt-1">
              Calculate Your Daily Travel Time
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1.5">
              Select key landmarks and transport modes to view verified transit durations from Tirumala Meadows Jubilee Hills.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-12 items-start">
            
            {/* Left: Destination List */}
            <div className="lg:col-span-6 space-y-2.5">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 font-display">
                Select Destination
              </p>
              {destinations.map((d) => (
                <div
                  key={d.id}
                  onClick={() => setSelectedDestId(d.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    selectedDestId === d.id
                      ? 'border-navy bg-navy text-white shadow-md'
                      : 'border-slate-200 bg-white hover:bg-slate-50 text-navy shadow-2xs'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold font-display">{d.name}</p>
                      <p className={`text-[11px] mt-0.5 ${selectedDestId === d.id ? 'text-slate-300' : 'text-slate-500'}`}>
                        {d.category} · {d.distanceKm} km
                      </p>
                    </div>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                      selectedDestId === d.id
                        ? 'bg-brandLogo-red text-white'
                        : 'bg-slate-100 text-navy'
                    }`}>
                      {d.times[mode]}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Dynamic Calculation Result */}
            <div className="lg:col-span-6">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 space-y-6 shadow-sm">
                {/* Vehicle Mode Switcher */}
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-navy font-display mb-2">
                    Transport Mode
                  </p>
                  <div className="grid grid-cols-3 gap-2 p-1.5 rounded-full bg-slate-100 border border-slate-200">
                    {[
                      { id: 'drive', label: 'Car / Drive', icon: Car },
                      { id: 'metro', label: 'Metro', icon: Train },
                      { id: 'bike', label: 'Bike', icon: Bike },
                    ].map((m) => {
                      const Icon = m.icon
                      return (
                        <button
                          key={m.id}
                          onClick={() => setMode(m.id as any)}
                          className={`flex items-center justify-center gap-1.5 py-2 rounded-full text-xs font-semibold transition ${
                            mode === m.id
                              ? 'bg-navy text-white shadow-xs font-bold'
                              : 'text-slate-600 hover:text-navy'
                          }`}
                        >
                          <Icon className="h-3.5 w-3.5 text-brandLogo-red" />
                          <span>{m.label}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Big Result Display */}
                <div className="rounded-2xl bg-slate-50 border border-slate-200 p-6 text-center space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Estimated Commute</span>
                  <p className="text-4xl sm:text-5xl font-extrabold text-navy font-display">
                    {currentDest.times[mode]}
                  </p>
                  <p className="text-xs text-brandLogo-blue font-bold">
                    Distance: {currentDest.distanceKm} km from Jubilee Hills Hub
                  </p>
                </div>

                <div className="space-y-3 text-xs text-slate-700 leading-relaxed font-medium">
                  <div className="rounded-xl bg-slate-50 border border-slate-200 p-3.5">
                    <strong className="text-navy block mb-0.5 font-display">Route Overview:</strong>
                    <span>{currentDest.note}</span>
                  </div>

                  {/* Advantage Tag */}
                  <div className="rounded-xl bg-blue-50 border border-blue-200 p-3.5 flex items-start gap-2.5 text-blue-900 font-medium">
                    <CheckCircle2 className="h-4 w-4 text-brandLogo-blue shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-navy font-bold">Strategic Western Hyderabad Advantage:</strong>
                      <span>
                        Direct arterial connectivity through Durgam Cheruvu bridge and Outer Ring Road saves substantial commute time.
                      </span>
                    </div>
                  </div>
                </div>

                <a
                  href="https://maps.google.com/?q=Jubilee+Hills+Hyderabad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-navy py-3 text-xs font-bold text-white hover:bg-navy-light transition shadow-xs uppercase tracking-wider"
                >
                  <Compass className="h-4 w-4 text-brandLogo-red" />
                  <span>Get Live Directions in Google Maps</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Proximity Grid */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center mb-8">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brandLogo-red">
              Civic Infrastructure
            </span>
            <h3 className="text-2xl font-bold text-navy font-display mt-1">
              Key Proximity Landmarks
            </h3>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: 'Jubilee Hills Check Post Metro', dist: '1.8 km', sub: 'Blue Line Corridor' },
              { title: 'Apollo Hospitals Jubilee Hills', dist: '3.2 km', sub: '24/7 Multispecialty' },
              { title: 'Road No. 36 Commercial Enclave', dist: '0.8 km', sub: 'High-end Dining & Retail' },
              { title: 'Oakridge / Chirec International', dist: '5.1 km', sub: 'Elite Academic Institutions' },
              { title: 'Durgam Cheruvu Cable Bridge', dist: '4.2 km', sub: 'Direct HITEC City Arterial' },
              { title: 'Inorbit Mall & Knowledge City', dist: '5.6 km', sub: 'Financial & IT Epicentre' },
            ].map((p, i) => (
              <div key={i} className="rounded-2xl bg-white border border-slate-200 p-4 flex items-center justify-between shadow-2xs">
                <div>
                  <p className="text-sm font-bold text-navy font-display">{p.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5 font-medium">{p.sub}</p>
                </div>
                <span className="text-xs font-bold text-navy bg-slate-100 rounded-full px-2.5 py-1 border border-slate-200">
                  {p.dist}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Land Parcels & Western Telangana Corridors */}
      <section className="py-16 bg-soft border-t border-slate-200">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-brandLogo-blue uppercase tracking-wider">
              Strategic Land Bank & Future Growth
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-navy font-display mt-1">
              Active Acquisitions Across Western Telangana
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 font-medium">
              3,000+ acres facilitated across high-growth corridors by Tirumala Meadows Private Limited.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 text-center">
            {[
              { hub: 'Jubilee Hills', desc: 'Registered Headquarters & 30+ Luxury Completed Villas', tag: 'Legacy Epicentre' },
              { hub: 'Kollur', desc: 'Rapidly expanding IT growth corridor near ORR', tag: 'High Growth Node' },
              { hub: 'Velimala', desc: 'Exclusive plotted & villa acreage developments', tag: 'Luxury Zone' },
              { hub: 'Shankarpally', desc: 'Picturesque green belt layout facilitation', tag: 'Scenic Acreage' },
              { hub: 'Vikarabad', desc: 'Emerging wellness, eco-resort & land investment hub', tag: 'Eco Corridor' },
            ].map((node, i) => (
              <div key={i} className="rounded-2xl border border-slate-200 bg-white p-5 hover:shadow-sm transition shadow-2xs">
                <span className="text-[10px] font-bold text-brandLogo-red uppercase tracking-wider block mb-1">
                  {node.tag}
                </span>
                <p className="text-base font-bold text-navy font-display">{node.hub}</p>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed font-medium">{node.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
