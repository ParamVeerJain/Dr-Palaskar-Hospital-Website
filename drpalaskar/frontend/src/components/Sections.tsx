"use client";

import Icon from "./Icon";
import { site } from "@/lib/data";
import { onImgError } from "@/lib/img";
import { useModals } from "./ModalProvider";

/* ------------------------------ About ------------------------------ */
export function About() {
  const { openBooking } = useModals();
  return (
    <section className="section" id="about">
      <div className="container">
        <div className="split">
          <div className="about-media reveal">
            <div className="about-media__ring" />
            <div className="about-media__frame">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/media/about-cover.jpg"
                alt="Inside Dr. Palaskar Hospital"
                loading="lazy"
                onError={onImgError("Our Hospital")}
              />
            </div>
            <div className="about-media__badge">
              <span className="ic">
                <Icon name="award" />
              </span>
              <div>
                <b>27+ Years</b>
                <span>of trusted orthopaedic care</span>
              </div>
            </div>
          </div>

          <div className="reveal">
            <span className="eyebrow">About the hospital</span>
            <h2 className="h2" style={{ margin: "14px 0 16px" }}>
              A modern orthopaedic hospital built around your recovery
            </h2>
            <p className="lead">
              Dr. Palaskar Hospital brings together an experienced surgical team, digital diagnostics
              and well-equipped operating theatres to deliver safe, effective and affordable
              orthopaedic care for the people of Vasai-Virar and the surrounding region.
            </p>
            <div className="feat-list">
              <div className="feat">
                <span className="ic">
                  <Icon name="microscope" />
                </span>
                <div>
                  <b>Accurate diagnosis</b>
                  <span>Digital X-ray and modern imaging for precise treatment planning.</span>
                </div>
              </div>
              <div className="feat">
                <span className="ic">
                  <Icon name="shield" />
                </span>
                <div>
                  <b>Safe surgery</b>
                  <span>Laminar-flow, HEPA-filtered theatres with advanced surgical systems.</span>
                </div>
              </div>
              <div className="feat">
                <span className="ic">
                  <Icon name="heart" />
                </span>
                <div>
                  <b>Compassionate care</b>
                  <span>Patient-first approach — from first consult through full rehabilitation.</span>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 26 }}>
              <button className="btn" onClick={() => openBooking()}>
                <Icon name="calendar" /> Book a consultation
              </button>
              <a className="btn btn--ghost" href="/doctor">
                <Icon name="arrow" /> Meet the surgeon
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------- Facilities --------------------------- */
export function Facilities() {
  return (
    <section className="section bg-bone" id="facilities-sec">
      <div className="container">
        <div className="section-head center reveal">
          <span className="eyebrow">Infrastructure</span>
          <h2 className="h2">Equipped for precise, safe surgery</h2>
          <p>
            Modern diagnostic and surgical infrastructure under one roof — so you receive complete
            orthopaedic care without running between facilities.
          </p>
        </div>
        <div className="chips" id="facilities" style={{ justifyContent: "center" }}>
          {site.facilities.map((f) => (
            <span className="chip" key={f}>
              <Icon name="check" />
              {f}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- Doctor ------------------------------ */
export function DoctorCard() {
  const { openBooking } = useModals();
  const d = site.doctor;
  return (
    <section className="section bg-ink" id="doctor">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">Meet your surgeon</span>
          <h2 className="h2">Led by an experienced orthopaedic specialist</h2>
        </div>
        <div className="doc-card reveal">
          <div className="doc-card__photo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/media/doctor.jpg"
              alt={d.name}
              loading="lazy"
              onError={onImgError("Dr. Sameer Palaskar")}
            />
            <div className="doc-card__exp">
              <b>27</b>
              <span>Years experience</span>
            </div>
          </div>
          <div className="doc-card__body">
            <h3 className="name">{d.name}</h3>
            <div className="degree">MBBS · D.Ortho · DNB</div>
            <p className="bio">{d.bio}</p>
            <div className="doc-meta">
              <div>
                <small>Speciality</small>
                <b>Orthopaedic Surgeon</b>
              </div>
              <div>
                <small>Registration No.</small>
                <b>{d.registration}</b>
              </div>
              <div>
                <small>Experience</small>
                <b>27 Years</b>
              </div>
              <div>
                <small>Direct line</small>
                <b>+91 93264 75284</b>
              </div>
            </div>
            <ul className="doc-highlights">
              {d.highlights.map((h) => (
                <li key={h}>
                  <Icon name="check" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button className="btn btn--coral" onClick={() => openBooking()}>
                <Icon name="calendar" /> Book appointment
              </button>
              <a className="btn btn--ghost" href="tel:+919326475284">
                <Icon name="phone" /> Call directly
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- CTA band ---------------------------- */
export function CtaBand() {
  const { openBooking } = useModals();
  return (
    <section className="section">
      <div className="container">
        <div className="cta-band reveal">
          <div className="cta-band__inner">
            <div>
              <span className="eyebrow" style={{ color: "#fff" }}>
                Second opinion
              </span>
              <h2 className="h2" style={{ marginTop: 12 }}>
                Not sure if you need surgery? Get an honest second opinion.
              </h2>
              <p>
                Bring your reports or scans and talk to Dr. Palaskar about your options — including
                non-surgical approaches where appropriate. Clear advice, no pressure.
              </p>
            </div>
            <div className="cta-band__actions">
              <button className="btn btn--light btn--lg" onClick={() => openBooking()}>
                <Icon name="calendar" /> Book appointment
              </button>
              <a
                className="btn btn--lg"
                style={{ background: "transparent", color: "#fff", boxShadow: "inset 0 0 0 1.6px rgba(255,255,255,.55)" }}
                href="https://wa.me/919545081608"
                target="_blank"
                rel="noopener"
              >
                <Icon name="whatsapp" /> WhatsApp us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
