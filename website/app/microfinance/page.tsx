"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  TrendingUp, 
  Users, 
  Target, 
  MapPin, 
  ShieldCheck, 
  Briefcase, 
  Heart, 
  CheckCircle2, 
  ArrowRight, 
  Zap,
  Leaf,
  Users2,
  Home,
  Building2,
  Calendar,
  Layers,
  Sparkles,
  Globe
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import microHero from "@/app/assets/microfinance_woman_hero.png";
import { useContent } from "@/context/ContentContext";
import ContentImage from "@/components/ContentImage";
import AnimatedCounter from "@/components/AnimatedCounter";

export default function MicrofinancePage() {
  const { microfinanceProducts } = useContent();

  const stats = [
    { label: "Villages", value: "2,477", icon: <MapPin size={18} /> },
    { label: "Districts", value: "19", icon: <Globe size={18} /> },
    { label: "Branches", value: "136", icon: <Building2 size={18} /> },
    { label: "Active Members", value: "200K+", icon: <Users size={18} /> }
  ];

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  };

  return (
    <div className="bg-white min-h-screen font-sans selection:bg-brand-primary/10">
      {/* Immersive Hero Section */}
      <section className="relative min-h-[520px] py-20 sm:min-h-[70vh] sm:py-24 flex items-center overflow-hidden bg-gray-900">
        <div className="absolute inset-0 z-0">
          <Image 
            src={microHero} 
            alt="Microfinance Program" 
            fill sizes="100vw"
            className="object-cover object-center opacity-70"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/60 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-900"></div>
        </div>
        
        <div className="container-custom relative z-10 text-white text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-4xl mx-auto"
          >
            <Link href="/programs/livelihood#microfinance" className="mb-6 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-white/90 hover:text-white">Livelihood & Empowerment <ArrowRight size={14} /></Link><br />
            <span className="inline-flex items-center gap-2 px-5 py-2 bg-brand-primary/20 backdrop-blur-xl rounded-full text-[11px] font-black uppercase tracking-[0.4em] mb-10 border border-brand-primary/30 text-brand-secondary">
              Economic Empowerment
            </span>
            <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black mb-10 leading-[0.95] tracking-tighter">
              Micro <br/> <span className="text-brand-secondary">Finance.</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-2xl text-gray-300 leading-relaxed font-medium max-w-2xl mx-auto">
              Transforming lives through inclusive financial services, empowering women and rural entrepreneurs since 1982.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Overview & Strategy */}
      <section className="py-16 sm:py-24 lg:py-32 bg-white">
        <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 items-start">
                <motion.div {...fadeIn}>
                    <div className="flex items-center gap-3 text-brand-primary mb-6">
                        <TrendingUp size={24} />
                        <h2 className="font-black uppercase tracking-widest text-xs">Our Strategy</h2>
                    </div>
                    <h3 className="text-3xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-tight tracking-tighter mb-10">
                        Bridging the <br/> <span className="text-brand-primary">Financial Gap.</span>
                    </h3>
                    <p className="text-xl text-gray-600 leading-relaxed font-medium mb-8">
                        VERC reaches the disadvantaged, underprivileged poor, particularly women and ethnic minorities, to fulfill the demographic coverage goal of overcoming helplessness and deprivation.
                    </p>
                    <p className="text-lg text-gray-500 leading-relaxed mb-10">
                        From its inception, VERC has been expanding into remote and isolated areas, increasing multidimensional lending services to meet market demand for both rural and urban micro-economy sectors.
                    </p>
                    
                    <div className="grid grid-cols-1 min-[400px]:grid-cols-2 gap-4">
                        <div className="p-8 bg-brand-light/50 rounded-3xl border border-brand-primary/5">
                            <h4 className="font-black text-gray-900 mb-2 uppercase tracking-widest text-[10px]">Active Since</h4>
                            <div className="text-4xl font-black text-brand-primary tracking-tighter">1982</div>
                        </div>
                        <div className="p-8 bg-brand-light/50 rounded-3xl border border-brand-primary/5">
                            <h4 className="font-black text-gray-900 mb-2 uppercase tracking-widest text-[10px]">MRA Certified</h4>
                            <div className="text-3xl font-black text-brand-primary tracking-tighter">Approved</div>
                        </div>
                    </div>
                </motion.div>

                <div className="space-y-8">
                    <motion.div 
                        {...fadeIn}
                        className="p-6 sm:p-10 bg-gray-900 text-white rounded-[48px] shadow-2xl relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/20 rounded-full -mr-16 -mt-16"></div>
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 bg-brand-primary/20 rounded-xl text-brand-secondary">
                                <Target size={24} />
                            </div>
                            <h4 className="text-2xl font-black tracking-tight">Mission Goals</h4>
                        </div>
                        <div className="space-y-6">
                            <div>
                                <h5 className="font-black uppercase text-[10px] tracking-widest text-brand-secondary mb-2">The Goal</h5>
                                <p className="text-lg text-gray-300 font-medium italic">
                                    &quot;To create a community force capable of planning, operating and managing need based development programs to overcome poverty.&quot;
                                </p>
                            </div>
                            <div>
                                <h5 className="font-black uppercase text-[10px] tracking-widest text-brand-secondary mb-2">The Objective</h5>
                                <p className="text-lg text-gray-300 font-medium">
                                    To raise the economic status of the poor by engaging them in income generating activities and making them self-reliant.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
      </section>

      {/* Geographical Reach Stats */}
      <section className="py-14 sm:py-20 lg:py-24 bg-brand-primary text-white overflow-hidden relative">
        <div className="container-custom relative z-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-12 lg:gap-24 items-center">
                {stats.map((stat, i) => (
                    <motion.div 
                        key={i}
                        {...fadeIn}
                        transition={{ delay: i * 0.1 }}
                        className="text-center"
                    >
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-white/10 rounded-xl mb-6 text-brand-secondary">
                            {stat.icon}
                        </div>
                        <div className="text-3xl sm:text-5xl lg:text-6xl font-black mb-2 tracking-tighter">
                          <AnimatedCounter value={stat.value} duration={1.2} />
                        </div>
                        <div className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60">{stat.label}</div>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* Product Lines (Wings) - Dynamic from Admin */}
      <section className="py-16 sm:py-24 lg:py-32 bg-gray-50">
        <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-24">
                <div className="flex items-center justify-center gap-3 text-brand-primary mb-6">
                    <Layers size={24} />
                    <h2 className="font-black uppercase tracking-widest text-xs">Our Product Lines</h2>
                </div>
                <h3 className="text-3xl sm:text-4xl lg:text-6xl font-black mb-8 leading-tight tracking-tighter">Specialized <br/> <span className="text-brand-primary">Financial Wings.</span></h3>
                <p className="text-xl text-gray-600 font-medium">
                    Our multidimensional lending system delivery is designed to meet specific market demands and empower different social groups.
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {microfinanceProducts.map((product, i) => (
                    <motion.div 
                        key={product.id}
                        {...fadeIn}
                        transition={{ delay: i * 0.05 }}
                        className="p-6 sm:p-10 bg-white rounded-[40px] border border-transparent hover:border-brand-primary/10 hover:shadow-2xl transition-all group h-full flex flex-col justify-between"
                    >
                        <div className="space-y-4">
                          <div className="flex flex-wrap items-center justify-between gap-3">
                            <div className="relative w-20 h-20 rounded-2xl bg-brand-light flex items-center justify-center text-brand-primary group-hover:scale-110 transition-transform overflow-hidden">
                              <ContentImage src={product.imageUrl || "/assets/microfinance_hero.png"} alt={product.title} sizes="80px" />
                            </div>
                            <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 bg-purple-50 text-purple-700 rounded-full">
                              {product.category}
                            </span>
                          </div>
                          
                          <h4 className="text-2xl font-black text-gray-900 group-hover:text-brand-primary transition-colors">{product.title}</h4>
                          <p className="text-gray-500 font-medium text-sm leading-relaxed">{product.description}</p>

                          <div className="pt-2 text-xs space-y-1">
                            <div className="flex justify-between text-gray-500">
                              <span>Limit:</span>
                              <span className="font-bold text-gray-800">{product.loanLimit}</span>
                            </div>
                            <div className="flex justify-between text-gray-500">
                              <span>Tenure:</span>
                              <span className="font-bold text-gray-800">{product.tenure}</span>
                            </div>
                          </div>
                        </div>

                        <div className="pt-6 mt-6 border-t border-gray-100 flex items-center justify-between">
                          <Link href="/contact" className="text-xs font-bold text-brand-primary hover:underline flex items-center gap-1">
                            Apply & Inquire <ArrowRight size={12} />
                          </Link>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* Distinct Loans & Savings Options */}
      <section className="py-16 sm:py-24 bg-white border-t border-gray-100">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center gap-2 text-brand-primary font-black uppercase tracking-widest text-xs mb-3">
              <Sparkles size={16} /> Two Core Pillars of Microfinance
            </span>
            <h3 className="text-3xl sm:text-5xl font-black tracking-tight text-gray-900">
              Explore <span className="text-brand-primary">Loans</span> &amp; <span className="text-brand-primary">Savings.</span>
            </h3>
            <p className="mt-3 text-sm sm:text-base text-gray-600">
              Choose between our tailored credit programs for rural entrepreneurs and our transparent member savings schemes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div className="rounded-3xl border border-sky-200 bg-gradient-to-br from-sky-50/80 to-white p-6 sm:p-10 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all">
              <div className="space-y-4">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-primary text-white text-xs font-bold uppercase tracking-wider">
                  Option 01 · Loans
                </span>
                <h4 className="text-2xl sm:text-3xl font-black text-slate-900">
                  Microcredit &amp; Enterprise Loans
                </h4>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  Accessible revolving credit for rural women entrepreneurs, climate-resilient agriculture, seasonal farming, and small businesses across Bangladesh.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-sky-100">
                <Link
                  href="/microfinance/products?tab=loans#loans"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-brand-primary text-white font-bold text-sm hover:bg-sky-900 transition-all shadow-md"
                >
                  <span>Explore Loan Products</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-emerald-200 bg-gradient-to-br from-emerald-50/80 to-white p-6 sm:p-10 flex flex-col justify-between shadow-sm hover:shadow-xl transition-all">
              <div className="space-y-4">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider">
                  Option 02 · Savings
                </span>
                <h4 className="text-2xl sm:text-3xl font-black text-slate-900">
                  Member Savings Schemes
                </h4>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  Build long-term household resilience through General Savings, flexible Voluntary Savings, and Term Deposit (DPS) plans managed with 100% transparency.
                </p>
              </div>
              <div className="pt-6 mt-6 border-t border-emerald-100">
                <Link
                  href="/microfinance/products?tab=savings#savings"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-700 transition-all shadow-md"
                >
                  <span>Explore Savings Schemes</span>
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
