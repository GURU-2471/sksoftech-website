"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Star, Zap, Globe } from "lucide-react";

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
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0B1F4B 0%, #0a2d6b 50%, #1E6FFF 100%)",
      }}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/3 -right-1/4 w-[600px] h-[600px] rounded-full bg-[#1E6FFF]/20 blur-3xl" />
        <div className="absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] rounded-full bg-[#FFC21A]/10 blur-3xl" />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-4"
            >
              <span className="inline-flex items-center gap-2 bg-[#FFC21A]/20 text-[#FFC21A] px-4 py-1.5 rounded-full text-sm font-bold">
                <Star size={12} fill="#FFC21A" />
                {hero.badge}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-2"
            >
              {hero.headline1}
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black text-[#FFC21A] leading-tight mb-2"
            >
              {hero.headline2}
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6"
            >
              {hero.headline3}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-white/70 text-lg md:text-xl leading-relaxed mb-8 max-w-lg"
            >
              {hero.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 mb-10"
            >
              <button
                onClick={() => scrollTo("contact")}
                className="btn-yellow text-base px-8 py-4"
              >
                {hero.ctaPrimaryText} <ArrowRight size={18} />
              </button>
              <button
                onClick={() => scrollTo("portfolio")}
                className="btn-outline text-base px-8 py-4"
              >
                {hero.ctaSecondaryText} <ArrowRight size={18} />
              </button>
            </motion.div>

            {/* Tagline pills */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-3"
            >
              {["Technology", "Creativity", "Growth"].map((tag) => (
                <span
                  key={tag}
                  className="glass px-4 py-1.5 rounded-full text-white/80 text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right Floating Display */}
          <div className="hidden lg:block relative h-[500px]">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 glass rounded-3xl p-8 w-64 shadow-2xl"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-[#FFC21A] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Globe size={32} color="#0B1F4B" />
                </div>
                <p className="text-white font-black text-2xl">{hero.statNumber}</p>
                <p className="text-white/70 text-sm">{hero.statLabel}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute top-16 left-0 glass rounded-2xl p-4 flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-[#1E6FFF] rounded-xl flex items-center justify-center">
                <Zap size={18} color="white" />
              </div>
              <div>
                <p className="text-white font-bold text-sm">Fast Delivery</p>
                <p className="text-white/60 text-xs">On-Time Always</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="absolute bottom-16 right-0 glass rounded-2xl p-4 flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-[#FFC21A] rounded-xl flex items-center justify-center">
                <Star size={18} color="#0B1F4B" fill="#0B1F4B" />
              </div>
              <div>
                <p className="text-white font-bold text-sm">5★ Rated</p>
                <p className="text-white/60 text-xs">100+ Happy Clients</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
          onClick={() => scrollTo("about")}
        >
          <span className="text-white/50 text-xs uppercase tracking-widest">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ChevronDown size={20} className="text-white/50" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
