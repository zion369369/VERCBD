"use client";

import React from "react";
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
  BarChart3
} from "lucide-react";
import Image from "next/image";
import capacityHero from "@/app/assets/capacity_building_hero.png";

export default function CapacityBuildingPage() {
  const trainingFields = [
    { name: "Water & Sanitation", icon: <HardHat size={20} /> },
    { name: "Hygiene Promotion", icon: <ShieldCheck size={20} /> },
    { name: "Governance", icon: <Building2 size={20} /> },
    { name: "Gender & Equity", icon: <Globe size={20} /> },
    { name: "Human Rights", icon: <ShieldCheck size={20} /> },
    { name: "Child Protection", icon: <Users2 size={20} /> },
    { name: "Climate Change", icon: <TrendingUp size={20} /> },
    { name: "Disaster Management", icon: <ShieldCheck size={20} /> },
    { name: "Education", icon: <BookOpen size={20} /> },
    { name: "Micro Finance", icon: <PieChart size={20} /> },
    { name: "SME Development", icon: <Briefcase size={20} /> },
    { name: "Advocacy", icon: <TrendingUp size={20} /> }
  ];

  const majorAspects = [
    {
      title: "Project Support",
      desc: "Provide need-based appropriate support to VERC projects internally.",
      icon: <Target className="text-brand-primary" size={24} />
    },
    {
      title: "Contractual Training",
      desc: "Provide need-based training on contractual basis to other client organizations and individuals.",
      icon: <Briefcase className="text-brand-primary" size={24} />
    },
    {
      title: "Local Govt. Strengthening",
      desc: "Strengthening local Govt. for Sustainable Development through local NGO collaboration.",
      icon: <Building2 className="text-brand-primary" size={24} />
    },
    {
      title: "NGO Capacity Building",
      desc: "Enhancing the capabilities of local NGOs across Bangladesh.",
      icon: <Users className="text-brand-primary" size={24} />
    },
    {
      title: "Disaster Preparedness",
      desc: "Specialized training in Disaster Preparedness and Management.",
      icon: <ShieldCheck className="text-brand-primary" size={24} />
    }
  ];

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  };

  return (
    <div className="bg-white min-h-screen font-sans selection:bg-brand-primary/10">
      {/* Immersive Hero Section */}
      <section className="relative h-[85vh] flex items-center overflow-hidden bg-gray-900">
        <div className="absolute inset-0 z-0">
          <Image 
            src={capacityHero} 
            alt="Capacity Building Program" 
            fill 
            className="object-cover opacity-60 scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/60 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-900"></div>
        </div>
        
        <div className="container-custom relative z-10 text-white">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="max-w-4xl"
          >
            <span className="inline-flex items-center gap-2 px-5 py-2 bg-brand-primary/20 backdrop-blur-xl rounded-full text-[11px] font-black uppercase tracking-[0.4em] mb-10 border border-brand-primary/30 text-brand-secondary">
              Empowerment & Growth
            </span>
            <h1 className="text-6xl lg:text-9xl font-black mb-10 leading-[0.95] tracking-tighter">
              Capacity <br/> <span className="text-brand-secondary">Building.</span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed font-medium max-w-2xl">
              Enhancing human potential and institutional excellence to drive sustainable development across Bangladesh.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Strategy */}
      <section className="py-32 bg-white">
        <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
                <motion.div {...fadeIn}>
                    <div className="flex items-center gap-3 text-brand-primary mb-6">
                        <Lightbulb size={24} />
                        <h2 className="font-black uppercase tracking-widest text-xs">Our Approach</h2>
                    </div>
                    <h3 className="text-5xl lg:text-7xl font-black text-gray-900 leading-tight tracking-tighter mb-10">
                        Participatory <br/> <span className="text-brand-primary">Development.</span>
                    </h3>
                    <p className="text-xl text-gray-600 leading-relaxed font-medium mb-8 italic">
                        "VERC emphasizes on people’s participatory and sustainable human development and capacity building of the development actors as facilitators."
                    </p>
                    <p className="text-lg text-gray-500 leading-relaxed mb-10">
                        We aim to institutionalize the lessons learnt from the development process as clearly enumerated in VERC’s Mission statement and Strategy. Our Training Section sets the goal to enhance human potential, change attitudes, and develop commitment of development actors.
                    </p>
                    
                    <div className="bg-brand-light/50 p-8 rounded-3xl border border-brand-primary/5">
                        <h4 className="font-black text-gray-900 mb-4 uppercase tracking-widest text-[10px]">Total Training Impact</h4>
                        <div className="flex items-baseline gap-2">
                            <span className="text-5xl font-black text-brand-primary tracking-tighter">425,176</span>
                            <span className="text-gray-500 font-bold uppercase text-xs tracking-wider">Participants Trained</span>
                        </div>
                    </div>
                </motion.div>

                <div className="space-y-6">
                    <motion.div 
                        {...fadeIn}
                        className="p-10 bg-gray-900 text-white rounded-[48px] shadow-2xl relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/20 rounded-full -mr-16 -mt-16"></div>
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 bg-brand-primary/20 rounded-xl text-brand-secondary">
                                <BarChart3 size={24} />
                            </div>
                            <h4 className="text-2xl font-black tracking-tight">Performance Snapshot</h4>
                        </div>
                        <p className="text-lg text-gray-400 font-medium leading-relaxed mb-8">
                            During the 2011-2012 period, our section successfully imparted training to <span className="text-white font-bold">23,663 participants</span>, marking a significant milestone in our expansion.
                        </p>
                        <div className="flex items-center gap-2 text-brand-secondary font-black uppercase text-[10px] tracking-[0.2em]">
                            View Annual Reports <ArrowRight size={14} />
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-2 gap-6">
                        {trainingFields.slice(0, 4).map((field, i) => (
                            <div key={i} className="p-6 bg-white border border-gray-100 rounded-3xl shadow-sm hover:shadow-md transition-all group">
                                <div className="text-brand-primary mb-3 group-hover:scale-110 transition-transform">{field.icon}</div>
                                <div className="font-bold text-gray-900 text-sm">{field.name}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Expertise Sectors */}
      <section className="py-32 bg-gray-50">
        <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto mb-24">
                <div className="flex items-center justify-center gap-3 text-brand-primary mb-6">
                    <Award size={24} />
                    <h2 className="font-black uppercase tracking-widest text-xs">Fields of Expertise</h2>
                </div>
                <h3 className="text-4xl lg:text-6xl font-black mb-8 leading-tight tracking-tighter">Diverse Training <br/> <span className="text-brand-primary">Specializations.</span></h3>
                <p className="text-xl text-gray-600 font-medium">
                    Our section plays a key role in capacitating government staff, LGI representatives, and NGO professionals across a broad spectrum of development fields.
                </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {trainingFields.map((field, i) => (
                    <motion.div 
                        key={i}
                        {...fadeIn}
                        transition={{ delay: i * 0.05 }}
                        className="p-8 bg-white rounded-3xl border border-transparent hover:border-brand-primary/10 hover:shadow-xl transition-all group"
                    >
                        <div className="w-12 h-12 bg-brand-light rounded-2xl flex items-center justify-center text-brand-primary mb-6 group-hover:scale-110 transition-transform">
                            {field.icon}
                        </div>
                        <h4 className="font-black text-gray-900 leading-tight group-hover:text-brand-primary transition-colors">{field.name}</h4>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* Major Aspects of Training */}
      <section className="py-32 bg-white">
        <div className="container-custom">
            <div className="flex flex-col lg:flex-row gap-24 items-center">
                <div className="flex-1 order-2 lg:order-1">
                    <div className="mb-16">
                        <h3 className="text-4xl lg:text-5xl font-black text-gray-900 leading-tight tracking-tighter mb-6">
                            Major Aspects of <br/> <span className="text-brand-primary">Our Program.</span>
                        </h3>
                    </div>
                    <div className="space-y-10">
                        {majorAspects.map((aspect, i) => (
                            <motion.div 
                                key={i} 
                                {...fadeIn}
                                transition={{ delay: i * 0.1 }}
                                className="flex gap-8 group"
                            >
                                <div className="flex-shrink-0 w-16 h-16 bg-brand-light rounded-2xl flex items-center justify-center group-hover:bg-brand-primary group-hover:text-white transition-all">
                                    {aspect.icon}
                                </div>
                                <div className="space-y-2">
                                    <h4 className="text-2xl font-black text-gray-900">{aspect.title}</h4>
                                    <p className="text-lg text-gray-500 font-medium leading-relaxed">{aspect.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
                <div className="flex-1 order-1 lg:order-2">
                    <div className="relative">
                        <div className="absolute -inset-4 bg-brand-primary/5 rounded-[64px] blur-3xl"></div>
                        <div className="relative bg-gray-900 p-12 lg:p-20 rounded-[64px] text-white overflow-hidden border border-white/10 shadow-2xl">
                            <div className="absolute bottom-0 right-0 w-64 h-64 bg-brand-primary/10 rounded-full -mb-32 -mr-32 blur-3xl"></div>
                            <span className="inline-block px-4 py-2 bg-brand-primary/20 rounded-full text-[10px] font-black uppercase tracking-widest mb-8 border border-brand-primary/30">Case Study</span>
                            <h3 className="text-4xl font-black mb-8 leading-[1.1] tracking-tighter">Union Parishads <br/> <span className="text-brand-secondary">Performance Assessment.</span></h3>
                            <p className="text-xl text-gray-400 font-medium leading-relaxed mb-10">
                                Measuring the Minimum Conditions (MMCs) of Union Parishads in Narsingdi district under the project of “Performance Assessment of 155 Union Parishads in Six LIC Districts”.
                            </p>
                            <div className="flex items-center gap-3 font-black uppercase text-[10px] tracking-widest text-brand-secondary cursor-pointer hover:gap-5 transition-all">
                                Read Full Project Details <ArrowRight size={14} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-40 bg-brand-light">
        <div className="container-custom text-center">
            <motion.div {...fadeIn} className="max-w-4xl mx-auto">
                <div className="flex justify-center mb-10">
                    <div className="w-20 h-20 bg-brand-primary/10 rounded-full flex items-center justify-center text-brand-primary">
                        <HeartHandshake size={40} />
                    </div>
                </div>
                <h3 className="text-5xl lg:text-8xl font-black text-gray-900 mb-12 leading-[1] tracking-tighter">Join the <br/> <span className="text-brand-primary">Facilitator Network.</span></h3>
                <p className="text-2xl text-gray-600 font-medium mb-16">
                    Our facilities are also available for other organizations to use for their own development programs.
                </p>
                <div className="flex flex-wrap justify-center gap-6">
                    <button className="px-12 py-6 bg-brand-primary text-white text-xl font-black rounded-3xl shadow-[0_20px_50px_rgba(0,75,141,0.3)] hover:scale-105 active:scale-95 transition-all">
                        Book Training Facility
                    </button>
                    <button className="px-12 py-6 bg-white text-brand-primary text-xl font-bold rounded-3xl border-2 border-brand-primary/10 hover:bg-brand-primary/5 transition-all">
                        Consult with Us
                    </button>
                </div>
            </motion.div>
        </div>
      </section>
    </div>
  );
}
