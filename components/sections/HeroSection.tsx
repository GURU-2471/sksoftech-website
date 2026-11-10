"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Star, Zap, Globe, ShieldCheck, Cpu } from "lucide-react";
import MagneticFluidButton from "@/components/ui/MagneticFluidButton";

interface HeroData {
  badge: string;
  headline1: string;
  headline2: string;
  headline3: string;
  description: string;
  ctaPrimaryText: string;
  ctaSecondaryText: string;
  statNumber: string;
  statLabel: string;
}

const defaultHero: HeroData = {
  badge: "Pune's Trusted Digital Partner",
  headline1: "Your Vision",
  headline2: "Our Technology",
  headline3: "Your Growth",
  description:
    "We help businesses build their online presence, grow their brand and achieve their goals with smart digital solutions.",
  ctaPrimaryText: "Get Free Consultation",
  ctaSecondaryText: "View Our Work",
  statNumber: "150+",
  statLabel: "Projects Delivered",
};

export default function HeroSection() {
  const [hero, setHero] = useState<HeroData>(defaultHero);

  useEffect(() => {
    fetch("/api/admin/content")
      .then((res) => res.json())
      .then((data) => {
        if (data.content?.hero) {
          setHero(data.content.hero);
        }
      })
      .catch(() => {});
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-slate-950"
    >
      {/* Dynamic Animated Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/4 -right-1/4 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-[#1E6FFF]/25 to-[#0B1F4B]/40 blur-3xl pulse-glow" />
        <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#FFC21A]/15 to-[#1E6FFF]/15 blur-3xl pulse-glow" style={{ animationDelay: "3s" }} />

        {/* High-tech matrix blueprint grid */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Ambient radial vignette */}
        <div className="absolute inset-0 bg-radial from-transparent via-slate-950/60 to-slate-950" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-4"
            >
              <span className="inline-flex items-center gap-2 bg-[#FFC21A]/15 border border-[#FFC21A]/30 text-[#FFC21A] px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold shadow-lg shadow-amber-500/10">
                <Star size={13} fill="#FFC21A" />
                {hero.badge}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight mb-2"
            >
              {hero.headline1}
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#FFC21A] leading-tight tracking-tight mb-2"
            >
              {hero.headline2}
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight tracking-tight mb-6"
            >
              {hero.headline3}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-slate-300 text-base sm:text-lg lg:text-xl leading-relaxed mb-8 max-w-lg"
            >
              {hero.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 mb-10"
            >
              <MagneticFluidButton
                onClick={() => scrollTo("contact")}
                variant="gold"
                className="text-sm px-8 py-4"
              >
                <span>{hero.ctaPrimaryText}</span>
                <ArrowRight size={17} />
              </MagneticFluidButton>
              <MagneticFluidButton
                onClick={() => scrollTo("portfolio")}
                variant="secondary"
                className="text-sm px-8 py-4"
              >
                <span>{hero.ctaSecondaryText}</span>
                <ArrowRight size={17} />
              </MagneticFluidButton>
            </motion.div>

            {/* Tagline pills with glow */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-2.5"
            >
              {["Technology", "Creativity", "Growth", "Next.js", "AI Integration"].map((tag) => (
                <span
                  key={tag}
                  className="px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-slate-300 text-xs font-semibold hover:border-[#1E6FFF] hover:text-white transition-colors"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right Floating Display with 3D-feel Cards */}
          <div className="hidden lg:block relative h-[520px]">
            {/* Main Center Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 glass rounded-3xl p-8 w-72 shadow-2xl border border-slate-700/60 backdrop-blur-2xl"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#FFC21A] to-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-amber-500/30">
                  <Globe size={32} color="#0B1F4B" />
                </div>
                <p className="text-white font-black text-3xl">{hero.statNumber}</p>
                <p className="text-slate-300 text-xs font-medium mt-1">{hero.statLabel}</p>
                <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-center gap-1.5 text-[11px] text-emerald-400 font-semibold">
                  <ShieldCheck size={14} /> 100% Verified Delivery
                </div>
              </div>
            </motion.div>

            {/* Floating badge 1: Top Left */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute top-10 left-0 glass rounded-2xl p-4 flex items-center gap-3 shadow-xl border border-slate-700/60"
            >
              <div className="w-11 h-11 bg-[#1E6FFF] rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                <Zap size={20} color="white" />
              </div>
              <div>
                <p className="text-white font-bold text-sm">Ultra Fast Load</p>
                <p className="text-slate-400 text-xs">&lt; 1s Response Speed</p>
              </div>
            </motion.div>

            {/* Floating badge 2: Bottom Right */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="absolute bottom-10 right-0 glass rounded-2xl p-4 flex items-center gap-3 shadow-xl border border-slate-700/60"
            >
              <div className="w-11 h-11 bg-gradient-to-br from-[#FFC21A] to-amber-500 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/30">
                <Star size={20} color="#0B1F4B" fill="#0B1F4B" />
              </div>
              <div>
                <p className="text-white font-bold text-sm">Top Rated Pune Agency</p>
                <p className="text-slate-400 text-xs">5.0 Star Client Rating</p>
              </div>
            </motion.div>

            {/* Floating badge 3: Top Right */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="absolute top-6 right-6 glass rounded-2xl p-3.5 flex items-center gap-2.5 border border-slate-700/60"
            >
              <Cpu size={16} className="text-[#1E6FFF]" />
              <span className="text-xs font-bold text-slate-200">AI Powered Platform</span>
            </motion.div>
          </div>
        </div>

        {/* Scroll down indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 cursor-pointer"
          onClick={() => scrollTo("about")}
        >
          <span className="text-slate-400 text-[10px] uppercase tracking-widest font-semibold">Explore</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.6 }}
          >
            <ChevronDown size={18} className="text-[#FFC21A]" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
