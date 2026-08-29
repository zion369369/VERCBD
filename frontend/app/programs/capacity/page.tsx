"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Users, 
  Target, 
  Award, 
  TrendingUp, 
  ShieldCheck, 
  Briefcase, 
  Globe, 
  BookOpen, 
  CheckCircle2, 
  ArrowRight, 
  Lightbulb,
  Building2,
  Users2,
  PieChart,
  HardHat,
  HeartHandshake,
  BarChart3,
  ChevronRight,
  Sprout,
  Compass,
  Calendar,
  Sparkles
} from "lucide-react";

export default function CapacityBuildingPage() {
  const trainingFields = [
    { name: "WaSH & Hygiene Promotion", category: "Public Health", icon: <HardHat className="text-emerald-600 w-6 h-6" />, desc: "CLTS facilitation, community water safety planning, and school hygiene club mobilization." },
    { name: "Local Governance & LGI Support", category: "Governance", icon: <Building2 className="text-blue-600 w-6 h-6" />, desc: "Union Parishad participatory budgeting, tax assessment, and transparent citizen charters." },
    { name: "Gender Equity & Human Rights", category: "Human Rights", icon: <Globe className="text-purple-600 w-6 h-6" />, desc: "Women leadership development, prevention of gender-based violence, and legal literacy." },
    { name: "Child Protection & Safeguarding", category: "Social Welfare", icon: <Users2 className="text-rose-600 w-6 h-6" />, desc: "Early childhood development, safe learning environments, and anti-child marriage vigilance." },
    { name: "Climate Adaptation & Disaster Mgmt", category: "Environment", icon: <TrendingUp className="text-teal-600 w-6 h-6" />, desc: "Disaster Risk Reduction (DRR), flood-resilient infrastructure, and community early warning." },
    { name: "Non-Formal Education Facilitation", category: "Education", icon: <BookOpen className="text-amber-600 w-6 h-6" />, desc: "Child-centered pedagogy, adult literacy curriculum, and community preschool management." },
    { name: "Microfinance & SME Development", category: "Livelihoods", icon: <PieChart className="text-indigo-600 w-6 h-6" />, desc: "Responsible micro-credit governance, borrower protection standards, and SME bookkeeping." },
    { name: "Advocacy & Strategic Networking", category: "Institutional", icon: <Compass className="text-cyan-600 w-6 h-6" />, desc: "Grassroots citizen advocacy, policy dialogue with government ministries, and NGO coalition." }
  ];

  const majorAspects = [
    {
      title: "Contractual & Custom Training Services",
      desc: "Delivering tailored capacity-building modules on a contractual basis for UN agencies, international NGOs, government ministries, and private sector CSR partners.",
      icon: <Briefcase className="text-blue-600 w-7 h-7" />
    },
    {
      title: "Local Government (LGI) Strengthening",
      desc: "Strengthening Union Parishads and Upazila administrations through participatory governance training, Minimum Condition (MMC) assessments, and transparency audits.",
      icon: <Building2 className="text-emerald-600 w-7 h-7" />
    },
    {
      title: "Community Facilitator Incubation",
      desc: "Transforming grassroots natural leaders into certified development facilitators capable of mobilizing their own villages for sustainable social action.",
      icon: <Users className="text-purple-600 w-7 h-7" />
    },
    {
      title: "Disaster Preparedness & Climate Resilience",
      desc: "Equipping coastal and riverine communities with practical simulation training, emergency response drills, and climate-adaptive livelihood strategies.",
      icon: <ShieldCheck className="text-amber-600 w-7 h-7" />
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
            src="/assets/capacity_building_training.jpg" 
            alt="VERC Capacity Building Training Workshop" 
            className="w-full h-full object-cover opacity-30 scale-105"
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
              <span className="text-brand-secondary">Capacity Building</span>
            </div>

            <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-purple-500/10 rounded-full text-xs font-black uppercase tracking-[0.25em] text-purple-400 border border-purple-500/30">
              <Award size={14} className="text-purple-400" /> Human & Institutional Development
            </span>

            <h1 className="text-5xl lg:text-8xl font-black tracking-tight leading-tight">
              Capacity <span className="text-brand-secondary">Building.</span>
            </h1>

            <p className="text-lg lg:text-2xl text-gray-300 font-medium max-w-3xl mx-auto leading-relaxed">
              Enhancing human potential, fostering participatory leadership, and developing institutional excellence across Bangladesh’s grassroots development sector since 1977.
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Link href="/contact" className="px-8 py-4 bg-brand-secondary text-gray-900 font-black rounded-2xl shadow-xl hover:scale-105 transition-all text-sm">
                Book Training Facility & Modules
              </Link>
              <Link href="/about" className="px-8 py-4 bg-white/10 text-white border border-white/20 font-bold rounded-2xl hover:bg-white/20 transition-all text-sm">
                Our Institutional Legacy
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. FEATURED WORKSHOP SPOTLIGHT & PHILOSOPHY */}
      <section className="py-24 bg-gray-50/70 border-b border-gray-100">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Workshop Photo Card */}
            <motion.div {...fadeIn} className="lg:col-span-6 relative rounded-[44px] overflow-hidden shadow-2xl group">
              <img 
                src="/assets/capacity_building_training.jpg" 
                alt="Participatory Capacity Building Workshop in Session" 
                className="w-full h-[480px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/85 via-gray-900/20 to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 right-6 p-6 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 text-white space-y-1">
                <span className="text-xs font-black uppercase tracking-widest text-brand-secondary">Interactive Training in Session</span>
                <h4 className="text-lg font-bold">Participatory Community Appraisal & Resource Mapping Workshop</h4>
                <p className="text-xs text-gray-300">Empowering local government representatives and community champions at VERC Training Center.</p>
              </div>
            </motion.div>

            {/* Philosophy & Approach */}
            <motion.div {...fadeIn} transition={{ delay: 0.15 }} className="lg:col-span-6 space-y-6">
              <div className="space-y-3">
                <span className="text-xs font-black uppercase tracking-[0.3em] text-brand-primary">Participatory Methodology</span>
                <h2 className="text-3xl lg:text-5xl font-black text-gray-900 leading-tight tracking-tight">
                  People-Centered <br />
                  <span className="text-brand-primary">Human Development.</span>
                </h2>
              </div>

              <p className="text-base lg:text-lg text-gray-600 font-medium leading-relaxed">
                VERC’s training philosophy is rooted in participatory learning. Rather than top-down lectures, we cultivate development actors as **facilitators of change**—unlocking innate community intelligence and building collective ownership.
              </p>

              <p className="text-sm text-gray-500 font-medium leading-relaxed">
                Our Training Section operates modern, fully equipped residential training centers in Savar and partner regional hubs, delivering high-impact curricula for national and international development partners.
              </p>

              <div className="pt-4 grid grid-cols-2 gap-4">
                <div className="p-5 bg-white rounded-2xl border border-gray-200 shadow-sm">
                  <div className="text-3xl font-black text-purple-600">425,000+</div>
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-1">Total Development Actors Trained</div>
                </div>
                <div className="p-5 bg-white rounded-2xl border border-gray-200 shadow-sm">
                  <div className="text-3xl font-black text-blue-600">155+</div>
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mt-1">Union Parishads Evaluated</div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 3. DIVERSE TRAINING SPECIALIZATIONS */}
      <section className="py-28 bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-20 space-y-3">
            <span className="text-xs font-black uppercase tracking-[0.3em] text-brand-primary">Curriculum Portfolio</span>
            <h2 className="text-3xl lg:text-5xl font-black text-gray-900 tracking-tight">
              Fields of Training Specialization
            </h2>
            <p className="text-gray-600 font-medium text-base">
              Comprehensive capacity-building modules designed for field practitioners, LGI officials, and institutional staff.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trainingFields.map((field, i) => (
              <motion.div
                key={i}
                {...fadeIn}
                transition={{ delay: i * 0.06 }}
                className="p-8 rounded-[36px] bg-gray-50/70 border border-gray-200/80 hover:bg-white hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-gray-100 group-hover:scale-110 transition-transform">
                    {field.icon}
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">{field.category}</span>
                    <h4 className="text-lg font-black text-gray-900 leading-snug group-hover:text-brand-primary transition-colors mt-0.5">{field.name}</h4>
                  </div>
                  <p className="text-xs text-gray-600 font-medium leading-relaxed">{field.desc}</p>
                </div>

                <div className="pt-4 mt-6 border-t border-gray-200/60 flex items-center justify-between text-xs font-bold text-brand-primary">
                  <span>Certified Module</span>
                  <CheckCircle2 size={14} className="text-emerald-500" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. MAJOR ASPECTS & CASE STUDY */}
      <section className="py-24 bg-gray-50/60 border-t border-gray-100">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Aspects List */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-3">
                <span className="text-xs font-black uppercase tracking-[0.3em] text-brand-primary">Institutional Capabilities</span>
                <h3 className="text-3xl lg:text-5xl font-black text-gray-900 tracking-tight leading-tight">
                  Major Aspects of Our Training Operations
                </h3>
              </div>

              <div className="space-y-6">
                {majorAspects.map((aspect, i) => (
                  <motion.div
                    key={i}
                    {...fadeIn}
                    transition={{ delay: i * 0.1 }}
                    className="p-6 bg-white rounded-3xl border border-gray-200 shadow-xs flex gap-5 items-start"
                  >
                    <div className="p-3 bg-gray-50 rounded-2xl border border-gray-100 flex-shrink-0">
                      {aspect.icon}
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-lg font-black text-gray-900">{aspect.title}</h4>
                      <p className="text-xs text-gray-600 font-medium leading-relaxed">{aspect.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Case Study Card */}
            <div className="lg:col-span-5">
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-10 sm:p-12 rounded-[44px] text-white shadow-2xl space-y-6 border border-gray-800">
                <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/10 rounded-full text-xs font-bold text-brand-secondary">
                  <Sparkles size={14} /> Governance Case Study
                </span>
                
                <h4 className="text-2xl font-black tracking-tight leading-snug">
                  Performance Assessment of 155 Union Parishads
                </h4>

                <p className="text-xs text-gray-300 leading-relaxed font-medium">
                  VERC conducted rigorous institutional assessments measuring the Minimum Conditions (MMCs) of Union Parishads across six low-income districts (including Narsingdi), establishing transparent citizen accountability mechanisms and improving local revenue collection.
                </p>

                <div className="pt-4 border-t border-white/10 space-y-3 text-xs">
                  <div className="flex justify-between items-center text-gray-300">
                    <span>Target Administrative Units:</span>
                    <span className="font-bold text-white">155 Union Parishads</span>
                  </div>
                  <div className="flex justify-between items-center text-gray-300">
                    <span>Key Focus Area:</span>
                    <span className="font-bold text-brand-secondary">Good Governance & MMCs</span>
                  </div>
                  <div className="flex justify-between items-center text-gray-300">
                    <span>Outcome:</span>
                    <span className="font-bold text-emerald-400">Institutionalized Transparency</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION */}
      <section className="py-24 bg-brand-primary text-white relative overflow-hidden">
        <div className="container-custom relative z-10 text-center">
          <motion.div {...fadeIn} className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-4xl lg:text-7xl font-black tracking-tight leading-tight">
              Partner with Bangladesh&apos;s Premier <br />
              <span className="text-brand-secondary">Capacity-Building Facilitator.</span>
            </h2>
            <p className="text-xl text-gray-200 font-medium max-w-2xl mx-auto leading-relaxed">
              Book our residential training centers in Savar or commission a customized capacity development module for your organization.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Link href="/contact" className="px-10 py-4 bg-white text-brand-primary text-lg font-black rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-3">
                Inquire for Training Partnership <ArrowRight size={20} />
              </Link>
              <Link href="/donate" className="px-10 py-4 bg-white/10 text-white border border-white/20 text-lg font-bold rounded-2xl hover:bg-white/20 transition-all inline-block">
                Support Community Leadership
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
