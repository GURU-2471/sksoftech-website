"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  MessageSquare,
  Briefcase,
  FileText,
  Settings,
  ArrowLeft,
  Bot,
  LogOut,
  Layers,
} from "lucide-react";
import toast from "react-hot-toast";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth", { method: "DELETE" });
      toast.success("Logged out successfully");
      router.push("/admin/login");
      router.refresh();
    } catch {
      router.push("/admin/login");
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-950 border-r border-slate-800 p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-[#1E6FFF] to-[#0B1F4B] rounded-xl flex items-center justify-center font-black text-white text-lg shadow-lg shadow-blue-500/20">
              SK
            </div>
            <div>
              <h2 className="font-bold text-white text-sm">SK Softech</h2>
              <span className="text-xs text-[#FFC21A] font-medium">Admin Control</span>
            </div>
          </div>

          <nav className="space-y-1.5">
            <Link
              href="/admin"
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors font-medium text-sm"
            >
              <LayoutDashboard size={18} className="text-[#1E6FFF]" />
              Overview &amp; Traffic
            </Link>
            <Link
              href="/admin/content"
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors font-medium text-sm"
            >
              <Layers size={18} className="text-[#FFC21A]" />
              Site Content Studio
            </Link>
            <Link
              href="/admin/inquiries"
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors font-medium text-sm"
            >
              <MessageSquare size={18} className="text-[#1E6FFF]" />
              Inquiries &amp; Leads
            </Link>
            <Link
              href="/admin/careers"
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors font-medium text-sm"
            >
              <Briefcase size={18} className="text-emerald-400" />
              Job Openings
            </Link>
            <Link
              href="/admin/applications"
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors font-medium text-sm"
            >
              <FileText size={18} className="text-amber-400" />
              Applications &amp; Resumes
            </Link>
            <Link
              href="/admin/ai-config"
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors font-medium text-sm"
            >
              <Bot size={18} className="text-[#FFC21A]" />
              AI Assistant &amp; Q&amp;A
            </Link>
            <Link
              href="/admin/blog"
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/60 transition-colors font-medium text-sm"
            >
              <Settings size={18} className="text-purple-400" />
              AI SEO Content Writer
            </Link>
          </nav>
        </div>

        <div className="pt-6 border-t border-slate-800/80 space-y-3">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={14} /> Back to Live Website
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-xs text-rose-400 hover:text-rose-300 transition-colors w-full text-left"
          >
            <LogOut size={14} /> Log Out Administrator
          </button>
        </div>
      </aside>

      {/* Main Admin Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
