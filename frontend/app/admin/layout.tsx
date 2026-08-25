"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  BarChart2, 
  Users, 
  User, 
  CreditCard, 
  ShoppingBag, 
  FolderKanban, 
  ShieldCheck, 
  Kanban, 
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
  Palette
} from "lucide-react";
import { useContent } from "@/context/ContentContext";
import { ThemeColorPicker } from "@/components/admin/ThemeColorPicker";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { theme, setTheme, primaryColor, messages, siteSettings } = useContent();
  const [ecommerceOpen, setEcommerceOpen] = useState(true);
  const [usersOpen, setUsersOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const unreadCount = messages.filter(m => m.status === "Unread").length;

  const contentNavItems = [
    { name: "Hero Banners", href: "/admin/hero", icon: Sparkles },
    { name: "Impact Metrics", href: "/admin/impact", icon: BarChart2 },
    { name: "Programs", href: "/admin/programs", icon: BookOpen },
    { name: "News & Stories", href: "/admin/news", icon: Newspaper },
    { name: "Microfinance", href: "/admin/microfinance", icon: CreditCard },
    { name: "Leadership Team", href: "/admin/team", icon: Users },
    { name: "Partners & Donors", href: "/admin/partners", icon: HeartHandshake },
    { name: "Media Gallery", href: "/admin/gallery", icon: ImageIcon },
    { name: "Branch Offices", href: "/admin/branches", icon: MapPin },
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
                  Admin
                </span>
              </div>
              <div className="text-[10px] font-semibold text-gray-500 dark:text-gray-400 truncate">Village Education Resource</div>
            </div>
          </Link>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto px-4 space-y-1.5 custom-scrollbar pb-6 pt-4">
          {/* Home */}
          <Link
            href="/admin"
            style={pathname === "/admin" ? { backgroundColor: primaryColor } : {}}
            className={`flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 ${
              pathname === "/admin"
                ? "text-white shadow-lg font-bold"
                : theme === "dark"
                ? "text-gray-400 hover:text-white hover:bg-white/5"
                : "text-gray-700 hover:text-gray-950 hover:bg-gray-100"
            }`}
          >
            <div className="flex items-center gap-3.5">
              <Home size={18} className={pathname === "/admin" ? "text-white" : "text-gray-500"} />
              <span>Home</span>
            </div>
          </Link>

          {/* Users with Dropdown */}
          <div>
            <button
              type="button"
              onClick={() => setUsersOpen(!usersOpen)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-semibold transition-all cursor-pointer ${
                pathname.startsWith("/admin/users") || pathname.startsWith("/admin/subscribers")
                  ? "font-bold"
                  : theme === "dark"
                  ? "text-gray-400 hover:text-white hover:bg-white/5"
                  : "text-gray-700 hover:text-gray-950 hover:bg-gray-100"
              }`}
              style={
                pathname.startsWith("/admin/users") || pathname.startsWith("/admin/subscribers")
                  ? { color: primaryColor, backgroundColor: `${primaryColor}15` }
                  : {}
              }
            >
              <div className="flex items-center gap-3.5">
                <Users size={18} />
                <span>Users & People</span>
              </div>
              <ChevronDown size={16} className={`transition-transform duration-200 ${usersOpen ? "rotate-180" : ""}`} />
            </button>
            {usersOpen && (
              <div className="pl-11 pr-2 py-1 space-y-1">
                <Link
                  href="/admin/subscribers"
                  style={pathname === "/admin/subscribers" ? { color: primaryColor } : {}}
                  className={`block py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                    pathname === "/admin/subscribers" ? "font-bold" : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  }`}
                >
                  Newsletter Subscribers
                </Link>
                <Link
                  href="/admin/team"
                  style={pathname === "/admin/team" ? { color: primaryColor } : {}}
                  className={`block py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                    pathname === "/admin/team" ? "font-bold" : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  }`}
                >
                  Staff & Directors
                </Link>
              </div>
            )}
          </div>

          {/* Content Management (E-commerce / Content) */}
          <div>
            <button
              type="button"
              onClick={() => setEcommerceOpen(!ecommerceOpen)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-semibold transition-all cursor-pointer ${
                contentNavItems.some(i => i.href === pathname)
                  ? "font-bold"
                  : theme === "dark"
                  ? "text-gray-400 hover:text-white hover:bg-white/5"
                  : "text-gray-700 hover:text-gray-950 hover:bg-gray-100"
              }`}
              style={
                contentNavItems.some(i => i.href === pathname)
                  ? { color: primaryColor, backgroundColor: `${primaryColor}15` }
                  : {}
              }
            >
              <div className="flex items-center gap-3.5">
                <ShoppingBag size={18} />
                <span>E-commerce & CMS</span>
              </div>
              <ChevronDown size={16} className={`transition-transform duration-200 ${ecommerceOpen ? "rotate-180" : ""}`} />
            </button>

            {ecommerceOpen && (
              <div className="pl-6 pr-2 py-1 space-y-1">
                {contentNavItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      style={isActive ? { backgroundColor: primaryColor } : {}}
                      className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                        isActive
                          ? "text-white shadow-sm font-bold"
                          : theme === "dark"
                          ? "text-gray-400 hover:text-white hover:bg-white/5"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <Icon size={14} className={isActive ? "text-white" : "text-gray-500"} />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>

          {/* Messages */}
          <Link
            href="/admin/messages"
            style={pathname === "/admin/messages" ? { backgroundColor: primaryColor } : {}}
            className={`flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
              pathname === "/admin/messages"
                ? "text-white shadow-lg font-bold"
                : theme === "dark"
                ? "text-gray-400 hover:text-white hover:bg-white/5"
                : "text-gray-700 hover:text-gray-950 hover:bg-gray-100"
            }`}
          >
            <div className="flex items-center gap-3.5">
              <MessageSquare size={18} className={pathname === "/admin/messages" ? "text-white" : "text-gray-500"} />
              <span>Messages</span>
            </div>
            {unreadCount > 0 && (
              <span className="w-5 h-5 bg-pink-500 text-white rounded-full flex items-center justify-center text-[10px] font-bold">
                {unreadCount}
              </span>
            )}
          </Link>

          {/* Settings */}
          <Link
            href="/admin/settings"
            style={pathname === "/admin/settings" ? { backgroundColor: primaryColor } : {}}
            className={`flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
              pathname === "/admin/settings"
                ? "text-white shadow-lg font-bold"
                : theme === "dark"
                ? "text-gray-400 hover:text-white hover:bg-white/5"
                : "text-gray-700 hover:text-gray-950 hover:bg-gray-100"
            }`}
          >
            <div className="flex items-center gap-3.5">
              <Settings size={18} className={pathname === "/admin/settings" ? "text-white" : "text-gray-500"} />
              <span>Settings</span>
            </div>
          </Link>
        </div>

        {/* Bottom Area: Theme Switcher & User Profile Pill */}
        <div className="p-4 space-y-3 border-t border-gray-200 dark:border-white/5">
          {/* Light / Dark Mode Pill */}
          <div className={`flex items-center p-1 rounded-2xl border ${
            theme === "dark" ? "bg-[#14141E] border-white/5" : "bg-gray-100 border-gray-200"
          }`}>
            <button
              type="button"
              onClick={() => setTheme("light")}
              style={theme === "light" ? { color: primaryColor } : {}}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                theme === "light"
                  ? "bg-white shadow-sm"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              <Sun size={14} /> Light
            </button>
            <button
              type="button"
              onClick={() => setTheme("dark")}
              style={theme === "dark" ? { backgroundColor: primaryColor } : {}}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                theme === "dark"
                  ? "text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-900 dark:hover:text-gray-200"
              }`}
            >
              <Moon size={14} /> Dark
            </button>
          </div>

          {/* User Profile Card with Dynamic Theme Color */}
          <div
            className="flex items-center justify-between p-2.5 rounded-2xl text-white shadow-md transition-colors"
            style={{ backgroundColor: primaryColor }}
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white/40 bg-white/20 p-0.5">
                <img
                  src={siteSettings.logoUrl || "/assets/logo.png"}
                  alt="VERC Admin"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="leading-tight">
                <span className="text-xs font-extrabold tracking-wide block">VERC Admin</span>
                <span className="text-[10px] text-white/80 font-medium">Head Office</span>
              </div>
            </div>
            <ChevronDown size={16} className="text-white/80" />
          </div>
        </div>
      </aside>

      {/* Main Content Viewport */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header Bar */}
        <header className={`h-20 flex items-center justify-between px-8 transition-colors ${
          theme === "dark" ? "bg-[#1A1926] border-b border-white/5" : "bg-white/90 backdrop-blur-md border-b border-gray-200"
        }`}>
          {/* Title with dynamic primaryColor */}
          <div className="flex items-center gap-4">
            <h1
              className="text-2xl font-black tracking-tight"
              style={{ color: primaryColor }}
            >
              {pathname === "/admin"
                ? "Dashboard"
                : pathname === "/admin/hero"
                ? "Hero Sliders & Banners"
                : pathname === "/admin/programs"
                ? "Social Programs Management"
                : pathname === "/admin/impact"
                ? "Impact Statistics"
                : pathname === "/admin/news"
                ? "News & Success Stories"
                : pathname === "/admin/microfinance"
                ? "Microfinance Products"
                : pathname === "/admin/team"
                ? "Leadership & Staff"
                : pathname === "/admin/partners"
                ? "Development Partners"
                : pathname === "/admin/gallery"
                ? "Media Gallery"
                : pathname === "/admin/branches"
                ? "Branch Network"
                : pathname === "/admin/messages"
                ? "Contact Inquiries Inbox"
                : pathname === "/admin/subscribers"
                ? "Newsletter Subscribers"
                : pathname === "/admin/settings"
                ? "Settings & Branding"
                : "Admin Panel"}
            </h1>
          </div>

          {/* Center Search Bar */}
          <div className="relative w-96 max-w-md hidden md:block">
            <input
              type="text"
              placeholder="Search anything here..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-5 pr-11 py-2.5 rounded-2xl text-xs outline-none transition-all ${
                theme === "dark"
                  ? "bg-[#14141E] border border-white/10 text-white placeholder-gray-500 focus:border-[#004B8D]"
                  : "bg-[#F8F9FE] border border-gray-200 text-gray-900 placeholder-gray-400 focus:bg-white shadow-sm font-medium"
              }`}
            />
            <Search size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>

          {/* Right Action Shortcuts & Theme Color Picker */}
          <div className="flex items-center gap-3">
            {/* Theme Color Picker Dropdown Component */}
            <ThemeColorPicker />

            <Link
              href="/"
              target="_blank"
              style={{ color: primaryColor, backgroundColor: `${primaryColor}15` }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs group cursor-pointer"
            >
              <span>View Public Website</span>
              <ExternalLink size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>

            <Link
              href="/admin/messages"
              className="p-2.5 text-gray-500 hover:bg-gray-100 dark:hover:bg-white/10 rounded-2xl relative transition-all cursor-pointer"
              title="Notifications"
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <span className="absolute top-2 right-2 w-2 h-2 bg-pink-500 rounded-full ring-2 ring-white"></span>
              )}
            </Link>
          </div>
        </header>

        {/* Scrollable Page Body */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {children}
        </div>
      </main>
    </div>
  );
}
