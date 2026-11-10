"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Quote,
  CheckCircle2,
  ShieldCheck,
  TrendingUp,
  Building2,
  MapPin,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  location: string;
  industry: string;
  avatarBg: string;
  rating: number;
  highlightMetric: string;
  metricLabel: string;
  review: string;
  tags: string[];
}

const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Dr. Shubham Deshpande",
    role: "Chief of Medical Operations",
    company: "Apex Multispecialty Hospital",
    location: "Kothrud, Pune",
    industry: "Healthcare & OPD",
    avatarBg: "from-cyan-600 to-blue-700",
    rating: 5,
    highlightMetric: "+850 Daily OPDs",
    metricLabel: "Patient Flow Automated",
    review:
      "SK Softech engineered a seamless patient portal and live token queue display. Our OPD wait times dropped by 45% and doctors now have instant digital patient records at their fingertips. Outstanding engineering quality.",
    tags: ["Next.js 16", "PostgreSQL 18", "Live Token Display"],
  },
  {
    id: "t2",
    name: "Vikramaditya Shinde",
    role: "Managing Director",
    company: "RetailBiz E-Commerce",
    location: "Shivajinagar, Pune",
    industry: "Retail & Fintech",
    avatarBg: "from-blue-600 to-indigo-700",
    rating: 5,
    highlightMetric: "+115% GMV Growth",
    metricLabel: "Quarterly Revenue Surge",
    review:
      "The page load speeds are unbelievable (0.3s). Our Razorpay UPI checkout conversion improved immediately upon launch. Customers frequently compliment the sleek interface. SK Softech is our permanent tech partner.",
    tags: ["Headless Commerce", "Razorpay UPI", "Sub-0.4s TTFB"],
  },
  {
    id: "t3",
    name: "Adv. Rajeshwari Joshi",
    role: "Head of Marketing & Sales",
    company: "Skyline Realty Infra",
    location: "Baner & Wakad, Pune",
    industry: "Real Estate & Infra",
    avatarBg: "from-amber-600 to-orange-700",
    rating: 5,
    highlightMetric: "1,400+ Leads",
    metricLabel: "MahaRERA Verified Buyers",
    review:
      "The 3D interactive floor plans and automated WhatsApp brochure dispatcher gave us a decisive competitive edge. We closed over 28 site visits in our first weekend after the portal went live. Extremely trustworthy team.",
    tags: ["3D Floorplans", "MahaRERA CRM", "WhatsApp API"],
  },
  {
    id: "t4",
    name: "Nilesh Jagtap",
    role: "Technical Director",
    company: "Swayam Urja CleanTech",
    location: "Pune & Sambhajinagar",
    industry: "Solar Energy & GIS",
    avatarBg: "from-emerald-600 to-teal-700",
    rating: 5,
    highlightMetric: "4.8 MW Solar",
    metricLabel: "Industrial Rooftops Modeled",
    review:
      "They took complex mathematical solar ROI and MSEDCL net-metering equations and turned them into an intuitive web application that outputs bank-ready engineering proposals in seconds. Exceptional algorithmic execution.",
    tags: ["Financial Math Engine", "Dynamic PDF", "MSEDCL Ready"],
  },
  {
    id: "t5",
    name: "Ananya Mehta",
    role: "Founder & CEO",
    company: "QuickEats Logistics",
    location: "Hinjawadi, Pune",
    industry: "FoodTech & Logistics",
    avatarBg: "from-purple-600 to-pink-700",
    rating: 5,
    highlightMetric: "99.98% Uptime",
    metricLabel: "Over 50,000+ Orders",
    review:
      "Real-time GPS delivery tracking, automated rider dispatch, and rock-solid reliability during peak lunch hours. The engineering rigour SK Softech brings to the table is rare among development agencies.",
    tags: ["WebSockets", "Live GPS Telemetry", "Redis Edge Cache"],
  },
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const touchStartRef = useRef<number | null>(null);

  const prev = () => {
    setCurrentIndex((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  };

  const next = () => {
    setCurrentIndex((c) => (c === testimonials.length - 1 ? 0 : c + 1));
  };

  // Auto-play interval
  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      next();
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlay]);

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartRef.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartRef.current;
    if (deltaX > 50) prev();
    if (deltaX < -50) next();
    touchStartRef.current = null;
  };

  return (
    <section
      id="testimonials"
      className="py-28 bg-[#030712] text-white relative overflow-hidden border-t border-slate-900"
      onMouseEnter={() => setIsAutoPlay(false)}
      onMouseLeave={() => setIsAutoPlay(true)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Architectural Mesh & Subtle Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-gradient-to-r from-blue-900/15 via-sky-900/10 to-transparent rounded-full blur-[140px] pointer-events-none" />

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[11px] font-mono tracking-wider uppercase bg-slate-900/90 text-blue-400 border border-slate-800 shadow-sm mb-4">
            <ShieldCheck size={14} className="text-emerald-400" />
            <span>Verified Client Impact • Maharashtra</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15]">
            Trusted by Leaders.{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-sky-300 to-slate-200">
              Validated by Results.
            </span>
          </h2>

          <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
            Real feedback from enterprise founders, hospital administrators, and real estate leaders who rely on SK Softech for their mission-critical software.
          </p>
        </div>

        {/* 3D VISUALS CAROUSEL STAGE */}
        <div
          className="relative max-w-5xl mx-auto h-[480px] sm:h-[500px] flex items-center justify-center"
          style={{ perspective: "1500px" }}
        >
          {/* CARDS ROTATING IN 3D SPACE */}
          <div className="relative w-full h-full flex items-center justify-center">
            {testimonials.map((item, idx) => {
              // Calculate 3D offset relative to currentIndex
              const total = testimonials.length;
              let offset = (idx - currentIndex) % total;
              if (offset < -Math.floor(total / 2)) offset += total;
              if (offset > Math.floor(total / 2)) offset -= total;

              const isCenter = offset === 0;
              const isLeft = offset === -1;
              const isRight = offset === 1;
              const isVisible = Math.abs(offset) <= 1;

              // Transform calculations for 3D perspective depth
              let translateX = 0;
              let translateZ = -180;
              let rotateY = 0;
              let scale = 0.85;
              let opacity = 0;
              let zIndex = 10;

              if (isCenter) {
                translateX = 0;
                translateZ = 60;
                rotateY = 0;
                scale = 1;
                opacity = 1;
                zIndex = 30;
              } else if (isLeft) {
                translateX = -280;
                translateZ = -80;
                rotateY = 22;
                scale = 0.88;
                opacity = 0.65;
                zIndex = 20;
              } else if (isRight) {
                translateX = 280;
                translateZ = -80;
                rotateY = -22;
                scale = 0.88;
                opacity = 0.65;
                zIndex = 20;
              }

              return (
                <motion.div
                  key={item.id}
                  onClick={() => {
                    if (isLeft) prev();
                    if (isRight) next();
                  }}
                  animate={{
                    x: translateX,
                    z: translateZ,
                    rotateY: rotateY,
                    scale: scale,
                    opacity: opacity,
                  }}
                  transition={{
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1], // Smooth cubic ease-out
                  }}
                  style={{
                    position: "absolute",
                    transformStyle: "preserve-3d",
                    zIndex,
                    pointerEvents: isVisible ? "auto" : "none",
                  }}
                  className={`w-[320px] sm:w-[440px] md:w-[480px] rounded-3xl p-6 sm:p-8 backdrop-blur-2xl border transition-shadow duration-300 cursor-pointer ${
                    isCenter
                      ? "bg-slate-900/95 border-blue-500/50 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(37,99,235,0.2)]"
                      : "bg-slate-950/80 border-slate-800/80 shadow-2xl hover:border-slate-700"
                  }`}
                >
                  {/* Subtle Top Accent Strip for active slide */}
                  {isCenter && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-sky-400 to-emerald-400 rounded-t-3xl" />
                  )}

                  {/* Header: Verified Stamp & Stars */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
                    <div className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 font-bold bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-1 rounded-full">
                      <CheckCircle2 size={13} />
                      <span>Verified Client</span>
                    </div>

                    <div className="flex items-center gap-1">
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <Star key={i} size={15} fill="#F59E0B" className="text-amber-500" />
                      ))}
                    </div>
                  </div>

                  {/* Highlight Metric Badge */}
                  <div className="my-5 p-3.5 rounded-2xl bg-slate-950 border border-slate-800/90 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                        {item.metricLabel}
                      </span>
                      <span className="text-lg font-black font-mono text-white tracking-tight">
                        {item.highlightMetric}
                      </span>
                    </div>
                    <div className="w-9 h-9 rounded-xl bg-blue-950/80 border border-blue-500/30 flex items-center justify-center text-blue-400">
                      <TrendingUp size={18} />
                    </div>
                  </div>

                  {/* Quote Body */}
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6 italic relative">
                    <Quote
                      size={28}
                      className="text-blue-500/15 absolute -top-3 -left-3 pointer-events-none"
                    />
                    &quot;{item.review}&quot;
                  </p>

                  {/* Client Info Footer */}
                  <div className="flex items-center gap-3.5 pt-4 border-t border-slate-800/80">
                    <div
                      className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${item.avatarBg} flex items-center justify-center text-white font-black text-sm shadow-md border border-white/10`}
                    >
                      {item.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-white truncate">
                        {item.name}
                      </h4>
                      <p className="text-[11px] text-slate-400 truncate">
                        {item.role} • <span className="text-slate-300 font-semibold">{item.company}</span>
                      </p>
                      <p className="text-[10px] text-slate-500 flex items-center gap-1 mt-0.5 font-mono">
                        <MapPin size={10} className="text-blue-400" />
                        <span>{item.location}</span>
                      </p>
                    </div>
                  </div>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-slate-900">
                    {item.tags.map((tg, i) => (
                      <span
                        key={i}
                        className="text-[9px] font-mono bg-slate-950 border border-slate-800 text-slate-400 px-2 py-0.5 rounded"
                      >
                        {tg}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* 3D Navigation Arrows */}
          <button
            onClick={prev}
            aria-label="Previous slide"
            className="absolute left-2 sm:left-4 z-40 w-12 h-12 rounded-2xl bg-slate-900/90 border border-slate-700/80 text-white flex items-center justify-center hover:bg-blue-600 hover:border-transparent transition-all shadow-xl backdrop-blur-md cursor-pointer hover:scale-105 active:scale-95"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={next}
            aria-label="Next slide"
            className="absolute right-2 sm:right-4 z-40 w-12 h-12 rounded-2xl bg-slate-900/90 border border-slate-700/80 text-white flex items-center justify-center hover:bg-blue-600 hover:border-transparent transition-all shadow-xl backdrop-blur-md cursor-pointer hover:scale-105 active:scale-95"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Bottom Pagination Dots & Live Client Roster Ticker */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-slate-900 max-w-4xl mx-auto">
          {/* Indicators */}
          <div className="flex items-center gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                aria-label={`Jump to slide ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  i === currentIndex
                    ? "w-8 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)]"
                    : "w-2 bg-slate-700 hover:bg-slate-500"
                }`}
              />
            ))}
          </div>

          <div className="text-xs font-mono text-slate-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Slide {currentIndex + 1} of {testimonials.length} • 100% Client Satisfaction</span>
          </div>

          <div className="flex items-center gap-1 text-xs text-slate-400">
            <span className="text-slate-500 font-mono">Auto-rotation:</span>
            <span className="text-blue-400 font-mono font-bold">
              {isAutoPlay ? "6s" : "Paused on Hover"}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
