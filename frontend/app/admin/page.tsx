import React from "react";
import { 
  Users, 
  BookOpen, 
  TrendingUp, 
  DollarSign, 
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";

const AdminDashboard = () => {
  const stats = [
    { name: "Total Programs", value: "12", change: "+2", icon: BookOpen, color: "bg-blue-500" },
    { name: "Impact Reach", value: "2.4M", change: "+15%", icon: Users, color: "bg-green-500" },
    { name: "Total Donations", value: "$45,200", change: "-5%", icon: DollarSign, color: "bg-purple-500" },
    { name: "Website Traffic", value: "12.5K", change: "+24%", icon: TrendingUp, color: "bg-brand-secondary" },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className={`${stat.color} p-3 rounded-lg text-white shadow-lg`}>
                <stat.icon size={24} />
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                {stat.change}
                {stat.change.startsWith('+') ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
            <div className="text-sm text-gray-500">{stat.name}</div>
          </div>
        ))}
      </div>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold mb-6">Recent Program Updates</h3>
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-4 py-4 border-b border-gray-50 last:border-0">
                <div className="w-12 h-12 bg-brand-light rounded-lg flex items-center justify-center text-brand-primary font-bold">
                  P{i}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold">New WASH Project in Savar</div>
                  <div className="text-xs text-gray-400">Updated by Admin 2 hours ago</div>
                </div>
                <button className="text-brand-primary text-xs font-bold hover:underline">Edit</button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold mb-6">Pending Impact Stories</h3>
          <div className="space-y-6">
            {[1, 2].map((i) => (
              <div key={i} className="flex items-center gap-4 py-4 border-b border-gray-50 last:border-0">
                <div className="w-12 h-12 bg-brand-light rounded-lg flex items-center justify-center text-brand-primary">
                  <Users size={20} />
                </div>
                <div className="flex-1">
                  <div className="text-sm font-semibold">Community Success in Rangpur</div>
                  <div className="text-xs text-gray-400">Waiting for approval</div>
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1 bg-green-500 text-white text-[10px] rounded font-bold uppercase">Approve</button>
                  <button className="px-3 py-1 bg-gray-100 text-gray-500 text-[10px] rounded font-bold uppercase">Review</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
