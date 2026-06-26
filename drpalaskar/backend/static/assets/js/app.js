/* ============================================================
   Dr. Palaskar Hospital — App logic
   ============================================================ */
(function () {
  "use strict";
  const S = window.SITE, I = window.ICONS;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* ---------- Image fallback (graceful placeholder if media missing) ---------- */
  const PLACE = (label) =>
    `data:image/svg+xml;utf8,` +
    encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' width='600' height='600'>
        <defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
        <stop offset='0' stop-color='#16BFB8'/><stop offset='1' stop-color='#0A6463'/></linearGradient></defs>
        <rect width='600' height='600' fill='url(#g)'/>
        <g fill='none' stroke='rgba(255,255,255,.6)' stroke-width='2'>
        <path d='M300 150v300M255 195h90M250 245h100M250 300h100M255 355h90M260 405h80'/></g>
        <text x='300' y='520' font-family='monospace' font-size='22' fill='rgba(255,255,255,.85)' text-anchor='middle'>${label || "Dr. Palaskar Hospital"}</text>
      </svg>`
    );
  window.__imgFallback = function (img, label) {
    img.onerror = null;
    img.src = PLACE(label);
    img.classList.add("img-fallback");
  };

  /* ---------- Stethoscope custom cursor ---------- */
  function initCursor() {
    if (!fine || reduced) return;
    document.body.classList.add("has-cursor");
    const cur = document.createElement("div");
    cur.className = "cursor";
    cur.innerHTML = `<svg viewBox="0 0 48 48" fill="none">
      <g stroke="#0A6463" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" fill="#fff">
        <path d="M14 6v8a8 8 0 0 0 16 0V6" fill="none"/>
        <path d="M22 26v3a9 9 0 0 0 18 0v-5" fill="none"/>
        <circle cx="40" cy="22" r="4.5" fill="#16BFB8" stroke="#0A6463"/>
        <circle cx="40" cy="22" r="1.6" fill="#fff" stroke="none"/>
        <circle cx="14" cy="6" r="2.4" fill="#0A6463" stroke="none"/>
        <circle cx="30" cy="6" r="2.4" fill="#0A6463" stroke="none"/>
      </g></svg>`;
    const ring = document.createElement("div"); ring.className = "cursor-ring";
    const dot = document.createElement("div"); dot.className = "cursor-dot";
    document.body.append(cur, ring, dot);

    let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
    addEventListener("mousemove", (e) => {
      mx = e.clientX; my = e.clientY;
      cur.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
      dot.style.transform = `translate(${mx}px,${my}px) translate(-50%,-50%)`;
    }, { passive: true });
    (function loop() {
      rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18;
      ring.style.transform = `translate(${rx}px,${ry}px) translate(-50%,-50%)`;
      requestAnimationFrame(loop);
    })();
    const hot = "a,button,.clickable,input,select,textarea,.gtile,.treat-card,label";
    document.addEventListener("mouseover", (e) => {
      if (e.target.closest(hot)) { cur.classList.add("is-active"); ring.classList.add("is-active"); }
    });
    document.addEventListener("mouseout", (e) => {
      if (e.target.closest(hot)) { cur.classList.remove("is-active"); ring.classList.remove("is-active"); }
    });
    document.addEventListener("mouseleave", () => { cur.style.opacity = ring.style.opacity = dot.style.opacity = 0; });
    document.addEventListener("mouseenter", () => { cur.style.opacity = ring.style.opacity = dot.style.opacity = 1; });
  }

  /* ---------- Navbar behaviour ---------- */
  function initNav() {
    const nav = $(".nav");
    const onScroll = () => {
      nav && nav.classList.toggle("scrolled", scrollY > 24);
      const top = $(".fab .top"); top && top.classList.toggle("show", scrollY > 600);
    };
    addEventListener("scroll", onScroll, { passive: true }); onScroll();

    const burger = $(".burger"), menu = $(".mobile-menu");
    if (burger && menu) {
      const toggle = (open) => {
        burger.classList.toggle("open", open);
        menu.classList.toggle("open", open);
        document.body.style.overflow = open ? "hidden" : "";
      };
      burger.addEventListener("click", () => toggle(!menu.classList.contains("open")));
      $$("a", menu).forEach((a) => a.addEventListener("click", () => toggle(false)));
    }
  }

  /* ---------- Multi-page router (moves home sections into a page view) ---------- */
  function initRouter() {
    const home = $("#view-home"), page = $("#view-page");
    if (!home || !page) return;
    const PAGES = {
      treatments:   { title: "Treatments",      crumb: "Treatments", sections: ["care"] },
      about:        { title: "About us",         crumb: "About",      sections: ["about", "facilities-sec"] },
      doctor:       { title: "Meet the doctor",  crumb: "Doctor",     sections: ["doctor"] },
      gallery:      { title: "Gallery",          crumb: "Gallery",    sections: ["gallery-sec"] },
      testimonials: { title: "Patient reviews",  crumb: "Reviews",    sections: ["reviews"] },
      updates:      { title: "Health updates",   crumb: "Updates",    sections: ["updates-sec"] },
      contact:      { title: "Contact us",       crumb: "Contact",    sections: ["contact"] }
    };
    const moved = [];
    const backSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>';

    function returnAll() {
      while (moved.length) {
        const m = moved.pop();
        if (m.ph && m.ph.parentNode) { m.ph.parentNode.insertBefore(m.node, m.ph); m.ph.remove(); }
        else home.appendChild(m.node);
      }
    }
    function setActive(p) {
      $$("[data-nav]").forEach((a) => a.classList.toggle("active", a.getAttribute("data-nav") === p));
    }
    function showHome() {
      returnAll();
      page.classList.remove("active"); page.innerHTML = "";
      home.classList.add("active");
      setActive("home");
      document.title = "Dr. Palaskar Hospital — Best Orthopaedic Hospital in Vasai-Virar";
    }
    function render(p) {
      const cfg = PAGES[p];
      if (!cfg) return showHome();
      returnAll();
      page.innerHTML =
        '<div class="container" style="padding-top:clamp(98px,13vh,132px);padding-bottom:6px">' +
          '<button class="page-back" type="button">' + backSvg + ' Back to home</button>' +
          '<nav class="crumb" aria-label="Breadcrumb"><a href="#/" data-nav="home">Home</a> <span>/</span> <b>' + cfg.crumb + '</b></nav>' +
        '</div><div id="page-slot"></div>';
      const slot = $("#page-slot", page);
      cfg.sections.forEach((id) => {
        const node = document.getElementById(id);
        if (!node) return;
        const ph = document.createComment("slot:" + id);
        node.parentNode.insertBefore(ph, node);
        moved.push({ node, ph });
        slot.appendChild(node);
      });
      page.querySelector(".page-back").addEventListener("click", () => go("home"));
      home.classList.remove("active");
      page.classList.add("active");
      $$(".reveal", page).forEach((e) => e.classList.add("in"));
      setActive(p);
      document.title = cfg.title + " — Dr. Palaskar Hospital";
      window.scrollTo(0, 0);
    }
    function parseHash() {
      const m = (location.hash || "").replace(/^#\/?/, "");
      return PAGES[m] ? m : "home";
    }
    function go(p, push) {
      if (p === "home" || !PAGES[p]) showHome(); else render(p);
      if (push !== false) history.pushState({ page: p }, "", "#/" + (p === "home" ? "" : p));
    }
    document.addEventListener("click", (e) => {
      const a = e.target.closest("[data-nav]");
      if (!a) return;
      e.preventDefault();
      go(a.getAttribute("data-nav"));
    });
    addEventListener("popstate", (e) => {
      go((e.state && e.state.page) || parseHash(), false);
    });
    const start = parseHash();
    if (start !== "home") go(start, false);
    window.__navigate = go;
  }

  /* ---------- Reveal on scroll ---------- */
  function initReveal() {
    const els = $$(".reveal");
    if (reduced || !("IntersectionObserver" in window)) { els.forEach((e) => e.classList.add("in")); return; }
    const io = new IntersectionObserver((ents) => {
      ents.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    els.forEach((e) => io.observe(e));
  }

  /* ---------- Animated counters ---------- */
  function initCounters() {
    const els = $$("[data-count]");
    const run = (el) => {
      const target = parseFloat(el.dataset.count);
      if (reduced) { el.textContent = target; return; }
      const dur = 1400, t0 = performance.now();
      const step = (t) => {
        const p = Math.min((t - t0) / dur, 1);
        const e = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * e);
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    if (!("IntersectionObserver" in window)) { els.forEach(run); return; }
    const io = new IntersectionObserver((ents) => {
      ents.forEach((en) => { if (en.isIntersecting) { run(en.target); io.unobserve(en.target); } });
    }, { threshold: 0.5 });
    els.forEach((e) => io.observe(e));
  }

  /* ---------- Render: stats ---------- */
  function renderStats() {
    const wrap = $("#vitals"); if (!wrap) return;
    wrap.innerHTML = S.stats.map((s) => `
      <div class="vital reveal">
        <div class="ic">${I[s.icon] || I.heart}</div>
        <b><span data-count="${s.value}">0</span><span class="suf">${s.suffix}</span></b>
        <span>${s.label}</span>
      </div>`).join("");
  }

  /* ---------- Render: treatments ---------- */
  function renderTreatments(limit) {
    const wrap = $("#treatments"); if (!wrap) return;
    const list = limit ? S.treatments.slice(0, limit) : S.treatments;
    wrap.innerHTML = list.map((t, i) => `
      <article class="treat-card reveal" data-d="${(i % 3) + 1}" data-slug="${t.slug}" tabindex="0" role="button" aria-label="${t.name}">
        <div class="t-head">
          <div class="t-ic">${I[t.icon] || I.joint}</div>
          <span class="t-num">${String(i + 1).padStart(2, "0")}</span>
        </div>
        <h3 class="t-title">${t.name}</h3>
        <p class="t-desc">${t.short}</p>
        <span class="t-more">Explore care <span class="arr">${I.arrow}</span></span>
      </article>`).join("");
    $$(".treat-card", wrap).forEach((c) => {
      const open = () => openTreatment(c.dataset.slug);
      c.addEventListener("click", open);
      c.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } });
    });
  }

  /* ---------- Treatment detail modal ---------- */
  function openTreatment(slug) {
    const t = S.treatments.find((x) => x.slug === slug); if (!t) return;
    const m = $("#treatModal");
    $("#treatModalBody").innerHTML = `
      <div class="modal__head">
        <div>
          <div class="t-ic" style="margin-bottom:14px">${I[t.icon] || I.joint}</div>
          <h3>${t.name}</h3>
          <p style="color:var(--teal);font-weight:700;font-family:var(--font-mono);font-size:.8rem;margin-top:6px">${t.tagline}</p>
        </div>
        <button class="modal__close" data-close aria-label="Close">${I.close}</button>
      </div>
      <div class="modal__body">
        <p style="color:var(--ink-soft);margin-bottom:18px">${t.body}</p>
        <h4 style="font-family:var(--font-display);font-size:1rem;margin-bottom:12px">What we offer</h4>
        <ul class="doc-highlights" style="margin-bottom:22px">
          ${t.points.map((p) => `<li>${I.check}<span>${p}</span></li>`).join("")}
        </ul>
        <div style="display:flex;gap:12px;flex-wrap:wrap">
          <button class="btn btn--coral" data-book>${I.calendar} Book appointment</button>
          <a class="btn btn--ghost" href="tel:${S.clinic.phone}">${I.phone} ${S.clinic.phone}</a>
        </div>
      </div>`;
    openModal(m);
  }

  /* ---------- Render: facilities chips ---------- */
  function renderFacilities() {
    const wrap = $("#facilities"); if (!wrap) return;
    wrap.innerHTML = S.facilities.map((f) => `<span class="chip">${I.check}${f}</span>`).join("");
  }

  /* ---------- Render: gallery ---------- */
  function renderGallery(limit) {
    const wrap = $("#gallery"); if (!wrap) return;
    const list = limit ? S.gallery.slice(0, limit) : S.gallery;
    const span = ["wide", "", "", "", "", "", "", "", "tall", "", "", "wide"];
    wrap.innerHTML = list.map((src, i) => `
      <figure class="gtile reveal ${limit ? "" : span[i % span.length]}" data-i="${i}" tabindex="0">
        <img src="${src}" alt="Dr. Palaskar Hospital — facility photo ${i + 1}" loading="lazy" onerror="window.__imgFallback(this,'Hospital')">
        <span class="zoom">${I.zoom}</span>
      </figure>`).join("");
    $$(".gtile", wrap).forEach((g) => g.addEventListener("click", () => openLightbox(parseInt(g.dataset.i))));
  }

  /* ---------- Lightbox ---------- */
  let lbIndex = 0;
  function openLightbox(i) {
    lbIndex = i; const lb = $("#lightbox"); if (!lb) return;
    $("#lbImg").src = S.gallery[i];
    lb.classList.add("open"); document.body.style.overflow = "hidden";
  }
  function lbMove(d) {
    lbIndex = (lbIndex + d + S.gallery.length) % S.gallery.length;
    $("#lbImg").src = S.gallery[lbIndex];
  }
  function closeLightbox() { $("#lightbox").classList.remove("open"); document.body.style.overflow = ""; }

  /* ---------- Render: testimonials ---------- */
  function renderTestimonials() {
    const wrap = $("#testiTrack"); if (!wrap) return;
    wrap.innerHTML = S.testimonials.map((t) => {
      const initials = t.name.split(" ").map((w) => w[0]).slice(0, 2).join("");
      return `
      <article class="testi-card">
        <span class="quote">${I.quote}</span>
        <div class="stars">${I.star.repeat(5)}</div>
        <p class="txt">${t.text}</p>
        <button class="more-btn">Read more</button>
        <div class="who">
          <img class="pic" src="${t.pic}" alt="${t.name}" loading="lazy"
               onerror="this.outerHTML='<span class=\\'pic\\'>${initials}</span>'">
          <div><b>${t.name}</b><span>Verified patient</span></div>
        </div>
      </article>`;
    }).join("");
    $$(".testi-card .more-btn", wrap).forEach((b) => b.addEventListener("click", () => {
      const txt = b.previousElementSibling;
      txt.classList.toggle("expanded");
      b.textContent = txt.classList.contains("expanded") ? "Read less" : "Read more";
    }));
    const prev = $("#testiPrev"), next = $("#testiNext");
    const step = () => Math.min(420, wrap.firstElementChild?.offsetWidth + 22 || 420);
    prev && prev.addEventListener("click", () => wrap.scrollBy({ left: -step(), behavior: "smooth" }));
    next && next.addEventListener("click", () => wrap.scrollBy({ left: step(), behavior: "smooth" }));
  }

  /* ---------- Render: updates ---------- */
  function fmtDate(d) {
    return new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  }
  function renderUpdates(limit) {
    const wrap = $("#updates"); if (!wrap) return;
    const list = limit ? S.updates.slice(0, limit) : S.updates;
    wrap.innerHTML = list.map((u, i) => `
      <article class="update-card reveal" data-d="${(i % 3) + 1}">
        <div class="update-card__img">
          <span class="cat">${u.cat}</span>
          <div class="ph">${I.pulse}</div>
        </div>
        <div class="update-card__body">
          <div class="update-card__date">${I.calendar} ${fmtDate(u.date)}</div>
          <h3>${u.title}</h3>
          <a class="read clickable" data-update="${u.id}">Read article ${I.arrow}</a>
        </div>
      </article>`).join("");
    $$("[data-update]", wrap).forEach((a) => a.addEventListener("click", () => openUpdate(parseInt(a.dataset.update))));
  }
  function openUpdate(id) {
    const u = S.updates.find((x) => x.id === id); if (!u) return;
    const m = $("#treatModal");
    $("#treatModalBody").innerHTML = `
      <div class="modal__head">
        <div>
          <span class="cat" style="display:inline-block;margin-bottom:10px">${u.cat}</span>
          <h3>${u.title}</h3>
          <p style="font-family:var(--font-mono);margin-top:8px">${fmtDate(u.date)}</p>
        </div>
        <button class="modal__close" data-close aria-label="Close">${I.close}</button>
      </div>
      <div class="modal__body">
        <p style="color:var(--ink-soft);margin-bottom:16px">${u.excerpt}</p>
        <p style="color:var(--ink-soft)">At ${S.clinic.name}, our team combines experienced orthopaedic expertise with modern facilities to deliver safe, effective and compassionate care across ${S.clinic.city}. To discuss your condition with ${S.doctor.name}, book an appointment or call us directly.</p>
        <div style="display:flex;gap:12px;flex-wrap:wrap;margin-top:22px">
          <button class="btn btn--coral" data-book>${I.calendar} Book appointment</button>
          <a class="btn btn--ghost" href="tel:${S.clinic.phone}">${I.phone} Call now</a>
        </div>
      </div>`;
    openModal(m);
  }

  /* ---------- Generic modal control ---------- */
  function openModal(m) { if (!m) return; m.classList.add("open"); document.body.style.overflow = "hidden"; }
  function closeModal(m) { if (!m) return; m.classList.remove("open"); document.body.style.overflow = ""; }
  function initModals() {
    document.addEventListener("click", (e) => {
      if (e.target.closest("[data-book]")) { const bm = $("#bookModal"); closeModal($("#treatModal")); openModal(bm); }
      if (e.target.closest("[data-close]") || e.target.classList.contains("modal")) {
        $$(".modal.open").forEach(closeModal);
      }
    });
    addEventListener("keydown", (e) => {
      if (e.key === "Escape") { $$(".modal.open").forEach(closeModal); if ($("#lightbox")?.classList.contains("open")) closeLightbox(); }
    });
    // booking form submit
    const form = $("#bookForm");
    if (form) form.addEventListener("submit", (e) => {
      e.preventDefault();
      $("#bookFormInner").style.display = "none";
      const ok = $("#bookOk"); ok.classList.add("show");
      ok.querySelector("#bookId").textContent = "DP" + Math.random().toString(36).slice(2, 6).toUpperCase();
    });
    // lightbox controls
    $("#lbClose")?.addEventListener("click", closeLightbox);
    $("#lbPrev")?.addEventListener("click", () => lbMove(-1));
    $("#lbNext")?.addEventListener("click", () => lbMove(1));
    $("#lightbox")?.addEventListener("click", (e) => { if (e.target.id === "lightbox") closeLightbox(); });
  }

  /* ---------- expose + boot ---------- */
  window.App = { renderTreatments, renderTestimonials, renderUpdates, renderGallery, renderStats, renderFacilities, openTreatment, openModal, closeModal };
  document.addEventListener("DOMContentLoaded", () => {
    initCursor(); initNav(); initModals();
    renderStats(); renderFacilities();
    renderTreatments(window.__treatLimit || 0);
    renderGallery(window.__galleryLimit || 0);
    renderTestimonials();
    renderUpdates(window.__updateLimit || 0);
    initReveal(); initCounters();
    initRouter();
    if (window.initModels) window.initModels(document.querySelector("#modelStage"));
    // year
    $$(".js-year").forEach((e) => e.textContent = new Date().getFullYear());
  });
})();
