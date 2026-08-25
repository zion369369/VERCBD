"use client";

import React, { useState } from "react";
import { Mail, Trash2, CheckCircle2, Search, Calendar, Phone, User, MessageSquare, Clock } from "lucide-react";
import { useContent } from "@/context/ContentContext";

export default function AdminMessagesPage() {
  const { messages, updateMessageStatus, deleteMessage, primaryColor, theme } = useContent();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMessageId, setSelectedMessageId] = useState<string | null>(messages[0]?.id || null);

  const filteredMessages = messages.filter((m) =>
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeMessage = messages.find((m) => m.id === selectedMessageId);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-6 rounded-3xl border transition-all ${
        theme === "dark" ? "bg-[#1A1926] border-white/5 shadow-sm text-white" : "bg-white border-gray-200 shadow-sm text-gray-900"
      }`}>
        <div>
          <h2 className="text-xl font-extrabold flex items-center gap-2">
            <Mail style={{ color: primaryColor }} /> Contact Inquiries & Feedback Inbox
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">
            Messages received through the public Contact page form across all departments.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span
            style={{ color: primaryColor, backgroundColor: `${primaryColor}15` }}
            className="px-3.5 py-1.5 rounded-xl text-xs font-bold"
          >
            {messages.filter(m => m.status === "Unread").length} Unread
          </span>
          <span className="px-3.5 py-1.5 bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300 rounded-xl text-xs font-bold">
            {messages.length} Total
          </span>
        </div>
      </div>

      {/* Inbox Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Messages List */}
        <div className={`p-4 rounded-3xl border space-y-4 transition-all ${
          theme === "dark" ? "bg-[#1A1926] border-white/5" : "bg-white border-gray-200 shadow-sm"
        }`}>
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
            <input
              type="text"
              placeholder="Search inquiries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-9 pr-3 py-2 rounded-xl text-xs outline-none border font-medium ${
                theme === "dark" ? "bg-[#14141E] border-white/10 text-white" : "bg-gray-50 border-gray-200 text-gray-900"
              }`}
            />
          </div>

          <div className="space-y-2 max-h-[600px] overflow-y-auto">
            {filteredMessages.map((msg) => (
              <div
                key={msg.id}
                onClick={() => {
                  setSelectedMessageId(msg.id);
                  if (msg.status === "Unread") updateMessageStatus(msg.id, "Read");
                }}
                style={selectedMessageId === msg.id ? { borderColor: primaryColor, backgroundColor: `${primaryColor}10` } : {}}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                  selectedMessageId === msg.id
                    ? "shadow-xs"
                    : theme === "dark"
                    ? "bg-[#14141E] border-white/5 hover:border-white/10"
                    : "bg-white border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xs font-bold truncate ${
                    msg.status === "Unread" ? "text-gray-900 dark:text-white font-extrabold" : "text-gray-600 dark:text-gray-300"
                  }`}>
                    {msg.name}
                  </span>
                  <span className="text-[10px] text-gray-500 font-semibold">{msg.date}</span>
                </div>

                <div className="text-xs font-bold text-gray-900 dark:text-white truncate">
                  {msg.subject}
                </div>

                <p className="text-[11px] text-gray-600 dark:text-gray-400 line-clamp-1 mt-1 font-medium">
                  {msg.message}
                </p>

                <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100 dark:border-white/5">
                  <span className="text-[10px] font-bold" style={{ color: primaryColor }}>General Inquiry</span>
                  {msg.status === "Unread" && (
                    <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Message Detail Reading Pane */}
        <div className={`lg:col-span-2 p-8 rounded-3xl border transition-all ${
          theme === "dark" ? "bg-[#1A1926] border-white/5" : "bg-white border-gray-200 shadow-sm"
        }`}>
          {activeMessage ? (
            <div className="space-y-6">
              {/* Message Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-gray-100 dark:border-white/5">
                <div>
                  <h3 className="text-lg font-black text-gray-900 dark:text-white">{activeMessage.subject}</h3>
                  <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">
                    <span className="flex items-center gap-1"><User size={13} /> {activeMessage.name}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Mail size={13} /> {activeMessage.email}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><Calendar size={13} /> {activeMessage.date}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (confirm("Delete this inquiry from records?")) {
                        deleteMessage(activeMessage.id);
                        setSelectedMessageId(null);
                      }
                    }}
                    className="p-2 text-gray-400 hover:text-red-500 rounded-xl transition-all cursor-pointer"
                    title="Delete Message"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {/* Message Body */}
              <div className="space-y-4">
                <div className="text-xs font-bold uppercase tracking-wider text-gray-400">Inquiry Content</div>
                <div className="p-6 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 text-xs text-gray-800 dark:text-gray-200 leading-relaxed font-medium whitespace-pre-wrap">
                  {activeMessage.message}
                </div>
              </div>

              {/* Reply Box */}
              <div className="pt-6 border-t border-gray-100 dark:border-white/5 space-y-3">
                <div className="text-xs font-bold text-gray-700 dark:text-gray-300">Direct Email Response</div>
                <a
                  href={`mailto:${activeMessage.email}?subject=Re: ${encodeURIComponent(activeMessage.subject)} - VERC Response`}
                  style={{ backgroundColor: primaryColor }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-white rounded-xl text-xs font-bold transition-all shadow-md cursor-pointer hover:opacity-90"
                >
                  <Mail size={14} /> Open Email Client to Reply ({activeMessage.email})
                </a>
              </div>
            </div>
          ) : (
            <div className="h-96 flex flex-col items-center justify-center text-center space-y-3 text-gray-400">
              <Mail size={40} className="stroke-[1.5]" />
              <p className="text-xs font-medium">Select a message from the left to view details.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
