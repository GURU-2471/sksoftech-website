"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Zap,
  Coffee,
  Code2,
  Globe2,
  CheckCircle2,
  Cpu,
  Laptop,
  Flame,
  Volume2,
  VolumeX,
  ShieldCheck,
  Activity,
  Terminal,
  Layers,
  ExternalLink,
  Moon,
  Sun,
  Eye,
} from "lucide-react";

export default function DeveloperCartoon3D() {
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [coffeeBoost, setCoffeeBoost] = useState(false);
  const [activeProject, setActiveProject] = useState<"ecommerce" | "medical" | "realestate">("ecommerce");
  const [typedChars, setTypedChars] = useState(14820);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [activeTab, setActiveTab] = useState<"code" | "schema" | "env">("code");
  const [ambientTheme, setAmbientTheme] = useState<"cyber" | "studio">("cyber");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Audio Context for synthetic mechanical keyboard clicks
  const audioCtxRef = useRef<AudioContext | null>(null);

  const playKeySound = () => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") ctx.resume();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(600 + Math.random() * 400, ctx.currentTime);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {
      // Audio not supported or blocked by browser policy
    }
  };

  // Mouse tilt parallax handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  // Simulated live typing counter & sound trigger
  useEffect(() => {
    const interval = setInterval(() => {
      setTypedChars((prev) => prev + (coffeeBoost ? 12 : 4) * speedMultiplier);
      if (soundEnabled && Math.random() > 0.4) {
        playKeySound();
      }
    }, 120);
    return () => clearInterval(interval);
  }, [coffeeBoost, speedMultiplier, soundEnabled]);

  const projects = {
    ecommerce: {
      name: "Luxury E-Commerce & Razorpay",
      tag: "Next.js 16 + PostgreSQL + Stripe/UPI",
      client: "Pune Fashion Co.",
      metrics: {
        speed: "0.38s Load",
        uptime: "99.98%",
        leads: "₹4.8L+ GMV",
      },
      badgeColor: "#3B82F6",
      codeSnippet: [
        "// High-Concurrency Checkout Engine",
        "export async function processOrder(cart: Cart) {",
        "  const lock = await redis.acquireLock(`cart:${cart.id}`);",
        "  const order = await prisma.order.create({",
        "    data: { amount: cart.total, status: 'PAID' },",
        "  });",
        "  await razorpay.capturePayment(order.id);",
        "  return { success: true, tracking: 'DTDC-PUNE' };",
        "}",
      ],
      terminalLog: "✓ Compiled /api/checkout in 24ms (Turbopack) | PostgreSQL 18: 0.9ms query",
      previewHeadline: "Elite Streetwear Pune",
      previewItems: ["Silk Bomber Jacket", "Obsidian Hoodie", "Minimalist Sneaker"],
    },
    medical: {
      name: "Super-Specialty Hospital OPD",
      tag: "Doctor Rosters + Tele-OPD + WhatsApp",
      client: "Apex Multispecialty Hospital, Pune",
      metrics: {
        speed: "0.29s Load",
        uptime: "100%",
        leads: "420+ Appts/Day",
      },
      badgeColor: "#06B6D4",
      codeSnippet: [
        "// Real-Time Doctor Slot Allocator",
        "export async function bookAppointment(slot: Slot) {",
        "  const doctor = await db.doctor.findUnique({ id: slot.drId });",
        "  const booking = await db.opdQueue.push({",
        "    patient: slot.patientId, time: '10:30 AM',",
        "  });",
        "  await whatsapp.sendConfirmation('+91 93076..');",
        "  return { token: booking.opdToken, status: 'CONFIRMED' };",
        "}",
      ],
      terminalLog: "✓ WhatsApp Webhook 200 OK | OPD Queue synchronized with PostgreSQL 18",
      previewHeadline: "Apex Healthcare Pune",
      previewItems: ["Cardiology OPD", "Neurology Dept", "Express Lab Tests"],
    },
    realestate: {
      name: "MahaRERA Luxury Housing Portal",
      tag: "3D Floorplans + PDF Brochure + CRM",
      client: "Skyline Realty, Baner & Wakad",
      metrics: {
        speed: "0.42s Load",
        uptime: "99.95%",
        leads: "140+ RERA Inquiries",
      },
      badgeColor: "#F59E0B",
      codeSnippet: [
        "// RERA Compliant Lead Pipeline",
        "export async function captureLead(buyer: Buyer) {",
        "  const lead = await prisma.leads.create({",
        "    data: { budget: '2BHK-Baner', phone: buyer.phone },",
        "  });",
        "  await mailer.sendBrochurePDF(buyer.email);",
        "  await salesCRM.assignAgent('Senior Advisor Pune');",
        "  return { leadId: lead.id, status: 'ASSIGNED' };",
        "}",
      ],
      terminalLog: "✓ 3D Virtual Tour assets cached via CDN | MahaRERA P521000... verified",
      previewHeadline: "Skyline SkyVillas Baner",
      previewItems: ["2 & 3 BHK Duplex", "Rooftop Infinity Pool", "Smart Home Automation"],
    },
  };

  const cur = projects[activeProject];

  return (
    <section className="py-24 bg-gradient-to-b from-slate-950 via-[#070D1E] to-slate-950 text-white relative overflow-hidden border-t border-slate-800/80">
      {/* Dynamic Cyber / Studio Ambient Mesh Lighting */}
      <div
        className={`absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] blur-[150px] rounded-full pointer-events-none transition-all duration-700 ${
          ambientTheme === "cyber"
            ? "bg-gradient-to-r from-blue-600/20 via-cyan-500/20 to-purple-600/20"
            : "bg-gradient-to-r from-amber-500/15 via-orange-500/15 to-blue-500/15"
        }`}
      />

      {/* Cyber Grid Lines Texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#38BDF8 1px, transparent 1px), linear-gradient(90deg, #38BDF8 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-950/80 text-blue-400 border border-blue-500/30 backdrop-blur-md shadow-[0_0_20px_rgba(59,130,246,0.3)] mb-4">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <Sparkles size={14} className="text-[#FFC21A]" />
            Live 3D Developer Studio • Pune HQ
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            Crafting Precision Code &{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-300 to-[#FFC21A]">
              Next-Gen Architecture
            </span>
          </h2>

          <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
            Take an interactive seat beside our lead engineer. Every software solution, high-converting website,
            and custom portal is engineered from scratch in Pune with modern Next.js 16, enterprise PostgreSQL, and micro-second performance.
          </p>

          {/* Interactive Studio Command Deck */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            {/* Coffee Boost */}
            <button
              onClick={() => setCoffeeBoost(!coffeeBoost)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-lg backdrop-blur-md ${
                coffeeBoost
                  ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-amber-500/30 ring-2 ring-amber-300 scale-105"
                  : "bg-slate-900/90 text-slate-300 hover:text-white border border-slate-700/80 hover:border-amber-400/50"
              }`}
            >
              <Coffee size={14} className={coffeeBoost ? "animate-bounce text-amber-100" : "text-amber-400"} />
              {coffeeBoost ? "⚡ Caffeine Rush Active (+300% Speed)" : "Give Coffee ☕"}
            </button>

            {/* Speed Multiplier */}
            <button
              onClick={() => setSpeedMultiplier((prev) => (prev === 1 ? 2 : prev === 2 ? 3 : 1))}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-slate-900/90 text-slate-300 hover:text-white border border-slate-700/80 hover:border-blue-400/50 transition-all cursor-pointer shadow-md backdrop-blur-md"
            >
              <Zap size={14} className="text-[#FFC21A]" />
              Speed: <span className="text-cyan-400 font-mono font-black">{speedMultiplier}x Turbo</span>
            </button>

            {/* Keyboard Mechanical Click ASMR Toggle */}
            <button
              onClick={() => {
                setSoundEnabled(!soundEnabled);
                if (!soundEnabled) playKeySound();
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-md backdrop-blur-md ${
                soundEnabled
                  ? "bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 shadow-emerald-500/20"
                  : "bg-slate-900/90 text-slate-400 hover:text-slate-200 border border-slate-700/80"
              }`}
            >
              {soundEnabled ? (
                <>
                  <Volume2 size={14} className="text-emerald-400 animate-pulse" />
                  <span>Audio ASMR: On</span>
                </>
              ) : (
                <>
                  <VolumeX size={14} className="text-slate-500" />
                  <span>Click Sound: Off</span>
                </>
              )}
            </button>

            {/* Lighting Studio / Cyber Toggle */}
            <button
              onClick={() => setAmbientTheme(ambientTheme === "cyber" ? "studio" : "cyber")}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-900/90 text-slate-300 hover:text-white border border-slate-700/80 hover:border-cyan-400/50 transition-all cursor-pointer shadow-md backdrop-blur-md"
            >
              {ambientTheme === "cyber" ? (
                <>
                  <Moon size={14} className="text-cyan-400" />
                  <span>Theme: Cyberpunk</span>
                </>
              ) : (
                <>
                  <Sun size={14} className="text-amber-400" />
                  <span>Theme: Warm Studio</span>
                </>
              )}
            </button>

            {/* Project Picker Segmented Control */}
            <div className="flex items-center gap-1 bg-slate-900/95 p-1 rounded-xl border border-slate-700/90 shadow-inner">
              {(["ecommerce", "medical", "realestate"] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setActiveProject(p)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold capitalize transition-all cursor-pointer ${
                    activeProject === p
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-600/30"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {p === "realestate" ? "Real Estate" : p === "ecommerce" ? "E-Commerce" : "Medical OPD"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 3D INTERACTIVE TILT STAGE CONTAINER */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ perspective: "1400px" }}
          className="relative mx-auto max-w-6xl transition-transform duration-300 ease-out"
        >
          {/* Main 3D Card Shell */}
          <div
            style={{
              transform: `rotateX(${-mousePos.y * 4}deg) rotateY(${mousePos.x * 5}deg)`,
              transformStyle: "preserve-3d",
            }}
            className="relative bg-gradient-to-b from-slate-900/95 via-[#0A1128]/95 to-slate-950/95 rounded-3xl p-6 sm:p-10 shadow-[0_25px_80px_-15px_rgba(0,0,0,0.9),0_0_50px_rgba(30,111,255,0.15)] border border-slate-700/70 text-white overflow-hidden transition-all duration-200"
          >
            {/* Top Glossy Bezel Glow */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-[#FFC21A] shadow-[0_0_15px_rgba(56,189,248,0.7)]" />

            {/* Top HUD Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800/80 relative z-20">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80 shadow-[0_0_8px_rgba(244,63,94,0.6)]" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80 shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                </div>
                <div className="h-4 w-[1px] bg-slate-800" />
                <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                  <Terminal size={14} className="text-cyan-400" />
                  <span className="text-slate-400">workspace:</span>
                  <span className="text-white font-bold">sksoftech-core-v2.6</span>
                  <span className="text-emerald-400 bg-emerald-950/60 border border-emerald-500/40 text-[10px] px-2 py-0.5 rounded font-sans font-bold">
                    ● Git HEAD: main
                  </span>
                </div>
              </div>

              {/* Real-time Status Badges */}
              <div className="flex items-center gap-2 sm:gap-4 text-xs font-mono">
                <div className="flex items-center gap-1.5 bg-slate-950/80 border border-slate-800 px-3 py-1.5 rounded-xl">
                  <Activity size={13} className="text-emerald-400 animate-pulse" />
                  <span className="text-slate-400">PostgreSQL:</span>
                  <span className="text-emerald-400 font-bold">0.8ms</span>
                </div>
                <div className="flex items-center gap-1.5 bg-slate-950/80 border border-slate-800 px-3 py-1.5 rounded-xl">
                  <Cpu size={13} className="text-cyan-400" />
                  <span className="text-slate-400">Engine:</span>
                  <span className="text-cyan-300 font-bold">Next.js 16</span>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 bg-slate-950/80 border border-slate-800 px-3 py-1.5 rounded-xl">
                  <ShieldCheck size={13} className="text-[#FFC21A]" />
                  <span className="text-slate-400">Security:</span>
                  <span className="text-[#FFC21A] font-bold">Zero-Trust</span>
                </div>
              </div>
            </div>

            {/* 3D SCENE MAIN WORKSTATION WITH DUAL MONITORS & 3D DEVELOPER */}
            <div className="relative pt-6 pb-4">
              {/* Floating Holographic Speech Bubble */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-8 left-4 sm:left-10 z-30 bg-slate-900/95 backdrop-blur-xl text-white px-4 py-2.5 rounded-2xl rounded-bl-none shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-cyan-500/40 flex items-center gap-3"
              >
                <div className="relative flex items-center justify-center">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping absolute" />
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 relative" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-bold">
                    {coffeeBoost ? "🔥 OVERDRIVE MODE" : "DEVELOPER COGNITION"}
                  </div>
                  <div className="text-xs font-bold text-slate-100 font-sans">
                    {coffeeBoost
                      ? "Pushing zero-latency edge deployment to Mumbai AWS!"
                      : `Writing ${cur.name} for ${cur.client}...`}
                  </div>
                </div>
              </motion.div>

              {/* Floating Right Metric: Lines of Code Written */}
              <div className="absolute top-8 right-4 sm:right-10 z-30 bg-slate-900/95 backdrop-blur-xl border border-emerald-500/40 px-4 py-2.5 rounded-2xl flex items-center gap-3 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                <div className="w-8 h-8 rounded-xl bg-emerald-950 flex items-center justify-center text-emerald-400 border border-emerald-500/30">
                  <Code2 size={16} />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono text-slate-400 block tracking-wider">
                    Lines Crafted:
                  </span>
                  <span className="text-sm font-black font-mono text-emerald-400">
                    {typedChars.toLocaleString()} LOC
                  </span>
                </div>
              </div>

              {/* 3D VECTOR & ISOMETRIC SVG ILLUSTRATION OF WORKSTATION */}
              <div className="w-full max-w-[820px] mx-auto h-[380px] sm:h-[450px] relative flex items-center justify-center my-2">
                <svg
                  viewBox="0 0 860 480"
                  className="w-full h-full select-none"
                  style={{ overflow: "visible" }}
                >
                  <defs>
                    {/* Monitor 1 Gradient */}
                    <linearGradient id="monScreen1" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#0B132B" />
                      <stop offset="50%" stopColor="#0F1B3E" />
                      <stop offset="100%" stopColor="#070C1D" />
                    </linearGradient>

                    {/* Monitor 2 Gradient */}
                    <linearGradient id="monScreen2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0D1934" />
                      <stop offset="100%" stopColor="#080E21" />
                    </linearGradient>

                    {/* Desk Gradient */}
                    <linearGradient id="deskTopGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#1E293B" />
                      <stop offset="60%" stopColor="#0F172A" />
                      <stop offset="100%" stopColor="#020617" />
                    </linearGradient>

                    {/* Character Skin Gradient */}
                    <radialGradient id="skinShade" cx="40%" cy="35%" r="65%">
                      <stop offset="0%" stopColor="#FED7AA" />
                      <stop offset="70%" stopColor="#FB923C" />
                      <stop offset="100%" stopColor="#EA580C" />
                    </radialGradient>

                    {/* Hoodie 3D Gradient */}
                    <linearGradient id="hoodie3D" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#3B82F6" />
                      <stop offset="50%" stopColor="#1D4ED8" />
                      <stop offset="100%" stopColor="#1E3A8A" />
                    </linearGradient>

                    {/* Headphone Red Chrome */}
                    <linearGradient id="headphoneGlow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#EF4444" />
                      <stop offset="100%" stopColor="#991B1B" />
                    </linearGradient>

                    {/* Neon Glow Filter */}
                    <filter id="ultraGlow" x="-30%" y="-30%" width="160%" height="160%">
                      <feGaussianBlur stdDeviation="8" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>

                    {/* Soft Drop Shadow for Desk & Character */}
                    <filter id="ambientShadow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="16" />
                    </filter>
                  </defs>

                  {/* 1. ROOM DEPTH & SHADOWS UNDER THE DESK */}
                  <ellipse cx="430" cy="430" rx="360" ry="40" fill="#000000" opacity="0.7" filter="url(#ambientShadow)" />

                  {/* 2. PREMIUM ISOMETRIC BEVELED WORKSTATION DESK */}
                  {/* Desk Surface (Curved Ergonomic Edge) */}
                  <path
                    d="M 120 340 L 740 340 L 780 405 L 80 405 Z"
                    fill="url(#deskTopGrad)"
                    stroke="#334155"
                    strokeWidth="2.5"
                  />
                  {/* Desk Front Chamfer / Lip */}
                  <path
                    d="M 80 405 L 780 405 L 780 422 L 80 422 Z"
                    fill="#0B1325"
                    stroke="#1E293B"
                    strokeWidth="1.5"
                  />
                  {/* Heavy Anodized Aluminum Desk Legs */}
                  <rect x="130" y="422" width="22" height="48" rx="4" fill="#0F172A" stroke="#1E293B" />
                  <rect x="710" y="422" width="22" height="48" rx="4" fill="#0F172A" stroke="#1E293B" />

                  {/* Desk Edge RGB Ambient Underglow Neon Tube */}
                  <path
                    d="M 85 418 L 775 418"
                    stroke={ambientTheme === "cyber" ? "#38BDF8" : "#F59E0B"}
                    strokeWidth="4"
                    filter="url(#ultraGlow)"
                    opacity="0.9"
                  />

                  {/* 3. MONITOR 1 (LEFT): CURVED ULTRAWIDE CODE IDE */}
                  <g transform="translate(130, 130) rotate(-6, 130, 90)">
                    {/* Metal Monitor Stand */}
                    <rect x="120" y="170" width="20" height="45" rx="3" fill="#1E293B" stroke="#334155" />
                    <ellipse cx="130" cy="214" rx="45" ry="10" fill="#0F172A" stroke="#334155" />

                    {/* Monitor Chasis */}
                    <rect
                      x="0"
                      y="0"
                      width="260"
                      height="175"
                      rx="14"
                      fill="#0F172A"
                      stroke="#475569"
                      strokeWidth="2.5"
                    />
                    {/* Curved Screen Glass */}
                    <rect x="8" y="8" width="244" height="159" rx="10" fill="url(#monScreen1)" />

                    {/* Screen Header Bar */}
                    <rect x="8" y="8" width="244" height="24" rx="8" fill="#080E1E" />
                    <circle cx="22" cy="20" r="3.5" fill="#EF4444" />
                    <circle cx="33" cy="20" r="3.5" fill="#F59E0B" />
                    <circle cx="44" cy="20" r="3.5" fill="#10B981" />
                    <text x="56" y="24" fill="#94A3B8" fontSize="10" fontFamily="monospace" fontWeight="bold">
                      ⚡ App.tsx — Next.js 16 Edge
                    </text>

                    {/* Syntax Highlighted Code Lines inside Screen 1 */}
                    <g transform="translate(18, 42)">
                      {/* Line 1 */}
                      <text x="0" y="10" fill="#EC4899" fontSize="9" fontFamily="monospace" fontWeight="bold">
                        const
                      </text>
                      <text x="35" y="10" fill="#67E8F9" fontSize="9" fontFamily="monospace">
                        portal
                      </text>
                      <text x="75" y="10" fill="#E2E8F0" fontSize="9" fontFamily="monospace">
                        = new
                      </text>
                      <text x="110" y="10" fill="#FDE047" fontSize="9" fontFamily="monospace">
                        SK_CoreEngine();
                      </text>

                      {/* Line 2 */}
                      <text x="0" y="24" fill="#A855F7" fontSize="9" fontFamily="monospace" fontWeight="bold">
                        await
                      </text>
                      <text x="35" y="24" fill="#38BDF8" fontSize="9" fontFamily="monospace">
                        database.connect(
                      </text>
                      <text x="135" y="24" fill="#34D399" fontSize="9" fontFamily="monospace">
                        &quot;postgres://pune&quot;
                      </text>
                      <text x="210" y="24" fill="#E2E8F0" fontSize="9" fontFamily="monospace">
                        );
                      </text>

                      {/* Line 3 */}
                      <text x="0" y="38" fill="#EC4899" fontSize="9" fontFamily="monospace" fontWeight="bold">
                        export
                      </text>
                      <text x="40" y="38" fill="#67E8F9" fontSize="9" fontFamily="monospace">
                        const
                      </text>
                      <text x="75" y="38" fill="#FBBF24" fontSize="9" fontFamily="monospace">
                        api
                      </text>
                      <text x="96" y="38" fill="#E2E8F0" fontSize="9" fontFamily="monospace">
                        = EdgeRoute(&apos;200ms&apos;);
                      </text>

                      {/* Line 4 */}
                      <text x="0" y="52" fill="#38BDF8" fontSize="9" fontFamily="monospace">
                        redis.cache(&quot;fast-leads&quot;, true);
                      </text>

                      {/* Line 5 */}
                      <text x="0" y="66" fill="#34D399" fontSize="9" fontFamily="monospace">
                        verifySSL(&quot;256-bit-aes&quot;);
                      </text>

                      {/* Line 6 */}
                      <text x="0" y="80" fill="#E2E8F0" fontSize="9" fontFamily="monospace">
                        render(
                      </text>
                      <text x="45" y="80" fill="#F472B6" fontSize="9" fontFamily="monospace">
                        &lt;PremiumWebsite /&gt;
                      </text>
                      <text x="170" y="80" fill="#E2E8F0" fontSize="9" fontFamily="monospace">
                        );
                      </text>

                      {/* Blinking IDE Cursor */}
                      <rect x="0" y="92" width="7" height="12" fill="#38BDF8">
                        <animate
                          attributeName="opacity"
                          values="1;0;1"
                          dur="0.75s"
                          repeatCount="indefinite"
                        />
                      </rect>
                    </g>
                  </g>

                  {/* 4. MONITOR 2 (RIGHT): CURVED LIVE CLIENT WEBSITE PREVIEW */}
                  <g transform="translate(470, 130) rotate(6, 130, 90)">
                    {/* Metal Monitor Stand */}
                    <rect x="120" y="170" width="20" height="45" rx="3" fill="#1E293B" stroke="#334155" />
                    <ellipse cx="130" cy="214" rx="45" ry="10" fill="#0F172A" stroke="#334155" />

                    {/* Monitor Chasis */}
                    <rect
                      x="0"
                      y="0"
                      width="260"
                      height="175"
                      rx="14"
                      fill="#0F172A"
                      stroke="#475569"
                      strokeWidth="2.5"
                    />
                    {/* Screen Glass */}
                    <rect x="8" y="8" width="244" height="159" rx="10" fill="url(#monScreen2)" />

                    {/* Browser Address Bar Chrome */}
                    <rect x="8" y="8" width="244" height="22" rx="8" fill="#0B1325" />
                    <circle cx="20" cy="19" r="3" fill="#38BDF8" />
                    <rect x="30" y="14" width="130" height="10" rx="4" fill="#1E293B" />
                    <text x="36" y="22" fill="#38BDF8" fontSize="7" fontFamily="monospace">
                      https://preview.sksoftech.in
                    </text>
                    <rect x="200" y="13" width="44" height="11" rx="3" fill="#10B981" />
                    <text x="204" y="21" fill="#FFFFFF" fontSize="7" fontWeight="bold" fontFamily="sans-serif">
                      ● LIVE 99%
                    </text>

                    {/* Mini Website Preview Mockup Inside Monitor 2 */}
                    <g transform="translate(16, 36)">
                      {/* Mini Navbar */}
                      <rect x="0" y="0" width="228" height="14" rx="3" fill="#0A1128" />
                      <circle cx="8" cy="7" r="3" fill={cur.badgeColor} />
                      <rect x="16" y="5" width="40" height="4" rx="2" fill="#E2E8F0" />
                      <rect x="180" y="3" width="40" height="8" rx="2" fill={cur.badgeColor} />

                      {/* Hero Section Banner */}
                      <rect x="0" y="18" width="228" height="52" rx="5" fill="#152140" stroke="#1E293B" />
                      <rect x="10" y="26" width="120" height="8" rx="4" fill="#FFFFFF" />
                      <rect x="10" y="38" width="95" height="5" rx="2" fill="#94A3B8" />
                      <rect x="10" y="48" width="45" height="12" rx="4" fill="#FFC21A" />
                      <text x="14" y="56" fill="#000" fontSize="7" fontWeight="black" fontFamily="sans-serif">
                        BOOK NOW
                      </text>
                      {/* Mini Hero 3D Card Thumbnail */}
                      <rect x="155" y="24" width="62" height="40" rx="4" fill="#1E293B" stroke={cur.badgeColor} />
                      <circle cx="186" cy="44" r="10" fill={cur.badgeColor} opacity="0.6" />

                      {/* 3 Showcase Feature Cards */}
                      <rect x="0" y="76" width="70" height="44" rx="4" fill="#0E1933" stroke="#1E293B" />
                      <rect x="79" y="76" width="70" height="44" rx="4" fill="#0E1933" stroke="#1E293B" />
                      <rect x="158" y="76" width="70" height="44" rx="4" fill="#0E1933" stroke="#1E293B" />
                    </g>
                  </g>

                  {/* 5. MECHANICAL KEYBOARD & RGB LIGHTS */}
                  <g transform="translate(365, 345)">
                    {/* Keyboard Base */}
                    <rect x="0" y="0" width="130" height="40" rx="6" fill="#0B1325" stroke="#38BDF8" strokeWidth="1.5" />
                    {/* Key Grid Texture */}
                    <rect x="5" y="5" width="120" height="30" rx="3" fill="#151F35" />
                    {/* Mechanical Keycaps */}
                    <g fill="#1E293B">
                      <rect x="8" y="8" width="14" height="6" rx="1.5" />
                      <rect x="25" y="8" width="14" height="6" rx="1.5" />
                      <rect x="42" y="8" width="14" height="6" rx="1.5" />
                      <rect x="59" y="8" width="14" height="6" rx="1.5" />
                      <rect x="76" y="8" width="14" height="6" rx="1.5" />
                      <rect x="93" y="8" width="14" height="6" rx="1.5" />
                      <rect x="110" y="8" width="12" height="6" rx="1.5" />

                      {/* Row 2 */}
                      <rect x="8" y="16" width="16" height="6" rx="1.5" fill="#2563EB" />
                      <rect x="27" y="16" width="14" height="6" rx="1.5" />
                      <rect x="44" y="16" width="14" height="6" rx="1.5" />
                      <rect x="61" y="16" width="14" height="6" rx="1.5" />
                      <rect x="78" y="16" width="14" height="6" rx="1.5" />
                      <rect x="95" y="16" width="27" height="6" rx="1.5" fill="#10B981" />

                      {/* Row 3 Spacebar Glowing RGB */}
                      <rect x="35" y="24" width="60" height="8" rx="2" fill="#00F0FF" filter="url(#ultraGlow)" opacity="0.85" />
                    </g>
                  </g>

                  {/* 6. HOT STEAMING ESPRESSO COFFEE MUG */}
                  <g transform="translate(170, 325)">
                    {/* Ceramic Shadow */}
                    <ellipse cx="16" cy="38" rx="18" ry="5" fill="#000000" opacity="0.4" />
                    {/* Cup Body */}
                    <rect x="2" y="8" width="28" height="30" rx="5" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />
                    {/* Handle */}
                    <path d="M 30 14 Q 40 22 30 30" fill="none" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" />
                    {/* Coffee Surface */}
                    <ellipse cx="16" cy="10" rx="12" ry="4" fill="#78350F" />
                    {/* Gold SK Logo on Mug */}
                    <text x="9" y="26" fill="#F59E0B" fontSize="9" fontWeight="black" fontFamily="sans-serif">
                      SK
                    </text>

                    {/* Rising Steam Wafts */}
                    <path d="M 12 5 Q 8 -3 14 -12" fill="none" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" opacity="0.7">
                      <animate attributeName="d" values="M 12 5 Q 8 -3 14 -12; M 12 5 Q 16 -3 10 -15; M 12 5 Q 8 -3 14 -12" dur="2.2s" repeatCount="indefinite" />
                    </path>
                    <path d="M 20 5 Q 24 -3 18 -12" fill="none" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" opacity="0.7">
                      <animate attributeName="d" values="M 20 5 Q 24 -3 18 -12; M 20 5 Q 16 -3 22 -15; M 20 5 Q 24 -3 18 -12" dur="1.8s" repeatCount="indefinite" />
                    </path>
                  </g>

                  {/* 7. THE 3D CARTOON DEVELOPER CHARACTER */}
                  <g transform="translate(430, 240)">
                    {/* Body / Blue Hoodie with Volumetric Depth */}
                    <path
                      d="M -55 100 C -55 45, -38 28, 0 28 C 38 28, 55 45, 55 100 Z"
                      fill="url(#hoodie3D)"
                      stroke="#1E40AF"
                      strokeWidth="2.5"
                    />
                    {/* Hoodie Zipper & Strings */}
                    <line x1="0" y1="36" x2="0" y2="100" stroke="#1E3A8A" strokeWidth="3" />
                    <line x1="-9" y1="40" x2="-9" y2="65" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
                    <line x1="9" y1="40" x2="9" y2="65" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />

                    {/* Head & Neck (With Rhythmic Bobbing & Focus) */}
                    <g>
                      <animateTransform
                        attributeName="transform"
                        type="translate"
                        values="0 0; 0 -5; 0 0"
                        dur={coffeeBoost ? "0.32s" : "0.7s"}
                        repeatCount="indefinite"
                      />

                      {/* Neck */}
                      <rect x="-11" y="16" width="22" height="18" fill="url(#skinShade)" rx="4" />

                      {/* Head 3D Sphere */}
                      <circle cx="0" cy="0" r="35" fill="url(#skinShade)" stroke="#C2410C" strokeWidth="1.5" />

                      {/* Stylish 3D Hair */}
                      <path
                        d="M -35 -6 C -34 -38, 18 -42, 35 -10 C 27 -26, -16 -32, -26 -16 Z"
                        fill="#0F172A"
                      />
                      {/* Hair Highlights */}
                      <path
                        d="M -22 -24 C -8 -32, 10 -30, 24 -15"
                        fill="none"
                        stroke="#334155"
                        strokeWidth="3"
                        strokeLinecap="round"
                      />

                      {/* Over-Ear Gaming / Developer Headphones */}
                      <path
                        d="M -34 -10 C -34 -45, 34 -45, 34 -10"
                        fill="none"
                        stroke="#0F172A"
                        strokeWidth="8"
                        strokeLinecap="round"
                      />
                      {/* Left Cup with Glowing Ring */}
                      <rect x="-42" y="-14" width="14" height="28" rx="7" fill="url(#headphoneGlow)" stroke="#7F1D1D" strokeWidth="2" />
                      <circle cx="-35" cy="0" r="4" fill="#38BDF8" opacity="0.8" />

                      {/* Right Cup with Glowing Ring */}
                      <rect x="28" y="-14" width="14" height="28" rx="7" fill="url(#headphoneGlow)" stroke="#7F1D1D" strokeWidth="2" />
                      <circle cx="35" cy="0" r="4" fill="#38BDF8" opacity="0.8" />

                      {/* Modern Smart Glasses with Blue Light Screen Reflection */}
                      <rect x="-26" y="-6" width="20" height="14" rx="4" fill="#38BDF8" opacity="0.35" stroke="#0F172A" strokeWidth="2.5" />
                      <rect x="6" y="-6" width="20" height="14" rx="4" fill="#38BDF8" opacity="0.35" stroke="#0F172A" strokeWidth="2.5" />
                      <line x1="-6" y1="0" x2="6" y2="0" stroke="#0F172A" strokeWidth="2.5" />

                      {/* Expressive Focus Eyes */}
                      <circle cx="-16" cy="0" r="3.5" fill="#0F172A" />
                      <circle cx="16" cy="0" r="3.5" fill="#0F172A" />
                      {/* Specular White Catchlight */}
                      <circle cx="-17" cy="-1.5" r="1.2" fill="#FFFFFF" />
                      <circle cx="15" cy="-1.5" r="1.2" fill="#FFFFFF" />

                      {/* Confident Smile */}
                      <path d="M -8 15 Q 0 22 8 15" fill="none" stroke="#7C2D12" strokeWidth="2.5" strokeLinecap="round" />
                    </g>

                    {/* Left Arm & Hand (Animated Mechanical Typing Stroke) */}
                    <g>
                      <path
                        d="M -44 55 Q -32 105 -12 105"
                        fill="none"
                        stroke="#1D4ED8"
                        strokeWidth="18"
                        strokeLinecap="round"
                      />
                      <circle cx="-12" cy="105" r="9" fill="url(#skinShade)">
                        <animate
                          attributeName="cy"
                          values="103;108;103"
                          dur={coffeeBoost ? "0.08s" : "0.16s"}
                          repeatCount="indefinite"
                        />
                      </circle>
                    </g>

                    {/* Right Arm & Hand (Alternating Mechanical Typing Stroke) */}
                    <g>
                      <path
                        d="M 44 55 Q 32 105 12 105"
                        fill="none"
                        stroke="#1D4ED8"
                        strokeWidth="18"
                        strokeLinecap="round"
                      />
                      <circle cx="12" cy="105" r="9" fill="url(#skinShade)">
                        <animate
                          attributeName="cy"
                          values="108;103;108"
                          dur={coffeeBoost ? "0.08s" : "0.16s"}
                          repeatCount="indefinite"
                        />
                      </circle>
                    </g>
                  </g>

                  {/* 8. FLOATING 3D TECH PARTICLES IN ORBIT */}
                  {/* Floating Badge 1: Next.js 16 */}
                  <g transform="translate(90, 85)">
                    <animateTransform attributeName="transform" type="translate" values="90 85; 90 75; 90 85" dur="3.2s" repeatCount="indefinite" />
                    <rect x="0" y="0" width="105" height="28" rx="14" fill="#0B1325" stroke="#38BDF8" strokeWidth="1.5" />
                    <circle cx="16" cy="14" r="5" fill="#38BDF8" />
                    <text x="28" y="18" fill="#F8FAFC" fontSize="10" fontWeight="bold" fontFamily="sans-serif">
                      Next.js 16 SSR
                    </text>
                  </g>

                  {/* Floating Badge 2: PostgreSQL 18 */}
                  <g transform="translate(660, 85)">
                    <animateTransform attributeName="transform" type="translate" values="660 85; 660 95; 660 85" dur="3.8s" repeatCount="indefinite" />
                    <rect x="0" y="0" width="115" height="28" rx="14" fill="#0B1325" stroke="#10B981" strokeWidth="1.5" />
                    <circle cx="16" cy="14" r="5" fill="#10B981" />
                    <text x="28" y="18" fill="#F8FAFC" fontSize="10" fontWeight="bold" fontFamily="sans-serif">
                      Postgres 18 DB
                    </text>
                  </g>

                  {/* Floating Badge 3: 0.38s Micro-Latency */}
                  <g transform="translate(680, 360)">
                    <animateTransform attributeName="transform" type="translate" values="680 360; 680 350; 680 360" dur="2.7s" repeatCount="indefinite" />
                    <rect x="0" y="0" width="110" height="28" rx="14" fill="#0B1325" stroke="#F59E0B" strokeWidth="1.5" />
                    <circle cx="16" cy="14" r="5" fill="#F59E0B" />
                    <text x="28" y="18" fill="#F8FAFC" fontSize="10" fontWeight="bold" fontFamily="sans-serif">
                      ⚡ 0.38s UltraFast
                    </text>
                  </g>
                </svg>
              </div>

              {/* LIVE TERMINAL & BUILD OUTPUT DRAWER */}
              <div className="mt-4 bg-slate-950/90 border border-slate-800 rounded-2xl p-4 sm:p-5 backdrop-blur-md">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  {/* Left Info: Active Project Being Developed */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cur.badgeColor }} />
                      <span className="text-[11px] font-mono text-cyan-400 font-bold uppercase tracking-wider">
                        Production Pipeline: {cur.client}
                      </span>
                    </div>
                    <h3 className="text-lg font-black text-white flex items-center gap-2">
                      {cur.name}
                    </h3>
                    <p className="text-xs text-slate-400 font-mono flex items-center gap-2">
                      <span className="text-emerald-400 font-bold">&gt;&gt;</span>
                      {cur.terminalLog}
                    </p>
                  </div>

                  {/* Right Metrics Grid & CTA */}
                  <div className="flex items-center gap-3">
                    <div className="grid grid-cols-2 gap-2 text-right">
                      <div className="bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl">
                        <span className="text-[9px] uppercase font-mono text-slate-500 block">Performance</span>
                        <span className="text-xs font-black text-emerald-400 font-mono">{cur.metrics.speed}</span>
                      </div>
                      <div className="bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl">
                        <span className="text-[9px] uppercase font-mono text-slate-500 block">Impact</span>
                        <span className="text-xs font-black text-[#FFC21A] font-mono">{cur.metrics.leads}</span>
                      </div>
                    </div>

                    <a
                      href="#contact"
                      className="px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 via-[#1E6FFF] to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_0_25px_rgba(30,111,255,0.4)] transition-all hover:scale-105 cursor-pointer whitespace-nowrap"
                    >
                      <Zap size={14} className="text-[#FFC21A]" />
                      Launch My Project
                    </a>
                  </div>
                </div>

                {/* Live Code Preview Ticker Accordion */}
                <div className="mt-4 pt-3 border-t border-slate-900 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500 font-sans">Tech Stack:</span>
                    <span className="text-slate-300 font-medium">{cur.tag}</span>
                  </div>
                  <div className="flex items-center gap-4 text-slate-400">
                    <span className="flex items-center gap-1 text-emerald-400">
                      <CheckCircle2 size={12} /> Turbopack SSR Active
                    </span>
                    <span className="flex items-center gap-1 text-cyan-400">
                      <Globe2 size={12} /> AWS Mumbai (ap-south-1)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
