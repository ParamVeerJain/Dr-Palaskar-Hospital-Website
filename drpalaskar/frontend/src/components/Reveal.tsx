"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Mirrors the static site's reveal-on-scroll behaviour.
 * Rendered once in the layout; re-scans on route change. Markup just needs
 * className="reveal" (and optional data-d="1..5" for stagger) — no wrappers.
 */
export default function RevealOnScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (typeof IntersectionObserver === "undefined") {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => {
      if (!el.classList.contains("in")) io.observe(el);
    });
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
