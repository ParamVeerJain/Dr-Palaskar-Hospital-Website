"use client";

import { useEffect } from "react";

/**
 * Stethoscope custom cursor. Only active on fine-pointer (mouse) devices and
 * when the user hasn't requested reduced motion — exactly like the static site.
 */
export default function Cursor() {
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    document.body.classList.add("has-cursor");

    const cur = document.createElement("div");
    cur.className = "cursor";
    cur.innerHTML = `<svg viewBox="0 0 48 48" fill="none">
      <g stroke="#0A6463" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" fill="#fff">
        <path d="M14 6v8a8 8 0 0 0 16 0V6" fill="none"/>
        <path d="M22 26v3a9 9 0 0 0 18 0v-5" fill="none"/>
        <circle cx="40" cy="22" r="4.5" fill="#16BFB8" stroke="#0A6463"/>
        <circle cx="40" cy="22" r="1.6" fill="#fff" stroke="none"/>
        <circle cx="14" cy="6" r="2.4" fill="#0A6463" stroke="none"/>
        <circle cx="30" cy="6" r="2.4" fill="#0A6463" stroke="none"/>
      </g></svg>`;
    const ring = document.createElement("div");
    ring.className = "cursor-ring";
    const dot = document.createElement("div");
    dot.className = "cursor-dot";
    document.body.append(cur, ring, dot);

    let mx = window.innerWidth / 2,
      my = window.innerHeight / 2,
      rx = mx,
      ry = my;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      cur.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
      dot.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
    };
    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(loop);
    };

    const hot = "a,button,.clickable,input,select,textarea,.gtile,.treat-card,label";
    const over = (e: Event) => {
      if ((e.target as HTMLElement).closest(hot)) {
        cur.classList.add("is-active");
        ring.classList.add("is-active");
      }
    };
    const out = (e: Event) => {
      if ((e.target as HTMLElement).closest(hot)) {
        cur.classList.remove("is-active");
        ring.classList.remove("is-active");
      }
    };
    const leave = () => {
      cur.style.opacity = ring.style.opacity = dot.style.opacity = "0";
    };
    const enter = () => {
      cur.style.opacity = ring.style.opacity = dot.style.opacity = "1";
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", over);
    document.addEventListener("mouseout", out);
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);
    loop();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", over);
      document.removeEventListener("mouseout", out);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
      cur.remove();
      ring.remove();
      dot.remove();
      document.body.classList.remove("has-cursor");
    };
  }, []);

  return null;
}
