"use client";

import { useEffect, useState } from "react";
import {
  FileText,
  Clock,
  ShieldCheck,
  Search,
  Filter,
  RefreshCw,
  Database,
  User,
  Sparkles,
} from "lucide-react";
import toast from "react-hot-toast";

interface AuditLogItem {
  id?: number;
  userName: string;
  userRole: string;
  action: string;
  resource: string;
  details?: string;
  ipAddress?: string;
  createdAt: string;
}

export default function AdminAuditLogsPage() {
  const [logs, setLogs] = useState<AuditLogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const loadLogs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/audit-logs");
      const data = await res.json();
      if (data.logs) {
        setLogs(data.logs);
      }
    } catch {
      toast.error("Failed to load audit logs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLogs();
  }, []);

  const filteredLogs = logs.filter(
    (log) =>
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.resource.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (log.details && log.details.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-white flex items-center gap-2">
            System &amp; Data Audit Logs <Database className="text-[#1E6FFF]" />
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Tamper-evident activity trail recorded in PostgreSQL sksoftech_db. Track who modified content, updated themes, or accessed leads.
          </p>
        </div>
        <button
          onClick={loadLogs}
          disabled={loading}
          className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors disabled:opacity-50"
        >
          <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          Refresh Audit Trail
        </button>
      </div>

      {/* Search & Stats Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-[#1E6FFF] flex items-center justify-center">
            <FileText size={20} />
          </div>
          <div>
            <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Total Logged Events</span>
            <p className="text-xl font-black text-white">{logs.length}</p>
          </div>
        </div>
        <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
            <ShieldCheck size={20} />
          </div>
          <div>
            <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Database Integrity</span>
            <p className="text-sm font-bold text-emerald-400">PostgreSQL Verified</p>
          </div>
        </div>
        <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-xl flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
            <Clock size={20} />
          </div>
          <div>
            <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Retention Policy</span>
            <p className="text-sm font-bold text-slate-200">Continuous Logging</p>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3.5 top-3 text-slate-500" size={16} />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Filter by action (e.g. UPDATE_THEME, ADD_JOB), user name, or resource..."
          className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#1E6FFF]"
        />
      </div>

      {/* Logs Table */}
      <div className="bg-slate-950/70 border border-slate-800 rounded-2xl overflow-hidden">
        {loading ? (
          <div className="py-16 text-center text-slate-400 text-sm">
            <Sparkles className="animate-spin text-[#1E6FFF] mx-auto mb-2" size={20} />
            Loading audit records from PostgreSQL...
          </div>
        ) : filteredLogs.length === 0 ? (
          <div className="py-16 text-center text-slate-400 text-sm">
            No audit events found matching &quot;{searchTerm}&quot;.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900 text-slate-400 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4">Timestamp</th>
                  <th className="py-3 px-4">Admin / User</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4">Action</th>
                  <th className="py-3 px-4">Resource</th>
                  <th className="py-3 px-4">Details</th>
                  <th className="py-3 px-4 text-right">IP Address</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/70 text-slate-200 font-mono">
                {filteredLogs.map((log, index) => (
                  <tr key={index} className="hover:bg-slate-900/40 transition-colors">
                    <td className="py-3 px-4 text-slate-400 text-[11px] whitespace-nowrap">
                      {new Date(log.createdAt).toLocaleString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })}
                    </td>
                    <td className="py-3 px-4 font-sans font-semibold text-white whitespace-nowrap">
                      {log.userName}
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300">
                        {log.userRole}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-bold text-amber-400 text-[11px]">
                      {log.action}
                    </td>
                    <td className="py-3 px-4 text-blue-400 text-[11px]">
                      {log.resource}
                    </td>
                    <td className="py-3 px-4 font-sans text-slate-300 text-xs max-w-xs truncate" title={log.details}>
                      {log.details || "—"}
                    </td>
                    <td className="py-3 px-4 text-right text-slate-400 text-[11px]">
                      {log.ipAddress || "127.0.0.1"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
