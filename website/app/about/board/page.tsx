"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck, Users } from "lucide-react";
import { useContent } from "@/context/ContentContext";
import ContentImage from "@/components/ContentImage";

export default function BoardPage() {
  const { aboutContent } = useContent();
  const members = [...(aboutContent.boardMembers || [])].sort((a, b) => a.order - b.order);
  return <div className="bg-slate-50 min-h-screen">
    <section className="relative overflow-hidden border-b border-sky-100 bg-gradient-to-br from-white via-sky-50/60 to-white py-16 sm:py-24">
      <div className="container-custom relative">
        <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap gap-2 text-sm text-slate-500"><Link href="/about" className="hover:text-brand-primary">About Us</Link><span aria-hidden="true">/</span><span className="text-brand-primary">Board of Directors</span></nav>
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-sky-100 bg-white px-4 py-2 text-xs font-bold uppercase tracking-widest text-brand-primary"><ShieldCheck size={16} /> Governance & Accountability</div>
        <h1 className="max-w-4xl text-4xl font-black leading-tight tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">Board of <span className="text-brand-primary">Directors.</span></h1>
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">Our board guides VERC’s strategic direction and upholds our commitment to transparent, accountable, community-led development.</p>
      </div>
    </section>
    <section className="py-12 sm:py-20"><div className="container-custom">
      {members.length ? <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{members.map(member => <article key={member.id} className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm transition-shadow hover:shadow-xl">
        <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-b from-slate-100 to-slate-50">{member.imageUrl ? <ContentImage src={member.imageUrl} alt={member.name} sizes="(max-width: 639px) calc(100vw - 32px), (max-width: 1023px) 50vw, 400px" className="object-contain p-4" /> : <div className="flex h-full items-center justify-center text-7xl font-black text-brand-primary/20" aria-hidden="true">{member.name.split(" ").map(part => part[0]).slice(0, 2).join("")}</div>}</div>
        <div className="p-6 sm:p-8"><p className="mb-2 text-xs font-bold uppercase tracking-wider text-brand-primary">{member.role}</p><h2 className="text-2xl font-black text-slate-900">{member.name}</h2>{member.bio && <p className="mt-4 whitespace-pre-line break-words text-sm leading-relaxed text-slate-600">{member.bio}</p>}</div>
      </article>)}</div> : <div className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white p-8 text-center sm:p-12"><Users className="mx-auto mb-5 text-brand-primary" size={36} /><h2 className="text-2xl font-bold text-slate-900">Our governance team</h2><p className="mt-4 leading-relaxed text-slate-600">For information about our current board, please contact VERC.</p><Link href="/contact" className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-xl bg-brand-primary px-6 py-3 font-bold text-white">Contact us <ArrowRight size={16} /></Link></div>}
      <Link href="/about/organogram" className="mt-10 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-brand-primary">Explore our organizational structure <ArrowRight size={16} /></Link>
    </div></section>
  </div>;
}
