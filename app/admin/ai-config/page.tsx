"use client";

import { useState, useEffect } from "react";
import { Bot, Plus, Trash2, CheckCircle2, XCircle, Sparkles, Sliders, Save } from "lucide-react";
import toast from "react-hot-toast";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
  isActive: boolean;
}

interface AISettings {
  enableChatbot: boolean;
  enableEstimator: boolean;
  enableResumeScreener: boolean;
  enableBlogGenerator: boolean;
  customWelcomeMessage: string;
}

export default function AdminAIConfigPage() {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [settings, setSettings] = useState<AISettings>({
    enableChatbot: true,
    enableEstimator: true,
    enableResumeScreener: true,
    enableBlogGenerator: true,
    customWelcomeMessage: "",
  });
  const [loading, setLoading] = useState(false);

  // New question form state
  const [newQ, setNewQ] = useState("");
  const [newA, setNewA] = useState("");
  const [newCat, setNewCat] = useState("Services");

  const loadData = async () => {
    try {
      const res = await fetch("/api/admin/ai-config");
      const data = await res.json();
      if (data.faqs) setFaqs(data.faqs);
      if (data.settings) setSettings(data.settings);
    } catch {
      toast.error("Failed to load AI configurations");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAddFAQ = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQ.trim() || !newA.trim()) return;

    setLoading(true);
    try {
      const res = await fetch("/api/admin/ai-config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "create_faq",
          question: newQ,
          answer: newA,
          category: newCat,
        }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("New question added to AI Assistant!");
        setNewQ("");
        setNewA("");
        loadData();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFAQ = async (faq: FAQItem) => {
    try {
      await fetch("/api/admin/ai-config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "update_faq",
          id: faq.id,
          data: { isActive: !faq.isActive },
        }),
      });
      toast.success("Question status updated");
      loadData();
    } catch {
      toast.error("Error updating question");
    }
  };

  const handleDeleteFAQ = async (id: number) => {
    if (!confirm("Are you sure you want to delete this AI FAQ?")) return;
    try {
      await fetch("/api/admin/ai-config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete_faq", id }),
      });
      toast.success("FAQ deleted");
      loadData();
    } catch {
      toast.error("Error deleting FAQ");
    }
  };

  const handleSaveSettings = async () => {
    try {
      await fetch("/api/admin/ai-config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "update_settings", settings }),
      });
      toast.success("AI Master Toggles saved!");
    } catch {
      toast.error("Error saving settings");
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-black text-white flex items-center gap-2">
          AI Feature Management <Bot className="text-[#FFC21A]" />
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Add specific questions & answers for the AI Assistant, toggle AI modules, and customize behavior.
        </p>
      </div>

      {/* Feature Toggles Card */}
      <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-6">
        <h2 className="text-base font-bold text-white flex items-center gap-2 mb-4">
          <Sliders size={18} className="text-[#1E6FFF]" /> Master AI Toggles
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { key: "enableChatbot", label: "24/7 AI Chatbot" },
            { key: "enableEstimator", label: "AI Project Estimator" },
            { key: "enableResumeScreener", label: "AI Resume Screener" },
            { key: "enableBlogGenerator", label: "AI SEO Content Writer" },
          ].map((item) => (
            <label
              key={item.key}
              className="flex items-center justify-between p-3.5 bg-slate-900 border border-slate-800/80 rounded-xl cursor-pointer hover:border-slate-700"
            >
              <span className="text-xs font-semibold text-slate-200">{item.label}</span>
              <input
                type="checkbox"
                checked={settings[item.key as keyof AISettings] as boolean}
                onChange={(e) =>
                  setSettings((s) => ({ ...s, [item.key]: e.target.checked }))
                }
                className="w-4 h-4 accent-[#1E6FFF]"
              />
            </label>
          ))}
        </div>
        <div className="mt-4 flex justify-end">
          <button onClick={handleSaveSettings} className="btn-primary text-xs px-5 py-2">
            <Save size={14} /> Save Toggles
          </button>
        </div>
      </div>

      {/* Q&A Knowledge Management */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Add Question Form */}
        <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-6 h-fit">
          <h3 className="text-base font-bold text-white flex items-center gap-2 mb-4">
            <Plus size={18} className="text-[#FFC21A]" /> Add Specific Q&A
          </h3>
          <form onSubmit={handleAddFAQ} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Question *</label>
              <input
                required
                value={newQ}
                onChange={(e) => setNewQ(e.target.value)}
                placeholder="e.g. Do you develop iOS and Android apps?"
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#1E6FFF]"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Category</label>
              <select
                value={newCat}
                onChange={(e) => setNewCat(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#1E6FFF]"
              >
                <option value="Services">Services</option>
                <option value="Pricing">Pricing</option>
                <option value="Timeline">Timeline</option>
                <option value="Support">Support</option>
                <option value="General">General</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">Specific Verified Answer *</label>
              <textarea
                required
                rows={4}
                value={newA}
                onChange={(e) => setNewA(e.target.value)}
                placeholder="Write the exact response the AI Assistant should deliver..."
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-[#1E6FFF] resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-yellow justify-center text-xs py-2.5"
            >
              {loading ? "Adding..." : "Add to AI Knowledge Base"}
            </button>
          </form>
        </div>

        {/* Existing Q&A List */}
        <div className="lg:col-span-2 bg-slate-950/70 border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles size={18} className="text-[#FFC21A]" /> Active AI Q&A Library ({faqs.length})
            </h3>
            <span className="text-xs text-slate-400">Visitors can click or ask these</span>
          </div>

          <div className="space-y-3.5 max-h-[600px] overflow-y-auto pr-1">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className={`p-4 rounded-xl border transition-all ${
                  faq.isActive
                    ? "bg-slate-900 border-slate-800"
                    : "bg-slate-950/50 border-slate-900 opacity-60"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#1E6FFF]/20 text-[#1E6FFF]">
                        {faq.category}
                      </span>
                      <h4 className="text-sm font-bold text-white">{faq.question}</h4>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed mt-2">{faq.answer}</p>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => handleToggleFAQ(faq)}
                      title={faq.isActive ? "Deactivate" : "Activate"}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                    >
                      {faq.isActive ? (
                        <CheckCircle2 size={16} className="text-emerald-400" />
                      ) : (
                        <XCircle size={16} className="text-rose-400" />
                      )}
                    </button>
                    <button
                      onClick={() => handleDeleteFAQ(faq.id)}
                      title="Delete FAQ"
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
