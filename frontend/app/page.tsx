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
  const requestedHeroImage = currentSlide === 0
    ? "/assets/homepage-child-monochrome.webp"
    : activeSlide?.imageUrl || "/assets/home_official_1.jpg";
  const fallbackHeroImage = requestedHeroImage.startsWith("/photos/") ? "/assets/community_success_hero.png" : "/assets/home_official_1.jpg";
  const heroImage = failedHeroImages.has(requestedHeroImage) || requestedHeroImage.startsWith("/photos/") ? fallbackHeroImage : requestedHeroImage;
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
          className="relative min-h-[85vh] lg:min-h-[92vh] flex items-center pt-48 sm:pt-56 lg:pt-64 pb-16 sm:pb-20 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"
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
                    alt={currentSlide === 0 ? "A smiling Bangladeshi girl with arms raised in the VERC emblem pose, in black and white" : activeSlide.title || "VERC Bangladesh"}
                    fetchPriority={currentSlide === 0 ? "high" : "auto"}
                    decoding="async"
                    className={`w-full h-full object-cover ${currentSlide === 0 ? "max-sm:h-[82%] max-sm:object-top" : ""}`}
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
          
          {/* Main Slide Content - Positioned downwards to fill bottom space and uncover faces */}
          <div className="container-custom relative z-20 text-white text-center mt-14 sm:mt-20 lg:mt-28 mb-3 sm:mb-5">
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
      ) : null}

      {/* 2. IMPACT STATS SECTION - CLASSY POLYMORPHIC GLASS DESIGN (Positioned downward) */}
      <section className={`relative z-30 ${isBannerGloballyEnabled && activeHeroSlides.length > 0 ? "-mt-4 sm:-mt-6 lg:-mt-8" : "pt-28 sm:pt-32"} pb-6`}>
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
      <section id="program-pillars" aria-labelledby="program-pillars-title" className="bg-slate-50/60 py-16 sm:py-20 lg:py-24 dark:bg-slate-950">
        <div className="container-custom">
          <div className="mb-9 grid gap-5 sm:mb-12 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-16">
            <div>
              <div className="mb-4 inline-flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.2em] text-brand-primary dark:text-sky-300">
                <Target size={16} strokeWidth={2} />
                <span>{t("focus_badge")}</span>
              </div>
              <h2 id="program-pillars-title" className={`text-3xl font-extrabold text-slate-900 sm:text-5xl lg:text-[3.4rem] dark:text-white ${language === "bn" ? "leading-[1.25]" : "leading-[1.08] tracking-tight"}`}>
                {t("focus_title")}<br />
                <span className="text-brand-primary dark:text-sky-300">{t("focus_highlight")}</span>
              </h2>
            </div>
            <p className="max-w-lg text-sm leading-7 text-slate-600 sm:text-base lg:mb-1 lg:border-l-2 lg:border-sky-100 lg:pl-6 dark:border-slate-800 dark:text-slate-400">{t("focus_subtitle")}</p>
          </div>

          <div className="grid auto-rows-fr grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4 xl:gap-6">
            {programs.slice(0, 4).map((item, i) => {
              const progInfo = getProgramInfo(i, item.title, item.description);
              const styles = [
                { icon: GraduationCap, href: "/programs/education", color: "#0069A6" },
                { icon: Droplets, href: "/programs/wash", color: "#007D70" },
                { icon: TrendingUp, href: "/programs/livelihood", color: "#BF1948" },
                { icon: Target, href: "/programs/capacity", color: "#9D6509" },
              ];
              const cfg = styles[i];
              const Icon = cfg.icon;
              const number = String(i + 1).padStart(2, "0");
              return (
                <Link key={item.id} href={cfg.href} aria-labelledby={`pillar-title-${item.id}`}
                  style={{ backgroundColor: cfg.color }}
                  className="group relative isolate flex h-full min-w-0 flex-col overflow-hidden rounded-[30px] border border-white/20 p-7 text-white shadow-[0_12px_28px_-16px_rgba(15,23,42,0.5)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_40px_-18px_rgba(15,23,42,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-4 motion-reduce:transform-none motion-reduce:transition-none sm:p-7">
                  <span aria-hidden="true" className="pointer-events-none absolute -right-2 -top-6 -z-10 select-none text-[142px] font-black leading-none tracking-[-0.09em] text-white/[0.09]">{number}</span>
                  <div className="mb-5 flex items-center justify-between gap-4">
                    <span aria-hidden="true" className="text-3xl font-extrabold leading-none tracking-tight">{number}</span>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/15 px-2.5 py-1 text-[10px] font-bold tracking-wide"><span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-emerald-300" />VERC</span>
                  </div>
                  <h3 id={`pillar-title-${item.id}`} className="relative text-xl font-extrabold leading-snug tracking-tight sm:min-h-[3.5rem]">{progInfo.title}</h3>
                  <div aria-hidden="true" className="flex h-28 shrink-0 items-center justify-center sm:h-32">
                    <Icon size={64} strokeWidth={1.5} className="drop-shadow-sm transition-transform duration-300 group-hover:scale-110 motion-reduce:transform-none motion-reduce:transition-none" />
                  </div>
                  <p className="mb-6 text-[13px] leading-[1.75] text-white/90">{progInfo.desc}</p>
                  <div className="mt-auto flex min-h-12 items-center justify-between gap-3 border-t border-white/25 pt-4 text-xs font-bold">
                    <span>{t("explore_program")}</span>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/20 transition-colors duration-200 group-hover:bg-white group-hover:text-slate-900 motion-reduce:transition-none"><ArrowRight size={16} aria-hidden="true" /></span>
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

      {/* 7. CALL TO ACTION */}
      <CtaSection />
    </div>
  );
}
