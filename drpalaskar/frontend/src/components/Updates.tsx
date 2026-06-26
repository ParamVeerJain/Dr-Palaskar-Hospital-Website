"use client";

import Icon from "./Icon";
import { site } from "@/lib/data";
import { useModals } from "./ModalProvider";

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export default function Updates({ limit }: { limit?: number }) {
  const { openArticle } = useModals();
  const list = limit ? site.updates.slice(0, limit) : site.updates;

  return (
    <section className="section bg-bone" id="updates-sec">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">Latest updates</span>
          <h2 className="h2">Orthopaedic health insights</h2>
          <p>Guidance and articles on bone, joint and spine health from our team.</p>
        </div>
        <div className="updates-grid" id="updates">
          {list.map((u, i) => (
            <article key={u.id} className="update-card reveal" data-d={(i % 3) + 1}>
              <div className="update-card__img">
                <span className="cat">{u.cat}</span>
                <div className="ph">
                  <Icon name="pulse" />
                </div>
              </div>
              <div className="update-card__body">
                <div className="update-card__date">
                  <Icon name="calendar" /> {fmtDate(u.date)}
                </div>
                <h3>{u.title}</h3>
                <a className="read clickable" onClick={() => openArticle(u.id)}>
                  Read article <Icon name="arrow" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
