import { useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import {
  Film,
  Dumbbell,
  Trees,
  Users,
  ShieldCheck,
  Calendar,
  Sparkles,
  ArrowRight,
  Check,
  Droplets,
  Zap,
  Building2
} from 'lucide-react'

const amenityCategories = [
  {
    category: 'Clubhouse & Social',
    icon: Building2,
    title: 'The Central Clubhouse',
    desc: 'The vibrant social center of the 14-acre community for recreation, indoor sports, and family functions.',
    items: [
      'Private 40-seat Mini Movie Screening Theatre',
      'Air-conditioned Banquet & Community Party Hall',
      'Stepped Open-Air Amphitheatre for festive events',
      'Table Tennis, Billiards & Indoor Board Games',
      'Resident Society Boardroom & Conference Facility',
    ],
    img: '/luxury-villas.jpg',
  },
  {
    category: 'Wellness & Aquatics',
    icon: Dumbbell,
    title: 'Fitness & Swimming Complex',
    desc: 'Comprehensive athletic facilities designed for daily rejuvenation and healthy family routines.',
    items: [
      'Resort-style adult Swimming Pool with continuous filtration',
      'Dedicated shallow Kids Splash pool with safety grab railings',
      'Fully equipped Modern Gymnasium with cardio and weights',
      'Tree-shaded Jogging and Cycling perimeter track',
      'Open-air Yoga and Meditation Pavilion in landscaped gardens',
    ],
    img: '/residential.jpg',
  },
  {
    category: 'Nature & Sustainability',
    icon: Trees,
    title: 'Landscaped Green Parks',
    desc: 'Generous open green areas ensuring fresh air, clean oxygen, and a tranquil escape from urban congestion.',
    items: [
      'Themed botanical gardens and flowering seasonal trees',
      'Integrated Rainwater Harvesting recharge pits across 14 acres',
      'On-site eco Sewage Treatment Plant (STP) for landscape irrigation',
      '100% Vastu-compliant layout for natural energy flow',
      'Senior citizen relaxation gazebos and paved walking paths',
    ],
    img: '/commercial.jpg',
  },
  {
    category: 'Family Convenience & Safety',
    icon: ShieldCheck,
    title: '24/7 Security & Essential Utilities',
    desc: 'Round-the-clock safety and uncompromised basic utilities for all resident households.',
    items: [
      'Manned 24/7 security posts at entry arches with boom barriers',
      'Comprehensive CCTV surveillance coverage across key avenues',
      'Safe, soft-ground Children’s Play Area with swings and slides',
      'Pressurized 24-hour dual water supply via overhead reservoirs',
      'Diesel generator power backup for avenue streetlights and clubhouse',
    ],
    img: '/industrial.jpg',
  },
]

export default function AmenitiesPage() {
  const [activeTab, setActiveTab] = useState<string>('All')

  const filtered =
    activeTab === 'All'
      ? amenityCategories
      : amenityCategories.filter((a) => a.category === activeTab)

  return (
    <div className="min-h-screen bg-white text-navy font-sans selection:bg-hotpink selection:text-white">
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-14 bg-soft border-b border-border text-center">
        <div className="mx-auto max-w-4xl px-6 space-y-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-hotpink/10 px-3.5 py-1 text-xs font-bold text-hotpink">
            14-Acre Community Living
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-navy font-display tracking-tight">
            Clubhouse & Lifestyle Amenities
          </h1>
          <p className="text-sm sm:text-base text-slate-grey max-w-xl mx-auto leading-relaxed">
            From the resort swimming pool to the private mini cinema, explore the recreational infrastructure at Tirumala Meadows.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            {['All', 'Clubhouse & Social', 'Wellness & Aquatics', 'Nature & Sustainability', 'Family Convenience & Safety'].map((c) => (
              <button
                key={c}
                onClick={() => setActiveTab(c)}
                className={`rounded-full px-4 sm:px-5 py-1.5 text-xs font-semibold transition ${
                  activeTab === c
                    ? 'bg-navy text-white shadow-xs'
                    : 'bg-white border border-border text-slate-grey hover:text-navy hover:bg-soft'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Amenity Cards */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="mx-auto max-w-6xl px-6 space-y-12">
          {filtered.map((cat, idx) => {
            const Icon = cat.icon
            return (
              <div key={idx} className="rounded-3xl border border-border bg-soft p-6 sm:p-10 shadow-xs">
                <div className="grid gap-8 lg:grid-cols-12 items-center">
                  
                  <div className={`space-y-4 ${idx % 2 === 1 ? 'lg:col-span-7 lg:order-2' : 'lg:col-span-7'}`}>
                    <div className="flex items-center gap-3">
                      <div className="h-11 w-11 rounded-2xl bg-white border border-border flex items-center justify-center text-hotpink">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-hotpink">{cat.category}</span>
                        <h2 className="text-2xl sm:text-3xl font-bold text-navy font-display">{cat.title}</h2>
                      </div>
                    </div>

                    <p className="text-sm text-slate-grey leading-relaxed">{cat.desc}</p>

                    <div className="space-y-2 pt-2">
                      {cat.items.map((point, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-grey bg-white p-3 rounded-xl border border-border">
                          <Check className="h-4 w-4 text-hotpink shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2">
                      <Link
                        to="/contact"
                        className="inline-flex items-center gap-2 rounded-full bg-hotpink px-6 py-2.5 text-xs font-bold text-white shadow-xs hover:bg-hotpink-hover transition"
                      >
                        <Calendar className="h-3.5 w-3.5" />
                        <span>Visit the Clubhouse</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>

                  <div className={`relative h-64 sm:h-80 rounded-2xl overflow-hidden bg-white border border-border ${idx % 2 === 1 ? 'lg:col-span-5 lg:order-1' : 'lg:col-span-5'}`}>
                    <img
                      src={cat.img}
                      alt={cat.title}
                      className="h-full w-full object-cover transition duration-500 hover:scale-103"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3 rounded-xl bg-white/95 backdrop-blur-md p-3 border border-border text-center">
                      <p className="text-xs font-bold text-navy">{cat.title}</p>
                      <p className="text-[10px] text-slate-grey">Tirumala Meadows · Uppal</p>
                    </div>
                  </div>

                </div>
              </div>
            )
          })}
        </div>
      </section>

      <Footer />
    </div>
  )
}
