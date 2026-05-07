"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Image as ImageIcon, 
  Video, 
  Search, 
  Filter, 
  X, 
  Maximize2,
  Globe,
  Users,
  Droplets,
  BookOpen
} from "lucide-react";
import Image from "next/image";

export default function GalleryPage() {
  const [filter, setFilter] = useState("all");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const categories = [
    { id: "all", name: "All Media", icon: <Globe size={14} /> },
    { id: "education", name: "Education", icon: <BookOpen size={14} /> },
    { id: "wash", name: "WASH & Health", icon: <Droplets size={14} /> },
    { id: "empowerment", name: "Empowerment", icon: <Users size={14} /> },
  ];

  const items = [
    { id: 1, type: "image", category: "education", url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop", title: "Joyful Learning Center" },
    { id: 2, type: "image", category: "wash", url: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2026&auto=format&fit=crop", title: "Clean Water Project" },
    { id: 3, type: "image", category: "empowerment", url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop", title: "Women's Self-Help Group" },
    { id: 4, type: "image", category: "education", url: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=2073&auto=format&fit=crop", title: "Vocational Training" },
    { id: 5, type: "image", category: "wash", url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2069&auto=format&fit=crop", title: "Hygiene Awareness" },
    { id: 6, type: "image", category: "empowerment", url: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?q=80&w=2070&auto=format&fit=crop", title: "Community Meeting" },
  ];

  const filteredItems = filter === "all" ? items : items.filter(item => item.category === filter);

  return (
    <div className="bg-[#FDFDFD] min-h-screen font-sans selection:bg-brand-primary/10 overflow-x-hidden">
      {/* 1. HERO */}
      <section className="relative h-[40vh] flex items-center overflow-hidden bg-gray-900">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2071&auto=format&fit=crop" 
            alt="Media Gallery" 
            fill 
            className="object-cover opacity-50 scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/60 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-900"></div>
        </div>
        
        <div className="container-custom relative z-10 text-white">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="max-w-4xl"
          >
            <span className="inline-flex items-center gap-2 px-5 py-2 bg-brand-primary/20 backdrop-blur-xl rounded-full text-[11px] font-black uppercase tracking-[0.4em] mb-10 border border-brand-primary/30 text-brand-secondary">
              Visual Storytelling
            </span>
            <h1 className="text-5xl lg:text-8xl font-black mb-8 leading-[0.95] tracking-tighter">
              Photo & Video <br/> <span className="text-brand-secondary">Gallery.</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* 2. FILTER & GRID */}
      <section className="py-24 bg-white relative z-20 rounded-t-[64px] -mt-12">
        <div className="container-custom">
            {/* Filter Bar */}
            <div className="flex flex-wrap items-center justify-between gap-8 mb-20">
                <div className="flex flex-wrap gap-4">
                    {categories.map((cat) => (
                        <button 
                            key={cat.id}
                            onClick={() => setFilter(cat.id)}
                            className={`flex items-center gap-2 px-6 py-3 rounded-full font-black uppercase tracking-widest text-[10px] transition-all ${filter === cat.id ? "bg-brand-primary text-white shadow-xl" : "bg-gray-50 text-gray-400 hover:text-gray-900"}`}
                        >
                            {cat.icon} {cat.name}
                        </button>
                    ))}
                </div>
                <div className="relative group max-w-xs w-full">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-brand-primary transition-colors" size={16} />
                    <input type="text" placeholder="Search gallery..." className="w-full pl-12 pr-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-medium focus:bg-white focus:border-brand-primary/20 outline-none transition-all" />
                </div>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <AnimatePresence mode="popLayout">
                    {filteredItems.map((item) => (
                        <motion.div 
                            layout
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            className="group relative aspect-[4/3] rounded-[40px] overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-700"
                            onClick={() => setSelectedImage(item.url)}
                        >
                            <img src={item.url} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            <div className="absolute bottom-8 left-8 right-8 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-secondary mb-2 block">{item.category}</span>
                                <h4 className="text-xl font-black text-white">{item.title}</h4>
                            </div>
                            <div className="absolute top-8 right-8 p-4 bg-white/10 backdrop-blur-md rounded-2xl opacity-0 group-hover:opacity-100 transition-all">
                                <Maximize2 size={20} className="text-white" />
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
      </section>

      {/* 3. LIGHTBOX */}
      <AnimatePresence>
        {selectedImage && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] bg-gray-900/95 backdrop-blur-xl flex items-center justify-center p-10 lg:p-24"
                onClick={() => setSelectedImage(null)}
            >
                <button className="absolute top-10 right-10 text-white hover:rotate-90 transition-all">
                    <X size={40} />
                </button>
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="relative w-full h-full"
                >
                    <img src={selectedImage} alt="Gallery view" className="w-full h-full object-contain rounded-3xl" />
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>

      {/* 4. CTA */}
      <section className="py-40 bg-brand-light">
        <div className="container-custom text-center">
            <h3 className="text-4xl lg:text-7xl font-black text-gray-900 tracking-tighter mb-12 leading-tight">Witness the <br/> <span className="text-brand-primary">Transformation.</span></h3>
            <p className="text-xl text-gray-600 font-medium mb-16 max-w-2xl mx-auto">
                Explore more stories of change through our documentary series on Youtube.
            </p>
            <button className="px-12 py-6 bg-brand-primary text-white text-xl font-black rounded-3xl shadow-xl hover:scale-105 active:scale-95 transition-all">
                Visit Our Youtube Channel
            </button>
        </div>
      </section>
    </div>
  );
}
