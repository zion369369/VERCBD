"use client";



import { useState } from "react";

import { Plus, Pencil, Trash2, ExternalLink, Check } from "lucide-react";

import { useContent, BoardMember } from "@/context/ContentContext";

import { ImageUploadField } from "./ImageUploadField";

import ContentImage from "@/components/ContentImage";



export default function BoardMembersEditor() {

  const { aboutContent, updateAboutContent, syncStatus } = useContent();

  const members = [...(aboutContent.boardMembers || [])].sort((a, b) => a.order - b.order);

  const [draft, setDraft] = useState<BoardMember | null>(null);

  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState(false);

  const fieldClass = "mt-2 w-full rounded-xl border border-gray-200 bg-white p-3 text-sm text-gray-900 dark:border-white/10 dark:bg-[#181824] dark:text-white";

  const save = (event: React.FormEvent) => {

    event.preventDefault();

    if (uploading || !draft || !draft.name.trim() || !draft.role.trim()) return;

    const entry = { ...draft, name: draft.name.trim(), role: draft.role.trim() };

    const updated = members.some(member => member.id === draft.id) ? members.map(member => member.id === draft.id ? entry : member) : [...members, entry];

    updateAboutContent({ boardMembers: updated });

    setDraft(null);

    setSaved(true);

  };



  return <div className="space-y-6">

    <div className="flex flex-col justify-between gap-4 rounded-2xl border border-sky-100 bg-sky-50/50 p-5 sm:flex-row sm:items-center dark:border-white/10 dark:bg-white/5">

      <div><h3 className="font-bold text-gray-900 dark:text-white">Board of Directors</h3><p className="mt-1 text-sm text-gray-500">Manage names, roles, biographies, portrait uploads and display order.</p>

        <a href="/about/board" target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-brand-primary">Preview public page <ExternalLink size={14} /></a>

      </div>

      <button type="button" onClick={() => { setSaved(false); setDraft({ id: crypto.randomUUID(), name: "", role: "", bio: "", imageUrl: "", order: members.length + 1 }); }} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-brand-primary px-5 py-3 text-sm font-bold text-white"><Plus size={16} /> Add board member</button>

    </div>

    {saved && <p role="status" className="flex items-center gap-2 text-sm text-emerald-700"><Check size={16} />{syncStatus === "synced" ? "Board changes synced to the website." : syncStatus === "error" || syncStatus === "offline" ? "Changes saved locally. Server sync needs attention." : "Saving board changes…"}</p>}

    {draft && <form onSubmit={save} className="space-y-5 rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 dark:border-white/10 dark:bg-white/5">

      <h4 className="font-bold text-gray-900 dark:text-white">{members.some(member => member.id === draft.id) ? "Edit board member" : "New board member"}</h4>

      <div className="grid gap-5 sm:grid-cols-2">

        <label className="text-sm font-semibold">Full name<input required value={draft.name} onChange={e => setDraft({ ...draft, name: e.target.value })} className={fieldClass} /></label>

        <label className="text-sm font-semibold">Board role<input required value={draft.role} onChange={e => setDraft({ ...draft, role: e.target.value })} className={fieldClass} /></label>

      </div>

      <label className="block text-sm font-semibold">Biography<textarea rows={4} value={draft.bio} onChange={e => setDraft({ ...draft, bio: e.target.value })} className={fieldClass} /></label>

      <ImageUploadField label="Board portrait" value={draft.imageUrl} onUploadingChange={setUploading} onChange={imageUrl => setDraft(current => current ? { ...current, imageUrl } : current)} hint="Recommended: at least 600 × 750 px. Portraits are shown in full without cropping. JPEG, PNG or WebP." />

      <label className="block max-w-48 text-sm font-semibold">Display order<input type="number" min={1} required value={draft.order} onChange={e => setDraft({ ...draft, order: Number(e.target.value) })} className={fieldClass} /></label>

      <div className="flex flex-wrap gap-3"><button type="submit" disabled={uploading} className="min-h-11 rounded-xl bg-brand-primary px-5 py-3 text-sm font-bold text-white">{uploading ? "Uploading portrait..." : "Save board member"}</button><button type="button" onClick={() => setDraft(null)} className="min-h-11 rounded-xl border border-gray-200 px-5 py-3 text-sm font-bold">Cancel</button></div>

    </form>}

    {members.length === 0 && !draft && <p className="rounded-2xl border border-dashed border-gray-200 p-8 text-center text-sm text-gray-500">No board members published yet. Add approved profiles above.</p>}

    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{members.map(member => <article key={member.id} className="flex items-start gap-4 rounded-2xl border border-gray-200 bg-white p-4 dark:border-white/10 dark:bg-white/5">

      <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-xl bg-slate-50">{member.imageUrl ? <ContentImage src={member.imageUrl} alt={member.name} sizes="64px" className="object-contain" /> : <span className="flex h-full items-center justify-center font-bold text-brand-primary">{member.name.charAt(0)}</span>}</div>

      <div className="min-w-0 flex-1"><h4 className="break-words font-bold">{member.name}</h4><p className="text-xs text-gray-500">{member.role} · Order {member.order}</p><div className="mt-3 flex gap-2">

        <button type="button" aria-label={`Edit ${member.name}`} onClick={() => { setSaved(false); setDraft(member); }} className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50 text-brand-primary"><Pencil size={16} /></button>

        <button type="button" aria-label={`Delete ${member.name}`} onClick={() => { if (window.confirm(`Remove ${member.name} from the board?`)) { updateAboutContent({ boardMembers: members.filter(entry => entry.id !== member.id) }); setSaved(true); if (draft?.id === member.id) setDraft(null); } }} className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600"><Trash2 size={16} /></button>

      </div></div>

    </article>)}</div>

  </div>;

}

