"use client";

import { useState, useRef, useEffect, MouseEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Monitor,
  Code2,
  Smartphone,
  TrendingUp,
  Search,
  Palette,
  Settings,
  Database,
  ShieldCheck,
  Zap,
  Cpu,
  Layers,
  Sparkles,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  BarChart3,
  Bot,
  Globe2,
} from "lucide-react";
import { ServiceItem } from "@/lib/siteContentStore";

// Spotlight Card component with cursor-following radial glow (Skiper UI pattern)
function SpotlightBentoCard({
  children,
  className = "",
  spotlightColor = "rgba(37, 99, 235, 0.18)",
  borderColor = "rgba(59, 130, 246, 0.4)",
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  borderColor?: string;
  onClick?: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePos({ x: -1000, y: -1000 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`group relative rounded-3xl p-6 sm:p-8 bg-slate-950/80 border border-slate-800/90 overflow-hidden transition-all duration-300 hover:border-slate-700 backdrop-blur-xl ${className}`}
    >
      {/* Outer Hairline Spotlight Border Effect */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, ${borderColor}, transparent 80%)`,
        }}
      />

      {/* Surface Radial Spotlight Glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(450px circle at ${mousePos.x}px ${mousePos.y}px, ${spotlightColor}, transparent 80%)`,
        }}
      />

      {/* Card Content */}
      <div className="relative z-10 h-full flex flex-col justify-between">
        {children}
      </div>
    </div>
  );
}

export default function ServicesSection() {
  const [activeCategory, setActiveCategory] = useState<"all" | "engineering" | "growth" | "design">("all");

  const categories = [
    { id: "all", label: "All Capabilities" },
    { id: "engineering", label: "Full-Stack & Cloud" },
    { id: "growth", label: "Growth & SEO" },
    { id: "design", label: "Brand & 3D UI" },
  ] as const;

  return (
    <section
      id="services"
      className="py-28 bg-[#030712] text-white relative overflow-hidden border-t border-slate-900"
    >
      {/* Atmospheric Background Ambient Grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#475569 1px, transparent 1px), linear-gradient(90deg, #475569 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Top Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[850px] h-[400px] bg-gradient-to-r from-blue-900/15 via-sky-900/10 to-transparent blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-mono tracking-wider uppercase bg-slate-900/90 text-blue-400 border border-slate-800 shadow-sm mb-4">
              <Sparkles size={13} className="text-[#FFC21A]" />
              <span>Full-Spectrum Digital Capabilities</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15]">
              Engineering Excellence.{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-sky-300 to-slate-200">
                End-to-End Delivery.
              </span>
            </h2>

            <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
              We architect, engineer, and scale high-performance software, high-converting digital portals, and data pipelines for ambitious enterprises in Pune and beyond.
            </p>
          </div>

          {/* Interactive Filter Pills */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-950 p-1.5 rounded-2xl border border-slate-800/90 shadow-inner">
            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveCategory(c.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === c.id
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* ======================================================== */}
        {/* SKIPER UI SPOTLIGHT BENTO GRID */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* 1. HERO MEGA-BENTO (2 Cols, 2 Rows) - Full-Stack Web & SaaS Engineering */}
          {(activeCategory === "all" || activeCategory === "engineering") && (
            <SpotlightBentoCard
              className="md:col-span-2 md:row-span-2 min-h-[420px] justify-between"
              spotlightColor="rgba(37, 99, 235, 0.22)"
              borderColor="rgba(59, 130, 246, 0.6)"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
                  <div className="flex items-center gap-2.5">
                    <div className="w-12 h-12 rounded-2xl bg-blue-950/80 border border-blue-500/40 flex items-center justify-center text-blue-400 shadow-lg shadow-blue-950/50">
                      <Monitor size={24} />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-blue-400 font-bold block">
                        Flagship Architecture
                      </span>
                      <h3 className="text-xl sm:text-2xl font-black text-white">
                        Full-Stack Web & SaaS Engineering
                      </h3>
                    </div>
                  </div>
                  <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-full font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    0.3s TTFB
                  </span>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed mt-5">
                  Bespoke digital platforms engineered with Next.js 16 Partial Prerendering (PPR), React 19, and enterprise microservices. From high-converting e-commerce with instant UPI intent checkouts to complex hospital OPD systems and real estate portals.
                </p>

                {/* Interactive Simulated Code/Terminal Snippet */}
                <div className="mt-6 bg-[#070D1E] rounded-2xl p-4 border border-slate-800/90 font-mono text-xs text-slate-300 space-y-1.5">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-[10px] text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-rose-500" />
                      <span className="w-2 h-2 rounded-full bg-amber-500" />
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span>api/checkout/route.ts</span>
                    </span>
                    <span className="text-cyan-400">Turbopack SSR Active</span>
                  </div>
                  <p className="text-blue-400 pt-1">
                    <span className="text-purple-400">export async function</span>{" "}
                    POST(req: NextRequest) &#123;
                  </p>
                  <p className="text-slate-400 pl-4">
                    const order = await prisma.orders.create(&#123; latency: &apos;0.8ms&apos; &#125;);
                  </p>
                  <p className="text-emerald-400 pl-4">
                    return NextResponse.json(&#123; status: &apos;PAID&apos;, region: &apos;AWS Mumbai&apos; &#125;);
                  </p>
                  <p className="text-blue-400">&#125;</p>
                </div>
              </div>

              {/* Bottom Feature Badges & Action */}
              <div className="pt-6 mt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2 text-[10px] font-mono">
                  <span className="bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-md text-slate-300">
                    Next.js 16
                  </span>
                  <span className="bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-md text-slate-300">
                    PostgreSQL 18
                  </span>
                  <span className="bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-md text-slate-300">
                    Redis Cache
                  </span>
                  <span className="bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-md text-slate-300">
                    Razorpay Webhooks
                  </span>
                </div>

                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 group-hover:text-blue-300 transition-colors"
                >
                  <span>Explore Stack</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </SpotlightBentoCard>
          )}

          {/* 2. ENTERPRISE MOBILE APPS (2 Cols) */}
          {(activeCategory === "all" || activeCategory === "engineering") && (
            <SpotlightBentoCard
              className="md:col-span-2 min-h-[220px]"
              spotlightColor="rgba(6, 182, 212, 0.2)"
              borderColor="rgba(6, 182, 212, 0.5)"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                  <Smartphone size={20} />
                </div>
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-500/30 px-2.5 py-0.5 rounded-full font-bold">
                  iOS & Android
                </span>
              </div>

              <div className="my-3">
                <h3 className="text-lg font-bold text-white">
                  Native & Cross-Platform Mobile Apps
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Smooth 120Hz React Native and Flutter mobile applications with live WebSockets, real-time GPS rider telemetry, and background push notifications.
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
                <span>Fast Offline Sync</span>
                <span className="text-cyan-400 font-bold">4.9 ★ App Rating</span>
              </div>
            </SpotlightBentoCard>
          )}

          {/* 3. POSTGRESQL & ENTERPRISE CLOUD ARCHITECTURE (1 Col) */}
          {(activeCategory === "all" || activeCategory === "engineering") && (
            <SpotlightBentoCard
              className="min-h-[220px]"
              spotlightColor="rgba(16, 185, 129, 0.2)"
              borderColor="rgba(16, 185, 129, 0.5)"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <Database size={20} />
                </div>
                <span className="text-[10px] font-mono text-emerald-400 font-bold">
                  ACID Bedrock
                </span>
              </div>

              <div className="my-3">
                <h3 className="text-base font-bold text-white">
                  PostgreSQL 18 & Cloud
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Multi-tenant relational schemas, Prisma ORM, connection poolers, and tamper-evident audit logs hosted on AWS Mumbai.
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 text-[11px] font-mono text-emerald-400 font-bold">
                0.8ms Query Latency
              </div>
            </SpotlightBentoCard>
          )}

          {/* 4. AI AGENTS & BUSINESS AUTOMATION (1 Col) */}
          {(activeCategory === "all" || activeCategory === "engineering") && (
            <SpotlightBentoCard
              className="min-h-[220px]"
              spotlightColor="rgba(168, 85, 247, 0.2)"
              borderColor="rgba(168, 85, 247, 0.5)"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-purple-950/80 border border-purple-500/40 flex items-center justify-center text-purple-400">
                  <Bot size={20} />
                </div>
                <span className="text-[10px] font-mono text-purple-400 font-bold">
                  Generative AI
                </span>
              </div>

              <div className="my-3">
                <h3 className="text-base font-bold text-white">
                  AI Workflows & Bots
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Custom WhatsApp AI chatbots, automated invoice data extraction, and intelligent lead qualification engines.
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 text-[11px] font-mono text-purple-400 font-bold">
                24/7 Zero Human Overhead
              </div>
            </SpotlightBentoCard>
          )}

          {/* 5. PERFORMANCE SEO & GOOGLE SPEED (1 Col) */}
          {(activeCategory === "all" || activeCategory === "growth") && (
            <SpotlightBentoCard
              className="min-h-[220px]"
              spotlightColor="rgba(245, 158, 11, 0.2)"
              borderColor="rgba(245, 158, 11, 0.5)"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-amber-950/80 border border-amber-500/40 flex items-center justify-center text-amber-400">
                  <Search size={20} />
                </div>
                <span className="text-[10px] font-mono text-amber-400 font-bold">
                  100/100 Core Vitals
                </span>
              </div>

              <div className="my-3">
                <h3 className="text-base font-bold text-white">
                  Technical SEO & Speed
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Dynamic XML sitemaps, JSON-LD structured schemas, canonical tags, and sub-second rendering for #1 Google Pune rankings.
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 text-[11px] font-mono text-amber-400 font-bold">
                Top 1% Global Load Speed
              </div>
            </SpotlightBentoCard>
          )}

          {/* 6. BRAND IDENTITY & 3D USER EXPERIENCE (1 Col) */}
          {(activeCategory === "all" || activeCategory === "design") && (
            <SpotlightBentoCard
              className="min-h-[220px]"
              spotlightColor="rgba(236, 72, 153, 0.2)"
              borderColor="rgba(236, 72, 153, 0.5)"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-pink-950/80 border border-pink-500/40 flex items-center justify-center text-pink-400">
                  <Palette size={20} />
                </div>
                <span className="text-[10px] font-mono text-pink-400 font-bold">
                  UI/UX Systems
                </span>
              </div>

              <div className="my-3">
                <h3 className="text-base font-bold text-white">
                  Brand & 3D Interactive UI
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Bespoke design systems, interactive 3D product visualizers, corporate identity, and typography engineered to convert.
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 text-[11px] font-mono text-pink-400 font-bold">
                Figma to Pixel-Perfect Code
              </div>
            </SpotlightBentoCard>
          )}

          {/* 7. DIGITAL MARKETING & CONVERSION FUNNELS (2 Cols) */}
          {(activeCategory === "all" || activeCategory === "growth") && (
            <SpotlightBentoCard
              className="md:col-span-2 min-h-[220px]"
              spotlightColor="rgba(59, 130, 246, 0.2)"
              borderColor="rgba(59, 130, 246, 0.5)"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-blue-950/80 border border-blue-500/40 flex items-center justify-center text-blue-400">
                  <TrendingUp size={20} />
                </div>
                <span className="text-[10px] font-mono text-blue-400 bg-blue-950/60 border border-blue-500/30 px-2.5 py-0.5 rounded-full font-bold">
                  ROI-Driven Growth
                </span>
              </div>

              <div className="my-3">
                <h3 className="text-lg font-bold text-white">
                  Performance Ads & Targeted Marketing
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Google Search Ads, Meta campaigns, and automated WhatsApp lead-nurturing funnels designed for measurable revenue returns.
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
                <span>3.2x Average Client ROAS</span>
                <span className="text-blue-400 font-bold">Daily Analytics Tracking</span>
              </div>
            </SpotlightBentoCard>
          )}

          {/* 8. 24/7 MANAGED CLOUD SUPPORT & SLA (2 Cols on lg) */}
          {(activeCategory === "all" || activeCategory === "engineering") && (
            <SpotlightBentoCard
              className="md:col-span-2 min-h-[220px]"
              spotlightColor="rgba(99, 102, 241, 0.2)"
              borderColor="rgba(99, 102, 241, 0.5)"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-indigo-950/80 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
                  <ShieldCheck size={20} />
                </div>
                <span className="text-[10px] font-mono text-indigo-400 bg-indigo-950/60 border border-indigo-500/30 px-2.5 py-0.5 rounded-full font-bold">
                  Zero-Downtime SLA
                </span>
              </div>

              <div className="my-3">
                <h3 className="text-lg font-bold text-white">
                  Enterprise Maintenance & Security Hardening
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Automated nightly PostgreSQL database dumps, SSL certificate renewal, DDoS mitigation, and guaranteed 1-hour emergency response times.
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
                <span>ISO 27001 Ready Practices</span>
                <span className="text-indigo-400 font-bold">99.99% Production Uptime</span>
              </div>
            </SpotlightBentoCard>
          )}
        </div>

        {/* Bottom Consultation Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900/90 via-[#0B1428] to-slate-900/90 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div>
            <span className="text-[10px] font-mono uppercase text-[#FFC21A] font-bold block tracking-wider">
              Need a Custom Engineered Solution?
            </span>
            <h4 className="text-lg sm:text-xl font-black text-white mt-1">
              Discuss Your Architecture Directly With Our Technical Lead
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              No sales pitches — just clear system design, transparent timelines, and fixed pricing.
            </p>
          </div>

          <a
            href="#contact"
            className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-600/30 flex items-center gap-2 transition-all hover:scale-105 cursor-pointer whitespace-nowrap"
          >
            <span>Schedule Technical Call</span>
            <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}
