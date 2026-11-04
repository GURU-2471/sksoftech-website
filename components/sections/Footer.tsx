"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Careers", href: "#careers" },
  { label: "Contact", href: "#contact" },
];

const serviceLinks = [
  "Website Development",
  "Mobile App Development",
  "Digital Marketing",
  "SEO",
  "Graphic Design",
  "IT Support",
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subLoading, setSubLoading] = useState(false);

  const scrollTo = (href: string) => {
    document.getElementById(href.replace("#", ""))?.scrollIntoView({ behavior: "smooth" });
  };

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubLoading(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Subscribed! Welcome to SK Softech updates.");
        setEmail("");
      } else {
        toast.error(data.message || "Could not subscribe.");
      }
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setSubLoading(false);
    }
  };

  return (
    <footer className="bg-[#060F26] text-white">
      {/* CTA Banner */}
      <div className="bg-[#1E6FFF] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl md:text-3xl font-black text-white">
              Ready to Grow Your Business?
            </h3>
            <p className="text-white/80 mt-1">
              Get a free consultation today — no commitment needed.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="tel:9307696221"
              className="flex items-center gap-2 bg-white text-[#1E6FFF] font-bold px-6 py-3 rounded-full hover:bg-[#FFC21A] hover:text-[#0B1F4B] transition-colors"
            >
              <Phone size={16} /> Call Now
            </a>
            <button
              onClick={() => scrollTo("#contact")}
              className="btn-yellow"
            >
              Get Free Quote <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-[#1E6FFF] rounded-lg flex items-center justify-center font-black text-white text-lg">
                  SK
                </div>
                <div>
                  <div className="font-black text-white">SK Softech</div>
                  <div className="text-[#FFC21A] text-xs">and Digital Marketing</div>
                </div>
              </div>
              <p className="text-white/50 text-sm leading-relaxed mb-5">
                Your Vision | Our Technology | Your Growth. We help businesses build their online presence and grow with smart digital solutions.
              </p>
              <div className="flex flex-wrap gap-2 text-xs text-white/60">
                <span>Pune, Maharashtra</span>
                <span>•</span>
                <span>Technology | Creativity | Growth</span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-white mb-5 text-lg">Quick Links</h4>
              <ul className="space-y-2.5">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <button
                      onClick={() => scrollTo(link.href)}
                      className="text-white/50 hover:text-[#FFC21A] text-sm transition-colors flex items-center gap-1.5 group"
                    >
                      <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-bold text-white mb-5 text-lg">Our Services</h4>
              <ul className="space-y-2.5">
                {serviceLinks.map((s) => (
                  <li key={s}>
                    <button
                      onClick={() => scrollTo("#services")}
                      className="text-white/50 hover:text-[#FFC21A] text-sm transition-colors flex items-center gap-1.5 group"
                    >
                      <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      {s}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact + Newsletter */}
            <div>
              <h4 className="font-bold text-white mb-5 text-lg">Contact Us</h4>
              <div className="space-y-3 mb-6">
                <a href="tel:9307696221" className="flex items-center gap-2.5 text-white/50 hover:text-[#FFC21A] text-sm transition-colors">
                  <Phone size={14} className="text-[#1E6FFF]" /> 9307696221
                </a>
                <a href="mailto:sksoftech2026@gmail.com" className="flex items-center gap-2.5 text-white/50 hover:text-[#FFC21A] text-sm transition-colors">
                  <Mail size={14} className="text-[#1E6FFF]" /> sksoftech2026@gmail.com
                </a>
                <div className="flex items-start gap-2.5 text-white/50 text-sm">
                  <MapPin size={14} className="text-[#1E6FFF] mt-0.5 shrink-0" /> Pune, Maharashtra, India
                </div>
              </div>

              {/* Newsletter */}
              <h4 className="font-bold text-white mb-3 text-sm uppercase tracking-wide">Stay Updated</h4>
              <form onSubmit={handleNewsletter} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white placeholder-white/30 outline-none focus:border-[#1E6FFF]"
                />
                <button
                  type="submit"
                  disabled={subLoading}
                  className="w-10 h-10 bg-[#1E6FFF] rounded-full flex items-center justify-center hover:bg-[#FFC21A] hover:text-[#0B1F4B] transition-colors disabled:opacity-60"
                >
                  <ArrowRight size={16} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-white/30">
          <p>© 2026 SK Softech and Digital Marketing. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="text-white/40">Pune, Maharashtra</span>
            <span className="text-white/40">Citizen/Public Portal</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
