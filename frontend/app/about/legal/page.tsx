"use client";

import React from "react";
import { motion } from "framer-motion";
import { Scale, FileCheck, ShieldCheck, Landmark, FileText, Download, ExternalLink, ScrollText, CheckCircle2, Building2, Gavel, Car, Users2 } from "lucide-react";
import Link from "next/link";

export default function LegalAffiliationPage() {
  const certifications = [
    { 
      title: "NGO Affairs Bureau Registration", 
      id: "NGOAB-001", 
      desc: "Official registration certificate under the NGO Affairs Bureau of Bangladesh.",
      icon: <Building2 className="text-blue-600" />,
      link: "https://www.vercbd.org/images/NGOAB.pdf"
    },
    { 
      title: "Social Welfare Certificate", 
      id: "SW-1981", 
      desc: "Registration under the Department of Social Services, Government of Bangladesh.",
      icon: <ShieldCheck className="text-emerald-600" />,
      link: "https://www.vercbd.org/images/Social%20Welfare.pdf"
    },
    { 
      title: "Microcredit Regulatory Authority (MRA)", 
      id: "MRA-CERT", 
      desc: "Authorized certificate for microfinance operations across Bangladesh.",
      icon: <Landmark className="text-indigo-600" />,
      link: "https://www.vercbd.org/images/Microcredit%20Rrgulatory%20Authority%20certificate%20latest.jpg"
    },
    { 
      title: "VAT Registration Certificate", 
      id: "VAT-REG", 
      desc: "Compliance with National Board of Revenue (NBR) value-added tax regulations.",
      icon: <FileCheck className="text-amber-600" />,
      link: "https://www.vercbd.org/images/vat.jpg"
    },
    { 
      title: "TIN Certificate", 
      id: "TIN-NBR", 
      desc: "Official Taxpayer's Identification Number issued by the Government.",
      icon: <FileText className="text-rose-600" />,
      link: "https://www.vercbd.org/images/tin.pdf"
    },
  ];

  const policies = [
    { 
      title: "Probationary Employment Policy", 
      desc: "Comprehensive guidelines for new staff integration and performance evaluation.",
      icon: <Users2 className="text-slate-600" />,
      link: "https://www.vercbd.org/images/PROBATIONARY%20EMPLOYMENT%20POLICY.pdf"
    },
    { 
      title: "Vehicle Management Policy", 
      desc: "Standard operating procedures for organizational logistics and fleet safety.",
      icon: <Car className="text-slate-600" />,
      link: "https://www.vercbd.org/images/Vehicle%20Management%20Policy%2023042025.pdf"
    },
  ];

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  return (
    <div className="bg-[#FDFDFD] min-h-screen font-sans">
      {/* Hero Header */}
      <section className="bg-white pt-32 pb-20 border-b border-gray-100">
        <div className="container-custom">
            <motion.div {...fadeIn} className="max-w-4xl">
                <div className="flex items-center gap-3 text-brand-primary mb-6">
                    <Scale size={24} />
                    <h2 className="font-black uppercase tracking-[0.3em] text-xs">Governance & Compliance</h2>
                </div>
                <h1 className="text-5xl lg:text-8xl font-black text-gray-900 mb-8 leading-[0.9] tracking-tighter">
                    Legal <br/> <span className="text-brand-primary">Affiliations.</span>
                </h1>
                <p className="text-xl text-gray-500 font-medium max-w-2xl leading-relaxed">
                    VERC is fully committed to legal transparency and regulatory compliance across all national and sectoral governing bodies.
                </p>
            </motion.div>
        </div>
      </section>

      {/* Certificates Grid */}
      <section className="py-24">
        <div className="container-custom">
            <div className="flex items-center gap-4 mb-16">
                <div className="h-px bg-gray-200 flex-1"></div>
                <h3 className="text-xs font-black uppercase tracking-[0.4em] text-gray-400">Registration & Certification</h3>
                <div className="h-px bg-gray-200 flex-1"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {certifications.map((cert, i) => (
                    <motion.div 
                        key={i}
                        {...fadeIn}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white p-10 rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-gray-100 hover:border-brand-primary/20 hover:shadow-xl transition-all group flex flex-col h-full"
                    >
                        <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                            {cert.icon}
                        </div>
                        <h4 className="text-xl font-black text-gray-900 mb-4 leading-tight">{cert.title}</h4>
                        <p className="text-sm text-gray-500 font-medium leading-relaxed mb-8">{cert.desc}</p>
                        <div className="flex items-center justify-between pt-6 border-t border-gray-50 mt-auto">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Active Status</span>
                            <div className="flex gap-4">
                                {cert.link && (
                                    <Link 
                                        href={cert.link} 
                                        target="_blank"
                                        className="text-[10px] font-black text-brand-primary uppercase tracking-widest hover:text-brand-secondary transition-colors flex items-center gap-1"
                                    >
                                        View Document <ExternalLink size={12} />
                                    </Link>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* Policies Section */}
      <section className="py-24 bg-gray-50">
        <div className="container-custom">
            <div className="flex flex-col lg:flex-row gap-20 items-start">
                <div className="lg:w-1/3">
                    <div className="flex items-center gap-3 text-brand-primary mb-6">
                        <ScrollText size={24} />
                        <h2 className="font-black uppercase tracking-[0.3em] text-xs">Standard Policies</h2>
                    </div>
                    <h3 className="text-4xl font-black text-gray-900 mb-8 leading-tight tracking-tight">Institutional <br/> Guidelines.</h3>
                    <p className="text-lg text-gray-500 font-medium leading-relaxed">
                        VERC maintains rigorous internal policies to ensure operational efficiency, safety, and employee welfare.
                    </p>
                </div>
                <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                    {policies.map((policy, i) => (
                        <motion.div 
                            key={i}
                            {...fadeIn}
                            className="bg-white p-12 rounded-[48px] shadow-sm border border-gray-100 flex flex-col group hover:shadow-lg transition-all h-full"
                        >
                            <div className="mb-10 text-gray-400 group-hover:text-brand-primary transition-colors">
                                {policy.icon}
                            </div>
                            <h4 className="text-2xl font-black text-gray-900 mb-4 leading-tight">{policy.title}</h4>
                            <p className="text-gray-500 font-medium leading-relaxed mb-10">{policy.desc}</p>
                            <Link 
                                href={policy.link}
                                target="_blank"
                                className="mt-auto flex items-center gap-2 text-[12px] font-black uppercase tracking-widest text-brand-primary hover:gap-4 transition-all"
                            >
                                View Policy <ExternalLink size={14} />
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
      </section>

      {/* Trust Footer */}
      <section className="py-32">
        <div className="container-custom text-center">
            <div className="max-w-3xl mx-auto space-y-10">
                <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 size={40} className="text-emerald-500" />
                </div>
                <h3 className="text-4xl font-black text-gray-900 tracking-tight">Fully Compliant & Certified.</h3>
                <p className="text-xl text-gray-500 font-medium">
                    Our compliance certifications are audited annually to maintain the highest standards of NGO governance in Bangladesh.
                </p>
                <div className="pt-8">
                    <button className="btn-primary px-10 py-5 rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all">
                        Inquire for Verification
                    </button>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
}
