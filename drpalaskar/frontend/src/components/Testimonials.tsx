"use client";

import { useRef, useState } from "react";
import Icon from "./Icon";
import { site, type Testimonial } from "@/lib/data";

function initialsOf(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
}

function Card({ t }: { t: Testimonial }) {
  const [expanded, setExpanded] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);
  return (
    <article className="testi-card">
      <span className="quote">
        <Icon name="quote" />
      </span>
      <div className="stars">
        {Array.from({ length: 5 }).map((_, i) => (
          <Icon key={i} name="star" />
        ))}
      </div>
      <p className={`txt ${expanded ? "expanded" : ""}`}>{t.text}</p>
      <button className="more-btn" onClick={() => setExpanded((v) => !v)}>
        {expanded ? "Read less" : "Read more"}
      </button>
      <div className="who">
        {imgFailed ? (
          <span className="pic">{initialsOf(t.name)}</span>
        ) : (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img className="pic" src={t.pic} alt={t.name} loading="lazy" onError={() => setImgFailed(true)} />
        )}
        <div>
          <b>{t.name}</b>
          <span>Verified patient</span>
        </div>
      </div>
    </article>
  );
}

export default function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);
  const step = () =>
    Math.min(420, ((trackRef.current?.firstElementChild as HTMLElement)?.offsetWidth ?? 398) + 22);

  return (
    <section className="section" id="reviews">
      <div className="container">
        <div
          className="section-head reveal"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: 20,
            maxWidth: "100%",
            flexWrap: "wrap",
          }}
        >
          <div style={{ maxWidth: 620 }}>
            <span className="eyebrow">Patient stories</span>
            <h2 className="h2" style={{ marginTop: 14 }}>
              What our patients say
            </h2>
            <p style={{ marginTop: 14 }}>Real experiences from people we&apos;ve cared for across Vasai-Virar.</p>
          </div>
          <div className="testi-nav">
            <button
              aria-label="Previous review"
              onClick={() => trackRef.current?.scrollBy({ left: -step(), behavior: "smooth" })}
            >
              <Icon name="arrowL" />
            </button>
            <button
              aria-label="Next review"
              onClick={() => trackRef.current?.scrollBy({ left: step(), behavior: "smooth" })}
            >
              <Icon name="arrow" />
            </button>
          </div>
        </div>
        <div className="testi-wrap">
          <div className="testi-track" ref={trackRef}>
            {site.testimonials.map((t) => (
              <Card key={t.name} t={t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
