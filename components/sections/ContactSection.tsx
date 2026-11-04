"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import toast from "react-hot-toast";

const services = [
  "Website Development",
  "Software Development",
  "Mobile App Development",
  "Digital Marketing",
  "SEO",
  "Social Media Marketing",
  "Graphic Design & Branding",
  "Video Editing & Content",
  "Custom Printing",
  "IT Support & Maintenance",
  "Other",
];

export default function ContactSection() {
  const [activeTab, setActiveTab] = useState<"contact" | "quote">("contact");
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, type: activeTab }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Message sent! We'll contact you within 24 hours.");
        setForm({ name: "", email: "", phone: "", service: "", message: "" });
      } else {
        toast.error(data.message || "Something went wrong.");
      }
    } catch {
      toast.error("Failed to send. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="section-tag">Get In Touch</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#0B1F4B] mt-2 mb-4">
            Let&apos;s Build Something <span className="gradient-text">Great Together</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Ready to take your business to the next level? Contact us today for a free consultation.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left — Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-[#0B1F4B] rounded-3xl p-8 h-full">
              <h3 className="text-white font-black text-2xl mb-2">Contact Information</h3>
              <p className="text-white/60 mb-8">
                Reach out to us through any channel below. We typically respond within 24 hours.
              </p>

              <div className="space-y-5 mb-10">
                <a
                  href="tel:9307696221"
                  className="flex items-center gap-4 text-white/80 hover:text-[#FFC21A] transition-colors group"
                >
                  <div className="w-12 h-12 bg-[#1E6FFF]/20 group-hover:bg-[#FFC21A]/20 rounded-xl flex items-center justify-center transition-colors">
                    <Phone size={20} className="text-[#1E6FFF] group-hover:text-[#FFC21A]" />
                  </div>
                  <div>
                    <p className="text-xs text-white/40 uppercase tracking-wide">Call Us</p>
                    <p className="font-semibold">9307696221</p>
                  </div>
                </a>
                <a
                  href="mailto:sksoftech2026@gmail.com"
                  className="flex items-center gap-4 text-white/80 hover:text-[#FFC21A] transition-colors group"
                >
                  <div className="w-12 h-12 bg-[#1E6FFF]/20 group-hover:bg-[#FFC21A]/20 rounded-xl flex items-center justify-center transition-colors">
                    <Mail size={20} className="text-[#1E6FFF] group-hover:text-[#FFC21A]" />
                  </div>
                  <div>
                    <p className="text-xs text-white/40 uppercase tracking-wide">Email Us</p>
                    <p className="font-semibold">sksoftech2026@gmail.com</p>
                  </div>
                </a>
                <div className="flex items-center gap-4 text-white/80">
                  <div className="w-12 h-12 bg-[#1E6FFF]/20 rounded-xl flex items-center justify-center">
                    <MapPin size={20} className="text-[#1E6FFF]" />
                  </div>
                  <div>
                    <p className="text-xs text-white/40 uppercase tracking-wide">Location</p>
                    <p className="font-semibold">Pune, Maharashtra, India</p>
                  </div>
                </div>
              </div>

              {/* Social Channels pill tags */}
              <div>
                <p className="text-white/40 text-sm uppercase tracking-widest mb-4">Follow Us Online</p>
                <div className="flex flex-wrap gap-2 text-sm">
                  {["Instagram", "Facebook", "LinkedIn", "YouTube"].map((plat) => (
                    <span
                      key={plat}
                      className="px-4 py-1.5 rounded-full glass text-white/80 font-medium hover:text-[#FFC21A] transition-colors cursor-pointer"
                    >
                      @{plat}
                    </span>
                  ))}
                </div>
              </div>

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/919307696221?text=Hi%20SK%20Softech!%20I%20would%20like%20to%20discuss%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-3 bg-[#25D366] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#128C7E] transition-colors"
              >
                Chat on WhatsApp
              </a>
            </div>
          </motion.div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {/* Tabs */}
            <div className="flex rounded-full bg-gray-100 p-1 mb-6">
              <button
                onClick={() => setActiveTab("contact")}
                className={`flex-1 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  activeTab === "contact"
                    ? "bg-[#0B1F4B] text-white shadow-md"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Send a Message
              </button>
              <button
                onClick={() => setActiveTab("quote")}
                className={`flex-1 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  activeTab === "quote"
                    ? "bg-[#FFC21A] text-[#0B1F4B] shadow-md"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Get Free Quote
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-gray-700 text-sm font-semibold block mb-1.5">Full Name *</label>
                  <input name="name" required value={form.name} onChange={handleChange} className="form-input" placeholder="Your name" />
                </div>
                <div>
                  <label className="text-gray-700 text-sm font-semibold block mb-1.5">Email *</label>
                  <input name="email" type="email" required value={form.email} onChange={handleChange} className="form-input" placeholder="your@email.com" />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-gray-700 text-sm font-semibold block mb-1.5">Phone</label>
                  <input name="phone" value={form.phone} onChange={handleChange} className="form-input" placeholder="9307696221" />
                </div>
                <div>
                  <label className="text-gray-700 text-sm font-semibold block mb-1.5">Service Needed</label>
                  <select name="service" value={form.service} onChange={handleChange} className="form-input">
                    <option value="">Select a service</option>
                    {services.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-gray-700 text-sm font-semibold block mb-1.5">
                  {activeTab === "quote" ? "Project Details *" : "Message *"}
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  className="form-input resize-none"
                  placeholder={
                    activeTab === "quote"
                      ? "Describe your project, requirements, timeline and budget..."
                      : "How can we help you today?"
                  }
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 rounded-full font-bold text-base flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-60 ${
                  activeTab === "quote"
                    ? "btn-yellow"
                    : "btn-primary"
                }`}
              >
                {loading ? "Sending..." : activeTab === "quote" ? "Get My Free Quote" : "Send Message"}
                <Send size={16} />
              </button>
              <p className="text-gray-400 text-xs text-center">
                We respond within 24 hours. Your information is 100% secure.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
