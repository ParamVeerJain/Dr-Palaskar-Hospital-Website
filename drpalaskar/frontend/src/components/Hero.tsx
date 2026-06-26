"use client";

import dynamic from "next/dynamic";
import Icon from "./Icon";
import { useModals } from "./ModalProvider";

const Models3D = dynamic(() => import("./Models3D"), {
  ssr: false,
  loading: () => <div className="spine-stage" aria-hidden="true" />,
});

export default function Hero() {
  const { openBooking } = useModals();

  return (
    <section className="hero">
      <div className="container">
        <div className="hero__grid">
          <div className="hero__content">
            <div className="hero__pill">
              <span className="av">
                <i></i>
                <i></i>
                <i></i>
              </span>
              <span className="dot"></span>
              <span>
                Trusted by <b>20,000+</b> patients in Vasai-Virar
              </span>
            </div>

            <h1 className="h-display">
              A strong <span className="grad">step</span> &amp;{" "}
              <span className="underline">
                a clear sight
                <svg viewBox="0 0 300 12" preserveAspectRatio="none" aria-hidden="true">
                  <path
                    d="M2 8 C 70 2, 130 2, 165 6 S 255 11, 298 4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              .
            </h1>

            <p className="lead hero__lead">
              Expert orthopaedic care that helps you move freely again — from fractures and
              arthritis to advanced spine and joint-replacement surgery. Dr. Sameer Palaskar and
              our team deliver precise, compassionate treatment backed by modern technology and
              24×7 trauma support.
            </p>

            <div className="hero__cta">
              <button className="btn btn--lg" onClick={() => openBooking()}>
                <Icon name="calendar" /> Book appointment
              </button>
              <a className="btn btn--ghost btn--lg" href="tel:+918048034862">
                <Icon name="phone" /> +91 80480 34862
              </a>
            </div>

            <div className="hero__trust">
              <div className="t">
                <b>27+</b>
                <span>Years experience</span>
              </div>
              <div className="t">
                <b>14</b>
                <span>Specialised treatments</span>
              </div>
              <div className="t">
                <b>24/7</b>
                <span>Emergency trauma care</span>
              </div>
            </div>
          </div>

          <div className="hero__stage reveal">
            <Models3D />
          </div>
        </div>
      </div>
    </section>
  );
}
