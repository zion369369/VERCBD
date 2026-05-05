"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Briefcase, TrendingUp, Users, ShieldCheck, Landmark, 
  ArrowRight, PieChart, BarChart3, Globe, Zap, 
  CheckCircle2, DollarSign, Wallet, GraduationCap, Heart, Droplets 
} from "lucide-react";

export default function MicrofinancePage() {
  const wings = [
    { name: "Jagoron", desc: "Small loans empowering poor families, especially women, to engage in productive self-employment.", icon: <Users size={24} />, color: "bg-blue-50", textColor: "text-blue-600" },
    { name: "Agrosor", desc: "Micro-enterprise lending for small entrepreneurs and market-based businesses to scale operations.", icon: <Zap size={24} />, color: "bg-amber-50", textColor: "text-amber-600" },
    { name: "Buniad", desc: "Specialized financial support designed specifically for the ultra-poor and disadvantaged households.", icon: <Heart size={24} />, color: "bg-rose-50", textColor: "text-rose-600" },
    { name: "Sufolon", desc: "Agricultural investment wings contributing to making farming a dynamic sector of development.", icon: <Globe size={24} />, color: "bg-emerald-50", textColor: "text-emerald-600" },
    { name: "ENRICH", desc: "Comprehensive poverty elimination program focusing on resource enhancement and capacity building.", icon: <SparklesIcon size={24} />, color: "bg-indigo-50", textColor: "text-indigo-600" },
    { name: "Elderly Program", desc: "Dedicated financial and social welfare support to uplift the quality of life for the elderly.", icon: <ShieldCheck size={24} />, color: "bg-slate-50", textColor: "text-slate-600" },
    { name: "OBA Sanitation", desc: "Specialized microfinance project focused on improving community-wide sanitation infrastructure.", icon: <Droplets size={24} />, color: "bg-cyan-50", textColor: "text-cyan-600" }
  ];

  const stats = [
    { label: "Active Members", value: "112,437", sub: "As of March 2026" },
    { label: "Total Borrowers", value: "83,080", sub: "Productive households" },
    { label: "Recovery Rate", value: "99.10%", sub: "Cumulative Performance" },
    { label: "Savings Balance", value: "2.1B+", sub: "Tk (BDT)" },
  ];

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  };

  return (
    <div className="bg-[#F9FAFB] min-h-screen font-sans">
      {/* Hero Header */}
      <section className="bg-white border-b border-gray-100 pt-32 pb-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-primary/5 blur-[120px] -mr-20 mt-20"></div>
        <div className="container-custom relative z-10">
            <motion.div {...fadeIn} className="max-w-4xl">
                <div className="flex items-center gap-3 text-brand-primary mb-8">
                    <Landmark size={24} />
                    <h2 className="font-black uppercase tracking-[0.4em] text-xs">Economic Empowerment</h2>
                </div>
                <h1 className="text-6xl lg:text-9xl font-black text-gray-900 mb-10 leading-[0.95] tracking-tighter">
                    Microfinance <br/> <span className="text-brand-primary">Services.</span>
                </h1>
                <p className="text-xl lg:text-2xl text-gray-500 font-medium max-w-3xl leading-relaxed">
                    Building a self-reliant society through multidimensional lending and financial inclusion for the marginalized.
                </p>
            </motion.div>
        </div>
      </section>

      {/* Philosophy & Goal Section */}
      <section className="py-32">
        <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
                <motion.div {...fadeIn} className="space-y-12">
                    <div className="space-y-6">
                        <h3 className="text-xs font-black uppercase tracking-widest text-brand-primary">Our Philosophy</h3>
                        <p className="text-2xl text-gray-900 font-bold leading-tight">
                            VERC believes that without a positive change in economic status, all types of development activities prove futile.
                        </p>
                        <p className="text-lg text-gray-500 font-medium leading-relaxed">
                            Since 1982, we have been bridging the gap between poverty and self-reliance by engaging the underprivileged in income-generating activities.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm">
                            <h4 className="font-black text-gray-900 mb-4 flex items-center gap-2 uppercase tracking-widest text-[11px]"><TrendingUp size={16} className="text-brand-primary" /> The Goal</h4>
                            <p className="text-sm text-gray-500 font-medium leading-relaxed">To create a community force capable of planning and managing development programs to overcome socio-economic problems.</p>
                        </div>
                        <div className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm">
                            <h4 className="font-black text-gray-900 mb-4 flex items-center gap-2 uppercase tracking-widest text-[11px]"><CheckCircle2 size={16} className="text-brand-primary" /> The Objective</h4>
                            <p className="text-sm text-gray-500 font-medium leading-relaxed">To raise economic status and make poor people self-reliant through engaging income-generating activities.</p>
                        </div>
                    </div>
                </motion.div>
                
                <motion.div 
                    {...fadeIn}
                    className="bg-gray-900 p-12 lg:p-20 rounded-[64px] text-white shadow-2xl relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/10 rounded-full -mr-32 -mt-32"></div>
                    <h3 className="text-3xl font-black mb-12 tracking-tighter">Performance <br/> Dashboard</h3>
                    <div className="grid grid-cols-2 gap-10">
                        {stats.map((stat, i) => (
                            <div key={i} className="space-y-2">
                                <div className="text-4xl lg:text-5xl font-black text-brand-secondary">{stat.value}</div>
                                <div className="text-[10px] font-black uppercase tracking-widest opacity-40">{stat.label}</div>
                                <div className="text-[9px] font-bold text-gray-500 uppercase">{stat.sub}</div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-16 pt-16 border-t border-white/5 flex items-center gap-10">
                        <div>
                            <div className="text-2xl font-black">97.93%</div>
                            <div className="text-[9px] font-black uppercase tracking-widest opacity-40">Current Recovery</div>
                        </div>
                        <div className="w-px h-8 bg-white/10"></div>
                        <div>
                            <div className="text-2xl font-black">136</div>
                            <div className="text-[9px] font-black uppercase tracking-widest opacity-40">Active Branches</div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
      </section>

      {/* Product Wings Grid */}
      <section className="py-32 bg-white border-y border-gray-100">
        <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto mb-24">
                <div className="flex items-center justify-center gap-3 text-brand-primary mb-6">
                    <Briefcase size={24} />
                    <h2 className="font-black uppercase tracking-widest text-xs">Loan & Savings Wings</h2>
                </div>
                <h3 className="text-4xl lg:text-6xl font-black mb-8 leading-tight tracking-tighter">Diverse <br/> <span className="text-brand-primary">Lending Dimensions.</span></h3>
                <p className="text-xl text-gray-500 font-medium">We offer 8 specialized product lines tailored to the unique needs of different market sectors and demographic groups.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {wings.map((wing, i) => (
                    <motion.div 
                        key={i}
                        {...fadeIn}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white p-12 rounded-[56px] border border-gray-100 hover:border-brand-primary/20 hover:shadow-2xl transition-all duration-500 group flex flex-col h-full"
                    >
                        <div className={`w-16 h-16 ${wing.color} ${wing.textColor} rounded-2xl flex items-center justify-center mb-10 group-hover:scale-110 transition-transform`}>
                            {wing.icon}
                        </div>
                        <h4 className="text-2xl font-black mb-6 text-gray-900 leading-tight">{wing.name}</h4>
                        <p className="text-lg text-gray-500 font-medium leading-relaxed mb-10">
                            {wing.desc}
                        </p>
                        <button className="mt-auto flex items-center gap-2 text-[12px] font-black uppercase tracking-widest text-brand-primary hover:gap-4 transition-all">
                            View Eligibility <ArrowRight size={14} />
                        </button>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* Operational Reach Section */}
      <section className="py-40 bg-brand-light">
        <div className="container-custom">
            <div className="flex flex-col lg:flex-row items-center gap-24">
                <div className="flex-1 space-y-12">
                    <div className="flex items-center gap-3 text-brand-primary">
                        <Globe size={24} />
                        <h2 className="font-black uppercase tracking-widest text-xs">National Reach</h2>
                    </div>
                    <h3 className="text-5xl lg:text-7xl font-black text-gray-900 leading-tight tracking-tighter">Expanding <br/> <span className="text-brand-primary">Geographic Coverage.</span></h3>
                    <p className="text-xl text-gray-600 font-medium leading-relaxed">
                        By March 2026, VERC will reach **31 districts** and **106 Upazilas** across Bangladesh, covering over **3,200 villages** with its dedicated force of **856 staff members**.
                    </p>
                    <div className="pt-6">
                        <button className="px-10 py-5 bg-brand-primary text-white font-black rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all">
                            Explore Branch Network
                        </button>
                    </div>
                </div>
                <div className="flex-1 grid grid-cols-2 gap-4 w-full">
                    {[
                        { label: "Districts", current: "30", target: "31" },
                        { label: "Upazilas", current: "103", target: "106" },
                        { label: "Unions", current: "634", target: "697" },
                        { label: "Staff", current: "820", target: "856" }
                    ].map((item, i) => (
                        <div key={i} className="p-10 bg-white rounded-[48px] border border-gray-100 shadow-sm text-center">
                            <div className="text-3xl font-black text-gray-900 mb-2">{item.target}</div>
                            <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">{item.label}</div>
                            <div className="text-[9px] font-bold text-emerald-500 bg-emerald-50 px-3 py-1 rounded-full w-fit mx-auto">Growth Focus</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </section>

      {/* MRA/PKSF Certification Footer */}
      <section className="py-32 bg-white border-t border-gray-100">
        <div className="container-custom text-center">
            <div className="max-w-4xl mx-auto space-y-16">
                <div className="flex flex-wrap justify-center gap-20 opacity-40">
                    <div className="text-2xl font-black text-gray-900 flex items-center gap-4">
                        <ShieldCheck size={32} /> MRA REGISTERED
                    </div>
                    <div className="text-2xl font-black text-gray-900 flex items-center gap-4">
                        <Landmark size={32} /> PKSF PARTNER
                    </div>
                </div>
                <p className="text-lg text-gray-400 font-medium max-w-2xl mx-auto">
                    Operating under the rules of the Government of Bangladesh with full MRA membership since 2006.
                </p>
            </div>
        </div>
      </section>
    </div>
  );
}

function SparklesIcon({ className, size }: { className?: string, size?: number }) {
    return <svg xmlns="http://www.w3.org/2000/svg" width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m12 3 1.912 5.813a2 2 0 0 0 1.275 1.275L21 12l-5.813 1.912a2 2 0 0 0-1.275 1.275L12 21l-1.912-5.813a2 2 0 0 0-1.275-1.275L3 12l5.813-1.912a2 2 0 0 0 1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>;
}
