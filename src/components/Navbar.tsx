import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ArrowRight, FileText, Phone, Sparkles } from 'lucide-react'
import TirumalaLogo from './TirumalaLogo'
import BrochureModal from './BrochureModal'

const navLinks = [
  { to: '/', label: 'Overview' },
  { to: '/villas', label: 'Villas & 3D Studio' },
  { to: '/amenities', label: 'In-House Luxury & Verticals' },
  { to: '/location', label: 'Locations & Land' },
  { to: '/contact', label: 'Contact & Inquiry' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isBrochureOpen, setIsBrochureOpen] = useState(false)
  const loc = useLocation()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <>
      {/* Corporate Pre-Header Strip */}
      <div className="bg-navy text-white/80 border-b border-navy-light/40 text-[11px] py-1.5 px-4 hidden sm:block">
        <div className="mx-auto max-w-6xl flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-semibold text-white">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              28 Years of Excellence · A Legacy of Distinction
            </span>
            <span className="text-white/20">|</span>
            <span className="text-white/70">Jubilee Hills · Hyderabad (500 034)</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-white/60">30+ Luxury Villas · 3,000+ Acres Facilitated</span>
            <span className="text-white/20">|</span>
            <a href="tel:+919550828688" className="flex items-center gap-1 font-bold text-white hover:text-hotpink transition">
              <Phone className="h-3 w-3 text-hotpink" />
              <span>+91 95508 28688</span>
            </a>
          </div>
        </div>
      </div>

      {/* Floating Apple-Grade Frosted Glass Nav */}
      <header
        className={`sticky top-2 sm:top-3 z-40 mx-auto w-[calc(100%-1rem)] sm:w-[calc(100%-2rem)] max-w-6xl transition-all duration-300 rounded-full ${
          scrolled
            ? 'bg-white/95 backdrop-blur-xl shadow-corporate-hover border border-border py-1.5 sm:py-2'
            : 'bg-white/90 backdrop-blur-md shadow-corporate border border-border/80 py-2 sm:py-2.5'
        }`}
      >
        <div className="flex items-center justify-between px-3 sm:px-6">
          {/* Logo with Exact Colors */}
          <Link to="/" className="flex items-center group shrink-0">
            <TirumalaLogo />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-soft/80 p-1 rounded-full border border-border/60">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                  loc.pathname === l.to
                    ? 'text-navy font-bold bg-white shadow-xs'
                    : 'text-slate-grey hover:text-navy hover:bg-white/60'
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Corporate Action Elements */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* Factsheet PDF Button */}
            <button
              onClick={() => setIsBrochureOpen(true)}
              className="hidden md:inline-flex items-center gap-1.5 rounded-full border border-border bg-white px-3.5 py-1.5 text-xs font-semibold text-navy hover:bg-soft hover:border-navy transition"
            >
              <FileText className="h-3.5 w-3.5 text-slate-grey" />
              <span>Factsheet</span>
            </button>

            {/* Hot Pink Primary CTA */}
            <Link
              to="/contact"
              className="inline-flex items-center gap-1 sm:gap-1.5 rounded-full bg-hotpink px-3.5 sm:px-5 py-1.5 sm:py-2 text-[11px] sm:text-xs font-bold text-white shadow-hotpink-pill hover:bg-hotpink-hover hover:scale-102 active:scale-98 transition-all whitespace-nowrap"
            >
              <span>Visit</span>
              <span className="hidden xs:inline">Desk</span>
              <ArrowRight className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden h-8 w-8 sm:h-9 sm:w-9 rounded-full flex items-center justify-center text-navy hover:bg-soft transition shrink-0"
              aria-label="Toggle navigation menu"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {open && (
          <div className="lg:hidden border-t border-border bg-white rounded-b-3xl px-5 py-4 space-y-1 shadow-xl mt-2">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={`block px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition ${
                  loc.pathname === l.to ? 'bg-soft text-navy font-bold' : 'text-slate-grey hover:bg-soft'
                }`}
              >
                {l.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-border flex flex-col gap-2">
              <button
                onClick={() => {
                  setOpen(false)
                  setIsBrochureOpen(true)
                }}
                className="w-full flex items-center justify-center gap-2 rounded-xl border border-border bg-soft py-2.5 text-xs font-bold text-navy"
              >
                <FileText className="h-4 w-4 text-hotpink" />
                <span>Download Project Factsheet</span>
              </button>
              <a
                href="tel:+919550828688"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-navy py-2.5 text-xs font-bold text-white"
              >
                <Phone className="h-4 w-4 text-hotpink" />
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
