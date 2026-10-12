"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, Target, Heart, Globe, 
  Droplets, BookOpen, Users, Zap, HeartPulse, Scale, 
  TrendingUp, Handshake, Sun, ChevronLeft, ChevronRight, Sparkles, HeartHandshake 
} from "lucide-react";
import { useContent } from "@/context/ContentContext";
import { useLanguage } from "@/context/LanguageContext";
import AnimatedCounter from "@/components/AnimatedCounter";

export default function Home() {
  const { heroSlides, impactStats, programs, siteSettings, primaryColor } = useContent();
  const { language, t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Filter only active / enabled slides
  const activeHeroSlides = heroSlides.filter((s) => s.enabled !== false);
  const isBannerGloballyEnabled = siteSettings.heroBannerEnabled !== false;

  useEffect(() => {
    if (!isBannerGloballyEnabled || activeHeroSlides.length <= 1 || isPaused) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % activeHeroSlides.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [activeHeroSlides.length, isBannerGloballyEnabled, isPaused]);

  // Keep current slide within bounds if slides are disabled or removed
  useEffect(() => {
    if (activeHeroSlides.length > 0 && currentSlide >= activeHeroSlides.length) {
      setCurrentSlide(0);
    }
  }, [activeHeroSlides.length, currentSlide]);

  const activeSlide = activeHeroSlides[currentSlide] || activeHeroSlides[0];
  const primaryStats = impactStats.slice(0, 4);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  };

  // Dynamic slide content resolver: accurately uses slide's own CMS title, highlight, subtitle, and buttons!
  const getSlideContent = (slide?: typeof activeSlide) => {
    if (!slide) {
      return { 
        title: "", 
        highlight: "", 
        subtitle: "", 
        btnPrimary: "Our Story", 
        btnSecondary: "Contact Us", 
        badge: "VERC Bangladesh" 
      };
    }

    if (language === "bn") {
      if (slide.id === "hero-1") {
        return {
          title: slide.title_bn || t("hero_title_1"),
          highlight: slide.highlightText_bn || t("hero_highlight_1"),
          subtitle: slide.subtitle_bn || t("hero_subtitle_1"),
          btnPrimary: slide.primaryBtnText_bn || t("hero_btn_primary_1"),
          btnSecondary: slide.secondaryBtnText_bn || t("hero_btn_secondary_1"),
          badge: slide.categoryBadge || "টেকসই উন্নয়ন ও উদ্ভাবন"
        };
      }
      if (slide.id === "hero-2") {
        return {
          title: slide.title_bn || t("hero_title_2"),
          highlight: slide.highlightText_bn || t("hero_highlight_2"),
          subtitle: slide.subtitle_bn || t("hero_subtitle_2"),
          btnPrimary: slide.primaryBtnText_bn || t("hero_btn_primary_2"),
          btnSecondary: slide.secondaryBtnText_bn || t("hero_btn_secondary_2"),
          badge: slide.categoryBadge || "সিএলটিএস স্যানিটেশন বিপ্লব"
        };
      }
      if (slide.id === "hero-3") {
        return {
          title: slide.title_bn || t("hero_title_3"),
          highlight: slide.highlightText_bn || t("hero_highlight_3"),
          subtitle: slide.subtitle_bn || t("hero_subtitle_3"),
          btnPrimary: slide.primaryBtnText_bn || t("hero_btn_primary_3"),
          btnSecondary: slide.secondaryBtnText_bn || t("hero_btn_secondary_3"),
          badge: slide.categoryBadge || "শিশু বিকাশ ও শিক্ষা"
        };
      }
      return {
        title: slide.title_bn || slide.title,
        highlight: slide.highlightText_bn || slide.highlightText,
        subtitle: slide.subtitle_bn || slide.subtitle,
        btnPrimary: slide.primaryBtnText_bn || slide.primaryBtnText || "Explore",
        btnSecondary: slide.secondaryBtnText_bn || slide.secondaryBtnText || "Contact",
        badge: slide.categoryBadge || "সামাজিক অগ্রগতি"
      };
    }

    // English mode: ALWAYS uses the slide's actual title and subtitle from CMS!
    return {
      title: slide.title,
      highlight: slide.highlightText,
      subtitle: slide.subtitle,
      btnPrimary: slide.primaryBtnText || "Our Story",
      btnSecondary: slide.secondaryBtnText || "Partner with Us",
      badge: slide.categoryBadge || "Sustainable Development Since 1977"
    };
  };

  const currentSlideText = getSlideContent(activeSlide);

  // Helper for bilingual stat labels
  const getStatLabel = (key: string, defaultLabel: string) => {
    if (key === "lives") return t("stat_lives_label");
    if (key === "districts") return t("stat_districts_label");
    if (key === "leaders") return t("stat_leaders_label");
    if (key === "legacy") return t("stat_legacy_label");
    return defaultLabel;
  };

  // Helper for dynamic stat icons
  const getStatIcon = (key: string, iconName?: string) => {
    if (key === "lives" || iconName === "Users") return <Users size={22} className="stroke-[2.2]" />;
    if (key === "districts" || iconName === "Globe") return <Globe size={22} className="stroke-[2.2]" />;
    if (key === "leaders" || iconName === "UserCheck") return <HeartHandshake size={22} className="stroke-[2.2]" />;
    if (key === "legacy" || iconName === "History") return <TrendingUp size={22} className="stroke-[2.2]" />;
    return <TrendingUp size={22} className="stroke-[2.2]" />;
  };

  // Helper for bilingual program details
  const getProgramInfo = (index: number, defaultTitle: string, defaultDesc: string) => {
    if (index === 0) return { title: t("prog_edu_title"), desc: t("prog_edu_desc") };
    if (index === 1) return { title: t("prog_wash_title"), desc: t("prog_wash_desc") };
    if (index === 2) return { title: t("prog_live_title"), desc: t("prog_live_desc") };
    if (index === 3) return { title: t("prog_cap_title"), desc: t("prog_cap_desc") };
    return { title: defaultTitle, desc: defaultDesc };
  };

  return (
    <div className="flex flex-col bg-white overflow-x-hidden">
      {/* 1. HERO SECTION */}
      {isBannerGloballyEnabled && activeHeroSlides.length > 0 ? (
        <section 
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative min-h-[85vh] lg:min-h-[92vh] flex items-center pt-32 pb-24 overflow-hidden bg-slate-950"
        >
          {/* Ambient Decorative Lighting */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />

          {/* Background Slides with Ken-Burns Motion */}
          <div className="absolute inset-0 z-0">
            <AnimatePresence mode="wait">
              {activeSlide && (
                <motion.div
                  key={activeSlide.id || currentSlide}
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 0.95, scale: 1.02 }}
                  exit={{ opacity: 0, scale: 1.0 }}
                  transition={{ duration: 1.4, ease: [0.25, 1, 0.5, 1] }}
                  className="absolute inset-0"
                >
                  <img 
                    src={activeSlide.imageUrl} 
                    alt={activeSlide.title || "VERC Bangladesh"} 
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Soft, light shade for high banner visibility with excellent text contrast */}
            <div className="absolute inset-0 bg-slate-950/25" />
            <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-slate-950/65 via-slate-950/15 to-transparent" />
          </div>

          {/* Desktop Left/Right Navigation Arrows */}
          {activeHeroSlides.length > 1 && (
            <>
              <button 
                type="button"
                onClick={() => setCurrentSlide((prev) => (prev - 1 + activeHeroSlides.length) % activeHeroSlides.length)}
                className="hidden lg:flex absolute left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 items-center justify-center rounded-2xl bg-slate-900/50 hover:bg-slate-900/90 text-white/70 hover:text-white backdrop-blur-xl border border-white/10 hover:border-white/30 transition-all hover:scale-105 active:scale-95 shadow-2xl cursor-pointer"
                aria-label="Previous slide"
              >
                <ChevronLeft size={22} />
              </button>
              <button 
                type="button"
                onClick={() => setCurrentSlide((prev) => (prev + 1) % activeHeroSlides.length)}
                className="hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 items-center justify-center rounded-2xl bg-slate-900/50 hover:bg-slate-900/90 text-white/70 hover:text-white backdrop-blur-xl border border-white/10 hover:border-white/30 transition-all hover:scale-105 active:scale-95 shadow-2xl cursor-pointer"
                aria-label="Next slide"
              >
                <ChevronRight size={22} />
              </button>
            </>
          )}

          {/* Floating Slide Indicator & Counter Pill */}
          {activeHeroSlides.length > 1 && (
            <div className="absolute bottom-8 right-6 sm:right-12 z-30 flex items-center gap-3 bg-slate-950/70 backdrop-blur-xl px-4 py-2 rounded-full border border-white/15 shadow-2xl">
              <span className="text-[11px] font-mono font-bold text-white/80 tracking-widest">
                {String(currentSlide + 1).padStart(2, "0")} / {String(activeHeroSlides.length).padStart(2, "0")}
              </span>
              <div className="h-3 w-[1px] bg-white/20" />
              <div className="flex items-center gap-1.5">
                {activeHeroSlides.map((_, i) => (
                  <button
                    key={i} 
                    type="button"
                    onClick={() => setCurrentSlide(i)}
                    title={`Slide ${i + 1}`}
                    className={`h-1.5 transition-all duration-500 rounded-full cursor-pointer ${
                      i === currentSlide ? "w-8 bg-cyan-400 shadow-sm shadow-cyan-400/50" : "w-2 bg-white/30 hover:bg-white/60"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
          
          {/* Main Slide Content */}
          <div className="container-custom relative z-20 text-white text-center">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
              <AnimatePresence mode="wait">
                {activeSlide && (
                  <motion.div
                    key={activeSlide.id || currentSlide}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center"
                  >

                    {/* Headline */}
                    <h1 className={`text-3xl sm:text-5xl lg:text-7xl font-black text-white select-none caret-transparent drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)] ${
                      language === "bn" ? "leading-[1.25] tracking-normal mb-5 py-1" : "leading-[1.04] tracking-tight mb-6"
                    }`}>
                      {currentSlideText.title}{" "}
                      {currentSlideText.highlight && (
                        <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-teal-300 bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
                          {currentSlideText.highlight}
                        </span>
                      )}
                    </h1>

                    {/* Subtitle / Description */}
                    <p className="text-base sm:text-xl md:text-2xl lg:text-3xl text-white font-medium mb-8 sm:mb-10 leading-relaxed max-w-4xl mx-auto drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
                      {currentSlideText.subtitle}
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-5">
                      <Link 
                        href={activeSlide.primaryBtnLink || "/about"} 
                        className="group relative inline-flex items-center gap-2.5 px-8 py-4 bg-white text-slate-950 font-bold rounded-2xl hover:bg-slate-100 hover:shadow-2xl hover:shadow-cyan-500/20 hover:scale-[1.03] active:scale-[0.98] transition-all shadow-xl text-sm sm:text-base cursor-pointer"
                      >
                        <span>{currentSlideText.btnPrimary}</span>
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </Link>
                      <Link 
                        href={activeSlide.secondaryBtnLink || "/contact"} 
                        className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-xl text-white border border-white/25 font-semibold rounded-2xl hover:bg-white/20 hover:border-white/40 hover:scale-[1.03] active:scale-[0.98] transition-all text-sm sm:text-base shadow-lg cursor-pointer"
                      >
                        <span>{currentSlideText.btnSecondary}</span>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>
      ) : (
        /* Minimalist fallback when hero banner is globally disabled */
        <div className="pt-32 pb-16 bg-gradient-to-b from-slate-950 to-slate-900 text-white text-center">
          <div className="container-custom py-6">
            <span className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold uppercase tracking-wider text-cyan-300 mb-3">
              Village Education Resource Center
            </span>
            <h1 className="text-2xl lg:text-4xl font-extrabold text-white tracking-tight">
              Transforming Lives & Empowering Grassroots Communities
            </h1>
          </div>
        </div>
      )}

      {/* 2. IMPACT STATS SECTION - CLASSY POLYMORPHIC GLASS DESIGN */}
      <section className="relative z-30 -mt-16 sm:-mt-20 pb-4">
        <div className="container-custom relative">
          {/* Subtle Ambient Color Reflection Glow Behind Glass Cards */}
          <div 
            style={{ 
              background: `radial-gradient(ellipse at center, ${primaryColor || "#004B8D"}22 0%, rgba(0, 174, 239, 0.12) 50%, transparent 75%)` 
            }}
            className="absolute inset-0 -top-8 blur-3xl -z-10 rounded-full pointer-events-none transform scale-y-75" 
          />

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {primaryStats.map((stat, i) => (
              <motion.div 
                key={stat.id}
                {...fadeIn}
                transition={{ delay: i * 0.1 }}
                className="relative group rounded-[32px] sm:rounded-[36px] p-6 sm:p-8 lg:p-9 flex flex-col items-center text-center overflow-hidden transition-all duration-500 hover:-translate-y-2.5 cursor-pointer backdrop-blur-2xl bg-white/80 dark:bg-slate-900/80 border border-white/80 dark:border-white/15 shadow-[0_20px_50px_-10px_rgba(0,75,141,0.12),0_4px_12px_rgba(0,0,0,0.03),inset_0_1px_1px_rgba(255,255,255,0.95),inset_0_-1px_1px_rgba(0,75,141,0.06)] hover:shadow-[0_30px_70px_-12px_rgba(0,75,141,0.24),0_0_30px_rgba(0,174,239,0.2),inset_0_1px_2px_rgba(255,255,255,1)] hover:border-cyan-300/60"
              >
                {/* Polymorphic Corner Light Flares */}
                <div 
                  style={{ backgroundColor: `${primaryColor || "#004B8D"}18` }}
                  className="absolute -top-12 -right-12 w-28 h-28 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 pointer-events-none" 
                />
                <div className="absolute -bottom-10 -left-10 w-24 h-24 rounded-full bg-cyan-400/15 blur-xl group-hover:scale-125 transition-transform duration-700 pointer-events-none" />

                {/* Top Specular Edge Highlight Bar */}
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent opacity-80 group-hover:via-cyan-300 group-hover:opacity-100 transition-all duration-500" />

                {/* Jewel-like Frosted Glass Icon Badge */}
                <div className="relative mb-5 z-10">
                  <div 
                    style={{
                      borderColor: `${primaryColor || "#004B8D"}25`,
                    }}
                    className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-white/95 via-sky-50/70 to-white/90 dark:from-white/15 dark:to-white/5 border shadow-[0_8px_20px_rgba(0,75,141,0.1),inset_0_1px_2px_rgba(255,255,255,0.95)] flex items-center justify-center text-brand-primary group-hover:scale-110 group-hover:text-white transition-all duration-500 relative overflow-hidden"
                  >
                    {/* Hover Fill with Brand Gradient */}
                    <div 
                      style={{ 
                        background: `linear-gradient(135deg, ${primaryColor || "#004B8D"}, #00AEEF)` 
                      }}
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    />
                    <span className="relative z-10 transition-colors duration-300">
                      {getStatIcon(stat.key, stat.iconName)}
                    </span>
                  </div>
                </div>

                {/* Value with Classy Contrast & Smooth Animated Counter */}
                <div className="relative z-10 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white mb-2 group-hover:text-brand-primary dark:group-hover:text-cyan-300 transition-colors duration-300">
                  <AnimatedCounter value={stat.value} duration={1.2} />
                </div>

                {/* Label with Classy Tracking */}
                <div className="relative z-10 text-[11px] sm:text-xs font-bold uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors duration-300 leading-tight">
                  {getStatLabel(stat.key, stat.label)}
                </div>

                {/* Subtle Polymorphic Shimmer Accent Pill */}
                <div 
                  style={{ 
                    background: `linear-gradient(90deg, ${primaryColor || "#004B8D"}, #00AEEF)` 
                  }}
                  className="w-8 h-1 rounded-full opacity-35 group-hover:opacity-100 group-hover:w-16 transition-all duration-500 mt-4 shadow-sm"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. PROGRAM PILLARS */}
      <section className="py-32 bg-white">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 text-brand-primary mb-4">
                <Target size={24} />
                <h2 className="font-black uppercase tracking-[0.2em] text-xs">{t("focus_badge")}</h2>
              </div>
              <h3 className={`text-4xl lg:text-7xl font-black text-gray-900 ${language === "bn" ? "leading-[1.25] tracking-normal py-1" : "leading-[1.05] tracking-tighter"}`}>
                {t("focus_title")} <br/> <span className="text-brand-primary">{t("focus_highlight")}</span>
              </h3>
            </div>
            <p className="text-lg lg:text-xl text-gray-500 font-medium max-w-md leading-relaxed">
              {t("focus_subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {programs.slice(0, 4).map((item, i) => {
              const progInfo = getProgramInfo(i, item.title, item.description);
              const programEmojis = ["📚", "💧", "🌾", "🎯"];
              return (
                <motion.div 
                  key={item.id} 
                  {...fadeIn}
                  transition={{ delay: i * 0.1 }}
                  className={`${item.color || "bg-blue-50"} p-8 lg:p-10 rounded-[40px] border border-transparent hover:border-gray-200 hover:bg-white hover:shadow-2xl transition-all duration-500 group flex flex-col h-full`}
                >
                  <div className="mb-8 w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform text-3xl border border-gray-100 select-none">
                    <span>{programEmojis[i] || "🌱"}</span>
                  </div>
                  <h3 className={`text-2xl font-black mb-4 text-gray-900 ${language === "bn" ? "leading-snug tracking-normal" : "leading-tight"}`}>{progInfo.title}</h3>
                  <p className="text-gray-600 font-medium mb-8 text-sm leading-relaxed line-clamp-3">
                    {progInfo.desc}
                  </p>
                  <Link href={`/programs/${item.slug}`} className="mt-auto inline-flex items-center gap-2 text-[12px] font-black uppercase tracking-widest text-brand-primary hover:gap-4 transition-all">
                    {t("explore_program")} <ArrowRight size={14} />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. GLOBAL AGENDA 2030 (SDGs) */}
      <section className="py-32 bg-gray-50 overflow-hidden">
        <div className="container-custom">
            <div className="text-center max-w-4xl mx-auto mb-20">
                <motion.div {...fadeIn}>
                    <span className="inline-flex items-center gap-2 px-5 py-2 bg-brand-primary/10 rounded-full text-[10px] font-black uppercase tracking-widest text-brand-primary mb-6">
                        {t("sdg_badge")}
                    </span>
                    <h2 className={`text-4xl lg:text-7xl font-black text-gray-900 ${language === "bn" ? "leading-[1.25] tracking-normal mb-6" : "leading-[1] tracking-tighter mb-8"}`}>
                        {t("sdg_title")} <br/> <span className="text-brand-primary">{t("sdg_highlight")}</span>
                    </h2>
                    <p className="text-lg lg:text-xl text-gray-600 font-medium leading-relaxed max-w-3xl mx-auto">
                        {t("sdg_subtitle")}
                    </p>
                </motion.div>
            </div>

            <div className="flex flex-wrap justify-center gap-5">
                {[
                    { id: 1, title: language === "bn" ? "দারিদ্র্য বিমোচন" : "No Poverty", color: "bg-[#E5243B]", desc: language === "bn" ? "সুবিধাবঞ্চিতদের জীবিকা উন্নয়ন।" : "Livelihood development for the disadvantaged.", icon: <Users size={28} /> },
                    { id: 2, title: language === "bn" ? "ক্ষুধা মুক্তি" : "Zero Hunger", color: "bg-[#DDA63A]", desc: language === "bn" ? "খাদ্য নিরাপত্তায় গ্রামীণ উন্নয়ন।" : "Rural development aimed at food security.", icon: <Zap size={28} /> },
                    { id: 3, title: language === "bn" ? "সুস্বাস্থ্য ও কল্যাণ" : "Good Health", color: "bg-[#4C9F38]", desc: language === "bn" ? "মা ও শিশু হাসপাতাল ও স্বাস্থ্য সেবা।" : "Mother & Child Hospital and health initiatives.", icon: <HeartPulse size={28} /> },
                    { id: 4, title: language === "bn" ? "গুণগত শিক্ষা" : "Quality Education", color: "bg-[#C5192D]", desc: language === "bn" ? "প্রাথমিক ও শিশু বিকাশে অগ্রাধিকার।" : "Emphasis on early childhood development.", icon: <BookOpen size={28} /> },
                    { id: 5, title: language === "bn" ? "জেন্ডার সমতা" : "Gender Equality", color: "bg-[#FF3A21]", desc: language === "bn" ? "প্রান্তিক নারীদের আত্মনির্ভরশীলতা।" : "Empowering marginalized women populations.", icon: <Scale size={28} /> },
                    { id: 6, title: language === "bn" ? "নিরাপদ পানি" : "Clean Water", color: "bg-[#26BDE2]", desc: language === "bn" ? "বাংলাদেশে সিএলটিএস স্যানিটেশনের অগ্রদূত।" : "Pioneers of the CLTS approach in Bangladesh.", icon: <Droplets size={28} /> },
                    { id: 7, title: language === "bn" ? "সাশ্রয়ী জ্বালানি" : "Clean Energy", color: "bg-[#FCC30B]", desc: language === "bn" ? "১৯৮৭ সাল থেকে বন্ধন চুলা কর্মসূচি।" : "Improved Cook Stove (ICS) program since 1987.", icon: <Sun size={28} /> },
                    { id: 8, title: language === "bn" ? "উপযুক্ত কাজ" : "Decent Work", color: "bg-[#A21942]", desc: language === "bn" ? "ক্ষুদ্র উদ্যোগ ও আয় বৃদ্ধি।" : "Micro-enterprise and income generation.", icon: <TrendingUp size={28} /> },
                    { id: 10, title: language === "bn" ? "বৈষম্য হ্রাস" : "Reduced Inequality", color: "bg-[#DD1367]", desc: language === "bn" ? "প্রান্তিক জনগোষ্ঠীর অধিকার সুরক্ষা।" : "Focus on justice for marginalized populations.", icon: <Target size={28} /> },
                    { id: 13, title: language === "bn" ? "জলবায়ু কার্যক্রম" : "Climate Action", color: "bg-[#3F7E44]", desc: language === "bn" ? "জলবায়ু অভিযোজন ও দুর্যোগ ব্যবস্থাপনা।" : "Adaptation and disaster preparedness.", icon: <Globe size={28} /> },
                    { id: 17, title: language === "bn" ? "লক্ষ্য অর্জনে অংশীদারিত্ব" : "Partnerships", color: "bg-[#19486A]", desc: language === "bn" ? "বিশ্বব্যাংক, পিকেএসএফ, ওয়াটারএইডের সাথে কাজ।" : "Collaboration with World Bank, PKSF, WaterAid.", icon: <Handshake size={28} /> },
                ].map((sdg, i) => (
                    <motion.div
                        key={sdg.id}
                        {...fadeIn}
                        transition={{ delay: i * 0.05 }}
                        className="group relative w-[calc(50%-1rem)] md:w-[calc(33.33%-1rem)] lg:w-[calc(20%-1rem)] xl:w-[calc(16.66%-1rem)] max-w-[200px] aspect-square"
                    >
                        <div className={`${sdg.color} p-5 h-full rounded-[32px] text-white transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl overflow-hidden flex flex-col justify-between`}>
                            <div className="absolute top-0 right-0 p-3 opacity-10 scale-150 transform translate-x-4 -translate-y-4 font-black text-6xl">
                                {sdg.id}
                            </div>
                            <div className="relative z-10">
                                <div className="text-2xl font-black mb-1 leading-none">{sdg.id}</div>
                                <div className="mb-2 opacity-90 group-hover:opacity-100 transition-opacity">
                                    {sdg.icon}
                                </div>
                                <h4 className="text-[11px] font-black uppercase tracking-tight leading-tight">{sdg.title}</h4>
                            </div>
                            <p className="relative z-10 text-[10px] font-medium opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 leading-snug">
                                {sdg.desc}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* 5. GLOBAL COLLABORATIONS */}
      <section className="py-32 bg-white">
        <div className="container-custom">
            <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                <div className="flex-1 space-y-8">
                    <div className="flex items-center gap-3 text-brand-primary">
                        <Globe size={24} />
                        <h2 className="font-black uppercase tracking-widest text-xs">{t("global_badge")}</h2>
                    </div>
                    <h3 className={`text-4xl lg:text-7xl font-black text-gray-900 ${language === "bn" ? "leading-[1.25] tracking-normal" : "leading-[1.05] tracking-tighter"}`}>
                        {t("global_title")} <br/> <span className="text-brand-primary">{t("global_highlight")}</span>
                    </h3>
                    <p className="text-lg lg:text-xl text-gray-600 font-medium leading-relaxed">
                        {t("global_subtitle")}
                    </p>
                    <div className="pt-4">
                        <Link href="/partners" className="btn-primary px-10 py-5 rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all inline-block">
                            {t("global_btn")}
                        </Link>
                    </div>
                </div>
                <div className="flex-1 relative h-[500px] lg:h-[560px] w-full rounded-[48px] overflow-hidden shadow-2xl group">
                    <img 
                        src="/assets/home_official_1.jpg" 
                        alt="VERC Field Operation" 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                    />
                    <div className="absolute bottom-8 left-8 right-8 p-6 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 text-white">
                        <p className="text-[10px] font-black uppercase tracking-widest mb-2 text-brand-secondary">{t("spotlight_badge")}</p>
                        <h5 className="text-base lg:text-lg font-bold">{t("spotlight_title")}</h5>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* 6. SUCCESS STORY */}
      <section className="py-32 relative bg-gray-50">
        <div className="container-custom">
            <div className="bg-white rounded-[56px] overflow-hidden shadow-2xl flex flex-col lg:flex-row items-stretch border border-gray-100">
                <div className="flex-1 relative h-[360px] lg:h-auto min-h-[380px]">
                    <img 
                        src="/assets/community_success_hero.png" 
                        alt="Community Success" 
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="flex-1 p-10 lg:p-20 space-y-8">
                    <div className="flex items-center gap-3 text-brand-secondary">
                        <Heart size={20} />
                        <h4 className="font-black uppercase tracking-widest text-xs">{t("success_badge")}</h4>
                    </div>
                    <h3 className={`text-3xl lg:text-6xl font-black text-gray-900 ${language === "bn" ? "leading-[1.25] tracking-normal" : "leading-tight tracking-tighter"}`}>
                      {t("success_title")} <br/> {t("success_highlight")}
                    </h3>
                    <p className="text-lg lg:text-xl text-gray-600 leading-relaxed font-medium italic">
                        {t("success_quote")}
                    </p>
                    <div className="pt-4">
                        <Link href="/impact" className="btn-primary px-10 py-5 rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all inline-block">
                            {t("success_btn")}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* 7. CALL TO ACTION */}
      <section className="py-32 bg-brand-primary text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 blur-[150px] -mr-40 mt-20"></div>
        <div className="container-custom text-center relative z-10">
            <motion.div {...fadeIn} className="max-w-4xl mx-auto space-y-10">
                <h3 className={`text-5xl lg:text-8xl font-black mb-10 ${language === "bn" ? "leading-[1.2] tracking-normal py-2" : "leading-[0.95] tracking-tighter"}`}>
                  {t("cta_title")} <br/> <span className="text-brand-secondary">{t("cta_highlight")}</span>
                </h3>
                <p className="text-xl lg:text-2xl text-gray-200 font-medium max-w-3xl mx-auto leading-relaxed">
                    {t("cta_subtitle")}
                </p>
                <div className="flex flex-wrap justify-center gap-5 pt-8">
                    <Link href="/donate" className="px-10 py-5 bg-white text-brand-primary text-lg font-black rounded-2xl shadow-2xl hover:scale-105 active:scale-95 transition-all inline-block">
                        {t("cta_btn_donate")}
                    </Link>
                    <Link href="/contact" className="px-10 py-5 bg-transparent border-2 border-white/20 text-white text-lg font-bold rounded-2xl hover:bg-white/10 transition-all inline-block">
                        {t("cta_btn_partner")}
                    </Link>
                </div>
            </motion.div>
        </div>
      </section>
    </div>
  );
}
