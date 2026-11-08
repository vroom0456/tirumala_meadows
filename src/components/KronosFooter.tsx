import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

export default function KronosFooter() {
  return (
    <footer className="bg-[#171A1C] border-t border-charcoal-border text-concrete pt-20 pb-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-12 pb-16 border-b border-charcoal-border">
          {/* Brand & Editorial Column */}
          <div className="lg:col-span-5 space-y-4">
            <span className="font-display text-xl font-bold tracking-architectural text-white block">
              KRONOS
            </span>
            <p className="text-xs tracking-wide uppercase text-concrete max-w-sm font-light">
              Architectural Construction & Structural Engineering
            </p>
            <p className="text-sm text-concrete/80 leading-relaxed max-w-md pt-2 font-normal">
              Translating visionary design into enduring physical reality. We engineer private residences, institutional pavilions, and commercial landmarks with absolute material honesty and technical precision.
            </p>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <p className="text-[11px] uppercase tracking-architectural text-white font-semibold">Disciplines</p>
            <ul className="space-y-2 text-xs">
              <li><Link to="/services" className="hover:text-white transition">Residential Construction</Link></li>
              <li><Link to="/services" className="hover:text-white transition">Commercial Landmarks</Link></li>
              <li><Link to="/services" className="hover:text-white transition">Industrial Engineering</Link></li>
              <li><Link to="/services" className="hover:text-white transition">Restoration & Heritage</Link></li>
              <li><Link to="/services" className="hover:text-white transition">Civil Infrastructure</Link></li>
            </ul>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2 space-y-3">
            <p className="text-[11px] uppercase tracking-architectural text-white font-semibold">Studio</p>
            <ul className="space-y-2 text-xs">
              <li><Link to="/about" className="hover:text-white transition">Brand Philosophy</Link></li>
              <li><Link to="/projects" className="hover:text-white transition">Selected Works</Link></li>
              <li><Link to="/about#process" className="hover:text-white transition">Engineering Rigor</Link></li>
              <li><Link to="/contact" className="hover:text-white transition">Project Inquiries</Link></li>
              <li><Link to="/about#safety" className="hover:text-white transition">Quality & Safety</Link></li>
            </ul>
          </div>

          {/* Locations */}
          <div className="lg:col-span-3 space-y-3 text-xs">
            <p className="text-[11px] uppercase tracking-architectural text-white font-semibold">Studios & Contact</p>
            <div className="space-y-3 pt-1">
              <div>
                <p className="text-white font-medium">Headquarters</p>
                <p className="text-concrete/70 leading-relaxed">
                  Tower 4, Financial District, Gachibowli, Hyderabad 500032
                </p>
              </div>
              <div>
                <p className="text-white font-medium">Direct Inquiries</p>
                <a href="tel:+919700760120" className="text-concrete hover:text-white transition block">
                  +91 (0) 97007 60120
                </a>
                <a href="mailto:inquiries@kronosbuild.com" className="text-bronze hover:underline block pt-0.5">
                  inquiries@kronosbuild.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Lower Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-concrete/60 font-light">
          <p>© {new Date().getFullYear()} KRONOS Construction Group. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-white transition cursor-pointer">Privacy Policy</span>
            <span>·</span>
            <span className="hover:text-white transition cursor-pointer">ISO 9001:2015 Certified</span>
            <span>·</span>
            <span className="hover:text-white transition cursor-pointer">Zero Incident Protocol</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

