"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, CheckCircle2, Users, Target, Heart, Globe, 
  BarChart3, ShieldCheck, Zap, Sparkles, Droplets, BookOpen, 
  Briefcase, Star, MessageSquare, UserCheck, HeartPulse, Scale, 
  TrendingUp, Handshake, Sun 
} from "lucide-react";
import washHero from "@/app/assets/wash_hero.png";
import educationHero from "@/app/assets/education_hero.png";
import homeHero1 from "@/app/assets/home_official_1.jpg";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    homeHero1,
    "https://scontent.fdac20-1.fna.fbcdn.net/v/t39.30808-6/582285775_4282541052026382_7442564411324054501_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=13d280&_nc_eui2=AeHwx95pGnkNTuQgekKRKnd0ANAShKpAFH0A0BKEqkAUfYa09ZAJSaP94Tw-bx7yAOwCN63jgZJaEykcxyutR4be&_nc_ohc=v_PtojhbPgQQ7kNvwHWNK3x&_nc_oc=AdpxIbs_892V_QWWF0Q1wZ-gcxNLAKp0m6DbBB542cBwcPgOgeKjVszriKkNTYxWW9E&_nc_zt=23&_nc_ht=scontent.fdac20-1.fna&_nc_gid=kSSvh2l383G6CUjSUKpdkw&_nc_ss=7b2a8&oh=00_Af6kjwsfKz9CSqJdk9C_slURCdjM34_64MxPObs7vh73CA&oe=6A005210",
    "https://scontent.fdac20-1.fna.fbcdn.net/v/t39.30808-6/503121614_4119628138317675_1336772247178020094_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=2a1932&_nc_eui2=AeF9yQbTAWUq494v0hzY6nRdVFnj7R-uCUVUWePtH64JRX1gWG7MY4DRtUtsiWHz69OJYGs9FOFUH7a75OPang1r&_nc_ohc=r77VUMHGI-cQ7kNvwFntow_&_nc_oc=Adpa2_7ZGC6lA5Nek7XXT8YjYEwKUjSKLqXtoiypk2whB-ql3Fduw7hxisvYsNsP-LQ&_nc_zt=23&_nc_ht=scontent.fdac20-1.fna&_nc_gid=A1u3RWlDbbf0eYbhKrC6fQ&_nc_ss=7b2a8&oh=00_Af7Rbw2I5I47jIevslRzqZtvcZFfIKjvU-LuEfcOr2j3xw&oe=6A00277F"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const stats = [
    { label: "Lives Transformed", value: "2M+", icon: <Users size={20} /> },
    { label: "Districts Covered", value: "30+", icon: <Globe size={20} /> },
    { label: "Community Leaders", value: "1,500+", icon: <UserCheck size={20} /> },
    { label: "Legacy Years", value: "50+", icon: <HistoryIcon size={20} /> },
  ];

  const socialPrograms = [
    {
      title: "Non-Formal Education",
      desc: "Providing innovative learning models for marginalized children and adults.",
      href: "/programs/education",
      icon: <BookOpen className="text-blue-500" />,
      color: "bg-blue-50"
    },
    {
      title: "Health & WaSH",
      desc: "Pioneering CLTS and providing life-saving water and healthcare services.",
      href: "/programs/wash",
      icon: <Droplets className="text-emerald-500" />,
      color: "bg-emerald-50"
    },
    {
      title: "Livelihood & Empowerment",
      desc: "Building resilient futures through women's empowerment and vocational training.",
      href: "/programs/livelihood",
      icon: <Heart className="text-rose-500" />,
      color: "bg-rose-50"
    },
    {
      title: "Capacity Building",
      desc: "Strengthening local institutions and community leadership for long-term growth.",
      href: "/programs/capacity",
      icon: <Zap className="text-amber-500" />,
      color: "bg-amber-50"
    },
  ];

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  };

  return (
    <div className="flex flex-col bg-white overflow-x-hidden">
      {/* 1. HOME: Clear Mission Statement & Hero with Slideshow */}
      <section className="relative min-h-screen flex items-center pt-32 overflow-hidden bg-gray-900">
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 0.7, scale: 1.05 }}
              exit={{ opacity: 0, scale: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <img 
                src={typeof slides[currentSlide] === 'string' ? slides[currentSlide] : slides[currentSlide].src} 
                alt="VERC Impact" 
                className="w-full h-full object-cover"
              />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-900/40 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-900/80"></div>
          
          {/* Slide Indicators */}
          <div className="absolute bottom-12 right-12 z-30 flex gap-3">
              {slides.map((_, i) => (
                  <div 
                    key={i} 
                    className={`h-1.5 transition-all duration-500 rounded-full ${i === currentSlide ? "w-10 bg-brand-secondary" : "w-2 bg-white/20"}`}
                  />
              ))}
          </div>
        </div>
        
        <div className="container-custom relative z-20 text-white text-center">
          <div className="max-w-4xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                <h1 className="text-6xl lg:text-9xl font-black leading-[0.95] tracking-tighter mb-10">
                  Transforming <br/> <span className="text-brand-secondary">Destinies.</span>
                </h1>
                <p className="text-xl lg:text-2xl text-gray-300 mb-12 leading-relaxed font-medium max-w-2xl mx-auto">
                    Dedicated to empowering marginalized communities through sustainable innovation and participatory development since 1977.
                </p>
                <div className="flex flex-wrap justify-center gap-6">
                  <Link href="/about" className="px-10 py-5 bg-white text-gray-900 font-black rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-2xl flex items-center gap-3">
                    Our Story <ArrowRight size={20} />
                  </Link>
                  <Link href="/contact" className="px-10 py-5 bg-white/10 backdrop-blur-md text-white border border-white/20 font-bold rounded-2xl hover:bg-white/20 transition-all">
                    Partner with Us
                  </Link>
                </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. HOME: Key Impact Statistics */}
      <section className="relative z-30 -mt-16">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
            {stats.map((stat, i) => (
              <motion.div 
                key={stat.label}
                {...fadeIn}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-10 rounded-[48px] shadow-[0_30px_60px_rgba(0,0,0,0.06)] border border-gray-50 flex flex-col items-center text-center group hover:-translate-y-2 transition-all duration-500"
              >
                <div className="w-12 h-12 bg-brand-light rounded-xl flex items-center justify-center text-brand-primary mb-6 group-hover:bg-brand-primary group-hover:text-white transition-all">
                    {stat.icon}
                </div>
                <div className="text-4xl lg:text-5xl font-black text-gray-900 mb-2">{stat.value}</div>
                <div className="text-[10px] font-black uppercase tracking-widest text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. HOME: Programs Overview */}
      <section className="py-40 bg-white">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-24 gap-8">
            <div className="max-w-2xl">
                <div className="flex items-center gap-3 text-brand-primary mb-6">
                    <Target size={24} />
                    <h2 className="font-black uppercase tracking-[0.2em] text-xs">Our Focus</h2>
                </div>
                <h3 className="text-5xl lg:text-7xl font-black text-gray-900 leading-[1.05] tracking-tighter">
                    Social Program <br/> <span className="text-brand-primary">Pillars.</span>
                </h3>
            </div>
            <p className="text-xl text-gray-500 font-medium max-w-md leading-relaxed">
                Addressing the most critical needs of rural and marginalized communities through integrated development approaches.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {socialPrograms.map((item, i) => (
              <motion.div 
                key={item.title} 
                {...fadeIn}
                transition={{ delay: i * 0.1 }}
                className={`${item.color} p-10 rounded-[48px] border border-transparent hover:border-gray-200 hover:bg-white hover:shadow-2xl transition-all duration-500 group flex flex-col h-full`}
              >
                <div className="mb-8 w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                    {item.icon}
                </div>
                <h3 className="text-2xl font-black mb-4 text-gray-900 leading-tight">{item.title}</h3>
                <p className="text-gray-500 font-medium mb-10 text-sm leading-relaxed">
                  {item.desc}
                </p>
                <Link href={item.href} className="mt-auto inline-flex items-center gap-2 text-[12px] font-black uppercase tracking-widest text-brand-primary hover:gap-4 transition-all">
                  Explore Program <ArrowRight size={14} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. HOME: SDG Commitment Section */}
      <section className="py-40 bg-gray-50 overflow-hidden">
        <div className="container-custom">
            <div className="text-center max-w-4xl mx-auto mb-24">
                <motion.div {...fadeIn}>
                    <span className="inline-flex items-center gap-2 px-5 py-2 bg-brand-primary/10 rounded-full text-[10px] font-black uppercase tracking-widest text-brand-primary mb-8">
                        Global Agenda 2030
                    </span>
                    <h2 className="text-5xl lg:text-8xl font-black text-gray-900 leading-[1] tracking-tighter mb-10">
                        Achieving the <br/> <span className="text-brand-primary">SDGs.</span>
                    </h2>
                    <p className="text-xl text-gray-600 font-medium leading-relaxed">
                        VERC is strongly committed to contributing to achieving the Sustainable Development Goals (SDGs) by 2030 through our high-impact core programs.
                    </p>
                </motion.div>
            </div>

            <div className="flex flex-wrap justify-center gap-6">
                {[
                    { id: 1, title: "No Poverty", color: "bg-[#E5243B]", desc: "Livelihood development for the disadvantaged.", icon: <Users size={32} /> },
                    { id: 2, title: "Zero Hunger", color: "bg-[#DDA63A]", desc: "Rural development aimed at food security.", icon: <Zap size={32} /> }, // Closest to steam/energy of food
                    { id: 3, title: "Good Health", color: "bg-[#4C9F38]", desc: "Mother & Child Hospital and health initiatives.", icon: <HeartPulse size={32} /> },
                    { id: 4, title: "Quality Education", color: "bg-[#C5192D]", desc: "Emphasis on early childhood development.", icon: <BookOpen size={32} /> },
                    { id: 5, title: "Gender Equality", color: "bg-[#FF3A21]", desc: "Empowering marginalized women populations.", icon: <Scale size={32} /> },
                    { id: 6, title: "Clean Water", color: "bg-[#26BDE2]", desc: "Pioneers of the CLTS approach in Bangladesh.", icon: <Droplets size={32} /> },
                    { id: 7, title: "Clean Energy", color: "bg-[#FCC30B]", desc: "Improved Cook Stove (ICS) program since 1987.", icon: <Sun size={32} /> },
                    { id: 8, title: "Decent Work", color: "bg-[#A21942]", desc: "Micro-enterprise and income generation.", icon: <TrendingUp size={32} /> },
                    { id: 10, title: "Reduced Inequality", color: "bg-[#DD1367]", desc: "Focus on justice for marginalized populations.", icon: <Target size={32} /> },
                    { id: 13, title: "Climate Action", color: "bg-[#3F7E44]", desc: "Adaptation and disaster preparedness.", icon: <Globe size={32} /> },
                    { id: 17, title: "Partnerships", color: "bg-[#19486A]", desc: "Collaboration with World Bank, PKSF, WaterAid.", icon: <Handshake size={32} /> },
                ].map((sdg, i) => (
                    <motion.div
                        key={sdg.id}
                        {...fadeIn}
                        transition={{ delay: i * 0.05 }}
                        className="group relative w-[calc(50%-1.5rem)] md:w-[calc(33.33%-1.5rem)] lg:w-[calc(20%-1.5rem)] xl:w-[calc(16.66%-1.5rem)] max-w-[200px] aspect-square"
                    >
                        <div className={`${sdg.color} p-6 h-full rounded-[32px] text-white transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl overflow-hidden flex flex-col justify-between`}>
                            <div className="absolute top-0 right-0 p-4 opacity-10 scale-150 transform translate-x-4 -translate-y-4 font-black text-7xl">
                                {sdg.id}
                            </div>
                            <div className="relative z-10">
                                <div className="text-3xl font-black mb-1 leading-none">{sdg.id}</div>
                                <div className="mb-2 opacity-80 group-hover:opacity-100 transition-opacity">
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

      {/* GLOBAL PARTNERSHIP SECTION - FEATURING ORLANDO BLOOM */}
      <section className="py-40 bg-white">
        <div className="container-custom">
            <div className="flex flex-col lg:flex-row items-center gap-24">
                <div className="flex-1 space-y-10">
                    <div className="flex items-center gap-3 text-brand-primary">
                        <Globe size={24} />
                        <h2 className="font-black uppercase tracking-widest text-xs">Global Collaborations</h2>
                    </div>
                    <h3 className="text-5xl lg:text-7xl font-black text-gray-900 leading-[1.05] tracking-tighter">
                        Partnering for <br/> <span className="text-brand-primary">Global Impact.</span>
                    </h3>
                    <p className="text-xl text-gray-600 font-medium leading-relaxed">
                        VERC works alongside international agencies like **UNICEF** to implement life-changing infrastructure. 
                        Field visits from Goodwill Ambassadors like **Orlando Bloom** highlight the success of our Community-Led models in providing safe water to marginalized families.
                    </p>
                    <div className="pt-6">
                        <Link href="/partners" className="btn-primary px-10 py-5 rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all">
                            Our Partners & Donors
                        </Link>
                    </div>
                </div>
                <div className="flex-1 relative h-[600px] w-full rounded-[64px] overflow-hidden shadow-2xl group">
                    <img 
                        src="https://scontent.fdac20-1.fna.fbcdn.net/v/t39.30808-6/582285775_4282541052026382_7442564411324054501_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=13d280&_nc_eui2=AeHwx95pGnkNTuQgekKRKnd0ANAShKpAFH0A0BKEqkAUfYa09ZAJSaP94Tw-bx7yAOwCN63jgZJaEykcxyutR4be&_nc_ohc=v_PtojhbPgQQ7kNvwHWNK3x&_nc_oc=AdpxIbs_892V_QWWF0Q1wZ-gcxNLAKp0m6DbBB542cBwcPgOgeKjVszriKkNTYxWW9E&_nc_zt=23&_nc_ht=scontent.fdac20-1.fna&_nc_gid=kSSvh2l383G6CUjSUKpdkw&_nc_ss=7b2a8&oh=00_Af6kjwsfKz9CSqJdk9C_slURCdjM34_64MxPObs7vh73CA&oe=6A005210" 
                        alt="Orlando Bloom visiting VERC Project" 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                    />
                    <div className="absolute bottom-10 left-10 right-10 p-8 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 text-white">
                        <p className="text-xs font-black uppercase tracking-widest mb-2">Field Visit Spotlight</p>
                        <h5 className="text-lg font-bold">Orlando Bloom observing the Pipe Water Network project.</h5>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* SUCCESS STORY - Immersive Style */}
      <section className="py-40 relative bg-gray-50">
        <div className="container-custom">
            <div className="bg-white rounded-[64px] overflow-hidden shadow-2xl flex flex-col lg:flex-row items-stretch border border-gray-100">
                <div className="flex-1 relative h-[400px] lg:h-auto">
                    <img 
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvT5MrmPGsEYnFWwkigpCDcKu18qRR1t0LaQ&s" 
                        alt="Youth Empowerment Group" 
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-900/40 to-transparent"></div>
                </div>
                <div className="flex-1 p-12 lg:p-24 space-y-10">
                    <div className="flex items-center gap-3 text-brand-secondary">
                        <Heart size={20} />
                        <h4 className="font-black uppercase tracking-widest text-xs">Community Success</h4>
                    </div>
                    <h3 className="text-4xl lg:text-6xl font-black text-gray-900 leading-tight tracking-tighter">Empowering <br/> Future Generations.</h3>
                    <p className="text-xl text-gray-600 leading-relaxed font-medium">
                        &quot;VERC has always been focusing on strategies its course of action based on Strategic Planning. We nurture expansive patterns of thinking to set collective aspiration free.&quot;
                    </p>
                    <div className="pt-6">
                        <Link href="/impact" className="btn-primary px-10 py-5 rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all">
                            View Impact Results
                        </Link>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* 4. HOME: Call to Action: Donate/Partner */}
      <section className="py-40 bg-brand-primary text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 blur-[150px] -mr-40 mt-20"></div>
        <div className="container-custom text-center relative z-10">
            <motion.div {...fadeIn} className="max-w-4xl mx-auto space-y-12">
                <h3 className="text-5xl lg:text-9xl font-black mb-12 leading-[0.9] tracking-tighter">Be the <br/> <span className="text-brand-secondary">Change.</span></h3>
                <p className="text-2xl text-gray-300 font-medium">
                    Support VERC in building a self-reliant and enlightened society based on justice, equity and sustainability.
                </p>
                <div className="flex flex-wrap justify-center gap-6 pt-10">
                    <button className="px-12 py-6 bg-white text-brand-primary text-xl font-black rounded-3xl shadow-2xl hover:scale-105 active:scale-95 transition-all">
                        Support Our Work
                    </button>
                    <button className="px-12 py-6 bg-transparent border-2 border-white/20 text-white text-xl font-bold rounded-3xl hover:bg-white/10 transition-all">
                        Become a Partner
                    </button>
                </div>
            </motion.div>
        </div>
      </section>
    </div>
  );
}

function HistoryIcon({ className, size }: { className?: string, size?: number }) {
    return <svg xmlns="http://www.w3.org/2000/svg" width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l4 2"/></svg>;
}
