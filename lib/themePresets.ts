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

export interface AdminThemePalette {
  id: string;
  name: string;
  subtitle: string;
  bg: string;
  cardBg: string;
  border: string;
  accent: string;
  text: string;
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

export const ADMIN_THEME_PRESETS: AdminThemePalette[] = [
  {
    id: "obsidian",
    name: "Obsidian Onyx",
    subtitle: "Deep neutral carbon, slate cards & electric blue highlights",
    bg: "#080c14",
    cardBg: "#0f1624",
    border: "#1e293b",
    accent: "#1E6FFF",
    text: "#f8fafc",
  },
  {
    id: "royal-navy",
    name: "Royal Navy & Amber",
    subtitle: "Corporate deep navy with warm gold badges & accents",
    bg: "#060d1e",
    cardBg: "#0c1733",
    border: "#172554",
    accent: "#FFC21A",
    text: "#ffffff",
  },
  {
    id: "emerald-dark",
    name: "Emerald Titanium",
    subtitle: "Dark graphite with refined mint & growth indicators",
    bg: "#061210",
    cardBg: "#0c1f1a",
    border: "#134e4a",
    accent: "#10B981",
    text: "#ecfdf5",
  },
  {
    id: "carbon-noir",
    name: "Minimal Carbon Luxe",
    subtitle: "Matte black, bronze amber accents & subtle borders",
    bg: "#0f0f11",
    cardBg: "#18181c",
    border: "#292524",
    accent: "#F59E0B",
    text: "#fafaf9",
  },
];
