"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Heart, 
  Globe, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Zap,
  Users,
  Handshake,
  DollarSign,
  CreditCard,
  Building
} from "lucide-react";
import Image from "next/image";

export default function DonatePage() {
  const [amount, setAmount] = useState("5000");

  const impactPoints = [
    { amount: "1,000", label: "Education", desc: "Provides school supplies for one month for a marginalized student." },
    { amount: "5,000", label: "Health", desc: "Covers the cost of one safe delivery at a VERC MCH Hospital." },
    { amount: "10,000", label: "Livelihood", desc: "Provides seed funding for a woman entrepreneur to start a small business." },
    { amount: "25,000", label: "Water", desc: "Funds the installation of one deep tube well for a rural community." }
  ];

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  };

  return (
    <div className="bg-[#FDFDFD] min-h-screen font-sans selection:bg-brand-primary/10 overflow-x-hidden">
      {/* 1. HERO */}
      <section className="relative h-[60vh] flex items-center overflow-hidden bg-gray-900">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop" 
            alt="Support VERC" 
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
              Be the Change
            </span>
            <h1 className="text-6xl lg:text-9xl font-black mb-10 leading-[0.95] tracking-tighter">
              Transform <br/> <span className="text-brand-secondary">Destinies.</span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed font-medium max-w-2xl mx-auto">
              Your contribution fuels sustainable development, providing education, health, and clean water to those who need it most.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. DONATION FORM & IMPACT */}
      <section className="py-32 bg-white relative z-20 rounded-t-[64px] -mt-12">
        <div className="container-custom">
            <div className="flex flex-col lg:flex-row gap-24 items-start">
                {/* Impact Calculator */}
                <div className="flex-1 space-y-12">
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 text-brand-primary">
                            <Zap size={24} />
                            <h2 className="font-black uppercase tracking-widest text-xs">Your Impact</h2>
                        </div>
                        <h3 className="text-4xl lg:text-6xl font-black text-gray-900 leading-tight tracking-tighter">
                            See What Your <br/> <span className="text-brand-primary">Gift Can Do.</span>
                        </h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {impactPoints.map((point, i) => (
                            <div 
                                key={i}
                                onClick={() => setAmount(point.amount.replace(/,/g, ''))}
                                className={`p-10 rounded-[40px] border cursor-pointer transition-all duration-300 ${amount === point.amount.replace(/,/g, '') ? "bg-brand-primary text-white border-brand-primary shadow-2xl scale-[1.02]" : "bg-gray-50 border-gray-100 hover:border-brand-primary/20 text-gray-900"}`}
                            >
                                <div className="text-xs font-black uppercase tracking-widest mb-4 opacity-60">{point.label}</div>
                                <div className="text-3xl font-black mb-4">BDT {point.amount}</div>
                                <p className={`text-sm font-medium leading-relaxed ${amount === point.amount.replace(/,/g, '') ? "text-white/80" : "text-gray-500"}`}>
                                    {point.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Donation Card */}
                <div className="lg:w-[450px] sticky top-32">
                    <div className="bg-gray-900 p-12 rounded-[56px] text-white shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/10 rounded-full -mr-16 -mt-16"></div>
                        
                        <h4 className="text-2xl font-black mb-10 tracking-tight">Make a Contribution</h4>
                        
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Amount (BDT)</label>
                                <div className="relative">
                                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-black text-brand-secondary">৳</span>
                                    <input 
                                        type="text" 
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-6 pl-14 pr-6 text-3xl font-black focus:border-brand-secondary outline-none transition-all"
                                    />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Payment Method</label>
                                <div className="grid grid-cols-2 gap-4">
                                    <button className="flex flex-col items-center gap-2 p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-brand-secondary/20 hover:border-brand-secondary transition-all">
                                        <CreditCard size={24} className="text-brand-secondary" />
                                        <span className="text-[10px] font-black uppercase">Card / Mobile</span>
                                    </button>
                                    <button className="flex flex-col items-center gap-2 p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-brand-secondary/20 hover:border-brand-secondary transition-all">
                                        <Building size={24} className="text-brand-secondary" />
                                        <span className="text-[10px] font-black uppercase">Bank Transfer</span>
                                    </button>
                                </div>
                            </div>

                            <button className="w-full py-6 bg-brand-secondary text-gray-900 text-xl font-black rounded-2xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl">
                                Complete Donation
                            </button>
                            
                            <div className="flex items-center justify-center gap-2 text-gray-500 text-[10px] font-black uppercase tracking-widest">
                                <ShieldCheck size={14} className="text-emerald-500" /> Secure SSL Encrypted
                            </div>
                        </div>
                    </div>
                    
                    <div className="mt-8 p-8 bg-brand-light rounded-[40px] border border-brand-primary/5">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-brand-primary"><Users size={20} /></div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Join Over</p>
                                <p className="font-black text-gray-900">5,000+ Individual Donors</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* 3. CORPORATE PARTNERSHIP */}
      <section className="py-40 bg-gray-50">
        <div className="container-custom">
            <div className="bg-white rounded-[64px] p-12 lg:p-24 shadow-sm border border-gray-100 flex flex-col lg:flex-row items-center gap-24">
                <div className="flex-1 space-y-10">
                    <div className="flex items-center gap-3 text-brand-primary">
                        <Handshake size={28} />
                        <h2 className="font-black uppercase tracking-widest text-xs">Institutional Giving</h2>
                    </div>
                    <h3 className="text-5xl lg:text-7xl font-black text-gray-900 leading-[1] tracking-tighter">
                        CSR & Corporate <br/> <span className="text-brand-primary">Partnerships.</span>
                    </h3>
                    <p className="text-xl text-gray-600 font-medium leading-relaxed">
                        Are you an organization looking to drive large-scale impact? Partner with VERC to implement high-impact CSR projects that align with the Global SDGs.
                    </p>
                    <div className="pt-8">
                        <button className="px-10 py-5 bg-brand-primary text-white font-black rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all">
                            Partner for Impact
                        </button>
                    </div>
                </div>
                <div className="flex-1 w-full relative h-[400px] rounded-[48px] overflow-hidden">
                    <Image 
                        src="https://images.unsplash.com/photo-1521791136064-7986c2923216?q=80&w=2069&auto=format&fit=crop" 
                        alt="Corporate Partnership" 
                        fill 
                        className="object-cover"
                    />
                </div>
            </div>
        </div>
      </section>

      {/* 4. TRUST & ACCREDITATION */}
      <section className="py-40 bg-white">
        <div className="container-custom text-center">
            <div className="max-w-4xl mx-auto space-y-16">
                <div className="flex items-center justify-center gap-3 text-brand-primary mb-6">
                    <ShieldCheck size={24} />
                    <h2 className="font-black uppercase tracking-widest text-xs">Trust Matters</h2>
                </div>
                <h3 className="text-5xl lg:text-8xl font-black text-gray-900 leading-[1] tracking-tighter">
                    Transparent <br/> <span className="text-brand-primary">Stewardship.</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { title: "Tax Exemption", desc: "All donations to VERC are eligible for tax deduction under NBR rules.", icon: <DollarSign size={24} /> },
                        { title: "Full Transparency", desc: "Quarterly impact reports sent directly to all individual donors.", icon: <Globe size={24} /> },
                        { title: "Low Overhead", desc: "92% of all donations go directly to community programs.", icon: <Target size={24} /> }
                    ].map((item, i) => (
                        <div key={i} className="p-10 bg-gray-50 rounded-[40px] space-y-6">
                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mx-auto text-brand-primary shadow-sm">{item.icon}</div>
                            <h5 className="text-xl font-black text-gray-900">{item.title}</h5>
                            <p className="text-sm text-gray-500 font-medium leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </section>
    </div>
  );
}
