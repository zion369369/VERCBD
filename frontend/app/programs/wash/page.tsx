"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Droplets, 
  ShieldCheck, 
  Activity, 
  Users, 
  Globe, 
  CheckCircle2, 
  ArrowRight, 
  Heart, 
  Sparkles, 
  Waves, 
  Stethoscope, 
  Hospital, 
  Handshake, 
  Baby, 
  ChevronRight,
  Award,
  Check,
  Building,
  Target
} from "lucide-react";

export default function CombinedWashHealthPage() {
  const [activeTab, setActiveTab] = useState<"wash" | "health">("wash");

  const washPillars = [
    {
      title: "Community-Led Total Sanitation (CLTS)",
      desc: "Pioneered by VERC in 2000, shifting emphasis from hardware subsidies to collective behavioral transformation, igniting community pride to end open defecation permanently.",
      icon: <Globe className="text-emerald-500 w-7 h-7" />,
      stats: "2,000+ Villages 100% ODF"
    },
    {
      title: "Arsenic-Safe Drinking Water Networks",
      desc: "Constructing deep tube-wells, community piped water distribution grids, and continuous water testing labs in high-risk arsenic-prone rural unions.",
      icon: <Droplets className="text-blue-500 w-7 h-7" />,
      stats: "1.8M+ People Accessing Safe Water"
    },
    {
      title: "School Sanitation & Menstrual Hygiene",
      desc: "Installing dedicated gender-segregated school washrooms, handwashing stations, and student-led hygiene clubs to eliminate adolescent dropout rates.",
      icon: <Sparkles className="text-amber-500 w-7 h-7" />,
      stats: "650+ Schools Upgraded"
    },
    {
      title: "Climate-Resilient Raised Facilities",
      desc: "Engineering flood-resilient raised latrines and water points in vulnerable riverine char and coastal belts of Bangladesh.",
      icon: <Waves className="text-teal-500 w-7 h-7" />,
      stats: "30+ Disaster-Prone Unions"
    }
  ];

  const ongoingProjects = [
    { name: "Integrated Sustainable WaSH Program-II", location: "Kurigram, Sirajganj, Bhola", focus: "Community piped water & ODF sustainability" },
    { name: "Child Stunting Prevention & Hygiene Project", location: "Chhatak, Sylhet", focus: "First 1,000 days nutrition, water purity & sanitation" },
    { name: "Emergency WaSH Infrastructure Initiative", location: "Cox's Bazar & Coastal Belt", focus: "Rapid solar-powered clean water grids" },
    { name: "Improved Cook-Stove & Clean Indoor Air", location: "Nationwide (64 Districts)", focus: "Reducing respiratory illness through bio-stoves" }
  ];

  const hospitalStats = [
    {
      name: "Savar Mother & Child Hospital",
      established: "Established 2004",
      annualPatients: "12,500+",
      safeDeliveries: "1,150+",
      desc: "Full-service 24/7 maternity hospital providing subsidized antenatal/postnatal care, normal & caesarean deliveries, digital ultrasonography, and pathology labs.",
      location: "Savar, Dhaka"
    },
    {
      name: "Mirsarai Mother & Child Hospital",
      established: "Established 2013",
      annualPatients: "4,200+",
      safeDeliveries: "320+",
      desc: "Dedicated maternal healthcare facility serving low-income rural and industrial corridor communities with subsidized clinical care.",
      location: "Mirsarai, Chattogram"
    }
  ];

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
  };

  return (
    <div className="bg-white min-h-screen font-sans selection:bg-brand-primary/10 overflow-x-hidden">
      
      {/* 1. HERO HEADER */}
      <section className="relative pt-36 pb-28 lg:pt-48 lg:pb-36 bg-gray-900 overflow-hidden text-white">
        <div className="absolute inset-0 z-0">
          <img 
            src="/assets/wash_clean_water.jpg" 
            alt="Health, Clean Water & Sanitation" 
            className="w-full h-full object-cover opacity-35 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 via-gray-900/80 to-gray-900"></div>
        </div>

        <div className="container-custom relative z-10 text-center max-w-4xl mx-auto space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* Breadcrumb */}
            <div className="flex items-center justify-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight size={12} />
              <Link href="/programs/education" className="hover:text-white transition-colors">Social Programs</Link>
              <ChevronRight size={12} />
              <span className="text-brand-secondary">Health & WaSH</span>
            </div>

            <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-500/10 rounded-full text-xs font-black uppercase tracking-[0.25em] text-blue-400 border border-blue-500/30">
              <Droplets size={14} className="text-blue-400" /> Integrated Social Health & Sanitation
            </span>

            <h1 className="text-5xl lg:text-8xl font-black tracking-tight leading-tight">
              Health, Water & <br />
              <span className="text-brand-secondary">Sanitation.</span>
            </h1>

            <p className="text-lg lg:text-2xl text-gray-300 font-medium max-w-3xl mx-auto leading-relaxed">
              Pioneers of Community-Led Total Sanitation (CLTS), delivering arsenic-safe piped drinking water, and operating subsidized Mother & Child hospitals across Bangladesh.
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Link href="/donate" className="px-8 py-4 bg-brand-secondary text-gray-900 font-black rounded-2xl shadow-xl hover:scale-105 transition-all text-sm">
                Support Clean Water Access
              </Link>
              <Link href="/contact" className="px-8 py-4 bg-white/10 text-white border border-white/20 font-bold rounded-2xl hover:bg-white/20 transition-all text-sm">
                Partner for WASH Programs
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. PROGRAM SELECTOR TABS */}
      <section className="sticky top-20 z-40 bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-xs">
        <div className="container-custom flex justify-center py-4 gap-4">
          <button 
            type="button"
            onClick={() => setActiveTab("wash")}
            className={`px-8 py-3.5 rounded-full font-black uppercase tracking-wider text-xs transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "wash" 
                ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/20 scale-[1.02]" 
                : "bg-gray-100 text-gray-600 hover:text-gray-900"
            }`}
          >
            <Droplets size={16} /> Water & Sanitation (WaSH & CLTS)
          </button>
          <button 
            type="button"
            onClick={() => setActiveTab("health")}
            className={`px-8 py-3.5 rounded-full font-black uppercase tracking-wider text-xs transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "health" 
                ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/20 scale-[1.02]" 
                : "bg-gray-100 text-gray-600 hover:text-gray-900"
            }`}
          >
            <Hospital size={16} /> Mother & Child Hospitals (MCH)
          </button>
        </div>
      </section>

      {/* 3. DYNAMIC CONTENT SECTION */}
      <AnimatePresence mode="wait">
        {activeTab === "wash" ? (
          <motion.div
            key="wash"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
          >
            {/* FEATURED VISUAL SPOTLIGHT */}
            <section className="py-24 bg-gray-50/70 border-b border-gray-100">
              <div className="container-custom">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                  
                  <div className="lg:col-span-6 relative rounded-[44px] overflow-hidden shadow-2xl group">
                    <img 
                      src="/assets/wash_clean_water.jpg" 
                      alt="Clean Community Water Tap" 
                      className="w-full h-[460px] object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent"></div>
                    
                    <div className="absolute bottom-6 left-6 right-6 p-6 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 text-white">
                      <span className="text-xs font-black uppercase tracking-widest text-brand-secondary">Community Tap Infrastructure</span>
                      <h4 className="text-lg font-bold mt-1">Providing Arsenic-Free Piped Drinking Water to Marginalized Villages</h4>
                    </div>
                  </div>

                  <div className="lg:col-span-6 space-y-6">
                    <div className="space-y-3">
                      <span className="text-xs font-black uppercase tracking-[0.3em] text-brand-primary">Pioneered in Bangladesh (2000)</span>
                      <h2 className="text-3xl lg:text-5xl font-black text-gray-900 leading-tight tracking-tight">
                        The Global Sanitation <br />
                        <span className="text-brand-primary">Revolution (CLTS).</span>
                      </h2>
                    </div>

                    <p className="text-base lg:text-lg text-gray-600 font-medium leading-relaxed">
                      In February 2000, VERC pioneered **Community-Led Total Sanitation (CLTS)** in Rajshahi. Instead of supplying external toilet subsidies, this breakthrough participatory model mobilized entire communities to analyze their own sanitation conditions, triggering collective behavioral change that eliminated open defecation entirely.
                    </p>

                    <p className="text-sm text-gray-500 font-medium leading-relaxed">
                      Today, CLTS has been formally recognized and scaled across more than **50 countries worldwide** and adopted into the **National Sanitation Strategy** of Bangladesh.
                    </p>

                    <div className="pt-2 grid grid-cols-2 gap-4">
                      <div className="p-5 bg-white rounded-2xl border border-gray-200 shadow-sm">
                        <div className="text-3xl font-black text-emerald-600">2,000+</div>
                        <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-1">Villages Made 100% ODF</div>
                      </div>
                      <div className="p-5 bg-white rounded-2xl border border-gray-200 shadow-sm">
                        <div className="text-3xl font-black text-blue-600">50+</div>
                        <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-1">Nations Inspired Globally</div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* 4 STRATEGIC PILLARS */}
            <section className="py-24 bg-white">
              <div className="container-custom">
                <div className="max-w-3xl mx-auto text-center mb-16 space-y-3">
                  <span className="text-xs font-black uppercase tracking-[0.3em] text-brand-primary">Comprehensive Approach</span>
                  <h3 className="text-3xl lg:text-5xl font-black text-gray-900 tracking-tight">
                    Four Pillars of WaSH Impact
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {washPillars.map((pillar, i) => (
                    <motion.div
                      key={i}
                      {...fadeIn}
                      transition={{ delay: i * 0.1 }}
                      className="p-8 rounded-[36px] bg-gray-50/70 border border-gray-200/80 hover:bg-white hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
                    >
                      <div className="space-y-4">
                        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-gray-100">
                          {pillar.icon}
                        </div>
                        <h4 className="text-xl font-black text-gray-900 leading-snug">{pillar.title}</h4>
                        <p className="text-xs text-gray-600 font-medium leading-relaxed">{pillar.desc}</p>
                      </div>

                      <div className="pt-6 mt-6 border-t border-gray-200/60">
                        <span className="text-xs font-black text-brand-primary uppercase tracking-wider">{pillar.stats}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* ONGOING PROJECTS LIST */}
            <section className="py-24 bg-gray-50/60 border-t border-gray-100">
              <div className="container-custom">
                <div className="max-w-3xl mx-auto text-center mb-16 space-y-3">
                  <span className="text-xs font-black uppercase tracking-[0.3em] text-brand-primary">Field Operations</span>
                  <h3 className="text-3xl lg:text-5xl font-black text-gray-900 tracking-tight">
                    Active WaSH Programs
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {ongoingProjects.map((proj, i) => (
                    <motion.div
                      key={i}
                      {...fadeIn}
                      transition={{ delay: i * 0.08 }}
                      className="bg-white p-8 rounded-[32px] border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex justify-between items-start mb-3">
                          <h4 className="text-lg font-black text-gray-900">{proj.name}</h4>
                          <span className="px-3 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase tracking-wider rounded-full border border-emerald-200">
                            Active Operation
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 font-medium mb-4">{proj.focus}</p>
                      </div>

                      <div className="pt-4 border-t border-gray-100 flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                        <Globe size={14} className="text-brand-primary" />
                        <span>{proj.location}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          </motion.div>
        ) : (
          <motion.div
            key="health"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4 }}
          >
            {/* MOTHER & CHILD HOSPITALS SHOWCASE */}
            <section className="py-24 bg-gray-50/70">
              <div className="container-custom">
                <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
                  <span className="text-xs font-black uppercase tracking-[0.3em] text-rose-600">Institutional Clinical Care</span>
                  <h2 className="text-3xl lg:text-5xl font-black text-gray-900 tracking-tight">
                    Mother & Child Hospitals (MCH)
                  </h2>
                  <p className="text-gray-600 font-medium text-base">
                    Subsidized, specialized 24/7 maternal healthcare delivering dignified clinical services to rural mothers and neonates.
                  </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                  {hospitalStats.map((hosp, i) => (
                    <motion.div
                      key={i}
                      {...fadeIn}
                      transition={{ delay: i * 0.15 }}
                      className="bg-white p-8 sm:p-12 rounded-[40px] border border-gray-200 shadow-sm hover:shadow-xl transition-all space-y-8 flex flex-col justify-between"
                    >
                      <div className="space-y-6">
                        <div className="flex justify-between items-start">
                          <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-600 border border-rose-100">
                            <Hospital size={30} />
                          </div>
                          <span className="px-3.5 py-1.5 bg-gray-100 text-gray-800 text-xs font-bold rounded-full">
                            {hosp.established}
                          </span>
                        </div>

                        <div>
                          <h3 className="text-2xl lg:text-3xl font-black text-gray-900 mb-1">{hosp.name}</h3>
                          <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">{hosp.location}</span>
                        </div>

                        <p className="text-sm text-gray-600 font-medium leading-relaxed">
                          {hosp.desc}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-100 bg-gray-50/80 -mx-8 sm:-mx-12 -mb-8 sm:-mb-12 p-8 rounded-b-[40px]">
                        <div>
                          <div className="text-3xl font-black text-gray-900">{hosp.annualPatients}</div>
                          <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Annual Patient Consultations</div>
                        </div>
                        <div>
                          <div className="text-3xl font-black text-rose-600">{hosp.safeDeliveries}</div>
                          <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">Safe Hospital Deliveries</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* COMMUNITY HEALTH MOBILIZATION */}
            <section className="py-24 bg-white border-t border-gray-100">
              <div className="container-custom">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                  
                  <div className="lg:col-span-6 space-y-6">
                    <span className="text-xs font-black uppercase tracking-[0.3em] text-brand-primary">Grassroots Governance</span>
                    <h3 className="text-3xl lg:text-5xl font-black text-gray-900 tracking-tight leading-tight">
                      Community-Led Sustainable Health (CLSH).
                    </h3>
                    <p className="text-base text-gray-600 font-medium leading-relaxed">
                      Since 2006, VERC has organized village mothers into Community Support Groups (CSGs) and Health Watch Committees (HWCs) that monitor public clinic availability, emergency blood donation registries, and ensure zero maternal deaths in their neighborhoods.
                    </p>

                    <div className="space-y-4 pt-2">
                      <div className="flex items-start gap-3.5">
                        <CheckCircle2 size={20} className="text-emerald-600 flex-shrink-0 mt-1" />
                        <div>
                          <h5 className="font-bold text-sm text-gray-900">Community Support Groups (CSGs)</h5>
                          <p className="text-xs text-gray-500">Village-level women groups providing antenatal counseling and hospital transport.</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3.5">
                        <CheckCircle2 size={20} className="text-emerald-600 flex-shrink-0 mt-1" />
                        <div>
                          <h5 className="font-bold text-sm text-gray-900">Village Blood Banks</h5>
                          <p className="text-xs text-gray-500">Grassroots voluntary blood registries created to respond instantly to obstetric emergencies.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-6">
                    <div className="bg-gray-900 p-10 sm:p-12 rounded-[44px] text-white shadow-2xl space-y-6">
                      <span className="text-xs font-black uppercase tracking-widest text-brand-secondary">Health Impact Metrics</span>
                      <h4 className="text-2xl font-black">Maternal & Child Health Highlights</h4>

                      <div className="space-y-6 divide-y divide-white/10">
                        <div className="pt-4 first:pt-0">
                          <div className="text-4xl font-black text-amber-400">100,000+</div>
                          <p className="text-xs font-medium text-gray-300 mt-1">Rural Mothers Screened for Antenatal/Postnatal Care</p>
                        </div>
                        <div className="pt-4">
                          <div className="text-4xl font-black text-emerald-400">99.8%</div>
                          <p className="text-xs font-medium text-gray-300 mt-1">Maternal Survival Rate in VERC Hospital Coverage Unions</p>
                        </div>
                        <div className="pt-4">
                          <div className="text-4xl font-black text-blue-400">24/7</div>
                          <p className="text-xs font-medium text-gray-300 mt-1">Emergency Obstetric & Neonatal Care at Savar & Mirsarai</p>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. CALL TO ACTION */}
      <section className="py-24 bg-brand-primary text-white relative overflow-hidden">
        <div className="container-custom relative z-10 text-center">
          <motion.div {...fadeIn} className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-4xl lg:text-7xl font-black tracking-tight leading-tight">
              Support Safe Water & <br />
              <span className="text-brand-secondary">Maternal Healthcare.</span>
            </h2>
            <p className="text-xl text-gray-200 font-medium max-w-2xl mx-auto leading-relaxed">
              Your contribution or institutional partnership directly installs arsenic-safe piped water networks and subsidizes hospital deliveries for impoverished rural mothers.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Link href="/donate" className="px-10 py-4 bg-white text-brand-primary text-lg font-black rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-3">
                Donate to Health & WaSH Fund <ArrowRight size={20} />
              </Link>
              <Link href="/contact" className="px-10 py-4 bg-white/10 text-white border border-white/20 text-lg font-bold rounded-2xl hover:bg-white/20 transition-all inline-block">
                Inquire for Institutional Partnership
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
