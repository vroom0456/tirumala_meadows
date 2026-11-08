import { Link } from 'react-router-dom'
import { Building2, Phone, Mail, MapPin } from 'lucide-react'

export default function AppleFooter() {
  return (
    <footer className="border-t border-navy bg-navy pt-16 pb-12 text-xs text-slate-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 pb-12">
          {/* Col 1: Project Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-hotpink text-white shadow-md">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <span className="text-sm font-bold text-white block font-display">Mansani Thirumala Meadows</span>
                <span className="text-[10px] uppercase font-semibold text-hotpink">Gated Villa Community</span>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              A thoughtfully planned 14-acre gated villa community in East Hyderabad, offering independent family living, green surroundings and excellent urban connectivity.
            </p>
            <div className="pt-2 border-t border-white/10">
              <p className="text-[11px] text-slate-400">Developer:</p>
              <p className="text-xs text-white font-semibold">Mansani Constructions Pvt Ltd</p>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <p className="font-bold text-white uppercase tracking-wider mb-4 text-xs font-display">Explore Community</p>
            <ul className="space-y-2.5">
              <li><Link to="/" className="text-slate-300 hover:text-white transition">Overview & Story</Link></li>
              <li><Link to="/villas" className="text-slate-300 hover:text-white transition">Villa Configurations & Plans</Link></li>
              <li><Link to="/amenities" className="text-slate-300 hover:text-white transition">Amenities & Clubhouse</Link></li>
              <li><Link to="/specifications" className="text-slate-300 hover:text-white transition">Technical Specifications</Link></li>
              <li><Link to="/location" className="text-slate-300 hover:text-white transition">Location & Connectivity</Link></li>
              <li><Link to="/resident" className="text-slate-300 hover:text-white transition">Resident Association Hub</Link></li>
              <li><Link to="/inquire" className="text-slate-300 hover:text-white transition">Resale & Rental Inquiries</Link></li>
            </ul>
          </div>

          {/* Col 3: Villa Configurations */}
          <div>
            <p className="font-bold text-white uppercase tracking-wider mb-4 text-xs font-display">Villa Configurations</p>
            <div className="space-y-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                <strong className="text-white block text-xs">2 BHK Premium Villa</strong>
                <span className="text-[11px] text-slate-300">850 – 1,400 sq.ft · Ground + 1 Structure</span>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                <strong className="text-white block text-xs">3 BHK Joint-Family Villa</strong>
                <span className="text-[11px] text-slate-300">Approx 1,600 sq.ft · Family-friendly Layout</span>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                <strong className="text-white block text-xs">4 BHK Luxury Villa</strong>
                <span className="text-[11px] text-slate-300">Up to 2,200 sq.ft · Multipurpose Room & Terrace</span>
              </div>
            </div>
          </div>

          {/* Col 4: Location & Contact */}
          <div>
            <p className="font-bold text-white uppercase tracking-wider mb-4 text-xs font-display">Community Address</p>
            <div className="space-y-3 text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-hotpink shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Thirumala Meadows Colony, Hema Nagar, Chilakanagar, Uppal / Boduppal, Hyderabad, Telangana.
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-hotpink shrink-0" />
                <a href="tel:+919700760120" className="text-white font-bold hover:text-hotpink transition">
                  +91 97007 60120
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-hotpink shrink-0" />
                <span>inquiries@mansaniconstructions.com</span>
              </div>
              <div className="pt-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-1 text-[11px] font-bold text-emerald-300 border border-emerald-500/30">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                  Fully Completed Gated Community
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <p>© {new Date().getFullYear()} Mansani Thirumala Meadows. Developed by Mansani Constructions Pvt Ltd.</p>
          <p className="text-slate-400">
            Sophisticated Living · Timeless Comfort · Hyderabad, Telangana
          </p>
        </div>
      </div>
    </footer>
  )
}
