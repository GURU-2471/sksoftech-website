"use client";

import { useState, useEffect } from "react";
import { Menu, X, Phone, ChevronRight } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Careers", href: "#careers" },
  { label: "FAQs", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      // Track active section
      const sections = navLinks.map((l) => l.href.replace("#", ""));
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(section);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0B1F4B]/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            onClick={() => scrollTo("#home")}
            className="flex items-center gap-2 group"
          >
            <div className="relative">
              <div className="w-10 h-10 bg-[#1E6FFF] rounded-lg flex items-center justify-center font-black text-white text-lg group-hover:bg-[#FFC21A] transition-colors duration-300">
                SK
              </div>
            </div>
            <div className="text-left">
              <div className="font-black text-white text-lg leading-tight">
                SK Softech
              </div>
              <div className="text-[#FFC21A] text-xs font-semibold leading-tight">
                and Digital Marketing
              </div>
            </div>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeSection === link.href.replace("#", "")
                    ? "bg-[#1E6FFF] text-white"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <a
              href="tel:9307696221"
              className="hidden lg:flex items-center gap-2 text-white/80 hover:text-[#FFC21A] transition-colors text-sm"
            >
              <Phone size={14} />
              9307696221
            </a>
            <button
              onClick={() => scrollTo("#contact")}
              className="hidden md:flex btn-yellow text-sm px-5 py-2.5"
            >
              Free Quote <ChevronRight size={14} />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-white p-2"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-[#0B1F4B] border-t border-white/10 px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="w-full text-left px-4 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors font-medium"
            >
              {link.label}
            </button>
          ))}
          <div className="pt-3 flex flex-col gap-2">
            <a
              href="tel:9307696221"
              className="flex items-center gap-2 text-[#FFC21A] px-4 py-2 font-semibold"
            >
              <Phone size={16} /> 9307696221
            </a>
            <button
              onClick={() => scrollTo("#contact")}
              className="btn-yellow w-full justify-center"
            >
              Get Free Quote <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
