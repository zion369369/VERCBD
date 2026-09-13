"use client";

import React, { useState } from "react";
import { Plus, Edit2, Trash2, Image as ImageIcon, Search, Filter, X } from "lucide-react";
import { useContent, GalleryItem } from "@/context/ContentContext";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

export default function AdminGalleryPage() {
  const { gallery, addGalleryItem, updateGalleryItem, deleteGalleryItem, primaryColor, theme } = useContent();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);

  const [formData, setFormData] = useState<Omit<GalleryItem, "id">>({
    title: "",
    category: "Education",
    imageUrl: "/assets/edu_1.png",
    description: "",
    date: new Date().toISOString().split("T")[0]
  });

  const filteredGallery = gallery.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (item.description || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const openCreateModal = () => {
    setEditingItem(null);
    setFormData({
      title: "",
      category: "Education",
      imageUrl: "/assets/edu_1.png",
      description: "",
      date: new Date().toISOString().split("T")[0]
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item: GalleryItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      category: item.category,
      imageUrl: item.imageUrl,
      description: item.description || "",
      date: item.date
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      updateGalleryItem(editingItem.id, formData);
    } else {
      addGalleryItem(formData);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-valley font-sans">
      {/* Apple-style Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-950 dark:text-white">Gallery</h1>
        </div>
        <button
          onClick={openCreateModal}
          style={{ backgroundColor: primaryColor }}
          className="px-4 py-2 text-white rounded-xl text-xs font-semibold transition-all shadow-sm flex items-center gap-2 cursor-pointer hover:opacity-90"
        >
          <Plus size={16} /> Add Media
        </button>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search gallery photos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs outline-none border transition-all ${
              theme === "dark" 
                ? "bg-[#1A1926] border-white/10 text-white placeholder-gray-500 focus:border-white/20" 
                : "bg-white border-gray-200 text-gray-900 placeholder-gray-400 shadow-sm focus:border-gray-300"
            }`}
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0 p-1 bg-gray-100 dark:bg-white/5 rounded-xl">
          {["All", "Education", "WASH", "Microfinance", "Health", "Climate"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={selectedCategory === cat ? { backgroundColor: primaryColor, color: '#fff' } : {}}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "shadow-sm"
                  : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {filteredGallery.map((item) => (
          <div
            key={item.id}
            className={`rounded-2xl border overflow-hidden transition-all group flex flex-col justify-between ${
              theme === "dark" ? "bg-[#1A1926] border-white/10" : "bg-white border-gray-200 shadow-sm hover:shadow-md"
            }`}
          >
            <div>
              {/* Photo Frame */}
              <div className="relative h-44 bg-gray-900 overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span
                  style={{ backgroundColor: primaryColor }}
                  className="absolute top-3 left-3 px-2 py-0.5 rounded-md text-xs font-semibold text-white shadow-sm"
                >
                  {item.category}
                </span>
              </div>

              <div className="p-4 space-y-1.5">
                <h3 className="text-xs font-semibold text-gray-900 dark:text-white truncate">
                  {item.title}
                </h3>
                {item.description && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                    {item.description}
                  </p>
                )}
                <div className="text-xs text-gray-400 pt-0.5">{item.date}</div>
              </div>
            </div>

            <div className="p-3 bg-gray-50/50 dark:bg-white/5 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
              <button
                onClick={() => openEditModal(item)}
                style={{ color: primaryColor }}
                className="flex items-center gap-1.5 text-xs font-semibold transition-colors cursor-pointer hover:opacity-80"
              >
                <Edit2 size={13} /> Edit
              </button>

              {gallery.length > 1 && (
                <button
                  onClick={() => {
                    if (confirm(`Delete photo "${item.title}"?`)) {
                      deleteGalleryItem(item.id);
                    }
                  }}
                  className="p-1 text-gray-400 hover:text-red-500 rounded transition-colors cursor-pointer"
                  title="Delete Photo"
                >
                  <Trash2 size={14} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className={`w-full max-w-md rounded-3xl p-8 border shadow-2xl transition-all my-8 ${
            theme === "dark" ? "bg-[#1A1926] border-white/10 text-white" : "bg-white border-gray-200 text-gray-900"
          }`}>
            <div className="flex items-center justify-between pb-6 border-b border-gray-100 dark:border-white/5">
              <h3 className="text-lg font-black text-gray-900 dark:text-white">
                {editingItem ? "Edit Photo Information" : "Upload / Add Photo"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 pt-6 text-xs">
              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1.5">Photo Caption / Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Clean Water Tube-well Installation"
                  className={`w-full px-4 py-2.5 rounded-xl border outline-none font-medium ${
                    theme === "dark"
                      ? "bg-[#14141E] border-white/10 text-white"
                      : "bg-gray-50 border-gray-200 text-gray-900 focus:bg-white"
                  }`}
                />
              </div>

                <div>
                  <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1.5">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className={`w-full px-4 py-2.5 rounded-xl border outline-none font-medium ${
                      theme === "dark"
                        ? "bg-[#14141E] border-white/10 text-white"
                        : "bg-gray-50 border-gray-200 text-gray-900 focus:bg-white"
                    }`}
                  >
                    <option value="Education">Education</option>
                    <option value="WASH">WASH & Sanitation</option>
                    <option value="Livelihood">Livelihood & Empowerment</option>
                    <option value="Health">Health & Nutrition</option>
                    <option value="Events">Events & Community</option>
                  </select>
                </div>

              {/* Image Upload Component */}
              <ImageUploadField
                label="Photo File / URL"
                value={formData.imageUrl}
                onChange={(url) => setFormData({ ...formData, imageUrl: url })}
                hint="Supports uploading from local computer or pasting URL"
              />

              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1.5">Description / Context</label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Location, beneficiaries, or program context..."
                  className={`w-full px-4 py-2.5 rounded-xl border outline-none font-medium ${
                    theme === "dark"
                      ? "bg-[#14141E] border-white/10 text-white"
                      : "bg-gray-50 border-gray-200 text-gray-900 focus:bg-white"
                  }`}
                />
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
                  {editingItem ? "Save Changes" : "Upload to Gallery"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
