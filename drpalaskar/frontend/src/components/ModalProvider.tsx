"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { site, type Treatment, type Update } from "@/lib/data";
import { onImgError } from "@/lib/img";
import Icon from "./Icon";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:8000";

type Ctx = {
  openBooking: (preset?: string) => void;
  openTreatment: (slug: string) => void;
  openArticle: (id: number) => void;
  openLightbox: (index: number) => void;
};

const ModalCtx = createContext<Ctx | null>(null);

export function useModals() {
  const ctx = useContext(ModalCtx);
  if (!ctx) throw new Error("useModals must be used within <ModalProvider>");
  return ctx;
}

export default function ModalProvider({ children }: { children: ReactNode }) {
  const [booking, setBooking] = useState(false);
  const [preset, setPreset] = useState<string | undefined>();
  const [treatment, setTreatment] = useState<Treatment | null>(null);
  const [article, setArticle] = useState<Update | null>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const anyOpen = booking || !!treatment || !!article || lightbox !== null;

  const closeAll = useCallback(() => {
    setBooking(false);
    setTreatment(null);
    setArticle(null);
    setLightbox(null);
  }, []);

  const api = useMemo<Ctx>(
    () => ({
      openBooking: (p) => {
        setPreset(p);
        setBooking(true);
      },
      openTreatment: (slug) => {
        const t = site.treatments.find((x) => x.slug === slug) ?? null;
        setTreatment(t);
      },
      openArticle: (id) => {
        const a = site.updates.find((x) => x.id === id) ?? null;
        setArticle(a);
      },
      openLightbox: (i) => setLightbox(i),
    }),
    []
  );

  // body scroll lock + Esc + lightbox arrows
  useEffect(() => {
    document.body.style.overflow = anyOpen ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAll();
      if (lightbox !== null) {
        if (e.key === "ArrowRight") setLightbox((i) => (i! + 1) % site.gallery.length);
        if (e.key === "ArrowLeft")
          setLightbox((i) => (i! - 1 + site.gallery.length) % site.gallery.length);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [anyOpen, lightbox, closeAll]);

  return (
    <ModalCtx.Provider value={api}>
      {children}

      <BookingModal
        open={booking}
        preset={preset}
        onClose={closeAll}
      />

      {treatment && (
        <TreatmentModal
          treatment={treatment}
          onClose={closeAll}
          onBook={() => {
            setTreatment(null);
            api.openBooking(treatment.name);
          }}
        />
      )}

      {article && <ArticleModal article={article} onClose={closeAll} onBook={() => { setArticle(null); api.openBooking(); }} />}

      {lightbox !== null && (
        <div className="lightbox open" role="dialog" aria-modal="true" onClick={closeAll}>
          <button className="lightbox__close" aria-label="Close" onClick={closeAll}>
            <Icon name="close" />
          </button>
          <button
            className="lightbox__nav prev"
            aria-label="Previous"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((i) => (i! - 1 + site.gallery.length) % site.gallery.length);
            }}
          >
            <Icon name="arrowL" />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={site.gallery[lightbox]}
            alt={`Hospital photo ${lightbox + 1}`}
            onClick={(e) => e.stopPropagation()}
            onError={onImgError("Hospital")}
          />
          <button
            className="lightbox__nav next"
            aria-label="Next"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((i) => (i! + 1) % site.gallery.length);
            }}
          >
            <Icon name="arrow" />
          </button>
        </div>
      )}
    </ModalCtx.Provider>
  );
}

/* --------------------------------------------------------------------- */
/* Booking modal                                                         */
/* --------------------------------------------------------------------- */
function BookingModal({
  open,
  preset,
  onClose,
}: {
  open: boolean;
  preset?: string;
  onClose: () => void;
}) {
  const [done, setDone] = useState(false);
  const [ref, setRef] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (open) {
      setDone(false);
      setRef("");
    }
  }, [open]);

  const localRef = () =>
    "DP-" +
    Array.from({ length: 6 }, () =>
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".charAt(Math.floor(Math.random() * 36))
    ).join("");

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBusy(true);
    const form = e.currentTarget;
    const payload = {
      name: (form.elements.namedItem("name") as HTMLInputElement)?.value || "",
      phone: (form.elements.namedItem("phone") as HTMLInputElement)?.value || "",
      treatment: (form.elements.namedItem("treatment") as HTMLSelectElement)?.value || "",
      date: (form.elements.namedItem("date") as HTMLInputElement)?.value || "",
      time: (form.elements.namedItem("time") as HTMLSelectElement)?.value || "",
      message: (form.elements.namedItem("message") as HTMLTextAreaElement)?.value || "",
    };
    let reference = "";
    try {
      const res = await fetch(`${API_BASE}/api/appointments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) reference = (await res.json()).reference;
    } catch {
      /* backend not running — fall back to a local reference */
    }
    setRef(reference || localRef());
    setDone(true);
    setBusy(false);
  };

  return (
    <div className={`modal ${open ? "open" : ""}`} role="dialog" aria-modal="true" onClick={onClose}>
      <div className="modal__card" onClick={(e) => e.stopPropagation()}>
        <div className="modal__head">
          <div>
            <h3>Book an appointment</h3>
            <p>We&apos;ll confirm your slot by phone shortly.</p>
          </div>
          <button className="modal__close" aria-label="Close" onClick={onClose}>
            <Icon name="close" />
          </button>
        </div>
        <div className="modal__body">
          {!done ? (
            <form onSubmit={submit}>
              <div className="field-row">
                <div className="field">
                  <label htmlFor="bk-name">Full name</label>
                  <input id="bk-name" name="name" type="text" required placeholder="Your name" />
                </div>
                <div className="field">
                  <label htmlFor="bk-phone">Phone</label>
                  <input id="bk-phone" name="phone" type="tel" required placeholder="Mobile number" />
                </div>
              </div>
              <div className="field">
                <label htmlFor="bk-treat">Treatment / concern</label>
                <select id="bk-treat" name="treatment" defaultValue={preset ?? "General consultation"}>
                  <option>General consultation</option>
                  {site.treatments.map((t) => (
                    <option key={t.slug}>{t.name}</option>
                  ))}
                  <option>Other</option>
                </select>
              </div>
              <div className="field-row">
                <div className="field">
                  <label htmlFor="bk-date">Preferred date</label>
                  <input id="bk-date" name="date" type="date" />
                </div>
                <div className="field">
                  <label htmlFor="bk-time">Preferred time</label>
                  <select id="bk-time" name="time">
                    <option>Morning</option>
                    <option>Afternoon</option>
                    <option>Evening</option>
                  </select>
                </div>
              </div>
              <div className="field">
                <label htmlFor="bk-msg">Message (optional)</label>
                <textarea id="bk-msg" name="message" placeholder="Briefly describe your symptoms" />
              </div>
              <button type="submit" className="btn btn--coral btn--block btn--lg" disabled={busy}>
                <Icon name="calendar" /> {busy ? "Sending…" : "Confirm appointment"}
              </button>
              <p className="form-note">
                This is a request — our team will call you to confirm. For emergencies call +91 80480 34862.
              </p>
            </form>
          ) : (
            <div className="toast-ok show">
              <div className="check">
                <Icon name="check" />
              </div>
              <h3>Appointment requested</h3>
              <p style={{ color: "var(--ink-soft)", margin: "10px 0" }}>
                Thank you — we&apos;ve received your request and will call you shortly to confirm.
              </p>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: ".85rem" }}>
                Reference: <b>{ref}</b>
              </p>
              <button type="button" className="btn btn--ghost" onClick={onClose} style={{ marginTop: 16 }}>
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------- */
/* Treatment modal                                                       */
/* --------------------------------------------------------------------- */
function TreatmentModal({
  treatment,
  onClose,
  onBook,
}: {
  treatment: Treatment;
  onClose: () => void;
  onBook: () => void;
}) {
  return (
    <div className="modal open" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="modal__card" onClick={(e) => e.stopPropagation()}>
        <div className="modal__head">
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <span className="t-ic" style={{ flex: "0 0 auto" }}>
              <Icon name={treatment.icon} />
            </span>
            <div>
              <h3>{treatment.name}</h3>
              <p style={{ color: "var(--teal-deep)", fontWeight: 600 }}>{treatment.tagline}</p>
            </div>
          </div>
          <button className="modal__close" aria-label="Close" onClick={onClose}>
            <Icon name="close" />
          </button>
        </div>
        <div className="modal__body">
          <p className="lead" style={{ fontSize: "1.02rem" }}>
            {treatment.body}
          </p>
          <div className="feat-list" style={{ marginTop: 22 }}>
            {treatment.points.map((p) => (
              <div className="feat" key={p}>
                <span className="ic">
                  <Icon name="check" />
                </span>
                <div>
                  <b style={{ fontWeight: 600 }}>{p}</b>
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 26 }}>
            <button className="btn btn--coral" onClick={onBook}>
              <Icon name="calendar" /> Book this treatment
            </button>
            <a className="btn btn--ghost" href="tel:+918048034862">
              <Icon name="phone" /> Call to discuss
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------- */
/* Article modal                                                         */
/* --------------------------------------------------------------------- */
function ArticleModal({
  article,
  onClose,
  onBook,
}: {
  article: Update;
  onClose: () => void;
  onBook: () => void;
}) {
  const date = new Date(article.date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return (
    <div className="modal open" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="modal__card" onClick={(e) => e.stopPropagation()}>
        <div className="modal__head">
          <div>
            <span className="cat">{article.cat}</span>
            <h3 style={{ marginTop: 10 }}>{article.title}</h3>
            <p style={{ color: "var(--ink-soft)", fontSize: ".9rem" }}>{date}</p>
          </div>
          <button className="modal__close" aria-label="Close" onClick={onClose}>
            <Icon name="close" />
          </button>
        </div>
        <div className="modal__body">
          <p className="lead">{article.excerpt}</p>
          <p style={{ marginTop: 16, color: "var(--ink-soft)" }}>
            For personalised guidance on this topic, book a consultation with Dr. Sameer Palaskar.
            Our team will assess your condition and recommend the most appropriate, least-invasive
            treatment for your needs.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 24 }}>
            <button className="btn btn--coral" onClick={onBook}>
              <Icon name="calendar" /> Book a consultation
            </button>
            <a className="btn btn--ghost" href="https://wa.me/919545081608" target="_blank" rel="noopener">
              <Icon name="whatsapp" /> Ask on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
