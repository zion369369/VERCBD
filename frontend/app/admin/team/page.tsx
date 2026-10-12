"use client";

import React, { useState } from "react";
import { Plus, Edit2, Trash2, Users, Mail, Phone, Building, X, ExternalLink, Eye, ShieldCheck } from "lucide-react";
import { useContent, TeamMember } from "@/context/ContentContext";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

export default function AdminTeamPage() {
  const { teamMembers, addTeamMember, updateTeamMember, deleteTeamMember, primaryColor, theme } = useContent();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [selectedTier, setSelectedTier] = useState<string>("All");

  const [formData, setFormData] = useState<Omit<TeamMember, "id">>({
    name: "",
    role: "",
    email: "",
    department: "Executive Leadership",
    bio: "",
    imageUrl: "/assets/education_official.jpg",
    phone: "",
    tier: "Executive"
  });

  const openCreateModal = () => {
    setEditingMember(null);
    setFormData({
      name: "",
      role: "",
      email: "",
      department: "Executive Leadership",
      bio: "",
      imageUrl: "/assets/education_official.jpg",
      phone: "+880 2 7745041",
      tier: "Executive"
    });
    setIsModalOpen(true);
  };

  const openEditModal = (member: TeamMember) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      role: member.role,
      email: member.email,
      department: member.department,
      bio: member.bio,
      imageUrl: member.imageUrl,
      phone: member.phone || "",
      tier: member.tier || (member.department === "Executive Leadership" ? "Executive" : "Director")
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingMember) {
      updateTeamMember(editingMember.id, formData);
    } else {
      addTeamMember(formData);
    }
    setIsModalOpen(false);
  };

  const filteredMembers = teamMembers.filter((m) => {
    if (selectedTier === "All") return true;
    return m.tier === selectedTier || (selectedTier === "Executive" && m.department === "Executive Leadership");
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-valley font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400">
            <span>Governance & Administration</span>
            <span>/</span>
            <span style={{ color: primaryColor }}>Team & Leadership</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white mt-1">
            Leadership & Senior Staff
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Manage executive directors, functional division directors, and key management staff shown on the public site.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <a
            href="/about/staff"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 rounded-xl text-xs font-semibold bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300 transition-all flex items-center gap-1.5"
          >
            <Eye size={13} /> View /about/staff <ExternalLink size={11} />
          </a>
          <button
            onClick={openCreateModal}
            style={{ backgroundColor: primaryColor }}
            className="px-4 py-2 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-2 cursor-pointer hover:opacity-95"
          >
            <Plus size={15} /> Add Member
          </button>
        </div>
      </div>

      {/* Tier Filter Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {["All", "Executive", "Director", "Senior", "Staff"].map((tier) => (
          <button
            key={tier}
            onClick={() => setSelectedTier(tier)}
            style={selectedTier === tier ? { backgroundColor: primaryColor, color: "#fff" } : {}}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              selectedTier === tier
                ? "shadow-xs"
                : theme === "dark"
                ? "bg-[#181824] text-gray-400 hover:text-white border border-white/5"
                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
            }`}
          >
            {tier === "All" ? "All Ranks" : tier === "Executive" ? "Executive Leadership" : tier === "Director" ? "Functional Directors" : tier}
          </button>
        ))}
      </div>

      {/* Team Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMembers.map((member) => (
          <div
            key={member.id}
            className={`rounded-2xl border p-5 transition-all flex flex-col justify-between ${
              theme === "dark" ? "bg-[#181824] border-white/5 shadow-xs" : "bg-white border-gray-200 shadow-2xs"
            }`}
          >
            <div className="space-y-3.5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-200 shadow-xs">
                    <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <span
                      style={{ color: primaryColor, backgroundColor: `${primaryColor}15` }}
                      className="px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider"
                    >
                      {member.tier || "Director"}
                    </span>
                    <h3 className="text-base font-bold text-gray-900 dark:text-white mt-1 leading-snug">
                      {member.name}
                    </h3>
                    <p className="text-xs font-semibold" style={{ color: primaryColor }}>
                      {member.role}
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-[11px] font-bold text-gray-400">
                Department: <span className="text-gray-700 dark:text-gray-300">{member.department}</span>
              </div>

              <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-3 leading-relaxed">
                {member.bio}
              </p>

              <div className="space-y-1 pt-2 border-t border-gray-100 dark:border-white/5 text-xs text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <Mail size={12} className="text-gray-400" />
                  <span className="truncate">{member.email}</span>
                </div>
                {member.phone && (
                  <div className="flex items-center gap-2">
                    <Phone size={12} className="text-gray-400" />
                    <span>{member.phone}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-gray-100 dark:border-white/5 mt-3">
              <button
                onClick={() => openEditModal(member)}
                className="p-1.5 rounded-lg text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-white/5 transition-all"
                title="Edit"
              >
                <Edit2 size={14} />
              </button>
              {teamMembers.length > 1 && (
                <button
                  onClick={() => {
                    if (confirm(`Remove "${member.name}" from directory?`)) {
                      deleteTeamMember(member.id);
                    }
                  }}
                  className="p-1.5 rounded-lg text-gray-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-white/5 transition-all"
                  title="Delete"
                >
                  <Trash2 size={14} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className={`w-full max-w-lg rounded-3xl border p-6 space-y-4 max-h-[90vh] overflow-y-auto ${
            theme === "dark" ? "bg-[#181824] border-white/10 text-white" : "bg-white border-gray-200 text-gray-900 shadow-xl"
          }`}>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">
                {editingMember ? "Edit Team Member" : "Add Team Member"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 rounded-lg text-gray-400 hover:text-gray-600">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Md. Yakub Hossain"
                    className={`w-full p-2.5 rounded-xl text-xs outline-none border ${
                      theme === "dark" ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">Official Role / Designation</label>
                  <input
                    type="text"
                    required
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="e.g. Executive Director"
                    className={`w-full p-2.5 rounded-xl text-xs outline-none border ${
                      theme === "dark" ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold mb-1">Leadership Tier</label>
                  <select
                    value={formData.tier}
                    onChange={(e) => setFormData({ ...formData, tier: e.target.value as any })}
                    className={`w-full p-2.5 rounded-xl text-xs outline-none border ${
                      theme === "dark" ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"
                    }`}
                  >
                    <option value="Executive">Executive Leadership (Top Tier)</option>
                    <option value="Director">Functional Director</option>
                    <option value="Senior">Senior Management</option>
                    <option value="Staff">Field / Operations Staff</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">Department</label>
                  <input
                    type="text"
                    required
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    placeholder="e.g. Operations & Governance"
                    className={`w-full p-2.5 rounded-xl text-xs outline-none border ${
                      theme === "dark" ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@vercbd.org"
                    className={`w-full p-2.5 rounded-xl text-xs outline-none border ${
                      theme === "dark" ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">Phone</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+880 2 7745041"
                    className={`w-full p-2.5 rounded-xl text-xs outline-none border ${
                      theme === "dark" ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"
                    }`}
                  />
                </div>
              </div>

              <ImageUploadField
                label="Profile Photograph"
                value={formData.imageUrl}
                onChange={(url) => setFormData({ ...formData, imageUrl: url })}
                hint="High-resolution square or portrait photo"
              />

              <div>
                <label className="block text-xs font-bold mb-1">Professional Bio & Experience</label>
                <textarea
                  rows={3}
                  required
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Key responsibilities and organizational experience..."
                  className={`w-full p-2.5 rounded-xl text-xs outline-none border ${
                    theme === "dark" ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"
                  }`}
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ backgroundColor: primaryColor }}
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white hover:opacity-90"
                >
                  {editingMember ? "Save Changes" : "Create Profile"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
