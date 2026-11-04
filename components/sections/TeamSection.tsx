"use client";

import { motion } from "framer-motion";

const team = [
  {
    name: "SK Founder",
    designation: "CEO & Founder",
    initial: "SK",
    bio: "Visionary leader with 5+ years in tech and digital marketing.",
    color: "#1E6FFF",
  },
  {
    name: "Lead Developer",
    designation: "Head of Development",
    initial: "LD",
    bio: "Full-stack engineer passionate about building scalable digital products.",
    color: "#7C3AED",
  },
  {
    name: "Creative Director",
    designation: "Design & Branding",
    initial: "CD",
    bio: "Award-winning designer crafting brand identities that leave a lasting impact.",
    color: "#EC4899",
  },
  {
    name: "Marketing Head",
    designation: "Digital Marketing",
    initial: "MH",
    bio: "Data-driven marketer turning clicks into customers and brands into legends.",
    color: "#059669",
  },
];

export default function TeamSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="section-tag">Our Team</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#0B1F4B] mt-2 mb-4">
            Meet The <span className="gradient-text">Experts</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            A passionate team of creative minds and technical experts dedicated to your success.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group text-center card-hover bg-white rounded-2xl p-8 border border-gray-100"
            >
              {/* Avatar */}
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center text-white font-black text-2xl mx-auto mb-4 transition-transform group-hover:scale-110 duration-300 shadow-md"
                style={{ background: `linear-gradient(135deg, ${member.color}, ${member.color}99)` }}
              >
                {member.initial}
              </div>
              <h3 className="font-black text-[#0B1F4B] text-lg mb-1">{member.name}</h3>
              <p className="text-[#1E6FFF] text-sm font-semibold mb-3">{member.designation}</p>
              <p className="text-gray-500 text-sm leading-relaxed mb-4">{member.bio}</p>
              <div className="inline-block px-3 py-1 bg-slate-100 rounded-full text-xs font-medium text-slate-600">
                SK Softech Core Team
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
