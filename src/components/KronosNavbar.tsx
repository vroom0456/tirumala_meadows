import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowUpRight, Menu, X } from 'lucide-react'

interface NavbarProps {
  onOpenInquire?: () => void
}

export default function KronosNavbar({ onOpenInquire }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { to: '/', label: 'Overview' },
    { to: '/about', label: 'Studio & Philosophy' },
    { to: '/services', label: 'Disciplines' },
    { to: '/projects', label: 'Selected Works' },
    { to: '/contact', label: 'Project Inquiry' },
  ]

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true
    if (path !== '/' && location.pathname.startsWith(path)) return true
    return false
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#171A1C]/90 backdrop-blur-md border-b border-charcoal-border py-4 shadow-sm'
            : 'bg-transparent py-6 border-b border-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-12">
          {/* Architectural Minimal Wordmark */}
          <Link to="/" className="group flex items-baseline gap-2.5">
            <span className="font-display text-lg font-semibold tracking-architectural text-white transition-opacity group-hover:opacity-80">
              KRONOS
            </span>
            <span className="hidden sm:inline-block text-[10px] tracking-architectural text-concrete uppercase font-light">
              Construction Studio
            </span>
          </Link>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-9">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`text-xs uppercase tracking-architectural transition-colors duration-300 font-medium ${
                  isActive(link.to)
                    ? 'text-white'
                    : 'text-concrete hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right Action */}
          <div className="flex items-center gap-4">
            <Link
              to="/contact"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-sm border border-bronze/60 bg-transparent px-4 py-2 text-xs uppercase tracking-architectural text-white transition-all duration-300 hover:border-bronze hover:bg-bronze/10 hover:text-white"
            >
              <span>Initiate Project</span>
              <ArrowUpRight className="h-3.5 w-3.5 text-bronze" />
            </Link>

            {/* Mobile Trigger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden flex h-9 w-9 items-center justify-center rounded-sm border border-charcoal-border text-concrete hover:text-white transition"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileOpen && (
          <div className="md:hidden bg-[#171A1C] border-b border-charcoal-border px-6 py-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setMobileOpen(false)}
                className={`block text-xs uppercase tracking-architectural py-1.5 font-medium ${
                  isActive(link.to) ? 'text-white' : 'text-concrete'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-charcoal-border">
              <Link
                to="/contact"
                onClick={() => setMobileOpen(false)}
                className="inline-flex w-full items-center justify-center gap-2 rounded-sm border border-bronze bg-bronze/10 py-2.5 text-xs uppercase tracking-architectural text-white"
              >
                <span>Initiate Project</span>
                <ArrowUpRight className="h-3.5 w-3.5 text-bronze" />
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  )
}

