"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, Target, Heart, Globe, 
  Droplets, BookOpen, Users, Zap, HeartPulse, Scale, 
  TrendingUp, Handshake, Sun 
} from "lucide-react";
import { useContent } from "@/context/ContentContext";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const { heroSlides, impactStats, programs } = useContent();
  const { language, t } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (heroSlides.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const activeSlide = heroSlides[currentSlide] || heroSlides[0];
  const primaryStats = impactStats.slice(0, 4);

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  };

  // Helper for dynamic slide title/subtitle depending on current language
  const getSlideTitle = (idx: number) => {
    if (idx === 0) return { title: t("hero_title_1"), highlight: t("hero_highlight_1"), subtitle: t("hero_subtitle_1"), btnPrimary: t("hero_btn_primary_1"), btnSecondary: t("hero_btn_secondary_1") };
    if (idx === 1) return { title: t("hero_title_2"), highlight: t("hero_highlight_2"), subtitle: t("hero_subtitle_2"), btnPrimary: t("hero_btn_primary_2"), btnSecondary: t("hero_btn_secondary_2") };
    return { title: t("hero_title_3"), highlight: t("hero_highlight_3"), subtitle: t("hero_subtitle_3"), btnPrimary: t("hero_btn_primary_3"), btnSecondary: t("hero_btn_secondary_3") };
  };

  const currentSlideText = getSlideTitle(currentSlide);

  // Helper for bilingual stat labels
  const getStatLabel = (key: string, defaultLabel: string) => {
    if (key === "lives") return t("stat_lives_label");
    if (key === "districts") return t("stat_districts_label");
    if (key === "leaders") return t("stat_leaders_label");
    if (key === "legacy") return t("stat_legacy_label");
    return defaultLabel;
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
      <section className="relative min-h-screen flex items-center pt-32 overflow-hidden bg-gray-900">
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            {activeSlide && (
              <motion.div
                key={activeSlide.id || currentSlide}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 0.7, scale: 1.05 }}
                exit={{ opacity: 0, scale: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <img 
                  src={activeSlide.imageUrl} 
                  alt={activeSlide.title} 
                  className="w-full h-full object-cover"
                />
              </motion.div>
            )}
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-900/40 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-900/80"></div>
          
          {/* Slide Indicators */}
          <div className="absolute bottom-12 right-12 z-30 flex gap-3">
            {heroSlides.map((_, i) => (
              <button
                key={i} 
                onClick={() => setCurrentSlide(i)}
                className={`h-1.5 transition-all duration-500 rounded-full ${i === currentSlide ? "w-10 bg-brand-secondary" : "w-2 bg-white/20"}`}
              />
            ))}
          </div>
        </div>
        
        <div className="container-custom relative z-20 text-white text-center">
          <div className="max-w-4xl mx-auto">
            {activeSlide && (
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className={`text-5xl lg:text-8xl font-black select-none caret-transparent ${language === "bn" ? "leading-[1.3] tracking-normal py-2 mb-6" : "leading-[0.95] tracking-tighter mb-8"}`}>
                  {currentSlideText.title} <br/> <span className="text-brand-secondary">{currentSlideText.highlight}</span>
                </h1>
                <p className="text-lg lg:text-2xl text-gray-300 mb-10 leading-relaxed font-medium max-w-3xl mx-auto">
                  {currentSlideText.subtitle}
                </p>
                <div className="flex flex-wrap justify-center gap-5">
                  <Link href={activeSlide.primaryBtnLink || "/about"} className="px-8 py-4 bg-white text-gray-900 font-black rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-2xl flex items-center gap-3">
                    {currentSlideText.btnPrimary} <ArrowRight size={20} />
                  </Link>
                  <Link href={activeSlide.secondaryBtnLink || "/contact"} className="px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 font-bold rounded-2xl hover:bg-white/20 transition-all">
                    {currentSlideText.btnSecondary}
                  </Link>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* 2. IMPACT STATS SECTION */}
      <section className="relative z-30 -mt-16">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
            {primaryStats.map((stat, i) => (
              <motion.div 
                key={stat.id}
                {...fadeIn}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 lg:p-10 rounded-[40px] shadow-[0_30px_60px_rgba(0,0,0,0.06)] border border-gray-50 flex flex-col items-center text-center group hover:-translate-y-2 transition-all duration-500"
              >
                <div className="w-12 h-12 bg-brand-light rounded-xl flex items-center justify-center text-brand-primary mb-6 group-hover:bg-brand-primary group-hover:text-white transition-all">
                  <TrendingUp size={20} />
                </div>
                <div className="text-4xl lg:text-5xl font-black text-gray-900 mb-2">{stat.value}</div>
                <div className="text-[11px] font-black uppercase tracking-widest text-gray-500">
                  {getStatLabel(stat.key, stat.label)}
                </div>
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
              return (
                <motion.div 
                  key={item.id} 
                  {...fadeIn}
                  transition={{ delay: i * 0.1 }}
                  className={`${item.color || "bg-blue-50"} p-8 lg:p-10 rounded-[40px] border border-transparent hover:border-gray-200 hover:bg-white hover:shadow-2xl transition-all duration-500 group flex flex-col h-full`}
                >
                  <div className="mb-8 w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform overflow-hidden">
                    <img src={item.imageUrl} alt={progInfo.title} className="w-full h-full object-cover" />
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
                <div className="flex-1 relative h-[360px] lg:h-auto">
                    <img 
                        src="/assets/microfinance_woman_hero.png" 
                        alt="Community Success" 
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-900/40 to-transparent"></div>
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
