"use client";

import React, { useState } from "react";
import { Plus, Edit2, Trash2, TrendingUp, BarChart2, Check, X } from "lucide-react";
import { useContent, ImpactStat } from "@/context/ContentContext";

export default function AdminImpactPage() {
  const { impactStats, addImpactStat, updateImpactStat, deleteImpactStat, primaryColor, theme } = useContent();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStat, setEditingStat] = useState<ImpactStat | null>(null);

  const [formData, setFormData] = useState<Omit<ImpactStat, "id">>({
    key: "metric_" + Date.now(),
    label: "",
    value: "",
    subText: "",
    category: "General",
    iconName: "TrendingUp"
  });

  const openCreateModal = () => {
    setEditingStat(null);
    setFormData({
      key: "metric_" + Date.now(),
      label: "",
      value: "",
      subText: "",
      category: "General",
      iconName: "TrendingUp"
    });
    setIsModalOpen(true);
  };

  const openEditModal = (stat: ImpactStat) => {
    setEditingStat(stat);
    setFormData({
      key: stat.key || "metric_" + Date.now(),
      label: stat.label,
      value: stat.value,
      subText: stat.subText || "",
      category: stat.category || "General",
      iconName: stat.iconName || "TrendingUp"
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingStat) {
      updateImpactStat(editingStat.id, formData);
    } else {
      addImpactStat(formData);
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
            <BarChart2 style={{ color: primaryColor }} /> Key Impact Statistics & Metrics
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">
            Manage the primary impact metrics displayed on the Homepage, About page, and Impact report.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          style={{ backgroundColor: primaryColor }}
          className="px-5 py-2.5 text-white rounded-2xl text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer hover:opacity-90"
        >
          <Plus size={16} /> Add Impact Metric
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {impactStats.map((stat) => (
          <div
            key={stat.id}
            className={`p-6 rounded-3xl border transition-all flex flex-col justify-between group ${
              theme === "dark" ? "bg-[#1A1926] border-white/5" : "bg-white border-gray-200 shadow-sm hover:shadow-md"
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span
                  style={{ color: primaryColor, backgroundColor: `${primaryColor}15` }}
                  className="px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase"
                >
                  {stat.category || "General"}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openEditModal(stat)}
                    className="p-1.5 text-gray-500 hover:text-gray-900 dark:hover:text-white rounded-lg transition-colors cursor-pointer"
                  >
                    <Edit2 size={14} />
                  </button>
                  {impactStats.length > 1 && (
                    <button
                      onClick={() => {
                        if (confirm(`Delete stat "${stat.label}"?`)) {
                          deleteImpactStat(stat.id);
                        }
                      }}
                      className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg transition-colors cursor-pointer"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              </div>

              <div>
                <div
                  className="text-3xl font-black tracking-tight group-hover:scale-105 transition-transform"
                  style={{ color: primaryColor }}
                >
                  {stat.value}
                </div>
                <div className="text-sm font-extrabold text-gray-900 dark:text-white mt-1">
                  {stat.label}
                </div>
              </div>
            </div>

            {stat.subText && (
              <p className="text-[11px] text-gray-500 dark:text-gray-400 font-medium mt-3 pt-3 border-t border-gray-100 dark:border-white/5">
                {stat.subText}
              </p>
            )}
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
                {editingStat ? "Edit Metric" : "Add New Metric"}
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
                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1.5">Value (with suffix)</label>
                <input
                  type="text"
                  required
                  value={formData.value}
                  onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                  placeholder="e.g. 25M+, 98%, 450+"
                  className={`w-full px-4 py-2.5 rounded-xl border outline-none font-medium ${
                    theme === "dark"
                      ? "bg-[#14141E] border-white/10 text-white"
                      : "bg-gray-50 border-gray-200 text-gray-900 focus:bg-white"
                  }`}
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1.5">Metric Title / Label</label>
                <input
                  type="text"
                  required
                  value={formData.label}
                  onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                  placeholder="e.g. Beneficiaries Served"
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
                  <option value="General">General / Organization</option>
                  <option value="WASH">WASH & Sanitation</option>
                  <option value="Education">Education</option>
                  <option value="Microfinance">Microfinance</option>
                  <option value="Health">Health</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1.5">Subtext / Verification Source</label>
                <input
                  type="text"
                  value={formData.subText}
                  onChange={(e) => setFormData({ ...formData, subText: e.target.value })}
                  placeholder="e.g. Verified across 64 districts since 1977"
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
                  {editingStat ? "Save Changes" : "Create Metric"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
