"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Globe, Users, Briefcase, Award, ShieldCheck, ChevronRight } from "lucide-react";
import Image from "next/image";

export default function StaffPage() {
  const leadership = [
    { 
      name: "Yakub Hossain", 
      role: "Executive Director", 
      image: "https://www.vercbd.org/images/yakub.jpg",
      tier: "top"
    },
    { 
      name: "Md. Masud Hassan", 
      role: "Deputy Executive Director", 
      image: "https://www.vercbd.org/images/Masud.jpg",
      tier: "top"
    }
  ];

  const directors = [
    { 
      name: "Ranada Prasad Saha", 
      role: "Director, Microfinance", 
      image: "https://www.vercbd.org/images/Ranada.jpg" 
    },
    { 
      name: "Mustafizur Rashid Mridha", 
      role: "Director, HR & Admin", 
      image: "https://www.vercbd.org/images/rashid.jpg" 
    },
    { 
      name: "Md. Masud Royhan", 
      role: "Director, Finance", 
      image: "https://www.vercbd.org/images/Royhan5.jpg" 
    }
  ];

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  };

  return (
    <div className="bg-[#FDFDFD] min-h-screen font-sans">
      {/* Header */}
      <section className="bg-white border-b border-gray-100 pt-32 pb-24">
        <div className="container-custom">
            <motion.div {...fadeIn} className="max-w-4xl">
                <div className="flex items-center gap-3 text-brand-primary mb-8">
                    <Users size={24} />
                    <h2 className="font-black uppercase tracking-[0.4em] text-xs">Our Leadership</h2>
                </div>
                <h1 className="text-6xl lg:text-9xl font-black text-gray-900 mb-10 leading-[0.95] tracking-tighter">
                    Senior <br/> <span className="text-brand-primary">Management.</span>
                </h1>
                <p className="text-xl lg:text-2xl text-gray-500 font-medium max-w-2xl leading-relaxed">
                    Guided by decades of institutional experience and a shared commitment to community-led transformation.
                </p>
            </motion.div>
        </div>
      </section>

      {/* Top Leadership Grid */}
      <section className="py-24">
        <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32">
                {leadership.map((member, i) => (
                    <motion.div 
                        key={i}
                        {...fadeIn}
                        className="group relative flex flex-col lg:flex-row items-center gap-10 bg-white p-10 rounded-[64px] border border-gray-100 shadow-[0_30px_60px_rgba(0,0,0,0.04)] hover:shadow-2xl transition-all duration-700"
                    >
                        <div className="relative w-48 h-48 lg:w-56 lg:h-56 rounded-full overflow-hidden flex-shrink-0 shadow-2xl group-hover:scale-105 transition-transform duration-700 border-4 border-gray-50">
                            <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 text-center lg:text-left space-y-4">
                            <h3 className="text-3xl font-black text-gray-900 tracking-tight">{member.name}</h3>
                            <p className="text-lg font-bold text-brand-primary uppercase tracking-widest text-[13px]">{member.role}</p>
                            <div className="flex justify-center lg:justify-start gap-4 pt-4">
                                <button className="p-3 bg-gray-50 rounded-2xl text-gray-400 hover:text-brand-primary hover:bg-brand-primary/5 transition-all"><Mail size={18} /></button>
                                <button className="p-3 bg-gray-50 rounded-2xl text-gray-400 hover:text-brand-primary hover:bg-brand-primary/5 transition-all"><Linkedin size={18} /></button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Directors Grid */}
            <div className="flex items-center gap-4 mb-16">
                <div className="h-px bg-gray-200 flex-1"></div>
                <h3 className="text-xs font-black uppercase tracking-[0.4em] text-gray-400">Functional Directors</h3>
                <div className="h-px bg-gray-200 flex-1"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {directors.map((member, i) => (
                    <motion.div 
                        key={i}
                        {...fadeIn}
                        transition={{ delay: i * 0.1 }}
                        className="group bg-white p-8 rounded-[56px] border border-gray-100 hover:border-brand-primary/20 hover:shadow-xl transition-all duration-500"
                    >
                        <div className="relative w-40 h-40 mx-auto rounded-full overflow-hidden mb-8 shadow-md group-hover:scale-105 transition-transform duration-700 border-2 border-gray-50">
                            <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="space-y-2 text-center">
                            <h4 className="text-xl font-black text-gray-900 tracking-tight">{member.name}</h4>
                            <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest">{member.role}</p>
                            <div className="flex justify-center gap-3 pt-6">
                                <button className="p-2.5 bg-gray-50 rounded-xl text-gray-300 hover:text-brand-primary transition-all"><Linkedin size={14} /></button>
                                <button className="p-2.5 bg-gray-50 rounded-xl text-gray-300 hover:text-brand-primary transition-all"><Globe size={14} /></button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* Legacy/Trust Footer */}
      <section className="py-32 bg-brand-light">
        <div className="container-custom text-center">
            <div className="max-w-3xl mx-auto space-y-12">
                <div className="flex justify-center gap-10 opacity-40">
                    <ShieldCheck size={48} className="text-gray-900" />
                    <Award size={48} className="text-gray-900" />
                    <Briefcase size={48} className="text-gray-900" />
                </div>
                <h3 className="text-4xl font-black text-gray-900 tracking-tight">Institutional Stability.</h3>
                <p className="text-xl text-gray-500 font-medium">
                    Our senior management team averages over 25 years of experience in the development sector, ensuring stable and strategic leadership for VERC&apos;s national programs.
                </p>
            </div>
        </div>
      </section>
    </div>
  );
}
