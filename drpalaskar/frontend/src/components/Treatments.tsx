"use client";

import Icon from "./Icon";
import { site } from "@/lib/data";
import { useModals } from "./ModalProvider";

export default function Treatments({ limit }: { limit?: number }) {
  const { openTreatment } = useModals();
  const list = limit ? site.treatments.slice(0, limit) : site.treatments;

  return (
    <section className="section bg-mist" id="care">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">What we treat</span>
          <h2 className="h2">Comprehensive orthopaedic treatments</h2>
          <p>
            Specialised care for bones, joints, muscles and the spine — from emergency trauma to
            planned reconstructive surgery. Tap any treatment to learn more.
          </p>
        </div>
        <div className="treat-grid" id="treatments">
          {list.map((t, i) => (
            <article
              key={t.slug}
              className="treat-card reveal"
              data-d={(i % 3) + 1}
              tabIndex={0}
              role="button"
              aria-label={t.name}
              onClick={() => openTreatment(t.slug)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  openTreatment(t.slug);
                }
              }}
            >
              <div className="t-head">
                <div className="t-ic">
                  <Icon name={t.icon} />
                </div>
                <span className="t-num">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="t-title">{t.name}</h3>
              <p className="t-desc">{t.short}</p>
              <span className="t-more">
                Explore care{" "}
                <span className="arr">
                  <Icon name="arrow" />
                </span>
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
