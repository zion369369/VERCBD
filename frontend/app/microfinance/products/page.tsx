"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Banknote, 
  TrendingUp, 
  Users, 
  Home, 
  Briefcase, 
  Zap, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  PieChart,
  HardHat,
  ShoppingBag
} from "lucide-react";
import Image from "next/image";

export default function MicrofinanceProductsPage() {
  const products = [
    {
      title: "Jagoron (BML)",
      desc: "Baseline Microcredit for individuals to initiate small-scale income-generating activities.",
      limit: "Tk. 10,000 - 50,000",
      icon: <Zap className="text-blue-500" />,
      color: "bg-blue-50"
    },
    {
      title: "Agrosor (SEL)",
      desc: "Micro-enterprise loans for expanding existing small businesses into sustainable ventures.",
      limit: "Tk. 50,000 - 500,000",
      icon: <TrendingUp className="text-emerald-500" />,
      color: "bg-emerald-50"
    },
    {
      title: "Sufolon (AL)",
      desc: "Specialized agricultural loans for farmers to purchase seeds, fertilizers, and equipment.",
      limit: "Seasonal / Project Based",
      icon: <HardHat className="text-amber-500" />,
      color: "bg-amber-50"
    },
    {
      title: "Buniad (UL)",
      desc: "Ultra-poor focused loans with flexible repayment for the most vulnerable segments.",
      limit: "Interest-Free / Low Interest",
      icon: <Home className="text-rose-500" />,
      color: "bg-rose-50"
    },
    {
      title: "Resilient Livelihood (RLL)",
      desc: "Focused on climate-resilient livelihoods for people in disaster-prone areas.",
      limit: "Need Based",
      icon: <ShieldCheck className="text-purple-500" />,
      color: "bg-purple-50"
    },
    {
      title: "Sanitation Loan",
      desc: "Low-interest loans specifically for building hygienic toilets and water systems.",
      limit: "Tk. 5,000 - 20,000",
      icon: <CheckCircle2 className="text-cyan-500" />,
      color: "bg-cyan-50"
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
            src="https://images.unsplash.com/photo-1554224155-1696413565d3?q=80&w=2070&auto=format&fit=crop" 
            alt="Microfinance Products" 
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
              Financial Empowerment
            </span>
            <h1 className="text-6xl lg:text-9xl font-black mb-10 leading-[0.95] tracking-tighter">
              Loan & Savings <br/> <span className="text-brand-secondary">Products.</span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed font-medium max-w-2xl mx-auto">
              Tailored financial solutions designed to empower rural entrepreneurs and secure the futures of marginalized families.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. SAVINGS PRODUCTS */}
      <section className="py-32 bg-white">
        <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                <motion.div {...fadeIn}>
                    <div className="flex items-center gap-3 text-brand-primary mb-6">
                        <PieChart size={24} />
                        <h2 className="font-black uppercase tracking-widest text-xs">Savings Schemes</h2>
                    </div>
                    <h3 className="text-5xl lg:text-7xl font-black text-gray-900 leading-tight tracking-tighter mb-10">
                        Secure Your <br/> <span className="text-brand-primary">Hard-earned Capital.</span>
                    </h3>
                    <p className="text-xl text-gray-600 leading-relaxed font-medium mb-12">
                        We offer a variety of savings products that encourage financial discipline and provide a safety net for our members. All savings are managed with 100% transparency and accessible when needed.
                    </p>
                    <div className="space-y-6">
                        {[
                            { title: "General Savings", desc: "Mandatory weekly savings for all group members to build basic capital." },
                            { title: "Voluntary Savings", desc: "Flexible savings that can be withdrawn at any time for emergencies." },
                            { title: "Term Savings (DPS)", desc: "Long-term savings plans with competitive interest rates for future goals." }
                        ].map((item, i) => (
                            <div key={i} className="flex gap-6 p-8 bg-brand-light rounded-[32px] border border-brand-primary/5">
                                <div className="p-3 bg-white rounded-xl text-brand-primary shadow-sm"><CheckCircle2 size={20} /></div>
                                <div>
                                    <h4 className="font-black text-gray-900 text-lg">{item.title}</h4>
                                    <p className="text-sm text-gray-500 font-medium">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
                
                <div className="relative h-[600px] w-full rounded-[64px] overflow-hidden shadow-2xl">
                    <Image 
                        src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=2071&auto=format&fit=crop" 
                        alt="Savings and Prosperity" 
                        fill 
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
                </div>
            </div>
        </div>
      </section>

      {/* 3. LOAN PRODUCTS GRID */}
      <section className="py-32 bg-gray-50">
        <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto mb-24">
                <div className="flex items-center justify-center gap-3 text-brand-primary mb-6">
                    <Banknote size={24} />
                    <h2 className="font-black uppercase tracking-widest text-xs">Credit Portfolio</h2>
                </div>
                <h3 className="text-4xl lg:text-6xl font-black mb-8 leading-tight tracking-tighter">Diverse Loan <br/> <span className="text-brand-primary">Solutions.</span></h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((item, i) => (
                    <motion.div 
                        key={i} 
                        {...fadeIn}
                        transition={{ delay: i * 0.1 }}
                        className={`${item.color} p-12 rounded-[56px] border border-transparent hover:border-brand-primary/10 hover:bg-white hover:shadow-2xl transition-all duration-500 group flex flex-col h-full`}
                    >
                        <div className="mb-10 w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                            {item.icon}
                        </div>
                        <h3 className="text-2xl font-black mb-4 text-gray-900 leading-tight">{item.title}</h3>
                        <p className="text-gray-500 font-medium mb-10 text-lg leading-relaxed">
                          {item.desc}
                        </p>
                        <div className="mt-auto pt-8 border-t border-gray-100 flex justify-between items-center">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Limit</p>
                                <p className="font-black text-gray-900">{item.limit}</p>
                            </div>
                            <button className="p-4 bg-white rounded-full shadow-sm hover:bg-brand-primary hover:text-white transition-all">
                                <ArrowRight size={20} />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* 4. CTA */}
      <section className="py-40 bg-brand-primary text-white">
        <div className="container-custom text-center">
            <motion.div {...fadeIn} className="max-w-4xl mx-auto">
                <h3 className="text-5xl lg:text-8xl font-black mb-12 leading-[1] tracking-tighter">Apply for a <br/> <span className="text-brand-secondary">Prosperous Future.</span></h3>
                <p className="text-2xl text-brand-light font-medium mb-16">
                    Join thousands of successful entrepreneurs who have transformed their lives through VERC's microfinance support.
                </p>
                <div className="flex flex-wrap justify-center gap-6">
                    <button className="px-12 py-6 bg-white text-brand-primary text-xl font-black rounded-3xl shadow-xl hover:scale-105 active:scale-95 transition-all">
                        Check Eligibility
                    </button>
                    <button className="px-12 py-6 bg-transparent border-2 border-white/20 text-white text-xl font-bold rounded-3xl hover:bg-white/10 transition-all">
                        Find Nearest Branch
                    </button>
                </div>
            </motion.div>
        </div>
      </section>
    </div>
  );
}
