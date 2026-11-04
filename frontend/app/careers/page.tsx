"use client";

import { useState } from "react";
import { ArrowDown, ArrowUpRight, BookOpen, BriefcaseBusiness, CheckCircle2, Clock3, Droplets, FileText, HeartHandshake, MapPin, Search, Sprout } from "lucide-react";
import { useContent } from "@/context/ContentContext";
import { isPublishedVacancy, VERC_BDJOBS_URL } from "@/lib/careers";
import { photoLibrary } from "@/lib/photoLibrary";
import GalleryPhoto from "@/components/GalleryPhoto";

export default function CareersPage() {
  const { jobOpenings, gallery } = useContent();
  const [query, setQuery] = useState("");
  const published = jobOpenings.filter(job => isPublishedVacancy(job));
  const jobs = published.filter(job => `${job.title} ${job.department} ${job.location}`.toLowerCase().includes(query.toLowerCase().trim()));
  const photo = gallery.find(item => item.category === "Capacity Building") || photoLibrary.find(item => item.category === "Capacity Building")!;
  return <div className="bg-[#fcfdff] text-slate-900">
    <section className="overflow-hidden border-b border-sky-100 bg-gradient-to-br from-sky-50 via-white to-sky-50/50">
      <div className="container-custom grid items-center gap-9 py-12 sm:py-16 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
        <div><p className="mb-5 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-3.5 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-brand-primary"><BriefcaseBusiness size={15} />Careers at VERC</p>
          <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-[58px]">Put your purpose<br /><span className="text-brand-primary">into practice.</span></h1>
          <p className="mt-5 max-w-lg text-base leading-7 text-slate-500">Bring your skills to work that supports learning, healthier communities and stronger livelihoods across Bangladesh.</p>
          <div className="mt-7 flex flex-wrap gap-3"><a href={VERC_BDJOBS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-brand-primary px-5 text-sm font-bold text-white shadow-sm hover:bg-sky-900">View VERC jobs on BDJobs<ArrowUpRight size={17} /></a><a href="#opportunities" className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-600">How to apply<ArrowDown size={16} /></a></div>
          <p className="mt-4 text-xs leading-5 text-slate-500">Current vacancies, requirements and deadlines are available on our BDJobs company page.</p>
        </div>
        <div className="overflow-hidden rounded-2xl border border-white bg-white shadow-[0_16px_60px_-35px_rgba(0,75,141,0.4)]"><div className="relative aspect-[16/10] bg-slate-100"><GalleryPhoto photo={photo} priority sizes="(max-width: 1023px) calc(100vw - 32px), 560px" /></div><div className="flex items-center gap-3 border-t border-slate-100 px-5 py-4"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-brand-primary"><HeartHandshake size={20} /></span><div><p className="text-sm font-bold">Work with communities. Grow with purpose.</p><p className="mt-1 text-xs text-slate-500">Village Education Resource Center</p></div></div></div>
      </div>
    </section>

    <section id="opportunities" className="container-custom scroll-mt-28 py-12 sm:py-16" aria-labelledby="opportunity-title">
      <div className="grid gap-7 lg:grid-cols-[1fr_0.65fr] lg:gap-12">
        <div><p className="mb-3 text-[10px] font-bold uppercase tracking-[0.17em] text-brand-primary">Your next step</p><h2 id="opportunity-title" className="text-3xl font-extrabold tracking-tight">Find your opportunity.</h2><p className="mt-4 max-w-xl text-sm leading-7 text-slate-500">Explore VERC’s current recruitment notices on BDJobs. Read the full circular, check that your experience matches the role, and apply through the method stated in the notice.</p>
          <div className="mt-6 rounded-2xl border border-sky-100 bg-sky-50/60 p-6"><div className="mb-4 flex items-center gap-3"><div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-brand-primary"><BriefcaseBusiness size={21} /></div><div><h3 className="font-bold">VERC on BDJobs</h3><p className="mt-1 text-xs text-slate-500">Village Education Resource Center (VERC)</p></div></div><p className="text-sm leading-6 text-slate-600">Visit our company page for the latest vacancy information and application instructions.</p><a href={VERC_BDJOBS_URL} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-xl bg-brand-primary px-4 text-sm font-bold text-white hover:bg-sky-900">Browse current vacancies<ArrowUpRight size={16} /></a><p className="mt-3 text-[11px] text-slate-400">Opens bdjobs.com in a new tab.</p></div>
        </div>
        <ol className="space-y-4 lg:pt-9">{[
          { title: "Explore the notice", text: "Review the role, location, eligibility requirements and closing date on BDJobs.", icon: Search },
          { title: "Prepare your application", text: "Keep your CV and the documents requested in the circular ready.", icon: FileText },
          { title: "Apply as instructed", text: "Follow the application process in the official notice and keep your confirmation.", icon: CheckCircle2 },
        ].map(({ title, text, icon: Icon }, index) => <li key={title} className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-brand-primary"><Icon size={18} /></span><div><p className="mb-1 text-[10px] font-bold uppercase tracking-wide text-slate-400">Step 0{index + 1}</p><h3 className="text-sm font-bold">{title}</h3><p className="mt-2 text-xs leading-6 text-slate-500">{text}</p></div></li>)}</ol>
      </div>
      {published.length > 0 && <div className="mt-12 border-t border-slate-200 pt-9"><div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><h2 className="text-2xl font-extrabold">Recruitment notices</h2><label className="relative"><span className="sr-only">Search recruitment notices</span><Search size={16} className="absolute left-3 top-4 text-slate-400" /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Role, department or location" className="min-h-12 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm sm:w-72" /></label></div><div className="grid gap-4 md:grid-cols-2">{jobs.map(job => <article key={job.id} className="rounded-2xl border border-slate-200 bg-white p-6"><p className="text-[10px] font-bold uppercase tracking-wide text-brand-primary">{job.department}</p><h3 className="mt-3 text-lg font-bold">{job.title}</h3><p className="mt-3 flex items-center gap-2 text-xs text-slate-500"><MapPin size={14} />{job.location}</p><p className="mt-2 flex items-center gap-2 text-xs text-slate-500"><Clock3 size={14} />{job.type} · Apply by {job.deadline}</p><a href={job.applicationUrl} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-brand-primary">View vacancy & apply on BDJobs<ArrowUpRight size={16} /></a></article>)}</div>{!jobs.length && <p role="status" className="py-8 text-sm text-slate-500">No notices match that search. Try another word.</p>}</div>}
    </section>

    <section className="border-t border-slate-100 bg-white py-12 sm:py-16"><div className="container-custom"><div className="mb-7 max-w-xl"><p className="mb-3 text-[10px] font-bold uppercase tracking-[0.17em] text-brand-primary">Our shared purpose</p><h2 className="text-3xl font-extrabold tracking-tight">Different skills. A common goal.</h2><p className="mt-4 text-sm leading-7 text-slate-500">Discover the areas of work that bring our teams and communities together.</p></div><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{[
      { title: "Learning & education", text: "Creating opportunities for children and young people to learn.", icon: BookOpen },
      { title: "Health & clean water", text: "Supporting healthier lives through water, sanitation and hygiene.", icon: Droplets },
      { title: "Livelihoods", text: "Working with communities to build resilient livelihoods.", icon: Sprout },
      { title: "Community capacity", text: "Sharing skills and strengthening local institutions.", icon: HeartHandshake },
    ].map(({ title, text, icon: Icon }) => <div key={title} className="rounded-2xl border border-slate-200 p-5"><Icon size={22} className="mb-5 text-brand-primary" /><h3 className="text-sm font-bold">{title}</h3><p className="mt-2 text-xs leading-6 text-slate-500">{text}</p></div>)}</div></div></section>
  </div>;
}
