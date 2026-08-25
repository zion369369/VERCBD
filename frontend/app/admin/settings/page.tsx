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
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-6 rounded-3xl border transition-all ${
        theme === "dark" ? "bg-[#1A1926] border-white/5 shadow-sm text-white" : "bg-white border-gray-200 shadow-sm text-gray-900"
      }`}>
        <div>
          <h2 className="text-xl font-extrabold flex items-center gap-2">
            <Globe style={{ color: primaryColor }} /> Website Configuration & Branding
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">
            Configure site title, organizational contact details, primary theme color, official logo, and social media handles.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            if (confirm("Reset all content and settings back to factory default state?")) {
              resetToDefaults();
              setFormData(siteSettings);
            }
          }}
          className="px-4 py-2 bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-gray-800 dark:text-gray-200 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <RotateCcw size={14} /> Reset Defaults
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Theme Color Studio (Embedded Full Feature) */}
        <div className={`p-6 rounded-3xl border space-y-4 ${
          theme === "dark" ? "bg-[#1A1926] border-white/5" : "bg-white border-gray-200 shadow-sm"
        }`}>
          <div className="flex items-center justify-between pb-2 border-b border-gray-100 dark:border-white/5">
            <h3 className="text-sm font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
              <Palette size={16} style={{ color: primaryColor }} /> Theme Color & Brand Accent
            </h3>
            <span className="text-[11px] font-bold text-gray-500">Live Global Synchronization</span>
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-400">
            Select a curated NGO color preset, pick from the color spectrum, or paste any HEX color code. This changes all primary buttons, active highlights, gauges, and accents across both the admin studio and public frontend.
          </p>

          <ThemeColorPicker variant="embedded" />
        </div>

        {/* Branding & Logo */}
        <div className={`p-6 rounded-3xl border space-y-4 ${
          theme === "dark" ? "bg-[#1A1926] border-white/5" : "bg-white border-gray-200 shadow-sm"
        }`}>
          <h3 className="text-sm font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
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
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">Site Title</label>
              <input
                type="text"
                required
                value={formData.siteTitle}
                onChange={(e) => setFormData({ ...formData, siteTitle: e.target.value })}
                className={`w-full px-4 py-2.5 text-xs rounded-xl border outline-none font-medium ${
                  theme === "dark"
                    ? "bg-[#14141E] border-white/10 text-white focus:border-purple-400"
                    : "bg-gray-50 border-gray-200 text-gray-900 focus:bg-white"
                }`}
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">Tagline</label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                className={`w-full px-4 py-2.5 text-xs rounded-xl border outline-none font-medium ${
                  theme === "dark"
                    ? "bg-[#14141E] border-white/10 text-white focus:border-purple-400"
                    : "bg-gray-50 border-gray-200 text-gray-900 focus:bg-white"
                }`}
              />
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className={`p-6 rounded-3xl border space-y-4 ${
          theme === "dark" ? "bg-[#1A1926] border-white/5" : "bg-white border-gray-200 shadow-sm"
        }`}>
          <h3 className="text-sm font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
            <Phone size={16} style={{ color: primaryColor }} /> Public Contact Channels
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">General Inquiries Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full px-4 py-2.5 text-xs rounded-xl border outline-none font-medium ${
                  theme === "dark"
                    ? "bg-[#14141E] border-white/10 text-white"
                    : "bg-gray-50 border-gray-200 text-gray-900 focus:bg-white"
                }`}
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">Main Helpline Phone</label>
              <input
                type="text"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={`w-full px-4 py-2.5 text-xs rounded-xl border outline-none font-medium ${
                  theme === "dark"
                    ? "bg-[#14141E] border-white/10 text-white"
                    : "bg-gray-50 border-gray-200 text-gray-900 focus:bg-white"
                }`}
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">Head Office Address</label>
            <input
              type="text"
              required
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className={`w-full px-4 py-2.5 text-xs rounded-xl border outline-none font-medium ${
                theme === "dark"
                  ? "bg-[#14141E] border-white/10 text-white"
                  : "bg-gray-50 border-gray-200 text-gray-900 focus:bg-white"
              }`}
            />
          </div>
        </div>

        {/* Social Media Links */}
        <div className={`p-6 rounded-3xl border space-y-4 ${
          theme === "dark" ? "bg-[#1A1926] border-white/5" : "bg-white border-gray-200 shadow-sm"
        }`}>
          <h3 className="text-sm font-extrabold text-gray-900 dark:text-white flex items-center gap-2">
            <Share2 size={16} style={{ color: primaryColor }} /> Official Social Media Handles
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">Facebook URL</label>
              <input
                type="url"
                value={formData.facebookUrl}
                onChange={(e) => setFormData({ ...formData, facebookUrl: e.target.value })}
                className={`w-full px-4 py-2.5 text-xs rounded-xl border outline-none font-medium ${
                  theme === "dark"
                    ? "bg-[#14141E] border-white/10 text-white"
                    : "bg-gray-50 border-gray-200 text-gray-900 focus:bg-white"
                }`}
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">LinkedIn URL</label>
              <input
                type="url"
                value={formData.linkedinUrl}
                onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                className={`w-full px-4 py-2.5 text-xs rounded-xl border outline-none font-medium ${
                  theme === "dark"
                    ? "bg-[#14141E] border-white/10 text-white"
                    : "bg-gray-50 border-gray-200 text-gray-900 focus:bg-white"
                }`}
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">YouTube URL</label>
              <input
                type="url"
                value={formData.youtubeUrl}
                onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
                className={`w-full px-4 py-2.5 text-xs rounded-xl border outline-none font-medium ${
                  theme === "dark"
                    ? "bg-[#14141E] border-white/10 text-white"
                    : "bg-gray-50 border-gray-200 text-gray-900 focus:bg-white"
                }`}
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">Twitter / X URL</label>
              <input
                type="url"
                value={formData.twitterUrl}
                onChange={(e) => setFormData({ ...formData, twitterUrl: e.target.value })}
                className={`w-full px-4 py-2.5 text-xs rounded-xl border outline-none font-medium ${
                  theme === "dark"
                    ? "bg-[#14141E] border-white/10 text-white"
                    : "bg-gray-50 border-gray-200 text-gray-900 focus:bg-white"
                }`}
              />
            </div>
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex items-center justify-between p-4 bg-white dark:bg-[#1A1926] rounded-3xl border border-gray-200 dark:border-white/5 shadow-sm">
          {savedSuccess ? (
            <div className="text-xs font-bold text-emerald-600 flex items-center gap-1.5">
              <Check size={16} /> Site configuration saved successfully!
            </div>
          ) : (
            <div className="text-xs text-gray-500 font-medium">Changes take effect immediately across the entire website.</div>
          )}

          <button
            type="submit"
            style={{ backgroundColor: primaryColor }}
            className="px-6 py-2.5 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer hover:opacity-90"
          >
            <Save size={15} /> Save Site Settings
          </button>
        </div>
      </form>
    </div>
  );
}
