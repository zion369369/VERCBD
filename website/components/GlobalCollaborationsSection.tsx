"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Globe, ArrowRight, ShieldCheck, CheckCircle2, 
  ExternalLink, Sparkles, ChevronLeft, ChevronRight, 
  Building2, Award, Users, HeartHandshake
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

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
  { name: "UNICEF", logo: "/assets/unicef_logo.png", type: "UN Agency" },
  { name: "World Bank", logo: "/assets/worldbank_logo.png", type: "Global Donor" },
  { name: "WaterAid", logo: "/assets/wateraid_logo.png", type: "International NGO" },
  { name: "PKSF", logo: "/assets/pksf_logo.png", type: "Apex Development Body" },
  { name: "USAID", logo: "/assets/usaid_logo.png", type: "International Partner" },
  { name: "Save the Children", logo: "/assets/savethechildren_logo.png", type: "Child Rights Alliance" },
  { name: "Government of Bangladesh", logo: "/assets/gob_logo.png", type: "National Government" },
  { name: "Swisscontact", logo: "/assets/swisscontact_logo.jpg", type: "Technical Co-operation" },
  { name: "Winrock International", logo: "/assets/winrock_logo.png", type: "Global NGO" }
];

export default function GlobalCollaborationsSection() {
  const { language, t } = useLanguage();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

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
    <section className="relative py-28 lg:py-36 bg-gradient-to-b from-white via-slate-50/50 to-white overflow-hidden">
      {/* Background Subtle Tech/Globe Grid Texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#004B8D_1px,transparent_1px)] [background-size:32px_32px] opacity-[0.03] pointer-events-none" />

      {/* Ambient soft glow bubbles */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-brand-primary/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-32 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-20">
          
          {/* ===================================================================
              LEFT COLUMN: Prestigious Content & Credibility Badges
              =================================================================== */}
          <div className="flex-1 space-y-8 max-w-2xl">
            {/* Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-2 rounded-full bg-white shadow-sm border border-slate-200/90 backdrop-blur-md"
            >
              <div className="w-5 h-5 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                <Globe size={13} className="animate-spin-slow" />
              </div>
              <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-slate-800">
                {isBn ? "কৌশলগত বৈশ্বিক অংশীদারিত্ব • এজেন্ডা ২০৩০" : "Strategic Alliances • Global Reach"}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </motion.div>

            {/* Main Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className={`text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight ${isBn ? "leading-tight" : "leading-[1.08]"}`}
            >
              {isBn ? (
                <>
                  বৈশ্বিক প্রভাবে <br />
                  <span className="bg-gradient-to-r from-brand-primary via-blue-600 to-cyan-500 bg-clip-text text-transparent">
                    কৌশলগত আন্তর্জাতিক ঐক্য
                  </span>
                </>
              ) : (
                <>
                  Partnering for <br />
                  <span className="bg-gradient-to-r from-brand-primary via-blue-600 to-cyan-500 bg-clip-text text-transparent">
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
              className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed"
            >
              {isBn 
                ? "ভার্ক ইউনিসেফ, বিশ্বব্যাংক, পিকেএসএফ এবং বাংলাদেশ সরকারের মতো শীর্ষস্থানীয় উন্নয়ন সংস্থার সাথে অংশীদারিত্বের ভিত্তিতে প্রান্তিক জনগোষ্ঠীর জন্য রূপান্তরকারী স্বাস্থ্য, নিরাপদ পানি ও শিক্ষা অবকাঠামো গড়ে তুলছে।"
                : "VERC collaborates with premier global institutions—including UNICEF, the World Bank, WaterAid, and PKSF—to design, finance, and execute life-changing community infrastructure across Bangladesh."
              }
            </motion.p>

            {/* Quick Credibility Stats Pills */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-3 gap-3 sm:gap-4 py-2"
            >
              <div className="p-3.5 sm:p-4 rounded-2xl bg-white shadow-sm border border-slate-200/80 hover:border-brand-primary/40 transition-colors">
                <div className="text-xl sm:text-2xl font-black text-brand-primary">45+</div>
                <div className="text-[10px] sm:text-xs font-bold text-slate-600 mt-0.5 leading-snug">
                  {isBn ? "উন্নয়ন সহযোগী" : "Global Partners"}
                </div>
              </div>
              <div className="p-3.5 sm:p-4 rounded-2xl bg-white shadow-sm border border-slate-200/80 hover:border-emerald-500/40 transition-colors">
                <div className="text-xl sm:text-2xl font-black text-emerald-600">60+</div>
                <div className="text-[10px] sm:text-xs font-bold text-slate-600 mt-0.5 leading-snug">
                  {isBn ? "দেশে সিএলটিএস" : "Nations in CLTS"}
                </div>
              </div>
              <div className="p-3.5 sm:p-4 rounded-2xl bg-white shadow-sm border border-slate-200/80 hover:border-cyan-500/40 transition-colors">
                <div className="text-xl sm:text-2xl font-black text-cyan-600">4 Decades</div>
                <div className="text-[10px] sm:text-xs font-bold text-slate-600 mt-0.5 leading-snug">
                  {isBn ? "১৯৭৭ থেকে সুনাম" : "Field Excellence"}
                </div>
              </div>
            </motion.div>

            {/* Prominent Partner Logo Strip */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
              className="space-y-3 pt-1"
            >
              <div className="text-[11px] font-black uppercase tracking-wider text-slate-500 flex items-center gap-2">
                <ShieldCheck size={14} className="text-brand-primary" />
                <span>{isBn ? "প্রধান উন্নয়ন ও দাতা সহযোগী সংস্থাসমূহ" : "Key Institutional & Donor Alliances"}</span>
              </div>

              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                {PARTNER_LOGOS.slice(0, 6).map((partner) => (
                  <div
                    key={partner.name}
                    title={`${partner.name} (${partner.type})`}
                    className="group relative px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl bg-white shadow-xs border border-slate-200/90 hover:border-brand-primary/50 hover:shadow-md transition-all duration-300 flex items-center justify-center h-11 sm:h-12 w-24 sm:w-28"
                  >
                    <img 
                      src={partner.logo} 
                      alt={partner.name}
                      className="max-h-7 max-w-full object-contain filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300 opacity-80 group-hover:opacity-100"
                    />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Classy Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <Link 
                href="/partners"
                className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-brand-primary text-white font-extrabold text-sm shadow-xl shadow-brand-primary/25 hover:shadow-2xl hover:shadow-brand-primary/35 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 overflow-hidden"
              >
                {/* Gloss streak sweep on hover */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
                
                <span className="relative z-10">{t("global_btn")}</span>
                
                <div className="relative z-10 w-6 h-6 rounded-full bg-white/20 group-hover:bg-white group-hover:text-brand-primary flex items-center justify-center transition-colors">
                  <ArrowRight size={13} strokeWidth={2.8} className="group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl bg-white text-slate-700 hover:text-brand-primary font-bold text-sm border border-slate-200 hover:border-slate-300 shadow-sm hover:bg-slate-50 transition-all duration-300"
              >
                <HeartHandshake size={16} className="text-brand-primary" />
                <span>{isBn ? "অংশীদার হতে যোগাযোগ" : "Collaborate with VERC"}</span>
              </Link>
            </motion.div>
          </div>

          {/* ===================================================================
              RIGHT COLUMN: Elegant Split Spotlight Showcase
              - Photo is 100% CLEAR, NATURAL, UNHIDDEN & WITHOUT BLACK SHADING
              - Story panel is elegantly integrated below the photo, leaving the
                entire photo completely unobstructed!
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
              className="relative w-full rounded-[36px] sm:rounded-[44px] overflow-hidden shadow-2xl border border-slate-200/90 bg-white"
            >
              {/* 1. PHOTO VIEWPORT: 100% Unshaded, Crystal-Clear Picture */}
              <div className="relative h-[340px] sm:h-[380px] w-full overflow-hidden bg-slate-100">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSlide.id}
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.6 }}
                    className="absolute inset-0"
                  >
                    {/* Raw, natural, clear photograph with zero black wash overlay */}
                    <img
                      src={activeSlide.image}
                      alt={activeSlide.titleEn}
                      className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Floating Top-Right Accreditation Pill in Light Frosted Glass */}
                <div className="absolute top-4 right-4 z-20 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-slate-800 text-[11px] font-black uppercase tracking-wider border border-white/60 shadow-md">
                  <Sparkles size={12} className="text-amber-500" />
                  <span>{isBn ? activeSlide.tagBn : activeSlide.tagEn}</span>
                </div>
              </div>

              {/* 2. DEDICATED SPOTLIGHT NARRATIVE PANEL: Placed BELOW the picture */}
              <div className="p-6 sm:p-7 bg-gradient-to-b from-white to-slate-50/70 border-t border-slate-100 space-y-3">
                {/* Header Row: Badge & Slide Dots */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-black uppercase tracking-wider text-brand-primary flex items-center gap-1.5">
                    <Award size={14} className="text-brand-primary" />
                    {isBn ? activeSlide.badgeBn : activeSlide.badgeEn}
                  </span>

                  {/* Slide Indicator Dots */}
                  <div className="flex items-center gap-1.5">
                    {SPOTLIGHT_SLIDES.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentSlideIndex(idx)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          idx === currentSlideIndex 
                            ? "w-6 bg-brand-primary" 
                            : "w-2 bg-slate-200 hover:bg-slate-300"
                        }`}
                        aria-label={`Slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Spotlight Title */}
                <h4 className="text-lg sm:text-xl font-black text-slate-900 leading-snug tracking-tight">
                  {isBn ? activeSlide.titleBn : activeSlide.titleEn}
                </h4>

                {/* Spotlight Narrative Description */}
                <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed line-clamp-2">
                  {isBn ? activeSlide.descBn : activeSlide.descEn}
                </p>

                {/* Footer Controls: Counter & Navigation Arrows */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-bold">
                    {isBn ? `স্পটলাইট ${currentSlideIndex + 1} / ${SPOTLIGHT_SLIDES.length}` : `Spotlight ${currentSlideIndex + 1} of ${SPOTLIGHT_SLIDES.length}`}
                  </span>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentSlideIndex((prev) => (prev - 1 + SPOTLIGHT_SLIDES.length) % SPOTLIGHT_SLIDES.length)}
                      className="w-8 h-8 rounded-full bg-slate-100 hover:bg-brand-primary hover:text-white text-slate-700 flex items-center justify-center transition-all duration-200 shadow-xs active:scale-95"
                      aria-label="Previous slide"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      onClick={() => setCurrentSlideIndex((prev) => (prev + 1) % SPOTLIGHT_SLIDES.length)}
                      className="w-8 h-8 rounded-full bg-slate-100 hover:bg-brand-primary hover:text-white text-slate-700 flex items-center justify-center transition-all duration-200 shadow-xs active:scale-95"
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
