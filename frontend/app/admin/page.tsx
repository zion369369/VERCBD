"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Users, 
  ShoppingBag, 
  XCircle, 
  MoreHorizontal, 
  Star, 
  Mail, 
  ArrowUpRight, 
  TrendingUp, 
  Sparkles,
  Edit2,
  BookOpen,
  Newspaper,
  CreditCard,
  HeartHandshake
} from "lucide-react";
import { useContent } from "@/context/ContentContext";

export default function AdminDashboardPage() {
  const { theme, primaryColor, dashboardMetrics, programs, news, stories, microfinanceProducts } = useContent();
  const [selectedMonth, setSelectedMonth] = useState("Month");

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

  // Semi-circle gauge for Profit Increase
  const GaugeMeter = ({ percentage }: { percentage: number }) => {
    const radius = 70;
    const circumference = Math.PI * radius;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative flex flex-col items-center justify-center w-full pt-4 pb-2">
        <svg width="180" height="100" viewBox="0 0 180 100" className="overflow-visible">
          {/* Background semi circle */}
          <path
            d="M 20 90 A 70 70 0 0 1 160 90"
            fill="none"
            stroke={theme === "dark" ? "#2B2A3D" : "#E5E7EB"}
            strokeWidth="14"
            strokeLinecap="round"
          />
          {/* Ticks */}
          {[0, 20, 40, 60, 80, 100].map((tick, i) => {
            const angle = (i * 180) / 5;
            const rad = (angle * Math.PI) / 180;
            const x1 = 90 - 55 * Math.cos(rad);
            const y1 = 90 - 55 * Math.sin(rad);
            const x2 = 90 - 48 * Math.cos(rad);
            const y2 = 90 - 48 * Math.sin(rad);
            return (
              <line
                key={tick}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={theme === "dark" ? "#4A4960" : "#9CA3AF"}
                strokeWidth="2"
                strokeLinecap="round"
              />
            );
          })}
          {/* Animated gradient progress arc */}
          <path
            d="M 20 90 A 70 70 0 0 1 160 90"
            fill="none"
            stroke="url(#profitGradient)"
            strokeWidth="14"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
          <defs>
            <linearGradient id="profitGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={primaryColor} />
              <stop offset="70%" stopColor={primaryColor} stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FFA756" />
            </linearGradient>
          </defs>
        </svg>

        {/* Center Percentage */}
        <div className="absolute bottom-2 text-center">
          <div className="text-2xl font-black tracking-tight" style={{ color: primaryColor }}>
            {percentage}%
          </div>
        </div>
      </div>
    );
  };

  // Pie Chart for Current Visits
  const PieChartWidget = () => {
    return (
      <div className="flex flex-col items-center">
        <div className="relative w-40 h-40 flex items-center justify-center my-2">
          {/* Custom SVG Pie */}
          <svg width="150" height="150" viewBox="0 0 42 42" className="transform -rotate-90">
            {/* Europe: 34.7% (Pink) */}
            <circle
              cx="21"
              cy="21"
              r="15.91549430918954"
              fill="transparent"
              stroke="#F56565"
              strokeWidth="10"
              strokeDasharray="34.7 65.3"
              strokeDashoffset="0"
            />
            {/* America: 28.4% (Orange) */}
            <circle
              cx="21"
              cy="21"
              r="15.91549430918954"
              fill="transparent"
              stroke="#FFA756"
              strokeWidth="10"
              strokeDasharray="28.4 71.6"
              strokeDashoffset="-34.7"
            />
            {/* Asia: 27.7% (Dynamic Primary Color) */}
            <circle
              cx="21"
              cy="21"
              r="15.91549430918954"
              fill="transparent"
              stroke={primaryColor}
              strokeWidth="10"
              strokeDasharray="27.7 72.3"
              strokeDashoffset="-63.1"
            />
            {/* Africa: 9.2% (Cyan) */}
            <circle
              cx="21"
              cy="21"
              r="15.91549430918954"
              fill="transparent"
              stroke="#4FD1C5"
              strokeWidth="10"
              strokeDasharray="9.2 90.8"
              strokeDashoffset="-90.8"
            />
          </svg>

          {/* Slices Labels Overlay */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-[10px] font-extrabold text-white bg-black/40 px-1 rounded backdrop-blur-xs">
              34.7%
            </span>
          </div>
        </div>

        {/* Legend dots */}
        <div className="flex items-center justify-center gap-3 text-[10px] font-semibold text-gray-600 dark:text-gray-400 flex-wrap mt-2">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#FFA756]"></span> America
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#4FD1C5]"></span> Africa
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[#F56565]"></span> Europe
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: primaryColor }}></span> Asia
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Quick Access Action Bar */}
      <div className={`flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-3xl border gap-4 transition-all ${
        theme === "dark" ? "bg-[#1A1926] border-white/5" : "bg-white border-gray-200 shadow-sm"
      }`}>
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: `${primaryColor}15`, color: primaryColor }}
          >
            <Sparkles size={18} />
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900 dark:text-white">Content Management Studio</h3>
            <p className="text-[11px] text-gray-500 dark:text-gray-400">All changes made in this admin panel update the live website immediately.</p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Link
            href="/admin/hero"
            style={{ backgroundColor: primaryColor }}
            className="px-3.5 py-2 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
          >
            <Edit2 size={12} /> Edit Hero Banners
          </Link>
          <Link
            href="/admin/programs"
            className="px-3.5 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/20 text-gray-800 dark:text-gray-200 rounded-xl text-xs font-bold transition-all"
          >
            Programs ({programs.length})
          </Link>
          <Link
            href="/admin/news"
            className="px-3.5 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/20 text-gray-800 dark:text-gray-200 rounded-xl text-xs font-bold transition-all"
          >
            News & Stories ({news.length})
          </Link>
        </div>
      </div>

      {/* Row 1: Top 3 Metric Cards + Today Best Sale Card (Exact match to Reference Image) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1: Customers */}
        <div className={`p-6 rounded-3xl border transition-all ${
          theme === "dark" ? "bg-[#1A1926] border-white/5" : "bg-white border-gray-200 shadow-sm"
        }`}>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="text-xs font-bold text-gray-500 dark:text-gray-400">Customers</div>
              <div className="text-3xl font-extrabold" style={{ color: primaryColor }}>
                {dashboardMetrics.customers.value}
              </div>
              <div className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">
                {dashboardMetrics.customers.period}
              </div>
            </div>
            <DonutRing percentage={dashboardMetrics.customers.percentage} color={primaryColor} />
          </div>
        </div>

        {/* Card 2: Orders */}
        <div className={`p-6 rounded-3xl border transition-all ${
          theme === "dark" ? "bg-[#1A1926] border-white/5" : "bg-white border-gray-200 shadow-sm"
        }`}>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="text-xs font-bold text-gray-500 dark:text-gray-400">Orders</div>
              <div className="text-3xl font-extrabold" style={{ color: primaryColor }}>
                {dashboardMetrics.orders.value}
              </div>
              <div className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">
                {dashboardMetrics.orders.period}
              </div>
            </div>
            <DonutRing percentage={dashboardMetrics.orders.percentage} color={primaryColor} />
          </div>
        </div>

        {/* Card 3: Cancel */}
        <div className={`p-6 rounded-3xl border transition-all ${
          theme === "dark" ? "bg-[#1A1926] border-white/5" : "bg-white border-gray-200 shadow-sm"
        }`}>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="text-xs font-bold text-gray-500 dark:text-gray-400">Cancel</div>
              <div className="text-3xl font-extrabold" style={{ color: primaryColor }}>
                {dashboardMetrics.cancel.value}
              </div>
              <div className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">
                {dashboardMetrics.cancel.period}
              </div>
            </div>
            <DonutRing percentage={dashboardMetrics.cancel.percentage} color="#FFA756" />
          </div>
        </div>

        {/* Card 4: Today Best Sale */}
        <div className={`p-6 rounded-3xl border flex flex-col justify-between transition-all ${
          theme === "dark" ? "bg-[#1A1926] border-white/5" : "bg-white border-gray-200 shadow-sm"
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-gray-900 dark:text-white">Today Best Sale</span>
            <button className="text-gray-400 hover:text-gray-600">
              <MoreHorizontal size={16} />
            </button>
          </div>

          <div className="flex items-center gap-3.5 mt-2">
            <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center overflow-hidden flex-shrink-0 border border-gray-200">
              <img
                src={dashboardMetrics.todayBestSale.imageUrl}
                alt="Product"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="text-xs font-extrabold text-gray-900 dark:text-white">
                {dashboardMetrics.todayBestSale.title}
              </div>
              <div className="text-[11px] text-gray-500 dark:text-gray-400 font-semibold">
                {dashboardMetrics.todayBestSale.sales} Sales
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Revenue Report (Left) + Latest Customer & Profit Increase (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (Span 2): Revenue Report Dual Bar Chart */}
        <div className={`lg:col-span-2 p-6 rounded-3xl border transition-all ${
          theme === "dark" ? "bg-[#1A1926] border-white/5" : "bg-white border-gray-200 shadow-sm"
        }`}>
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-sm font-extrabold text-gray-900 dark:text-white">Revenue Report</h2>

            <div className="flex items-center gap-6">
              {/* Legend */}
              <div className="flex items-center gap-4 text-xs font-semibold">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: primaryColor }}></span>
                  <span className="text-gray-600 dark:text-gray-400">Earning</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-sm bg-[#FFA756]"></span>
                  <span className="text-gray-600 dark:text-gray-400">Expenses</span>
                </div>
              </div>

              {/* Month Dropdown */}
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className={`text-xs font-bold px-3 py-1.5 rounded-xl border outline-none cursor-pointer ${
                  theme === "dark" ? "bg-[#14141E] border-white/10 text-gray-300" : "bg-[#F8F9FE] border-gray-300 text-gray-800"
                }`}
              >
                <option value="Month">Month</option>
                <option value="Year">Year</option>
                <option value="Quarter">Quarter</option>
              </select>
            </div>
          </div>

          {/* Dual Bar Chart Layout */}
          <div className="relative h-64 flex flex-col justify-between pt-4">
            {/* Grid Horizontal Guide Lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none text-[10px] text-gray-400 font-medium">
              <div className="border-b border-gray-200 dark:border-white/5 w-full flex justify-between">
                <span>+300</span>
              </div>
              <div className="border-b border-gray-200 dark:border-white/5 w-full flex justify-between">
                <span>+200</span>
              </div>
              <div className="border-b border-gray-200 dark:border-white/5 w-full flex justify-between">
                <span>+100</span>
              </div>
              <div className="border-b border-gray-300 dark:border-white/10 w-full flex justify-between">
                <span>0</span>
              </div>
              <div className="border-b border-gray-200 dark:border-white/5 w-full flex justify-between">
                <span>-100</span>
              </div>
              <div className="w-full flex justify-between">
                <span>-200</span>
              </div>
            </div>

            {/* Bars Area */}
            <div className="relative h-full flex items-center justify-between px-8 z-10">
              {dashboardMetrics.revenueData.map((item) => {
                const positiveHeight = (item.earning / 350) * 80;
                const negativeHeight = (Math.abs(item.expenses) / 350) * 80;

                return (
                  <div key={item.month} className="flex flex-col items-center h-full justify-center group relative cursor-pointer">
                    {/* Top Bar (Earning - Dynamic Primary Color) */}
                    <div className="h-[90px] flex items-end">
                      <div
                        style={{ height: `${positiveHeight}px`, backgroundColor: primaryColor }}
                        className="w-2.5 rounded-full transition-all duration-300 shadow-sm opacity-90 group-hover:opacity-100"
                      ></div>
                    </div>

                    {/* Zero Line Spacer */}
                    <div className="h-[2px] w-full"></div>

                    {/* Bottom Bar (Expenses - Orange) */}
                    <div className="h-[70px] flex items-start">
                      <div
                        style={{ height: `${negativeHeight}px` }}
                        className="w-2.5 rounded-full bg-[#FFA756] group-hover:bg-[#e69040] transition-all duration-300 shadow-sm"
                      ></div>
                    </div>

                    {/* Month Label */}
                    <span className="text-[10px] text-gray-500 dark:text-gray-400 font-semibold mt-2 group-hover:font-bold transition-colors">
                      {item.month}
                    </span>

                    {/* Tooltip on Hover */}
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-20">
                      Earning: ${item.earning} | Exp: ${Math.abs(item.expenses)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Latest Customer & Profit Increase */}
        <div className="space-y-6">
          {/* Latest Customer Card */}
          <div className={`p-6 rounded-3xl border transition-all ${
            theme === "dark" ? "bg-[#1A1926] border-white/5" : "bg-white border-gray-200 shadow-sm"
          }`}>
            <h3 className="text-xs font-bold text-gray-900 dark:text-white mb-4">Latest Customer</h3>
            <div className="space-y-3.5">
              {dashboardMetrics.latestCustomers.map((cust) => (
                <div key={cust.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-200">
                      <img src={cust.avatarUrl} alt={cust.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="text-xs font-extrabold text-gray-900 dark:text-white">{cust.name}</div>
                      <div className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">
                        {cust.purchases} Purchases | {cust.likes} Likes
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => alert(`Opening messenger with ${cust.name} (${cust.email})`)}
                    style={{ color: primaryColor, backgroundColor: `${primaryColor}15` }}
                    className="w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <Mail size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Profit Increase Card */}
          <div className={`p-6 rounded-3xl border transition-all ${
            theme === "dark" ? "bg-[#1A1926] border-white/5" : "bg-white border-gray-200 shadow-sm"
          }`}>
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-gray-900 dark:text-white">Profit Increase</h3>
              <button className="text-gray-400 hover:text-gray-600">
                <MoreHorizontal size={16} />
              </button>
            </div>
            <GaugeMeter percentage={dashboardMetrics.profitIncrease} />
          </div>
        </div>
      </div>

      {/* Row 3: Recent Order + Trending Items + Current Visit (Exact match to Reference Image) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1: Recent Order */}
        <div className={`p-6 rounded-3xl border transition-all ${
          theme === "dark" ? "bg-[#1A1926] border-white/5" : "bg-white border-gray-200 shadow-sm"
        }`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold text-gray-900 dark:text-white">Recent order</h3>
            <Link
              href="/admin/microfinance"
              style={{ color: primaryColor }}
              className="text-xs font-bold hover:underline"
            >
              See All
            </Link>
          </div>

          <div className="space-y-3.5">
            {dashboardMetrics.recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-gray-100 overflow-hidden flex items-center justify-center flex-shrink-0 border border-gray-200">
                    <img src={order.imageUrl} alt={order.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-gray-900 dark:text-white">{order.title}</div>
                    <div className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">{order.timeAgo}</div>
                  </div>
                </div>
                <div className="text-xs font-extrabold" style={{ color: primaryColor }}>
                  {order.price}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Card 2: Trending Items */}
        <div className={`p-6 rounded-3xl border transition-all ${
          theme === "dark" ? "bg-[#1A1926] border-white/5" : "bg-white border-gray-200 shadow-sm"
        }`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold text-gray-900 dark:text-white">Trending items</h3>
            <Link
              href="/admin/programs"
              style={{ color: primaryColor }}
              className="text-xs font-bold hover:underline"
            >
              See All
            </Link>
          </div>

          <div className="space-y-4">
            {dashboardMetrics.trendingItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gray-100 overflow-hidden flex items-center justify-center flex-shrink-0 border border-gray-200">
                    <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs font-bold text-gray-900 dark:text-white">{item.title}</div>
                    <div className="flex items-center gap-0.5 text-[#FFA756]">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={11}
                          fill={i < item.rating ? "#FFA756" : "none"}
                          stroke="#FFA756"
                        />
                      ))}
                    </div>
                    <div className="text-[10px] text-gray-500 dark:text-gray-400 font-medium">{item.stock}</div>
                  </div>
                </div>
                <div className="text-sm font-extrabold" style={{ color: primaryColor }}>
                  {item.price}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Card 3: Current Visit */}
        <div className={`p-6 rounded-3xl border transition-all ${
          theme === "dark" ? "bg-[#1A1926] border-white/5" : "bg-white border-gray-200 shadow-sm"
        }`}>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-bold text-gray-900 dark:text-white">Current visit</h3>
          </div>
          <PieChartWidget />
        </div>
      </div>
    </div>
  );
}
