"use client";

import React, { useState } from "react";
import { 
  FileCheck, 
  ShieldCheck, 
  Award, 
  Users, 
  Plus, 
  Edit2, 
  Trash2, 
  Search, 
  ExternalLink, 
  Check, 
  X, 
  Sparkles, 
  Building2, 
  FileText, 
  Download, 
  ChevronRight,
  Eye,
  Layers,
  Heart,
  Target,
  Compass,
  FileSpreadsheet
} from "lucide-react";
import { 
  useContent, 
  LegalCertification, 
  AnnualReportItem, 
  AwardItem, 
  OrganogramNode 
} from "@/context/ContentContext";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { DocumentUploadField } from "@/components/admin/DocumentUploadField";

export default function AdminAboutPage() {
  const { 
    legalCertifications, 
    addCertification, 
    updateCertification, 
    deleteCertification,
    annualReports,
    addAnnualReport,
    updateAnnualReport,
    deleteAnnualReport,
    awards,
    addAward,
    updateAward,
    deleteAward,
    organogramNodes,
    addOrganogramNode,
    updateOrganogramNode,
    deleteOrganogramNode,
    aboutContent,
    updateAboutContent,
    primaryColor, 
    theme 
  } = useContent();

  const [activeTab, setActiveTab] = useState<"certifications" | "reports" | "awards" | "organogram" | "mission">("certifications");
  const [searchTerm, setSearchTerm] = useState("");

  // Modals state
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [editingCert, setEditingCert] = useState<LegalCertification | null>(null);
  const [certForm, setCertForm] = useState<Omit<LegalCertification, "id">>({
    title: "",
    authority: "",
    regNo: "",
    desc: "",
    status: "Active & Verified",
    type: "Official PDF Document",
    link: "",
    category: "Statutory"
  });

  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [editingReport, setEditingReport] = useState<AnnualReportItem | null>(null);
  const [reportForm, setReportForm] = useState<Omit<AnnualReportItem, "id">>({
    year: "",
    title: "",
    desc: "",
    link: "",
    highlight: false,
    fileSize: "4.5 MB"
  });

  const [isAwardModalOpen, setIsAwardModalOpen] = useState(false);
  const [editingAward, setEditingAward] = useState<AwardItem | null>(null);
  const [awardForm, setAwardForm] = useState<Omit<AwardItem, "id">>({
    year: "",
    title: "",
    organization: "",
    category: "WaSH & Sanitation",
    desc: "",
    badge: "National Recognition",
    badgeColor: "bg-amber-50 text-amber-700 border-amber-200"
  });

  const [isNodeModalOpen, setIsNodeModalOpen] = useState(false);
  const [editingNode, setEditingNode] = useState<OrganogramNode | null>(null);
  const [nodeForm, setNodeForm] = useState<Omit<OrganogramNode, "id">>({
    title: "",
    subtitle: "",
    level: 5,
    department: "Programs",
    isSpecial: false
  });

  // Mission & Core Values Form State
  const [missionForm, setMissionForm] = useState({
    visionText: aboutContent?.visionText || "",
    missionText: aboutContent?.missionText || "",
    organogramPdfUrl: aboutContent?.organogramPdfUrl || ""
  });
  const [isMissionSaved, setIsMissionSaved] = useState(false);

  // Certifications Handlers
  const handleOpenCreateCert = () => {
    setEditingCert(null);
    setCertForm({
      title: "",
      authority: "",
      regNo: "",
      desc: "",
      status: "Active & Verified",
      type: "Official PDF Document",
      link: "https://www.vercbd.org/images/NGOAB.pdf",
      category: "Statutory"
    });
    setIsCertModalOpen(true);
  };

  const handleOpenEditCert = (cert: LegalCertification) => {
    setEditingCert(cert);
    setCertForm({
      title: cert.title,
      authority: cert.authority,
      regNo: cert.regNo,
      desc: cert.desc,
      status: cert.status,
      type: cert.type,
      link: cert.link,
      category: cert.category
    });
    setIsCertModalOpen(true);
  };

  const handleSubmitCert = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCert) {
      updateCertification(editingCert.id, certForm);
    } else {
      addCertification(certForm);
    }
    setIsCertModalOpen(false);
  };

  // Reports Handlers
  const handleOpenCreateReport = () => {
    setEditingReport(null);
    setReportForm({
      year: "2024 - 2025",
      title: "Annual Progress & Financial Statements",
      desc: "Detailed report on community-led interventions and audited donor spending.",
      link: "https://www.vercbd.org/images/VERC%20Annual%20Report%20(Short%20Version)_Final.pdf",
      highlight: false,
      fileSize: "5.2 MB"
    });
    setIsReportModalOpen(true);
  };

  const handleOpenEditReport = (rep: AnnualReportItem) => {
    setEditingReport(rep);
    setReportForm({
      year: rep.year,
      title: rep.title,
      desc: rep.desc,
      link: rep.link,
      highlight: !!rep.highlight,
      fileSize: rep.fileSize || "4.5 MB"
    });
    setIsReportModalOpen(true);
  };

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingReport) {
      updateAnnualReport(editingReport.id, reportForm);
    } else {
      addAnnualReport(reportForm);
    }
    setIsReportModalOpen(false);
  };

  // Awards Handlers
  const handleOpenCreateAward = () => {
    setEditingAward(null);
    setAwardForm({
      year: new Date().getFullYear().toString(),
      title: "",
      organization: "",
      category: "Public Health",
      desc: "",
      badge: "National Award",
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200"
    });
    setIsAwardModalOpen(true);
  };

  const handleOpenEditAward = (award: AwardItem) => {
    setEditingAward(award);
    setAwardForm({
      year: award.year,
      title: award.title,
      organization: award.organization,
      category: award.category,
      desc: award.desc,
      badge: award.badge || "National Recognition",
      badgeColor: award.badgeColor || "bg-amber-50 text-amber-700 border-amber-200"
    });
    setIsAwardModalOpen(true);
  };

  const handleSubmitAward = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAward) {
      updateAward(editingAward.id, awardForm);
    } else {
      addAward(awardForm);
    }
    setIsAwardModalOpen(false);
  };

  // Organogram Handlers
  const handleOpenCreateNode = () => {
    setEditingNode(null);
    setNodeForm({
      title: "",
      subtitle: "",
      level: 5,
      department: "Directorate",
      isSpecial: false
    });
    setIsNodeModalOpen(true);
  };

  const handleOpenEditNode = (node: OrganogramNode) => {
    setEditingNode(node);
    setNodeForm({
      title: node.title,
      subtitle: node.subtitle,
      level: node.level,
      department: node.department || "Directorate",
      isSpecial: !!node.isSpecial
    });
    setIsNodeModalOpen(true);
  };

  const handleSubmitNode = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingNode) {
      updateOrganogramNode(editingNode.id, nodeForm);
    } else {
      addOrganogramNode(nodeForm);
    }
    setIsNodeModalOpen(false);
  };

  const handleSaveMission = (e: React.FormEvent) => {
    e.preventDefault();
    updateAboutContent({
      vision: missionForm.visionText,
      mission: missionForm.missionText,
      visionText: missionForm.visionText,
      missionText: missionForm.missionText,
      organogramPdfLink: missionForm.organogramPdfUrl,
      organogramPdfUrl: missionForm.organogramPdfUrl
    });
    setIsMissionSaved(true);
    setTimeout(() => setIsMissionSaved(false), 3000);
  };

  // Filtered lists
  const filteredCerts = (legalCertifications || []).filter(c => 
    c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.authority.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.regNo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredReports = (annualReports || []).filter(r => 
    r.year.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredAwards = (awards || []).filter(a => 
    a.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.year.includes(searchTerm)
  );

  const filteredNodes = (organogramNodes || []).filter(n => 
    n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (n.subtitle && n.subtitle.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-valley font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400">
            <span>Content Management</span>
            <span>/</span>
            <span style={{ color: primaryColor }}>About Us</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white mt-1">
            About Us CMS
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Manage legal compliance, transparency records, institutional honors, organogram, and core mission statements.
          </p>
        </div>

        {/* View Live Page Shortcuts */}
        <div className="flex items-center gap-2">
          <a
            href="/about/legal"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300 transition-all flex items-center gap-1.5"
          >
            <Eye size={13} /> Legal Page <ExternalLink size={11} />
          </a>
          <a
            href="/about/annual-report"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300 transition-all flex items-center gap-1.5"
          >
            <FileSpreadsheet size={13} /> Reports <ExternalLink size={11} />
          </a>
          <a
            href="/about/awards"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300 transition-all flex items-center gap-1.5"
          >
            <Award size={13} /> Awards <ExternalLink size={11} />
          </a>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex items-center gap-2 border-b border-gray-200 dark:border-white/10 overflow-x-auto pb-1">
        {[
          { key: "certifications", label: "Legal & Certifications", icon: ShieldCheck, count: legalCertifications?.length || 0 },
          { key: "reports", label: "Annual Reports", icon: FileText, count: annualReports?.length || 0 },
          { key: "awards", label: "Awards & Honors", icon: Award, count: awards?.length || 0 },
          { key: "organogram", label: "Governance Organogram", icon: Users, count: organogramNodes?.length || 0 },
          { key: "mission", label: "Vision, Mission & Values", icon: Compass }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              style={isActive ? { borderBottomColor: primaryColor, color: primaryColor } : {}}
              className={`flex items-center gap-2 px-4 py-3 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? "border-b-2 font-black"
                  : "border-b-2 border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <Icon size={15} />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span 
                  className="px-1.5 py-0.5 rounded-full text-[10px] font-bold"
                  style={{ 
                    backgroundColor: isActive ? `${primaryColor}20` : theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.06)",
                    color: isActive ? primaryColor : "inherit"
                  }}
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB 1: LEGAL CERTIFICATIONS */}
      {activeTab === "certifications" && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
              <input
                type="text"
                placeholder="Search certifications by name, authority, or reg no..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs outline-none border transition-all ${
                  theme === "dark"
                    ? "bg-[#181824] border-white/10 text-white placeholder-gray-500"
                    : "bg-white border-gray-200 text-gray-900 placeholder-gray-400"
                }`}
              />
            </div>
            <button
              onClick={handleOpenCreateCert}
              style={{ backgroundColor: primaryColor }}
              className="px-4 py-2 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-2 cursor-pointer hover:opacity-95 whitespace-nowrap w-full sm:w-auto justify-center"
            >
              <Plus size={15} /> Add Certification
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCerts.map((cert) => (
              <div
                key={cert.id}
                className={`rounded-2xl border p-5 transition-all flex flex-col justify-between ${
                  theme === "dark" ? "bg-[#181824] border-white/5" : "bg-white border-gray-200 shadow-2xs"
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span 
                      style={{ color: primaryColor, backgroundColor: `${primaryColor}15` }}
                      className="px-2.5 py-1 rounded-full text-[10px] font-bold"
                    >
                      {cert.category}
                    </span>
                    <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md">
                      {cert.status}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-gray-900 dark:text-white leading-snug">
                      {cert.title}
                    </h3>
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mt-0.5">
                      {cert.authority}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 text-xs space-y-1">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Registration / Reference</div>
                    <div className="font-extrabold text-gray-800 dark:text-gray-200">{cert.regNo}</div>
                  </div>

                  <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-3 leading-relaxed">
                    {cert.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
                  {cert.link ? (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-brand-primary flex items-center gap-1 hover:underline"
                    >
                      <Download size={12} /> View Document <ExternalLink size={11} />
                    </a>
                  ) : (
                    <span className="text-xs text-gray-400">No document attached</span>
                  )}

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleOpenEditCert(cert)}
                      className="p-1.5 rounded-lg text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-white/5 transition-all"
                      title="Edit"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Are you sure you want to delete "${cert.title}"?`)) {
                          deleteCertification(cert.id);
                        }
                      }}
                      className="p-1.5 rounded-lg text-gray-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-white/5 transition-all"
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: ANNUAL REPORTS */}
      {activeTab === "reports" && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
              <input
                type="text"
                placeholder="Search annual reports by fiscal year or title..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs outline-none border transition-all ${
                  theme === "dark"
                    ? "bg-[#181824] border-white/10 text-white placeholder-gray-500"
                    : "bg-white border-gray-200 text-gray-900 placeholder-gray-400"
                }`}
              />
            </div>
            <button
              onClick={handleOpenCreateReport}
              style={{ backgroundColor: primaryColor }}
              className="px-4 py-2 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-2 cursor-pointer hover:opacity-95 whitespace-nowrap w-full sm:w-auto justify-center"
            >
              <Plus size={15} /> Add Annual Report
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredReports.map((report) => (
              <div
                key={report.id}
                className={`rounded-2xl border p-5 transition-all flex flex-col justify-between ${
                  report.highlight
                    ? "border-2 border-brand-primary/40 shadow-sm"
                    : theme === "dark" ? "bg-[#181824] border-white/5" : "bg-white border-gray-200 shadow-2xs"
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span 
                      style={{ color: primaryColor, backgroundColor: `${primaryColor}15` }}
                      className="px-2.5 py-1 rounded-full text-xs font-bold"
                    >
                      FY {report.year}
                    </span>
                    {report.highlight && (
                      <span className="text-[10px] font-extrabold uppercase tracking-wider bg-amber-500 text-white px-2 py-0.5 rounded-full">
                        Latest Release
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-gray-900 dark:text-white leading-snug">
                      {report.title}
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-3 mt-1 leading-relaxed">
                      {report.desc}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-gray-400">
                    <FileText size={13} />
                    <span>PDF Document • {report.fileSize || "4.5 MB"}</span>
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
                  <a
                    href={report.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-brand-primary flex items-center gap-1 hover:underline"
                  >
                    <Download size={13} /> Download PDF <ExternalLink size={11} />
                  </a>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleOpenEditReport(report)}
                      className="p-1.5 rounded-lg text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-white/5 transition-all"
                      title="Edit"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Are you sure you want to delete report "${report.year}"?`)) {
                          deleteAnnualReport(report.id);
                        }
                      }}
                      className="p-1.5 rounded-lg text-gray-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-white/5 transition-all"
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: AWARDS & HONORS */}
      {activeTab === "awards" && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
              <input
                type="text"
                placeholder="Search awards by title, organization, or year..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs outline-none border transition-all ${
                  theme === "dark"
                    ? "bg-[#181824] border-white/10 text-white placeholder-gray-500"
                    : "bg-white border-gray-200 text-gray-900 placeholder-gray-400"
                }`}
              />
            </div>
            <button
              onClick={handleOpenCreateAward}
              style={{ backgroundColor: primaryColor }}
              className="px-4 py-2 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-2 cursor-pointer hover:opacity-95 whitespace-nowrap w-full sm:w-auto justify-center"
            >
              <Plus size={15} /> Add Award & Honor
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAwards.map((award) => (
              <div
                key={award.id}
                className={`rounded-2xl border p-5 transition-all flex flex-col justify-between ${
                  theme === "dark" ? "bg-[#181824] border-white/5" : "bg-white border-gray-200 shadow-2xs"
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                      {award.year}
                    </span>
                    {award.badge && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300">
                        {award.badge}
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-gray-900 dark:text-white leading-snug">
                      {award.title}
                    </h3>
                    <p className="text-xs font-semibold text-brand-primary mt-1">
                      {award.organization}
                    </p>
                  </div>

                  <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-3 leading-relaxed">
                    {award.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-500 dark:text-gray-400">
                    Category: {award.category}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleOpenEditAward(award)}
                      className="p-1.5 rounded-lg text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-white/5 transition-all"
                      title="Edit"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Are you sure you want to delete award "${award.title}"?`)) {
                          deleteAward(award.id);
                        }
                      }}
                      className="p-1.5 rounded-lg text-gray-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-white/5 transition-all"
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: GOVERNANCE & ORGANOGRAM */}
      {activeTab === "organogram" && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-brand-primary/5 border border-brand-primary/20 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h4 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Users size={16} className="text-brand-primary" /> Official Organogram Document
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                The official PDF linked across the organogram page and annual disclosures.
              </p>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <input
                type="text"
                value={aboutContent?.organogramPdfUrl || ""}
                onChange={(e) => updateAboutContent({ organogramPdfUrl: e.target.value })}
                className={`px-3 py-2 rounded-xl text-xs outline-none border flex-1 sm:w-80 ${
                  theme === "dark" ? "bg-[#181824] border-white/10 text-white" : "bg-white border-gray-200 text-gray-900"
                }`}
                placeholder="https://.../organogram.pdf"
              />
              <a
                href={aboutContent?.organogramPdfUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-brand-primary text-white hover:opacity-90 transition-all flex items-center justify-center"
                title="Preview"
              >
                <ExternalLink size={14} />
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
              <input
                type="text"
                placeholder="Search structure nodes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-xs outline-none border transition-all ${
                  theme === "dark"
                    ? "bg-[#181824] border-white/10 text-white placeholder-gray-500"
                    : "bg-white border-gray-200 text-gray-900 placeholder-gray-400"
                }`}
              />
            </div>
            <button
              onClick={handleOpenCreateNode}
              style={{ backgroundColor: primaryColor }}
              className="px-4 py-2 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-2 cursor-pointer hover:opacity-95 whitespace-nowrap w-full sm:w-auto justify-center"
            >
              <Plus size={15} /> Add Governance Node
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredNodes.map((node) => (
              <div
                key={node.id}
                className={`rounded-2xl border p-4 transition-all flex flex-col justify-between ${
                  theme === "dark" ? "bg-[#181824] border-white/5" : "bg-white border-gray-200 shadow-2xs"
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300">
                      Level {node.level}
                    </span>
                    {node.isSpecial && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-50 text-blue-600">
                        Special Unit
                      </span>
                    )}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                      {node.title}
                    </h4>
                    {node.subtitle && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        {node.subtitle}
                      </p>
                    )}
                  </div>
                  {node.department && (
                    <div className="text-[11px] font-semibold text-brand-primary">
                      {node.department}
                    </div>
                  )}
                </div>

                <div className="pt-3 mt-3 border-t border-gray-100 dark:border-white/5 flex items-center justify-end gap-1.5">
                  <button
                    onClick={() => handleOpenEditNode(node)}
                    className="p-1.5 rounded-lg text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-white/5 transition-all"
                  >
                    <Edit2 size={13} />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Delete node "${node.title}"?`)) {
                        deleteOrganogramNode(node.id);
                      }
                    }}
                    className="p-1.5 rounded-lg text-gray-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-white/5 transition-all"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: VISION, MISSION & VALUES */}
      {activeTab === "mission" && (
        <form onSubmit={handleSaveMission} className="space-y-6">
          <div className={`p-6 rounded-3xl border space-y-6 ${theme === "dark" ? "bg-[#181824] border-white/5" : "bg-white border-gray-200 shadow-2xs"}`}>
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Target size={18} className="text-brand-primary" /> Strategic Purpose & Vision
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                These statements drive the narrative across the About page, hero banner subtexts, and public disclosures.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <RichTextEditor
                  label="Vision Statement"
                  value={missionForm.visionText}
                  onChange={(html) => setMissionForm({ ...missionForm, visionText: html })}
                  placeholder="Enter organization vision statement..."
                  minHeight="140px"
                />
              </div>

              <div>
                <RichTextEditor
                  label="Mission Statement"
                  value={missionForm.missionText}
                  onChange={(html) => setMissionForm({ ...missionForm, missionText: html })}
                  placeholder="Enter organization mission statement..."
                  minHeight="140px"
                />
              </div>

              <div>
                <DocumentUploadField
                  label="Official Governance Organogram Document"
                  value={missionForm.organogramPdfUrl}
                  onChange={(url) => setMissionForm({ ...missionForm, organogramPdfUrl: url })}
                  hint="Upload approved organizational hierarchy diagram (PDF or High-Res Image) from your device, or paste a link"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-white/5">
              {isMissionSaved && (
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5">
                  <Check size={14} /> Strategic statements saved successfully!
                </span>
              )}
              <div className="ml-auto">
                <button
                  type="submit"
                  style={{ backgroundColor: primaryColor }}
                  className="px-6 py-2.5 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-2 cursor-pointer hover:opacity-95"
                >
                  <Check size={14} /> Save Changes
                </button>
              </div>
            </div>
          </div>
        </form>
      )}

      {/* MODAL: CERTIFICATION */}
      {isCertModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className={`w-full max-w-lg rounded-3xl border p-6 space-y-4 max-h-[90vh] overflow-y-auto ${
            theme === "dark" ? "bg-[#181824] border-white/10 text-white" : "bg-white border-gray-200 text-gray-900 shadow-xl"
          }`}>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">
                {editingCert ? "Edit Legal Certification" : "Add Statutory Certification"}
              </h3>
              <button onClick={() => setIsCertModalOpen(false)} className="p-1 rounded-lg text-gray-400 hover:text-gray-600">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmitCert} className="space-y-4">
              <div>
                <label className="block text-xs font-bold mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={certForm.title}
                  onChange={(e) => setCertForm({ ...certForm, title: e.target.value })}
                  placeholder="e.g. NGO Affairs Bureau Registration"
                  className={`w-full p-2.5 rounded-xl text-xs outline-none border ${
                    theme === "dark" ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"
                  }`}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold mb-1">Issuing Authority</label>
                  <input
                    type="text"
                    required
                    value={certForm.authority}
                    onChange={(e) => setCertForm({ ...certForm, authority: e.target.value })}
                    placeholder="e.g. Prime Minister's Office, GoB"
                    className={`w-full p-2.5 rounded-xl text-xs outline-none border ${
                      theme === "dark" ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">Registration / Reg No.</label>
                  <input
                    type="text"
                    required
                    value={certForm.regNo}
                    onChange={(e) => setCertForm({ ...certForm, regNo: e.target.value })}
                    placeholder="e.g. NGOAB Reg. No. 001"
                    className={`w-full p-2.5 rounded-xl text-xs outline-none border ${
                      theme === "dark" ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold mb-1">Category</label>
                  <select
                    value={certForm.category}
                    onChange={(e) => setCertForm({ ...certForm, category: e.target.value })}
                    className={`w-full p-2.5 rounded-xl text-xs outline-none border ${
                      theme === "dark" ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"
                    }`}
                  >
                    <option value="Statutory">Statutory</option>
                    <option value="Microfinance">Microfinance</option>
                    <option value="Tax & Compliance">Tax & Compliance</option>
                    <option value="Audit & Governance">Audit & Governance</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">Verification Status</label>
                  <input
                    type="text"
                    value={certForm.status}
                    onChange={(e) => setCertForm({ ...certForm, status: e.target.value })}
                    placeholder="Active & Verified"
                    className={`w-full p-2.5 rounded-xl text-xs outline-none border ${
                      theme === "dark" ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"
                    }`}
                  />
                </div>
              </div>

              <div>
                <RichTextEditor
                  label="Legal Description & Regulatory Mandate"
                  value={certForm.desc}
                  onChange={(html) => setCertForm({ ...certForm, desc: html })}
                  placeholder="Explain legal authority and regulatory relevance..."
                  minHeight="140px"
                />
              </div>

              <div>
                <DocumentUploadField
                  label="Verification Certificate (Upload PDF / Image or URL)"
                  value={certForm.link}
                  onChange={(url) => setCertForm({ ...certForm, link: url })}
                  hint="Upload government registration certificate from your device (PDF or Image) or choose from VERC presets"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCertModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ backgroundColor: primaryColor }}
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white hover:opacity-90"
                >
                  {editingCert ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ANNUAL REPORT */}
      {isReportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className={`w-full max-w-lg rounded-3xl border p-6 space-y-4 max-h-[90vh] overflow-y-auto ${
            theme === "dark" ? "bg-[#181824] border-white/10 text-white" : "bg-white border-gray-200 text-gray-900 shadow-xl"
          }`}>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">
                {editingReport ? "Edit Annual Report" : "Add Annual Report"}
              </h3>
              <button onClick={() => setIsReportModalOpen(false)} className="p-1 rounded-lg text-gray-400 hover:text-gray-600">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmitReport} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold mb-1">Fiscal Year</label>
                  <input
                    type="text"
                    required
                    value={reportForm.year}
                    onChange={(e) => setReportForm({ ...reportForm, year: e.target.value })}
                    placeholder="e.g. 2023 - 2024"
                    className={`w-full p-2.5 rounded-xl text-xs outline-none border ${
                      theme === "dark" ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">File Size</label>
                  <input
                    type="text"
                    value={reportForm.fileSize}
                    onChange={(e) => setReportForm({ ...reportForm, fileSize: e.target.value })}
                    placeholder="e.g. 4.5 MB"
                    className={`w-full p-2.5 rounded-xl text-xs outline-none border ${
                      theme === "dark" ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">Report Title / Theme</label>
                <input
                  type="text"
                  required
                  value={reportForm.title}
                  onChange={(e) => setReportForm({ ...reportForm, title: e.target.value })}
                  placeholder="e.g. Impact & Resilience"
                  className={`w-full p-2.5 rounded-xl text-xs outline-none border ${
                    theme === "dark" ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"
                  }`}
                />
              </div>

              <div>
                <RichTextEditor
                  label="Executive Summary / Narrative"
                  value={reportForm.desc}
                  onChange={(html) => setReportForm({ ...reportForm, desc: html })}
                  placeholder="Overview of achievements, audited accounts, and sector progress..."
                  minHeight="140px"
                />
              </div>

              <div>
                <DocumentUploadField
                  label="Annual Report Document (Upload PDF or URL)"
                  accept=".pdf,application/pdf"
                  allowImages={false}
                  value={reportForm.link}
                  onChange={(url, name, size) => setReportForm(prev => ({ 
                    ...prev, 
                    link: url, 
                    fileSize: size || prev.fileSize || "5.2 MB" 
                  }))}
                  hint="Upload full audited annual report in PDF format from your computer, or paste a download link"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="highlightCheckbox"
                  checked={reportForm.highlight}
                  onChange={(e) => setReportForm({ ...reportForm, highlight: e.target.checked })}
                  className="rounded border-gray-300"
                />
                <label htmlFor="highlightCheckbox" className="text-xs font-bold cursor-pointer">
                  Mark as Latest Highlighted Release (Shows prominent badge)
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsReportModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ backgroundColor: primaryColor }}
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white hover:opacity-90"
                >
                  {editingReport ? "Update" : "Publish Report"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: AWARD */}
      {isAwardModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className={`w-full max-w-lg rounded-3xl border p-6 space-y-4 max-h-[90vh] overflow-y-auto ${
            theme === "dark" ? "bg-[#181824] border-white/10 text-white" : "bg-white border-gray-200 text-gray-900 shadow-xl"
          }`}>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">
                {editingAward ? "Edit Award & Honor" : "Add Award & Recognition"}
              </h3>
              <button onClick={() => setIsAwardModalOpen(false)} className="p-1 rounded-lg text-gray-400 hover:text-gray-600">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmitAward} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold mb-1">Year Conferred</label>
                  <input
                    type="text"
                    required
                    value={awardForm.year}
                    onChange={(e) => setAwardForm({ ...awardForm, year: e.target.value })}
                    placeholder="e.g. 2023"
                    className={`w-full p-2.5 rounded-xl text-xs outline-none border ${
                      theme === "dark" ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">Category</label>
                  <input
                    type="text"
                    required
                    value={awardForm.category}
                    onChange={(e) => setAwardForm({ ...awardForm, category: e.target.value })}
                    placeholder="e.g. WaSH & Sanitation"
                    className={`w-full p-2.5 rounded-xl text-xs outline-none border ${
                      theme === "dark" ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">Award Title</label>
                <input
                  type="text"
                  required
                  value={awardForm.title}
                  onChange={(e) => setAwardForm({ ...awardForm, title: e.target.value })}
                  placeholder="e.g. Sustainable Development Excellence Award"
                  className={`w-full p-2.5 rounded-xl text-xs outline-none border ${
                    theme === "dark" ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">Conferring Organization / Authority</label>
                <input
                  type="text"
                  required
                  value={awardForm.organization}
                  onChange={(e) => setAwardForm({ ...awardForm, organization: e.target.value })}
                  placeholder="e.g. Global Sustainable Development Forum"
                  className={`w-full p-2.5 rounded-xl text-xs outline-none border ${
                    theme === "dark" ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"
                  }`}
                />
              </div>

              <div>
                <RichTextEditor
                  label="Honor Citation & Award Narrative"
                  value={awardForm.desc}
                  onChange={(html) => setAwardForm({ ...awardForm, desc: html })}
                  placeholder="Explain why this honor was awarded and its significance..."
                  minHeight="140px"
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">Badge Tag</label>
                <input
                  type="text"
                  value={awardForm.badge}
                  onChange={(e) => setAwardForm({ ...awardForm, badge: e.target.value })}
                  placeholder="e.g. Global Recognition"
                  className={`w-full p-2.5 rounded-xl text-xs outline-none border ${
                    theme === "dark" ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"
                  }`}
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAwardModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ backgroundColor: primaryColor }}
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white hover:opacity-90"
                >
                  {editingAward ? "Update" : "Save Award"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ORGANOGRAM NODE */}
      {isNodeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className={`w-full max-w-md rounded-3xl border p-6 space-y-4 ${
            theme === "dark" ? "bg-[#181824] border-white/10 text-white" : "bg-white border-gray-200 text-gray-900 shadow-xl"
          }`}>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">
                {editingNode ? "Edit Structure Node" : "Add Governance Node"}
              </h3>
              <button onClick={() => setIsNodeModalOpen(false)} className="p-1 rounded-lg text-gray-400 hover:text-gray-600">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmitNode} className="space-y-4">
              <div>
                <label className="block text-xs font-bold mb-1">Node Title</label>
                <input
                  type="text"
                  required
                  value={nodeForm.title}
                  onChange={(e) => setNodeForm({ ...nodeForm, title: e.target.value })}
                  placeholder="e.g. Director, Education & Youth"
                  className={`w-full p-2.5 rounded-xl text-xs outline-none border ${
                    theme === "dark" ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">Subtitle / Role Function</label>
                <input
                  type="text"
                  value={nodeForm.subtitle}
                  onChange={(e) => setNodeForm({ ...nodeForm, subtitle: e.target.value })}
                  placeholder="e.g. Operational Head"
                  className={`w-full p-2.5 rounded-xl text-xs outline-none border ${
                    theme === "dark" ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"
                  }`}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold mb-1">Hierarchy Level (1-5)</label>
                  <input
                    type="number"
                    min={1}
                    max={5}
                    required
                    value={nodeForm.level}
                    onChange={(e) => setNodeForm({ ...nodeForm, level: parseInt(e.target.value) || 5 })}
                    className={`w-full p-2.5 rounded-xl text-xs outline-none border ${
                      theme === "dark" ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">Department</label>
                  <input
                    type="text"
                    value={nodeForm.department}
                    onChange={(e) => setNodeForm({ ...nodeForm, department: e.target.value })}
                    placeholder="e.g. WaSH & Health"
                    className={`w-full p-2.5 rounded-xl text-xs outline-none border ${
                      theme === "dark" ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"
                    }`}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="specialNodeCheckbox"
                  checked={nodeForm.isSpecial}
                  onChange={(e) => setNodeForm({ ...nodeForm, isSpecial: e.target.checked })}
                  className="rounded border-gray-300"
                />
                <label htmlFor="specialNodeCheckbox" className="text-xs font-bold cursor-pointer">
                  Direct Oversight / Special Audit Node (Reports directly to Executive)
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsNodeModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ backgroundColor: primaryColor }}
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white hover:opacity-90"
                >
                  {editingNode ? "Update" : "Save Node"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
