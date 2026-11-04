"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { ProjectItem } from "@/lib/siteContentStore";

const categories = ["All", "Web", "Mobile", "Design", "Marketing"];

const defaultProjects: ProjectItem[] = [
  { id: 1, title: "E-Commerce Platform", category: "Web", client: "RetailBiz", desc: "Full-stack e-commerce with payment gateway and admin panel.", color: "#1E6FFF", isActive: true },
  { id: 2, title: "Food Delivery App", category: "Mobile", client: "QuickEats", desc: "Android & iOS app with real-time order tracking.", color: "#7C3AED", isActive: true },
  { id: 3, title: "Brand Identity Design", category: "Design", client: "StartupCo", desc: "Complete brand identity — logo, colors, typography & guidelines.", color: "#EC4899", isActive: true },
  { id: 4, title: "Google Ads Campaign", category: "Marketing", client: "LocalStore", desc: "3x ROI achieved through targeted Google Ads campaigns.", color: "#059669", isActive: true },
  { id: 5, title: "Corporate Website", category: "Web", client: "TechFirm", desc: "Modern, SEO-optimized corporate website with CMS.", color: "#D97706", isActive: true },
  { id: 6, title: "Social Media Growth", category: "Marketing", client: "FashionBrand", desc: "10x Instagram follower growth in 3 months.", color: "#DC2626", isActive: true },
];

export default function PortfolioSection() {
  const [projects, setProjects] = useState<ProjectItem[]>(defaultProjects);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    fetch("/api/admin/content")
      .then((res) => res.json())
      .then((data) => {
        if (data.content?.projects) {
          setProjects(data.content.projects.filter((p: ProjectItem) => p.isActive));
        }
      })
      .catch(() => {});
  }, []);

  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="portfolio" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="section-tag">Our Work</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#0B1F4B] mt-2 mb-4">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            A showcase of our best work across industries and technologies.
          </p>
        </motion.div>

        {/* Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                activeFilter === cat
                  ? "bg-[#1E6FFF] text-white shadow-md shadow-blue-200"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filtered.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative bg-gray-50 rounded-2xl overflow-hidden card-hover border border-gray-100"
              >
                {/* Visual placeholder */}
                <div
                  className="h-48 relative overflow-hidden flex items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${project.color}20, ${project.color}40)` }}
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center font-black text-2xl text-white shadow-lg"
                    style={{ backgroundColor: project.color }}
                  >
                    {project.title.slice(0, 2).toUpperCase()}
                  </div>
                  <span
                    className="absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-full text-white"
                    style={{ backgroundColor: project.color }}
                  >
                    {project.category}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 bg-white">
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wider mb-1">
                    {project.client}
                  </p>
                  <h3 className="font-bold text-[#0B1F4B] text-lg mb-2 group-hover:text-[#1E6FFF] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">
                    {project.desc}
                  </p>
                  <div className="flex items-center gap-1.5 text-[#1E6FFF] text-sm font-semibold cursor-pointer">
                    View Project <ExternalLink size={14} />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
