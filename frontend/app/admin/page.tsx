"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Heart, 
  Users, 
  BookOpen, 
  Building2, 
  Target, 
  Clock, 
  Receipt,
  MessageSquare,
  KeyRound,
  Activity,
  ArrowRight
} from "lucide-react";
import { useContent } from "@/context/ContentContext";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";

export default function AdminDashboardPage() {
  const { 
    theme, 
    primaryColor, 
    dashboardMetrics, 
    programs, 
    messages, 
    donations,
    branches 
  } = useContent();

  const { language, t } = useLanguage();
  const { hasPermission } = useAuth();

  const [dhakaTime, setDhakaTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setDhakaTime(
        now.toLocaleDateString("en-GB", {
          timeZone: "Asia/Dhaka",
          weekday: "short",
          day: "numeric",
          month: "short",
          year: "numeric"
        }) + " • " +
        now.toLocaleTimeString("en-US", {
          timeZone: "Asia/Dhaka",
          hour: "2-digit",
          minute: "2-digit"
        }) + " BST"
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Clean SVG Circular Donut Ring for KPI Cards
  const DonutRing = ({ percentage, color }: { percentage: number; color: string }) => {
    const radius = 26;
    const strokeWidth = 5;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative w-14 h-14 flex items-center justify-center">
        <svg className="w-14 h-14 transform -rotate-90">
          <circle
            cx="28"
            cy="28"
            r={radius}
            stroke={theme === "dark" ? "#2B2A3D" : "#E5E7EB"}
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          <circle
            cx="28"
            cy="28"
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-700 ease-out"
          />
        </svg>
        <span className="absolute text-xs font-bold" style={{ color }}>
          {percentage}%
        </span>
      </div>
    );
  };

  // Clean Pie Chart for Thematic Sector Breakdown
  const ThematicPieChart = () => {
    return (
      <div className="flex flex-col items-center">
        <div className="relative w-36 h-36 flex items-center justify-center my-3">
          <svg width="140" height="140" viewBox="0 0 42 42" className="transform -rotate-90">
            {/* WaSH: 42.5% */}
            <circle
              cx="21"
              cy="21"
              r="15.91549430918954"
              fill="transparent"
              stroke={primaryColor}
              strokeWidth="9"
              strokeDasharray="42.5 57.5"
              strokeDashoffset="0"
            />
            {/* Education: 24.8% */}
            <circle
              cx="21"
              cy="21"
              r="15.91549430918954"
              fill="transparent"
              stroke="#00AEEF"
              strokeWidth="9"
              strokeDasharray="24.8 75.2"
              strokeDashoffset="-42.5"
            />
            {/* Health: 18.2% */}
            <circle
              cx="21"
              cy="21"
              r="15.91549430918954"
              fill="transparent"
              stroke="#F43F5E"
              strokeWidth="9"
              strokeDasharray="18.2 81.8"
              strokeDashoffset="-67.3"
            />
            {/* Livelihood: 14.5% */}
            <circle
              cx="21"
              cy="21"
              r="15.91549430918954"
              fill="transparent"
              stroke="#F59E0B"
              strokeWidth="9"
              strokeDasharray="14.5 85.5"
              strokeDashoffset="-85.5"
            />
          </svg>
          <div className="absolute flex flex-col items-center text-center">
            <span className="text-xs font-bold text-gray-500 dark:text-gray-400">Sector</span>
            <span className="text-sm font-extrabold" style={{ color: primaryColor }}>WaSH</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs font-semibold w-full mt-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: primaryColor }}></span>
            <span className="text-gray-600 dark:text-gray-300">WaSH (42.5%)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00AEEF]"></span>
            <span className="text-gray-600 dark:text-gray-300">Education (24.8%)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F43F5E]"></span>
            <span className="text-gray-600 dark:text-gray-300">Health (18.2%)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]"></span>
            <span className="text-gray-600 dark:text-gray-300">Livelihood (14.5%)</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-valley font-sans">
      {/* 1. Clean Top Header */}
      <div className={`p-6 rounded-3xl border transition-all ${
        theme === "dark" ? "bg-[#181824] border-white/5 shadow-xs text-white" : "bg-white border-gray-200/80 shadow-xs text-gray-900"
      }`}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-1 font-medium">
              <Clock size={14} />
              <span>{dhakaTime || "Dhaka, Bangladesh"}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {language === "bn" ? "ভার্ক অপারেশন সেন্টার" : "VERC Operations Dashboard"}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {hasPermission("/admin/donations") && (
              <Link
                href="/admin/donations"
                style={{ backgroundColor: primaryColor }}
                className="px-4 py-2.5 rounded-xl text-white text-xs font-bold shadow-xs hover:opacity-95 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Receipt size={15} />
                <span>{t("admin_record_donation")}</span>
              </Link>
            )}

            {hasPermission("/admin/users") && (
              <Link
                href="/admin/users"
                className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 text-xs font-bold hover:bg-gray-100 dark:hover:bg-white/5 transition-all flex items-center gap-2 text-gray-800 dark:text-gray-200"
              >
                <KeyRound size={15} style={{ color: primaryColor }} />
                <span>{language === "bn" ? "ইউজার ও ভূমিকা" : "Users & Roles"}</span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* 2. Four Clean KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className={`p-5 rounded-3xl border flex items-center justify-between transition-all ${
          theme === "dark" ? "bg-[#181824] border-white/5 shadow-xs" : "bg-white border-gray-200/80 shadow-xs"
        }`}>
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="p-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                <Users size={16} />
              </span>
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                {language === "bn" ? "উপকারভোগী" : "Beneficiaries"}
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
              {dashboardMetrics.beneficiaries.value}
            </div>
          </div>
          <DonutRing percentage={dashboardMetrics.beneficiaries.percentage} color={primaryColor} />
        </div>

        {/* Card 2 */}
        <div className={`p-5 rounded-3xl border flex items-center justify-between transition-all ${
          theme === "dark" ? "bg-[#181824] border-white/5 shadow-xs" : "bg-white border-gray-200/80 shadow-xs"
        }`}>
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="p-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
                <Heart size={16} />
              </span>
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                {language === "bn" ? "মোট অনুদান ও তহবিল" : "Grants & Aid"}
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
              {dashboardMetrics.donationsMobilized.value}
            </div>
          </div>
          <DonutRing percentage={dashboardMetrics.donationsMobilized.percentage} color="#10B981" />
        </div>

        {/* Card 3 */}
        <div className={`p-5 rounded-3xl border flex items-center justify-between transition-all ${
          theme === "dark" ? "bg-[#181824] border-white/5 shadow-xs" : "bg-white border-gray-200/80 shadow-xs"
        }`}>
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="p-1.5 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
                <BookOpen size={16} />
              </span>
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                {language === "bn" ? "সক্রিয় কর্মসূচি" : "Core Programs"}
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
              {programs.length} Active
            </div>
          </div>
          <DonutRing percentage={92} color="#8B5CF6" />
        </div>

        {/* Card 4 */}
        <div className={`p-5 rounded-3xl border flex items-center justify-between transition-all ${
          theme === "dark" ? "bg-[#181824] border-white/5 shadow-xs" : "bg-white border-gray-200/80 shadow-xs"
        }`}>
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="p-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
                <Building2 size={16} />
              </span>
              <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
                {language === "bn" ? "শাখা কার্যালয়" : "Field Branches"}
              </span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
              {branches.length || 136} Offices
            </div>
          </div>
          <DonutRing percentage={85} color="#F59E0B" />
        </div>
      </div>

      {/* 3. Middle Section: Sector Allocation & Financial Flow */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Thematic Sector Distribution */}
        <div className={`p-6 rounded-3xl border flex flex-col justify-between ${
          theme === "dark" ? "bg-[#181824] border-white/5 shadow-xs" : "bg-white border-gray-200/80 shadow-xs"
        }`}>
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-white/5">
              <h2 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Target size={17} style={{ color: primaryColor }} />
                <span>{language === "bn" ? "থিম্যাটিক সেক্টর বণ্টন" : "Sector Allocations"}</span>
              </h2>
            </div>
            <ThematicPieChart />
          </div>

          <div className="pt-4 border-t border-gray-100 dark:border-white/5 text-center">
            <Link
              href="/admin/impact"
              className="text-xs font-bold text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white inline-flex items-center gap-1.5"
            >
              <span>{language === "bn" ? "বিস্তারিত প্রভাব প্রতিবেদন" : "View Impact Details"}</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        {/* Right: Grants Inflow vs Expenses */}
        <div className={`lg:col-span-2 p-6 rounded-3xl border flex flex-col justify-between ${
          theme === "dark" ? "bg-[#181824] border-white/5 shadow-xs" : "bg-white border-gray-200/80 shadow-xs"
        }`}>
          <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 pb-3 border-b border-gray-100 dark:border-white/5">
              <h2 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Activity size={17} style={{ color: primaryColor }} />
                <span>{language === "bn" ? "তহবিল প্রবাহ ও বাস্তবায়ন ব্যয়" : "Financial Inflow vs Program Expenses"}</span>
              </h2>

              <div className="flex items-center gap-4 text-xs font-semibold">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: primaryColor }}></span>
                  <span className="text-gray-600 dark:text-gray-300">Grant Inflow</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                  <span className="text-gray-600 dark:text-gray-300">Field Expenses</span>
                </div>
              </div>
            </div>

            {/* Comparison Graph */}
            <div className="mt-5 space-y-4">
              {dashboardMetrics.financialFlowData.map((item) => {
                const maxVal = 200;
                const grantWidth = `${Math.min(100, (item.grantsInflow / maxVal) * 100)}%`;
                const expenseWidth = `${Math.min(100, (item.programExpenses / maxVal) * 100)}%`;

                return (
                  <div key={item.month} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className="text-gray-700 dark:text-gray-300">{item.month}</span>
                      <span className="font-mono text-gray-400">
                        Inflow: ৳{item.grantsInflow}L • Expense: ৳{item.programExpenses}L
                      </span>
                    </div>
                    <div className="space-y-1">
                      <div className="h-2 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{ width: grantWidth, backgroundColor: primaryColor }}
                        />
                      </div>
                      <div className="h-2 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-500 rounded-full transition-all duration-700"
                          style={{ width: expenseWidth }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 dark:border-white/5 flex items-center justify-between text-xs">
            <span className="text-gray-400 font-medium">Updated monthly from field accounts</span>
            <Link
              href="/admin/donations"
              className="font-bold text-gray-700 dark:text-gray-200 hover:underline flex items-center gap-1"
            >
              <span>Audit Receipts</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </div>

      {/* 4. Bottom Grid: Inquiries & Donations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Inquiries */}
        <div className={`p-6 rounded-3xl border flex flex-col justify-between ${
          theme === "dark" ? "bg-[#181824] border-white/5 shadow-xs" : "bg-white border-gray-200/80 shadow-xs"
        }`}>
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-white/5">
              <h2 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <MessageSquare size={17} style={{ color: primaryColor }} />
                <span>{language === "bn" ? "সাম্প্রতিক বার্তা" : "Recent Inquiries"}</span>
              </h2>
              <Link
                href="/admin/messages"
                className="text-xs font-bold text-gray-500 hover:text-gray-900 dark:hover:text-white"
              >
                View All
              </Link>
            </div>

            <div className="divide-y divide-gray-100 dark:divide-white/5 mt-2">
              {messages.slice(0, 4).map((msg) => (
                <div key={msg.id} className="py-3 flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="font-bold text-xs text-gray-900 dark:text-white truncate">
                      {msg.name}
                    </div>
                    <div className="text-xs text-gray-500 truncate mt-0.5">
                      {msg.subject}
                    </div>
                    <div className="text-xs text-gray-400 font-mono mt-0.5">
                      {msg.email} • {msg.date}
                    </div>
                  </div>
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-bold flex-shrink-0 ${
                    msg.status === "Unread"
                      ? "bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300"
                      : "bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-gray-400"
                  }`}>
                    {msg.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-gray-100 dark:border-white/5">
            <Link
              href="/admin/messages"
              style={{ backgroundColor: `${primaryColor}15`, color: primaryColor }}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all"
            >
              <span>{language === "bn" ? "সকল বার্তা দেখুন" : "Manage Inquiries"}</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        {/* Right: Donations */}
        <div className={`p-6 rounded-3xl border flex flex-col justify-between ${
          theme === "dark" ? "bg-[#181824] border-white/5 shadow-xs" : "bg-white border-gray-200/80 shadow-xs"
        }`}>
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-white/5">
              <h2 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Receipt size={17} style={{ color: primaryColor }} />
                <span>{language === "bn" ? "সাম্প্রতিক অনুদান" : "Recent Grants & Donations"}</span>
              </h2>
              <Link
                href="/admin/donations"
                className="text-xs font-bold text-gray-500 hover:text-gray-900 dark:hover:text-white"
              >
                View All
              </Link>
            </div>

            <div className="divide-y divide-gray-100 dark:divide-white/5 mt-2">
              {donations.slice(0, 4).map((record) => (
                <div key={record.id} className="py-3 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="font-bold text-xs text-gray-900 dark:text-white truncate">
                      {record.donorName}
                    </div>
                    <div className="text-xs text-gray-400 truncate mt-0.5">
                      {record.program} • {record.donorType}
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <div className="font-bold text-xs text-emerald-600 dark:text-emerald-400 font-mono">
                      {record.currency} {record.amount.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-400 font-mono mt-0.5">
                      {record.date}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-gray-100 dark:border-white/5">
            <Link
              href="/admin/donations"
              style={{ backgroundColor: primaryColor }}
              className="w-full py-2.5 px-4 rounded-xl text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs hover:opacity-95 transition-all"
            >
              <span>{language === "bn" ? "নতুন অনুদান এন্ট্রি" : "Record New Grant"}</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
