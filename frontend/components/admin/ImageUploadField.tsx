"use client";

import React, { useState, useRef, useEffect } from "react";
import { UploadCloud, Image as ImageIcon, Link as LinkIcon, X, Check, FolderOpen } from "lucide-react";

import { optimizeImage } from "@/lib/optimizeImage";
import { photoLibrary } from "@/lib/photoLibrary";

interface ImageUploadFieldProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  helperText?: string;
  hint?: string;
  onUploadingChange?: (uploading: boolean) => void;
}

const PRESET_IMAGES = [
  ...photoLibrary.map(photo => ({ name: photo.title, url: photo.imageUrl })),
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
  hint,
  onUploadingChange
}) => {
  const [activeTab, setActiveTab] = useState<"upload" | "url" | "presets">("upload");
  const [urlInput, setUrlInput] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [previewError, setPreviewError] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [dimensions, setDimensions] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const displayText = helperText || hint;
  useEffect(() => { setPreviewError(false); setDimensions(""); }, [value]);

  // Compresses an image client-side on an HTML5 canvas to guarantee lightweight payloads (~80-120KB)
  const compressFileToDataUrl = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      if (file.type === "image/svg+xml" || file.size < 150 * 1024) {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.readAsDataURL(file);
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const maxWidth = 1920;
          const maxHeight = 1080;
          let width = img.width;
          let height = img.height;
          if (width > maxWidth || height > maxHeight) {
            if (width / height > maxWidth / maxHeight) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            } else {
              width = Math.round((width * maxHeight) / height);
              height = maxHeight;
            }
          }
          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            resolve(canvas.toDataURL("image/jpeg", 0.8));
          } else {
            resolve(e.target?.result as string);
          }
        };
        img.onerror = () => resolve(e.target?.result as string);
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFile = async (file: File) => {
    if (!file || isUploading) return;
    setUploadError("");
    if (!file.type.startsWith("image/")) {
      setUploadError("Please select an image (JPEG, PNG, WebP, GIF or SVG). Use the document field for PDFs.");
      return;
    }
    if (file.size > 12 * 1024 * 1024) {
      setUploadError("Please choose an image smaller than 12 MB.");
      return;
    }
    setIsUploading(true);
    onUploadingChange?.(true);
    try {
      const optimized = await optimizeImage(file);
      const formData = new FormData();
      formData.append("file", optimized);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (res.ok && data?.url) {
        setPreviewError(false);
        onChange(data.url);
      } else {
        throw new Error(data?.error || "Server upload unavailable");
      }
    } catch (error) {
      console.warn("[ImageUploadField] Server upload failed, falling back to local compressed Data URL:", error);
      try {
        const compressed = await compressFileToDataUrl(file);
        setPreviewError(false);
        onChange(compressed);
      } catch (fallbackErr) {
        setUploadError(error instanceof Error ? error.message : "Upload failed. Please try again.");
      }
    } finally {
      setIsUploading(false);
      onUploadingChange?.(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
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

  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      setPreviewError(false);
      onChange(urlInput.trim());
      setUrlInput("");
    }
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <div className="flex flex-wrap justify-between items-center gap-2">
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
            role="button"
            tabIndex={0}
            aria-label={`Choose ${label.toLowerCase()}`}
            aria-disabled={isUploading}
            onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); fileInputRef.current?.click(); } }}
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
              disabled={isUploading}
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.[0]) handleFile(e.target.files[0]);
              }}
            />
            <div className="flex flex-col items-center justify-center gap-1.5 py-2">
              <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/40 text-[#6C5DD3] flex items-center justify-center">
                {isUploading ? (
                  <div className="w-5 h-5 border-2 border-[#6C5DD3] border-t-transparent rounded-full animate-spin" />
                ) : (
                  <UploadCloud size={20} />
                )}
              </div>
              <p className="text-xs font-bold text-gray-800 dark:text-gray-200">
                {isUploading ? "Uploading to live server..." : (
                  <>Click to upload <span className="text-gray-500 font-normal">or drag & drop</span></>
                )}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-normal">
                {isUploading ? "Optimizing & storing file globally..." : "JPEG, PNG, WebP, GIF, SVG · Max 12 MB"}
              </p>
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
                  <div className="text-xs font-medium text-gray-800 dark:text-gray-200 truncate">{preset.name}</div>
                  {value === preset.url && (
                    <div className="absolute top-1 right-1 w-4 h-4 bg-[#6C5DD3] rounded-full text-white flex items-center justify-center text-xs">
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
          <div className="flex gap-2">
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
              type="button"
              onClick={handleUrlSubmit}
              className="px-4 py-2 bg-[#6C5DD3] hover:bg-[#5b4ec2] text-white rounded-lg text-xs font-bold shadow-sm transition-colors cursor-pointer"
            >
              Apply
            </button>
          </div>
        )}

        {/* Current Preview Card */}
        {value && (
          <div className="flex items-center gap-3 p-2.5 bg-white dark:bg-[#1A1926] border border-gray-200 dark:border-white/10 rounded-xl shadow-sm">
            <div className="w-14 h-14 bg-gray-100 dark:bg-white/10 rounded-lg border border-gray-200 dark:border-white/10 overflow-hidden flex-shrink-0 flex items-center justify-center relative">
              {!previewError ? (
                <img
                  src={value}
                  alt="Preview"
                  onLoad={e => setDimensions(`${e.currentTarget.naturalWidth} x ${e.currentTarget.naturalHeight} px`)}
                  className="w-full h-full object-cover"
                  onError={() => setPreviewError(true)}
                />
              ) : (
                <ImageIcon size={20} className="text-gray-400" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold text-gray-900 dark:text-white truncate">
                {value.startsWith("data:") ? "Uploaded Image (Local File)" : value.split("/").pop()}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 truncate">{value}</div>
              <div className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mt-0.5 flex items-center gap-1">
                <Check size={12} /> Image uploaded / selected
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

      {uploadError && <p role="alert" className="text-xs font-semibold text-red-600">{uploadError}</p>}
      {value && dimensions && !previewError && <p className="text-xs text-gray-500">{dimensions}. Raster uploads are optimized to WebP when smaller, up to 1920 px, without upscaling.</p>}
      {displayText && <p className="text-xs text-gray-500 dark:text-gray-400">{displayText}</p>}
    </div>
  );
};
