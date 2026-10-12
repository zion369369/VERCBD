"use client";

import React, { useState } from "react";
import { 
  Plus, Edit2, Trash2, ArrowRight, Sparkles, Image as ImageIcon, 
  Check, X, Eye, EyeOff, Power, ShieldCheck, AlertCircle 
} from "lucide-react";
import { useContent, HeroSlide } from "@/context/ContentContext";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

export default function AdminHeroPage() {
  const { 
    heroSlides, 
    addHeroSlide, 
    updateHeroSlide, 
    deleteHeroSlide, 
    siteSettings, 
    updateSiteSettings, 
    primaryColor, 
    theme 
  } = useContent();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const isBannerGloballyEnabled = siteSettings.heroBannerEnabled !== false;

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const [formData, setFormData] = useState<Omit<HeroSlide, "id">>({
    title: "",
    highlightText: "",
    subtitle: "",
    imageUrl: "/assets/home_official_1.jpg",
    primaryBtnText: "Our Story",
    primaryBtnLink: "/about",
    secondaryBtnText: "Partner with Us",
    secondaryBtnLink: "/contact",
    enabled: true,
    categoryBadge: "Sustainable Development"
  });

  const handleToggleGlobalBanner = () => {
    const nextState = !isBannerGloballyEnabled;
    updateSiteSettings({ heroBannerEnabled: nextState });
    showToast(nextState ? "Hero banner is now ENABLED on homepage" : "Hero banner is now DISABLED on homepage");
  };

  const handleToggleSlideStatus = (slide: HeroSlide) => {
    const isCurrentlyEnabled = slide.enabled !== false;
    updateHeroSlide(slide.id, { enabled: !isCurrentlyEnabled });
    showToast(`Slide "${slide.title || 'Slide'}" is now ${!isCurrentlyEnabled ? 'ACTIVE (Live)' : 'PAUSED (Hidden)'}`);
  };

  const openCreateModal = () => {
    setEditingSlide(null);
    setFormData({
      title: "Transforming",
      highlightText: "Destinies.",
      subtitle: "Dedicated to empowering marginalized communities through sustainable innovation and participatory development since 1977.",
      imageUrl: "/assets/home_official_1.jpg",
      primaryBtnText: "Our Story",
      primaryBtnLink: "/about",
      secondaryBtnText: "Partner with Us",
      secondaryBtnLink: "/contact",
      enabled: true,
      categoryBadge: "Sustainable Development"
    });
    setIsModalOpen(true);
  };

  const openEditModal = (slide: HeroSlide) => {
    setEditingSlide(slide);
    setFormData({
      title: slide.title,
      highlightText: slide.highlightText,
      subtitle: slide.subtitle,
      imageUrl: slide.imageUrl,
      primaryBtnText: slide.primaryBtnText,
      primaryBtnLink: slide.primaryBtnLink,
      secondaryBtnText: slide.secondaryBtnText,
      secondaryBtnLink: slide.secondaryBtnLink,
      enabled: slide.enabled !== false,
      categoryBadge: slide.categoryBadge || "Community Development"
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingSlide) {
      updateHeroSlide(editingSlide.id, formData);
      showToast("Slide updated successfully!");
    } else {
      addHeroSlide(formData);
      showToast("New slide created successfully!");
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-valley font-sans">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 bg-slate-900 text-white rounded-2xl shadow-2xl border border-slate-700 text-xs font-semibold animate-fade-in">
          <ShieldCheck size={16} className="text-emerald-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-950 dark:text-white">Hero Banners</h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Manage your homepage banner slider, customize titles, subtitles, and enable or disable slides.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          style={{ backgroundColor: primaryColor }}
          className="px-4 py-2.5 text-white rounded-xl text-xs font-semibold transition-all shadow-sm flex items-center gap-2 cursor-pointer hover:opacity-90"
        >
          <Plus size={16} /> Add Slide
        </button>
      </div>

      {/* GLOBAL BANNER TOGGLE CONTROLLER */}
      <div className={`p-5 rounded-2xl border transition-all ${
        isBannerGloballyEnabled
          ? (theme === "dark" ? "bg-emerald-950/20 border-emerald-800/40" : "bg-emerald-50/80 border-emerald-200")
          : (theme === "dark" ? "bg-amber-950/20 border-amber-800/40" : "bg-amber-50/80 border-amber-200")
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className={`p-2.5 rounded-xl flex items-center justify-center ${
              isBannerGloballyEnabled ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400" : "bg-amber-500/20 text-amber-600 dark:text-amber-400"
            }`}>
              <Power size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-gray-950 dark:text-white">
                  Homepage Banner Display Status
                </h3>
                <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                  isBannerGloballyEnabled
                    ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-300"
                    : "bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-300"
                }`}>
                  {isBannerGloballyEnabled ? "Active / Enabled" : "Disabled (Hidden)"}
                </span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                {isBannerGloballyEnabled 
                  ? "The hero banner is live and visible to all visitors on the homepage." 
                  : "The hero banner is currently hidden from the homepage. You can re-enable it anytime."}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleToggleGlobalBanner}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-sm ${
              isBannerGloballyEnabled
                ? "bg-amber-600 hover:bg-amber-700 text-white"
                : "bg-emerald-600 hover:bg-emerald-700 text-white"
            }`}
          >
            {isBannerGloballyEnabled ? (
              <>
                <EyeOff size={14} /> Disable Entire Banner
              </>
            ) : (
              <>
                <Eye size={14} /> Enable Banner on Homepage
              </>
            )}
          </button>
        </div>
      </div>

      {/* Hero Slides Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {heroSlides.map((slide, index) => {
          const isSlideEnabled = slide.enabled !== false;
          return (
            <div
              key={slide.id}
              className={`rounded-2xl border overflow-hidden transition-all group flex flex-col justify-between ${
                !isSlideEnabled ? "opacity-75" : ""
              } ${
                theme === "dark" ? "bg-[#1A1926] border-white/10" : "bg-white border-gray-200 shadow-sm hover:shadow-md"
              }`}
            >
              <div>
                {/* Banner Preview Frame */}
                <div className="relative h-48 bg-gray-950 overflow-hidden">
                  <img
                    src={slide.imageUrl}
                    alt={slide.title}
                    className="w-full h-full object-cover opacity-95 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-transparent"></div>
                  
                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                    <span
                      style={{ backgroundColor: primaryColor }}
                      className="text-white text-[11px] font-bold px-2.5 py-1 rounded-full backdrop-blur-md shadow-sm"
                    >
                      Slide {index + 1}
                    </span>

                    {/* Quick Active / Paused Toggle Button */}
                    <button
                      type="button"
                      onClick={() => handleToggleSlideStatus(slide)}
                      title={isSlideEnabled ? "Click to disable this slide" : "Click to enable this slide"}
                      className={`flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full cursor-pointer transition-all shadow-sm backdrop-blur-md ${
                        isSlideEnabled
                          ? "bg-emerald-500/90 hover:bg-emerald-600 text-white"
                          : "bg-amber-500/90 hover:bg-amber-600 text-white"
                      }`}
                    >
                      {isSlideEnabled ? <Check size={11} /> : <EyeOff size={11} />}
                      <span>{isSlideEnabled ? "Active" : "Disabled"}</span>
                    </button>
                  </div>

                  {/* Title & Accent in Card Preview */}
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <div className="text-base font-bold leading-tight">
                      {slide.title} <span className="text-[#00AEEF]">{slide.highlightText}</span>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="p-5 space-y-3.5">
                  <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed">
                    {slide.subtitle || "(No subtitle provided)"}
                  </p>

                  <div className="flex items-center gap-2 pt-2 border-t border-gray-100 dark:border-white/5 text-xs font-semibold">
                    <span
                      style={{ color: primaryColor, backgroundColor: `${primaryColor}15` }}
                      className="px-2.5 py-1 rounded-lg text-[11px]"
                    >
                      {slide.primaryBtnText || "Primary"} →
                    </span>
                    <span className="px-2.5 py-1 bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 rounded-lg text-[11px]">
                      {slide.secondaryBtnText || "Secondary"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 pt-0 flex justify-between items-center border-t border-gray-100 dark:border-white/5 mt-2">
                <button
                  type="button"
                  onClick={() => openEditModal(slide)}
                  style={{ color: primaryColor }}
                  className="flex items-center gap-1.5 text-xs font-semibold transition-colors cursor-pointer hover:opacity-80"
                >
                  <Edit2 size={13} /> Edit Slide
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleToggleSlideStatus(slide)}
                    className={`text-xs font-semibold px-2 py-1 rounded-lg transition-colors cursor-pointer ${
                      isSlideEnabled 
                        ? "text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/40" 
                        : "text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40"
                    }`}
                  >
                    {isSlideEnabled ? "Disable" : "Enable"}
                  </button>

                  {heroSlides.length > 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(`Are you sure you want to delete slide ${index + 1}?`)) {
                          deleteHeroSlide(slide.id);
                          showToast("Slide removed");
                        }
                      }}
                      className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg transition-colors cursor-pointer"
                      title="Delete Slide"
                    >
                      <Trash2 size={15} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className={`w-full max-w-xl rounded-3xl p-8 border shadow-2xl transition-all my-8 ${
            theme === "dark" ? "bg-[#1A1926] border-white/10 text-white" : "bg-white border-gray-200 text-gray-900"
          }`}>
            <div className="flex items-center justify-between pb-6 border-b border-gray-100 dark:border-white/5">
              <h3 className="text-lg font-black text-gray-900 dark:text-white">
                {editingSlide ? "Edit Hero Slide" : "Add New Hero Slide"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 pt-6 text-xs">
              {/* Slide Status Active/Disabled Toggle */}
              <div className={`p-3.5 rounded-2xl border flex items-center justify-between ${
                formData.enabled !== false 
                  ? (theme === "dark" ? "bg-emerald-950/20 border-emerald-800/40" : "bg-emerald-50 border-emerald-200")
                  : (theme === "dark" ? "bg-amber-950/20 border-amber-800/40" : "bg-amber-50 border-amber-200")
              }`}>
                <div>
                  <span className="font-bold text-gray-900 dark:text-white block">
                    Slide Status on Website
                  </span>
                  <span className="text-[11px] text-gray-500 dark:text-gray-400">
                    {formData.enabled !== false ? "Visible in the homepage banner slider." : "Disabled / Hidden from visitors."}
                  </span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.enabled !== false}
                    onChange={(e) => setFormData({ ...formData, enabled: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                </label>
              </div>


              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                    Main Title <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Transforming"
                    className={`w-full px-4 py-2.5 rounded-xl border outline-none font-medium ${
                      theme === "dark"
                        ? "bg-[#14141E] border-white/10 text-white"
                        : "bg-gray-50 border-gray-200 text-gray-900 focus:bg-white"
                    }`}
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                    Highlight Word / Accent <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.highlightText}
                    onChange={(e) => setFormData({ ...formData, highlightText: e.target.value })}
                    placeholder="e.g. Destinies."
                    className={`w-full px-4 py-2.5 rounded-xl border outline-none font-medium ${
                      theme === "dark"
                        ? "bg-[#14141E] border-white/10 text-white"
                        : "bg-gray-50 border-gray-200 text-gray-900 focus:bg-white"
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                  Subtitle / Description <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  placeholder="Slide description displayed directly under the title..."
                  className={`w-full px-4 py-2.5 rounded-xl border outline-none font-medium ${
                    theme === "dark"
                      ? "bg-[#14141E] border-white/10 text-white"
                      : "bg-gray-50 border-gray-200 text-gray-900 focus:bg-white"
                  }`}
                />
              </div>

              {/* Image Upload Component */}
              <ImageUploadField
                label="Hero Background Image"
                value={formData.imageUrl}
                onChange={(url) => setFormData({ ...formData, imageUrl: url })}
                hint="Supports direct local file upload, preset library, or custom image URL"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block font-bold text-gray-700 dark:text-gray-300">Primary Button</label>
                  <input
                    type="text"
                    value={formData.primaryBtnText}
                    onChange={(e) => setFormData({ ...formData, primaryBtnText: e.target.value })}
                    placeholder="Button Text (e.g. Our Story)"
                    className={`w-full px-4 py-2 rounded-xl border outline-none font-medium ${
                      theme === "dark"
                        ? "bg-[#14141E] border-white/10 text-white"
                        : "bg-gray-50 border-gray-200 text-gray-900 focus:bg-white"
                    }`}
                  />
                  <input
                    type="text"
                    value={formData.primaryBtnLink}
                    onChange={(e) => setFormData({ ...formData, primaryBtnLink: e.target.value })}
                    placeholder="Link (e.g. /about)"
                    className={`w-full px-4 py-2 rounded-xl border outline-none font-medium ${
                      theme === "dark"
                        ? "bg-[#14141E] border-white/10 text-white"
                        : "bg-gray-50 border-gray-200 text-gray-900 focus:bg-white"
                    }`}
                  />
                </div>

                <div className="space-y-2">
                  <label className="block font-bold text-gray-700 dark:text-gray-300">Secondary Button</label>
                  <input
                    type="text"
                    value={formData.secondaryBtnText}
                    onChange={(e) => setFormData({ ...formData, secondaryBtnText: e.target.value })}
                    placeholder="Button Text (e.g. Partner with Us)"
                    className={`w-full px-4 py-2 rounded-xl border outline-none font-medium ${
                      theme === "dark"
                        ? "bg-[#14141E] border-white/10 text-white"
                        : "bg-gray-50 border-gray-200 text-gray-900 focus:bg-white"
                    }`}
                  />
                  <input
                    type="text"
                    value={formData.secondaryBtnLink}
                    onChange={(e) => setFormData({ ...formData, secondaryBtnLink: e.target.value })}
                    placeholder="Link (e.g. /contact)"
                    className={`w-full px-4 py-2 rounded-xl border outline-none font-medium ${
                      theme === "dark"
                        ? "bg-[#14141E] border-white/10 text-white"
                        : "bg-gray-50 border-gray-200 text-gray-900 focus:bg-white"
                    }`}
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 dark:border-white/5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/5 font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ backgroundColor: primaryColor }}
                  className="px-6 py-2.5 text-white rounded-xl font-bold shadow-md cursor-pointer hover:opacity-90"
                >
                  {editingSlide ? "Save Changes" : "Create Slide"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
