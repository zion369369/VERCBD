"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, X, ExternalLink, Sparkles, CheckCircle2, 
  Target, Award
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

/* =========================================================================
   AUTHENTIC UN SDG VECTOR PICTOGRAMS
   High-precision SVGs handcrafted to match official UN SDG icons
   ========================================================================= */

// SDG 1: No Poverty (Family silhouette)
export const Sdg1Icon = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg viewBox="0 0 64 64" fill="currentColor" className={className} aria-label="No Poverty">
    <rect x="6" y="54" width="52" height="3" rx="1.5" />
    <circle cx="16" cy="19" r="4.5" />
    <path d="M12 26 C12 24.5 13.5 24 16 24 C18.5 24 20 24.5 20 26 L21 40 C21 41 20 41.5 19 41.5 L17.5 41.5 L17.5 52 C17.5 53 16.5 53.5 15.5 53.5 C14.5 53.5 13.5 53 13.5 52 L13.5 41.5 L12 41.5 C11 41.5 10 41 10 40 Z" />
    <circle cx="28" cy="20" r="4.2" />
    <path d="M24 27 C24 25.5 25.5 25 28 25 C30.5 25 32 25.5 32 27 L33.5 39 C33.5 40 32.5 41 31.5 41 L30 41 L31 52 C31 53 30 53.5 29 53.5 C28 53.5 27 53 27 52 L26.5 44 L25.5 52 C25.5 53 24.5 53.5 23.5 53.5 C22.5 53.5 21.5 53 21.5 52 L22.5 41 L21 41 C20 41 19 40 19.5 39 Z" />
    <circle cx="39" cy="26" r="3.5" />
    <path d="M36 32 C36 31 37 30.5 39 30.5 C41 30.5 42 31 42 32 L42.5 43 L41.5 43 L41.5 52 C41.5 53 40.5 53.5 39.5 53.5 C38.5 53.5 37.5 53 37.5 52 L37.5 45 L36.5 45 L36.5 52 C36.5 53 35.5 53.5 34.5 53.5 C33.5 53.5 32.5 53 32.5 52 L32.5 43 L31.5 43 Z" />
    <circle cx="48" cy="28" r="3.2" />
    <path d="M45.5 34 C45.5 33 46.5 32.5 48 32.5 C49.5 32.5 50.5 33 50.5 34 L52 44 L50.5 44 L51 52 C51 53 50 53.5 49 53.5 C48 53.5 47 53 47 52 L46.5 46 L45.5 52 C45.5 53 44.5 53.5 43.5 53.5 C42.5 53.5 41.5 53 41.5 52 L42.5 44 L41 44 Z" />
  </svg>
);

// SDG 2: Zero Hunger (Steaming bowl)
export const Sdg2Icon = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className} aria-label="Zero Hunger">
    <path d="M12 30 C12 45 20 52 32 52 C44 52 52 45 52 30 Z" fill="currentColor" fillOpacity="0.15" />
    <path d="M9 30 L55 30" strokeWidth="4" />
    <path d="M24 52 L40 52" strokeWidth="4" />
    <path d="M22 22 C20 18 24 14 22 10" />
    <path d="M32 23 C30 18 34 13 32 8" />
    <path d="M42 22 C40 18 44 14 42 10" />
  </svg>
);

// SDG 3: Good Health and Well-Being (Heartbeat ECG & Heart)
export const Sdg3Icon = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-label="Good Health">
    <path d="M46 16 C42 16 39.5 19 39.5 21 C39.5 19 37 16 33 16 C28.5 16 26 20 26 24 C26 31 39.5 40 39.5 40 C39.5 40 53 31 53 24 C53 20 50.5 16 46 16 Z" fill="currentColor" fillOpacity="0.2" strokeWidth="2.5" />
    <path d="M8 35 L20 35 L24 23 L28 47 L33 28 L37 39 L40 35 L56 35" strokeWidth="3.6" />
  </svg>
);

// SDG 4: Quality Education (Open book & pencil)
export const Sdg4Icon = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-label="Quality Education">
    <path d="M32 24 C24 20 14 21 8 23 L8 49 C14 47 24 46 32 50 Z" fill="currentColor" fillOpacity="0.15" />
    <path d="M32 24 C40 20 50 21 56 23 L56 49 C50 47 40 46 32 50 Z" fill="currentColor" fillOpacity="0.15" />
    <path d="M32 24 L32 50" strokeWidth="3.2" />
    <path d="M44 10 L47 13 L28 32 L25 32 L25 29 Z" fill="currentColor" />
  </svg>
);

// SDG 5: Gender Equality (Scale with equal sign)
export const Sdg5Icon = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className} aria-label="Gender Equality">
    <path d="M32 14 L32 52" strokeWidth="3.5" />
    <path d="M22 52 L42 52" strokeWidth="3.5" />
    <path d="M14 20 L50 20" strokeWidth="3.5" />
    <path d="M14 20 L9 33 L19 33 Z" fill="currentColor" fillOpacity="0.2" />
    <path d="M7 33 L21 33" strokeWidth="3" />
    <path d="M50 20 L45 33 L55 33 Z" fill="currentColor" fillOpacity="0.2" />
    <path d="M43 33 L57 33" strokeWidth="3" />
    <circle cx="32" cy="34" r="8" fill="currentColor" fillOpacity="0.2" strokeWidth="2.5" />
    <path d="M28 32 L36 32" strokeWidth="2.5" />
    <path d="M28 36 L36 36" strokeWidth="2.5" />
  </svg>
);

// SDG 6: Clean Water and Sanitation (Water drop & glass)
export const Sdg6Icon = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg viewBox="0 0 64 64" fill="currentColor" className={className} aria-label="Clean Water">
    <path d="M32 8 C32 8 20 24 20 32 C20 38.6 25.4 44 32 44 C38.6 44 44 38.6 44 32 C44 24 32 8 32 8 Z" fillOpacity="0.9" />
    <path d="M26 31 C26 27 30 21 31 19 C30 23 28 29 31 33 C32 34 30 36 28 35 C27 34 26 33 26 31 Z" fill="white" fillOpacity="0.6" />
    <path d="M16 42 L19 54 C19.5 56 21 57 23 57 L41 57 C43 57 44.5 56 45 54 L48 42" stroke="currentColor" strokeWidth="3.5" fill="none" strokeLinecap="round" />
    <path d="M14 42 L50 42" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
  </svg>
);

// SDG 7: Affordable and Clean Energy (Sun with power icon)
export const Sdg7Icon = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className} aria-label="Clean Energy">
    <circle cx="32" cy="32" r="14" fill="currentColor" fillOpacity="0.25" strokeWidth="3.2" />
    <path d="M32 24 L32 33" strokeWidth="3.5" />
    <path d="M26 28 C24 30 24 35 27 38 C30 41 35 41 38 38 C40 35 40 30 38 28" strokeWidth="3" />
    <path d="M32 8 L32 14" strokeWidth="3.5" />
    <path d="M32 50 L32 56" strokeWidth="3.5" />
    <path d="M8 32 L14 32" strokeWidth="3.5" />
    <path d="M50 32 L56 32" strokeWidth="3.5" />
    <path d="M15 15 L20 20" strokeWidth="3.5" />
    <path d="M44 44 L49 49" strokeWidth="3.5" />
    <path d="M15 49 L20 44" strokeWidth="3.5" />
    <path d="M44 20 L49 15" strokeWidth="3.5" />
  </svg>
);

// SDG 8: Decent Work and Economic Growth (Ascending chart with arrow & person)
export const Sdg8Icon = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg viewBox="0 0 64 64" fill="currentColor" className={className} aria-label="Decent Work">
    <rect x="12" y="42" width="8" height="12" rx="1.5" />
    <rect x="23" y="34" width="8" height="20" rx="1.5" />
    <rect x="34" y="26" width="8" height="28" rx="1.5" />
    <rect x="45" y="18" width="8" height="36" rx="1.5" />
    <path d="M12 36 L30 22 L40 28 L53 13" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <path d="M44 12 L54 12 L54 22" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

// SDG 10: Reduced Inequalities (Equalizing arrows)
export const Sdg10Icon = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg viewBox="0 0 64 64" fill="currentColor" className={className} aria-label="Reduced Inequalities">
    <rect x="12" y="20" width="40" height="7" rx="3" />
    <rect x="12" y="37" width="40" height="7" rx="3" />
    <path d="M32 10 L38 17 L26 17 Z" />
    <path d="M32 54 L26 47 L38 47 Z" />
  </svg>
);

// SDG 13: Climate Action (Eye with globe pupil)
export const Sdg13Icon = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg viewBox="0 0 64 64" fill="currentColor" className={className} aria-label="Climate Action">
    <path d="M32 16 C17 16 7 32 7 32 C7 32 17 48 32 48 C47 48 57 32 57 32 C57 32 47 16 32 16 Z" fill="none" stroke="currentColor" strokeWidth="3.6" />
    <circle cx="32" cy="32" r="11" fill="currentColor" fillOpacity="0.25" stroke="currentColor" strokeWidth="2.5" />
    <path d="M26 27 C28 26 31 28 32 29 C34 27 37 26 38 29 C37 32 35 34 33 36 C32 38 29 37 28 35 Z" fill="currentColor" />
  </svg>
);

// SDG 17: Partnerships for the Goals (Interlocking rings)
export const Sdg17Icon = ({ className = "w-12 h-12" }: { className?: string }) => (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="3.4" className={className} aria-label="Partnerships">
    <circle cx="32" cy="23" r="10.5" strokeOpacity="0.9" />
    <circle cx="22" cy="36" r="10.5" strokeOpacity="0.9" />
    <circle cx="42" cy="36" r="10.5" strokeOpacity="0.9" />
    <circle cx="26" cy="46" r="10.5" strokeOpacity="0.9" />
    <circle cx="38" cy="46" r="10.5" strokeOpacity="0.9" />
  </svg>
);

/* =========================================================================
   OFFICIAL 17-COLOR SDG CIRCULAR WHEEL SVG
   ========================================================================= */
const SDG_COLORS = [
  "#E5243B", "#DDA63A", "#4C9F38", "#C5192D", "#FF3A21", "#26BDE2",
  "#FCC30B", "#A21942", "#FD6925", "#DD1367", "#FD9D24", "#BF8B2E",
  "#3F7E44", "#0A97D9", "#56C02B", "#00689D", "#19486A"
];

export const SdgWheel = ({ size = 28, className = "" }: { size?: number; className?: string }) => {
  const center = 50;
  const outerR = 46;
  const innerR = 26;
  const angleStep = 360 / 17;

  return (
    <svg 
      viewBox="0 0 100 100" 
      width={size} 
      height={size} 
      className={`inline-block select-none ${className}`}
      aria-label="UN SDG Color Wheel"
    >
      <circle cx={center} cy={center} r={innerR - 1} fill="white" />
      {SDG_COLORS.map((color, i) => {
        const startDeg = i * angleStep - 90;
        const endDeg = (i + 1) * angleStep - 90 - 0.7;
        const startRad = (startDeg * Math.PI) / 180;
        const endRad = (endDeg * Math.PI) / 180;

        const x1 = center + outerR * Math.cos(startRad);
        const y1 = center + outerR * Math.sin(startRad);
        const x2 = center + outerR * Math.cos(endRad);
        const y2 = center + outerR * Math.sin(endRad);
        const x3 = center + innerR * Math.cos(endRad);
        const y3 = center + innerR * Math.sin(endRad);
        const x4 = center + innerR * Math.cos(startRad);
        const y4 = center + innerR * Math.sin(startRad);

        const d = `M ${x1} ${y1} A ${outerR} ${outerR} 0 0 1 ${x2} ${y2} L ${x3} ${y3} A ${innerR} ${innerR} 0 0 0 ${x4} ${y4} Z`;
        return <path key={i} d={d} fill={color} />;
      })}
    </svg>
  );
};

/* =========================================================================
   VERC CORE FOCUS 11 SDGs DATA REGISTRY
   ========================================================================= */
export interface SdgItem {
  id: number;
  titleEn: string;
  titleBn: string;
  subtitleEn: string;
  subtitleBn: string;
  color: string;
  vercTagEn: string;
  vercTagBn: string;
  vercDescEn: string;
  vercDescBn: string;
  unTargetEn: string;
  unTargetBn: string;
  impactStatEn: string;
  impactStatBn: string;
  programSlug?: string;
  IconComponent: React.FC<{ className?: string }>;
}

export const VERC_SDG_GOALS: SdgItem[] = [
  {
    id: 1,
    titleEn: "NO POVERTY",
    titleBn: "দারিদ্র্য বিমোচন",
    subtitleEn: "End poverty in all its forms everywhere",
    subtitleBn: "সর্বত্র সকল ধরণের দারিদ্র্যের অবসান",
    color: "#E5243B",
    vercTagEn: "Microfinance & Livelihood",
    vercTagBn: "ক্ষুদ্রঋণ ও জীবিকা উন্নয়ন",
    vercDescEn: "Targeted livelihood financing, skills development, and women micro-entrepreneurship loans designed to lift disadvantaged families out of extreme poverty.",
    vercDescBn: "সুবিধাবঞ্চিত ও প্রান্তিক জনগোষ্ঠীর অর্থনৈতিক স্বাবলম্বিতা নিশ্চিত করতে ক্ষুদ্রঋণ, কারিগরি প্রশিক্ষণ ও জীবিকায়ন প্রকল্প।",
    unTargetEn: "By 2030, eradicate extreme poverty for all people everywhere, currently measured as people living on less than $2.15 a day.",
    unTargetBn: "২০৩০ সালের মধ্যে বিশ্বব্যাপী চরম দারিদ্র্যের শিকার মানুষের হার শূন্যে নামিয়ে আনা।",
    impactStatEn: "350,000+ Families Empowered",
    impactStatBn: "৩,৫০,০০০+ স্বাবলম্বী পরিবার",
    programSlug: "livelihood",
    IconComponent: Sdg1Icon,
  },
  {
    id: 2,
    titleEn: "ZERO HUNGER",
    titleBn: "ক্ষুধা মুক্তি",
    subtitleEn: "End hunger, achieve food security and improved nutrition",
    subtitleBn: "ক্ষুধার অবসান, খাদ্য নিরাপত্তা ও পুষ্টিমান উন্নয়ন",
    color: "#DDA63A",
    vercTagEn: "Agro-Enterprises & Nutrition",
    vercTagBn: "কৃষি উদ্যোগ ও পুষ্টি সুরক্ষা",
    vercDescEn: "Promoting climate-resilient farming, household vegetable farming, livestock rearing, and maternal-infant nutritional awareness in rural communities.",
    vercDescBn: "গ্রামীণ পুষ্টি উন্নয়ন, জলবায়ু-সহনশীল কৃষিপদ্ধতি এবং মা ও শিশুদের জন্য পুষ্টিকর খাদ্যাভ্যাস গড়ে তোলার কার্যক্রম।",
    unTargetEn: "End hunger and ensure access by all people, in particular the poor and vulnerable, to safe, nutritious and sufficient food all year round.",
    unTargetBn: "সকল নাগরিকের জন্য সারাবছর নিরাপদ, পর্যাপ্ত ও পুষ্টিকর খাবারের প্রাপ্যতা নিশ্চিতকরণ।",
    impactStatEn: "120,000+ Farmers & Households",
    impactStatBn: "১,২০,০০০+ কৃষক ও পুষ্টিকর গৃহস্থালী",
    programSlug: "livelihood",
    IconComponent: Sdg2Icon,
  },
  {
    id: 3,
    titleEn: "GOOD HEALTH & WELL-BEING",
    titleBn: "সুস্বাস্থ্য ও কল্যাণ",
    subtitleEn: "Ensure healthy lives and promote well-being for all at all ages",
    subtitleBn: "সকল বয়সী মানুষের সুস্বাস্থ্য ও সার্বিক কল্যাণ নিশ্চিতকরণ",
    color: "#4C9F38",
    vercTagEn: "Mother & Child Hospitals",
    vercTagBn: "মা ও শিশু হাসপাতাল সেবা",
    vercDescEn: "Operating dedicated 20-bed mother and child hospitals in Savar and Mirsarai, delivering safe institutional deliveries, antenatal care, and primary healthcare clinics.",
    vercDescBn: "সাভার ও মীরসরাইয়ে বিশেষায়িত মা ও শিশু হাসপাতাল পরিচালনা এবং তৃণমূল পর্যায়ে নিরাপদ প্রসব ও প্রতিরোধমূলক স্বাস্থ্যসেবা।",
    unTargetEn: "Reduce global maternal mortality ratio to less than 70 per 100,000 live births and end preventable deaths of newborns and children.",
    unTargetBn: "মাতৃমৃত্যু এবং নবজাতকের প্রতিরোধযোগ্য মৃত্যুর হার ন্যূনতম পর্যায়ে নামিয়ে আনা।",
    impactStatEn: "200,000+ Clinical Consultations",
    impactStatBn: "২,০০,০০০+ চিকিৎসা সেবা প্রদান",
    programSlug: "wash",
    IconComponent: Sdg3Icon,
  },
  {
    id: 4,
    titleEn: "QUALITY EDUCATION",
    titleBn: "গুণগত শিক্ষা",
    subtitleEn: "Ensure inclusive and equitable quality education",
    subtitleBn: "অন্তর্ভুক্তিমূলক ও সমতাভিত্তিক মানসম্মত শিক্ষা",
    color: "#C5192D",
    vercTagEn: "Community Schools & ECD",
    vercTagBn: "কমিউনিটি বিদ্যালয় ও প্রাক-প্রাথমিক",
    vercDescEn: "Pioneering non-formal primary schools, child-centered interactive curriculum, indigenous minority learning, and early childhood development (ECD) centers.",
    vercDescBn: "ঝরে পড়া ও সুবিধাবঞ্চিত শিশুদের জন্য আনন্দঘন পদ্ধতিতে শিখন, কমিউনিটি স্কুল ও প্রাক-প্রাথমিক শিক্ষা কর্মসূচি।",
    unTargetEn: "Ensure that all girls and boys complete free, equitable and quality primary and secondary education leading to relevant learning outcomes.",
    unTargetBn: "সকল কন্যা ও পুত্রশিশুর জন্য সমতাভিত্তিক এবং মানসম্মত প্রাথমিক ও মাধ্যমিক শিক্ষা নিশ্চিতকরণ।",
    impactStatEn: "1,200+ Learning Centers Run",
    impactStatBn: "১,২০০+ শিখন কেন্দ্র পরিচালিত",
    programSlug: "education",
    IconComponent: Sdg4Icon,
  },
  {
    id: 5,
    titleEn: "GENDER EQUALITY",
    titleBn: "জেন্ডার সমতা",
    subtitleEn: "Achieve gender equality and empower all women and girls",
    subtitleBn: "জেন্ডার সমতা অর্জন এবং সকল নারী ও কন্যাশিশুর ক্ষমতায়ন",
    color: "#FF3A21",
    vercTagEn: "Women Empowerment & Leadership",
    vercTagBn: "নারী নেতৃত্ব ও অর্থনৈতিক স্বাধীনতা",
    vercDescEn: "95% of VERC's microfinance members are women. We foster female leadership in water-sanitation committees, anti-GBV campaigns, and rural entrepreneurship.",
    vercDescBn: "ভার্কের ঋণ গ্রহীতাদের ৯৫% নারী। স্থানীয় পানি-স্যানিটেশন ব্যবস্থাপনা ও সামাজিক নেতৃত্বে নারীদের প্রত্যক্ষ অংশগ্রহণ নিশ্চিতকরণ।",
    unTargetEn: "End all forms of discrimination against all women and girls everywhere and ensure women's full and effective participation.",
    unTargetBn: "নারীদের প্রতি সকল বৈষম্যের অবসান এবং নীতিনির্ধারণী পর্যায়ে নারীদের পূর্ণ অংশগ্রহণ নিশ্চিত করা।",
    impactStatEn: "95% Female Loan Members",
    impactStatBn: "৯৫% নারী উদ্যোক্তা ও সদস্য",
    programSlug: "capacity",
    IconComponent: Sdg5Icon,
  },
  {
    id: 6,
    titleEn: "CLEAN WATER & SANITATION",
    titleBn: "নিরাপদ পানি ও স্যানিটেশন",
    subtitleEn: "Ensure availability and sustainable management of water and sanitation",
    subtitleBn: "সকলের জন্য নিরাপদ পানি ও টেকসই স্যানিটেশনের নিশ্চয়তা",
    color: "#26BDE2",
    vercTagEn: "Global CLTS Pioneers",
    vercTagBn: "সিএলটিএস স্যানিটেশনের বৈশ্বিক অগ্রদূত",
    vercDescEn: "Pioneered Community-Led Total Sanitation (CLTS) in 2000 in Rajshahi, now replicated in 60+ countries. Installing arsenic-safe piped water systems and 100% sanitized villages.",
    vercDescBn: "২০০০ সালে ভার্কের উদ্ভাবিত সিএলটিএস পদ্ধতি বর্তমানে বিশ্বের ৬০টির বেশি দেশে সফলভাবে অনুসৃত। আর্সেনিকমুক্ত নিরাপদ পানি ও শতভাগ স্যানিটেশন।",
    unTargetEn: "By 2030, achieve universal and equitable access to safe and affordable drinking water and adequate sanitation and hygiene for all.",
    unTargetBn: "২০৩০ সালের মধ্যে সকলের জন্য সুলভ মূল্যে নিরাপদ পানীয় জল এবং স্বাস্থ্যসম্মত স্যানিটেশন সেবা নিশ্চিতকরণ।",
    impactStatEn: "5.5M+ People with Safe WASH",
    impactStatBn: "৫৫ লাখ+ মানুষ নিরাপদ স্যানিটেশনের আওতায়",
    programSlug: "wash",
    IconComponent: Sdg6Icon,
  },
  {
    id: 7,
    titleEn: "AFFORDABLE & CLEAN ENERGY",
    titleBn: "সাশ্রয়ী ও পরিবেশবান্ধব জ্বালানি",
    subtitleEn: "Ensure access to affordable, reliable, sustainable and modern energy",
    subtitleBn: "সকলের জন্য সাশ্রয়ী, নির্ভরযোগ্য ও আধুনিক জ্বালানির নিশ্চয়তা",
    color: "#FCC30B",
    vercTagEn: "Bondhon Chula (ICS) Since 1987",
    vercTagBn: "বন্ধন উন্নত চুলা কর্মসূচি (১৯৮৭ থেকে)",
    vercDescEn: "National pioneers of the Improved Cook Stove (ICS / Bondhon Chula). Over 2 million smokeless stoves installed, saving millions of trees and protecting rural mothers from lung disease.",
    vercDescBn: "১৯৮৭ সাল থেকে ভার্ক উন্নত 'বন্ধন চুলা' প্রচলন করে। ধোঁয়াহীন চুলা ব্যবহারের মাধ্যমে জ্বালানি কাঠ সাশ্রয় এবং গ্রামীণ মায়েদের ফুসফুসের সুরক্ষা।",
    unTargetEn: "Ensure universal access to affordable, reliable and modern energy services and increase substantially the share of renewable energy.",
    unTargetBn: "আধুনিক ও পরিচ্ছন্ন জ্বালানি সেবার সার্বজনীন প্রাপ্যতা এবং নবায়নযোগ্য জ্বালানির ব্যবহার বৃদ্ধি।",
    impactStatEn: "2 Million+ Improved Stoves",
    impactStatBn: "২০ লাখ+ উন্নত বন্ধন চুলা বাস্তবায়িত",
    programSlug: "capacity",
    IconComponent: Sdg7Icon,
  },
  {
    id: 8,
    titleEn: "DECENT WORK & ECONOMIC GROWTH",
    titleBn: "শোভন কাজ ও অর্থনৈতিক প্রবৃদ্ধি",
    subtitleEn: "Promote inclusive and sustainable economic growth and productive employment",
    subtitleBn: "টেকসই অর্থনৈতিক প্রবৃদ্ধি এবং সকলের জন্য উপযুক্ত কর্মসংস্থান",
    color: "#A21942",
    vercTagEn: "Vocational & Micro-Enterprise",
    vercTagBn: "কারিগরি প্রশিক্ষণ ও ক্ষুদ্র উদ্যোগ",
    vercDescEn: "Providing market-oriented skills training, electrical, tailoring, and agro-processing vocational courses that enable youth and women to build resilient micro-enterprises.",
    vercDescBn: "যুবসমাজ ও নারীদের বাস্তবমুখী কারিগরি ও বৃত্তিমূলক প্রশিক্ষণ প্রদানের মাধ্যমে সম্মানজনক কর্মসংস্থান ও আয়ের পথ তৈরি।",
    unTargetEn: "Promote development-oriented policies that support productive activities, decent job creation, entrepreneurship, and creativity.",
    unTargetBn: "উৎপাদনশীল কর্মকাণ্ড, শোভন কর্মসংস্থান সৃষ্টি ও ক্ষুদ্র উদ্যোক্তা তৈরির অনুকূল পরিবেশ গঠন।",
    impactStatEn: "85,000+ Youths & Women Trained",
    impactStatBn: "৮৫,০০০+ তরুণ ও নারী প্রশিক্ষণপ্রাপ্ত",
    programSlug: "livelihood",
    IconComponent: Sdg8Icon,
  },
  {
    id: 10,
    titleEn: "REDUCED INEQUALITIES",
    titleBn: "বৈষম্য হ্রাস",
    subtitleEn: "Reduce inequality within and among countries",
    subtitleBn: "দেশীয় ও সামাজিক সকল ধরনের বৈষম্য দূরীকরণ",
    color: "#DD1367",
    vercTagEn: "Social Inclusion & Hard-to-Reach",
    vercTagBn: "সামাজিক অন্তর্ভুক্তি ও প্রান্তিক সেবা",
    vercDescEn: "Focusing squarely on ethnic minorities, persons with disabilities, female-headed households, and climate migrants who are left out of mainstream services.",
    vercDescBn: "প্রতিবন্ধী ব্যক্তি, ক্ষুদ্র নৃগোষ্ঠী এবং পিছিয়ে পড়া চর ও দূরবর্তী অঞ্চলের মানুষের মৌলিক অধিকার ও নাগরিক সেবার অন্তর্ভুক্তি।",
    unTargetEn: "Empower and promote the social, economic and political inclusion of all, irrespective of age, sex, disability, race, ethnicity, origin, or religion.",
    unTargetBn: "বয়স, লিঙ্গ, প্রতিবন্ধিতা, ধর্ম বা জাতিসত্তা নির্বিশেষে সকলের সামাজিক ও অর্থনৈতিক অন্তর্ভুক্তি নিশ্চিতকরণ।",
    impactStatEn: "45,000+ Marginalized Beneficiaries",
    impactStatBn: "৪৫,০০০+ প্রান্তিক ও বিশেষ চাহিদাসম্পন্ন মানুষ",
    programSlug: "capacity",
    IconComponent: Sdg10Icon,
  },
  {
    id: 13,
    titleEn: "CLIMATE ACTION",
    titleBn: "জলবায়ু কার্যক্রম",
    subtitleEn: "Take urgent action to combat climate change and its impacts",
    subtitleBn: "জলবায়ু পরিবর্তন ও এর বিরূপ প্রভাব মোকাবিলায় জরুরি পদক্ষেপ",
    color: "#3F7E44",
    vercTagEn: "Community Disaster Preparedness",
    vercTagBn: "দুর্যোগ সহনশীলতা ও অভিযোজন",
    vercDescEn: "Constructing disaster-resilient plinths, raised tube-wells in flood zones, coastal cyclone evacuation preparedness, and community volunteer rescue brigades.",
    vercDescBn: "বন্যাপ্রবণ ও উপকূলীয় এলাকায় উঁচুকৃত নলকূপ, ঘূর্ণিঝড় মোকাবিলায় স্বেচ্ছাসেবক দল গঠন ও জলবায়ু সহনশীল জীবনব্যবস্থা।",
    unTargetEn: "Strengthen resilience and adaptive capacity to climate-related hazards and natural disasters in all countries.",
    unTargetBn: "প্রাকৃতিক দুর্যোগ ও জলবায়ু পরিবর্তনের ঝুঁকি মোকাবিলায় সহনশীলতা ও অভিযোজন ক্ষমতা বৃদ্ধি।",
    impactStatEn: "60+ Coastal Upazilas Supported",
    impactStatBn: "৬০+ উপকূলীয় ও দুর্যোগপ্রবণ উপজেলা",
    programSlug: "capacity",
    IconComponent: Sdg13Icon,
  },
  {
    id: 17,
    titleEn: "PARTNERSHIPS FOR THE GOALS",
    titleBn: "লক্ষ্য অর্জনে অংশীদারিত্ব",
    subtitleEn: "Strengthen the means of implementation and revitalize the global partnership",
    subtitleBn: "টেকসই উন্নয়নের জন্য বৈশ্বিক অংশীদারিত্ব জোরদার করা",
    color: "#19486A",
    vercTagEn: "Global & National Alliances",
    vercTagBn: "আন্তর্জাতিক ও জাতীয় জোট",
    vercDescEn: "Collaborating with UNICEF, World Bank, WaterAid, PKSF, Government of Bangladesh, and international research universities to scale grassroots innovation.",
    vercDescBn: "ইউনিসেফ, বিশ্বব্যাংক, পিকেএসএফ, বাংলাদেশ সরকার এবং ওয়াটারএইডের সাথে যৌথভাবে জাতীয় নীতি ও তৃণমূল বাস্তবায়ন।",
    unTargetEn: "Enhance the Global Partnership for Sustainable Development, complemented by multi-stakeholder partnerships that mobilize knowledge and expertise.",
    unTargetBn: "টেকসই উন্নয়ন লক্ষ্য অর্জনে পারস্পরিক জ্ঞান, আর্থিক ও প্রযুক্তিগত অংশীদারিত্ব জোরদার করা।",
    impactStatEn: "45+ Global & National Partners",
    impactStatBn: "৪৫+ বৈশ্বিক ও জাতীয় অংশীদার",
    programSlug: "partners",
    IconComponent: Sdg17Icon,
  },
];

/* =========================================================================
   MAIN INTERACTIVE COMPONENT (11 VERC CORE GOALS ONLY)
   ========================================================================= */
export default function SdgSection() {
  const { language } = useLanguage();
  const [selectedGoal, setSelectedGoal] = useState<SdgItem | null>(null);

  const isBn = language === "bn";

  return (
    <section className="relative py-28 lg:py-36 bg-gradient-to-b from-slate-50 via-white to-slate-100/70 overflow-hidden">
      {/* Background Subtle Tech/Geometric World Grid Lines */}
      <div className="absolute inset-0 bg-[radial-gradient(#004B8D_1px,transparent_1px)] [background-size:28px_28px] opacity-[0.035] pointer-events-none" />

      {/* Ambient subtle colored atmospheric blurs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-32 w-96 h-96 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 left-1/3 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

      <div className="container-custom relative z-10">
        {/* ===================================================================
            SECTION HEADER: Official UN SDG Brand Identity & Mission
            =================================================================== */}
        <div className="max-w-4xl mx-auto text-center mb-16 lg:mb-20">
          {/* Official SDG Color Wheel Header Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/95 shadow-sm border border-slate-200/80 mb-6 backdrop-blur-md"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="flex items-center justify-center shrink-0"
            >
              <SdgWheel size={26} />
            </motion.div>
            <span className="text-xs sm:text-sm font-extrabold tracking-wider uppercase bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
              {isBn ? "জাতিসংঘ টেকসই উন্নয়ন লক্ষ্যমাত্রা • এজেন্ডা ২০৩০" : "UN Sustainable Development Goals • Agenda 2030"}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </motion.div>

          {/* Heading */}
          <motion.h2 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className={`text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight ${isBn ? "leading-tight" : "leading-[1.1]"}`}
          >
            {isBn ? (
              <>
                টেকসই উন্নয়ন লক্ষ্যমাত্রা <span className="text-brand-primary">(SDGs)</span> <br />
                <span className="bg-gradient-to-r from-brand-primary via-emerald-600 to-teal-500 bg-clip-text text-transparent">
                  অর্জনে ভার্কের সুদূরপ্রসারী ভূমিকা
                </span>
              </>
            ) : (
              <>
                Championing the <span className="bg-gradient-to-r from-brand-primary via-emerald-600 to-teal-600 bg-clip-text text-transparent">Global Goals</span>
              </>
            )}
          </motion.h2>

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-base sm:text-lg lg:text-xl text-slate-600 font-medium leading-relaxed max-w-3xl mx-auto"
          >
            {isBn 
              ? "ভার্ক তৃণমূল পর্যায়ে উচ্চ-প্রভাবশালী সামাজিক কর্মসূচির মাধ্যমে জাতিসংঘের ১১টি মূল টেকসই উন্নয়ন লক্ষ্যমাত্রা অর্জনে সরাসরি কাজ করছে।"
              : "Village Education Resource Center (VERC) is actively accelerating 11 core United Nations Sustainable Development Goals across Bangladesh through high-impact community programs."
            }
          </motion.p>
        </div>

        {/* ===================================================================
            SDGs INTERACTIVE CARDS: Centered, Symmetrical, and Balanced
            Layout automatically centers lines so 6 + 5 looks harmonious!
            =================================================================== */}
        <div className="flex flex-wrap justify-center items-stretch gap-4 sm:gap-5 lg:gap-6 max-w-6xl mx-auto">
          {VERC_SDG_GOALS.map((sdg, index) => {
            const Icon = sdg.IconComponent;
            return (
              <motion.div
                key={sdg.id}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.04 }}
                onClick={() => setSelectedGoal(sdg)}
                className="group relative cursor-pointer w-[calc(50%-8px)] sm:w-[calc(33.333%-14px)] md:w-[calc(25%-16px)] lg:w-[calc(16.666%-20px)] min-w-[160px] max-w-[200px]"
              >
                {/* Outer Card with exact official SDG color */}
                <div 
                  style={{ 
                    backgroundColor: sdg.color,
                    boxShadow: "0 10px 25px -5px rgba(0,0,0,0.18)"
                  }}
                  className="relative h-full min-h-[220px] sm:min-h-[250px] p-4 sm:p-5 rounded-[26px] text-white overflow-hidden transition-all duration-500 hover:-translate-y-2.5 hover:shadow-[0_25px_45px_-10px_rgba(0,0,0,0.38)] flex flex-col justify-between border border-white/25 group-hover:border-white/50"
                >
                  {/* Top liquid light shimmer streak */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

                  {/* Faint giant watermark number in the background */}
                  <div className="absolute -top-3 -right-2 text-7xl sm:text-8xl font-black text-white/[0.12] select-none pointer-events-none group-hover:scale-110 group-hover:text-white/[0.18] transition-all duration-500">
                    {sdg.id}
                  </div>

                  {/* TOP HEADER: Goal Number & Official Title */}
                  <div className="relative z-10">
                    <div className="flex items-start justify-between">
                      <span className="text-2xl sm:text-3xl font-black tracking-tighter leading-none text-white drop-shadow-xs">
                        {sdg.id}
                      </span>
                      
                      <span className="inline-flex items-center gap-1 text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-black/25 text-white/95 backdrop-blur-xs border border-white/20">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        VERC
                      </span>
                    </div>

                    <h3 className="mt-2 text-xs sm:text-[13px] font-black uppercase tracking-tight leading-snug text-white drop-shadow-xs line-clamp-2">
                      {isBn ? sdg.titleBn : sdg.titleEn}
                    </h3>
                  </div>

                  {/* CENTER: Official UN SDG Handcrafted Vector Pictogram */}
                  <div className="relative z-10 my-auto py-2 flex items-center justify-center">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 text-white transform group-hover:scale-115 group-hover:-translate-y-1 transition-transform duration-500 drop-shadow-md">
                      <Icon className="w-full h-full" />
                    </div>
                  </div>

                  {/* BOTTOM: VERC Action Tag & Micro-CTA */}
                  <div className="relative z-10 pt-2 border-t border-white/20">
                    <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-bold text-white/90">
                      <span className="truncate pr-1.5">
                        {isBn ? sdg.vercTagBn : sdg.vercTagEn}
                      </span>
                      <div className="w-5 h-5 rounded-full bg-white/20 group-hover:bg-white group-hover:text-slate-900 flex items-center justify-center text-white transition-all duration-300 shrink-0">
                        <ArrowRight size={11} strokeWidth={2.8} />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ===================================================================
            NATIONAL IMPACT BANNER TICKER: Real Achievements in Bangladesh
            =================================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 sm:mt-20 p-6 sm:p-8 rounded-[32px] bg-white shadow-xl border border-slate-200/80 backdrop-blur-md max-w-5xl mx-auto"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-100 text-center">
            <div className="pt-3 md:pt-0">
              <div className="text-2xl sm:text-4xl font-black text-brand-primary">11 Goals</div>
              <div className="text-xs sm:text-sm font-bold text-slate-700 mt-1">
                {isBn ? "সক্রিয় এসডিজি অংশীদারিত্ব" : "VERC Priority Goals"}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                {isBn ? "সরাসরি মাঠপর্যায়ে বাস্তবায়িত" : "Direct On-The-Ground Action"}
              </div>
            </div>

            <div className="pt-3 md:pt-0">
              <div className="text-2xl sm:text-4xl font-black text-emerald-600">5.5M+</div>
              <div className="text-xs sm:text-sm font-bold text-slate-700 mt-1">
                {isBn ? "নিরাপদ স্যানিটেশন সুবিধাভোগী" : "Beneficiaries Reached"}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                {isBn ? "সিএলটিএস বিপ্লবের মাধ্যমে" : "Through CLTS Model"}
              </div>
            </div>

            <div className="pt-3 md:pt-0">
              <div className="text-2xl sm:text-4xl font-black text-amber-500">2M+</div>
              <div className="text-xs sm:text-sm font-bold text-slate-700 mt-1">
                {isBn ? "উন্নত বন্ধন চুলা বাস্তবায়িত" : "Bondhon Clean Stoves"}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                {isBn ? "১৯৮৭ সাল থেকে পরিবেশবান্ধব জ্বালানি" : "Clean Energy Since 1987"}
              </div>
            </div>

            <div className="pt-3 md:pt-0">
              <div className="text-2xl sm:text-4xl font-black text-rose-500">60+</div>
              <div className="text-xs sm:text-sm font-bold text-slate-700 mt-1">
                {isBn ? "দেশে সিএলটিএস অনুসৃত" : "Countries Adopted CLTS"}
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                {isBn ? "বিশ্বব্যাপী সমাদৃত মডেল" : "Pioneered by VERC in 2000"}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ===================================================================
          INTERACTIVE SDG DETAILS MODAL
          Opens when ANY SDG card is clicked!
          =================================================================== */}
      <AnimatePresence>
        {selectedGoal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop with rich blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedGoal(null)}
              className="fixed inset-0 bg-slate-950/70 backdrop-blur-md transition-opacity"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-2xl bg-white rounded-[36px] shadow-2xl overflow-hidden border border-slate-200 z-10"
            >
              {/* Modal Color Banner Header */}
              <div 
                style={{ backgroundColor: selectedGoal.color }}
                className="p-6 sm:p-8 text-white relative overflow-hidden"
              >
                {/* Background Giant Watermark Number */}
                <div className="absolute -top-6 -right-4 text-9xl font-black text-white/15 select-none pointer-events-none">
                  {selectedGoal.id}
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setSelectedGoal(null)}
                  className="absolute top-5 right-5 w-10 h-10 rounded-full bg-black/20 hover:bg-black/40 text-white flex items-center justify-center transition-colors backdrop-blur-xs"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>

                <div className="relative z-10 flex items-center gap-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/20 p-2.5 backdrop-blur-xs flex items-center justify-center shadow-inner shrink-0">
                    <selectedGoal.IconComponent className="w-full h-full text-white" />
                  </div>
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/25 text-white/95 text-xs font-black uppercase tracking-wider backdrop-blur-xs mb-2">
                      <span>{isBn ? `এসডিজি লক্ষ্য ${selectedGoal.id}` : `UN SDG GOAL ${selectedGoal.id}`}</span>
                      <span>•</span>
                      <span className="text-emerald-300">{isBn ? "ভার্ক অগ্রাধিকার" : "VERC Core Focus"}</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black tracking-tight leading-tight">
                      {isBn ? selectedGoal.titleBn : selectedGoal.titleEn}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/85 font-medium mt-1">
                      {isBn ? selectedGoal.subtitleBn : selectedGoal.subtitleEn}
                    </p>
                  </div>
                </div>
              </div>

              {/* Modal Body Content */}
              <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
                {/* UN Official Target */}
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-1.5">
                    <Target size={14} className="text-brand-primary" />
                    {isBn ? "জাতিসংঘ ২০৩০ সুনির্দিষ্ট লক্ষ্য" : "UN 2030 Official Target"}
                  </div>
                  <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed">
                    {isBn ? selectedGoal.unTargetBn : selectedGoal.unTargetEn}
                  </p>
                </div>

                {/* VERC Direct Action in Bangladesh */}
                <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200/70">
                  <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-emerald-800 mb-1.5">
                    <CheckCircle2 size={15} className="text-emerald-600" />
                    {isBn ? "মাঠপর্যায়ে ভার্কের ভূমিকা ও অবদান" : "VERC's On-The-Ground Contribution in Bangladesh"}
                  </div>
                  <p className="text-sm sm:text-base text-emerald-950 font-medium leading-relaxed">
                    {isBn ? selectedGoal.vercDescBn : selectedGoal.vercDescEn}
                  </p>
                </div>

                {/* Key Metric Badge */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-100/80 border border-slate-200">
                  <div>
                    <div className="text-[11px] font-black uppercase tracking-wider text-slate-500">
                      {isBn ? "পরিমাপযোগ্য অর্জন" : "VERC Quantifiable Impact"}
                    </div>
                    <div className="text-lg font-black text-slate-900 mt-0.5">
                      {isBn ? selectedGoal.impactStatBn : selectedGoal.impactStatEn}
                    </div>
                  </div>

                  {selectedGoal.programSlug && (
                    <Link
                      href={`/programs/${selectedGoal.programSlug}`}
                      onClick={() => setSelectedGoal(null)}
                      className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-brand-primary text-white text-xs sm:text-sm font-bold shadow-md hover:bg-brand-primary/90 transition-all shrink-0"
                    >
                      <span>{isBn ? "সম্পর্কিত কর্মসূচি দেখুন" : "Explore Related Program"}</span>
                      <ExternalLink size={14} />
                    </Link>
                  )}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">
                  {isBn ? "জাতিসংঘ টেকসই উন্নয়ন এজেন্ডা ২০৩০" : "UN Sustainable Development Agenda 2030"}
                </span>
                <button
                  onClick={() => setSelectedGoal(null)}
                  className="px-5 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold transition-colors"
                >
                  {isBn ? "বন্ধ করুন" : "Close"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
