"use client";

import React, { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import {
  Building2,
  MapPin,
  Phone,
  Navigation,
  Search,
  RotateCcw,
  ArrowUpRight,
  Hash,
  Compass,
  Mail,
} from "lucide-react";
import { useContent, BranchOffice } from "@/context/ContentContext";
import { useLanguage } from "@/context/LanguageContext";
import {
  branchSearchScore,
  directionsUrl,
  mapsSearchUrl,
  phoneHref,
} from "@/lib/branchDirectory";

const BranchMap = dynamic(() => import("./BranchMap"), {
  ssr: false,
  loading: () => (
    <div className="grid h-[380px] sm:h-[520px] place-items-center bg-sky-50 text-sm font-semibold text-slate-500">
      Loading interactive Bangladesh office map…
    </div>
  ),
});

export default function BangladeshOfficeMapSection() {
  const { branches, siteSettings } = useContent();
  const { language } = useLanguage();
  const isBn = language === "bn";

  const [query, setQuery] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("All");
  const [selectedId, setSelectedId] = useState("verc-head-office");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [mapFocus, setMapFocus] = useState<"all" | "selected">("all");
  const [resetKey, setResetKey] = useState(0);

  const districts = useMemo(
    () =>
      Array.from(new Set(branches.map((b) => b.district).filter(Boolean))).sort(),
    [branches]
  );

  const filteredBranches = useMemo(() => {
    return branches
      .map((b) => ({ ...b, score: branchSearchScore(b, query) }))
      .filter(
        (b) =>
          b.score >= 0 &&
          (selectedDistrict === "All" || b.district === selectedDistrict)
      )
      .sort(
        (a, b) =>
          b.score - a.score ||
          Number(b.branchType === "Head Office") -
            Number(a.branchType === "Head Office") ||
          a.name.localeCompare(b.name)
      );
  }, [branches, query, selectedDistrict]);

  const activeBranch: BranchOffice | undefined = useMemo(() => {
    if (hoveredId) {
      const hovered = branches.find((b) => b.id === hoveredId);
      if (hovered) return hovered;
    }
    return (
      branches.find((b) => b.id === selectedId) ||
      filteredBranches[0] ||
      branches[0]
    );
  }, [branches, filteredBranches, hoveredId, selectedId]);

  const handleSelectBranch = (id: string) => {
    setSelectedId(id);
    setHoveredId(null);
    setMapFocus("selected");
  };

  const handleResetMap = () => {
    setQuery("");
    setSelectedDistrict("All");
    setHoveredId(null);
    setSelectedId("verc-head-office");
    setMapFocus("all");
    setResetKey((k) => k + 1);
  };

  const activePhone =
    activeBranch && phoneHref(activeBranch.phone)
      ? activeBranch.phone
      : activeBranch?.branchType === "Head Office"
      ? siteSettings.phone
      : activeBranch?.phone || "";

  return (
    <section
      id="bangladesh-office-map"
      aria-labelledby="bd-office-map-heading"
      className="relative py-16 sm:py-24 bg-gradient-to-b from-slate-50 via-white to-sky-50/40 border-t border-slate-200/70 overflow-hidden"
    >
      <div className="container-custom relative z-10">
        {/* Section Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 sm:mb-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100/80 border border-sky-200 text-brand-primary text-xs font-semibold uppercase tracking-widest mb-4">
              <Building2 size={14} />
              <span>
                {isBn
                  ? "বাংলাদেশব্যাপী শাখা ও কার্যালয় নেটওয়ার্ক"
                  : "Nationwide Office Network Across Bangladesh"}
              </span>
            </div>
            <h2
              id="bd-office-map-heading"
              className="text-3xl sm:text-5xl font-bold text-slate-900 tracking-tight leading-[1.1]"
            >
              {isBn ? (
                <>
                  সারা বাংলাদেশে ভার্কের{" "}
                  <span className="text-brand-primary">
                    {branches.length}টি কার্যালয়।
                  </span>
                </>
              ) : (
                <>
                  Explore All{" "}
                  <span className="text-brand-primary">
                    {branches.length} VERC Offices
                  </span>{" "}
                  Across Bangladesh.
                </>
              )}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
              {isBn
                ? `বাংলাদেশের ${districts.length}টি জেলায় ভার্কের প্রধান কার্যালয় ও শাখা কার্যালয়সমূহ। মানচিত্রের যেকোনো অফিস ভবন আইকনে হোভার বা ক্লিক করে সম্পূর্ণ ঠিকানা, শাখা কোড ও মোবাইল নম্বর দেখুন।`
                : `Spanning ${districts.length} districts nationwide. Hover or click any office building on the Bangladesh map—or select from the directory—to view full branch details, mailing address, post office, mobile number, and GPS coordinates.`}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleResetMap}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-brand-primary hover:border-brand-primary/40 text-xs sm:text-sm font-semibold shadow-xs transition-all cursor-pointer"
            >
              <RotateCcw size={15} />
              <span>{isBn ? "সম্পূর্ণ বাংলাদেশ মানচিত্র" : "Full Bangladesh View"}</span>
            </button>
            <Link
              href="/resources/branches"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-primary text-white hover:bg-sky-900 text-xs sm:text-sm font-semibold shadow-md transition-all"
            >
              <span>{isBn ? "সকল শাখার তালিকা" : "Full Branch Directory"}</span>
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>

        {/* Search & District Filter Bar */}
        <div className="mb-6 grid grid-cols-1 sm:grid-cols-12 gap-3 p-3 sm:p-4 rounded-2xl bg-white border border-slate-200/90 shadow-sm">
          <div className="sm:col-span-7 relative flex items-center">
            <Search
              size={17}
              className="absolute left-3.5 text-slate-400 pointer-events-none"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setMapFocus("all");
              }}
              placeholder={
                isBn
                  ? "শাখার নাম, কোড (যেমন 0046), জেলা বা উপজেলা দিয়ে খুঁজুন..."
                  : "Search by branch name, code (e.g. 0046), district, upazila, or village..."
              }
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/60 focus:bg-white text-xs sm:text-sm text-slate-900 outline-none focus:border-brand-primary"
            />
          </div>
          <div className="sm:col-span-5 flex items-center gap-2">
            <select
              value={selectedDistrict}
              onChange={(e) => {
                setSelectedDistrict(e.target.value);
                setMapFocus("all");
              }}
              aria-label="Filter offices by district"
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/60 focus:bg-white text-xs sm:text-sm font-semibold text-slate-800 outline-none focus:border-brand-primary"
            >
              <option value="All">
                All Districts ({districts.length} Districts · {branches.length} Offices)
              </option>
              {districts.map((d) => (
                <option key={d} value={d}>
                  {d} District
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Main Split Grid: Interactive Map (Left 7 cols) + Active Office Details & List (Right 5 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Interactive Bangladesh Map */}
          <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-slate-200/90 bg-white shadow-[0_20px_60px_-20px_rgba(0,75,141,0.18)]">
            {/* Map Top Legend Strip */}
            <div className="px-4 py-3 bg-slate-900 text-white flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex flex-wrap items-center gap-4">
                <span className="inline-flex items-center gap-1.5 font-semibold">
                  <span className="w-3 h-3 rounded-sm bg-amber-500 inline-block border border-white" />
                  Head Office (Savar, Dhaka)
                </span>
                <span className="inline-flex items-center gap-1.5 font-semibold">
                  <span className="w-3 h-3 rounded-sm bg-sky-500 inline-block border border-white" />
                  Branch Office Building ({filteredBranches.length})
                </span>
              </div>
              <span className="text-[11px] text-sky-200 font-medium">
                Hover for details · Click to focus office
              </span>
            </div>

            {/* Pass selectedId (NOT hoveredId) so hovering never triggers camera movement or marker resets */}
            <BranchMap
              branches={filteredBranches.length > 0 ? filteredBranches : branches}
              selectedId={selectedId}
              focus={mapFocus}
              resetKey={resetKey}
              onSelect={handleSelectBranch}
              onHover={(id) => setHoveredId(id)}
              heightClassName="h-[380px] sm:h-[520px] lg:h-[580px]"
            />
          </div>

          {/* Right Column: Full Office Details Card + Scrollable Office Directory */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {/* Active Office Full Details Card */}
            {activeBranch && (
              <div className="rounded-3xl border-2 border-sky-200/90 bg-white p-5 sm:p-6 shadow-[0_16px_40px_-15px_rgba(0,75,141,0.15)] space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3.5">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-md shrink-0 ${
                        activeBranch.branchType === "Head Office"
                          ? "bg-amber-600"
                          : "bg-brand-primary"
                      }`}
                    >
                      <Building2 size={24} />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`text-[10px] font-semibold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                            activeBranch.branchType === "Head Office"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-sky-100 text-brand-primary"
                          }`}
                        >
                          {activeBranch.branchType || "Branch Office"}
                        </span>
                        {activeBranch.code && (
                          <span className="inline-flex items-center gap-0.5 text-[11px] font-mono font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
                            <Hash size={11} />
                            {activeBranch.code}
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1 leading-tight">
                        {activeBranch.name}
                        {activeBranch.branchType !== "Head Office" &&
                        !activeBranch.name.toLowerCase().includes("office")
                          ? " Branch Office"
                          : ""}
                      </h3>
                      <p className="text-xs font-semibold text-brand-primary mt-0.5">
                        {[activeBranch.upazila, activeBranch.district, activeBranch.division]
                          .filter(Boolean)
                          .join(" • ")}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Detailed Address & Location Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs bg-slate-50 p-3.5 rounded-2xl border border-slate-200/70">
                  <div className="sm:col-span-2">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block">
                      Mailing Address
                    </span>
                    <span className="font-medium text-slate-800 leading-relaxed">
                      {activeBranch.address}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block">
                      District & Upazila
                    </span>
                    <span className="font-semibold text-slate-800">
                      {activeBranch.district}
                      {activeBranch.upazila ? ` (${activeBranch.upazila})` : ""}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block">
                      Post Office & Road/Village
                    </span>
                    <span className="font-semibold text-slate-800">
                      {[activeBranch.postOffice, activeBranch.village]
                        .filter(Boolean)
                        .join(" · ") || activeBranch.district}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block">
                      Mobile / Contact
                    </span>
                    <span className="font-semibold text-brand-primary">
                      {activePhone || "N/A"}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block">
                      GPS Coordinates
                    </span>
                    <span className="font-mono font-medium text-slate-700">
                      {typeof activeBranch.lat === "number" &&
                      typeof activeBranch.lng === "number"
                        ? `${activeBranch.lat.toFixed(5)}, ${activeBranch.lng.toFixed(5)}`
                        : "Verified Directory Location"}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <a
                    href={directionsUrl(activeBranch)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-brand-primary text-white hover:bg-sky-900 text-xs font-semibold shadow-xs transition-all"
                  >
                    <Navigation size={14} />
                    <span>Get Directions</span>
                  </a>
                  <a
                    href={mapsSearchUrl(activeBranch)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:border-brand-primary hover:text-brand-primary text-xs font-semibold transition-all"
                  >
                    <Compass size={14} />
                    <span>Google Maps</span>
                  </a>
                  {activePhone && phoneHref(activePhone) && (
                    <a
                      href={phoneHref(activePhone)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 text-xs font-semibold transition-all"
                    >
                      <Phone size={13} />
                      <span>Call Office</span>
                    </a>
                  )}
                  <Link
                    href={`/contact?branch=${encodeURIComponent(activeBranch.id)}#send-message`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:text-brand-primary text-xs font-semibold transition-all"
                  >
                    <Mail size={13} />
                    <span>Inquire</span>
                  </Link>
                </div>
              </div>
            )}

            {/* Quick-Select Scrollable Office List */}
            <div className="rounded-3xl border border-slate-200/90 bg-white overflow-hidden shadow-xs">
              <div className="px-4 py-3 bg-slate-50 border-b border-slate-200/80 flex items-center justify-between text-xs font-semibold text-slate-700">
                <span>
                  Matching VERC Offices ({filteredBranches.length})
                </span>
                <span className="text-[11px] text-slate-400 font-medium">
                  Click to focus on map
                </span>
              </div>
              <div className="max-h-[250px] overflow-y-auto divide-y divide-slate-100 p-2 space-y-1">
                {filteredBranches.map((branch) => {
                  const isCurrent = selectedId === branch.id;
                  const isHQ = branch.branchType === "Head Office";
                  return (
                    <button
                      key={branch.id}
                      type="button"
                      onClick={() => handleSelectBranch(branch.id)}
                      className={`w-full text-left px-3.5 py-2.5 rounded-2xl transition-all flex items-center justify-between gap-3 cursor-pointer ${
                        isCurrent
                          ? "bg-sky-50 border border-sky-200 shadow-2xs"
                          : "hover:bg-slate-50 border border-transparent"
                      }`}
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-2 h-2 rounded-full shrink-0 ${
                              isHQ ? "bg-amber-500" : "bg-sky-500"
                            }`}
                          />
                          <p className="text-xs font-semibold text-slate-900 truncate">
                            {branch.name}
                          </p>
                          {branch.code && (
                            <span className="text-[10px] font-mono font-medium text-slate-400">
                              #{branch.code}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 truncate pl-4">
                          {[branch.upazila, branch.district].filter(Boolean).join(", ")} ·{" "}
                          {branch.phone}
                        </p>
                      </div>
                      <MapPin
                        size={15}
                        className={`shrink-0 ${
                          isCurrent ? "text-brand-primary" : "text-slate-300"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
