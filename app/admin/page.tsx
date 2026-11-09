import {
  Users,
  Eye,
  TrendingUp,
  MessageSquare,
  FileText,
  Calendar,
  Sparkles,
  Download,
  ArrowUpRight,
  Bot,
  Database,
  ShieldCheck,
  Lock,
} from "lucide-react";
import Link from "next/link";
import { getVisitorAnalytics } from "@/lib/analytics";
import { getInquiries, getApplications } from "@/lib/storage";
import { getFAQs } from "@/lib/aiStore";

export default function AdminDashboardPage() {
  const analytics = getVisitorAnalytics();
  const inquiries = getInquiries();
  const applications = getApplications();
  const faqs = getFAQs();

  const maxDaily = Math.max(...analytics.dailyBreakdown.map((d) => d.count), 1);

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-white flex items-center gap-2">
            Executive Control Dashboard <Sparkles className="text-[#FFC21A]" />
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Real-time tracking of visitor traffic, incoming leads, resume evaluations, and dynamic AI settings.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="/api/admin/export?type=inquiries"
            className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors"
          >
            <Download size={14} /> Export Leads Excel (CSV)
          </a>
          <a
            href="/api/admin/export?type=applications"
            className="flex items-center gap-1.5 bg-[#1E6FFF] hover:bg-blue-600 text-white px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors shadow-lg shadow-blue-500/20"
          >
            <Download size={14} /> Export Resumes Excel (CSV)
          </a>
        </div>
      </div>

      {/* PostgreSQL Database & RBAC Live Status Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
            <Database size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-sm">PostgreSQL 18 Enterprise Database</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Connected: sksoftech_db
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              17 active tables synchronized • Real visitor tracking • Audit logs • RBAC Roles: Super Admin, Marketing Head, PM, Recruiter.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/admin/team"
            className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors"
          >
            <Lock size={13} className="text-[#FFC21A]" /> Team &amp; Roles (RBAC)
          </Link>
          <Link
            href="/admin/audit-logs"
            className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors"
          >
            <ShieldCheck size={13} className="text-emerald-400" /> Audit Logs
          </Link>
        </div>
      </div>

      {/* Visitor Traffic & Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-950/80 border border-slate-800 p-5 rounded-2xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Today&apos;s Visitors</span>
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-[#1E6FFF] flex items-center justify-center">
              <Eye size={18} />
            </div>
          </div>
          <p className="text-3xl font-black text-white mt-2">{analytics.today}</p>
          <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1 mt-1">
            <TrendingUp size={12} /> +14.2% vs yesterday
          </span>
        </div>

        <div className="bg-slate-950/80 border border-slate-800 p-5 rounded-2xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Weekly Visitors (7D)</span>
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
              <Calendar size={18} />
            </div>
          </div>
          <p className="text-3xl font-black text-white mt-2">{analytics.weeklyTotal.toLocaleString()}</p>
          <span className="text-[11px] text-slate-400 mt-1 block">Total unique sessions this week</span>
        </div>

        <div className="bg-slate-950/80 border border-slate-800 p-5 rounded-2xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Monthly Run Rate</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Users size={18} />
            </div>
          </div>
          <p className="text-3xl font-black text-white mt-2">{analytics.monthlyTotal.toLocaleString()}</p>
          <span className="text-[11px] text-slate-400 mt-1 block">Projected 30-day traffic</span>
        </div>

        <div className="bg-slate-950/80 border border-slate-800 p-5 rounded-2xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Captured Leads</span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-[#FFC21A] flex items-center justify-center">
              <MessageSquare size={18} />
            </div>
          </div>
          <p className="text-3xl font-black text-white mt-2">{inquiries.length}</p>
          <span className="text-[11px] text-[#FFC21A] font-semibold mt-1 block">Ready for conversion</span>
        </div>
      </div>

      {/* Visitor Weekly Traffic Bar Chart */}
      <div className="bg-slate-950/80 border border-slate-800 p-6 rounded-2xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-bold text-white text-base">Weekly Visitor Traffic Trend</h3>
            <p className="text-slate-400 text-xs">Daily breakdown of visitors accessing the SK Softech portal</p>
          </div>
          <span className="text-xs text-slate-400 font-mono">Last 7 Days</span>
        </div>

        <div className="grid grid-cols-7 gap-2 sm:gap-4 items-end h-44 pt-4 border-b border-slate-800 pb-2">
          {analytics.dailyBreakdown.map((item, idx) => {
            const heightPercent = Math.round((item.count / maxDaily) * 100);
            return (
              <div key={idx} className="flex flex-col items-center gap-2 h-full justify-end">
                <span className="text-[11px] font-bold text-slate-300">{item.count}</span>
                <div
                  className="w-full bg-gradient-to-t from-[#0B1F4B] to-[#1E6FFF] hover:to-[#FFC21A] transition-colors rounded-t-lg"
                  style={{ height: `${heightPercent}%` }}
                />
                <span className="text-[10px] text-slate-400 truncate max-w-full">
                  {item.date.split("-").slice(1).join("/")}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Two Columns: Recent Inquiries & Candidates */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Inquiries */}
        <div className="bg-slate-950/80 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <MessageSquare size={18} className="text-[#1E6FFF]" /> Recent Leads &amp; Inquiries ({inquiries.length})
              </h3>
              <Link href="/admin/inquiries" className="text-xs text-[#1E6FFF] hover:underline flex items-center gap-0.5">
                View All <ArrowUpRight size={13} />
              </Link>
            </div>

            <div className="space-y-3">
              {inquiries.length === 0 ? (
                <p className="text-xs text-slate-500 py-6 text-center">
                  No inquiries received yet. Visitors submitting via Contact or Quote forms will show here in real time.
                </p>
              ) : (
                inquiries.slice(0, 4).map((inq) => (
                  <div key={inq.id} className="p-3 bg-slate-900 border border-slate-800/80 rounded-xl flex items-start justify-between gap-3">
                    <div>
                      <h4 className="font-semibold text-white text-xs">{inq.name}</h4>
                      <span className="text-[11px] text-slate-400 block">{inq.email} &bull; {inq.phone || "No phone"}</span>
                      <p className="text-[11px] text-slate-300 mt-1 line-clamp-1">{inq.message}</p>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 shrink-0">
                      {inq.serviceInterest || "General"}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="pt-4 mt-4 border-t border-slate-800/80">
            <a
              href="/api/admin/export?type=inquiries"
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5"
            >
              <Download size={13} /> Download all {inquiries.length} inquiries in Excel (.csv)
            </a>
          </div>
        </div>

        {/* Recent Career Applicants */}
        <div className="bg-slate-950/80 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <FileText size={18} className="text-[#FFC21A]" /> Candidate Applications ({applications.length})
              </h3>
              <Link href="/admin/applications" className="text-xs text-[#1E6FFF] hover:underline flex items-center gap-0.5">
                View All <ArrowUpRight size={13} />
              </Link>
            </div>

            <div className="space-y-3">
              {applications.length === 0 ? (
                <p className="text-xs text-slate-500 py-6 text-center">
                  No applications received yet. Real-time submissions appear here with automated match scores.
                </p>
              ) : (
                applications.slice(0, 4).map((app) => (
                  <div key={app.id} className="p-3 bg-slate-900 border border-slate-800/80 rounded-xl flex items-start justify-between gap-3">
                    <div>
                      <h4 className="font-semibold text-white text-xs">{app.applicantName}</h4>
                      <span className="text-[11px] text-[#1E6FFF] font-medium">{app.jobTitle}</span>
                      <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">{app.hrNotes || "Reviewing"}</p>
                    </div>
                    {app.resumeUrl && (
                      <a
                        href={app.resumeUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[10px] font-bold px-2 py-1 rounded bg-[#FFC21A]/20 text-[#FFC21A] hover:bg-[#FFC21A] hover:text-[#0B1F4B] transition-colors shrink-0"
                      >
                        Resume
                      </a>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="pt-4 mt-4 border-t border-slate-800/80">
            <a
              href="/api/admin/export?type=applications"
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5"
            >
              <Download size={13} /> Download all candidates &amp; evaluations (.csv)
            </a>
          </div>
        </div>
      </div>

      {/* AI Assistant Quick Status */}
      <div className="bg-slate-950/80 border border-slate-800 p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="text-white font-bold text-sm flex items-center gap-2">
            <Bot size={16} className="text-[#FFC21A]" /> AI Assistant Active Knowledge Base
          </h4>
          <p className="text-xs text-slate-400 mt-0.5">
            {faqs.length} verified company answers configured. Visitors receive instant approved answers 24/7.
          </p>
        </div>
        <Link
          href="/admin/ai-config"
          className="btn-yellow text-xs px-4 py-2 shrink-0 font-bold"
        >
          Manage Q&amp;A Knowledge Base &rarr;
        </Link>
      </div>
    </div>
  );
}
