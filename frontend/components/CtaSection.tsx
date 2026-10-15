"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Heart, Handshake, ArrowRight, ShieldCheck, 
  Sparkles, Globe2, Building2, CheckCircle2, 
  HeartHandshake, Award, FileText, ChevronRight
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function CtaSection() {
  const { language } = useLanguage();

  const fadeIn = {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
  };

  return (
    <section className="relative py-28 sm:py-36 overflow-hidden bg-gradient-to-b from-[#003B73] via-[#002D59] to-[#001D3A] text-white">
      {/* Decorative ambient lighting & luminous glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-secondary/25 rounded-full blur-[140px] -mr-40 -mt-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[550px] h-[550px] bg-blue-500/15 rounded-full blur-[130px] -ml-40 -mb-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-cyan-400/10 rounded-full blur-[160px] pointer-events-none" />
      
      {/* Subtle fine geometric grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none" 
        style={{ 
          backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", 
          backgroundSize: "36px 36px" 
        }} 
      />

      <div className="container-custom relative z-10">
        
        {/* Main Centerpiece Header */}
        <motion.div {...fadeIn} className="max-w-4xl mx-auto text-center space-y-6">
          
          {/* Luminous Top Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 sm:px-5 py-2 rounded-full bg-white/10 hover:bg-white/15 backdrop-blur-xl border border-white/20 text-sky-200 text-xs sm:text-sm font-bold tracking-wider uppercase shadow-[0_4px_16px_rgba(0,0,0,0.25)] transition-all">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <Sparkles size={15} className="text-cyan-300" />
            <span>
              {language === "bn" 
                ? "৪৭ বছরের অগ্রযাত্রা • তৃণমূলের ক্ষমতায়ন" 
                : "47+ Years of Impact • Pioneering Grassroots Change"}
            </span>
          </div>

          {/* Master Headline */}
          <h2 className={`text-4xl sm:text-6xl lg:text-7xl font-black text-white ${
            language === "bn" ? "leading-[1.25] tracking-normal py-1" : "leading-[1.05] tracking-tight"
          }`}>
            {language === "bn" ? (
              <>
                পরিবর্তনের <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-amber-300">অংশীদার হন।</span>
              </>
            ) : (
              <>
                Be the <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-amber-300">Change.</span>
              </>
            )}
          </h2>

          {/* Subtitle */}
          <p className="text-slate-200 text-lg sm:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
            {language === "bn"
              ? "ন্যায়বিচার, সাম্য এবং স্থায়িত্বের ভিত্তিতে স্বনির্ভর ও আলোকিত সমাজ গঠনে ভার্কের সাথে যোগ দিন। আপনার সহযোগিতা প্রান্তিক পরিবারের জীবনে স্থায়ী পরিবর্তন এনে দেয়।"
              : "Support VERC in building a self-reliant and enlightened society based on justice, equity, and sustainability across rural Bangladesh."}
          </p>

          {/* High-Contrast 3D Morphic Action Buttons */}
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 pt-4">
            
            {/* Primary 3D Button: Support Our Work */}
            <Link 
              href="/donate" 
              className="group relative px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-b from-white via-slate-50 to-slate-100 hover:from-white hover:to-slate-200 text-brand-primary font-black text-base sm:text-lg rounded-2xl sm:rounded-3xl shadow-[0_12px_28px_rgba(0,0,0,0.35),inset_0_2px_1px_rgba(255,255,255,1),0_2px_4px_rgba(0,0,0,0.2)] hover:shadow-[0_16px_36px_rgba(0,0,0,0.45)] hover:-translate-y-1 active:translate-y-0 active:shadow-[inset_0_3px_6px_rgba(0,0,0,0.15)] ring-2 ring-white/60 transition-all duration-300 flex items-center gap-3 cursor-pointer"
            >
              <Heart size={20} className="text-rose-500 fill-rose-500/20 group-hover:scale-110 transition-transform" />
              <span>
                {language === "bn" ? "আমাদের কাজে সহায়তা করুন" : "Support Our Work"}
              </span>
              <ArrowRight size={18} className="text-brand-primary group-hover:translate-x-1.5 transition-transform" />
            </Link>

            {/* Secondary 3D Morphic Button: Become a Partner */}
            <Link 
              href="/contact" 
              className="group relative px-8 sm:px-10 py-4 sm:py-5 bg-white/10 hover:bg-white/15 backdrop-blur-xl text-white font-extrabold text-base sm:text-lg rounded-2xl sm:rounded-3xl border border-white/30 hover:border-white/60 shadow-[0_8px_22px_rgba(0,0,0,0.25),inset_0_1px_1px_rgba(255,255,255,0.25)] hover:shadow-[0_12px_28px_rgba(0,0,0,0.35)] hover:-translate-y-1 active:translate-y-0 active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.2)] transition-all duration-300 flex items-center gap-3 cursor-pointer"
            >
              <Handshake size={20} className="text-sky-300 group-hover:scale-110 transition-transform" />
              <span>
                {language === "bn" ? "অংশীদার হন" : "Become a Partner"}
              </span>
              <ChevronRight size={18} className="text-white/80 group-hover:translate-x-1 transition-transform" />
            </Link>

          </div>

        </motion.div>

        {/* 3 Pathway Cards (Engagement Avenues) */}
        <motion.div 
          {...fadeIn} 
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-16 sm:mt-20 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* Pathway 1 */}
          <div className="relative p-6 sm:p-8 rounded-[32px] bg-white/[0.07] hover:bg-white/[0.11] backdrop-blur-xl border border-white/15 hover:border-white/30 shadow-[0_15px_35px_-10px_rgba(0,0,0,0.3)] transition-all duration-300 group flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-rose-500/30 to-amber-500/20 border border-white/20 flex items-center justify-center text-rose-300 shadow-inner group-hover:scale-110 transition-transform">
                <HeartHandshake size={26} />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                {language === "bn" ? "প্রত্যক্ষ অনুদান ও সহায়তা" : "Direct Impact Grants"}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-normal">
                {language === "bn"
                  ? "সুবিধাবঞ্চিত শিশুদের জন্য শিক্ষা উপকরণ, নিরাপদ খাবার পানির সংযোগ এবং জরুরি মানবিক সহায়তায় সরাসরি অংশ নিন।"
                  : "Empower rural youth with school stipends, install arsenic-safe community taps, and fund emergency community relief."}
              </p>
            </div>
            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-bold text-sky-200">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-emerald-400" />
                {language === "bn" ? "১০০% স্বচ্ছতা নিশ্চিত" : "100% Transparent Utilization"}
              </span>
              <Link href="/donate" className="text-white hover:text-cyan-300 transition-colors flex items-center gap-1 cursor-pointer">
                <span>{language === "bn" ? "সহায়তা" : "Support"}</span>
                <ArrowRight size={12} />
              </Link>
            </div>
          </div>

          {/* Pathway 2 */}
          <div className="relative p-6 sm:p-8 rounded-[32px] bg-white/[0.07] hover:bg-white/[0.11] backdrop-blur-xl border border-white/15 hover:border-white/30 shadow-[0_15px_35px_-10px_rgba(0,0,0,0.3)] transition-all duration-300 group flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-sky-500/30 to-blue-500/20 border border-white/20 flex items-center justify-center text-sky-300 shadow-inner group-hover:scale-110 transition-transform">
                <Building2 size={26} />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                {language === "bn" ? "প্রাতিষ্ঠানিক ও সিএসআর পার্টনারশিপ" : "Institutional & CSR Alliance"}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-normal">
                {language === "bn"
                  ? "জাতিসংঘ সংস্থা, বহুজাতিক ব্যাংক ও জাতীয় কর্পোরেট সিএসআর ফান্ডের সাথে সমন্বিত উন্নয়ন প্রকল্প বাস্তবায়ন।"
                  : "Co-develop transformative WASH networks, micro-finance programs, and climate adaptation projects with VERC."}
              </p>
            </div>
            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-bold text-sky-200">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-emerald-400" />
                {language === "bn" ? "আন্তর্জাতিক মানদণ্ড" : "UNICEF & World Bank Alliance"}
              </span>
              <Link href="/contact" className="text-white hover:text-cyan-300 transition-colors flex items-center gap-1 cursor-pointer">
                <span>{language === "bn" ? "যোগাযোগ" : "Connect"}</span>
                <ArrowRight size={12} />
              </Link>
            </div>
          </div>

          {/* Pathway 3 */}
          <div className="relative p-6 sm:p-8 rounded-[32px] bg-white/[0.07] hover:bg-white/[0.11] backdrop-blur-xl border border-white/15 hover:border-white/30 shadow-[0_15px_35px_-10px_rgba(0,0,0,0.3)] transition-all duration-300 group flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-500/30 to-teal-500/20 border border-white/20 flex items-center justify-center text-emerald-300 shadow-inner group-hover:scale-110 transition-transform">
                <Award size={26} />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                {language === "bn" ? "তৃণমূল গবেষণা ও ফেলোশিপ" : "Grassroots Innovation & Research"}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed font-normal">
                {language === "bn"
                  ? "সিএলটিএস স্যানিটেশন বিপ্লব ও মাঠপর্যায়ের জনঅংশগ্রহণমূলক উন্নয়ন মডেল নিয়ে কাজ করার অনন্য সুযোগ।"
                  : "Engage with VERC's field practitioners, policy researchers, and community champions driving indigenous change."}
              </p>
            </div>
            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs font-bold text-sky-200">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 size={13} className="text-emerald-400" />
                {language === "bn" ? "দেশব্যাপী ৬৪ জেলা" : "Nationwide 64 Districts"}
              </span>
              <Link href="/about" className="text-white hover:text-cyan-300 transition-colors flex items-center gap-1 cursor-pointer">
                <span>{language === "bn" ? "ইতিহাস" : "Explore"}</span>
                <ArrowRight size={12} />
              </Link>
            </div>
          </div>

        </motion.div>

        {/* Bottom Official Accreditations & Trust Strip */}
        <motion.div 
          {...fadeIn} 
          transition={{ duration: 0.7, delay: 0.25 }}
          className="mt-14 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-slate-300 font-semibold text-center"
        >
          <div className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-cyan-400" />
            <span>NGO Affairs Bureau Bangladesh • Reg #138</span>
          </div>
          <span className="hidden sm:inline text-white/30">•</span>
          <div className="flex items-center gap-2">
            <Award size={16} className="text-amber-400" />
            <span>Microcredit Regulatory Authority • MRA #00923</span>
          </div>
          <span className="hidden sm:inline text-white/30">•</span>
          <div className="flex items-center gap-2">
            <Globe2 size={16} className="text-emerald-400" />
            <span>CLTS Global Sanitation Pioneer in 60+ Nations</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
