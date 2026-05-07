"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  MapPin, 
  Search, 
  Phone, 
  Mail, 
  Clock, 
  ArrowRight,
  Building2,
  Globe,
  ChevronDown
} from "lucide-react";
import Image from "next/image";

export default function BranchNetworkPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const areas = [
    {
      name: "Savar Area",
      offices: [
        { name: "VERC Head Office", address: "B-30, Ekhlaspur, Savar, Dhaka", phone: "+880-2-224441511" },
        { name: "Savar Branch 01", address: "Savar Bazar Road", phone: "+880-1711-XXXXXX" },
        { name: "Dhamrai Branch", address: "Dhamrai Town", phone: "+880-1711-XXXXXX" }
      ]
    },
    {
      name: "Chittagong Area",
      offices: [
        { name: "Mirsarai Branch", address: "Mirsarai Town", phone: "+880-1711-XXXXXX" },
        { name: "Sitakund Branch", address: "Sitakund Bazar", phone: "+880-1711-XXXXXX" }
      ]
    },
    {
      name: "Northern Area",
      offices: [
        { name: "Kurigram Branch", address: "Kurigram Town", phone: "+880-1711-XXXXXX" },
        { name: "Sirajgonj Branch", address: "Sirajgonj Town", phone: "+880-1711-XXXXXX" }
      ]
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
            src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?q=80&w=1974&auto=format&fit=crop" 
            alt="Branch Network" 
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
              Nationwide Presence
            </span>
            <h1 className="text-6xl lg:text-9xl font-black mb-8 leading-[0.95] tracking-tighter">
              Branch <br/> <span className="text-brand-secondary">Network.</span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed font-medium max-w-2xl mx-auto">
              Spanning across 25 areas with 136 offices, we are deeply embedded in the communities we serve.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. SEARCH & LIST */}
      <section className="py-32 bg-white relative z-20 rounded-t-[64px] -mt-12">
        <div className="container-custom">
            <div className="max-w-4xl mx-auto mb-24">
                <div className="relative">
                    <Search className="absolute left-8 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
                    <input 
                        type="text" 
                        placeholder="Search for a branch or district..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-20 pr-10 py-8 bg-gray-50 border border-gray-100 rounded-[32px] text-xl font-medium focus:bg-white focus:border-brand-primary/20 focus:ring-8 focus:ring-brand-primary/5 outline-none transition-all"
                    />
                </div>
            </div>

            <div className="space-y-16">
                {areas.map((area, i) => (
                    <motion.div 
                        key={i}
                        {...fadeIn}
                        transition={{ delay: i * 0.1 }}
                        className="space-y-10"
                    >
                        <div className="flex items-center gap-4">
                            <h3 className="text-3xl font-black text-gray-900 tracking-tight">{area.name}</h3>
                            <div className="h-px bg-gray-100 flex-1"></div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{area.offices.length} Offices</span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {area.offices.map((office, j) => (
                                <div key={j} className="p-10 bg-white border border-gray-100 rounded-[48px] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 group">
                                    <div className="w-12 h-12 bg-brand-light rounded-2xl flex items-center justify-center text-brand-primary mb-8 group-hover:bg-brand-primary group-hover:text-white transition-all">
                                        <Building2 size={24} />
                                    </div>
                                    <h4 className="text-xl font-black text-gray-900 mb-4">{office.name}</h4>
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-3 text-sm text-gray-500 font-medium">
                                            <MapPin size={16} className="text-brand-primary flex-shrink-0 mt-1" />
                                            {office.address}
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-gray-500 font-medium">
                                            <Phone size={16} className="text-brand-primary" />
                                            {office.phone}
                                        </div>
                                    </div>
                                    <div className="mt-10 pt-8 border-t border-gray-50 flex justify-between items-center">
                                        <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-primary hover:gap-4 transition-all">
                                            View Map <ArrowRight size={14} />
                                        </button>
                                        <div className="flex items-center gap-1 text-[10px] font-black text-emerald-500 uppercase tracking-widest">
                                            <Clock size={12} /> Open
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* 3. CTA */}
      <section className="py-40 bg-brand-primary text-white">
        <div className="container-custom text-center">
            <motion.div {...fadeIn} className="max-w-4xl mx-auto space-y-12">
                <h3 className="text-5xl lg:text-8xl font-black leading-[1] tracking-tighter">Institutional <br/> <span className="text-brand-secondary">Support Desk.</span></h3>
                <p className="text-2xl text-brand-light font-medium leading-relaxed">
                    Can&apos;t find the specific branch you are looking for? Our head office support desk is available to assist you.
                </p>
                <div className="flex flex-wrap justify-center gap-6 pt-8">
                    <button className="px-12 py-6 bg-white text-brand-primary text-xl font-black rounded-3xl shadow-xl hover:scale-105 active:scale-95 transition-all">
                        Call Head Office
                    </button>
                    <button className="px-12 py-6 bg-transparent border-2 border-white/20 text-white text-xl font-bold rounded-3xl hover:bg-white/10 transition-all">
                        Send an Email
                    </button>
                </div>
            </motion.div>
        </div>
      </section>
    </div>
  );
}
