"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Users, Calendar, Briefcase } from "lucide-react";

interface StatsData {
  projectsCompleted: number;
  happyClients: number;
  yearsExperience: number;
  servicesOffered: number;
}

const defaultStats: StatsData = {
  projectsCompleted: 150,
  happyClients: 100,
  yearsExperience: 5,
  servicesOffered: 11,
};

function useCountUp(target: number, duration = 1800, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function StatCard({
  icon: Icon,
  label,
  value,
  suffix,
  delay,
}: {
  icon: typeof Trophy;
  label: string;
  value: number;
  suffix: string;
  delay: number;
}) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const count = useCountUp(value, 1800, inView);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="text-center group"
    >
      <div className="w-16 h-16 bg-[#1E6FFF]/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-[#1E6FFF] transition-colors duration-300">
        <Icon
          size={28}
          className="text-[#1E6FFF] group-hover:text-white transition-colors duration-300"
        />
      </div>
      <div className="text-4xl md:text-5xl font-black text-[#0B1F4B] mb-1">
        {count}
        <span className="text-[#FFC21A]">{suffix}</span>
      </div>
      <div className="text-gray-500 font-medium">{label}</div>
    </motion.div>
  );
}

export default function StatsSection() {
  const [stats, setStats] = useState<StatsData>(defaultStats);

  useEffect(() => {
    fetch("/api/admin/content")
      .then((res) => res.json())
      .then((data) => {
        if (data.content?.stats) {
          setStats(data.content.stats);
        }
      })
      .catch(() => {});
  }, []);

  const statsList = [
    { icon: Trophy, label: "Projects Completed", value: stats.projectsCompleted, suffix: "+" },
    { icon: Users, label: "Happy Clients", value: stats.happyClients, suffix: "+" },
    { icon: Calendar, label: "Years Experience", value: stats.yearsExperience, suffix: "+" },
    { icon: Briefcase, label: "Services Offered", value: stats.servicesOffered, suffix: "+" },
  ];

  return (
    <section id="about" className="py-20 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="section-tag">Who We Are</span>
          <h2 className="text-3xl md:text-4xl font-black text-[#0B1F4B] mt-2 mb-4">
            Your Digital Partner for{" "}
            <span className="gradient-text">Technology, Marketing &amp; Creative Solutions</span>
          </h2>
          <p className="text-gray-500 max-w-3xl mx-auto text-lg leading-relaxed">
            We help businesses build their online presence, grow their brand, and achieve their goals
            with smart digital solutions. From concept to completion — we&apos;ve got you!
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {statsList.map((stat, i) => (
            <StatCard key={stat.label} {...stat} delay={i * 0.1} />
          ))}
        </div>

        {/* Bottom badges */}
        <motion.div
          className="mt-16 flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          {["Professional Service", "Creative Solutions", "On-Time Delivery", "Affordable Pricing"].map((badge) => (
            <span
              key={badge}
              className="flex items-center gap-2 bg-[#0B1F4B]/5 text-[#0B1F4B] px-5 py-2.5 rounded-full text-sm font-semibold"
            >
              ✓ {badge}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
