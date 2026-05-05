"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, User, ChevronDown, FileText, ExternalLink, ShieldCheck, Briefcase, Activity, Landmark, Settings, Database, Monitor, Globe } from "lucide-react";
import Link from "next/link";

const Node = ({ title, subtitle, icon, color = "bg-white", textColor = "text-gray-900", isSpecial = false }: any) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    className={`relative flex flex-col items-center p-6 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-gray-100 min-w-[200px] ${color} transition-all hover:shadow-lg`}
  >
    {icon && <div className={`mb-3 p-2 rounded-xl bg-gray-50 text-brand-primary`}>{icon}</div>}
    <h4 className={`text-sm font-black uppercase tracking-widest text-center ${textColor}`}>{title}</h4>
    {subtitle && <p className="text-[11px] text-gray-400 font-bold mt-1 uppercase tracking-tight">{subtitle}</p>}
    {isSpecial && <div className="absolute -top-2 -right-2 bg-brand-secondary text-white p-1 rounded-full"><ShieldCheck size={12} /></div>}
  </motion.div>
);

const Line = () => (
  <div className="w-px h-12 bg-gray-200"></div>
);

export default function OrganogramPage() {
  return (
    <div className="bg-[#F9FAFB] min-h-screen pb-32">
      {/* Header */}
      <section className="bg-white border-b border-gray-100 pt-24 pb-16">
        <div className="container-custom">
            <div className="max-w-4xl">
                <div className="flex items-center gap-3 text-brand-primary mb-6">
                    <Users size={24} />
                    <h2 className="font-black uppercase tracking-[0.3em] text-xs">Governance</h2>
                </div>
                <h1 className="text-4xl lg:text-7xl font-black text-gray-900 mb-8 leading-tight tracking-tighter">
                    Organizational <br/> <span className="text-brand-primary">Structure.</span>
                </h1>
                <p className="text-xl text-gray-500 font-medium max-w-2xl">
                    Our multi-tiered governance model ensures transparency, accountability, and excellence in every project we implement.
                </p>
                <div className="flex gap-4 mt-10">
                    <Link 
                        href="https://www.vercbd.org/images/organogram.pdf" 
                        target="_blank"
                        className="flex items-center gap-2 px-6 py-3 bg-brand-primary text-white rounded-xl font-bold hover:scale-105 transition-all shadow-lg"
                    >
                        <FileText size={18} />
                        View Official PDF
                        <ExternalLink size={14} />
                    </Link>
                </div>
            </div>
        </div>
      </section>

      {/* Interactive Tree View */}
      <section className="py-24 overflow-x-auto">
        <div className="container-custom min-w-[1200px] flex flex-col items-center">
          
          {/* Level 1: General Council */}
          <Node title="General Council" subtitle="Governing Body" color="bg-gray-900" textColor="text-white" />
          <Line />

          {/* Level 2: Board of Directors */}
          <Node title="Board of Directors" subtitle="Policy & Oversight" color="bg-white" />
          <Line />

          {/* Level 3: Executive Director */}
          <div className="relative flex flex-col items-center">
            <Node title="Executive Director" subtitle="Chief Executive" color="bg-brand-primary" textColor="text-white" />
            
            {/* Internal Audit Branch (Side Branch) */}
            <div className="absolute left-full ml-12 top-1/2 -translate-y-1/2 flex items-center">
                <div className="w-12 h-px bg-gray-200"></div>
                <Node title="Internal Audit" subtitle="Reporting to ED" isSpecial color="bg-brand-secondary/10" />
            </div>
          </div>
          <Line />

          {/* Level 4: Deputy Executive Director */}
          <Node title="Deputy Executive Director" subtitle="Operations" />
          
          {/* Connector to Directorates */}
          <div className="w-px h-16 bg-gray-200 mt-1"></div>
          <div className="w-[1000px] h-px bg-gray-200"></div>
          
          {/* Level 5: The 8 Directorates */}
          <div className="grid grid-cols-8 gap-4 mt-0 w-full">
            {[
                { name: "Education", icon: <FileText size={18} /> },
                { name: "WASH & Health", icon: <Activity size={18} /> },
                { name: "Micro Finance", icon: <Briefcase size={18} /> },
                { name: "ME & Documentation", icon: <Database size={18} /> },
                { name: "Capacity & Climate", icon: <Globe size={18} /> },
                { name: "HR & Admin", icon: <Settings size={18} /> },
                { name: "Finance", icon: <Landmark size={18} /> },
                { name: "IT", icon: <Monitor size={18} /> }
            ].map((dir, i) => (
                <div key={i} className="flex flex-col items-center">
                    <div className="w-px h-12 bg-gray-200"></div>
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        viewport={{ once: true }}
                        className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center w-full group hover:border-brand-primary/20 hover:shadow-xl transition-all"
                    >
                        <div className="mb-4 p-2 bg-gray-50 rounded-xl text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all">
                            {dir.icon}
                        </div>
                        <h5 className="text-[10px] font-black uppercase tracking-widest leading-tight">{dir.name}</h5>
                        <p className="text-[9px] text-gray-400 font-bold mt-2">DIRECTORATE</p>
                    </motion.div>
                </div>
            ))}
          </div>

          {/* Legend/Note */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-24 p-8 bg-white rounded-3xl border border-dashed border-gray-200 max-w-2xl text-center"
          >
            <p className="text-sm text-gray-400 font-medium">
              This organogram represents the primary leadership and functional directorates of VERC. For a detailed breakdown of field-level positions and support staff, please refer to the official PDF documentation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Detailed Sections for Departments */}
      <section className="py-24">
        <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                    { title: "Governance", desc: "Led by a General Council and Board of Directors consisting of professionals and philanthropists." },
                    { title: "Leadership", desc: "The Executive Director and Deputy ED oversee 8 primary functional directorates focused on development impact." },
                    { title: "Accountability", desc: "Independent Internal Audit reporting directly to the ED ensures absolute financial and operational integrity." }
                ].map((item, i) => (
                    <div key={i} className="bg-white p-10 rounded-[32px] border border-gray-100 shadow-sm">
                        <h4 className="text-xl font-black mb-4 text-gray-900">{item.title}</h4>
                        <p className="text-sm text-gray-500 leading-relaxed font-medium">{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>
      </section>
    </div>
  );
}
