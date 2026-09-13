"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  AlertCircle, 
  Sparkles,
  KeyRound
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useContent } from "@/context/ContentContext";

export default function AdminLoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const { primaryColor, siteSettings } = useContent();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    setTimeout(() => {
      const res = login(username, password);
      if (res.success) {
        router.push("/admin");
      } else {
        setErrorMsg(res.message || "Invalid credentials provided.");
        setLoading(false);
      }
    }, 400);
  };

  const handleFillDemo = () => {
    setUsername("Superadmin.verc");
    setPassword("superadmin123");
    setErrorMsg("");
  };

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col justify-center items-center p-4 sm:p-6 font-valley font-sans select-none">
      {/* Background Decorative Glow */}
      <div 
        className="fixed top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ backgroundColor: primaryColor }}
      />

      <div className="relative w-full max-w-md">
        {/* NGO Brand Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-2.5 shadow-xl mb-3 group hover:scale-105 transition-transform">
            <img
              src={siteSettings.logoUrl || "/assets/logo.png"}
              alt="VERC Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            VERC Admin Login
          </h1>
        </div>

        {/* Login Form Container */}
        <div className="bg-white/95 dark:bg-[#1A1926]/95 backdrop-blur-xl rounded-3xl border border-white/20 dark:border-white/10 p-6 sm:p-8 shadow-2xl">
          <div className="mb-6">
            <h2 className="text-base font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <KeyRound size={18} style={{ color: primaryColor }} />
              <span>Sign in to your account</span>
            </h2>
          </div>

          {errorMsg && (
            <div className="mb-5 p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/50 flex items-center gap-2.5 text-xs text-rose-700 dark:text-rose-300 font-semibold">
              <AlertCircle size={16} className="text-rose-600 dark:text-rose-400 flex-shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            {/* Username Input */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                Username or Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <User size={16} />
                </div>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. Superadmin.verc"
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-xs font-medium text-gray-900 dark:text-white outline-none focus:ring-2 transition-all"
                  style={{ "--tw-ring-color": primaryColor } as React.CSSProperties}
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Lock size={16} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-xs font-medium text-gray-900 dark:text-white outline-none focus:ring-2 transition-all"
                  style={{ "--tw-ring-color": primaryColor } as React.CSSProperties}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 cursor-pointer"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{ backgroundColor: primaryColor }}
              className="w-full py-2.5 px-4 rounded-xl text-white font-bold text-xs tracking-wide shadow-md hover:opacity-95 active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
            >
              {loading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight size={15} />
                </>
              )}
            </button>
          </form>

          {/* Quick Helper for Superadmin Credentials */}
          <div className="mt-5 pt-4 border-t border-gray-100 dark:border-white/5">
            <div className="p-3 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/40">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Sparkles size={14} className="text-amber-600 dark:text-amber-400" />
                  <span className="text-xs font-bold text-amber-900 dark:text-amber-300">
                    Default Superadmin
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleFillDemo}
                  className="text-xs font-bold text-amber-800 dark:text-amber-300 bg-amber-200/60 dark:bg-amber-900/60 hover:bg-amber-300/80 px-2 py-0.5 rounded-lg transition-colors cursor-pointer"
                >
                  Auto-Fill
                </button>
              </div>
              <div className="mt-1.5 text-xs font-mono text-amber-900/80 dark:text-amber-200/90 space-y-0.5">
                <div>User: <span className="font-bold">Superadmin.verc</span></div>
                <div>Pass: <span className="font-bold">superadmin123</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Clean Footer */}
        <div className="mt-5 text-center text-xs text-gray-500">
          © {new Date().getFullYear()} Village Education Resource Center
        </div>
      </div>
    </div>
  );
}
