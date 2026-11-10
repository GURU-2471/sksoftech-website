"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Monitor,
  Smartphone,
  Layers,
  Cpu,
  Database,
  ShieldCheck,
  Zap,
  Activity,
  ArrowRight,
  Maximize2,
  Box,
  Compass,
  CheckCircle2,
  Lock,
  Server,
  Code2,
} from "lucide-react";

interface CaseStudy {
  id: string;
  client: string;
  location: string;
  title: string;
  category: "Enterprise Web" | "Fintech & E-Commerce" | "Healthcare Platform" | "CleanTech Portal";
  brief: string;
  architecture: {
    frontend: string;
    backend: string;
    database: string;
    security: string;
  };
  metrics: {
    metric1: { label: string; value: string };
    metric2: { label: string; value: string };
    metric3: { label: string; value: string };
  };
  telemetry: {
    ttfb: string;
    lighthouse: number;
    uptime: string;
    edgeRegion: string;
  };
  interactiveScreens: {
    tab1: { name: string; title: string; subtitle: string; tag: string; action: string };
    tab2: { name: string; title: string; subtitle: string; tag: string; action: string };
  };
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: "healthcare",
    client: "Apex Multispecialty Hospital",
    location: "Kothrud, Pune",
    title: "Real-Time OPD Orchestration & Clinical Queue System",
    category: "Healthcare Platform",
    brief:
      "Enterprise healthcare portal managing 850+ daily outpatient bookings, multi-specialist OPD rosters, digital token call-out displays, and end-to-end WhatsApp prescription delivery.",
    architecture: {
      frontend: "Next.js 16 (App Router, Server Actions, Tailwind CSS)",
      backend: "Node.js Microservices, WebRTC Tele-OPD Engine",
      database: "PostgreSQL 18 (HIPAA-Ready Encrypted Health Records)",
      security: "Role-Based Access Control (RBAC), Zod Validation, TLS 1.3",
    },
    metrics: {
      metric1: { label: "Daily OPD Patients", value: "850+" },
      metric2: { label: "Patient Wait Time", value: "-45%" },
      metric3: { label: "Server Response", value: "22ms" },
    },
    telemetry: {
      ttfb: "0.24s",
      lighthouse: 99,
      uptime: "99.99%",
      edgeRegion: "AWS Mumbai (ap-south-1)",
    },
    interactiveScreens: {
      tab1: {
        name: "Doctor OPD Roster",
        title: "Cardiology & Orthopedics Live Slots",
        subtitle: "Dr. Kale (MBBS, MD) • 6 Slots Open Today • Room 204",
        tag: "NABH Accredited",
        action: "Confirm Appointment Token",
      },
      tab2: {
        name: "Queue Display",
        title: "Live Token Display: Token #18 Inside",
        subtitle: "Next in Queue: #19, #20 • Average consultation: 9 mins",
        tag: "Live Audio Sync",
        action: "Dispatch WhatsApp Alert",
      },
    },
  },
  {
    id: "ecommerce",
    client: "RetailBiz Group",
    location: "Shivajinagar, Pune",
    title: "High-Throughput Headless E-Commerce & Payment Engine",
    category: "Fintech & E-Commerce",
    brief:
      "Engineered an ultra-fast retail storefront with sub-second page loads, automated Razorpay UPI intent payments, Redis cart concurrency locks, and DTDC Pune automated dispatch.",
    architecture: {
      frontend: "Next.js 16 Partial Prerendering (PPR), Framer Motion",
      backend: "Node.js Edge Handlers, Redis Concurrency Locking",
      database: "PostgreSQL 18 with ACID Transaction Isolation",
      security: "PCI-DSS Compliant Handshake, AES-256 Webhook Verification",
    },
    metrics: {
      metric1: { label: "Monthly GMV", value: "₹45L+" },
      metric2: { label: "Checkout Conversion", value: "4.8%" },
      metric3: { label: "Payment Success", value: "99.4%" },
    },
    telemetry: {
      ttfb: "0.18s",
      lighthouse: 100,
      uptime: "99.98%",
      edgeRegion: "Cloudflare Edge (Pune POP)",
    },
    interactiveScreens: {
      tab1: {
        name: "Storefront",
        title: "Artisanal Apparel & Silk Collection",
        subtitle: "Handcrafted in Maharashtra • Express 24h Pune Delivery",
        tag: "In Stock (12 Units)",
        action: "Proceed to 1-Tap UPI",
      },
      tab2: {
        name: "Payment Vault",
        title: "Encrypted Razorpay UPI Gateway",
        subtitle: "Instant GooglePay / PhonePe / QR Code Verification",
        tag: "256-Bit Encrypted",
        action: "Generate Tax Invoice (GST)",
      },
    },
  },
  {
    id: "realestate",
    client: "Skyline Realty Infra",
    location: "Baner & Wakad, Pune",
    title: "MahaRERA Interactive 3D Real Estate Portal & Lead CRM",
    category: "Enterprise Web",
    brief:
      "A high-converting digital showroom featuring interactive 3D floor plan viewers, automated WhatsApp brochure delivery, MahaRERA compliance disclosures, and sub-second lead capture.",
    architecture: {
      frontend: "Next.js 16, Interactive 3D Canvas, CSS Hardware Shaders",
      backend: "Automated WhatsApp API Bridge, Multi-Tier Lead Dispatcher",
      database: "PostgreSQL 18 Audited CRM Tables",
      security: "MahaRERA P521000... Strict Verification System",
    },
    metrics: {
      metric1: { label: "Verified Buyer Leads", value: "1,400+" },
      metric2: { label: "Brochure Dispatches", value: "3,800+" },
      metric3: { label: "Site Visit Bookings", value: "280+" },
    },
    telemetry: {
      ttfb: "0.28s",
      lighthouse: 98,
      uptime: "100%",
      edgeRegion: "AWS Mumbai (ap-south-1)",
    },
    interactiveScreens: {
      tab1: {
        name: "3D Floorplan",
        title: "3BHK SkyVilla — 1,480 Sq.Ft. Carpet",
        subtitle: "East-Facing Vastu Compliant • Baner Hill Panoramic View",
        tag: "Zero Stamp Duty",
        action: "Request Floor Plan PDF",
      },
      tab2: {
        name: "VIP Site Visit",
        title: "Schedule Private Baner Tour",
        subtitle: "Dedicated Relationship Manager & Valet Parking Included",
        tag: "MahaRERA Registered",
        action: "Book Calendar Slot",
      },
    },
  },
  {
    id: "cleantech",
    client: "Swayam Urja CleanTech",
    location: "Pune & Chhatrapati Sambhajinagar",
    title: "Industrial Solar Capacity Simulator & Net-Metering Platform",
    category: "CleanTech Portal",
    brief:
      "A commercial rooftop solar engineering portal calculating kilowatt capacity, MSEDCL net-metering subsidy returns, and generating detailed 25-year financial ROI engineering proposals in real-time.",
    architecture: {
      frontend: "Next.js 16, High-Precision Financial Math Engine",
      backend: "Dynamic Server-Side PDF Proposal Generation Engine",
      database: "PostgreSQL 18 Telemetry & Inverter Performance Store",
      security: "MSEDCL Regulatory Verification, Enterprise SSL",
    },
    metrics: {
      metric1: { label: "Solar Capacity Modeled", value: "4.8 MW" },
      metric2: { label: "Client Power Savings", value: "78%" },
      metric3: { label: "Payback Period", value: "3.2 Yrs" },
    },
    telemetry: {
      ttfb: "0.22s",
      lighthouse: 100,
      uptime: "99.99%",
      edgeRegion: "Edge Network (Mumbai)",
    },
    interactiveScreens: {
      tab1: {
        name: "Solar Simulator",
        title: "100 KW Industrial Rooftop System",
        subtitle: "Annual Generation: 1,45,000 Units • 25-Year Panel Warranty",
        tag: "Govt Subsidy Approved",
        action: "Generate Bank ROI Report",
      },
      tab2: {
        name: "Grid Telemetry",
        title: "MSEDCL Net-Metering Sync",
        subtitle: "Bi-directional energy meter recording daily export units",
        tag: "Smart Grid Verified",
        action: "Download Engineering Blueprint",
      },
    },
  },
];

export default function PortfolioSection() {
  const [selectedCaseIndex, setSelectedCaseIndex] = useState(0);
  const [viewportMode, setViewportMode] = useState<"desktop" | "mobile" | "blueprint" | "exploded">("desktop");
  const [activeScreenTab, setActiveScreenTab] = useState<"tab1" | "tab2">("tab1");
  const [isRotating, setIsRotating] = useState(false);

  // Smooth Inertia Drag Rotation
  const [rotation, setRotation] = useState({ x: 8, y: -12 });
  const isDraggingRef = useRef(false);
  const pointerStartRef = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const activeStudy = CASE_STUDIES[selectedCaseIndex];
  const screenContent = activeStudy.interactiveScreens[activeScreenTab];

  // Subtle ambient breathing motion when not interacting
  useEffect(() => {
    if (viewportMode === "exploded") return;
    const interval = setInterval(() => {
      if (!isDraggingRef.current) {
        setRotation((prev) => ({
          x: 8 + Math.sin(Date.now() / 2400) * 2.5,
          y: prev.y + 0.12,
        }));
      }
    }, 40);
    return () => clearInterval(interval);
  }, [viewportMode]);

  // Pointer drag handling with physical damping
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    pointerStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - pointerStartRef.current.x;
    const deltaY = e.clientY - pointerStartRef.current.y;
    pointerStartRef.current = { x: e.clientX, y: e.clientY };

    setRotation((prev) => ({
      x: Math.max(-20, Math.min(30, prev.x - deltaY * 0.3)),
      y: prev.y + deltaX * 0.35,
    }));
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <section
      id="portfolio"
      className="py-28 bg-[#030712] text-slate-100 relative overflow-hidden border-t border-slate-900"
    >
      {/* Background Architectural Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#475569 1px, transparent 1px), linear-gradient(90deg, #475569 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Atmospheric Soft Light Cones (Precision Obsidian & Sapphire) */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-blue-900/20 via-blue-950/10 to-transparent blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-mono tracking-wider uppercase bg-slate-900/90 text-blue-400 border border-slate-800 shadow-sm mb-4">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <span>Engineering Showcase • Built in Pune</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15]">
            Engineered for Scale.{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-sky-300 to-slate-200">
              Validated in Production.
            </span>
          </h2>

          <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl">
            Explore live production systems deployed for high-growth enterprises across Maharashtra.
            Rotate the 3D specimen stage, toggle responsive viewports, inspect the underlying microservices architecture, and review real telemetry.
          </p>
        </div>

        {/* Enterprise Selector Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {CASE_STUDIES.map((study, idx) => (
            <button
              key={study.id}
              onClick={() => {
                setSelectedCaseIndex(idx);
                setActiveScreenTab("tab1");
              }}
              className={`p-4 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden ${
                selectedCaseIndex === idx
                  ? "bg-slate-900/90 border-blue-500/60 shadow-[0_0_30px_rgba(37,99,235,0.15)] ring-1 ring-blue-500/40"
                  : "bg-slate-950/70 border-slate-800/80 hover:border-slate-700 text-slate-400 hover:text-white"
              }`}
            >
              {selectedCaseIndex === idx && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-sky-400" />
              )}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                  {study.location}
                </span>
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    selectedCaseIndex === idx ? "bg-blue-400" : "bg-slate-600"
                  }`}
                />
              </div>
              <h3 className="text-sm font-bold text-white mt-1.5 truncate">
                {study.client}
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5 truncate">
                {study.category}
              </p>
            </button>
          ))}
        </div>

        {/* MAIN 3D HARDWARE SPECIMEN & ARCHITECTURE STAGE */}
        <div className="bg-slate-950/90 border border-slate-800/90 rounded-3xl p-5 sm:p-8 shadow-2xl relative overflow-hidden backdrop-blur-xl">
          {/* Top Control Bar: Viewport Switcher & Status */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
            {/* View Modes */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-900 rounded-xl border border-slate-800 text-xs font-medium">
              <button
                onClick={() => setViewportMode("desktop")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  viewportMode === "desktop"
                    ? "bg-blue-600 text-white font-bold shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Monitor size={14} />
                <span>Workstation 3D</span>
              </button>

              <button
                onClick={() => setViewportMode("mobile")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  viewportMode === "mobile"
                    ? "bg-blue-600 text-white font-bold shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Smartphone size={14} />
                <span>Mobile Twin</span>
              </button>

              <button
                onClick={() => setViewportMode("blueprint")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  viewportMode === "blueprint"
                    ? "bg-blue-600 text-white font-bold shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Box size={14} />
                <span>CAD Blueprint</span>
              </button>

              <button
                onClick={() => setViewportMode("exploded")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  viewportMode === "exploded"
                    ? "bg-blue-600 text-white font-bold shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Layers size={14} />
                <span>3-Tier Architecture</span>
              </button>
            </div>

            {/* Live Telemetry Chips */}
            <div className="hidden sm:flex items-center gap-3 text-xs font-mono">
              <div className="flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
                <Activity size={12} className="text-emerald-400" />
                <span className="text-slate-400">TTFB:</span>
                <span className="text-emerald-400 font-bold">{activeStudy.telemetry.ttfb}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
                <ShieldCheck size={12} className="text-blue-400" />
                <span className="text-slate-400">Security:</span>
                <span className="text-white font-bold">TLS 1.3 / AES-256</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
                <Server size={12} className="text-sky-400" />
                <span className="text-slate-400">Edge:</span>
                <span className="text-sky-300 font-bold">{activeStudy.telemetry.edgeRegion}</span>
              </div>
            </div>
          </div>

          {/* THE 3D ROTATION CANVAS STAGE */}
          <div
            ref={containerRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            className="relative w-full h-[480px] sm:h-[540px] flex items-center justify-center my-4 overflow-hidden select-none cursor-grab active:cursor-grabbing"
            style={{ perspective: "1600px" }}
          >
            {/* Ambient Rotational Guide Indicator */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-slate-900/80 border border-slate-800 px-3 py-1.5 rounded-full text-[11px] font-mono text-slate-400 backdrop-blur-md">
              <Compass size={13} className="text-blue-400" />
              <span>Interactive 3D Stage • Drag to Orbit</span>
            </div>

            {/* Subtle Floor Shadow */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[480px] h-[40px] bg-black/80 rounded-full blur-xl pointer-events-none" />

            {/* 3D ROTATABLE OBJECT RIG */}
            <div
              className="w-full h-full flex items-center justify-center transition-transform duration-75 ease-out"
              style={{
                transformStyle: "preserve-3d",
                transform:
                  viewportMode === "exploded"
                    ? "rotateX(20deg) rotateY(-25deg)"
                    : `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
              }}
            >
              {/* ---------------------------------------------------- */}
              {/* MODE A: 3D WORKSTATION (MacBook Pro Hardware Specimen) */}
              {/* ---------------------------------------------------- */}
              {(viewportMode === "desktop" || viewportMode === "blueprint") && (
                <div
                  className="relative transition-all duration-300"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Laptop Display (Lid) */}
                  <div
                    className={`w-[320px] sm:w-[480px] md:w-[580px] h-[220px] sm:h-[320px] md:h-[360px] rounded-2xl p-2.5 shadow-[0_25px_60px_rgba(0,0,0,0.9)] relative overflow-hidden transition-colors duration-300 ${
                      viewportMode === "blueprint"
                        ? "bg-slate-950 border-2 border-dashed border-sky-400/80"
                        : "bg-[#0F172A] border-2 border-slate-700/80"
                    }`}
                    style={{
                      transform: "translateZ(15px)",
                      boxShadow:
                        viewportMode === "blueprint"
                          ? "0 0 40px rgba(56,189,248,0.2)"
                          : "0 0 50px rgba(37,99,235,0.18)",
                    }}
                  >
                    {/* Camera Notch */}
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-4 h-3.5 rounded-full bg-black border border-slate-800 flex items-center justify-center z-30">
                      <div className="w-1 h-1 rounded-full bg-emerald-400" />
                    </div>

                    {/* High-Resolution Screen Inside */}
                    <div
                      className={`w-full h-full rounded-xl overflow-hidden flex flex-col text-left transition-colors duration-300 ${
                        viewportMode === "blueprint"
                          ? "bg-slate-950 border border-sky-500/40"
                          : "bg-[#090E1A] border border-slate-800"
                      }`}
                    >
                      {/* Browser Chrome Header */}
                      <div className="h-7 bg-slate-900/90 border-b border-slate-800 px-3 flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                          <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                        </div>

                        <div className="bg-slate-950 px-3.5 py-0.5 rounded text-[10px] font-mono text-slate-300 border border-slate-800 flex items-center gap-1.5">
                          <Lock size={10} className="text-emerald-400" />
                          <span className="text-slate-400">https://</span>
                          <span className="text-white font-semibold">{activeStudy.id}.sksoftech.in</span>
                        </div>

                        <span className="text-[10px] font-mono text-emerald-400 font-bold">
                          {activeStudy.telemetry.lighthouse}/100 Perf
                        </span>
                      </div>

                      {/* Screen Content Body */}
                      <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between relative overflow-hidden bg-gradient-to-br from-slate-900/80 via-[#0B1222] to-slate-950">
                        {/* Blueprint CAD Dimension Lines Overlay */}
                        {viewportMode === "blueprint" && (
                          <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-between p-3 font-mono text-[9px] text-sky-400/80">
                            <div className="flex justify-between border-b border-sky-500/30 pb-1">
                              <span>VIEWPORT: 1920 × 1080 (DCI-P3 99%)</span>
                              <span>PPR: TRUE (Next.js 16)</span>
                            </div>
                            <div className="flex justify-between border-t border-sky-500/30 pt-1">
                              <span>FRAMEWORK: App Router (React 19)</span>
                              <span>CACHE: Edge ISR (60s)</span>
                            </div>
                          </div>
                        )}

                        {/* Interactive In-Screen Navigation Tabs */}
                        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-black tracking-tight text-white">
                              {activeStudy.client}
                            </span>
                            <span className="text-[9px] px-2 py-0.5 rounded font-mono uppercase bg-blue-950 text-blue-300 border border-blue-800/60 font-bold">
                              {screenContent.tag}
                            </span>
                          </div>

                          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveScreenTab("tab1");
                              }}
                              className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold transition-all cursor-pointer ${
                                activeScreenTab === "tab1"
                                  ? "bg-blue-600 text-white"
                                  : "text-slate-400 hover:text-white"
                              }`}
                            >
                              {activeStudy.interactiveScreens.tab1.name}
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveScreenTab("tab2");
                              }}
                              className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold transition-all cursor-pointer ${
                                activeScreenTab === "tab2"
                                  ? "bg-blue-600 text-white"
                                  : "text-slate-400 hover:text-white"
                              }`}
                            >
                              {activeStudy.interactiveScreens.tab2.name}
                            </button>
                          </div>
                        </div>

                        {/* Interactive Screen Dynamic Body */}
                        <div className="my-auto py-2 space-y-2">
                          <h3 className="text-sm sm:text-lg md:text-xl font-black text-white tracking-tight leading-snug">
                            {screenContent.title}
                          </h3>
                          <p className="text-[11px] sm:text-xs text-slate-300 line-clamp-2">
                            {screenContent.subtitle}
                          </p>

                          <div className="pt-2 flex items-center gap-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                alert(`Executing live action: "${screenContent.action}" on production testbed.`);
                              }}
                              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                            >
                              <span>{screenContent.action}</span>
                              <ArrowRight size={12} />
                            </button>
                            <span className="text-[10px] font-mono text-emerald-400 bg-slate-900 border border-slate-800 px-2 py-1 rounded">
                              ✓ Verified 200 OK
                            </span>
                          </div>
                        </div>

                        {/* 3 Real-World Metrics Inside Screen */}
                        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800/80">
                          {Object.values(activeStudy.metrics).map((m, i) => (
                            <div key={i} className="bg-slate-950/70 p-2 rounded-lg border border-slate-800/60">
                              <span className="text-[8px] uppercase tracking-wider text-slate-400 block font-mono">
                                {m.label}
                              </span>
                              <span className="text-xs sm:text-sm font-black font-mono text-white">
                                {m.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Laptop Aluminum Keyboard Deck (3D Depth) */}
                  <div
                    className={`w-[360px] sm:w-[540px] md:w-[640px] h-[18px] rounded-b-2xl mx-auto border-t-2 shadow-2xl relative transition-colors duration-300 ${
                      viewportMode === "blueprint"
                        ? "bg-slate-950 border-sky-400/60"
                        : "bg-gradient-to-b from-slate-700 to-slate-900 border-slate-600"
                    }`}
                    style={{
                      transform: "rotateX(75deg) translateZ(-40px) translateY(12px)",
                    }}
                  >
                    <div className="w-16 h-2 bg-slate-950 rounded-b-md mx-auto" />
                  </div>
                </div>
              )}

              {/* ---------------------------------------------------- */}
              {/* MODE B: 3D MOBILE TWIN (iPhone 16 Pro Hardware Specimen) */}
              {/* ---------------------------------------------------- */}
              {viewportMode === "mobile" && (
                <div
                  className="relative transition-all duration-300"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div
                    className="w-[240px] sm:w-[270px] h-[480px] sm:h-[510px] bg-[#0A0E1A] rounded-[44px] p-3 shadow-[0_30px_70px_rgba(0,0,0,0.95)] border-[5px] border-slate-700 relative overflow-hidden"
                    style={{
                      transform: "translateZ(30px)",
                      boxShadow: "0 0 50px rgba(37,99,235,0.2)",
                    }}
                  >
                    {/* Dynamic Island */}
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-6 rounded-full bg-black border border-slate-800 flex items-center justify-between px-3 z-30">
                      <div className="w-2 h-2 rounded-full bg-slate-900" />
                      <div className="w-2 h-2 rounded-full bg-emerald-400" />
                    </div>

                    {/* Mobile Screen Display */}
                    <div className="w-full h-full bg-slate-950 rounded-[34px] p-4 flex flex-col justify-between text-left relative overflow-hidden pt-12 border border-slate-800">
                      {/* Status Header */}
                      <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pb-2 border-b border-slate-900">
                        <span>9:41 AM • Pune</span>
                        <span className="text-emerald-400">5G ● 100%</span>
                      </div>

                      {/* Client Header */}
                      <div>
                        <span className="text-[10px] font-mono uppercase text-blue-400 font-bold block">
                          {activeStudy.location}
                        </span>
                        <h4 className="text-sm font-black text-white mt-0.5">
                          {activeStudy.client}
                        </h4>
                      </div>

                      {/* Feature Card Preview */}
                      <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5 my-auto">
                        <span className="text-[9px] font-mono uppercase text-emerald-400 font-bold">
                          Active Endpoint
                        </span>
                        <div className="text-xs font-bold text-white">
                          {screenContent.title}
                        </div>
                        <p className="text-[10px] text-slate-400 leading-snug">
                          {screenContent.subtitle}
                        </p>
                      </div>

                      {/* Mobile CTA */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          alert(`Triggered: ${screenContent.action}`);
                        }}
                        className="w-full py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg cursor-pointer transition-colors"
                      >
                        {screenContent.action}
                      </button>

                      {/* Home Indicator */}
                      <div className="w-24 h-1 bg-slate-600 rounded-full mx-auto mt-2" />
                    </div>
                  </div>
                </div>
              )}

              {/* ---------------------------------------------------- */}
              {/* MODE C: 3-TIER EXPLODED ARCHITECTURE STACK */}
              {/* ---------------------------------------------------- */}
              {viewportMode === "exploded" && (
                <div
                  className="relative w-[340px] sm:w-[540px] flex flex-col items-center justify-center gap-7 transition-all duration-300"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Layer 1: Client Experience Layer */}
                  <div
                    className="w-full bg-slate-900/90 border border-sky-400/80 p-4 sm:p-5 rounded-2xl shadow-[0_15px_35px_rgba(56,189,248,0.2)] backdrop-blur-xl relative"
                    style={{ transform: "translateZ(80px)" }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-sky-950 border border-sky-500/50 flex items-center justify-center text-sky-400">
                          <Monitor size={15} />
                        </div>
                        <div>
                          <span className="text-[10px] font-mono uppercase text-sky-400 font-bold block">
                            Tier 01 • Presentation Layer
                          </span>
                          <h4 className="text-xs sm:text-sm font-black text-white">
                            {activeStudy.architecture.frontend}
                          </h4>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-emerald-400 font-bold">
                        {activeStudy.telemetry.ttfb} TTFB
                      </span>
                    </div>
                  </div>

                  {/* Connecting Architectural Bus */}
                  <div className="w-0.5 h-6 bg-gradient-to-b from-sky-400 to-blue-500 shadow-[0_0_8px_#38BDF8]" />

                  {/* Layer 2: Business Logic & Microservices */}
                  <div
                    className="w-full bg-slate-900/90 border border-blue-500/80 p-4 sm:p-5 rounded-2xl shadow-[0_15px_35px_rgba(59,130,246,0.2)] backdrop-blur-xl relative"
                    style={{ transform: "translateZ(25px)" }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-blue-950 border border-blue-500/50 flex items-center justify-center text-blue-400">
                          <Cpu size={15} />
                        </div>
                        <div>
                          <span className="text-[10px] font-mono uppercase text-blue-400 font-bold block">
                            Tier 02 • Application Engine
                          </span>
                          <h4 className="text-xs sm:text-sm font-black text-white">
                            {activeStudy.architecture.backend}
                          </h4>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-blue-400 font-bold">
                        {activeStudy.telemetry.edgeRegion}
                      </span>
                    </div>
                  </div>

                  {/* Connecting Architectural Bus */}
                  <div className="w-0.5 h-6 bg-gradient-to-b from-blue-500 to-emerald-500 shadow-[0_0_8px_#10B981]" />

                  {/* Layer 3: Persistence & Security Bedrock */}
                  <div
                    className="w-full bg-slate-900/90 border border-emerald-500/80 p-4 sm:p-5 rounded-2xl shadow-[0_15px_35px_rgba(16,185,129,0.2)] backdrop-blur-xl relative"
                    style={{ transform: "translateZ(-30px)" }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-emerald-950 border border-emerald-500/50 flex items-center justify-center text-emerald-400">
                          <Database size={15} />
                        </div>
                        <div>
                          <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold block">
                            Tier 03 • Persistence & Compliance
                          </span>
                          <h4 className="text-xs sm:text-sm font-black text-white">
                            {activeStudy.architecture.database}
                          </h4>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-emerald-400 font-bold">
                        ACID Compliant
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Telemetry & Case Study Specifications Drawer */}
          <div className="pt-6 border-t border-slate-800/80 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-1.5 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono uppercase text-blue-400 font-bold">
                  Architecture Overview • {activeStudy.category}
                </span>
              </div>
              <h3 className="text-lg font-black text-white">
                {activeStudy.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {activeStudy.brief}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#contact"
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-blue-600/30 flex items-center gap-2 transition-all hover:scale-105 cursor-pointer whitespace-nowrap"
              >
                <span>Request Enterprise Proposal</span>
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
