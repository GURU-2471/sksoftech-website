"use client";

import { motion } from "framer-motion";
import { Lightbulb, Clock, DollarSign, Users, HeadphonesIcon, CheckCircle } from "lucide-react";

const reasons = [
  {
    icon: Lightbulb,
    title: "Creative & Innovative Approach",
    desc: "We think outside the box to deliver unique, impactful solutions tailored to your brand's vision.",
  },
  {
    icon: Clock,
    title: "On-Time Delivery",
    desc: "We respect your deadlines. Projects are delivered on time, every time — no excuses.",
  },
  {
    icon: DollarSign,
    title: "Affordable & Transparent Pricing",
    desc: "Quality digital services at prices that make sense. No hidden costs, no surprises.",
  },
  {
    icon: Users,
    title: "Experienced Team",
    desc: "A passionate team of designers, developers and marketers with proven industry experience.",
  },
  {
    icon: HeadphonesIcon,
    title: "Dedicated Customer Support",
    desc: "We are with you even after project delivery. Ongoing support when you need us most.",
  },
];

export default function WhyChooseUsSection() {
  return (
    <section className="py-20 bg-[#0B1F4B] relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#1E6FFF]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#FFC21A]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block bg-[#FFC21A]/20 text-[#FFC21A] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-3">
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white">
            Why Businesses Trust{" "}
            <span className="text-[#FFC21A]">SK Softech</span>
          </h2>
          <p className="text-white/60 mt-4 max-w-xl mx-auto">
            From Concept to Completion... We&apos;ve Got You!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="glass rounded-2xl p-7 group hover:bg-white/15 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#FFC21A]/20 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-[#FFC21A] transition-colors duration-300">
                    <Icon size={22} className="text-[#FFC21A] group-hover:text-[#0B1F4B] transition-colors duration-300" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg mb-2">{reason.title}</h3>
                    <p className="text-white/60 text-sm leading-relaxed">{reason.desc}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* CTA card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="bg-[#FFC21A] rounded-2xl p-7 flex flex-col justify-between"
          >
            <div>
              <CheckCircle size={36} className="text-[#0B1F4B] mb-4" />
              <h3 className="text-[#0B1F4B] font-black text-xl mb-2">
                Custom Solutions for Every Business Need
              </h3>
              <p className="text-[#0B1F4B]/70 text-sm leading-relaxed">
                Whatever your challenge, we have the expertise to solve it with technology and creativity.
              </p>
            </div>
            <button
              onClick={() =>
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
              }
              className="mt-6 bg-[#0B1F4B] text-white font-bold px-6 py-3 rounded-full hover:bg-[#1E6FFF] transition-colors duration-300"
            >
              Contact Us Today →
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
