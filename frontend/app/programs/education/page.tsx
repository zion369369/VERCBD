"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BookOpen, 
  GraduationCap, 
  Users, 
  Sparkles, 
  Heart, 
  CheckCircle2, 
  ArrowRight, 
  Lightbulb, 
  Baby, 
  Star,
  MapPin,
  ShieldCheck,
  Award,
  Target,
  ChevronRight,
  School,
  Layers,
  Activity,
  HeartHandshake,
  Check,
  Building,
  FileCheck,
  Compass
} from "lucide-react";
import Image from "next/image";
import educationHero1 from "@/app/assets/edu_1.png";
import educationHero2 from "@/app/assets/edu_2.png";
import educationHero3 from "@/app/assets/edu_3.png";

export default function LifeSkillEducationPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [educationHero1, educationHero2, educationHero3];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [slides.length]);

  const keyFocusAreas = [
    { title: "Non-Formal Education (NFE)", desc: "Flexible community-based learning for out-of-school and marginalized children." },
    { title: "Foundational Literacy & Numeracy", desc: "Core reading, writing, and numeracy mastery through child-centred pedagogy." },
    { title: "Life Skills & Socio-Emotional Growth", desc: "Developing personal confidence, social awareness, and critical competencies." },
    { title: "Catch-Up & Accelerated Learning", desc: "Targeted remedial pathways to recover lost learning for dropout and at-risk children." },
    { title: "Formal School Mainstreaming", desc: "Structured transition support to reintegrate learners into Government Primary Schools (GPS)." },
    { title: "Community-Led Centers", desc: "Operating grassroots Learning Centers managed jointly with local parent committees." },
    { title: "Adult & Adolescent Education", desc: "Functional literacy, awareness, and life skills for youth and women." },
    { title: "Inclusion & Safeguarding", desc: "Proactive gender equity, disability-inclusive access, and strict child protection standards." },
    { title: "Teacher Capacity Development", desc: "Continuous pedagogical training, monthly coaching refreshers, and modern teaching aids." },
    { title: "System Strengthening", desc: "Collaborative monitoring with CMCs, local governments, and national education authorities." }
  ];

  const learningApproaches = [
    {
      title: "Catch-up Programme",
      timeline: "6–10 Months Accelerated",
      target: "Recent dropouts & out-of-school youth",
      points: [
        "Rapid foundational competency recovery",
        "Direct re-entry into formal primary schools",
        "At least 1 year post-transition tracking"
      ],
      color: "border-blue-200 bg-blue-50/40 text-blue-900"
    },
    {
      title: "MGML–NFPE Curriculum",
      timeline: "Multi-Grade Multi-Level",
      target: "Children aged 8–14 years",
      points: [
        "Activity-based, child-centred learning",
        "Diagnostic & formative assessments",
        "Remedial support & progression tracking"
      ],
      color: "border-emerald-200 bg-emerald-50/40 text-emerald-900"
    },
    {
      title: "Inclusive & Resilient Delivery",
      timeline: "Community-Embedded",
      target: "Girls & children with disabilities",
      points: [
        "Zero-barrier physical & social access",
        "Comprehensive child safeguarding protocols",
        "Direct linkages with local GPS networks"
      ],
      color: "border-purple-200 bg-purple-50/40 text-purple-900"
    }
  ];

  const majorActivities = [
    {
      title: "Access & Center Operations",
      points: [
        "Learner mapping & verified community enrolment",
        "Fully equipped & operated 300 community Learning Centers"
      ]
    },
    {
      title: "Teaching & Learning Quality",
      points: [
        "Local teacher recruitment & monthly pedagogical refreshers",
        "Curriculum materials, diagnostic assessments & remedial aids"
      ]
    },
    {
      title: "Learner Support & Retention",
      points: [
        "Targeted stipends to mitigate economic hardship",
        "Daily attendance tracking, home visits & monthly parents' meetings"
      ]
    },
    {
      title: "Community & System Transition",
      points: [
        "Center Management Committee (CMC) governance mobilization",
        "Joint monitoring with Upazila education officers & GPS tracking"
      ]
    }
  ];

  const impactMetrics = [
    { value: "300", label: "Learning Centers", detail: "Active across Narsingdi Sadar & Raipura" },
    { value: "100%", label: "Child-Centred", detail: "Activity-based, inclusive learning approach" },
    { value: "1979", label: "Pioneering Legacy", detail: "Over 4 decades of Non-Formal Education" },
    { value: "UNICEF", label: "Strategic Partner", detail: "Supported under the EMDC initiative" }
  ];

  const fadeIn = {
    initial: { opacity: 0, y: 15 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  };

  return (
    <div className="bg-white min-h-screen font-sans selection:bg-brand-primary/10 overflow-x-hidden">
      
      {/* 1. HERO HEADER */}
      <section className="relative pt-36 pb-24 lg:pt-44 lg:pb-32 bg-gray-900 overflow-hidden text-white">
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 0.8, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image 
                src={slides[currentSlide]} 
                alt="Life Skill Education" 
                fill 
                className="object-cover"
                priority
              />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-b from-gray-950/50 via-gray-950/35 to-gray-950/85"></div>
        </div>
        
        <div className="container-custom relative z-10 max-w-4xl mx-auto text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            {/* Breadcrumb */}
            <div className="flex items-center justify-center gap-2 text-xs font-semibold text-gray-300 uppercase tracking-widest">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight size={12} />
              <Link href="/programs/education" className="hover:text-white transition-colors">Social Programs</Link>
              <ChevronRight size={12} />
              <span className="text-brand-secondary">Life Skill Education</span>
            </div>

            {/* Institution Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-xs font-medium text-gray-200 border border-white/15">
              <MapPin size={13} className="text-brand-secondary" />
              <span>Village Education Resource Center (VERC) • Savar, Dhaka</span>
            </div>

            <div className="space-y-3">
              <span className="inline-block px-4 py-1 bg-brand-primary/30 backdrop-blur-md rounded-full text-xs font-bold text-brand-secondary uppercase tracking-widest border border-brand-primary/40">
                Life Skill Education Section
              </span>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
                Inclusive Learning & <br />
                <span className="text-brand-secondary">Life Skill Development.</span>
              </h1>
            </div>
            
            <p className="text-base sm:text-lg lg:text-xl text-gray-100 font-medium max-w-3xl mx-auto leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              Expanding meaningful educational opportunities for out-of-school children, adolescents, and disadvantaged communities across Bangladesh since 1979.
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <Link href="/donate" className="px-7 py-3.5 bg-brand-secondary text-gray-900 font-black rounded-xl shadow-lg hover:scale-105 transition-all text-sm">
                Support a Learning Center
              </Link>
              <Link href="/contact" className="px-7 py-3.5 bg-white/10 text-white border border-white/20 font-bold rounded-xl hover:bg-white/20 transition-all text-sm">
                Partner with VERC
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. EXECUTIVE KPI SNAPSHOT */}
      <section className="relative z-20 -mt-10">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {impactMetrics.map((kpi, i) => (
              <motion.div
                key={i}
                {...fadeIn}
                transition={{ delay: i * 0.08 }}
                className="bg-white p-6 rounded-2xl border border-gray-200 shadow-md flex flex-col items-center text-center space-y-1"
              >
                <div className="text-3xl lg:text-4xl font-black text-brand-primary">{kpi.value}</div>
                <div className="text-xs font-bold text-gray-900 uppercase tracking-wider">{kpi.label}</div>
                <div className="text-[11px] text-gray-500 font-medium">{kpi.detail}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SECTION OVERVIEW & CORE PRINCIPLES */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-primary">Section Overview</span>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
                Education Beyond Literacy & Numeracy
              </h2>
            </div>

            <div className="bg-gray-50/80 p-8 sm:p-10 rounded-3xl border border-gray-200/80 space-y-5 text-gray-700 text-sm sm:text-base leading-relaxed">
              <p>
                VERC’s <strong>Life Skill Education Section</strong> is dedicated to expanding inclusive and meaningful learning opportunities for children, adolescents, women, and disadvantaged communities. As a pioneer in <strong>Non-Formal Education (NFE)</strong> in Bangladesh, VERC develops community-based, learner-centred models to reach children underserved by the formal school system.
              </p>
              <p>
                The Section advances holistic development by cultivating <strong>life skills, self-confidence, creativity, social awareness, and practical competencies</strong>. Through participatory methods, community mobilization, teacher coaching, and contextual learning materials, VERC makes education accessible, relevant, and engaging for every learner.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. KEY FOCUS AREAS (CLEAN GOOGLE/UNICEF BULLET GRID) */}
      <section className="py-20 bg-gray-50/60 border-t border-b border-gray-200/60">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-14 space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-primary">Strategic Framework</span>
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
              10 Key Focus Areas
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 font-medium">
              Systematic interventions targeting educational exclusion and foundational gaps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
            {keyFocusAreas.map((item, i) => (
              <motion.div
                key={i}
                {...fadeIn}
                transition={{ delay: i * 0.04 }}
                className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs flex items-start gap-3.5 hover:border-brand-primary/30 transition-all"
              >
                <div className="w-7 h-7 bg-brand-primary/10 rounded-lg flex items-center justify-center text-brand-primary font-bold text-xs flex-shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-sm font-bold text-gray-900">{item.title}</h4>
                  <p className="text-xs text-gray-600 leading-normal">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FLAGSHIP PROJECT: EMDC (UNICEF BANGLADESH SUPPORTED) */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto bg-gray-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl space-y-10 border border-gray-800">
            
            {/* Header */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/10 rounded-full text-xs font-bold text-brand-secondary border border-white/10">
                <Award size={13} /> Flagship Initiative • Supported by UNICEF Bangladesh
              </div>
              <h3 className="text-2xl sm:text-4xl font-black tracking-tight leading-snug">
                Educate the Most Disadvantaged Children (EMDC)
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-4xl">
                Implemented across <strong>300 community-based Learning Centers</strong> in <strong>Narsingdi Sadar & Raipura</strong>, EMDC delivers flexible education to the most deprived children, combining accelerated catch-up learning with Multi-Grade Multi-Level (MGML-NFPE) child-centred pedagogy.
              </p>
            </div>

            {/* Structured Learning Approaches */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-brand-secondary">Learning Delivery Models</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {learningApproaches.map((app, i) => (
                  <div key={i} className={`p-5 rounded-2xl border ${app.color} bg-white/5 space-y-3`}>
                    <div>
                      <h5 className="text-sm font-bold text-white">{app.title}</h5>
                      <span className="text-[11px] text-brand-secondary font-semibold">{app.timeline}</span>
                    </div>
                    <ul className="space-y-1.5 text-xs text-gray-300">
                      {app.points.map((pt, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check size={12} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Major Activities Matrix */}
            <div className="space-y-4 pt-4 border-t border-white/10">
              <h4 className="text-xs font-bold uppercase tracking-widest text-brand-secondary">Key Operational Activities</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {majorActivities.map((act, i) => (
                  <div key={i} className="p-4 bg-white/5 rounded-xl border border-white/10 space-y-2">
                    <h6 className="text-xs font-bold text-white uppercase tracking-wider">{act.title}</h6>
                    <ul className="space-y-1 text-xs text-gray-300">
                      {act.points.map((p, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-brand-secondary font-bold">•</span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. MEASURABLE IMPACT & COMMITMENT (UNICEF/GOOGLE REPORT FORMAT) */}
      <section className="py-20 bg-gray-50/70 border-t border-gray-200/60">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            
            {/* Impact Box */}
            <motion.div {...fadeIn} className="p-8 bg-white rounded-3xl border border-gray-200 shadow-xs space-y-5 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-emerald-600 text-xs font-bold uppercase tracking-wider">
                  <Activity size={16} /> Measurable Outcomes
                </div>
                <h3 className="text-2xl font-black text-gray-900 tracking-tight">Our Impact</h3>
                <ul className="space-y-2.5 text-xs sm:text-sm text-gray-600 leading-relaxed">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Inclusive Access:</strong> Flexible learning pathways for out-of-school children, girls, and learners with disabilities.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Foundational Mastery:</strong> High competency gains in reading, numeracy, confidence, and essential life skills.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Dropout Mitigation:</strong> Remedial coaching, monthly stipends, and continuous home follow-ups.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span><strong>Formal Mainstreaming:</strong> Sustained transition into Government Primary Schools (GPS) with CMC oversight.</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t border-gray-100 text-[11px] font-bold text-gray-500 flex items-center gap-2">
                <ShieldCheck size={14} className="text-emerald-600" />
                <span>Verified Field Quality & Child Safeguarding Compliance</span>
              </div>
            </motion.div>

            {/* Commitment Box */}
            <motion.div {...fadeIn} transition={{ delay: 0.1 }} className="p-8 bg-brand-primary text-white rounded-3xl shadow-lg space-y-5 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-brand-secondary text-xs font-bold uppercase tracking-wider">
                  <HeartHandshake size={16} /> Institutional Mandate
                </div>
                <h3 className="text-2xl font-black text-white tracking-tight">Our Commitment</h3>
                <blockquote className="text-base sm:text-lg text-white font-medium italic border-l-2 border-brand-secondary pl-3">
                  &ldquo;VERC remains committed to leaving no learner behind.&rdquo;
                </blockquote>
                <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
                  Through pioneering Non-Formal and Life Skill education models, VERC continues to create flexible pathways to empowerment, building a skilled, inclusive, and resilient society across Bangladesh.
                </p>
              </div>

              <div className="pt-4 border-t border-white/15 flex flex-wrap gap-3">
                <Link href="/donate" className="px-5 py-2.5 bg-brand-secondary text-gray-900 font-bold rounded-xl text-xs hover:scale-105 transition-all shadow-sm">
                  Support a Student
                </Link>
                <Link href="/contact" className="px-5 py-2.5 bg-white/10 text-white font-semibold rounded-xl text-xs border border-white/20 hover:bg-white/20 transition-all">
                  Contact Education Team
                </Link>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 7. INSTITUTIONAL CALL TO ACTION */}
      <section className="py-16 bg-gray-900 text-white text-center">
        <div className="container-custom max-w-3xl mx-auto space-y-5">
          <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
            Partner with VERC for Inclusive Education
          </h3>
          <p className="text-xs sm:text-sm text-gray-300 max-w-xl mx-auto leading-relaxed">
            Collaborate on community Learning Centers, teacher coaching modules, or CSR educational initiatives.
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <Link href="/contact" className="px-6 py-3 bg-brand-secondary text-gray-900 text-xs font-bold rounded-xl hover:scale-105 transition-all">
              Inquire for Partnership
            </Link>
            <Link href="/donate" className="px-6 py-3 bg-white/10 text-white border border-white/20 text-xs font-bold rounded-xl hover:bg-white/20 transition-all">
              Make a Contribution
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
