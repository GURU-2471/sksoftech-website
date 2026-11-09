"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function VisitorTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Only track visitor pages, not admin routes
    if (pathname.startsWith("/admin")) return;

    // Use requestIdleCallback or setTimeout so tracking never impacts initial page paint or interaction
    const trackVisitor = () => {
      try {
        const device =
          window.innerWidth < 768
            ? "Mobile"
            : window.innerWidth < 1024
            ? "Tablet"
            : "Desktop";

        fetch("/api/analytics/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          keepalive: true,
          body: JSON.stringify({
            path: pathname,
            referrer: document.referrer || "Direct",
            device,
          }),
        }).catch(() => {});
      } catch {}
    };

    if (typeof window !== "undefined") {
      if ("requestIdleCallback" in window) {
        (window as any).requestIdleCallback(trackVisitor);
      } else {
        setTimeout(trackVisitor, 1200);
      }
    }
  }, [pathname]);

  return null;
}
