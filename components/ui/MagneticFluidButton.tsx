"use client";

import { useState, useRef, MouseEvent } from "react";
import { motion } from "framer-motion";

interface MagneticFluidButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary" | "gold";
  href?: string;
}

export default function MagneticFluidButton({
  children,
  onClick,
  className = "",
  variant = "primary",
  href,
}: MagneticFluidButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [mouseInside, setMouseInside] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (!buttonRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();

    // Magnetic pull displacement (subtle pull towards cursor)
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.18, y: middleY * 0.18 });

    // Fluid inner glow coordinate
    setMouseInside({
      x: clientX - left,
      y: clientY - top,
    });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setPosition({ x: 0, y: 0 });
  };

  const variantStyles = {
    primary:
      "bg-gradient-to-r from-blue-600 via-[#1E6FFF] to-sky-500 text-white shadow-[0_0_25px_rgba(30,111,255,0.35)] border border-blue-400/30",
    secondary:
      "bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 shadow-md",
    gold:
      "bg-gradient-to-r from-amber-500 via-[#FFC21A] to-amber-400 text-slate-950 font-black shadow-[0_0_25px_rgba(245,158,11,0.35)] border border-amber-300/40",
  };

  const content = (
    <motion.span
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 250, damping: 18 }}
      className="relative z-10 flex items-center justify-center gap-2"
    >
      {children}
    </motion.span>
  );

  const fluidGlow = (
    <div
      className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      style={{
        background: `radial-gradient(120px circle at ${mouseInside.x}px ${mouseInside.y}px, rgba(255, 255, 255, 0.28), transparent 75%)`,
      }}
    />
  );

  const sharedClasses = `group relative inline-flex items-center justify-center px-6 py-3.5 rounded-2xl font-bold text-xs uppercase tracking-wider overflow-hidden transition-all duration-200 cursor-pointer ${variantStyles[variant]} ${className}`;

  if (href) {
    return (
      <a
        ref={buttonRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={sharedClasses}
      >
        {fluidGlow}
        {content}
      </a>
    );
  }

  return (
    <button
      ref={buttonRef as React.RefObject<HTMLButtonElement>}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={sharedClasses}
    >
      {fluidGlow}
      {content}
    </button>
  );
}
