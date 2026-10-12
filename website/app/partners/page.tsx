"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Globe, 
  Handshake, 
  Building2, 
  Users, 
  CheckCircle2, 
  ArrowRight, 
  ExternalLink,
  ShieldCheck,
  Heart,
  Briefcase,
  Layers,
  Sparkles,
  Search,
  Zap
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import partnersHero from "@/app/assets/partners_hero.png";
import { useContent } from "@/context/ContentContext";

export default function PartnersPage() {
  const { partners } = useContent();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Government", "UN Agencies", "International NGO", "Corporate & Others"];

  const filteredPartners = partners.filter((p) => {
    return selectedCategory === "All" || p.category === selectedCategory;
  });

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
            src={partnersHero} 
            alt="Development Partners" 
            fill 
            className="object-cover opacity-60 scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/70 to-transparent"></div>
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
              Strategic Alliances
            </span>
            <h1 className="text-6xl lg:text-9xl font-black mb-8 leading-[0.95] tracking-tighter">
              Global <br/> <span className="text-brand-secondary">Partners.</span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed font-medium max-w-2xl mx-auto">
              Collaborating with international development organizations, government agencies, and global donors to drive sustainable transformation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. CATEGORY SELECTOR & PARTNERS GRID (Dynamic from Admin) */}
      <section className="py-32 bg-gray-50">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl lg:text-6xl font-black text-gray-900 tracking-tight">
              Our Trusted Partners
            </h2>
            <p className="text-gray-500 mt-4 text-base">
              Explore the institutions, agencies, and alliances partnering with VERC across Bangladesh.
            </p>

            {/* Filter buttons */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                    selectedCategory === cat
                      ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/20 scale-105"
                      : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredPartners.map((partner, i) => (
              <motion.div
                key={partner.id}
                {...fadeIn}
                transition={{ delay: i * 0.05 }}
                className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-6">
                  <div className="h-24 bg-gray-50 rounded-2xl flex items-center justify-center p-4 overflow-hidden border border-gray-100/60">
                    <img
                      src={partner.logoUrl}
                      alt={partner.name}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                    />
                  </div>

                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-secondary">
                      {partner.category}
                    </span>
                    <h3 className="text-lg font-extrabold text-gray-900 mt-1">
                      {partner.name}
                    </h3>
                    {partner.description && (
                      <p className="text-xs text-gray-500 mt-2 line-clamp-2 leading-relaxed">
                        {partner.description}
                      </p>
                    )}
                  </div>
                </div>

                {partner.websiteUrl && partner.websiteUrl !== "https://" && (
                  <div className="pt-4 border-t border-gray-100 mt-6">
                    <a
                      href={partner.websiteUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-bold text-brand-primary hover:underline"
                    >
                      <span>Visit Website</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. PARTNERSHIP CTA */}
      <section className="py-40 bg-brand-primary text-white text-center">
        <div className="container-custom max-w-4xl mx-auto space-y-8">
          <h2 className="text-5xl lg:text-7xl font-black tracking-tight">Become a Partner.</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Join forces with VERC to scale life-changing education, water sanitation, and economic empowerment initiatives.
          </p>
          <div className="pt-4">
            <Link
              href="/contact"
              className="px-12 py-5 bg-white text-brand-primary font-black rounded-2xl shadow-2xl hover:scale-105 active:scale-95 transition-all inline-block"
            >
              Initiate Collaboration
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
