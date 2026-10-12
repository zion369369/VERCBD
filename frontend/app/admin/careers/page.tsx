"use client";

import React, { useState } from "react";
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Briefcase, 
  Download, 
  ExternalLink, 
  Eye, 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  Users, 
  FileText, 
  X, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  DollarSign, 
  ShieldCheck, 
  Check, 
  AlertCircle,
  FolderTree 
} from "lucide-react";
import { useContent, JobOpening, JobApplication } from "@/context/ContentContext";
import { RichTextEditor } from "@/components/admin/RichTextEditor";

export default function AdminCareersPage() {
  const { 
    jobOpenings, 
    addJobOpening, 
    updateJobOpening, 
    deleteJobOpening,
    jobApplications,
    updateApplicationStatus,
    deleteJobApplication,
    departments,
    addDepartment,
    deleteDepartment,
    primaryColor,
    theme 
  } = useContent();

  const [activeTab, setActiveTab] = useState<"postings" | "applications">("postings");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [deptFilter, setDeptFilter] = useState("All");

  // Department Management State
  const [isAddingDept, setIsAddingDept] = useState(false);
  const [newDeptInput, setNewDeptInput] = useState("");
  const [isDeptManagerOpen, setIsDeptManagerOpen] = useState(false);
  const [managerNewDept, setManagerNewDept] = useState("");

  // Job Modal State
  const [isJobModalOpen, setIsJobModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<JobOpening | null>(null);
  const [jobForm, setJobForm] = useState({
    title: "",
    department: "WASH & Climate Resilience",
    location: "Dhaka Head Office",
    type: "Full-Time" as JobOpening["type"],
    deadline: "2026-11-30",
    salary: "BDT 60,000 - 80,000 / month",
    experience: "3+ Years",
    description: "",
    requirements: ["Bachelor or Master degree in relevant discipline", "Minimum 3 years development sector experience", "Proficiency in English and Bangla"],
    responsibilities: ["Lead day-to-day project operations and coordinate with stakeholders", "Ensure quality compliance and prepare periodic progress reports"],
    status: "Active" as JobOpening["status"]
  });

  // Requirement & Responsibility temporary inputs
  const [newReq, setNewReq] = useState("");
  const [newResp, setNewResp] = useState("");

  // Application Details Modal
  const [selectedApp, setSelectedApp] = useState<JobApplication | null>(null);

  // Filtered Job Openings
  const filteredJobs = (jobOpenings || []).filter(j => {
    const matchesSearch = 
      j.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      j.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      j.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = deptFilter === "All" || j.department === deptFilter;
    const matchesStatus = statusFilter === "All" || j.status === statusFilter;
    return matchesSearch && matchesDept && matchesStatus;
  });

  // Filtered Applications
  const filteredApps = (jobApplications || []).filter(a => {
    const matchesSearch = 
      a.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.phone.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || a.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const pendingCount = (jobApplications || []).filter(a => a.status === "Pending").length;
  const activeJobsCount = (jobOpenings || []).filter(j => j.status === "Active").length;

  const handleAddNewDept = () => {
    const trimmed = newDeptInput.trim();
    if (!trimmed) return;
    addDepartment(trimmed);
    setJobForm(prev => ({ ...prev, department: trimmed }));
    setNewDeptInput("");
    setIsAddingDept(false);
  };

  const handleManagerAddDept = () => {
    const trimmed = managerNewDept.trim();
    if (!trimmed) return;
    addDepartment(trimmed);
    setManagerNewDept("");
  };

  const handleOpenCreateJob = () => {
    setEditingJob(null);
    setJobForm({
      title: "",
      department: (departments && departments.length > 0) ? departments[0] : "WASH & Climate Resilience",
      location: "Dhaka Head Office",
      type: "Full-Time",
      deadline: "2026-11-30",
      salary: "BDT 60,000 - 80,000 / month",
      experience: "3+ Years",
      description: "<p>We are looking for a qualified professional to join our program team.</p>",
      requirements: ["Bachelor or Master degree in relevant field", "Strong communication and reporting skills"],
      responsibilities: ["Manage program activities and collaborate with community teams"],
      status: "Active"
    });
    setIsAddingDept(false);
    setNewDeptInput("");
    setIsJobModalOpen(true);
  };

  const handleOpenEditJob = (job: JobOpening) => {
    setEditingJob(job);
    setJobForm({
      title: job.title,
      department: job.department,
      location: job.location,
      type: job.type,
      deadline: job.deadline,
      salary: job.salary || "",
      experience: job.experience || "",
      description: job.description,
      requirements: job.requirements || [],
      responsibilities: job.responsibilities || [],
      status: job.status
    });
    setIsJobModalOpen(true);
  };

  const handleSubmitJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobForm.title.trim()) return;

    if (editingJob) {
      updateJobOpening(editingJob.id, jobForm);
    } else {
      addJobOpening(jobForm);
    }
    setIsJobModalOpen(false);
  };

  const handleAddRequirement = () => {
    if (newReq.trim()) {
      setJobForm(prev => ({ ...prev, requirements: [...prev.requirements, newReq.trim()] }));
      setNewReq("");
    }
  };

  const handleRemoveRequirement = (index: number) => {
    setJobForm(prev => ({ ...prev, requirements: prev.requirements.filter((_, i) => i !== index) }));
  };

  const handleAddResponsibility = () => {
    if (newResp.trim()) {
      setJobForm(prev => ({ ...prev, responsibilities: [...prev.responsibilities, newResp.trim()] }));
      setNewResp("");
    }
  };

  const handleRemoveResponsibility = (index: number) => {
    setJobForm(prev => ({ ...prev, responsibilities: prev.responsibilities.filter((_, i) => i !== index) }));
  };

  // Download Resume Handler
  const handleDownloadResume = (app: JobApplication) => {
    if (!app.resumeUrl) {
      alert("No resume attachment found for this applicant.");
      return;
    }

    try {
      const link = document.createElement("a");
      link.href = app.resumeUrl;
      link.download = app.resumeFileName || `Resume_${app.candidateName.replace(/\s+/g, "_")}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      // Fallback: Open in new tab
      window.open(app.resumeUrl, "_blank");
    }
  };

  const handleViewResume = (app: JobApplication) => {
    if (!app.resumeUrl) {
      alert("No resume attachment found.");
      return;
    }
    // Open in new tab
    const win = window.open();
    if (win) {
      win.document.write(
        `<iframe src="${app.resumeUrl}" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>`
      );
    } else {
      window.open(app.resumeUrl, "_blank");
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Header & KPI Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-[#181824] p-6 rounded-3xl border border-gray-100 dark:border-white/5 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-brand-primary text-xs font-black uppercase tracking-wider mb-1">
            <Briefcase size={16} />
            <span>Recruitment & Talent Management</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900 dark:text-white">
            Career & Recruitment CMS
          </h1>
          <p className="text-xs text-gray-400 mt-1 font-medium">
            Post and update job circulars, manage candidate submissions, and download PDF resumes.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/careers"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 text-xs font-bold text-gray-700 dark:text-gray-200 hover:bg-gray-50 flex items-center gap-2 transition-all shadow-xs"
          >
            <span>View Public Careers Page</span>
            <ExternalLink size={14} />
          </a>

          <button
            onClick={() => setIsDeptManagerOpen(true)}
            className="px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 text-xs font-bold text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/5 flex items-center gap-2 transition-all shadow-xs cursor-pointer"
          >
            <FolderTree size={14} />
            <span>Manage Departments ({(departments || []).length})</span>
          </button>

          <button
            onClick={handleOpenCreateJob}
            style={{ backgroundColor: primaryColor }}
            className="px-5 py-2.5 rounded-xl text-white text-xs font-bold flex items-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <Plus size={16} />
            <span>Post New Job Opening</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-[#181824] p-5 rounded-2xl border border-gray-100 dark:border-white/5 shadow-xs">
          <div className="text-2xl font-black text-gray-900 dark:text-white">{jobOpenings.length}</div>
          <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mt-1">Total Circulars</div>
        </div>
        <div className="bg-white dark:bg-[#181824] p-5 rounded-2xl border border-gray-100 dark:border-white/5 shadow-xs">
          <div className="text-2xl font-black text-emerald-500">{activeJobsCount}</div>
          <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mt-1">Active Postings</div>
        </div>
        <div className="bg-white dark:bg-[#181824] p-5 rounded-2xl border border-gray-100 dark:border-white/5 shadow-xs">
          <div className="text-2xl font-black text-brand-primary">{jobApplications.length}</div>
          <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mt-1">Total Applicants</div>
        </div>
        <div className="bg-white dark:bg-[#181824] p-5 rounded-2xl border border-gray-100 dark:border-white/5 shadow-xs">
          <div className="text-2xl font-black text-rose-500">{pendingCount}</div>
          <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mt-1">Pending CV Reviews</div>
        </div>
      </div>

      {/* Main Tabs */}
      <div className="flex border-b border-gray-200 dark:border-white/10 gap-8">
        <button
          onClick={() => {
            setActiveTab("postings");
            setStatusFilter("All");
          }}
          className={`pb-4 text-sm font-extrabold transition-all relative ${
            activeTab === "postings"
              ? "text-brand-primary border-b-2 border-brand-primary"
              : "text-gray-400 hover:text-gray-600"
          }`}
        >
          <span>Job Circulars ({jobOpenings.length})</span>
        </button>

        <button
          onClick={() => {
            setActiveTab("applications");
            setStatusFilter("All");
          }}
          className={`pb-4 text-sm font-extrabold transition-all relative flex items-center gap-2 ${
            activeTab === "applications"
              ? "text-brand-primary border-b-2 border-brand-primary"
              : "text-gray-400 hover:text-gray-600"
          }`}
        >
          <span>Candidate Applications ({jobApplications.length})</span>
          {pendingCount > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-black">
              {pendingCount} new
            </span>
          )}
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-[#181824] p-4 rounded-2xl border border-gray-100 dark:border-white/5">
        <div className="relative w-full sm:w-80">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={activeTab === "postings" ? "Search job title, location..." : "Search candidate, email, job..."}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-xs font-medium outline-hidden"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {activeTab === "postings" && (
            <select
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
              className="px-3 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-xs font-bold text-gray-700 dark:text-gray-300 outline-hidden"
            >
              <option value="All">All Departments</option>
              {(departments || []).map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          )}

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-xs font-bold text-gray-700 dark:text-gray-300 outline-hidden"
          >
            <option value="All">All Statuses</option>
            {activeTab === "postings" ? (
              <>
                <option value="Active">Active</option>
                <option value="Closed">Closed</option>
                <option value="Draft">Draft</option>
              </>
            ) : (
              <>
                <option value="Pending">Pending Review</option>
                <option value="Reviewed">Reviewed</option>
                <option value="Shortlisted">Shortlisted</option>
                <option value="Rejected">Rejected</option>
              </>
            )}
          </select>
        </div>
      </div>

      {/* TAB 1: JOB OPENINGS LIST */}
      {activeTab === "postings" && (
        <div className="space-y-4">
          {filteredJobs.length === 0 ? (
            <div className="p-12 text-center bg-white dark:bg-[#181824] rounded-2xl border border-gray-100 dark:border-white/5 text-gray-400">
              <Briefcase size={32} className="mx-auto mb-2 opacity-50" />
              <p className="text-sm font-bold">No job circulars match your search.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredJobs.map((job) => {
                const appCount = (jobApplications || []).filter(a => a.jobId === job.id).length;

                return (
                  <div
                    key={job.id}
                    className="bg-white dark:bg-[#181824] p-6 rounded-2xl border border-gray-100 dark:border-white/5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      {/* Top status & department */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-[10px] font-black uppercase tracking-wider">
                          {job.department}
                        </span>

                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black ${
                          job.status === "Active"
                            ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400"
                            : "bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-gray-400"
                        }`}>
                          {job.status}
                        </span>
                      </div>

                      <h3 className="text-lg font-black text-gray-900 dark:text-white tracking-tight mb-2">
                        {job.title}
                      </h3>

                      <div className="space-y-1 text-xs text-gray-500 dark:text-gray-400 mb-4">
                        <div className="flex items-center gap-2">
                          <MapPin size={13} className="text-gray-400" />
                          <span>{job.location} • {job.type}</span>
                        </div>
                        {job.salary && (
                          <div className="flex items-center gap-2">
                            <DollarSign size={13} className="text-emerald-500" />
                            <span className="font-bold text-gray-700 dark:text-gray-300">{job.salary}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <Calendar size={13} className="text-amber-500" />
                          <span>Deadline: <strong>{job.deadline}</strong></span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users size={13} className="text-brand-primary" />
                          <span><strong>{appCount}</strong> candidate application(s) received</span>
                        </div>
                      </div>

                      <div 
                        className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 prose dark:prose-invert prose-xs mb-4"
                        dangerouslySetInnerHTML={{ __html: job.description }}
                      />
                    </div>

                    {/* Actions */}
                    <div className="pt-4 border-t border-gray-100 dark:border-white/5 flex items-center justify-between gap-2">
                      <button
                        onClick={() => updateJobOpening(job.id, { status: job.status === "Active" ? "Closed" : "Active" })}
                        className="text-xs font-bold text-gray-500 hover:text-brand-primary"
                      >
                        {job.status === "Active" ? "Mark as Closed" : "Re-open Circular"}
                      </button>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => handleOpenEditJob(job)}
                          className="p-2 rounded-xl text-gray-500 hover:text-brand-primary hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                          title="Edit Job"
                        >
                          <Edit2 size={15} />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Delete circular for "${job.title}"?`)) {
                              deleteJobOpening(job.id);
                            }
                          }}
                          className="p-2 rounded-xl text-gray-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                          title="Delete Job"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: CANDIDATE APPLICATIONS (CVS & RESUMES) */}
      {activeTab === "applications" && (
        <div className="space-y-4">
          {filteredApps.length === 0 ? (
            <div className="p-12 text-center bg-white dark:bg-[#181824] rounded-2xl border border-gray-100 dark:border-white/5 text-gray-400">
              <Users size={32} className="mx-auto mb-2 opacity-50" />
              <p className="text-sm font-bold">No candidate applications found.</p>
            </div>
          ) : (
            <div className="bg-white dark:bg-[#181824] rounded-2xl border border-gray-100 dark:border-white/5 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-gray-50 dark:bg-white/5 text-gray-400 uppercase font-black text-[10px] tracking-wider border-b border-gray-100 dark:border-white/5">
                    <tr>
                      <th className="py-3.5 px-4">Candidate</th>
                      <th className="py-3.5 px-4">Position</th>
                      <th className="py-3.5 px-4">Contact</th>
                      <th className="py-3.5 px-4">Resume (PDF)</th>
                      <th className="py-3.5 px-4">Applied Date</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                    {filteredApps.map((app) => (
                      <tr key={app.id} className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors">
                        {/* Candidate */}
                        <td className="py-4 px-4">
                          <div className="font-black text-gray-900 dark:text-white text-sm">
                            {app.candidateName}
                          </div>
                          {app.notes && (
                            <div className="text-[11px] text-brand-primary font-medium truncate max-w-xs mt-0.5">
                              Note: {app.notes}
                            </div>
                          )}
                        </td>

                        {/* Position */}
                        <td className="py-4 px-4 font-bold text-gray-700 dark:text-gray-300">
                          {app.jobTitle}
                        </td>

                        {/* Contact */}
                        <td className="py-4 px-4 text-gray-600 dark:text-gray-400 space-y-1">
                          <div className="flex items-center gap-1.5">
                            <Mail size={12} className="text-gray-400" />
                            <a href={`mailto:${app.email}`} className="hover:underline">{app.email}</a>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Phone size={12} className="text-gray-400" />
                            <a href={`tel:${app.phone}`} className="hover:underline">{app.phone}</a>
                          </div>
                        </td>

                        {/* Resume PDF & Download */}
                        <td className="py-4 px-4">
                          {app.resumeUrl ? (
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleDownloadResume(app)}
                                className="px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 text-xs font-bold hover:bg-emerald-100 flex items-center gap-1.5 shadow-xs transition-all"
                                title="Download PDF to Computer"
                              >
                                <Download size={13} />
                                <span>Download PDF</span>
                              </button>

                              <button
                                onClick={() => handleViewResume(app)}
                                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100"
                                title="Open PDF in new tab"
                              >
                                <ExternalLink size={14} />
                              </button>
                            </div>
                          ) : (
                            <span className="text-gray-400 italic">No File</span>
                          )}
                          <div className="text-[10px] text-gray-400 mt-1 truncate max-w-[140px]">
                            {app.resumeFileName} {app.resumeFileSize && `(${app.resumeFileSize})`}
                          </div>
                        </td>

                        {/* Date */}
                        <td className="py-4 px-4 text-gray-500 font-medium">
                          {app.appliedAt}
                        </td>

                        {/* Status dropdown */}
                        <td className="py-4 px-4">
                          <select
                            value={app.status}
                            onChange={(e) => updateApplicationStatus(app.id, e.target.value as JobApplication["status"])}
                            className={`px-2.5 py-1 rounded-lg text-xs font-bold outline-hidden border ${
                              app.status === "Pending"
                                ? "bg-amber-50 text-amber-700 border-amber-200"
                                : app.status === "Shortlisted"
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                : app.status === "Reviewed"
                                ? "bg-blue-50 text-blue-700 border-blue-200"
                                : "bg-rose-50 text-rose-700 border-rose-200"
                            }`}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Reviewed">Reviewed</option>
                            <option value="Shortlisted">Shortlisted</option>
                            <option value="Rejected">Rejected</option>
                          </select>
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => setSelectedApp(app)}
                              className="p-1.5 rounded-lg text-gray-500 hover:text-brand-primary hover:bg-gray-100 dark:hover:bg-white/10"
                              title="View Candidate Profile & Cover Letter"
                            >
                              <Eye size={15} />
                            </button>

                            <button
                              onClick={() => {
                                if (confirm(`Remove application from ${app.candidateName}?`)) {
                                  deleteJobApplication(app.id);
                                }
                              }}
                              className="p-1.5 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30"
                              title="Delete Application"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* CREATE / EDIT JOB OPENING MODAL */}
      {isJobModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-[#181824] rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-hidden flex flex-col shadow-2xl border border-gray-100 dark:border-white/5">
            {/* Modal Header */}
            <div className="p-6 border-b border-gray-100 dark:border-white/5 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-gray-900 dark:text-white">
                  {editingJob ? "Edit Job Circular" : "Post New Job Circular"}
                </h3>
                <p className="text-xs text-gray-400 font-medium">
                  Fill in the circular details. Use the rich text Word editor for descriptions and requirements.
                </p>
              </div>
              <button
                onClick={() => setIsJobModalOpen(false)}
                className="p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 dark:hover:bg-white/5"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmitJob} className="p-6 overflow-y-auto space-y-6 flex-1 custom-scrollbar">
              
              {/* Row 1: Title & Department */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                    Job Title <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={jobForm.title}
                    onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                    placeholder="e.g. Senior WASH Specialist"
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-xs font-medium outline-hidden"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-bold text-gray-700 dark:text-gray-300">
                      Department
                    </label>
                    <button
                      type="button"
                      onClick={() => setIsAddingDept(!isAddingDept)}
                      className="text-[11px] font-bold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Plus size={13} /> {isAddingDept ? "Choose from list" : "+ Add New Department"}
                    </button>
                  </div>

                  {isAddingDept ? (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        autoFocus
                        placeholder="Type new department name..."
                        value={newDeptInput}
                        onChange={(e) => setNewDeptInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleAddNewDept();
                          }
                        }}
                        className="flex-1 px-3 py-2 bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-500 rounded-xl text-xs font-semibold outline-hidden text-emerald-900 dark:text-emerald-200"
                      />
                      <button
                        type="button"
                        onClick={handleAddNewDept}
                        className="px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-xs cursor-pointer"
                      >
                        <Check size={14} /> Add
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setIsAddingDept(false);
                          setNewDeptInput("");
                        }}
                        className="px-2.5 py-2 bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-400 rounded-xl text-xs font-bold hover:bg-gray-200 cursor-pointer"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <select
                      value={jobForm.department}
                      onChange={(e) => {
                        if (e.target.value === "__NEW__") {
                          setIsAddingDept(true);
                        } else {
                          setJobForm({ ...jobForm, department: e.target.value });
                        }
                      }}
                      className="w-full px-4 py-2.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-xs font-bold text-gray-700 dark:text-gray-300 outline-hidden"
                    >
                      {(departments || []).map((d) => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                      <option value="__NEW__" className="text-emerald-600 font-extrabold">
                        + Add Custom Department...
                      </option>
                    </select>
                  )}
                </div>
              </div>

              {/* Row 2: Location, Type, Deadline */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                    Location
                  </label>
                  <input
                    type="text"
                    value={jobForm.location}
                    onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })}
                    placeholder="e.g. Dhaka Head Office"
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-xs font-medium outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                    Job Type
                  </label>
                  <select
                    value={jobForm.type}
                    onChange={(e) => setJobForm({ ...jobForm, type: e.target.value as any })}
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-xs font-bold text-gray-700 dark:text-gray-300 outline-hidden"
                  >
                    <option value="Full-Time">Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                    Application Deadline
                  </label>
                  <input
                    type="date"
                    value={jobForm.deadline}
                    onChange={(e) => setJobForm({ ...jobForm, deadline: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-xs font-medium outline-hidden"
                  />
                </div>
              </div>

              {/* Row 3: Salary, Experience, Status */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                    Salary Range (Optional)
                  </label>
                  <input
                    type="text"
                    value={jobForm.salary}
                    onChange={(e) => setJobForm({ ...jobForm, salary: e.target.value })}
                    placeholder="e.g. BDT 50,000 - 65,000"
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-xs font-medium outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                    Experience Required
                  </label>
                  <input
                    type="text"
                    value={jobForm.experience}
                    onChange={(e) => setJobForm({ ...jobForm, experience: e.target.value })}
                    placeholder="e.g. 3+ Years in NGO sector"
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-xs font-medium outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                    Publication Status
                  </label>
                  <select
                    value={jobForm.status}
                    onChange={(e) => setJobForm({ ...jobForm, status: e.target.value as any })}
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-xs font-bold text-gray-700 dark:text-gray-300 outline-hidden"
                  >
                    <option value="Active">Active (Visible)</option>
                    <option value="Closed">Closed (Hidden)</option>
                    <option value="Draft">Draft</option>
                  </select>
                </div>
              </div>

              {/* RICH TEXT WORD-STYLE EDITOR FOR DESCRIPTION */}
              <div>
                <RichTextEditor
                  label="Detailed Role Description & Context"
                  value={jobForm.description}
                  onChange={(html) => setJobForm({ ...jobForm, description: html })}
                  placeholder="Describe the main responsibilities, goals, and working environment for this role..."
                  minHeight="180px"
                />
              </div>

              {/* Responsibilities list */}
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                  Key Responsibilities
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newResp}
                    onChange={(e) => setNewResp(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddResponsibility();
                      }
                    }}
                    placeholder="Add a key responsibility and press enter..."
                    className="flex-1 px-4 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-xs font-medium outline-hidden"
                  />
                  <button
                    type="button"
                    onClick={handleAddResponsibility}
                    className="px-4 py-2 bg-gray-100 dark:bg-white/10 hover:bg-gray-200 text-xs font-bold rounded-xl"
                  >
                    Add
                  </button>
                </div>

                <div className="space-y-1.5 max-h-32 overflow-y-auto">
                  {jobForm.responsibilities.map((resp, i) => (
                    <div key={i} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-white/5 rounded-lg text-xs">
                      <span>• {resp}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveResponsibility(i)}
                        className="text-gray-400 hover:text-rose-500"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Requirements list */}
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                  Candidate Requirements & Qualifications
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newReq}
                    onChange={(e) => setNewReq(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddRequirement();
                      }
                    }}
                    placeholder="Add a requirement bullet point and press enter..."
                    className="flex-1 px-4 py-2 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-xs font-medium outline-hidden"
                  />
                  <button
                    type="button"
                    onClick={handleAddRequirement}
                    className="px-4 py-2 bg-gray-100 dark:bg-white/10 hover:bg-gray-200 text-xs font-bold rounded-xl"
                  >
                    Add
                  </button>
                </div>

                <div className="space-y-1.5 max-h-32 overflow-y-auto">
                  {jobForm.requirements.map((req, i) => (
                    <div key={i} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-white/5 rounded-lg text-xs">
                      <span>• {req}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveRequirement(i)}
                        className="text-gray-400 hover:text-rose-500"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-gray-100 dark:border-white/5 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsJobModalOpen(false)}
                  className="px-5 py-2.5 text-xs font-bold text-gray-500 hover:text-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ backgroundColor: primaryColor }}
                  className="px-6 py-2.5 rounded-xl text-white text-xs font-black shadow-md hover:shadow-lg transition-all"
                >
                  {editingJob ? "Save Changes" : "Publish Job Circular"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* APPLICANT PROFILE PREVIEW MODAL */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white dark:bg-[#181824] rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-gray-100 dark:border-white/5 space-y-6">
            <div className="flex items-start justify-between border-b border-gray-100 dark:border-white/5 pb-4">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-brand-primary">Candidate Dossier</span>
                <h3 className="text-2xl font-black text-gray-900 dark:text-white mt-1">
                  {selectedApp.candidateName}
                </h3>
                <p className="text-xs text-gray-500 font-medium">Applied for: {selectedApp.jobTitle}</p>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                className="p-2 rounded-xl text-gray-400 hover:text-gray-700"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-white/5 rounded-2xl">
                <div>
                  <span className="text-gray-400 font-bold uppercase text-[10px]">Email</span>
                  <div className="font-bold text-gray-900 dark:text-white mt-0.5">{selectedApp.email}</div>
                </div>
                <div>
                  <span className="text-gray-400 font-bold uppercase text-[10px]">Phone Number</span>
                  <div className="font-bold text-gray-900 dark:text-white mt-0.5">{selectedApp.phone}</div>
                </div>
                <div>
                  <span className="text-gray-400 font-bold uppercase text-[10px]">Date Applied</span>
                  <div className="font-medium text-gray-700 dark:text-gray-300 mt-0.5">{selectedApp.appliedAt}</div>
                </div>
                <div>
                  <span className="text-gray-400 font-bold uppercase text-[10px]">Review Status</span>
                  <div className="mt-0.5">
                    <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-bold">
                      {selectedApp.status}
                    </span>
                  </div>
                </div>
              </div>

              {selectedApp.coverLetter && (
                <div>
                  <span className="text-gray-400 font-bold uppercase text-[10px] block mb-1">
                    Statement of Interest / Cover Letter
                  </span>
                  <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-2xl text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
                    {selectedApp.coverLetter}
                  </div>
                </div>
              )}

              {/* Resume Attachment Card */}
              <div className="p-4 bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/40 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0">
                    <FileText size={20} />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 dark:text-white text-xs truncate max-w-[200px]">
                      {selectedApp.resumeFileName || "Candidate_Resume.pdf"}
                    </div>
                    <div className="text-[10px] text-blue-600 font-bold">
                      {selectedApp.resumeFileSize || "PDF Document"} • Attached
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleDownloadResume(selectedApp)}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs flex items-center gap-2 shadow-sm transition-all"
                >
                  <Download size={13} />
                  <span>Download PDF</span>
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
              <button
                onClick={() => setSelectedApp(null)}
                className="px-5 py-2 text-xs font-bold text-gray-500"
              >
                Close
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    updateApplicationStatus(selectedApp.id, "Shortlisted");
                    setSelectedApp({ ...selectedApp, status: "Shortlisted" });
                  }}
                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs"
                >
                  Mark as Shortlisted
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Manage Departments Modal */}
      {isDeptManagerOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-[#181824] rounded-3xl border border-gray-100 dark:border-white/10 shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-200">
            <div className="p-5 border-b border-gray-100 dark:border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-primary/10 text-brand-primary flex items-center justify-center">
                  <FolderTree size={20} />
                </div>
                <div>
                  <h3 className="text-base font-black text-gray-900 dark:text-white">
                    Manage Departments
                  </h3>
                  <p className="text-xs text-gray-400">
                    Add, view, or remove departments across job vacancies and site filters
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsDeptManagerOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/10 text-gray-500 hover:text-gray-700 dark:hover:text-white flex items-center justify-center cursor-pointer transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <div className="p-5 flex-1 overflow-y-auto space-y-4">
              {/* Add New Department Input Box */}
              <div className="bg-gray-50 dark:bg-white/5 p-3.5 rounded-2xl border border-gray-200 dark:border-white/10">
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-2">
                  Add New Department
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. Legal & Compliance, Disaster Risk Reduction"
                    value={managerNewDept}
                    onChange={(e) => setManagerNewDept(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleManagerAddDept();
                      }
                    }}
                    className="flex-1 px-3.5 py-2.5 bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl text-xs font-medium outline-hidden"
                  />
                  <button
                    type="button"
                    onClick={handleManagerAddDept}
                    style={{ backgroundColor: primaryColor }}
                    className="px-4 py-2.5 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer hover:opacity-95 transition-all"
                  >
                    <Plus size={14} /> Add
                  </button>
                </div>
              </div>

              {/* Departments List */}
              <div>
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2.5 flex items-center justify-between">
                  <span>Registered Departments ({(departments || []).length})</span>
                  <span className="text-[11px] font-normal text-gray-400">Linked Circulars</span>
                </div>

                <div className="space-y-2">
                  {(departments || []).map((dept) => {
                    const jobsCount = (jobOpenings || []).filter(j => j.department === dept).length;
                    return (
                      <div
                        key={dept}
                        className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/5 hover:border-gray-200 dark:hover:border-white/10 transition-all"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="w-2 h-2 rounded-full bg-brand-primary" />
                          <span className="text-xs font-bold text-gray-800 dark:text-gray-200">
                            {dept}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300">
                            {jobsCount} {jobsCount === 1 ? "job" : "jobs"}
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              if (jobsCount > 0) {
                                alert(`Cannot delete "${dept}" because ${jobsCount} job circular(s) currently belong to it. Please reassign or delete those jobs first.`);
                                return;
                              }
                              deleteDepartment(dept);
                            }}
                            title={jobsCount > 0 ? "Reassign jobs before deleting" : "Delete department"}
                            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                              jobsCount > 0 
                                ? "text-gray-300 dark:text-gray-600 cursor-not-allowed" 
                                : "text-gray-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30"
                            }`}
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-gray-100 dark:border-white/5 flex justify-end">
              <button
                type="button"
                onClick={() => setIsDeptManagerOpen(false)}
                className="px-5 py-2.5 bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300 rounded-xl text-xs font-bold cursor-pointer hover:bg-gray-200 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
