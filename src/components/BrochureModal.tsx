import { useEffect } from 'react'
import { X, Printer, ShieldCheck, CheckCircle2 } from 'lucide-react'
import TirumalaLogo from './TirumalaLogo'

interface BrochureModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function BrochureModal({ isOpen, onClose }: BrochureModalProps) {
  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'auto'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handlePrint = () => {
    window.print()
  }

  return (
    <div
      className="fixed inset-0 z-[100] overflow-y-auto bg-neutral-900/45 backdrop-blur-xl flex items-start justify-center px-3 sm:px-6 pt-16 sm:pt-14 pb-24"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      aria-modal="true"
      role="dialog"
    >
      {/* Floating Close Button - Apple Style Glass Pill */}
      <button
        onClick={onClose}
        className="fixed top-4 right-4 z-[110] h-10 w-10 sm:h-9 sm:w-9 rounded-full border border-stone-300/80 bg-white/90 text-stone-800 shadow-xl hover:bg-white flex items-center justify-center transition active:scale-95"
        aria-label="Close factsheet"
      >
        <X className="h-4.5 w-4.5 text-stone-800" />
      </button>

      {/* Modal Container - Clean White Card with High-Contrast Text */}
      <div className="relative w-full max-w-3xl rounded-3xl bg-white border border-stone-200 shadow-2xl p-6 sm:p-9 my-4 text-stone-900">
        
        {/* Factsheet Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-5 pr-8 sm:pr-0">
          <div>
            <TirumalaLogo className="h-10" showCorporate={true} />
            <p className="text-xs font-bold text-stone-800 mt-1.5 tracking-wide">
              "Quality For The Best Living" — 28 Years of Excellence
            </p>
          </div>
          <div className="text-left sm:text-right">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-300 px-3 py-1 text-[11px] font-bold text-emerald-900">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-700" />
              Corporate Portfolio Factsheet
            </span>
            <p className="text-xs font-medium text-stone-600 mt-1">Registered Address: Jubilee Hills, Hyderabad (500 034)</p>
          </div>
        </div>

        {/* Executive Summary Grid - Bold high contrast numbers & labels */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="rounded-2xl bg-stone-50 border border-stone-200 p-3.5 text-center shadow-2xs">
            <span className="text-[10px] uppercase font-bold tracking-wider text-stone-600">Experience</span>
            <p className="text-xl font-black text-stone-950 font-display mt-0.5">28+ Years</p>
            <span className="text-[10.5px] font-medium text-stone-600">Real Estate & Construction</span>
          </div>
          <div className="rounded-2xl bg-stone-50 border border-stone-200 p-3.5 text-center shadow-2xs">
            <span className="text-[10px] uppercase font-bold tracking-wider text-stone-600">Completed Villas</span>
            <p className="text-xl font-black text-stone-950 font-display mt-0.5">30+ Villas</p>
            <span className="text-[10.5px] font-medium text-stone-600">Particularly Jubilee Hills</span>
          </div>
          <div className="rounded-2xl bg-stone-50 border border-stone-200 p-3.5 text-center shadow-2xs">
            <span className="text-[10px] uppercase font-bold tracking-wider text-stone-600">Land Facilitated</span>
            <p className="text-xl font-black text-stone-950 font-display mt-0.5">3,000+ Acres</p>
            <span className="text-[10.5px] font-medium text-stone-600">Layout Development</span>
          </div>
          <div className="rounded-2xl bg-stone-50 border border-stone-200 p-3.5 text-center shadow-2xs">
            <span className="text-[10px] uppercase font-bold tracking-wider text-stone-600">Workforce</span>
            <p className="text-xl font-black text-stone-950 font-display mt-0.5">250+ Pros</p>
            <span className="text-[10.5px] font-medium text-stone-600">Dedicated In-House Team</span>
          </div>
        </div>

        {/* In-House Integrated Ecosystem */}
        <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-stone-50 border border-stone-200">
          <p className="text-xs font-bold uppercase tracking-wider text-stone-900 font-display mb-2.5">
            The Art of Integrated Luxury — Dedicated In-House Ecosystem
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-[11px] text-stone-700">
            <div className="bg-white p-3 rounded-xl border border-stone-200 shadow-2xs">
              <strong className="text-stone-950 block mb-0.5 font-bold">In-House Architects</strong>
              Distinctive architectural expressions
            </div>
            <div className="bg-white p-3 rounded-xl border border-stone-200 shadow-2xs">
              <strong className="text-stone-950 block mb-0.5 font-bold">In-House Designers</strong>
              Bespoke sophisticated spaces
            </div>
            <div className="bg-white p-3 rounded-xl border border-stone-200 shadow-2xs">
              <strong className="text-stone-950 block mb-0.5 font-bold">In-House Tech Team</strong>
              Intelligent home automation
            </div>
            <div className="bg-white p-3 rounded-xl border border-stone-200 shadow-2xs">
              <strong className="text-stone-950 block mb-0.5 font-bold">In-House Engineers</strong>
              Structural execution excellence
            </div>
          </div>
        </div>

        {/* Technical Highlights - High Visibility */}
        <div className="mt-6 space-y-3.5">
          <h4 className="text-xs font-bold uppercase tracking-wider text-stone-900 font-display">
            Architectural & Civil Specifications Summary
          </h4>
          <div className="grid sm:grid-cols-2 gap-3 text-xs text-stone-700">
            <div className="rounded-xl border border-stone-200 p-3.5 bg-stone-50">
              <strong className="text-stone-950 block mb-1 font-bold">Civil Superstructure</strong>
              Earthquake-resistant RCC framed structure with 9" thermal external and 4.5" internal masonry.
            </div>
            <div className="rounded-xl border border-stone-200 p-3.5 bg-stone-50">
              <strong className="text-stone-950 block mb-1 font-bold">Flooring & Joinery</strong>
              Polished marble & granite across living rooms; seasoned Indian Teak wood frame main door.
            </div>
            <div className="rounded-xl border border-stone-200 p-3.5 bg-stone-50">
              <strong className="text-stone-950 block mb-1 font-bold">Sanitary & Plumbing</strong>
              Concealed CPVC pipelines, chrome-plated fittings from reputed brands, and 7-foot glazed tiles.
            </div>
            <div className="rounded-xl border border-stone-200 p-3.5 bg-stone-50">
              <strong className="text-stone-950 block mb-1 font-bold">Township Utilities</strong>
              Dedicated on-site STP, rainwater harvesting pits, water reservoirs, and underground cabling.
            </div>
          </div>
        </div>

        {/* Banking Partners & Approvals */}
        <div className="mt-6 pt-5 border-t border-stone-200">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold text-stone-900 uppercase tracking-wide font-display">
                Approved Home Loan Banking Institutions
              </p>
              <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mt-2 text-xs font-bold text-stone-800">
                <span className="rounded-lg bg-stone-100 px-3 py-1 border border-stone-200">State Bank of India (SBI)</span>
                <span className="rounded-lg bg-stone-100 px-3 py-1 border border-stone-200">HDFC Bank</span>
                <span className="rounded-lg bg-stone-100 px-3 py-1 border border-stone-200">ICICI Bank</span>
                <span className="rounded-lg bg-stone-100 px-3 py-1 border border-stone-200">Axis Bank</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 rounded-full border border-stone-900 bg-stone-900 text-white px-4 py-2 text-xs font-bold hover:bg-stone-800 transition"
              >
                <Printer className="h-3.5 w-3.5" />
                <span>Print Factsheet</span>
              </button>
              <button
                onClick={onClose}
                className="inline-flex items-center gap-1.5 rounded-full border border-stone-300 bg-stone-100 px-4 py-2 text-xs font-bold text-stone-800 hover:bg-stone-200 transition"
              >
                <span>Close</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-6 pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between text-[11px] text-stone-700 font-medium gap-2">
          <span><strong className="text-stone-950">Tirumala Meadows Private Limited</strong> · Contact: +91 95508 28688</span>
          <span>Registered Address: Jubilee Hills - Hyderabad (500 034)</span>
        </div>
      </div>
    </div>
  )
}
