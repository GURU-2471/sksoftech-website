"use client";

import { useState, useEffect } from "react";
import { Briefcase, MapPin, Clock, Plus, Trash2, CheckCircle2, XCircle, Sparkles } from "lucide-react";
import toast from "react-hot-toast";

interface JobOpening {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  requirements: string[];
  isActive: boolean;
}

export default function AdminCareersPage() {
  const [jobs, setJobs] = useState<JobOpening[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form states
  const [title, setTitle] = useState("");
  const [department, setDepartment] = useState("Engineering");
  const [location, setLocation] = useState("Pune, Maharashtra");
  const [type, setType] = useState("Full-time");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");

  const loadJobs = async () => {
    try {
      const res = await fetch("/api/jobs");
      const data = await res.json();
      if (data.jobs) setJobs(data.jobs);
    } catch {
      toast.error("Failed to load jobs");
    }
  };

  useEffect(() => {
    loadJobs();
  }, []);

  const handleCreateJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "create",
          jobData: {
            title,
            department,
            location,
            type,
            description,
            requirements: requirements.split("\n").filter((r) => r.trim().length > 0),
            isActive: true,
          },
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Job opening created and published to Careers page!");
        setShowAddModal(false);
        setTitle("");
        setDescription("");
        setRequirements("");
        loadJobs();
      } else {
        toast.error(data.message || "Failed to create job");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleToggleJob = async (job: JobOpening) => {
    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "toggle",
          id: job.id,
          updates: { isActive: !job.isActive },
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(`Job marked as ${!job.isActive ? "ACTIVE" : "INACTIVE"}`);
        loadJobs();
      }
    } catch {
      toast.error("Error updating status");
    }
  };

  const handleDeleteJob = async (id: number) => {
    if (!confirm("Are you sure you want to permanently delete this job opening?")) return;
    try {
      const res = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete", id }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Job opening removed");
        loadJobs();
      }
    } catch {
      toast.error("Error deleting job");
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-white flex items-center gap-2">
            Job Openings &amp; Careers <Briefcase className="text-emerald-400" />
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Add new job postings, toggle active/inactive status, and remove closed positions.
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="btn-yellow text-xs px-4 py-2.5 font-bold flex items-center gap-1.5 shadow-lg shadow-amber-500/10"
        >
          <Plus size={16} /> Post New Job
        </button>
      </div>

      {/* Add Job Modal / Slide-out */}
      {showAddModal && (
        <div className="bg-slate-950/90 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles size={18} className="text-[#FFC21A]" /> Create New Career Opportunity
            </h3>
            <button
              onClick={() => setShowAddModal(false)}
              className="text-xs text-slate-400 hover:text-white"
            >
              Cancel
            </button>
          </div>

          <form onSubmit={handleCreateJob} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Job Title *</label>
                <input
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Flutter Mobile App Developer"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#1E6FFF]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Department</label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#1E6FFF]"
                >
                  <option value="Engineering">Engineering</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Design">Design &amp; Creative</option>
                  <option value="Sales">Sales &amp; Business Dev</option>
                  <option value="Support">IT Support</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Location</label>
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Pune, Maharashtra (Hybrid)"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#1E6FFF]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Job Type</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#1E6FFF]"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Job Description *</label>
              <textarea
                required
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Key responsibilities and day-to-day impact..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#1E6FFF] resize-none"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Candidate Requirements (1 requirement per line)
              </label>
              <textarea
                rows={3}
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                placeholder="2+ years experience in React/Next.js&#10;Strong understanding of REST APIs&#10;Good communication skills"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#1E6FFF] resize-none"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary text-xs px-5 py-2.5"
              >
                {loading ? "Publishing..." : "Publish Job to Website"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Jobs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {jobs.length === 0 ? (
          <div className="col-span-2 text-center py-12 text-slate-500 bg-slate-950/40 rounded-2xl border border-slate-800">
            No job openings yet. Click &ldquo;Post New Job&rdquo; to add your first position.
          </div>
        ) : (
          jobs.map((job) => (
            <div
              key={job.id}
              className={`border rounded-2xl p-6 transition-all ${
                job.isActive
                  ? "bg-slate-950/70 border-slate-800"
                  : "bg-slate-950/30 border-slate-900 opacity-60"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded ${
                    job.isActive
                      ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      : "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                  }`}
                >
                  {job.isActive ? "ACTIVE • LIVE" : "INACTIVE • HIDDEN"}
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleToggleJob(job)}
                    className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                    title={job.isActive ? "Deactivate (Hide from site)" : "Activate (Show on site)"}
                  >
                    {job.isActive ? (
                      <CheckCircle2 size={16} className="text-emerald-400" />
                    ) : (
                      <XCircle size={16} className="text-rose-400" />
                    )}
                  </button>
                  <button
                    onClick={() => handleDeleteJob(job.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors"
                    title="Delete Job"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <h3 className="text-lg font-bold text-white mb-1.5">{job.title}</h3>
              <p className="text-xs text-slate-400 line-clamp-2 mb-4 leading-relaxed">{job.description}</p>

              <div className="flex flex-wrap gap-3 text-xs text-slate-400 mb-4">
                <span className="flex items-center gap-1"><MapPin size={13} /> {job.location}</span>
                <span className="flex items-center gap-1"><Clock size={13} /> {job.type}</span>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-400">Department: {job.department}</span>
                <span className="text-[#1E6FFF] font-semibold">
                  {job.isActive ? "Visible in Careers" : "Hidden"}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
