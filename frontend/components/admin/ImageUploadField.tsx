"use client";

import React, { useState, useRef } from "react";
import { UploadCloud, Image as ImageIcon, Link as LinkIcon, X, Check, FolderOpen } from "lucide-react";

interface ImageUploadFieldProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  helperText?: string;
  hint?: string;
}

const PRESET_IMAGES = [
  { name: "Home Official", url: "/assets/home_official_1.jpg" },
  { name: "WaSH Hero", url: "/assets/wash_hero.png" },
  { name: "Education 1", url: "/assets/edu_1.png" },
  { name: "Education 2", url: "/assets/edu_2.png" },
  { name: "Education 3", url: "/assets/edu_3.png" },
  { name: "Impact Hero", url: "/assets/impact_hero.png" },
  { name: "Microfinance 1", url: "/assets/microfinance_hero.png" },
  { name: "Microfinance Woman", url: "/assets/microfinance_woman_hero.png" },
  { name: "Capacity Building", url: "/assets/capacity_building_hero.png" },
  { name: "About Official", url: "/assets/about_official.jpg" },
  { name: "Logo", url: "/assets/logo.png" },
  { name: "GoB Logo", url: "/assets/gob_logo.png" },
  { name: "UNICEF Logo", url: "/assets/unicef_logo.png" },
  { name: "World Bank Logo", url: "/assets/worldbank_logo.png" },
  { name: "Save the Children", url: "/assets/savethechildren_logo.png" },
  { name: "PKSF Logo", url: "/assets/pksf_logo.png" },
  { name: "WaterAid Logo", url: "/assets/wateraid_logo.png" },
  { name: "USAID Logo", url: "/assets/usaid_logo.png" }
];

export const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  label = "Upload Image",
  value,
  onChange,
  className = "",
  helperText,
  hint
}) => {
  const [activeTab, setActiveTab] = useState<"upload" | "url" | "presets">("upload");
  const [urlInput, setUrlInput] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [previewError, setPreviewError] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const displayText = helperText || hint;

  const handleFile = (file: File) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file (PNG, JPG, WEBP, SVG).");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setPreviewError(false);
        onChange(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
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
      setPreviewError(false);
      onChange(urlInput.trim());
      setUrlInput("");
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <div className="flex justify-between items-center">
          <label className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
            {label}
          </label>
          <div className="flex bg-gray-100 dark:bg-white/10 p-0.5 rounded-lg text-xs font-semibold">
            <button
              type="button"
              onClick={() => setActiveTab("upload")}
              className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                activeTab === "upload" ? "bg-white dark:bg-[#1A1926] text-[#6C5DD3] shadow-sm font-bold" : "text-gray-600 dark:text-gray-300 hover:text-gray-900"
              }`}
            >
              Upload
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("presets")}
              className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                activeTab === "presets" ? "bg-white dark:bg-[#1A1926] text-[#6C5DD3] shadow-sm font-bold" : "text-gray-600 dark:text-gray-300 hover:text-gray-900"
              }`}
            >
              Library
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("url")}
              className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                activeTab === "url" ? "bg-white dark:bg-[#1A1926] text-[#6C5DD3] shadow-sm font-bold" : "text-gray-600 dark:text-gray-300 hover:text-gray-900"
              }`}
            >
              URL
            </button>
          </div>
        </div>
      )}

      {/* Main Container */}
      <div className="space-y-3">
        {/* Upload Mode */}
        {activeTab === "upload" && (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all duration-200 ${
              isDragging
                ? "border-[#6C5DD3] bg-purple-50 dark:bg-purple-900/20"
                : "border-gray-300 dark:border-white/10 hover:border-[#6C5DD3] bg-gray-50/70 dark:bg-white/5 hover:bg-purple-50/30"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.[0]) handleFile(e.target.files[0]);
              }}
            />
            <div className="flex flex-col items-center justify-center gap-1.5 py-2">
              <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/40 text-[#6C5DD3] flex items-center justify-center">
                <UploadCloud size={20} />
              </div>
              <p className="text-xs font-bold text-gray-800 dark:text-gray-200">
                Click to upload <span className="text-gray-500 font-normal">or drag & drop</span>
              </p>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">PNG, JPG, WebP, SVG up to 10MB</p>
            </div>
          </div>
        )}

        {/* Presets Mode */}
        {activeTab === "presets" && (
          <div className="bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl p-3 max-h-48 overflow-y-auto">
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {PRESET_IMAGES.map((preset) => (
                <button
                  key={preset.url}
                  type="button"
                  onClick={() => {
                    setPreviewError(false);
                    onChange(preset.url);
                  }}
                  className={`group relative rounded-lg border overflow-hidden text-left transition-all p-1 bg-white dark:bg-[#1A1926] hover:border-[#6C5DD3] cursor-pointer ${
                    value === preset.url ? "border-[#6C5DD3] ring-2 ring-purple-400" : "border-gray-200 dark:border-white/10"
                  }`}
                >
                  <div className="w-full h-12 bg-gray-100 dark:bg-white/10 rounded flex items-center justify-center overflow-hidden mb-1">
                    <img
                      src={preset.url}
                      alt={preset.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = "none";
                      }}
                    />
                  </div>
                  <div className="text-[10px] font-bold text-gray-800 dark:text-gray-200 truncate">{preset.name}</div>
                  {value === preset.url && (
                    <div className="absolute top-1 right-1 w-4 h-4 bg-[#6C5DD3] rounded-full text-white flex items-center justify-center text-[10px]">
                      <Check size={10} />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* URL Mode */}
        {activeTab === "url" && (
          <form onSubmit={handleUrlSubmit} className="flex gap-2">
            <div className="relative flex-1">
              <LinkIcon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="url"
                placeholder="https://example.com/image.jpg"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs border border-gray-300 dark:border-white/10 rounded-lg outline-none focus:border-[#6C5DD3] bg-white dark:bg-[#14141E] text-gray-900 dark:text-white font-medium"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-[#6C5DD3] hover:bg-[#5b4ec2] text-white rounded-lg text-xs font-bold shadow-sm transition-colors cursor-pointer"
            >
              Apply
            </button>
          </form>
        )}

        {/* Current Preview Card */}
        {value && (
          <div className="flex items-center gap-3 p-2.5 bg-white dark:bg-[#1A1926] border border-gray-200 dark:border-white/10 rounded-xl shadow-sm">
            <div className="w-14 h-14 bg-gray-100 dark:bg-white/10 rounded-lg border border-gray-200 dark:border-white/10 overflow-hidden flex-shrink-0 flex items-center justify-center relative">
              {!previewError ? (
                <img
                  src={value}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={() => setPreviewError(true)}
                />
              ) : (
                <ImageIcon size={20} className="text-gray-400" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-gray-900 dark:text-white truncate">
                {value.startsWith("data:") ? "Uploaded Image (Local File)" : value.split("/").pop()}
              </div>
              <div className="text-[11px] text-gray-500 dark:text-gray-400 truncate font-medium">{value}</div>
              <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold mt-0.5 flex items-center gap-1">
                <Check size={12} /> Ready for Frontend
              </div>
            </div>
            <button
              type="button"
              onClick={() => onChange("")}
              className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
              title="Remove Image"
            >
              <X size={16} />
            </button>
          </div>
        )}
      </div>

      {displayText && <p className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">{displayText}</p>}
    </div>
  );
};
