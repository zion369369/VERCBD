"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Heart, 
  Users, 
  BookOpen, 
  BarChart2, 
  TrendingUp, 
  Sparkles, 
  Edit2, 
  ArrowUpRight, 
  MoreHorizontal, 
  ShieldCheck, 
  DollarSign, 
  Building2, 
  Target, 
  Clock, 
  CheckCircle2, 
  MapPin, 
  Globe, 
  Receipt,
  MessageSquare,
  AlertTriangle,
  Plus
} from "lucide-react";
import { useContent } from "@/context/ContentContext";

export default function AdminDashboardPage() {
  const { 
    theme, 
    primaryColor, 
    dashboardMetrics, 
    programs, 
    news, 
    stories, 
    donations, 
    campaigns, 
    messages, 
    branches 
  } = useContent();

  const [selectedPeriod, setSelectedPeriod] = useState("Month");

  // SVG Circular Donut Ring for KPI Cards
  const DonutRing = ({ percentage, color }: { percentage: number; color: string }) => {
    const radius = 28;
    const strokeWidth = 5.5;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative w-16 h-16 flex items-center justify-center">
        <svg className="w-16 h-16 transform -rotate-90">
          <circle
            cx="32"
            cy="32"
            r={radius}
            stroke={theme === "dark" ? "#2B2A3D" : "#E5E7EB"}
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          <circle
            cx="32"
            cy="32"
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <span className="absolute text-[11px] font-bold" style={{ color }}>
          {percentage}%
        </span>
      </div>
    );
  };

  // Pie Chart for Thematic Area Distribution
  const ThematicPieChart = () => {
    return (
      <div className="flex flex-col items-center">
        <div className="relative w-40 h-40 flex items-center justify-center my-2">
          <svg width="150" height="150" viewBox="0 0 42 42" className="transform -rotate-90">
            {/* WaSH: 42.5% (Primary Dark Blue) */}
            <circle
              cx="21"
              cy="21"
              r="15.91549430918954"
              fill="transparent"
              stroke={primaryColor}
              strokeWidth="10"
              strokeDasharray="42.5 57.5"
              strokeDashoffset="0"
            />
            {/* Education: 24.8% (Cyan) */}
            <circle
              cx="21"
              cy="21"
              r="15.91549430918954"
              fill="transparent"
              stroke="#00AEEF"
              strokeWidth="10"
              strokeDasharray="24.8 75.2"
              strokeDashoffset="-42.5"
            />
            {/* Health: 18.2% (Rose) */}
            <circle
              cx="21"
              cy="21"
              r="15.91549430918954"
              fill="transparent"
              stroke="#F56565"
              strokeWidth="10"
              strokeDasharray="18.2 81.8"
              strokeDashoffset="-67.3"
            />
            {/* Microfinance: 14.5% (Amber) */}
            <circle
              cx="21"
              cy="21"
              r="15.91549430918954"
              fill="transparent"
              stroke="#FFA756"
              strokeWidth="10"
              strokeDasharray="14.5 85.5"
              strokeDashoffset="-85.5"
            />
          </svg>

          {/* Slices Labels Overlay */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none flex-col text-center">
            <span className="text-[11px] font-black text-gray-900 dark:text-white">
              4 Core
            </span>
            <span className="text-[9px] text-gray-400 font-semibold uppercase">
              Thematic Sectors
            </span>
          </div>
        </div>

        {/* Legend dots */}
        <div className="grid grid-cols-2 gap-2 text-[10px] font-semibold text-gray-600 dark:text-gray-400 mt-2 w-full px-2">
          <div className="flex items-center gap-1.5 truncate">
            <span className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ backgroundColor: primaryColor }}></span>
            <span className="truncate">WaSH (42.5%)</span>
          </div>
          <div className="flex items-center gap-1.5 truncate">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#00AEEF] flex-shrink-0"></span>
            <span className="truncate">Education (24.8%)</span>
          </div>
          <div className="flex items-center gap-1.5 truncate">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#F56565] flex-shrink-0"></span>
            <span className="truncate">Health (18.2%)</span>
          </div>
          <div className="flex items-center gap-1.5 truncate">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#FFA756] flex-shrink-0"></span>
            <span className="truncate">Livelihoods (14.5%)</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner: Humanitarian Mission Control & Quick Launcher */}
      <div className={`p-6 rounded-3xl border transition-all ${
        theme === "dark" ? "bg-[#1A1926] border-white/5" : "bg-white border-gray-200 shadow-sm"
      }`}>
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-xs flex-shrink-0"
              style={{ backgroundColor: `${primaryColor}15`, color: primaryColor }}
            >
              <Heart size={24} className="fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-lg font-black text-gray-900 dark:text-white">
                  VERC Humanitarian Mission Control
                </h1>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                  31 Districts &bull; 106 Upazilas
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 font-medium">
                Real-time dashboard managing programs, institutional grants, beneficiary transformations, and emergency relief operations across Bangladesh.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <Link
              href="/admin/donations"
              style={{ backgroundColor: primaryColor }}
              className="px-3.5 py-2 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 hover:opacity-90 cursor-pointer"
            >
              <Plus size={14} /> Record Grant / Donation
            </Link>
            <Link
              href="/admin/programs"
              className="px-3.5 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/20 text-gray-800 dark:text-gray-200 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <BookOpen size={14} /> Programs ({programs.length})
            </Link>
            <Link
              href="/admin/news"
              className="px-3.5 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/20 text-gray-800 dark:text-gray-200 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
            >
              News & Visits ({news.length})
            </Link>
          </div>
        </div>
      </div>

      {/* Row 1: Top 4 Charity KPI Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: Beneficiaries */}
        <div className={`p-6 rounded-3xl border transition-all ${
          theme === "dark" ? "bg-[#1A1926] border-white/5" : "bg-white border-gray-200 shadow-sm"
        }`}>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="text-xs font-bold text-gray-500 dark:text-gray-400">Total Beneficiaries</div>
              <div className="text-3xl font-black" style={{ color: primaryColor }}>
                {dashboardMetrics.beneficiaries.value}
              </div>
              <div className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">
                {dashboardMetrics.beneficiaries.period}
              </div>
            </div>
            <DonutRing percentage={dashboardMetrics.beneficiaries.percentage} color={primaryColor} />
          </div>
        </div>

        {/* Card 2: Donations & Grants Mobilized */}
        <div className={`p-6 rounded-3xl border transition-all ${
          theme === "dark" ? "bg-[#1A1926] border-white/5" : "bg-white border-gray-200 shadow-sm"
        }`}>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="text-xs font-bold text-gray-500 dark:text-gray-400">Grants & Donations</div>
              <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400">
                {dashboardMetrics.donationsMobilized.value}
              </div>
              <div className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">
                {dashboardMetrics.donationsMobilized.period}
              </div>
            </div>
            <DonutRing percentage={dashboardMetrics.donationsMobilized.percentage} color="#10B981" />
          </div>
        </div>

        {/* Card 3: Active Programs */}
        <div className={`p-6 rounded-3xl border transition-all ${
          theme === "dark" ? "bg-[#1A1926] border-white/5" : "bg-white border-gray-200 shadow-sm"
        }`}>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="text-xs font-bold text-gray-500 dark:text-gray-400">Active Programs</div>
              <div className="text-3xl font-black text-blue-600 dark:text-blue-400">
                {dashboardMetrics.activePrograms.value} Thematic
              </div>
              <div className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">
                {dashboardMetrics.activePrograms.period}
              </div>
            </div>
            <DonutRing percentage={dashboardMetrics.activePrograms.percentage} color="#3B82F6" />
          </div>
        </div>

        {/* Card 4: Microfinance Members & Recovery */}
        <div className={`p-6 rounded-3xl border transition-all ${
          theme === "dark" ? "bg-[#1A1926] border-white/5" : "bg-white border-gray-200 shadow-sm"
        }`}>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="text-xs font-bold text-gray-500 dark:text-gray-400">Grassroots Members</div>
              <div className="text-3xl font-black text-amber-600 dark:text-amber-400">
                {dashboardMetrics.microfinanceMembers.value}
              </div>
              <div className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">
                {dashboardMetrics.microfinanceMembers.period}
              </div>
            </div>
            <DonutRing percentage={dashboardMetrics.microfinanceMembers.percentage} color="#FFA756" />
          </div>
        </div>
      </div>

      {/* Row 2: Financial Deployment Flow (Left) + Thematic Distribution (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Dual Bar Financial Grants & Ground Expenses */}
        <div className={`lg:col-span-2 p-6 rounded-3xl border transition-all ${
          theme === "dark" ? "bg-[#1A1926] border-white/5" : "bg-white border-gray-200 shadow-sm"
        }`}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-sm font-extrabold text-gray-900 dark:text-white">
                Humanitarian Grants Inflow vs Program Expenses
              </h2>
              <p className="text-[11px] text-gray-400">Values represented in Lakh BDT (৳)</p>
            </div>

            <div className="flex items-center gap-4 text-xs font-semibold">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: primaryColor }}></span>
                <span className="text-gray-600 dark:text-gray-400">Grants Inflow</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#10B981]"></span>
                <span className="text-gray-600 dark:text-gray-400">Program Deployed</span>
              </div>
            </div>
          </div>

          {/* Dual Bar Chart */}
          <div className="relative h-64 flex flex-col justify-between pt-4">
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none text-[10px] text-gray-400 font-medium">
              <div className="border-b border-gray-200 dark:border-white/5 w-full flex justify-between">
                <span>800L</span>
              </div>
              <div className="border-b border-gray-200 dark:border-white/5 w-full flex justify-between">
                <span>600L</span>
              </div>
              <div className="border-b border-gray-200 dark:border-white/5 w-full flex justify-between">
                <span>400L</span>
              </div>
              <div className="border-b border-gray-300 dark:border-white/10 w-full flex justify-between">
                <span>200L</span>
              </div>
              <div className="w-full flex justify-between">
                <span>0L</span>
              </div>
            </div>

            {/* Bars Area */}
            <div className="relative h-full flex items-end justify-between px-6 z-10">
              {dashboardMetrics.financialFlowData.map((item) => {
                const inflowHeight = (item.grantsInflow / 800) * 180;
                const expenseHeight = (item.programExpenses / 800) * 180;

                return (
                  <div key={item.month} className="flex flex-col items-center justify-end h-full group relative cursor-pointer">
                    <div className="flex items-end gap-1.5">
                      {/* Inflow Bar */}
                      <div
                        style={{ height: `${inflowHeight}px`, backgroundColor: primaryColor }}
                        className="w-2.5 rounded-t-md transition-all duration-300 shadow-sm opacity-90 group-hover:opacity-100"
                      ></div>
                      {/* Expenses Bar */}
                      <div
                        style={{ height: `${expenseHeight}px` }}
                        className="w-2.5 rounded-t-md bg-[#10B981] group-hover:bg-[#059669] transition-all duration-300 shadow-sm"
                      ></div>
                    </div>

                    <span className="text-[10px] text-gray-500 dark:text-gray-400 font-semibold mt-2 group-hover:font-bold transition-colors">
                      {item.month}
                    </span>

                    {/* Tooltip on Hover */}
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] font-bold px-2.5 py-1 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20">
                      Inflow: ৳{item.grantsInflow}L | Deployed: ৳{item.programExpenses}L
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Thematic Allocation & Flagship Program Card */}
        <div className="space-y-6">
          {/* Thematic Allocation Pie */}
          <div className={`p-6 rounded-3xl border transition-all ${
            theme === "dark" ? "bg-[#1A1926] border-white/5" : "bg-white border-gray-200 shadow-sm"
          }`}>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-extrabold text-gray-900 dark:text-white uppercase tracking-wider">
                Thematic Reach Breakdown
              </h3>
              <span className="text-[10px] text-gray-400 font-semibold">2024 Cycle</span>
            </div>
            <ThematicPieChart />
          </div>

          {/* Flagship Program Highlight */}
          <div className={`p-6 rounded-3xl border flex flex-col justify-between transition-all ${
            theme === "dark" ? "bg-[#1A1926] border-white/5" : "bg-white border-gray-200 shadow-sm"
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-gray-900 dark:text-white flex items-center gap-1.5">
                <Target size={14} className="text-blue-500" /> Flagship Program
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300">
                Pioneering
              </span>
            </div>

            <div className="flex items-center gap-3.5 mt-2">
              <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0 border border-gray-200">
                <img
                  src={dashboardMetrics.topFundedProgram.imageUrl}
                  alt="Program"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="text-xs font-extrabold text-gray-900 dark:text-white">
                  {dashboardMetrics.topFundedProgram.title}
                </div>
                <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                  {dashboardMetrics.topFundedProgram.beneficiaries} Reached
                </div>
                <div className="text-[10px] text-gray-400 font-medium">
                  Partners: {dashboardMetrics.topFundedProgram.leadPartner}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Row 3: Recent Grants & Donations Stream (Left) + Active Emergency Appeals (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (Span 2): Recent Donations Stream */}
        <div className={`lg:col-span-2 p-6 rounded-3xl border transition-all ${
          theme === "dark" ? "bg-[#1A1926] border-white/5" : "bg-white border-gray-200 shadow-sm"
        }`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Heart size={16} className="text-rose-500 fill-current" />
              <h3 className="text-sm font-extrabold text-gray-900 dark:text-white">
                Recent Grants & Contributions
              </h3>
            </div>
            <Link
              href="/admin/donations"
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              View All Grants ({donations.length}) <ArrowUpRight size={13} />
            </Link>
          </div>

          <div className="divide-y divide-gray-100 dark:divide-white/5">
            {donations.slice(0, 4).map((d) => (
              <div key={d.id} className="py-3.5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-white/5 text-blue-700 dark:text-blue-300 flex items-center justify-center font-bold text-xs flex-shrink-0">
                    {d.donorType === "Institutional Grant" ? <Building2 size={16} /> : <Heart size={16} />}
                  </div>
                  <div>
                    <div className="font-extrabold text-xs text-gray-900 dark:text-white">
                      {d.donorName}
                    </div>
                    <div className="text-[10px] text-gray-400 flex items-center gap-1.5">
                      <span>{d.program}</span> &bull; <span>{d.date}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-black text-xs text-gray-900 dark:text-white">
                    {d.currency === "BDT" ? "৳ " : "$ "}{d.amount.toLocaleString()}
                  </div>
                  <span className="text-[9px] px-2 py-0.2 rounded-full font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                    {d.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Active Emergency Relief Appeals */}
        <div className={`p-6 rounded-3xl border transition-all ${
          theme === "dark" ? "bg-[#1A1926] border-white/5" : "bg-white border-gray-200 shadow-sm"
        }`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <AlertTriangle size={16} className="text-amber-500" />
              <h3 className="text-sm font-extrabold text-gray-900 dark:text-white">
                Emergency Appeals
              </h3>
            </div>
            <Link
              href="/admin/donations"
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
            >
              Manage
            </Link>
          </div>

          <div className="space-y-4">
            {campaigns.slice(0, 3).map((camp) => (
              <div key={camp.id} className="p-3.5 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 space-y-2">
                <div className="flex justify-between items-start gap-2">
                  <div className="font-bold text-xs text-gray-900 dark:text-white truncate">
                    {camp.title}
                  </div>
                  <span className={`text-[9px] font-black px-1.5 py-0.5 rounded uppercase ${
                    camp.status === "Urgent" ? "bg-rose-100 text-rose-800" : "bg-blue-100 text-blue-800"
                  }`}>
                    {camp.status}
                  </span>
                </div>

                <div className="w-full h-2 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${camp.progress}%`, backgroundColor: primaryColor }}
                    className="h-full rounded-full"
                  ></div>
                </div>

                <div className="flex justify-between text-[10px] text-gray-500 dark:text-gray-400 font-semibold">
                  <span>Raised: <strong>{camp.raisedAmount}</strong></span>
                  <span>Target: {camp.targetAmount}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
