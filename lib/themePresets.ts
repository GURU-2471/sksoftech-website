export interface ThemePalette {
  id: string;
  name: string;
  subtitle: string;
  primary: string;
  primaryHover: string;
  accent: string;
  navy: string;
  glow: string;
  gradient: string;
}

export const THEME_PRESETS: ThemePalette[] = [
  {
    id: "classic",
    name: "Classic SK Signature",
    subtitle: "Original Royal Navy, Electric Blue & Amber Gold",
    primary: "#1E6FFF",
    primaryHover: "#1558CC",
    accent: "#FFC21A",
    navy: "#0B1F4B",
    glow: "rgba(30, 111, 255, 0.35)",
    gradient: "linear-gradient(135deg, #1E6FFF 0%, #FFC21A 100%)",
  },
  {
    id: "cyber",
    name: "Cyber Neon Matrix",
    subtitle: "High-Tech Neon Cyan, Violet & Deep Space",
    primary: "#00F0FF",
    primaryHover: "#00C4D4",
    accent: "#A855F7",
    navy: "#060A14",
    glow: "rgba(0, 240, 255, 0.4)",
    gradient: "linear-gradient(135deg, #00F0FF 0%, #A855F7 100%)",
  },
  {
    id: "emerald",
    name: "Emerald Tech Growth",
    subtitle: "Vibrant Mint Green, Deep Forest & Sky Teal",
    primary: "#10B981",
    primaryHover: "#059669",
    accent: "#38BDF8",
    navy: "#06281D",
    glow: "rgba(16, 185, 129, 0.35)",
    gradient: "linear-gradient(135deg, #10B981 0%, #38BDF8 100%)",
  },
  {
    id: "gold",
    name: "Royal Gold & Bronze",
    subtitle: "Luxury Warm Gold, Amber Flare & Obsidian",
    primary: "#F59E0B",
    primaryHover: "#D97706",
    accent: "#FB923C",
    navy: "#1C1917",
    glow: "rgba(245, 158, 11, 0.35)",
    gradient: "linear-gradient(135deg, #F59E0B 0%, #FB923C 100%)",
  },
  {
    id: "crimson",
    name: "Crimson Energy",
    subtitle: "Passionate Ruby Red, Rose & Dark Carbon",
    primary: "#EF4444",
    primaryHover: "#DC2626",
    accent: "#F43F5E",
    navy: "#1F0B14",
    glow: "rgba(239, 68, 68, 0.35)",
    gradient: "linear-gradient(135deg, #EF4444 0%, #F43F5E 100%)",
  },
  {
    id: "ocean",
    name: "Ocean Sapphire",
    subtitle: "Deep Atlantic Blue, Aqua Wave & Midnight Navy",
    primary: "#2563EB",
    primaryHover: "#1D4ED8",
    accent: "#06B6D4",
    navy: "#0A192F",
    glow: "rgba(37, 99, 235, 0.35)",
    gradient: "linear-gradient(135deg, #2563EB 0%, #06B6D4 100%)",
  },
];
