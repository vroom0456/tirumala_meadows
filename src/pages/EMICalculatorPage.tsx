import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import {
  Calculator,
  IndianRupee,
  Landmark,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Percent,
  Calendar,
  Sparkles,
  Info,
  Phone,
  FileText,
  ChevronDown,
  ChevronUp
} from 'lucide-react'

// Quick Presets for luxury villas
const VILLA_PRESETS = [
  { label: '2 BHK Villa', price: 8500000, desc: '850 – 1,400 sq.ft. Duplex' },
  { label: '3 BHK Premium', price: 14000000, desc: '1,800 – 2,400 sq.ft. Luxury' },
  { label: '4 BHK Grand', price: 22000000, desc: '3,000+ sq.ft. Triplex' },
  { label: 'Jubilee Hills Estate', price: 35000000, desc: 'Bespoke Custom Villa' },
]

const BANK_PARTNERS = [
  {
    name: 'State Bank of India (SBI)',
    tag: 'Govt. Benchmark',
    rate: '8.40% – 8.75%',
    ltv: 'Up to 80% LTV',
    tenure: 'Up to 30 Years',
    features: ['Zero hidden prepayment penalties', 'Concession for women co-applicants', 'Speedy pre-approved villa title clearance'],
    badgeColor: 'border-blue-200 bg-blue-50/50 text-blue-900',
  },
  {
    name: 'HDFC Bank',
    tag: 'Preferred Private Lender',
    rate: '8.50% – 8.90%',
    ltv: 'Up to 85% LTV',
    tenure: 'Up to 30 Years',
    features: ['Instant 48-hr in-principle sanction', 'Digital doorstep documentation', 'Dedicated relationship manager desk'],
    badgeColor: 'border-slate-200 bg-slate-50 text-slate-900',
  },
  {
    name: 'ICICI Bank',
    tag: 'Digital Fast-Track',
    rate: '8.55% – 8.95%',
    ltv: 'Up to 80% LTV',
    tenure: 'Up to 30 Years',
    features: ['Express approval for NRI investors', 'Doorstep paperless process', 'Pre-qualified legal verification'],
    badgeColor: 'border-red-200 bg-red-50/50 text-red-950',
  },
  {
    name: 'Axis Bank',
    tag: 'Flexible Financing',
    rate: '8.60% – 9.00%',
    ltv: 'Up to 80% LTV',
    tenure: 'Up to 30 Years',
    features: ['12 EMI waivers on timely payments', 'Quicker disbursal turnaround', 'Attractive overdraft home loan options'],
    badgeColor: 'border-slate-200 bg-slate-50 text-slate-900',
  },
]

export default function EMICalculatorPage() {
  // Financial State
  const [propertyPrice, setPropertyPrice] = useState<number>(14000000) // ₹1.40 Cr default
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20) // 20%
  const [interestRate, setInterestRate] = useState<number>(8.5) // 8.5% p.a.
  const [tenureYears, setTenureYears] = useState<number>(20) // 20 years
  const [showSchedule, setShowSchedule] = useState<boolean>(false)

  // Computed Loan Principal
  const downPaymentAmount = useMemo(() => {
    return Math.round((propertyPrice * downPaymentPercent) / 100)
  }, [propertyPrice, downPaymentPercent])

  const loanPrincipal = useMemo(() => {
    return Math.max(0, propertyPrice - downPaymentAmount)
  }, [propertyPrice, downPaymentAmount])

  // Calculation Logic:
  // EMI = [P x r x (1+r)^n] / [(1+r)^n - 1]
  // where r = monthly interest rate (annual / 12 / 100)
  // n = number of monthly installments (years * 12)
  const { monthlyEMI, totalPayment, totalInterest, principalRatio, interestRatio, schedule } = useMemo(() => {
    const P = loanPrincipal
    const annualRate = interestRate
    const n = tenureYears * 12
    const r = annualRate / 12 / 100

    if (P <= 0 || n <= 0 || r <= 0) {
      return {
        monthlyEMI: 0,
        totalPayment: 0,
        totalInterest: 0,
        principalRatio: 100,
        interestRatio: 0,
        schedule: []
      }
    }

    const emi = Math.round((P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1))
    const totalPay = emi * n
    const totInterest = Math.max(0, totalPay - P)
    const pRatio = Math.round((P / totalPay) * 100)
    const iRatio = 100 - pRatio

    // Amortization Schedule per year
    const yearlySchedule: Array<{
      year: number
      openingBalance: number
      principalPaid: number
      interestPaid: number
      closingBalance: number
    }> = []

    let balance = P
    for (let yr = 1; yr <= tenureYears; yr++) {
      let yrPrincipal = 0
      let yrInterest = 0
      const opening = balance

      for (let m = 1; m <= 12; m++) {
        if (balance <= 0) break
        const mInterest = balance * r
        const mPrincipal = Math.min(balance, emi - mInterest)
        yrInterest += mInterest
        yrPrincipal += mPrincipal
        balance -= mPrincipal
      }

      yearlySchedule.push({
        year: yr,
        openingBalance: Math.round(opening),
        principalPaid: Math.round(yrPrincipal),
        interestPaid: Math.round(yrInterest),
        closingBalance: Math.max(0, Math.round(balance))
      })
    }

    return {
      monthlyEMI: emi,
      totalPayment: totalPay,
      totalInterest: totInterest,
      principalRatio: pRatio,
      interestRatio: iRatio,
      schedule: yearlySchedule
    }
  }, [loanPrincipal, interestRate, tenureYears])

  // Format INR nicely
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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(1,0,243,0.12),transparent_50%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(230,52,34,0.08),transparent_50%)] pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/15 px-3.5 py-1 text-xs font-semibold text-white/90 mb-4 backdrop-blur-sm">
              <span className="flex h-1.5 w-1.5 rounded-full bg-brandLogo-red" />
              <span className="flex h-1.5 w-1.5 rounded-full bg-brandLogo-blue" />
              <span className="flex h-1.5 w-1.5 rounded-full bg-brandLogo-green" />
              <span className="uppercase tracking-[0.14em] text-[11px] font-bold">Financial Intelligence Desk</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-display text-white">
              Home Loan EMI & Amortization Calculator
            </h1>
            <p className="mt-3 text-sm sm:text-base text-white/75 leading-relaxed">
              Model precise monthly installments, interest outlays, and capital repayment curves tailored for luxury residential villas in Jubilee Hills & premier Hyderabad corridors.
            </p>
          </div>

          {/* Quick Presets Bar */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <span className="text-[11px] font-bold uppercase tracking-wider text-white/60 block mb-3">
              Explore Standard Villa Pricing Presets:
            </span>
            <div className="flex flex-wrap gap-2.5">
              {VILLA_PRESETS.map((p) => {
                const isSelected = propertyPrice === p.price
                return (
                  <button
                    key={p.label}
                    onClick={() => setPropertyPrice(p.price)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                      isSelected
                        ? 'bg-brandLogo-red text-white shadow-md ring-2 ring-brandLogo-red/30'
                        : 'bg-white/10 text-white/90 hover:bg-white/20 border border-white/10'
                    }`}
                  >
                    <span>{p.label}</span>
                    <span className="text-[10px] opacity-80 font-normal">({formatINR(p.price)})</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Calculator Area */}
      <section className="py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-12 items-start">
            
            {/* Input Controls (Left Column, 7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm space-y-7">
              <div className="border-b border-slate-100 pb-4">
                <h2 className="text-xl font-bold font-display text-navy flex items-center gap-2.5">
                  <Calculator className="h-5 w-5 text-brandLogo-blue" />
                  <span>Configure Loan Parameters</span>
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Adjust property value, down payment percentage, interest rate, and tenure.
                </p>
              </div>

              {/* 1. Property Value */}
              <div className="space-y-2.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Property Valuation / Cost
                  </label>
                  <span className="text-base font-extrabold font-display text-navy bg-soft px-3 py-1 rounded-lg border border-slate-200">
                    {formatLakhsCrInput(propertyPrice)}
                  </span>
                </div>
                <input
                  type="range"
                  min={4000000}
                  max={50000000}
                  step={500000}
                  value={propertyPrice}
                  onChange={(e) => setPropertyPrice(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer bg-slate-200 accent-navy"
                />
                <div className="flex justify-between text-[11px] font-semibold text-slate-400">
                  <span>₹40 Lakhs</span>
                  <span>₹2.50 Crores</span>
                  <span>₹5.00 Crores</span>
                </div>
              </div>

              {/* 2. Down Payment & Loan Principal Split */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="space-y-2 bg-soft p-4 rounded-2xl border border-slate-200">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-slate-700">Down Payment ({downPaymentPercent}%)</span>
                    <span className="font-bold text-brandLogo-blue">{formatINR(downPaymentAmount)}</span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={60}
                    step={5}
                    value={downPaymentPercent}
                    onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                    className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-slate-300 accent-brandLogo-blue"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>10% (Min)</span>
                    <span>60% (Max)</span>
                  </div>
                </div>

                <div className="bg-navy/5 p-4 rounded-2xl border border-navy/10 flex flex-col justify-center">
                  <span className="text-[11px] uppercase font-bold tracking-wider text-slate-600 block">
                    Calculated Loan Principal (P)
                  </span>
                  <span className="text-lg font-extrabold font-display text-navy mt-0.5">
                    {formatINR(loanPrincipal)}
                  </span>
                  <span className="text-[10px] text-slate-500 mt-0.5">
                    {100 - downPaymentPercent}% Loan-To-Value (LTV)
                  </span>
                </div>
              </div>

              {/* 3. Interest Rate */}
              <div className="space-y-2.5 pt-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <span>Annual Interest Rate (% p.a.)</span>
                    <span className="text-[10px] font-semibold text-brandLogo-green bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      Repo Linked
                    </span>
                  </label>
                  <span className="text-base font-extrabold font-display text-navy bg-soft px-3 py-1 rounded-lg border border-slate-200">
                    {interestRate.toFixed(2)}%
                  </span>
                </div>
                <input
                  type="range"
                  min={7.0}
                  max={12.0}
                  step={0.1}
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer bg-slate-200 accent-brandLogo-red"
                />
                <div className="flex justify-between text-[11px] font-semibold text-slate-400">
                  <span>7.00% (Subsidized)</span>
                  <span>8.50% (Standard Benchmark)</span>
                  <span>12.00%</span>
                </div>
              </div>

              {/* 4. Loan Tenure */}
              <div className="space-y-2.5 pt-2">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Loan Tenure (Years)
                  </label>
                  <span className="text-base font-extrabold font-display text-navy bg-soft px-3 py-1 rounded-lg border border-slate-200">
                    {tenureYears} Years ({tenureYears * 12} Months)
                  </span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={30}
                  step={1}
                  value={tenureYears}
                  onChange={(e) => setTenureYears(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer bg-slate-200 accent-navy"
                />
                <div className="flex justify-between text-[11px] font-semibold text-slate-400">
                  <span>5 Years</span>
                  <span>15 Years</span>
                  <span>30 Years</span>
                </div>
              </div>

              {/* Banking Note */}
              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 text-xs text-blue-950 flex items-start gap-3">
                <Info className="h-4 w-4 text-brandLogo-blue shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  <strong>Tax Deduction Insight:</strong> Under Sec 24(b) of the IT Act, interest payable up to ₹2.0 Lakhs/yr is tax deductible. Principal repayment up to ₹1.5 Lakhs/yr is deductible under Sec 80C.
                </p>
              </div>
            </div>

            {/* Results Card (Right Column, 5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Primary EMI Summary Card */}
              <div className="bg-navy text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-white/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-44 h-44 bg-brandLogo-red/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-44 h-44 bg-brandLogo-blue/15 rounded-full blur-3xl pointer-events-none" />

                <div className="relative">
                  <span className="text-[11px] uppercase tracking-[0.16em] font-bold text-white/60 block">
                    Estimated Monthly Installment
                  </span>
                  
                  {/* Big Number */}
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-4xl sm:text-5xl font-black font-display tracking-tight text-white">
                      ₹{monthlyEMI.toLocaleString('en-IN')}
                    </span>
                    <span className="text-xs uppercase font-semibold text-white/60">/ month</span>
                  </div>

                  <p className="text-xs text-white/70 mt-1">
                    for {tenureYears} years ({tenureYears * 12} installments) at {interestRate}% p.a.
                  </p>

                  {/* Amortization Split Bar */}
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <div className="flex justify-between text-xs font-bold mb-2">
                      <span className="flex items-center gap-1.5 text-white">
                        <span className="h-2.5 w-2.5 rounded-full bg-brandLogo-blue" />
                        Principal ({principalRatio}%)
                      </span>
                      <span className="flex items-center gap-1.5 text-white/80">
                        <span className="h-2.5 w-2.5 rounded-full bg-brandLogo-red" />
                        Interest ({interestRatio}%)
                      </span>
                    </div>

                    <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden flex">
                      <div
                        className="h-full bg-brandLogo-blue transition-all duration-300"
                        style={{ width: `${principalRatio}%` }}
                      />
                      <div
                        className="h-full bg-brandLogo-red transition-all duration-300"
                        style={{ width: `${interestRatio}%` }}
                      />
                    </div>
                  </div>

                  {/* Financial Breakdown Grid */}
                  <div className="mt-6 grid grid-cols-2 gap-3 text-xs">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5">
                      <span className="text-[10px] uppercase font-bold text-white/50 block">Loan Principal</span>
                      <span className="text-sm sm:text-base font-bold text-white mt-0.5 block font-display">
                        {formatINR(loanPrincipal)}
                      </span>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-3.5">
                      <span className="text-[10px] uppercase font-bold text-white/50 block">Total Interest</span>
                      <span className="text-sm sm:text-base font-bold text-brandLogo-red mt-0.5 block font-display">
                        {formatINR(totalInterest)}
                      </span>
                    </div>

                    <div className="col-span-2 bg-white/10 border border-white/15 rounded-2xl p-4 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-white/60 block">Total Amount Payable</span>
                        <span className="text-xs text-white/70">Principal + Total Interest</span>
                      </div>
                      <span className="text-lg sm:text-xl font-black text-white font-display">
                        {formatINR(totalPayment)}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-6 space-y-2.5">
                    <Link
                      to="/contact"
                      className="w-full py-3 px-5 rounded-2xl bg-brandLogo-red hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition"
                    >
                      <span>Apply For Pre-Approved Bank Loan</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>

                    <Link
                      to="/roi-calculator"
                      className="w-full py-2.5 px-5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs tracking-wider flex items-center justify-center gap-2 border border-white/15 transition"
                    >
                      <TrendingUp className="h-4 w-4 text-emerald-400" />
                      <span>Switch to Capital Appreciation ROI Engine</span>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs flex items-center gap-4">
                <div className="h-12 w-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-brandLogo-green shrink-0">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-navy uppercase tracking-wider">
                    Clear Title Project Guarantee
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    100% legal scrutiny completed. Pre-approved for instant loan disbursement across all major public & private banks.
                  </p>
                </div>
              </div>

            </div>

          </div>

          {/* Amortization Table Toggle */}
          <div className="mt-12 bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <h3 className="text-lg font-bold font-display text-navy flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-brandLogo-red" />
                  <span>Annual Loan Amortization Schedule</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Year-by-year breakdown of principal repayment, interest component, and outstanding loan balance.
                </p>
              </div>

              <button
                onClick={() => setShowSchedule(!showSchedule)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider bg-soft hover:bg-slate-200 text-navy border border-slate-200 transition"
              >
                <span>{showSchedule ? 'Hide Full Schedule' : 'View Full Schedule'}</span>
                {showSchedule ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
            </div>

            {/* Preview table (first 5 years or all) */}
            <div className="overflow-x-auto mt-6">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-soft text-slate-700">
                    <th className="py-3 px-4 font-bold uppercase tracking-wider">Year</th>
                    <th className="py-3 px-4 font-bold uppercase tracking-wider">Opening Principal</th>
                    <th className="py-3 px-4 font-bold uppercase tracking-wider text-brandLogo-blue">Principal Repaid</th>
                    <th className="py-3 px-4 font-bold uppercase tracking-wider text-brandLogo-red">Interest Paid</th>
                    <th className="py-3 px-4 font-bold uppercase tracking-wider">Closing Balance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                  {(showSchedule ? schedule : schedule.slice(0, 5)).map((row) => (
                    <tr key={row.year} className="hover:bg-slate-50 transition">
                      <td className="py-3 px-4 font-bold text-navy">Year {row.year}</td>
                      <td className="py-3 px-4">{formatINR(row.openingBalance)}</td>
                      <td className="py-3 px-4 font-semibold text-brandLogo-blue">{formatINR(row.principalPaid)}</td>
                      <td className="py-3 px-4 font-semibold text-brandLogo-red">{formatINR(row.interestPaid)}</td>
                      <td className="py-3 px-4 font-bold text-navy">{formatINR(row.closingBalance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {!showSchedule && schedule.length > 5 && (
                <div className="text-center pt-4 border-t border-slate-100">
                  <button
                    onClick={() => setShowSchedule(true)}
                    className="text-xs font-bold text-brandLogo-blue hover:underline inline-flex items-center gap-1"
                  >
                    <span>Show remaining {schedule.length - 5} years of schedule</span>
                    <ChevronDown className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Pre-Approved Banking Partners Grid */}
          <div className="mt-14">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-brandLogo-red">
                Institutional Banking Alliances
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-navy mt-1">
                Pre-Approved Banking Partners
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1.5">
                Special interest concessions, processing waivers, and rapid approval pipelines established for Tirumala Meadows clients.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {BANK_PARTNERS.map((bank) => (
                <div
                  key={bank.name}
                  className="bg-white rounded-3xl border border-slate-200 p-6 flex flex-col justify-between hover:shadow-md transition group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="h-10 w-10 rounded-xl bg-soft border border-slate-200 flex items-center justify-center text-navy group-hover:border-navy transition">
                        <Landmark className="h-5 w-5" />
                      </div>
                      <span className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full border ${bank.badgeColor}`}>
                        {bank.tag}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-navy font-display">{bank.name}</h4>
                      <p className="text-xs text-brandLogo-red font-bold mt-1">Rates: {bank.rate}</p>
                    </div>

                    <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Max LTV:</span>
                        <span className="font-semibold text-navy">{bank.ltv}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Tenure:</span>
                        <span className="font-semibold text-navy">{bank.tenure}</span>
                      </div>
                    </div>

                    <ul className="space-y-1.5 pt-2">
                      {bank.features.map((f, i) => (
                        <li key={i} className="text-[11px] text-slate-500 flex items-start gap-1.5 leading-snug">
                          <CheckCircle2 className="h-3.5 w-3.5 text-brandLogo-green shrink-0 mt-0.5" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-5 mt-4 border-t border-slate-100">
                    <Link
                      to="/contact"
                      className="w-full py-2 px-3 rounded-xl bg-soft hover:bg-navy hover:text-white text-navy font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition text-center"
                    >
                      <span>Inquire for {bank.name.split(' ')[0]} Loan</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Consultation CTA Banner */}
          <div className="mt-14 bg-navy rounded-3xl p-8 sm:p-10 text-white relative overflow-hidden border border-white/10">
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-brandLogo-red">
                  Bespoke Home Finance Desk
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
                  Need a Personalized Financial Structure?
                </h3>
                <p className="text-xs sm:text-sm text-white/70 max-w-xl">
                  Our dedicated private banking concierges assist you with customized repayment models, step-up EMIs, tax-optimized NRI loans, and swift title documentation.
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
                <Link
                  to="/contact"
                  className="px-6 py-3 rounded-2xl bg-brandLogo-red hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider text-center transition shadow-md"
                >
                  Schedule Banking Walkthrough
                </Link>
                <a
                  href="tel:+919550828688"
                  className="px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider text-center transition border border-white/15 flex items-center justify-center gap-2"
                >
                  <Phone className="h-4 w-4 text-brandLogo-blue" />
                  <span>Call +91 95508 28688</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  )
}

