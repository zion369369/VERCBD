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
import { useContent } from "@/context/ContentContext";

export default function GalleryPage() {
  const { gallery } = useContent();
  const [filter, setFilter] = useState("All");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const categories = [
    { id: "All", name: "All Media", icon: <Globe size={14} /> },
    { id: "Education", name: "Education", icon: <BookOpen size={14} /> },
    { id: "WASH", name: "Health & WaSH", icon: <Droplets size={14} /> },
    { id: "Livelihood", name: "Livelihood", icon: <Users size={14} /> },
    { id: "Events", name: "Events", icon: <ImageIcon size={14} /> },
  ];

  const filteredItems = filter === "All" ? gallery : gallery.filter(item => item.category === filter);

  return (
    <div className="bg-[#FDFDFD] min-h-screen font-sans selection:bg-brand-primary/10 overflow-x-hidden">
      {/* 1. HERO */}
      <section className="relative h-[40vh] flex items-center overflow-hidden bg-gray-900">
        <div className="absolute inset-0 z-0">
          <img 
            src="/assets/home_official_1.jpg" 
            alt="Media Gallery" 
            className="w-full h-full object-cover opacity-50 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/60 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-900"></div>
        </div>
        
        <div className="container-custom relative z-10 text-white">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-secondary/20 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-brand-secondary mb-4 border border-brand-secondary/30">
              Visual Archives
            </span>
            <h1 className="text-4xl lg:text-6xl font-black mb-4 tracking-tighter">Photo Gallery.</h1>
            <p className="text-gray-300 font-medium text-base">A glimpse into our grassroot operations, field breakthroughs, and community impact.</p>
          </motion.div>
        </div>
      </section>

      {/* 2. FILTER STRIP */}
      <section className="sticky top-24 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 py-4">
        <div className="container-custom flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                  filter === cat.id 
                    ? "bg-brand-primary text-white shadow-md shadow-brand-primary/20 scale-105" 
                    : "bg-gray-100/80 text-gray-600 hover:bg-gray-200/60"
                }`}
              >
                {cat.icon}
                {cat.name}
              </button>
            ))}
          </div>

          <div className="text-xs font-bold text-gray-400">
            Showing {filteredItems.length} photos
          </div>
        </div>
      </section>

      {/* 3. GALLERY MASONRY / GRID */}
      <section className="py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group relative rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 bg-gray-100 aspect-square cursor-pointer"
                onClick={() => setSelectedImage(item.imageUrl)}
              >
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6 text-white">
                  <span className="text-[10px] font-black uppercase tracking-widest text-brand-secondary mb-1">{item.category}</span>
                  <h4 className="font-extrabold text-sm leading-snug">{item.title}</h4>
                  {item.description && (
                    <p className="text-[11px] text-gray-300 line-clamp-2 mt-1">{item.description}</p>
                  )}
                  <div className="mt-3 flex items-center justify-between text-[10px] text-gray-400">
                    <span>{item.date}</span>
                    <Maximize2 size={14} className="text-white" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 p-3 text-white/70 hover:text-white bg-white/10 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl max-h-[85vh] rounded-3xl overflow-hidden shadow-2xl bg-black"
            >
              <img 
                src={selectedImage} 
                alt="Enlarged preview" 
                className="max-w-full max-h-[85vh] object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
