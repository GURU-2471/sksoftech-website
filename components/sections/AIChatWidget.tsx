"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot, Sparkles, User, Phone, HelpCircle } from "lucide-react";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! 👋 I am SK Softech's AI Assistant. How can we help bring your digital vision to life today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [leadMode, setLeadMode] = useState(false);
  const [lead, setLead] = useState({ name: "", phone: "" });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Fetch FAQs configured by Admin
  useEffect(() => {
    fetch("/api/admin/ai-config")
      .then((res) => res.json())
      .then((data) => {
        if (data.faqs) setFaqs(data.faqs.filter((f: FAQItem & { isActive: boolean }) => f.isActive));
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSelectFAQ = async (faq: FAQItem) => {
    const userMsg: Message = { role: "user", content: faq.question };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          selectedQuestionId: faq.id,
          messages: [...messages, userMsg],
        }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply || faq.answer },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: faq.answer },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply || "I am glad to help! Would you like our technical team to contact you?" },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "You can reach our founders directly at 9307696221 for immediate assistance!" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lead.phone) return;
    setLoading(true);
    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadInfo: {
            name: lead.name || "Chat Visitor",
            phone: lead.phone,
            summary: messages.slice(-2).map((m) => m.content).join(" | "),
          },
        }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply || "Thank you! We will call you back shortly." },
      ]);
      setLeadMode(false);
      setLead({ name: "", phone: "" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 right-6 z-50 w-14 h-14 bg-gradient-to-r from-[#1E6FFF] to-[#0B1F4B] text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-105 transition-transform"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open AI Assistant"
      >
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#FFC21A] rounded-full animate-ping" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#FFC21A] rounded-full flex items-center justify-center text-[9px] font-bold text-[#0B1F4B]">
          AI
        </span>
        {isOpen ? <X size={24} /> : <Bot size={26} />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.92 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-40 right-4 sm:right-6 z-50 w-[92vw] sm:w-[390px] h-[550px] bg-slate-950 border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-slate-100"
          >
            {/* Header */}
            <div className="bg-[#0B1F4B] p-4 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#1E6FFF] flex items-center justify-center text-white font-bold">
                  <Bot size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm flex items-center gap-1.5">
                    SK Softech Assistant <Sparkles size={14} className="text-[#FFC21A]" />
                  </h3>
                  <span className="text-[11px] text-[#FFC21A] flex items-center gap-1 font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" /> Verified Answers • 24/7
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white transition-colors p-1"
              >
                <X size={18} />
              </button>
            </div>

            {/* Quick Actions bar */}
            <div className="bg-slate-900/90 px-3 py-2 flex items-center justify-between text-xs border-b border-slate-800">
              <button
                onClick={() => setLeadMode(!leadMode)}
                className="text-[#FFC21A] font-medium hover:underline flex items-center gap-1"
              >
                <Phone size={12} /> {leadMode ? "Back to Chat" : "Request Free Callback"}
              </button>
              <a href="tel:9307696221" className="text-slate-400 hover:text-white">
                9307696221
              </a>
            </div>

            {/* Callback Request Mode */}
            {leadMode ? (
              <form onSubmit={handleLeadSubmit} className="p-6 space-y-4 flex-1 flex flex-col justify-center">
                <div className="text-center mb-2">
                  <h4 className="font-bold text-white text-base">Request Instant Callback</h4>
                  <p className="text-slate-400 text-xs mt-1">Our technical director will call you within 30 mins.</p>
                </div>
                <div>
                  <label className="text-xs text-slate-300 block mb-1">Your Name</label>
                  <input
                    value={lead.name}
                    onChange={(e) => setLead((l) => ({ ...l, name: e.target.value }))}
                    placeholder="Enter your name"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#1E6FFF]"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-300 block mb-1">Phone Number *</label>
                  <input
                    required
                    value={lead.phone}
                    onChange={(e) => setLead((l) => ({ ...l, phone: e.target.value }))}
                    placeholder="e.g. 9307696221"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#1E6FFF]"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-yellow justify-center text-sm py-2.5 mt-2"
                >
                  {loading ? "Sending..." : "Submit Callback Request"}
                </button>
              </form>
            ) : (
              <>
                {/* Messages Container */}
                <div className="flex-1 p-4 overflow-y-auto space-y-3">
                  {messages.map((m, i) => (
                    <div
                      key={i}
                      className={`flex gap-2.5 ${m.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {m.role === "assistant" && (
                        <div className="w-7 h-7 rounded-lg bg-[#1E6FFF]/20 text-[#1E6FFF] flex items-center justify-center shrink-0 text-xs">
                          <Bot size={15} />
                        </div>
                      )}
                      <div
                        className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed ${
                          m.role === "user"
                            ? "bg-[#1E6FFF] text-white rounded-br-none"
                            : "bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none"
                        }`}
                      >
                        {m.content}
                      </div>
                      {m.role === "user" && (
                        <div className="w-7 h-7 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center shrink-0 text-xs">
                          <User size={14} />
                        </div>
                      )}
                    </div>
                  ))}
                  {loading && (
                    <div className="flex items-center gap-2 text-slate-400 text-xs">
                      <Bot size={14} className="animate-spin text-[#1E6FFF]" />
                      <span>Fetching verified answer...</span>
                    </div>
                  )}

                  {/* Specific Pre-Set Questions (Admin configured) */}
                  {faqs.length > 0 && messages.length <= 4 && (
                    <div className="pt-2">
                      <p className="text-[11px] font-bold text-slate-400 mb-2 flex items-center gap-1">
                        <HelpCircle size={13} className="text-[#FFC21A]" /> Popular Questions:
                      </p>
                      <div className="flex flex-col gap-1.5">
                        {faqs.map((faq) => (
                          <button
                            key={faq.id}
                            onClick={() => handleSelectFAQ(faq)}
                            className="text-left text-xs bg-slate-900/90 hover:bg-[#1E6FFF]/20 hover:border-[#1E6FFF] border border-slate-800 text-slate-300 hover:text-white px-3 py-2 rounded-xl transition-all"
                          >
                            💬 {faq.question}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Chat Input */}
                <div className="p-3 bg-slate-900 border-t border-slate-800 flex items-center gap-2">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Ask about website, apps, cost, SEO..."
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-full px-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#1E6FFF]"
                  />
                  <button
                    onClick={handleSend}
                    disabled={loading || !input.trim()}
                    className="w-9 h-9 rounded-full bg-[#1E6FFF] hover:bg-[#0B1F4B] text-white flex items-center justify-center transition-colors disabled:opacity-40"
                  >
                    <Send size={14} />
                  </button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
