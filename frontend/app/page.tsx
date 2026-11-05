"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, Target, Heart, Globe, 
  Droplets, BookOpen, Users, Zap, HeartPulse, Scale, 
  TrendingUp, Handshake, Sun, ChevronLeft, ChevronRight, Sparkles, HeartHandshake,
  GraduationCap
} from "lucide-react";
import { useContent } from "@/context/ContentContext";
import { useLanguage } from "@/context/LanguageContext";
import AnimatedCounter from "@/components/AnimatedCounter";
import SdgSection from "@/components/SdgSection";
import GlobalCollaborationsSection from "@/components/GlobalCollaborationsSection";
import SuccessStorySection from "@/components/SuccessStorySection";
import BangladeshOfficeMapSection from "@/components/BangladeshOfficeMapSection";
import CtaSection from "@/components/CtaSection";

export default function Home() {
  const { heroSlides, impactStats, programs, siteSettings, primaryColor } = useContent();
  const { language, t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [failedHeroImages, setFailedHeroImages] = useState<Set<string>>(() => new Set());

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
  const requestedHeroImage = activeSlide?.imageUrl?.trim() || "/assets/home_official_1.jpg";
  const fallbackHeroImage = "/assets/home_official_1.jpg";
  const heroImage = failedHeroImages.has(requestedHeroImage) ? fallbackHeroImage : requestedHeroImage;
  const primaryStats = impactStats.slice(0, 4);

  const normalizeHref = (href?: string, fallback = "/about") => {
    const val = (href || "").trim();
    if (!val) return fallback;
    if (
      val.startsWith("/") ||
      val.startsWith("#") ||
      val.startsWith("http://") ||
      val.startsWith("https://") ||
      val.startsWith("mailto:") ||
      val.startsWith("tel:")
    ) {
      return val;
    }
    return `/${val}`;
  };

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

  // Helper for bilingual stat labels (uses CMS label in English, translation dictionary in Bangla)
  const getStatLabel = (key: string, defaultLabel: string) => {
    if (language === "bn") {
      if (key === "lives") return t("stat_lives_label");
      if (key === "districts") return t("stat_districts_label");
      if (key === "leaders") return t("stat_leaders_label");
      if (key === "legacy") return t("stat_legacy_label");
    }
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

  // Helper for bilingual program details (uses CMS title/description in English, translation dictionary in Bangla)
  const getProgramInfo = (index: number, defaultTitle: string, defaultDesc: string) => {
    if (language === "bn") {
      if (index === 0) return { title: t("prog_edu_title"), desc: t("prog_edu_desc") };
      if (index === 1) return { title: t("prog_wash_title"), desc: t("prog_wash_desc") };
      if (index === 2) return { title: t("prog_live_title"), desc: t("prog_live_desc") };
      if (index === 3) return { title: t("prog_cap_title"), desc: t("prog_cap_desc") };
    }
    return { title: defaultTitle, desc: defaultDesc };
  };

  return (
    <div className="flex flex-col liquid-glass-mesh-bg overflow-x-hidden">
      {/* 1. HERO SECTION */}
      {isBannerGloballyEnabled && activeHeroSlides.length > 0 ? (
        <section 
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative min-h-[82vh] lg:min-h-[90vh] flex items-end pt-44 sm:pt-52 lg:pt-60 pb-14 sm:pb-16 lg:pb-20 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"
        >
          {/* Ambient Decorative Lighting */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />

          {/* Background Slides with Ken-Burns Motion (No wait blackout, smooth crossfade) */}
          <div className="absolute inset-0 z-0">
            <AnimatePresence>
              {activeSlide && (
                <motion.div
                  key={activeSlide.id || currentSlide}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 0.95, scale: 1.02 }}
                  exit={{ opacity: 0, scale: 1.0 }}
                  transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
                  className="absolute inset-0"
                >
                  <img 
                    src={heroImage}
                    alt={activeSlide.title || "VERC Bangladesh"} 
                    fetchPriority={currentSlide === 0 ? "high" : "auto"}
                    decoding="async"
                    className="w-full h-full object-cover object-center"
                    onError={() => {
                      if (requestedHeroImage !== fallbackHeroImage) {
                        setFailedHeroImages(images => new Set(images).add(requestedHeroImage));
                      }
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Soft, light shade for high banner visibility with excellent text contrast */}
            <div className="absolute inset-0 bg-slate-950/20" />
            <div className="absolute inset-x-0 bottom-0 h-64 sm:h-72 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />
          </div>

          {/* Desktop Left/Right Navigation Arrows */}
          {activeHeroSlides.length > 1 && (
            <>
              <button 
                type="button"
                onClick={() => setCurrentSlide((prev) => (prev - 1 + activeHeroSlides.length) % activeHeroSlides.length)}
                className="hidden lg:flex absolute left-8 top-[56%] -translate-y-1/2 z-30 w-12 h-12 items-center justify-center rounded-2xl bg-slate-900/50 hover:bg-slate-900/90 text-white/70 hover:text-white backdrop-blur-xl border border-white/10 hover:border-white/30 transition-all hover:scale-105 active:scale-95 shadow-2xl cursor-pointer"
                aria-label="Previous slide"
              >
                <ChevronLeft size={22} />
              </button>
              <button 
                type="button"
                onClick={() => setCurrentSlide((prev) => (prev + 1) % activeHeroSlides.length)}
                className="hidden lg:flex absolute right-8 top-[56%] -translate-y-1/2 z-30 w-12 h-12 items-center justify-center rounded-2xl bg-slate-900/50 hover:bg-slate-900/90 text-white/70 hover:text-white backdrop-blur-xl border border-white/10 hover:border-white/30 transition-all hover:scale-105 active:scale-95 shadow-2xl cursor-pointer"
                aria-label="Next slide"
              >
                <ChevronRight size={22} />
              </button>
            </>
          )}

          {/* Floating Slide Indicator & Counter Pill */}
          {activeHeroSlides.length > 1 && (
            <div className="absolute bottom-6 right-6 sm:right-12 z-30 flex items-center gap-3 bg-slate-950/70 backdrop-blur-xl px-4 py-2 rounded-full border border-white/15 shadow-2xl">
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
          
          {/* Main Slide Content - Positioned lower in the hero banner so upper/mid photo faces stay clear */}
          <div className="container-custom relative z-30 text-white text-center mt-auto pt-16 sm:pt-24 lg:pt-32 pb-2">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
              <AnimatePresence mode="wait">
                {activeSlide && (
                  <motion.div
                    key={activeSlide.id || currentSlide}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
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
                    <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-5 relative z-40">
                      <Link 
                        href={normalizeHref(activeSlide.primaryBtnLink, "/about")} 
                        className="group relative inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-b from-white via-white to-sky-50 text-slate-950 font-bold border-t-2 border-l border-white border-b-[3px] border-b-sky-200/90 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.45),inset_0_2px_2px_rgba(255,255,255,1),inset_0_-2px_4px_rgba(14,165,233,0.15)] hover:shadow-[0_26px_50px_-8px_rgba(14,165,233,0.4),inset_0_2px_3px_rgba(255,255,255,1)] hover:-translate-y-0.5 hover:scale-[1.03] active:scale-[0.98] transition-all text-sm sm:text-base cursor-pointer"
                      >
                        <span>{currentSlideText.btnPrimary}</span>
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform text-brand-primary" />
                      </Link>
                      <Link 
                        href={normalizeHref(activeSlide.secondaryBtnLink, "/contact")} 
                        className="inline-flex items-center gap-2 px-8 py-4 bg-white/15 backdrop-blur-2xl backdrop-saturate-150 text-white border-t border-l border-white/45 border-r border-b-2 border-b-cyan-300/35 font-semibold rounded-2xl shadow-[0_18px_36px_-8px_rgba(0,0,0,0.4),inset_0_1.5px_2px_rgba(255,255,255,0.45),inset_0_-2px_4px_rgba(0,174,239,0.2)] hover:bg-white/25 hover:border-white/60 hover:-translate-y-0.5 hover:scale-[1.03] active:scale-[0.98] transition-all text-sm sm:text-base cursor-pointer"
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
      ) : null}

      {/* 2. IMPACT STATS SECTION - CLASSY POLYMORPHIC GLASS DESIGN (Positioned cleanly below Hero) */}
      <section className={`relative z-20 ${isBannerGloballyEnabled && activeHeroSlides.length > 0 ? "mt-6 sm:mt-8 lg:mt-10" : "pt-28 sm:pt-32"} pb-6`}>
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
                className="liquid-glass-3d liquid-glass-3d-interactive relative group rounded-[32px] sm:rounded-[36px] p-6 sm:p-8 lg:p-9 flex flex-col items-center text-center overflow-hidden cursor-pointer"
              >
                {/* Polymorphic Corner Light Flares */}
                <div 
                  style={{ backgroundColor: `${primaryColor || "#004B8D"}22` }}
                  className="absolute -top-12 -right-12 w-32 h-32 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 pointer-events-none" 
                />
                <div className="absolute -bottom-10 -left-10 w-28 h-28 rounded-full bg-cyan-400/20 blur-xl group-hover:scale-125 transition-transform duration-700 pointer-events-none" />

                {/* Top Specular 3D Prism Highlight Bar */}
                <div className="absolute inset-x-6 top-0 h-[3px] rounded-b-full bg-gradient-to-r from-transparent via-sky-400/80 to-transparent opacity-85 group-hover:via-cyan-400 group-hover:opacity-100 transition-all duration-500" />

                {/* 3D Jewel-like Frosted Glass Icon Badge */}
                <div className="relative mb-5 z-10">
                  <div 
                    className="w-14 h-14 sm:w-15 sm:h-15 rounded-2xl bg-gradient-to-br from-white via-sky-50/90 to-sky-100/80 dark:from-white/15 dark:to-white/5 border-t-2 border-l-2 border-white border-r border-b-[3px] border-r-sky-200/70 border-b-sky-300/80 shadow-[0_14px_28px_-6px_rgba(0,75,141,0.18),inset_0_2px_2px_rgba(255,255,255,1),inset_0_-2px_4px_rgba(0,75,141,0.1)] flex items-center justify-center text-brand-primary group-hover:scale-110 group-hover:-translate-y-0.5 group-hover:text-white transition-all duration-500 relative overflow-hidden"
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
                <div className="relative z-10 text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white mb-2 group-hover:text-brand-primary dark:group-hover:text-cyan-300 transition-colors duration-300 drop-shadow-[0_1px_1px_rgba(255,255,255,0.9)]">
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
                  className="w-10 h-1.5 rounded-full opacity-45 group-hover:opacity-100 group-hover:w-20 transition-all duration-500 mt-4 shadow-sm"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. PROGRAM PILLARS — 3D LIQUID FROSTED GLASS POLYMORPHIC DESIGN */}
      <section id="program-pillars" aria-labelledby="program-pillars-title" className="relative overflow-hidden bg-gradient-to-b from-sky-100/55 via-slate-100/70 to-sky-50/45 py-16 sm:py-22 lg:py-28 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        {/* Subtle Architectural Dot Pattern + Ambient 3D Liquid Glass Color Orbs Behind Frosted Cards */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.45]"
          style={{
            backgroundImage: "radial-gradient(#0284c7 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
          aria-hidden="true"
        />
        <div className="pointer-events-none absolute -top-16 left-[12%] h-80 w-80 rounded-full bg-sky-400/25 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute top-1/3 left-[38%] h-80 w-80 rounded-full bg-emerald-400/20 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute bottom-10 right-[28%] h-80 w-80 rounded-full bg-rose-400/18 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-16 right-[6%] h-80 w-80 rounded-full bg-amber-400/22 blur-3xl" aria-hidden="true" />

        <div className="container-custom relative z-10">
          <div className="mb-10 grid gap-5 sm:mb-14 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-16">
            <div>
              <div className="liquid-glass-pill-3d mb-4 inline-flex items-center gap-2.5 rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-brand-primary dark:text-sky-300">
                <Target size={15} strokeWidth={2.2} />
                <span>{t("focus_badge")}</span>
              </div>
              <h2 id="program-pillars-title" className={`text-3xl font-extrabold text-slate-900 sm:text-5xl lg:text-[3.4rem] dark:text-white ${language === "bn" ? "leading-[1.25]" : "leading-[1.08] tracking-tight"}`}>
                {t("focus_title")}<br />
                <span className="bg-gradient-to-r from-[#004B8D] via-sky-600 to-cyan-500 bg-clip-text text-transparent dark:from-sky-300 dark:to-cyan-300">{t("focus_highlight")}</span>
              </h2>
            </div>
            <div className="liquid-glass-3d rounded-2xl px-5 py-4 lg:mb-1">
              <p className="text-sm leading-7 text-slate-600 sm:text-base dark:text-slate-300">{t("focus_subtitle")}</p>
            </div>
          </div>

          <div className="grid auto-rows-fr grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4 xl:gap-7">
            {programs.filter((p) => p.status !== "Draft").slice(0, 4).map((item, i) => {
              const progInfo = getProgramInfo(i, item.title, item.description);
              const styles = [
                {
                  icon: GraduationCap,
                  href: "/programs/education",
                  tint: "from-white via-sky-50/95 to-sky-100/90 text-sky-700 border-t-white border-l-white border-r-sky-200/80 border-b-sky-300/90 shadow-[0_14px_28px_-6px_rgba(2,132,199,0.28),inset_0_2px_2px_rgba(255,255,255,1),inset_0_-2px_4px_rgba(2,132,199,0.18)] dark:from-sky-950/70 dark:to-sky-900/50 dark:text-sky-300",
                  top: "from-sky-400 via-cyan-400 to-sky-600",
                  orb: "bg-sky-400/25",
                  cardBottom: "border-b-sky-300/85 hover:border-b-sky-400",
                  ctaBg: "from-white/95 via-sky-50/85 to-sky-100/75 border-t-white border-l-white border-r-sky-200/70 border-b-sky-300/80 text-sky-800 group-hover:from-sky-600 group-hover:via-sky-600 group-hover:to-cyan-600 group-hover:text-white group-hover:border-sky-500",
                  arrow: "bg-sky-500/15 text-sky-700 group-hover:bg-white/20 group-hover:text-white",
                },
                {
                  icon: Droplets,
                  href: "/programs/wash",
                  tint: "from-white via-emerald-50/95 to-emerald-100/90 text-emerald-700 border-t-white border-l-white border-r-emerald-200/80 border-b-emerald-300/90 shadow-[0_14px_28px_-6px_rgba(5,150,105,0.26),inset_0_2px_2px_rgba(255,255,255,1),inset_0_-2px_4px_rgba(5,150,105,0.18)] dark:from-emerald-950/70 dark:to-emerald-900/50 dark:text-emerald-300",
                  top: "from-emerald-400 via-teal-400 to-emerald-600",
                  orb: "bg-emerald-400/25",
                  cardBottom: "border-b-emerald-300/85 hover:border-b-emerald-400",
                  ctaBg: "from-white/95 via-emerald-50/85 to-emerald-100/75 border-t-white border-l-white border-r-emerald-200/70 border-b-emerald-300/80 text-emerald-800 group-hover:from-emerald-600 group-hover:via-emerald-600 group-hover:to-teal-600 group-hover:text-white group-hover:border-emerald-500",
                  arrow: "bg-emerald-500/15 text-emerald-700 group-hover:bg-white/20 group-hover:text-white",
                },
                {
                  icon: TrendingUp,
                  href: "/programs/livelihood",
                  tint: "from-white via-rose-50/95 to-rose-100/90 text-rose-700 border-t-white border-l-white border-r-rose-200/80 border-b-rose-300/90 shadow-[0_14px_28px_-6px_rgba(225,29,72,0.24),inset_0_2px_2px_rgba(255,255,255,1),inset_0_-2px_4px_rgba(225,29,72,0.16)] dark:from-rose-950/70 dark:to-rose-900/50 dark:text-rose-300",
                  top: "from-rose-400 via-pink-400 to-rose-600",
                  orb: "bg-rose-400/25",
                  cardBottom: "border-b-rose-300/85 hover:border-b-rose-400",
                  ctaBg: "from-white/95 via-rose-50/85 to-rose-100/75 border-t-white border-l-white border-r-rose-200/70 border-b-rose-300/80 text-rose-800 group-hover:from-rose-600 group-hover:via-rose-600 group-hover:to-pink-600 group-hover:text-white group-hover:border-rose-500",
                  arrow: "bg-rose-500/15 text-rose-700 group-hover:bg-white/20 group-hover:text-white",
                },
                {
                  icon: Target,
                  href: "/programs/capacity",
                  tint: "from-white via-amber-50/95 to-amber-100/90 text-amber-700 border-t-white border-l-white border-r-amber-200/80 border-b-amber-300/90 shadow-[0_14px_28px_-6px_rgba(217,119,6,0.24),inset_0_2px_2px_rgba(255,255,255,1),inset_0_-2px_4px_rgba(217,119,6,0.16)] dark:from-amber-950/70 dark:to-amber-900/50 dark:text-amber-300",
                  top: "from-amber-400 via-orange-400 to-amber-500",
                  orb: "bg-amber-400/25",
                  cardBottom: "border-b-amber-300/85 hover:border-b-amber-400",
                  ctaBg: "from-white/95 via-amber-50/85 to-amber-100/75 border-t-white border-l-white border-r-amber-200/70 border-b-amber-300/80 text-amber-800 group-hover:from-amber-600 group-hover:via-amber-600 group-hover:to-orange-500 group-hover:text-white group-hover:border-amber-500",
                  arrow: "bg-amber-500/15 text-amber-700 group-hover:bg-white/20 group-hover:text-white",
                },
              ];
              const cfg = styles[i % styles.length];
              const slugMap: Record<string, string> = {
                education: "/programs/education",
                wash: "/programs/wash",
                livelihood: "/programs/livelihood",
                capacity: "/programs/capacity",
              };
              const resolvedHref = (item.slug && slugMap[item.slug]) || cfg.href;
              const Icon = cfg.icon;
              return (
                <Link
                  key={item.id}
                  href={resolvedHref}
                  aria-labelledby={`pillar-title-${item.id}`}
                  className={`liquid-glass-3d liquid-glass-3d-interactive group relative flex h-full min-w-0 flex-col overflow-hidden rounded-[34px] p-6 sm:p-7 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-4 ${cfg.cardBottom}`}
                >
                  {/* 3D Sculpted Top Specular Prism Bar */}
                  <div className={`absolute inset-x-0 top-0 h-[5px] bg-gradient-to-r ${cfg.top} shadow-sm`} aria-hidden="true" />

                  {/* Diagonal Glass Specular Reflection Overlay */}
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-white/70 to-transparent" aria-hidden="true" />

                  {/* Inner Liquid Glass Shimmer Sweep on Hover */}
                  <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/65 to-transparent transition-transform duration-1000 group-hover:translate-x-full" aria-hidden="true" />

                  {/* Polymorphic Corner Light Orbs */}
                  <div className={`pointer-events-none absolute -top-10 -right-10 h-36 w-36 rounded-full blur-2xl transition-transform duration-700 group-hover:scale-150 ${cfg.orb}`} aria-hidden="true" />
                  <div className={`pointer-events-none absolute -bottom-10 -left-10 h-32 w-32 rounded-full blur-2xl transition-transform duration-700 group-hover:scale-125 ${cfg.orb}`} aria-hidden="true" />

                  <div className="relative z-10 mb-6 flex items-center justify-between gap-4 pt-1">
                    {/* 3D Extruded Jewel Glass Icon Cube */}
                    <div className={`flex h-14 w-14 items-center justify-center rounded-2xl border-t-2 border-l-2 border-r border-b-[3px] bg-gradient-to-br transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-0.5 ${cfg.tint}`}>
                      <Icon size={26} strokeWidth={2.1} aria-hidden="true" />
                    </div>
                    {/* 3D Tactile Frosted Number Pill */}
                    <span className="liquid-glass-pill-3d rounded-full px-3.5 py-1 font-mono text-xs font-bold tabular-nums text-slate-500 dark:text-slate-300" aria-hidden="true">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 id={`pillar-title-${item.id}`} className="relative z-10 mb-3 text-xl font-extrabold leading-snug tracking-tight text-slate-900 sm:min-h-[3.5rem] dark:text-white">
                    {progInfo.title}
                  </h3>
                  <p className="relative z-10 mb-7 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {progInfo.desc}
                  </p>

                  {/* 3D Tactile Frosted Action Pill Footer */}
                  <div className={`relative z-10 mt-auto flex items-center justify-between gap-3 rounded-2xl border-t border-l border-r border-b-[2.5px] bg-gradient-to-r px-4 py-3 text-xs font-bold shadow-[0_10px_20px_-6px_rgba(0,75,141,0.12),inset_0_1.5px_2px_rgba(255,255,255,0.95)] transition-all duration-300 ${cfg.ctaBg}`}>
                    <span className="tracking-wide">{t("explore_program")}</span>
                    <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl transition-all duration-300 group-hover:translate-x-0.5 ${cfg.arrow}`}>
                      <ArrowRight size={16} aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. GLOBAL AGENDA 2030 (SDGs) */}
      <SdgSection />

      {/* 5. GLOBAL COLLABORATIONS */}
      <GlobalCollaborationsSection />

      {/* 6. SUCCESS STORY */}
      <SuccessStorySection />

      {/* 7. BANGLADESH OFFICE NETWORK MAP */}
      <BangladeshOfficeMapSection />

      {/* 8. CALL TO ACTION */}
      <CtaSection />
    </div>
  );
}
