"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, Sparkles } from "lucide-react";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
  isActive: boolean;
}

const defaultFaqs: FAQItem[] = [
  {
    id: 1,
    question: "What digital and IT services does SK Softech offer?",
    answer:
      "SK Softech provides end-to-end IT and marketing solutions including Business & E-Commerce Web Development, Android & iOS Mobile Apps, Custom Web Apps, SEO, Digital Marketing (Google & Meta Ads), Social Media Management, Graphic Design & Branding, Video Editing, Custom Printing, and ongoing IT Support.",
    category: "Services",
    isActive: true,
  },
  {
    id: 2,
    question: "How much does a website or app development cost?",
    answer:
      "Our website packages start from ₹8,000 for standard business sites and ₹25,000 to ₹60,000+ for custom dynamic portals, e-commerce, or mobile apps. We provide transparent, itemized quotes with zero hidden charges and free initial consultations.",
    category: "Pricing",
    isActive: true,
  },
  {
    id: 3,
    question: "What is your standard project delivery timeline?",
    answer:
      "Standard business websites are typically ready in 1 to 2 weeks. Custom web applications, e-commerce stores, and mobile apps generally take 3 to 6 weeks, which includes design, coding, thorough testing, and deployment.",
    category: "Timeline",
    isActive: true,
  },
  {
    id: 4,
    question: "Can I manage and update website content myself without coding?",
    answer:
      "Yes! Every project includes a user-friendly, secure Admin Dashboard where you can update text, services, portfolio projects, client testimonials, view incoming leads, and manage AI settings without needing a developer.",
    category: "Technology",
    isActive: true,
  },
  {
    id: 5,
    question: "Do you provide post-launch maintenance and technical support?",
    answer:
      "Absolutely. We offer dedicated post-launch support covering server monitoring, daily backups, security updates, bug fixes, and continuous technical assistance so your digital presence remains fast and secure.",
    category: "Support",
    isActive: true,
  },
  {
    id: 6,
    question: "Where are you based and how do we start a project?",
    answer:
      "We are headquartered in Pune, Maharashtra. You can reach out immediately via our website contact form, call us directly at 9307696221, email sksoftech2026@gmail.com, or click the floating WhatsApp button for a quick consultation.",
    category: "General",
    isActive: true,
  },
];

export default function FAQSection() {
  const [faqs, setFaqs] = useState<FAQItem[]>(defaultFaqs);
  const [activeId, setActiveId] = useState<number | null>(1);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  // Sync with Admin-managed FAQs
  useEffect(() => {
    fetch("/api/admin/ai-config")
      .then((res) => res.json())
      .then((data) => {
        if (data.faqs && data.faqs.length > 0) {
          setFaqs(data.faqs.filter((f: FAQItem) => f.isActive));
        }
      })
      .catch(() => {});
  }, []);

  const categories = ["All", ...Array.from(new Set(faqs.map((f) => f.category)))];

  const filtered =
    activeCategory === "All"
      ? faqs
      : faqs.filter((f) => f.category === activeCategory);

  return (
    <section id="faq" className="py-24 bg-white relative overflow-hidden border-t border-gray-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="section-tag flex items-center justify-center gap-1.5 w-fit mx-auto">
            <HelpCircle size={14} /> Clear Answers
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#0B1F4B] mt-2 mb-4">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-base">
            Everything you need to know about partnering with SK Softech for your technology and digital marketing needs.
          </p>
        </motion.div>

        {/* Category Filter */}
        {categories.length > 2 && (
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  activeCategory === cat
                    ? "bg-[#1E6FFF] text-white shadow-md shadow-blue-200"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {filtered.map((faq, index) => {
            const isOpen = activeId === faq.id;
            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "border-[#1E6FFF]/30 bg-blue-50/20 shadow-lg shadow-blue-500/5"
                    : "border-gray-200/80 bg-white hover:border-gray-300"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setActiveId(isOpen ? null : faq.id)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                        isOpen ? "bg-[#1E6FFF] text-white" : "bg-gray-100 text-[#0B1F4B]"
                      }`}
                    >
                      Q{index + 1}
                    </span>
                    <h3 className="font-bold text-[#0B1F4B] text-base md:text-lg">
                      {faq.question}
                    </h3>
                  </div>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className={`shrink-0 p-1.5 rounded-full ${
                      isOpen ? "bg-[#1E6FFF] text-white" : "text-gray-400 bg-gray-50"
                    }`}
                  >
                    <ChevronDown size={18} />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-1 text-gray-600 text-sm md:text-base leading-relaxed border-t border-gray-100/60 mt-1">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 text-center bg-gray-50 rounded-2xl p-6 border border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="font-bold text-[#0B1F4B] text-sm md:text-base flex items-center gap-1.5">
              Have another question not listed here? <Sparkles size={16} className="text-[#FFC21A]" />
            </h4>
            <p className="text-xs text-gray-500 mt-0.5">
              Ask our 24/7 AI Assistant in the bottom corner or talk directly to our team.
            </p>
          </div>
          <a
            href="tel:9307696221"
            className="btn-primary text-xs px-5 py-2.5 shrink-0"
          >
            Call Us: 9307696221
          </a>
        </div>
      </div>
    </section>
  );
}
