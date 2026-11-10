"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Compass,
  Palette,
  Code2,
  ShieldCheck,
  Rocket,
  CheckCircle2,
  Clock,
  ArrowRight,
  Database,
  Lock,
  Cpu,
  Zap,
  ChevronRight,
} from "lucide-react";

interface ProcessStep {
  step: string;
  number: string;
  title: string;
  subtitle: string;
  duration: string;
  deliverables: string[];
  techUsed: string[];
  codePreview: {
    filename: string;
    code: string[];
  };
  metrics: string;
}

const STEPS: ProcessStep[] = [
  {
    step: "Stage 01",
    number: "01",
    title: "System Architecture & Database Blueprint",
    subtitle: "We map your entire business logic, user flows, and database relationships before writing a single line of code.",
    duration: "Day 1 – 2",
    deliverables: [
      "PostgreSQL 18 Entity-Relationship (ERD) Schema",
      "API Routes & Microservices Specification",
      "Component Hierarchy & State Flow Architecture",
    ],
    techUsed: ["Prisma ORM", "PostgreSQL 18", "System ERD"],
    codePreview: {
      filename: "prisma/schema.prisma",
      code: [
        "model EnterpriseClient {",
        "  id        String   @id @default(uuid())",
        "  name      String",
        "  role      UserRole @default(CLIENT)",
        "  orders    Order[]",
        "  auditLogs AuditLog[]",
        "}",
      ],
    },
    metrics: "Zero architectural debt • 100% schema validation",
  },
  {
    step: "Stage 02",
    number: "02",
    title: "Bespoke 3D UI/UX & Design Tokens",
    subtitle: "Crafting a distinctive, high-tech interface with custom design tokens, 3D interactive elements, and zero generic templates.",
    duration: "Day 3 – 4",
    deliverables: [
      "Custom Design Token Palette (Tailwind CSS v4)",
      "Interactive 3D Hardware Device Specimens",
      "Mobile-First Responsive Wireframes (120Hz Easing)",
    ],
    techUsed: ["Figma Systems", "Tailwind CSS", "Framer Motion"],
    codePreview: {
      filename: "design/tokens.css",
      code: [
        ":root {",
        "  --obsidian-black: #030712;",
        "  --precision-blue: #2563EB;",
        "  --titanium-border: #1E293B;",
        "  --perspective-stage: 1600px;",
        "}",
      ],
    },
    metrics: "100% Bespoke Swiss Aesthetic • 0% Generic Templates",
  },
  {
    step: "Stage 03",
    number: "03",
    title: "Full-Stack Next.js 16 Implementation",
    subtitle: "Engineering the production system with Next.js 16 Partial Prerendering, server actions, and sub-second payment webhooks.",
    duration: "Day 5 – 7",
    deliverables: [
      "Next.js 16 App Router & Server Components",
      "Razorpay / UPI Payment Gateway Webhooks",
      "Automated WhatsApp & Email Notification Dispatch",
    ],
    techUsed: ["Next.js 16", "React 19", "Razorpay UPI", "Turbopack"],
    codePreview: {
      filename: "app/api/checkout/route.ts",
      code: [
        "export async function POST(req: NextRequest) {",
        "  const { orderId, amount } = await req.json();",
        "  const session = await razorpay.orders.create({ amount });",
        "  await db.visitorLogs.track({ path: '/checkout' });",
        "  return NextResponse.json({ success: true, session });",
        "}",
      ],
    },
    metrics: "Sub-0.4s page load • Instant UPI confirmation",
  },
  {
    step: "Stage 04",
    number: "04",
    title: "20-Point Security Audit & Hardening",
    subtitle: "Rigorous pre-launch security testing based on the 20-Point Security Checklist: Zod input validation, rate limiting, and RBAC.",
    duration: "Day 8 – 9",
    deliverables: [
      "Sliding Window IP Rate Limiting (DDoS Protection)",
      "Strict Zod Schema Input Sanitization (SQLi Prevention)",
      "Tamper-Evident Admin Action Audit Logging",
    ],
    techUsed: ["Zod", "BcryptJS", "Next-Auth RBAC", "OWASP Hardening"],
    codePreview: {
      filename: "lib/securityGuard.ts",
      code: [
        "const schema = z.object({",
        "  email: z.string().email(),",
        "  token: z.string().min(32),",
        "});",
        "const verified = schema.safeParse(req.body);",
        "if (!verified.success) return new Response('Forbidden', { status: 403 });",
      ],
    },
    metrics: "100% OWASP Compliance • Zero-Trust Access",
  },
  {
    step: "Stage 05",
    number: "05",
    title: "Edge Deployment & 100/100 Core Web Vitals",
    subtitle: "Zero-downtime deployment to AWS Mumbai and Cloudflare Edge POPs with automated daily PostgreSQL backups and monitoring.",
    duration: "Day 10 (Launch)",
    deliverables: [
      "AWS Mumbai (ap-south-1) Edge Hosting",
      "Automated Nightly PostgreSQL Backup Cron",
      "Google Search Console & Dynamic XML Sitemap Sync",
    ],
    techUsed: ["AWS Mumbai", "Cloudflare", "Lighthouse 100", "SSL TLS 1.3"],
    codePreview: {
      filename: "scripts/backup-db.bat",
      code: [
        "@echo off",
        "pg_dump -h localhost -U postgres -d sksoftech_db > backup.sql",
        "echo [SUCCESS] 17 tables backed up with zero downtime.",
        "curl -X POST https://status.sksoftech.in/health-check",
      ],
    },
    metrics: "99.99% Uptime SLA • 100/100 Google Lighthouse",
  },
];

export default function EngineeringProcessTimeline() {
  const [activeStep, setActiveStep] = useState(0);
  const cur = STEPS[activeStep];

  return (
    <section
      id="process"
      className="py-28 bg-[#030712] text-white relative overflow-hidden border-t border-slate-900"
    >
      {/* Background Architectural Mesh */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#38BDF8 1px, transparent 1px), linear-gradient(90deg, #38BDF8 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Ambient Lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[850px] h-[400px] bg-gradient-to-r from-blue-900/15 via-indigo-900/10 to-transparent blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-mono tracking-wider uppercase bg-slate-900/90 text-blue-400 border border-slate-800 shadow-sm mb-4">
            <Compass size={14} className="text-blue-400" />
            <span>The SK Softech Engineering Protocol</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15]">
            From Blueprint to Edge.{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-sky-300 to-slate-200">
              The 5-Stage Protocol.
            </span>
          </h2>

          <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
            We don&apos;t build random websites. We follow a strict, battle-tested software engineering process designed to eliminate bugs, ensure military-grade security, and deliver peak conversion.
          </p>
        </div>

        {/* 5-Step Interactive Navigation Rail (Animaster Style) */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-3 mb-10">
          {STEPS.map((s, idx) => (
            <button
              key={s.step}
              onClick={() => setActiveStep(idx)}
              className={`p-3 sm:p-4 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden ${
                activeStep === idx
                  ? "bg-slate-900/95 border-blue-500 shadow-[0_0_25px_rgba(37,99,235,0.2)] ring-1 ring-blue-500/50"
                  : "bg-slate-950/70 border-slate-800/80 hover:border-slate-700 text-slate-400 hover:text-white"
              }`}
            >
              {activeStep === idx && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-sky-400 to-emerald-400" />
              )}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase text-slate-400">
                  {s.step}
                </span>
                <span
                  className={`w-2 h-2 rounded-full ${
                    activeStep === idx ? "bg-blue-400 animate-pulse" : "bg-slate-700"
                  }`}
                />
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-white mt-1.5 line-clamp-1">
                {s.title.split(" ")[0]} {s.title.split(" ")[1]}
              </h4>
              <span className="text-[10px] font-mono text-slate-500 mt-1 block">
                {s.duration}
              </span>
            </button>
          ))}
        </div>

        {/* ACTIVE STAGE SHOWCASE CARD (Bespoke Interactive Deck) */}
        <div className="bg-slate-950/90 border border-slate-800/90 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column: Stage Details & Deliverables (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-blue-950 border border-blue-800/60 text-blue-300">
                  {cur.step} of 05
                </span>
                <span className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                  <Clock size={13} className="text-blue-400" />
                  <span>Timeline: {cur.duration}</span>
                </span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {cur.title}
                </h3>
                <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                  {cur.subtitle}
                </p>
              </div>

              {/* Concrete Deliverables List */}
              <div className="space-y-2.5 pt-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
                  Verified Stage Deliverables:
                </span>
                {cur.deliverables.map((d, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                    <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                    <span>{d}</span>
                  </div>
                ))}
              </div>

              {/* Tech Stack Chips */}
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <span className="text-[10px] font-mono text-slate-500">Stack:</span>
                {cur.techUsed.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] font-mono bg-slate-900 border border-slate-800 text-blue-300 px-2.5 py-1 rounded-md"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Key Outcome Badge */}
              <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Standard Met:</span>
                <span className="text-emerald-400 font-bold">{cur.metrics}</span>
              </div>
            </div>

            {/* Right Column: Live Code / File Specimen Preview (5 Cols) */}
            <div className="lg:col-span-5">
              <div className="bg-[#070D1E] rounded-2xl border border-slate-800 overflow-hidden shadow-xl font-mono text-xs text-slate-300">
                {/* Code Window Header */}
                <div className="h-9 bg-slate-900/95 border-b border-slate-800 px-4 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    <span className="ml-2 text-[11px] text-slate-400 font-mono">
                      {cur.codePreview.filename}
                    </span>
                  </div>
                  <span className="text-[10px] text-cyan-400 font-mono">Verified Production Code</span>
                </div>

                {/* Code Body */}
                <div className="p-4 sm:p-5 space-y-1.5 overflow-x-auto text-[11px] leading-relaxed">
                  {cur.codePreview.code.map((line, idx) => (
                    <div key={idx} className="flex">
                      <span className="w-6 text-slate-600 select-none">{idx + 1}</span>
                      <span className="text-slate-200">{line}</span>
                    </div>
                  ))}
                </div>

                {/* Footer Status Strip */}
                <div className="px-4 py-2 bg-slate-950 border-t border-slate-900 flex items-center justify-between text-[10px] text-slate-400">
                  <span className="text-emerald-400 flex items-center gap-1">
                    <Zap size={11} /> 100% Pass Rate
                  </span>
                  <span>SK Softech Engineering Core</span>
                </div>
              </div>

              {/* Stage Navigation Trigger */}
              <div className="mt-4 flex items-center justify-between">
                <button
                  onClick={() => setActiveStep((prev) => (prev > 0 ? prev - 1 : STEPS.length - 1))}
                  className="text-xs font-mono text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  ← Previous Stage
                </button>
                <button
                  onClick={() => setActiveStep((prev) => (prev < STEPS.length - 1 ? prev + 1 : 0))}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
                >
                  <span>Next Stage</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
