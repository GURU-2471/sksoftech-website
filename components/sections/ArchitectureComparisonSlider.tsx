"use client";

import { useState, useRef, MouseEvent, TouchEvent } from "react";
import {
  Sliders,
  CheckCircle2,
  XCircle,
  Zap,
  ShieldCheck,
  AlertTriangle,
  Lock,
  Database,
  Gauge,
  Sparkles,
} from "lucide-react";

export default function ArchitectureComparisonSlider() {
  const [sliderPos, setSliderPos] = useState(50); // percentage 0 to 100
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);

  const handlePointerDown = () => {
    isDraggingRef.current = true;
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  const handlePointerMove = (clientX: number) => {
    if (!isDraggingRef.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
    setSliderPos((x / rect.width) * 100);
  };

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => handlePointerMove(e.clientX);
  const onTouchMove = (e: TouchEvent<HTMLDivElement>) => handlePointerMove(e.touches[0].clientX);

  return (
    <section
      id="comparison"
      className="py-28 bg-[#030712] text-white relative overflow-hidden border-t border-slate-900"
    >
      {/* Background Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#475569 1px, transparent 1px), linear-gradient(90deg, #475569 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-mono tracking-wider uppercase bg-slate-900/90 text-blue-400 border border-slate-800 shadow-sm mb-4">
            <Sliders size={13} className="text-blue-400" />
            <span>Side-by-Side Technical Comparison</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15]">
            Generic Web Agency vs.{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-sky-300 to-slate-200">
              SK Softech Engineering
            </span>
          </h2>

          <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
            Drag the interactive slider below to compare the architectural differences between outdated template agencies and our precision-engineered platforms.
          </p>
        </div>

        {/* COMPARISON INTERACTIVE STAGE */}
        <div
          ref={containerRef}
          onMouseMove={onMouseMove}
          onTouchMove={onTouchMove}
          onMouseUp={handlePointerUp}
          onTouchEnd={handlePointerUp}
          onMouseLeave={handlePointerUp}
          className="relative max-w-5xl mx-auto h-[580px] sm:h-[500px] rounded-3xl border border-slate-800 overflow-hidden select-none shadow-[0_25px_80px_rgba(0,0,0,0.9)] bg-slate-950"
        >
          {/* ---------------------------------------------------- */}
          {/* RIGHT PANE: SK SOFTECH BESPOKE ENGINEERING (Full Width under) */}
          {/* ---------------------------------------------------- */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-[#0B152A] to-slate-950 p-6 sm:p-10 flex flex-col justify-between text-left">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold">
                    SK Softech High-Performance Engineering
                  </span>
                </div>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-full font-bold">
                  ✓ Enterprise Standard
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-blue-500/40 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-mono text-blue-400 font-bold">
                    <Zap size={15} />
                    <span>0.28s Sub-Second TTFB</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Next.js 16 Partial Prerendering with Cloudflare Edge caching in Mumbai.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/90 border border-emerald-500/40 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-bold">
                    <Database size={15} />
                    <span>PostgreSQL 18 ACID Bedrock</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Relational multi-tenant schema with Prisma ORM and automated daily backups.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/90 border border-sky-500/40 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-mono text-sky-400 font-bold">
                    <ShieldCheck size={15} />
                    <span>Zero-Trust Security & RBAC</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Zod input sanitization, sliding-window rate limiting, and tamper-evident audit logs.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/90 border border-amber-500/40 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#FFC21A] font-bold">
                    <Gauge size={15} />
                    <span>100/100 Core Web Vitals</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Perfect Google Lighthouse performance score leading to higher SEO rankings.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="text-emerald-400 flex items-center gap-1.5 font-bold">
                <CheckCircle2 size={14} /> 3.2x Average Client Conversion Surge
              </span>
              <span className="hidden sm:inline">Built for High-Growth Scale</span>
            </div>
          </div>

          {/* ---------------------------------------------------- */}
          {/* LEFT PANE: STANDARD OUTDATED WEB AGENCY (Clipped by sliderPos) */}
          {/* ---------------------------------------------------- */}
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-br from-[#1C1414] via-[#2A1818] to-slate-950 p-6 sm:p-10 flex flex-col justify-between text-left overflow-hidden border-r border-rose-500/50"
            style={{ width: `${sliderPos}%` }}
          >
            <div className="min-w-[320px] sm:min-w-[500px]">
              <div className="flex items-center justify-between pb-4 border-b border-rose-900/50">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <span className="text-xs font-mono uppercase tracking-wider text-rose-400 font-bold">
                    Standard Agency / Generic Template
                  </span>
                </div>
                <span className="text-xs font-mono text-rose-400 bg-rose-950/60 border border-rose-500/30 px-3 py-1 rounded-full font-bold">
                  ✕ Outdated Practice
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-800/40 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-mono text-rose-400 font-bold">
                    <AlertTriangle size={15} />
                    <span>3.8s+ Sluggish Page Load</span>
                  </div>
                  <p className="text-xs text-rose-200/70">
                    Bloated WordPress plugins, unoptimized images, causing high bounce rates.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-800/40 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-mono text-rose-400 font-bold">
                    <AlertTriangle size={15} />
                    <span>No Real Database Structure</span>
                  </div>
                  <p className="text-xs text-rose-200/70">
                    Basic flat files or shared hosting tables prone to lockups under high traffic.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-800/40 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-mono text-rose-400 font-bold">
                    <AlertTriangle size={15} />
                    <span>Vulnerable to Attacks</span>
                  </div>
                  <p className="text-xs text-rose-200/70">
                    Zero input sanitization, exposed endpoints, and lack of role-based security.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-800/40 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-mono text-rose-400 font-bold">
                    <AlertTriangle size={15} />
                    <span>48/100 Poor Google Score</span>
                  </div>
                  <p className="text-xs text-rose-200/70">
                    Fails Google Core Web Vitals, resulting in stagnant or invisible SEO rankings.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-rose-900/50 flex items-center justify-between text-xs font-mono text-rose-300/70 min-w-[320px] sm:min-w-[500px]">
              <span className="flex items-center gap-1.5 text-rose-400 font-bold">
                <XCircle size={14} /> 65% Visitors Leave Before Site Finishes Loading
              </span>
              <span className="hidden sm:inline">Frequent Crash Risks</span>
            </div>
          </div>

          {/* ---------------------------------------------------- */}
          {/* THE DRAGGABLE DIVIDER HANDLE */}
          {/* ---------------------------------------------------- */}
          <div
            onMouseDown={handlePointerDown}
            onTouchStart={handlePointerDown}
            className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-30 shadow-[0_0_20px_#FFFFFF]"
            style={{ left: `${sliderPos}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white text-slate-950 shadow-2xl flex items-center justify-center font-bold text-xs border-2 border-slate-900 transition-transform active:scale-110">
              <Sliders size={16} />
            </div>
          </div>
        </div>

        {/* Bottom Helper Hint */}
        <div className="text-center mt-6 text-xs font-mono text-slate-400 flex items-center justify-center gap-2">
          <span>← Drag handle to compare architecture →</span>
        </div>
      </div>
    </section>
  );
}
