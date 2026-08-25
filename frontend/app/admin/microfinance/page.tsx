"use client";

import React, { useState } from "react";
import { Plus, Edit2, Trash2, CreditCard, Check, Banknote, ShieldCheck, ArrowRight, X } from "lucide-react";
import { useContent, MicrofinanceProduct } from "@/context/ContentContext";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

export default function AdminMicrofinancePage() {
  const { microfinanceProducts, addMicrofinanceProduct, updateMicrofinanceProduct, deleteMicrofinanceProduct, primaryColor, theme } = useContent();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<MicrofinanceProduct | null>(null);

  const [formData, setFormData] = useState<Omit<MicrofinanceProduct, "id">>({
    title: "",
    category: "Core Microcredit",
    loanLimit: "Tk. 10,000 – 1,00,000",
    interestRate: "Declining Balance (MRA Approved)",
    tenure: "12 Months",
    description: "",
    eligibility: [],
    features: [],
    imageUrl: "/assets/microfinance_hero.png"
  });

  const [eligibilityInput, setEligibilityInput] = useState("");
  const [featuresInput, setFeaturesInput] = useState("");

  const openCreateModal = () => {
    setEditingProduct(null);
    setFormData({
      title: "",
      category: "Core Microcredit",
      loanLimit: "Tk. 20,000 – 1,00,000",
      interestRate: "Declining Balance",
      tenure: "12 Months",
      description: "",
      eligibility: ["Permanent resident of operational area", "Age between 18 and 60"],
      features: ["No collateral required", "Weekly repayment"],
      imageUrl: "/assets/microfinance_hero.png"
    });
    setEligibilityInput("Permanent resident of operational area\nAge between 18 and 60");
    setFeaturesInput("No collateral required\nWeekly repayment");
    setIsModalOpen(true);
  };

  const openEditModal = (prod: MicrofinanceProduct) => {
    setEditingProduct(prod);
    setFormData({
      title: prod.title,
      category: prod.category,
      loanLimit: prod.loanLimit,
      interestRate: prod.interestRate,
      tenure: prod.tenure,
      description: prod.description,
      eligibility: prod.eligibility || [],
      features: prod.features || [],
      imageUrl: prod.imageUrl || "/assets/microfinance_hero.png"
    });
    setEligibilityInput((prod.eligibility || []).join("\n"));
    setFeaturesInput((prod.features || []).join("\n"));
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEligibility = eligibilityInput.split("\n").map(s => s.trim()).filter(s => s.length > 0);
    const cleanFeatures = featuresInput.split("\n").map(s => s.trim()).filter(s => s.length > 0);

    const payload = {
      ...formData,
      eligibility: cleanEligibility,
      features: cleanFeatures
    };

    if (editingProduct) {
      updateMicrofinanceProduct(editingProduct.id, payload);
    } else {
      addMicrofinanceProduct(payload);
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
            <CreditCard style={{ color: primaryColor }} /> Microfinance Products & Financial Services
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">
            Manage loan packages (Jagoron, Agrosor, Buniad, Sufolon), credit ceilings, tenure, and eligibility criteria.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          style={{ backgroundColor: primaryColor }}
          className="px-5 py-2.5 text-white rounded-2xl text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer hover:opacity-90"
        >
          <Plus size={16} /> Add Loan Product
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {microfinanceProducts.map((prod) => (
          <div
            key={prod.id}
            className={`rounded-3xl border overflow-hidden transition-all flex flex-col justify-between group ${
              theme === "dark" ? "bg-[#1A1926] border-white/5" : "bg-white border-gray-200 shadow-sm hover:shadow-md"
            }`}
          >
            {/* Top Bar with Dynamic Primary Accent */}
            <div className="h-2 w-full" style={{ backgroundColor: primaryColor }}></div>

            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span
                  style={{ color: primaryColor, backgroundColor: `${primaryColor}15` }}
                  className="px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wide"
                >
                  {prod.category}
                </span>
                <span className="text-xs font-black" style={{ color: primaryColor }}>
                  {prod.tenure}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-black text-gray-900 dark:text-white group-hover:text-purple-600 transition-colors">
                  {prod.title}
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 mt-1 font-medium leading-relaxed">
                  {prod.description}
                </p>
              </div>

              {/* Financial Terms Highlights */}
              <div className="p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 space-y-2">
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-gray-500 dark:text-gray-400 font-medium">Loan Limit</span>
                  <span className="text-gray-900 dark:text-white font-extrabold">{prod.loanLimit}</span>
                </div>
                <div className="flex justify-between items-center text-xs font-bold">
                  <span className="text-gray-500 dark:text-gray-400 font-medium">Interest Rate</span>
                  <span className="text-gray-900 dark:text-white">{prod.interestRate}</span>
                </div>
              </div>

              {/* Key Features List */}
              <div className="space-y-1.5 pt-2">
                {(prod.features || []).slice(0, 3).map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-medium text-gray-700 dark:text-gray-300">
                    <Check size={14} className="text-emerald-500 flex-shrink-0" />
                    <span className="truncate">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions Bar */}
            <div className="p-4 bg-gray-50/50 dark:bg-white/5 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
              <button
                onClick={() => openEditModal(prod)}
                style={{ color: primaryColor }}
                className="flex items-center gap-1 text-xs font-bold transition-colors cursor-pointer hover:underline"
              >
                <Edit2 size={13} /> Edit Details
              </button>

              {microfinanceProducts.length > 1 && (
                <button
                  onClick={() => {
                    if (confirm(`Are you sure you want to delete product "${prod.title}"?`)) {
                      deleteMicrofinanceProduct(prod.id);
                    }
                  }}
                  className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg transition-colors cursor-pointer"
                  title="Delete Product"
                >
                  <Trash2 size={15} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className={`w-full max-w-2xl rounded-3xl p-8 border shadow-2xl transition-all my-8 ${
            theme === "dark" ? "bg-[#1A1926] border-white/10 text-white" : "bg-white border-gray-200 text-gray-900"
          }`}>
            <div className="flex items-center justify-between pb-6 border-b border-gray-100 dark:border-white/5">
              <h3 className="text-lg font-black text-gray-900 dark:text-white">
                {editingProduct ? "Edit Microfinance Product" : "Add New Microfinance Product"}
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
                  <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1.5">Product Title / Name</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Jagoron (Rural Enterprise Loan)"
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
                    <option value="Core Microcredit">Core Microcredit (Jagoron)</option>
                    <option value="Microenterprise">Microenterprise (Agrosor)</option>
                    <option value="Ultra Poor">Ultra Poor (Buniad)</option>
                    <option value="Agriculture">Agriculture & Seasonal (Sufolon)</option>
                    <option value="Special Loan">Special WASH / Education Loan</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1.5">Loan Limit (Tk)</label>
                  <input
                    type="text"
                    required
                    value={formData.loanLimit}
                    onChange={(e) => setFormData({ ...formData, loanLimit: e.target.value })}
                    placeholder="e.g. Tk. 20,000 – 1,50,000"
                    className={`w-full px-4 py-2.5 rounded-xl border outline-none font-medium ${
                      theme === "dark"
                        ? "bg-[#14141E] border-white/10 text-white"
                        : "bg-gray-50 border-gray-200 text-gray-900 focus:bg-white"
                    }`}
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1.5">Interest Rate</label>
                  <input
                    type="text"
                    value={formData.interestRate}
                    onChange={(e) => setFormData({ ...formData, interestRate: e.target.value })}
                    placeholder="e.g. Declining Balance"
                    className={`w-full px-4 py-2.5 rounded-xl border outline-none font-medium ${
                      theme === "dark"
                        ? "bg-[#14141E] border-white/10 text-white"
                        : "bg-gray-50 border-gray-200 text-gray-900 focus:bg-white"
                    }`}
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1.5">Tenure / Repayment</label>
                  <input
                    type="text"
                    value={formData.tenure}
                    onChange={(e) => setFormData({ ...formData, tenure: e.target.value })}
                    placeholder="e.g. 12 to 24 Months"
                    className={`w-full px-4 py-2.5 rounded-xl border outline-none font-medium ${
                      theme === "dark"
                        ? "bg-[#14141E] border-white/10 text-white"
                        : "bg-gray-50 border-gray-200 text-gray-900 focus:bg-white"
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1.5">Product Description</label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe target beneficiaries, loan purpose, and terms..."
                  className={`w-full px-4 py-2.5 rounded-xl border outline-none font-medium ${
                    theme === "dark"
                      ? "bg-[#14141E] border-white/10 text-white"
                      : "bg-gray-50 border-gray-200 text-gray-900 focus:bg-white"
                  }`}
                />
              </div>

              {/* Image Upload Component */}
              <ImageUploadField
                label="Product Banner Image"
                value={formData.imageUrl}
                onChange={(url) => setFormData({ ...formData, imageUrl: url })}
                hint="Upload an illustrative photo for this product"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                    Eligibility Requirements <span className="text-gray-400 font-normal">(one per line)</span>
                  </label>
                  <textarea
                    rows={3}
                    value={eligibilityInput}
                    onChange={(e) => setEligibilityInput(e.target.value)}
                    placeholder="Age 18-60&#10;Permanent Resident&#10;Viable business proposal"
                    className={`w-full px-4 py-2.5 rounded-xl border outline-none font-mono font-medium ${
                      theme === "dark"
                        ? "bg-[#14141E] border-white/10 text-white"
                        : "bg-gray-50 border-gray-200 text-gray-900 focus:bg-white"
                    }`}
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                    Features & Benefits <span className="text-gray-400 font-normal">(one per line)</span>
                  </label>
                  <textarea
                    rows={3}
                    value={featuresInput}
                    onChange={(e) => setFeaturesInput(e.target.value)}
                    placeholder="No collateral required&#10;Flexible weekly repayment&#10;Free financial literacy training"
                    className={`w-full px-4 py-2.5 rounded-xl border outline-none font-mono font-medium ${
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
                  {editingProduct ? "Save Changes" : "Create Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
