"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Monitor,
  Code2,
  Smartphone,
  TrendingUp,
  Search,
  Share2,
  Palette,
  Video,
  Printer,
  Settings,
  Camera,
  ArrowRight,
} from "lucide-react";
import { ServiceItem } from "@/lib/siteContentStore";

const iconMap: Record<string, any> = {
  Monitor,
  Code2,
  Smartphone,
  TrendingUp,
  Search,
  Share2,
  Palette,
  Video,
  Printer,
  Settings,
  Camera,
};

const defaultServices: ServiceItem[] = [
  { id: 1, title: "Website Development", desc: "Business websites, E-Commerce, Landing Pages & Portfolio sites.", color: "#1E6FFF", iconName: "Monitor", isActive: true },
  { id: 2, title: "Software Development", desc: "Custom software solutions, web apps and tailored technology.", color: "#7C3AED", iconName: "Code2", isActive: true },
  { id: 3, title: "Mobile App Development", desc: "Android, iOS and cross-platform apps built for performance.", color: "#059669", iconName: "Smartphone", isActive: true },
  { id: 4, title: "Digital Marketing", desc: "Google Ads, Meta Ads, content marketing and lead generation.", color: "#DC2626", iconName: "TrendingUp", isActive: true },
  { id: 5, title: "SEO", desc: "Rank higher on Google, drive more traffic and stay ahead of competitors.", color: "#D97706", iconName: "Search", isActive: true },
  { id: 6, title: "Social Media Marketing", desc: "Build your brand across Facebook, Instagram, YouTube, LinkedIn.", color: "#0284C7", iconName: "Share2", isActive: true },
  { id: 7, title: "Graphic Design & Branding", desc: "Logos, banners, posters, social media creatives & UI/UX design.", color: "#EC4899", iconName: "Palette", isActive: true },
  { id: 8, title: "Video Editing & Content", desc: "Engaging video content for YouTube, Instagram Reels & storytelling.", color: "#7C3AED", iconName: "Video", isActive: true },
  { id: 9, title: "Custom Printing", desc: "T-Shirts, mugs, caps, gifts and corporate wear with your brand.", color: "#065F46", iconName: "Printer", isActive: true },
  { id: 10, title: "IT Support & Maintenance", desc: "Website maintenance, technical support, domain & hosting.", color: "#1E6FFF", iconName: "Settings", isActive: true },
  { id: 11, title: "Digital Media Services", desc: "From ideas to visuals — photography, media campaigns & digital content.", color: "#B45309", iconName: "Camera", isActive: true },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function ServicesSection() {
  const [services, setServices] = useState<ServiceItem[]>(defaultServices);

  useEffect(() => {
    fetch("/api/admin/content")
      .then((res) => res.json())
      .then((data) => {
        if (data.content?.services) {
          setServices(data.content.services.filter((s: ServiceItem) => s.isActive));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">What We Offer</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#0B1F4B] mt-2 mb-4">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            Digital Solutions for a Smarter Tomorrow — from concept to completion, we&apos;ve got you covered.
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {services.map((service) => {
            const IconComponent = iconMap[service.iconName] || Monitor;
            return (
              <motion.div
                key={service.id}
                variants={cardVariants}
                className="group bg-white rounded-2xl p-6 card-hover cursor-pointer border border-gray-100"
              >
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 duration-300"
                  style={{ backgroundColor: `${service.color}15` }}
                >
                  <IconComponent size={26} style={{ color: service.color }} />
                </div>
                <h3 className="font-bold text-[#0B1F4B] text-lg mb-2 leading-tight">
                  {service.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">
                  {service.desc}
                </p>
                <div className="flex items-center gap-1 text-[#1E6FFF] text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Learn More <ArrowRight size={14} />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-gray-500 mb-4">Need a custom solution?</p>
          <button
            onClick={() =>
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
            }
            className="btn-primary"
          >
            Get Free Consultation <ArrowRight size={16} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
