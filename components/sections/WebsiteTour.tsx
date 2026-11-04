"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight, ArrowLeft, X, Compass, CheckCircle2 } from "lucide-react";

interface TourStep {
  title: string;
  description: string;
  badge: string;
  targetId: string;
}

const tourSteps: TourStep[] = [
  {
    badge: "Step 1 of 5",
    title: "Explore 11+ Digital Services",
    description: "Browse our complete range of capabilities: Web, Mobile Apps, Digital Marketing, SEO, and IT solutions tailored for your business.",
    targetId: "services",
  },
  {
    badge: "Step 2 of 5",
    title: "Calculate Instant AI Cost & Scope",
    description: "Type your project idea into our AI Scoping Tool to get an instant timeline and price bracket in seconds.",
    targetId: "estimator",
  },
  {
    badge: "Step 3 of 5",
    title: "Inspect Past Client Case Studies",
    description: "Check out our featured portfolio projects across E-Commerce, Mobile, and branding with proven client results.",
    targetId: "portfolio",
  },
  {
    badge: "Step 4 of 5",
    title: "Get Answers in the FAQ Section",
    description: "Read verified questions and answers about our delivery timelines, pricing packages, and ongoing support.",
    targetId: "faq",
  },
  {
    badge: "Step 5 of 5",
    title: "Claim Your Free Consultation",
    description: "Submit a quote request or reach our founders directly on WhatsApp / phone at 9307696221.",
    targetId: "contact",
  },
];

export default function WebsiteTour() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Check 24-hour expiration in localStorage
    try {
      const lastSeen = localStorage.getItem("sk_tour_last_seen");
      const now = Date.now();
      const twentyFourHours = 24 * 60 * 60 * 1000;

      if (!lastSeen || now - parseInt(lastSeen, 10) > twentyFourHours) {
        // Show after 1.5s delay to let page load smoothly
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 1500);
        return () => clearTimeout(timer);
      }
    } catch {
      // Fallback
    }
  }, []);

  const dismissTour = () => {
    setIsVisible(false);
    try {
      localStorage.setItem("sk_tour_last_seen", Date.now().toString());
    } catch {}
  };

  const goToStep = (stepIndex: number) => {
    setCurrentStep(stepIndex);
    const target = document.getElementById(tourSteps[stepIndex].targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const nextStep = () => {
    if (currentStep < tourSteps.length - 1) {
      goToStep(currentStep + 1);
    } else {
      dismissTour();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      goToStep(currentStep - 1);
    }
  };

  return (
    <>
      {/* Floating Tour Launcher (Always accessible if user wants to take the tour again) */}
      {!isVisible && (
        <button
          onClick={() => {
            setIsVisible(true);
            goToStep(0);
          }}
          className="fixed bottom-6 left-6 z-40 bg-slate-900/90 hover:bg-[#1E6FFF] text-white border border-slate-700/80 px-3.5 py-2 rounded-full text-xs font-semibold flex items-center gap-2 shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105"
        >
          <Compass size={14} className="text-[#FFC21A]" />
          Take 1-Min Tour
        </button>
      )}

      {/* Guided Tour Modal Card */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 left-4 sm:left-6 z-50 w-[92vw] sm:w-[380px] bg-slate-950/95 border border-slate-800 rounded-3xl p-5 shadow-2xl backdrop-blur-xl text-white"
          >
            {/* Top Row */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#1E6FFF]/20 text-[#1E6FFF] border border-[#1E6FFF]/30">
                {tourSteps[currentStep].badge}
              </span>
              <button
                onClick={dismissTour}
                className="text-slate-400 hover:text-white p-1 transition-colors"
                title="Close Tour"
              >
                <X size={16} />
              </button>
            </div>

            {/* Step Content */}
            <h3 className="text-base font-bold text-white mb-1.5 flex items-center gap-1.5">
              <Sparkles size={16} className="text-[#FFC21A] shrink-0" />
              {tourSteps[currentStep].title}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              {tourSteps[currentStep].description}
            </p>

            {/* Step Indicators */}
            <div className="flex items-center gap-1.5 mb-4">
              {tourSteps.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === currentStep
                      ? "w-7 bg-[#FFC21A]"
                      : i < currentStep
                      ? "w-2 bg-[#1E6FFF]"
                      : "w-2 bg-slate-800"
                  }`}
                />
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
              <button
                onClick={prevStep}
                disabled={currentStep === 0}
                className="text-xs text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400 flex items-center gap-1"
              >
                <ArrowLeft size={13} /> Back
              </button>

              <button
                onClick={nextStep}
                className="btn-yellow text-xs px-4 py-2 font-bold"
              >
                {currentStep === tourSteps.length - 1 ? (
                  <>
                    Finish Tour <CheckCircle2 size={13} />
                  </>
                ) : (
                  <>
                    Next Step <ArrowRight size={13} />
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
