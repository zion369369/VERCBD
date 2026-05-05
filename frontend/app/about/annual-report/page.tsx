"use client";

import React from "react";
import { motion } from "framer-motion";
import { FileText, Calendar, ExternalLink, ArrowRight, Download, BarChart3, PieChart, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function AnnualReportPage() {
  const reports = [
    { 
      year: "2023 - 2024", 
      title: "Impact & Resilience", 
      desc: "Latest comprehensive overview of VERC's programmatic achievements and financial health.",
      link: "https://www.vercbd.org/images/VERC%20Annual%20Report%20(Short%20Version)_Final.pdf",
      highlight: true
    },
    { 
      year: "2022 - 2023", 
      title: "Growth & Innovation", 
      desc: "Detailed report on community-led initiatives and institutional growth.",
      link: "https://www.vercbd.org/images/VERC%20ANNUAL%20REPORT%202024.pdf"
    },
    { 
      year: "2021 - 2022", 
      title: "Sustainability Goals", 
      desc: "Review of progress toward long-term developmental sustainability.",
      link: "https://www.vercbd.org/images/ANNUAL%20REPORT_2021-2022.pdf"
    },
    { 
      year: "2020 - 2021", 
      title: "Community Response", 
      desc: "A year of significant field-level impact and emergency humanitarian response.",
      link: "https://www.vercbd.org/images/ANNUAL%20REPORT_2020-2021.pdf"
    },
    { 
      year: "2019 - 2020", 
      title: "Vision Realization", 
      desc: "Strategic review of thematic areas and societal vision achievement.",
      link: "https://www.vercbd.org/images/ANNUAL%20REPORT%202019-2020.pdf"
    },
    { 
      year: "2018 - 2019", 
      title: "Legacy of Excellence", 
      desc: "Historical performance data and programmatic milestone verification.",
      link: "https://www.vercbd.org/images/Annual%20report%202018-2019.pdf"
    },
  ];

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  };

  return (
    <div className="bg-[#F8F9FA] min-h-screen font-sans">
      {/* Premium Header */}
      <section className="bg-white border-b border-gray-100 pt-32 pb-24">
        <div className="container-custom text-center max-w-4xl mx-auto">
            <motion.div {...fadeIn}>
                <div className="flex items-center justify-center gap-3 text-brand-primary mb-8">
                    <BarChart3 size={24} />
                    <h2 className="font-black uppercase tracking-[0.4em] text-xs">Transparency Archive</h2>
                </div>
                <h1 className="text-5xl lg:text-8xl font-black text-gray-900 mb-10 leading-[0.95] tracking-tighter">
                    Annual <br/> <span className="text-brand-primary">Reports.</span>
                </h1>
                <p className="text-xl text-gray-500 font-medium leading-relaxed">
                    A comprehensive archive of our yearly performance, financial disclosures, and impact milestones.
                </p>
            </motion.div>
        </div>
      </section>

      {/* Reports Grid */}
      <section className="py-24">
        <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {reports.map((report, i) => (
                    <motion.div 
                        key={i}
                        {...fadeIn}
                        transition={{ delay: i * 0.1 }}
                        className={`group relative bg-white p-10 rounded-[48px] shadow-[0_30px_60px_rgba(0,0,0,0.04)] border ${report.highlight ? "border-brand-primary/20 ring-1 ring-brand-primary/5" : "border-gray-50"} hover:shadow-2xl transition-all duration-500 flex flex-col h-full`}
                    >
                        {report.highlight && (
                            <div className="absolute -top-4 right-10 px-4 py-1.5 bg-brand-primary text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
                                Latest Release
                            </div>
                        )}
                        <div className="flex items-center gap-4 mb-8">
                            <div className={`w-14 h-14 ${report.highlight ? "bg-brand-primary text-white" : "bg-gray-50 text-brand-primary"} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                <FileText size={28} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Fiscal Year</p>
                                <h4 className="text-xl font-black text-gray-900">{report.year}</h4>
                            </div>
                        </div>
                        <h5 className="text-lg font-bold text-gray-800 mb-4">{report.title}</h5>
                        <p className="text-sm text-gray-500 leading-relaxed font-medium mb-10">{report.desc}</p>
                        
                        <div className="mt-auto pt-8 border-t border-gray-50 flex items-center justify-between">
                            <Link 
                                href={report.link} 
                                target="_blank"
                                className="flex items-center gap-2 text-[12px] font-black uppercase tracking-widest text-brand-primary hover:gap-4 transition-all"
                            >
                                View Report <ExternalLink size={14} />
                            </Link>
                            <div className="flex gap-4 opacity-30 group-hover:opacity-100 transition-opacity">
                                <PieChart size={18} className="text-gray-300" />
                                <TrendingUp size={18} className="text-gray-300" />
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* Stats Bridge */}
      <section className="py-24 bg-gray-900 text-white">
        <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 text-center">
                {[
                    { label: "Decades of Data", value: "40+", sub: "Historical Archives" },
                    { label: "Audit Compliance", value: "100%", sub: "Unqualified Opinions" },
                    { label: "Transparency", value: "Public", sub: "Annual Disclosures" }
                ].map((stat, i) => (
                    <motion.div key={i} {...fadeIn}>
                        <h4 className="text-5xl lg:text-7xl font-black mb-4 tracking-tighter text-brand-secondary">{stat.value}</h4>
                        <p className="text-[12px] font-black uppercase tracking-[0.3em] mb-2">{stat.label}</p>
                        <p className="text-sm text-gray-500 font-medium">{stat.sub}</p>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* Verification CTA */}
      <section className="py-32 bg-white">
        <div className="container-custom text-center">
            <div className="max-w-2xl mx-auto space-y-8">
                <h3 className="text-4xl font-black text-gray-900 tracking-tight">Need a Physical Copy?</h3>
                <p className="text-lg text-gray-500 font-medium">
                    Hard copies of our annual reports are available at our Savar headquarters for partners and researchers.
                </p>
                <div className="pt-6">
                    <button className="btn-primary px-10 py-5 rounded-2xl shadow-xl hover:scale-105 active:scale-95 transition-all">
                        Request Physical Archive
                    </button>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
}
