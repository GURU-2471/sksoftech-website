"use client";

import { useState, useEffect } from "react";
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
} from "lucide-react";

export default function DeveloperCartoon3D() {
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [coffeeBoost, setCoffeeBoost] = useState(false);
  const [activeProject, setActiveProject] = useState<"ecommerce" | "medical" | "realestate">("ecommerce");
  const [typedChars, setTypedChars] = useState(0);

  // Simulated code character counter
  useEffect(() => {
    const interval = setInterval(() => {
      setTypedChars((prev) => prev + (coffeeBoost ? 8 : 3) * speedMultiplier);
    }, 100);
    return () => clearInterval(interval);
  }, [coffeeBoost, speedMultiplier]);

  const projects = {
    ecommerce: {
      name: "Luxury E-Commerce Store",
      tag: "Shopping Cart & Razorpay",
      screenCode: [
        "const cart = new Cart({ currency: 'INR' });",
        "cart.applyCoupon('SK_LAUNCH_50');",
        "await paymentGateway.verifyUPI();",
        "dispatchOrder({ tracking: 'Live' });",
      ],
      previewColor: "#3B82F6",
      headline: "Fashion & Retail Hub",
      stat: "₹1,45,000 Sales",
    },
    medical: {
      name: "Super-Specialty Hospital Portal",
      tag: "Doctor OPD & Appointments",
      screenCode: [
        "const doctor = getDoctor('Dr. Kale, MBBS');",
        "await opdQueue.bookSlot('11:30 AM');",
        "smsGateway.sendPatientToken(token);",
        "ehrDatabase.syncRecords();",
      ],
      previewColor: "#06B6D4",
      headline: "Apex Clinic Pune",
      stat: "240 Patients Booked",
    },
    realestate: {
      name: "MahaRERA Real Estate Project",
      tag: "3D Floor Plans & Brochure",
      screenCode: [
        "const project = new RERABuilder('Wakad');",
        "project.load3DIsometricPlans('2BHK');",
        "leadCapture.syncToWhatsApp('+91 93076..');",
        "brochureDownloader.sendPDF();",
      ],
      previewColor: "#F59E0B",
      headline: "Pride Towers Wakad",
      stat: "48 Leads Today",
    },
  };

  const cur = projects[activeProject];

  return (
    <section className="py-24 bg-gradient-to-b from-white via-slate-50 to-slate-100 text-slate-900 relative overflow-hidden border-t border-slate-200">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-r from-blue-400/10 via-amber-300/10 to-indigo-400/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="section-tag mb-3 inline-flex items-center gap-1.5 shadow-sm bg-blue-50 text-[#1E6FFF] border border-blue-200 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Sparkles size={14} className="text-[#FFC21A]" />
            Behind The Scenes at SK Softech
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            Meet Our Developer <span className="gradient-text">Crafting Your Vision</span>
          </h2>
          <p className="mt-3.5 text-slate-600 text-sm sm:text-base leading-relaxed">
            Every line of code is handwritten with passion right here in Pune. Watch our cartoon developer
            bring real client websites to life with custom logic, fast databases, and interactive UI.
          </p>

          {/* Interactive Controls Bar */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            <button
              onClick={() => {
                setCoffeeBoost(!coffeeBoost);
              }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer shadow-sm ${
                coffeeBoost
                  ? "bg-amber-500 text-white shadow-amber-500/30 ring-2 ring-amber-400"
                  : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
              }`}
            >
              <Coffee size={14} className={coffeeBoost ? "animate-bounce" : ""} />
              {coffeeBoost ? "⚡ Coffee Boost Active (+200% Speed!)" : "Give Coffee ☕"}
            </button>

            <button
              onClick={() => setSpeedMultiplier((prev) => (prev === 1 ? 2 : prev === 2 ? 3 : 1))}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-white text-slate-700 hover:bg-slate-100 border border-slate-200 transition-all cursor-pointer shadow-sm"
            >
              <Zap size={14} className="text-[#1E6FFF]" />
              Speed: <span className="text-[#1E6FFF] font-black">{speedMultiplier}x Turbo</span>
            </button>

            {/* Project Switcher Pills */}
            <div className="flex items-center gap-1 bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
              {(["ecommerce", "medical", "realestate"] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setActiveProject(p)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold capitalize transition-all cursor-pointer ${
                    activeProject === p
                      ? "bg-[#0B1F4B] text-white shadow-sm"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {p === "realestate" ? "Real Estate" : p}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 3D CARTOON DEVELOPER SCENE CANVAS */}
        <div className="relative mx-auto max-w-5xl bg-gradient-to-b from-slate-900 via-slate-950 to-[#0B1F4B] rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-800 text-white overflow-hidden">
          {/* Subtle Room Wall Ambient Strip */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-amber-400 to-cyan-400 shadow-md" />

          {/* Floating Speech / Thought Bubble */}
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-6 left-6 sm:left-12 bg-white text-slate-900 px-4 py-2 rounded-2xl rounded-bl-none shadow-xl border border-slate-200 flex items-center gap-2.5 z-20"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-xs font-bold font-sans">
              {coffeeBoost
                ? "🔥 Supercharged! Shipping code at lightning speed!"
                : `👨‍💻 Crafting ${cur.name} for Pune client...`}
            </span>
          </motion.div>

          {/* Lines of Code Counter Badge (Top Right) */}
          <div className="absolute top-6 right-6 sm:right-12 bg-slate-900/90 border border-slate-700/80 px-4 py-2 rounded-2xl flex items-center gap-3 text-xs font-mono z-20 shadow-lg">
            <span className="text-slate-400">Written:</span>
            <span className="text-emerald-400 font-bold font-mono text-sm">
              {typedChars.toLocaleString()} lines
            </span>
          </div>

          {/* MAIN ILLUSTRATION: Cartoon Developer at Glowing Workstation */}
          <div className="relative flex flex-col items-center justify-center pt-14 pb-4">
            {/* SVG Cartoon Character & Workstation */}
            <div className="w-full max-w-[620px] h-[340px] sm:h-[400px] relative flex items-center justify-center">
              <svg
                viewBox="0 0 700 450"
                className="w-full h-full drop-shadow-2xl select-none"
                style={{ overflow: "visible" }}
              >
                <defs>
                  {/* Gradients */}
                  <linearGradient id="deskGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1E293B" />
                    <stop offset="100%" stopColor="#0F172A" />
                  </linearGradient>
                  <linearGradient id="screenGrad1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0A101D" />
                    <stop offset="100%" stopColor="#020617" />
                  </linearGradient>
                  <linearGradient id="screenGrad2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0F172A" />
                    <stop offset="100%" stopColor="#1E293B" />
                  </linearGradient>
                  <linearGradient id="hoodieGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563EB" />
                    <stop offset="100%" stopColor="#1D4ED8" />
                  </linearGradient>
                  <linearGradient id="skinGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FBBF24" />
                    <stop offset="100%" stopColor="#F59E0B" />
                  </linearGradient>
                  <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* --- 1. THE WOODEN DESK --- */}
                <ellipse cx="350" cy="400" rx="300" ry="40" fill="#020617" opacity="0.6" />
                <path
                  d="M 120 330 L 580 330 L 610 380 L 90 380 Z"
                  fill="url(#deskGrad)"
                  stroke="#334155"
                  strokeWidth="3"
                />
                <rect x="130" y="380" width="18" height="60" rx="4" fill="#0F172A" />
                <rect x="550" y="380" width="18" height="60" rx="4" fill="#0F172A" />

                {/* Desk RGB Ambient Underglow Strip */}
                <path
                  d="M 100 378 L 600 378"
                  stroke="#38BDF8"
                  strokeWidth="4"
                  filter="url(#neonGlow)"
                  opacity="0.8"
                />

                {/* --- 2. DUAL MONITOR SCREENS --- */}
                {/* Left Monitor: Code IDE */}
                <g transform="translate(140, 150) rotate(-6, 110, 80)">
                  {/* Stand */}
                  <rect x="100" y="150" width="16" height="40" fill="#334155" />
                  <ellipse cx="108" cy="188" rx="35" ry="8" fill="#1E293B" />
                  {/* Monitor Body */}
                  <rect
                    x="0"
                    y="0"
                    width="220"
                    height="150"
                    rx="12"
                    fill="#1E293B"
                    stroke="#475569"
                    strokeWidth="3"
                  />
                  {/* Screen Glass */}
                  <rect x="8" y="8" width="204" height="134" rx="8" fill="url(#screenGrad1)" />
                  {/* Screen Header Dots */}
                  <circle cx="20" cy="18" r="3" fill="#EF4444" />
                  <circle cx="30" cy="18" r="3" fill="#F59E0B" />
                  <circle cx="40" cy="18" r="3" fill="#10B981" />
                  <text x="50" y="21" fill="#64748B" fontSize="9" fontFamily="monospace">
                    src/App.tsx
                  </text>

                  {/* Animated Scrolling Code Lines inside Screen 1 */}
                  <g opacity="0.9">
                    <rect x="18" y="35" width="70" height="4" rx="2" fill="#818CF8" />
                    <rect x="94" y="35" width="50" height="4" rx="2" fill="#38BDF8" />
                    <rect x="18" y="47" width="120" height="4" rx="2" fill="#34D399" />
                    <rect x="18" y="59" width="40" height="4" rx="2" fill="#F472B6" />
                    <rect x="64" y="59" width="80" height="4" rx="2" fill="#FBBF24" />
                    <rect x="18" y="71" width="90" height="4" rx="2" fill="#60A5FA" />
                    <rect x="18" y="83" width="130" height="4" rx="2" fill="#A78BFA" />
                    <rect x="18" y="95" width="60" height="4" rx="2" fill="#38BDF8" />
                    <rect x="84" y="95" width="70" height="4" rx="2" fill="#34D399" />
                    <rect x="18" y="107" width="110" height="4" rx="2" fill="#818CF8" />
                    {/* Blinking Cursor in monitor */}
                    <rect x="18" y="120" width="8" height="10" fill="#38BDF8">
                      <animate
                        attributeName="opacity"
                        values="1;0;1"
                        dur="0.8s"
                        repeatCount="indefinite"
                      />
                    </rect>
                  </g>
                </g>

                {/* Right Monitor: Live Website Preview */}
                <g transform="translate(345, 150) rotate(6, 110, 80)">
                  {/* Stand */}
                  <rect x="100" y="150" width="16" height="40" fill="#334155" />
                  <ellipse cx="108" cy="188" rx="35" ry="8" fill="#1E293B" />
                  {/* Monitor Body */}
                  <rect
                    x="0"
                    y="0"
                    width="220"
                    height="150"
                    rx="12"
                    fill="#1E293B"
                    stroke="#475569"
                    strokeWidth="3"
                  />
                  {/* Screen Glass */}
                  <rect x="8" y="8" width="204" height="134" rx="8" fill="url(#screenGrad2)" />
                  {/* Live Website Layout Blocks */}
                  <rect x="16" y="16" width="188" height="16" rx="4" fill="#0F172A" />
                  <circle cx="26" cy="24" r="4" fill={cur.previewColor} />
                  <rect x="36" y="21" width="50" height="6" rx="3" fill="#E2E8F0" />
                  <rect x="150" y="21" width="45" height="7" rx="3" fill={cur.previewColor} />

                  {/* Mockup Hero Banner inside screen */}
                  <rect x="16" y="38" width="188" height="52" rx="6" fill="#1E293B" />
                  <rect x="24" y="46" width="100" height="8" rx="4" fill="#F8FAFC" />
                  <rect x="24" y="58" width="80" height="5" rx="2.5" fill="#94A3B8" />
                  <rect x="24" y="68" width="40" height="12" rx="4" fill="#FFC21A" />
                  <rect x="140" y="44" width="55" height="40" rx="4" fill="#0EA5E9" opacity="0.8" />

                  {/* Simulated 3 Product Cards inside Screen 2 */}
                  <rect x="16" y="96" width="58" height="38" rx="4" fill="#0F172A" stroke="#334155" />
                  <rect x="81" y="96" width="58" height="38" rx="4" fill="#0F172A" stroke="#334155" />
                  <rect x="146" y="96" width="58" height="38" rx="4" fill="#0F172A" stroke="#334155" />
                </g>

                {/* --- 3. COFFEE MUG WITH ANIMATED STEAM --- */}
                <g transform="translate(135, 315)">
                  <rect x="0" y="8" width="24" height="28" rx="4" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" />
                  <path d="M 24 14 Q 32 18 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
                  {/* Coffee liquid */}
                  <ellipse cx="12" cy="10" rx="9" ry="3" fill="#78350F" />
                  {/* Steam curls */}
                  <path d="M 8 6 Q 6 0 10 -6" fill="none" stroke="#E2E8F0" strokeWidth="1.5" strokeLinecap="round" opacity="0.6">
                    <animate attributeName="d" values="M 8 6 Q 6 0 10 -6; M 8 6 Q 10 0 7 -8; M 8 6 Q 6 0 10 -6" dur="2s" repeatCount="indefinite" />
                  </path>
                  <path d="M 16 6 Q 18 0 14 -6" fill="none" stroke="#E2E8F0" strokeWidth="1.5" strokeLinecap="round" opacity="0.6">
                    <animate attributeName="d" values="M 16 6 Q 18 0 14 -6; M 16 6 Q 14 0 17 -8; M 16 6 Q 18 0 14 -6" dur="2s" repeatCount="indefinite" />
                  </path>
                </g>

                {/* --- 4. MECHANICAL KEYBOARD --- */}
                <g transform="translate(290, 335)">
                  <rect x="0" y="0" width="120" height="34" rx="4" fill="#0F172A" stroke="#38BDF8" strokeWidth="2" />
                  {/* Key grid with animated glow */}
                  <rect x="6" y="5" width="108" height="24" rx="3" fill="#1E293B" />
                  {/* RGB spacebar glow */}
                  <rect x="35" y="20" width="50" height="5" rx="2" fill="#00F0FF" filter="url(#neonGlow)" opacity="0.9" />
                </g>

                {/* --- 5. THE 3D CARTOON DEVELOPER CHARACTER --- */}
                <g transform="translate(350, 240)">
                  {/* Body / Blue Hoodie */}
                  <path
                    d="M -50 90 C -50 40, -35 25, 0 25 C 35 25, 50 40, 50 90 Z"
                    fill="url(#hoodieGrad)"
                    stroke="#1E40AF"
                    strokeWidth="3"
                  />
                  {/* Hoodie Strings */}
                  <path d="M -8 38 L -8 58" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
                  <path d="M 8 38 L 8 58" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />

                  {/* Head & Neck (With slight rhythmic bobbing animation) */}
                  <g>
                    <animateTransform
                      attributeName="transform"
                      type="translate"
                      values="0 0; 0 -4; 0 0"
                      dur={coffeeBoost ? "0.3s" : "0.7s"}
                      repeatCount="indefinite"
                    />

                    {/* Neck */}
                    <rect x="-10" y="15" width="20" height="15" fill="url(#skinGrad)" rx="3" />

                    {/* Head */}
                    <circle cx="0" cy="0" r="32" fill="url(#skinGrad)" stroke="#D97706" strokeWidth="2" />

                    {/* Hair (Trendy Coder Haircut) */}
                    <path
                      d="M -32 -6 C -30 -34, 15 -38, 32 -10 C 25 -25, -15 -28, -24 -15 Z"
                      fill="#1E1B4B"
                    />

                    {/* Glasses (Modern Smart Glasses) */}
                    <rect x="-24" y="-5" width="18" height="12" rx="3" fill="#38BDF8" opacity="0.4" stroke="#0F172A" strokeWidth="2" />
                    <rect x="6" y="-5" width="18" height="12" rx="3" fill="#38BDF8" opacity="0.4" stroke="#0F172A" strokeWidth="2" />
                    <path d="M -6 0 L 6 0" stroke="#0F172A" strokeWidth="2" />

                    {/* Eyes */}
                    <circle cx="-15" cy="0" r="3" fill="#0F172A" />
                    <circle cx="15" cy="0" r="3" fill="#0F172A" />
                    {/* Catchlight */}
                    <circle cx="-16" cy="-1" r="1" fill="#FFFFFF" />
                    <circle cx="14" cy="-1" r="1" fill="#FFFFFF" />

                    {/* Cheerful Smile */}
                    <path d="M -7 14 Q 0 20 7 14" fill="none" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" />

                    {/* Headphones (Big Over-Ear Gaming/Dev Headphones) */}
                    <path d="M -30 -10 C -30 -42, 30 -42, 30 -10" fill="none" stroke="#DC2626" strokeWidth="6" strokeLinecap="round" />
                    {/* Left Ear cup */}
                    <rect x="-38" y="-12" width="12" height="24" rx="6" fill="#EF4444" stroke="#991B1B" strokeWidth="2" />
                    {/* Right Ear cup */}
                    <rect x="26" y="-12" width="12" height="24" rx="6" fill="#EF4444" stroke="#991B1B" strokeWidth="2" />
                  </g>

                  {/* Left Arm & Hand (Animated Typing Motion) */}
                  <g>
                    <path
                      d="M -40 50 Q -30 95 -10 95"
                      fill="none"
                      stroke="#2563EB"
                      strokeWidth="16"
                      strokeLinecap="round"
                    />
                    {/* Left Hand moving up/down rapidly */}
                    <circle cx="-10" cy="95" r="8" fill="url(#skinGrad)">
                      <animate
                        attributeName="cy"
                        values="93;97;93"
                        dur={coffeeBoost ? "0.08s" : "0.18s"}
                        repeatCount="indefinite"
                      />
                    </circle>
                  </g>

                  {/* Right Arm & Hand (Animated Typing Motion) */}
                  <g>
                    <path
                      d="M 40 50 Q 30 95 10 95"
                      fill="none"
                      stroke="#2563EB"
                      strokeWidth="16"
                      strokeLinecap="round"
                    />
                    {/* Right Hand moving up/down rapidly alternating */}
                    <circle cx="10" cy="95" r="8" fill="url(#skinGrad)">
                      <animate
                        attributeName="cy"
                        values="97;93;97"
                        dur={coffeeBoost ? "0.08s" : "0.18s"}
                        repeatCount="indefinite"
                      />
                    </circle>
                  </g>
                </g>

                {/* --- 6. FLOATING HOLOGRAPHIC TECH BADGES --- */}
                {/* Float 1: React / Next.js */}
                <g transform="translate(80, 80)">
                  <animateTransform attributeName="transform" type="translate" values="80 80; 80 72; 80 80" dur="3s" repeatCount="indefinite" />
                  <rect x="0" y="0" width="85" height="26" rx="13" fill="#1E293B" stroke="#38BDF8" strokeWidth="1.5" />
                  <circle cx="14" cy="13" r="5" fill="#38BDF8" />
                  <text x="26" y="17" fill="#E2E8F0" fontSize="10" fontWeight="bold" fontFamily="sans-serif">
                    Next.js 16
                  </text>
                </g>

                {/* Float 2: PostgreSQL Database */}
                <g transform="translate(540, 80)">
                  <animateTransform attributeName="transform" type="translate" values="540 80; 540 88; 540 80" dur="3.5s" repeatCount="indefinite" />
                  <rect x="0" y="0" width="105" height="26" rx="13" fill="#1E293B" stroke="#10B981" strokeWidth="1.5" />
                  <circle cx="14" cy="13" r="5" fill="#10B981" />
                  <text x="26" y="17" fill="#E2E8F0" fontSize="10" fontWeight="bold" fontFamily="sans-serif">
                    PostgreSQL 18
                  </text>
                </g>

                {/* Float 3: 0.4s Fast Speed */}
                <g transform="translate(480, 350)">
                  <animateTransform attributeName="transform" type="translate" values="480 350; 480 344; 480 350" dur="2.5s" repeatCount="indefinite" />
                  <rect x="0" y="0" width="95" height="26" rx="13" fill="#1E293B" stroke="#F59E0B" strokeWidth="1.5" />
                  <circle cx="14" cy="13" r="5" fill="#F59E0B" />
                  <text x="26" y="17" fill="#E2E8F0" fontSize="10" fontWeight="bold" fontFamily="sans-serif">
                    ⚡ 0.4s Speed
                  </text>
                </g>
              </svg>
            </div>

            {/* Bottom Status Card: Live Project Deployment Details */}
            <div className="w-full max-w-2xl bg-slate-900/80 border border-slate-800 rounded-2xl p-4 sm:p-5 mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#FFC21A] block">
                  Currently Being Programmed:
                </span>
                <h4 className="text-base font-black text-white mt-0.5 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cur.previewColor }} />
                  {cur.name} ({cur.tag})
                </h4>
                <p className="text-xs text-slate-400 mt-1 font-mono">
                  &gt; {cur.screenCode[0]}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="bg-slate-950 px-3.5 py-2 rounded-xl border border-slate-800 text-right">
                  <span className="text-[10px] text-slate-400 block">Performance Metric</span>
                  <span className="text-xs font-bold text-emerald-400 font-mono">
                    {cur.stat}
                  </span>
                </div>
                <a
                  href="#contact"
                  className="btn-yellow text-xs px-4 py-2.5 font-bold shadow-md flex items-center gap-1.5 whitespace-nowrap cursor-pointer hover:scale-105 transition-transform"
                >
                  Build Mine Next <Zap size={13} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
