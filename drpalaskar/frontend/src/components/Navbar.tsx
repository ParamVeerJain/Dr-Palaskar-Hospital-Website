"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Icon from "./Icon";
import { useModals } from "./ModalProvider";

const LINKS: { href: string; label: string }[] = [
  { href: "/treatments", label: "Treatments" },
  { href: "/about", label: "About" },
  { href: "/doctor", label: "Doctor" },
  { href: "/gallery", label: "Gallery" },
  { href: "/testimonials", label: "Reviews" },
  { href: "/updates", label: "Updates" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const { openBooking } = useModals();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <header className={`nav ${scrolled ? "scrolled" : ""}`}>
        <div className="container nav__inner">
          <Link className="brand" href="/" aria-label="Dr. Palaskar Hospital home">
            {/* plain img (not next/image) to mirror the standalone build */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="brand__logo" src="/assets/media/logo.png" alt="Dr. Palaskar Hospital logo" width={48} height={48} />
            <span className="brand__txt">
              <b className="brand__wm">Dr. Palaskar Hospital</b>
              <span>Orthopaedics · Vasai-Virar</span>
            </span>
          </Link>

          <nav className="nav__links" aria-label="Primary">
            {LINKS.map((l) => (
              <Link key={l.href} className="nav__link" href={l.href}>
                {l.label}
              </Link>
            ))}
          </nav>

          <button className="btn nav__cta desktop-only" onClick={() => openBooking()}>
            <Icon name="calendar" /> Book appointment
          </button>

          <button
            className={`burger ${open ? "open" : ""}`}
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      <div className={`mobile-menu ${open ? "open" : ""}`}>
        {LINKS.map((l) => (
          <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>
            {l.label}
          </Link>
        ))}
        <button
          className="btn"
          style={{ marginTop: 18 }}
          onClick={() => {
            setOpen(false);
            openBooking();
          }}
        >
          <Icon name="calendar" /> Book appointment
        </button>
      </div>
    </>
  );
}
