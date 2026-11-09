"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, User, Sparkles, ArrowRight, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Welcome back! Redirecting to Dashboard...");
        router.push("/admin");
        router.refresh();
      } else {
        toast.error(data.message || "Invalid credentials.");
      }
    } catch {
      toast.error("Failed to connect to authentication server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background ambient glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#1E6FFF]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#FFC21A]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-3xl p-8 shadow-2xl relative z-10 backdrop-blur-xl">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-gradient-to-br from-[#1E6FFF] to-[#0B1F4B] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-500/20 text-white font-black text-xl">
            SK
          </div>
          <span className="inline-flex items-center gap-1.5 bg-[#FFC21A]/15 text-[#FFC21A] px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck size={14} /> Admin Access Gate
          </span>
          <h1 className="text-2xl font-black text-white">SK Softech Control Center</h1>
          <p className="text-slate-400 text-xs mt-1">Sign in with your administrator credentials</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">Username / Email</label>
            <div className="relative">
              <User size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                required
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#1E6FFF]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-[#1E6FFF]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-yellow justify-center text-sm py-3 mt-2 shadow-lg shadow-amber-500/20 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Sparkles size={16} className="animate-spin" /> Verifying...
              </>
            ) : (
              <>
                Access Admin Dashboard <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 pt-4 border-t border-slate-800/80 text-center text-xs text-slate-500">
          Default Admin: <span className="text-slate-300 font-mono">admin</span> &bull; Password: <span className="text-slate-300 font-mono">sksofttech@2026</span>
        </div>
      </div>
    </div>
  );
}
