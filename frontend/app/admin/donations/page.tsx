"use client";

import React, { useState } from "react";
import { 
  Heart, 
  DollarSign, 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Edit2, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Building2, 
  User, 
  Award, 
  X, 
  Receipt, 
  ChevronRight, 
  FileSpreadsheet, 
  AlertCircle,
  ExternalLink,
  Target,
  Sparkles,
  TrendingUp
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
    if (amt >= 10000000) return `৳ ${(amt / 10000000).toFixed(2)} Crore`;
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
      thematicArea: "Disaster Relief",
      targetAmount: "৳ 25,00,000",
      raisedAmount: "৳ 0",
      beneficiariesTarget: "10,000 Villagers",
      status: "Active",
      deadline: "2024-12-31",
      location: "Sylhet & Coastal Belt",
      imageUrl: "/assets/impact_hero.png",
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
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header Banner */}
      <div className={`p-6 rounded-3xl border transition-all ${
        theme === "dark" ? "bg-[#1A1926] border-white/5" : "bg-white border-gray-200 shadow-sm"
      }`}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-3">
            <div 
              className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-xs"
              style={{ backgroundColor: `${primaryColor}15`, color: primaryColor }}
            >
              <Heart size={24} className="fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black text-gray-900 dark:text-white">
                  Donations, Grants & Appeals Hub
                </h1>
                <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                  NGO Affairs Reg: 00348
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 font-medium">
                Comprehensive ledger of institutional UN grants, corporate CSR funds, individual philanthropy, and emergency public relief appeals.
              </p>
            </div>
          </div>

          {/* Tab Switcher & Export */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="bg-gray-100 dark:bg-white/5 p-1 rounded-2xl flex items-center gap-1 border border-gray-200/60 dark:border-white/5">
              <button
                type="button"
                onClick={() => setActiveTab("donations")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "donations"
                    ? "bg-white dark:bg-[#14141E] text-gray-950 dark:text-white shadow-xs"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                Grants & Donations ({donations.length})
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("campaigns")}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === "campaigns"
                    ? "bg-white dark:bg-[#14141E] text-gray-950 dark:text-white shadow-xs"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                Charity Appeals ({campaigns.length})
              </button>
            </div>

            <button
              type="button"
              onClick={handleExportCSV}
              className="px-3.5 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/20 text-gray-800 dark:text-gray-200 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Download size={14} /> Export CSV
            </button>

            {activeTab === "donations" ? (
              <button
                type="button"
                onClick={handleOpenCreateDonation}
                style={{ backgroundColor: primaryColor }}
                className="px-4 py-2 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 hover:opacity-90 cursor-pointer"
              >
                <Plus size={14} /> Record Grant / Donation
              </button>
            ) : (
              <button
                type="button"
                onClick={handleOpenCreateCampaign}
                style={{ backgroundColor: primaryColor }}
                className="px-4 py-2 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 hover:opacity-90 cursor-pointer"
              >
                <Plus size={14} /> Launch New Appeal
              </button>
            )}
          </div>
        </div>

        {/* KPI Metric Summary Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6 pt-6 border-t border-gray-100 dark:border-white/5">
          <div className="space-y-1">
            <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
              <DollarSign size={13} className="text-emerald-500" /> Total Funds Mobilized
            </div>
            <div className="text-2xl font-black text-gray-900 dark:text-white">
              {formatCurrency(totalRaisedBDT)}
            </div>
            <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
              +18.4% compared to previous cycle
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
              <Target size={13} className="text-blue-500" /> Program Disbursed
            </div>
            <div className="text-2xl font-black text-gray-900 dark:text-white">
              {formatCurrency(allocatedBDT)}
            </div>
            <div className="text-[10px] text-gray-500 dark:text-gray-400 font-semibold">
              92.4% deployment efficiency
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
              <Building2 size={13} className="text-purple-500" /> Institutional Grants
            </div>
            <div className="text-2xl font-black text-gray-900 dark:text-white">
              {donations.filter(d => d.donorType === "Institutional Grant").length} Active
            </div>
            <div className="text-[10px] text-purple-600 dark:text-purple-400 font-semibold">
              UNICEF, Water.org, PKSF, GoB
            </div>
          </div>

          <div className="space-y-1">
            <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles size={13} className="text-amber-500" /> Emergency Appeals
            </div>
            <div className="text-2xl font-black text-gray-900 dark:text-white">
              {campaigns.filter(c => c.status === "Active" || c.status === "Urgent").length} Active
            </div>
            <div className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold">
              15,000+ flood & disaster families
            </div>
          </div>
        </div>
      </div>

      {activeTab === "donations" ? (
        /* ==================== DONATIONS LEDGER TAB ==================== */
        <div className="space-y-4">
          {/* Filter and Search Bar */}
          <div className={`p-4 rounded-2xl border flex flex-col md:flex-row items-center justify-between gap-3 transition-all ${
            theme === "dark" ? "bg-[#1A1926] border-white/5" : "bg-white border-gray-200 shadow-xs"
          }`}>
            <div className="relative w-full md:w-80">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search donor name, receipt #, notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2 rounded-xl text-xs border outline-none font-medium transition-all ${
                  theme === "dark"
                    ? "bg-[#14141E] border-white/10 text-white focus:border-blue-500"
                    : "bg-[#F8F9FE] border-gray-200 text-gray-900 focus:border-blue-500"
                }`}
              />
            </div>

            <div className="flex items-center gap-2 flex-wrap w-full md:w-auto">
              <select
                value={selectedProgram}
                onChange={(e) => setSelectedProgram(e.target.value)}
                className={`text-xs font-semibold px-3 py-2 rounded-xl border outline-none cursor-pointer ${
                  theme === "dark" ? "bg-[#14141E] border-white/10 text-gray-300" : "bg-[#F8F9FE] border-gray-200 text-gray-800"
                }`}
              >
                <option value="All">All Thematic Programs</option>
                <option value="WaSH & Clean Water">WaSH & Clean Water</option>
                <option value="Child Education">Child Education</option>
                <option value="Mother & Child Health">Mother & Child Health</option>
                <option value="Emergency Flood Relief">Emergency Flood Relief</option>
                <option value="Microfinance Capital">Microfinance Capital</option>
                <option value="General Humanitarian Fund">General Fund</option>
              </select>

              <select
                value={selectedDonorType}
                onChange={(e) => setSelectedDonorType(e.target.value)}
                className={`text-xs font-semibold px-3 py-2 rounded-xl border outline-none cursor-pointer ${
                  theme === "dark" ? "bg-[#14141E] border-white/10 text-gray-300" : "bg-[#F8F9FE] border-gray-200 text-gray-800"
                }`}
              >
                <option value="All">All Donor Types</option>
                <option value="Institutional Grant">Institutional Grant</option>
                <option value="Corporate CSR">Corporate CSR</option>
                <option value="Individual">Individual Donor</option>
                <option value="Philanthropy">Philanthropy</option>
              </select>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className={`text-xs font-semibold px-3 py-2 rounded-xl border outline-none cursor-pointer ${
                  theme === "dark" ? "bg-[#14141E] border-white/10 text-gray-300" : "bg-[#F8F9FE] border-gray-200 text-gray-800"
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

          {/* Donations Table */}
          <div className={`rounded-3xl border overflow-hidden transition-all ${
            theme === "dark" ? "bg-[#1A1926] border-white/5" : "bg-white border-gray-200 shadow-sm"
          }`}>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className={`border-b font-bold uppercase tracking-wider text-[10px] ${
                    theme === "dark" ? "border-white/5 bg-white/[0.02] text-gray-400" : "border-gray-100 bg-gray-50/80 text-gray-500"
                  }`}>
                    <th className="py-4 px-6">Donor / Grantor</th>
                    <th className="py-4 px-4">Program Allocation</th>
                    <th className="py-4 px-4">Amount</th>
                    <th className="py-4 px-4">Method & Date</th>
                    <th className="py-4 px-4">Receipt #</th>
                    <th className="py-4 px-4">Status</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-white/5 font-medium">
                  {filteredDonations.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-12 text-center text-gray-400">
                        No grant or donation records match your filters.
                      </td>
                    </tr>
                  ) : (
                    filteredDonations.map((item) => (
                      <tr 
                        key={item.id}
                        className={`transition-colors hover:bg-gray-50/60 dark:hover:bg-white/[0.02] ${
                          theme === "dark" ? "text-gray-200" : "text-gray-800"
                        }`}
                      >
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-white/10 flex items-center justify-center flex-shrink-0 text-gray-600 dark:text-gray-300 font-bold text-xs">
                              {item.donorType === "Institutional Grant" ? <Building2 size={16} /> : <User size={16} />}
                            </div>
                            <div>
                              <div className="font-extrabold text-gray-900 dark:text-white">
                                {item.donorName}
                              </div>
                              <div className="text-[11px] text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
                                <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold ${
                                  item.donorType === "Institutional Grant" 
                                    ? "bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300"
                                    : item.donorType === "Corporate CSR"
                                    ? "bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300"
                                    : "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300"
                                }`}>
                                  {item.donorType}
                                </span>
                                {item.donorEmail && <span>&bull; {item.donorEmail}</span>}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="py-4 px-4">
                          <span className="font-bold text-gray-900 dark:text-white block">
                            {item.program}
                          </span>
                          {item.notes && (
                            <span className="text-[10px] text-gray-500 dark:text-gray-400 truncate max-w-xs block">
                              {item.notes}
                            </span>
                          )}
                        </td>

                        <td className="py-4 px-4">
                          <div className="font-black text-sm text-gray-900 dark:text-white">
                            {item.currency === "BDT" ? "৳ " : "$ "}
                            {item.amount.toLocaleString()}
                          </div>
                          <div className="text-[10px] text-gray-400 font-semibold">
                            {formatCurrency(item.currency === "USD" ? item.amount * 110 : item.amount)}
                          </div>
                        </td>

                        <td className="py-4 px-4">
                          <div className="font-semibold text-gray-700 dark:text-gray-300">
                            {item.paymentMethod}
                          </div>
                          <div className="text-[10px] text-gray-400">
                            {item.date}
                          </div>
                        </td>

                        <td className="py-4 px-4">
                          <button
                            type="button"
                            onClick={() => setViewingReceipt(item)}
                            className="font-mono text-[11px] font-bold px-2 py-1 bg-gray-100 dark:bg-white/10 hover:bg-blue-50 dark:hover:bg-blue-950/50 hover:text-blue-600 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            <Receipt size={12} /> {item.receiptNumber}
                          </button>
                        </td>

                        <td className="py-4 px-4">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold flex items-center gap-1 w-max ${
                            item.status === "Allocated" || item.status === "Completed"
                              ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300"
                              : item.status === "Pledged"
                              ? "bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300"
                              : "bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300"
                          }`}>
                            <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                            {item.status}
                          </span>
                        </td>

                        <td className="py-4 px-6 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => setViewingReceipt(item)}
                              className="p-1.5 rounded-lg text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-white/10 transition-colors cursor-pointer"
                              title="View Official Receipt"
                            >
                              <Receipt size={15} />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleOpenEditDonation(item)}
                              className="p-1.5 rounded-lg text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-colors cursor-pointer"
                              title="Edit Record"
                            >
                              <Edit2 size={15} />
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                if (confirm(`Delete donation record for ${item.donorName}?`)) {
                                  deleteDonation(item.id);
                                }
                              }}
                              className="p-1.5 rounded-lg text-gray-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors cursor-pointer"
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
                theme === "dark" ? "bg-[#1A1926] border-white/5" : "bg-white border-gray-200 shadow-sm"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-3 mb-3">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                    camp.status === "Urgent"
                      ? "bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 animate-pulse"
                      : "bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300"
                  }`}>
                    {camp.status} Appeal
                  </span>
                  <span className="text-xs text-gray-400 font-semibold flex items-center gap-1">
                    <Clock size={12} /> Deadline: {camp.deadline}
                  </span>
                </div>

                <h3 className="text-base font-extrabold text-gray-900 dark:text-white mb-1.5">
                  {camp.title}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-4 font-medium">
                  Thematic Focus: <span className="font-bold text-gray-800 dark:text-gray-200">{camp.thematicArea}</span> &bull; Location: {camp.location}
                </p>

                {/* Progress Bar */}
                <div className="space-y-1.5 mb-4">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-gray-600 dark:text-gray-400">Raised: <strong className="text-gray-950 dark:text-white">{camp.raisedAmount}</strong></span>
                    <span className="text-gray-600 dark:text-gray-400">Target: <strong className="text-gray-950 dark:text-white">{camp.targetAmount}</strong></span>
                  </div>
                  <div className="w-full h-3 bg-gray-100 dark:bg-white/10 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${Math.min(camp.progress, 100)}%`, backgroundColor: primaryColor }}
                      className="h-full rounded-full transition-all duration-500"
                    ></div>
                  </div>
                  <div className="flex justify-between text-[11px] text-gray-400 font-semibold">
                    <span>{camp.progress}% Completed</span>
                    <span>Beneficiary Target: {camp.beneficiariesTarget}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-white/5">
                <div className="text-xs font-bold text-gray-500 dark:text-gray-400">
                  Target: {camp.beneficiariesTarget}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleOpenEditCampaign(camp)}
                    className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/20 text-gray-800 dark:text-gray-200 rounded-xl text-xs font-bold transition-all cursor-pointer"
                  >
                    Edit Appeal
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
            theme === "dark" ? "bg-[#1A1926] border-white/10 text-white" : "bg-white border-gray-200 text-gray-900"
          }`}>
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-white/5">
              <h3 className="text-base font-extrabold flex items-center gap-2">
                <Heart size={18} style={{ color: primaryColor }} />
                {editingDonation ? "Edit Grant / Donation Record" : "Record New Grant or Donation"}
              </h3>
              <button
                type="button"
                onClick={() => setIsDonationModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-white cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveDonation} className="space-y-4 pt-4 text-xs font-medium">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-bold mb-1">Donor or Grantor Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. UNICEF Bangladesh or Dr. Rahman"
                    value={donationForm.donorName}
                    onChange={(e) => setDonationForm({ ...donationForm, donorName: e.target.value })}
                    className={`w-full p-2.5 rounded-xl border outline-none ${
                      theme === "dark" ? "bg-[#14141E] border-white/10 text-white" : "bg-gray-50 border-gray-200 text-gray-900"
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-bold mb-1">Donor Category *</label>
                  <select
                    value={donationForm.donorType}
                    onChange={(e) => setDonationForm({ ...donationForm, donorType: e.target.value as any })}
                    className={`w-full p-2.5 rounded-xl border outline-none ${
                      theme === "dark" ? "bg-[#14141E] border-white/10 text-white" : "bg-gray-50 border-gray-200 text-gray-900"
                    }`}
                  >
                    <option value="Institutional Grant">Institutional Grant (UN / INGO)</option>
                    <option value="Corporate CSR">Corporate CSR Contribution</option>
                    <option value="Individual">Individual Philanthropist</option>
                    <option value="Philanthropy">Philanthropic Foundation</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-gray-700 dark:text-gray-300 font-bold mb-1">Contribution Amount *</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={donationForm.amount}
                    onChange={(e) => setDonationForm({ ...donationForm, amount: parseFloat(e.target.value) || 0 })}
                    className={`w-full p-2.5 rounded-xl border outline-none font-bold ${
                      theme === "dark" ? "bg-[#14141E] border-white/10 text-white" : "bg-gray-50 border-gray-200 text-gray-900"
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-bold mb-1">Currency</label>
                  <select
                    value={donationForm.currency}
                    onChange={(e) => setDonationForm({ ...donationForm, currency: e.target.value as any })}
                    className={`w-full p-2.5 rounded-xl border outline-none font-bold ${
                      theme === "dark" ? "bg-[#14141E] border-white/10 text-white" : "bg-gray-50 border-gray-200 text-gray-900"
                    }`}
                  >
                    <option value="BDT">BDT (৳)</option>
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-bold mb-1">Thematic Program Allocation *</label>
                  <select
                    value={donationForm.program}
                    onChange={(e) => setDonationForm({ ...donationForm, program: e.target.value as any })}
                    className={`w-full p-2.5 rounded-xl border outline-none font-semibold ${
                      theme === "dark" ? "bg-[#14141E] border-white/10 text-white" : "bg-gray-50 border-gray-200 text-gray-900"
                    }`}
                  >
                    <option value="WaSH & Clean Water">WaSH & Clean Water</option>
                    <option value="Child Education">Child Education & Learning</option>
                    <option value="Mother & Child Health">Mother & Child Health Hospital</option>
                    <option value="Emergency Flood Relief">Emergency Flood & Disaster Relief</option>
                    <option value="Microfinance Capital">Microfinance & Livelihood Capital</option>
                    <option value="General Humanitarian Fund">General Humanitarian Fund</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-bold mb-1">Payment / Transfer Method</label>
                  <select
                    value={donationForm.paymentMethod}
                    onChange={(e) => setDonationForm({ ...donationForm, paymentMethod: e.target.value as any })}
                    className={`w-full p-2.5 rounded-xl border outline-none ${
                      theme === "dark" ? "bg-[#14141E] border-white/10 text-white" : "bg-gray-50 border-gray-200 text-gray-900"
                    }`}
                  >
                    <option value="Direct Wire / Swift">Direct Wire / SWIFT</option>
                    <option value="Bank Transfer">Bank Transfer / BEFTN</option>
                    <option value="Institutional Grant Agreement">Institutional Grant Agreement</option>
                    <option value="bKash / Nagad">Mobile Wallet (bKash / Nagad)</option>
                    <option value="Credit Card">Online Credit Card</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-bold mb-1">Transaction Date</label>
                  <input
                    type="date"
                    value={donationForm.date}
                    onChange={(e) => setDonationForm({ ...donationForm, date: e.target.value })}
                    className={`w-full p-2.5 rounded-xl border outline-none ${
                      theme === "dark" ? "bg-[#14141E] border-white/10 text-white" : "bg-gray-50 border-gray-200 text-gray-900"
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-bold mb-1">Receipt Number</label>
                  <input
                    type="text"
                    value={donationForm.receiptNumber}
                    onChange={(e) => setDonationForm({ ...donationForm, receiptNumber: e.target.value })}
                    className={`w-full p-2.5 rounded-xl border outline-none font-mono ${
                      theme === "dark" ? "bg-[#14141E] border-white/10 text-white" : "bg-gray-50 border-gray-200 text-gray-900"
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-bold mb-1">Allocation Status</label>
                  <select
                    value={donationForm.status}
                    onChange={(e) => setDonationForm({ ...donationForm, status: e.target.value as any })}
                    className={`w-full p-2.5 rounded-xl border outline-none font-bold ${
                      theme === "dark" ? "bg-[#14141E] border-white/10 text-white" : "bg-gray-50 border-gray-200 text-gray-900"
                    }`}
                  >
                    <option value="Completed">Completed</option>
                    <option value="Allocated">Allocated to Project</option>
                    <option value="Pledged">Pledged (Formal MOU)</option>
                    <option value="Processing">Processing In-Transit</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-bold mb-1">Donor Email (For Automated Receipt)</label>
                <input
                  type="email"
                  placeholder="e.g. donor@organisation.org"
                  value={donationForm.donorEmail}
                  onChange={(e) => setDonationForm({ ...donationForm, donorEmail: e.target.value })}
                  className={`w-full p-2.5 rounded-xl border outline-none ${
                    theme === "dark" ? "bg-[#14141E] border-white/10 text-white" : "bg-gray-50 border-gray-200 text-gray-900"
                  }`}
                />
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-bold mb-1">Notes / Grant Covenant Details</label>
                <textarea
                  rows={2}
                  placeholder="Special stipulations, milestone tranches, or field locations..."
                  value={donationForm.notes}
                  onChange={(e) => setDonationForm({ ...donationForm, notes: e.target.value })}
                  className={`w-full p-2.5 rounded-xl border outline-none resize-none ${
                    theme === "dark" ? "bg-[#14141E] border-white/10 text-white" : "bg-gray-50 border-gray-200 text-gray-900"
                  }`}
                ></textarea>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 dark:border-white/5">
                <button
                  type="button"
                  onClick={() => setIsDonationModalOpen(false)}
                  className="px-4 py-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ backgroundColor: primaryColor }}
                  className="px-5 py-2 text-white rounded-xl text-xs font-bold shadow-md hover:opacity-90 transition-all cursor-pointer"
                >
                  {editingDonation ? "Save Changes" : "Record Donation"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== CREATE / EDIT CAMPAIGN MODAL ==================== */}
      {isCampaignModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className={`w-full max-w-lg rounded-3xl p-6 border shadow-2xl transition-all my-8 ${
            theme === "dark" ? "bg-[#1A1926] border-white/10 text-white" : "bg-white border-gray-200 text-gray-900"
          }`}>
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-white/5">
              <h3 className="text-base font-extrabold flex items-center gap-2">
                <Target size={18} style={{ color: primaryColor }} />
                {editingCampaign ? "Edit Charity Appeal Campaign" : "Launch New Charity Appeal"}
              </h3>
              <button
                type="button"
                onClick={() => setIsCampaignModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-white cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveCampaign} className="space-y-4 pt-4 text-xs font-medium">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-bold mb-1">Appeal Campaign Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Emergency Flood & Monsoon Relief 2024"
                  value={campaignForm.title}
                  onChange={(e) => setCampaignForm({ ...campaignForm, title: e.target.value })}
                  className={`w-full p-2.5 rounded-xl border outline-none ${
                    theme === "dark" ? "bg-[#14141E] border-white/10 text-white" : "bg-gray-50 border-gray-200 text-gray-900"
                  }`}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-bold mb-1">Thematic Focus</label>
                  <select
                    value={campaignForm.thematicArea}
                    onChange={(e) => setCampaignForm({ ...campaignForm, thematicArea: e.target.value as any })}
                    className={`w-full p-2.5 rounded-xl border outline-none ${
                      theme === "dark" ? "bg-[#14141E] border-white/10 text-white" : "bg-gray-50 border-gray-200 text-gray-900"
                    }`}
                  >
                    <option value="Disaster Relief">Disaster Relief & Floods</option>
                    <option value="Arsenic Safe Water">Arsenic Safe Water</option>
                    <option value="Child School Kit">Child School Kit</option>
                    <option value="Maternal Care">Maternal & Newborn Care</option>
                    <option value="Winter Warmth">Winter Warmth Drive</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-bold mb-1">Urgency Status</label>
                  <select
                    value={campaignForm.status}
                    onChange={(e) => setCampaignForm({ ...campaignForm, status: e.target.value as any })}
                    className={`w-full p-2.5 rounded-xl border outline-none font-bold ${
                      theme === "dark" ? "bg-[#14141E] border-white/10 text-white" : "bg-gray-50 border-gray-200 text-gray-900"
                    }`}
                  >
                    <option value="Active">Active Appeal</option>
                    <option value="Urgent">Urgent Emergency</option>
                    <option value="Planned">Planned Upcoming</option>
                    <option value="Completed">Completed Target</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-bold mb-1">Target Amount (e.g. ৳ 25,00,000)</label>
                  <input
                    type="text"
                    required
                    value={campaignForm.targetAmount}
                    onChange={(e) => setCampaignForm({ ...campaignForm, targetAmount: e.target.value })}
                    className={`w-full p-2.5 rounded-xl border outline-none font-bold ${
                      theme === "dark" ? "bg-[#14141E] border-white/10 text-white" : "bg-gray-50 border-gray-200 text-gray-900"
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-bold mb-1">Raised Amount So Far</label>
                  <input
                    type="text"
                    required
                    value={campaignForm.raisedAmount}
                    onChange={(e) => setCampaignForm({ ...campaignForm, raisedAmount: e.target.value })}
                    className={`w-full p-2.5 rounded-xl border outline-none font-bold ${
                      theme === "dark" ? "bg-[#14141E] border-white/10 text-white" : "bg-gray-50 border-gray-200 text-gray-900"
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-bold mb-1">Beneficiaries Target</label>
                  <input
                    type="text"
                    value={campaignForm.beneficiariesTarget}
                    onChange={(e) => setCampaignForm({ ...campaignForm, beneficiariesTarget: e.target.value })}
                    className={`w-full p-2.5 rounded-xl border outline-none ${
                      theme === "dark" ? "bg-[#14141E] border-white/10 text-white" : "bg-gray-50 border-gray-200 text-gray-900"
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-bold mb-1">Progress % (0 - 100)</label>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={campaignForm.progress}
                    onChange={(e) => setCampaignForm({ ...campaignForm, progress: parseInt(e.target.value) || 0 })}
                    className={`w-full p-2.5 rounded-xl border outline-none font-bold ${
                      theme === "dark" ? "bg-[#14141E] border-white/10 text-white" : "bg-gray-50 border-gray-200 text-gray-900"
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 font-bold mb-1">Deadline Date</label>
                  <input
                    type="date"
                    value={campaignForm.deadline}
                    onChange={(e) => setCampaignForm({ ...campaignForm, deadline: e.target.value })}
                    className={`w-full p-2.5 rounded-xl border outline-none ${
                      theme === "dark" ? "bg-[#14141E] border-white/10 text-white" : "bg-gray-50 border-gray-200 text-gray-900"
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-bold mb-1">Target Locations / Districts</label>
                <input
                  type="text"
                  placeholder="e.g. Sylhet, Sunamganj & Feni"
                  value={campaignForm.location}
                  onChange={(e) => setCampaignForm({ ...campaignForm, location: e.target.value })}
                  className={`w-full p-2.5 rounded-xl border outline-none ${
                    theme === "dark" ? "bg-[#14141E] border-white/10 text-white" : "bg-gray-50 border-gray-200 text-gray-900"
                  }`}
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 dark:border-white/5">
                <button
                  type="button"
                  onClick={() => setIsCampaignModalOpen(false)}
                  className="px-4 py-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ backgroundColor: primaryColor }}
                  className="px-5 py-2 text-white rounded-xl text-xs font-bold shadow-md hover:opacity-90 transition-all cursor-pointer"
                >
                  {editingCampaign ? "Save Changes" : "Launch Appeal"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== OFFICIAL RECEIPT VIEW MODAL ==================== */}
      {viewingReceipt && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="w-full max-w-md bg-white rounded-3xl p-8 text-gray-900 shadow-2xl border border-gray-200 relative">
            <button
              type="button"
              onClick={() => setViewingReceipt(null)}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <X size={20} />
            </button>

            {/* Official Receipt Certificate Card */}
            <div className="text-center pb-4 border-b border-gray-100 space-y-1">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 p-2 mx-auto flex items-center justify-center">
                <img src="/assets/logo.png" alt="VERC" className="w-full h-full object-contain" />
              </div>
              <h4 className="text-sm font-extrabold text-gray-950 uppercase tracking-tight pt-1">
                Village Education Resource Center
              </h4>
              <p className="text-[10px] text-gray-500 font-semibold">
                NGO Affairs Bureau Reg: NGOAB-00348-1989 &bull; Tax Exempted
              </p>
              <div className="inline-block bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-black px-2.5 py-0.5 rounded-full mt-2 uppercase">
                Official Donation Receipt
              </div>
            </div>

            <div className="py-4 space-y-2.5 text-xs">
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
                <span className="text-xs font-bold text-blue-950">Amount Contributed:</span>
                <span className="text-lg font-black text-blue-900">
                  {viewingReceipt.currency === "BDT" ? "৳ " : "$ "}
                  {viewingReceipt.amount.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-[10px] text-gray-400">
              <span>Authorized Signature: VERC Accounts Wing</span>
              <button
                type="button"
                onClick={() => window.print()}
                className="px-3 py-1.5 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-colors cursor-pointer"
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
