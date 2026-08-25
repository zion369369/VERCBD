"use client";

import React, { useState } from "react";
import { Plus, Edit2, Trash2, ArrowRight, Sparkles, Image as ImageIcon, Check, X } from "lucide-react";
import { useContent, HeroSlide } from "@/context/ContentContext";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

export default function AdminHeroPage() {
  const { heroSlides, addHeroSlide, updateHeroSlide, deleteHeroSlide, primaryColor, theme } = useContent();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);

  const [formData, setFormData] = useState<Omit<HeroSlide, "id">>({
    title: "",
    highlightText: "",
    subtitle: "",
    imageUrl: "/assets/home_official_1.jpg",
    primaryBtnText: "Our Story",
    primaryBtnLink: "/about",
    secondaryBtnText: "Partner with Us",
    secondaryBtnLink: "/contact"
  });

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
      secondaryBtnLink: "/contact"
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
      secondaryBtnLink: slide.secondaryBtnLink
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingSlide) {
      updateHeroSlide(editingSlide.id, formData);
    } else {
      addHeroSlide(formData);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-6 rounded-3xl border transition-all ${
        theme === "dark" ? "bg-[#1A1926] border-white/5 shadow-sm text-white" : "bg-white border-gray-200 shadow-sm text-gray-900"
      }`}>
        <div>
          <h2 className="text-xl font-extrabold flex items-center gap-2">
            <Sparkles style={{ color: primaryColor }} /> Homepage Hero Banners
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">
            Manage the hero slides, banner headlines, and button destinations shown at the top of the homepage.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          style={{ backgroundColor: primaryColor }}
          className="px-5 py-2.5 text-white rounded-2xl text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer hover:opacity-90"
        >
          <Plus size={16} /> Add Hero Slide
        </button>
      </div>

      {/* Hero Slides Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`rounded-3xl border overflow-hidden transition-all group ${
              theme === "dark" ? "bg-[#1A1926] border-white/5" : "bg-white border-gray-200 shadow-sm hover:shadow-md"
            }`}
          >
            {/* Banner Preview Frame */}
            <div className="relative h-48 bg-gray-900 overflow-hidden">
              <img
                src={slide.imageUrl}
                alt={slide.title}
                className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent"></div>
              <div
                style={{ backgroundColor: primaryColor }}
                className="absolute top-3 left-3 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-md"
              >
                Slide #{index + 1}
              </div>

              <div className="absolute bottom-3 left-4 right-4 text-white">
                <div className="text-base font-extrabold leading-tight">
                  {slide.title} <span className="text-[#00AEEF]">{slide.highlightText}</span>
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="p-5 space-y-4">
              <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 leading-relaxed font-medium">
                {slide.subtitle}
              </p>

              <div className="flex items-center gap-2 pt-2 border-t border-gray-100 dark:border-white/5 text-[11px] font-bold">
                <span
                  style={{ color: primaryColor, backgroundColor: `${primaryColor}15` }}
                  className="px-2.5 py-1 rounded-lg"
                >
                  {slide.primaryBtnText} →
                </span>
                <span className="px-2.5 py-1 bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-gray-300 rounded-lg">
                  {slide.secondaryBtnText}
                </span>
              </div>

              <div className="flex justify-between items-center pt-2">
                <button
                  onClick={() => openEditModal(slide)}
                  style={{ color: primaryColor, backgroundColor: `${primaryColor}15` }}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer hover:opacity-90"
                >
                  <Edit2 size={13} /> Edit Slide
                </button>

                {heroSlides.length > 1 && (
                  <button
                    onClick={() => {
                      if (confirm("Are you sure you want to delete this hero slide?")) {
                        deleteHeroSlide(slide.id);
                      }
                    }}
                    className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all cursor-pointer"
                    title="Delete Slide"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
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

            <form onSubmit={handleSubmit} className="space-y-6 pt-6 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1.5">Main Title</label>
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
                  <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1.5">Highlight Word (Color Accent)</label>
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
                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1.5">Subtitle / Description</label>
                <textarea
                  rows={3}
                  required
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  placeholder="Slide description..."
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
