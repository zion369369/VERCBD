"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award, Star, ShieldCheck, Trophy, Sparkles, Globe, MapPin, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function AwardsPage() {
  const awards = [
    {
      year: "2023",
      title: "Sustainable Development Excellence",
      organization: "International Development Forum",
      desc: "Recognized for pioneering CLTS and long-term impact on rural sanitation standards.",
      icon: <Trophy className="text-amber-500" />,
      color: "bg-amber-50"
    },
    {
      year: "2021",
      title: "National Sanitation Champion",
      organization: "Local Government Division, Bangladesh",
      desc: "For outstanding contribution to achieving 100% open-defecation free status in target districts.",
      icon: <ShieldCheck className="text-emerald-500" />,
      color: "bg-emerald-50"
    },
    {
      year: "2018",
      title: "NGO Transparency Award",
      organization: "Transparency International Bangladesh",
      desc: "Top ranking for financial disclosure and governance excellence among national NGOs.",
      icon: <Award className="text-blue-500" />,
      color: "bg-blue-50"
    },
    {
      year: "2015",
      title: "Global Innovation Prize",
      organization: "WASH Global Network",
      desc: "Awarded for the innovation of the Community-Led Total Sanitation (CLTS) methodology.",
      icon: <Globe className="text-purple-500" />,
      color: "bg-purple-50"
    }
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
            src="https://images.unsplash.com/photo-1578574515313-ad198ab2c3d1?q=80&w=2070&auto=format&fit=crop" 
            alt="VERC Awards" 
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
              Recognition of Excellence
            </span>
            <h1 className="text-6xl lg:text-9xl font-black mb-10 leading-[0.95] tracking-tighter">
              Legacy of <br/> <span className="text-brand-secondary">Excellence.</span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed font-medium max-w-2xl mx-auto">
              Decades of institutional commitment to community empowerment, recognized at both national and global stages.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. MAIN AWARDS GRID */}
      <section className="py-32 bg-white relative z-20 rounded-t-[64px] -mt-12">
        <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {awards.map((award, i) => (
                    <motion.div 
                        key={i}
                        {...fadeIn}
                        transition={{ delay: i * 0.1 }}
                        className={`${award.color} p-12 rounded-[56px] border border-transparent hover:border-brand-primary/10 hover:shadow-2xl transition-all duration-700 flex flex-col group`}
                    >
                        <div className="flex justify-between items-start mb-10">
                            <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-500">
                                {award.icon}
                            </div>
                            <span className="text-4xl font-black opacity-10 text-gray-900">{award.year}</span>
                        </div>
                        <h3 className="text-3xl font-black text-gray-900 mb-4 leading-tight">{award.title}</h3>
                        <p className="text-[11px] font-black text-brand-primary uppercase tracking-[0.2em] mb-6">{award.organization}</p>
                        <p className="text-lg text-gray-500 font-medium leading-relaxed mb-10">
                          {award.desc}
                        </p>
                        <div className="mt-auto flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400">
                            Verified Achievement <ShieldCheck size={12} className="text-brand-primary" />
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* 3. QUOTE / IMPACT */}
      <section className="py-40 bg-gray-50">
        <div className="container-custom">
            <div className="flex flex-col lg:flex-row items-center gap-24">
                <div className="flex-1 space-y-10">
                    <div className="flex items-center gap-3 text-brand-primary">
                        <Star size={24} />
                        <h2 className="font-black uppercase tracking-widest text-xs">A Shared Victory</h2>
                    </div>
                    <h3 className="text-5xl lg:text-7xl font-black text-gray-900 leading-[1] tracking-tighter">
                        Awards for the <br/> <span className="text-brand-primary">Communities.</span>
                    </h3>
                    <p className="text-xl text-gray-600 font-medium leading-relaxed">
                        Every recognition we receive is a testament to the resilience and participation of the millions of community members who have walked this journey with us since 1977. 
                        We don&apos;t just win awards; we prove that community-led development works.
                    </p>
                    <div className="pt-8">
                        <button className="px-12 py-6 bg-brand-primary text-white text-xl font-black rounded-3xl shadow-xl hover:scale-105 active:scale-95 transition-all">
                            View Our Story
                        </button>
                    </div>
                </div>
                <div className="flex-1 relative w-full aspect-square rounded-[64px] overflow-hidden shadow-2xl">
                    <Image 
                        src="https://images.unsplash.com/photo-1569437019302-53589958dc0a?q=80&w=1974&auto=format&fit=crop" 
                        alt="Community Celebration" 
                        fill 
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 via-transparent to-transparent"></div>
                </div>
            </div>
        </div>
      </section>

      {/* 4. OTHER HONORS */}
      <section className="py-40 bg-white">
        <div className="container-custom">
            <div className="text-center mb-24">
                <h3 className="text-4xl font-black text-gray-900 tracking-tight">Other Significant Honors</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { year: "2012", title: "Social Business Pioneer", org: "Yunus Centre" },
                    { year: "2010", title: "Microfinance Star", org: "PKSF" },
                    { year: "2008", title: "Education Excellence", org: "CAMPE" }
                ].map((honor, i) => (
                    <div key={i} className="p-10 bg-brand-light rounded-[40px] text-center space-y-4">
                        <span className="text-xs font-black text-brand-primary uppercase tracking-widest">{honor.year}</span>
                        <h4 className="text-xl font-black text-gray-900">{honor.title}</h4>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{honor.org}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* 5. CTA */}
      <section className="py-40 bg-brand-primary text-white">
        <div className="container-custom text-center">
            <motion.div {...fadeIn} className="max-w-4xl mx-auto">
                <h3 className="text-5xl lg:text-8xl font-black mb-12 leading-[1] tracking-tighter">Partner with an <br/> <span className="text-brand-secondary">Award-Winning Leader.</span></h3>
                <p className="text-2xl text-brand-light font-medium mb-16">
                    Leverage our recognized expertise to drive your next social impact project.
                </p>
                <div className="flex flex-wrap justify-center gap-6">
                    <button className="px-12 py-6 bg-white text-brand-primary text-xl font-black rounded-3xl shadow-xl hover:scale-105 active:scale-95 transition-all">
                        Consult with Us
                    </button>
                    <button className="px-12 py-6 bg-transparent border-2 border-white/20 text-white text-xl font-bold rounded-3xl hover:bg-white/10 transition-all">
                        Our Partners
                    </button>
                </div>
            </motion.div>
        </div>
      </section>
    </div>
  );
}
