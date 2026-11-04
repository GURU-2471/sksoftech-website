"use client";

import { useState, useEffect } from "react";
import { Briefcase, MapPin, Clock, ChevronDown, ChevronUp, Send, Upload, Sparkles } from "lucide-react";
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

export default function CareersSection() {
  const [jobs, setJobs] = useState<JobOpening[]>([]);
  const [expandedJob, setExpandedJob] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedJob, setSelectedJob] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "", jobTitle: "", coverLetter: "" });
  const [resume, setResume] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch live active jobs configured by Admin
  useEffect(() => {
    fetch("/api/jobs?active=true")
      .then((res) => res.json())
      .then((data) => {
        if (data.jobs) setJobs(data.jobs);
      })
      .catch(() => {});
  }, []);

  const handleApply = (jobTitle: string) => {
    setSelectedJob(jobTitle);
    setForm((f) => ({ ...f, jobTitle }));
    setShowForm(true);
    setTimeout(() => {
      document.getElementById("apply-form")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resume) {
      toast.error("Please upload your resume");
      return;
    }
    setLoading(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      fd.append("resume", resume);
      const res = await fetch("/api/careers/apply", { method: "POST", body: fd });
      const data = await res.json();
      if (data.success) {
        toast.success("Application submitted! Our HR team will contact you soon.");
        setShowForm(false);
        setForm({ name: "", email: "", phone: "", jobTitle: "", coverLetter: "" });
        setResume(null);
      } else {
        toast.error(data.message || "Submission failed. Please retry.");
      }
    } catch {
      toast.error("Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="careers" className="py-20 bg-[#0B1F4B] relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-72 h-72 bg-[#1E6FFF]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#FFC21A]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <span className="inline-block bg-[#FFC21A]/20 text-[#FFC21A] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-3">
            Join Our Team
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4">
            Build Your Career at <span className="text-[#FFC21A]">SK Softech</span>
          </h2>
          <p className="text-white/60 max-w-xl mx-auto text-sm md:text-base">
            We are always seeking passionate engineers, designers, and marketers in Pune. Browse active roles below:
          </p>
        </div>

        {/* Live Job listings */}
        <div className="space-y-4 mb-10">
          {jobs.length === 0 ? (
            <div className="glass rounded-2xl p-8 text-center text-white/70">
              <p>No active openings right now. Check back soon or send your CV to sksoftech2026@gmail.com!</p>
            </div>
          ) : (
            jobs.map((job) => (
              <div key={job.id} className="glass rounded-2xl overflow-hidden border border-white/10">
                <button
                  type="button"
                  onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
                  className="w-full text-left p-6 flex items-start justify-between gap-4"
                >
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <h3 className="text-white font-bold text-xl">{job.title}</h3>
                      <span className="bg-[#FFC21A] text-[#0B1F4B] text-xs font-bold px-3 py-1 rounded-full">
                        {job.type}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-white/60 text-sm">
                      <span className="flex items-center gap-1.5"><Briefcase size={14} /> {job.department}</span>
                      <span className="flex items-center gap-1.5"><MapPin size={14} /> {job.location}</span>
                      <span className="flex items-center gap-1.5"><Clock size={14} /> {job.type}</span>
                    </div>
                  </div>
                  {expandedJob === job.id ? (
                    <ChevronUp size={20} className="text-white/60 mt-1 shrink-0" />
                  ) : (
                    <ChevronDown size={20} className="text-white/60 mt-1 shrink-0" />
                  )}
                </button>

                {expandedJob === job.id && (
                  <div className="px-6 pb-6 border-t border-white/10 pt-4">
                    <p className="text-white/70 mb-4 leading-relaxed text-sm">{job.description}</p>
                    {job.requirements && job.requirements.length > 0 && (
                      <>
                        <h4 className="text-white font-semibold mb-2 text-sm">Requirements:</h4>
                        <ul className="space-y-1 mb-5">
                          {job.requirements.map((req, idx) => (
                            <li key={idx} className="text-white/60 text-xs sm:text-sm flex items-start gap-2">
                              <span className="text-[#FFC21A] mt-0.5">✓</span> {req}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                    <button
                      type="button"
                      onClick={() => handleApply(job.title)}
                      className="btn-yellow text-sm"
                    >
                      Apply Now <Send size={14} />
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Application Form */}
        {showForm && (
          <div id="apply-form" className="glass rounded-2xl p-8 border border-white/15">
            <h3 className="text-white font-black text-2xl mb-1 flex items-center gap-2">
              Apply for {selectedJob} <Sparkles size={18} className="text-[#FFC21A]" />
            </h3>
            <p className="text-white/60 mb-6 text-sm">Fill in your details. Resumes are automatically screened for instant evaluation.</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="text-white/80 text-xs font-semibold block mb-1.5">Full Name *</label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    className="form-input"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="text-white/80 text-xs font-semibold block mb-1.5">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    className="form-input"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="text-white/80 text-xs font-semibold block mb-1.5">Phone Number *</label>
                  <input
                    required
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    className="form-input"
                    placeholder="9307696221"
                  />
                </div>
                <div>
                  <label className="text-white/80 text-xs font-semibold block mb-1.5">Position</label>
                  <select
                    value={form.jobTitle}
                    onChange={(e) => setForm((f) => ({ ...f, jobTitle: e.target.value }))}
                    className="form-input"
                  >
                    {jobs.map((j) => (
                      <option key={j.id} value={j.title}>
                        {j.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="text-white/80 text-xs font-semibold block mb-1.5">Cover Letter / Note</label>
                <textarea
                  rows={3}
                  value={form.coverLetter}
                  onChange={(e) => setForm((f) => ({ ...f, coverLetter: e.target.value }))}
                  className="form-input resize-none"
                  placeholder="Share your years of experience, primary tech stack, and why you want to join..."
                />
              </div>

              <div>
                <label className="text-white/80 text-xs font-semibold block mb-1.5">Resume * (PDF / DOC, max 5MB)</label>
                <label className="flex items-center gap-3 p-4 border-2 border-dashed border-white/30 rounded-xl cursor-pointer hover:border-[#FFC21A] transition-colors">
                  <Upload size={20} className="text-white/60" />
                  <span className="text-white/70 text-xs sm:text-sm">
                    {resume ? resume.name : "Click here to upload your resume"}
                  </span>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    onChange={(e) => setResume(e.target.files?.[0] || null)}
                  />
                </label>
              </div>

              <div className="flex gap-4 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-yellow flex-1 justify-center disabled:opacity-60 text-sm py-3"
                >
                  {loading ? "Submitting Application..." : "Submit Application"} <Send size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="btn-outline px-6 text-sm"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}
