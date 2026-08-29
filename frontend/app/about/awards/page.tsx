"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Award, Star, ShieldCheck, Trophy, Globe, ArrowRight, CheckCircle2, Medal } from "lucide-react";

export default function AwardsPage() {
  const awards = [
    {
      year: "2023",
      title: "Sustainable Development Excellence Award",
      organization: "Global Sustainable Development Forum",
      category: "Environment & WaSH",
      desc: "Recognized for pioneering Community-Led Total Sanitation (CLTS) and providing long-term sustainable drinking water and sanitation infrastructure across 64 districts.",
      icon: <Trophy className="text-amber-500 w-8 h-8" />,
      badge: "Global Recognition",
      badgeColor: "bg-amber-50 text-amber-700 border-amber-200"
    },
    {
      year: "2021",
      title: "National Sanitation Leadership Champion",
      organization: "Local Government Division (LGD), Government of Bangladesh",
      category: "Public Health",
      desc: "Honored for outstanding institutional contribution toward achieving 100% open-defecation-free (ODF) communities across targeted rural divisions.",
      icon: <ShieldCheck className="text-emerald-500 w-8 h-8" />,
      badge: "National Award",
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200"
    },
    {
      year: "2018",
      title: "NGO Financial Governance & Transparency Award",
      organization: "Transparency International Bangladesh (TIB)",
      category: "Governance",
      desc: "Ranked among top national development organizations for exemplary audit compliance, fiscal integrity, and open financial disclosure.",
      icon: <Award className="text-blue-500 w-8 h-8" />,
      badge: "Governance Standard",
      badgeColor: "bg-blue-50 text-blue-700 border-blue-200"
    },
    {
      year: "2015",
      title: "Global Sanitation Innovation Prize",
      organization: "WASH Global Network & UNICEF",
      category: "Innovation",
      desc: "Awarded for the groundbreaking development and international scaling of the Community-Led Total Sanitation (CLTS) methodology originating in Bangladesh.",
      icon: <Globe className="text-indigo-500 w-8 h-8" />,
      badge: "Innovation Prize",
      badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200"
    }
  ];

  const honors = [
    { year: "2012", title: "Social Business Pioneer Honor", org: "Yunus Centre", desc: "For empowering rural women through micro-enterprise initiatives." },
    { year: "2010", title: "Microfinance Institutional Star", org: "PKSF", desc: "Recognized for ethical micro-credit distribution and borrower protection." },
    { year: "2008", title: "Non-Formal Education Leadership Award", org: "CAMPE", desc: "Pioneering early childhood development and adult literacy centers." },
    { year: "2002", title: "Community Water Sanitation Pioneer", org: "WaterAid International", desc: "Implementation of arsenic-safe piped water systems in rural communities." }
  ];

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  };

  return (
    <div className="bg-white min-h-screen font-sans selection:bg-brand-primary/10 overflow-x-hidden">
      {/* 1. HERO HEADER */}
      <section className="relative pt-36 pb-28 lg:pt-48 lg:pb-36 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/assets/home_official_1.jpg" 
            alt="VERC Awards Banner" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 via-gray-900/80 to-gray-900"></div>
        </div>

        <div className="container-custom relative z-10 text-white text-center">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto space-y-6"
          >
            <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500/10 rounded-full text-xs font-black uppercase tracking-[0.25em] text-amber-400 border border-amber-500/30">
              <Trophy size={14} className="text-amber-400" /> Recognition of Excellence
            </span>
            
            <h1 className="text-5xl lg:text-8xl font-black tracking-tight leading-tight">
              Legacy of <span className="text-brand-secondary">Excellence.</span>
            </h1>
            
            <p className="text-lg lg:text-2xl text-gray-300 font-medium max-w-3xl mx-auto leading-relaxed pt-2">
              Decades of institutional commitment to community empowerment, recognized by national governments, multilateral bodies, and global development networks.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. MAIN FEATURED AWARDS */}
      <section className="py-28 bg-gray-50/60">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-brand-primary mb-3">Major Achievements</h2>
            <h3 className="text-3xl lg:text-5xl font-black text-gray-900 tracking-tight">Institutional Accolades</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {awards.map((award, i) => (
              <motion.div 
                key={i}
                {...fadeIn}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 lg:p-10 rounded-[36px] border border-gray-100 shadow-[0_15px_40px_rgba(0,0,0,0.04)] hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex justify-between items-center mb-8">
                    <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center border border-gray-100 group-hover:scale-110 transition-transform duration-500 shadow-sm">
                      {award.icon}
                    </div>
                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold border ${award.badgeColor}`}>
                      {award.badge}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl font-black text-brand-primary">{award.year}</span>
                    <span className="text-gray-300">•</span>
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-500">{award.category}</span>
                  </div>

                  <h3 className="text-2xl lg:text-3xl font-black text-gray-900 mb-3 leading-tight group-hover:text-brand-primary transition-colors">
                    {award.title}
                  </h3>

                  <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">
                    Issued by {award.organization}
                  </p>

                  <p className="text-gray-600 font-medium leading-relaxed text-sm lg:text-base">
                    {award.desc}
                  </p>
                </div>

                <div className="pt-8 mt-8 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-gray-500">
                  <span className="flex items-center gap-2 text-emerald-600">
                    <CheckCircle2 size={16} /> Verified Official Award
                  </span>
                  <Medal size={18} className="text-amber-500" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. WALL OF HONOR */}
      <section className="py-28 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center mb-20">
            <span className="text-xs font-black uppercase tracking-[0.3em] text-brand-primary mb-3 inline-block">Historical Timeline</span>
            <h2 className="text-4xl lg:text-6xl font-black text-gray-900 tracking-tight">Other Significant Honors</h2>
            <p className="text-lg text-gray-500 font-medium mt-4">Continuous recognition across education, water, sanitation, and rural finance.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {honors.map((honor, i) => (
              <motion.div
                key={i}
                {...fadeIn}
                transition={{ delay: i * 0.08 }}
                className="bg-gray-50/80 p-8 rounded-[32px] border border-gray-100 hover:bg-white hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="text-3xl font-black text-amber-500 mb-4">{honor.year}</div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2 leading-snug">{honor.title}</h4>
                  <p className="text-xs font-black text-brand-primary uppercase tracking-wider mb-3">{honor.org}</p>
                  <p className="text-xs text-gray-500 font-medium leading-relaxed">{honor.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CALL TO ACTION */}
      <section className="py-24 bg-brand-primary text-white relative overflow-hidden">
        <div className="container-custom relative z-10 text-center">
          <motion.div {...fadeIn} className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-4xl lg:text-7xl font-black tracking-tight leading-tight">
              Partner with an <span className="text-brand-secondary">Award-Winning Organization.</span>
            </h2>
            <p className="text-xl text-gray-200 font-medium max-w-2xl mx-auto">
              Collaborate with VERC to implement high-impact, community-driven development programs across Bangladesh.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Link href="/contact" className="px-10 py-4 bg-white text-brand-primary text-lg font-black rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-3">
                Partner With Us <ArrowRight size={20} />
              </Link>
              <Link href="/partners" className="px-10 py-4 bg-white/10 text-white border border-white/20 text-lg font-bold rounded-2xl hover:bg-white/20 transition-all inline-block">
                Our Development Partners
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
