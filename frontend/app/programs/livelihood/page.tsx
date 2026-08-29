"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Heart, 
  Users, 
  TrendingUp, 
  Target, 
  Award, 
  Briefcase, 
  CheckCircle2, 
  ArrowRight, 
  Zap,
  Sparkles,
  ShoppingBag,
  Home,
  Sprout,
  ShieldCheck,
  ChevronRight,
  Eye
} from "lucide-react";

export default function LivelihoodPage() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const galleryItems = [
    {
      title: "Agro-Enterprise & Climate-Adaptive Farming",
      subtitle: "Sustainable Agriculture & Organic Produce",
      desc: "VERC provides rural women farmers with high-yield climate-resilient seeds, organic fertilizer training, and direct village-to-urban retail linkages to maximize household yield.",
      image: "/assets/livelihood_agro.jpg",
      fallback: "https://www.vercbd.org/images/image-10-main-2.jpg",
      tag: "Agriculture & Agro-Processing",
      stats: "35,000+ Farmers Empowered"
    },
    {
      title: "Vocational Training & Skills Development",
      subtitle: "Youth Employment & Marketable Trades",
      desc: "Equipping underprivileged youth and women with market-relevant trade certifications in garment manufacturing, tailoring, electrical servicing, and green tech installation.",
      image: "/assets/livelihood_vocational.jpg",
      fallback: "https://www.vercbd.org/images/image-7-main-1.jpg",
      tag: "Vocational Certification",
      stats: "12,500+ Certified Graduates"
    },
    {
      title: "Self-Help Groups & Micro-Enterprise Growth",
      subtitle: "Grassroots Financial Inclusion & Capital",
      desc: "Mobilizing women into community-managed Self-Help Groups (SHGs) that cultivate collective savings habits, grant emergency safety nets, and disburse low-interest business loans.",
      image: "/assets/livelihood_community.jpg",
      fallback: "https://www.vercbd.org/images/ibig16.jpg",
      tag: "Women Self-Help Groups",
      stats: "85,000+ Active Members"
    }
  ];

  const strategicPillars = [
    {
      title: "Women Economic Autonomy",
      desc: "Fostering female financial self-reliance through seed-capital micro-grants, enterprise bookkeeping, and peer mentorship networks.",
      icon: <Users className="text-rose-500 w-7 h-7" />,
      color: "bg-rose-50/60 border-rose-100"
    },
    {
      title: "Agro-Value Chain & Markets",
      desc: "Connecting rural poultry, livestock, and vegetable producers directly to regional wholesale aggregators, cutting out exploitative middlemen.",
      icon: <Sprout className="text-emerald-500 w-7 h-7" />,
      color: "bg-emerald-50/60 border-emerald-100"
    },
    {
      title: "Youth Technical Employment",
      desc: "Operating specialized technical training institutes with job placement matching and apprenticeship opportunities across growing industries.",
      icon: <Briefcase className="text-blue-500 w-7 h-7" />,
      color: "bg-blue-50/60 border-blue-100"
    },
    {
      title: "Resilient Habitat & Assets",
      desc: "Designing disaster-resilient low-cost housing and clean energy stoves to protect productive community capital against climate shocks.",
      icon: <Home className="text-amber-500 w-7 h-7" />,
      color: "bg-amber-50/60 border-amber-100"
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
            src="/assets/livelihood_agro.jpg" 
            alt="Livelihood & Community Empowerment" 
            className="w-full h-full object-cover opacity-25 scale-105"
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
              <span className="text-brand-secondary">Livelihood</span>
            </div>

            <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-500/10 rounded-full text-xs font-black uppercase tracking-[0.25em] text-emerald-400 border border-emerald-500/30">
              <TrendingUp size={14} className="text-emerald-400" /> Economic Self-Reliance
            </span>
            
            <h1 className="text-5xl lg:text-8xl font-black tracking-tight leading-tight">
              Livelihood & <span className="text-brand-secondary">Empowerment.</span>
            </h1>
            
            <p className="text-lg lg:text-2xl text-gray-300 font-medium max-w-3xl mx-auto leading-relaxed">
              Transforming marginalized rural populations into self-reliant producers, entrepreneurs, and community leaders through vocational mastery, agricultural innovation, and micro-capital.
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Link href="/donate" className="px-8 py-4 bg-brand-secondary text-gray-900 font-black rounded-2xl shadow-xl hover:scale-105 transition-all text-sm">
                Support a Micro-Entrepreneur
              </Link>
              <Link href="/contact" className="px-8 py-4 bg-white/10 text-white border border-white/20 font-bold rounded-2xl hover:bg-white/20 transition-all text-sm">
                Partner on CSR Programs
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. REAL-WORLD FIELD GALLERY SPOTLIGHT (THE 3 IMAGES) */}
      <section className="py-24 bg-gray-50/70 border-b border-gray-100">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
            <span className="text-xs font-black uppercase tracking-[0.3em] text-brand-primary">Ground Realities</span>
            <h2 className="text-3xl lg:text-5xl font-black text-gray-900 tracking-tight">
              Empowerment in Direct Action
            </h2>
            <p className="text-gray-600 font-medium text-base">
              Explore how VERC&apos;s field interventions create tangible household income and self-dignity across Bangladesh.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {galleryItems.map((item, idx) => (
              <motion.div
                key={idx}
                {...fadeIn}
                transition={{ delay: idx * 0.15 }}
                className="bg-white rounded-[36px] overflow-hidden border border-gray-200/80 shadow-[0_15px_40px_rgba(0,0,0,0.04)] hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col group"
              >
                {/* Image Container with Hover Zoom */}
                <div className="relative h-72 w-full overflow-hidden bg-gray-100">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = item.fallback;
                    }}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent"></div>
                  
                  {/* Floating Tag */}
                  <span className="absolute top-5 left-5 px-3.5 py-1.5 bg-white/90 backdrop-blur-md text-gray-900 text-xs font-bold rounded-full shadow-md">
                    {item.tag}
                  </span>

                  {/* Impact Stat Badge */}
                  <span className="absolute bottom-4 left-5 right-5 text-white text-xs font-bold flex items-center justify-between">
                    <span className="text-brand-secondary font-black">{item.stats}</span>
                    <span className="flex items-center gap-1 opacity-90"><ShieldCheck size={14} className="text-emerald-400" /> Verified Field Project</span>
                  </span>
                </div>

                {/* Card Content */}
                <div className="p-8 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-xl font-black text-gray-900 mb-2 leading-snug group-hover:text-brand-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs font-bold text-brand-primary uppercase tracking-wider mb-3">
                      {item.subtitle}
                    </p>
                    <p className="text-sm text-gray-600 font-medium leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-black text-brand-primary uppercase tracking-wider">
                    <span>Active Field Operation</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CORE STRATEGY & NUMERICAL IMPACT */}
      <section className="py-28 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Strategy Column */}
            <motion.div {...fadeIn} className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <span className="text-xs font-black uppercase tracking-[0.3em] text-brand-primary">Sustainable Methodology</span>
                <h2 className="text-4xl lg:text-6xl font-black text-gray-900 leading-[1.08] tracking-tight">
                  Breaking Intergenerational <br />
                  <span className="text-brand-primary">Poverty Cycles.</span>
                </h2>
              </div>

              <p className="text-lg text-gray-600 font-medium leading-relaxed">
                VERC’s livelihood development model does not rely on short-term handouts. We introduce systemic economic capacity: pairing market-tested vocational skills with ethical seed capital and institutional market linkages.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {[
                  "Participatory Rural Appraisal (PRA) Mapping",
                  "Climate-Adaptive Agricultural Methods",
                  "Collective Women Self-Help Savings (SHGs)",
                  "Wholesale & Retail Value-Chain Integration",
                  "Small & Medium Enterprise (SME) Incubation",
                  "Ethical Micro-Credit with Zero Coercion"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm font-bold text-gray-800">
                    <CheckCircle2 size={18} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Link href="/microfinance" className="inline-flex items-center gap-3 text-sm font-black uppercase tracking-widest text-brand-primary hover:gap-5 transition-all">
                  Explore Microfinance & Savings Products <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>

            {/* Impact Metric Pillar */}
            <motion.div {...fadeIn} transition={{ delay: 0.15 }} className="lg:col-span-5">
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-10 sm:p-12 rounded-[44px] text-white shadow-2xl space-y-8 border border-gray-800">
                <div className="border-b border-white/10 pb-4">
                  <span className="text-xs font-black uppercase tracking-[0.25em] text-brand-secondary">Cumulative Reach</span>
                  <h4 className="text-2xl font-black text-white mt-1">Livelihood Milestones</h4>
                </div>

                <div className="space-y-6">
                  <div>
                    <div className="text-5xl font-black text-amber-400">85,000+</div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-1">Women Entrepreneurs Funded & Mentored</p>
                  </div>

                  <div>
                    <div className="text-5xl font-black text-emerald-400">12,500+</div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-1">Youth Graduated from Trade Centers</p>
                  </div>

                  <div>
                    <div className="text-5xl font-black text-blue-400">30+</div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-1">Districts Actively Covered Across Bangladesh</p>
                  </div>

                  <div>
                    <div className="text-5xl font-black text-purple-400">98.4%</div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mt-1">Micro-Enterprise Repayment & Sustainability Rate</p>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 4. STRATEGIC INTERVENTIONS GRID */}
      <section className="py-24 bg-gray-50/60 border-t border-gray-100">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16 space-y-3">
            <span className="text-xs font-black uppercase tracking-[0.3em] text-brand-primary">Intervention Matrix</span>
            <h2 className="text-3xl lg:text-5xl font-black text-gray-900 tracking-tight">
              Pillars of Sustainable Growth
            </h2>
            <p className="text-gray-600 font-medium text-base">
              Integrated development strategies targeting multidimensional poverty.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {strategicPillars.map((pillar, i) => (
              <motion.div
                key={i}
                {...fadeIn}
                transition={{ delay: i * 0.1 }}
                className={`${pillar.color} p-8 rounded-[36px] border bg-white shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between`}
              >
                <div className="space-y-4">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                    {pillar.icon}
                  </div>
                  <h3 className="text-xl font-black text-gray-900 leading-snug">{pillar.title}</h3>
                  <p className="text-xs text-gray-600 font-medium leading-relaxed">{pillar.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION */}
      <section className="py-24 bg-brand-primary text-white relative overflow-hidden">
        <div className="container-custom relative z-10 text-center">
          <motion.div {...fadeIn} className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-4xl lg:text-7xl font-black tracking-tight leading-tight">
              Empower a Family. <br />
              <span className="text-brand-secondary">Transform an Entire Community.</span>
            </h2>
            <p className="text-xl text-gray-200 font-medium max-w-2xl mx-auto leading-relaxed">
              Your partnership or contribution directly equips a rural woman or youth with life-changing skills and sustainable income.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Link href="/donate" className="px-10 py-4 bg-white text-brand-primary text-lg font-black rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-3">
                Donate to Livelihood Fund <ArrowRight size={20} />
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
