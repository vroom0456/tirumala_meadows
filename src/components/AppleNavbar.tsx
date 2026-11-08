import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Building2,
  Calendar,
  Phone,
  Sparkles,
  MapPin,
  Menu,
  X,
  ArrowRight
} from 'lucide-react'

interface NavbarProps {
  onOpenVisitModal: () => void
}

export default function AppleNavbar({ onOpenVisitModal }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  const navLinks = [
    { to: '/', label: 'Overview' },
    { to: '/villas', label: 'Villas & Plans' },
    { to: '/amenities', label: 'Amenities' },
    { to: '/specifications', label: 'Specifications' },
    { to: '/location', label: 'Location' },
    { to: '/resident', label: 'Resident Hub' },
    { to: '/inquire', label: 'Resale Inquiries' },
  ]

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true
    if (path !== '/' && location.pathname.startsWith(path)) return true
    return false
  }

  return (
    <>
      {/* Top Banner with Soft Cloud Background */}
      <div className="border-b border-borderGrey bg-soft px-4 py-2 text-xs text-slateGrey">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-hotpink/10 px-3 py-0.5 font-semibold text-hotpink border border-hotpink/20">
              <Sparkles className="h-3 w-3 text-hotpink" />
              <span className="font-bold">14-Acre Gated Community</span>
              <span className="text-navy font-medium">· Ready To Move In</span>
            </span>
            <span className="hidden lg:flex items-center gap-1 text-slateGrey">
              <MapPin className="h-3.5 w-3.5 text-hotpink" />
              <span>Chilakanagar, Uppal / Boduppal, Hyderabad</span>
            </span>
          </div>

          <div className="flex items-center gap-4 text-slateGrey">
            <a href="tel:+919700760120" className="flex items-center gap-1.5 font-bold text-navy hover:text-hotpink transition">
              <Phone className="h-3.5 w-3.5 text-hotpink" />
              <span>+91 97007 60120</span>
            </a>
            <span className="text-borderGrey">|</span>
            <span className="text-xs font-medium text-slateGrey">Developed by Mansani Constructions Pvt Ltd</span>
          </div>
        </div>
      </div>

      {/* Main Luxury White Floating Navbar */}
      <header className="sticky top-0 z-40 luxury-navbar">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6">
          {/* Logo / Project Branding */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-navy p-2.5 text-white transition group-hover:bg-navy-surface">
              <Building2 className="h-6 w-6 text-hotpink" />
            </div>
            <div>
              <span className="block text-base sm:text-lg font-bold tracking-tight text-navy group-hover:text-hotpink transition font-display">
                MANSANI THIRUMALA MEADOWS
              </span>
              <span className="block text-[10px] font-semibold uppercase tracking-wider text-slateGrey">
                14-Acre Independent Villa Township · Uppal
              </span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden xl:flex items-center gap-1 p-1 rounded-full border border-borderGrey bg-soft">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                  isActive(link.to)
                    ? 'bg-white text-navy font-semibold shadow-sm border border-borderGrey'
                    : 'text-slateGrey hover:text-navy hover:bg-white/60'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Action Button - Pill Shaped Hot Pink Primary CTA */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenVisitModal}
              className="btn-hotpink inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 text-xs sm:text-sm font-semibold"
            >
              <Calendar className="h-4 w-4" />
              <span>Schedule Visit</span>
              <ArrowRight className="h-3.5 w-3.5 hidden sm:inline" />
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden flex items-center justify-center h-10 w-10 rounded-2xl border border-borderGrey bg-soft text-navy"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden border-t border-borderGrey bg-white px-4 py-4 space-y-2 shadow-lg">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={`block rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                  isActive(link.to)
                    ? 'bg-hotpink/10 text-hotpink font-bold border border-hotpink/20'
                    : 'text-navy hover:bg-soft'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </header>
    </>
  )
}
