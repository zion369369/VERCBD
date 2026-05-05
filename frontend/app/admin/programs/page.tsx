import React from "react";
import { Plus, Edit2, Trash2, Search, Filter } from "lucide-react";

const AdminPrograms = () => {
  const programs = [
    { id: 1, title: "Non-Formal Education", category: "Education", status: "Active", reach: "450K+" },
    { id: 2, title: "WASH Initiative", category: "WASH", status: "Active", reach: "1.2M" },
    { id: 3, title: "Mother & Child Health", category: "Health", status: "Review", reach: "80K" },
    { id: 4, title: "Microfinance (Jagoron)", category: "Economy", status: "Active", reach: "200K" },
  ];

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search programs..." 
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary"
            />
          </div>
          <button className="p-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50">
            <Filter size={20} />
          </button>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={18} /> Add New Program
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Program Name</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Category</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Est. Reach</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {programs.map((program) => (
              <tr key={program.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="text-sm font-semibold text-gray-800">{program.title}</div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{program.category}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                    program.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {program.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{program.reach}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-3">
                    <button className="p-1 text-blue-500 hover:bg-blue-50 rounded"><Edit2 size={16} /></button>
                    <button className="p-1 text-red-500 hover:bg-red-50 rounded"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPrograms;
