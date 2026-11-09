import { X, Download, Printer, ShieldCheck, Check, Building2, MapPin, Award, CheckCircle2 } from 'lucide-react'
import TirumalaLogo from './TirumalaLogo'

interface BrochureModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function BrochureModal({ isOpen, onClose }: BrochureModalProps) {
  if (!isOpen) return null

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy/70 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-3xl bg-white border border-border shadow-2xl p-6 sm:p-10 my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 h-9 w-9 rounded-full border border-border bg-soft text-slate-grey hover:text-navy flex items-center justify-center transition"
          aria-label="Close modal"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Factsheet Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
          <div>
            <TirumalaLogo className="h-10" showCorporate={true} />
            <p className="text-xs font-serif italic text-navy/80 mt-1">
              "Quality For The Best Living" — 28 Years of Excellence
            </p>
          </div>
          <div className="text-left sm:text-right">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-0.5 text-[11px] font-bold text-emerald-800">
              <CheckCircle2 className="h-3 w-3 text-emerald-600" />
              Corporate Portfolio Factsheet
            </span>
            <p className="text-xs text-slate-grey mt-1">Registered Address: Jubilee Hills, Hyderabad (500 034)</p>
          </div>
        </div>

        {/* Executive Summary Grid */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="rounded-2xl bg-soft border border-border p-3.5 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-grey">Experience</span>
            <p className="text-base font-extrabold text-navy font-display mt-0.5">28+ Years</p>
            <span className="text-[10px] text-slate-grey">Real Estate & Construction</span>
          </div>
          <div className="rounded-2xl bg-soft border border-border p-3.5 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-grey">Completed Villas</span>
            <p className="text-base font-extrabold text-navy font-display mt-0.5">30+ Villas</p>
            <span className="text-[10px] text-slate-grey">Particularly Jubilee Hills</span>
          </div>
          <div className="rounded-2xl bg-soft border border-border p-3.5 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-grey">Land Facilitated</span>
            <p className="text-base font-extrabold text-navy font-display mt-0.5">3,000+ Acres</p>
            <span className="text-[10px] text-slate-grey">Layout Development</span>
          </div>
          <div className="rounded-2xl bg-soft border border-border p-3.5 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-grey">Workforce</span>
            <p className="text-base font-extrabold text-emerald-700 font-display mt-0.5">250+ Pros</p>
            <span className="text-[10px] text-slate-grey">Dedicated In-House Team</span>
          </div>
        </div>

        {/* In-House Integrated Ecosystem */}
        <div className="mt-6 p-4 rounded-2xl bg-soft/70 border border-border">
          <p className="text-xs font-bold uppercase tracking-wider text-navy font-display mb-2">
            The Art of Integrated Luxury — Dedicated In-House Ecosystem
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-slate-grey">
            <div className="bg-white p-2.5 rounded-xl border border-border/80">
              <strong className="text-navy block">In-House Architects</strong>
              Distinctive architectural expressions
            </div>
            <div className="bg-white p-2.5 rounded-xl border border-border/80">
              <strong className="text-navy block">In-House Designers</strong>
              Bespoke sophisticated spaces
            </div>
            <div className="bg-white p-2.5 rounded-xl border border-border/80">
              <strong className="text-navy block">In-House Tech Team</strong>
              Intelligent home automation
            </div>
            <div className="bg-white p-2.5 rounded-xl border border-border/80">
              <strong className="text-navy block">In-House Engineers</strong>
              Structural execution excellence
            </div>
          </div>
        </div>

        {/* Technical Highlights */}
        <div className="mt-6 space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-navy font-display">
            Architectural & Civil Specifications Summary
          </h4>
          <div className="grid sm:grid-cols-2 gap-3 text-xs text-slate-grey">
            <div className="rounded-xl border border-border p-3 bg-white">
              <strong className="text-navy block mb-1">Civil Superstructure</strong>
              Earthquake-resistant RCC framed structure with 9" thermal external and 4.5" internal clay/fly-ash brick masonry.
            </div>
            <div className="rounded-xl border border-border p-3 bg-white">
              <strong className="text-navy block mb-1">Flooring & Joinery</strong>
              Polished marble & granite across living rooms; seasoned Indian Teak wood frame main door with polished finish.
            </div>
            <div className="rounded-xl border border-border p-3 bg-white">
              <strong className="text-navy block mb-1">Sanitary & Plumbing</strong>
              Concealed CPVC pipelines, chrome-plated fittings from reputed brands, and 7-foot glazed tile dadoing.
            </div>
            <div className="rounded-xl border border-border p-3 bg-white">
              <strong className="text-navy block mb-1">Township Utilities</strong>
              Dedicated on-site STP, rainwater harvesting pits, overhead water reservoirs, and underground electrical cabling.
            </div>
          </div>
        </div>

        {/* Banking Partners & Approvals */}
        <div className="mt-6 pt-5 border-t border-border">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold text-navy uppercase tracking-wide font-display">
                Approved Home Loan Banking Institutions
              </p>
              <div className="flex flex-wrap items-center gap-3 mt-2 text-xs font-bold text-slate-grey">
                <span className="rounded-lg bg-soft px-3 py-1 border border-border">State Bank of India (SBI)</span>
                <span className="rounded-lg bg-soft px-3 py-1 border border-border">HDFC Bank</span>
                <span className="rounded-lg bg-soft px-3 py-1 border border-border">ICICI Bank</span>
                <span className="rounded-lg bg-soft px-3 py-1 border border-border">Axis Bank</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-soft px-4 py-2 text-xs font-bold text-navy hover:bg-white transition"
              >
                <Printer className="h-3.5 w-3.5 text-navy" />
                <span>Print Factsheet</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-6 pt-4 border-t border-border flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-grey gap-2">
          <span><strong>Tirumala Meadows Private Limited</strong> · Contact: +91 95508 28688</span>
          <span>Registered Address: Jubilee Hills - Hyderabad (500 034)</span>
        </div>
      </div>
    </div>
  )
}

