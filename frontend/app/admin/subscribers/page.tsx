"use client";

import React, { useState } from "react";
import { Users, Trash2, Mail, Download, Search, CheckCircle2 } from "lucide-react";
import { useContent } from "@/context/ContentContext";

export default function AdminSubscribersPage() {
  const { subscribers, deleteSubscriber, primaryColor, theme } = useContent();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSubscribers = subscribers.filter((s) =>
    s.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exportCSV = () => {
    const headers = "ID,Email,Joined Date\n";
    const rows = subscribers.map(s => `${s.id},${s.email},${s.joinedDate}`).join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `vercbd-subscribers-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-6 rounded-3xl border transition-all ${
        theme === "dark" ? "bg-[#1A1926] border-white/5 shadow-sm text-white" : "bg-white border-gray-200 shadow-sm text-gray-900"
      }`}>
        <div>
          <h2 className="text-xl font-extrabold flex items-center gap-2">
            <Mail style={{ color: primaryColor }} /> Newsletter Subscribers List
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">
            Manage stakeholders, donors, and community members subscribed to the monthly newsletter.
          </p>
        </div>

        <button
          onClick={exportCSV}
          style={{ backgroundColor: primaryColor }}
          className="px-5 py-2.5 text-white rounded-2xl text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer hover:opacity-90"
        >
          <Download size={15} /> Export CSV List
        </button>
      </div>

      {/* Search & Stats Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search email address..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-11 pr-4 py-2.5 rounded-2xl text-xs outline-none border font-medium ${
              theme === "dark" ? "bg-[#1A1926] border-white/10 text-white placeholder-gray-500" : "bg-white border-gray-200 text-gray-900 placeholder-gray-400 shadow-sm"
            }`}
          />
        </div>

        <div className="text-xs font-bold text-gray-600 dark:text-gray-400">
          Total Subscribers: <span className="font-black" style={{ color: primaryColor }}>{subscribers.length}</span>
        </div>
      </div>

      {/* Subscribers Table */}
      <div className={`rounded-3xl border overflow-hidden transition-all ${
        theme === "dark" ? "bg-[#1A1926] border-white/5" : "bg-white border-gray-200 shadow-sm"
      }`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-200 dark:border-white/5 text-[11px] font-extrabold uppercase text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-white/5">
                <th className="py-4 px-6">Subscriber Email</th>
                <th className="py-4 px-6">Subscribed Date</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-white/5 font-medium">
              {filteredSubscribers.map((sub) => (
                <tr key={sub.id} className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors">
                  <td className="py-4 px-6 font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <Mail size={14} style={{ color: primaryColor }} /> {sub.email}
                  </td>
                  <td className="py-4 px-6 text-gray-600 dark:text-gray-400 font-medium">
                    {sub.joinedDate}
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-800">
                      <CheckCircle2 size={11} /> Active
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => {
                        if (confirm(`Remove subscriber "${sub.email}"?`)) {
                          deleteSubscriber(sub.id);
                        }
                      }}
                      className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg transition-colors cursor-pointer"
                      title="Remove Subscriber"
                    >
                      <Trash2 size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
