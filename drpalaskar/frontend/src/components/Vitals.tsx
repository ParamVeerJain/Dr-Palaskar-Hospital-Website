"use client";

import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";
import { site } from "@/lib/data";

function useCountUp(target: number, run: boolean, duration = 1400) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf = 0;
    const start = performance.now();
    const step = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, run, duration]);
  return n;
}

function Vital({ stat, run }: { stat: (typeof site.stats)[number]; run: boolean }) {
  const value = useCountUp(parseInt(stat.value, 10), run);
  return (
    <div className="vital reveal">
      <div className="ic">
        <Icon name={stat.icon} />
      </div>
      <b>
        <span>{value}</span>
        <span className="suf">{stat.suffix}</span>
      </b>
      <span>{stat.label}</span>
    </div>
  );
}

export default function Vitals() {
  const ref = useRef<HTMLDivElement>(null);
  const [run, setRun] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setRun(true);
      return;
    }
    const io = new IntersectionObserver(
      (e) => {
        if (e[0].isIntersecting) {
          setRun(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className="section" style={{ paddingBlock: "clamp(40px,6vw,72px)" }}>
      <div className="container">
        <div className="vitals" ref={ref}>
          {site.stats.map((s) => (
            <Vital key={s.label} stat={s} run={run} />
          ))}
        </div>
      </div>
    </section>
  );
}
