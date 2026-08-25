"use client";

import React, { useState } from "react";
import { Plus, Edit2, Trash2, Search, Filter, BookOpen, Check, Layers, ArrowUpRight, X } from "lucide-react";
import { useContent, ProgramItem } from "@/context/ContentContext";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

export default function AdminProgramsPage() {
  const { programs, addProgram, updateProgram, deleteProgram, primaryColor, theme } = useContent();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProgram, setEditingProgram] = useState<ProgramItem | null>(null);

  const [formData, setFormData] = useState<Omit<ProgramItem, "id">>({
    title: "",
    slug: "",
    category: "Education",
    description: "",
    imageUrl: "/assets/edu_1.png",
    features: ["Innovative Learning Models", "Community-led Participation"],
    reach: "100K+",
    status: "Active",
    color: "bg-blue-50"
  });

  const [featuresInput, setFeaturesInput] = useState("");

  const filteredPrograms = programs.filter((prog) => {
    const matchesSearch = prog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          prog.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || prog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const openCreateModal = () => {
    setEditingProgram(null);
    setFormData({
      title: "",
      slug: "",
      category: "Education",
      description: "",
      imageUrl: "/assets/edu_1.png",
      features: [],
      reach: "50K+",
      status: "Active",
      color: "bg-blue-50"
    });
    setFeaturesInput("");
    setIsModalOpen(true);
  };

  const openEditModal = (prog: ProgramItem) => {
    setEditingProgram(prog);
    setFormData({
      title: prog.title,
      slug: prog.slug,
      category: prog.category,
      description: prog.description,
      imageUrl: prog.imageUrl,
      features: prog.features || [],
      reach: prog.reach,
      status: prog.status,
      color: prog.color || "bg-blue-50"
    });
    setFeaturesInput((prog.features || []).join("\n"));
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const slugVal = formData.slug.trim() || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const cleanFeatures = featuresInput
      .split("\n")
      .map((f) => f.trim())
      .filter((f) => f.length > 0);

    const payload = {
      ...formData,
      slug: slugVal,
      features: cleanFeatures
    };

    if (editingProgram) {
      updateProgram(editingProgram.id, payload);
    } else {
      addProgram(payload);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Actions */}
      <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-6 rounded-3xl border transition-all ${
        theme === "dark" ? "bg-[#1A1926] border-white/5 shadow-sm text-white" : "bg-white border-gray-200 shadow-sm text-gray-900"
      }`}>
        <div>
          <h2 className="text-xl font-extrabold flex items-center gap-2">
            <BookOpen style={{ color: primaryColor }} /> Social Programs Management
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">
            Create, edit, and publish development programs, core operational models, and upload program banners.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          style={{ backgroundColor: primaryColor }}
          className="px-5 py-2.5 text-white rounded-2xl text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer hover:opacity-90"
        >
          <Plus size={16} /> Add Program
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search programs by name or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-11 pr-4 py-2.5 rounded-2xl text-xs outline-none border transition-all ${
              theme === "dark"
                ? "bg-[#1A1926] border-white/10 text-white placeholder-gray-500"
                : "bg-white border-gray-200 text-gray-900 placeholder-gray-400 shadow-sm font-medium"
            }`}
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {["All", "Education", "Health & WASH", "Livelihood", "Capacity Building", "Economic Development"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={selectedCategory === cat ? { backgroundColor: primaryColor, color: '#fff' } : {}}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "shadow-sm"
                  : theme === "dark"
                  ? "bg-[#1A1926] text-gray-400 hover:text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Programs Table */}
      <div className={`rounded-3xl border overflow-hidden transition-all ${
        theme === "dark" ? "bg-[#1A1926] border-white/5" : "bg-white border-gray-200 shadow-sm"
      }`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className={`border-b text-[11px] font-extrabold uppercase tracking-wider ${
              theme === "dark" ? "bg-[#14141E] border-white/5 text-gray-400" : "bg-gray-50 border-gray-200 text-gray-700"
            }`}>
              <tr>
                <th className="py-4 px-6">Program</th>
                <th className="py-4 px-6">Category</th>
                <th className="py-4 px-6">Beneficiary Reach</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-white/5 text-xs">
              {filteredPrograms.map((prog) => (
                <tr key={prog.id} className="hover:bg-gray-50/60 dark:hover:bg-white/5 transition-colors group">
                  {/* Program Info */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-gray-100 dark:bg-white/10 overflow-hidden flex-shrink-0 border border-gray-200">
                        <img
                          src={prog.imageUrl}
                          alt={prog.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="space-y-1 max-w-md">
                        <div className="font-extrabold text-sm text-gray-900 dark:text-white">
                          {prog.title}
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 text-xs line-clamp-1 font-medium">
                          {prog.description}
                        </p>
                        <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                          {(prog.features || []).slice(0, 2).map((feat, i) => (
                            <span
                              key={i}
                              className="text-[10px] bg-gray-100 dark:bg-white/10 px-2 py-0.5 rounded font-semibold text-gray-700 dark:text-gray-300 border border-gray-200/60 dark:border-white/5"
                            >
                              ✓ {feat}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="py-4 px-6">
                    <span
                      style={{ color: primaryColor, backgroundColor: `${primaryColor}15` }}
                      className="px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wide inline-block"
                    >
                      {prog.category}
                    </span>
                  </td>

                  {/* Reach */}
                  <td className="py-4 px-6 font-bold text-gray-800 dark:text-gray-200">
                    {prog.reach}
                  </td>

                  {/* Status */}
                  <td className="py-4 px-6">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                        prog.status === "Active"
                          ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300"
                          : "bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300"
                      }`}
                    >
                      <span className={`w-2 h-2 rounded-full ${prog.status === "Active" ? "bg-emerald-600" : "bg-amber-600"}`}></span>
                      {prog.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEditModal(prog)}
                        className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 rounded-xl transition-all cursor-pointer"
                        title="Edit Program"
                      >
                        <Edit2 size={16} />
                      </button>
                      {programs.length > 1 && (
                        <button
                          onClick={() => {
                            if (confirm(`Are you sure you want to delete "${prog.title}"?`)) {
                              deleteProgram(prog.id);
                            }
                          }}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-all cursor-pointer"
                          title="Delete Program"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit / Create Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className={`w-full max-w-2xl rounded-3xl p-8 border shadow-2xl transition-all my-8 ${
            theme === "dark" ? "bg-[#1A1926] border-white/10 text-white" : "bg-white border-gray-200 text-gray-900"
          }`}>
            <div className="flex items-center justify-between pb-6 border-b border-gray-100 dark:border-white/5">
              <h3 className="text-lg font-black text-gray-900 dark:text-white">
                {editingProgram ? "Edit Program" : "Add New Development Program"}
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
                  <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1.5">Program Title</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Water, Sanitation & Hygiene (WASH)"
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
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-xl border outline-none font-medium ${
                      theme === "dark"
                        ? "bg-[#14141E] border-white/10 text-white"
                        : "bg-gray-50 border-gray-200 text-gray-900 focus:bg-white"
                    }`}
                  >
                    <option value="Education">Education</option>
                    <option value="Health & WASH">Health & WASH</option>
                    <option value="Livelihood">Livelihood & Food Security</option>
                    <option value="Capacity Building">Capacity Building</option>
                    <option value="Economic Development">Economic Development & Microfinance</option>
                    <option value="Climate Resilience">Climate Resilience</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1.5">Program Overview / Summary</label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe program goals, key initiatives, and impact..."
                  className={`w-full px-4 py-2.5 rounded-xl border outline-none font-medium ${
                    theme === "dark"
                      ? "bg-[#14141E] border-white/10 text-white"
                      : "bg-gray-50 border-gray-200 text-gray-900 focus:bg-white"
                  }`}
                />
              </div>

              {/* Image Upload Component */}
              <ImageUploadField
                label="Program Cover / Banner Image"
                value={formData.imageUrl}
                onChange={(url) => setFormData({ ...formData, imageUrl: url })}
                hint="Supports direct local file upload, preset library, or custom image URL"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1.5">Beneficiary Reach</label>
                  <input
                    type="text"
                    value={formData.reach}
                    onChange={(e) => setFormData({ ...formData, reach: e.target.value })}
                    placeholder="e.g. 500,000+ People"
                    className={`w-full px-4 py-2.5 rounded-xl border outline-none font-medium ${
                      theme === "dark"
                        ? "bg-[#14141E] border-white/10 text-white"
                        : "bg-gray-50 border-gray-200 text-gray-900 focus:bg-white"
                    }`}
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1.5">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className={`w-full px-4 py-2.5 rounded-xl border outline-none font-medium ${
                      theme === "dark"
                        ? "bg-[#14141E] border-white/10 text-white"
                        : "bg-gray-50 border-gray-200 text-gray-900 focus:bg-white"
                    }`}
                  >
                    <option value="Active">Active</option>
                    <option value="Review">Under Review</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                  Key Features / Core Focus Areas <span className="text-gray-400 font-normal">(one per line)</span>
                </label>
                <textarea
                  rows={3}
                  value={featuresInput}
                  onChange={(e) => setFeaturesInput(e.target.value)}
                  placeholder="Community-led Total Sanitation&#10;School WASH Facilities&#10;Deep Tube-well Testing"
                  className={`w-full px-4 py-2.5 rounded-xl border outline-none font-mono font-medium ${
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
                  {editingProgram ? "Save Changes" : "Create Program"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
