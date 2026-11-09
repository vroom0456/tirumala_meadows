import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ArrowRight, FileText, Phone } from 'lucide-react'
import TirumalaLogo from './TirumalaLogo'
import BrochureModal from './BrochureModal'

const navLinks = [
  { to: '/', label: 'Overview' },
  { to: '/villas', label: 'Villas & 3D' },
  { to: '/amenities', label: 'In-House Luxury' },
  { to: '/location', label: 'Location & Map' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isBrochureOpen, setIsBrochureOpen] = useState(false)
  const loc = useLocation()
  const isHomePage = loc.pathname === '/'

  useEffect(() => {
    const handler = () => {
      setScrolled(window.scrollY > 30)
    }
    window.addEventListener('scroll', handler, { passive: true })
    handler()
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // If on another page, navbar should always have solid readable background
  const isSolid = scrolled || !isHomePage

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isSolid
            ? 'bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm py-3'
            : 'bg-gradient-to-b from-navy-dark/90 via-navy-dark/50 to-transparent py-4 sm:py-5'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo on the left */}
            <Link to="/" className="flex items-center group shrink-0">
              <TirumalaLogo textColor={isSolid ? 'text-navy' : 'text-white'} />
            </Link>

            {/* Desktop Navigation Links on the right */}
            <div className="hidden lg:flex items-center gap-7">
              <nav className="flex items-center gap-6">
                {navLinks.map((l) => {
                  const isActive = loc.pathname === l.to
                  return (
                    <Link
                      key={l.to}
                      to={l.to}
                      className={`text-xs uppercase tracking-[0.16em] font-medium transition-colors relative py-1 ${
                        isSolid
                          ? isActive
                            ? 'text-navy font-bold'
                            : 'text-slate-600 hover:text-navy'
                          : isActive
                            ? 'text-white font-bold'
                            : 'text-white/85 hover:text-white'
                      }`}
                    >
                      {l.label}
                      {isActive && (
                        <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-brandLogo-red" />
                      )}
                    </Link>
                  )
                })}
              </nav>

              {/* Factsheet trigger button */}
              <button
                onClick={() => setIsBrochureOpen(true)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider transition ${
                  isSolid
                    ? 'border border-slate-300 text-navy hover:bg-slate-100'
                    : 'border border-white/25 bg-white/10 backdrop-blur-md text-white hover:bg-white/20'
                }`}
              >
                <FileText className="h-3.5 w-3.5 text-brandLogo-blue" />
                <span>Factsheet</span>
              </button>

              {/* Persistent "Enquire Now" CTA button in brand color */}
              <Link
                to="/contact"
                className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-sm ${
                  isSolid
                    ? 'bg-navy text-white hover:bg-navy-light'
                    : 'bg-brandLogo-red text-white hover:bg-red-700 hover:shadow-md'
                }`}
              >
                <span>Enquire Now</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Mobile Actions: Enquire CTA + Hamburger */}
            <div className="flex items-center gap-2.5 lg:hidden">
              <Link
                to="/contact"
                className="inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider bg-brandLogo-red text-white"
              >
                <span>Enquire</span>
              </Link>

              <button
                onClick={() => setOpen(!open)}
                className={`h-9 w-9 rounded-full flex items-center justify-center transition ${
                  isSolid
                    ? 'text-navy hover:bg-slate-100'
                    : 'text-white hover:bg-white/10'
                }`}
                aria-label="Toggle navigation menu"
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {open && (
          <div className="lg:hidden fixed inset-x-0 top-full bg-white border-b border-slate-200 shadow-2xl px-6 py-6 transition-all duration-300">
            <nav className="flex flex-col space-y-3 pb-5 border-b border-slate-100">
              {navLinks.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={`text-sm uppercase tracking-wider font-semibold py-1.5 transition ${
                    loc.pathname === l.to
                      ? 'text-navy font-bold'
                      : 'text-slate-600 hover:text-navy'
                  }`}
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            <div className="pt-4 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setOpen(false)
                  setIsBrochureOpen(true)
                }}
                className="w-full flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-slate-50 py-2.5 text-xs font-bold text-navy uppercase tracking-wider"
              >
                <FileText className="h-4 w-4 text-brandLogo-blue" />
                <span>Download Factsheet</span>
              </button>

              <a
                href="tel:+919550828688"
                className="w-full flex items-center justify-center gap-2 rounded-full bg-navy py-2.5 text-xs font-bold text-white uppercase tracking-wider"
              >
                <Phone className="h-4 w-4 text-brandLogo-red" />
                <span>Call +91 95508 28688</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Factsheet Modal */}
      <BrochureModal
        isOpen={isBrochureOpen}
        onClose={() => setIsBrochureOpen(false)}
      />
    </>
  )
}
