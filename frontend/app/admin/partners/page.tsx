"use client";

import React, { useState } from "react";
import { Plus, Edit2, Trash2, HeartHandshake, ExternalLink, Globe, X } from "lucide-react";
import { useContent, PartnerItem } from "@/context/ContentContext";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

export default function AdminPartnersPage() {
  const { partners, addPartner, updatePartner, deletePartner, primaryColor, theme } = useContent();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPartner, setEditingPartner] = useState<PartnerItem | null>(null);

  const [formData, setFormData] = useState<Omit<PartnerItem, "id">>({
    name: "",
    category: "Government",
    logoUrl: "/assets/gob_logo.png",
    websiteUrl: "https://",
    description: ""
  });

  const openCreateModal = () => {
    setEditingPartner(null);
    setFormData({
      name: "",
      category: "Government",
      logoUrl: "/assets/gob_logo.png",
      websiteUrl: "https://",
      description: ""
    });
    setIsModalOpen(true);
  };

  const openEditModal = (partner: PartnerItem) => {
    setEditingPartner(partner);
    setFormData({
      name: partner.name,
      category: partner.category,
      logoUrl: partner.logoUrl,
      websiteUrl: partner.websiteUrl,
      description: partner.description || ""
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPartner) {
      updatePartner(editingPartner.id, formData);
    } else {
      addPartner(formData);
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
            <HeartHandshake style={{ color: primaryColor }} /> Development Partners & Donors
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">
            Manage partner organizations, logos, categories, and institutional website links.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          style={{ backgroundColor: primaryColor }}
          className="px-5 py-2.5 text-white rounded-2xl text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer hover:opacity-90"
        >
          <Plus size={16} /> Add Partner Organization
        </button>
      </div>

      {/* Partners Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {partners.map((partner) => (
          <div
            key={partner.id}
            className={`p-6 rounded-3xl border transition-all flex flex-col justify-between group ${
              theme === "dark" ? "bg-[#1A1926] border-white/5" : "bg-white border-gray-200 shadow-sm hover:shadow-md"
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span
                  style={{ color: primaryColor, backgroundColor: `${primaryColor}15` }}
                  className="px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase"
                >
                  {partner.category}
                </span>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openEditModal(partner)}
                    className="p-1.5 text-gray-500 hover:text-gray-900 dark:hover:text-white rounded-lg transition-colors cursor-pointer"
                  >
                    <Edit2 size={14} />
                  </button>
                  {partners.length > 1 && (
                    <button
                      onClick={() => {
                        if (confirm(`Remove partner "${partner.name}"?`)) {
                          deletePartner(partner.id);
                        }
                      }}
                      className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg transition-colors cursor-pointer"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              </div>

              {/* Logo Frame */}
              <div className="h-24 rounded-2xl bg-white p-4 flex items-center justify-center border border-gray-200 shadow-xs">
                <img
                  src={partner.logoUrl}
                  alt={partner.name}
                  className="max-h-full max-w-full object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                />
              </div>

              <div>
                <h3 className="text-sm font-extrabold text-gray-900 dark:text-white">
                  {partner.name}
                </h3>
                {partner.description && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mt-1 font-medium">
                    {partner.description}
                  </p>
                )}
              </div>
            </div>

            {partner.websiteUrl && partner.websiteUrl !== "https://" && (
              <a
                href={partner.websiteUrl}
                target="_blank"
                rel="noreferrer"
                style={{ color: primaryColor }}
                className="inline-flex items-center gap-1 text-xs font-bold pt-3 border-t border-gray-100 dark:border-white/5 mt-4 hover:underline"
              >
                <Globe size={13} /> Visit Partner Portal
              </a>
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
                {editingPartner ? "Edit Partner Organization" : "Add Partner Organization"}
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
                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1.5">Organization Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. UNICEF Bangladesh"
                  className={`w-full px-4 py-2.5 rounded-xl border outline-none font-medium ${
                    theme === "dark"
                      ? "bg-[#14141E] border-white/10 text-white"
                      : "bg-gray-50 border-gray-200 text-gray-900 focus:bg-white"
                  }`}
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1.5">Partner Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                  className={`w-full px-4 py-2.5 rounded-xl border outline-none font-medium ${
                    theme === "dark"
                      ? "bg-[#14141E] border-white/10 text-white"
                      : "bg-gray-50 border-gray-200 text-gray-900 focus:bg-white"
                  }`}
                >
                  <option value="Government">Government Agency / Ministry</option>
                  <option value="UN Agencies">UN Agencies</option>
                  <option value="International NGO">International NGO</option>
                  <option value="Corporate & Others">Corporate & Others</option>
                </select>
              </div>

              {/* Image Upload Component */}
              <ImageUploadField
                label="Partner Logo Image"
                value={formData.logoUrl}
                onChange={(url) => setFormData({ ...formData, logoUrl: url })}
                hint="Upload PNG with transparent background"
              />

              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1.5">Official Website URL</label>
                <input
                  type="url"
                  value={formData.websiteUrl}
                  onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                  placeholder="https://www.unicef.org"
                  className={`w-full px-4 py-2.5 rounded-xl border outline-none font-medium ${
                    theme === "dark"
                      ? "bg-[#14141E] border-white/10 text-white"
                      : "bg-gray-50 border-gray-200 text-gray-900 focus:bg-white"
                  }`}
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1.5">Collaboration Description</label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Brief summary of joint initiatives..."
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
                  {editingPartner ? "Save Changes" : "Create Partner"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
