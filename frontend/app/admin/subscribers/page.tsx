import React from "react";
import { Mail, UserCheck, Download } from "lucide-react";

const AdminSubscribers = () => {
  const subscribers = [
    { id: 1, email: "rahim.khan@example.com", joined: "2024-04-20", status: "Active" },
    { id: 2, email: "sarah.j@impact.org", joined: "2024-04-18", status: "Active" },
    { id: 3, email: "community.lead@vercbd.org", joined: "2024-04-10", status: "Pending" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-gray-800">Newsletter Subscribers</h3>
        <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors">
          <Download size={18} /> Export CSV
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Email Address</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Joined Date</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {subscribers.map((sub) => (
              <tr key={sub.id}>
                <td className="px-6 py-4 flex items-center gap-3">
                  <div className="p-2 bg-brand-light rounded text-brand-primary">
                    <Mail size={16} />
                  </div>
                  <span className="text-sm font-medium">{sub.email}</span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{sub.joined}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                    sub.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {sub.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="text-brand-primary text-xs font-bold hover:underline">Manage</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminSubscribers;
