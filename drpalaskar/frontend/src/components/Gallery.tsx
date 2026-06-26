"use client";

import Icon from "./Icon";
import { site } from "@/lib/data";
import { onImgError } from "@/lib/img";
import { useModals } from "./ModalProvider";

const SPANS = ["wide", "", "", "", "", "", "", "", "tall", "", "", "wide"];

export default function Gallery({ limit }: { limit?: number }) {
  const { openLightbox } = useModals();
  const list = limit ? site.gallery.slice(0, limit) : site.gallery;

  return (
    <section className="section bg-mist" id="gallery-sec">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">Our space</span>
          <h2 className="h2">A look around the hospital</h2>
          <p>Reception, consultation rooms, diagnostics and operating theatres. Tap any photo to enlarge.</p>
        </div>
        <div className="gallery" id="gallery">
          {list.map((src, i) => (
            <figure
              key={i}
              className={`gtile reveal ${limit ? "" : SPANS[i % SPANS.length]}`}
              tabIndex={0}
              onClick={() => openLightbox(i)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  openLightbox(i);
                }
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`Dr. Palaskar Hospital — facility photo ${i + 1}`}
                loading="lazy"
                onError={onImgError("Hospital")}
              />
              <span className="zoom">
                <Icon name="zoom" />
              </span>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
