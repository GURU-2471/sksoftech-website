"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Rahul Sharma",
    company: "RetailBiz Solutions",
    review:
      "SK Softech completely transformed our online presence. Our e-commerce sales doubled within 3 months of launching the new website. Outstanding work!",
    rating: 5,
    initial: "RS",
  },
  {
    name: "Priya Patel",
    company: "QuickEats Restaurant",
    review:
      "The mobile app they built for us is incredible. Real-time tracking, smooth UI and our customers absolutely love it. Highly recommend SK Softech!",
    rating: 5,
    initial: "PP",
  },
  {
    name: "Amit Desai",
    company: "StartupCo Pvt Ltd",
    review:
      "From logo to full branding — the creative team at SK Softech nailed our brand identity. Professional, creative and delivered well ahead of schedule.",
    rating: 5,
    initial: "AD",
  },
  {
    name: "Sneha Kulkarni",
    company: "Fashion Forward",
    review:
      "Our Instagram followers grew 10x in just 3 months! The social media strategy from SK Softech is phenomenal. Best digital marketing team in Pune.",
    rating: 5,
    initial: "SK",
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="section-tag">Client Stories</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#0B1F4B] mt-2 mb-4">
            What Our Clients <span className="gradient-text">Say</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Don't just take our word for it — hear directly from the businesses we've helped grow.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-3xl p-8 md:p-12 shadow-xl relative"
            >
              <Quote size={48} className="text-[#1E6FFF]/10 absolute top-6 left-6" />
              <div className="flex gap-1 mb-6">
                {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                  <Star key={i} size={20} fill="#FFC21A" className="text-[#FFC21A]" />
                ))}
              </div>
              <p className="text-gray-600 text-lg md:text-xl leading-relaxed mb-8 italic">
                &quot;{testimonials[current].review}&quot;
              </p>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-[#1E6FFF] rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {testimonials[current].initial}
                </div>
                <div>
                  <p className="font-bold text-[#0B1F4B] text-lg">{testimonials[current].name}</p>
                  <p className="text-gray-500 text-sm">{testimonials[current].company}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-[#1E6FFF] hover:text-white text-gray-600 transition-all duration-200"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    i === current ? "w-8 bg-[#1E6FFF]" : "w-2.5 bg-gray-300"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-[#1E6FFF] hover:text-white text-gray-600 transition-all duration-200"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
