"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Heart, Sparkles, ArrowRight, ChevronLeft, ChevronRight,
  CheckCircle2, Quote, Award, Users, TrendingUp, ShieldCheck,
  MapPin, BookOpen, ExternalLink
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface ImpactStory {
  id: string;
  tabShortEn: string;
  tabShortBn: string;
  tabMobileEn: string;
  tabMobileBn: string;
  pillEn: string;
  pillBn: string;
  programEn: string;
  programBn: string;
  locationEn: string;
  locationBn: string;
  titleEn: string;
  titleBn: string;
  quoteEn: string;
  quoteBn: string;
  personNameEn: string;
  personNameBn: string;
  personRoleEn: string;
  personRoleBn: string;
  personCommunityEn: string;
  personCommunityBn: string;
  image: string;
  metrics: {
    value: string;
    labelEn: string;
    labelBn: string;
    icon: React.ComponentType<{ className?: string }>;
  }[];
}

const STORIES: ImpactStory[] = [
  {
    id: "youth-empowerment",
    tabShortEn: "Youth Leadership",
    tabShortBn: "যুব নেতৃত্ব",
    tabMobileEn: "Youth",
    tabMobileBn: "যুব",
    pillEn: "Youth Leadership & Child Protection",
    pillBn: "যুব সামাজিক আন্দোলন ও শিশু সুরক্ষা",
    programEn: "Adolescent Life Skills & Child Rights Forum",
    programBn: "কৈশোরকালীন জীবনদক্ষতা ও শিশু অধিকার ফোরাম",
    locationEn: "Dimla, Nilphamari",
    locationBn: "ডিমলা, নীলফামারী",
    titleEn: "Empowering Future Generations.",
    titleBn: "ভবিষ্যৎ প্রজন্মকে ক্ষমতায়ন।",
    quoteEn: "Before our adolescent forum was formed, early marriage seemed inevitable for many of us. VERC gave us legal rights training, education stipends, and collective courage. Today, our union stands proudly declared 100% child-marriage free, and every girl in our cohort is thriving in secondary education.",
    quoteBn: "কিশোরী ক্লাব গড়ে ওঠার আগে আমাদের অনেকের ভবিষ্যৎ ছিল অনিশ্চিত। ভার্ক আমাদের আইনি অধিকার সচেতন করেছে, শিক্ষাবৃত্তি দিয়েছে এবং একত্রিত হয়ে কথা বলার সাহস জুগিয়েছে। আজ আমাদের পুরো ইউনিয়ন বাল্যবিয়েমুক্ত এবং প্রতিটি মেয়ে গর্বের সাথে লেখাপড়া চালিয়ে যাচ্ছে।",
    personNameEn: "Mst. Farhana Akter",
    personNameBn: "মোসাঃ ফারহানা আক্তার",
    personRoleEn: "Youth Forum President",
    personRoleBn: "সভাপতি, কিশোরী যুব ফোরাম",
    personCommunityEn: "Shwapner Shiri Adolescent Federation",
    personCommunityBn: "স্বপ্নের সিঁড়ি কিশোরী ফেডারেশন",
    image: "/assets/community_success_hero.png",
    metrics: [
      {
        value: "14,200+",
        labelEn: "Girls in School",
        labelBn: "শিক্ষায় সহায়তাপ্রাপ্ত কিশোরী",
        icon: Users
      },
      {
        value: "100%",
        labelEn: "Child Marriage-Free Unions",
        labelBn: "বাল্যবিয়ে মুক্ত এলাকা",
        icon: ShieldCheck
      },
      {
        value: "98.6%",
        labelEn: "SSC Exam Pass Rate",
        labelBn: "এসএসসি পাসের হার",
        icon: Award
      }
    ]
  },
  {
    id: "clean-water-clts",
    tabShortEn: "Safe Water (CLTS)",
    tabShortBn: "নিরাপদ পানি (CLTS)",
    tabMobileEn: "Water",
    tabMobileBn: "পানি",
    pillEn: "Community Health & Water Revolution",
    pillBn: "জনস্বাস্থ্য ও স্যানিটেশন বিপ্লব",
    programEn: "Community-Led Total Sanitation (CLTS) & Piped WASH",
    programBn: "কমিউনিটি পরিচালিত স্যানিটেশন (CLTS) ও নিরাপদ পানি",
    locationEn: "Godagari, Rajshahi",
    locationBn: "গোদাগাড়ী, রাজশাহী",
    titleEn: "Safe Water in Every Homestead.",
    titleBn: "প্রতিটি ঘরে নিরাপদ পানির নিশ্চয়তা।",
    quoteEn: "For decades our women walked kilometers carrying heavy pitchers of murky, arsenic-tainted water. VERC's community-managed piped water supply brought clean, tested tap water straight into our courtyards. Our children haven't lost a single school day to waterborne illness in three years.",
    quoteBn: "বছরের পর বছর আমাদের নারীদের মাইলের পর মাইল হেঁটে আর্সেনিকযুক্ত ঘোলা পানি সংগ্রহ করতে হতো। ভার্কের কমিউনিটি পরিচালিত পাইপলাইন ওয়াটার নেটওয়ার্ক আমাদের উঠানে নিরাপদ পানি পৌঁছে দিয়েছে। গত তিন বছরে আমাদের শিশুদের কোনো পানিবাহিত রোগ হয়নি।",
    personNameEn: "Rasheda Begum",
    personNameBn: "রাশেদা বেগম",
    personRoleEn: "Water Committee Chairwoman",
    personRoleBn: "সভানেত্রী, গ্রাম পানি ব্যবস্থাপনা কমিটি",
    personCommunityEn: "Piped WASH Users Alliance",
    personCommunityBn: "পাইপড ওয়াশ সমবায় সমিতি",
    image: "/assets/wash_clean_water.jpg",
    metrics: [
      {
        value: "2.1M+",
        labelEn: "Safe Water Access",
        labelBn: "নিরাপদ পানির সুবিধাভোগী",
        icon: Users
      },
      {
        value: "60+",
        labelEn: "Countries Adopted CLTS",
        labelBn: "সিএলটিএস গ্রহণকারী দেশ",
        icon: Award
      },
      {
        value: "0%",
        labelEn: "Waterborne Illness Rate",
        labelBn: "পানিবাহিত রোগের হার শূন্য",
        icon: ShieldCheck
      }
    ]
  },
  {
    id: "women-entrepreneurs",
    tabShortEn: "Women Enterprise",
    tabShortBn: "নারী উদ্যোক্তা",
    tabMobileEn: "Women",
    tabMobileBn: "উদ্যোক্তা",
    pillEn: "Economic Independence & Dignity",
    pillBn: "অর্থনৈতিক স্বনির্ভরতা ও সামাজিক মর্যাদা",
    programEn: "Women's Micro-Enterprise & Sustainable Livelihoods",
    programBn: "গ্রামীণ নারী ক্ষুদ্র উদ্যোগ ও স্থায়ী জীবিকায়ন",
    locationEn: "Shibganj, Bogura",
    locationBn: "শিবগঞ্জ, বগুড়া",
    titleEn: "Dignity Through Self-Reliance.",
    titleBn: "অর্থনৈতিক স্বনির্ভরতায় আত্মমর্যাদা।",
    quoteEn: "Starting with a modest micro-credit and livestock training from VERC, I started a mini-dairy initiative with just two calves. Today, my farm supplies milk across the sub-district and employs four other rural women. We have transformed from surviving into leading our local economy.",
    quoteBn: "ভার্কের ক্ষুদ্রঋণ ও গবাদিপশু পালনের কারিগরি প্রশিক্ষণ নিয়ে মাত্র দুটি বাছুর দিয়ে শুরু করেছিলাম। আজ আমার ডেইরি খামার পুরো উপজেলায় দুধ সরবরাহ করে এবং চারজন গ্রামীণ নারীর কর্মসংস্থান সৃষ্টি করেছে। অভাব পেছনে ফেলে আজ আমরা সমাজের সফল উদ্যোক্তা।",
    personNameEn: "Nasrin Sultana",
    personNameBn: "নাসরীন সুলতানা",
    personRoleEn: "Entrepreneur & Cooperative Leader",
    personRoleBn: "সফল উদ্যোক্তা ও সমবায় সভাপতি",
    personCommunityEn: "Shetu Micro-Enterprise Network",
    personCommunityBn: "সেতু নারী ক্ষুদ্র উদ্যোক্তা দল",
    image: "/assets/home_official_1.jpg",
    metrics: [
      {
        value: "350K+",
        labelEn: "Women Entrepreneurs",
        labelBn: "ক্ষমতায়িত নারী উদ্যোক্তা",
        icon: Users
      },
      {
        value: "99.4%",
        labelEn: "Microloan Repayment",
        labelBn: "ঋণ পরিশোধের হার",
        icon: TrendingUp
      },
      {
        value: "3.4x",
        labelEn: "Average Income Growth",
        labelBn: "গড় পারিবারিক আয় বৃদ্ধি",
        icon: Award
      }
    ]
  }
];

export default function SuccessStorySection() {
  const { language } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-advance stories smoothly every 8 seconds when not hovered
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % STORIES.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const current = STORIES[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + STORIES.length) % STORIES.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % STORIES.length);
  };

  return (
    <section 
      className="relative py-24 sm:py-32 overflow-hidden bg-gradient-to-b from-white via-slate-50/60 to-blue-50/20"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Subtle ambient luxury light glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-brand-secondary/8 to-brand-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-10 right-10 w-80 h-80 bg-blue-100/40 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-amber-100/30 rounded-full blur-[120px] pointer-events-none" />

      <div className="container-custom relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16 space-y-4">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-blue-50/90 border border-blue-200/60 text-brand-primary text-xs font-bold tracking-wider uppercase shadow-sm">
            <span className="w-2 h-2 rounded-full bg-brand-secondary animate-pulse" />
            <Heart size={14} className="text-brand-secondary fill-brand-secondary/20" />
            <span>
              {language === "bn" ? "মাঠপর্যায়ের বাস্তব রূপান্তর" : "Voices from the Grassroots"}
            </span>
          </div>

          <h2 className={`text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 ${language === "bn" ? "leading-[1.25] tracking-normal" : "leading-[1.1] tracking-tight"}`}>
            {language === "bn" ? (
              <>
                জীবন বদলে দেওয়ার <span className="bg-gradient-to-r from-brand-primary via-blue-700 to-brand-secondary bg-clip-text text-transparent">বাস্তব গল্প।</span>
              </>
            ) : (
              <>
                Stories of Resilient <span className="bg-gradient-to-r from-brand-primary via-blue-700 to-brand-secondary bg-clip-text text-transparent">Transformation.</span>
              </>
            )}
          </h2>

          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            {language === "bn" 
              ? "১৯৭৭ সাল থেকে ভার্ক প্রান্তিক জনগোষ্ঠীর মাঝে আত্মবিশ্বাস ও স্থায়ী সক্ষমতা গড়ে তুলছে। দেখুন কীভাবে সাধারণ মানুষ নেতৃত্ব দিয়ে নিজেদের ভাগ্য পরিবর্তন করছেন।"
              : "Direct from the villages: how community ownership, non-formal education, and collective action break generational barriers across Bangladesh."}
          </p>

          {/* 3D Morphic Segmented Control (Strictly 3 buttons in one line, 0 horizontal scroll) */}
          <div className="pt-4 max-w-2xl mx-auto w-full px-2 sm:px-0">
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2.5 p-1.5 sm:p-2 rounded-2xl sm:rounded-full bg-slate-100/95 backdrop-blur-xl border border-slate-200/90 shadow-[inset_0_2px_4px_rgba(0,0,0,0.06),0_10px_25px_-5px_rgba(15,23,42,0.08)]">
              {STORIES.map((story, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={story.id}
                    onClick={() => setActiveIndex(idx)}
                    className={`group relative w-full px-2 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-full text-xs sm:text-sm font-bold transition-all duration-300 flex items-center justify-center gap-1.5 sm:gap-2 cursor-pointer text-center ${
                      isActive 
                        ? "bg-gradient-to-b from-[#00549f] via-brand-primary to-[#003463] text-white shadow-[0_8px_20px_-3px_rgba(0,75,141,0.5),inset_0_1px_1px_rgba(255,255,255,0.4),0_2px_4px_rgba(0,0,0,0.2)] ring-2 ring-brand-secondary/40 -translate-y-0.5" 
                        : "bg-gradient-to-b from-white via-white to-slate-50 text-slate-800 border border-slate-200/90 shadow-[0_3px_8px_rgba(0,0,0,0.06),inset_0_1px_1px_rgba(255,255,255,1)] hover:shadow-[0_6px_14px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 hover:text-brand-primary hover:border-blue-200 active:translate-y-0 active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.08)]"
                    }`}
                  >
                    <span className={`w-5 h-5 sm:w-6 sm:h-6 shrink-0 rounded-full flex items-center justify-center text-[10px] sm:text-[11px] font-black transition-all ${
                      isActive 
                        ? "bg-gradient-to-tr from-cyan-400 to-sky-200 text-slate-900 shadow-sm" 
                        : "bg-slate-100 text-slate-700 border border-slate-200 shadow-[inset_0_1px_2px_rgba(0,0,0,0.08)] group-hover:bg-blue-50 group-hover:text-brand-primary"
                    }`}>
                      0{idx + 1}
                    </span>
                    <span className="truncate tracking-tight hidden md:inline">
                      {language === "bn" ? story.tabShortBn : story.tabShortEn}
                    </span>
                    <span className="truncate tracking-tight md:hidden">
                      {language === "bn" ? story.tabMobileBn : story.tabMobileEn}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Master Story Showcase Card */}
        <div className="bg-white/95 backdrop-blur-md rounded-[36px] sm:rounded-[48px] border border-slate-200/80 shadow-[0_20px_70px_-15px_rgba(15,23,42,0.08)] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
            
            {/* Left Column: 100% UNTOUCHED, BRIGHT, CRISP IMAGE (No dark shading, No face occlusion) */}
            <div className="lg:col-span-5 relative flex flex-col justify-between p-6 sm:p-8 lg:p-10 bg-gradient-to-b from-slate-50/50 to-blue-50/30 border-b lg:border-b-0 lg:border-r border-slate-100">
              
              {/* Photo Frame Container */}
              <div className="relative rounded-[28px] overflow-hidden shadow-lg border border-slate-200/70 aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/5] bg-slate-100 group">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={current.id}
                    src={current.image}
                    alt={language === "bn" ? current.titleBn : current.titleEn}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </AnimatePresence>

                {/* Floating Frosted Pill Badge (Top-left: safe zone, non-intrusive) */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-md border border-white/80 text-xs font-bold text-slate-800">
                  <MapPin size={13} className="text-brand-secondary" />
                  <span>{language === "bn" ? current.locationBn : current.locationEn}</span>
                </div>

                {/* Verified Impact Pill (Top-right) */}
                <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 bg-emerald-500/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-md text-white text-[11px] font-bold">
                  <CheckCircle2 size={13} className="text-white" />
                  <span>{language === "bn" ? "যাচাইকৃত প্রভাব" : "Verified Impact"}</span>
                </div>

                {/* Clean Bottom Caption Strip (At bottom edge so faces are completely clear) */}
                <div className="absolute bottom-3 left-3 right-3 z-10 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-sm border border-white/80 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-xs font-bold text-slate-800 line-clamp-1">
                      {language === "bn" ? current.programBn : current.programEn}
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold text-brand-primary whitespace-nowrap ml-2">
                    VERC Field Unit
                  </span>
                </div>
              </div>

              {/* Story Slide Indicators & Quick Controls */}
              <div className="mt-6 flex items-center justify-between pt-2">
                <div className="flex items-center gap-2">
                  {STORIES.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveIndex(i)}
                      className={`h-2 rounded-full transition-all cursor-pointer ${
                        i === activeIndex 
                          ? "w-8 bg-brand-primary" 
                          : "w-2 bg-slate-300 hover:bg-slate-400"
                      }`}
                      aria-label={`Go to story ${i + 1}`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    onClick={handlePrev}
                    aria-label="Previous Story"
                    className="w-10 h-10 rounded-full bg-gradient-to-b from-white to-slate-100 border border-slate-200/90 shadow-[0_4px_10px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,1)] flex items-center justify-center text-slate-800 hover:text-brand-primary hover:shadow-[0_6px_14px_rgba(0,75,141,0.2)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] transition-all cursor-pointer"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={handleNext}
                    aria-label="Next Story"
                    className="w-10 h-10 rounded-full bg-gradient-to-b from-white to-slate-100 border border-slate-200/90 shadow-[0_4px_10px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,1)] flex items-center justify-center text-slate-800 hover:text-brand-primary hover:shadow-[0_6px_14px_rgba(0,75,141,0.2)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] transition-all cursor-pointer"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>

            </div>

            {/* Right Column: Narrative Storytelling, Beneficiary Profile, Metrics & CTAs */}
            <div className="lg:col-span-7 p-6 sm:p-10 lg:p-14 flex flex-col justify-between space-y-8">
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  {/* Category Tracker Bar */}
                  <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-2 text-brand-secondary font-black tracking-widest uppercase text-xs">
                      <Sparkles size={16} />
                      <span>{language === "bn" ? current.pillBn : current.pillEn}</span>
                    </div>
                    <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                      {language === "bn" ? `গল্প ০${activeIndex + 1} / ০${STORIES.length}` : `Story 0${activeIndex + 1} of 0${STORIES.length}`}
                    </span>
                  </div>

                  {/* Headline */}
                  <h3 className={`text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 ${
                    language === "bn" ? "leading-[1.25] tracking-normal" : "leading-tight tracking-tight"
                  }`}>
                    {language === "bn" ? current.titleBn : current.titleEn}
                  </h3>

                  {/* Refined Narrative Quote with Decorative Watermark */}
                  <div className="relative pl-6 sm:pl-8 border-l-4 border-brand-secondary/40 py-1">
                    <Quote 
                      size={48} 
                      className="absolute -top-3 -left-3 text-brand-primary/10 -z-10 pointer-events-none" 
                    />
                    <p className="text-slate-700 text-base sm:text-lg lg:text-xl leading-relaxed font-normal italic">
                      "{language === "bn" ? current.quoteBn : current.quoteEn}"
                    </p>
                  </div>

                  {/* Beneficiary Attribution Card */}
                  <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-brand-primary to-brand-secondary flex items-center justify-center text-white font-black text-lg shadow-sm shrink-0">
                      {(language === "bn" ? current.personNameBn : current.personNameEn).charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-slate-900 text-sm sm:text-base">
                          {language === "bn" ? current.personNameBn : current.personNameEn}
                        </h4>
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full">
                          <CheckCircle2 size={11} />
                          {language === "bn" ? "কমিউনিটি লিডার" : "Grassroots Leader"}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 font-medium">
                        {language === "bn" ? current.personRoleBn : current.personRoleEn} • {language === "bn" ? current.personCommunityBn : current.personCommunityEn}
                      </p>
                    </div>
                  </div>

                  {/* Micro-Metrics Highlight Grid */}
                  <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-2">
                    {current.metrics.map((metric, idx) => {
                      const IconComponent = metric.icon;
                      return (
                        <div 
                          key={idx}
                          className="bg-blue-50/50 hover:bg-blue-50/80 transition-colors border border-blue-100/80 rounded-2xl p-3 sm:p-4 text-center sm:text-left space-y-1"
                        >
                          <div className="flex items-center justify-center sm:justify-start gap-1.5 text-brand-primary mb-1">
                            <IconComponent className="w-4 h-4 text-brand-secondary" />
                            <span className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight">
                              {metric.value}
                            </span>
                          </div>
                          <p className="text-[11px] sm:text-xs text-slate-600 font-medium leading-snug">
                            {language === "bn" ? metric.labelBn : metric.labelEn}
                          </p>
                        </div>
                      );
                    })}
                  </div>

                </motion.div>
              </AnimatePresence>

              {/* Action Buttons Row with 3D Morphic Tactile Feel */}
              <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center gap-4">
                <Link 
                  href="/impact" 
                  className="px-8 py-4 bg-gradient-to-b from-[#00549f] via-brand-primary to-[#003463] hover:from-[#0060b5] hover:to-[#003d75] text-white font-extrabold rounded-2xl shadow-[0_10px_25px_-5px_rgba(0,75,141,0.45),inset_0_1px_1px_rgba(255,255,255,0.4),0_3px_5px_rgba(0,0,0,0.2)] hover:shadow-[0_14px_30px_-5px_rgba(0,75,141,0.55)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[inset_0_3px_6px_rgba(0,0,0,0.3)] transition-all flex items-center gap-3 text-sm sm:text-base group cursor-pointer"
                >
                  <span>
                    {language === "bn" ? "সকল ফলাফল ও প্রতিবেদন দেখুন" : "View Comprehensive Impact"}
                  </span>
                  <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
                </Link>

                <Link 
                  href="/programs" 
                  className="px-6 py-4 bg-gradient-to-b from-white to-slate-50 text-slate-800 hover:text-brand-primary font-bold rounded-2xl border border-slate-200/90 shadow-[0_6px_16px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,1)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.09)] hover:-translate-y-0.5 active:translate-y-0 active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.08)] transition-all flex items-center gap-2 text-sm sm:text-base cursor-pointer"
                >
                  <BookOpen size={16} className="text-brand-secondary" />
                  <span>
                    {language === "bn" ? "আমাদের কর্মসূচি সমূহ" : "Explore Our Programs"}
                  </span>
                </Link>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
