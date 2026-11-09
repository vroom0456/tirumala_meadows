import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import {
  TrendingUp,
  IndianRupee,
  Building2,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Calculator,
  Percent,
  Calendar,
  Sparkles,
  Info,
  Phone,
  BarChart3,
  Award,
  ChevronRight
} from 'lucide-react'

// Strategic Scenarios
const PRESET_SCENARIOS = [
  {
    name: 'Conservative Corridor',
    cagr: 10.0,
    rentalYield: 3.5,
    rentalEscalation: 4.0,
    desc: 'Modest baseline assumption for mature residential sectors',
  },
  {
    name: 'Historical Benchmark',
    cagr: 12.5,
    rentalYield: 4.0,
    rentalEscalation: 5.0,
    desc: 'Reflects 10-year actual CAGR in Jubilee Hills & Prime Hyderabad belts',
  },
  {
    name: 'High-Growth Expansion',
    cagr: 15.0,
    rentalYield: 4.5,
    rentalEscalation: 6.0,
    desc: 'Driven by infrastructure catalysts, Regional Ring Road (RRR) & tech hub demand',
  },
]

export default function ROICalculatorPage() {
  // Financial State
  const [initialCapital, setInitialCapital] = useState<number>(15000000) // ₹1.50 Cr default
  const [holdingYears, setHoldingYears] = useState<number>(5) // 5 years
  const [appreciationCAGR, setAppreciationCAGR] = useState<number>(12.5) // 12.5%
  const [rentalYieldPercent, setRentalYieldPercent] = useState<number>(4.0) // 4.0%
  const [rentalEscalationPercent, setRentalEscalationPercent] = useState<number>(5.0) // 5% annual rent escalation

  // Calculations
  const {
    futureAssetValue,
    capitalGains,
    cumulativeRental,
    totalWealthGenerated,
    totalROIPercent,
    milestones,
    firstYearRent
  } = useMemo(() => {
    const P = initialCapital
    const t = holdingYears
    const r = appreciationCAGR / 100
    const y = rentalYieldPercent / 100
    const e = rentalEscalationPercent / 100

    if (P <= 0 || t <= 0) {
      return {
        futureAssetValue: 0,
        capitalGains: 0,
        cumulativeRental: 0,
        totalWealthGenerated: 0,
        totalROIPercent: 0,
        milestones: [],
        firstYearRent: 0
      }
    }

    // Future Asset Value = P * (1 + r)^t
    const fv = Math.round(P * Math.pow(1 + r, t))
    const capGain = fv - P

    // Cumulative Rent with annual escalation
    let totalRent = 0
    let currRent = P * y
    const yr1Rent = currRent

    // Milestone years: 1, 3, 5, 10
    const milestoneYears = [1, 3, 5, 10].filter((yr) => yr <= Math.max(t, 10))
    const milestoneMap: Array<{
      year: number
      assetValue: number
      cumulativeRent: number
      totalWealth: number
    }> = []

    let runningRent = 0
    for (let yr = 1; yr <= Math.max(t, 10); yr++) {
      runningRent += currRent
      const yrVal = Math.round(P * Math.pow(1 + r, yr))
      if (milestoneYears.includes(yr)) {
        milestoneMap.push({
          year: yr,
          assetValue: yrVal,
          cumulativeRent: Math.round(runningRent),
          totalWealth: Math.round((yrVal - P) + runningRent)
        })
      }
      currRent = currRent * (1 + e)
    }

    // Actual total rent over holdingYears
    let actualTotalRent = 0
    let loopRent = P * y
    for (let yr = 1; yr <= t; yr++) {
      actualTotalRent += loopRent
      loopRent = loopRent * (1 + e)
    }

    const netTotalWealth = capGain + Math.round(actualTotalRent)
    const roiPct = Math.round((netTotalWealth / P) * 100)

    return {
      futureAssetValue: fv,
      capitalGains: capGain,
      cumulativeRental: Math.round(actualTotalRent),
      totalWealthGenerated: netTotalWealth,
      totalROIPercent: roiPct,
      milestones: milestoneMap,
      firstYearRent: Math.round(yr1Rent)
    }
  }, [initialCapital, holdingYears, appreciationCAGR, rentalYieldPercent, rentalEscalationPercent])

  // Helpers
  const formatINR = (val: number) => {
    if (val >= 10000000) {
      return `₹${(val / 10000000).toFixed(2)} Cr`
    }
    if (val >= 100000) {
      return `₹${(val / 100000).toFixed(2)} L`
    }
    return `₹${val.toLocaleString('en-IN')}`
  }

  const formatLakhsCrInput = (val: number) => {
    if (val >= 10000000) {
      return `₹${(val / 10000000).toFixed(2)} Crores`
    }
    return `₹${(val / 100000).toFixed(0)} Lakhs`
  }

  return (
    <div className="min-h-screen bg-soft text-navy font-sans selection:bg-brandLogo-blue selection:text-white">
      <Navbar />

      {/* Hero Header */}
      <section className="relative pt-32 pb-16 bg-navy text-white overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(1,0,243,0.12),transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(43,97,22,0.12),transparent_50%)] pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-3.5 py-1 text-xs font-semibold text-white/90 mb-4 backdrop-blur-sm">
              <span className="flex h-1.5 w-1.5 rounded-full bg-brandLogo-green" />
              <span className="flex h-1.5 w-1.5 rounded-full bg-brandLogo-blue" />
              <span className="flex h-1.5 w-1.5 rounded-full bg-brandLogo-red" />
              <span className="uppercase tracking-[0.14em] text-[11px] font-bold">Wealth Architecture & Asset Modeling</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-display text-white">
              Real Estate ROI & Wealth Appreciation Calculator
            </h1>
            <p className="mt-3 text-sm sm:text-base text-white/75 leading-relaxed">
              Model institutional asset appreciation, multi-year compounding rental cashflows, and freehold land-share equity in Jubilee Hills and Hyderabad's primary growth corridors.
            </p>
          </div>

          {/* Quick Presets Bar */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <span className="text-[11px] font-bold uppercase tracking-wider text-white/60 block mb-3">
              Load Strategic Investment Benchmarks:
            </span>
            <div className="grid sm:grid-cols-3 gap-3">
              {PRESET_SCENARIOS.map((s) => {
                const isSelected =
                  appreciationCAGR === s.cagr && rentalYieldPercent === s.rentalYield
                return (
                  <button
                    key={s.name}
                    onClick={() => {
                      setAppreciationCAGR(s.cagr)
                      setRentalYieldPercent(s.rentalYield)
                      setRentalEscalationPercent(s.rentalEscalation)
                    }}
                    className={`p-3.5 rounded-2xl text-left transition flex flex-col justify-between border ${
                      isSelected
                        ? 'bg-brandLogo-green text-white border-brandLogo-green shadow-md ring-2 ring-brandLogo-green/40'
                        : 'bg-white/10 text-white/90 hover:bg-white/15 border-white/15'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <span className="text-xs font-bold font-display">{s.name}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isSelected ? 'bg-white/20 text-white' : 'bg-white/10 text-emerald-300'}`}>
                        +{s.cagr}% CAGR
                      </span>
                    </div>
                    <p className={`text-[11px] line-clamp-1 ${isSelected ? 'text-white/80' : 'text-white/60'}`}>
                      {s.desc}
                    </p>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive ROI Simulation Area */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-12 items-start">
            
            {/* Input Controls (Left Column, 7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-7">
              <div className="border-b border-slate-100 pb-4">
                <h2 className="text-xl font-bold font-display text-navy flex items-center gap-2.5">
                  <BarChart3 className="h-5 w-5 text-brandLogo-green" />
                  <span>Configure Investment Variables</span>
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Adjust initial capital outlay, holding horizon, expected appreciation CAGR, and rental parameters.
                </p>
              </div>

              {/* 1. Initial Investment Capital */}
              <div className="space-y-2.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Initial Villa Investment Capital
                  </label>
                  <span className="text-base font-extrabold font-display text-navy bg-soft px-3 py-1 rounded-lg border border-slate-200">
                    {formatLakhsCrInput(initialCapital)}
                  </span>
                </div>
                <input
                  type="range"
                  min={5000000}
                  max={60000000}
                  step={500000}
                  value={initialCapital}
                  onChange={(e) => setInitialCapital(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer bg-slate-200 accent-navy"
                />
                <div className="flex justify-between text-[11px] font-semibold text-slate-400">
                  <span>₹50 Lakhs</span>
                  <span>₹2.50 Crores</span>
                  <span>₹6.00 Crores</span>
                </div>
              </div>

              {/* 2. Holding Horizon */}
              <div className="space-y-2.5 pt-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Holding Horizon / Investment Period
                  </label>
                  <span className="text-base font-extrabold font-display text-navy bg-soft px-3 py-1 rounded-lg border border-slate-200">
                    {holdingYears} Years
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={15}
                  step={1}
                  value={holdingYears}
                  onChange={(e) => setHoldingYears(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer bg-slate-200 accent-brandLogo-blue"
                />
                <div className="flex justify-between text-[11px] font-semibold text-slate-400">
                  <span>1 Year (Short)</span>
                  <span>5 Years (Standard)</span>
                  <span>15 Years (Generational)</span>
                </div>
              </div>

              {/* 3. Appreciation Rate (CAGR) */}
              <div className="space-y-2.5 pt-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <span>Expected Capital Appreciation (CAGR % p.a.)</span>
                    <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      Historical: 12.5%
                    </span>
                  </label>
                  <span className="text-base font-extrabold font-display text-navy bg-soft px-3 py-1 rounded-lg border border-slate-200">
                    {appreciationCAGR.toFixed(1)}% p.a.
                  </span>
                </div>
                <input
                  type="range"
                  min={6.0}
                  max={20.0}
                  step={0.5}
                  value={appreciationCAGR}
                  onChange={(e) => setAppreciationCAGR(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer bg-slate-200 accent-brandLogo-green"
                />
                <div className="flex justify-between text-[11px] font-semibold text-slate-400">
                  <span>6.0% (Conservative)</span>
                  <span>12.5% (Jubilee Hills Benchmark)</span>
                  <span>20.0% (Boom)</span>
                </div>
              </div>

              {/* 4. Rental Yield & Escalation Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="space-y-2 bg-soft p-4 rounded-2xl border border-slate-200">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-700">Gross Rental Yield</span>
                    <span className="font-bold text-brandLogo-blue">{rentalYieldPercent.toFixed(1)}% / yr</span>
                  </div>
                  <input
                    type="range"
                    min={2.0}
                    max={7.0}
                    step={0.1}
                    value={rentalYieldPercent}
                    onChange={(e) => setRentalYieldPercent(Number(e.target.value))}
                    className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-slate-300 accent-brandLogo-blue"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>2.0%</span>
                    <span>Yr 1: {formatINR(firstYearRent)}/yr</span>
                    <span>7.0%</span>
                  </div>
                </div>

                <div className="space-y-2 bg-soft p-4 rounded-2xl border border-slate-200">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-700">Annual Rental Escalation</span>
                    <span className="font-bold text-brandLogo-green">+{rentalEscalationPercent.toFixed(1)}% / yr</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={10}
                    step={0.5}
                    value={rentalEscalationPercent}
                    onChange={(e) => setRentalEscalationPercent(Number(e.target.value))}
                    className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-slate-300 accent-brandLogo-green"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>0% (Flat)</span>
                    <span>Standard: 5%</span>
                    <span>10% (High)</span>
                  </div>
                </div>
              </div>

              {/* Freehold Land Share Note */}
              <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-950 flex items-start gap-3">
                <ShieldCheck className="h-4 w-4 text-brandLogo-green shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong>The Freehold Land Equity Factor:</strong> Unlike high-rise apartments where you only own an undivided land share (15–20%), an independent villa secures 60%–75% direct land value that never depreciates, delivering superior inflation hedging.
                </p>
              </div>
            </div>

            {/* Results Card (Right Column, 5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Primary Valuation Summary Card */}
              <div className="bg-navy text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-white/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-44 h-44 bg-brandLogo-green/15 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-44 h-44 bg-brandLogo-blue/15 rounded-full blur-3xl pointer-events-none" />

                <div className="relative">
                  <span className="text-[11px] uppercase tracking-[0.16em] font-bold text-white/60 block">
                    Projected Asset Valuation ({holdingYears} Years)
                  </span>
                  
                  {/* Big Number */}
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-4xl sm:text-5xl font-black font-display tracking-tight text-white">
                      {formatINR(futureAssetValue)}
                    </span>
                  </div>

                  <p className="text-xs text-emerald-400 font-bold mt-1.5 flex items-center gap-1.5">
                    <TrendingUp className="h-3.5 w-3.5" />
                    <span>+{formatINR(capitalGains)} Estimated Capital Gains ({Math.round((capitalGains / initialCapital) * 100)}%)</span>
                  </p>

                  {/* Financial Breakdown Grid */}
                  <div className="mt-6 grid grid-cols-2 gap-3 text-xs">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5">
                      <span className="text-[10px] uppercase font-bold text-white/50 block">Initial Capital (P)</span>
                      <span className="text-sm sm:text-base font-bold text-white mt-0.5 block font-display">
                        {formatINR(initialCapital)}
                      </span>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5">
                      <span className="text-[10px] uppercase font-bold text-white/50 block">Cumulative Rent</span>
                      <span className="text-sm sm:text-base font-bold text-emerald-300 mt-0.5 block font-display">
                        +{formatINR(cumulativeRental)}
                      </span>
                    </div>

                    <div className="col-span-2 bg-white/10 border border-white/15 rounded-2xl p-4 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-white/60 block">Total Net Wealth Generated</span>
                        <span className="text-xs text-white/70">Capital Gains + Total Rent</span>
                      </div>
                      <div className="text-right">
                        <span className="text-lg sm:text-xl font-black text-white font-display block">
                          +{formatINR(totalWealthGenerated)}
                        </span>
                        <span className="text-[11px] font-bold text-emerald-400">
                          {totalROIPercent}% Overall ROI
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-6 space-y-2.5">
                    <Link
                      to="/contact"
                      className="w-full py-3 px-5 rounded-2xl bg-brandLogo-green hover:bg-emerald-800 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition"
                    >
                      <span>Connect with Private Client Desk</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>

                    <Link
                      to="/emi-calculator"
                      className="w-full py-2.5 px-5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs tracking-wider flex items-center justify-center gap-2 border border-white/15 transition"
                    >
                      <Calculator className="h-4 w-4 text-blue-300" />
                      <span>Switch to Home Loan EMI Calculator</span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Growth Stats Card */}
              <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center text-brandLogo-blue shrink-0">
                  <Award className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-navy uppercase tracking-wider">
                    28-Year Development Pedigree
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Over 30+ completed luxury villa projects and 3,000+ acres facilitated across Hyderabad's most resilient prime zones.
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* Multi-Year Milestone Projection Cards */}
          <div className="mt-12 bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
            <div className="pb-6 border-b border-slate-100">
              <h3 className="text-lg font-bold font-display text-navy flex items-center gap-2">
                <Calendar className="h-5 w-5 text-brandLogo-green" />
                <span>Multi-Year Wealth Trajectory & Compounding Milestones</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Simulated valuation milestones for an initial investment of {formatINR(initialCapital)} at {appreciationCAGR}% CAGR.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
              {milestones.map((m) => (
                <div
                  key={m.year}
                  className="p-5 rounded-2xl bg-soft border border-slate-200 hover:border-slate-300 transition"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200/60">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-navy">
                      Year {m.year} Milestone
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-brandLogo-green border border-emerald-200">
                      +{Math.round(((m.assetValue - initialCapital) / initialCapital) * 100)}% Gain
                    </span>
                  </div>

                  <div className="mt-3 space-y-2 text-xs">
                    <div>
                      <span className="text-slate-400 text-[10px] uppercase block">Asset Valuation</span>
                      <strong className="text-sm font-bold text-navy font-display">
                        {formatINR(m.assetValue)}
                      </strong>
                    </div>

                    <div>
                      <span className="text-slate-400 text-[10px] uppercase block">Cumulative Rent Earned</span>
                      <span className="font-semibold text-brandLogo-blue">
                        +{formatINR(m.cumulativeRent)}
                      </span>
                    </div>

                    <div className="pt-2 border-t border-slate-200/60">
                      <span className="text-slate-400 text-[10px] uppercase block">Net Combined Wealth</span>
                      <strong className="text-xs font-bold text-brandLogo-green">
                        +{formatINR(m.totalWealth)}
                      </strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Strategic Corridor Investment Drivers */}
          <div className="mt-14">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-brandLogo-blue">
                Macro-Economic Fundamentals
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-navy mt-1">
                Key Drivers Behind Hyderabad Villa Equity
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1.5">
                Why luxury gated villas consistently outpace apartment yields in long-term wealth preservation.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-6">
              <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-3">
                <div className="h-10 w-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-brandLogo-blue">
                  <Building2 className="h-5 w-5" />
                </div>
                <h4 className="text-sm font-bold text-navy font-display">Land Scarcity & Freehold Title</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Prime land parcels in Jubilee Hills and established suburban enclaves are finite. As commercial hubs expand, freehold residential plots experience relentless supply-side price escalation.
                </p>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-3">
                <div className="h-10 w-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-brandLogo-green">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <h4 className="text-sm font-bold text-navy font-display">Executive Tenant Pool & Yields</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Hyderabad's IT leadership, CXOs, and NRI returning diaspora generate sustained rental demand for independent gated residences with dedicated garden sanctuaries and security.
                </p>
              </div>

              <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-3">
                <div className="h-10 w-10 rounded-xl bg-red-50 border border-red-200 flex items-center justify-center text-brandLogo-red">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h4 className="text-sm font-bold text-navy font-display">Capital Gains Protection (Sec 54)</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Reinvestment of capital gains into completed residential luxury villas allows high-net-worth investors to legally shelter real estate profits from taxation under Section 54 of the IT Act.
                </p>
              </div>
            </div>
          </div>

          {/* Consultation CTA Banner */}
          <div className="mt-14 bg-navy rounded-3xl p-8 sm:p-10 text-white relative overflow-hidden border border-white/10">
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-brandLogo-green">
                  Institutional Investor Services
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
                  Discuss a Bespoke Acquisition or Portfolio Expansion
                </h3>
                <p className="text-xs text-sm text-white/70 max-w-xl">
                  Connect privately with our leadership team for confidential land parcel discussions, custom villa configurations, and clear title documentation walkthroughs.
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
                <Link
                  to="/contact"
                  className="px-6 py-3 rounded-2xl bg-brandLogo-green hover:bg-emerald-800 text-white font-bold text-xs uppercase tracking-wider text-center transition shadow-md"
                >
                  Book Private Consultation
                </Link>
                <Link
                  to="/villas"
                  className="px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider text-center transition border border-white/15 flex items-center justify-center gap-2"
                >
                  <span>Explore Available Villas</span>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  )
}

