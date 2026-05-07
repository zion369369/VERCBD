"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Globe, 
  Send, 
  MessageSquare, 
  CheckCircle2,
  Building2,
  Headphones,
  UserCheck
} from "lucide-react";
import Image from "next/image";

export default function ContactPage() {
  const contactInfo = [
    {
      title: "Head Office",
      desc: "B-30, Ekhlaspur, Savar, Dhaka-1340, Bangladesh",
      icon: <Building2 className="text-brand-primary" />,
      action: "Get Directions",
      link: "https://maps.google.com"
    },
    {
      title: "Email Us",
      desc: "info@vercbd.org",
      sub: "General Inquiries",
      icon: <Mail className="text-brand-primary" />,
      action: "Send Message",
      link: "mailto:info@vercbd.org"
    },
    {
      title: "Call Support",
      desc: "+880-2-224441511",
      sub: "Sun-Thu, 9am - 5pm",
      icon: <Phone className="text-brand-primary" />,
      action: "Call Now",
      link: "tel:+8802224441511"
    }
  ];

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  };

  return (
    <div className="bg-white min-h-screen font-sans selection:bg-brand-primary/10 overflow-x-hidden">
      {/* 1. HERO */}
      <section className="relative h-[50vh] flex items-center overflow-hidden bg-gray-900">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
            alt="Contact VERC" 
            fill 
            className="object-cover opacity-50 scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/60 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-900"></div>
        </div>
        
        <div className="container-custom relative z-10 text-white">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="max-w-4xl"
          >
            <span className="inline-flex items-center gap-2 px-5 py-2 bg-brand-primary/20 backdrop-blur-xl rounded-full text-[11px] font-black uppercase tracking-[0.4em] mb-10 border border-brand-primary/30 text-brand-secondary">
              Connect with Us
            </span>
            <h1 className="text-6xl lg:text-9xl font-black mb-8 leading-[0.95] tracking-tighter">
              Get in <br/> <span className="text-brand-secondary">Touch.</span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed font-medium max-w-2xl">
              Have questions about our programs or want to partner with us? Our team is ready to listen and collaborate.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. CONTACT OPTIONS */}
      <section className="py-32 bg-white relative z-20 rounded-t-[64px] -mt-12">
        <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {contactInfo.map((info, i) => (
                    <motion.div 
                        key={i}
                        {...fadeIn}
                        transition={{ delay: i * 0.1 }}
                        className="p-12 bg-gray-50 rounded-[56px] border border-gray-100 flex flex-col group hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
                    >
                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-10 group-hover:scale-110 transition-transform duration-500">
                            {info.icon}
                        </div>
                        <h4 className="text-2xl font-black text-gray-900 mb-4">{info.title}</h4>
                        <p className="text-lg text-gray-500 font-medium leading-relaxed mb-1">
                            {info.desc}
                        </p>
                        {info.sub && <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-10">{info.sub}</p>}
                        <div className="mt-auto pt-8 border-t border-gray-200">
                            <a href={info.link} target={info.link.startsWith('http') ? '_blank' : '_self'} className="flex items-center gap-2 text-[12px] font-black uppercase tracking-widest text-brand-primary hover:gap-4 transition-all">
                                {info.action} <Send size={14} />
                            </a>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* 3. CONTACT FORM & MAP */}
      <section className="py-32 bg-gray-50">
        <div className="container-custom">
            <div className="bg-white rounded-[64px] shadow-2xl overflow-hidden flex flex-col lg:flex-row items-stretch border border-gray-100">
                <div className="flex-1 p-12 lg:p-24 space-y-12">
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 text-brand-primary">
                            <MessageSquare size={24} />
                            <h2 className="font-black uppercase tracking-widest text-xs">Send Message</h2>
                        </div>
                        <h3 className="text-4xl lg:text-6xl font-black text-gray-900 leading-tight tracking-tighter">
                            Direct Inquiry <br/> <span className="text-brand-primary">Gateway.</span>
                        </h3>
                    </div>
                    
                    <form className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-2">Full Name</label>
                                <input type="text" placeholder="John Doe" className="w-full px-8 py-5 bg-gray-50 border border-transparent rounded-[24px] focus:bg-white focus:border-brand-primary/20 focus:ring-4 focus:ring-brand-primary/5 transition-all outline-none font-medium" />
                            </div>
                            <div className="space-y-3">
                                <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-2">Email Address</label>
                                <input type="email" placeholder="john@example.com" className="w-full px-8 py-5 bg-gray-50 border border-transparent rounded-[24px] focus:bg-white focus:border-brand-primary/20 focus:ring-4 focus:ring-brand-primary/5 transition-all outline-none font-medium" />
                            </div>
                        </div>
                        <div className="space-y-3">
                            <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-2">Inquiry Type</label>
                            <select className="w-full px-8 py-5 bg-gray-50 border border-transparent rounded-[24px] focus:bg-white focus:border-brand-primary/20 focus:ring-4 focus:ring-brand-primary/5 transition-all outline-none font-medium appearance-none">
                                <option>General Inquiry</option>
                                <option>Partnership Proposal</option>
                                <option>Donor Information</option>
                                <option>Career Opportunity</option>
                                <option>Microfinance Query</option>
                            </select>
                        </div>
                        <div className="space-y-3">
                            <label className="text-[11px] font-black uppercase tracking-widest text-gray-400 ml-2">Your Message</label>
                            <textarea rows={6} placeholder="How can we help you?" className="w-full px-8 py-5 bg-gray-50 border border-transparent rounded-[24px] focus:bg-white focus:border-brand-primary/20 focus:ring-4 focus:ring-brand-primary/5 transition-all outline-none font-medium resize-none"></textarea>
                        </div>
                        <button className="w-full py-6 bg-brand-primary text-white text-xl font-black rounded-[24px] shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-4">
                            Send Message <Send size={20} />
                        </button>
                    </form>
                </div>
                
                <div className="flex-1 bg-gray-100 relative min-h-[400px]">
                    {/* Placeholder for Google Maps embed */}
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14602.700300486255!2d90.2602758!3d23.856754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755ebe946a4e40d%3A0xa64b38344e6d3!2sVERC%20Head%20Office!5e0!3m2!1sen!2sbd!4v1715012345678" 
                        className="absolute inset-0 w-full h-full grayscale border-none"
                        allowFullScreen
                        loading="lazy"
                    ></iframe>
                </div>
            </div>
        </div>
      </section>

      {/* 4. BRANCH NETWORK CTA */}
      <section className="py-40 bg-brand-light">
        <div className="container-custom">
            <div className="flex flex-col lg:flex-row items-center gap-24">
                <div className="flex-1 space-y-12">
                    <div className="flex items-center gap-3 text-brand-primary">
                        <MapPin size={24} />
                        <h2 className="font-black uppercase tracking-widest text-xs">Local Presence</h2>
                    </div>
                    <h3 className="text-5xl lg:text-8xl font-black text-gray-900 leading-[1] tracking-tighter">
                        Widespread <br/> <span className="text-brand-primary">Support.</span>
                    </h3>
                    <p className="text-xl text-gray-600 font-medium leading-relaxed">
                        With over **136 branches** across 25 areas in Bangladesh, VERC is always within reach of the communities we serve.
                    </p>
                    <div className="pt-8">
                        <button className="px-12 py-6 bg-white border-2 border-brand-primary text-brand-primary text-xl font-black rounded-3xl hover:bg-brand-primary hover:text-white transition-all">
                            Browse All Branches
                        </button>
                    </div>
                </div>
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                    {[
                        { title: "Savar Area", icon: <UserCheck size={24} />, count: "24 Branches" },
                        { title: "Mirsarai Area", icon: <Globe size={24} />, count: "12 Branches" },
                        { title: "Northern Regions", icon: <Clock size={24} />, count: "45 Branches" },
                        { title: "Coastal Areas", icon: <Headphones size={24} />, count: "18 Branches" }
                    ].map((area, i) => (
                        <div key={i} className="p-10 bg-white rounded-[40px] shadow-sm flex flex-col items-center text-center group hover:bg-brand-primary transition-all duration-500">
                            <div className="text-brand-primary mb-6 group-hover:text-white transition-colors">{area.icon}</div>
                            <h5 className="text-xl font-black text-gray-900 group-hover:text-white mb-2">{area.title}</h5>
                            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-white/60">{area.count}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </section>
    </div>
  );
}
