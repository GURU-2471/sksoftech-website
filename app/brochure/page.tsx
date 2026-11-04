"use client";

import Link from "next/link";
import { ArrowLeft, Printer, Phone, Mail, Globe, MapPin, CheckCircle2 } from "lucide-react";

export default function BrochurePage() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-100 py-6 md:py-12 px-4 print:p-0 print:bg-white text-slate-800">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden print:shadow-none print:rounded-none">
        {/* Top bar on screen */}
        <div className="bg-slate-900 text-white px-6 py-3 flex items-center justify-between text-xs print:hidden">
          <Link href="/" className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors">
            <ArrowLeft size={14} /> Back to Website
          </Link>
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 bg-[#1E6FFF] hover:bg-blue-600 px-4 py-1.5 rounded-full font-semibold transition-colors text-white"
          >
            <Printer size={14} /> Save as PDF / Print
          </button>
        </div>

        {/* Brochure Header */}
        <div className="bg-gradient-to-br from-[#0B1F4B] via-[#0c2b6b] to-[#1E6FFF] text-white p-8 md:p-12 relative">
          <div className="inline-block bg-[#FFC21A]/20 text-[#FFC21A] text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full mb-3">
            Company Profile &amp; Services
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-white leading-tight">
            SK Softech <span className="text-[#FFC21A]">&amp; Digital Marketing</span>
          </h1>
          <p className="mt-3 text-slate-200 text-sm md:text-base max-w-2xl leading-relaxed">
            Your Vision | Our Technology | Your Growth. A premier digital engineering agency based in Pune, helping startups and businesses dominate online with modern web systems, apps, and performance marketing.
          </p>

          <div className="mt-8 pt-6 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-medium text-slate-200">
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-[#FFC21A] shrink-0" /> Pune, Maharashtra
            </div>
            <div className="flex items-center gap-2">
              <Phone size={16} className="text-[#FFC21A] shrink-0" /> 9307696221
            </div>
            <div className="flex items-center gap-2">
              <Mail size={16} className="text-[#FFC21A] shrink-0" /> sksoftech2026@gmail.com
            </div>
            <div className="flex items-center gap-2">
              <Globe size={16} className="text-[#FFC21A] shrink-0" /> sksoftech.in
            </div>
          </div>
        </div>

        {/* Brochure Content */}
        <div className="p-8 md:p-12 space-y-10">
          {/* Services Grid */}
          <div>
            <h2 className="text-xl md:text-2xl font-black text-[#0B1F4B] mb-5 border-l-4 border-[#1E6FFF] pl-3">
              Core Capabilities &amp; Services
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { title: "Website Development", desc: "Next.js 15, React, E-Commerce, Portfolios & high-converting business sites." },
                { title: "Custom Software", desc: "Tailored business software, cloud SaaS platforms, and CRM automation." },
                { title: "Mobile Applications", desc: "Cross-platform Android & iOS apps with real-time maps and notifications." },
                { title: "Digital Marketing", desc: "Google Search & Display Ads, Meta (Instagram/Facebook) campaigns for ROI." },
                { title: "SEO Optimization", desc: "Local Pune SEO, technical keyword audit, and page #1 Google rankings." },
                { title: "Branding & Media", desc: "Logos, brand identities, video reels, graphic design, and promotional printing." },
              ].map((s, idx) => (
                <div key={idx} className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4">
                  <h3 className="font-bold text-[#0B1F4B] text-sm mb-1">{s.title}</h3>
                  <p className="text-slate-600 text-xs leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* AI Banner */}
          <div className="bg-slate-950 text-white rounded-2xl p-6 md:p-8">
            <h3 className="text-lg md:text-xl font-black text-[#FFC21A] mb-2">
              🤖 Built-In AI Advantages
            </h3>
            <p className="text-slate-300 text-xs md:text-sm mb-4 leading-relaxed">
              Every digital system we build can integrate modern AI features to lower operational costs and capture leads 24/7:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl text-xs">
                <span className="font-bold text-white block mb-0.5">24/7 AI Chatbot</span>
                <span className="text-slate-400 text-[11px]">Instant client queries &amp; lead capture.</span>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl text-xs">
                <span className="font-bold text-white block mb-0.5">Project Estimator</span>
                <span className="text-slate-400 text-[11px]">Auto budget &amp; scope scoping.</span>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl text-xs">
                <span className="font-bold text-white block mb-0.5">HR Resume Screener</span>
                <span className="text-slate-400 text-[11px]">Automatic job applicant rating.</span>
              </div>
              <div className="bg-slate-900 border border-slate-800 p-3 rounded-xl text-xs">
                <span className="font-bold text-white block mb-0.5">AI Blog Writer</span>
                <span className="text-slate-400 text-[11px]">1-click SEO content generation.</span>
              </div>
            </div>
          </div>

          {/* Pricing Table */}
          <div>
            <h2 className="text-xl md:text-2xl font-black text-[#0B1F4B] mb-5 border-l-4 border-[#1E6FFF] pl-3">
              Engagement Packages
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs md:text-sm border-collapse">
                <thead>
                  <tr className="bg-[#0B1F4B] text-white">
                    <th className="p-3.5 rounded-l-xl">Package</th>
                    <th className="p-3.5">Target Audience</th>
                    <th className="p-3.5">Deliverables</th>
                    <th className="p-3.5 rounded-r-xl">Timeline</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr className="hover:bg-slate-50">
                    <td className="p-3.5 font-bold text-[#0B1F4B]">Starter Business</td>
                    <td className="p-3.5 text-slate-600">Startups &amp; Local Brands</td>
                    <td className="p-3.5 text-slate-600">Responsive site, WhatsApp leads, Contact form, SEO setup</td>
                    <td className="p-3.5 font-semibold text-[#1E6FFF]">1 - 2 Weeks</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-3.5 font-bold text-[#0B1F4B]">Growth Dynamic</td>
                    <td className="p-3.5 text-slate-600">Established Companies</td>
                    <td className="p-3.5 text-slate-600">Full self-service Admin Panel, AI Assistant, dynamic CMS</td>
                    <td className="p-3.5 font-semibold text-[#1E6FFF]">2 - 4 Weeks</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-3.5 font-bold text-[#0B1F4B]">Enterprise / App</td>
                    <td className="p-3.5 text-slate-600">E-Commerce &amp; Portals</td>
                    <td className="p-3.5 text-slate-600">PostgreSQL DB, Payment gateway, Mobile app, Dedicated VPS</td>
                    <td className="p-3.5 font-semibold text-[#1E6FFF]">4 - 8 Weeks</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-8 py-5 flex items-center justify-between text-xs text-slate-500">
          <div>© 2026 SK Softech and Digital Marketing &bull; Pune, Maharashtra</div>
          <div className="font-semibold text-[#0B1F4B]">Call: 9307696221</div>
        </div>
      </div>
    </div>
  );
}
