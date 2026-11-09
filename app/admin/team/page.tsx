"use client";

import { useEffect, useState } from "react";
import {
  ShieldCheck,
  Users,
  UserPlus,
  KeyRound,
  CheckCircle2,
  XCircle,
  Briefcase,
  TrendingUp,
  FolderKanban,
  FileCheck2,
  Sparkles,
  Lock,
} from "lucide-react";
import toast from "react-hot-toast";

interface UserItem {
  id: number;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: string;
}

export default function AdminTeamPage() {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [newMember, setNewMember] = useState({
    name: "",
    email: "",
    role: "MARKETING_SALES_HEAD",
  });
  const [adding, setAdding] = useState(false);

  const loadTeam = async () => {
    try {
      const res = await fetch("/api/admin/team");
      const data = await res.json();
      if (data.users) {
        setUsers(data.users);
      }
    } catch {
      toast.error("Failed to load team data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTeam();
  }, []);

  const handleRoleChange = async (userId: number, newRole: string) => {
    try {
      const res = await fetch("/api/admin/team", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "updateRole", userId, newRole }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(`Role updated successfully in PostgreSQL!`);
        loadTeam();
      } else {
        toast.error(data.message || "Failed to update role");
      }
    } catch {
      toast.error("Error communicating with server");
    }
  };

  const handleCreateMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMember.name || !newMember.email) return;
    setAdding(true);
    try {
      const res = await fetch("/api/admin/team", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "createUser",
          name: newMember.name,
          email: newMember.email,
          newRole: newMember.role,
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(`Team member ${newMember.name} added to PostgreSQL!`);
        setNewMember({ name: "", email: "", role: "MARKETING_SALES_HEAD" });
        loadTeam();
      } else {
        toast.error(data.message || "Failed to add member");
      }
    } catch {
      toast.error("Failed to add team member");
    } finally {
      setAdding(false);
    }
  };

  const roleMeta: Record<string, { label: string; color: string; icon: any; desc: string }> = {
    SUPER_ADMIN: {
      label: "Founder & CEO / Super Admin",
      color: "bg-amber-500/10 text-[#FFC21A] border-amber-500/30",
      icon: ShieldCheck,
      desc: "Full master access to all financial leads, database configurations, theme styling, audit logs and team roles.",
    },
    MARKETING_SALES_HEAD: {
      label: "Marketing & Sales Head",
      color: "bg-blue-500/10 text-[#1E6FFF] border-blue-500/30",
      icon: TrendingUp,
      desc: "Access to Visitor Traffic Analytics, Inquiries & Quote Leads, AI SEO Content Generator, and Marketing campaigns.",
    },
    PROJECT_MANAGER: {
      label: "Project Manager",
      color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
      icon: FolderKanban,
      desc: "Access to Portfolio Projects, Services Catalog, Tech Stack Marquee, and Client project briefs.",
    },
    RECRUITER: {
      label: "HR & Recruiter",
      color: "bg-purple-500/10 text-purple-400 border-purple-500/30",
      icon: FileCheck2,
      desc: "Access to Job Vacancies, Candidate Applications, Resumes, and AI Resume Screener.",
    },
  };

  return (
    <div className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-white flex items-center gap-2">
            Team &amp; Role-Based Access Control (RBAC) <Lock className="text-[#FFC21A]" />
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Manage your company departments, assign roles in PostgreSQL, and configure exactly what each role can see and edit.
          </p>
        </div>
        <div className="text-xs font-mono px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-emerald-400 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          PostgreSQL Database Sync Active
        </div>
      </div>

      {/* Role Cards Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(roleMeta).map(([key, meta]) => {
          const Icon = meta.icon;
          const count = users.filter((u) => u.role === key).length;
          return (
            <div
              key={key}
              className="bg-slate-950/70 border border-slate-800 p-5 rounded-2xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border ${meta.color}`}>
                    {meta.label}
                  </span>
                  <Icon size={18} className="text-slate-400" />
                </div>
                <p className="text-xs text-slate-400 leading-relaxed mt-2">{meta.desc}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-300">
                <span>Active Accounts:</span>
                <span className="font-bold text-white font-mono">{count}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Team Members List */}
      <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-6">
        <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
          <Users size={18} className="text-[#1E6FFF]" /> Active Team Members in Database ({users.length})
        </h3>

        {loading ? (
          <div className="py-12 text-center text-slate-400 text-sm">
            <Sparkles className="animate-spin text-[#1E6FFF] mx-auto mb-2" size={20} />
            Loading team from PostgreSQL...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-900 text-slate-400 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4 rounded-l-lg">User</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Current Role</th>
                  <th className="py-3 px-4">Change Role in DB</th>
                  <th className="py-3 px-4 rounded-r-lg text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-200">
                {users.map((user) => {
                  const meta = roleMeta[user.role] || roleMeta.SUPER_ADMIN;
                  return (
                    <tr key={user.id} className="hover:bg-slate-900/50 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-white flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#1E6FFF] to-[#0B1F4B] text-white flex items-center justify-center font-bold text-xs">
                          {user.name.charAt(0)}
                        </div>
                        {user.name}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-slate-300">{user.email}</td>
                      <td className="py-3.5 px-4">
                        <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded border ${meta.color}`}>
                          {meta.label}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <select
                          value={user.role}
                          onChange={(e) => handleRoleChange(user.id, e.target.value)}
                          className="bg-slate-900 border border-slate-700 text-slate-200 rounded-lg px-2.5 py-1 text-xs focus:outline-none focus:border-[#1E6FFF]"
                        >
                          <option value="SUPER_ADMIN">Founder &amp; CEO (Super Admin)</option>
                          <option value="MARKETING_SALES_HEAD">Marketing &amp; Sales Head</option>
                          <option value="PROJECT_MANAGER">Project Manager</option>
                          <option value="RECRUITER">HR &amp; Recruiter</option>
                        </select>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold text-[11px]">
                          <CheckCircle2 size={12} /> Active
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add New Team Member Form */}
      <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-6">
        <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
          <UserPlus size={18} className="text-[#FFC21A]" /> Add New Team Role
        </h3>
        <p className="text-xs text-slate-400 mb-4">
          Create new administrative access for upcoming hires (Marketing Head, PM, or Recruiter).
        </p>

        <form onSubmit={handleCreateMember} className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-end">
          <div>
            <label className="text-[11px] text-slate-300 block mb-1">Full Name</label>
            <input
              type="text"
              required
              value={newMember.name}
              onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
              placeholder="e.g. Rahul Sharma"
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#1E6FFF]"
            />
          </div>
          <div>
            <label className="text-[11px] text-slate-300 block mb-1">Company Email</label>
            <input
              type="email"
              required
              value={newMember.email}
              onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
              placeholder="rahul@sksoftech.in"
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#1E6FFF]"
            />
          </div>
          <div>
            <label className="text-[11px] text-slate-300 block mb-1">Assigned Department / Role</label>
            <select
              value={newMember.role}
              onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#1E6FFF]"
            >
              <option value="MARKETING_SALES_HEAD">Marketing &amp; Sales Head</option>
              <option value="PROJECT_MANAGER">Project Manager</option>
              <option value="RECRUITER">HR &amp; Recruiter</option>
              <option value="SUPER_ADMIN">Super Admin</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={adding}
            className="btn-primary text-xs py-2 px-4 font-bold flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/20 disabled:opacity-50"
          >
            <UserPlus size={14} />
            {adding ? "Saving..." : "Add Team Member"}
          </button>
        </form>
      </div>

      {/* Permissions Matrix */}
      <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-6">
        <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
          <KeyRound size={18} className="text-emerald-400" /> Department Permissions Matrix
        </h3>
        <p className="text-xs text-slate-400 mb-4">
          Detailed breakdown of what content each department head sees upon logging into the platform.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border border-slate-800 rounded-xl overflow-hidden">
            <thead className="bg-slate-900 text-slate-300 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4 border-b border-slate-800">Capability / Section</th>
                <th className="py-3 px-4 border-b border-slate-800 text-amber-400 font-bold">Founder / Super Admin</th>
                <th className="py-3 px-4 border-b border-slate-800 text-blue-400 font-bold">Marketing &amp; Sales Head</th>
                <th className="py-3 px-4 border-b border-slate-800 text-emerald-400 font-bold">Project Manager</th>
                <th className="py-3 px-4 border-b border-slate-800 text-purple-400 font-bold">HR &amp; Recruiter</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300">
              <tr>
                <td className="py-2.5 px-4 font-semibold text-white">Visitor Traffic &amp; Daily Analytics</td>
                <td className="py-2.5 px-4 text-emerald-400"><CheckCircle2 size={15} /></td>
                <td className="py-2.5 px-4 text-emerald-400"><CheckCircle2 size={15} /></td>
                <td className="py-2.5 px-4 text-slate-600"><XCircle size={15} /></td>
                <td className="py-2.5 px-4 text-slate-600"><XCircle size={15} /></td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-semibold text-white">Client Inquiries &amp; Quotation Leads</td>
                <td className="py-2.5 px-4 text-emerald-400"><CheckCircle2 size={15} /></td>
                <td className="py-2.5 px-4 text-emerald-400"><CheckCircle2 size={15} /></td>
                <td className="py-2.5 px-4 text-emerald-400"><CheckCircle2 size={15} /></td>
                <td className="py-2.5 px-4 text-slate-600"><XCircle size={15} /></td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-semibold text-white">Portfolio Projects &amp; Services CMS</td>
                <td className="py-2.5 px-4 text-emerald-400"><CheckCircle2 size={15} /></td>
                <td className="py-2.5 px-4 text-emerald-400"><CheckCircle2 size={15} /></td>
                <td className="py-2.5 px-4 text-emerald-400"><CheckCircle2 size={15} /></td>
                <td className="py-2.5 px-4 text-slate-600"><XCircle size={15} /></td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-semibold text-white">Job Postings &amp; Career Management</td>
                <td className="py-2.5 px-4 text-emerald-400"><CheckCircle2 size={15} /></td>
                <td className="py-2.5 px-4 text-slate-600"><XCircle size={15} /></td>
                <td className="py-2.5 px-4 text-slate-600"><XCircle size={15} /></td>
                <td className="py-2.5 px-4 text-emerald-400"><CheckCircle2 size={15} /></td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-semibold text-white">Resume Screening &amp; Candidate Applications</td>
                <td className="py-2.5 px-4 text-emerald-400"><CheckCircle2 size={15} /></td>
                <td className="py-2.5 px-4 text-slate-600"><XCircle size={15} /></td>
                <td className="py-2.5 px-4 text-slate-600"><XCircle size={15} /></td>
                <td className="py-2.5 px-4 text-emerald-400"><CheckCircle2 size={15} /></td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-semibold text-white">PostgreSQL Audit Logs &amp; Team Role Editing</td>
                <td className="py-2.5 px-4 text-emerald-400"><CheckCircle2 size={15} /></td>
                <td className="py-2.5 px-4 text-slate-600"><XCircle size={15} /></td>
                <td className="py-2.5 px-4 text-slate-600"><XCircle size={15} /></td>
                <td className="py-2.5 px-4 text-slate-600"><XCircle size={15} /></td>
              </tr>
              <tr>
                <td className="py-2.5 px-4 font-semibold text-white">Website Theme &amp; Admin Palette Control</td>
                <td className="py-2.5 px-4 text-emerald-400"><CheckCircle2 size={15} /></td>
                <td className="py-2.5 px-4 text-slate-600"><XCircle size={15} /></td>
                <td className="py-2.5 px-4 text-slate-600"><XCircle size={15} /></td>
                <td className="py-2.5 px-4 text-slate-600"><XCircle size={15} /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
