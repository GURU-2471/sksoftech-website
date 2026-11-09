"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Terminal,
  Play,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  Database,
  Zap,
  Globe2,
  Smartphone,
  MessageSquare,
  ShieldCheck,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

interface ProjectPreset {
  id: string;
  name: string;
  industry: string;
  clientType: string;
  color: string;
  file: string;
  codeSnippet: string[];
  preview: {
    badge: string;
    headline: string;
    sub: string;
    cta: string;
    tagline: string;
    stat: string;
    statLabel: string;
    leadSnippet: string;
  };
}

const PRESETS: ProjectPreset[] = [
  {
    id: "interior",
    name: "Luxury Interior Studio",
    industry: "Interior Designers",
    clientType: "Aura Living • Baner, Pune",
    color: "#F59E0B",
    file: "AuraStudio.tsx",
    codeSnippet: [
      'import { SKStudioEngine } from "@sksoftech/core";',
      'import { PostgreSQL } from "@/lib/db";',
      "",
      "export default function InteriorPortfolio() {",
      "  const project = SKStudioEngine.create({",
      '    industry: "Luxury Interior & Modular Homes",',
      '    theme: "Gold & Dark Obsidian Canvas",',
      "    features: [",
      '      "3D Floor Plan Viewer",',
      '      "Before/After Makeover Slider",',
      '      "Square Feet Budget Calculator",',
      '      "Instant WhatsApp Lead Capture"',
      "    ],",
      "    database: PostgreSQL.connect('sksoftech_db'),",
      "  });",
      "",
      "  return <project.DeployLive speed='0.4s' />;",
      "}",
    ],
    preview: {
      badge: "MahaRERA Verified • Baner Studio",
      headline: "Crafting Bespoke Luxury Spaces Across Pune",
      sub: "Turnkey 2BHK & 3BHK Modular Interiors with 10-Year Warranty.",
      cta: "Calculate Interior Budget",
      tagline: "3D Visual Makeover Active",
      stat: "120+ Flats",
      statLabel: "Designed in 2025-26",
      leadSnippet: "💬 WhatsApp: 'Need quote for 3BHK at Wakad'",
    },
  },
  {
    id: "clinic",
    name: "Doctor & Polyclinic",
    industry: "Medical & Healthcare",
    clientType: "Dr. Joshi Dental Care • Kothrud",
    color: "#06B6D4",
    file: "DentalCare.tsx",
    codeSnippet: [
      'import { SKClinicSystem } from "@sksoftech/core";',
      'import { AppointmentQueue } from "@/lib/patients";',
      "",
      "export default function ClinicWebsite() {",
      "  return SKClinicSystem.render({",
      '    doctor: "Dr. A. Joshi (BDS, MDS Orthodontics)",',
      '    city: "Kothrud, Pune",',
      "    modules: [",
      '      "1-Click WhatsApp Booking",',
      '      "Google Reviews 4.9★ Carousel",',
      '      "Emergency Call Strip",',
      '      "MDS Certified Credentials"',
      "    ],",
      "    security: 'HIPAA & SSL Encrypted',",
      "  });",
      "}",
    ],
    preview: {
      badge: "4.9 ★ (340+ Verified Reviews)",
      headline: "Painless Modern Dentistry for Your Family",
      sub: "Advanced Laser Treatments, Invisible Aligners & Emergency Care.",
      cta: "Book Appointment Online",
      tagline: "Live Clinic Queue Available",
      stat: "15+ Years",
      statLabel: "Excellence in Kothrud",
      leadSnippet: "🏥 Booking: 'Root canal consultation for tomorrow'",
    },
  },
  {
    id: "society",
    name: "Housing Society SaaS",
    industry: "PropTech SaaS",
    clientType: "GreenAcres CHS • Wakad",
    color: "#10B981",
    file: "SmartSociety.tsx",
    codeSnippet: [
      'import { SKHousingSaaS } from "@sksoftech/saas";',
      'import { UPIAutoBilling } from "@/lib/payments";',
      "",
      "export async function SmartSocietyCHS() {",
      "  const society = await SKHousingSaaS.init({",
      '    flats: 280,',
      '    securityGate: "OTP Visitor Logging",',
      '    maintenance: "Auto UPI QR Receipt",',
      '    noticeBoard: "Instant WhatsApp Circulars",',
      "  });",
      "  return society.startSubscription({ fee: 35 });",
      "}",
    ],
    preview: {
      badge: "Co-op Housing Society Certified",
      headline: "Automated Society Billing & Visitor Entry Gate",
      sub: "Zero paperwork. Monthly maintenance tracking & QR payments.",
      cta: "Open Resident Portal",
      tagline: "Gatekeeper Guard Active",
      stat: "280 Flats",
      statLabel: "100% UPI Collection",
      leadSnippet: "🔔 System: 'Maintenance ₹2,500 Paid via UPI QR'",
    },
  },
];

export default function LiveDevStudio3D() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const activePreset = PRESETS[activeIdx];

  // Simulated code typing animation when preset changes
  useEffect(() => {
    let currentLine = 0;
    setDisplayedLines([]);
    setIsTyping(true);

    const interval = setInterval(() => {
      if (currentLine < activePreset.codeSnippet.length) {
        setDisplayedLines(activePreset.codeSnippet.slice(0, currentLine + 1));
        currentLine++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 75);

    return () => clearInterval(interval);
  }, [activeIdx]);

  // Subtle 3D mouse parallax calculation
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x: x * 8, y: -y * 8 });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <section className="py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden border-t border-slate-800">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[550px] h-[350px] bg-blue-600/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[450px] h-[300px] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
            <Sparkles size={14} className="text-[#FFC21A]" />
            Live Developer Engine Demo
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            Watch How We <span className="gradient-text">Live Code &amp; Build</span> Your Website
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
            Select an industry below. Watch our engineering terminal write clean code while the client
            website snaps into life in real time with PostgreSQL database and WhatsApp lead delivery.
          </p>

          {/* Interactive Preset Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-8">
            {PRESETS.map((preset, idx) => {
              const isSelected = activeIdx === idx;
              return (
                <button
                  key={preset.id}
                  onClick={() => setActiveIdx(idx)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30 ring-2 ring-blue-400"
                      : "bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-slate-700"
                  }`}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: preset.color }}
                  />
                  <span>{preset.name}</span>
                  {isSelected && <Play size={11} className="fill-white" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3D Visual Stage Container */}
        <div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative bg-slate-950/90 border border-slate-800/90 rounded-3xl p-4 sm:p-7 shadow-2xl backdrop-blur-xl [perspective:1400px] transition-all"
        >
          {/* Top Window Bar */}
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-6">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/90 shadow-sm" />
              <span className="w-3 h-3 rounded-full bg-amber-500/90 shadow-sm" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/90 shadow-sm" />
              <span className="text-xs font-mono text-slate-400 ml-2 hidden sm:inline">
                sk-softech-cloud :: {activePreset.clientType}
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="text-emerald-400 font-mono flex items-center gap-1.5 text-[11px] bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                Live Build Engine (60 FPS)
              </span>
              <button
                onClick={() => {
                  setDisplayedLines([]);
                  setIsTyping(true);
                  setActiveIdx((prev) => prev); // Re-trigger
                }}
                className="text-slate-400 hover:text-white p-1 rounded transition-colors"
                title="Re-run animation"
              >
                <RotateCcw size={14} />
              </button>
            </div>
          </div>

          {/* Main Grid: Code Editor (Left) & 3D Live Website Canvas (Right) */}
          <div
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch [transform-style:preserve-3d] transition-transform duration-200 ease-out"
            style={{
              transform: `rotateX(${mousePos.y}deg) rotateY(${mousePos.x}deg)`,
            }}
          >
            {/* LEFT 5 COLS: High-Tech IDE Code Editor */}
            <div className="lg:col-span-5 bg-[#090D16] border border-slate-800 rounded-2xl p-5 flex flex-col justify-between font-mono text-xs shadow-xl relative overflow-hidden">
              {/* Tab Header */}
              <div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-2.5 mb-3 text-[11px]">
                  <span className="flex items-center gap-1.5 text-blue-400 font-bold bg-blue-500/10 px-2.5 py-1 rounded border border-blue-500/20">
                    <Code2 size={13} /> {activePreset.file}
                  </span>
                  <span className="text-slate-500">TypeScript / Next.js 16</span>
                </div>

                {/* Animated Code Typing Container */}
                <div className="space-y-1 text-slate-300 leading-relaxed overflow-x-auto min-h-[290px] py-1">
                  {displayedLines.map((line, idx) => (
                    <div key={idx} className="flex gap-3">
                      <span className="text-slate-600 select-none w-5 text-right font-sans text-[11px]">
                        {idx + 1}
                      </span>
                      <span
                        className={`${
                          line.startsWith("import")
                            ? "text-purple-400"
                            : line.includes("export default")
                            ? "text-blue-400 font-bold"
                            : line.includes("PostgreSQL")
                            ? "text-emerald-400 font-bold"
                            : line.includes('"')
                            ? "text-amber-300"
                            : "text-slate-200"
                        }`}
                      >
                        {line}
                      </span>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex gap-3 items-center">
                      <span className="text-slate-600 select-none w-5 text-right font-sans text-[11px]">
                        {displayedLines.length + 1}
                      </span>
                      <span className="w-2 h-4 bg-cyan-400 inline-block animate-pulse ml-0.5" />
                    </div>
                  )}
                </div>
              </div>

              {/* Terminal Deploy Bar */}
              <div className="mt-4 pt-3 border-t border-slate-800/90 text-[11px] space-y-1">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="flex items-center gap-1.5 text-slate-300">
                    <Terminal size={12} className="text-[#1E6FFF]" />
                    <span>status:</span>
                    <span className="text-emerald-400 font-bold">
                      {isTyping ? "compiling bundle..." : "build ready & deployed"}
                    </span>
                  </span>
                  <span className="text-slate-500">0.4s fast response</span>
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
                  <span>db: postgresql://sksoftech_db</span>
                  <span className="text-blue-400">Turbopack active</span>
                </div>
              </div>
            </div>

            {/* RIGHT 7 COLS: The Live 3D Website Mockup */}
            <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between shadow-2xl relative">
              {/* Browser Address Bar */}
              <div className="flex items-center justify-between bg-slate-950 px-3.5 py-2 rounded-xl border border-slate-800 mb-4 text-[11px]">
                <div className="flex items-center gap-2 truncate">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-slate-400 font-mono truncate">
                    https://{activePreset.id}.sksoftechdm.com
                  </span>
                </div>
                <span className="flex items-center gap-1 text-[10px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800 font-mono">
                  <ShieldCheck size={11} className="text-emerald-400" /> SSL Verified
                </span>
              </div>

              {/* The Live Rendering Canvas */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePreset.id}
                  initial={{ opacity: 0, y: 15, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -15, scale: 0.98 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 rounded-xl p-5 sm:p-6 border border-slate-700/80 shadow-inner flex flex-col justify-between min-h-[300px]"
                >
                  {/* Mockup Header Strip */}
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="text-xs font-black text-white flex items-center gap-2">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: activePreset.color }}
                      />
                      {activePreset.clientType}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                      {activePreset.preview.badge}
                    </span>
                  </div>

                  {/* Mockup Hero Message */}
                  <div className="py-5 space-y-3">
                    <h3 className="text-lg sm:text-xl font-black text-white tracking-tight leading-snug">
                      {activePreset.preview.headline}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed max-w-lg">
                      {activePreset.preview.sub}
                    </p>

                    {/* Stats & Actions */}
                    <div className="flex flex-wrap items-center gap-4 pt-2">
                      <button
                        className="btn-yellow text-xs px-4 py-2 font-bold shadow-md cursor-pointer hover:scale-105 transition-transform"
                        style={{ background: activePreset.color, color: "#0B1F4B" }}
                      >
                        {activePreset.preview.cta}
                      </button>
                      <div className="border-l border-slate-800 pl-3">
                        <span className="text-xs font-black text-white font-mono block">
                          {activePreset.preview.stat}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {activePreset.preview.statLabel}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Simulated Incoming WhatsApp Lead Banner */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-emerald-950/60 border border-emerald-500/40 rounded-xl p-3 flex items-center justify-between text-xs text-emerald-200 mt-2 shadow-lg"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-[10px] shadow-sm">
                        WA
                      </div>
                      <span className="font-semibold text-emerald-300 text-[11px]">
                        {activePreset.preview.leadSnippet}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/30 whitespace-nowrap">
                      Captured Live
                    </span>
                  </motion.div>
                </motion.div>
              </AnimatePresence>

              {/* Bottom Feature Badges */}
              <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400">
                <span className="flex items-center gap-1 text-slate-300">
                  <CheckCircle2 size={12} className="text-emerald-400" /> PostgreSQL 18
                </span>
                <span className="flex items-center gap-1 text-slate-300">
                  <Zap size={12} className="text-amber-400" /> 0.4s Google Speed
                </span>
                <span className="flex items-center gap-1 text-slate-300">
                  <Smartphone size={12} className="text-blue-400" /> 100% Mobile Ready
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
