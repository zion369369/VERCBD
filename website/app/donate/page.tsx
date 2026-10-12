"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Heart, 
  Globe, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Zap,
  Users,
  Handshake,
  DollarSign,
  CreditCard,
  Building,
  Target,
  FileText,
  Lock,
  Sparkles,
  Phone,
  Mail,
  Copy,
  Check
} from "lucide-react";

export default function DonatePage() {
  const [donationType, setDonationType] = useState<"one-time" | "monthly">("one-time");
  const [currency, setCurrency] = useState<"BDT" | "USD">("BDT");
  const [selectedAmount, setSelectedAmount] = useState<number>(5000);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [selectedCause, setSelectedCause] = useState<string>("general");
  const [paymentMethod, setPaymentMethod] = useState<"mfs" | "card" | "bank">("mfs");
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  // Form states
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("");
  const [donorPhone, setDonorPhone] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [wantsTaxReceipt, setWantsTaxReceipt] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const presetAmountsBDT = [1000, 2500, 5000, 10000, 25000, 50000];
  const presetAmountsUSD = [15, 30, 60, 120, 250, 500];

  const causes = [
    { id: "general", label: "Where Needed Most", icon: "🌱", desc: "Allows VERC to deploy funds quickly to the most urgent community needs." },
    { id: "wash", label: "Clean Water & Sanitation (CLTS)", icon: "💧", desc: "Funds deep tube-wells, arsenic testing, and community hygiene facilities." },
    { id: "education", label: "Non-Formal Child Education", icon: "📚", desc: "Supports underprivileged children with learning kits, early childhood care, and school meals." },
    { id: "health", label: "Mother & Child Hospital Care", icon: "🏥", desc: "Provides safe maternity delivery, neonatal care, and essential medicines at VERC hospitals." },
    { id: "livelihood", label: "Women Empowerment & Grants", icon: "🧵", desc: "Provides seed funding and vocational training for disadvantaged women entrepreneurs." }
  ];

  const activeAmount = customAmount ? Number(customAmount) || 0 : selectedAmount;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedAccount(id);
    setTimeout(() => setCopiedAccount(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
  };

  return (
    <div className="bg-[#FAFAFA] min-h-screen font-sans selection:bg-brand-primary/10 overflow-x-hidden">
      {/* 1. HERO HEADER */}
      <section className="relative pt-36 pb-24 lg:pt-44 lg:pb-32 bg-gray-900 overflow-hidden text-white">
        <div className="absolute inset-0 z-0">
          <img 
            src="/assets/home_official_1.jpg" 
            alt="Support VERC Community" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 via-gray-900/80 to-gray-900"></div>
        </div>

        <div className="container-custom relative z-10 text-center max-w-4xl mx-auto space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-500/10 rounded-full text-xs font-black uppercase tracking-[0.25em] text-emerald-400 border border-emerald-500/30">
              <Heart size={14} className="text-emerald-400 fill-emerald-400" /> Transparent Philanthropy
            </span>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-tight">
              Invest in Sustainable <br />
              <span className="text-brand-secondary">Community Transformation.</span>
            </h1>

            <p className="text-lg lg:text-xl text-gray-300 font-medium max-w-2xl mx-auto leading-relaxed">
              Every contribution directly empowers marginalized children, rural mothers, and vulnerable families across Bangladesh since 1977.
            </p>

            <div className="flex flex-wrap justify-center items-center gap-6 pt-4 text-xs font-bold text-gray-400">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 size={16} /> 100% Tax Deductible (NBR Approved)
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={16} className="text-blue-400" /> NGO Affairs Bureau Registered
              </span>
              <span className="flex items-center gap-1.5">
                <Lock size={16} className="text-amber-400" /> 256-Bit SSL Encrypted
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. MAIN DONATION PORTAL */}
      <section className="py-20 -mt-10 relative z-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* LEFT COLUMN: INTERACTIVE DONATION BUILDER */}
            <motion.div 
              {...fadeIn}
              className="lg:col-span-7 bg-white p-8 sm:p-12 rounded-[40px] border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.04)] space-y-10"
            >
              {/* Type Switcher */}
              <div className="flex bg-gray-100 p-1.5 rounded-2xl">
                <button
                  type="button"
                  onClick={() => setDonationType("one-time")}
                  className={`flex-1 py-3 text-sm font-black rounded-xl transition-all cursor-pointer ${
                    donationType === "one-time" 
                      ? "bg-white text-gray-900 shadow-sm" 
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  One-Time Donation
                </button>
                <button
                  type="button"
                  onClick={() => setDonationType("monthly")}
                  className={`flex-1 py-3 text-sm font-black rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    donationType === "monthly" 
                      ? "bg-brand-primary text-white shadow-sm" 
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  <Sparkles size={14} className="text-brand-secondary" /> Monthly Sustainer
                </button>
              </div>

              {/* Amount Selector */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-500">
                    Select Contribution Amount
                  </label>
                  <div className="flex bg-gray-100 p-1 rounded-lg text-xs font-bold">
                    <button
                      type="button"
                      onClick={() => { setCurrency("BDT"); setSelectedAmount(5000); setCustomAmount(""); }}
                      className={`px-3 py-1 rounded-md transition-all ${currency === "BDT" ? "bg-white text-gray-900 shadow-xs font-black" : "text-gray-500"}`}
                    >
                      BDT (৳)
                    </button>
                    <button
                      type="button"
                      onClick={() => { setCurrency("USD"); setSelectedAmount(60); setCustomAmount(""); }}
                      className={`px-3 py-1 rounded-md transition-all ${currency === "USD" ? "bg-white text-gray-900 shadow-xs font-black" : "text-gray-500"}`}
                    >
                      USD ($)
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  {(currency === "BDT" ? presetAmountsBDT : presetAmountsUSD).map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => { setSelectedAmount(val); setCustomAmount(""); }}
                      className={`py-4 px-3 rounded-2xl border text-center transition-all cursor-pointer ${
                        selectedAmount === val && !customAmount
                          ? "bg-brand-primary text-white border-brand-primary font-black shadow-lg shadow-brand-primary/20 scale-[1.02]"
                          : "bg-gray-50/80 border-gray-200/80 text-gray-800 font-bold hover:border-brand-primary/40 hover:bg-white"
                      }`}
                    >
                      <div className="text-lg font-black">
                        {currency === "BDT" ? `৳${val.toLocaleString()}` : `$${val}`}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Custom Amount Field */}
                <div className="relative pt-2">
                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-lg font-bold text-gray-400">
                    {currency === "BDT" ? "৳" : "$"}
                  </span>
                  <input
                    type="number"
                    placeholder="Enter custom amount..."
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="w-full bg-gray-50/80 border border-gray-200 rounded-2xl py-4 pl-12 pr-6 text-base font-bold text-gray-900 placeholder:text-gray-400 focus:bg-white focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Cause Allocation */}
              <div className="space-y-4">
                <label className="text-xs font-black uppercase tracking-widest text-gray-500">
                  Direct My Gift To
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {causes.map((cause) => (
                    <div
                      key={cause.id}
                      onClick={() => setSelectedCause(cause.id)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3.5 ${
                        selectedCause === cause.id
                          ? "bg-emerald-50/50 border-emerald-500 text-emerald-950 ring-1 ring-emerald-500"
                          : "bg-gray-50/60 border-gray-200/70 hover:bg-white text-gray-800"
                      }`}
                    >
                      <span className="text-2xl">{cause.icon}</span>
                      <div className="space-y-1">
                        <div className="text-sm font-bold leading-tight">{cause.label}</div>
                        <div className="text-[11px] text-gray-500 leading-snug">{cause.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="space-y-4">
                <label className="text-xs font-black uppercase tracking-widest text-gray-500">
                  Preferred Payment Channel
                </label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("mfs")}
                    className={`p-4 rounded-2xl border flex flex-col items-center gap-2 transition-all cursor-pointer ${
                      paymentMethod === "mfs"
                        ? "bg-brand-primary text-white border-brand-primary shadow-md"
                        : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-white"
                    }`}
                  >
                    <SmartphoneIcon size={20} />
                    <span className="text-xs font-bold">bKash / Nagad</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    className={`p-4 rounded-2xl border flex flex-col items-center gap-2 transition-all cursor-pointer ${
                      paymentMethod === "card"
                        ? "bg-brand-primary text-white border-brand-primary shadow-md"
                        : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-white"
                    }`}
                  >
                    <CreditCard size={20} />
                    <span className="text-xs font-bold">Card / Gateway</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("bank")}
                    className={`p-4 rounded-2xl border flex flex-col items-center gap-2 transition-all cursor-pointer ${
                      paymentMethod === "bank"
                        ? "bg-brand-primary text-white border-brand-primary shadow-md"
                        : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-white"
                    }`}
                  >
                    <Building size={20} />
                    <span className="text-xs font-bold">Bank Wire / EFT</span>
                  </button>
                </div>
              </div>
            </motion.div>

            {/* RIGHT COLUMN: DONOR DETAILS & SUMMARY CARD */}
            <motion.div 
              {...fadeIn} 
              transition={{ delay: 0.1 }}
              className="lg:col-span-5 space-y-8 sticky top-28"
            >
              <div className="bg-white p-8 sm:p-10 rounded-[40px] border border-gray-100 shadow-xl shadow-gray-200/50 space-y-6">
                <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                  <span className="text-xs font-black uppercase tracking-wider text-gray-400">Contribution Summary</span>
                  <span className="text-xs font-bold px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full">
                    {donationType === "monthly" ? "Monthly Sustainer" : "One-Time"}
                  </span>
                </div>

                <div className="flex items-baseline justify-between">
                  <span className="text-gray-600 font-medium">Total Gift:</span>
                  <span className="text-4xl font-black text-gray-900">
                    {currency === "BDT" ? `৳${activeAmount.toLocaleString()}` : `$${activeAmount}`}
                  </span>
                </div>

                {isSubmitted ? (
                  <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-3">
                    <CheckCircle2 size={36} className="text-emerald-600 mx-auto" />
                    <h4 className="text-lg font-black text-emerald-900">Thank You for Your Pledge!</h4>
                    <p className="text-xs text-emerald-700 leading-relaxed font-medium">
                      Our donor relations department has received your commitment. An official acknowledgement and tax invoice will be sent to <strong>{donorEmail || "your email"}</strong>.
                    </p>
                    <button 
                      onClick={() => setIsSubmitted(false)}
                      className="text-xs font-bold text-emerald-800 underline pt-2"
                    >
                      Make another contribution
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-gray-600">Full Name</label>
                      <input 
                        type="text" 
                        required={!isAnonymous}
                        disabled={isAnonymous}
                        placeholder={isAnonymous ? "Anonymous Donor" : "e.g. Dr. A. K. Rahman"}
                        value={donorName}
                        onChange={(e) => setDonorName(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:bg-white focus:border-brand-primary outline-none transition-all"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-gray-600">Email Address</label>
                        <input 
                          type="email" 
                          required
                          placeholder="donor@example.com"
                          value={donorEmail}
                          onChange={(e) => setDonorEmail(e.target.value)}
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:bg-white focus:border-brand-primary outline-none transition-all"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-gray-600">Phone (Optional)</label>
                        <input 
                          type="tel" 
                          placeholder="+880 17..."
                          value={donorPhone}
                          onChange={(e) => setDonorPhone(e.target.value)}
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm font-medium focus:bg-white focus:border-brand-primary outline-none transition-all"
                        />
                      </div>
                    </div>

                    <div className="space-y-2 pt-2 text-xs">
                      <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={isAnonymous} 
                          onChange={(e) => setIsAnonymous(e.target.checked)} 
                          className="rounded text-brand-primary focus:ring-brand-primary"
                        />
                        <span>Make this an anonymous donation</span>
                      </label>
                      <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={wantsTaxReceipt} 
                          onChange={(e) => setWantsTaxReceipt(e.target.checked)} 
                          className="rounded text-brand-primary focus:ring-brand-primary"
                        />
                        <span>Email official tax-exemption certificate (NBR 84A)</span>
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={activeAmount <= 0}
                      className="w-full py-4 bg-brand-primary text-white text-base font-black rounded-2xl hover:bg-brand-dark active:scale-[0.98] transition-all shadow-xl shadow-brand-primary/20 flex items-center justify-center gap-2 mt-4 cursor-pointer disabled:opacity-50"
                    >
                      Complete {currency === "BDT" ? `৳${activeAmount.toLocaleString()}` : `$${activeAmount}`} Donation <ArrowRight size={16} />
                    </button>
                  </form>
                )}

                <div className="border-t border-gray-100 pt-4 flex items-center justify-center gap-2 text-gray-400 text-xs font-semibold">
                  <ShieldCheck size={14} className="text-emerald-500" />
                  <span>Audited by A. Qasem & Co. (Chartered Accountants)</span>
                </div>
              </div>

              {/* Offline Direct Wire Box */}
              <div className="bg-gray-900 p-8 rounded-[36px] text-white space-y-6">
                <div className="flex items-center gap-3">
                  <Building size={22} className="text-brand-secondary" />
                  <div>
                    <h4 className="font-bold text-sm">Official Bank Account for Wire Transfers</h4>
                    <p className="text-[11px] text-gray-400">Direct institutional and overseas wire remittances</p>
                  </div>
                </div>

                <div className="space-y-3 text-xs bg-white/5 p-4 rounded-2xl border border-white/10 font-mono">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Account Name:</span>
                    <span className="font-bold text-white">Village Education Resource Center</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Bank:</span>
                    <span className="font-bold text-white">Sonali Bank PLC</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Account No:</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-amber-400">4408001000215</span>
                      <button 
                        onClick={() => handleCopy("4408001000215", "sonali")} 
                        className="text-gray-400 hover:text-white"
                        title="Copy Account Number"
                      >
                        {copiedAccount === "sonali" ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Routing Number:</span>
                    <span className="font-bold text-white">200270512</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">SWIFT Code:</span>
                    <span className="font-bold text-white">BSONBDDH</span>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 3. TRANSPARENCY & FUND ALLOCATION STEWARDSHIP */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16 space-y-3">
            <span className="text-xs font-black uppercase tracking-[0.25em] text-brand-primary">Accountability</span>
            <h2 className="text-3xl lg:text-5xl font-black text-gray-900 tracking-tight">How Your Funds Are Deployed</h2>
            <p className="text-gray-600 font-medium text-base">VERC maintains strict fiscal stewardship with full annual public disclosure.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div {...fadeIn} className="p-8 bg-gray-50/80 rounded-[32px] border border-gray-100 space-y-4 text-center">
              <div className="text-5xl font-black text-emerald-600">92.4%</div>
              <h4 className="text-lg font-bold text-gray-900">Direct Program Execution</h4>
              <p className="text-xs text-gray-500 font-medium leading-relaxed">
                Goes directly into non-formal school operations, water network installation, hospital medicines, and community micro-grants.
              </p>
            </motion.div>

            <motion.div {...fadeIn} transition={{ delay: 0.1 }} className="p-8 bg-gray-50/80 rounded-[32px] border border-gray-100 space-y-4 text-center">
              <div className="text-5xl font-black text-blue-600">4.8%</div>
              <h4 className="text-lg font-bold text-gray-900">Program Monitoring & Quality</h4>
              <p className="text-xs text-gray-500 font-medium leading-relaxed">
                Dedicated field research, water quality lab verification, and participatory community impact evaluations.
              </p>
            </motion.div>

            <motion.div {...fadeIn} transition={{ delay: 0.2 }} className="p-8 bg-gray-50/80 rounded-[32px] border border-gray-100 space-y-4 text-center">
              <div className="text-5xl font-black text-amber-600">2.8%</div>
              <h4 className="text-lg font-bold text-gray-900">Administration & Governance</h4>
              <p className="text-xs text-gray-500 font-medium leading-relaxed">
                Independent statutory audits, regulatory NGOAB compliance, and donor reporting systems.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. CSR & INSTITUTIONAL PARTNERSHIPS */}
      <section className="py-24 bg-gray-50/60 border-t border-gray-100">
        <div className="container-custom">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-[48px] p-10 lg:p-16 text-white flex flex-col lg:flex-row items-center justify-between gap-12 shadow-2xl">
            <div className="space-y-6 max-w-2xl">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 rounded-full text-xs font-bold text-brand-secondary">
                <Handshake size={14} /> Corporate & Institutional Giving
              </span>
              <h3 className="text-3xl lg:text-5xl font-black tracking-tight leading-tight">
                Align Your CSR With Proven Sustainable Impact.
              </h3>
              <p className="text-gray-300 text-sm lg:text-base leading-relaxed">
                We partner with corporate foundations, multilateral agencies, and institutional donors to design high-yield, measurable development interventions matching the UN SDGs.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <Link 
                href="/contact" 
                className="px-8 py-4 bg-brand-secondary text-gray-900 font-black rounded-2xl hover:scale-105 transition-all text-center text-sm shadow-xl"
              >
                Inquire for CSR Partnership
              </Link>
              <Link 
                href="/partners" 
                className="px-8 py-4 bg-white/10 border border-white/20 text-white font-bold rounded-2xl hover:bg-white/20 transition-all text-center text-sm"
              >
                View Current Partners
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. DONOR SUPPORT CONTACT STRIP */}
      <section className="py-16 bg-white border-t border-gray-100 text-center">
        <div className="container-custom space-y-4">
          <h4 className="text-base font-black text-gray-900">Need Assistance with Your Contribution?</h4>
          <p className="text-xs text-gray-500 max-w-md mx-auto">
            Our donor relations team is available to assist with custom grant agreements, wire verification, or customized impact reporting.
          </p>
          <div className="flex flex-wrap justify-center gap-6 pt-2 text-xs font-bold text-gray-700">
            <a href="tel:+88027792015" className="flex items-center gap-2 hover:text-brand-primary">
              <Phone size={14} className="text-brand-primary" /> +880-2-7792015
            </a>
            <a href="mailto:info@vercbd.org" className="flex items-center gap-2 hover:text-brand-primary">
              <Mail size={14} className="text-brand-primary" /> info@vercbd.org
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

function SmartphoneIcon(props: React.SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <svg 
      width={props.size || 24} 
      height={props.size || 24} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      <rect width="14" height="20" x="5" y="2" rx="2" ry="2"/>
      <path d="M12 18h.01"/>
    </svg>
  );
}
