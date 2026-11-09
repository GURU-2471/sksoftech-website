"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function VisitorTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Only track visitor pages, not /admin internal dashboard
    if (pathname.startsWith("/admin")) return;

    const device =
      window.innerWidth < 768
        ? "Mobile"
        : window.innerWidth < 1024
        ? "Tablet"
        : "Desktop";

    // Send beacon or fetch track
    try {
      fetch("/api/analytics/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          path: pathname,
          referrer: document.referrer || "Direct",
          device,
        }),
      }).catch(() => {});
    } catch {
      // Non-blocking
    }
  }, [pathname]);

  return null;
}
