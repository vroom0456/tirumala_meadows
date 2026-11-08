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
          <TirumalaLogo className="h-10" />
          <div className="text-left sm:text-right">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-0.5 text-[11px] font-bold text-emerald-800">
              <CheckCircle2 className="h-3 w-3 text-emerald-600" />
              100% Completed Township
            </span>
            <p className="text-xs text-slate-grey mt-1">Official Project Factsheet & Investor Brief</p>
          </div>
        </div>

        {/* Executive Summary Grid */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="rounded-2xl bg-soft border border-border p-3.5 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-grey">Site Extent</span>
            <p className="text-base font-extrabold text-navy font-display mt-0.5">14.0 Acres</p>
            <span className="text-[10px] text-slate-grey">Gated Villa Layout</span>
          </div>
          <div className="rounded-2xl bg-soft border border-border p-3.5 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-grey">Typology</span>
            <p className="text-base font-extrabold text-navy font-display mt-0.5">Ground + 1</p>
            <span className="text-[10px] text-slate-grey">Independent Duplex</span>
          </div>
          <div className="rounded-2xl bg-soft border border-border p-3.5 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-grey">Configurations</span>
            <p className="text-base font-extrabold text-navy font-display mt-0.5">2, 3 & 4 BHK</p>
            <span className="text-[10px] text-slate-grey">850 – 2,200 sq.ft</span>
          </div>
          <div className="rounded-2xl bg-soft border border-border p-3.5 text-center">
            <span className="text-[10px] uppercase font-bold text-slate-grey">Status</span>
            <p className="text-base font-extrabold text-emerald-700 font-display mt-0.5">Ready to Move</p>
            <span className="text-[10px] text-slate-grey">Occupied Community</span>
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
        <div className="mt-6 pt-4 border-t border-border flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-grey">
          <span>Developed by <strong>Mansani Constructions Pvt Ltd</strong></span>
          <span>Thirumala Meadows Colony, Chilakanagar, Uppal / Boduppal, Hyderabad</span>
        </div>
      </div>
    </div>
  )
}

