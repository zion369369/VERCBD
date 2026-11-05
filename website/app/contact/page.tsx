"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, Building2, CheckCircle2, Globe2, Loader2, Mail, MessageSquare, Navigation, Phone, Send, ChevronLeft, ChevronRight } from "lucide-react";
import { useContent, BranchOffice } from "@/context/ContentContext";
import { directionsUrl, phoneHref } from "@/lib/branchDirectory";
import BranchLocator from "@/components/BranchLocator";
import ContentImage from "@/components/ContentImage";
import Link from "next/link";

export default function ContactPage() {
  const { siteSettings, branches, heroSlides, gallery, refreshMessages } = useContent();
  const photos = gallery.filter((photo, index, all) => photo.imageUrl && photo.imageUrl !== "/assets/health_hero.png" && all.findIndex(item => item.imageUrl === photo.imageUrl) === index);
  const headOffice = branches.find(branch => branch.branchType === "Head Office");
  const districtCount = new Set(branches.map(branch => branch.district)).size;
  const branchCount = branches.filter(branch => branch.branchType !== "Head Office").length;
  const formRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const submissionId = useRef("");
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "General inquiry", branchId: "", message: "" });
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const fieldClass = "mt-2 min-h-12 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-shadow placeholder:text-slate-400 focus:border-brand-primary focus:ring-4 focus:ring-sky-50";

  useEffect(() => {
    const branchId = new URLSearchParams(window.location.search).get("branch");
    if (branchId) setForm(current => ({ ...current, branchId }));
  }, []);

  const inquireAbout = (branch: BranchOffice) => {
    setForm(current => ({ ...current, branchId: branch.id, subject: "Branch visit or local support" }));
    setSent(false);
    formRef.current?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
    document.getElementById("contact-office")?.focus({ preventScroll: true });
  };
  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (sending) return;
    setError(""); setSent(false); setSending(true);
    submissionId.current ||= crypto.randomUUID();
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...form, submissionId: submissionId.current }) });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.error || "Your message could not be sent. Please try again.");
      await refreshMessages().catch(() => {});
      setSent(true); submissionId.current = "";
      setForm({ name: "", email: "", phone: "", subject: "General inquiry", branchId: "", message: "" });
    } catch (issue) {
      setError(issue instanceof Error ? issue.message : "We could not send your message. Please try again or contact us by phone.");
    } finally { setSending(false); }
  };

  return <div className="min-h-screen bg-white text-slate-900">
    <section className="relative overflow-hidden border-b border-sky-100 bg-gradient-to-br from-sky-50 via-white to-slate-50 py-12 sm:py-16 lg:py-20">
      <div className="container-custom">
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-sky-200/80 bg-white px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.18em] text-brand-primary"><span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />Contact & locations</span>
            <h1 className="max-w-2xl text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">Real people.<br /><span className="text-brand-primary">Local support.</span></h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">A question, an idea, or a visit to plan? Connect with the VERC team, wherever you are in Bangladesh.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#find-office" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-brand-primary px-5 py-3 text-sm font-bold text-white shadow-sm hover:bg-sky-900"><Navigation size={17} />Find a VERC office<ArrowRight size={16} /></a>
              <a href="#send-message" className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700"><MessageSquare size={17} />Send a message</a>
            </div>
          </div>
          <div className="overflow-hidden rounded-[28px] border border-white bg-[#003b70] text-white shadow-[0_20px_55px_-25px_rgba(0,75,141,0.45)]">
            <div className="relative aspect-[16/9] overflow-hidden bg-slate-200">
              <ContentImage src={heroSlides.find(slide => slide.enabled !== false)?.imageUrl || "/assets/home_official_1.jpg"} alt="VERC community and institutional work" sizes="(max-width: 1023px) calc(100vw - 32px), 500px" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-[#003b70]/80 via-transparent to-transparent" />
              <span className="absolute bottom-5 left-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest backdrop-blur-sm"><Globe2 size={14} />Rooted in communities</span>
            </div>
            <div className="p-6 sm:px-8">
              <p className="text-lg font-bold">One network. Closer connections.</p>
              <div className="mt-5 grid grid-cols-3 gap-3 border-t border-white/15 pt-5">
                {[{ value: branchCount, label: "Branch offices" }, { value: districtCount, label: "Districts" }, { value: branches.filter(branch => branch.branchType === "Head Office").length, label: "Head office" }].map(stat => <div key={stat.label}><p className="text-3xl font-extrabold tabular-nums">{stat.value}</p><p className="mt-1 text-[11px] leading-5 text-sky-100/80">{stat.label}</p></div>)}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 grid divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm md:grid-cols-3 md:divide-x md:divide-y-0">
          <a href={headOffice ? directionsUrl(headOffice) : "#find-office"} target={headOffice ? "_blank" : undefined} rel="noopener noreferrer" className="group flex min-w-0 items-start gap-3 p-5 transition-colors hover:bg-sky-50/60"><Building2 size={20} className="mt-0.5 shrink-0 text-brand-primary" /><div className="min-w-0"><h2 className="text-sm font-bold">Visit head office</h2><p className="mt-1 text-xs leading-5 text-slate-500">{headOffice?.address || siteSettings.address}</p></div><ArrowUpRight size={15} className="ml-auto shrink-0 text-slate-400" /></a>
          <a href={`mailto:${siteSettings.email}`} className="group flex min-w-0 items-start gap-3 p-5 transition-colors hover:bg-sky-50/60"><Mail size={20} className="mt-0.5 shrink-0 text-brand-primary" /><div className="min-w-0"><h2 className="text-sm font-bold">Write to us</h2><p className="mt-1 break-all text-sm text-slate-500">{siteSettings.email}</p><p className="mt-1 text-xs text-slate-400">General inquiries & partnerships</p></div><ArrowUpRight size={15} className="ml-auto shrink-0 text-slate-400" /></a>
          <a href={phoneHref(siteSettings.phone) || "#send-message"} className="group flex min-w-0 items-start gap-3 p-5 transition-colors hover:bg-sky-50/60"><Phone size={20} className="mt-0.5 shrink-0 text-brand-primary" /><div className="min-w-0"><h2 className="text-sm font-bold">Speak with our team</h2><p className="mt-1 text-sm text-slate-500">{siteSettings.phone}</p>{siteSettings.hotline && <p className="mt-1 text-xs text-slate-400">Hotline: {siteSettings.hotline}</p>}</div><ArrowUpRight size={15} className="ml-auto shrink-0 text-slate-400" /></a>
        </div>
      </div>
    </section>

    <BranchLocator onInquire={inquireAbout} />

    <section ref={formRef} id="send-message" aria-labelledby="contact-message-title" className="scroll-mt-28 border-t border-slate-100 bg-slate-50/70 py-14 sm:py-20">
      <div className="container-custom grid items-start gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
        <div>
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-brand-primary">Start a conversation</p>
          <h2 id="contact-message-title" className="text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl">Tell us how<br />we can help.</h2>
          <p className="mt-5 max-w-md text-sm leading-7 text-slate-500 sm:text-base">For program information, local support, or a new partnership, leave a message for our team. Select an office if your inquiry is about a specific location.</p>
          <div className="mt-8 rounded-2xl border border-sky-100 bg-sky-50/80 p-5 sm:p-6"><div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white text-brand-primary"><Phone size={19} /></div><h3 className="font-bold text-slate-900">Prefer a conversation?</h3><p className="mt-2 text-sm leading-6 text-slate-500">Call the head office, or find your branch number in the office finder above.</p><a href={phoneHref(siteSettings.phone) || `mailto:${siteSettings.email}`} className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-brand-primary">{siteSettings.phone}<ArrowUpRight size={16} /></a></div>
        </div>
        <div className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
          {sent && <div role="status" className="mb-6 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900"><CheckCircle2 size={20} className="mt-0.5 shrink-0" /><div><p className="font-bold">Thank you. Your message has been received.</p><p className="mt-1 leading-6">Your inquiry is now with the VERC team.</p></div></div>}
          {error && <p role="alert" className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-700">{error}</p>}
          <form onSubmit={submit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="text-xs font-bold text-slate-700">Full name <span className="text-slate-400">*</span><input required maxLength={120} autoComplete="name" value={form.name} onChange={event => setForm({ ...form, name: event.target.value })} placeholder="Your full name" className={fieldClass} /></label>
              <label className="text-xs font-bold text-slate-700">Email address <span className="text-slate-400">*</span><input type="email" required maxLength={200} autoComplete="email" value={form.email} onChange={event => setForm({ ...form, email: event.target.value })} placeholder="you@example.com" className={fieldClass} /></label>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="text-xs font-bold text-slate-700">Phone <span className="font-normal text-slate-400">(optional)</span><input type="tel" maxLength={40} autoComplete="tel" value={form.phone} onChange={event => setForm({ ...form, phone: event.target.value })} placeholder="Your contact number" className={fieldClass} /></label>
              <label className="text-xs font-bold text-slate-700">What can we help with?<select value={form.subject} onChange={event => setForm({ ...form, subject: event.target.value })} className={fieldClass}><option>General inquiry</option><option>Branch visit or local support</option><option>Program information</option><option>Microfinance inquiry</option><option>Partnership proposal</option><option>Donation inquiry</option><option>Career opportunity</option></select></label>
            </div>
            <label className="block text-xs font-bold text-slate-700">Office <span className="font-normal text-slate-400">(optional)</span><select id="contact-office" value={form.branchId} onChange={event => setForm({ ...form, branchId: event.target.value })} className={fieldClass}><option value="">General inquiry — no specific office</option>{branches.map(branch => <option key={branch.id} value={branch.id}>{branch.name} · {branch.district}{branch.code ? ` (#${branch.code})` : ""}</option>)}</select></label>
            <label className="block text-xs font-bold text-slate-700">Your message <span className="text-slate-400">*</span><textarea required rows={5} maxLength={5000} value={form.message} onChange={event => setForm({ ...form, message: event.target.value })} placeholder="A few details will help us connect you with the right team…" className={`${fieldClass} resize-y`} /></label>
            <div className="flex flex-col justify-between gap-4 border-t border-slate-100 pt-5 sm:flex-row sm:items-center"><p className="max-w-xs text-[11px] leading-5 text-slate-400">We use these details to respond to your inquiry. Your live location is never included.</p><button type="submit" disabled={sending} className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-brand-primary px-6 py-3 text-sm font-bold text-white hover:bg-sky-900 disabled:opacity-60">{sending ? <Loader2 size={17} className="animate-spin" /> : <Send size={17} />}{sending ? "Sending…" : "Send message"}</button></div>
          </form>
        </div>
      </div>
    </section>
    {photos.length > 0 && <section aria-labelledby="contact-gallery-title" className="border-t border-slate-100 py-14 sm:py-20">
      <div className="container-custom">
        <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="mb-3 text-xs font-bold uppercase tracking-widest text-brand-primary">People behind the purpose</p><h2 id="contact-gallery-title" className="max-w-xl text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">Every connection starts<br className="hidden sm:block" /> with community.</h2></div><div className="flex items-center gap-3"><Link href="/resources/gallery" className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-brand-primary">View photo gallery<ArrowUpRight size={16} /></Link><div className="flex gap-1">{([-1, 1] as const).map(direction => <button key={direction} type="button" aria-label={direction === 1 ? "Next photos" : "Previous photos"} onClick={() => galleryRef.current?.scrollBy({ left: direction * 300, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" })} className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-brand-primary hover:bg-sky-50">{direction === 1 ? <ChevronRight size={17} /> : <ChevronLeft size={17} />}</button>)}</div></div></div>
        <div ref={galleryRef} role="region" aria-label="Photos from our work" tabIndex={0} className="flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain pb-4">
          {photos.map(photo => <Link key={photo.id} href="/resources/gallery" className="group w-[260px] max-w-[80vw] shrink-0 snap-start overflow-hidden rounded-2xl border border-slate-200 bg-white sm:w-[285px]">
            <div className="relative aspect-[4/3] overflow-hidden bg-slate-100"><ContentImage src={photo.imageUrl} alt={photo.title} sizes="(max-width: 639px) 80vw, 285px" className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transform-none" /></div><div className="p-4"><p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-brand-primary">{photo.category}</p><span className="inline-flex items-center gap-2 text-xs font-semibold text-slate-600">Explore the gallery<ArrowUpRight size={14} /></span></div>
          </Link>)}
        </div>
      </div>
    </section>}
  </div>;
}
