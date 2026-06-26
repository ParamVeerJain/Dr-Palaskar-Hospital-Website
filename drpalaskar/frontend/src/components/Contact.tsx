import Icon from "./Icon";

export default function Contact() {
  return (
    <section className="section bg-mist" id="contact">
      <div className="container">
        <div className="section-head reveal">
          <span className="eyebrow">Get in touch</span>
          <h2 className="h2">Visit us or book a consultation</h2>
          <p>
            Behind Saibaba Temple, Opposite McDonald&apos;s, Bhabola Naka, Vasai West — easy to reach
            with 24×7 emergency access.
          </p>
        </div>
        <div className="contact-grid">
          <div className="contact-info">
            <div className="cinfo reveal">
              <span className="ic">
                <Icon name="pin" />
              </span>
              <div>
                <small>Address</small>
                <b>Dr. Palaskar Hospital</b>
                <span style={{ color: "var(--ink-soft)", fontSize: ".9rem" }}>
                  Behind Saibaba Temple, Opposite McDonald&apos;s, Bhabola Naka, Vasai West, 401201
                </span>
              </div>
            </div>
            <div className="cinfo reveal">
              <span className="ic">
                <Icon name="phone" />
              </span>
              <div>
                <small>Phone</small>
                <b>
                  <a href="tel:+918048034862">+91 80480 34862</a>
                </b>
              </div>
            </div>
            <div className="cinfo reveal">
              <span className="ic">
                <Icon name="whatsapp" />
              </span>
              <div>
                <small>WhatsApp</small>
                <b>
                  <a href="https://wa.me/919545081608" target="_blank" rel="noopener">
                    +91 95450 81608
                  </a>
                </b>
              </div>
            </div>
            <div className="cinfo reveal">
              <span className="ic">
                <Icon name="mail" />
              </span>
              <div>
                <small>Email</small>
                <b>
                  <a href="mailto:palaskarhospital@gmail.com">palaskarhospital@gmail.com</a>
                </b>
              </div>
            </div>
            <div className="cinfo reveal">
              <span className="ic">
                <Icon name="clock" />
              </span>
              <div>
                <small>Hours</small>
                <b>24×7 Emergency</b>
                <span style={{ color: "var(--ink-soft)", fontSize: ".9rem" }}>
                  OPD by appointment — call to confirm timings
                </span>
              </div>
            </div>
          </div>
          <div className="map-wrap reveal">
            <iframe
              src="https://www.google.com/maps?q=19.3669568,72.8169703&z=16&output=embed"
              title="Dr. Palaskar Hospital location"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
