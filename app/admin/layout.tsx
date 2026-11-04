"use client";

import Link from "next/link";
import { LayoutDashboard, MessageSquare, Briefcase, FileText, Settings, ArrowLeft, Bot } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-950 border-r border-slate-800 p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-[#1E6FFF] rounded-xl flex items-center justify-center font-black text-white text-lg">
              SK
            </div>
            <div>
              <h2 className="font-bold text-white text-sm">SK Softech</h2>
              <span className="text-xs text-[#FFC21A] font-medium">Admin Control</span>
            </div>
          </div>

          <nav className="space-y-2">
            <Link
              href="/admin"
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-[#1E6FFF]/10 text-[#1E6FFF] hover:bg-[#1E6FFF]/20 transition-colors font-medium text-sm"
            >
              <LayoutDashboard size={18} />
              Overview
            </Link>
            <Link
              href="/admin/content"
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors font-medium text-sm"
            >
              <LayoutDashboard size={18} className="text-[#FFC21A]" />
              Site Content Studio
            </Link>
            <Link
              href="/admin/inquiries"
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors font-medium text-sm"
            >
              <MessageSquare size={18} />
              Inquiries &amp; Leads
            </Link>
            <Link
              href="/admin/careers"
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors font-medium text-sm"
            >
              <Briefcase size={18} />
              Job Openings
            </Link>
            <Link
              href="/admin/applications"
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors font-medium text-sm"
            >
              <FileText size={18} />
              Applications & Resumes
            </Link>
            <Link
              href="/admin/ai-config"
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors font-medium text-sm"
            >
              <Bot size={18} className="text-[#FFC21A]" />
              AI Assistant & Q&A
            </Link>
            <Link
              href="/admin/blog"
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors font-medium text-sm"
            >
              <Settings size={18} />
              AI SEO Content Writer
            </Link>
          </nav>
        </div>

        <div className="pt-6 border-t border-slate-800/80">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={14} /> Back to Live Website
          </Link>
        </div>
      </aside>

      {/* Main Admin Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
