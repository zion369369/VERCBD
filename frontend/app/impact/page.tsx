"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  TrendingUp, 
  BookOpen, 
  HeartHandshake, 
  GraduationCap, 
  MapPin, 
  Banknote,
  Users,
  Target,
  ShieldCheck,
  Mail,
  Phone,
  Building
} from "lucide-react";
import Image from "next/image";
import impactHero from "@/app/assets/impact_hero.png";

export default function ImpactPage() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  };

  const impactStats = [
    {
      icon: <MapPin className="text-brand-secondary" size={32} />,
      value: "136",
      label: "Branches",
      desc: "Operating across 25 areas nationwide under VERC's extensive microfinance program.",
      color: "bg-blue-50 border-blue-100"
    },
    {
      icon: <Banknote className="text-emerald-500" size={32} />,
      value: "Tk. 620 Crore+",
      label: "Outstanding Microfinance",
      desc: "Total outstanding amount of Tk. 620,69,29,412 (as of 30 November 2025), empowering rural economies.",
      color: "bg-emerald-50 border-emerald-100"
    },
    {
      icon: <BookOpen className="text-amber-500" size={32} />,
      value: "300",
      label: "Learning Centers",
      desc: "Community-based centers providing catch-up education for COVID-19 dropouts and unenrolled children.",
      color: "bg-amber-50 border-amber-100"
    },
    {
      icon: <GraduationCap className="text-purple-500" size={32} />,
      value: "222",
      label: "Students Supported",
      desc: "Provided stipend support under higher education and HSC, amounting to Tk. 3.9 million.",
      color: "bg-purple-50 border-purple-100"
    },
    {
      icon: <HeartHandshake className="text-rose-500" size={32} />,
      value: "Camp 8W",
      label: "Rohingya Response",
      desc: "Implemented humanitarian support programs addressing the critical needs of displaced Rohingya Refugees.",
      color: "bg-rose-50 border-rose-100"
    }
  ];

  const leadershipTeam = [
    { name: "Md. Yakub Hossain", role: "Executive Director", email: "yakub@vercbd.org" },
    { name: "Md. Masud Hassan", role: "Deputy Executive Director", email: "masudhassan@vercbd.org" },
    { name: "Ranada Prasad Saha", role: "Director, Microfinance, Capacity Enhancement & Climate Change", email: "ranada@vercbd.org" },
    { name: "Mustafizur Rashid Mridha", role: "Director, Human Resource & Administration", email: "mrashid@vercbd.org" },
    { name: "Md. Masud Royhan", role: "Director, Finance", email: "royhan@vercbd.org" }
  ];

  return (
    <div className="bg-white min-h-screen font-sans selection:bg-brand-primary/10">
      {/* Immersive Hero Section */}
      <section className="relative h-[60vh] flex items-center overflow-hidden bg-gray-900">
        <div className="absolute inset-0 z-0">
          <Image 
            src={impactHero} 
            alt="VERC Impact and Community Development" 
            fill 
            className="object-cover opacity-60 scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/70 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-900"></div>
        </div>
        
        <div className="container-custom relative z-10 text-white">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="max-w-4xl"
          >

            <h1 className="text-6xl lg:text-9xl font-black mb-8 leading-[0.95] tracking-tighter">
              Measurable <br/> <span className="text-brand-secondary">Impact.</span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed font-medium max-w-2xl">
              A snapshot of our ongoing efforts across Bangladesh—empowering communities, educating the youth, and delivering rapid humanitarian response.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Impact Statistics Grid */}
      <section className="py-32 bg-white relative z-20 rounded-t-[48px]">
        <div className="container-custom">
            <div className="flex items-center gap-3 text-brand-primary mb-16 justify-center">
                <TrendingUp size={28} />
                <h2 className="text-3xl lg:text-5xl font-black tracking-tight text-gray-900">Programmatic Reach 2025</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {impactStats.map((stat, i) => (
                    <motion.div 
                        key={i}
                        {...fadeIn}
                        transition={{ delay: i * 0.1 }}
                        className={`${stat.color} p-10 rounded-[40px] border flex flex-col group hover:-translate-y-2 hover:shadow-2xl transition-all duration-500`}
                    >
                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-8 group-hover:scale-110 transition-transform duration-500">
                            {stat.icon}
                        </div>
                        <h3 className="text-5xl font-black text-gray-900 mb-4 tracking-tighter">{stat.value}</h3>
                        <h4 className="text-xl font-bold text-gray-800 mb-4">{stat.label}</h4>
                        <p className="text-gray-600 font-medium leading-relaxed flex-grow">
                            {stat.desc}
                        </p>
                    </motion.div>
                ))}
                
                {/* Visual Filler Card */}
                <motion.div 
                    {...fadeIn}
                    transition={{ delay: 0.5 }}
                    className="bg-brand-primary p-10 rounded-[40px] text-white flex flex-col justify-center items-center text-center group hover:scale-105 transition-all duration-500"
                >
                    <Target size={48} className="mb-6 text-brand-secondary opacity-80 group-hover:opacity-100 group-hover:rotate-12 transition-all" />
                    <h3 className="text-3xl font-black mb-4 leading-tight">Dedicated to Sustainable Growth</h3>
                    <p className="text-brand-light/80 font-medium">Maximizing sustainability of development efforts through strategic, contextual frameworks.</p>
                </motion.div>
            </div>
        </div>
      </section>



    </div>
  );
}
