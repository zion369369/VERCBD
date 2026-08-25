"use client";

import React, { useState } from "react";
import { Plus, Edit2, Trash2, Calendar, Newspaper, Heart, Search, Filter, CheckCircle2, X } from "lucide-react";
import { useContent, NewsItem, SuccessStory } from "@/context/ContentContext";
import { ImageUploadField } from "@/components/admin/ImageUploadField";

export default function AdminNewsPage() {
  const { news, stories, addNews, updateNews, deleteNews, addStory, updateStory, deleteStory, primaryColor, theme } = useContent();
  const [activeTab, setActiveTab] = useState<"news" | "stories">("news");
  const [searchTerm, setSearchTerm] = useState("");

  // Modal states for News
  const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [newsForm, setNewsForm] = useState<Omit<NewsItem, "id">>({
    title: "",
    slug: "",
    category: "General",
    summary: "",
    content: "",
    imageUrl: "/assets/home_official_1.jpg",
    date: new Date().toISOString().split("T")[0],
    author: "Executive Secretariat",
    status: "Published"
  });

  // Modal states for Stories
  const [isStoryModalOpen, setIsStoryModalOpen] = useState(false);
  const [editingStory, setEditingStory] = useState<SuccessStory | null>(null);
  const [storyForm, setStoryForm] = useState<Omit<SuccessStory, "id">>({
    title: "",
    slug: "",
    beneficiaryName: "",
    location: "",
    story: "",
    imageUrl: "/assets/microfinance_woman_hero.png",
    date: new Date().toISOString().split("T")[0]
  });

  const openCreateNewsModal = () => {
    setEditingNews(null);
    setNewsForm({
      title: "",
      slug: "",
      category: "Health",
      summary: "",
      content: "",
      imageUrl: "/assets/wash_hero.png",
      date: new Date().toISOString().split("T")[0],
      author: "Admin",
      status: "Published"
    });
    setIsNewsModalOpen(true);
  };

  const openEditNewsModal = (item: NewsItem) => {
    setEditingNews(item);
    setNewsForm({
      title: item.title,
      slug: item.slug,
      category: item.category,
      summary: item.summary,
      content: item.content,
      imageUrl: item.imageUrl,
      date: item.date,
      author: item.author,
      status: item.status
    });
    setIsNewsModalOpen(true);
  };

  const handleNewsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const slugVal = newsForm.slug.trim() || newsForm.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const payload = { ...newsForm, slug: slugVal };
    if (editingNews) {
      updateNews(editingNews.id, payload);
    } else {
      addNews(payload);
    }
    setIsNewsModalOpen(false);
  };

  const openCreateStoryModal = () => {
    setEditingStory(null);
    setStoryForm({
      title: "",
      slug: "",
      beneficiaryName: "",
      location: "Savar, Dhaka",
      story: "",
      imageUrl: "/assets/microfinance_woman_hero.png",
      date: new Date().toISOString().split("T")[0]
    });
    setIsStoryModalOpen(true);
  };

  const openEditStoryModal = (story: SuccessStory) => {
    setEditingStory(story);
    setStoryForm({
      title: story.title,
      slug: story.slug,
      beneficiaryName: story.beneficiaryName,
      location: story.location,
      story: story.story,
      imageUrl: story.imageUrl,
      date: story.date
    });
    setIsStoryModalOpen(true);
  };

  const handleStorySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const slugVal = storyForm.slug.trim() || storyForm.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const payload = { ...storyForm, slug: slugVal };
    if (editingStory) {
      updateStory(editingStory.id, payload);
    } else {
      addStory(payload);
    }
    setIsStoryModalOpen(false);
  };

  const filteredNews = news.filter(n => n.title.toLowerCase().includes(searchTerm.toLowerCase()) || n.summary.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredStories = stories.filter(s => s.title.toLowerCase().includes(searchTerm.toLowerCase()) || s.beneficiaryName.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-6 rounded-3xl border transition-all ${
        theme === "dark" ? "bg-[#1A1926] border-white/5 shadow-sm text-white" : "bg-white border-gray-200 shadow-sm text-gray-900"
      }`}>
        <div>
          <h2 className="text-xl font-extrabold flex items-center gap-2">
            <Newspaper style={{ color: primaryColor }} /> News, Press & Success Stories
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 font-medium">
            Publish press releases, community impact stories, and field achievements with photo galleries.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {activeTab === "news" ? (
            <button
              onClick={openCreateNewsModal}
              style={{ backgroundColor: primaryColor }}
              className="px-5 py-2.5 text-white rounded-2xl text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer hover:opacity-90"
            >
              <Plus size={16} /> Publish News Article
            </button>
          ) : (
            <button
              onClick={openCreateStoryModal}
              style={{ backgroundColor: primaryColor }}
              className="px-5 py-2.5 text-white rounded-2xl text-xs font-bold transition-all shadow-md flex items-center gap-2 cursor-pointer hover:opacity-90"
            >
              <Plus size={16} /> Add Success Story
            </button>
          )}
        </div>
      </div>

      {/* Tabs & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Tab switcher */}
        <div className={`flex p-1 rounded-2xl w-full sm:w-auto border ${
          theme === "dark" ? "bg-white/5 border-white/5" : "bg-gray-100 border-gray-200"
        }`}>
          <button
            onClick={() => setActiveTab("news")}
            style={activeTab === "news" ? { color: primaryColor } : {}}
            className={`flex-1 sm:flex-none px-6 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === "news" 
                ? "bg-white dark:bg-[#1A1926] shadow-sm font-extrabold" 
                : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            }`}
          >
            <Newspaper size={15} /> News & Articles ({news.length})
          </button>
          <button
            onClick={() => setActiveTab("stories")}
            style={activeTab === "stories" ? { color: primaryColor } : {}}
            className={`flex-1 sm:flex-none px-6 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
              activeTab === "stories" 
                ? "bg-white dark:bg-[#1A1926] shadow-sm font-extrabold" 
                : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            }`}
          >
            <Heart size={15} /> Success Stories ({stories.length})
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-11 pr-4 py-2.5 rounded-2xl text-xs outline-none border transition-all ${
              theme === "dark" 
                ? "bg-[#1A1926] border-white/10 text-white placeholder-gray-500" 
                : "bg-white border-gray-200 text-gray-900 placeholder-gray-400 shadow-sm font-medium"
            }`}
          />
        </div>
      </div>

      {/* News List */}
      {activeTab === "news" && (
        <div className="space-y-4">
          {filteredNews.map((item) => (
            <div
              key={item.id}
              className={`p-6 rounded-3xl border transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6 group ${
                theme === "dark" ? "bg-[#1A1926] border-white/5" : "bg-white border-gray-200 shadow-sm hover:shadow-md"
              }`}
            >
              <div className="flex items-center gap-5 flex-1 min-w-0">
                <div className="w-20 h-20 rounded-2xl bg-gray-100 overflow-hidden flex-shrink-0 border border-gray-200">
                  <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
                <div className="space-y-1.5 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      style={{ color: primaryColor, backgroundColor: `${primaryColor}15` }}
                      className="px-2.5 py-0.5 rounded-lg text-[10px] font-extrabold uppercase"
                    >
                      {item.category}
                    </span>
                    <span className="text-[11px] text-gray-500 dark:text-gray-400 font-semibold flex items-center gap-1">
                      <Calendar size={12} /> {item.date}
                    </span>
                    <span className="text-[11px] text-gray-500 dark:text-gray-400">By {item.author}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                      item.status === "Published" ? "bg-emerald-100 text-emerald-800" : "bg-gray-100 text-gray-700"
                    }`}>
                      {item.status}
                    </span>
                  </div>
                  <h3 className="text-sm font-extrabold text-gray-900 dark:text-white truncate">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-1 font-medium">
                    {item.summary}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                <button
                  onClick={() => openEditNewsModal(item)}
                  style={{ color: primaryColor, backgroundColor: `${primaryColor}15` }}
                  className="px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer hover:opacity-90"
                >
                  <Edit2 size={14} /> Edit
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Delete article "${item.title}"?`)) {
                      deleteNews(item.id);
                    }
                  }}
                  className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all cursor-pointer"
                  title="Delete Article"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Success Stories List */}
      {activeTab === "stories" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredStories.map((story) => (
            <div
              key={story.id}
              className={`p-6 rounded-3xl border transition-all flex flex-col justify-between group ${
                theme === "dark" ? "bg-[#1A1926] border-white/5" : "bg-white border-gray-200 shadow-sm hover:shadow-md"
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gray-100 overflow-hidden flex-shrink-0 border border-gray-200">
                    <img src={story.imageUrl} alt={story.beneficiaryName} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-base font-extrabold text-gray-900 dark:text-white">{story.title}</h3>
                    <p className="text-xs font-bold" style={{ color: primaryColor }}>{story.beneficiaryName}</p>
                    <span className="text-[11px] text-gray-500 dark:text-gray-400">{story.location} • {story.date}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed font-medium line-clamp-3">
                  &quot;{story.story}&quot;
                </p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-gray-100 dark:border-white/5 mt-4">
                <button
                  onClick={() => openEditStoryModal(story)}
                  style={{ color: primaryColor, backgroundColor: `${primaryColor}15` }}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer hover:opacity-90"
                >
                  <Edit2 size={13} /> Edit
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Delete story "${story.title}"?`)) {
                      deleteStory(story.id);
                    }
                  }}
                  className="p-1.5 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all cursor-pointer"
                  title="Delete Story"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* News Modal */}
      {isNewsModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className={`w-full max-w-2xl rounded-3xl p-8 border shadow-2xl transition-all my-8 ${
            theme === "dark" ? "bg-[#1A1926] border-white/10 text-white" : "bg-white border-gray-200 text-gray-900"
          }`}>
            <div className="flex items-center justify-between pb-6 border-b border-gray-100 dark:border-white/5">
              <h3 className="text-lg font-black text-gray-900 dark:text-white">
                {editingNews ? "Edit News Article" : "Publish New Article"}
              </h3>
              <button
                onClick={() => setIsNewsModalOpen(false)}
                className="p-2 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleNewsSubmit} className="space-y-6 pt-6 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1.5">Article Headline</label>
                  <input
                    type="text"
                    required
                    value={newsForm.title}
                    onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
                    placeholder="e.g. VERC Launches 2026 Water Network"
                    className={`w-full px-4 py-2.5 rounded-xl border outline-none font-medium ${
                      theme === "dark"
                        ? "bg-[#14141E] border-white/10 text-white"
                        : "bg-gray-50 border-gray-200 text-gray-900 focus:bg-white"
                    }`}
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1.5">Category</label>
                  <select
                    value={newsForm.category}
                    onChange={(e) => setNewsForm({ ...newsForm, category: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-xl border outline-none font-medium ${
                      theme === "dark"
                        ? "bg-[#14141E] border-white/10 text-white"
                        : "bg-gray-50 border-gray-200 text-gray-900 focus:bg-white"
                    }`}
                  >
                    <option value="General">General</option>
                    <option value="Health">Health & WASH</option>
                    <option value="Education">Education</option>
                    <option value="Microfinance">Microfinance</option>
                    <option value="International">International</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1.5">Short Summary</label>
                <textarea
                  rows={2}
                  required
                  value={newsForm.summary}
                  onChange={(e) => setNewsForm({ ...newsForm, summary: e.target.value })}
                  placeholder="Summary for cards and previews..."
                  className={`w-full px-4 py-2.5 rounded-xl border outline-none font-medium ${
                    theme === "dark"
                      ? "bg-[#14141E] border-white/10 text-white"
                      : "bg-gray-50 border-gray-200 text-gray-900 focus:bg-white"
                  }`}
                />
              </div>

              {/* Image Upload Component */}
              <ImageUploadField
                label="Article Thumbnail / Cover Image"
                value={newsForm.imageUrl}
                onChange={(url) => setNewsForm({ ...newsForm, imageUrl: url })}
                hint="Upload an image for this article"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1.5">Author</label>
                  <input
                    type="text"
                    value={newsForm.author}
                    onChange={(e) => setNewsForm({ ...newsForm, author: e.target.value })}
                    className={`w-full px-4 py-2.5 rounded-xl border outline-none font-medium ${
                      theme === "dark"
                        ? "bg-[#14141E] border-white/10 text-white"
                        : "bg-gray-50 border-gray-200 text-gray-900 focus:bg-white"
                    }`}
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1.5">Status</label>
                  <select
                    value={newsForm.status}
                    onChange={(e) => setNewsForm({ ...newsForm, status: e.target.value as any })}
                    className={`w-full px-4 py-2.5 rounded-xl border outline-none font-medium ${
                      theme === "dark"
                        ? "bg-[#14141E] border-white/10 text-white"
                        : "bg-gray-50 border-gray-200 text-gray-900 focus:bg-white"
                    }`}
                  >
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 dark:border-white/5">
                <button
                  type="button"
                  onClick={() => setIsNewsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/5 font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ backgroundColor: primaryColor }}
                  className="px-6 py-2.5 text-white rounded-xl font-bold shadow-md cursor-pointer hover:opacity-90"
                >
                  {editingNews ? "Save Changes" : "Publish Article"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Story Modal */}
      {isStoryModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className={`w-full max-w-2xl rounded-3xl p-8 border shadow-2xl transition-all my-8 ${
            theme === "dark" ? "bg-[#1A1926] border-white/10 text-white" : "bg-white border-gray-200 text-gray-900"
          }`}>
            <div className="flex items-center justify-between pb-6 border-b border-gray-100 dark:border-white/5">
              <h3 className="text-lg font-black text-gray-900 dark:text-white">
                {editingStory ? "Edit Success Story" : "Add New Success Story"}
              </h3>
              <button
                onClick={() => setIsStoryModalOpen(false)}
                className="p-2 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleStorySubmit} className="space-y-6 pt-6 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1.5">Story Headline</label>
                  <input
                    type="text"
                    required
                    value={storyForm.title}
                    onChange={(e) => setStoryForm({ ...storyForm, title: e.target.value })}
                    placeholder="e.g. From Marginalized Farmer to Micro-Entrepreneur"
                    className={`w-full px-4 py-2.5 rounded-xl border outline-none font-medium ${
                      theme === "dark"
                        ? "bg-[#14141E] border-white/10 text-white"
                        : "bg-gray-50 border-gray-200 text-gray-900 focus:bg-white"
                    }`}
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1.5">Beneficiary / Leader Name</label>
                  <input
                    type="text"
                    required
                    value={storyForm.beneficiaryName}
                    onChange={(e) => setStoryForm({ ...storyForm, beneficiaryName: e.target.value })}
                    placeholder="e.g. Jahanara Begum"
                    className={`w-full px-4 py-2.5 rounded-xl border outline-none font-medium ${
                      theme === "dark"
                        ? "bg-[#14141E] border-white/10 text-white"
                        : "bg-gray-50 border-gray-200 text-gray-900 focus:bg-white"
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1.5">Location</label>
                <input
                  type="text"
                  value={storyForm.location}
                  onChange={(e) => setStoryForm({ ...storyForm, location: e.target.value })}
                  placeholder="e.g. Savar, Dhaka"
                  className={`w-full px-4 py-2.5 rounded-xl border outline-none font-medium ${
                    theme === "dark"
                      ? "bg-[#14141E] border-white/10 text-white"
                      : "bg-gray-50 border-gray-200 text-gray-900 focus:bg-white"
                  }`}
                />
              </div>

              {/* Image Upload Component */}
              <ImageUploadField
                label="Story Photo"
                value={storyForm.imageUrl}
                onChange={(url) => setStoryForm({ ...storyForm, imageUrl: url })}
                hint="Upload a portrait or field photograph"
              />

              <div>
                <label className="block font-bold text-gray-700 dark:text-gray-300 mb-1.5">Full Story Narrative</label>
                <textarea
                  rows={4}
                  required
                  value={storyForm.story}
                  onChange={(e) => setStoryForm({ ...storyForm, story: e.target.value })}
                  placeholder="Detail the challenges faced, the VERC intervention, and the long-term impact..."
                  className={`w-full px-4 py-2.5 rounded-xl border outline-none font-medium ${
                    theme === "dark"
                      ? "bg-[#14141E] border-white/10 text-white"
                      : "bg-gray-50 border-gray-200 text-gray-900 focus:bg-white"
                  }`}
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100 dark:border-white/5">
                <button
                  type="button"
                  onClick={() => setIsStoryModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-white/5 font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ backgroundColor: primaryColor }}
                  className="px-6 py-2.5 text-white rounded-xl font-bold shadow-md cursor-pointer hover:opacity-90"
                >
                  {editingStory ? "Save Changes" : "Create Story"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
