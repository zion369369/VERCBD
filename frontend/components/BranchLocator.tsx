"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Search, MapPin, Navigation, LocateFixed, Loader2, ArrowUpRight, Phone, Copy, Check, Building2, X, Map, List, ChevronRight, SlidersHorizontal } from "lucide-react";
import { useContent, BranchOffice } from "@/context/ContentContext";
import { directionsUrl, mapsSearchUrl, branchSearchScore, distanceKm, hasCoordinates, phoneHref } from "@/lib/branchDirectory";
import type { VisitorPosition } from "./BranchMap";
import { useOfficeRouting } from "@/lib/roadRouting";

const BranchMap = dynamic(() => import("./BranchMap"), { ssr: false, loading: () => <div className="grid h-[330px] place-items-center bg-sky-50 text-sm text-slate-500 sm:h-[430px]">Loading office map…</div> });
const distanceLabel = (distance: number) => distance < 0.01 ? "< 10 m" : distance < 1 ? `${Math.max(10, Math.round(distance * 1000 / 10) * 10)} m` : `${distance.toFixed(distance < 10 ? 1 : 0)} km`;
const roadDistanceLabel = (meters: number) => meters < 1000 ? distanceLabel(meters / 1000) : `${(meters / 1000).toFixed(1)} km`;
const drivingTime = (seconds: number) => { const minutes = Math.max(1, Math.round(seconds / 60)); return minutes < 60 ? `${minutes} min` : `${Math.floor(minutes / 60)} hr${minutes % 60 ? ` ${minutes % 60} min` : ""}`; };

export default function BranchLocator({ onInquire }: { onInquire?: (branch: BranchOffice) => void }) {
  const { branches, siteSettings } = useContent();
  const [query, setQuery] = useState("");
  const [district, setDistrict] = useState("All districts");
  const [type, setType] = useState("All offices");
  const [position, setPosition] = useState<VisitorPosition>();
  const [interactive, setInteractive] = useState(false);
  const [locating, setLocating] = useState(false);
  const [locationError, setLocationError] = useState("");
  const [selectedId, setSelectedId] = useState("");
  const [mapFocus, setMapFocus] = useState<"all" | "selected" | "nearby">("all");
  const [mobileView, setMobileView] = useState<"list" | "map">("list");
  const [mapRevision, setMapRevision] = useState(0);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState("");
  const [pickingStart, setPickingStart] = useState(false);
  const details = useRef<HTMLDivElement>(null);
  const requestId = useRef(0);
  useEffect(() => { setInteractive(true); return () => { requestId.current += 1; }; }, []);
  const districts = useMemo(() => Array.from(new Set(branches.map(branch => branch.district).filter(Boolean))).sort(), [branches]);

  const matching = useMemo(() => {
    return branches.map(branch => ({ ...branch, score: branchSearchScore(branch, query), distance: position && hasCoordinates(branch) ? distanceKm(position, branch) : undefined }))
      .filter(branch => branch.score >= 0 && (district === "All districts" || branch.district === district) && (type === "All offices" || branch.branchType === type))
      .sort((a, b) => b.score - a.score || (position ? (a.distance ?? Infinity) - (b.distance ?? Infinity) : Number(b.branchType === "Head Office") - Number(a.branchType === "Head Office")) || a.name.localeCompare(b.name));
  }, [branches, query, district, type, position]);
  const selected = branches.find(branch => branch.id === selectedId) || matching[0];
  const selectedPhone = selected && phoneHref(selected.phone) ? selected.phone : selected?.branchType === "Head Office" ? siteSettings.phone : "";
  const candidates = useMemo(() => matching.filter(hasCoordinates).slice(0, 8), [matching]);
  const road = useOfficeRouting(position, candidates, selected);
  const results = useMemo(() => [...matching].sort((a, b) => b.score - a.score || (
    road.metrics[a.id] && road.metrics[b.id] ? road.metrics[a.id].meters - road.metrics[b.id].meters : Number(Boolean(road.metrics[b.id])) - Number(Boolean(road.metrics[a.id]))
  )), [matching, road.metrics]);
  const closestChecked = results.find(branch => road.metrics[branch.id]);
  const mapBranches = selected && !results.some(branch => branch.id === selected.id) ? [selected, ...results] : results;

  useEffect(() => {
    const branch = new URLSearchParams(window.location.search).get("branch");
    if (branch) { setSelectedId(branch); setMapFocus("selected"); }
  }, []);
  useEffect(() => { setCopied(false); setCopyError(""); }, [selected?.id]);

  const selectBranch = (id: string, reveal = false) => {
    setSelectedId(id); setMapFocus("selected");
    if (reveal && window.innerWidth < 1024) requestAnimationFrame(() => details.current?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" }));
  };
  const locate = () => {
    if (locating) return;
    setLocationError("");
    if (!window.isSecureContext || !navigator.geolocation) { setLocationError("Location is unavailable in this browser. Search by district or office name below."); return; }
    setLocating(true);
    // Location supplies the starting point. Choosing another destination is a
    // separate, explicit action, so Head Office cannot silently become a branch.
    setSelectedId(selected?.id || "");
    const request = ++requestId.current;
    navigator.geolocation.getCurrentPosition(result => {
      if (request !== requestId.current) return;
      const current = { lat: result.coords.latitude, lng: result.coords.longitude, accuracy: result.coords.accuracy, timestamp: result.timestamp };
      setPosition(current); setPickingStart(false);
      setMapFocus("nearby"); setLocating(false);
    }, error => {
      if (request !== requestId.current) return;
      setLocating(false);
      setLocationError(error.code === 1 ? "Location access was declined. You can still find an office by name or district." : error.code === 3 ? "Finding your location took too long. Try again, or choose your district." : "We could not find your location. Search by district or office name instead.");
    }, { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 });
  };
  const reset = () => { setSelectedId(selected?.id || ""); setQuery(""); setDistrict("All districts"); setType("All offices"); setMapFocus("all"); setMapRevision(value => value + 1); };
  const copyAddress = async () => {
    if (!selected) return;
    try { await navigator.clipboard.writeText(`${selected.name} · VERC\n${selected.address}`); setCopied(true); setCopyError(""); }
    catch { setCopyError("Copy is unavailable. You can select the address text below."); }
  };

  return <section id="find-office" aria-labelledby="office-finder-title" className="scroll-mt-28 py-14 sm:py-20">
    <div className="container-custom">
      <div className="mb-7 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-brand-primary">The VERC office finder</p>
          <h2 id="office-finder-title" className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">Local support. <span className="text-brand-primary">Within reach.</span></h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">Choose your office, then use your location to plan the driving route.</p>
        </div>
        <div className="lg:max-w-xs">
          <button type="button" onClick={() => locate()} disabled={!interactive || locating} className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand-primary px-5 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-sky-900 disabled:opacity-70 sm:w-auto">
            {locating ? <Loader2 size={18} className="animate-spin" /> : <LocateFixed size={18} />}{locating ? "Finding your location…" : position ? "Refresh my location" : "Use my location"}
          </button>
          <p className="mt-2 text-[11px] leading-5 text-slate-500">Your browser asks first. Routes and nearby address details use Google Maps.</p>
        </div>
      </div>
      {locationError && <p role="alert" className="mb-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-relaxed text-amber-900">{locationError}</p>}
      {position && <div role="status" className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-sky-100 bg-sky-50 px-4 py-3 text-sm text-brand-primary">
        <span className="inline-flex items-center gap-2"><LocateFixed size={17} className="shrink-0" />{position.manual ? "Starting point selected on the map." : `Fresh GPS position · accuracy about ±${distanceLabel(position.accuracy / 1000)}.`} {road.comparing ? "Comparing nearby road distances…" : road.compared ? `${road.compared} nearby offices compared by road.` : "Distances below are approximate straight-line distances."}</span>
        <button type="button" onClick={() => { requestId.current += 1; setLocating(false); setPosition(undefined); setPickingStart(false); setMapFocus("all"); }} className="inline-flex min-h-9 items-center gap-1 text-xs font-bold underline underline-offset-4"><X size={14} /> Clear location</button>
      </div>}
      {position && road.startingAddress && <p className="mb-4 px-1 text-xs leading-6 text-slate-500">Starting point near: <strong className="font-medium text-slate-700">{road.startingAddress}</strong></p>}
      {position && selected && <div className="mb-4 overflow-hidden rounded-xl border border-sky-200 bg-sky-50/60" data-testid="route-summary">
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-4"><div><p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-brand-primary">Selected destination</p><p className="text-base font-bold text-slate-900">{selected.name}{selected.branchType !== "Head Office" ? " Branch" : ""} · {selected.upazila || selected.district}</p></div>{road.route ? <p className="text-2xl font-extrabold tracking-tight text-brand-primary">{roadDistanceLabel(road.route.meters)}<span className="ml-2 text-xs font-medium text-slate-500">by road</span></p> : <p className="text-xs font-medium text-slate-500">{road.routeError || !hasCoordinates(selected) ? "Driving distance unavailable" : "Calculating driving distance…"}</p>}</div>
        {closestChecked && closestChecked.id !== selected.id && <div className="flex flex-wrap items-center justify-between gap-3 border-t border-sky-100 bg-white px-4 py-2"><p className="text-xs leading-6 text-slate-500">Closest checked office: <strong className="text-slate-700">{closestChecked.name}</strong> · {roadDistanceLabel(road.metrics[closestChecked.id].meters)} by road.</p><button type="button" onClick={() => selectBranch(closestChecked.id, true)} className="inline-flex min-h-10 items-center gap-2 text-xs font-bold text-brand-primary">Route to this office<ChevronRight size={14} /></button></div>}
      </div>}
      {position && !position.manual && position.accuracy > 200 && <p role="status" className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-900">Your device’s location is imprecise. Try again outdoors, or choose “Set starting point” on the map to calculate from the right place.</p>}
      <div className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_12px_50px_-25px_rgba(0,75,141,0.2)]">
        <div className="grid gap-3 border-b border-slate-100 bg-slate-50/60 p-4 sm:p-5 lg:grid-cols-[1fr_190px_160px_auto]">
          <label className="relative flex min-w-0 items-center">
            <Search size={18} className="pointer-events-none absolute left-3.5 text-slate-400" /><span className="sr-only">Search offices</span>
            <input value={query} onChange={event => { setQuery(event.target.value); setMapFocus("all"); }} placeholder="Office, district, upazila or branch code" type="search" className="min-h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm outline-none focus:border-brand-primary focus:ring-2 focus:ring-sky-100" />
          </label>
          <label><span className="sr-only">Filter by district</span><select value={district} onChange={event => { setDistrict(event.target.value); setMapFocus("all"); }} className="min-h-12 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-brand-primary"><option>All districts</option>{districts.map(name => <option key={name}>{name}</option>)}</select></label>
          <label><span className="sr-only">Office type</span><select value={type} onChange={event => { setType(event.target.value); setMapFocus("all"); }} className="min-h-12 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-brand-primary"><option>All offices</option><option>Branch Office</option><option>Head Office</option></select></label>
          <button type="button" onClick={reset} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-600 hover:text-brand-primary"><SlidersHorizontal size={15} />Reset filters</button>
        </div>
        <div className="flex items-center justify-between gap-2 border-b border-slate-100 px-5 py-3">
          <p role="status" className="text-xs font-medium text-slate-500"><strong className="text-slate-900">{results.length}</strong> {results.length === 1 ? "office" : "offices"} found{query.trim() ? " · best matches first" : road.compared ? " · checked road routes first" : position ? " · approximate distance" : ""}</p>
          <div className="flex rounded-lg bg-slate-100 p-1 lg:hidden" role="group" aria-label="Office view">
            <button type="button" aria-pressed={mobileView === "list"} onClick={() => setMobileView("list")} className={`flex min-h-9 items-center gap-1.5 rounded-md px-3 text-xs font-bold ${mobileView === "list" ? "bg-white text-brand-primary shadow-sm" : "text-slate-500"}`}><List size={14} />List</button>
            <button type="button" aria-pressed={mobileView === "map"} onClick={() => setMobileView("map")} className={`flex min-h-9 items-center gap-1.5 rounded-md px-3 text-xs font-bold ${mobileView === "map" ? "bg-white text-brand-primary shadow-sm" : "text-slate-500"}`}><Map size={14} />Map</button>
          </div>
        </div>
        <div className="grid lg:grid-cols-[minmax(300px,0.75fr)_minmax(0,1.25fr)]">
          <div className={`${mobileView === "map" ? "hidden lg:block" : ""} min-w-0 border-b border-slate-100 lg:border-b-0 lg:border-r`}>
            <div className="max-h-[470px] overflow-y-auto overscroll-contain p-3 sm:max-h-[600px]" aria-label="Matching offices">
              {results.length ? results.map((branch, index) => <button type="button" key={branch.id} onClick={() => selectBranch(branch.id, true)} aria-pressed={selected?.id === branch.id} className={`mb-2 block w-full rounded-2xl border p-4 text-left transition-colors ${selected?.id === branch.id ? "border-sky-200 bg-sky-50/80" : "border-transparent hover:border-slate-200 hover:bg-slate-50"}`}>
                <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                  <span className={`rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-wide ${position && index === 0 && !query.trim() ? "bg-brand-primary text-white" : "bg-slate-100 text-slate-500"}`}>{position && index === 0 && !query.trim() ? road.compared ? "Closest checked road route" : "Nearby office" : branch.branchType || "Branch Office"}</span>
                  {branch.distance !== undefined && <span className="text-xs font-bold tabular-nums text-brand-primary">{road.metrics[branch.id] ? `${roadDistanceLabel(road.metrics[branch.id].meters)} by road` : `~${distanceLabel(branch.distance)} straight line`}</span>}
                </div>
                <div className="flex items-start justify-between gap-3"><div><h3 className="text-base font-bold text-slate-900">{branch.name}</h3><p className="mt-1 text-xs leading-5 text-slate-500">{[branch.upazila, branch.district].filter(Boolean).join(", ")}{branch.code ? ` · #${branch.code}` : ""}</p></div><ChevronRight size={17} className="mt-1 shrink-0 text-slate-400" /></div>
              </button>) : <div className="px-5 py-16 text-center"><Search size={26} className="mx-auto mb-4 text-slate-300" /><h3 className="font-bold text-slate-900">No offices match your search</h3><p className="mt-2 text-sm leading-relaxed text-slate-500">Try a nearby district, another spelling, or clear your filters.</p><button type="button" onClick={reset} className="mt-5 min-h-11 rounded-xl bg-brand-primary px-5 text-sm font-bold text-white">Show all offices</button></div>}
            </div>
            <p className="border-t border-slate-100 px-5 py-3 text-[11px] leading-5 text-slate-400">{position ? road.matrixError ? "Road comparison is unavailable. Approximate straight-line distances are labelled above." : "Up to eight nearby offices are compared by road. Other distances are labelled as straight line." : "Select an office to view its address and contact options."}</p>
          </div>
          <div className="min-w-0">
            <div className={`${mobileView === "list" ? "hidden lg:block" : ""} relative`}>
              <BranchMap branches={mapBranches} selectedId={selected?.id || ""} position={position} focus={mapFocus} resetKey={mapRevision} onSelect={id => selectBranch(id)} route={road.route} pickingStart={pickingStart} onPickStart={point => { requestId.current += 1; setLocating(false); setSelectedId(selected?.id || ""); setPosition({ ...point, accuracy: 0, manual: true, timestamp: Date.now() }); setPickingStart(false); setLocationError(""); setMapFocus("nearby"); }} />
              <button type="button" onClick={() => { setMapFocus("all"); setMapRevision(value => value + 1); }} className="absolute right-3 top-3 z-[1] min-h-10 rounded-lg border border-slate-200 bg-white px-3 text-xs font-bold text-brand-primary shadow-sm">View all results</button>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 bg-slate-50/60 px-4 py-2"><p className="text-[11px] leading-5 text-slate-500">{pickingStart ? "Click the map, or move it and press Enter, to choose your starting point." : "Wrong GPS position? Choose your starting point on the map."}</p><button type="button" aria-pressed={pickingStart} onClick={() => { setPickingStart(value => !value); setMobileView("map"); }} className="inline-flex min-h-10 items-center gap-1.5 text-xs font-bold text-brand-primary"><MapPin size={14} />{pickingStart ? "Cancel selection" : "Set starting point"}</button></div>
            <div ref={details} id="selected-office" className="scroll-mt-28 border-t border-slate-100 p-5 sm:p-6" aria-live="polite">
              {selected ? <>
                <div className="mb-4 flex items-start justify-between gap-4"><div><p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-brand-primary">{selected.branchType || "VERC office"}{selected.code ? ` · ${selected.code}` : ""}</p><h3 className="text-xl font-extrabold text-slate-900">{selected.name}</h3></div><div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-brand-primary"><Building2 size={21} /></div></div>
                <p className="flex items-start gap-2 text-sm leading-6 text-slate-600"><MapPin size={16} className="mt-1 shrink-0 text-brand-primary" /><span>{selected.address}</span></p>
                {!selected.googlePlaceId && <p className="mt-2 text-xs leading-5 text-slate-500">Directory pin · exact entrance not independently confirmed. Please confirm with this office before travelling.</p>}
                {selected.postOffice && <p className="mt-2 pl-6 text-xs leading-5 text-slate-500">Post office: {selected.postOffice}</p>}
                <div className="mt-5 rounded-xl border border-sky-100 bg-sky-50/70 p-4" data-testid="road-route">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-wide text-brand-primary">Driving route to your selected office</p>
                  <p className="mb-3 text-base font-bold text-slate-900" data-testid="route-destination">{selected.name}{selected.branchType !== "Head Office" ? " Branch" : ""} · {[selected.upazila, selected.district].filter(Boolean).join(", ")}{selected.code ? ` · #${selected.code}` : ""}</p>
                  {!position ? <><p className="text-sm leading-6 text-slate-600">Calculate road distance and estimated driving time from your location.</p><button type="button" onClick={() => locate()} disabled={!interactive || locating} className="mt-2 inline-flex min-h-10 items-center gap-2 text-xs font-bold text-brand-primary"><LocateFixed size={15} />Use my location for this route</button></> : !hasCoordinates(selected) ? <p className="text-sm text-slate-500">A confirmed office pin is needed to calculate a road route.</p> : road.route ? <><div className="flex flex-wrap items-baseline gap-x-4 gap-y-2"><strong className="text-2xl tracking-tight text-slate-900">{roadDistanceLabel(road.route.meters)}<span className="ml-1.5 text-xs font-medium text-slate-500">by road</span></strong><span className="text-sm font-bold text-brand-primary">About {drivingTime(road.route.seconds)} driving</span></div><p className="mt-2 text-[11px] leading-5 text-slate-500">To the listed office pin. Driving time uses Google traffic estimates and may change.</p>{road.route.startOffset > 200 && <p className="mt-1 text-[11px] text-amber-800">The nearest mapped road starts {distanceLabel(road.route.startOffset / 1000)} from your starting point.</p>}{road.route.endOffset > 200 && <p className="mt-1 text-[11px] text-amber-800">The mapped road ends {distanceLabel(road.route.endOffset / 1000)} from the office pin.</p>}</> : road.routeError ? <><p role="status" className="text-sm leading-6 text-slate-600">The route map could not be loaded. Try again, or open directions to this office pin in Google Maps.</p><button type="button" onClick={road.retry} className="mt-2 min-h-10 text-xs font-bold text-brand-primary">Try road routing again</button></> : <p role="status" className="inline-flex items-center gap-2 text-sm text-brand-primary"><Loader2 size={16} className="animate-spin" />Calculating the road route…</p>}
                  {position && <p className="mt-3 text-[10px] leading-5 text-slate-400">Routing by <a href="https://maps.google.com/" target="_blank" rel="noopener noreferrer" className="underline">Google Maps</a></p>}
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  <a href={directionsUrl(selected, position)} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-brand-primary px-4 py-2.5 text-xs font-bold text-white hover:bg-sky-900"><Navigation size={15} />Get directions<ArrowUpRight size={14} /></a>
                  <a href={mapsSearchUrl(selected)} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-brand-primary"><MapPin size={14} />View office pin<ArrowUpRight size={14} /></a>
                  {selectedPhone && phoneHref(selectedPhone) && <a href={phoneHref(selectedPhone)} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-700"><Phone size={14} />{selectedPhone}</a>}
                  <button type="button" onClick={copyAddress} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-600">{copied ? <Check size={14} /> : <Copy size={14} />}{copied ? "Copied" : "Copy address"}</button>
                </div>
                {copyError && <p role="status" className="mt-2 text-xs text-slate-500">{copyError}</p>}
                {onInquire ? <button type="button" onClick={() => onInquire(selected)} className="mt-4 inline-flex min-h-10 items-center gap-2 text-xs font-bold text-brand-primary">Send an inquiry about this office<ChevronRight size={14} /></button> : <a href={`/contact?branch=${encodeURIComponent(selected.id)}#send-message`} className="mt-4 inline-flex min-h-10 items-center gap-2 text-xs font-bold text-brand-primary">Send an inquiry about this office<ChevronRight size={14} /></a>}
              </> : <p className="text-sm text-slate-500">Adjust your search to select an office.</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>;
}
