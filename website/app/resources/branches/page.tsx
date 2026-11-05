"use client";

import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";
import { useContent } from "@/context/ContentContext";
import BranchLocator from "@/components/BranchLocator";

export default function BranchNetworkPage() {
  const { branches } = useContent();
  const districts = new Set(branches.map(branch => branch.district)).size;
  return <div className="min-h-screen bg-white">
    <section className="border-b border-sky-100 bg-gradient-to-br from-sky-50 to-white py-12 sm:py-20">
      <div className="container-custom">
        <p className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-primary"><MapPin size={17} />Our local network</p>
        <h1 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-6xl">A local team.<br /><span className="text-brand-primary">A stronger connection.</span></h1>
        <p className="mt-5 max-w-xl text-base leading-7 text-slate-500">Explore {branches.length} VERC office locations across {districts} districts. Find your nearest team, get directions, and plan your visit.</p>
        <Link href="/contact#send-message" className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-brand-primary">Contact our team<ArrowUpRight size={16} /></Link>
      </div>
    </section>
    <BranchLocator />
  </div>;
}
