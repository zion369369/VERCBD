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
  Building,
  ArrowRight
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
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
    <div className="bg-white min-h-screen font-sans selection:bg-brand-primary/10 overflow-x-hidden">
      {/* 1. HERO: Immersive Result Snapshot */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-gray-900 pt-24">
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
        
        <div className="container-custom relative z-10 text-white text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-4xl mx-auto"
          >
            <span className="inline-flex items-center gap-2 px-5 py-2 bg-brand-primary/20 backdrop-blur-xl rounded-full text-[11px] font-black uppercase tracking-[0.4em] mb-10 border border-brand-primary/30 text-brand-secondary">
              Strategic Results 2025
            </span>
            <h1 className="text-6xl lg:text-9xl font-black mb-8 leading-[0.95] tracking-tighter">
              Measurable <br/> <span className="text-brand-secondary">Impact.</span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed font-medium max-w-2xl mx-auto">
              A snapshot of our ongoing efforts across Bangladesh—empowering communities, educating the youth, and delivering rapid humanitarian response.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. STATS: Programmatic Reach Grid */}
      <section className="py-40 bg-white relative z-20 rounded-t-[64px] -mt-12">
        <div className="container-custom">
            <div className="flex flex-col lg:flex-row justify-between items-end mb-24 gap-12">
                <div className="max-w-2xl">
                    <div className="flex items-center gap-3 text-brand-primary mb-6">
                        <TrendingUp size={28} />
                        <h2 className="font-black uppercase tracking-[0.2em] text-xs">Annual Performance</h2>
                    </div>
                    <h3 className="text-5xl lg:text-8xl font-black text-gray-900 leading-[1] tracking-tighter">
                        Empowering <br/> <span className="text-brand-primary">Millions.</span>
                    </h3>
                </div>
                <p className="text-xl text-gray-500 font-medium max-w-md leading-relaxed">
                    Maximizing sustainability of development efforts through strategic, contextual frameworks and deep community roots.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {impactStats.map((stat, i) => (
                    <motion.div 
                        key={i}
                        {...fadeIn}
                        transition={{ delay: i * 0.1 }}
                        className={`${stat.color} p-12 rounded-[56px] border flex flex-col group hover:-translate-y-2 hover:shadow-2xl transition-all duration-500`}
                    >
                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-8 group-hover:scale-110 transition-transform duration-500">
                            {stat.icon}
                        </div>
                        <h3 className="text-5xl font-black text-gray-900 mb-4 tracking-tighter">{stat.value}</h3>
                        <h4 className="text-xl font-bold text-gray-800 mb-6">{stat.label}</h4>
                        <p className="text-gray-500 font-medium leading-relaxed flex-grow">
                            {stat.desc}
                        </p>
                    </motion.div>
                ))}
                
                <motion.div 
                    {...fadeIn}
                    transition={{ delay: 0.5 }}
                    className="bg-brand-primary p-12 rounded-[56px] text-white flex flex-col justify-center items-center text-center group hover:scale-[1.02] transition-all duration-500 shadow-2xl relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                    <Target size={64} className="mb-8 text-brand-secondary opacity-80 group-hover:opacity-100 group-hover:rotate-12 transition-all" />
                    <h3 className="text-3xl font-black mb-6 leading-tight">Committed to <br/> Global SDGs</h3>
                    <p className="text-brand-light/80 font-medium mb-8">Aligning every program with the 2030 Global Agenda for sustainable prosperity.</p>
                    <button className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-brand-secondary hover:gap-4 transition-all">
                        View SDG Alignment <ArrowRight size={14} />
                    </button>
                </motion.div>
            </div>
        </div>
      </section>

      {/* 3. LEADERSHIP: Executive Governance */}
      <section className="py-40 bg-gray-50">
        <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto mb-24">
                <motion.div {...fadeIn}>
                    <span className="inline-block px-5 py-2 bg-brand-primary/10 rounded-full text-[10px] font-black uppercase tracking-widest text-brand-primary mb-8 border border-brand-primary/20">
                        Governance & Management
                    </span>
                    <h2 className="text-5xl lg:text-7xl font-black text-gray-900 leading-[1] tracking-tighter mb-10">
                        Our Executive <br/> <span className="text-brand-primary">Leadership.</span>
                    </h2>
                </motion.div>
            </div>

            <div className="bg-white rounded-[64px] shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-900 text-white">
                                <th className="px-10 py-8 font-black uppercase tracking-widest text-xs">Name</th>
                                <th className="px-10 py-8 font-black uppercase tracking-widest text-xs">Designation</th>
                                <th className="px-10 py-8 font-black uppercase tracking-widest text-xs">Contact</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {leadershipTeam.map((member, i) => (
                                <motion.tr 
                                    key={i}
                                    {...fadeIn}
                                    transition={{ delay: i * 0.05 }}
                                    className="hover:bg-brand-light/30 transition-colors group"
                                >
                                    <td className="px-10 py-8">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 bg-brand-primary/10 rounded-full flex items-center justify-center text-brand-primary font-black group-hover:bg-brand-primary group-hover:text-white transition-all">
                                                {member.name.charAt(0)}
                                            </div>
                                            <span className="font-black text-gray-900 text-lg">{member.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-10 py-8">
                                        <span className="font-bold text-gray-600">{member.role}</span>
                                    </td>
                                    <td className="px-10 py-8">
                                        <div className="flex flex-col gap-2">
                                            <a href={`mailto:${member.email}`} className="flex items-center gap-2 text-sm text-brand-primary font-bold hover:underline">
                                                <Mail size={14} /> {member.email}
                                            </a>
                                            <span className="flex items-center gap-2 text-sm text-gray-400 font-medium">
                                                <Phone size={14} /> +880-2-224441511
                                            </span>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
      </section>

      {/* 4. TRANSPARENCY: Reporting Section */}
      <section className="py-40 bg-white">
        <div className="container-custom">
            <div className="bg-gray-900 rounded-[64px] p-12 lg:p-24 text-white relative overflow-hidden flex flex-col lg:flex-row items-center gap-24">
                <div className="absolute top-0 left-0 w-64 h-64 bg-brand-primary/10 rounded-full -ml-32 -mt-32"></div>
                
                <div className="flex-1 space-y-10 relative z-10">
                    <div className="flex items-center gap-3 text-brand-secondary">
                        <ShieldCheck size={28} />
                        <h2 className="font-black uppercase tracking-widest text-xs">Trust & Transparency</h2>
                    </div>
                    <h3 className="text-5xl lg:text-7xl font-black leading-[1] tracking-tighter">
                        Accountable to <br/> <span className="text-brand-secondary">Our Communities.</span>
                    </h3>
                    <p className="text-xl text-gray-400 font-medium leading-relaxed max-w-xl">
                        We maintain the highest standards of financial integrity and programmatic accountability. Explore our detailed annual reports to see how we utilize every resource.
                    </p>
                    <div className="pt-8 flex flex-wrap gap-6">
                        <Link href="/about/annual-report" className="px-10 py-5 bg-brand-secondary text-gray-900 font-black rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all">
                            Latest Annual Report
                        </Link>
                        <Link href="/about/legal" className="px-10 py-5 bg-white/10 backdrop-blur-md text-white border border-white/20 font-bold rounded-2xl hover:bg-white/20 transition-all">
                            Audit & Compliance
                        </Link>
                    </div>
                </div>

                <div className="flex-1 grid grid-cols-2 gap-8 w-full relative z-10">
                    {[
                        { label: "Donor Satisfaction", value: "98%", icon: <HeartHandshake size={24} /> },
                        { label: "Financial Audit", value: "Clear", icon: <ShieldCheck size={24} /> },
                        { label: "Transparency Score", value: "High", icon: <TrendingUp size={24} /> },
                        { label: "Local Offices", value: "136", icon: <Building size={24} /> }
                    ].map((item, i) => (
                        <div key={i} className="p-10 bg-white/5 backdrop-blur-sm border border-white/10 rounded-[40px] flex flex-col items-center text-center">
                            <div className="text-brand-secondary mb-4">{item.icon}</div>
                            <div className="text-3xl font-black mb-1">{item.value}</div>
                            <div className="text-[10px] font-black uppercase tracking-widest opacity-40">{item.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </section>

      {/* 5. CTA: Partner with Us */}
      <section className="py-40 bg-brand-light">
        <div className="container-custom text-center">
            <motion.div {...fadeIn} className="max-w-4xl mx-auto space-y-12">
                <h3 className="text-5xl lg:text-9xl font-black leading-[0.9] tracking-tighter">Support the <br/> <span className="text-brand-primary">Movement.</span></h3>
                <p className="text-2xl text-gray-600 font-medium leading-relaxed">
                    Join hands with VERC to expand our footprint and bring sustainable change to millions more across the country.
                </p>
                <div className="flex flex-wrap justify-center gap-6 pt-8">
                    <Link href="/contact" className="px-12 py-6 bg-brand-primary text-white text-xl font-black rounded-3xl shadow-[0_20px_50px_rgba(0,75,141,0.3)] hover:scale-105 active:scale-95 transition-all">
                        Partner with VERC
                    </Link>
                    <Link href="/about" className="px-12 py-6 bg-white text-brand-primary text-xl font-bold rounded-3xl border-2 border-brand-primary/10 hover:bg-brand-primary/5 transition-all">
                        Learn More About Us
                    </Link>
                </div>
            </motion.div>
        </div>
      </section>
    </div>

  );
}
