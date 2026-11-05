"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Globe, ArrowRight, ShieldCheck, 
  Sparkles, ChevronLeft, ChevronRight, 
  Award, HeartHandshake
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useContent } from "@/context/ContentContext";
import { resolvePartnerLogo, getShortPartnerLabel, getPartnerFallbackSvg } from "@/lib/partnerLogos";

interface SpotlightSlide {
  id: string;
  badgeEn: string;
  badgeBn: string;
  titleEn: string;
  titleBn: string;
  descEn: string;
  descBn: string;
  image: string;
  tagEn: string;
  tagBn: string;
}

const SPOTLIGHT_SLIDES: SpotlightSlide[] = [
  {
    id: "un-delegation",
    badgeEn: "Field Visit Spotlight",
    badgeBn: "মাঠপর্যায় পরিদর্শন স্পটলাইট",
    titleEn: "Community Sanitation & Piped Water Inauguration",
    titleBn: "কমিউনিটি স্যানিটেশন ও পাইপলাইনে নিরাপদ পানি প্রকল্প",
    descEn: "High-level delegation from UNICEF and World Bank observing community-managed piped water supply and village sanitation models in rural Bangladesh.",
    descBn: "ইউনিসেফ এবং বিশ্বব্যাংকের উচ্চপর্যায়ের প্রতিনিধিদের উপস্থিতিতে পল্লী এলাকায় কমিউনিটি পরিচালিত পাইপলাইনে নিরাপদ পানি ও স্যানিটেশন মডেল পর্যবেক্ষণ।",
    image: "/assets/home_official_1.jpg",
    tagEn: "UNICEF & World Bank Alliance",
    tagBn: "ইউনিসেফ ও বিশ্বব্যাংক যৌথ উদ্যোগ"
  },
  {
    id: "clts-global",
    badgeEn: "Global Innovation Milestone",
    badgeBn: "বৈশ্বিক উদ্ভাবনের মাইলফলক",
    titleEn: "Community-Led Total Sanitation (CLTS) in 60+ Nations",
    titleBn: "৬০টির বেশি দেশে অনুসৃত সিএলটিএস স্যানিটেশন বিপ্লব",
    descEn: "Pioneered by VERC in 2000 in Rajshahi, the CLTS methodology fundamentally transformed global public health strategies across Asia and Africa.",
    descBn: "২০০০ সালে রাজশাহীতে ভার্কের উদ্ভাবিত সিএলটিএস পদ্ধতি আজ এশিয়া ও আফ্রিকার ৬০টির বেশি দেশে জাতীয় স্যানিটেশন কৌশলের মূল ভিত্তি।",
    image: "/assets/wash_clean_water.jpg",
    tagEn: "Pioneered in Bangladesh (2000)",
    tagBn: "বাংলাদেশে উদ্ভাবিত (২০০০ সাল)"
  },
  {
    id: "pksf-livelihood",
    badgeEn: "Strategic National Financing",
    badgeBn: "জাতীয় কৌশলগত অংশীদারিত্ব",
    titleEn: "Empowering 350,000+ Women Entrepreneurs",
    titleBn: "৩,৫০,০০০+ গ্রামীণ নারী উদ্যোক্তার ক্ষমতায়ন",
    descEn: "Partnership with PKSF and government institutions delivering micro-enterprise funding, skills training, and social protection to marginalized families.",
    descBn: "পিকেএসএফ এবং সরকারি উন্নয়ন সংস্থার অর্থায়নে প্রান্তিক পরিবারগুলোর জন্য ক্ষুদ্রঋণ, কারিগরি প্রশিক্ষণ ও সামাজিক সুরক্ষা নিশ্চিতকরণ।",
    image: "/assets/community_success_hero.png",
    tagEn: "PKSF & Government Partnership",
    tagBn: "পিকেএসএফ ও সরকারি অংশীদারিত্ব"
  }
];

const PARTNER_LOGOS = [
  { id: "p-1", name: "Government of Bangladesh (GoB)", logoUrl: "/assets/gob_logo.png", category: "Government" },
  { id: "p-2", name: "PKSF (Palli Karma-Sahayak Foundation)", logoUrl: "/assets/pksf_logo.png", category: "Government" },
  { id: "p-3", name: "Microcredit Regulatory Authority (MRA)", logoUrl: "/assets/mra_logo.png", category: "Government" },
  { id: "p-4", name: "UNICEF Bangladesh", logoUrl: "/assets/unicef_logo.png", category: "UN Agencies" },
  { id: "p-5", name: "WaterAid / Water.org", logoUrl: "/assets/wateraid_logo.png", category: "International NGO" },
  { id: "p-6", name: "Save the Children", logoUrl: "/assets/savethechildren_logo.png", category: "International NGO" },
  { id: "p-7", name: "USAID", logoUrl: "/assets/usaid_logo.png", category: "International NGO" },
  { id: "p-8", name: "CARE Bangladesh", logoUrl: "/assets/care_logo.png", category: "International NGO" }
];

export default function GlobalCollaborationsSection() {
  const { language, t } = useLanguage();
  const { partners } = useContent();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const displayedPartners = partners && partners.length > 0
    ? partners.slice(0, 8)
    : PARTNER_LOGOS;

  const isBn = language === "bn";
  const activeSlide = SPOTLIGHT_SLIDES[currentSlideIndex];

  // Auto-cycle through spotlight slides
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % SPOTLIGHT_SLIDES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section className="relative py-24 lg:py-32 bg-gradient-to-b from-sky-50/55 via-slate-100/65 to-sky-50/40 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 overflow-hidden">
      {/* Background Subtle Tech/Globe Grid Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#0284c7_1px,transparent_1px)] [background-size:30px_30px] opacity-[0.22] pointer-events-none" />

      {/* Ambient 3D Liquid Glass Color Orbs */}
      <div className="absolute top-12 -left-24 w-96 h-96 rounded-full bg-sky-400/20 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 w-80 h-80 rounded-full bg-emerald-400/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-8 -right-24 w-96 h-96 rounded-full bg-cyan-500/20 blur-3xl pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* ===================================================================
              LEFT COLUMN: Prestigious Content & 3D Frosted Glass Partner Wall
              =================================================================== */}
          <div className="flex-1 space-y-7 max-w-2xl">
            {/* 3D Frosted Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="liquid-glass-pill-3d inline-flex items-center gap-2.5 px-4 sm:px-5 py-2 rounded-full"
            >
              <div className="w-6 h-6 rounded-full bg-brand-primary/12 flex items-center justify-center text-brand-primary shadow-inner">
                <Globe size={13} className="animate-spin-slow" />
              </div>
              <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-wider text-slate-800 dark:text-slate-100">
                {isBn ? "কৌশলগত বৈশ্বিক অংশীদারিত্ব • এজেন্ডা ২০৩০" : "Strategic Alliances • Global Reach"}
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.7)]" />
            </motion.div>

            {/* Main Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className={`text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold text-slate-900 dark:text-white tracking-tight ${isBn ? "leading-tight" : "leading-[1.06]"}`}
            >
              {isBn ? (
                <>
                  বৈশ্বিক প্রভাবে <br />
                  <span className="bg-gradient-to-r from-[#004B8D] via-sky-600 to-cyan-500 bg-clip-text text-transparent">
                    কৌশলগত আন্তর্জাতিক ঐক্য
                  </span>
                </>
              ) : (
                <>
                  Partnering for <br />
                  <span className="bg-gradient-to-r from-[#004B8D] via-sky-600 to-cyan-500 bg-clip-text text-transparent">
                    Global Impact.
                  </span>
                </>
              )}
            </motion.h2>

            {/* Subtitle / Narrative */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-medium leading-relaxed"
            >
              {isBn 
                ? "ভার্ক ইউনিসেফ, বিশ্বব্যাংক, পিকেএসএফ এবং বাংলাদেশ সরকারের মতো শীর্ষস্থানীয় উন্নয়ন সংস্থার সাথে অংশীদারিত্বের ভিত্তিতে প্রান্তিক জনগোষ্ঠীর জন্য রূপান্তরকারী স্বাস্থ্য, নিরাপদ পানি ও শিক্ষা অবকাঠামো গড়ে তুলছে।"
                : "VERC collaborates with premier global institutions—including UNICEF, the World Bank, WaterAid, and PKSF—to design, finance, and execute life-changing community infrastructure across Bangladesh."
              }
            </motion.p>

            {/* Quick Credibility Stats Pills — 3D Liquid Frosted Glass */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-3 gap-3 sm:gap-4 py-1"
            >
              <div className="liquid-glass-3d liquid-glass-3d-interactive p-4 sm:p-5 rounded-2xl relative overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#004B8D] to-sky-400" />
                <div className="text-xl sm:text-2xl font-extrabold text-[#004B8D] dark:text-sky-300">48+ Years</div>
                <div className="text-[11px] sm:text-xs font-semibold text-slate-600 dark:text-slate-300 mt-0.5 leading-snug">
                  {isBn ? "উন্নয়ন অংশীদারিত্ব" : "Development Legacy"}
                </div>
              </div>
              <div className="liquid-glass-3d liquid-glass-3d-interactive p-4 sm:p-5 rounded-2xl relative overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-emerald-500 to-teal-400" />
                <div className="text-xl sm:text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">60+ Nations</div>
                <div className="text-[11px] sm:text-xs font-semibold text-slate-600 dark:text-slate-300 mt-0.5 leading-snug">
                  {isBn ? "সিএলটিএস বিস্তার" : "Adopted VERC CLTS"}
                </div>
              </div>
              <div className="liquid-glass-3d liquid-glass-3d-interactive p-4 sm:p-5 rounded-2xl relative overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-cyan-500 to-blue-500" />
                <div className="text-xl sm:text-2xl font-extrabold text-cyan-700 dark:text-cyan-300">100%</div>
                <div className="text-[11px] sm:text-xs font-semibold text-slate-600 dark:text-slate-300 mt-0.5 leading-snug">
                  {isBn ? "অডিট ও স্বচ্ছতা" : "Audit Transparency"}
                </div>
              </div>
            </motion.div>

            {/* Prominent Partner Logo Wall — 3D Liquid Frosted Glass Polymorphic Cards */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
              className="space-y-3.5 pt-1"
            >
              <div className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-slate-600 dark:text-slate-300 flex items-center gap-2">
                <ShieldCheck size={15} className="text-brand-primary" />
                <span>{isBn ? "প্রধান উন্নয়ন ও দাতা সহযোগী সংস্থাসমূহ" : "Key Institutional & Donor Alliances"}</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-3.5">
                {displayedPartners.map((partner, idx) => {
                  const resolvedLogo = resolvePartnerLogo(partner);
                  const shortLabel = getShortPartnerLabel(partner);
                  return (
                    <Link
                      href="/partners"
                      key={`${partner.id || partner.name}-${idx}`}
                      title={`${partner.name} (${partner.category || "Institutional Partner"})`}
                      className="liquid-glass-3d liquid-glass-3d-interactive group relative rounded-2xl px-3 py-2.5 flex flex-col items-center justify-center gap-1.5 min-h-[78px] overflow-hidden"
                    >
                      {/* Top Specular Edge */}
                      <div className="pointer-events-none absolute inset-x-3 top-0 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent opacity-90" />

                      {/* Crisp Logo Showcase Frame */}
                      <div className="h-10 w-full flex items-center justify-center px-1">
                        <img
                          src={resolvedLogo}
                          alt={partner.name}
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = getPartnerFallbackSvg(partner.name);
                          }}
                          className="max-h-9 max-w-[115px] object-contain transition-transform duration-300 group-hover:scale-108"
                        />
                      </div>

                      {/* Clean Institutional Short Label */}
                      <span className="text-[10px] font-bold text-slate-600 dark:text-slate-300 group-hover:text-brand-primary transition-colors text-center leading-tight line-clamp-1">
                        {shortLabel}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </motion.div>

            {/* Classy 3D Sculpted Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <Link 
                href="/partners"
                className="liquid-glass-primary-3d group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-white font-bold text-sm overflow-hidden"
              >
                {/* Gloss streak sweep on hover */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
                
                <span className="relative z-10">{t("global_btn")}</span>
                
                <div className="relative z-10 w-6 h-6 rounded-full bg-white/20 group-hover:bg-white group-hover:text-brand-primary flex items-center justify-center transition-colors">
                  <ArrowRight size={13} strokeWidth={2.8} className="group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>

              <Link
                href="/contact"
                className="liquid-glass-3d liquid-glass-3d-interactive inline-flex items-center gap-2.5 px-7 py-4 rounded-2xl text-slate-800 dark:text-white hover:text-brand-primary font-bold text-sm"
              >
                <HeartHandshake size={17} className="text-brand-primary" />
                <span>{isBn ? "অংশীদার হতে যোগাযোগ" : "Collaborate with VERC"}</span>
              </Link>
            </motion.div>
          </div>

          {/* ===================================================================
              RIGHT COLUMN: 3D Frosted Liquid Glass Spotlight Showcase
              =================================================================== */}
          <div 
            className="flex-1 w-full"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="liquid-glass-3d relative w-full rounded-[38px] sm:rounded-[44px] p-3 sm:p-4 overflow-hidden"
            >
              {/* 1. PHOTO VIEWPORT: 100% Unshaded, Crystal-Clear Picture Inside 3D Glass Bezel */}
              <div className="relative h-[330px] sm:h-[370px] w-full rounded-[28px] sm:rounded-[34px] overflow-hidden bg-slate-100 border border-white/80 shadow-inner">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSlide.id}
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0"
                  >
                    <img
                      src={activeSlide.image}
                      alt={activeSlide.titleEn}
                      className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Floating Top-Right Accreditation Pill in 3D Frosted Glass */}
                <div className="liquid-glass-pill-3d absolute top-4 right-4 z-20 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-slate-800 text-[11px] font-bold uppercase tracking-wider">
                  <Sparkles size={12} className="text-amber-500" />
                  <span>{isBn ? activeSlide.tagBn : activeSlide.tagEn}</span>
                </div>
              </div>

              {/* 2. DEDICATED SPOTLIGHT NARRATIVE PANEL: Placed BELOW the picture */}
              <div className="p-5 sm:p-6 mt-2 rounded-[26px] bg-white/75 dark:bg-slate-900/75 backdrop-blur-xl border border-white/90 dark:border-white/10 shadow-[inset_0_1.5px_2px_rgba(255,255,255,1)] space-y-3">
                {/* Header Row: Badge & Slide Dots */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-brand-primary flex items-center gap-1.5">
                    <Award size={14} className="text-brand-primary" />
                    {isBn ? activeSlide.badgeBn : activeSlide.badgeEn}
                  </span>

                  {/* Slide Indicator Dots */}
                  <div className="flex items-center gap-1.5">
                    {SPOTLIGHT_SLIDES.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentSlideIndex(idx)}
                        className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                          idx === currentSlideIndex 
                            ? "w-6 bg-brand-primary" 
                            : "w-2 bg-slate-300 hover:bg-slate-400"
                        }`}
                        aria-label={`Slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Spotlight Title */}
                <h4 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white leading-snug tracking-tight">
                  {isBn ? activeSlide.titleBn : activeSlide.titleEn}
                </h4>

                {/* Spotlight Narrative Description */}
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium leading-relaxed line-clamp-2">
                  {isBn ? activeSlide.descBn : activeSlide.descEn}
                </p>

                {/* Footer Controls: Counter & Navigation Arrows */}
                <div className="pt-3 border-t border-slate-200/70 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-semibold">
                    {isBn ? `স্পটলাইট ${currentSlideIndex + 1} / ${SPOTLIGHT_SLIDES.length}` : `Spotlight ${currentSlideIndex + 1} of ${SPOTLIGHT_SLIDES.length}`}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentSlideIndex((prev) => (prev - 1 + SPOTLIGHT_SLIDES.length) % SPOTLIGHT_SLIDES.length)}
                      className="liquid-glass-pill-3d w-8 h-8 rounded-full hover:bg-brand-primary hover:text-white text-slate-700 flex items-center justify-center transition-all duration-200 active:scale-95 cursor-pointer"
                      aria-label="Previous slide"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      onClick={() => setCurrentSlideIndex((prev) => (prev + 1) % SPOTLIGHT_SLIDES.length)}
                      className="liquid-glass-pill-3d w-8 h-8 rounded-full hover:bg-brand-primary hover:text-white text-slate-700 flex items-center justify-center transition-all duration-200 active:scale-95 cursor-pointer"
                      aria-label="Next slide"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
