import React from "react";
import { Save, Shield, Globe, Bell, Palette } from "lucide-react";

const AdminSettings = () => {
  return (
    <div className="max-w-4xl space-y-8">
      {/* General Settings */}
      <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm space-y-6">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <Globe className="text-brand-primary" size={20} /> Site Configuration
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Site Title</label>
            <input type="text" defaultValue="VERC | Village Education Resource Center" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-primary outline-none" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Support Email</label>
            <input type="email" defaultValue="support@vercbd.org" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-primary outline-none" />
          </div>
        </div>
      </div>

      {/* Appearance */}
      <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm space-y-6">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <Palette className="text-brand-primary" size={20} /> Appearance & Branding
        </h3>
        <div className="flex items-center gap-8">
          <div className="flex-1 space-y-2">
            <label className="text-sm font-semibold text-gray-700">Primary Brand Color</label>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#004B8D] rounded-lg border border-gray-200"></div>
              <input type="text" defaultValue="#004B8D" className="flex-1 px-4 py-2 border border-gray-200 rounded-lg outline-none" />
            </div>
          </div>
          <div className="flex-1 space-y-2">
            <label className="text-sm font-semibold text-gray-700">Accent Color</label>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#00AEEF] rounded-lg border border-gray-200"></div>
              <input type="text" defaultValue="#00AEEF" className="flex-1 px-4 py-2 border border-gray-200 rounded-lg outline-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Security */}
      <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm space-y-6">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <Shield className="text-brand-primary" size={20} /> Security & Access
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-2">
            <div>
              <div className="text-sm font-semibold">Two-Factor Authentication</div>
              <div className="text-xs text-gray-400">Add an extra layer of security to your account</div>
            </div>
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-xs font-bold uppercase">Enable</button>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="btn-primary flex items-center gap-2 px-8">
          <Save size={18} /> Save All Changes
        </button>
      </div>
    </div>
  );
};

export default AdminSettings;
