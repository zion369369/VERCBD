"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  Home, 
  Heart, 
  BarChart2, 
  Users, 
  CreditCard, 
  MessageSquare, 
  Sun, 
  Moon, 
  Sparkles,
  ExternalLink,
  Image as ImageIcon,
  BookOpen,
  Newspaper,
  HeartHandshake,
  MapPin,
  Settings,
  Globe,
  Palette,
  LogOut,
  KeyRound,
  ShieldAlert,
  ArrowRight,
  Check
} from "lucide-react";
import { useContent } from "@/context/ContentContext";
import { useLanguage } from "@/context/LanguageContext";
import { useAuth } from "@/context/AuthContext";
import { ThemeColorPicker } from "@/components/admin/ThemeColorPicker";
import AdminLoginPage from "./login/page";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme, primaryColor, messages, siteSettings, donations, programs } = useContent();
  const { language, setLanguage, t } = useLanguage();
  const { currentUser, isAuthenticated, isLoading, logout, hasPermission } = useAuth();

  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const isLoginPage = pathname === "/admin/login";

  // If on login page or not authenticated, render AdminLoginPage directly
  if (isLoginPage || (!isLoading && !isAuthenticated)) {
    return <AdminLoginPage />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white font-valley">
        <div className="flex flex-col items-center gap-3">
          <div 
            className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin"
            style={{ borderColor: primaryColor, borderTopColor: "transparent" }}
          />
          <span className="text-sm font-medium text-gray-400">Loading...</span>
        </div>
      </div>
    );
  }

  const unreadCount = messages.filter(m => m.status === "Unread").length;

  const masterNavItems = [
    { key: "admin_nav_overview", name: "Overview", href: "/admin", icon: Home },
    { key: "admin_nav_donations", name: "Donations", href: "/admin/donations", icon: Heart, count: donations.length },
    { key: "admin_nav_programs", name: "Programs", href: "/admin/programs", icon: BookOpen, count: programs.length },
    { key: "admin_nav_impact", name: "Impact", href: "/admin/impact", icon: BarChart2 },
    { key: "admin_nav_news", name: "News & Stories", href: "/admin/news", icon: Newspaper },
    { key: "admin_nav_partners", name: "Partners", href: "/admin/partners", icon: HeartHandshake },
    { key: "admin_nav_microfinance", name: "Microfinance", href: "/admin/microfinance", icon: CreditCard },
    { key: "admin_nav_branches", name: "Branches", href: "/admin/branches", icon: MapPin },
    { key: "admin_nav_gallery", name: "Gallery", href: "/admin/gallery", icon: ImageIcon },
    { key: "admin_nav_team", name: "Team", href: "/admin/team", icon: Users },
    { key: "admin_nav_hero", name: "Banners", href: "/admin/hero", icon: Sparkles },
    { key: "admin_nav_messages", name: "Inquiries", href: "/admin/messages", icon: MessageSquare, count: unreadCount, countColor: "bg-rose-500" },
    { key: "admin_nav_subscribers", name: "Supporters", href: "/admin/subscribers", icon: Globe },
    { key: "admin_nav_settings", name: "Settings", href: "/admin/settings", icon: Settings },
    { key: "admin_nav_users", name: "Users & Roles", href: "/admin/users", icon: KeyRound },
  ];

  const authorizedNavItems = masterNavItems.filter((item) => hasPermission(item.href));
  const currentRouteAuthorized = hasPermission(pathname);

  return (
    <div className={`min-h-screen flex font-valley font-sans ${theme === "dark" ? "bg-[#13131D] text-white" : "bg-[#F8F9FC] text-gray-900"}`}>
      {/* Clean, Elegant Sidebar */}
      <aside className={`w-64 flex-shrink-0 flex flex-col justify-between border-r transition-colors z-30 ${
        theme === "dark" ? "bg-[#181824] border-white/5" : "bg-white border-gray-200/80"
      }`}>
        {/* Brand Logo Header */}
        <div className="p-6 border-b border-gray-100 dark:border-white/5">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white dark:bg-white/10 p-1.5 border border-gray-200 dark:border-white/10 flex items-center justify-center shadow-xs flex-shrink-0">
              <img
                src={siteSettings.logoUrl || "/assets/logo.png"}
                alt="VERC Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <div className="font-extrabold text-base tracking-tight text-gray-900 dark:text-white">
                VERC Admin
              </div>
            </div>
          </Link>
        </div>

        {/* Clean Navigation Items */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1 custom-scrollbar">
          {authorizedNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            const translatedTitle = t(item.key) !== item.key ? t(item.key) : item.name;

            return (
              <Link
                key={item.href}
                href={item.href}
                style={isActive ? { backgroundColor: primaryColor } : {}}
                className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 ${
                  isActive
                    ? "text-white shadow-sm font-bold"
                    : theme === "dark"
                    ? "text-gray-400 hover:text-white hover:bg-white/5"
                    : "text-gray-700 hover:text-gray-950 hover:bg-gray-100/80"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Icon size={18} className={isActive ? "text-white" : "text-gray-400"} />
                  <span className="truncate">{translatedTitle}</span>
                </div>

                {item.count !== undefined && item.count > 0 && (
                  <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                    isActive
                      ? "bg-white/20 text-white"
                      : item.countColor
                      ? `${item.countColor} text-white`
                      : "bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300"
                  }`}>
                    {item.count}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Clean Bottom Section */}
        <div className="p-4 border-t border-gray-100 dark:border-white/5 space-y-3">
          <Link
            href="/"
            target="_blank"
            className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300 text-xs font-bold rounded-xl transition-all"
          >
            <ExternalLink size={14} /> {t("admin_view_live")}
          </Link>

          {/* User Profile Bar */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2.5 min-w-0">
              <div 
                className="w-8 h-8 rounded-xl text-white flex items-center justify-center font-bold text-xs flex-shrink-0 shadow-xs"
                style={{ backgroundColor: primaryColor }}
              >
                {currentUser?.fullName?.charAt(0) || "U"}
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-gray-900 dark:text-white truncate">
                  {currentUser?.username || "Admin"}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {currentUser?.roleName || "Super Admin"}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-1.5 rounded-xl text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
                title="Toggle Theme"
              >
                {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
              </button>

              <button
                type="button"
                onClick={() => {
                  if (confirm("Are you sure you want to sign out?")) {
                    logout();
                    router.push("/admin/login");
                  }
                }}
                className="p-1.5 rounded-xl text-rose-500 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                title="Sign Out"
              >
                <LogOut size={15} />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navbar */}
        <header className={`h-16 flex-shrink-0 flex items-center justify-between px-8 border-b transition-colors ${
          theme === "dark" ? "bg-[#181824] border-white/5" : "bg-white border-gray-200/80"
        }`}>
          {/* Page Title */}
          <div>
            <h1 className="text-lg font-extrabold text-gray-900 dark:text-white capitalize">
              {pathname === "/admin" 
                ? t("admin_nav_overview") 
                : pathname.replace("/admin/", "").replace("-", " ")}
            </h1>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-xs font-bold text-gray-800 dark:text-gray-200 transition-all cursor-pointer"
              >
                <Globe size={14} style={{ color: primaryColor }} />
                <span>{language === "bn" ? "🇧🇩 বাংলা" : "🇬🇧 English"}</span>
              </button>

              {langMenuOpen && (
                <div 
                  className={`absolute right-0 top-11 z-50 w-56 p-2 rounded-2xl border shadow-xl ${
                    theme === "dark" ? "bg-[#181824] border-white/10 text-white" : "bg-white border-gray-200 text-gray-900"
                  }`}
                  onMouseLeave={() => setLangMenuOpen(false)}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setLanguage("en");
                      setLangMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      language === "en"
                        ? "bg-blue-50 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300"
                        : "hover:bg-gray-100 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>🇬🇧</span>
                      <span>English</span>
                    </span>
                    {language === "en" && <Check size={14} className="text-blue-600" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setLanguage("bn");
                      setLangMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      language === "bn"
                        ? "bg-blue-50 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300"
                        : "hover:bg-gray-100 dark:hover:bg-white/5 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>🇧🇩</span>
                      <span>বাংলা</span>
                    </span>
                    {language === "bn" && <Check size={14} className="text-blue-600" />}
                  </button>
                </div>
              )}
            </div>

            {/* Theme Color Picker */}
            <ThemeColorPicker variant="dropdown" />

            {hasPermission("/admin/users") && (
              <Link
                href="/admin/users"
                className="p-2 rounded-xl text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                title="Users & Roles"
              >
                <KeyRound size={17} />
              </Link>
            )}

            {hasPermission("/admin/settings") && (
              <Link
                href="/admin/settings"
                className="p-2 rounded-xl text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                title="Settings"
              >
                <Settings size={17} />
              </Link>
            )}
          </div>
        </header>

        {/* Content View */}
        <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          {currentRouteAuthorized ? (
            children
          ) : (
            <div className="h-full flex items-center justify-center p-6">
              <div className={`max-w-md w-full p-8 rounded-3xl border text-center space-y-4 shadow-xl ${
                theme === "dark" ? "bg-[#181824] border-white/10 text-white" : "bg-white border-gray-200 text-gray-900"
              }`}>
                <div className="w-14 h-14 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-rose-600 dark:text-rose-400 mx-auto flex items-center justify-center">
                  <ShieldAlert size={28} />
                </div>
                <h3 className="text-base font-extrabold">
                  Access Restricted
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Your assigned role ({currentUser?.roleName}) does not have permission to view this section.
                </p>
                <div className="pt-2">
                  <Link
                    href="/admin"
                    style={{ backgroundColor: primaryColor }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-xs font-bold shadow-sm hover:opacity-95"
                  >
                    <span>Back to Overview</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
