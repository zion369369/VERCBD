"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Bot, Loader2, MessageSquare, Plus, Send, X } from "lucide-react";
import { FAQ_TOPICS } from "@/lib/chatRules";

interface Source { title: string; url: string }
interface Message { id: string; role: "user" | "assistant"; text: string; sources?: Source[] }
const welcome = (language: string): Message => ({ id: "welcome", role: "assistant", text: language === "bn" ? "হ্যালো! ভার্কের কার্যক্রম, অফিস, নিয়োগ এবং প্রতিবেদন খুঁজে পেতে সাহায্য করতে পারি। কী জানতে চান?" : "Hello! I can help you explore VERC’s programs, find an office, check recruitment information, or locate reports. What would you like to know?" });
const safeUrl = (url: string) => typeof url === "string" && (/^\/(?!\/)/.test(url) || /^https:\/\//.test(url));
const inline = (text: string) => text.split(/(\*\*[^*]+\*\*)/g).map((part,index)=>part.startsWith("**") ? <strong key={index}>{part.slice(2,-2)}</strong> : part);
function MessageText({ text }: { text: string }) { return <div className="space-y-2 whitespace-pre-wrap break-words">{text.split("\n").filter(line=>line.trim()).map((line,index)=><p key={index} className={/^[-*] /.test(line)?"pl-2":""}>{/^[-*] /.test(line)?"• ":""}{inline(line.replace(/^[-*] /,""))}</p>)}</div>; }

export default function Chatbot() {
  const pathname = usePathname();
  const [open,setOpen] = useState(false), [language,setLanguage] = useState<"en"|"bn">("en");
  const [messages,setMessages] = useState<Message[]>([welcome("en")]);
  const [input,setInput] = useState(""), [loading,setLoading] = useState(false), [error,setError] = useState("");
  const [suggestions,setSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLTextAreaElement>(null), end = useRef<HTMLDivElement>(null), launcher = useRef<HTMLButtonElement>(null), controller = useRef<AbortController>();
  const requestVersion = useRef(0);
  const close = () => { setOpen(false); setTimeout(()=>launcher.current?.focus(),0); };
  useEffect(()=>{ if(open){ inputRef.current?.focus(); end.current?.scrollIntoView({block:"nearest"}); } },[open]);
  useEffect(()=>{ if(open) end.current?.scrollIntoView({block:"nearest",behavior:"auto"}); },[messages,loading,open]);
  useEffect(()=>()=>{requestVersion.current+=1;controller.current?.abort();},[]);
  useEffect(()=>{ setMessages(previous=>previous.length===1&&previous[0].id==="welcome"?[welcome(language)]:previous);setSuggestions([]); },[language]);
  if(pathname?.startsWith("/admin")) return null;

  const send = async (override?: string) => {
    const text = (override ?? input).trim();
    if(!text || loading || text.length>1500) return;
    setError("");setInput("");setLoading(true);
    setMessages(previous=>[...previous,{id:`user-${Date.now()}`,role:"user",text}]);
    const abort = new AbortController();controller.current=abort;
    const version = ++requestVersion.current;
    const timeout=setTimeout(()=>abort.abort(),18000);
    try {
      const response=await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message:text,history:messages.slice(-8).map(message=>({role:message.role,content:message.text})),language}),signal:abort.signal});
      const data=await response.json();
      if(version!==requestVersion.current) return;
      if(!response.ok || typeof data.answer!=="string") throw new Error(data.error || "The assistant could not load an answer. Please try again.");
      setMessages(previous=>[...previous,{id:`assistant-${Date.now()}`,role:"assistant",text:data.answer,sources:Array.isArray(data.sources)?data.sources.filter((source:Source)=>source&&safeUrl(source.url)).slice(0,4):[]}]);
      setSuggestions(Array.isArray(data.suggestions)?data.suggestions.slice(0,4):[]);
    } catch { if(version===requestVersion.current){setInput(text);setError(language==="bn"?"তথ্য আনতে সমস্যা হয়েছে। আবার চেষ্টা করুন অথবা যোগাযোগ পেজ দেখুন।":"I couldn’t retrieve the website information. Please try again, or visit Contact Us.");} }
    finally {clearTimeout(timeout);if(version===requestVersion.current){setLoading(false);inputRef.current?.focus();}}
  };

  return <div className="fixed bottom-4 right-4 z-[90] flex flex-col items-end font-sans sm:bottom-6 sm:right-6">
    {open && <section role="dialog" aria-label="VERC website assistant" onKeyDown={event=>{if(event.key==="Escape")close();}} className="mb-3 flex h-[min(650px,calc(100dvh-100px))] w-[min(420px,calc(100vw-24px))] flex-col overflow-hidden rounded-2xl border border-sky-100 bg-white shadow-[0_20px_80px_-20px_rgba(0,50,95,0.35)]">
      <header className="flex shrink-0 items-center justify-between gap-3 border-b border-slate-100 bg-sky-50/70 px-4 py-4"><div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-primary text-white"><Bot size={22} /></span><div><h2 className="text-sm font-extrabold text-slate-900">VERC Assistant</h2><p className="mt-1 text-[10px] text-slate-500">{language==="bn"?"প্রকাশিত তথ্য থেকে সহায়তা":"Answers from the VERC website"}</p></div></div><div className="flex gap-1"><button type="button" aria-label="Start a new chat" onClick={()=>{requestVersion.current+=1;controller.current?.abort();setLoading(false);setMessages([welcome(language)]);setInput("");setSuggestions([]);setError("");}} className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-500 hover:bg-white"><Plus size={19}/></button><button type="button" aria-label="Close chat" onClick={close} className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-500 hover:bg-white"><X size={20}/></button></div></header>
      <div className="min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain px-4 py-5" role="log" aria-live="polite" aria-relevant="additions" aria-label="Chat messages">
        {messages.map(message=><div key={message.id} className={`flex ${message.role==="user"?"justify-end":"justify-start"}`}><div className={`max-w-[94%] rounded-2xl px-4 py-3 text-[13px] leading-6 ${message.role==="user"?"rounded-tr-sm bg-brand-primary text-white":"rounded-tl-sm bg-slate-50 text-slate-700"}`}><MessageText text={message.text}/>{message.sources?.length ? <div className="mt-3 space-y-1 border-t border-slate-200 pt-2"><p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">{language==="bn"?"আরও জানুন":"Explore the source"}</p>{message.sources.map(source=><a key={source.url} href={source.url} target={source.url.startsWith("https:")?"_blank":undefined} rel="noopener noreferrer" className="flex min-h-9 items-center justify-between gap-3 text-xs font-semibold text-brand-primary hover:underline"><span>{source.title}</span><ArrowUpRight size={13} className="shrink-0"/></a>)}</div>:null}</div></div>)}
        {loading&&<p role="status" className="flex items-center gap-2 text-xs text-slate-500"><Loader2 size={15} className="animate-spin"/>{language==="bn"?"তথ্য খুঁজছি…":"Finding the right information…"}</p>}
        {error&&<p role="alert" className="rounded-xl bg-amber-50 p-3 text-xs leading-6 text-amber-900">{error} <a href="/contact" className="font-bold underline">Contact Us</a></p>}
        <div ref={end}/>
      </div>
      <div className="shrink-0 border-t border-slate-100 bg-white p-3 sm:p-4"><div className="mb-3 flex gap-2 overflow-x-auto pb-1" aria-label="Suggested questions">{(suggestions.length?suggestions:FAQ_TOPICS.map(topic=>language==="bn"?topic.bn:topic.en)).map(question=><button key={question} type="button" disabled={loading} onClick={()=>send(question)} className="min-h-10 shrink-0 rounded-xl border border-slate-200 bg-white px-3 text-[11px] font-semibold text-slate-600 hover:border-sky-300 hover:text-brand-primary disabled:opacity-50">{question}</button>)}</div>
        <form onSubmit={event=>{event.preventDefault();send();}} className="flex items-end gap-2 rounded-xl border border-slate-200 bg-slate-50 p-2 focus-within:border-brand-primary"><label className="sr-only" htmlFor="verc-chat-question">{language==="bn"?"আপনার প্রশ্ন":"Your question"}</label><textarea ref={inputRef} id="verc-chat-question" value={input} onChange={event=>setInput(event.target.value)} onKeyDown={event=>{if(event.key==="Enter"&&!event.shiftKey&&!event.nativeEvent.isComposing){event.preventDefault();send();}}} maxLength={1500} rows={2} placeholder={language==="bn"?"ভার্ক সম্পর্কে প্রশ্ন করুন…":"Ask a question about VERC…"} className="min-h-11 max-h-24 min-w-0 flex-1 resize-none bg-transparent px-2 py-1 text-sm text-slate-800 outline-none"/><button type="submit" aria-label="Send message" disabled={!input.trim()||loading} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brand-primary text-white hover:bg-sky-900 disabled:opacity-40"><Send size={17}/></button></form>
        <footer className="mt-3 flex items-center justify-between gap-3"><div className="flex gap-1" role="group" aria-label="Chat language">{(["en","bn"]as const).map(value=><button type="button" key={value} aria-pressed={language===value} disabled={loading} onClick={()=>setLanguage(value)} className={`min-h-8 rounded-md px-2.5 text-[10px] font-bold ${language===value?"bg-sky-50 text-brand-primary":"text-slate-400"}`}>{value==="en"?"English":"বাংলা"}</button>)}</div><p className="text-[10px] text-slate-400">Powered by <strong className="font-bold text-slate-600">Hellotek</strong></p></footer>
      </div>
    </section>}
    <button ref={launcher} type="button" aria-label={open?"Close VERC assistant":"Open VERC assistant"} aria-expanded={open} onClick={()=>open?close():setOpen(true)} className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-primary text-white shadow-lg transition-colors hover:bg-sky-900">{open?<X size={24}/>:<MessageSquare size={26}/>}</button>
  </div>;
}
