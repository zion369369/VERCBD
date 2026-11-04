"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, ChevronUp, Globe, ExternalLink } from "lucide-react";
import { useContent } from "@/context/ContentContext";
import { useLanguage } from "@/context/LanguageContext";

import { publicNavigation, NavigationItem, isNavigationActive } from "@/lib/navigation";

function NavigationChildren({ items, pathname, close }: { items: NavigationItem[]; pathname: string; close?: () => void }) {
  return <ul className="space-y-1">{items.map(child => <li key={child.href}>
    <Link href={child.href} onClick={close} aria-current={pathname === child.href ? "page" : undefined}
      className={`flex min-h-11 items-center justify-between gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-primary ${pathname === child.href ? "bg-sky-50 text-brand-primary" : "text-slate-700 hover:bg-sky-50 hover:text-brand-primary"}`}>
      {child.name}
    </Link>
    {child.children && <div className="ml-5 mb-2 border-l-2 border-sky-100 pl-2"><NavigationChildren items={child.children} pathname={pathname} close={close} /></div>}
  </li>)}</ul>;
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const pathname = usePathname();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const { siteSettings, primaryColor } = useContent();
  const { language, setLanguage, t } = useLanguage();
  const langDropdownRef = useRef<HTMLDivElement>(null);

  const isHomePage = pathname === "/";

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setIsLangDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setIsLangDropdownOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const dismiss = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setIsOpen(false); menuButtonRef.current?.focus(); }
    };
    const desktop = window.matchMedia("(min-width: 1280px)");
    const closeOnDesktop = () => { if (desktop.matches) setIsOpen(false); };
    desktop.addEventListener("change", closeOnDesktop);
    document.addEventListener("keydown", dismiss);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", dismiss);
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [isOpen]);

  // Do not render public Navbar when inside the Admin Studio
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const navigation = publicNavigation;

  return (
    <nav aria-label="Main navigation" className="sticky top-0 z-[60] h-20 xl:h-24 flex items-center backdrop-blur-2xl backdrop-saturate-150 bg-white/80 dark:bg-slate-950/80 border-b border-white/80 dark:border-white/10 shadow-[0_10px_35px_-8px_rgba(0,75,141,0.08),0_1px_3px_rgba(0,0,0,0.02),inset_0_1px_1px_rgba(255,255,255,0.95)] transition-all duration-300">
      {/* Ambient Glass Reflections & Primary Color Glow */}
      <div 
        style={{ 
          background: `radial-gradient(ellipse at 50% -20%, ${primaryColor || "#004B8D"}18 0%, rgba(0, 174, 239, 0.08) 50%, transparent 80%)` 
        }}
        className="absolute inset-0 -z-10 pointer-events-none" 
      />
      {/* Subtle bottom edge brand gradient line */}
      <div 
        style={{ 
          background: `linear-gradient(90deg, transparent 0%, ${primaryColor || "#004B8D"}30 25%, #00AEEF40 50%, ${primaryColor || "#004B8D"}30 75%, transparent 100%)` 
        }}
        className="absolute inset-x-0 bottom-0 h-[1.5px] opacity-80 pointer-events-none" 
      />

      <div className="container-custom w-full relative z-10">
        <div className="flex items-center justify-between h-full w-full gap-2 sm:gap-4">
          {/* Logo - Left aligned slot */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center py-1 flex-shrink-0 group">
              <div className="relative">
                <img
                  src={siteSettings.logoUrl || "/assets/logo.png"}
                  alt="VERC Logo"
                  className="h-12 sm:h-14 md:h-16 w-auto object-contain flex-shrink-0 transition-transform duration-300 group-hover:scale-105"
                  style={{ maxHeight: "64px", width: "auto" }}
                />
              </div>
            </Link>
          </div>

          {/* Desktop Nav - Centered slot (Polymorphic Pill Navigation) */}
          <div className="hidden xl:flex items-center justify-center flex-1 px-2 xl:px-4">
            <div className="flex items-center space-x-1.5 xl:space-x-3">
              {navigation.map((item) => {
                const isActive = isNavigationActive(item, pathname);
                return (
                  <div key={item.name} className="relative group">
                    <Link
                      href={item.href}
                      className={`relative flex items-center gap-1.5 px-3 xl:px-3.5 py-2 rounded-xl text-[13.5px] xl:text-[14.5px] font-bold transition-all duration-300 whitespace-nowrap group-hover:text-brand-primary ${
                        isActive
                          ? "text-brand-primary bg-sky-500/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),0_2px_8px_rgba(0,75,141,0.08)] border border-sky-500/20"
                          : "text-slate-700 hover:text-brand-primary hover:bg-white/80 hover:shadow-[0_4px_12px_rgba(0,75,141,0.06),inset_0_1px_1px_rgba(255,255,255,0.9)] hover:border hover:border-white/80"
                      }`}
                    >
                      <span>{item.name}</span>
                      {item.children && (
                        <ChevronDown size={13} className="opacity-60 group-hover:opacity-100 group-hover:rotate-180 transition-all duration-300" />
                      )}
                    </Link>

                    {item.children && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-300 z-50 pointer-events-none group-hover:pointer-events-auto group-focus-within:pointer-events-auto">
                        <div className="min-w-[280px] sm:min-w-[310px] w-max rounded-2xl p-2.5 backdrop-blur-2xl bg-white/95 dark:bg-slate-900/95 border border-white/80 dark:border-white/10 shadow-[0_20px_50px_-10px_rgba(0,75,141,0.18),0_4px_16px_rgba(0,0,0,0.04),inset_0_1px_2px_rgba(255,255,255,1)] overflow-hidden">
                          {/* Top Specular Edge Flare */}
                          <div 
                            style={{ background: `linear-gradient(90deg, transparent, ${primaryColor || "#004B8D"}80, #00AEEF, transparent)` }} 
                            className="h-[2px] w-full opacity-80 mb-1.5 rounded-full" 
                          />
                          <NavigationChildren items={item.children} pathname={pathname} />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Utility Nav - Right aligned slot */}
          <div className="flex-shrink-0 flex items-center space-x-2 xl:space-x-3">
            {/* BRAC-style Dropdown Language Switcher (Polymorphic Glass Pill) */}
            {isHomePage && (
              <div className="relative" ref={langDropdownRef}>
                <button
                  onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-bold text-slate-700 hover:text-brand-primary backdrop-blur-xl bg-white/80 dark:bg-white/10 border border-slate-200/80 dark:border-white/15 shadow-[0_2px_8px_rgba(0,75,141,0.06),inset_0_1px_1px_rgba(255,255,255,0.95)] hover:border-brand-primary/40 hover:shadow-md transition-all cursor-pointer"
                >
                  <Globe size={13} className="text-cyan-500" />
                  <span>{language === "en" ? "English" : "বাংলা"}</span>
                  {isLangDropdownOpen ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                </button>

                {isLangDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 min-w-[140px] w-36 p-1.5 rounded-2xl backdrop-blur-2xl bg-white/95 dark:bg-slate-900/95 border border-white/80 dark:border-white/10 shadow-[0_15px_35px_-5px_rgba(0,75,141,0.15),inset_0_1px_1px_rgba(255,255,255,0.9)] z-50 overflow-hidden animate-fade-in">
                    <button
                      onClick={() => {
                        setLanguage("en");
                        setIsLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        language === "en" ? "bg-brand-primary text-white shadow-sm" : "text-slate-700 hover:bg-sky-50"
                      }`}
                    >
                      English
                    </button>
                    <button
                      onClick={() => {
                        setLanguage("bn");
                        setIsLangDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                        language === "bn" ? "bg-brand-primary text-white shadow-sm" : "text-slate-700 hover:bg-sky-50"
                      }`}
                    >
                      বাংলা
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Action Buttons: Donate & Career */}
            <div className="hidden xl:flex items-center space-x-2 xl:space-x-3">
              <Link
                href="/donate"
                style={{
                  background: `linear-gradient(135deg, ${primaryColor || "#004B8D"}, #0066B3)`,
                }}
                className="relative group overflow-hidden px-5 xl:px-6 py-2 xl:py-2.5 rounded-xl font-bold text-xs xl:text-sm text-white shadow-[0_8px_20px_-4px_rgba(0,75,141,0.35),inset_0_1px_1px_rgba(255,255,255,0.35)] hover:shadow-[0_12px_28px_-4px_rgba(0,75,141,0.45)] hover:scale-[1.03] active:scale-[0.98] transition-all whitespace-nowrap cursor-pointer"
              >
                {/* Shimmer light reflection flare */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
                <span className="relative z-10">{isHomePage ? t("nav_donate") : "Donate"}</span>
              </Link>
              <a
                href="/careers"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  borderColor: `${primaryColor || "#004B8D"}30`,
                  color: primaryColor || "#004B8D"
                }}
                className="relative group px-3.5 xl:px-4 py-2 xl:py-2.5 rounded-xl font-bold text-xs xl:text-sm backdrop-blur-xl bg-white/70 dark:bg-white/5 border shadow-[0_4px_12px_rgba(0,75,141,0.06),inset_0_1px_1px_rgba(255,255,255,0.9)] hover:bg-brand-primary hover:text-white hover:border-brand-primary hover:shadow-[0_8px_20px_rgba(0,75,141,0.2)] hover:scale-[1.03] active:scale-[0.98] transition-all inline-flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
              >
                <span>Career</span>
                <ExternalLink size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>

            {/* Mobile Menu Button (Morphic Button) */}
            <div className="xl:hidden flex items-center gap-2">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2.5 rounded-xl backdrop-blur-xl bg-white/80 dark:bg-white/10 border border-slate-200/80 dark:border-white/15 text-slate-700 hover:text-brand-primary shadow-[0_2px_8px_rgba(0,75,141,0.06),inset_0_1px_1px_rgba(255,255,255,0.9)] transition-all cursor-pointer"
                ref={menuButtonRef}
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
                aria-controls="mobile-navigation"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu (Frosted Glass Sheet) */}
      {isOpen && (
        <div id="mobile-navigation" className="xl:hidden absolute top-full left-0 right-0 max-h-[calc(100dvh-5rem)] overflow-y-auto overscroll-contain bg-white dark:bg-slate-950 border-b border-white/80 dark:border-white/10 shadow-[0_20px_50px_rgba(0,75,141,0.15)] py-5 transition-all">
          <div className="container-custom space-y-2">
            {navigation.map((item) => (
              <div key={item.name} className="border-b border-gray-100/60 pb-1">
                <div className="flex items-center gap-2">
                  <Link href={item.href} onClick={() => setIsOpen(false)} className="flex-1 py-3 text-base font-bold text-gray-900 hover:text-brand-primary">{item.name}</Link>
                  {item.children && <button type="button" aria-label={`Toggle ${item.name} submenu`} aria-expanded={expandedSection === item.name} aria-controls={`mobile-section-${item.href.slice(1)}`} onClick={() => setExpandedSection(expandedSection === item.name ? null : item.name)} className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50 text-brand-primary">
                    <ChevronDown size={18} className={expandedSection === item.name ? "rotate-180" : ""} />
                  </button>}
                </div>
                {item.children && expandedSection === item.name && <div id={`mobile-section-${item.href.slice(1)}`} className="pb-3"><NavigationChildren items={item.children} pathname={pathname} close={() => setIsOpen(false)} /></div>}
              </div>
            ))}
            <div className="grid grid-cols-2 gap-3 pt-3">
              <Link
                href="/donate"
                onClick={() => setIsOpen(false)}
                style={{
                  background: `linear-gradient(135deg, ${primaryColor || "#004B8D"}, #0066B3)`,
                }}
                className="block text-center py-2.5 rounded-xl font-bold text-sm text-white shadow-md cursor-pointer"
              >
                {isHomePage ? t("nav_donate") : "Donate"}
              </Link>
              <a
                href="/careers"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                style={{
                  borderColor: `${primaryColor || "#004B8D"}35`,
                  color: primaryColor || "#004B8D"
                }}
                className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl font-bold text-sm border backdrop-blur-xl bg-white/80 shadow-sm cursor-pointer"
              >
                <span>Career</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
