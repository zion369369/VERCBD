"use client";

import React, { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { X, Send, Bot, Loader2, MessageSquare, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import logo from "@/app/assets/logo.png";
import { FAQ_TOPICS } from "@/lib/chatRules";

interface Message {
  role: "user" | "model";
  text: string;
}

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

const Chatbot = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [language, setLanguage] = useState<"en" | "bn">("en");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMessages([{
      role: "model",
      text: language === "en" 
        ? "Hello! 👋 Welcome to the official **VERC AI Assistant**.\n\nI have complete knowledge of VERC's history, vision, programs, sanitation, education, microfinance, and contact details. How can I help you today?" 
        : "হ্যালো! 👋 অফিশিয়াল **ভার্ক এআই সহকারী**-তে আপনাকে স্বাগতম।\n\nভার্কের ইতিহাস, লক্ষ্য, স্যানিটেশন, শিক্ষা, মাইক্রোফাইন্যান্স এবং যোগাযোগের তথ্য সম্পর্কে যেকোনো প্রশ্ন করুন।",
    }]);
  }, [language]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const handleSend = async (textOverride?: string) => {
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
        body: JSON.stringify({ message: userMessage, history, language }),
      });

      if (!response.ok) {
        const errJson = await response.json();
        throw new Error(errJson.error || "Failed to connect to API");
      }

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
          buffer = lines.pop() || "";
          
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
    } catch (error: any) {
      console.error("VERC Assistant Error:", error);
      setMessages((prev) => [
        ...prev, 
        { role: "model", text: language === "en" ? "Sorry, I'm having trouble connecting right now." : "ক্ষমা করবেন, সার্ভিস নেটওয়ার্কে সংযোগ করতে সমস্যা হচ্ছে।" }
      ]);
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
            className="relative bg-white rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.1)] w-[460px] h-[600px] flex flex-col overflow-hidden border border-gray-100 mb-4"
          >
            {/* Header */}
            <div className="px-8 py-6 flex justify-between items-center bg-white border-b border-gray-50">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="bg-gray-50 p-2.5 rounded-2xl border border-gray-100">
                    <Image src={logo} alt="VERC" width={32} height={32} className="object-contain" />
                  </div>
                  <div className="absolute -top-1 -right-1 bg-brand-primary p-1 rounded-full text-white shadow-sm">
                    <Sparkles size={10} />
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-[#1a1a1a] text-[16px] tracking-tight">VERC AI Assistant</h3>
                  <p className="text-[11px] text-gray-400 font-medium tracking-wide flex items-center gap-1.5 uppercase">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                    Official VERC Support
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2.5 hover:bg-gray-50 rounded-full transition-colors text-gray-300 hover:text-gray-600 cursor-pointer"
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
                    <span className="text-[11px] text-gray-400 font-bold uppercase tracking-widest">Thinking</span>
                   </div>
                </div>
              )}
              <div ref={messagesEndRef} className="h-2" />
            </div>

            {/* Controls Area */}
            <div className="p-8 bg-white border-t border-gray-50">
              <div className="flex gap-2.5 mb-6 overflow-x-auto scrollbar-hide py-1">
                {FAQ_TOPICS.map((faq) => (
                  <motion.button
                    key={faq.id}
                    whileHover={{ scale: 1.02, backgroundColor: "#f0f4f9" }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSend(language === "en" ? faq.en : faq.bn)}
                    className="whitespace-nowrap px-4 py-2 bg-white border border-gray-200 rounded-full text-[12px] text-[#444] font-bold transition-all shadow-sm flex items-center gap-2 hover:border-brand-primary/40 cursor-pointer"
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
                    placeholder={language === "en" ? "Ask anything about VERC..." : "ভার্ক সম্পর্কে যেকোনো প্রশ্ন লিখুন..."}
                    className="flex-1 bg-transparent border-none focus:ring-0 focus:outline-none outline-none text-[15px] text-[#1a1a1a] py-3 pl-5 placeholder:text-gray-400 resize-none max-h-32 min-h-[48px] font-medium"
                    rows={1}
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSend()}
                    disabled={!input.trim() || isLoading}
                    className={`p-3 rounded-full transition-all cursor-pointer ${
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
                      className={`px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.1em] rounded-full transition-all cursor-pointer ${language === "en" ? "bg-white text-brand-primary shadow-sm" : "text-gray-400"}`}
                    >
                      EN
                    </button>
                    <button 
                      onClick={() => setLanguage("bn")}
                      className={`px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.1em] rounded-full transition-all cursor-pointer ${language === "bn" ? "bg-white text-brand-primary shadow-sm" : "text-gray-400"}`}
                    >
                      BN
                    </button>
                </div>
                <div className="flex items-center gap-1.5 text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                  <span>VERC AI Systems</span>
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
            className="group relative h-16 w-16 bg-brand-primary text-white rounded-2xl shadow-xl flex items-center justify-center overflow-hidden cursor-pointer"
          >
            <MessageSquare size={28} strokeWidth={2.5} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chatbot;
