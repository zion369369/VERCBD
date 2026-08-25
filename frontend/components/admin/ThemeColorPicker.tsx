"use client";

import React, { useState, useRef, useEffect } from "react";
import { Palette, Check, RefreshCw, Sparkles, Copy, X } from "lucide-react";
import { useContent } from "@/context/ContentContext";

const PRESET_PALETTES = [
  { name: "VERC Classic Blue", hex: "#004B8D", description: "Official Brand Primary" },
  { name: "VERC Sky Cyan", hex: "#00AEEF", description: "Official Water & Innovation" },
  { name: "VERC NGO Green", hex: "#007A3D", description: "Sustainability & Climate" },
  { name: "Royal Purple", hex: "#6C5DD3", description: "Modern Studio Purple" },
  { name: "Deep Indigo", hex: "#4F46E5", description: "High Contrast Tech" },
  { name: "Crimson Ruby", hex: "#E11D48", description: "Vibrant Impact Red" },
  { name: "Sunset Amber", hex: "#EA580C", description: "Energy & Community" },
  { name: "Teal Emerald", hex: "#0D9488", description: "Health & Hygiene" },
  { name: "Midnight Navy", hex: "#0F172A", description: "Corporate & Elegant" },
];

interface ThemeColorPickerProps {
  variant?: "dropdown" | "embedded";
  className?: string;
}

export const ThemeColorPicker: React.FC<ThemeColorPickerProps> = ({
  variant = "dropdown",
  className = ""
}) => {
  const { primaryColor, setPrimaryColor, siteSettings, updateSiteSettings, theme } = useContent();
  const [isOpen, setIsOpen] = useState(false);
  const [hexInput, setHexInput] = useState(primaryColor || "#004B8D");
  const [copied, setCopied] = useState(false);
  const [customError, setCustomError] = useState("");
  const popoverRef = useRef<HTMLDivElement>(null);

  // Sync internal hexInput when primaryColor changes externally
  useEffect(() => {
    setHexInput(primaryColor || "#004B8D");
  }, [primaryColor]);

  // Click outside listener for dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleApplyHex = (code: string) => {
    let clean = code.trim();
    if (!clean.startsWith("#")) {
      clean = "#" + clean;
    }
    // Regex for valid 3, 6, or 8 digit hex
    const isValid = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3}|[A-Fa-f0-9]{8})$/.test(clean);
    if (isValid) {
      setCustomError("");
      setPrimaryColor(clean);
      updateSiteSettings({ primaryColor: clean });
    } else {
      setCustomError("Please enter a valid hex color code (e.g. #007A3D).");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(primaryColor);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const content = (
    <div className="space-y-4 text-xs">
      {/* Header Info */}
      <div className="flex items-center justify-between pb-2 border-b border-gray-100 dark:border-white/5">
        <div className="flex items-center gap-2">
          <Palette size={15} style={{ color: primaryColor }} />
          <span className="font-extrabold text-gray-900 dark:text-white">Theme Color Studio</span>
        </div>
        <button
          type="button"
          onClick={() => {
            const defaultCol = "#004B8D";
            setHexInput(defaultCol);
            setPrimaryColor(defaultCol);
            updateSiteSettings({ primaryColor: defaultCol });
          }}
          className="text-[10px] text-gray-500 hover:text-gray-800 dark:hover:text-white flex items-center gap-1 font-semibold cursor-pointer"
          title="Reset to default VERC Blue"
        >
          <RefreshCw size={11} /> Reset
        </button>
      </div>

      {/* Preset Swatches */}
      <div>
        <label className="block text-[11px] font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wider">
          Curated Brand Presets
        </label>
        <div className="grid grid-cols-3 gap-2">
          {PRESET_PALETTES.map((preset) => {
            const isSelected = primaryColor?.toLowerCase() === preset.hex.toLowerCase();
            return (
              <button
                key={preset.hex}
                type="button"
                onClick={() => {
                  setHexInput(preset.hex);
                  setCustomError("");
                  setPrimaryColor(preset.hex);
                  updateSiteSettings({ primaryColor: preset.hex });
                }}
                className={`flex items-center gap-2 p-2 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? "border-gray-900 dark:border-white ring-2 shadow-sm font-bold"
                    : "border-gray-200 dark:border-white/10 hover:border-gray-400 bg-gray-50/50 dark:bg-white/5"
                }`}
              >
                <div
                  className="w-4 h-4 rounded-full flex-shrink-0 shadow-xs flex items-center justify-center text-white"
                  style={{ backgroundColor: preset.hex }}
                >
                  {isSelected && <Check size={10} className="stroke-[3]" />}
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] font-bold text-gray-900 dark:text-white truncate">
                    {preset.name.split(" ")[0]}
                  </div>
                  <div className="text-[9px] text-gray-400 font-mono">{preset.hex}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Custom Color Input & HTML5 Color Picker */}
      <div className="space-y-2 pt-2 border-t border-gray-100 dark:border-white/5">
        <label className="block text-[11px] font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
          Custom Color / Paste Hex Code
        </label>

        <div className="flex items-center gap-2">
          {/* Native HTML5 Color Wheel Input */}
          <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-gray-300 dark:border-white/10 flex-shrink-0 shadow-inner cursor-pointer">
            <input
              type="color"
              value={primaryColor || "#004B8D"}
              onChange={(e) => {
                setHexInput(e.target.value);
                setCustomError("");
                setPrimaryColor(e.target.value);
                updateSiteSettings({ primaryColor: e.target.value });
              }}
              className="absolute -top-4 -left-4 w-20 h-20 cursor-pointer border-none bg-transparent"
              title="Click to open full color wheel"
            />
          </div>

          {/* Hex Text Input */}
          <div className="relative flex-1">
            <input
              type="text"
              value={hexInput}
              onChange={(e) => {
                setHexInput(e.target.value);
                handleApplyHex(e.target.value);
              }}
              placeholder="#004B8D"
              className={`w-full px-3 py-2 text-xs font-mono font-bold rounded-xl border outline-none ${
                theme === "dark"
                  ? "bg-[#14141E] border-white/10 text-white"
                  : "bg-gray-50 border-gray-200 text-gray-900 focus:bg-white"
              }`}
            />
          </div>

          <button
            type="button"
            onClick={handleCopy}
            className="p-2.5 bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-gray-700 dark:text-gray-200 rounded-xl transition-colors cursor-pointer"
            title="Copy HEX Code"
          >
            {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
          </button>
        </div>

        {customError && <p className="text-[11px] text-red-500 font-semibold">{customError}</p>}
      </div>

      {/* Live Preview Demonstration */}
      <div className="p-3 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200/80 dark:border-white/5 space-y-2">
        <div className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase">Live UI Preview</div>
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            style={{ backgroundColor: primaryColor }}
            className="px-3 py-1.5 rounded-lg text-white font-bold text-[11px] shadow-sm flex items-center gap-1"
          >
            <Sparkles size={11} /> Primary Button
          </button>
          <span
            style={{ color: primaryColor }}
            className="text-[11px] font-extrabold px-2.5 py-1 rounded-lg bg-white dark:bg-[#14141E] border border-gray-200/60 dark:border-white/10 shadow-xs"
          >
            Accent Badge
          </span>
        </div>
      </div>
    </div>
  );

  if (variant === "embedded") {
    return <div className={`p-6 rounded-3xl border ${theme === "dark" ? "bg-[#1A1926] border-white/5" : "bg-white border-gray-200 shadow-sm"} ${className}`}>{content}</div>;
  }

  return (
    <div className={`relative ${className}`} ref={popoverRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-white/10 dark:hover:bg-white/20 text-gray-800 dark:text-gray-200 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs"
        title="Theme Color Customizer"
      >
        <div
          className="w-3.5 h-3.5 rounded-full border border-white/60 shadow-xs flex-shrink-0"
          style={{ backgroundColor: primaryColor }}
        ></div>
        <span className="hidden sm:inline">Theme Color</span>
        <Palette size={14} className="text-gray-500" />
      </button>

      {/* Popover Card */}
      {isOpen && (
        <div className={`absolute right-0 top-12 z-50 w-80 p-5 rounded-3xl border shadow-2xl transition-all ${
          theme === "dark"
            ? "bg-[#1A1926] border-white/10 text-white"
            : "bg-white border-gray-200 text-gray-900 shadow-xl"
        }`}>
          {content}
        </div>
      )}
    </div>
  );
};
