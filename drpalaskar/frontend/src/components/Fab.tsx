"use client";

import { useEffect, useState } from "react";
import Icon from "./Icon";

export default function Fab() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fab">
      <a
        className="wa"
        href="https://wa.me/919545081608"
        target="_blank"
        rel="noopener"
        aria-label="Chat on WhatsApp"
      >
        <Icon name="whatsapp" />
      </a>
      <button
        className={`top ${show ? "show" : ""}`}
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <Icon name="arrowUp" />
      </button>
    </div>
  );
}
