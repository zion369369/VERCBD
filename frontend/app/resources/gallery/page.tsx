"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Camera, Images, Maximize2, Search, X } from "lucide-react";
import { useContent } from "@/context/ContentContext";
import { galleryCategories, galleryCategoryLabel } from "@/lib/photoLibrary";
import { normalizePlace } from "@/lib/branchDirectory";
import GalleryPhoto from "@/components/GalleryPhoto";

export default function GalleryPage() {
  const { gallery } = useContent();
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [previewFailed, setPreviewFailed] = useState("");
  const dialog = useRef<HTMLDialogElement>(null);
  const categories = useMemo(() => ["All", ...Array.from(new Set([...galleryCategories, ...gallery.map(photo => photo.category)])).filter(name => name !== "All" && gallery.some(photo => photo.category === name))], [gallery]);
  const filtered = useMemo(() => {
    const terms = normalizePlace(query).split(" ").filter(Boolean);
    return gallery.filter(photo => (category === "All" || photo.category === category) && terms.every(term => normalizePlace(`${photo.title} ${photo.description || ""} ${photo.category} ${galleryCategoryLabel(photo.category)}`).includes(term)));
  }, [gallery, category, query]);
  const activeIndex = filtered.findIndex(photo => photo.id === activeId);
  const active = filtered[activeIndex];
  const open = Boolean(active);
  const move = (direction: number) => { if (filtered.length) setActiveId(filtered[(activeIndex + direction + filtered.length) % filtered.length].id); };
  const reset = () => { setCategory("All"); setQuery(""); };

  useEffect(() => {
    if (!open) return;
    const element = dialog.current;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (element && !element.open) element.showModal();
    return () => { element?.close(); document.body.style.overflow = overflow; };
  }, [open]);

  const featured = gallery.slice(0, 3);
  return <div className="min-h-screen bg-[#fcfdff] text-slate-900">
    <section className="relative overflow-hidden border-b border-sky-100 bg-gradient-to-br from-sky-50 via-white to-sky-50/70">
      <div className="container-custom grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1fr_0.95fr] lg:gap-16">
        <div>
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.17em] text-brand-primary"><Camera size={15} />VERC photo gallery</p>
          <h1 className="max-w-xl text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-[58px]">Community life,<br /><span className="text-brand-primary">in focus.</span></h1>
          <p className="mt-5 max-w-lg text-base leading-7 text-slate-500">Explore learning, livelihoods, clean water and the people at the heart of our work.</p>
          <a href="#photo-collection" className="mt-7 inline-flex min-h-12 items-center gap-3 rounded-xl bg-brand-primary px-5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-sky-900">Explore the collection<ArrowDown size={16} /></a>
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-500"><span className="inline-flex items-center gap-2"><Images size={16} className="text-brand-primary" /><strong className="text-slate-800">{gallery.length}</strong> photos to explore</span><span>{Math.max(0, categories.length - 1)} themes. Many perspectives.</span></div>
        </div>
        {featured.length > 0 && <div className="grid h-[240px] grid-cols-[1.25fr_1fr] grid-rows-2 gap-3 sm:h-[310px]" aria-label="Highlights from the collection">
          {featured.map((photo, index) => <button key={photo.id} type="button" onClick={() => { reset(); setActiveId(photo.id); }} aria-label={`View ${photo.title}`} className={`group relative overflow-hidden rounded-2xl bg-sky-100 text-left ring-1 ring-black/5 ${index === 0 ? "row-span-2" : ""}`}>
            <GalleryPhoto photo={photo} priority sizes={index === 0 ? "(max-width: 1023px) 55vw, 320px" : "(max-width: 1023px) 40vw, 240px"} className="transition-transform duration-500 group-hover:scale-105 motion-reduce:transform-none" />
            <span className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-transparent to-transparent" />
            <span className="absolute bottom-3 left-3 right-3 text-xs font-semibold leading-5 text-white sm:bottom-4 sm:left-4">{galleryCategoryLabel(photo.category)}</span>
          </button>)}
        </div>}
      </div>
    </section>

    <section id="photo-collection" aria-labelledby="collection-title" className="container-custom scroll-mt-28 py-10 sm:py-14">
      <div className="mb-6 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div><p className="mb-2 text-[10px] font-bold uppercase tracking-[0.17em] text-brand-primary">Our visual collection</p><h2 id="collection-title" className="text-2xl font-extrabold tracking-tight sm:text-3xl">Find a moment that speaks to you.</h2></div>
        <label className="relative flex w-full items-center lg:w-80"><Search size={18} className="pointer-events-none absolute left-4 text-slate-400" /><span className="sr-only">Search photos</span><input type="search" placeholder="Search photos or themes" value={query} onChange={event => setQuery(event.target.value)} className="min-h-12 w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm outline-none focus:border-brand-primary focus:ring-2 focus:ring-sky-100" /></label>
      </div>
      <div className="mb-6 flex flex-wrap gap-2" role="group" aria-label="Photo categories">
        {categories.map(name => <button key={name} type="button" aria-pressed={category === name} onClick={() => setCategory(name)} className={`inline-flex min-h-11 items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-semibold transition-colors ${category === name ? "border-brand-primary bg-brand-primary text-white" : "border-slate-200 bg-white text-slate-600 hover:border-sky-300 hover:text-brand-primary"}`}>
          {name === "All" ? "All photos" : galleryCategoryLabel(name)}<span className={`rounded-md px-1.5 py-0.5 text-[10px] tabular-nums ${category === name ? "bg-white/15" : "bg-slate-100 text-slate-500"}`}>{name === "All" ? gallery.length : gallery.filter(photo => photo.category === name).length}</span>
        </button>)}
      </div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-5"><p role="status" className="text-xs text-slate-500">Showing <strong className="text-slate-900">{filtered.length}</strong> of {gallery.length} photos</p>{(query || category !== "All") && <button type="button" onClick={reset} className="inline-flex min-h-9 items-center gap-1.5 text-xs font-bold text-brand-primary"><X size={14} />Clear filters</button>}</div>

      <div className="grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" data-testid="photo-grid">
        {filtered.map(photo => <button key={photo.id} type="button" onClick={() => setActiveId(photo.id)} aria-label={`Open photo: ${photo.title}`} className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white text-left transition-shadow hover:shadow-[0_12px_32px_-16px_rgba(0,75,141,0.3)] focus-visible:ring-2 focus-visible:ring-brand-primary">
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100"><GalleryPhoto photo={photo} sizes="(max-width: 479px) calc(100vw - 32px), (max-width: 1023px) 46vw, (max-width: 1279px) 30vw, 290px" className="transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transform-none" /><span className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/50 bg-white/95 text-brand-primary shadow-sm"><Maximize2 size={15} /></span></div>
          <div className="flex w-full flex-1 flex-col px-4 pb-5 pt-4"><p className="mb-2 text-[10px] font-bold uppercase tracking-wide text-brand-primary">{galleryCategoryLabel(photo.category)}</p><h3 className="text-sm font-bold leading-5 text-slate-900">{photo.title}</h3>{photo.description && <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-500">{photo.description}</p>}<span className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 transition-colors group-hover:text-brand-primary">View photograph<ArrowUpRight size={13} /></span></div>
        </button>)}
      </div>
      {filtered.length === 0 && <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-5 py-20 text-center"><Search size={28} className="mx-auto mb-4 text-slate-300" /><h3 className="text-lg font-bold">{gallery.length ? "No photos match your search" : "New photographs are on their way"}</h3><p className="mt-2 text-sm text-slate-500">{gallery.length ? "Try a different word or explore another theme." : "Please visit again to explore our collection."}</p>{gallery.length > 0 && <button type="button" onClick={reset} className="mt-6 min-h-11 rounded-xl bg-brand-primary px-5 text-sm font-bold text-white">Show all photos</button>}</div>}
      <p className="mt-8 text-center text-xs leading-5 text-slate-400">Select a photo to see the full frame. Use the arrows to explore.</p>
    </section>

    <dialog ref={dialog} aria-labelledby="photo-viewer-title" onCancel={() => setActiveId(null)} onClick={event => { if (event.target === event.currentTarget) setActiveId(null); }} onKeyDown={event => { if (event.key === "ArrowLeft" || event.key === "ArrowRight") { event.preventDefault(); move(event.key === "ArrowRight" ? 1 : -1); } }} className="m-auto w-[calc(100%-24px)] max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-slate-950 p-0 text-white shadow-2xl backdrop:bg-slate-950/85 backdrop:backdrop-blur-sm sm:w-[calc(100%-48px)]">
      {active && <>
        <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-2"><p className="text-xs text-slate-300">{activeIndex + 1} / {filtered.length}<span className="mx-2 text-white/20">|</span>{galleryCategoryLabel(active.category)}</p><button type="button" autoFocus aria-label="Close photo viewer" onClick={() => setActiveId(null)} className="flex h-11 w-11 items-center justify-center rounded-lg text-white hover:bg-white/10"><X size={21} /></button></div>
        <div className="flex h-[48dvh] min-h-40 items-center justify-center overflow-hidden bg-black px-3 sm:h-[60dvh]">
          {previewFailed === active.imageUrl ? <p role="status" className="p-8 text-center text-sm text-slate-300">This photograph is temporarily unavailable.</p> : <img key={active.imageUrl} src={active.imageUrl} alt={active.title} onError={() => setPreviewFailed(active.imageUrl)} style={{ maxWidth: active.width ? `min(100%, ${active.width}px)` : "100%" }} className="max-h-full w-auto object-contain" />}
        </div>
        <div className="flex items-start justify-between gap-3 p-4 sm:p-5"><div className="min-w-0"><h2 id="photo-viewer-title" className="text-sm font-bold leading-5 sm:text-base">{active.title}</h2>{active.description && <p className="mt-1 max-h-16 overflow-y-auto text-xs leading-5 text-slate-400">{active.description}</p>}</div><div className="flex shrink-0 gap-1 sm:gap-2"><button type="button" aria-label="Previous photo" disabled={filtered.length < 2} onClick={() => move(-1)} className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 hover:bg-white/10 disabled:opacity-30"><ArrowLeft size={18} /></button><button type="button" aria-label="Next photo" disabled={filtered.length < 2} onClick={() => move(1)} className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 hover:bg-white/10 disabled:opacity-30"><ArrowRight size={18} /></button></div></div>
      </>}
    </dialog>
  </div>;
}
