"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Globe, 
  Handshake, 
  Building2, 
  Users, 
  CheckCircle2, 
  ArrowRight, 
  ExternalLink,
  ShieldCheck,
  Heart,
  Briefcase,
  Layers,
  Sparkles,
  Search,
  Zap
} from "lucide-react";
import Image from "next/image";
import partnersHero from "@/app/assets/partners_hero.png";

// Import Logos
import worldbankLogo from "@/app/assets/worldbank_logo.png";
import unicefLogo from "@/app/assets/unicef_logo.png";
import usaidLogo from "@/app/assets/usaid_logo.png";
import wateraidLogo from "@/app/assets/wateraid_logo.png";
import winrockLogo from "@/app/assets/winrock_logo.png";
import pksfLogo from "@/app/assets/pksf_logo.png";
import savethechildrenLogo from "@/app/assets/savethechildren_logo.png";
import hmLogo from "@/app/assets/hm_logo.png";
import mraLogo from "@/app/assets/mra_logo.png";
import gobLogo from "@/app/assets/gob_logo.png";
import careLogo from "@/app/assets/care_logo.png";
import sciLogo from "@/app/assets/sci_logo.png";
import swisscontactLogo from "@/app/assets/swisscontact_logo.jpg";
import ccaLogo from "@/app/assets/cca_logo.png";

export default function PartnersPage() {
  const internationalPartners = [
    { 
      name: "World Bank", 
      desc: "Major financial and technical partner. Implementing the 'RAISE' project and SMART sub-projects.",
      highlight: "RAISE Project",
      logo: worldbankLogo
    },
    { 
      name: "Palli Karma-Sahayak Foundation (PKSF)", 
      desc: "Key Bangladeshi partner co-implementing RAISE and supporting post-flood health activities.",
      highlight: "Key Local Partner",
      logo: pksfLogo
    },
    { 
      name: "H&M Foundation", 
      desc: "Financial support for the 'Oporajita' project empowering women garment workers.",
      highlight: "Women Empowerment",
      logo: hmLogo
    },
    { 
      name: "Save the Children - USA", 
      desc: "Original founding collaborator (1977) along with UNICEF.",
      highlight: "Founding Partner",
      logo: savethechildrenLogo
    },
    { 
      name: "UNICEF", 
      desc: "Provided original funding to establish VERC as a project in its early years.",
      highlight: "Original Funding",
      logo: unicefLogo
    },
    { 
      name: "Winrock International", 
      desc: "Collaborator on improved cookstoves (ICS) and indoor air pollution pilot projects.",
      highlight: "Clean Energy",
      logo: winrockLogo
    },
    { 
      name: "WaterAid Bangladesh", 
      desc: "Pioneered Community-Led Total Sanitation (CLTS) with VERC in Feb 2000.",
      highlight: "CLTS Pioneer",
      logo: wateraidLogo
    },
    { 
      name: "USAID", 
      desc: "Collaboration on several critical development studies across Bangladesh.",
      highlight: "Research Partner",
      logo: usaidLogo
    }
  ];

  const ngoPartners = [
    { 
      name: "CARE Bangladesh", 
      desc: "Consortium partner on the 'Oporajita' project.",
      logo: careLogo 
    },
    { 
      name: "Save the Children International", 
      desc: "Consortium partner on the 'Oporajita' project.",
      logo: sciLogo 
    },
    { 
      name: "Swisscontact Bangladesh", 
      desc: "Consortium partner organization in 'Oporajita'.",
      logo: swisscontactLogo 
    },
    { 
      name: "Clean Cooking Alliance", 
      desc: "VERC is the Country Contact Point for Bangladesh for the Clean Cooking Alliance.",
      logo: null // Fallback to icon
    },
    { 
      name: "ICS Network Partners", 
      desc: "Network of 93 national and local NGOs across 28 districts promoting improved cookstoves.",
      logo: null
    }
  ];

  const govtPartners = [
    { 
      name: "NGO Affairs Bureau", 
      desc: "Primary government body registering and overseeing NGO activities in Bangladesh.",
      logo: gobLogo
    },
    { 
      name: "Ministry of Social Welfare", 
      desc: "Registration authority for social welfare activities.", 
      logo: gobLogo 
    },
    { 
      name: "Microcredit Regulatory Authority (MRA)", 
      desc: "Regulatory body for microfinance programs.", 
      logo: mraLogo 
    },
    { 
      name: "Local Government Offices", 
      desc: "Upazila Health, Social Welfare, Education, and Youth Development offices.",
      logo: gobLogo
    }
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
      <section className="relative h-[70vh] flex items-center overflow-hidden bg-gray-900">
        <div className="absolute inset-0 z-0">
          <Image 
            src={partnersHero} 
            alt="Development Partners" 
            fill 
            className="object-cover opacity-50 scale-105"
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
              Strategic Collaboration
            </span>
            <h1 className="text-6xl lg:text-9xl font-black mb-10 leading-[0.95] tracking-tighter">
              Global <br/> <span className="text-brand-secondary">Partners.</span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed font-medium max-w-2xl mx-auto">
              Building a sustainable future through strong partnerships with international donors, NGOs, and the Government of Bangladesh.
            </p>
          </motion.div>
        </div>
      </section>

      {/* International Partners Section */}
      <section className="py-32 bg-white overflow-hidden">
        <div className="container-custom">
            <div className="flex items-center gap-4 mb-20">
                <div className="w-16 h-px bg-brand-primary/20"></div>
                <div className="flex items-center gap-3 text-brand-primary">
                    <Globe size={24} />
                    <h2 className="font-black uppercase tracking-[0.2em] text-xs">International Donors</h2>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {internationalPartners.map((partner, i) => (
                    <motion.div 
                        key={i}
                        {...fadeIn}
                        transition={{ delay: i * 0.05 }}
                        className="p-8 bg-gray-50 rounded-[40px] border border-transparent hover:border-brand-primary/10 hover:bg-white hover:shadow-2xl transition-all duration-500 group flex flex-col h-full"
                    >
                        <div className="mb-6 flex justify-between items-start">
                            <span className="px-3 py-1 bg-brand-primary/10 rounded-full text-[9px] font-black uppercase tracking-widest text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all">
                                {partner.highlight}
                            </span>
                            {partner.logo && (
                                <div className="w-12 h-12 relative transition-all duration-500">
                                    <Image 
                                        src={partner.logo} 
                                        alt={partner.name} 
                                        fill 
                                        className="object-contain"
                                    />
                                </div>
                            )}
                        </div>
                        <h4 className="text-xl font-black text-gray-900 mb-4 leading-tight group-hover:text-brand-primary transition-colors">{partner.name}</h4>
                        <p className="text-sm text-gray-500 font-medium leading-relaxed mb-8 flex-grow">
                            {partner.desc}
                        </p>
                        <div className="flex items-center gap-2 text-brand-secondary font-black uppercase text-[10px] tracking-widest opacity-0 group-hover:opacity-100 transition-all">
                            Collaboration <ArrowRight size={14} />
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* NGO & Consortia Section */}
      <section className="py-32 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[50%] h-full bg-brand-primary/5 -skew-x-12 transform translate-x-32"></div>
        <div className="container-custom relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-24 items-start">
                <div>
                    <div className="flex items-center gap-3 text-brand-secondary mb-8">
                        <Handshake size={28} />
                        <h2 className="font-black uppercase tracking-[0.2em] text-xs">Consortia Partners</h2>
                    </div>
                    <h3 className="text-5xl lg:text-6xl font-black leading-tight tracking-tighter mb-10">
                        NGO & <br/> <span className="text-brand-secondary">Consortia.</span>
                    </h3>
                    <p className="text-lg text-gray-400 font-medium leading-relaxed">
                        We collaborate with leading international and national NGOs to implement complex, high-impact projects like 'Oporajita' and the National ICS Network.
                    </p>
                </div>
                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {ngoPartners.map((partner, i) => (
                        <motion.div 
                            key={i}
                            {...fadeIn}
                            className="p-10 bg-white/5 border border-white/10 rounded-[48px] backdrop-blur-sm hover:bg-white/10 transition-all group flex flex-col h-full"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className="w-12 h-12 relative">
                                    {partner.logo ? (
                                        <Image 
                                            src={partner.logo} 
                                            alt={partner.name} 
                                            fill 
                                            className="object-contain grayscale group-hover:grayscale-0 transition-all"
                                        />
                                    ) : (
                                        <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-brand-secondary">
                                            <Zap size={24} />
                                        </div>
                                    )}
                                </div>
                            </div>
                            <h4 className="text-2xl font-black text-white mb-4 group-hover:text-brand-secondary transition-colors">{partner.name}</h4>
                            <p className="text-base text-gray-400 font-medium leading-relaxed italic">
                                {partner.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
      </section>

      {/* Government of Bangladesh Section */}
      <section className="py-32 bg-gray-50">
        <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto mb-24">
                <div className="flex items-center justify-center gap-3 text-brand-primary mb-6">
                    <Building2 size={24} />
                    <h2 className="font-black uppercase tracking-widest text-xs">Regulatory Bodies</h2>
                </div>
                <h3 className="text-4xl lg:text-6xl font-black mb-8 leading-tight tracking-tighter">Government of <br/> <span className="text-brand-primary">Bangladesh.</span></h3>
                <p className="text-xl text-gray-600 font-medium">
                    VERC works in close coordination with government ministries and regulatory authorities to ensure full compliance and maximized community reach.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {govtPartners.map((partner, i) => (
                    <motion.div 
                        key={i}
                        {...fadeIn}
                        transition={{ delay: i * 0.1 }}
                        className="flex gap-8 p-10 bg-white rounded-[48px] shadow-sm hover:shadow-xl transition-all border border-transparent hover:border-brand-primary/5 group"
                    >
                        <div className="flex-shrink-0 w-16 h-16 bg-brand-light rounded-2xl flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all overflow-hidden relative">
                            {partner.logo ? (
                                <Image 
                                    src={partner.logo} 
                                    alt={partner.name} 
                                    fill 
                                    className="object-contain p-2"
                                />
                            ) : (
                                <ShieldCheck size={28} />
                            )}
                        </div>
                        <div>
                            <h4 className="text-2xl font-black text-gray-900 mb-2">{partner.name}</h4>
                            <p className="text-lg text-gray-500 font-medium leading-relaxed">{partner.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-40 bg-brand-light">
        <div className="container-custom text-center">
            <motion.div {...fadeIn} className="max-w-4xl mx-auto">
                <div className="flex justify-center mb-10">
                    <div className="w-24 h-24 bg-brand-primary/10 rounded-full flex items-center justify-center text-brand-primary">
                        <Handshake size={48} />
                    </div>
                </div>
                <h3 className="text-5xl lg:text-8xl font-black text-gray-900 mb-12 leading-[1] tracking-tighter">Become a <br/> <span className="text-brand-primary">Partner.</span></h3>
                <p className="text-2xl text-gray-600 font-medium mb-16">
                    Join our network of international and national partners to drive sustainable human development across Bangladesh.
                </p>
                <div className="flex flex-wrap justify-center gap-6">
                    <button className="px-12 py-6 bg-brand-primary text-white text-xl font-black rounded-3xl shadow-[0_20px_50px_rgba(0,75,141,0.3)] hover:scale-105 active:scale-95 transition-all">
                        Propose Collaboration
                    </button>
                    <button className="px-12 py-6 bg-white text-brand-primary text-xl font-bold rounded-3xl border-2 border-brand-primary/10 hover:bg-brand-primary/5 transition-all">
                        Download Portfolio
                    </button>
                </div>
            </motion.div>
        </div>
      </section>
    </div>
  );
}
