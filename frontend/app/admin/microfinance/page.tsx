"use client";

import React, { useState } from "react";
import { 
  Plus, 
  Edit2, 
  Trash2, 
  CreditCard, 
  Check, 
  Banknote, 
  ShieldCheck, 
  ArrowRight, 
  X,
  ListOrdered,
  FileCheck2,
  ExternalLink,
  Eye,
  Clock,
  ChevronRight
} from "lucide-react";
import { useContent, MicrofinanceProduct, MicrofinanceProcessStep } from "@/context/ContentContext";
import { ImageUploadField } from "@/components/admin/ImageUploadField";
import { RichTextEditor } from "@/components/admin/RichTextEditor";

export default function AdminMicrofinancePage() {
  const { 
    microfinanceProducts, 
    addMicrofinanceProduct, 
    updateMicrofinanceProduct, 
    deleteMicrofinanceProduct, 
    microfinanceProcess,
    updateMicrofinanceProcess,
    primaryColor, 
    theme 
  } = useContent();

  const [activeTab, setActiveTab] = useState<"products" | "process">("products");

  // Product Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<MicrofinanceProduct | null>(null);

  const [formData, setFormData] = useState<Omit<MicrofinanceProduct, "id">>({
    title: "",
    category: "Core Microcredit",
    loanLimit: "Tk. 10,000 – 1,00,000",
    interestRate: "Declining Balance (MRA Approved)",
    tenure: "12 Months",
    description: "",
    eligibility: [],
    features: [],
    imageUrl: "/assets/microfinance_hero.png"
  });

  const [eligibilityInput, setEligibilityInput] = useState("");
  const [featuresInput, setFeaturesInput] = useState("");

  // Process Steps Modal State
  const [isStepModalOpen, setIsStepModalOpen] = useState(false);
  const [editingStep, setEditingStep] = useState<MicrofinanceProcessStep | null>(null);
  const [stepForm, setStepForm] = useState<Omit<MicrofinanceProcessStep, "id">>({
    stepNumber: 1,
    title: "",
    desc: "",
    duration: "1-2 Weeks",
    requirements: []
  });
  const [stepReqsInput, setStepReqsInput] = useState("");

  // Eligibility & Documents editing
  const [eligibilityListInput, setEligibilityListInput] = useState(
    (microfinanceProcess?.eligibilityCriteria || []).join("\n")
  );
  const [documentsListInput, setDocumentsListInput] = useState(
    (microfinanceProcess?.requiredDocuments || []).join("\n")
  );
  const [isProcessSaved, setIsProcessSaved] = useState(false);

  // Open Product Modals
  const openCreateModal = () => {
    setEditingProduct(null);
    setFormData({
      title: "",
      category: "Core Microcredit",
      loanLimit: "Tk. 20,000 – 1,00,000",
      interestRate: "Declining Balance",
      tenure: "12 Months",
      description: "",
      eligibility: ["Permanent resident of operational area", "Age between 18 and 60"],
      features: ["No collateral required", "Weekly repayment"],
      imageUrl: "/assets/microfinance_hero.png"
    });
    setEligibilityInput("Permanent resident of operational area\nAge between 18 and 60");
    setFeaturesInput("No collateral required\nWeekly repayment");
    setIsModalOpen(true);
  };

  const openEditModal = (prod: MicrofinanceProduct) => {
    setEditingProduct(prod);
    setFormData({
      title: prod.title,
      category: prod.category,
      loanLimit: prod.loanLimit,
      interestRate: prod.interestRate,
      tenure: prod.tenure,
      description: prod.description,
      eligibility: prod.eligibility || [],
      features: prod.features || [],
      imageUrl: prod.imageUrl || "/assets/microfinance_hero.png"
    });
    setEligibilityInput((prod.eligibility || []).join("\n"));
    setFeaturesInput((prod.features || []).join("\n"));
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEligibility = eligibilityInput.split("\n").map(s => s.trim()).filter(s => s.length > 0);
    const cleanFeatures = featuresInput.split("\n").map(s => s.trim()).filter(s => s.length > 0);

    const payload = {
      ...formData,
      eligibility: cleanEligibility,
      features: cleanFeatures
    };

    if (editingProduct) {
      updateMicrofinanceProduct(editingProduct.id, payload);
    } else {
      addMicrofinanceProduct(payload);
    }
    setIsModalOpen(false);
  };

  // Step Modals
  const openCreateStepModal = () => {
    setEditingStep(null);
    setStepForm({
      stepNumber: (microfinanceProcess?.steps?.length || 0) + 1,
      title: "",
      desc: "",
      duration: "1-2 Weeks",
      requirements: []
    });
    setStepReqsInput("");
    setIsStepModalOpen(true);
  };

  const openEditStepModal = (step: MicrofinanceProcessStep) => {
    setEditingStep(step);
    setStepForm({
      stepNumber: step.stepNumber,
      title: step.title,
      desc: step.desc,
      duration: step.duration || "1-2 Weeks",
      requirements: step.requirements || []
    });
    setStepReqsInput((step.requirements || []).join("\n"));
    setIsStepModalOpen(true);
  };

  const handleSubmitStep = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanReqs = stepReqsInput.split("\n").map(s => s.trim()).filter(s => s.length > 0);
    const currentSteps = microfinanceProcess?.steps || [];

    let updatedSteps: MicrofinanceProcessStep[];
    if (editingStep) {
      updatedSteps = currentSteps.map(s => s.id === editingStep.id ? { ...s, ...stepForm, requirements: cleanReqs } : s);
    } else {
      updatedSteps = [
        ...currentSteps,
        { ...stepForm, requirements: cleanReqs, id: `mf-step-${Date.now()}` }
      ];
    }

    updateMicrofinanceProcess({ steps: updatedSteps });
    setIsStepModalOpen(false);
  };

  const handleDeleteStep = (stepId: string) => {
    if (!confirm("Are you sure you want to delete this process step?")) return;
    const currentSteps = microfinanceProcess?.steps || [];
    const updated = currentSteps.filter(s => s.id !== stepId);
    updateMicrofinanceProcess({ steps: updated });
  };

  const handleSaveProcessCriteria = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanElig = eligibilityListInput.split("\n").map(s => s.trim()).filter(s => s.length > 0);
    const cleanDocs = documentsListInput.split("\n").map(s => s.trim()).filter(s => s.length > 0);

    updateMicrofinanceProcess({
      eligibilityCriteria: cleanElig,
      requiredDocuments: cleanDocs
    });

    setIsProcessSaved(true);
    setTimeout(() => setIsProcessSaved(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto font-valley font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400">
            <span>Programs & Financial Inclusion</span>
            <span>/</span>
            <span style={{ color: primaryColor }}>Microfinance</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white mt-1">
            Microfinance & Inclusive Credit
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Manage revolving loan packages, MRA terms, application steps, and enrollment criteria.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="/microfinance/process"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300 transition-all flex items-center gap-1.5"
          >
            <Eye size={13} /> View Process Page <ExternalLink size={11} />
          </a>
          <a
            href="/programs/microfinance"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300 transition-all flex items-center gap-1.5"
          >
            <CreditCard size={13} /> View Program Page <ExternalLink size={11} />
          </a>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-200 dark:border-white/10 pb-1">
        <button
          onClick={() => setActiveTab("products")}
          style={activeTab === "products" ? { borderBottomColor: primaryColor, color: primaryColor } : {}}
          className={`flex items-center gap-2 px-4 py-3 text-xs font-bold border-b-2 transition-all cursor-pointer ${
            activeTab === "products"
              ? "border-b-2 font-black"
              : "border-b-2 border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-white"
          }`}
        >
          <CreditCard size={15} />
          <span>Loan Products</span>
          <span 
            className="px-1.5 py-0.5 rounded-full text-[10px] font-bold"
            style={{ 
              backgroundColor: activeTab === "products" ? `${primaryColor}20` : theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.06)",
              color: activeTab === "products" ? primaryColor : "inherit"
            }}
          >
            {microfinanceProducts.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab("process")}
          style={activeTab === "process" ? { borderBottomColor: primaryColor, color: primaryColor } : {}}
          className={`flex items-center gap-2 px-4 py-3 text-xs font-bold border-b-2 transition-all cursor-pointer ${
            activeTab === "process"
              ? "border-b-2 font-black"
              : "border-b-2 border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-white"
          }`}
        >
          <ListOrdered size={15} />
          <span>Application Process & Criteria</span>
          <span 
            className="px-1.5 py-0.5 rounded-full text-[10px] font-bold"
            style={{ 
              backgroundColor: activeTab === "process" ? `${primaryColor}20` : theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.06)",
              color: activeTab === "process" ? primaryColor : "inherit"
            }}
          >
            {microfinanceProcess?.steps?.length || 0} Steps
          </span>
        </button>
      </div>

      {/* TAB 1: LOAN PRODUCTS */}
      {activeTab === "products" && (
        <div className="space-y-4">
          <div className="flex justify-end">
            <button
              onClick={openCreateModal}
              style={{ backgroundColor: primaryColor }}
              className="px-4 py-2 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-2 cursor-pointer hover:opacity-95"
            >
              <Plus size={15} /> Add Loan Product
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {microfinanceProducts.map((prod) => (
              <div
                key={prod.id}
                className={`rounded-2xl border overflow-hidden transition-all flex flex-col justify-between ${
                  theme === "dark" ? "bg-[#181824] border-white/5 shadow-xs" : "bg-white border-gray-200 shadow-2xs"
                }`}
              >
                <div className="h-1.5 w-full" style={{ backgroundColor: primaryColor }}></div>

                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span
                      style={{ color: primaryColor, backgroundColor: `${primaryColor}15` }}
                      className="px-2.5 py-1 rounded-full text-xs font-semibold"
                    >
                      {prod.category}
                    </span>
                    <span className="text-xs font-bold" style={{ color: primaryColor }}>
                      {prod.tenure}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-gray-900 dark:text-white">
                      {prod.title}
                    </h3>
                    <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2 mt-1 leading-relaxed">
                      {prod.description}
                    </p>
                  </div>

                  {/* Terms */}
                  <div className="p-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 space-y-1.5 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 dark:text-gray-400">Loan Limit</span>
                      <span className="font-bold text-gray-900 dark:text-white">{prod.loanLimit}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500 dark:text-gray-400">Interest / Service</span>
                      <span className="font-bold text-emerald-600">{prod.interestRate}</span>
                    </div>
                  </div>

                  {/* Highlights */}
                  {prod.features && prod.features.length > 0 && (
                    <div className="space-y-1 pt-1">
                      {prod.features.slice(0, 2).map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-[11px] text-gray-600 dark:text-gray-400">
                          <Check size={12} className="text-emerald-500 flex-shrink-0" />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="px-5 py-3 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-gray-400">
                    {prod.eligibility?.length || 0} Eligibility Rules
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => openEditModal(prod)}
                      className="p-1.5 rounded-lg text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-white/5 transition-all"
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Are you sure you want to delete "${prod.title}"?`)) {
                          deleteMicrofinanceProduct(prod.id);
                        }
                      }}
                      className="p-1.5 rounded-lg text-gray-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-white/5 transition-all"
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

      {/* TAB 2: APPLICATION PROCESS & ELIGIBILITY */}
      {activeTab === "process" && (
        <div className="space-y-8">
          {/* Steps Management */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <ListOrdered size={16} className="text-brand-primary" /> Application & Disbursement Steps
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  Ordered roadmap displayed on the public /microfinance/process page.
                </p>
              </div>

              <button
                onClick={openCreateStepModal}
                style={{ backgroundColor: primaryColor }}
                className="px-4 py-2 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-2 cursor-pointer hover:opacity-95"
              >
                <Plus size={15} /> Add Step
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {(microfinanceProcess?.steps || []).map((step, idx) => (
                <div
                  key={step.id || idx}
                  className={`rounded-2xl border p-5 transition-all flex flex-col justify-between ${
                    theme === "dark" ? "bg-[#181824] border-white/5" : "bg-white border-gray-200 shadow-2xs"
                  }`}
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <div 
                        className="w-7 h-7 rounded-lg text-white font-black text-xs flex items-center justify-center shadow-xs"
                        style={{ backgroundColor: primaryColor }}
                      >
                        {step.stepNumber || idx + 1}
                      </div>
                      <span className="text-[11px] font-bold text-gray-500 dark:text-gray-400 flex items-center gap-1">
                        <Clock size={12} /> {step.duration}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-gray-900 dark:text-white">
                      {step.title}
                    </h4>

                    <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-3 leading-relaxed">
                      {step.desc}
                    </p>

                    {step.requirements && step.requirements.length > 0 && (
                      <div className="space-y-1 pt-1">
                        {step.requirements.map((req, rIdx) => (
                          <div key={rIdx} className="text-[10px] text-gray-500 dark:text-gray-400 flex items-start gap-1">
                            <span className="text-brand-primary">•</span>
                            <span>{req}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-3 mt-3 border-t border-gray-100 dark:border-white/5 flex items-center justify-end gap-1.5">
                    <button
                      onClick={() => openEditStepModal(step)}
                      className="p-1.5 rounded-lg text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-white/5 transition-all"
                    >
                      <Edit2 size={13} />
                    </button>
                    <button
                      onClick={() => handleDeleteStep(step.id)}
                      className="p-1.5 rounded-lg text-gray-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-white/5 transition-all"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Eligibility Criteria & Required Documents Editors */}
          <form onSubmit={handleSaveProcessCriteria} className={`p-6 rounded-3xl border space-y-6 ${
            theme === "dark" ? "bg-[#181824] border-white/5" : "bg-white border-gray-200 shadow-2xs"
          }`}>
            <div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <FileCheck2 size={16} className="text-brand-primary" /> Criteria & Document Checklists
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Control the verified eligibility bullets and mandatory documentation checklist.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                  General Eligibility Criteria <span className="text-gray-400 font-normal">(one rule per line)</span>
                </label>
                <textarea
                  rows={6}
                  value={eligibilityListInput}
                  onChange={(e) => setEligibilityListInput(e.target.value)}
                  className={`w-full p-3 rounded-xl text-xs outline-none border font-mono leading-relaxed ${
                    theme === "dark" ? "bg-white/5 border-white/10 text-white" : "bg-gray-50 border-gray-200 text-gray-900"
                  }`}
                  placeholder="Bangladeshi citizen aged 18-60&#10;Permanent resident&#10;Active member of Somiti"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-gray-300 mb-1.5">
                  Mandatory Required Documents <span className="text-gray-400 font-normal">(one requirement per line)</span>
                </label>
                <textarea
                  rows={6}
                  value={documentsListInput}
                  onChange={(e) => setDocumentsListInput(e.target.value)}
                  className={`w-full p-3 rounded-xl text-xs outline-none border font-mono leading-relaxed ${
                    theme === "dark" ? "bg-white/5 border-white/10 text-white" : "bg-gray-50 border-gray-200 text-gray-900"
                  }`}
                  placeholder="National Identity Card photocopy&#10;Two passport photos&#10;Nominee verification"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-white/5">
              {isProcessSaved && (
                <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5">
                  <Check size={14} /> Eligibility guidelines saved successfully!
                </span>
              )}
              <div className="ml-auto">
                <button
                  type="submit"
                  style={{ backgroundColor: primaryColor }}
                  className="px-6 py-2.5 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-2 cursor-pointer hover:opacity-95"
                >
                  <Check size={14} /> Save Checklists
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* MODAL: PRODUCT */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className={`w-full max-w-2xl rounded-3xl border p-6 space-y-4 max-h-[90vh] overflow-y-auto ${
            theme === "dark" ? "bg-[#181824] border-white/10 text-white" : "bg-white border-gray-200 text-gray-900 shadow-xl"
          }`}>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">
                {editingProduct ? "Edit Loan Product" : "Add Loan Product"}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 rounded-lg text-gray-400 hover:text-gray-600">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold mb-1">Product Title</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Jagoron (Rural Enterprise)"
                    className={`w-full p-2.5 rounded-xl text-xs outline-none border ${
                      theme === "dark" ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className={`w-full p-2.5 rounded-xl text-xs outline-none border ${
                      theme === "dark" ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"
                    }`}
                  >
                    <option value="Microcredit">Microcredit</option>
                    <option value="Enterprise">Enterprise</option>
                    <option value="Social Protection">Social Protection</option>
                    <option value="WaSH Finance">WaSH Finance</option>
                    <option value="Agriculture & Seasonal">Agriculture & Seasonal</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold mb-1">Loan Limit</label>
                  <input
                    type="text"
                    required
                    value={formData.loanLimit}
                    onChange={(e) => setFormData({ ...formData, loanLimit: e.target.value })}
                    placeholder="Tk. 10,000 – 1,00,000"
                    className={`w-full p-2.5 rounded-xl text-xs outline-none border ${
                      theme === "dark" ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">Interest / Standard</label>
                  <input
                    type="text"
                    required
                    value={formData.interestRate}
                    onChange={(e) => setFormData({ ...formData, interestRate: e.target.value })}
                    placeholder="24% Declining"
                    className={`w-full p-2.5 rounded-xl text-xs outline-none border ${
                      theme === "dark" ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">Tenure</label>
                  <input
                    type="text"
                    required
                    value={formData.tenure}
                    onChange={(e) => setFormData({ ...formData, tenure: e.target.value })}
                    placeholder="12 Months"
                    className={`w-full p-2.5 rounded-xl text-xs outline-none border ${
                      theme === "dark" ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"
                    }`}
                  />
                </div>
              </div>

              <div>
                <RichTextEditor
                  label="Product Details & Description"
                  value={formData.description}
                  onChange={(html) => setFormData({ ...formData, description: html })}
                  placeholder="Target beneficiary group, loan ceilings, and features..."
                  minHeight="160px"
                />
              </div>

              <ImageUploadField
                label="Product Feature Image"
                value={formData.imageUrl}
                onChange={(url) => setFormData({ ...formData, imageUrl: url })}
                hint="Upload or specify photo for this product"
              />

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold mb-1">
                    Eligibility Rules <span className="text-gray-400 font-normal">(one per line)</span>
                  </label>
                  <textarea
                    rows={3}
                    value={eligibilityInput}
                    onChange={(e) => setEligibilityInput(e.target.value)}
                    className={`w-full p-2.5 rounded-xl text-xs outline-none border font-mono ${
                      theme === "dark" ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">
                    Key Features <span className="text-gray-400 font-normal">(one per line)</span>
                  </label>
                  <textarea
                    rows={3}
                    value={featuresInput}
                    onChange={(e) => setFeaturesInput(e.target.value)}
                    className={`w-full p-2.5 rounded-xl text-xs outline-none border font-mono ${
                      theme === "dark" ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"
                    }`}
                  />
                </div>
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
                  {editingProduct ? "Update Product" : "Save Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: STEP */}
      {isStepModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className={`w-full max-w-md rounded-3xl border p-6 space-y-4 ${
            theme === "dark" ? "bg-[#181824] border-white/10 text-white" : "bg-white border-gray-200 text-gray-900 shadow-xl"
          }`}>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold">
                {editingStep ? "Edit Process Step" : "Add Application Step"}
              </h3>
              <button onClick={() => setIsStepModalOpen(false)} className="p-1 rounded-lg text-gray-400 hover:text-gray-600">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmitStep} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold mb-1">Step Number</label>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    required
                    value={stepForm.stepNumber}
                    onChange={(e) => setStepForm({ ...stepForm, stepNumber: parseInt(e.target.value) || 1 })}
                    className={`w-full p-2.5 rounded-xl text-xs outline-none border ${
                      theme === "dark" ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">Turnaround Duration</label>
                  <input
                    type="text"
                    required
                    value={stepForm.duration}
                    onChange={(e) => setStepForm({ ...stepForm, duration: e.target.value })}
                    placeholder="e.g. 1-2 Weeks"
                    className={`w-full p-2.5 rounded-xl text-xs outline-none border ${
                      theme === "dark" ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">Step Title</label>
                <input
                  type="text"
                  required
                  value={stepForm.title}
                  onChange={(e) => setStepForm({ ...stepForm, title: e.target.value })}
                  placeholder="e.g. Group Formation & Baseline"
                  className={`w-full p-2.5 rounded-xl text-xs outline-none border ${
                    theme === "dark" ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"
                  }`}
                />
              </div>

              <div>
                <RichTextEditor
                  label="Step Details & Instructions"
                  value={stepForm.desc}
                  onChange={(html) => setStepForm({ ...stepForm, desc: html })}
                  placeholder="Explain what happens during this step..."
                  minHeight="140px"
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">
                  Key Requirements <span className="text-gray-400 font-normal">(one per line)</span>
                </label>
                <textarea
                  rows={2}
                  value={stepReqsInput}
                  onChange={(e) => setStepReqsInput(e.target.value)}
                  placeholder="NID photocopy&#10;Group approval"
                  className={`w-full p-2.5 rounded-xl text-xs outline-none border font-mono ${
                    theme === "dark" ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"
                  }`}
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsStepModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ backgroundColor: primaryColor }}
                  className="px-5 py-2 rounded-xl text-xs font-bold text-white hover:opacity-90"
                >
                  {editingStep ? "Update Step" : "Save Step"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
