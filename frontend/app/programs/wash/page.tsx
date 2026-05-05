"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Droplets, ShieldCheck, Activity, Users, Globe, CheckCircle2, 
  ArrowRight, Heart, Sparkles, Waves, Stethoscope, Hospital, 
  Handshake, Baby, MessageSquare, BookOpen, Share2 
} from "lucide-react";
import Image from "next/image";
import washHero from "@/app/assets/wash_hero.png";

export default function CombinedWashHealthPage() {
  const [activeTab, setActiveTab] = useState<"wash" | "health">("wash");

  const highlights = [
    { title: "Pioneered CLTS", desc: "Introduced Community Led Total Sanitation in Feb 2000, now a global standard.", icon: <Globe size={24} /> },
    { title: "Mother & Child Care", desc: "Operating specialized hospitals in Savar and Mirsarai since 2004.", icon: <Heart size={24} /> },
    { title: "Institutional Impact", desc: "Our models are incorporated into the National Sanitation Program Strategy.", icon: <ShieldCheck size={24} /> },
  ];

  const ongoingProjects = [
    { name: "South Asian WaSH Result Program-II", location: "Kurigram, Sirajgonj, Bhola", donor: "WaterAid / Plan Intl" },
    { name: "Stunting Free Villages Project", location: "Chhatak, Sylhet", donor: "Max Foundation" },
    { name: "Rohingya Response WaSH", location: "Ukhiya, Cox's Bazar", donor: "UNICEF" },
    { name: "Improved Cook-stove Program", location: "Nationwide", donor: "IDCOL-World Bank" },
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
      <section className="relative h-[70vh] flex items-center overflow-hidden bg-gray-900">
        <div className="absolute inset-0 z-0">
          <Image 
            src={washHero} 
            alt="Health & WaSH Program" 
            fill 
            className="object-cover opacity-60 scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/40 to-transparent"></div>
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
              Integrated Social Program
            </span>
            <h1 className="text-6xl lg:text-9xl font-black mb-10 leading-[0.95] tracking-tighter">
              Health, Water & <br/> <span className="text-brand-secondary">Sanitation.</span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed font-medium max-w-2xl">
              Pioneering Community Led Total Sanitation and institutionalizing sustainable health services for the marginalized.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Program Selector Tabs */}
      <section className="sticky top-20 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="container-custom flex justify-center py-6 gap-8">
            <button 
                onClick={() => setActiveTab("wash")}
                className={`px-8 py-3 rounded-full font-black uppercase tracking-widest text-xs transition-all ${activeTab === "wash" ? "bg-brand-primary text-white shadow-xl" : "text-gray-400 hover:text-gray-900"}`}
            >
                Water & Sanitation (WaSH)
            </button>
            <button 
                onClick={() => setActiveTab("health")}
                className={`px-8 py-3 rounded-full font-black uppercase tracking-widest text-xs transition-all ${activeTab === "health" ? "bg-brand-primary text-white shadow-xl" : "text-gray-400 hover:text-gray-900"}`}
            >
                Community Health Services
            </button>
        </div>
      </section>

      <AnimatePresence mode="wait">
        {activeTab === "wash" ? (
          <motion.div
            key="wash"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {/* WaSH Content */}
            <section className="py-32">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
                        <div>
                            <div className="flex items-center gap-3 text-brand-primary mb-6">
                                <Waves size={24} />
                                <h2 className="font-black uppercase tracking-widest text-xs">Pioneering CLTS</h2>
                            </div>
                            <h3 className="text-5xl lg:text-7xl font-black text-gray-900 leading-tight tracking-tighter mb-10">
                                The Global <br/> <span className="text-brand-primary">Sanitation Revolution.</span>
                            </h3>
                            <p className="text-xl text-gray-600 leading-relaxed font-medium mb-12">
                                In early 2000, VERC innovated the **Community Led Total Sanitation (CLTS)** model. This approach shifted focus from toilet hardware to community behavioral change, preventing water and excreta-borne diseases through active participation.
                            </p>
                            <div className="space-y-6">
                                {ongoingProjects.map((proj, i) => (
                                    <div key={i} className="p-8 bg-gray-50 rounded-3xl border border-gray-100 hover:border-brand-primary/20 transition-all group">
                                        <div className="flex justify-between items-start mb-4">
                                            <h4 className="font-black text-gray-900">{proj.name}</h4>
                                            <span className="text-[10px] font-black uppercase tracking-widest text-brand-primary bg-brand-primary/5 px-3 py-1 rounded-full">Ongoing</span>
                                        </div>
                                        <div className="flex gap-10 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                                            <span><Globe size={12} className="inline mr-1" /> {proj.location}</span>
                                            <span><Handshake size={12} className="inline mr-1" /> {proj.donor}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative">
                            <div className="grid grid-cols-1 gap-6">
                                <div className="p-12 bg-gray-900 text-white rounded-[56px] shadow-2xl">
                                    <h4 className="text-3xl font-black mb-6 tracking-tighter text-brand-secondary">CLTS Achievement</h4>
                                    <p className="text-gray-400 font-medium leading-relaxed mb-10">
                                        Our experience has been incorporated into the **National Sanitation Program Strategy** and the **Sector Development Plan (2011-2025)** of Bangladesh.
                                    </p>
                                    <div className="flex items-center gap-8">
                                        <div className="text-center">
                                            <div className="text-4xl font-black">2000+</div>
                                            <div className="text-[10px] uppercase font-black tracking-widest opacity-40">Villages ODF</div>
                                        </div>
                                        <div className="w-px h-10 bg-white/10"></div>
                                        <div className="text-center">
                                            <div className="text-4xl font-black">50+</div>
                                            <div className="text-[10px] uppercase font-black tracking-widest opacity-40">Nations Inspired</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-10 bg-emerald-50 rounded-[40px] border border-emerald-100">
                                    <div className="flex items-center gap-4 text-emerald-600 mb-6 font-black uppercase tracking-widest text-xs">
                                        <Sparkles size={18} /> Impact Case Study
                                    </div>
                                    <h5 className="text-xl font-black text-gray-900 mb-4 tracking-tight">Village Blood Bank</h5>
                                    <p className="text-sm text-gray-600 leading-relaxed font-medium">
                                        Md. Mizanur Rahman and others founded the &apos;Manush manusher jonnyo&apos; association to donate blood in emergencies, known as the &quot;Grameen Blood Bank&quot; in Lalmohan.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
          </motion.div>
        ) : (
          <motion.div
            key="health"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {/* Health Content */}
            <section className="py-32">
                <div className="container-custom">
                    <div className="flex flex-col lg:flex-row gap-24 items-start">
                        <div className="lg:w-1/3 sticky top-48">
                            <div className="flex items-center gap-3 text-brand-primary mb-6">
                                <Stethoscope size={24} />
                                <h2 className="font-black uppercase tracking-widest text-xs">Sustainable Health</h2>
                            </div>
                            <h3 className="text-5xl lg:text-7xl font-black text-gray-900 leading-tight tracking-tighter mb-10">
                                Community <br/> <span className="text-brand-primary">Led Health.</span>
                            </h3>
                            <p className="text-xl text-gray-600 leading-relaxed font-medium mb-12">
                                Since 2006, our Community Led Sustainable Health Project has empowered local governance through mother-led groups and watch committees.
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 p-6 bg-white border border-gray-100 rounded-3xl shadow-sm">
                                    <div className="w-12 h-12 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center"><Heart size={20} /></div>
                                    <div>
                                        <h5 className="font-black text-sm">CSG</h5>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Community Support Group</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 p-6 bg-white border border-gray-100 rounded-3xl shadow-sm">
                                    <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center"><Activity size={20} /></div>
                                    <div>
                                        <h5 className="font-black text-sm">HWC</h5>
                                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Health Watch Committee</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="lg:w-2/3 space-y-20">
                            {/* Hospital Section */}
                            <div className="bg-gray-900 rounded-[64px] p-12 lg:p-24 text-white relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/10 rounded-full -mr-32 -mt-32"></div>
                                <div className="relative z-10">
                                    <div className="flex items-center gap-3 text-brand-secondary mb-8">
                                        <Hospital size={24} />
                                        <h4 className="font-black uppercase tracking-widest text-xs">MCH Specialization</h4>
                                    </div>
                                    <h4 className="text-4xl lg:text-6xl font-black mb-12 tracking-tighter leading-tight">Mother & Child <br/> <span className="text-brand-secondary">Hospitals.</span></h4>
                                    <p className="text-xl text-gray-400 font-medium leading-relaxed mb-16 max-w-2xl">
                                        Established in 2004 (Savar) and 2013 (Mirsarai), our hospitals provide ANC/PNC, normal delivery, caesarean operations, and pathology services at subsidized rates.
                                    </p>
                                    
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-white/10 pt-16">
                                        <div className="space-y-6">
                                            <h5 className="text-xl font-black tracking-widest uppercase text-[12px] text-gray-500">Savar Hospital</h5>
                                            <div className="grid grid-cols-2 gap-8">
                                                <div>
                                                    <div className="text-3xl font-black">12,300+</div>
                                                    <div className="text-[10px] font-black uppercase tracking-widest opacity-40">Annual Patients</div>
                                                </div>
                                                <div>
                                                    <div className="text-3xl font-black">1,000+</div>
                                                    <div className="text-[10px] font-black uppercase tracking-widest opacity-40">Safe Deliveries</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-6">
                                            <h5 className="text-xl font-black tracking-widest uppercase text-[12px] text-gray-500">Mirsarai Hospital</h5>
                                            <div className="grid grid-cols-2 gap-8">
                                                <div>
                                                    <div className="text-3xl font-black">3,500+</div>
                                                    <div className="text-[10px] font-black uppercase tracking-widest opacity-40">Annual Patients</div>
                                                </div>
                                                <div>
                                                    <div className="text-3xl font-black">230+</div>
                                                    <div className="text-[10px] font-black uppercase tracking-widest opacity-40">Deliveries</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Case Study Card */}
                            <div className="p-16 bg-white border border-gray-100 rounded-[64px] shadow-sm flex flex-col lg:flex-row gap-16 items-center">
                                <div className="flex-1 space-y-8">
                                    <div className="inline-flex items-center gap-3 text-emerald-500 font-black uppercase tracking-widest text-xs">
                                        <Users size={18} /> Empowering Rights
                                    </div>
                                    <h4 className="text-4xl font-black text-gray-900 tracking-tighter">Monju Rani De&apos;s <br/> Journey to Rightful Care.</h4>
                                    <p className="text-lg text-gray-500 font-medium leading-relaxed">
                                        &quot;Healthcare is our right, not anyone’s charity.&quot; Monju, a destitute widow, successfully accessed free TB treatment after CSG members advocated for her rights at the local clinic.
                                    </p>
                                    <button className="flex items-center gap-2 text-[12px] font-black uppercase tracking-widest text-brand-primary hover:gap-4 transition-all">
                                        Read Story <ArrowRight size={14} />
                                    </button>
                                </div>
                                <div className="flex-1 w-full h-[300px] bg-gray-50 rounded-[48px] overflow-hidden relative">
                                    <Image src={washHero} alt="Rights Advocate" fill className="object-cover grayscale opacity-50" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="p-6 bg-white rounded-full shadow-2xl"><MessageSquare className="text-brand-primary" /></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Shared Lessons Learnt Footer */}
      <section className="py-40 bg-brand-light">
        <div className="container-custom">
            <div className="text-center max-w-4xl mx-auto space-y-16">
                <h3 className="text-5xl lg:text-8xl font-black text-gray-900 leading-[1] tracking-tighter">Community <br/> <span className="text-brand-primary">Empowered.</span></h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { title: "Inclusive Participation", desc: "Development is most effective when the community plans and implements together." },
                        { title: "Accessible Locations", desc: "Healthcare and WaSH facilities must be situated within easy reach of the hard-core poor." },
                        { title: "Rights Awareness", desc: "Empowering citizens to claim their healthcare rights from public service agencies." }
                    ].map((lesson, i) => (
                        <div key={i} className="p-8 bg-white rounded-[40px] shadow-sm">
                            <h5 className="text-xl font-black mb-4 text-gray-900">{lesson.title}</h5>
                            <p className="text-sm text-gray-500 font-medium leading-relaxed">{lesson.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </section>
    </div>
  );
}
