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
import { useContent } from "@/context/ContentContext";

export default function BranchNetworkPage() {
  const { branches } = useContent();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("All");

  const filteredBranches = branches.filter((b) => {
    const matchesSearch = b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          b.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          b.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDivision = selectedDivision === "All" || b.division === selectedDivision;
    return matchesSearch && matchesDivision;
  });

  const divisions = ["All", ...Array.from(new Set(branches.map(b => b.division)))];

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  };

  return (
    <div className="bg-white min-h-screen font-sans selection:bg-brand-primary/10 overflow-x-hidden">
      {/* 1. HERO */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden bg-gray-900 pt-24">
        <div className="absolute inset-0 z-0">
          <img 
            src="/assets/home_official_1.jpg" 
            alt="Branch Network" 
            className="w-full h-full object-cover opacity-50 scale-105"
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
              Presence Everywhere
            </span>
            <h1 className="text-5xl lg:text-8xl font-black mb-6 tracking-tighter">
              Branch <span className="text-brand-secondary">Network.</span>
            </h1>
            <p className="text-xl text-gray-300 font-medium max-w-2xl mx-auto">
              Operating across Bangladesh with over 136 branch and area offices bringing services closer to the grassroots.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. SEARCH & DIRECTORY */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search branch name, district or address..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-xs outline-none focus:border-brand-primary shadow-sm"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
              {divisions.map((div) => (
                <button
                  key={div}
                  onClick={() => setSelectedDivision(div)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    selectedDivision === div
                      ? "bg-brand-primary text-white shadow-sm"
                      : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  {div}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBranches.map((b, i) => (
              <motion.div
                key={b.id}
                {...fadeIn}
                transition={{ delay: i * 0.05 }}
                className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 bg-purple-50 text-purple-700 font-bold rounded-lg text-[10px] uppercase">
                      {b.district} • {b.division}
                    </span>
                    <Building2 size={18} className="text-brand-primary" />
                  </div>

                  <h3 className="text-xl font-extrabold text-gray-900">{b.name}</h3>

                  <div className="space-y-2 text-xs text-gray-500 pt-2">
                    <div className="flex items-start gap-2">
                      <MapPin size={15} className="text-brand-primary mt-0.5 flex-shrink-0" />
                      <span className="leading-relaxed">{b.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone size={15} className="text-brand-primary flex-shrink-0" />
                      <span>{b.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail size={15} className="text-brand-primary flex-shrink-0" />
                      <span>{b.email}</span>
                    </div>
                  </div>
                </div>

                {b.manager && (
                  <div className="pt-4 border-t border-gray-100 mt-6 text-xs text-gray-400">
                    Branch Manager: <span className="font-bold text-gray-700">{b.manager}</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
