"use client";

import { useState } from "react";
import { Sparkles, FileText, Check, Copy } from "lucide-react";
import toast from "react-hot-toast";

interface GeneratedBlog {
  title: string;
  metaDescription: string;
  readingTime: string;
  category: string;
  content: string;
}

export default function AdminBlogGenerator() {
  const [topic, setTopic] = useState("");
  const [keywords, setKeywords] = useState("");
  const [audience, setAudience] = useState("Pune Business Owners & Startups");
  const [loading, setLoading] = useState(false);
  const [blog, setBlog] = useState<GeneratedBlog | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic.trim()) return;
    setLoading(true);

    try {
      const res = await fetch("/api/ai/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, keywords, targetAudience: audience }),
      });
      const data = await res.json();
      if (data.success && data.blog) {
        setBlog(data.blog);
        toast.success("SEO Blog generated successfully!");
      } else {
        toast.error("Generation failed. Please retry.");
      }
    } catch {
      toast.error("Error connecting to AI service.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (!blog) return;
    const fullText = `# ${blog.title}\n\n**Meta Description:** ${blog.metaDescription}\n\n${blog.content}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    toast.success("Article copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-black text-white flex items-center gap-2">
          AI SEO Blog & Content Creator <Sparkles className="text-[#FFC21A]" />
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Generate SEO-optimized articles and marketing posts for SK Softech with 1 click.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-6">
          <form onSubmit={handleGenerate} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">Article Topic or Headline *</label>
              <input
                required
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. Why Pune Businesses Need Custom Web Apps in 2026"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#1E6FFF]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">Target Keywords (Comma-separated)</label>
              <input
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="web development Pune, custom software, digital marketing agency"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#1E6FFF]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">Target Audience</label>
              <select
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#1E6FFF]"
              >
                <option value="Pune Business Owners & Startups">Pune Business Owners & Startups</option>
                <option value="E-Commerce & Retail Merchants">E-Commerce & Retail Merchants</option>
                <option value="Tech Founders & Product Leaders">Tech Founders & Product Leaders</option>
                <option value="Students & Job Seekers">Students & Job Seekers</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-yellow justify-center text-sm py-3 mt-4"
            >
              {loading ? (
                <>
                  <Sparkles size={16} className="animate-spin" /> Writing Article...
                </>
              ) : (
                <>
                  Generate Full Article <Sparkles size={16} />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Output Preview */}
        <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-6 flex flex-col h-[560px]">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <FileText size={16} className="text-[#1E6FFF]" /> Generated Output Preview
            </h3>
            {blog && (
              <button
                onClick={copyToClipboard}
                className="text-xs flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg text-slate-200 transition-colors"
              >
                {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                {copied ? "Copied" : "Copy Article"}
              </button>
            )}
          </div>

          <div className="flex-1 overflow-y-auto space-y-4 text-slate-300 text-sm leading-relaxed pr-2">
            {blog ? (
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-[#1E6FFF]/20 text-[#1E6FFF] px-2.5 py-0.5 rounded-full">
                  {blog.category} • {blog.readingTime}
                </span>
                <h2 className="text-xl font-black text-white mt-2 mb-1">{blog.title}</h2>
                <p className="text-xs italic text-slate-400 mb-4 bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                  <strong>Meta:</strong> {blog.metaDescription}
                </p>
                <div className="whitespace-pre-line text-xs font-mono bg-slate-900/60 p-4 rounded-xl border border-slate-800/80">
                  {blog.content}
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-500 text-center">
                <Sparkles size={36} className="mb-2 opacity-30 text-[#FFC21A]" />
                <p className="text-xs">Enter your topic on the left and click Generate.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
