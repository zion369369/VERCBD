"use client";

import React from "react";
import { Users, Shield, Target, Award, History, BookOpen, Heart, Droplets, Briefcase, Globe, Zap, CheckCircle2, ArrowRight, TrendingUp, BarChart3, Activity } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import washHero from "@/app/assets/wash_hero.png";
import educationHero from "@/app/assets/education_hero.png";

export default function AboutPage() {
  const coreValues = [
    { title: "Participation & Ownership", desc: "Ensuring community involvement in every stage of development.", color: "bg-blue-50" },
    { title: "Respect", desc: "Upholding the dignity and rights of every individual we serve.", color: "bg-green-50" },
    { title: "Environment Friendliness", desc: "Integrating sustainable practices into all our projects.", color: "bg-emerald-50" },
    { title: "Sustainability", desc: "Creating long-term solutions that outlast our direct involvement.", color: "bg-indigo-50" },
    { title: "Innovation", desc: "Pioneering new approaches to solve age-old community challenges.", color: "bg-purple-50" },
    { title: "Good Governance", desc: "Maintaining transparency, accountability, and ethical standards.", color: "bg-slate-50" },
    { title: "Equality", desc: "Providing equal opportunities for marginalized segments of society.", color: "bg-rose-50" },
  ];

  const stats = [
    { label: "Millions", sub: "Lives Touched", icon: <Users size={24} /> },
    { label: "50+", sub: "Countries using CLTS", icon: <Globe size={24} /> },
    { label: "1977", sub: "Year Founded", icon: <History size={24} /> },
    { label: "100%", sub: "Commitment", icon: <TrendingUp size={24} /> },
  ];

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  };

  return (
    <div className="bg-white font-sans selection:bg-brand-primary/10 overflow-x-hidden">
      {/* Google-Grade Premium Hero */}
      <section className="relative min-h-[90vh] flex items-center pt-20 pb-32 overflow-hidden bg-gray-900">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image 
            src={washHero} 
            alt="VERC Hero" 
            fill 
            className="object-cover opacity-60 scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/60 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-900"></div>
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-4xl">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="inline-flex items-center gap-2 px-5 py-2 bg-white/10 backdrop-blur-xl rounded-full text-[12px] font-black uppercase tracking-[0.4em] mb-10 border border-white/20 text-brand-secondary shadow-2xl"
              >
                <Globe size={14} />
                The Legacy of VERC
              </motion.span>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 1 }}
                className="text-6xl lg:text-9xl font-black text-white mb-10 leading-[0.95] tracking-tighter"
              >
                Transforming <br/>
                <span className="text-brand-secondary inline-block mt-2 font-black">Lives.</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 1 }}
                className="text-xl lg:text-2xl text-gray-300 leading-relaxed font-medium max-w-2xl mb-12"
              >
                Pioneering sustainable community empowerment in Bangladesh for over four decades through non-formal education and sanitation innovation.
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="flex flex-wrap gap-6"
              >
                <button className="px-10 py-5 bg-white text-gray-900 font-black rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-2xl flex items-center gap-3 group">
                  Our Programs <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                </button>
                <button className="px-10 py-5 bg-white/10 backdrop-blur-md text-white border border-white/20 font-bold rounded-2xl hover:bg-white/20 transition-all">
                  Annual Reports
                </button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Floating Stats Section */}
      <section className="relative z-20 -mt-20">
        <div className="container-custom">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
                {stats.map((stat, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        viewport={{ once: true }}
                        className="bg-white p-8 lg:p-12 rounded-[40px] shadow-[0_30px_60px_rgba(0,0,0,0.06)] border border-gray-50 flex flex-col items-center text-center group hover:translate-y-[-8px] transition-all duration-500"
                    >
                        <div className="w-14 h-14 bg-brand-light rounded-2xl flex items-center justify-center text-brand-primary mb-6 group-hover:bg-brand-primary group-hover:text-white transition-colors">
                            {stat.icon}
                        </div>
                        <h4 className="text-4xl lg:text-5xl font-black text-gray-900 mb-2">{stat.label}</h4>
                        <p className="text-[12px] font-black uppercase tracking-widest text-gray-400">{stat.sub}</p>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* Journey Begins - Modern NGO Presentation */}
      <section className="py-40">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <motion.div {...fadeIn} className="space-y-10">
              <div className="space-y-6">
                <div className="flex items-center gap-3 text-brand-primary">
                    <History size={24} />
                    <h2 className="font-black uppercase tracking-[0.2em] text-xs">Journey Begins</h2>
                </div>
                <h3 className="text-5xl lg:text-7xl font-black text-gray-900 leading-[1.05] tracking-tight">
                    From SCF-USA <br/> to a <span className="text-brand-primary">National Leader.</span>
                </h3>
              </div>
              <div className="space-y-8 text-xl text-gray-600 leading-relaxed font-medium">
                <p>
                    VERC started its journey as a project of **SCF-USA back in 1977** with an aim to provide process consultancy 
                    to internal projects. By 1989, it became a separate local organization, setting new benchmarks for the 
                    entire NGO sector in Bangladesh.
                </p>
                <div className="flex items-start gap-6 p-10 bg-[#f0f7ff] rounded-[40px] border border-blue-50">
                    <BarChart3 size={32} className="text-brand-primary flex-shrink-0 mt-1" />
                    <p className="text-lg italic font-bold text-gray-700 leading-relaxed">
                        &quot;Organizations where people continually expand their capacity to create the results they truly desire... where collective aspiration is set free.&quot;
                        <span className="block mt-4 not-italic font-black uppercase tracking-widest text-[11px] text-brand-primary">— Peter Senge</span>
                    </p>
                </div>
              </div>
            </motion.div>
            <motion.div 
                {...fadeIn}
                transition={{ delay: 0.2 }}
                className="relative h-[600px] lg:h-[800px] rounded-[64px] overflow-hidden shadow-2xl group"
            >
                <Image 
                    src={educationHero} 
                    alt="Education Program" 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-12 left-12 right-12">
                    <p className="text-white text-2xl font-bold italic leading-relaxed">
                        &quot;Innovating non-formal education models for a self-reliant society.&quot;
                    </p>
                </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision, Mission, Goals - High-Impact Cards */}
      <section className="py-32 bg-gray-50/50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {[
              { 
                title: "Societal Vision", 
                icon: <Target size={32} />, 
                content: "A self-reliant and enlightened society based on justice, equity and sustainability where every human being has equal opportunity.",
                bg: "bg-[#004B8D] text-white"
              },
              { 
                title: "Mission Statement", 
                icon: <Shield size={32} />, 
                content: "Transforming the lives of marginalized, disadvantaged and destitute people by providing humanitarian assistance and resilient livelihoods.",
                bg: "bg-white text-gray-900"
              },
              { 
                title: "Our Goals", 
                icon: <Zap size={32} />, 
                content: "Sustainable socio-economic development of the disadvantaged and destitute people exploring their potentials and adaptation capacities.",
                bg: "bg-white text-gray-900"
              }
            ].map((box, i) => (
              <motion.div 
                key={i} 
                {...fadeIn}
                transition={{ delay: i * 0.1 }}
                className={`${box.bg} p-12 rounded-[56px] shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100/10 flex flex-col h-full`}
              >
                <div className="mb-10 opacity-80">{box.icon}</div>
                <h4 className="text-3xl font-black mb-8 leading-tight">{box.title}</h4>
                <p className="text-lg opacity-80 leading-relaxed font-medium mt-auto">{box.content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values - Interactive List */}
      <section className="py-40">
        <div className="container-custom">
            <div className="flex flex-col lg:flex-row gap-24">
                <div className="lg:w-1/3 sticky top-32 h-fit">
                    <div className="flex items-center gap-3 text-brand-primary mb-6">
                        <Award size={24} />
                        <h2 className="font-black uppercase tracking-widest text-xs">Core Values</h2>
                    </div>
                    <h3 className="text-5xl font-black text-gray-900 mb-8 leading-tight">The Principles <br/> Behind Our <br/> Impact.</h3>
                    <p className="text-xl text-gray-500 font-medium leading-relaxed">
                        Seven core values that define how we work with communities and partners across the globe.
                    </p>
                </div>
                <div className="lg:w-2/3 space-y-4">
                    {coreValues.map((v, i) => (
                        <motion.div 
                            key={i}
                            {...fadeIn}
                            transition={{ delay: i * 0.05 }}
                            className={`${v.color} p-10 rounded-[40px] flex items-start gap-8 group hover:scale-[1.02] transition-all cursor-default`}
                        >
                            <span className="text-4xl font-black opacity-10 mt-1">0{i+1}</span>
                            <div>
                                <h5 className="text-2xl font-black text-gray-900 mb-4">{v.title}</h5>
                                <p className="text-lg text-gray-600 font-medium">{v.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
      </section>

      {/* Pioneering Contributions - Google Grade Layout */}
      <section className="py-40 bg-gray-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-primary/10 blur-[150px] -mr-40 mt-40"></div>
        <div className="container-custom relative z-10">
            <div className="text-center max-w-4xl mx-auto mb-32">
                <div className="flex items-center justify-center gap-3 text-brand-secondary mb-8">
                    <Activity size={24} />
                    <h2 className="font-black uppercase tracking-[0.4em] text-xs">Global Impact</h2>
                </div>
                <h3 className="text-6xl lg:text-8xl font-black mb-10 leading-[1] tracking-tighter">Pioneering <br/> <span className="text-brand-secondary">World Standards.</span></h3>
                <p className="text-xl lg:text-2xl text-gray-400 font-medium">
                    Our innovations aren&apos;t just for Bangladesh—they are blueprint models for global development.
                </p>
            </div>

            <div className="space-y-20">
                {[
                    { 
                        title: "Community Led Total Sanitation (CLTS)", 
                        desc: "Introduced in February 2000, VERC learned that community awareness and participation prevent 100% of waterborne diseases. The approach is now a global gold standard adopted by national strategies worldwide.",
                        points: ["Feb 2000 Inception", "People-Initiated 100% Sanitation", "Adopted in National Strategy"]
                    },
                    { 
                        title: "Non Formal Education (NFE)", 
                        desc: "One of the pioneering NGOs in children's education models, later adapted by development organizations both within and outside the country. Initiated models of community-run schools and adult education.",
                        points: ["Innovative Materials", "Community-Run School Models", "Global Replication"]
                    }
                ].map((item, i) => (
                    <motion.div 
                        key={i}
                        {...fadeIn}
                        className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start p-12 lg:p-20 bg-white/5 backdrop-blur-md rounded-[64px] border border-white/10"
                    >
                        <div className="lg:col-span-5">
                            <h4 className="text-3xl lg:text-4xl font-black mb-8 leading-tight">{item.title}</h4>
                            <div className="flex flex-wrap gap-3">
                                {item.points.map((p, j) => (
                                    <span key={j} className="px-5 py-2 bg-brand-secondary/20 text-brand-secondary rounded-full text-[12px] font-bold border border-brand-secondary/30">{p}</span>
                                ))}
                            </div>
                        </div>
                        <div className="lg:col-span-7">
                            <p className="text-xl text-gray-400 leading-relaxed font-medium">
                                {item.desc}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* Corporate Call to Action */}
      <section className="py-40 bg-brand-light">
        <div className="container-custom text-center">
            <motion.div {...fadeIn} className="max-w-4xl mx-auto">
                <h3 className="text-5xl lg:text-8xl font-black text-gray-900 mb-12 leading-[1] tracking-tighter">Build a <br/> <span className="text-brand-primary">Self-Reliant Society.</span></h3>
                <p className="text-2xl text-gray-600 font-medium mb-16">
                    Join us in our mission to transform lives and build resilient livelihoods across Bangladesh.
                </p>
                <div className="flex flex-wrap justify-center gap-6">
                    <button className="px-12 py-6 bg-brand-primary text-white text-xl font-black rounded-3xl shadow-[0_20px_50px_rgba(0,75,141,0.3)] hover:scale-105 active:scale-95 transition-all">
                        Support Our Mission
                    </button>
                    <button className="px-12 py-6 bg-white text-brand-primary text-xl font-bold rounded-3xl border-2 border-brand-primary/10 hover:bg-brand-primary/5 transition-all">
                        Work with Us
                    </button>
                </div>
            </motion.div>
        </div>
      </section>
    </div>
  );
}
