"use client";

import { motion } from "framer-motion";
import {
  Layers,
  Code2,
  Database,
  Smartphone,
  Cpu,
  Zap,
  Globe2,
  CheckCircle2,
  ShieldCheck,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

export default function WebsiteCraft3D() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: "architecture",
      title: "1. High-Performance Architecture",
      subtitle: "Next.js Turbopack + PostgreSQL Engine",
      desc: "We build on enterprise-grade infrastructure. Real PostgreSQL databases, sub-second page loads, and zero-compromise security.",
      badge: "Architecture",
      metrics: "0.4s Fast Load • 99/100 Google Score",
    },
    {
      id: "uiux",
      title: "2. Precision UI/UX & Responsive 3D",
      subtitle: "Interactive Glassmorphism & Framer Motion",
      desc: "Tailored visual design engineered for conversion. Fluid animations, tactile 3D cards, and seamless mobile experience.",
      badge: "Design & UX",
      metrics: "100% Mobile Ready • Fluid Animations",
    },
    {
      id: "growth",
      title: "3. Direct WhatsApp CRM & SEO Rank",
      subtitle: "Leads Captured Directly to Founder's Phone",
      desc: "Every website includes real-time lead capture, automated email notifications, and Google Local SEO so customers in Pune find you first.",
      badge: "Growth Engine",
      metrics: "3x More Leads • Local SEO Dominance",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white via-slate-50 to-white relative overflow-hidden border-t border-slate-100">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-blue-500/5 via-indigo-500/5 to-amber-500/5 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="section-tag mb-3 inline-flex items-center gap-1.5 shadow-sm">
            <Sparkles size={13} className="text-[#1E6FFF]" />
            The SK Softech Engineering Standard
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            How We Build <span className="gradient-text">World-Class Websites</span> That Win Clients
          </h2>
          <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed">
            We do not use cookie-cutter WordPress themes. We engineer custom digital flagships with
            high-end 3D interactions, PostgreSQL databases, and automated lead capture engines.
          </p>
        </div>

        {/* 3D Visual Experience Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Interactive Steps Selector */}
          <div className="lg:col-span-5 space-y-4">
            {steps.map((step, idx) => {
              const isSelected = activeStep === idx;
              return (
                <div
                  key={step.id}
                  onClick={() => setActiveStep(idx)}
                  className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 border ${
                    isSelected
                      ? "bg-white border-[#1E6FFF] shadow-xl shadow-blue-500/10 ring-2 ring-blue-500/20"
                      : "bg-white/60 border-slate-200/80 hover:border-slate-300 hover:bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#1E6FFF]">
                      {step.badge}
                    </span>
                    {isSelected && (
                      <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        <CheckCircle2 size={12} /> Active Preview
                      </span>
                    )}
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-lg leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-xs font-semibold text-slate-500 mt-0.5">
                    {step.subtitle}
                  </p>
                  <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                    {step.desc}
                  </p>
                  <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <span className="font-mono">{step.metrics}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: 3D Isometric Interactive Showcase */}
          <div className="lg:col-span-7 relative">
            <div className="relative mx-auto w-full max-w-[560px] h-[480px] flex items-center justify-center [perspective:1200px]">
              {/* Outer Decorative Circle Grid */}
              <div className="absolute inset-0 rounded-3xl border border-slate-200/60 bg-gradient-to-br from-slate-50/50 via-white/80 to-blue-50/30 shadow-2xl shadow-slate-200/50 backdrop-blur-xl -z-10" />

              {/* 3D Tilted Stack */}
              <motion.div
                animate={{
                  rotateX: [12, 10, 12],
                  rotateY: [-15, -12, -15],
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative w-[380px] sm:w-[440px] h-[320px] [transform-style:preserve-3d]"
              >
                {/* 3D LAYER 1 (Bottom): Database & Cloud Architecture */}
                <motion.div
                  animate={{
                    z: activeStep === 0 ? 90 : 0,
                    scale: activeStep === 0 ? 1.05 : 0.95,
                    opacity: activeStep === 0 ? 1 : 0.65,
                  }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#0B1F4B] to-slate-950 p-6 text-white shadow-2xl border border-blue-500/30 flex flex-col justify-between"
                  style={{
                    transform: "translateZ(0px) translateY(50px)",
                  }}
                >
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-rose-500" />
                      <div className="w-3 h-3 rounded-full bg-amber-500" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500" />
                      <span className="text-[11px] font-mono text-slate-400 ml-2">db.postgresql.sksoftech</span>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                      <Database size={10} /> Active Port 5432
                    </span>
                  </div>

                  <div className="space-y-2 font-mono text-[11px] text-slate-300 py-3">
                    <div className="flex items-center justify-between bg-white/5 p-2 rounded-lg">
                      <span className="text-blue-400">table: inquiries</span>
                      <span className="text-emerald-400 font-bold">Encrypted Lead Sync</span>
                    </div>
                    <div className="flex items-center justify-between bg-white/5 p-2 rounded-lg">
                      <span className="text-amber-400">auth: RBAC Roles</span>
                      <span className="text-slate-300">SuperAdmin, PM, Recruiter</span>
                    </div>
                    <div className="flex items-center justify-between bg-white/5 p-2 rounded-lg">
                      <span className="text-purple-400">audit_logs: tracking</span>
                      <span className="text-cyan-400">Tamper-Evident Trail</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 border-t border-white/10 pt-2">
                    <span className="flex items-center gap-1">
                      <ShieldCheck size={13} className="text-emerald-400" /> Zero Data Loss Guarantee
                    </span>
                    <span className="text-slate-500 font-mono">Prisma ORM</span>
                  </div>
                </motion.div>

                {/* 3D LAYER 2 (Middle): UI/UX Interactive Glass Studio */}
                <motion.div
                  animate={{
                    z: activeStep === 1 ? 90 : 35,
                    scale: activeStep === 1 ? 1.05 : 0.96,
                    opacity: activeStep === 1 ? 1 : 0.75,
                  }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 rounded-2xl bg-white/90 backdrop-blur-xl p-6 text-slate-900 shadow-2xl border border-blue-200 flex flex-col justify-between"
                  style={{
                    transform: "translateZ(35px) translateY(10px)",
                  }}
                >
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-md">
                        SK
                      </div>
                      <div>
                        <h4 className="font-extrabold text-xs text-slate-900 leading-none">
                          Studio Design Engine
                        </h4>
                        <span className="text-[10px] text-slate-500">Turbopack Next.js 16</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-[#1E6FFF] border border-blue-200">
                      Tailwind v4 Motion
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 py-2">
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <span className="text-[10px] text-slate-500 block mb-1">Color Palette</span>
                      <div className="flex gap-1.5 items-center">
                        <span className="w-4 h-4 rounded-full bg-[#1E6FFF]" />
                        <span className="w-4 h-4 rounded-full bg-[#FFC21A]" />
                        <span className="w-4 h-4 rounded-full bg-[#0B1F4B]" />
                        <span className="text-[10px] font-mono text-slate-600 ml-1">Dynamic</span>
                      </div>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                      <span className="text-[10px] text-slate-500 block mb-1">Device Matrix</span>
                      <div className="flex items-center gap-1.5 text-xs text-slate-800 font-bold">
                        <Smartphone size={14} className="text-[#1E6FFF]" />
                        <span>100% Adaptive</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-100 pt-2 font-mono">
                    <span>renderTime: 12ms</span>
                    <span className="text-emerald-600 font-bold flex items-center gap-1">
                      <Zap size={12} /> 60 FPS Smooth
                    </span>
                  </div>
                </motion.div>

                {/* 3D LAYER 3 (Top): Live Converting Product & WhatsApp CRM */}
                <motion.div
                  animate={{
                    z: activeStep === 2 ? 90 : 70,
                    scale: activeStep === 2 ? 1.05 : 0.98,
                    opacity: activeStep === 2 ? 1 : 0.85,
                  }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white via-white to-amber-50/40 p-6 text-slate-900 shadow-2xl border-2 border-[#FFC21A]/60 flex flex-col justify-between"
                  style={{
                    transform: "translateZ(70px) translateY(-30px)",
                  }}
                >
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <span className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                      <Globe2 size={16} className="text-[#1E6FFF]" /> Live Converting Website
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                      ● Live in Pune
                    </span>
                  </div>

                  <div className="space-y-2 py-2">
                    <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-sm flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-xs">
                          WA
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900">Direct WhatsApp Inquiry</p>
                          <span className="text-[10px] text-slate-500">&quot;Need quotation for 2BHK flat&quot;</span>
                        </div>
                      </div>
                      <span className="text-[11px] font-bold text-emerald-600">+₹35,000</span>
                    </div>

                    <div className="flex items-center justify-between px-2 text-[11px] text-slate-600">
                      <span className="flex items-center gap-1">
                        <TrendingUp size={13} className="text-emerald-600" /> Google Search Ranking
                      </span>
                      <span className="font-bold text-slate-900">Top 3 in Pune</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[11px] border-t border-slate-100 pt-2">
                    <span className="text-slate-500">Automated Lead Delivery</span>
                    <span className="font-bold text-[#1E6FFF]">Instant SMS + Email</span>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
