"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  GraduationCap, 
  Droplets, 
  TrendingUp, 
  Target, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Users, 
  Globe, 
  ShieldCheck, 
  HeartHandshake, 
  ChevronRight, 
  Coins, 
  Award,
  Layers,
  Building2,
  HeartPulse,
  Compass
} from "lucide-react";
import { useContent } from "@/context/ContentContext";
import { useLanguage } from "@/context/LanguageContext";

export default function SocialProgramsPage() {
  const { primaryColor } = useContent();
  const { language } = useLanguage();

  const isBn = language === "bn";

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
  };

  const primaryPillars = [
    {
      id: "education",
      slug: "education",
      tagNumber: "01",
      icon: GraduationCap,
      title: isBn ? "জীবন দক্ষতা ও প্রাথমিক শিক্ষা" : "Life Skill Education",
      subtitle: isBn ? "সবার জন্য অন্তর্ভুক্তিমূলক মানসম্মত শিক্ষা" : "Inclusive Quality Learning for Every Child",
      desc: isBn
        ? "সুবিধাবঞ্চিত শিশুদের জন্য আনন্দময় উপানুষ্ঠানিক শিক্ষা, প্রাক-প্রাথমিক ও প্রাথমিক সহায়তা, কিশোর-কিশোরী ও বয়স্ক শিক্ষা এবং জীবন দক্ষতা প্রশিক্ষণ কর্মসূচি।"
        : "Delivering inclusive non-formal primary education, early childhood development, adolescent literacy, and practical life-skills training for marginalized children and youth.",
      href: "/programs/education",
      lightBg: "from-sky-100/90 via-sky-50/70 to-blue-50/60",
      darkBg: "dark:from-sky-950/40 dark:via-slate-900/80 dark:to-slate-900/90",
      cardBorder: "border-sky-200/90 dark:border-sky-800/50",
      normalShadow: "shadow-[0_16px_36px_-10px_rgba(2,132,199,0.14),0_4px_12px_rgba(0,0,0,0.02),inset_0_1.5px_2px_rgba(255,255,255,0.95),inset_0_-1px_2px_rgba(2,132,199,0.05)]",
      hoverShadow: "hover:shadow-[0_30px_70px_-10px_rgba(2,132,199,0.38),0_0_40px_rgba(56,189,248,0.22),inset_0_2px_3px_rgba(255,255,255,1)]",
      normalFlare: "via-sky-400 opacity-90",
      hoverFlare: "group-hover:via-white group-hover:h-[3px] group-hover:opacity-100",
      topGlowColor: "rgba(0, 122, 255, 0.22)",
      bottomGlowColor: "rgba(0, 174, 239, 0.18)",
      badgeGradient: "from-sky-500 via-blue-600 to-indigo-600",
      badgeShadow: "shadow-[0_10px_25px_-5px_rgba(2,132,199,0.45),inset_0_1.5px_2px_rgba(255,255,255,0.7)]",
      tagStyle: "bg-sky-500/15 text-sky-700 dark:text-sky-300 border-sky-300/70 dark:border-sky-700/60",
      btnGradient: "from-sky-600 to-blue-700",
      btnShadow: "shadow-[0_8px_20px_-4px_rgba(2,132,199,0.4)]",
      hoverRing: "group-hover:ring-sky-400/50",
      stat: isBn ? "১২০,০০০+ শিক্ষার্থী" : "120,000+ Students",
      highlights: isBn ? [
        "উপানুষ্ঠানিক প্রাথমিক শিক্ষা (NFE)",
        "প্রাক-প্রাথমিক ও মৌলিক সাক্ষরতা",
        "মূলধারার সরকারি বিদ্যালয়ে অন্তর্ভুক্তি",
        "কমিউনিটি পরিচালিত শিখন কেন্দ্র"
      ] : [
        "Non-Formal Primary Education (NFE)",
        "Early Childhood Development (ECD)",
        "Transition to Formal Schooling",
        "Community-Managed Learning Centers"
      ]
    },
    {
      id: "wash",
      slug: "wash",
      tagNumber: "02",
      icon: Droplets,
      title: isBn ? "স্বাস্থ্য, পুষ্টি ও ওয়াশ (WaSH)" : "Health, Nutrition & WaSH",
      subtitle: isBn ? "কমিউনিটি পরিচালিত সম্পূর্ণ স্যানিটেশন পথিকৃৎ" : "Global Pioneer of Community-Led Total Sanitation",
      desc: isBn
        ? "বিশ্বব্যাপী সমাদৃত সিএলটিএস (CLTS) পদ্ধতির উদ্ভাবক হিসেবে শতভাগ স্যানিটেশন নিশ্চিতকরণ, আর্সেনিকমুক্ত নিরাপদ পানি সরবরাহ এবং মা ও শিশু স্বাস্থ্যসেবা।"
        : "Global pioneer of Community-Led Total Sanitation (CLTS), bringing 100% open-defecation-free status, arsenic-safe drinking water, and mother & child healthcare to millions.",
      href: "/programs/wash",
      lightBg: "from-emerald-100/90 via-emerald-50/70 to-teal-50/60",
      darkBg: "dark:from-emerald-950/40 dark:via-slate-900/80 dark:to-slate-900/90",
      cardBorder: "border-emerald-200/90 dark:border-emerald-800/50",
      normalShadow: "shadow-[0_16px_36px_-10px_rgba(5,150,105,0.14),0_4px_12px_rgba(0,0,0,0.02),inset_0_1.5px_2px_rgba(255,255,255,0.95),inset_0_-1px_2px_rgba(5,150,105,0.05)]",
      hoverShadow: "hover:shadow-[0_30px_70px_-10px_rgba(5,150,105,0.38),0_0_40px_rgba(52,211,153,0.22),inset_0_2px_3px_rgba(255,255,255,1)]",
      normalFlare: "via-emerald-400 opacity-90",
      hoverFlare: "group-hover:via-white group-hover:h-[3px] group-hover:opacity-100",
      topGlowColor: "rgba(16, 185, 129, 0.22)",
      bottomGlowColor: "rgba(20, 184, 166, 0.18)",
      badgeGradient: "from-emerald-500 via-teal-600 to-cyan-600",
      badgeShadow: "shadow-[0_10px_25px_-5px_rgba(5,150,105,0.45),inset_0_1.5px_2px_rgba(255,255,255,0.7)]",
      tagStyle: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-300/70 dark:border-emerald-700/60",
      btnGradient: "from-emerald-600 to-teal-700",
      btnShadow: "shadow-[0_8px_20px_-4px_rgba(5,150,105,0.4)]",
      hoverRing: "group-hover:ring-emerald-400/50",
      stat: isBn ? "২.৪ মিলিয়ন+ নিরাপদ পানি সুবিধা" : "2.4M+ Safe Water Access",
      highlights: isBn ? [
        "সিএলটিএস (CLTS) উদ্ভাবন ও শতভাগ স্যানিটেশন",
        "আর্সেনিকমুক্ত গভীর ও পাইপযুক্ত পানি সরবরাহ",
        "মা ও শিশু হাসপাতাল ও স্বাস্থ্যকেন্দ্র",
        "বিদ্যালয় স্বাস্থ্য ও হাইজিন শিক্ষা"
      ] : [
        "Pioneered Community-Led Total Sanitation (CLTS)",
        "Arsenic-Safe Piped & Deep Tube Well Water",
        "Mother & Child Specialized Hospitals",
        "School Water, Sanitation & Hygiene (SWASH)"
      ]
    },
    {
      id: "livelihood",
      slug: "livelihood",
      tagNumber: "03",
      icon: TrendingUp,
      title: isBn ? "জীবিকা ও নারী ক্ষমতায়ন" : "Livelihood & Empowerment",
      subtitle: isBn ? "টেকসই অর্থনৈতিক উন্নয়ন ও স্বাবলম্বিতা" : "Resilient Futures Through Economic Empowerment",
      desc: isBn
        ? "কারিগরি ও বৃত্তিমূলক প্রশিক্ষণ, কৃষি ও অকৃষি ভিত্তিক ক্ষুদ্র উদ্যোগ সৃষ্টি, নারী উদ্যোক্তা তৈরি এবং জলবায়ু সহনশীল টেকসই জীবিকা উন্নয়ন।"
        : "Building resilient livelihoods through market-driven vocational training, women-led micro-enterprises, agro-technology transfer, and climate-adaptive income generation.",
      href: "/programs/livelihood",
      lightBg: "from-rose-100/90 via-rose-50/70 to-orange-50/60",
      darkBg: "dark:from-rose-950/40 dark:via-slate-900/80 dark:to-slate-900/90",
      cardBorder: "border-rose-200/90 dark:border-rose-800/50",
      normalShadow: "shadow-[0_16px_36px_-10px_rgba(244,63,94,0.14),0_4px_12px_rgba(0,0,0,0.02),inset_0_1.5px_2px_rgba(255,255,255,0.95),inset_0_-1px_2px_rgba(244,63,94,0.05)]",
      hoverShadow: "hover:shadow-[0_30px_70px_-10px_rgba(244,63,94,0.38),0_0_40px_rgba(251,113,133,0.22),inset_0_2px_3px_rgba(255,255,255,1)]",
      normalFlare: "via-rose-400 opacity-90",
      hoverFlare: "group-hover:via-white group-hover:h-[3px] group-hover:opacity-100",
      topGlowColor: "rgba(244, 63, 94, 0.22)",
      bottomGlowColor: "rgba(249, 115, 22, 0.18)",
      badgeGradient: "from-rose-500 via-amber-500 to-orange-500",
      badgeShadow: "shadow-[0_10px_25px_-5px_rgba(244,63,94,0.45),inset_0_1.5px_2px_rgba(255,255,255,0.7)]",
      tagStyle: "bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-300/70 dark:border-rose-700/60",
      btnGradient: "from-rose-600 to-amber-600",
      btnShadow: "shadow-[0_8px_20px_-4px_rgba(244,63,94,0.4)]",
      hoverRing: "group-hover:ring-rose-400/50",
      stat: isBn ? "৮৫,০০০+ নারী উদ্যোক্তা" : "85,000+ Women Entrepreneurs",
      highlights: isBn ? [
        "২৮+ পেশায় কারিগরি ও বৃত্তিমূলক প্রশিক্ষণ",
        "জলবায়ু সহনশীল উন্নত কৃষি ও মৎস্য চাষ",
        "নারী স্বনির্ভর দল ও মার্কেট লিংকেজ",
        "ক্ষুদ্র উদ্যোগ সৃষ্টি ও ব্যবসায়িক সহায়তা"
      ] : [
        "Vocational Training Across 28+ Trades",
        "Climate-Resilient Agricultural Technologies",
        "Women's Groups & Market Linkages",
        "Micro-Enterprise Incubation & Financing"
      ]
    },
    {
      id: "capacity",
      slug: "capacity",
      tagNumber: "04",
      icon: Target,
      title: isBn ? "সক্ষমতা বৃদ্ধি ও সুশাসন" : "Capacity Building & Training",
      subtitle: isBn ? "স্থানীয় প্রতিষ্ঠান ও তৃণমূল নেতৃত্ব বিকাশ" : "Institutional Strengthening & Good Governance",
      desc: isBn
        ? "স্থানীয় সরকার প্রতিষ্ঠান (ইউনিয়ন পরিষদ), তৃণমূল সামাজিক সংগঠন (CBO), যুব নেতৃত্ব ও দুর্যোগ ব্যবস্থাপনা কমিটির প্রাতিষ্ঠানিক সক্ষমতা জোরদার।"
        : "Strengthening local government bodies (Union Parishads), empowering grassroots Community-Based Organizations (CBOs), and training youth leaders for lasting civic change.",
      href: "/programs/capacity",
      lightBg: "from-amber-100/90 via-amber-50/70 to-yellow-50/60",
      darkBg: "dark:from-amber-950/40 dark:via-slate-900/80 dark:to-slate-900/90",
      cardBorder: "border-amber-200/90 dark:border-amber-800/50",
      normalShadow: "shadow-[0_16px_36px_-10px_rgba(245,158,11,0.14),0_4px_12px_rgba(0,0,0,0.02),inset_0_1.5px_2px_rgba(255,255,255,0.95),inset_0_-1px_2px_rgba(245,158,11,0.05)]",
      hoverShadow: "hover:shadow-[0_30px_70px_-10px_rgba(245,158,11,0.38),0_0_40px_rgba(252,211,77,0.22),inset_0_2px_3px_rgba(255,255,255,1)]",
      normalFlare: "via-amber-400 opacity-90",
      hoverFlare: "group-hover:via-white group-hover:h-[3px] group-hover:opacity-100",
      topGlowColor: "rgba(245, 158, 11, 0.22)",
      bottomGlowColor: "rgba(234, 179, 8, 0.18)",
      badgeGradient: "from-amber-500 via-orange-500 to-red-500",
      badgeShadow: "shadow-[0_10px_25px_-5px_rgba(245,158,11,0.45),inset_0_1.5px_2px_rgba(255,255,255,0.7)]",
      tagStyle: "bg-amber-500/15 text-amber-800 dark:text-amber-300 border-amber-300/70 dark:border-amber-700/60",
      btnGradient: "from-amber-600 to-orange-600",
      btnShadow: "shadow-[0_8px_20px_-4px_rgba(245,158,11,0.4)]",
      hoverRing: "group-hover:ring-amber-400/50",
      stat: isBn ? "৩,২০০+ সিবিও ও কমিটি" : "3,200+ CBOs Strengthened",
      highlights: isBn ? [
        "ইউনিয়ন পরিষদ সুশাসন ও বাজেট স্বচ্ছতা",
        "সিবিও (CBO) ও ভিলেজ ওয়াশ কমিটি প্রশিক্ষণ",
        "কমিউনিটি ঝুঁকি হ্রাস (DRR) ও দুর্যোগ প্রস্তুতি",
        "যুব ও কিশোর নেতৃত্ব বিকাশ কর্মসূচি"
      ] : [
        "Local Government (UP) Good Governance",
        "Village WaSH & Management Committees",
        "Disaster Risk Reduction (DRR) Planning",
        "Youth Leadership & Civic Engagement"
      ]
    }
  ];

  const methodologySteps = [
    {
      num: "01",
      title: isBn ? "কমিউনিটি উদ্বুদ্ধকরণ ও অংশগ্রহণ" : "Community Mobilization",
      desc: isBn
        ? "পিআরএ (PRA) ও অংশগ্রহণমূলক আলোচনার মাধ্যমে তৃণমূলের বাস্তব সমস্যা চিহ্নিতকরণ।"
        : "Conducting Participatory Rural Appraisals (PRA) to analyze local vulnerabilities and mobilize community ownership.",
      icon: Users
    },
    {
      num: "02",
      title: isBn ? "তৃণমূল কমিটি ও নেতৃত্ব গঠন" : "Grassroots Institution Building",
      desc: isBn
        ? "গ্রাম ও পাড়া পর্যায়ে নারী-পুরুষ সমন্বয়ে গণতান্ত্রিক সামাজিক কমিটি গঠন।"
        : "Forming inclusive community committees (CBOs/CMCs) with equal representation of women and youth.",
      icon: ShieldCheck
    },
    {
      num: "03",
      title: isBn ? "সমন্বিত উন্নয়ন ও সক্ষমতা বৃদ্ধি" : "Integrated Capacity Delivery",
      desc: isBn
        ? "শিক্ষা, নিরাপদ পানি, স্বাস্থ্য ও জীবিকায় আধুনিক প্রযুক্তি ও প্রশিক্ষণের বিস্তার।"
        : "Delivering technical skills, clean water solutions, healthcare, and livelihood interventions.",
      icon: Sparkles
    },
    {
      num: "04",
      title: isBn ? "টেকসই স্বাবলম্বিতা ও স্থায়িত্ব" : "Sustainable Self-Reliance",
      desc: isBn
        ? "স্থানীয় সরকার ও কমিউনিটি কমিটির মাধ্যমে দীর্ঘমেয়াদে প্রকল্প পরিচালনা ও স্বনির্ভরতা।"
        : "Ensuring long-term sustainability through local government integration and community self-governance.",
      icon: HeartHandshake
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-x-hidden">
      {/* 1. POLYMORPHIC HERO HEADER */}
      <section className="relative pt-36 sm:pt-40 lg:pt-48 pb-20 sm:pb-24 lg:pb-28 overflow-hidden bg-gradient-to-b from-slate-50/80 via-white to-slate-50/40 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900">
        {/* Ambient Polymorphic Light Blobs */}
        <div 
          style={{ 
            background: `radial-gradient(circle at 20% 30%, ${primaryColor || "#004B8D"}15 0%, transparent 60%)` 
          }}
          className="absolute inset-0 -top-24 blur-3xl -z-10 rounded-full pointer-events-none transform scale-y-75" 
        />
        <div className="absolute right-0 top-1/4 w-[500px] h-[500px] rounded-full bg-cyan-400/10 blur-3xl -z-10 pointer-events-none" />

        <div className="container-custom relative z-10">
          {/* Breadcrumb Frosted Glass Pill */}
          <motion.div {...fadeIn} className="flex items-center gap-2 text-xs font-bold text-slate-500 mb-8">
            <Link href="/" className="hover:text-brand-primary transition-colors">
              {isBn ? "হোম" : "Home"}
            </Link>
            <ChevronRight size={14} className="text-slate-400" />
            <span className="text-brand-primary font-black uppercase tracking-wider">
              {isBn ? "সামাজিক কর্মসূচি" : "Social Programs"}
            </span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <motion.div {...fadeIn} className="lg:col-span-8">
              {/* Focus Badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full backdrop-blur-xl bg-brand-primary/[0.08] dark:bg-white/10 border border-brand-primary/20 dark:border-white/15 shadow-[0_2px_10px_rgba(0,75,141,0.06),inset_0_1px_1px_rgba(255,255,255,0.9)] text-brand-primary dark:text-cyan-300 mb-6">
                <Target size={16} className="stroke-[2.5]" />
                <h1 className="font-black uppercase tracking-[0.22em] text-[11px] sm:text-xs">
                  {isBn ? "ভিইআরসি সামাজিক উন্নয়ন কর্মসূচি" : "VERC Social Development Pillars"}
                </h1>
              </div>

              {/* Headline */}
              <h2 className={`text-4xl sm:text-5xl lg:text-7xl font-black text-slate-900 dark:text-white ${isBn ? "leading-[1.2] tracking-normal" : "leading-[1.05] tracking-tight"} mb-6`}>
                {isBn ? (
                  <>
                    টেকসই পরিবর্তনের লক্ষ্যে <br/>
                    <span 
                      style={{
                        backgroundImage: `linear-gradient(135deg, ${primaryColor || "#004B8D"}, #00AEEF)`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent"
                      }}
                    >
                      সামাজিক কর্মসূচি স্তম্ভ।
                    </span>
                  </>
                ) : (
                  <>
                    Empowering Communities Through <br/>
                    <span 
                      style={{
                        backgroundImage: `linear-gradient(135deg, ${primaryColor || "#004B8D"}, #00AEEF)`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent"
                      }}
                    >
                      Social Program Pillars.
                    </span>
                  </>
                )}
              </h2>

              <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 font-medium leading-relaxed max-w-2xl">
                {isBn
                  ? "১৯৭৭ সাল থেকে ভিইআরসি গ্রামীণ ও সুবিধাবঞ্চিত মানুষের টেকসই উন্নয়নের জন্য শিক্ষা, পানি-স্বাস্থ্য, জীবিকা এবং সুশাসনের সমন্বিত মডেল বাস্তবায়ন করে আসছে।"
                  : "Since 1977, VERC has pioneered community-led models in life skill education, water & sanitation, resilient livelihoods, and grassroots governance across Bangladesh."}
              </p>
            </motion.div>

            {/* Quick Metrics Bar in Frosted Glass */}
            <motion.div {...fadeIn} transition={{ delay: 0.15 }} className="lg:col-span-4">
              <div className="rounded-[30px] p-6 sm:p-7 backdrop-blur-2xl bg-white/80 dark:bg-slate-900/80 border border-white/80 dark:border-white/10 shadow-[0_20px_50px_-10px_rgba(0,75,141,0.1),inset_0_1px_1px_rgba(255,255,255,0.95)]">
                <div className="grid grid-cols-2 gap-5">
                  <div className="border-b border-slate-100 dark:border-white/10 pb-4">
                    <div className="text-3xl font-black text-brand-primary">4</div>
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mt-1">
                      {isBn ? "মূল স্তম্ভ" : "Core Pillars"}
                    </div>
                  </div>
                  <div className="border-b border-slate-100 dark:border-white/10 pb-4">
                    <div className="text-3xl font-black text-emerald-600">3.5M+</div>
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mt-1">
                      {isBn ? "উপকারভোগী" : "Beneficiaries"}
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-black text-amber-600">64</div>
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mt-1">
                      {isBn ? "জেলায় কার্যক্রম" : "Districts Reached"}
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-black text-purple-600">45+</div>
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mt-1">
                      {isBn ? "বছরের অভিজ্ঞতা" : "Years Leadership"}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. THE 4 CORE PROGRAM PILLARS DIRECTORY */}
      <section className="relative py-20 sm:py-24 lg:py-28 bg-gradient-to-b from-white via-slate-50/50 to-white dark:from-slate-950 dark:via-slate-900/50 dark:to-slate-950">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
            <motion.div {...fadeIn}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest text-brand-primary bg-brand-primary/10 border border-brand-primary/20 mb-4">
                <Compass size={14} />
                {isBn ? "কর্মসূচির বিবরণ" : "Core Thematic Portfolios"}
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
                {isBn ? "আমাদের মূল সামাজিক কর্মসূচি" : "Explore Our 4 Focus Pillars"}
              </h2>
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 font-medium mt-4">
                {isBn 
                  ? "প্রতিটি কর্মসূচির বিস্তারিত লক্ষ্য, উদ্ভাবনী পদ্ধতি ও প্রভাব পর্যালোচনা করুন।"
                  : "Discover in-depth approaches, key interventions, and ground-level outcomes for each core program."}
              </p>
            </motion.div>
          </div>

          {/* 4-Card Master Grid with Full Polymorphic Styling */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {primaryPillars.map((pillar, i) => {
              const IconComp = pillar.icon;

              return (
                <motion.div
                  key={pillar.id}
                  {...fadeIn}
                  transition={{ delay: i * 0.1 }}
                  className={`group relative rounded-[32px] sm:rounded-[36px] lg:rounded-[40px] p-7 sm:p-9 lg:p-10 flex flex-col justify-between overflow-hidden transition-all duration-500 ease-out hover:-translate-y-3.5 hover:scale-[1.01] cursor-pointer backdrop-blur-2xl bg-gradient-to-br ${pillar.lightBg} ${pillar.darkBg} border ${pillar.cardBorder} ${pillar.normalShadow} ${pillar.hoverShadow} hover:border-white hover:ring-2 ${pillar.hoverRing}`}
                >
                  {/* Polymorphic Corner Light Flares */}
                  <div 
                    style={{ backgroundColor: pillar.topGlowColor }}
                    className="absolute -top-12 -right-12 w-36 h-36 rounded-full blur-2xl group-hover:scale-160 transition-transform duration-700 pointer-events-none" 
                  />
                  <div 
                    style={{ backgroundColor: pillar.bottomGlowColor }}
                    className="absolute -bottom-10 -left-10 w-28 h-28 rounded-full blur-xl group-hover:scale-140 transition-transform duration-700 pointer-events-none" 
                  />

                  {/* Top Specular Edge Highlight Flare Bar */}
                  <div className={`absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent ${pillar.normalFlare} to-transparent ${pillar.hoverFlare} transition-all duration-500`} />

                  {/* Prismatic Crystal Light Sweep on Hover */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />

                  <div>
                    {/* Header: Jewel Badge + Tag Number + Stat */}
                    <div className="relative z-10 flex items-center justify-between mb-6">
                      {/* Jewel-like Frosted Glass Icon Badge */}
                      <div className={`relative p-[1.5px] rounded-[22px] bg-gradient-to-br from-white via-white/80 to-white/30 ${pillar.badgeShadow} group-hover:scale-115 group-hover:-rotate-3 group-hover:ring-4 group-hover:ring-white/80 group-hover:shadow-[0_14px_32px_rgba(0,0,0,0.35)] transition-all duration-500`}>
                        <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-[20px] bg-gradient-to-br ${pillar.badgeGradient} backdrop-blur-md flex items-center justify-center relative overflow-hidden`}>
                          <span className="relative z-10">
                            <IconComp className="w-7 h-7 sm:w-8 sm:h-8 text-white drop-shadow-md transition-transform duration-500 group-hover:scale-110" strokeWidth={2.3} />
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Stat Pill */}
                        <span className="hidden sm:inline-flex items-center px-3 py-1 rounded-full text-xs font-black bg-white/70 dark:bg-white/10 text-slate-700 dark:text-slate-200 border border-white/80 shadow-xs">
                          {pillar.stat}
                        </span>
                        {/* Numeral Capsule */}
                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-black tracking-widest backdrop-blur-md border shadow-[0_2px_6px_rgba(0,0,0,0.03),inset_0_1px_1px_rgba(255,255,255,0.9)] transition-all duration-300 ${pillar.tagStyle} group-hover:bg-white group-hover:text-slate-900 group-hover:border-white group-hover:shadow-sm`}>
                          {pillar.tagNumber}
                        </div>
                      </div>
                    </div>

                    {/* Title & Subtitle */}
                    <h3 className="relative z-10 text-2xl sm:text-3xl font-black text-slate-900 dark:text-white group-hover:text-brand-primary dark:group-hover:text-cyan-300 transition-colors duration-300 mb-2 leading-tight">
                      {pillar.title}
                    </h3>
                    <div className="relative z-10 text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4">
                      {pillar.subtitle}
                    </div>

                    {/* Description */}
                    <p className="relative z-10 text-slate-600 dark:text-slate-300 font-medium text-sm sm:text-base leading-relaxed mb-6">
                      {pillar.desc}
                    </p>

                    {/* Highlights List */}
                    <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8 border-t border-b border-black/5 dark:border-white/10 py-4">
                      {pillar.highlights.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs font-semibold text-slate-700 dark:text-slate-200">
                          <CheckCircle2 size={14} className="text-emerald-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Polymorphic Interactive CTA Action Pill */}
                  <Link 
                    href={pillar.href} 
                    className={`relative z-10 group/btn inline-flex items-center justify-between w-full px-5 py-3.5 rounded-2xl bg-gradient-to-r ${pillar.btnGradient} text-white border border-white/40 ${pillar.btnShadow} group-hover:scale-[1.02] group-hover:shadow-[0_12px_28px_-2px_rgba(0,0,0,0.3)] transition-all duration-300 overflow-hidden`}
                  >
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />
                    
                    <span className="relative z-10 text-xs sm:text-sm font-black uppercase tracking-wider text-white drop-shadow-xs">
                      {isBn ? `${pillar.title} বিস্তারিত দেখুন` : `Explore ${pillar.title}`}
                    </span>

                    <div className="relative z-10 w-8 h-8 rounded-full bg-white/20 group-hover:bg-white group-hover:text-slate-900 flex items-center justify-center text-white transition-all duration-300 group-hover:translate-x-1.5 group-hover:scale-110 shadow-xs">
                      <ArrowRight size={15} strokeWidth={2.6} />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. EXTENDED LINKAGES: MICROFINANCE & HUMANITARIAN ACTION */}
      <section className="relative py-20 bg-slate-50 dark:bg-slate-900 border-t border-b border-slate-200/80 dark:border-white/10">
        <div className="container-custom">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-brand-primary">
              {isBn ? "পরিপূরক কর্মসূচি" : "Integrated Support Programs"}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mt-2">
              {isBn ? "অর্থনৈতিক অন্তর্ভুক্তি ও জরুরি সহায়তা" : "Economic Inclusion & Humanitarian Response"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Microfinance Program Card */}
            <div className="rounded-[32px] p-8 sm:p-9 bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 shadow-lg hover:shadow-2xl transition-all duration-500 group flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950 flex items-center justify-center text-brand-primary mb-6 group-hover:scale-110 transition-transform">
                  <Coins size={28} />
                </div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3">
                  {isBn ? "ক্ষুদ্রঅর্থায়ন কর্মসূচি (Microfinance)" : "Microfinance Program"}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 font-medium text-sm sm:text-base leading-relaxed mb-6">
                  {isBn 
                    ? "জাগরণ, অগ্রসর ও বুনিয়াদ ঋণ কর্মসূচির মাধ্যমে তৃণমূল নারী ও উদ্যোক্তাদের আর্থিক অন্তর্ভুক্তি ও সঞ্চয় সেবা প্রদান।"
                    : "Providing collateral-free credit, micro-savings, and enterprise financing for grassroots women through Jagoron, Agrosor, and Buniad products."}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {isBn ? "জাগরণ ঋণ" : "Jagoron Loans"}
                  </span>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {isBn ? "অগ্রসর উদ্যোগ" : "Agrosor Enterprise"}
                  </span>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {isBn ? "বুনিয়াদ সঞ্চয়" : "Buniad Ultra-poor"}
                  </span>
                </div>
              </div>

              <Link 
                href="/microfinance" 
                className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-wider text-brand-primary hover:gap-3 transition-all"
              >
                {isBn ? "ক্ষুদ্রঅর্থায়ন দেখুন" : "Explore Microfinance"} <ArrowRight size={16} />
              </Link>
            </div>

            {/* Humanitarian Relief & Climate Action */}
            <div className="rounded-[32px] p-8 sm:p-9 bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 shadow-lg hover:shadow-2xl transition-all duration-500 group flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-teal-50 dark:bg-teal-950 flex items-center justify-center text-teal-600 mb-6 group-hover:scale-110 transition-transform">
                  <Globe size={28} />
                </div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3">
                  {isBn ? "মানবিক সহায়তা ও জলবায়ু অভিযোজন" : "Humanitarian Relief & Climate Action"}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 font-medium text-sm sm:text-base leading-relaxed mb-6">
                  {isBn
                    ? "বন্যা, ঘূর্ণিঝড় ও প্রাকৃতিক দুর্যোগে জরুরি ত্রাণ, পুনর্বাসন, নিরাপদ পানি ও আশ্রয় প্রদান এবং দীর্ঘমেয়াদি জলবায়ু সহনশীলতা।"
                    : "Emergency disaster relief, clean water, rehabilitation, and community-based adaptation mechanisms for climate-vulnerable communities."}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {isBn ? "জরুরি ত্রাণ" : "Rapid Emergency Relief"}
                  </span>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {isBn ? "পুনর্বাসন" : "Rehabilitation"}
                  </span>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {isBn ? "জলবায়ু সহনশীলতা" : "Climate Resilience"}
                  </span>
                </div>
              </div>

              <Link 
                href="/impact" 
                className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-wider text-teal-600 hover:gap-3 transition-all"
              >
                {isBn ? "প্রভাব ও ফলাফল দেখুন" : "View Relief Impact"} <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE VERC PARTICIPATORY DEVELOPMENT METHODOLOGY */}
      <section className="relative py-24 bg-white dark:bg-slate-950">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest text-brand-primary bg-brand-primary/10 mb-4">
              <Layers size={14} />
              {isBn ? "কাজের পদ্ধতি" : "Our Methodology"}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              {isBn ? "কমিউনিটি-নেতৃত্বাধীন উন্নয়ন মডেল" : "The Community-Led Delivery Model"}
            </h2>
            <p className="text-slate-600 dark:text-slate-300 font-medium text-base sm:text-lg mt-3">
              {isBn
                ? "ভিইআরসির প্রতিটি কর্মসূচি তৃণমূল মানুষের সক্রিয় অংশগ্রহণ ও মালিকানায় পরিচালিত হয়।"
                : "A proven, participatory process ensuring long-term sustainability and grassroots empowerment."}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {methodologySteps.map((step, idx) => {
              const StepIcon = step.icon;
              return (
                <div 
                  key={idx}
                  className="rounded-[28px] p-7 bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center text-brand-primary">
                        <StepIcon size={24} />
                      </div>
                      <span className="text-2xl font-black text-slate-300 dark:text-slate-700">
                        {step.num}
                      </span>
                    </div>
                    <h3 className="text-lg font-black text-slate-900 dark:text-white mb-2.5">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION (CTA) BANNER */}
      <section className="relative py-20 bg-gradient-to-br from-brand-primary via-[#004B8D] to-brand-secondary text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent pointer-events-none" />
        <div className="container-custom relative z-10 text-center max-w-4xl mx-auto">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-white/20 backdrop-blur-md mb-6">
            <Sparkles size={14} />
            {isBn ? "অংশীদারিত্ব ও সহায়তা" : "Partner With Us"}
          </span>
          <h2 className="text-3xl sm:text-5xl font-black leading-tight mb-6">
            {isBn 
              ? "একত্রে গড়ে তুলি একটি স্বনির্ভর ও মানবিক বাংলাদেশ।"
              : "Let’s Build a Resilient, Empowered Bangladesh Together."}
          </h2>
          <p className="text-base sm:text-lg text-white/90 font-medium max-w-2xl mx-auto mb-10 leading-relaxed">
            {isBn
              ? "উন্নয়ন সহযোগী সংস্থা, দাতা সংস্থা কিংবা করপোরেট সামাজিক দায়বদ্ধতা (CSR) অংশীদার হিসেবে ভিইআরসির কর্মসূচিতে যুক্ত হোন।"
              : "Collaborate as an institutional partner, development donor, or CSR supporter to scale impactful community programs across Bangladesh."}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link 
              href="/contact" 
              className="px-8 py-4 rounded-2xl bg-white text-brand-primary font-black uppercase tracking-wider text-xs sm:text-sm shadow-xl hover:bg-slate-100 hover:scale-105 transition-all"
            >
              {isBn ? "যোগাযোগ ও অংশীদারিত্ব" : "Partner / Contact Us"}
            </Link>
            <Link 
              href="/donate" 
              className="px-8 py-4 rounded-2xl bg-white/15 backdrop-blur-md text-white border border-white/40 font-black uppercase tracking-wider text-xs sm:text-sm hover:bg-white/25 hover:scale-105 transition-all"
            >
              {isBn ? "অনুদান প্রদান" : "Support Our Cause"}
            </Link>
            <Link 
              href="/about/annual-report" 
              className="px-8 py-4 rounded-2xl bg-transparent text-white/80 hover:text-white font-black uppercase tracking-wider text-xs sm:text-sm transition-all"
            >
              {isBn ? "বার্ষিক প্রতিবেদন" : "Annual Reports"} →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
