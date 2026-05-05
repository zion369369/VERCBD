import React from "react";
import { Plus, Edit2, Trash2, Calendar, Newspaper } from "lucide-react";

const AdminNews = () => {
  const news = [
    { 
      id: 1, 
      title: "World Bank delegation visits VERC Mother & Child Hospital", 
      date: "2024-04-15", 
      status: "Published", 
      author: "Admin" 
    },
    { 
      id: 2, 
      title: "VERC Awarded for Pioneer Work in Sanitation", 
      date: "2024-03-22", 
      status: "Draft", 
      author: "Media Team" 
    },
    { 
      id: 3, 
      title: "New Education Program Launched in Rajshahi", 
      date: "2024-02-10", 
      status: "Published", 
      author: "Admin" 
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <Newspaper className="text-brand-primary" /> News & Updates
        </h3>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={18} /> Create Article
        </button>
      </div>

      {/* News List */}
      <div className="grid grid-cols-1 gap-4">
        {news.map((article) => (
          <div key={article.id} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between group hover:border-brand-primary transition-colors">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-brand-light rounded-lg flex flex-col items-center justify-center text-brand-primary">
                <span className="text-xs font-bold uppercase">{article.date.split('-')[1]}</span>
                <span className="text-xl font-bold">{article.date.split('-')[2]}</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 group-hover:text-brand-primary transition-colors">
                  {article.title}
                </h4>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                  <span className="flex items-center gap-1"><Calendar size={14} /> {article.date}</span>
                  <span>By {article.author}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    article.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {article.status}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="p-2 text-gray-400 hover:text-brand-primary hover:bg-brand-light rounded-lg transition-colors">
                <Edit2 size={18} />
              </button>
              <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminNews;
