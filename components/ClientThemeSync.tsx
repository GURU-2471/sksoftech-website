"use client";

import { useEffect } from "react";
import { THEME_PRESETS, ADMIN_THEME_PRESETS } from "@/lib/themePresets";

export function applyThemeVariables(paletteId: string) {
  const palette = THEME_PRESETS.find((p) => p.id === paletteId) || THEME_PRESETS[0];
  const root = document.documentElement;

  root.style.setProperty("--navy", palette.navy);
  root.style.setProperty("--blue", palette.primary);
  root.style.setProperty("--yellow", palette.accent);
  root.style.setProperty("--theme-glow", palette.glow);
  root.style.setProperty("--theme-gradient", palette.gradient);
  root.style.setProperty("--theme-primary-hover", palette.primaryHover);
}

export default function ClientThemeSync() {
  useEffect(() => {
    // 1. Immediately apply cached theme from localStorage if available
    const cached = localStorage.getItem("sk_active_theme");
    if (cached) {
      applyThemeVariables(cached);
    }

    // 2. Fetch the active theme from the database/content store
    fetch("/api/admin/content")
      .then((r) => r.json())
      .then((data) => {
        const id = data?.content?.theme?.activePaletteId;
        if (id) {
          localStorage.setItem("sk_active_theme", id);
          applyThemeVariables(id);
        }
      })
      .catch(() => {});

    // 3. Listen for cross-tab or instant in-app storage updates
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "sk_active_theme" && e.newValue) {
        applyThemeVariables(e.newValue);
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return null;
}
