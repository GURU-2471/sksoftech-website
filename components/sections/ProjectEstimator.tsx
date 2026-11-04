"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Calculator, CheckCircle2, ArrowRight, Clock, Banknote, Laptop } from "lucide-react";

interface EstimateResult {
  summary: string;
  recommendedTech: string[];
  estimatedTimeline: string;
  estimatedCostRange: string;
  keyFeatures: string[];
  maintenanceAdvice: string;
}

const samplePrompts = [
  "E-commerce clothing store with Razorpay payment & admin panel",
  "Android & iOS Food delivery app with live GPS tracking",
  "Corporate business website with SEO & lead forms",
  "Full Digital Marketing & Social Media package for 6 months",
];

export default function ProjectEstimator() {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [estimate, setEstimate] = useState<EstimateResult | null>(null);

  const handleEstimate = async (textToUse?: string) => {
    const query = textToUse || description;
    if (!query.trim()) return;

    setLoading(true);
    setEstimate(null);

    try {
      const res = await fetch("/api/ai/estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectDescription: query }),
      });
      const data = await res.json();
      if (data.success && data.estimate) {
        setEstimate(data.estimate);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="estimator" className="py-20 bg-slate-950 text-white relative overflow-hidden border-t border-slate-900">
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#1E6FFF] rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#FFC21A] rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-[#FFC21A]/20 text-[#FFC21A] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles size={14} /> Instant AI Scoping Tool
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white">
            Get an <span className="text-[#FFC21A]">Instant AI Estimate</span> for Your Project
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2">
            Describe what you want to build and our AI solutions architect will generate an immediate timeline, recommended stack, and budget bracket.
          </p>
        </div>

        {/* Input Box */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl">
          <div className="space-y-4">
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. I need a real-estate portal for Pune with property listings, WhatsApp inquiry, virtual tours, and an admin CMS..."
              className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-[#1E6FFF] resize-none"
            />

            {/* Quick chips */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-slate-400 font-medium">Try asking:</span>
              {samplePrompts.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setDescription(p);
                    handleEstimate(p);
                  }}
                  className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-full transition-colors"
                >
                  {p}
                </button>
              ))}
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => handleEstimate()}
                disabled={loading || !description.trim()}
                className="btn-yellow text-sm px-6 py-3 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Sparkles size={16} className="animate-spin" /> Analyzing Requirements...
                  </>
                ) : (
                  <>
                    Calculate Estimate <Calculator size={16} />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Result Card */}
          <AnimatePresence>
            {estimate && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-8 pt-8 border-t border-slate-800 space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800/80">
                    <span className="text-xs font-semibold text-slate-400 uppercase flex items-center gap-1.5 mb-1">
                      <Banknote size={14} className="text-[#FFC21A]" /> Estimated Bracket
                    </span>
                    <p className="text-2xl font-black text-[#FFC21A]">{estimate.estimatedCostRange}</p>
                    <p className="text-[11px] text-slate-500 mt-1">Transparent & fixed-price quote</p>
                  </div>

                  <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800/80">
                    <span className="text-xs font-semibold text-slate-400 uppercase flex items-center gap-1.5 mb-1">
                      <Clock size={14} className="text-[#1E6FFF]" /> Estimated Timeline
                    </span>
                    <p className="text-2xl font-black text-white">{estimate.estimatedTimeline}</p>
                    <p className="text-[11px] text-slate-500 mt-1">Includes testing & deployment</p>
                  </div>

                  <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800/80">
                    <span className="text-xs font-semibold text-slate-400 uppercase flex items-center gap-1.5 mb-1">
                      <Laptop size={14} className="text-emerald-400" /> Recommended Stack
                    </span>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {estimate.recommendedTech.map((t, i) => (
                        <span key={i} className="text-xs bg-slate-800 px-2 py-0.5 rounded text-slate-200">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800">
                  <h4 className="font-bold text-white text-sm mb-3">Key Proposed Capabilities:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {estimate.keyFeatures.map((f, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 size={14} className="text-[#1E6FFF] shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-900">
                    <p className="text-xs text-slate-400">{estimate.summary}</p>
                    <button
                      onClick={() =>
                        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
                      }
                      className="btn-primary text-xs px-5 py-2.5 shrink-0"
                    >
                      Lock in this Quote <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
