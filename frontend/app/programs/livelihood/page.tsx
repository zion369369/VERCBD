"use client";

import React from "react";
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
  Home
} from "lucide-react";
import Image from "next/image";

export default function LivelihoodPage() {
  const initiatives = [
    {
      title: "Women Empowerment",
      desc: "Creating leadership opportunities and economic independence for marginalized women through skill training and self-help groups.",
      icon: <Users className="text-rose-500" />,
      color: "bg-rose-50"
    },
    {
      title: "Vocational Training",
      desc: "Equipping youth with marketable skills in tailoring, electronics, and agriculture to bridge the unemployment gap.",
      icon: <Briefcase className="text-blue-500" />,
      color: "bg-blue-50"
    },
    {
      title: "SME Support",
      desc: "Providing seed funding and business consultancy to small-scale rural entrepreneurs.",
      icon: <ShoppingBag className="text-emerald-500" />,
      color: "bg-emerald-50"
    },
    {
      title: "Housing & Infrastructure",
      desc: "Building resilient low-cost housing for victims of climate displacement and extreme poverty.",
      icon: <Home className="text-amber-500" />,
      color: "bg-amber-50"
    }
  ];

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  };

  return (
    <div className="bg-white min-h-screen font-sans selection:bg-brand-primary/10 overflow-x-hidden">
      {/* 1. HERO */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-gray-900 pt-24">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop" 
            alt="Livelihood & Empowerment" 
            fill 
            className="object-cover opacity-50 scale-105"
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
            <span className="inline-flex items-center gap-2 px-5 py-2 bg-brand-primary/20 backdrop-blur-xl rounded-full text-[11px] font-black uppercase tracking-[0.4em] mb-10 border border-brand-primary/30 text-brand-secondary">
              Social Empowerment Program
            </span>
            <h1 className="text-6xl lg:text-9xl font-black mb-10 leading-[0.95] tracking-tighter">
              Livelihood & <br/> <span className="text-brand-secondary">Empowerment.</span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed font-medium max-w-2xl mx-auto">
              Building resilient futures by empowering the marginalized segments of society through skill, scale, and sustainability.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. PHILOSOPHY */}
      <section className="py-32 bg-white">
        <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
                <motion.div {...fadeIn}>
                    <div className="flex items-center gap-3 text-brand-primary mb-6">
                        <Heart size={24} />
                        <h2 className="font-black uppercase tracking-widest text-xs">Our Core Focus</h2>
                    </div>
                    <h3 className="text-5xl lg:text-7xl font-black text-gray-900 leading-tight tracking-tighter mb-10">
                        Economic <br/> <span className="text-brand-primary">Resilience.</span>
                    </h3>
                    <p className="text-xl text-gray-600 leading-relaxed font-medium mb-8">
                        At VERC, we believe that true empowerment comes from economic independence. Our livelihood programs are designed to break the cycle of poverty by providing the tools, training, and capital necessary for sustainable growth.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {[
                            "Participatory Rural Appraisal (PRA)",
                            "Community-Led Resource Mapping",
                            "Climate-Adaptive Livelihoods",
                            "Market Linkage Development"
                        ].map((h, i) => (
                            <div key={i} className="flex items-center gap-3 text-gray-700 font-bold text-sm">
                                <CheckCircle2 size={18} className="text-brand-primary flex-shrink-0" />
                                {h}
                            </div>
                        ))}
                    </div>
                </motion.div>
                
                <div className="relative">
                    <div className="absolute -inset-4 bg-brand-primary/5 rounded-[64px] blur-3xl"></div>
                    <div className="relative bg-gray-900 p-12 lg:p-20 rounded-[64px] text-white overflow-hidden border border-white/10 shadow-2xl">
                        <h4 className="text-3xl font-black mb-8 tracking-tighter text-brand-secondary">Program Impact</h4>
                        <div className="space-y-12">
                            <div>
                                <div className="text-5xl font-black mb-2">85,000+</div>
                                <p className="text-gray-400 font-medium uppercase tracking-widest text-[10px]">Women Entrepreneurs Trained</p>
                            </div>
                            <div>
                                <div className="text-5xl font-black mb-2">12,500+</div>
                                <p className="text-gray-400 font-medium uppercase tracking-widest text-[10px]">Youth Placed in Vocational Jobs</p>
                            </div>
                            <div>
                                <div className="text-5xl font-black mb-2">30+</div>
                                <p className="text-gray-400 font-medium uppercase tracking-widest text-[10px]">Districts Impacted</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* 3. INITIATIVES GRID */}
      <section className="py-32 bg-gray-50">
        <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto mb-24">
                <div className="flex items-center justify-center gap-3 text-brand-primary mb-6">
                    <Sparkles size={24} />
                    <h2 className="font-black uppercase tracking-widest text-xs">Pillars of Growth</h2>
                </div>
                <h3 className="text-4xl lg:text-6xl font-black mb-8 leading-tight tracking-tighter">Strategic <br/> <span className="text-brand-primary">Interventions.</span></h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {initiatives.map((item, i) => (
                    <motion.div 
                        key={i} 
                        {...fadeIn}
                        transition={{ delay: i * 0.1 }}
                        className={`${item.color} p-10 rounded-[48px] border border-transparent hover:border-brand-primary/10 hover:bg-white hover:shadow-2xl transition-all duration-500 group flex flex-col h-full`}
                    >
                        <div className="mb-8 w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                            {item.icon}
                        </div>
                        <h3 className="text-2xl font-black mb-4 text-gray-900 leading-tight">{item.title}</h3>
                        <p className="text-gray-500 font-medium mb-10 text-sm leading-relaxed">
                          {item.desc}
                        </p>
                        <button className="mt-auto inline-flex items-center gap-2 text-[12px] font-black uppercase tracking-widest text-brand-primary hover:gap-4 transition-all">
                          Success Stories <ArrowRight size={14} />
                        </button>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* 4. CASE STUDY */}
      <section className="py-40 bg-white">
        <div className="container-custom">
            <div className="bg-gray-900 rounded-[64px] overflow-hidden shadow-2xl flex flex-col lg:flex-row items-stretch border border-white/10">
                <div className="flex-1 p-12 lg:p-24 space-y-10 text-white">
                    <div className="flex items-center gap-3 text-brand-secondary">
                        <Award size={20} />
                        <h4 className="font-black uppercase tracking-widest text-xs">Empowerment Spotlight</h4>
                    </div>
                    <h3 className="text-4xl lg:text-6xl font-black leading-tight tracking-tighter">Transforming <br/> <span className="text-brand-secondary">Rural Crafts.</span></h3>
                    <p className="text-xl text-gray-400 leading-relaxed font-medium">
                        Our textile initiative in Savar has trained over 500 women in modern weaving techniques, connecting them directly with urban retail markets and doubling their household income.
                    </p>
                    <div className="pt-6">
                        <button className="px-10 py-5 bg-brand-secondary text-gray-900 font-black rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all">
                            Partner for Livelihoods
                        </button>
                    </div>
                </div>
                <div className="flex-1 relative min-h-[400px]">
                    <Image 
                        src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2026&auto=format&fit=crop" 
                        alt="Empowerment in Action" 
                        fill 
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-l from-gray-900 via-transparent to-transparent"></div>
                </div>
            </div>
        </div>
      </section>

      {/* 5. CTA */}
      <section className="py-40 bg-brand-light">
        <div className="container-custom text-center">
            <motion.div {...fadeIn} className="max-w-4xl mx-auto">
                <h3 className="text-5xl lg:text-8xl font-black text-gray-900 mb-12 leading-[1] tracking-tighter">Build a <br/> <span className="text-brand-primary">Resilient Future.</span></h3>
                <p className="text-2xl text-gray-600 font-medium mb-16">
                    Support VERC in creating sustainable livelihoods for the most vulnerable communities in Bangladesh.
                </p>
                <div className="flex flex-wrap justify-center gap-6">
                    <button className="px-12 py-6 bg-brand-primary text-white text-xl font-black rounded-3xl shadow-xl hover:scale-105 active:scale-95 transition-all">
                        Support a Family
                    </button>
                    <button className="px-12 py-6 bg-white text-brand-primary text-xl font-bold rounded-3xl border-2 border-brand-primary/10 hover:bg-brand-primary/5 transition-all">
                        Corporate Partnership
                    </button>
                </div>
            </motion.div>
        </div>
      </section>
    </div>
  );
}
