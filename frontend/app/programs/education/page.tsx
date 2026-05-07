"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, GraduationCap, Users, Sparkles, Heart, CheckCircle2, ArrowRight, Lightbulb, Baby, Star } from "lucide-react";
import Image from "next/image";
import educationHero1 from "@/app/assets/edu_1.png";
import educationHero2 from "@/app/assets/edu_2.png";
import educationHero3 from "@/app/assets/edu_3.png";

export default function EducationProgramPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [educationHero1, educationHero2, educationHero3];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const coreModels = [
    { 
      title: "Early Childhood Development (ECD)", 
      desc: "Starting as early as 1979, our ECD centers focus on cognitive and social growth through joyful, play-based learning.",
      icon: <Baby size={24} />,
      color: "bg-blue-50"
    },
    { 
      title: "Non-Formal Primary Education (NFPE)", 
      desc: "Innovative learning models for marginalized children to bridge the gap into mainstream primary education.",
      icon: <GraduationCap size={24} />,
      color: "bg-emerald-50"
    },
    { 
      title: "Adult & Adolescent Literacy", 
      desc: "Participatory groups that improve literacy and raise awareness for capacity building and sustainable empowerment.",
      icon: <Users size={24} />,
      color: "bg-rose-50"
    }
  ];

  const highlights = [
    "Joyful & Interesting Learning Environment",
    "Community-Run School Management Models",
    "Mainstreaming to Primary Education Efforts",
    "Knowledge-Based Society Formation",
    "Inclusive Extracurricular Activities",
    "National & International Day Observations"
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
      <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-gray-900 pt-24">
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
              <Image 
                src={slides[currentSlide]} 
                alt="Non-Formal Education" 
                fill 
                className="object-cover"
                priority
              />
            </motion.div>
          </AnimatePresence>
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
              Core Social Program
            </span>
            <h1 className="text-6xl lg:text-9xl font-black mb-10 leading-[0.95] tracking-tighter">
              Non-Formal <br/> <span className="text-brand-secondary">Education.</span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed font-medium max-w-2xl mx-auto">
              Fostering human potential and building a knowledge-based society through innovative learning models.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Philosophy & Purpose */}
      <section className="py-32 bg-white">
        <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
                <motion.div {...fadeIn}>
                    <div className="flex items-center gap-3 text-brand-primary mb-6">
                        <Lightbulb size={24} />
                        <h2 className="font-black uppercase tracking-widest text-xs">Our Philosophy</h2>
                    </div>
                    <h3 className="text-5xl lg:text-7xl font-black text-gray-900 leading-tight tracking-tighter mb-10">
                        Education Beyond <br/> <span className="text-brand-primary">Literacy.</span>
                    </h3>
                    <p className="text-xl text-gray-600 leading-relaxed font-medium mb-8">
                        Education is not only to eradicate illiteracy but also to form a **knowledge-based society** which will help our country be a developed one. 
                        VERC focuses on making education joyful and interesting to young learners, ensuring that parents and children alike are invested in the school system.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {highlights.map((h, i) => (
                            <div key={i} className="flex items-center gap-3 text-gray-700 font-bold text-sm">
                                <CheckCircle2 size={18} className="text-brand-primary flex-shrink-0" />
                                {h}
                            </div>
                        ))}
                    </div>
                </motion.div>
                <div className="space-y-8 w-full">
                    <motion.div 
                        {...fadeIn}
                        className="p-12 bg-brand-primary text-white rounded-[56px] shadow-xl relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                        <h4 className="text-4xl font-black mb-6 tracking-tighter">Savar Excellence</h4>
                        <p className="text-lg opacity-80 font-medium leading-relaxed mb-10">
                            Executing own-funded programs in Savar since 1979. We currently operate **4 ECD centers** and **5 NFPE centers** serving hundreds of students with excellence.
                        </p>
                        <div className="flex items-center gap-6">
                            <div className="space-y-1">
                                <div className="text-3xl font-black">475+</div>
                                <div className="text-[10px] font-black uppercase tracking-widest opacity-60">Active Students</div>
                            </div>
                            <div className="w-px h-10 bg-white/20"></div>
                            <div className="space-y-1">
                                <div className="text-3xl font-black">9</div>
                                <div className="text-[10px] font-black uppercase tracking-widest opacity-60">Total Centers</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
      </section>

      {/* Core Educational Models */}
      <section className="py-32 bg-gray-50 relative overflow-hidden">
        <div className="container-custom relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-24">
                <div className="flex items-center justify-center gap-3 text-brand-primary mb-6">
                    <Sparkles size={24} />
                    <h2 className="font-black uppercase tracking-widest text-xs">Innovation Models</h2>
                </div>
                <h3 className="text-4xl lg:text-6xl font-black mb-8 leading-tight tracking-tighter">Strategic <br/> <span className="text-brand-primary">Learning Pillars.</span></h3>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {coreModels.map((model, i) => (
                    <motion.div 
                        key={i} 
                        {...fadeIn}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white p-12 rounded-[56px] shadow-sm hover:shadow-2xl transition-all duration-500 group border border-transparent hover:border-brand-primary/10 h-full flex flex-col"
                    >
                        <div className={`w-16 h-16 ${model.color} rounded-2xl flex items-center justify-center text-gray-900 mb-10 group-hover:scale-110 transition-transform`}>
                            {model.icon}
                        </div>
                        <h4 className="text-2xl font-black mb-6 text-gray-900 leading-tight">{model.title}</h4>
                        <p className="text-lg text-gray-500 font-medium leading-relaxed mb-10">
                            {model.desc}
                        </p>
                        <div className="mt-auto pt-8 border-t border-gray-50">
                            <button className="flex items-center gap-2 text-[12px] font-black uppercase tracking-widest text-brand-primary hover:gap-4 transition-all">
                                Success Stories <ArrowRight size={14} />
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* Extracurricular & Awards */}
      <section className="py-32 bg-white">
        <div className="container-custom">
            <div className="bg-gray-900 rounded-[64px] overflow-hidden shadow-2xl flex flex-col lg:flex-row items-stretch border border-white/10">
                <div className="flex-1 p-12 lg:p-24 space-y-10 text-white">
                    <div className="flex items-center gap-3 text-brand-secondary">
                        <Star size={20} />
                        <h4 className="font-black uppercase tracking-widest text-xs">Excellence Awarded</h4>
                    </div>
                    <h3 className="text-4xl lg:text-6xl font-black leading-tight tracking-tighter">More Than Just <br/> <span className="text-brand-secondary">Classrooms.</span></h3>
                    <p className="text-xl text-gray-400 leading-relaxed font-medium">
                        Our students actively participate in various national and international day significance observations and competitions, often being awarded for their outstanding performances.
                    </p>
                    <div className="pt-6">
                        <button className="px-10 py-5 bg-brand-secondary text-gray-900 font-black rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all">
                            View Student Awards
                        </button>
                    </div>
                </div>
                <div className="flex-1 relative min-h-[400px]">
                    <Image 
                        src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop" 
                        alt="Student Excellence" 
                        fill 
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-l from-gray-900 via-transparent to-transparent"></div>
                </div>
            </div>
        </div>
      </section>

      {/* Educational Call to Action */}
      <section className="py-40 bg-brand-light">
        <div className="container-custom text-center">
            <motion.div {...fadeIn} className="max-w-4xl mx-auto">
                <h3 className="text-5xl lg:text-8xl font-black text-gray-900 mb-12 leading-[1] tracking-tighter">Join the <br/> <span className="text-brand-primary">Knowledge Era.</span></h3>
                <p className="text-2xl text-gray-600 font-medium mb-16">
                    Partner with VERC to expand our innovative education models to even more marginalized communities across Bangladesh.
                </p>
                <div className="flex flex-wrap justify-center gap-6">
                    <button className="px-12 py-6 bg-brand-primary text-white text-xl font-black rounded-3xl shadow-[0_20px_50px_rgba(0,75,141,0.3)] hover:scale-105 active:scale-95 transition-all">
                        Support a School
                    </button>
                    <button className="px-12 py-6 bg-white text-brand-primary text-xl font-bold rounded-3xl border-2 border-brand-primary/10 hover:bg-brand-primary/5 transition-all">
                        Volunteer Programs
                    </button>
                </div>
            </motion.div>
        </div>
      </section>
    </div>
  );
}
