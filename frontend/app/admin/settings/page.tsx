"use client";

import React, { useState, useEffect } from "react";
import { Save, Globe, Palette, Shield, Phone, Mail, MapPin, Share2, Check, RotateCcw, Sparkles } from "lucide-react";
import { useContent } from "@/context/ContentContext";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { ThemeColorPicker } from "@/components/admin/ThemeColorPicker";

export default function AdminSettingsPage() {
  const { siteSettings, updateSiteSettings, resetToDefaults, primaryColor, setPrimaryColor, theme } = useContent();
  const [formData, setFormData] = useState(siteSettings);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    setFormData(siteSettings);
  }, [siteSettings]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteSettings(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto font-valley font-sans">
      {/* Apple-style Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-950 dark:text-white">Settings</h1>
        </div>

        <button
          type="button"
          onClick={() => {
            if (confirm("Reset all content and settings back to factory default state?")) {
              resetToDefaults();
              setFormData(siteSettings);
            }
          }}
          className="px-3.5 py-2 bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-gray-700 dark:text-gray-200 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <RotateCcw size={14} /> Reset Defaults
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Theme Color Studio (Embedded Full Feature) */}
        <div className={`p-6 rounded-2xl border space-y-4 ${
          theme === "dark" ? "bg-[#1A1926] border-white/10" : "bg-white border-gray-200 shadow-sm"
        }`}>
          <div className="flex items-center justify-between pb-2 border-b border-gray-100 dark:border-white/5">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Palette size={16} style={{ color: primaryColor }} /> Theme Color
            </h3>
            <span className="text-xs text-gray-400">Live Sync</span>
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-400">
            Select a brand preset or customize any hex accent color across both the admin portal and public website.
          </p>

          <ThemeColorPicker variant="embedded" />
        </div>

        {/* Branding & Logo */}
        <div className={`p-6 rounded-2xl border space-y-4 ${
          theme === "dark" ? "bg-[#1A1926] border-white/10" : "bg-white border-gray-200 shadow-sm"
        }`}>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <Sparkles size={16} style={{ color: primaryColor }} /> Brand Identity & Logo
          </h3>

          <ImageUploadField
            label="Official Header Logo"
            value={formData.logoUrl}
            onChange={(url) => setFormData({ ...formData, logoUrl: url })}
            helperText="Upload transparent PNG or SVG of the organization logo."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-1">Site Title</label>
              <input
                type="text"
                required
                value={formData.siteTitle}
                onChange={(e) => setFormData({ ...formData, siteTitle: e.target.value })}
                className={`w-full px-4 py-2.5 text-xs rounded-xl border outline-none font-medium ${
                  theme === "dark"
                    ? "bg-[#14141E] border-white/10 text-white focus:border-white/20"
                    : "bg-gray-50 border-gray-200 text-gray-900 focus:bg-white"
                }`}
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-1">Tagline</label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                className={`w-full px-4 py-2.5 text-xs rounded-xl border outline-none font-medium ${
                  theme === "dark"
                    ? "bg-[#14141E] border-white/10 text-white focus:border-white/20"
                    : "bg-gray-50 border-gray-200 text-gray-900 focus:bg-white"
                }`}
              />
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className={`p-6 rounded-2xl border space-y-4 ${
          theme === "dark" ? "bg-[#1A1926] border-white/10" : "bg-white border-gray-200 shadow-sm"
        }`}>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <Phone size={16} style={{ color: primaryColor }} /> Public Contact Channels
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-1">General Inquiries Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full px-4 py-2.5 text-xs rounded-xl border outline-none font-medium ${
                  theme === "dark"
                    ? "bg-[#14141E] border-white/10 text-white focus:border-white/20"
                    : "bg-gray-50 border-gray-200 text-gray-900 focus:bg-white"
                }`}
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-1">Main Helpline Phone</label>
              <input
                type="text"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={`w-full px-4 py-2.5 text-xs rounded-xl border outline-none font-medium ${
                  theme === "dark"
                    ? "bg-[#14141E] border-white/10 text-white focus:border-white/20"
                    : "bg-gray-50 border-gray-200 text-gray-900 focus:bg-white"
                }`}
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-1">Head Office Address</label>
            <input
              type="text"
              required
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className={`w-full px-4 py-2.5 text-xs rounded-xl border outline-none font-medium ${
                theme === "dark"
                  ? "bg-[#14141E] border-white/10 text-white focus:border-white/20"
                  : "bg-gray-50 border-gray-200 text-gray-900 focus:bg-white"
              }`}
            />
          </div>
        </div>

        {/* NGO Legal & Statutory Registration Details */}
        <div className={`p-6 rounded-2xl border space-y-4 ${
          theme === "dark" ? "bg-[#1A1926] border-white/10" : "bg-white border-gray-200 shadow-sm"
        }`}>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <Shield size={16} style={{ color: primaryColor }} /> NGO Legal Registration
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-1">Societies Registration Act No.</label>
              <input
                type="text"
                value={formData.registrationNumber || "FD/R-348"}
                onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
                className={`w-full px-4 py-2.5 text-xs rounded-xl border outline-none font-medium ${
                  theme === "dark"
                    ? "bg-[#14141E] border-white/10 text-white focus:border-white/20"
                    : "bg-gray-50 border-gray-200 text-gray-900 focus:bg-white"
                }`}
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-1">NGO Affairs Bureau Reg. No.</label>
              <input
                type="text"
                value={formData.ngoAffairsBureauReg || "NGOAB-00348-1989"}
                onChange={(e) => setFormData({ ...formData, ngoAffairsBureauReg: e.target.value })}
                className={`w-full px-4 py-2.5 text-xs rounded-xl border outline-none font-medium ${
                  theme === "dark"
                    ? "bg-[#14141E] border-white/10 text-white focus:border-white/20"
                    : "bg-gray-50 border-gray-200 text-gray-900 focus:bg-white"
                }`}
              />
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className={`p-6 rounded-2xl border space-y-4 ${
          theme === "dark" ? "bg-[#1A1926] border-white/10" : "bg-white border-gray-200 shadow-sm"
        }`}>
          <h3 className="text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <Share2 size={16} style={{ color: primaryColor }} /> Social Media Channels
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-1">Facebook URL</label>
              <input
                type="url"
                value={formData.facebookUrl}
                onChange={(e) => setFormData({ ...formData, facebookUrl: e.target.value })}
                className={`w-full px-4 py-2.5 text-xs rounded-xl border outline-none font-medium ${
                  theme === "dark"
                    ? "bg-[#14141E] border-white/10 text-white focus:border-white/20"
                    : "bg-gray-50 border-gray-200 text-gray-900 focus:bg-white"
                }`}
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-1">LinkedIn URL</label>
              <input
                type="url"
                value={formData.linkedinUrl}
                onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                className={`w-full px-4 py-2.5 text-xs rounded-xl border outline-none font-medium ${
                  theme === "dark"
                    ? "bg-[#14141E] border-white/10 text-white focus:border-white/20"
                    : "bg-gray-50 border-gray-200 text-gray-900 focus:bg-white"
                }`}
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-1">YouTube URL</label>
              <input
                type="url"
                value={formData.youtubeUrl}
                onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
                className={`w-full px-4 py-2.5 text-xs rounded-xl border outline-none font-medium ${
                  theme === "dark"
                    ? "bg-[#14141E] border-white/10 text-white focus:border-white/20"
                    : "bg-gray-50 border-gray-200 text-gray-900 focus:bg-white"
                }`}
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-1">Twitter / X URL</label>
              <input
                type="url"
                value={formData.twitterUrl}
                onChange={(e) => setFormData({ ...formData, twitterUrl: e.target.value })}
                className={`w-full px-4 py-2.5 text-xs rounded-xl border outline-none font-medium ${
                  theme === "dark"
                    ? "bg-[#14141E] border-white/10 text-white focus:border-white/20"
                    : "bg-gray-50 border-gray-200 text-gray-900 focus:bg-white"
                }`}
              />
            </div>
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex items-center justify-between p-4 bg-white dark:bg-[#1A1926] rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm">
          {savedSuccess ? (
            <div className="text-xs font-semibold text-emerald-600 flex items-center gap-1.5">
              <Check size={16} /> Site configuration saved successfully!
            </div>
          ) : (
            <div className="text-xs text-gray-500">Changes take effect immediately across the website.</div>
          )}

          <button
            type="submit"
            style={{ backgroundColor: primaryColor }}
            className="px-5 py-2 text-white rounded-xl text-xs font-semibold transition-all shadow-sm flex items-center gap-2 cursor-pointer hover:opacity-90"
          >
            <Save size={15} /> Save Settings
          </button>
        </div>
      </form>
    </div>
  );
}
