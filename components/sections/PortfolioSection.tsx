"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Layers,
  Monitor,
  Smartphone,
  Rotate3d,
  Sparkles,
  Zap,
  ShieldCheck,
  Database,
  ArrowRight,
  Eye,
  Sliders,
  Maximize2,
} from "lucide-react";
import { ProjectItem } from "@/lib/siteContentStore";

const categories = ["All", "Web", "Mobile", "Enterprise", "AI & Cloud"];

interface ProjectShowcase {
  id: string;
  title: string;
  category: string;
  client: string;
  tagline: string;
  color: string;
  accentGlow: string;
  stats: { label: string; val: string }[];
  tags: string[];
  desktopPreview: {
    heroTitle: string;
    subTitle: string;
    badge: string;
    stat1: string;
    stat2: string;
    actionText: string;
  };
  mobilePreview: {
    header: string;
    card1: string;
    card2: string;
  };
  explodedStack: {
    layer1: { title: string; desc: string; icon: string };
    layer2: { title: string; desc: string; icon: string };
    layer3: { title: string; desc: string; icon: string };
  };
}

const showcaseProjects: ProjectShowcase[] = [
  {
    id: "ecommerce",
    title: "LuxeMart E-Commerce Platform",
    category: "Web",
    client: "RetailBiz Group (Pune)",
    tagline: "Ultra-fast headless commerce with Razorpay, instant UPI checkout, and live inventory sync.",
    color: "#1E6FFF",
    accentGlow: "rgba(30,111,255,0.4)",
    stats: [
      { label: "Load Time", val: "0.34s" },
      { label: "Monthly GMV", val: "₹45L+" },
      { label: "Conversion", val: "4.8%" },
    ],
    tags: ["Next.js 16", "PostgreSQL", "TailwindCSS", "Razorpay"],
    desktopPreview: {
      heroTitle: "Premium Lifestyle & Fashion",
      subTitle: "Discover handcrafted fashion shipped from Pune across India",
      badge: "Summer 2026 Collection",
      stat1: "₹2,499 Flat Sale",
      stat2: "4.9 ★ (1,820 Reviews)",
      actionText: "Shop Collection →",
    },
    mobilePreview: {
      header: "LuxeMart Mobile",
      card1: "1-Tap UPI Checkout",
      card2: "Live Order Tracking (Pune)",
    },
    explodedStack: {
      layer1: { title: "Frontend Glass UI", desc: "Next.js 16 Server Components & Framer Motion", icon: "desktop" },
      layer2: { title: "API Gateway & Edge Cache", desc: "Node.js Microservices, Redis Cache, AWS Mumbai", icon: "cpu" },
      layer3: { title: "Enterprise Database Bedrock", desc: "PostgreSQL 18 ACID Database & Audit Logs", icon: "database" },
    },
  },
  {
    id: "healthcare",
    title: "Apex Multi-Specialty Hospital OPD",
    category: "Enterprise",
    client: "Apex Healthcare (Pune)",
    tagline: "Real-time doctor scheduling, queue token displays, tele-consultation, and WhatsApp alerts.",
    color: "#06B6D4",
    accentGlow: "rgba(6,182,212,0.4)",
    stats: [
      { label: "OPD Bookings", val: "850+/Day" },
      { label: "Queue Wait", val: "-45%" },
      { label: "HIPAA Compliant", val: "100%" },
    ],
    tags: ["Next.js", "WebRTC", "PostgreSQL", "WhatsApp API"],
    desktopPreview: {
      heroTitle: "Next-Gen Healthcare Management",
      subTitle: "Consult Pune's Top Specialists in OPD or Online within 15 Minutes",
      badge: "NABH Accredited Hospital",
      stat1: "42 Specialist Doctors",
      stat2: "24x7 Emergency Ready",
      actionText: "Book Doctor Slot →",
    },
    mobilePreview: {
      header: "Apex Patient App",
      card1: "Live Token #18 (OPD-2)",
      card2: "Prescription PDF Vault",
    },
    explodedStack: {
      layer1: { title: "Patient & Doctor Portal", desc: "HIPAA-secure web application with dark/light mode", icon: "desktop" },
      layer2: { title: "Tele-Consult WebRTC Engine", desc: "Low-latency video consultation & WhatsApp webhooks", icon: "cpu" },
      layer3: { title: "Electronic Health Records (EHR)", desc: "Encrypted PostgreSQL 18 with role-based clinical access", icon: "database" },
    },
  },
  {
    id: "realestate",
    title: "Skyline MahaRERA Luxury Homes",
    category: "Web",
    client: "Skyline Realty (Baner & Wakad)",
    tagline: "Interactive 3D isometric floorplans, automated WhatsApp brochure dispatch, and lead CRM.",
    color: "#F59E0B",
    accentGlow: "rgba(245,158,11,0.4)",
    stats: [
      { label: "Leads Captured", val: "1,200+" },
      { label: "Brochure Downloads", val: "3,400+" },
      { label: "RERA Verified", val: "P521000..." },
    ],
    tags: ["3D Floorplans", "Prisma", "PostgreSQL", "Lead CRM"],
    desktopPreview: {
      heroTitle: "Skyline SkyVillas Baner",
      subTitle: "2, 3 & 4 BHK Luxury Residences overlooking Pune's IT Corridor",
      badge: "Pre-Launch Offer (Zero Stamp Duty)",
      stat1: "Starting ₹85 Lakhs*",
      stat2: "Possession Dec 2026",
      actionText: "Download Brochure →",
    },
    mobilePreview: {
      header: "Skyline 3D Viewer",
      card1: "360° Living Room Tour",
      card2: "Instant WhatsApp Callback",
    },
    explodedStack: {
      layer1: { title: "Interactive 3D Experience", desc: "WebGL interactive floor plan viewer with 360 tour", icon: "desktop" },
      layer2: { title: "Intelligent Lead Dispatcher", desc: "Instant CRM assignment & automated WhatsApp PDF dispatch", icon: "cpu" },
      layer3: { title: "Audited MahaRERA Vault", desc: "PostgreSQL transactional data store with lead verification", icon: "database" },
    },
  },
  {
    id: "solar",
    title: "Swayam Urja CleanTech Platform",
    category: "AI & Cloud",
    client: "Swayam Urja (Maharashtra)",
    tagline: "Industrial solar ROI calculator, rooftop capacity estimator, and live government subsidy portal.",
    color: "#10B981",
    accentGlow: "rgba(16,185,129,0.4)",
    stats: [
      { label: "Solar KW Designed", val: "4.2 MW" },
      { label: "CO2 Saved", val: "3,800 Tons" },
      { label: "Client ROI", val: "3.2 Years" },
    ],
    tags: ["Next.js 16", "GIS Solar API", "PostgreSQL", "PDF Engine"],
    desktopPreview: {
      heroTitle: "Powering Maharashtra with Clean Solar",
      subTitle: "Calculate your factory rooftop solar capacity and instant subsidy savings",
      badge: "MNRE Govt Approved Vendor",
      stat1: "Save up to 80% Electricity",
      stat2: "25-Year Panel Warranty",
      actionText: "Calculate Solar ROI →",
    },
    mobilePreview: {
      header: "Swayam Solar App",
      card1: "Live Solar Generation (KW)",
      card2: "Net-Metering Dashboard",
    },
    explodedStack: {
      layer1: { title: "Smart Solar Estimator UI", desc: "Interactive rooftop area calculator & bill simulator", icon: "desktop" },
      layer2: { title: "GIS & Subsidy Calculation Engine", desc: "Real-time tariff engine and automated proposal generator", icon: "cpu" },
      layer3: { title: "Enterprise Solar Telemetry DB", desc: "Time-series data for daily inverter power output tracking", icon: "database" },
    },
  },
];

export default function PortfolioSection() {
  const [viewMode, setViewMode] = useState<"3d" | "grid">("3d");
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [deviceType, setDeviceType] = useState<"desktop" | "mobile" | "exploded">("desktop");
  const [lightingTheme, setLightingTheme] = useState<"cyber" | "studio" | "gold">("cyber");
  const [isRotating, setIsRotating] = useState(false);

  // 3D Rotation State (Drag-to-rotate)
  const [rotation, setRotation] = useState({ x: 10, y: -15 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const curProject = showcaseProjects[activeProjectIndex];

  // Auto slow rotation when idle (unless dragging or on mobile view)
  useEffect(() => {
    if (isDragging || deviceType === "exploded") return;
    const interval = setInterval(() => {
      setRotation((prev) => ({
        x: 10 + Math.sin(Date.now() / 1500) * 4,
        y: prev.y + 0.25,
      }));
    }, 30);
    return () => clearInterval(interval);
  }, [isDragging, deviceType]);

  // Mouse / Touch drag to rotate handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartRef.current.x;
    const deltaY = e.clientY - dragStartRef.current.y;
    dragStartRef.current = { x: e.clientX, y: e.clientY };

    setRotation((prev) => ({
      x: Math.max(-25, Math.min(35, prev.x - deltaY * 0.4)),
      y: prev.y + deltaX * 0.4,
    }));
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  return (
    <section id="portfolio" className="py-24 bg-gradient-to-b from-slate-950 via-[#070D1E] to-slate-950 text-white relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full blur-[140px] pointer-events-none transition-all duration-700 opacity-60"
        style={{
          background:
            lightingTheme === "cyber"
              ? `radial-gradient(circle, ${curProject.color}40 0%, #06B6D420 50%, transparent 80%)`
              : lightingTheme === "gold"
              ? "radial-gradient(circle, #F59E0B40 0%, #D9770620 50%, transparent 80%)"
              : "radial-gradient(circle, #3B82F630 0%, #6366F120 50%, transparent 80%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header & Mode Switcher */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-950/80 text-blue-400 border border-blue-500/30 backdrop-blur-md shadow-[0_0_20px_rgba(59,130,246,0.25)] mb-4">
            <Sparkles size={14} className="text-[#FFC21A]" />
            3D Product & Engineering Showcase
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            Our Work in{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-300 to-[#FFC21A]">
              Interactive 3D Visuals
            </span>
          </h2>
          <p className="mt-3.5 text-slate-300 text-sm sm:text-base leading-relaxed">
            Drag to rotate devices 360°, inspect live responsiveness, and explode into the underlying 3D architectural stack.
          </p>

          {/* View Mode Toggle: 3D Interactive Showroom vs Classic Grid */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <div className="inline-flex p-1 rounded-2xl bg-slate-900 border border-slate-700 shadow-xl">
              <button
                onClick={() => setViewMode("3d")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  viewMode === "3d"
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/30"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Rotate3d size={15} />
                3D Interactive Showroom (New)
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  viewMode === "grid"
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/30"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Layers size={15} />
                Classic Grid View
              </button>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* VIEW 1: INTERACTIVE 3D PRODUCT VISUALIZER DEMO */}
        {/* ======================================================== */}
        {viewMode === "3d" && (
          <div className="space-y-8">
            {/* Control Deck: Project Selector + Device Switcher + Lighting */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900/90 border border-slate-800 p-4 rounded-2xl backdrop-blur-xl">
              {/* Project Buttons */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono text-slate-400 mr-1 hidden sm:inline">Project:</span>
                {showcaseProjects.map((p, idx) => (
                  <button
                    key={p.id}
                    onClick={() => setActiveProjectIndex(idx)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      activeProjectIndex === idx
                        ? "bg-white text-slate-950 shadow-md font-black"
                        : "bg-slate-950 text-slate-300 hover:text-white border border-slate-800"
                    }`}
                  >
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: p.color }}
                    />
                    {p.title.split(" ")[0]}
                  </button>
                ))}
              </div>

              {/* View Angle / Device Switcher */}
              <div className="flex items-center gap-2">
                <div className="flex items-center p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs font-bold">
                  <button
                    onClick={() => {
                      setDeviceType("desktop");
                      setRotation({ x: 10, y: -15 });
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                      deviceType === "desktop"
                        ? "bg-[#1E6FFF] text-white shadow-sm"
                        : "text-slate-400 hover:text-white"
                    }`}
                    title="Desktop 3D View"
                  >
                    <Monitor size={13} />
                    <span className="hidden md:inline">MacBook Pro</span>
                  </button>

                  <button
                    onClick={() => {
                      setDeviceType("mobile");
                      setRotation({ x: 8, y: 15 });
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                      deviceType === "mobile"
                        ? "bg-[#1E6FFF] text-white shadow-sm"
                        : "text-slate-400 hover:text-white"
                    }`}
                    title="Mobile 3D View"
                  >
                    <Smartphone size={13} />
                    <span className="hidden md:inline">iPhone 16</span>
                  </button>

                  <button
                    onClick={() => {
                      setDeviceType("exploded");
                      setRotation({ x: 22, y: -30 });
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                      deviceType === "exploded"
                        ? "bg-[#1E6FFF] text-white shadow-sm"
                        : "text-slate-400 hover:text-white"
                    }`}
                    title="3D Exploded Layer Stack"
                  >
                    <Layers size={13} />
                    <span>3D Exploded Stack</span>
                  </button>
                </div>

                {/* Lighting Palette */}
                <div className="hidden lg:flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
                  {(["cyber", "studio", "gold"] as const).map((theme) => (
                    <button
                      key={theme}
                      onClick={() => setLightingTheme(theme)}
                      className={`w-6 h-6 rounded-lg text-[10px] font-bold capitalize transition-all cursor-pointer flex items-center justify-center ${
                        lightingTheme === theme
                          ? "ring-2 ring-white scale-110 shadow-md"
                          : "opacity-60 hover:opacity-100"
                      }`}
                      style={{
                        backgroundColor:
                          theme === "cyber" ? "#06B6D4" : theme === "studio" ? "#3B82F6" : "#F59E0B",
                      }}
                      title={`${theme} studio lighting`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* 3D INTERACTIVE STAGE */}
            <div
              ref={containerRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
              className="relative w-full h-[540px] sm:h-[600px] bg-gradient-to-b from-[#0A1226] via-[#060B18] to-slate-950 rounded-3xl border border-slate-800 overflow-hidden cursor-grab active:cursor-grabbing select-none shadow-[0_30px_100px_rgba(0,0,0,0.8)]"
              style={{ perspective: "1500px" }}
            >
              {/* Top Hint Bar */}
              <div className="absolute top-5 left-5 z-20 flex items-center gap-2 bg-slate-900/90 border border-slate-700/80 px-3.5 py-1.5 rounded-full text-xs font-mono text-slate-300 backdrop-blur-md">
                <Rotate3d size={14} className="text-cyan-400 animate-spin" style={{ animationDuration: "6s" }} />
                <span>Drag to Rotate 360° • Click parts to inspect</span>
              </div>

              {/* Top Right Project Quick Specs */}
              <div className="absolute top-5 right-5 z-20 hidden sm:flex items-center gap-3">
                <div className="bg-slate-900/90 border border-slate-700/80 px-4 py-1.5 rounded-full text-xs font-mono text-emerald-400 backdrop-blur-md flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Performance: {curProject.stats[0].val}</span>
                </div>
              </div>

              {/* 3D Floor Lighting Grid */}
              <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(circle at 50% 70%, ${curProject.color} 0%, transparent 65%)`,
                }}
              />

              {/* Radial Pedestal Shadow */}
              <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-[550px] h-[70px] bg-black/80 rounded-full blur-2xl pointer-events-none" />

              {/* THE 3D ROTATABLE CONTAINER */}
              <div
                className="w-full h-full flex items-center justify-center transition-transform duration-75 ease-out"
                style={{
                  transformStyle: "preserve-3d",
                  transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                }}
              >
                {/* ---------------------------------------------------- */}
                {/* SUB-VIEW A: 3D MACBOOK PRO LAPTOP STAGE */}
                {/* ---------------------------------------------------- */}
                {deviceType === "desktop" && (
                  <div
                    className="relative transition-all duration-300"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* LAPTOP SCREEN (LID) */}
                    <div
                      className="w-[340px] sm:w-[480px] md:w-[560px] h-[220px] sm:h-[310px] md:h-[350px] bg-[#0F172A] rounded-2xl p-2.5 shadow-[0_20px_50px_rgba(0,0,0,0.9)] border-2 border-slate-700 relative overflow-hidden"
                      style={{
                        transform: "translateZ(10px)",
                        boxShadow: `0 0 60px ${curProject.accentGlow}`,
                      }}
                    >
                      {/* Web Camera Notch */}
                      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-black border border-slate-700 flex items-center justify-center z-30">
                        <div className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse" />
                      </div>

                      {/* Screen Content: High-Resolution Browser View */}
                      <div className="w-full h-full bg-[#080E1E] rounded-xl overflow-hidden flex flex-col border border-slate-800 text-left">
                        {/* Browser Chrome Header */}
                        <div className="h-7 bg-slate-900/95 border-b border-slate-800 px-3 flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                          </div>

                          <div className="bg-slate-950 px-4 py-0.5 rounded-md text-[10px] font-mono text-slate-300 border border-slate-800 flex items-center gap-2">
                            <span className="text-emerald-400">🔒 https://</span>
                            <span className="text-white font-bold">{curProject.id}.sksoftech.in</span>
                          </div>

                          <div className="text-[10px] font-mono text-cyan-400">99.8% Uptime</div>
                        </div>

                        {/* Interactive Project Website Content Preview */}
                        <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between relative overflow-hidden bg-gradient-to-br from-slate-900 via-[#0B1528] to-slate-950">
                          {/* Ambient glow in screen */}
                          <div
                            className="absolute -top-10 -right-10 w-44 h-44 rounded-full blur-3xl opacity-40 pointer-events-none"
                            style={{ backgroundColor: curProject.color }}
                          />

                          {/* Mini Website Navbar */}
                          <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
                            <div className="flex items-center gap-2">
                              <div
                                className="w-4 h-4 rounded-md flex items-center justify-center font-black text-[9px] text-white"
                                style={{ backgroundColor: curProject.color }}
                              >
                                SK
                              </div>
                              <span className="text-xs font-black tracking-tight text-white">
                                {curProject.title}
                              </span>
                            </div>
                            <span
                              className="text-[9px] px-2 py-0.5 rounded-full font-bold text-white shadow-sm"
                              style={{ backgroundColor: curProject.color }}
                            >
                              {curProject.desktopPreview.badge}
                            </span>
                          </div>

                          {/* Mini Hero Banner */}
                          <div className="my-auto space-y-2 py-2">
                            <h3 className="text-sm sm:text-lg md:text-xl font-black text-white tracking-tight leading-snug">
                              {curProject.desktopPreview.heroTitle}
                            </h3>
                            <p className="text-[10px] sm:text-xs text-slate-300 line-clamp-2">
                              {curProject.desktopPreview.subTitle}
                            </p>

                            <div className="pt-2 flex flex-wrap items-center gap-2">
                              <span
                                className="px-3 py-1 rounded-lg text-[10px] font-bold text-slate-950 shadow-md"
                                style={{ backgroundColor: "#FFC21A" }}
                              >
                                {curProject.desktopPreview.actionText}
                              </span>
                              <span className="text-[10px] text-emerald-400 font-mono font-bold bg-slate-900/80 border border-slate-700 px-2 py-0.5 rounded">
                                {curProject.desktopPreview.stat1}
                              </span>
                            </div>
                          </div>

                          {/* Mini 3 Cards Grid at Bottom */}
                          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800/60">
                            {curProject.stats.map((st, i) => (
                              <div key={i} className="bg-slate-900/80 p-2 rounded-lg border border-slate-800/80">
                                <span className="text-[8px] uppercase tracking-wider text-slate-400 block font-mono">
                                  {st.label}
                                </span>
                                <span className="text-xs font-black font-mono text-cyan-300">
                                  {st.val}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* LAPTOP KEYBOARD BASE */}
                    <div
                      className="w-[380px] sm:w-[540px] md:w-[620px] h-[20px] bg-gradient-to-b from-slate-700 to-slate-900 rounded-b-2xl mx-auto border-t-2 border-slate-600 shadow-2xl relative"
                      style={{
                        transform: "rotateX(75deg) translateZ(-40px) translateY(10px)",
                      }}
                    >
                      {/* Notch to open lid */}
                      <div className="w-16 h-2 bg-slate-950 rounded-b-md mx-auto" />
                    </div>
                  </div>
                )}

                {/* ---------------------------------------------------- */}
                {/* SUB-VIEW B: 3D FLOATING IPHONE 16 PRO STAGE */}
                {/* ---------------------------------------------------- */}
                {deviceType === "mobile" && (
                  <div
                    className="relative transition-all duration-300"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* iPhone Chasis */}
                    <div
                      className="w-[240px] sm:w-[280px] h-[480px] sm:h-[530px] bg-[#0A0F1D] rounded-[44px] p-3 shadow-[0_25px_70px_rgba(0,0,0,0.95)] border-[5px] border-slate-700 relative overflow-hidden"
                      style={{
                        boxShadow: `0 0 70px ${curProject.accentGlow}`,
                        transform: "translateZ(30px)",
                      }}
                    >
                      {/* Dynamic Island Pill */}
                      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-6 rounded-full bg-black border border-slate-800 flex items-center justify-between px-3 z-30">
                        <div className="w-2.5 h-2.5 rounded-full bg-slate-950 border border-slate-800" />
                        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      </div>

                      {/* Screen Glass */}
                      <div className="w-full h-full bg-gradient-to-b from-slate-900 via-[#0B1426] to-slate-950 rounded-[34px] p-4 flex flex-col justify-between text-left relative overflow-hidden pt-12">
                        {/* Status Bar */}
                        <div className="flex items-center justify-between text-[11px] font-mono text-slate-300 pb-2">
                          <span>9:41 AM</span>
                          <span className="text-emerald-400">5G ● 100%</span>
                        </div>

                        {/* App Header */}
                        <div>
                          <div className="text-[10px] uppercase font-mono text-slate-400 font-bold">
                            {curProject.client}
                          </div>
                          <h4 className="text-base font-black text-white mt-0.5">
                            {curProject.mobilePreview.header}
                          </h4>
                        </div>

                        {/* Interactive Feature Cards */}
                        <div className="space-y-2.5 my-auto">
                          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
                            <span className="text-[9px] uppercase font-mono text-cyan-400 block font-bold">
                              Feature 01
                            </span>
                            <div className="text-xs font-bold text-white mt-0.5">
                              {curProject.mobilePreview.card1}
                            </div>
                          </div>

                          <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
                            <span className="text-[9px] uppercase font-mono text-amber-400 block font-bold">
                              Feature 02
                            </span>
                            <div className="text-xs font-bold text-white mt-0.5">
                              {curProject.mobilePreview.card2}
                            </div>
                          </div>
                        </div>

                        {/* Bottom CTA Bar */}
                        <div className="pt-2">
                          <button
                            className="w-full py-2.5 rounded-xl font-bold text-xs text-slate-950 shadow-lg flex items-center justify-center gap-1.5"
                            style={{ backgroundColor: curProject.color }}
                          >
                            <span>Open Web App</span>
                            <ExternalLink size={13} />
                          </button>
                        </div>

                        {/* iPhone Home Bar */}
                        <div className="w-28 h-1 bg-white/40 rounded-full mx-auto mt-2" />
                      </div>
                    </div>
                  </div>
                )}

                {/* ---------------------------------------------------- */}
                {/* SUB-VIEW C: 3D EXPLODED ARCHITECTURE STACK */}
                {/* ---------------------------------------------------- */}
                {deviceType === "exploded" && (
                  <div
                    className="relative w-[340px] sm:w-[500px] h-[400px] flex flex-col items-center justify-center gap-8 transition-all duration-300"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* Layer 1: Frontend UI Pane (Top Floating) */}
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="w-full bg-slate-900/90 border-2 border-cyan-400/80 p-5 rounded-2xl shadow-[0_15px_40px_rgba(6,182,212,0.3)] backdrop-blur-xl relative"
                      style={{ transform: "translateZ(80px)" }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-500/50 flex items-center justify-center text-cyan-400">
                            <Monitor size={16} />
                          </div>
                          <div>
                            <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold block">
                              Layer 01 • Client Experience
                            </span>
                            <h4 className="text-sm font-black text-white">
                              {curProject.explodedStack.layer1.title}
                            </h4>
                          </div>
                        </div>
                        <span className="text-xs font-mono text-cyan-400 font-bold">0.34s TTFB</span>
                      </div>
                      <p className="text-xs text-slate-300 mt-2">
                        {curProject.explodedStack.layer1.desc}
                      </p>
                    </motion.div>

                    {/* Connecting 3D Laser Light Line */}
                    <div className="w-1 h-6 bg-gradient-to-b from-cyan-400 via-blue-500 to-indigo-500 shadow-[0_0_10px_#38BDF8]" />

                    {/* Layer 2: API & Edge Compute (Middle Pane) */}
                    <motion.div
                      animate={{ y: [0, -4, 0] }}
                      transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                      className="w-full bg-slate-900/90 border-2 border-blue-500/80 p-5 rounded-2xl shadow-[0_15px_40px_rgba(59,130,246,0.3)] backdrop-blur-xl relative"
                      style={{ transform: "translateZ(30px)" }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-blue-950 border border-blue-500/50 flex items-center justify-center text-blue-400">
                            <Zap size={16} />
                          </div>
                          <div>
                            <span className="text-[10px] font-mono uppercase text-blue-400 font-bold block">
                              Layer 02 • Business Logic
                            </span>
                            <h4 className="text-sm font-black text-white">
                              {curProject.explodedStack.layer2.title}
                            </h4>
                          </div>
                        </div>
                        <span className="text-xs font-mono text-emerald-400 font-bold">AWS Mumbai</span>
                      </div>
                      <p className="text-xs text-slate-300 mt-2">
                        {curProject.explodedStack.layer2.desc}
                      </p>
                    </motion.div>

                    {/* Connecting 3D Laser Light Line */}
                    <div className="w-1 h-6 bg-gradient-to-b from-blue-500 via-indigo-500 to-emerald-500 shadow-[0_0_10px_#10B981]" />

                    {/* Layer 3: Database & Security Bedrock (Bottom Pane) */}
                    <motion.div
                      animate={{ y: [0, -2, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                      className="w-full bg-slate-900/90 border-2 border-emerald-500/80 p-5 rounded-2xl shadow-[0_15px_40px_rgba(16,185,129,0.3)] backdrop-blur-xl relative"
                      style={{ transform: "translateZ(-20px)" }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-lg bg-emerald-950 border border-emerald-500/50 flex items-center justify-center text-emerald-400">
                            <Database size={16} />
                          </div>
                          <div>
                            <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold block">
                              Layer 03 • Persistent Data Vault
                            </span>
                            <h4 className="text-sm font-black text-white">
                              {curProject.explodedStack.layer3.title}
                            </h4>
                          </div>
                        </div>
                        <span className="text-xs font-mono text-emerald-400 font-bold">PostgreSQL 18</span>
                      </div>
                      <p className="text-xs text-slate-300 mt-2">
                        {curProject.explodedStack.layer3.desc}
                      </p>
                    </motion.div>
                  </div>
                )}
              </div>

              {/* Bottom Floating Hotspot Info Ribbon */}
              <div className="absolute bottom-5 left-5 right-5 z-20 bg-slate-900/90 border border-slate-800 p-4 rounded-2xl backdrop-blur-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] uppercase font-mono text-[#FFC21A] font-bold block">
                    Active Inspection • {curProject.client}
                  </span>
                  <h4 className="text-base font-black text-white mt-0.5">
                    {curProject.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 max-w-xl">
                    {curProject.tagline}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    href="#contact"
                    className="px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-950 flex items-center gap-2 shadow-lg transition-transform hover:scale-105 whitespace-nowrap cursor-pointer"
                    style={{ backgroundColor: "#FFC21A" }}
                  >
                    Build Something Similar <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* VIEW 2: CLASSIC EXPANDED GRID VIEW */}
        {/* ======================================================== */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mt-6">
            {showcaseProjects.map((project) => (
              <div
                key={project.id}
                className="bg-slate-900/90 border border-slate-800 rounded-3xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 shadow-xl group flex flex-col justify-between"
              >
                {/* Visual Header Mockup */}
                <div
                  className="h-56 p-6 flex flex-col justify-between relative overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${project.color}25, #0B1528 80%)`,
                  }}
                >
                  <div className="flex items-center justify-between relative z-10">
                    <span
                      className="text-xs font-bold px-3 py-1 rounded-full text-white shadow-sm"
                      style={{ backgroundColor: project.color }}
                    >
                      {project.category}
                    </span>
                    <span className="text-xs font-mono text-emerald-400 bg-slate-950/80 px-2.5 py-1 rounded-md border border-slate-800">
                      ⚡ {project.stats[0].val}
                    </span>
                  </div>

                  <div className="relative z-10">
                    <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                      {project.client}
                    </span>
                    <h3 className="text-2xl font-black text-white mt-1 group-hover:text-cyan-300 transition-colors">
                      {project.title}
                    </h3>
                  </div>

                  {/* Ambient circular glow */}
                  <div
                    className="absolute -bottom-10 -right-10 w-44 h-44 rounded-full blur-2xl opacity-40 pointer-events-none"
                    style={{ backgroundColor: project.color }}
                  />
                </div>

                {/* Content Body */}
                <div className="p-6 bg-slate-950/80 flex-1 flex flex-col justify-between space-y-4">
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {project.tagline}
                  </p>

                  <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-900">
                    {project.stats.map((st, i) => (
                      <div key={i} className="text-center">
                        <span className="text-[10px] font-mono text-slate-500 block uppercase">
                          {st.label}
                        </span>
                        <span className="text-sm font-black font-mono text-white">
                          {st.val}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-mono bg-slate-900 border border-slate-800 text-slate-300 px-2.5 py-1 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => {
                        const idx = showcaseProjects.findIndex((p) => p.id === project.id);
                        if (idx !== -1) {
                          setActiveProjectIndex(idx);
                          setViewMode("3d");
                        }
                      }}
                      className="w-full py-3 rounded-xl bg-slate-900 hover:bg-[#1E6FFF] text-white font-bold text-xs transition-all flex items-center justify-center gap-2 border border-slate-800 hover:border-transparent cursor-pointer"
                    >
                      <Rotate3d size={15} />
                      Inspect in 3D Showroom
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
