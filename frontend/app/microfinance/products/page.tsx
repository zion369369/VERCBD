"use client";

import React from "react";
import Link from "next/link";
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
import ContentImage from "@/components/ContentImage";
import { useContent } from "@/context/ContentContext";

export default function MicrofinanceProductsPage() {
  const { microfinanceProducts } = useContent();
  const products = microfinanceProducts.map(product => ({ ...product, desc: product.description, limit: product.loanLimit, color: "bg-white" }));

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  };

  return (
    <div className="bg-white min-h-screen font-sans selection:bg-brand-primary/10 overflow-x-hidden">
      {/* 1. HERO */}
      <section className="relative min-h-[520px] sm:min-h-[70vh] flex items-center overflow-hidden bg-gray-900 py-20 sm:py-24">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/assets/microfinance_woman_hero.png"
            alt="Microfinance Products" 
            fill sizes="100vw"
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
            <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black mb-10 leading-[0.95] tracking-tighter">
              Loan & Savings <br/> <span className="text-brand-secondary">Products.</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-2xl text-gray-300 leading-relaxed font-medium max-w-2xl mx-auto">
              Tailored financial solutions designed to empower rural entrepreneurs and secure the futures of marginalized families.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. SAVINGS PRODUCTS */}
      <section className="py-16 sm:py-24 lg:py-32 bg-white">
        <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 items-center">
                <motion.div {...fadeIn}>
                    <div className="flex items-center gap-3 text-brand-primary mb-6">
                        <PieChart size={24} />
                        <h2 className="font-black uppercase tracking-widest text-xs">Savings Schemes</h2>
                    </div>
                    <h3 className="text-3xl sm:text-5xl lg:text-6xl font-black text-gray-900 leading-tight tracking-tighter mb-10">
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
                
                <div className="relative aspect-[4/3] w-full rounded-3xl sm:rounded-[48px] lg:rounded-[64px] overflow-hidden shadow-2xl">
                    <Image 
                        src="/assets/microfinance_hero.png"
                        alt="Savings and Prosperity" 
                        fill sizes="(max-width: 1023px) 100vw, 50vw"
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
                </div>
            </div>
        </div>
      </section>

      {/* 3. LOAN PRODUCTS GRID */}
      <section className="py-16 sm:py-24 lg:py-32 bg-gray-50">
        <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-24">
                <div className="flex items-center justify-center gap-3 text-brand-primary mb-6">
                    <Banknote size={24} />
                    <h2 className="font-black uppercase tracking-widest text-xs">Credit Portfolio</h2>
                </div>
                <h3 className="text-3xl sm:text-4xl lg:text-6xl font-black mb-8 leading-tight tracking-tighter">Diverse Loan <br/> <span className="text-brand-primary">Solutions.</span></h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((item, i) => (
                    <motion.div 
                        key={item.id}
                        {...fadeIn}
                        transition={{ delay: i * 0.1 }}
                        className={`${item.color} p-6 sm:p-12 rounded-3xl sm:rounded-[40px] lg:rounded-[56px] border border-transparent hover:border-brand-primary/10 hover:bg-white hover:shadow-2xl transition-all duration-500 group flex flex-col h-full`}
                    >
                        <div className="relative mb-6 aspect-[16/10] overflow-hidden rounded-2xl bg-slate-100">
                          <ContentImage src={item.imageUrl || "/assets/microfinance_hero.png"} alt={item.title} sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 400px" />
                        </div>
                        <p className="mb-3 text-xs font-bold uppercase tracking-wide text-brand-primary">{item.category}</p>
                        <h3 className="text-2xl font-black mb-4 text-gray-900 leading-tight">{item.title}</h3>
                        <p className="text-gray-500 font-medium mb-10 text-lg leading-relaxed">
                          {item.desc}
                        </p>
                        <div className="mt-auto pt-8 border-t border-gray-100 flex justify-between gap-4 items-center">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Limit</p>
                                <p className="font-black text-gray-900">{item.limit}</p>
                            </div>
                            <Link href="/contact" aria-label={`Inquire about ${item.title}`} className="shrink-0 p-4 bg-sky-50 text-brand-primary rounded-full shadow-sm hover:bg-brand-primary hover:text-white transition-all">
                                <ArrowRight size={20} />
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* 4. CTA */}
      <section className="py-16 sm:py-24 lg:py-40 bg-brand-primary text-white">
        <div className="container-custom text-center">
            <motion.div {...fadeIn} className="max-w-4xl mx-auto">
                <h3 className="text-4xl sm:text-5xl lg:text-7xl font-black mb-12 leading-[1] tracking-tighter">Apply for a <br/> <span className="text-brand-secondary">Prosperous Future.</span></h3>
                <p className="text-2xl text-brand-light font-medium mb-16">
                    Join thousands of successful entrepreneurs who have transformed their lives through VERC’s microfinance support.
                </p>
                <div className="flex justify-center">
                    <Link 
                        href="/contact"
                        className="inline-flex items-center gap-3 px-6 sm:px-10 py-4 bg-white text-brand-primary text-xl font-black rounded-3xl shadow-xl hover:scale-105 active:scale-95 transition-all"
                    >
                        <span>Contact our team</span>
                        <ArrowRight size={22} />
                    </Link>
                </div>
            </motion.div>
        </div>
      </section>
    </div>
  );
}
