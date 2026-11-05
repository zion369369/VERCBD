"use client";

import Link from "next/link";
import { FileText, ExternalLink, Users, ArrowRight, ShieldCheck } from "lucide-react";
import { useContent, OrganogramNode } from "@/context/ContentContext";

function nodeLevel(node: OrganogramNode) {
  return node.level ?? ({ "General Body": 1, "Executive Committee": 2, "Senior Management": 3, "Divisions": 5, "Field Operations": 6 }[node.category || ""] || 5);
}

export default function OrganogramPage() {
  const { aboutContent, organogramNodes } = useContent();
  const pdfUrl = aboutContent.organogramPdfUrl ?? aboutContent.organogramPdfLink;
  const levels = Array.from(new Set(organogramNodes.map(nodeLevel))).sort((a, b) => a - b);
  return <div className="min-h-screen bg-slate-50 pb-16 sm:pb-24">
    <section className="border-b border-sky-100 bg-gradient-to-br from-white to-sky-50/70 py-16 sm:py-24">
      <div className="container-custom">
        <div className="mb-6 flex items-center gap-3 text-brand-primary"><Users size={24} /><span className="text-xs font-black uppercase tracking-widest">Governance & Leadership</span></div>
        <h1 className="text-4xl font-black leading-tight tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">Organizational <br /><span className="text-brand-primary">Structure.</span></h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-xl">Our governance and leadership structure supports transparency, accountability and community-led development.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          {pdfUrl && <a href={pdfUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-brand-primary px-5 py-3 text-sm font-bold text-white shadow-lg"><FileText size={18} /> View official document <ExternalLink size={14} /></a>}
          <Link href="/about/board" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-sky-200 bg-white px-5 py-3 text-sm font-bold text-brand-primary">Board of Directors <ArrowRight size={16} /></Link>
        </div>
      </div>
    </section>
    <section className="py-12 sm:py-20" aria-label="Organizational hierarchy"><div className="container-custom max-w-5xl">
      <ol className="space-y-0">{levels.map((level, index) => {
        const nodes = organogramNodes.filter(node => nodeLevel(node) === level).sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
        return <li key={level}>
          {index > 0 && <div className="mx-auto h-8 w-px bg-sky-200 sm:h-12" aria-hidden="true" />}
          <div className={`grid gap-4 ${nodes.length > 1 ? "sm:grid-cols-2" : "mx-auto max-w-md"} ${nodes.length > 2 ? "lg:grid-cols-3" : ""}`}>
            {nodes.map(node => <article key={node.id} className={`relative min-w-0 rounded-2xl border p-6 text-center shadow-sm sm:p-8 ${index === 0 ? "border-brand-primary bg-brand-primary text-white" : "border-slate-200 bg-white text-slate-900"}`}>
              {node.isSpecial && <ShieldCheck size={18} className={`mx-auto mb-3 ${index === 0 ? "text-white" : "text-brand-primary"}`} />}
              <h2 className="break-words text-lg font-black leading-snug">{node.title}</h2>
              {node.subtitle && <p className={`mt-2 text-sm leading-relaxed ${index === 0 ? "text-white/80" : "text-slate-500"}`}>{node.subtitle}</p>}
              {node.department && <span className="mt-4 inline-block rounded-full bg-sky-50 px-3 py-1 text-xs font-bold text-brand-primary">{node.department}</span>}
            </article>)}
          </div>
        </li>;
      })}</ol>
      <p className="mx-auto mt-12 max-w-2xl text-center text-sm leading-relaxed text-slate-500">For the detailed organizational hierarchy, please refer to the official document above.</p>
    </div></section>
  </div>;
}
