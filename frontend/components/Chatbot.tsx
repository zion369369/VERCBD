"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, Send, Bot, User, Loader2, MessageSquare, Info, History, Target, Shield, Award, Users, ChevronLeft, MapPin, Phone, Mail, BookOpen, Heart, Droplets, Briefcase, Globe, Zap, Activity } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import logo from "@/app/assets/logo.png";

interface Message {
  role: "user" | "model";
  text: string;
}

const FAQ_PROMPTS = [
  { en: "About VERC", bn: "ভার্ক সম্পর্কে", icon: "🏛️" },
  { en: "Core Programs", bn: "প্রধান কার্যক্রম", icon: "📋" },
  { en: "WASH Support", bn: "WASH সহায়তা", icon: "💧" },
  { en: "Contact Us", bn: "যোগাযোগ", icon: "📞" }
];

const formatMessage = (text: string) => {
  return text.split('\n').map((line, i) => {
    const formattedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
      return (
        <li key={i} className="ml-4 list-disc mb-1" dangerouslySetInnerHTML={{ __html: formattedLine.replace(/^[-*]\s/, '') }} />
      );
    }
    return <p key={i} className="mb-2 last:mb-0" dangerouslySetInnerHTML={{ __html: formattedLine }} />;
  });
};

const AboutView = ({ onClose, language }: { onClose: () => void, language: "en" | "bn" }) => {
  return (
    <motion.div 
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="absolute inset-0 bg-white z-50 flex flex-col"
    >
      <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
        <div className="flex items-center gap-4">
            <button onClick={onClose} className="p-2 hover:bg-gray-50 rounded-full transition-colors">
            <ChevronLeft size={24} className="text-gray-400" />
            </button>
            <h3 className="font-bold text-lg text-[#1a1a1a]">{language === "en" ? "About Us" : "আমাদের সম্পর্কে"}</h3>
        </div>
        <button onClick={onClose} className="p-2 text-gray-300 hover:text-gray-600">
            <X size={20} />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-8 space-y-12 scrollbar-hide bg-[#FDFDFD]">
        {/* Journey Begins */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 text-brand-primary">
            <History size={24} strokeWidth={2.5} />
            <h4 className="font-black uppercase tracking-[0.2em] text-[11px]">{language === "en" ? "Journey Begins" : "যাত্রার শুরু"}</h4>
          </div>
          <div className="space-y-4">
            <p className="text-[15px] leading-relaxed text-gray-700 font-medium">
                {language === "en" 
                  ? "VERC started its journey as a project of SCF-USA back in 1977 with an aim to provide process consultancy to ensure effective community participation. By 1989, it became a separate local organization serving the entire NGO sector in Bangladesh."
                  : "ভার্ক ১৯৭৭ সালে SCF-USA-এর একটি প্রকল্প হিসেবে যাত্রা শুরু করে যার লক্ষ্য ছিল কার্যকর জনঅংশগ্রহণ নিশ্চিত করা। ১৯৮৯ সাল থেকে এটি একটি স্বতন্ত্র স্থানীয় সংস্থা হিসেবে বাংলাদেশের সমগ্র এনজিও খাতে অবদান রাখছে।"}
            </p>
            <p className="text-[14px] leading-relaxed text-gray-600 border-l-2 border-gray-100 pl-6 italic">
                {language === "en"
                  ? "Currently, VERC focuses on implementing high-impact development projects while maintaining its pioneering status in Non Formal Education (NFE) and Community Led Total Sanitation (CLTS)."
                  : "বর্তমানে ভার্ক উচ্চ-প্রভাবশালী উন্নয়ন প্রকল্প বাস্তবায়নে মনোনিবেশ করছে এবং এনএফই (NFE) ও সিএলটিএস (CLTS) কর্মসূচিতে অগ্রণী ভূমিকা পালন করছে।"}
            </p>
          </div>
        </section>

        {/* Vision, Mission, Goals */}
        <section className="grid grid-cols-1 gap-6">
            <div className="bg-[#f0f7ff] p-8 rounded-[32px] space-y-4 border border-blue-100/50">
                <div className="flex items-center gap-3 text-brand-primary">
                    <Target size={22} />
                    <h4 className="font-black uppercase tracking-[0.2em] text-[11px]">{language === "en" ? "Societal Vision" : "সামাজিক লক্ষ্য"}</h4>
                </div>
                <p className="text-[15px] leading-relaxed text-gray-800 font-bold">
                    {language === "en"
                        ? "A self-reliant and enlightened society based on justice, equity and sustainability where every human being has equal opportunity to maximize their potentials."
                        : "একটি স্বনির্ভর ও আলোকিত সমাজ যেখানে প্রতিটি মানুষ ন্যায়বিচার, সাম্য এবং স্থায়িত্বের ভিত্তিতে নিজের সম্ভাবনা বিকাশের সমান সুযোগ পায়।"}
                </p>
            </div>

            <div className="bg-white border border-gray-100 p-8 rounded-[32px] shadow-sm space-y-4">
                <div className="flex items-center gap-3 text-brand-primary">
                    <Shield size={22} />
                    <h4 className="font-black uppercase tracking-[0.2em] text-[11px]">{language === "en" ? "Mission Statement" : "মিশন স্টেটমেন্ট"}</h4>
                </div>
                <p className="text-[14px] leading-relaxed text-gray-600 font-medium">
                    {language === "en"
                        ? "Transforming the lives of marginalized, disadvantaged and destitute people by providing humanitarian assistance and building resilient livelihoods."
                        : "মানবিক সহায়তা প্রদান এবং স্থিতিস্থাপক জীবিকা গঠনের মাধ্যমে প্রান্তিক ও সুবিধাবঞ্চিত মানুষের জীবন পরিবর্তন করা।"}
                </p>
            </div>

            <div className="bg-white border border-gray-100 p-8 rounded-[32px] shadow-sm space-y-4">
                <div className="flex items-center gap-3 text-brand-primary">
                    <Zap size={22} />
                    <h4 className="font-black uppercase tracking-[0.2em] text-[11px]">{language === "en" ? "Our Goals" : "আমাদের লক্ষ্য"}</h4>
                </div>
                <p className="text-[14px] leading-relaxed text-gray-600 font-medium">
                    {language === "en"
                        ? "Sustainable socio-economic development of the disadvantaged and destitute people exploring their potentials and adaptation capacities."
                        : "সুবিধাবঞ্চিত মানুষের সম্ভাবনা এবং অভিযোজন ক্ষমতা অন্বেষণের মাধ্যমে টেকসই আর্থ-সামাজিক উন্নয়ন।"}
                </p>
            </div>
        </section>

        {/* Core Values & Competencies */}
        <section className="space-y-8">
            <div className="space-y-4">
                <div className="flex items-center gap-3 text-brand-primary">
                    <Award size={22} />
                    <h4 className="font-black uppercase tracking-[0.2em] text-[11px]">{language === "en" ? "Core Values" : "মূল মূল্যবোধ"}</h4>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    {["Participation", "Respect", "Environment Friendly", "Sustainability", "Innovation", "Good Governance", "Equality"].map((val, i) => (
                        <div key={i} className="px-4 py-3 bg-gray-50 rounded-2xl text-[13px] font-bold text-gray-700 flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-brand-primary rounded-full"></div>
                            {val}
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-4">
                <div className="flex items-center gap-3 text-brand-primary">
                    <Users size={22} />
                    <h4 className="font-black uppercase tracking-[0.2em] text-[11px]">{language === "en" ? "Core Competencies" : "কোর কম্পিটেন্সি"}</h4>
                </div>
                <div className="grid grid-cols-1 gap-2">
                    {["Innovativeness", "Professionalism", "Teamwork", "Participatory Management", "Learning Organization", "Resource Sharing", "Networking & Partnership"].map((comp, i) => (
                        <div key={i} className="px-5 py-3 border border-gray-100 rounded-2xl text-[13px] font-medium text-gray-600 flex items-center justify-between">
                            {comp}
                            <ChevronLeft size={14} className="rotate-180 text-gray-300" />
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* Programmatic Focus */}
        <section className="space-y-6">
            <div className="flex items-center gap-3 text-brand-primary">
                <BookOpen size={22} />
                <h4 className="font-black uppercase tracking-[0.2em] text-[11px]">{language === "en" ? "Thematic Areas & Focus" : "থিম্যাটিক এরিয়া এবং ফোকাস"}</h4>
            </div>
            <div className="grid grid-cols-2 gap-4">
                {[
                    { label: "Life Skill Education", icon: <BookOpen size={18} /> },
                    { label: "Health Services", icon: <Heart size={18} /> },
                    { label: "WASH Support", icon: <Droplets size={18} /> },
                    { label: "Micro Finance", icon: <Briefcase size={18} /> },
                    { label: "Climate Adaptation", icon: <Globe size={18} /> },
                    { label: "Humanitarian Response", icon: <Shield size={18} /> }
                ].map((item, i) => (
                    <div key={i} className="p-5 bg-white border border-gray-100 rounded-[28px] shadow-sm flex flex-col gap-3 hover:border-brand-primary/20 transition-colors group">
                        <div className="text-brand-primary group-hover:scale-110 transition-transform w-fit">{item.icon}</div>
                        <span className="text-[13px] font-bold text-gray-800 leading-tight">{item.label}</span>
                    </div>
                ))}
            </div>
        </section>

        {/* Pioneering Contributions */}
        <section className="space-y-6">
            <div className="flex items-center gap-3 text-brand-primary">
                <Globe size={24} />
                <h4 className="font-black uppercase tracking-[0.2em] text-[11px]">{language === "en" ? "Pioneering Contributions" : "অন্যান্য অবদানসমূহ"}</h4>
            </div>
            <div className="space-y-6">
                <div className="space-y-3">
                    <h5 className="font-black text-[13px] text-gray-900 uppercase tracking-widest">Community Led Total Sanitation (CLTS)</h5>
                    <p className="text-[14px] text-gray-600 leading-relaxed">
                        {language === "en"
                            ? "Introduced in Feb 2000, VERC pioneered the 'People Initiated 100% Sanitation Approach'. It is now a global gold standard replicated across the national sanitation program strategy."
                            : "২০০০ সালের ফেব্রুয়ারিতে ভার্ক 'পিপল ইনিশিয়েটেড ১০০% স্যানিটেশন অ্যাপ্রোচ' শুরু করে, যা এখন জাতীয় এবং বৈশ্বিক স্যানিটেশন কৌশলের একটি অবিচ্ছেদ্য অংশ।"}
                    </p>
                </div>
                <div className="space-y-3">
                    <h5 className="font-black text-[13px] text-gray-900 uppercase tracking-widest">Non Formal Education (NFE)</h5>
                    <p className="text-[14px] text-gray-600 leading-relaxed">
                        {language === "en"
                            ? "Initiated community-run school models and adult education strategies that have been adapted and replicated worldwide by leading development organizations."
                            : "কমিউনিটি চালিত স্কুল মডেল এবং বয়স্ক শিক্ষা কৌশল চালু করেছে যা বিশ্বজুড়ে নেতৃস্থানীয় উন্নয়ন সংস্থাসমূহ অনুকরণ করেছে।"}
                    </p>
                </div>
            </div>
        </section>

        {/* Contact Footer */}
        <section className="pt-8 border-t border-gray-100 space-y-6">
            <div className="flex gap-4">
                <MapPin size={18} className="text-gray-300 mt-1" />
                <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Headquarters</p>
                    <p className="text-[13px] text-gray-600 font-medium leading-relaxed">B30, Ekhlas Uddin Khan Road, Anandapur, Savar, Dhaka, Bangladesh</p>
                </div>
            </div>
            <div className="flex gap-4">
                <Phone size={18} className="text-gray-300 mt-1" />
                <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Phone & Support</p>
                    <p className="text-[13px] text-gray-600 font-medium">+88 02223371216, +88 02223371217</p>
                </div>
            </div>
            <div className="flex gap-4">
                <Mail size={18} className="text-gray-300 mt-1" />
                <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Official Email</p>
                    <p className="text-[13px] text-gray-600 font-medium underline">verc@bangla.net, info@vercbd.org</p>
                </div>
            </div>
        </section>

        <div className="h-10" />
      </div>
    </motion.div>
  );
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [input, setInput] = useState("");
  const [language, setLanguage] = useState<"en" | "bn">("en");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{
        role: "model",
        text: language === "en" 
          ? "**Hello!** I am your **VERC AI Assistant**. How can I help you today?" 
          : "**নমস্কার!** আমি আপনার **ভার্ক এআই সহকারী**। আমি আপনাকে কীভাবে সাহায্য করতে পারি?",
      }]);
    }
  }, [language, messages.length]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  };

  useEffect(() => {
    if (isOpen && !isAboutOpen) scrollToBottom();
  }, [messages, isOpen, isAboutOpen]);

  const handleSend = async (textOverride?: string) => {
    const triggerAbout = ["About VERC", "ভার্ক সম্পর্কে", "About Us", "আমাদের সম্পর্কে", "Who is VERC", "ভার্ক কে", "Introduction", "পরিচিতি"];
    if (triggerAbout.some(trigger => textOverride?.includes(trigger) || input.includes(trigger))) {
        setIsAboutOpen(true);
        return;
    }

    const textToSend = textOverride || input;
    if (!textToSend.trim() || isLoading) return;

    const userMessage = textToSend;
    if (!textOverride) setInput("");
    
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setIsLoading(true);

    try {
      const history = messages.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage, history }),
      });

      if (!response.ok) throw new Error("Failed to connect");

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantText = "";
      
      setMessages((prev) => [...prev, { role: "model", text: "" }]);
      setIsLoading(false);

      if (reader) {
        let buffer = "";
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || ""; // Keep the last partial line in the buffer
          
          for (const line of lines) {
            const trimmedLine = line.trim();
            if (!trimmedLine || !trimmedLine.startsWith("data: ")) continue;
            
            try {
              const data = JSON.parse(trimmedLine.slice(6));
              const newText = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
              assistantText += newText;
              
              setMessages((prev) => {
                  const newMessages = [...prev];
                  newMessages[newMessages.length - 1].text = assistantText;
                  return newMessages;
              });
              scrollToBottom();
            } catch (e) {
              console.error("Stream parse error:", e);
            }
          }
        }
      }
    } catch (error) {
      setMessages((prev) => [...prev, { role: "model", text: "Sorry, I'm having trouble connecting right now." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 40, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 40 }}
            className="relative bg-white rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] w-[460px] h-[720px] flex flex-col overflow-hidden border border-gray-100 mb-4"
          >
            {/* About & Info Overlay */}
            <AnimatePresence>
                {isAboutOpen && (
                    <AboutView language={language} onClose={() => setIsAboutOpen(false)} />
                )}
            </AnimatePresence>

            {/* Header */}
            <div className="px-8 py-6 flex justify-between items-center bg-white border-b border-gray-50">
              <div className="flex items-center gap-4">
                <button onClick={() => setIsAboutOpen(true)} className="relative group cursor-pointer transition-transform hover:scale-105 active:scale-95">
                  <div className="bg-gray-50 p-2.5 rounded-2xl border border-gray-100">
                    <Image src={logo} alt="VERC" width={32} height={32} className="object-contain" />
                  </div>
                  <div className="absolute -top-1 -right-1 bg-brand-primary p-1 rounded-full text-white shadow-sm">
                    <Info size={10} />
                  </div>
                </button>
                <div>
                  <h3 className="font-bold text-[#1a1a1a] text-[16px] tracking-tight">VERC AI Assistant</h3>
                  <p className="text-[11px] text-gray-400 font-medium tracking-wide flex items-center gap-1.5 uppercase">
                    <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></span>
                    Professional Support
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2.5 hover:bg-gray-50 rounded-full transition-colors text-gray-300 hover:text-gray-600"
              >
                <X size={20} strokeWidth={2.5} />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6 scrollbar-hide bg-white">
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`flex gap-3.5 max-w-[90%] ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                    {msg.role === "model" && (
                      <div className="mt-1 flex-shrink-0">
                        <div className="bg-[#f0f4f9] p-1.5 rounded-lg">
                          <Bot size={14} className="text-brand-primary" />
                        </div>
                      </div>
                    )}
                    <div className={`px-5 py-3.5 rounded-[24px] text-[15px] leading-relaxed tracking-tight ${
                      msg.role === "user" 
                        ? "bg-brand-primary text-white shadow-sm rounded-tr-[4px]" 
                        : "bg-[#f8f9fa] text-[#2c3e50] rounded-tl-[4px] font-medium"
                    }`}>
                      {formatMessage(msg.text)}
                    </div>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start px-2">
                   <div className="bg-[#f8f9fa] px-4 py-2.5 rounded-xl flex items-center gap-2">
                    <Loader2 size={14} className="animate-spin text-gray-400" />
                    <span className="text-[11px] text-gray-400 font-bold uppercase tracking-widest">Typing</span>
                   </div>
                </div>
              )}
              <div ref={messagesEndRef} className="h-2" />
            </div>

            {/* Controls Area */}
            <div className="p-8 bg-white border-t border-gray-50">
              <div className="flex flex-wrap gap-2.5 mb-6 overflow-x-auto scrollbar-hide">
                {FAQ_PROMPTS.map((faq, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.02, backgroundColor: "#f0f4f9" }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSend(language === "en" ? faq.en : faq.bn)}
                    className="whitespace-nowrap px-4 py-2 bg-white border border-gray-200 rounded-full text-[12px] text-[#555] font-bold transition-all shadow-sm flex items-center gap-2"
                  >
                    <span>{faq.icon}</span>
                    {language === "en" ? faq.en : faq.bn}
                  </motion.button>
                ))}
              </div>

              <div className="relative">
                <div className="flex items-center bg-[#f0f4f9] rounded-[28px] p-1.5 transition-all focus-within:bg-white focus-within:ring-2 focus-within:ring-brand-primary/10 border border-transparent focus-within:border-brand-primary/20">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder={language === "en" ? "Ask a question..." : "একটি প্রশ্ন জিজ্ঞাসা করুন..."}
                    className="flex-1 bg-transparent border-none focus:ring-0 focus:outline-none outline-none text-[15px] text-[#1a1a1a] py-3 pl-5 placeholder:text-gray-400 resize-none max-h-32 min-h-[48px] font-medium"
                    rows={1}
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSend()}
                    disabled={!input.trim() || isLoading}
                    className={`p-3 rounded-full transition-all ${
                      input.trim() && !isLoading 
                        ? "bg-brand-primary text-white shadow-md" 
                        : "text-gray-300"
                    }`}
                  >
                    <Send size={20} strokeWidth={2.5} />
                  </motion.button>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between px-2">
                <div className="flex items-center gap-1 bg-[#f8f9fa] p-1 rounded-full border border-gray-100">
                    <button 
                      onClick={() => setLanguage("en")}
                      className={`px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.1em] rounded-full transition-all ${language === "en" ? "bg-white text-brand-primary shadow-sm" : "text-gray-400"}`}
                    >
                      EN
                    </button>
                    <button 
                      onClick={() => setLanguage("bn")}
                      className={`px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.1em] rounded-full transition-all ${language === "bn" ? "bg-white text-brand-primary shadow-sm" : "text-gray-400"}`}
                    >
                      BN
                    </button>
                </div>
                <div className="flex items-center gap-2 text-gray-300 group cursor-pointer" onClick={() => setIsAboutOpen(true)}>
                    <Info size={12} className="group-hover:text-brand-primary transition-colors" />
                    <span className="text-[10px] font-bold uppercase tracking-widest group-hover:text-brand-primary transition-colors">About & Contact</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="group relative h-16 w-16 bg-brand-primary text-white rounded-2xl shadow-xl flex items-center justify-center overflow-hidden"
          >
            <MessageSquare size={28} strokeWidth={2.5} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chatbot;
