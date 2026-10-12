"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  DollarSign, 
  CheckCircle2, 
  UploadCloud, 
  FileText, 
  X, 
  Search, 
  ChevronRight, 
  Filter, 
  Send, 
  AlertCircle,
  Building,
  Calendar,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { useContent, JobOpening } from "@/context/ContentContext";

export default function CareersPage() {
  const { jobOpenings, departments: availableDepartments, submitJobApplication, primaryColor } = useContent();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("All");
  const [selectedType, setSelectedType] = useState("All");

  // Modals state
  const [activeJobForDetails, setActiveJobForDetails] = useState<JobOpening | null>(null);
  const [activeJobForApply, setActiveJobForApply] = useState<JobOpening | null>(null);

  // Application Form State
  const [candidateName, setCandidateName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [resumeFile, setResumeFile] = useState<{
    dataUrl: string;
    fileName: string;
    fileSize: string;
  } | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formError, setFormError] = useState("");

  // Filter available departments
  const departments = ["All", ...Array.from(new Set([...(availableDepartments || []), ...(jobOpenings || []).map(j => j.department)]))];

  const filteredJobs = (jobOpenings || []).filter(job => {
    if (job.status === "Closed") return false;
    const matchesSearch = 
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.department.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDept = selectedDepartment === "All" || job.department === selectedDepartment;
    const matchesType = selectedType === "All" || job.type === selectedType;
    return matchesSearch && matchesDept && matchesType;
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormError("");
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      setFormError("Please select a valid PDF file for your resume.");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setFormError("Resume file size must be less than 10 MB.");
      return;
    }

    const sizeFormatted = file.size > 1024 * 1024 
      ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
      : `${Math.round(file.size / 1024)} KB`;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        setResumeFile({
          dataUrl: event.target.result as string,
          fileName: file.name,
          fileSize: sizeFormatted
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleOpenApplyModal = (job: JobOpening) => {
    setActiveJobForApply(job);
    setFormError("");
    setIsSuccess(false);
    setCandidateName("");
    setEmail("");
    setPhone("");
    setCoverLetter("");
    setResumeFile(null);
  };

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");

    if (!candidateName.trim()) {
      setFormError("Please enter your full name.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setFormError("Please enter a valid email address.");
      return;
    }
    if (!phone.trim()) {
      setFormError("Please enter your contact phone number.");
      return;
    }
    if (!resumeFile) {
      setFormError("Please upload your PDF resume/CV before submitting.");
      return;
    }

    if (!activeJobForApply) return;

    setIsSubmitting(true);
    try {
      await submitJobApplication({
        jobId: activeJobForApply.id,
        jobTitle: activeJobForApply.title,
        candidateName,
        email,
        phone,
        coverLetter,
        resumeUrl: resumeFile.dataUrl,
        resumeFileName: resumeFile.fileName,
        resumeFileSize: resumeFile.fileSize
      });

      setIsSubmitting(false);
      setIsSuccess(true);
    } catch (err) {
      setIsSubmitting(false);
      setFormError("An error occurred while submitting. Please try again.");
    }
  };

  return (
    <div className="bg-[#FDFDFD] min-h-screen font-sans">
      {/* Hero Header Banner */}
      <section className="bg-gradient-to-b from-brand-primary/5 via-white to-[#FDFDFD] pt-32 pb-20 border-b border-gray-100">
        <div className="container-custom">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-black uppercase tracking-wider mb-6">
              <Sparkles size={14} />
              <span>Career Opportunities at VERC</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tight leading-[1.05] mb-6">
              Join Our Mission. <br />
              <span className="text-brand-primary">Shape Bangladesh.</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 font-medium leading-relaxed mb-8">
              Join over 2,000 passionate development professionals, engineers, and community organizers dedicated to sustainable grassroots transformation, climate resilience, and economic self-reliance.
            </p>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-6 pt-4 border-t border-gray-200/80 max-w-lg">
              <div>
                <div className="text-2xl md:text-3xl font-black text-gray-900">45+</div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Years of Impact</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-black text-brand-primary">2,000+</div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Dedicated Staff</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-black text-gray-900">64</div>
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Districts Reached</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="py-8 bg-white border-b border-gray-100 sticky top-24 z-30 shadow-xs">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            
            {/* Search Input */}
            <div className="relative w-full lg:w-96">
              <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search job title, location, skill..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-hidden"
              />
            </div>

            {/* Department Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto custom-scrollbar pb-1 lg:pb-0">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1 flex-shrink-0">
                <Filter size={12} /> Filter:
              </span>
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDepartment(dept)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                    selectedDepartment === dept
                      ? "bg-brand-primary text-white shadow-xs"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>

            {/* Type Filter */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-700 outline-hidden w-full sm:w-auto"
            >
              <option value="All">All Job Types</option>
              <option value="Full-Time">Full-Time</option>
              <option value="Part-Time">Part-Time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>
          </div>
        </div>
      </section>

      {/* Main Job Listings */}
      <section className="py-16">
        <div className="container-custom">
          
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-black text-gray-900 tracking-tight">
                Current Openings ({filteredJobs.length})
              </h2>
              <p className="text-sm font-medium text-gray-500">
                Explore open positions and submit your CV directly to our HR team.
              </p>
            </div>
          </div>

          {filteredJobs.length === 0 ? (
            <div className="bg-white rounded-3xl border border-gray-200 p-16 text-center max-w-xl mx-auto shadow-xs">
              <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4 text-gray-400">
                <Briefcase size={28} />
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-2">No Matching Positions Found</h3>
              <p className="text-sm text-gray-500 mb-6">
                Try adjusting your search criteria or filter by another department. You can also submit your CV for general future opportunities below.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedDepartment("All");
                  setSelectedType("All");
                }}
                className="px-5 py-2.5 bg-brand-primary text-white text-xs font-bold rounded-xl"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredJobs.map((job) => (
                <div 
                  key={job.id}
                  className="bg-white rounded-3xl border border-gray-100 p-7 shadow-[0_15px_35px_rgba(0,0,0,0.03)] hover:shadow-xl hover:border-brand-primary/20 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Tags row */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-[11px] font-extrabold uppercase tracking-wide">
                        {job.department}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-md bg-gray-100 text-gray-700 text-[11px] font-bold">
                        {job.type}
                      </span>
                    </div>

                    {/* Job Title */}
                    <h3 className="text-xl font-black text-gray-900 group-hover:text-brand-primary transition-colors tracking-tight mb-3">
                      {job.title}
                    </h3>

                    {/* Meta info */}
                    <div className="space-y-1.5 mb-5 text-xs text-gray-500 font-medium">
                      <div className="flex items-center gap-2">
                        <MapPin size={14} className="text-gray-400 flex-shrink-0" />
                        <span>{job.location}</span>
                      </div>
                      {job.salary && (
                        <div className="flex items-center gap-2">
                          <DollarSign size={14} className="text-emerald-500 flex-shrink-0" />
                          <span className="font-bold text-gray-700">{job.salary}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <Clock size={14} className="text-amber-500 flex-shrink-0" />
                        <span>Application Deadline: <strong className="text-gray-700">{job.deadline}</strong></span>
                      </div>
                    </div>

                    {/* Description preview */}
                    <div 
                      className="text-xs text-gray-600 line-clamp-3 mb-6 leading-relaxed prose prose-xs"
                      dangerouslySetInnerHTML={{ __html: job.description }}
                    />
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-3">
                    <button
                      onClick={() => setActiveJobForDetails(job)}
                      className="text-xs font-bold text-gray-600 hover:text-brand-primary flex items-center gap-1 transition-colors"
                    >
                      <span>View Details & Requirements</span>
                      <ChevronRight size={14} />
                    </button>

                    <button
                      onClick={() => handleOpenApplyModal(job)}
                      className="px-5 py-2.5 rounded-xl bg-brand-primary hover:bg-brand-primary/90 text-white text-xs font-black tracking-wide shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                    >
                      <span>Apply Now</span>
                      <Send size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Talent Pool Banner / Spontaneous Application */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight">
              Don't See the Exact Role You're Looking For?
            </h2>
            <p className="text-base md:text-lg text-gray-400 font-medium max-w-2xl mx-auto leading-relaxed">
              We are constantly seeking brilliant minds across water engineering, microfinance administration, community public health, and child education. Join our roster for upcoming project expansions.
            </p>
            <div className="pt-4">
              <a
                href="mailto:jobs@vercbd.org?subject=Spontaneous%20Application%20-%20VERC%20Talent%20Pool"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white text-gray-900 font-black text-sm hover:bg-gray-100 transition-all shadow-xl"
              >
                <span>Send CV to jobs@vercbd.org</span>
                <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* JOB DETAILS MODAL */}
      <AnimatePresence>
        {activeJobForDetails && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-gray-100 flex items-start justify-between bg-gray-50/50">
                <div>
                  <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-[10px] font-extrabold uppercase tracking-wide">
                    {activeJobForDetails.department} • {activeJobForDetails.type}
                  </span>
                  <h3 className="text-2xl font-black text-gray-900 mt-2 tracking-tight">
                    {activeJobForDetails.title}
                  </h3>
                  <div className="flex flex-wrap gap-4 mt-2 text-xs text-gray-500">
                    <span className="flex items-center gap-1"><MapPin size={13} /> {activeJobForDetails.location}</span>
                    {activeJobForDetails.salary && <span className="flex items-center gap-1 font-bold text-emerald-600"><DollarSign size={13} /> {activeJobForDetails.salary}</span>}
                    <span className="flex items-center gap-1 text-amber-600"><Clock size={13} /> Deadline: {activeJobForDetails.deadline}</span>
                  </div>
                </div>
                <button
                  onClick={() => setActiveJobForDetails(null)}
                  className="p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Scrollable Content */}
              <div className="p-6 overflow-y-auto space-y-6 flex-1 custom-scrollbar text-sm text-gray-700">
                
                {/* Description */}
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider text-gray-400 mb-2">Role Overview</h4>
                  <div 
                    className="prose prose-sm max-w-none text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: activeJobForDetails.description }}
                  />
                </div>

                {/* Responsibilities */}
                {activeJobForDetails.responsibilities && activeJobForDetails.responsibilities.length > 0 && (
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-wider text-gray-400 mb-3">Key Responsibilities</h4>
                    <ul className="space-y-2">
                      {activeJobForDetails.responsibilities.map((resp, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs font-medium text-gray-700">
                          <CheckCircle2 size={14} className="text-brand-primary flex-shrink-0 mt-0.5" />
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Requirements */}
                {activeJobForDetails.requirements && activeJobForDetails.requirements.length > 0 && (
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-wider text-gray-400 mb-3">Candidate Requirements & Qualifications</h4>
                    <ul className="space-y-2">
                      {activeJobForDetails.requirements.map((req, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs font-medium text-gray-700">
                          <CheckCircle2 size={14} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-5 border-t border-gray-100 flex items-center justify-between bg-gray-50">
                <button
                  onClick={() => setActiveJobForDetails(null)}
                  className="px-5 py-2 text-xs font-bold text-gray-600 hover:text-gray-900"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const job = activeJobForDetails;
                    setActiveJobForDetails(null);
                    handleOpenApplyModal(job);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-brand-primary text-white text-xs font-black tracking-wide shadow-md hover:shadow-lg transition-all"
                >
                  Proceed to Application
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* JOB APPLICATION MODAL WITH PDF RESUME UPLOADER */}
      <AnimatePresence>
        {activeJobForApply && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-xl w-full max-h-[92vh] overflow-hidden flex flex-col shadow-2xl"
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-100 flex items-start justify-between bg-brand-primary/5">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-brand-primary">
                    Job Application Portal
                  </span>
                  <h3 className="text-2xl font-black text-gray-900 mt-1 tracking-tight">
                    {activeJobForApply.title}
                  </h3>
                  <p className="text-xs text-gray-500 font-medium">
                    Department: {activeJobForApply.department} • Location: {activeJobForApply.location}
                  </p>
                </div>
                <button
                  onClick={() => setActiveJobForApply(null)}
                  className="p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Form Content */}
              {isSuccess ? (
                <div className="p-10 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 size={32} />
                  </div>
                  <h4 className="text-2xl font-black text-gray-900 tracking-tight">
                    Application Submitted!
                  </h4>
                  <p className="text-sm text-gray-600 max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-gray-900">{candidateName}</strong>. We have received your application and resume for <strong>{activeJobForApply.title}</strong>. Our human resources team will review your qualifications and reach out if you are shortlisted for an interview.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={() => setActiveJobForApply(null)}
                      className="px-6 py-2.5 bg-brand-primary text-white rounded-xl text-xs font-black shadow-md"
                    >
                      Done
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmitApplication} className="p-6 overflow-y-auto space-y-5 flex-1 custom-scrollbar">
                  
                  {formError && (
                    <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs font-bold text-rose-600 flex items-center gap-2">
                      <AlertCircle size={16} className="flex-shrink-0" />
                      <span>{formError}</span>
                    </div>
                  )}

                  {/* Candidate Name */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={candidateName}
                      onChange={(e) => setCandidateName(e.target.value)}
                      placeholder="e.g. Md. Tariqul Islam"
                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-hidden"
                    />
                  </div>

                  {/* Email & Phone Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">
                        Email Address <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@domain.com"
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">
                        Phone Number <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+880 17XX-XXXXXX"
                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-hidden"
                      />
                    </div>
                  </div>

                  {/* Statement of Interest / Cover Letter */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">
                      Brief Statement / Cover Note (Optional)
                    </label>
                    <textarea
                      rows={3}
                      value={coverLetter}
                      onChange={(e) => setCoverLetter(e.target.value)}
                      placeholder="Summarize your relevant background and why you are interested in this position with VERC..."
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary outline-hidden"
                    />
                  </div>

                  {/* PDF RESUME UPLOAD SECTION */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">
                      Upload Resume / Curriculum Vitae (PDF) <span className="text-rose-500">*</span>
                    </label>

                    {resumeFile ? (
                      <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-2xl flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 shadow-xs">
                            <FileText size={20} />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-gray-900 truncate max-w-[220px] sm:max-w-xs">
                              {resumeFile.fileName}
                            </div>
                            <div className="text-[10px] text-emerald-700 font-bold flex items-center gap-1.5 mt-0.5">
                              <span>{resumeFile.fileSize}</span>
                              <span>•</span>
                              <span>PDF Ready for Submission</span>
                            </div>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => setResumeFile(null)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                          title="Remove file"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <label className="border-2 border-dashed border-gray-300 hover:border-brand-primary rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors bg-gray-50 hover:bg-brand-primary/5 group">
                        <UploadCloud size={32} className="text-gray-400 group-hover:text-brand-primary mb-2 transition-colors" />
                        <span className="text-xs font-bold text-gray-700 group-hover:text-brand-primary">
                          Click to select your PDF resume
                        </span>
                        <span className="text-[10px] text-gray-400 mt-1">
                          Accepts PDF files only (Up to 10 MB)
                        </span>
                        <input
                          type="file"
                          accept=".pdf,application/pdf"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>

                  {/* Submission Notice */}
                  <div className="text-[11px] text-gray-400 leading-relaxed">
                    By submitting this form, you certify that the information provided is true and complete. VERC provides equal employment opportunities to all candidates regardless of gender, religion, or background.
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 bg-brand-primary hover:bg-brand-primary/95 text-white text-xs font-black tracking-wide rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>Processing Application...</span>
                      ) : (
                        <>
                          <span>Submit My Application</span>
                          <Send size={14} />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
