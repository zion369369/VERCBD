"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  UserPlus, 
  FileText, 
  Search, 
  CheckCircle2, 
  CreditCard, 
  Calendar, 
  ArrowRight,
  ShieldCheck,
  Users,
  Target,
  Sparkles,
  HelpCircle
} from "lucide-react";
import Image from "next/image";

export default function MicrofinanceProcessPage() {
  const steps = [
    {
      title: "Group Formation",
      desc: "Assemble a group of 15-30 like-minded women from your locality who are committed to mutual growth.",
      icon: <Users size={32} />,
      duration: "1-2 Weeks"
    },
    {
      title: "Member Survey",
      desc: "Our field officers visit to conduct a baseline survey and verify the socio-economic status of members.",
      icon: <Search size={32} />,
      duration: "3-5 Days"
    },
    {
      title: "Training & Orientation",
      desc: "A mandatory 7-day orientation on financial management, group discipline, and repayment policies.",
      icon: <FileText size={32} />,
      duration: "7 Days"
    },
    {
      title: "Loan Application",
      desc: "Members apply for loans based on their business plan, which is reviewed by the group and the branch.",
      icon: <CreditCard size={32} />,
      duration: "2-3 Days"
    },
    {
      title: "Disbursement",
      desc: "Successful applications receive funds directly at the branch office with 100% transparency.",
      icon: <CheckCircle2 size={32} />,
      duration: "Instant"
    },
    {
      title: "Weekly Meetings",
      desc: "Participate in weekly group meetings for repayment and to share business progress with peers.",
      icon: <Calendar size={32} />,
      duration: "Ongoing"
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
            src="https://images.unsplash.com/photo-1454165833968-3e4004a8876c?q=80&w=2070&auto=format&fit=crop" 
            alt="Microfinance Process" 
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
              How It Works
            </span>
            <h1 className="text-6xl lg:text-9xl font-black mb-10 leading-[0.95] tracking-tighter">
              Seamless <br/> <span className="text-brand-secondary">Process.</span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed font-medium max-w-2xl mx-auto">
              From group formation to capital disbursement—our process is designed to be transparent, supportive, and empowering.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. ELIGIBILITY */}
      <section className="py-32 bg-white">
        <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                <motion.div {...fadeIn}>
                    <div className="flex items-center gap-3 text-brand-primary mb-6">
                        <Target size={24} />
                        <h2 className="font-black uppercase tracking-widest text-xs">Criteria for Enrollment</h2>
                    </div>
                    <h3 className="text-5xl lg:text-7xl font-black text-gray-900 leading-tight tracking-tighter mb-10">
                        Who Can <br/> <span className="text-brand-primary">Join Us?</span>
                    </h3>
                    <div className="space-y-6">
                        {[
                            "Permanent resident of the project area for at least 3 years.",
                            "Age between 18 to 55 years.",
                            "Involvement in a small business or a viable income-generating plan.",
                            "Commitment to attend weekly group meetings and follow group discipline.",
                            "Not a defaulter of any other financial institution."
                        ].map((criteria, i) => (
                            <div key={i} className="flex items-start gap-4 p-6 bg-gray-50 rounded-3xl border border-gray-100 group hover:border-brand-primary/20 transition-all">
                                <div className="p-2 bg-white rounded-lg text-brand-primary shadow-sm group-hover:scale-110 transition-transform"><CheckCircle2 size={18} /></div>
                                <p className="font-bold text-gray-700 leading-relaxed">{criteria}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>
                
                <div className="bg-gray-900 p-12 lg:p-20 rounded-[64px] text-white relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/10 rounded-full -mr-32 -mt-32"></div>
                    <ShieldCheck size={48} className="text-brand-secondary mb-10" />
                    <h4 className="text-4xl font-black mb-8 leading-tight tracking-tighter">Our Commitment to <br/> <span className="text-brand-secondary">Ethical Lending.</span></h4>
                    <p className="text-xl text-gray-400 font-medium leading-relaxed mb-10">
                        We strictly adhere to the Microcredit Regulatory Authority (MRA) guidelines and ensure that no member is burdened with more debt than they can sustainably manage.
                    </p>
                    <div className="flex items-center gap-3 font-black uppercase text-[10px] tracking-widest text-brand-secondary">
                        Read Our Fair Lending Policy <ArrowRight size={14} />
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* 3. STEP BY STEP PROCESS */}
      <section className="py-32 bg-gray-50 relative overflow-hidden">
        <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto mb-24">
                <div className="flex items-center justify-center gap-3 text-brand-primary mb-6">
                    <Sparkles size={24} />
                    <h2 className="font-black uppercase tracking-widest text-xs">Step-by-Step</h2>
                </div>
                <h3 className="text-4xl lg:text-6xl font-black mb-8 leading-tight tracking-tighter">Your Path to <br/> <span className="text-brand-primary">Growth.</span></h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 relative z-10">
                {steps.map((step, i) => (
                    <motion.div 
                        key={i} 
                        {...fadeIn}
                        transition={{ delay: i * 0.1 }}
                        className="relative p-12 bg-white rounded-[56px] shadow-sm hover:shadow-2xl transition-all duration-500 group flex flex-col h-full border border-gray-100"
                    >
                        <div className="absolute -top-6 -right-6 w-16 h-16 bg-brand-primary text-white rounded-full flex items-center justify-center text-2xl font-black shadow-xl z-20">
                            0{i + 1}
                        </div>
                        <div className="mb-10 text-brand-primary group-hover:scale-110 transition-transform duration-500">
                            {step.icon}
                        </div>
                        <h3 className="text-2xl font-black mb-6 text-gray-900 leading-tight">{step.title}</h3>
                        <p className="text-lg text-gray-500 font-medium leading-relaxed mb-10">
                          {step.desc}
                        </p>
                        <div className="mt-auto pt-8 border-t border-gray-50">
                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Typical Duration:</span>
                            <span className="ml-2 font-black text-brand-primary">{step.duration}</span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* 4. FAQ / HELP */}
      <section className="py-40 bg-white">
        <div className="container-custom">
            <div className="bg-brand-light rounded-[64px] p-12 lg:p-24 flex flex-col lg:flex-row items-center gap-24">
                <div className="flex-1 space-y-10 text-center lg:text-left">
                    <div className="flex items-center justify-center lg:justify-start gap-3 text-brand-primary">
                        <HelpCircle size={28} />
                        <h2 className="font-black uppercase tracking-widest text-xs">Have Questions?</h2>
                    </div>
                    <h3 className="text-5xl lg:text-7xl font-black text-gray-900 leading-[1] tracking-tighter">
                        We are here to <br/> <span className="text-brand-primary">Support You.</span>
                    </h3>
                    <p className="text-xl text-gray-600 font-medium leading-relaxed">
                        Need more information about our process or specific loan products? Our team is available at every branch office to guide you.
                    </p>
                    <div className="pt-8 flex flex-wrap justify-center lg:justify-start gap-6">
                        <button className="px-10 py-5 bg-brand-primary text-white font-black rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all">
                            Talk to an Officer
                        </button>
                        <button className="px-10 py-5 bg-white text-brand-primary border border-brand-primary/10 font-bold rounded-2xl hover:bg-brand-primary/5 transition-all">
                            Find Branch Network
                        </button>
                    </div>
                </div>
                <div className="flex-1 w-full relative">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="p-8 bg-white rounded-[40px] shadow-sm transform hover:-translate-y-2 transition-all">
                            <h5 className="font-black text-gray-900 mb-2">Transparency</h5>
                            <p className="text-xs text-gray-400 font-medium">No hidden costs or complex documentation.</p>
                        </div>
                        <div className="p-8 bg-white rounded-[40px] shadow-sm transform translate-y-12 hover:-translate-y-2 transition-all">
                            <h5 className="font-black text-gray-900 mb-2">Support</h5>
                            <p className="text-xs text-gray-400 font-medium">Dedicated field officers for every group.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
}
