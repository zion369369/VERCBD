"use client";

import React, { useState, useRef } from "react";
import { 
  UploadCloud, 
  FileText, 
  Image as ImageIcon, 
  Link as LinkIcon, 
  X, 
  Check, 
  FolderOpen, 
  ExternalLink, 
  Download,
  AlertCircle
} from "lucide-react";

interface DocumentUploadFieldProps {
  label?: string;
  value: string;
  onChange: (value: string, fileName?: string, fileSize?: string) => void;
  accept?: string;
  className?: string;
  hint?: string;
  allowImages?: boolean;
}

const PRESET_DOCUMENTS = [
  { name: "NGO Affairs Bureau (NGOAB) Reg", url: "https://www.vercbd.org/images/NGOAB.pdf", type: "PDF" },
  { name: "Microcredit Regulatory Authority (MRA)", url: "https://www.vercbd.org/images/MRA.pdf", type: "PDF" },
  { name: "Social Welfare Directorate Reg", url: "https://www.vercbd.org/images/Social_Welfare.pdf", type: "PDF" },
  { name: "Joint Stock Companies Incorporation", url: "https://www.vercbd.org/images/Joint_Stock.pdf", type: "PDF" },
  { name: "VERC Annual Report (Audited)", url: "https://www.vercbd.org/images/VERC%20Annual%20Report%20(Short%20Version)_Final.pdf", type: "PDF" },
  { name: "Official Governance Organogram", url: "https://www.vercbd.org/images/Organogram.pdf", type: "PDF" }
];

export const DocumentUploadField: React.FC<DocumentUploadFieldProps> = ({
  label = "Attach Document or Certificate",
  value,
  onChange,
  accept = ".pdf,image/*,application/pdf",
  className = "",
  hint = "Upload a PDF or Image from your device, or paste a link",
  allowImages = true
}) => {
  const [activeTab, setActiveTab] = useState<"upload" | "url" | "presets">("upload");
  const [urlInput, setUrlInput] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isPdf = value?.toLowerCase().endsWith(".pdf") || value?.startsWith("data:application/pdf");
  const isImage = value?.startsWith("data:image/") || /\.(jpg|jpeg|png|webp|svg|gif)(\?.*)?$/i.test(value || "");

  const handleFile = (file: File) => {
    setErrorMessage("");
    if (!file) return;

    // Check size limit: 15MB
    if (file.size > 15 * 1024 * 1024) {
      setErrorMessage("File size exceeds 15 MB limit. Please select a smaller file.");
      return;
    }

    const sizeFormatted = file.size > 1024 * 1024 
      ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
      : `${Math.round(file.size / 1024)} KB`;

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        onChange(e.target.result as string, file.name, sizeFormatted);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (urlInput.trim()) {
      const detectedName = urlInput.split("/").pop() || "Document";
      onChange(urlInput.trim(), detectedName);
      setUrlInput("");
    }
  };

  const handleSelectPreset = (doc: typeof PRESET_DOCUMENTS[0]) => {
    onChange(doc.url, doc.name);
  };

  const handleRemove = () => {
    onChange("", "");
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between">
        <label className="block text-xs font-bold text-gray-700 dark:text-gray-300">
          {label}
        </label>
        {value && (
          <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
            <Check size={12} /> Document Attached
          </span>
        )}
      </div>

      <div className="border border-gray-200 dark:border-white/10 rounded-2xl p-4 bg-white dark:bg-[#181824] shadow-xs space-y-4">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-gray-100 dark:bg-white/5 rounded-xl text-xs">
          <button
            type="button"
            onClick={() => setActiveTab("upload")}
            className={`flex-1 py-1.5 px-3 rounded-lg font-bold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === "upload"
                ? "bg-white dark:bg-white/10 text-brand-primary shadow-xs"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            <UploadCloud size={13} />
            <span>Upload from Device</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("url")}
            className={`flex-1 py-1.5 px-3 rounded-lg font-bold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === "url"
                ? "bg-white dark:bg-white/10 text-brand-primary shadow-xs"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            <LinkIcon size={13} />
            <span>Paste Web URL</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("presets")}
            className={`flex-1 py-1.5 px-3 rounded-lg font-bold flex items-center justify-center gap-1.5 transition-all ${
              activeTab === "presets"
                ? "bg-white dark:bg-white/10 text-brand-primary shadow-xs"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            <FolderOpen size={13} />
            <span>VERC Library</span>
          </button>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs font-bold text-rose-600 flex items-center gap-2">
            <AlertCircle size={14} className="flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* TAB 1: UPLOAD FROM DEVICE */}
        {activeTab === "upload" && (
          <div>
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-all ${
                isDragging
                  ? "border-brand-primary bg-brand-primary/10"
                  : "border-gray-200 dark:border-white/10 hover:border-brand-primary bg-gray-50/50 dark:bg-white/5"
              }`}
            >
              <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 text-brand-primary flex items-center justify-center mb-3 shadow-xs">
                <UploadCloud size={24} />
              </div>
              <span className="text-xs font-bold text-gray-800 dark:text-gray-200">
                Click to browse or drag & drop file here
              </span>
              <span className="text-[10px] text-gray-400 mt-1">
                Supports PDF documents, Scanned certificates, PNG, JPG (Up to 15 MB)
              </span>
              <input
                ref={fileInputRef}
                type="file"
                accept={accept}
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFile(e.target.files[0]);
                  }
                }}
                className="hidden"
              />
            </div>
          </div>
        )}

        {/* TAB 2: PASTE URL */}
        {activeTab === "url" && (
          <form onSubmit={handleUrlSubmit} className="flex gap-2">
            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="https://www.vercbd.org/images/NGOAB.pdf"
              className="flex-1 px-3.5 py-2.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-xs font-medium outline-hidden"
            />
            <button
              type="submit"
              className="px-4 py-2.5 bg-brand-primary text-white text-xs font-bold rounded-xl shadow-sm hover:opacity-95 flex items-center gap-1.5"
            >
              <Check size={14} />
              <span>Attach</span>
            </button>
          </form>
        )}

        {/* TAB 3: OFFICIAL PRESETS */}
        {activeTab === "presets" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto custom-scrollbar pr-1">
            {PRESET_DOCUMENTS.map((doc, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelectPreset(doc)}
                className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all ${
                  value === doc.url
                    ? "border-brand-primary bg-brand-primary/5 text-brand-primary"
                    : "border-gray-200 dark:border-white/10 hover:border-brand-primary/50 text-gray-700 dark:text-gray-300"
                }`}
              >
                <FileText size={16} className="text-rose-500 flex-shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold truncate">{doc.name}</div>
                  <div className="text-[10px] text-gray-400 uppercase">{doc.type} Document</div>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* ATTACHED FILE PREVIEW CARD */}
        {value ? (
          <div className="p-3.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                isPdf 
                  ? "bg-rose-100 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400" 
                  : "bg-blue-100 text-blue-600 dark:bg-blue-950/40 dark:text-blue-400"
              }`}>
                {isPdf ? <FileText size={20} /> : <ImageIcon size={20} />}
              </div>

              <div className="min-w-0">
                <div className="text-xs font-bold text-gray-900 dark:text-white truncate">
                  {value.startsWith("data:") ? "Uploaded Document File" : value.split("/").pop()}
                </div>
                <div className="text-[10px] text-gray-400 truncate mt-0.5">
                  {value.startsWith("data:") ? "Stored Locally (Ready to View / Download)" : value}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 flex-shrink-0">
              <a
                href={value}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-gray-500 hover:text-brand-primary hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
                title="View / Open Document"
              >
                <ExternalLink size={15} />
              </a>

              <button
                type="button"
                onClick={handleRemove}
                className="p-2 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                title="Remove attached document"
              >
                <X size={15} />
              </button>
            </div>
          </div>
        ) : (
          <div className="text-[11px] text-gray-400 font-medium">
            {hint}
          </div>
        )}
      </div>
    </div>
  );
};
