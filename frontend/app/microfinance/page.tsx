"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  TrendingUp, 
  Users, 
  Target, 
  MapPin, 
  ShieldCheck, 
  Briefcase, 
  Heart, 
  CheckCircle2, 
  ArrowRight, 
  Zap,
  Leaf,
  Users2,
  Home,
  Building2,
  Calendar,
  Layers,
  Sparkles,
  Globe
} from "lucide-react";
import Image from "next/image";
import microHero from "@/app/assets/microfinance_woman_hero.png";

export default function MicrofinancePage() {
  const products = [
    { name: "Jagoron", desc: "Foundational micro-credit for group-based income generation.", icon: <Zap size={20} /> },
    { name: "Agrosor", desc: "Advanced lending for micro-enterprise development.", icon: <TrendingUp size={20} /> },
    { name: "Buniad", desc: "Specialized support for the ultra-poor and marginalized.", icon: <Home size={20} /> },
    { name: "Sufolon", desc: "Dynamic investment for agricultural growth and productivity.", icon: <Leaf size={20} /> },
    { name: "ENRICH", desc: "Elimination of poverty through resource and capacity enhancement.", icon: <Sparkles size={20} /> },
    { name: "Elderly Care", desc: "Uplifting the quality of life for the elderly people.", icon: <Heart size={20} /> },
    { name: "OBA Sanitation", desc: "Dedicated microfinance for sanitation and hygiene projects.", icon: <ShieldCheck size={20} /> }
  ];

  const stats = [
    { label: "Villages", value: "2,477", icon: <MapPin size={18} /> },
    { label: "Districts", value: "19", icon: <Globe size={18} /> },
    { label: "Branches", value: "69", icon: <Building2 size={18} /> },
    { label: "Total Staff", value: "585", icon: <Users size={18} /> }
  ];

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  };

  return (
    <div className="bg-white min-h-screen font-sans selection:bg-brand-primary/10">
      {/* Immersive Hero Section */}
      <section className="relative h-[85vh] flex items-center overflow-hidden bg-gray-900">
        <div className="absolute inset-0 z-0">
          <Image 
            src={microHero} 
            alt="Microfinance Program" 
            fill 
            className="object-cover opacity-60 scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/60 to-transparent"></div>
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
              Economic Empowerment
            </span>
            <h1 className="text-6xl lg:text-9xl font-black mb-10 leading-[0.95] tracking-tighter">
              Micro <br/> <span className="text-brand-secondary">Finance.</span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed font-medium max-w-2xl mx-auto">
              Transforming lives through inclusive financial services, empowering women and rural entrepreneurs since 1982.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Overview & Strategy */}
      <section className="py-32 bg-white">
        <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
                <motion.div {...fadeIn}>
                    <div className="flex items-center gap-3 text-brand-primary mb-6">
                        <TrendingUp size={24} />
                        <h2 className="font-black uppercase tracking-widest text-xs">Our Strategy</h2>
                    </div>
                    <h3 className="text-5xl lg:text-7xl font-black text-gray-900 leading-tight tracking-tighter mb-10">
                        Bridging the <br/> <span className="text-brand-primary">Financial Gap.</span>
                    </h3>
                    <p className="text-xl text-gray-600 leading-relaxed font-medium mb-8">
                        VERC reaches the disadvantaged, underprivileged poor, particularly women and ethnic minorities, to fulfill the demographic coverage goal of overcoming helplessness and deprivation.
                    </p>
                    <p className="text-lg text-gray-500 leading-relaxed mb-10">
                        From its inception, VERC has been expanding into remote and isolated areas, increasing multidimensional lending services to meet market demand for both rural and urban micro-economy sectors.
                    </p>
                    
                    <div className="grid grid-cols-2 gap-8">
                        <div className="p-8 bg-brand-light/50 rounded-3xl border border-brand-primary/5">
                            <h4 className="font-black text-gray-900 mb-2 uppercase tracking-widest text-[10px]">Active Since</h4>
                            <div className="text-4xl font-black text-brand-primary tracking-tighter">1982</div>
                        </div>
                        <div className="p-8 bg-brand-light/50 rounded-3xl border border-brand-primary/5">
                            <h4 className="font-black text-gray-900 mb-2 uppercase tracking-widest text-[10px]">MRA Awarded</h4>
                            <div className="text-4xl font-black text-brand-primary tracking-tighter">2006</div>
                        </div>
                    </div>
                </motion.div>

                <div className="space-y-8">
                    <motion.div 
                        {...fadeIn}
                        className="p-10 bg-gray-900 text-white rounded-[48px] shadow-2xl relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/20 rounded-full -mr-16 -mt-16"></div>
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 bg-brand-primary/20 rounded-xl text-brand-secondary">
                                <Target size={24} />
                            </div>
                            <h4 className="text-2xl font-black tracking-tight">Mission Goals</h4>
                        </div>
                        <div className="space-y-6">
                            <div>
                                <h5 className="font-black uppercase text-[10px] tracking-widest text-brand-secondary mb-2">The Goal</h5>
                                <p className="text-lg text-gray-300 font-medium italic">
                                    "To create a community force capable of planning, operating and managing need based development programs to overcome poverty."
                                </p>
                            </div>
                            <div>
                                <h5 className="font-black uppercase text-[10px] tracking-widest text-brand-secondary mb-2">The Objective</h5>
                                <p className="text-lg text-gray-300 font-medium">
                                    To raise the economic status of the poor by engaging them in income generating activities and making them self-reliant.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
      </section>

      {/* Geographical Reach Stats */}
      <section className="py-24 bg-brand-primary text-white overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="container-custom relative z-10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-24 items-center">
                {stats.map((stat, i) => (
                    <motion.div 
                        key={i}
                        {...fadeIn}
                        transition={{ delay: i * 0.1 }}
                        className="text-center"
                    >
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-white/10 rounded-xl mb-6 text-brand-secondary">
                            {stat.icon}
                        </div>
                        <div className="text-5xl lg:text-7xl font-black mb-2 tracking-tighter">{stat.value}</div>
                        <div className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60">{stat.label}</div>
                    </motion.div>
                ))}
            </div>
            <div className="mt-24 pt-12 border-t border-white/10 text-center">
                <p className="text-xl font-medium opacity-80 max-w-3xl mx-auto">
                    Spanning across <span className="text-brand-secondary font-black">60 Upazilas</span> and <span className="text-brand-secondary font-black">355 Unions</span>, VERC is a vital pillar of Bangladesh's rural economy.
                </p>
            </div>
        </div>
      </section>

      {/* Product Lines (Wings) */}
      <section className="py-32 bg-gray-50">
        <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto mb-24">
                <div className="flex items-center justify-center gap-3 text-brand-primary mb-6">
                    <Layers size={24} />
                    <h2 className="font-black uppercase tracking-widest text-xs">Our Product Lines</h2>
                </div>
                <h3 className="text-4xl lg:text-6xl font-black mb-8 leading-tight tracking-tighter">Eight Specialized <br/> <span className="text-brand-primary">Financial Wings.</span></h3>
                <p className="text-xl text-gray-600 font-medium">
                    Our multidimensional lending system delivery is designed to meet specific market demands and empower different social groups.
                </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product, i) => (
                    <motion.div 
                        key={i}
                        {...fadeIn}
                        transition={{ delay: i * 0.05 }}
                        className="p-10 bg-white rounded-[40px] border border-transparent hover:border-brand-primary/10 hover:shadow-2xl transition-all group h-full flex flex-col"
                    >
                        <div className="w-14 h-14 bg-brand-light rounded-2xl flex items-center justify-center text-brand-primary mb-8 group-hover:bg-brand-primary group-hover:text-white transition-all">
                            {product.icon}
                        </div>
                        <h4 className="text-2xl font-black text-gray-900 mb-4 group-hover:text-brand-primary transition-colors">{product.name}</h4>
                        <p className="text-lg text-gray-500 font-medium leading-relaxed mb-8 flex-grow">
                            {product.desc}
                        </p>
                        <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-primary hover:gap-4 transition-all">
                            Learn More <ArrowRight size={14} />
                        </button>
                    </motion.div>
                ))}
                
                {/* Partnership Card */}
                <motion.div 
                    {...fadeIn}
                    transition={{ delay: 0.4 }}
                    className="p-10 bg-brand-secondary/10 rounded-[40px] border border-brand-secondary/20 flex flex-col justify-center text-center h-full"
                >
                    <div className="mb-6">
                        <ShieldCheck className="mx-auto text-brand-secondary" size={48} />
                    </div>
                    <h4 className="text-2xl font-black text-gray-900 mb-4">PKSF Partnership</h4>
                    <p className="text-lg text-gray-600 font-medium mb-8">
                        VERC has been a proud PKSF Partner since 1996, ensuring world-class standards in micro-finance.
                    </p>
                </motion.div>
            </div>
        </div>
      </section>

      {/* Agriculture & Skill Development */}
      <section className="py-32 bg-white overflow-hidden">
        <div className="container-custom">
            <div className="bg-gray-900 rounded-[64px] flex flex-col lg:flex-row items-stretch overflow-hidden border border-white/5">
                <div className="flex-1 p-12 lg:p-24 space-y-10">
                    <div className="flex items-center gap-3 text-brand-secondary">
                        <Leaf size={20} />
                        <h4 className="font-black uppercase tracking-widest text-xs">Innovation in Farming</h4>
                    </div>
                    <h3 className="text-4xl lg:text-6xl font-black text-white leading-tight tracking-tighter">Beyond Just <br/> <span className="text-brand-secondary">Capital.</span></h3>
                    <p className="text-xl text-gray-400 leading-relaxed font-medium">
                        VERC provides skill development training in agriculture and other income-generating trades, along with leadership and human rights awareness, prior to starting activities.
                    </p>
                    <ul className="space-y-4">
                        {[
                            "Dynamic Agriculture Investment",
                            "Skill Development Training",
                            "Leadership Development",
                            "Human Rights Awareness"
                        ].map((item, i) => (
                            <li key={i} className="flex items-center gap-4 text-white font-bold">
                                <CheckCircle2 size={20} className="text-brand-secondary" />
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex-1 relative min-h-[400px]">
                    <Image 
                        src="https://images.unsplash.com/photo-1590650213165-c1fef80648c4?q=80&w=2070&auto=format&fit=crop" 
                        alt="Agriculture Support" 
                        fill 
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-l from-gray-900 via-transparent to-transparent"></div>
                </div>
            </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-40 bg-brand-light">
        <div className="container-custom text-center">
            <motion.div {...fadeIn} className="max-w-4xl mx-auto">
                <h3 className="text-5xl lg:text-8xl font-black text-gray-900 mb-12 leading-[1] tracking-tighter">Join the <br/> <span className="text-brand-primary">Self-Reliant Era.</span></h3>
                <p className="text-2xl text-gray-600 font-medium mb-16">
                    Partner with VERC Microfinance to drive economic growth and social status improvement in your community.
                </p>
                <div className="flex flex-wrap justify-center gap-6">
                    <button className="px-12 py-6 bg-brand-primary text-white text-xl font-black rounded-3xl shadow-[0_20px_50px_rgba(0,75,141,0.3)] hover:scale-105 active:scale-95 transition-all">
                        Apply for Loan
                    </button>
                    <button className="px-12 py-6 bg-white text-brand-primary text-xl font-bold rounded-3xl border-2 border-brand-primary/10 hover:bg-brand-primary/5 transition-all">
                        Find a Branch
                    </button>
                </div>
            </motion.div>
        </div>
      </section>
    </div>
  );
}
