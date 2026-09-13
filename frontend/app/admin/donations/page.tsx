"use client";

import React, { useState } from "react";
import { 
  Heart, 
  Plus, 
  Search, 
  Download, 
  Edit2, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  X, 
  Receipt
} from "lucide-react";
import { useContent, DonationRecord, CharityCampaign } from "@/context/ContentContext";

export default function AdminDonationsPage() {
  const { 
    donations, 
    addDonation, 
    updateDonation, 
    deleteDonation, 
    campaigns, 
    addCampaign, 
    updateCampaign, 
    deleteCampaign,
    primaryColor, 
    theme 
  } = useContent();

  const [activeTab, setActiveTab] = useState<"donations" | "campaigns">("donations");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProgram, setSelectedProgram] = useState("All");
  const [selectedDonorType, setSelectedDonorType] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");

  // Donation Modal State
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const [editingDonation, setEditingDonation] = useState<DonationRecord | null>(null);
  const [donationForm, setDonationForm] = useState<Omit<DonationRecord, "id">>({
    donorName: "",
    donorType: "Institutional Grant",
    amount: 100000,
    currency: "BDT",
    program: "WaSH & Clean Water",
    date: new Date().toISOString().split("T")[0],
    paymentMethod: "Direct Wire / Swift",
    receiptNumber: `REC-${Date.now().toString().slice(-6)}`,
    status: "Completed",
    notes: "",
    donorEmail: ""
  });

  // Campaign Modal State
  const [isCampaignModalOpen, setIsCampaignModalOpen] = useState(false);
  const [editingCampaign, setEditingCampaign] = useState<CharityCampaign | null>(null);
  const [campaignForm, setCampaignForm] = useState<Omit<CharityCampaign, "id">>({
    title: "",
    thematicArea: "Disaster Relief",
    targetAmount: "৳ 20,00,000",
    raisedAmount: "৳ 5,00,000",
    beneficiariesTarget: "10,000 People",
    status: "Active",
    deadline: "2024-12-31",
    location: "Savar & Coastal Districts",
    imageUrl: "/assets/wash_hero.png",
    progress: 25
  });

  // Receipt Modal State
  const [viewingReceipt, setViewingReceipt] = useState<DonationRecord | null>(null);

  // Filtered Donations
  const filteredDonations = donations.filter((item) => {
    const matchesSearch = 
      item.donorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.receiptNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.notes && item.notes.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesProgram = selectedProgram === "All" || item.program === selectedProgram;
    const matchesType = selectedDonorType === "All" || item.donorType === selectedDonorType;
    const matchesStatus = selectedStatus === "All" || item.status === selectedStatus;

    return matchesSearch && matchesProgram && matchesType && matchesStatus;
  });

  // Financial Computations
  const totalRaisedBDT = donations.reduce((acc, curr) => {
    if (curr.currency === "BDT") return acc + curr.amount;
    if (curr.currency === "USD") return acc + (curr.amount * 110);
    return acc + curr.amount;
  }, 0);

  const allocatedBDT = donations
    .filter(d => d.status === "Allocated" || d.status === "Completed")
    .reduce((acc, curr) => acc + (curr.currency === "USD" ? curr.amount * 110 : curr.amount), 0);

  const formatCurrency = (amt: number) => {
    if (amt >= 10000000) return `৳ ${(amt / 10000000).toFixed(2)} Cr`;
    if (amt >= 100000) return `৳ ${(amt / 100000).toFixed(2)} Lakh`;
    return `৳ ${amt.toLocaleString()}`;
  };

  const handleOpenCreateDonation = () => {
    setEditingDonation(null);
    setDonationForm({
      donorName: "",
      donorType: "Institutional Grant",
      amount: 500000,
      currency: "BDT",
      program: "WaSH & Clean Water",
      date: new Date().toISOString().split("T")[0],
      paymentMethod: "Bank Transfer",
      receiptNumber: `REC-${Date.now().toString().slice(-6)}`,
      status: "Completed",
      notes: "",
      donorEmail: ""
    });
    setIsDonationModalOpen(true);
  };

  const handleOpenEditDonation = (item: DonationRecord) => {
    setEditingDonation(item);
    setDonationForm({
      donorName: item.donorName,
      donorType: item.donorType,
      amount: item.amount,
      currency: item.currency,
      program: item.program,
      date: item.date,
      paymentMethod: item.paymentMethod,
      receiptNumber: item.receiptNumber,
      status: item.status,
      notes: item.notes || "",
      donorEmail: item.donorEmail || ""
    });
    setIsDonationModalOpen(true);
  };

  const handleSaveDonation = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingDonation) {
      updateDonation(editingDonation.id, donationForm);
    } else {
      addDonation(donationForm);
    }
    setIsDonationModalOpen(false);
  };

  const handleOpenCreateCampaign = () => {
    setEditingCampaign(null);
    setCampaignForm({
      title: "",
      thematicArea: "Arsenic Safe Water",
      targetAmount: "৳ 25,00,000",
      raisedAmount: "৳ 0",
      beneficiariesTarget: "5,000 Families",
      status: "Active",
      deadline: "2025-06-30",
      location: "Coastal Regions",
      imageUrl: "/assets/wash_hero.png",
      progress: 0
    });
    setIsCampaignModalOpen(true);
  };

  const handleOpenEditCampaign = (camp: CharityCampaign) => {
    setEditingCampaign(camp);
    setCampaignForm({
      title: camp.title,
      thematicArea: camp.thematicArea,
      targetAmount: camp.targetAmount,
      raisedAmount: camp.raisedAmount,
      beneficiariesTarget: camp.beneficiariesTarget,
      status: camp.status,
      deadline: camp.deadline,
      location: camp.location,
      imageUrl: camp.imageUrl,
      progress: camp.progress
    });
    setIsCampaignModalOpen(true);
  };

  const handleSaveCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCampaign) {
      updateCampaign(editingCampaign.id, campaignForm);
    } else {
      addCampaign(campaignForm);
    }
    setIsCampaignModalOpen(false);
  };

  const handleExportCSV = () => {
    const headers = ["ID", "Donor Name", "Donor Type", "Amount", "Currency", "Program", "Date", "Payment Method", "Receipt No", "Status", "Notes"];
    const rows = donations.map(d => [
      d.id,
      `"${d.donorName}"`,
      `"${d.donorType}"`,
      d.amount,
      d.currency,
      `"${d.program}"`,
      d.date,
      `"${d.paymentMethod}"`,
      d.receiptNumber,
      d.status,
      `"${d.notes || ""}"`
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `VERC_Donations_Report_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-valley font-sans">
      {/* 1. Clean Apple-Style Header & Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Donations & Grants
          </h1>
        </div>

        {/* Tab Switcher & Action Buttons */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="bg-gray-200/70 dark:bg-white/10 p-1 rounded-2xl flex items-center gap-1">
            <button
              type="button"
              onClick={() => setActiveTab("donations")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === "donations"
                  ? "bg-white dark:bg-[#1E1E24] text-gray-950 dark:text-white shadow-xs font-bold"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              Donations ({donations.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("campaigns")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === "campaigns"
                  ? "bg-white dark:bg-[#1E1E24] text-gray-950 dark:text-white shadow-xs font-bold"
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              Appeals ({campaigns.length})
            </button>
          </div>

          <button
            type="button"
            onClick={handleExportCSV}
            className="px-3.5 py-2 bg-white dark:bg-white/10 border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/15 text-gray-800 dark:text-gray-200 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <Download size={14} /> Export CSV
          </button>

          {activeTab === "donations" ? (
            <button
              type="button"
              onClick={handleOpenCreateDonation}
              style={{ backgroundColor: primaryColor }}
              className="px-4 py-2 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 hover:opacity-95 cursor-pointer"
            >
              <Plus size={14} /> Record Donation
            </button>
          ) : (
            <button
              type="button"
              onClick={handleOpenCreateCampaign}
              style={{ backgroundColor: primaryColor }}
              className="px-4 py-2 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 hover:opacity-95 cursor-pointer"
            >
              <Plus size={14} /> Launch Appeal
            </button>
          )}
        </div>
      </div>

      {/* 2. Four Clean Apple-Style Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className={`p-5 rounded-3xl border transition-all ${
          theme === "dark" ? "bg-[#181824] border-white/5 shadow-xs" : "bg-white border-gray-200/80 shadow-xs"
        }`}>
          <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
            Total Funds Raised
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
            {formatCurrency(totalRaisedBDT)}
          </div>
        </div>

        <div className={`p-5 rounded-3xl border transition-all ${
          theme === "dark" ? "bg-[#181824] border-white/5 shadow-xs" : "bg-white border-gray-200/80 shadow-xs"
        }`}>
          <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
            Program Disbursed
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
            {formatCurrency(allocatedBDT)}
          </div>
        </div>

        <div className={`p-5 rounded-3xl border transition-all ${
          theme === "dark" ? "bg-[#181824] border-white/5 shadow-xs" : "bg-white border-gray-200/80 shadow-xs"
        }`}>
          <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
            Institutional Grants
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
            {donations.filter(d => d.donorType === "Institutional Grant").length} Active
          </div>
        </div>

        <div className={`p-5 rounded-3xl border transition-all ${
          theme === "dark" ? "bg-[#181824] border-white/5 shadow-xs" : "bg-white border-gray-200/80 shadow-xs"
        }`}>
          <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
            Emergency Appeals
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
            {campaigns.filter(c => c.status === "Active" || c.status === "Urgent").length} Active
          </div>
        </div>
      </div>

      {activeTab === "donations" ? (
        /* ==================== DONATIONS LEDGER TAB ==================== */
        <div className="space-y-4">
          {/* Search and Filters */}
          <div className={`p-4 rounded-2xl border flex flex-col md:flex-row items-center justify-between gap-3 transition-all ${
            theme === "dark" ? "bg-[#181824] border-white/5" : "bg-white border-gray-200/80 shadow-2xs"
          }`}>
            <div className="relative w-full md:w-80">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search donor, receipt, notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-xl text-xs border outline-none font-medium transition-all ${
                  theme === "dark"
                    ? "bg-white/5 border-white/10 text-white focus:border-blue-500"
                    : "bg-[#F8F9FE] border-gray-200 text-gray-900 focus:border-blue-500"
                }`}
              />
            </div>

            <div className="flex items-center gap-2 flex-wrap w-full md:w-auto">
              <select
                value={selectedProgram}
                onChange={(e) => setSelectedProgram(e.target.value)}
                className={`text-xs font-medium px-3 py-2 rounded-xl border outline-none cursor-pointer ${
                  theme === "dark" ? "bg-white/5 border-white/10 text-gray-300" : "bg-[#F8F9FE] border-gray-200 text-gray-800"
                }`}
              >
                <option value="All">All Programs</option>
                <option value="WaSH & Clean Water">WaSH & Clean Water</option>
                <option value="Child Education">Child Education</option>
                <option value="Mother & Child Health">Mother & Child Health</option>
                <option value="Emergency Flood Relief">Flood Relief</option>
                <option value="Microfinance Capital">Microfinance</option>
                <option value="General Humanitarian Fund">General Fund</option>
              </select>

              <select
                value={selectedDonorType}
                onChange={(e) => setSelectedDonorType(e.target.value)}
                className={`text-xs font-medium px-3 py-2 rounded-xl border outline-none cursor-pointer ${
                  theme === "dark" ? "bg-white/5 border-white/10 text-gray-300" : "bg-[#F8F9FE] border-gray-200 text-gray-800"
                }`}
              >
                <option value="All">All Donor Types</option>
                <option value="Institutional Grant">Institutional</option>
                <option value="Corporate CSR">Corporate CSR</option>
                <option value="Individual">Individual</option>
                <option value="Philanthropy">Philanthropy</option>
              </select>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className={`text-xs font-medium px-3 py-2 rounded-xl border outline-none cursor-pointer ${
                  theme === "dark" ? "bg-white/5 border-white/10 text-gray-300" : "bg-[#F8F9FE] border-gray-200 text-gray-800"
                }`}
              >
                <option value="All">All Statuses</option>
                <option value="Completed">Completed</option>
                <option value="Allocated">Allocated</option>
                <option value="Pledged">Pledged</option>
                <option value="Processing">Processing</option>
              </select>
            </div>
          </div>

          {/* Clean Donations Table */}
          <div className={`rounded-3xl border overflow-hidden transition-all ${
            theme === "dark" ? "bg-[#181824] border-white/5" : "bg-white border-gray-200/80 shadow-xs"
          }`}>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className={`border-b text-xs font-semibold ${
                    theme === "dark" ? "border-white/5 text-gray-400 bg-white/[0.02]" : "border-gray-100 text-gray-500 bg-gray-50/60"
                  }`}>
                    <th className="py-3.5 px-6">Donor</th>
                    <th className="py-3.5 px-4">Program</th>
                    <th className="py-3.5 px-4">Amount</th>
                    <th className="py-3.5 px-4">Method & Date</th>
                    <th className="py-3.5 px-4">Receipt</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-white/5 font-medium">
                  {filteredDonations.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-gray-400 font-medium">
                        No grant or donation records match your filters.
                      </td>
                    </tr>
                  ) : (
                    filteredDonations.map((item) => (
                      <tr 
                        key={item.id}
                        className="transition-colors hover:bg-gray-50/60 dark:hover:bg-white/[0.02]"
                      >
                        <td className="py-4 px-6">
                          <div>
                            <div className="font-bold text-sm text-gray-900 dark:text-white">
                              {item.donorName}
                            </div>
                            <div className="text-xs text-gray-400 mt-0.5">
                              {item.donorType}
                              {item.donorEmail && ` • ${item.donorEmail}`}
                            </div>
                          </div>
                        </td>

                        <td className="py-4 px-4">
                          <span className="font-semibold text-xs text-gray-800 dark:text-gray-200">
                            {item.program}
                          </span>
                        </td>

                        <td className="py-4 px-4">
                          <div className="font-bold text-sm font-mono text-gray-900 dark:text-white">
                            {item.currency === "BDT" ? "৳ " : "$ "}
                            {item.amount.toLocaleString()}
                          </div>
                        </td>

                        <td className="py-4 px-4">
                          <div className="text-xs text-gray-700 dark:text-gray-300 font-medium">
                            {item.paymentMethod}
                          </div>
                          <div className="text-xs text-gray-400 mt-0.5">
                            {item.date}
                          </div>
                        </td>

                        <td className="py-4 px-4">
                          <button
                            type="button"
                            onClick={() => setViewingReceipt(item)}
                            className="font-mono text-xs font-semibold px-2.5 py-1 bg-gray-100 dark:bg-white/10 hover:bg-blue-50 dark:hover:bg-blue-950/50 hover:text-blue-600 rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                          >
                            <Receipt size={13} /> {item.receiptNumber}
                          </button>
                        </td>

                        <td className="py-4 px-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                            item.status === "Allocated" || item.status === "Completed"
                              ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300"
                              : item.status === "Pledged"
                              ? "bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300"
                              : "bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300"
                          }`}>
                            <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                            <span>{item.status}</span>
                          </span>
                        </td>

                        <td className="py-4 px-6 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              type="button"
                              onClick={() => setViewingReceipt(item)}
                              className="p-1.5 rounded-lg text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
                              title="View Receipt"
                            >
                              <Receipt size={15} />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleOpenEditDonation(item)}
                              className="p-1.5 rounded-lg text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
                              title="Edit Record"
                            >
                              <Edit2 size={15} />
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                if (confirm(`Delete donation from ${item.donorName}?`)) {
                                  deleteDonation(item.id);
                                }
                              }}
                              className="p-1.5 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                              title="Delete Record"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        /* ==================== CHARITY CAMPAIGNS TAB ==================== */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {campaigns.map((camp) => (
            <div
              key={camp.id}
              className={`p-6 rounded-3xl border flex flex-col justify-between transition-all ${
                theme === "dark" ? "bg-[#181824] border-white/5 shadow-xs" : "bg-white border-gray-200/80 shadow-xs"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-3">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                    camp.status === "Urgent"
                      ? "bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300"
                      : "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300"
                  }`}>
                    {camp.status} Appeal
                  </span>
                  <span className="text-xs text-gray-400 font-medium flex items-center gap-1">
                    <Clock size={13} /> {camp.deadline}
                  </span>
                </div>

                <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">
                  {camp.title}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 font-medium">
                  {camp.thematicArea} • {camp.location}
                </p>

                {/* Progress Bar */}
                <div className="space-y-1.5 mb-4">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-gray-600 dark:text-gray-400">Raised: {camp.raisedAmount}</span>
                    <span className="text-gray-600 dark:text-gray-400">Target: {camp.targetAmount}</span>
                  </div>
                  <div className="w-full h-2.5 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${Math.min(camp.progress, 100)}%`, backgroundColor: primaryColor }}
                      className="h-full rounded-full transition-all duration-500"
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 font-medium">
                    <span>{camp.progress}% Completed</span>
                    <span>{camp.beneficiariesTarget} Target</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-white/5">
                <div className="text-xs text-gray-400 font-medium">
                  Target: {camp.beneficiariesTarget}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleOpenEditCampaign(camp)}
                    className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/20 text-gray-800 dark:text-gray-200 rounded-xl text-xs font-semibold transition-all cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (confirm(`Delete appeal campaign "${camp.title}"?`)) {
                        deleteCampaign(camp.id);
                      }
                    }}
                    className="p-1.5 rounded-xl text-gray-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ==================== CREATE / EDIT DONATION MODAL ==================== */}
      {isDonationModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className={`w-full max-w-xl rounded-3xl p-6 border shadow-2xl transition-all my-8 ${
            theme === "dark" ? "bg-[#181824] border-white/10 text-white" : "bg-white border-gray-200 text-gray-900"
          }`}>
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-white/5">
              <h3 className="text-base font-bold flex items-center gap-2">
                <Heart size={18} style={{ color: primaryColor }} />
                <span>{editingDonation ? "Edit Donation Record" : "Record New Donation / Grant"}</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsDonationModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveDonation} className="space-y-4 mt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                    Donor / Organization Name
                  </label>
                  <input
                    type="text"
                    required
                    value={donationForm.donorName}
                    onChange={(e) => setDonationForm({ ...donationForm, donorName: e.target.value })}
                    placeholder="e.g. UNICEF Bangladesh"
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 outline-none font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                    Donor Email (Optional)
                  </label>
                  <input
                    type="email"
                    value={donationForm.donorEmail || ""}
                    onChange={(e) => setDonationForm({ ...donationForm, donorEmail: e.target.value })}
                    placeholder="e.g. grants@donor.org"
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 outline-none font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                    Donor Category
                  </label>
                  <select
                    value={donationForm.donorType}
                    onChange={(e) => setDonationForm({ ...donationForm, donorType: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 outline-none font-medium"
                  >
                    <option value="Institutional Grant">Institutional Grant</option>
                    <option value="Corporate CSR">Corporate CSR</option>
                    <option value="Individual">Individual Donor</option>
                    <option value="Philanthropy">Philanthropic Trust</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                    Thematic Program Allocation
                  </label>
                  <select
                    value={donationForm.program}
                    onChange={(e) => setDonationForm({ ...donationForm, program: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 outline-none font-medium"
                  >
                    <option value="WaSH & Clean Water">WaSH & Clean Water</option>
                    <option value="Child Education">Child Education (NFPE)</option>
                    <option value="Mother & Child Health">Mother & Child Health</option>
                    <option value="Emergency Flood Relief">Emergency Relief</option>
                    <option value="Microfinance Capital">Microfinance Revolving</option>
                    <option value="General Humanitarian Fund">General Fund</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                    Amount & Currency
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={donationForm.currency}
                      onChange={(e) => setDonationForm({ ...donationForm, currency: e.target.value as any })}
                      className="w-24 px-3 py-2.5 rounded-xl text-xs border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 outline-none font-medium"
                    >
                      <option value="BDT">BDT (৳)</option>
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                    </select>
                    <input
                      type="number"
                      required
                      min={1}
                      value={donationForm.amount}
                      onChange={(e) => setDonationForm({ ...donationForm, amount: Number(e.target.value) })}
                      className="flex-1 px-3.5 py-2.5 rounded-xl text-xs border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 outline-none font-mono font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                    Payment Method
                  </label>
                  <input
                    type="text"
                    required
                    value={donationForm.paymentMethod}
                    onChange={(e) => setDonationForm({ ...donationForm, paymentMethod: e.target.value as any })}
                    placeholder="e.g. Bank Wire / Swift"
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 outline-none font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                    Date Received
                  </label>
                  <input
                    type="date"
                    required
                    value={donationForm.date}
                    onChange={(e) => setDonationForm({ ...donationForm, date: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 outline-none font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                    Allocation Status
                  </label>
                  <select
                    value={donationForm.status}
                    onChange={(e) => setDonationForm({ ...donationForm, status: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 outline-none font-medium"
                  >
                    <option value="Completed">Completed / Cleared</option>
                    <option value="Allocated">Allocated to Field</option>
                    <option value="Pledged">Pledged / Pending</option>
                    <option value="Processing">Processing</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                  Internal Notes & Grant Reference
                </label>
                <textarea
                  rows={2}
                  value={donationForm.notes || ""}
                  onChange={(e) => setDonationForm({ ...donationForm, notes: e.target.value })}
                  placeholder="Optional notes or project ID"
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 outline-none font-medium"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-gray-100 dark:border-white/5">
                <button
                  type="button"
                  onClick={() => setIsDonationModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ backgroundColor: primaryColor }}
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white shadow-xs hover:opacity-95 cursor-pointer"
                >
                  {editingDonation ? "Update Donation" : "Save Record"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== CREATE / EDIT CAMPAIGN MODAL ==================== */}
      {isCampaignModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className={`w-full max-w-xl rounded-3xl p-6 border shadow-2xl transition-all my-8 ${
            theme === "dark" ? "bg-[#181824] border-white/10 text-white" : "bg-white border-gray-200 text-gray-900"
          }`}>
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-white/5">
              <h3 className="text-base font-bold">
                {editingCampaign ? "Edit Appeal Campaign" : "Launch New Appeal Campaign"}
              </h3>
              <button
                type="button"
                onClick={() => setIsCampaignModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveCampaign} className="space-y-4 mt-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                  Appeal Campaign Title
                </label>
                <input
                  type="text"
                  required
                  value={campaignForm.title}
                  onChange={(e) => setCampaignForm({ ...campaignForm, title: e.target.value })}
                  placeholder="e.g. Emergency Flood Relief 2026"
                  className="w-full px-3.5 py-2.5 rounded-xl text-xs border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 outline-none font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                    Thematic Area
                  </label>
                  <input
                    type="text"
                    required
                    value={campaignForm.thematicArea}
                    onChange={(e) => setCampaignForm({ ...campaignForm, thematicArea: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 outline-none font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                    Target Funding Goal
                  </label>
                  <input
                    type="text"
                    required
                    value={campaignForm.targetAmount}
                    onChange={(e) => setCampaignForm({ ...campaignForm, targetAmount: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 outline-none font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                    Beneficiary Target
                  </label>
                  <input
                    type="text"
                    required
                    value={campaignForm.beneficiariesTarget}
                    onChange={(e) => setCampaignForm({ ...campaignForm, beneficiariesTarget: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 outline-none font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                    Deadline Date
                  </label>
                  <input
                    type="date"
                    required
                    value={campaignForm.deadline}
                    onChange={(e) => setCampaignForm({ ...campaignForm, deadline: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 outline-none font-medium"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-gray-100 dark:border-white/5">
                <button
                  type="button"
                  onClick={() => setIsCampaignModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/5 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ backgroundColor: primaryColor }}
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white shadow-xs hover:opacity-95 cursor-pointer"
                >
                  {editingCampaign ? "Update Appeal" : "Save Appeal"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== OFFICIAL RECEIPT VIEW MODAL ==================== */}
      {viewingReceipt && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="w-full max-w-md bg-white rounded-3xl p-8 text-gray-900 shadow-2xl border border-gray-200 relative font-valley">
            <button
              type="button"
              onClick={() => setViewingReceipt(null)}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <X size={18} />
            </button>

            {/* Official Receipt Certificate Card */}
            <div className="text-center pb-4 border-b border-gray-100 space-y-1">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 p-2 mx-auto flex items-center justify-center">
                <img src="/assets/logo.png" alt="VERC" className="w-full h-full object-contain" />
              </div>
              <h4 className="text-base font-bold text-gray-950 pt-1">
                Village Education Resource Center
              </h4>
              <div className="inline-block bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold px-3 py-0.5 rounded-full mt-1">
                Official Donation Receipt
              </div>
            </div>

            <div className="py-4 space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-gray-50">
                <span className="text-gray-500 font-medium">Receipt No:</span>
                <span className="font-mono font-bold text-gray-900">{viewingReceipt.receiptNumber}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-50">
                <span className="text-gray-500 font-medium">Date Received:</span>
                <span className="font-semibold text-gray-900">{viewingReceipt.date}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-50">
                <span className="text-gray-500 font-medium">Donor / Grantor:</span>
                <span className="font-bold text-gray-900 text-right">{viewingReceipt.donorName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-50">
                <span className="text-gray-500 font-medium">Donor Category:</span>
                <span className="font-semibold text-gray-900">{viewingReceipt.donorType}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-50">
                <span className="text-gray-500 font-medium">Allocated Program:</span>
                <span className="font-bold text-blue-900 text-right">{viewingReceipt.program}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-50">
                <span className="text-gray-500 font-medium">Payment Mode:</span>
                <span className="font-semibold text-gray-900">{viewingReceipt.paymentMethod}</span>
              </div>

              {/* Total Box */}
              <div className="p-3.5 bg-blue-50/80 rounded-2xl border border-blue-100 flex items-center justify-between mt-3">
                <span className="text-xs font-semibold text-blue-950">Amount Contributed:</span>
                <span className="text-lg font-bold text-blue-900">
                  {viewingReceipt.currency === "BDT" ? "৳ " : "$ "}
                  {viewingReceipt.amount.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
              <span>Authorized: VERC Accounts</span>
              <button
                type="button"
                onClick={() => window.print()}
                className="px-3.5 py-1.5 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-colors cursor-pointer"
              >
                Print Receipt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
