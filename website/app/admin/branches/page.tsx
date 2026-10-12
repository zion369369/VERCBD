"use client";

import React, { useState } from "react";
import { Plus, Edit2, Trash2, MapPin, Building2, Phone, Mail, User, Search, X } from "lucide-react";
import { useContent, BranchOffice } from "@/context/ContentContext";

export default function AdminBranchesPage() {
  const { branches, addBranch, updateBranch, deleteBranch, primaryColor, theme } = useContent();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBranch, setEditingBranch] = useState<BranchOffice | null>(null);

  const [formData, setFormData] = useState<Omit<BranchOffice, "id">>({
    name: "",
    district: "Dhaka",
    division: "Dhaka",
    address: "",
    phone: "",
    email: "branch@vercbd.org",
    manager: "",
    lat: 23.856,
    lng: 90.26
  });

  const divisions = ["All", ...Array.from(new Set(branches.map(b => b.division)))];

  const filteredBranches = branches.filter((b) => {
    const matchesSearch = b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          b.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          b.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDivision = selectedDivision === "All" || b.division === selectedDivision;
    return matchesSearch && matchesDivision;
  });

  const openCreateModal = () => {
    setEditingBranch(null);
    setFormData({
      name: "",
      district: "Dhaka",
      division: "Dhaka",
      address: "",
      phone: "+880 1711-000000",
      email: "branch@vercbd.org",
      manager: "",
      lat: 23.856,
      lng: 90.26
    });
    setIsModalOpen(true);
  };

  const openEditModal = (b: BranchOffice) => {
    setEditingBranch(b);
    setFormData({
      name: b.name,
      district: b.district,
      division: b.division,
      address: b.address,
      phone: b.phone,
      email: b.email,
      manager: b.manager,
      lat: b.lat,
      lng: b.lng
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingBranch) {
      updateBranch(editingBranch.id, formData);
    } else {
      addBranch(formData);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-valley font-sans">
      {/* Apple-style Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-950 dark:text-white">Branches</h1>
        </div>
        <button
          onClick={openCreateModal}
          style={{ backgroundColor: primaryColor }}
          className="px-4 py-2 text-white rounded-xl text-xs font-semibold transition-all shadow-sm flex items-center gap-2 cursor-pointer hover:opacity-90"
        >
          <Plus size={16} /> Add Branch
        </button>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search branches by name, district, or address..."
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
          {divisions.map((div) => (
            <button
              key={div}
              onClick={() => setSelectedDivision(div)}
              style={selectedDivision === div ? { backgroundColor: primaryColor, color: '#fff' } : {}}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedDivision === div
                  ? "shadow-sm"
                  : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              }`}
            >
              {div}
            </button>
          ))}
        </div>
      </div>

      {/* Branches Table */}
      <div className={`rounded-2xl border overflow-hidden transition-all ${
        theme === "dark" ? "bg-[#1A1926] border-white/10" : "bg-white border-gray-200 shadow-sm"
      }`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className={`border-b text-xs font-semibold ${
              theme === "dark" ? "bg-white/[0.02] border-white/10 text-gray-400" : "bg-gray-50/50 border-gray-200 text-gray-500"
            }`}>
              <tr>
                <th className="py-3.5 px-6">Branch Name</th>
                <th className="py-3.5 px-6">Location</th>
                <th className="py-3.5 px-6">Manager</th>
                <th className="py-3.5 px-6">Contact</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-white/5 text-xs">
              {filteredBranches.map((branch) => (
                <tr key={branch.id} className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors">
                  <td className="py-4 px-6 font-semibold text-gray-950 dark:text-white">
                    <div className="flex items-center gap-3">
                      <div
                        style={{ color: primaryColor, backgroundColor: `${primaryColor}15` }}
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      >
                        <MapPin size={15} />
                      </div>
                      <div>
                        <div>{branch.name}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 font-normal">{branch.address}</div>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-6">
                    <span
                      style={{ color: primaryColor, backgroundColor: `${primaryColor}15` }}
                      className="px-2.5 py-1 rounded-full text-xs font-medium"
                    >
                      {branch.district}, {branch.division}
                    </span>
                  </td>

                  <td className="py-4 px-6 text-gray-700 dark:text-gray-300 font-medium">
                    {branch.manager || "Branch Officer"}
                  </td>

                  <td className="py-4 px-6 text-gray-600 dark:text-gray-400">
                    <div className="font-medium text-gray-800 dark:text-gray-200">{branch.phone}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{branch.email}</div>
                  </td>

                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => openEditModal(branch)}
                        className="p-1.5 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg transition-all cursor-pointer"
                        title="Edit Branch"
                      >
                        <Edit2 size={15} />
                      </button>
                      {branches.length > 1 && (
                        <button
                          onClick={() => {
                            if (confirm(`Delete branch "${branch.name}"?`)) {
                              deleteBranch(branch.id);
                            }
                          }}
                          className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg transition-all cursor-pointer"
                          title="Delete Branch"
                        >
                          <Trash2 size={15} />
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

      {/* Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className={`w-full max-w-xl rounded-3xl p-8 border shadow-2xl transition-all my-8 ${
            theme === "dark" ? "bg-[#1A1926] border-white/10 text-white" : "bg-white border-gray-200 text-gray-900"
          }`}>
            <div className="flex items-center justify-between pb-6 border-b border-gray-100 dark:border-white/5">
              <h3 className="text-lg font-black text-gray-900 dark:text-white">
                {editingBranch ? "Edit Branch Office" : "Add Branch Office"}
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
                  <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1.5">Branch Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Savar Central Branch"
                    className={`w-full px-4 py-2.5 rounded-xl border outline-none font-medium ${
                      theme === "dark"
                        ? "bg-[#14141E] border-white/10 text-white"
                        : "bg-gray-50 border-gray-200 text-gray-900 focus:bg-white"
                    }`}
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1.5">District</label>
                  <input
                    type="text"
                    required
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    placeholder="e.g. Dhaka, Rangpur"
                    className={`w-full px-4 py-2.5 rounded-xl border outline-none font-medium ${
                      theme === "dark"
                        ? "bg-[#14141E] border-white/10 text-white"
                        : "bg-gray-50 border-gray-200 text-gray-900 focus:bg-white"
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1.5">Division</label>
                  <select
                    value={formData.division}
                    onChange={(e) => setFormData({ ...formData, division: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-xl border outline-none font-medium ${
                      theme === "dark"
                        ? "bg-[#14141E] border-white/10 text-white"
                        : "bg-gray-50 border-gray-200 text-gray-900 focus:bg-white"
                    }`}
                  >
                    <option value="Dhaka">Dhaka</option>
                    <option value="Chittagong">Chittagong</option>
                    <option value="Rajshahi">Rajshahi</option>
                    <option value="Khulna">Khulna</option>
                    <option value="Barisal">Barisal</option>
                    <option value="Sylhet">Sylhet</option>
                    <option value="Rangpur">Rangpur</option>
                    <option value="Mymensingh">Mymensingh</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1.5">Branch Manager</label>
                  <input
                    type="text"
                    value={formData.manager}
                    onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
                    placeholder="Manager Name"
                    className={`w-full px-4 py-2.5 rounded-xl border outline-none font-medium ${
                      theme === "dark"
                        ? "bg-[#14141E] border-white/10 text-white"
                        : "bg-gray-50 border-gray-200 text-gray-900 focus:bg-white"
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1.5">Street Address</label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="e.g. Anandapur, Savar, Dhaka-1340"
                  className={`w-full px-4 py-2.5 rounded-xl border outline-none font-medium ${
                    theme === "dark"
                      ? "bg-[#14141E] border-white/10 text-white"
                      : "bg-gray-50 border-gray-200 text-gray-900 focus:bg-white"
                  }`}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1.5">Phone Number</label>
                  <input
                    type="text"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+880 1711-000000"
                    className={`w-full px-4 py-2.5 rounded-xl border outline-none font-medium ${
                      theme === "dark"
                        ? "bg-[#14141E] border-white/10 text-white"
                        : "bg-gray-50 border-gray-200 text-gray-900 focus:bg-white"
                    }`}
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1.5">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="branch@vercbd.org"
                    className={`w-full px-4 py-2.5 rounded-xl border outline-none font-medium ${
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
                  {editingBranch ? "Save Changes" : "Create Branch"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
