import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, ArrowUpRight, Award, ShieldCheck, Sparkles } from 'lucide-react'
import TirumalaLogo from './TirumalaLogo'

const footLinks = [
  { to: '/', label: 'Overview & Legacy' },
  { to: '/villas', label: 'Villas & 3D Studio' },
  { to: '/amenities', label: 'Integrated Luxury & Verticals' },
  { to: '/location', label: 'Strategic Land Parcels' },
  { to: '/contact', label: 'Corporate Office & Desk' },
]

export default function Footer() {
  return (
    <footer className="bg-navy text-white/70 pt-16 pb-12 border-t border-navy">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 pb-12 border-b border-white/10">
          {/* Brand */}
          <div className="space-y-4 lg:col-span-2">
            <TirumalaLogo textColor="text-white" showCorporate={true} />
            <p className="text-xs sm:text-sm font-serif italic text-white/90">
              "Quality For The Best Living"
            </p>
            <p className="text-xs sm:text-sm leading-relaxed max-w-md text-white/70">
              For over 28 years, Tirumala Meadows Private Limited has delivered architectural distinction and refined living across 30+ exclusive luxury villas, particularly in Jubilee Hills, Hyderabad.
            </p>
            <div className="pt-1 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs text-white/90">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                28 Years of Excellence
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs text-white/90">
                <Award className="h-3 w-3 text-hotpink" />
                3,000+ Acres Facilitated
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <p className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-display">Navigation</p>
            <ul className="space-y-2.5">
              {footLinks.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-xs sm:text-sm hover:text-white transition flex items-center gap-1 group">
                    <span>{l.label}</span>
                    <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-display">Corporate Office</p>
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-hotpink shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Registered Address:</p>
                  <span>Jubilee Hills - Hyderabad (500 034), Telangana, India</span>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-hotpink shrink-0" />
                <a href="tel:+919550828688" className="hover:text-white transition font-semibold text-white">
                  +91 95508 28688
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-hotpink shrink-0" />
                <span>info@tirumalameadows.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Corporate Motto Bar */}
        <div className="pt-8 pb-6 border-b border-white/10 text-center">
          <p className="text-xs sm:text-sm font-semibold tracking-wider text-white/80 font-display uppercase">
            We’re Busy Round the Clock CREATING LANDMARKS. BUILDING VALUE & WEALTH.
          </p>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>© {new Date().getFullYear()} Tirumala Meadows Private Limited. All rights reserved.</p>
          <p>Jubilee Hills · Hyderabad, Telangana (500 034)</p>
        </div>
      </div>
    </footer>
  )
}
