"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Scale, 
  FileCheck, 
  ShieldCheck, 
  Landmark, 
  FileText, 
  ExternalLink, 
  ScrollText, 
  CheckCircle2, 
  Building2, 
  Car, 
  Users2, 
  ShieldAlert, 
  FileSpreadsheet,
  Check,
  Lock,
  BadgeCheck
} from "lucide-react";
import Link from "next/link";

export default function LegalAffiliationPage() {
  const certifications = [
    { 
      title: "NGO Affairs Bureau Registration", 
      authority: "Prime Minister's Office, Government of Bangladesh",
      regNo: "NGOAB Reg. No. 001", 
      desc: "Mandatory statutory registration permitting the receipt and utilization of foreign grants under the Foreign Donations Regulation Act.",
      icon: <Building2 className="text-blue-600" size={24} />,
      status: "Active & Verified",
      type: "Official PDF Document",
      link: "https://www.vercbd.org/images/NGOAB.pdf"
    },
    { 
      title: "Social Welfare Registration Certificate", 
      authority: "Department of Social Services (DSS), GoB",
      regNo: "Reg. No. SW-1981 / Savar", 
      desc: "Certified under the Voluntary Social Welfare Agencies Ordinance for comprehensive grassroots development and community welfare.",
      icon: <ShieldCheck className="text-emerald-600" size={24} />,
      status: "Active & Verified",
      type: "Official PDF Document",
      link: "https://www.vercbd.org/images/Social%20Welfare.pdf"
    },
    { 
      title: "Microcredit Regulatory Authority (MRA)", 
      authority: "Microcredit Regulatory Authority (MRA), Bangladesh",
      regNo: "MRA Certified License", 
      desc: "Statutory authorization to deliver inclusive microfinance, revolving loan funds, and financial literacy initiatives nationwide.",
      icon: <Landmark className="text-indigo-600" size={24} />,
      status: "Licensed Institution",
      type: "Official Certified Scan",
      link: "https://www.vercbd.org/images/Microcredit%20Rrgulatory%20Authority%20certificate%20latest.jpg"
    },
    { 
      title: "Value Added Tax (VAT) Registration", 
      authority: "National Board of Revenue (NBR), Bangladesh",
      regNo: "BIN / VAT Compliant", 
      desc: "Full tax compliance and active business identification registration with the National Board of Revenue.",
      icon: <FileCheck className="text-amber-600" size={24} />,
      status: "Tax Compliant",
      type: "Official Tax Record",
      link: "https://www.vercbd.org/images/vat.jpg"
    },
    { 
      title: "Taxpayer's Identification Number (TIN)", 
      authority: "Taxes Zone / National Board of Revenue (NBR)",
      regNo: "E-TIN Verified", 
      desc: "National Taxpayer Identification certifying annual revenue reporting and transparent fiscal governance.",
      icon: <FileText className="text-rose-600" size={24} />,
      status: "Fiscal Compliance",
      type: "Official TIN Record",
      link: "https://www.vercbd.org/images/tin.pdf"
    },
  ];

  const institutionalPolicies = [
    { 
      title: "Probationary Employment & HR Policy", 
      category: "Human Resources Governance",
      desc: "Standardized protocols for staff recruitment, merit-based orientation, fair employment standards, and periodic performance evaluations.",
      icon: <Users2 className="text-brand-primary" size={22} />,
      link: "https://www.vercbd.org/images/PROBATIONARY%20EMPLOYMENT%20POLICY.pdf"
    },
    { 
      title: "Vehicle & Logistics Fleet Safety Policy", 
      category: "Operational Standards",
      desc: "Comprehensive guidelines governing fleet maintenance, transport safety, field travel protocols, and resource allocation efficiency.",
      icon: <Car className="text-brand-primary" size={22} />,
      link: "https://www.vercbd.org/images/Vehicle%20Management%20Policy%2023042025.pdf"
    },
    { 
      title: "Child Safeguarding & PSEA Standards", 
      category: "Protection & Integrity",
      desc: "Strict zero-tolerance policy against sexual exploitation, abuse, and harassment (PSEA), with rigorous child protection compliance across all learning centers.",
      icon: <ShieldAlert className="text-brand-primary" size={22} />,
      link: null
    },
    { 
      title: "Financial Integrity & Anti-Corruption Code", 
      category: "Financial Governance",
      desc: "Robust dual-authorization procurement frameworks, internal audit checkpoints, and transparent financial reporting adhering to international donor standards.",
      icon: <FileSpreadsheet className="text-brand-primary" size={22} />,
      link: null
    },
  ];

  const governancePrinciples = [
    {
      title: "Independent Executive Oversight",
      points: [
        "Governed by an elected Executive Committee and General Body",
        "Clear demarcation between strategic governance and operational management",
        "Periodic independent reviews and structured committee terms"
      ]
    },
    {
      title: "Statutory Financial Audits",
      points: [
        "Annual financial statements audited by independent Chartered Accountant firms",
        "Direct reporting to the NGO Affairs Bureau and Microcredit Regulatory Authority",
        "Full disclosure of project budgets, overheads, and program expenditures"
      ]
    },
    {
      title: "Partner & Regulatory Alignment",
      points: [
        "Strict adherence to GoB development guidelines and 5-year plans",
        "Alignment with UNICEF, WaterAid, and bilateral institutional compliance standards",
        "Proactive open disclosure and anti-fraud monitoring mechanisms"
      ]
    }
  ];

  const fadeIn = {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 }
  };

  return (
    <div className="bg-[#FAFAFA] min-h-screen font-sans text-gray-900">
      {/* Hero Header */}
      <section className="bg-white pt-32 pb-16 border-b border-gray-200">
        <div className="container-custom">
          <motion.div {...fadeIn} className="max-w-4xl">
            {/* Top Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-bold uppercase tracking-wider mb-6">
              <Scale size={14} className="text-blue-600" />
              <span>Institutional Governance & Statutory Compliance</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight leading-[1.1] mb-6">
              Legal Framework &amp; <br />
              <span className="text-brand-primary">Statutory Affiliations.</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 font-normal leading-relaxed max-w-3xl">
              Village Education Resource Center (VERC) operates in full alignment with Bangladesh statutory authorities and international development governance benchmarks, ensuring uncompromising transparency, financial integrity, and accountability.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-6 text-xs text-gray-500 font-semibold border-t border-gray-100 pt-6">
              <div className="flex items-center gap-2">
                <BadgeCheck size={16} className="text-emerald-600" />
                <span>Jurisdiction: People&apos;s Republic of Bangladesh</span>
              </div>
              <div className="flex items-center gap-2">
                <BadgeCheck size={16} className="text-emerald-600" />
                <span>Headquarters: Savar, Dhaka</span>
              </div>
              <div className="flex items-center gap-2">
                <BadgeCheck size={16} className="text-emerald-600" />
                <span>Audited Annually by Chartered Accountants</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* KPI / Key Metrics Summary Strip */}
      <section className="bg-white border-b border-gray-200 py-8 shadow-sm">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="border-l-2 border-brand-primary pl-4">
              <div className="text-2xl lg:text-3xl font-black text-gray-900">100%</div>
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mt-1">Statutory Compliance</div>
            </div>
            <div className="border-l-2 border-emerald-500 pl-4">
              <div className="text-2xl lg:text-3xl font-black text-gray-900">NGOAB #001</div>
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mt-1">Foundational Registration</div>
            </div>
            <div className="border-l-2 border-indigo-500 pl-4">
              <div className="text-2xl lg:text-3xl font-black text-gray-900">MRA Certified</div>
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mt-1">Financial Inclusivity License</div>
            </div>
            <div className="border-l-2 border-amber-500 pl-4">
              <div className="text-2xl lg:text-3xl font-black text-gray-900">Annual Audits</div>
              <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mt-1">External Fiscal Certification</div>
            </div>
          </div>
        </div>
      </section>

      {/* Statutory Certifications Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="max-w-3xl mb-12">
            <h2 className="text-xs font-black uppercase tracking-[0.25em] text-brand-primary mb-2">Primary Accreditation</h2>
            <h3 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
              Official Registrations &amp; Regulatory Licensure
            </h3>
            <p className="text-sm md:text-base text-gray-600 mt-2">
              Statutory documentation issued by national regulatory authorities permitting multi-sectoral community development, microfinance, and development cooperation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, i) => (
              <motion.div 
                key={i}
                {...fadeIn}
                transition={{ delay: i * 0.08 }}
                className="bg-white rounded-2xl border border-gray-200 p-7 shadow-sm hover:shadow-md hover:border-brand-primary/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 bg-gray-50 border border-gray-100 rounded-xl flex items-center justify-center">
                      {cert.icon}
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <Check size={12} strokeWidth={3} />
                      {cert.status}
                    </span>
                  </div>

                  <h4 className="text-lg font-bold text-gray-900 leading-snug mb-1">
                    {cert.title}
                  </h4>
                  
                  <div className="text-xs font-semibold text-brand-primary mb-3">
                    {cert.authority}
                  </div>

                  <div className="inline-block px-2.5 py-1 bg-gray-100 rounded text-[11px] font-mono font-bold text-gray-700 mb-4">
                    {cert.regNo}
                  </div>

                  <p className="text-xs text-gray-600 leading-relaxed mb-6 font-normal">
                    {cert.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
                  <span className="text-[11px] font-medium text-gray-400">
                    {cert.type}
                  </span>
                  {cert.link && (
                    <Link 
                      href={cert.link} 
                      target="_blank"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-primary hover:text-brand-secondary transition-colors group"
                    >
                      <span>View Document</span>
                      <ExternalLink size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Institutional Policies & Governance Section */}
      <section className="py-20 bg-gray-50 border-t border-b border-gray-200">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
            {/* Left Header */}
            <div className="lg:w-1/3">
              <div className="inline-flex items-center gap-2 text-brand-primary mb-3">
                <ScrollText size={18} />
                <h2 className="text-xs font-black uppercase tracking-[0.25em]">Operational Governance</h2>
              </div>
              <h3 className="text-3xl font-black text-gray-900 tracking-tight leading-tight mb-4">
                Institutional <br />Policies &amp; Codes.
              </h3>
              <p className="text-sm md:text-base text-gray-600 font-normal leading-relaxed mb-6">
                Standard operating guidelines designed to maintain high administrative ethics, operational safety, staff welfare, and partner accountability across all field offices.
              </p>
              <div className="p-5 bg-white rounded-xl border border-gray-200 text-xs text-gray-600 space-y-3">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-brand-primary shrink-0 mt-0.5" />
                  <span>Regularly reviewed by the Executive Committee to comply with updated statutory norms.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 size={16} className="text-brand-primary shrink-0 mt-0.5" />
                  <span>Mandatory adherence required for all full-time personnel, volunteers, and contracted partners.</span>
                </div>
              </div>
            </div>

            {/* Right Cards */}
            <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
              {institutionalPolicies.map((policy, i) => (
                <motion.div 
                  key={i}
                  {...fadeIn}
                  transition={{ delay: i * 0.08 }}
                  className="bg-white p-7 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between hover:border-gray-300 transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 bg-blue-50 border border-blue-100 rounded-lg flex items-center justify-center">
                        {policy.icon}
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 bg-gray-50 px-2.5 py-1 rounded">
                        {policy.category}
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-gray-900 mb-2 leading-snug">
                      {policy.title}
                    </h4>
                    <p className="text-xs text-gray-600 font-normal leading-relaxed mb-6">
                      {policy.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-100 mt-auto">
                    {policy.link ? (
                      <Link 
                        href={policy.link}
                        target="_blank"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-primary hover:text-brand-secondary transition-colors"
                      >
                        <span>Access Document</span>
                        <ExternalLink size={12} />
                      </Link>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-gray-400">
                        <Lock size={12} /> Internal Institutional Guideline
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Governance & Accountability Framework */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-black uppercase tracking-[0.25em] text-brand-primary mb-2">Governance Framework</h2>
            <h3 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
              Institutional Accountability &amp; Oversight
            </h3>
            <p className="text-sm md:text-base text-gray-600 mt-2">
              How VERC maintains checks and balances across program execution, financial administration, and stakeholder commitments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {governancePrinciples.map((pillar, i) => (
              <div key={i} className="bg-gray-50 p-8 rounded-2xl border border-gray-200">
                <div className="w-8 h-8 rounded-lg bg-brand-primary/10 text-brand-primary flex items-center justify-center font-bold text-sm mb-5">
                  {i + 1}
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-4">{pillar.title}</h4>
                <ul className="space-y-3">
                  {pillar.points.map((pt, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-xs md:text-sm text-gray-600 leading-relaxed">
                      <CheckCircle2 size={16} className="text-emerald-600 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Institutional Compliance Seal Footer (Without Inquire Button) */}
      <section className="py-16 bg-[#111827] text-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 size={32} />
            </div>
            
            <h3 className="text-2xl md:text-3xl font-black tracking-tight text-white">
              Committed to Transparent, Ethical &amp; Compliant Development
            </h3>
            
            <p className="text-sm md:text-base text-gray-300 font-normal leading-relaxed max-w-2xl mx-auto">
              All statutory certificates, annual financial reports, and regulatory filings are maintained in full accordance with the NGO Affairs Bureau and Microcredit Regulatory Authority standards.
            </p>

            <div className="pt-4 flex flex-wrap justify-center items-center gap-6 text-xs text-gray-400 font-medium">
              <span>• Registered NGO under NGOAB (Reg. 001)</span>
              <span>• MRA Licensed Microfinance Institution</span>
              <span>• Registered Social Welfare Agency</span>
              <span>• Regular External Statutory Audits</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

