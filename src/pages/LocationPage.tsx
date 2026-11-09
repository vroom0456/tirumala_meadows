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
  Sparkles,
  Leaf
} from 'lucide-react'

const destinations = [
  {
    id: 'habsiguda-metro',
    name: 'Habsiguda Metro Station',
    category: 'Metro & Transit',
    distanceKm: 2.0,
    times: { metro: '4 Mins', drive: '6 Mins', bike: '5 Mins' },
    note: 'Blue Line terminal connecting directly to Secunderabad, Ameerpet, and Jubilee Hills.',
  },
  {
    id: 'uppal-metro',
    name: 'Uppal Metro Station',
    category: 'Metro & Transit',
    distanceKm: 2.8,
    times: { metro: '6 Mins', drive: '8 Mins', bike: '6 Mins' },
    note: 'Major metro interchange with ample parking and feeder bus connections.',
  },
  {
    id: 'genpact-uppal',
    name: 'Genpact Uppal Campus',
    category: 'Employment Hub',
    distanceKm: 3.5,
    times: { metro: '8 Mins', drive: '9 Mins', bike: '7 Mins' },
    note: 'Major IT/ITES campus with over 15,000 corporate professionals.',
  },
  {
    id: 'ida-nacharam',
    name: 'IDA Nacharam Industrial & Tech Zone',
    category: 'Employment Hub',
    distanceKm: 1.5,
    times: { metro: '3 Mins', drive: '5 Mins', bike: '4 Mins' },
    note: 'Premier manufacturing and engineering hub in East Hyderabad.',
  },
  {
    id: 'hps-ramanthapur',
    name: 'Hyderabad Public School (HPS Ramanthapur)',
    category: 'Schools & Colleges',
    distanceKm: 4.2,
    times: { metro: '10 Mins', drive: '11 Mins', bike: '9 Mins' },
    note: 'Iconic heritage institution offering premium CBSE education.',
  },
  {
    id: 'matrix-hospital',
    name: 'Matrix Hospital Ramanthapur',
    category: 'Healthcare',
    distanceKm: 2.2,
    times: { metro: '5 Mins', drive: '6 Mins', bike: '5 Mins' },
    note: '24/7 multispecialty emergency and trauma healthcare center.',
  },
]

export default function LocationPage() {
  const [selectedDestId, setSelectedDestId] = useState('habsiguda-metro')
  const [mode, setMode] = useState<'metro' | 'drive' | 'bike'>('drive')

  const currentDest = destinations.find((d) => d.id === selectedDestId) || destinations[0]

  return (
    <div className="min-h-screen bg-white text-navy font-sans selection:bg-hotpink selection:text-white">
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-14 bg-soft border-b border-border text-center">
        <div className="mx-auto max-w-4xl px-6 space-y-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-navy/5 px-3.5 py-1 text-xs font-bold text-navy">
            Prime East Hyderabad Connectivity
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-navy font-display tracking-tight">
            Connected to Everything
          </h1>
          <p className="text-sm sm:text-base text-slate-grey max-w-xl mx-auto leading-relaxed">
            Thirumala Meadows Colony, Hema Nagar, Chilakanagar, Uppal / Boduppal, Hyderabad.
          </p>
        </div>
      </section>

      {/* ═════════════════════════════════════════════════════════════════ */}
      {/* UNIQUE FEATURE FOR PRESENTATION: Interactive Commute Estimator    */}
      {/* ═════════════════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 bg-white border-b border-border">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-flex items-center gap-1 rounded-full bg-hotpink/10 px-3 py-0.5 text-xs font-bold text-hotpink">
              Interactive Commute Simulator
            </span>
            <h2 className="text-3xl font-bold text-navy font-display mt-2">
              Calculate Your Daily Travel Time
            </h2>
            <p className="text-xs sm:text-sm text-slate-grey mt-1.5">
              Select your daily destination and vehicle mode to see exact verified travel times from Tirumala Meadows.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-12 items-start">
            
            {/* Left: Destination List */}
            <div className="lg:col-span-6 space-y-2.5">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-grey mb-3 font-display">
                Select Destination
              </p>
              {destinations.map((d) => (
                <div
                  key={d.id}
                  onClick={() => setSelectedDestId(d.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                    selectedDestId === d.id
                      ? 'border-navy bg-navy text-white shadow-md'
                      : 'border-border bg-soft hover:bg-white text-navy'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold font-display">{d.name}</p>
                      <p className={`text-[11px] mt-0.5 ${selectedDestId === d.id ? 'text-white/70' : 'text-slate-grey'}`}>
                        {d.category} · {d.distanceKm} km
                      </p>
                    </div>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                      selectedDestId === d.id
                        ? 'bg-hotpink text-white'
                        : 'bg-white border border-border text-navy'
                    }`}>
                      {d.times[mode]}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Dynamic Calculation Result */}
            <div className="lg:col-span-6">
              <div className="rounded-3xl border border-border bg-soft p-6 sm:p-8 space-y-6">
                {/* Vehicle Mode Switcher */}
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-navy font-display mb-2">
                    Transport Mode
                  </p>
                  <div className="grid grid-cols-3 gap-2 p-1.5 rounded-full bg-white border border-border">
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
                              ? 'bg-navy text-white shadow-xs'
                              : 'text-slate-grey hover:text-navy'
                          }`}
                        >
                          <Icon className="h-3.5 w-3.5 text-hotpink" />
                          <span>{m.label}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Big Result Display */}
                <div className="rounded-2xl bg-white border border-border p-6 text-center space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-grey">Estimated Commute</span>
                  <p className="text-4xl sm:text-5xl font-extrabold text-navy font-display">
                    {currentDest.times[mode]}
                  </p>
                  <p className="text-xs text-hotpink font-bold">
                    Distance: {currentDest.distanceKm} km from colony gate
                  </p>
                </div>

                <div className="space-y-3 text-xs text-slate-grey leading-relaxed">
                  <div className="rounded-xl bg-white border border-border p-3.5">
                    <strong className="text-navy block mb-0.5 font-display">Route Overview:</strong>
                    <span>{currentDest.note}</span>
                  </div>

                  {/* Eco Comparison Tag */}
                  <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3.5 flex items-start gap-2.5 text-emerald-800">
                    <Leaf className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-emerald-900 font-bold">East Hyderabad Commute Advantage:</strong>
                      <span>
                        Saves an estimated 45–60 minutes daily compared to congested West Hyderabad corridors, reducing personal carbon footprint.
                      </span>
                    </div>
                  </div>
                </div>

                <a
                  href="https://maps.google.com/?q=Tirumala+Meadows+Uppal+Hyderabad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-navy py-3 text-xs font-bold text-white hover:bg-navy-surface transition"
                >
                  <Compass className="h-4 w-4 text-hotpink" />
                  <span>Open Colony in Google Maps</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Proximity Grid */}
      <section className="py-16 bg-soft">
        <div className="mx-auto max-w-6xl px-6">
          <h3 className="text-xl font-bold text-navy font-display mb-6 text-center">
            Key Proximity Landmarks
          </h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: 'Habsiguda Metro Station', dist: '1.5 km', sub: 'Blue Line Terminal' },
              { title: 'Uppal Metro Station', dist: '2.8 km', sub: 'Interchange Junction' },
              { title: 'Warangal National Highway', dist: 'Immediate', sub: 'Direct Arterial Access' },
              { title: 'Delhi Public School (DPS)', dist: '3.5 km', sub: 'Nacharam Campus' },
              { title: 'Matrix & TX Hospitals', dist: '2.2 km', sub: '24/7 Multispecialty' },
              { title: 'Secunderabad Railway Station', dist: '9.0 km', sub: 'Direct Express Line' },
            ].map((p, i) => (
              <div key={i} className="rounded-2xl bg-white border border-border p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-navy font-display">{p.title}</p>
                  <p className="text-xs text-slate-grey mt-0.5">{p.sub}</p>
                </div>
                <span className="text-xs font-bold text-hotpink bg-hotpink/10 rounded-full px-2.5 py-1">
                  {p.dist}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Land Parcels & Western Telangana Corridors */}
      <section className="py-16 bg-white border-t border-border">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold text-hotpink uppercase tracking-wider">
              Strategic Land Bank & Future Growth
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-navy font-display mt-1">
              Active Acquisitions Across Western Telangana
            </h3>
            <p className="text-xs sm:text-sm text-slate-grey mt-2">
              Our focus is on strategically positioned land parcels with strong long-term development potential.
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
              <div key={i} className="rounded-2xl border border-border bg-soft p-5 hover:bg-white hover:shadow-corporate transition">
                <span className="text-[10px] font-bold text-hotpink uppercase tracking-wider block mb-1">
                  {node.tag}
                </span>
                <p className="text-base font-bold text-navy font-display">{node.hub}</p>
                <p className="text-xs text-slate-grey mt-1 leading-relaxed">{node.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
