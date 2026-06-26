import Link from "next/link";
import Icon from "./Icon";
import { site } from "@/lib/data";

export default function Footer() {
  const c = site.clinic;
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <Link className="brand" href="/">
              <span className="brand__mark">
                <Icon name="spine" />
              </span>
              <span className="brand__txt">
                <b>Dr. Palaskar Hospital</b>
                <span>Orthopaedics · Vasai-Virar</span>
              </span>
            </Link>
            <p>
              The best orthopaedic hospital in Vasai-Virar — expert joint, spine and trauma care with
              modern facilities and a compassionate, patient-first team.
            </p>
            <div className="footer__socials">
              <a href={c.instagram} target="_blank" rel="noopener" aria-label="Instagram">
                <Icon name="instagram" />
              </a>
              <a href={c.facebook} target="_blank" rel="noopener" aria-label="Facebook">
                <Icon name="facebook" />
              </a>
              <a href="https://wa.me/919545081608" target="_blank" rel="noopener" aria-label="WhatsApp">
                <Icon name="whatsapp" />
              </a>
            </div>
          </div>

          <div>
            <h4>Explore</h4>
            <div className="footer__list">
              <Link href="/treatments">Treatments</Link>
              <Link href="/about">About us</Link>
              <Link href="/doctor">Our surgeon</Link>
              <Link href="/gallery">Gallery</Link>
              <Link href="/testimonials">Reviews</Link>
              <Link href="/contact">Contact</Link>
            </div>
          </div>

          <div>
            <h4>Treatments</h4>
            <div className="footer__list">
              {site.treatments.slice(0, 6).map((t) => (
                <Link key={t.slug} href="/treatments">
                  {t.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="footer__contact">
            <h4>Contact</h4>
            <div>
              <Icon name="pin" />
              <span>Behind Saibaba Temple, Opposite McDonald&apos;s, Bhabola Naka, Vasai West, 401201</span>
            </div>
            <div>
              <Icon name="phone" />
              <a href="tel:+918048034862" style={{ padding: 0 }}>
                +91 80480 34862
              </a>
            </div>
            <div>
              <Icon name="mail" />
              <a href="mailto:palaskarhospital@gmail.com" style={{ padding: 0 }}>
                palaskarhospital@gmail.com
              </a>
            </div>
            <div className="footer__news">
              <input type="email" placeholder="Your email for updates" aria-label="Email" />
              <button aria-label="Subscribe">
                <Icon name="arrow" />
              </button>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© {year} Dr. Palaskar Hospital. All rights reserved.</span>
          <div className="links">
            <Link href="/about">About</Link>
            <Link href="/treatments">Treatments</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
