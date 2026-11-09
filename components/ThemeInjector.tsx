import { getSiteContent, THEME_PRESETS } from "@/lib/siteContentStore";

export default function ThemeInjector() {
  const content = getSiteContent();
  const activePaletteId = content?.theme?.activePaletteId || "classic";
  const palette =
    THEME_PRESETS.find((p) => p.id === activePaletteId) || THEME_PRESETS[0];

  const css = `
    :root {
      --navy: ${palette.navy};
      --blue: ${palette.primary};
      --yellow: ${palette.accent};
      --theme-glow: ${palette.glow};
      --theme-gradient: ${palette.gradient};
      --theme-primary-hover: ${palette.primaryHover};
    }
  `;

  return <style id="sk-theme-vars" dangerouslySetInnerHTML={{ __html: css }} />;
}
