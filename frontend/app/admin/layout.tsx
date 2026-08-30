"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  Heart, 
  BarChart2, 
  Users, 
  CreditCard, 
  FolderKanban, 
  ShieldCheck, 
  Calendar, 
  FileText, 
  MessageSquare, 
  ChevronDown, 
  ChevronRight,
  Sun, 
  Moon, 
  Search, 
  Sparkles,
  ExternalLink,
  Layers,
  Image as ImageIcon,
  BookOpen,
  Newspaper,
  HeartHandshake,
  MapPin,
  Settings,
  Bell,
  CheckCircle2,
  Globe,
  Palette,
  Target,
  PlusCircle,
  HelpCircle,
  LogOut
} from "lucide-react";
import { useContent } from "@/context/ContentContext";
import { ThemeColorPicker } from "@/components/admin/ThemeColorPicker";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { theme, setTheme, primaryColor, messages, siteSettings, donations, campaigns, programs } = useContent();
  const [searchQuery, setSearchQuery] = useState("");
  const [programsOpen, setProgramsOpen] = useState(true);
  const [governanceOpen, setGovernanceOpen] = useState(false);

  const unreadCount = messages.filter(m => m.status === "Unread").length;

  const coreCharityNav = [
    { name: "Charity Overview", href: "/admin", icon: Home, badge: "Live" },
    { name: "Donations & Grants", href: "/admin/donations", icon: Heart, count: donations.length },
    { name: "Programs & Operations", href: "/admin/programs", icon: BookOpen, count: programs.length },
    { name: "Impact & Beneficiaries", href: "/admin/impact", icon: BarChart2 },
    { name: "Field News & Visits", href: "/admin/news", icon: Newspaper },
    { name: "Donors & Partners", href: "/admin/partners", icon: HeartHandshake },
    { name: "Microfinance & Credit", href: "/admin/microfinance", icon: CreditCard },
    { name: "Field Branch Offices", href: "/admin/branches", icon: MapPin },
    { name: "Documentary Gallery", href: "/admin/gallery", icon: ImageIcon },
    { name: "Humanitarian Team", href: "/admin/team", icon: Users },
    { name: "Hero Banners & Appeals", href: "/admin/hero", icon: Sparkles },
    { name: "Inquiries & Aid Requests", href: "/admin/messages", icon: MessageSquare, count: unreadCount, countColor: "bg-rose-500" },
    { name: "Supporters & Subscribers", href: "/admin/subscribers", icon: Globe },
    { name: "NGO Settings & Branding", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className={`min-h-screen flex ${theme === "dark" ? "bg-[#14141E] text-white" : "bg-[#F5F6FA] text-gray-900"}`}>
      {/* Sidebar */}
      <aside className={`w-64 flex-shrink-0 flex flex-col justify-between border-r transition-colors z-30 ${
        theme === "dark" ? "bg-[#1A1926] border-white/5" : "bg-white border-gray-200"
      }`}>
        {/* Top Logo with Official VERC Logo from frontend */}
        <div className="p-5 border-b border-gray-100 dark:border-white/5">
          <Link href="/admin" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-white dark:bg-white/10 p-1.5 border border-gray-200 dark:border-white/10 flex items-center justify-center shadow-xs flex-shrink-0 group-hover:scale-105 transition-transform">
              <img
                src={siteSettings.logoUrl || "/assets/logo.png"}
                alt="VERC Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="min-w-0">
              <div className="font-extrabold text-base tracking-tight text-gray-900 dark:text-white flex items-center gap-1.5 truncate">
                <span>VERC</span>
                <span
                  className="text-[9px] px-1.5 py-0.5 rounded text-white font-black uppercase tracking-wider"
                  style={{ backgroundColor: primaryColor }}
                >
                  Charity Suite
                </span>
              </div>
              <div className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 truncate">
                NGO Operations Center
              </div>
            </div>
          </Link>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto px-4 space-y-1 custom-scrollbar pb-6 pt-3">
          <div className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400 dark:text-gray-500 px-3 py-1.5">
            Charity Management
          </div>

          {coreCharityNav.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                style={isActive ? { backgroundColor: primaryColor } : {}}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? "text-white shadow-md font-bold"
                    : theme === "dark"
                    ? "text-gray-400 hover:text-white hover:bg-white/5"
                    : "text-gray-700 hover:text-gray-950 hover:bg-gray-100"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Icon size={16} className={isActive ? "text-white" : "text-gray-500"} />
                  <span className="truncate">{item.name}</span>
                </div>

                {item.count !== undefined && item.count > 0 && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                    isActive
                      ? "bg-white/20 text-white"
                      : item.countColor
                      ? `${item.countColor} text-white`
                      : "bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300"
                  }`}>
                    {item.count}
                  </span>
                )}
                {item.badge && !item.count && (
                  <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                    isActive ? "bg-white/20 text-white" : "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300"
                  }`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Bottom User / Quick Action */}
        <div className="p-4 border-t border-gray-100 dark:border-white/5 space-y-3">
          <Link
            href="/"
            target="_blank"
            className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300 text-xs font-bold rounded-xl transition-all"
          >
            <ExternalLink size={13} /> View Live Website
          </Link>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200 flex items-center justify-center font-black text-xs">
                VO
              </div>
              <div>
                <div className="text-xs font-bold text-gray-900 dark:text-white truncate">VERC Admin</div>
                <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Authorized
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-xl text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
              title="Toggle Theme"
            >
              {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <header className={`h-16 flex-shrink-0 flex items-center justify-between px-6 border-b transition-colors ${
          theme === "dark" ? "bg-[#1A1926] border-white/5" : "bg-white border-gray-200 shadow-xs"
        }`}>
          {/* Breadcrumb & Title */}
          <div className="flex items-center gap-3">
            <div className="text-xs font-bold text-gray-400 flex items-center gap-1.5">
              <Link href="/admin" className="hover:text-gray-700 dark:hover:text-gray-200">VERC HQ</Link>
              <span>/</span>
              <span className="text-gray-900 dark:text-white font-extrabold capitalize">
                {pathname === "/admin" ? "Charity Mission Control" : pathname.replace("/admin/", "").replace("-", " ")}
              </span>
            </div>
          </div>

          {/* Quick Actions & Live Indicator */}
          <div className="flex items-center gap-3">
            <Link
              href="/admin/donations"
              style={{ backgroundColor: `${primaryColor}15`, color: primaryColor }}
              className="px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 hover:opacity-90"
            >
              <Heart size={14} className="fill-current" /> Record Donation
            </Link>

            <Link
              href="/admin/programs"
              className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/20 text-gray-800 dark:text-gray-200 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <BookOpen size={14} /> Add Program
            </Link>

            <div className="h-5 w-[1px] bg-gray-200 dark:bg-white/10 mx-1"></div>

            <Link
              href="/admin/messages"
              className="relative p-2 rounded-xl text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
              title="Aid Inquiries & Messages"
            >
              <MessageSquare size={17} />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white dark:ring-[#1A1926]"></span>
              )}
            </Link>

            <Link
              href="/admin/settings"
              className="p-2 rounded-xl text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
              title="NGO Branding & Settings"
            >
              <Settings size={17} />
            </Link>
          </div>
        </header>

        {/* Page Content View */}
        <main className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          {children}
        </main>
      </div>
    </div>
  );
}
