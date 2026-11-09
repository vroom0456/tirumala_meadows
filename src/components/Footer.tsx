import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, ArrowUpRight, Award, ShieldCheck, MessageSquare, Clock, Calculator, TrendingUp } from 'lucide-react'
import TirumalaLogo from './TirumalaLogo'

const footLinks = [
  { to: '/', label: 'Overview & Legacy' },
  { to: '/villas', label: 'Villas & 3D Studio' },
  { to: '/amenities', label: 'In-House Luxury' },
  { to: '/location', label: 'Location & Map' },
  { to: '/contact', label: 'Corporate Office' },
]

const financialLinks = [
  { to: '/emi-calculator', label: 'Home Loan EMI Calculator' },
  { to: '/roi-calculator', label: 'ROI & Wealth Engine' },
  { to: '/resident', label: 'Resident Private Hub' },
  { to: '/contact', label: 'Banking Desk Consultation' },
]

export default function Footer() {
  const whatsappUrl = `https://wa.me/919550828688?text=${encodeURIComponent(
    'Hello Tirumala Meadows, I would like to inquire about your luxury properties in Jubilee Hills, Hyderabad.'
  )}`

  return (
    <footer className="bg-navy text-white relative border-t border-white/10 pt-16 pb-12 selection:bg-brandLogo-blue selection:text-white">
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-12 pb-12 border-b border-white/10">
          {/* Brand Column (4 cols) */}
          <div className="space-y-4 lg:col-span-4">
            <TirumalaLogo textColor="text-white" showCorporate={true} />
            <p className="text-xs sm:text-sm font-semibold tracking-wide text-white/90 font-display">
              Quality For The Best Living
            </p>
            <p className="text-xs sm:text-sm leading-relaxed max-w-md text-white/70 font-normal">
              For over 28 years, Tirumala Meadows Private Limited has delivered architectural distinction and refined living across 30+ exclusive luxury residential villas, particularly in Jubilee Hills, Hyderabad.
            </p>

            <div className="pt-2 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-navy-surface border border-white/15 px-3 py-1 text-xs font-semibold text-white/90">
                <span className="h-2 w-2 rounded-full bg-brandLogo-green" />
                28+ Years of Excellence
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-navy-surface border border-white/15 px-3 py-1 text-xs font-semibold text-white/90">
                <Award className="h-3.5 w-3.5 text-brandLogo-red" />
                3,000+ Acres Facilitated
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-navy-surface border border-white/15 px-3 py-1 text-xs font-semibold text-white/90">
                <ShieldCheck className="h-3.5 w-3.5 text-blue-400" />
                Clear Title Documentation
              </span>
            </div>
          </div>

          {/* Quick Links Column (2 cols) */}
          <div className="lg:col-span-2">
            <p className="text-xs font-bold text-white uppercase tracking-[0.16em] mb-4 font-display flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-brandLogo-red" />
              Navigation
            </p>
            <ul className="space-y-2">
              {footLinks.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-xs sm:text-sm text-white/70 hover:text-white transition-colors flex items-center justify-between group py-1 border-b border-white/5"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">{l.label}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-white/40 group-hover:text-white transition" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Financial & Tools Column (2 cols) */}
          <div className="lg:col-span-2">
            <p className="text-xs font-bold text-white uppercase tracking-[0.16em] mb-4 font-display flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-brandLogo-green" />
              Financial Tools
            </p>
            <ul className="space-y-2">
              {financialLinks.map((l) => (
                <li key={l.to + l.label}>
                  <Link
                    to={l.to}
                    className="text-xs sm:text-sm text-white/70 hover:text-white transition-colors flex items-center justify-between group py-1 border-b border-white/5"
                  >
                    <span className="group-hover:translate-x-1 transition-transform">{l.label}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-white/40 group-hover:text-white transition" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Desk Column (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <p className="text-xs font-bold text-white uppercase tracking-[0.16em] mb-4 font-display flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-brandLogo-blue" />
              Corporate Office & Concierge
            </p>

            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-navy-surface border border-white/10">
                <MapPin className="h-4 w-4 text-brandLogo-red shrink-0 mt-0.5" />
                <div>
                  <p className="text-[11px] font-bold text-white uppercase tracking-wider">Registered Office</p>
                  <p className="text-white/80 mt-0.5 font-medium leading-snug">
                    Road No. 36 & 45 Enclave, Jubilee Hills, Hyderabad – 500 034, Telangana, India
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <a
                  href="tel:+919550828688"
                  className="flex items-center gap-2.5 p-2.5 rounded-xl bg-navy-surface border border-white/10 hover:border-white/30 transition group"
                >
                  <Phone className="h-4 w-4 text-blue-400 shrink-0 group-hover:scale-110 transition-transform" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-white/60 block">Direct Line</span>
                    <span className="text-xs font-bold text-white group-hover:text-blue-300 transition">+91 95508 28688</span>
                  </div>
                </a>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 p-2.5 rounded-xl bg-navy-surface border border-white/10 hover:border-emerald-500/50 transition group"
                >
                  <MessageSquare className="h-4 w-4 text-brandLogo-green shrink-0 group-hover:scale-110 transition-transform" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-white/60 block">Instant Chat</span>
                    <span className="text-xs font-bold text-white group-hover:text-emerald-300 transition">WhatsApp Desk</span>
                  </div>
                </a>
              </div>

              <div className="flex items-center gap-2 px-3 py-1.5 text-white/70 text-xs">
                <Clock className="h-3.5 w-3.5 text-white/60 shrink-0" />
                <span>Executive Concierge: Mon – Sat, 9:30 AM – 7:30 PM IST</span>
              </div>
            </div>
          </div>
        </div>

        {/* Corporate Motto Bar */}
        <div className="my-10 p-5 rounded-2xl bg-navy-surface border border-white/10 text-center shadow-lg">
          <p className="text-xs sm:text-sm font-bold tracking-[0.14em] text-white font-display uppercase leading-relaxed">
            We’re Busy Round the Clock CREATING LANDMARKS. BUILDING VALUE & WEALTH.
          </p>
          <p className="text-[11px] text-white/60 mt-1">
            Tirumala Meadows Private Limited · Shaping Hyderabad's Ultra-Luxury Residential Skyline
          </p>
        </div>

        {/* Copyright & Disclaimer Bar */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/60">
          <p className="font-normal text-center sm:text-left">
            © {new Date().getFullYear()} <strong className="text-white font-semibold">Tirumala Meadows Private Limited</strong>. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-white/60 text-[11px]">
            <span>CIN & Title Scrutiny Compliant</span>
            <span>·</span>
            <span>Jubilee Hills, Hyderabad (500 034)</span>
            <span>·</span>
            <span className="text-white/80">RERA Verified</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
