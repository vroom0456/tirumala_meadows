import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, ArrowUpRight } from 'lucide-react'
import TirumalaLogo from './TirumalaLogo'

const footLinks = [
  { to: '/', label: 'Overview' },
  { to: '/villas', label: 'Villas & Floorplans' },
  { to: '/amenities', label: 'Clubhouse & Lifestyle' },
  { to: '/location', label: 'Location & Transit' },
  { to: '/contact', label: 'Resale & Inquiries' },
]

export default function Footer() {
  return (
    <footer className="bg-navy text-white/70 pt-16 pb-12 border-t border-navy">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 pb-12 border-b border-white/10">
          {/* Brand */}
          <div className="space-y-4 lg:col-span-2">
            <TirumalaLogo textColor="text-white" />
            <p className="text-xs sm:text-sm leading-relaxed max-w-md text-white/70">
              A thoughtfully planned 14-acre gated villa community in East Hyderabad. 100% completed independent duplex living blending urban connectivity with green family serenity.
            </p>
            <div className="pt-1">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs text-white/80">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Developed by Mansani Constructions Pvt Ltd
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
            <p className="text-xs font-bold text-white uppercase tracking-wider mb-4 font-display">Community Desk</p>
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-hotpink shrink-0 mt-0.5" />
                <span>Thirumala Meadows Colony, Chilakanagar, Uppal / Boduppal, Hyderabad</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-hotpink shrink-0" />
                <a href="tel:+919700760120" className="hover:text-white transition font-semibold text-white">
                  +91 97007 60120
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-hotpink shrink-0" />
                <span>info@tirumalameadows.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p>© {new Date().getFullYear()} Tirumala Meadows. All rights reserved.</p>
          <p>Independent Gated Living · Hyderabad, Telangana</p>
        </div>
      </div>
    </footer>
  )
}
