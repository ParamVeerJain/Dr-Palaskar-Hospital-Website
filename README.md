# Dr. Palaskar Hospital — Website Rebuild

A complete, from-scratch rebuild of the Dr. Palaskar Hospital website (orthopaedic
hospital, Vasai-Virar) with a custom **"Clinical Calm × Anatomical Precision"** design
— an interactive **3D spine**, a **stethoscope cursor**, an animated **ECG line**, and a
fully responsive layout that works on phones, tablets, laptops and desktops.

The project ships **two independent frontends** plus a backend API:

| Folder | Stack | What it is |
| --- | --- | --- |
| `frontend/` | **Next.js 14 + TypeScript + Tailwind CSS** | The primary app. Every file is `.ts` / `.tsx`. Routed pages, typed content, React components. |
| `backend/` | **FastAPI (Python)** | A JSON API **and** a self-contained static site (`backend/static/index.html`) it serves directly. |
| `preview.html` | Single self-contained HTML file | Double-click to preview the design instantly — no install, no server. |

Both frontends share the **same design system** (the exact same CSS), so they look
identical. You can run *either one* on its own.

---

## Folder structure

```
drpalaskar/
├── preview.html                 # Self-contained preview (open by double-click)
├── README.md
│
├── frontend/                    # PRIMARY app — Next.js 14 + TypeScript + Tailwind
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.ts
│   ├── next.config.mjs
│   ├── postcss.config.mjs
│   ├── public/
│   │   └── assets/media/         # images land here (run download_assets.py)
│   └── src/
│       ├── app/                  # App Router: layout, home, + 7 routed pages
│       │   ├── layout.tsx        #   fonts, providers, shared chrome
│       │   ├── page.tsx          #   homepage
│       │   ├── globals.css       #   Tailwind + shared design system
│       │   ├── treatments/ about/ doctor/
│       │   └── gallery/ testimonials/ updates/ contact/
│       ├── components/           # 20+ typed React components
│       │   ├── Spine3D.tsx       #   interactive 3D spine (Three.js)
│       │   ├── Cursor.tsx        #   stethoscope cursor
│       │   ├── ModalProvider.tsx #   booking / treatment / article / lightbox
│       │   └── …
│       └── lib/
│           ├── data.ts           #   all site content, fully typed
│           ├── icons.ts          #   inline SVG icon set
│           └── img.ts            #   branded image-placeholder helper
│
└── backend/                     # FastAPI — JSON API + standalone static site
    ├── main.py                   # API routes (/api/*) + serves the static site at /
    ├── data.py                   # site content (Python)
    ├── requirements.txt
    ├── download_assets.py        # downloads all images + video poster (see below)
    └── static/                   # the no-build standalone site
        ├── index.html
        └── assets/
            ├── css/styles.css    # the shared design system
            ├── js/               # data.js, icons.js, app.js, spine.js (vanilla)
            └── media/            # images land here (run download_assets.py)
```

---

## Quick start

### Option A — FastAPI only (no Node needed)

This serves the full website **and** the API from one Python process.

```bash
cd backend
python -m venv .venv && source .venv/bin/activate    # optional but recommended
#   on Windows: python -m venv .venv && .venv\Scripts\activate
pip install -r requirements.txt
python download_assets.py        # fetch real images + video poster (see note below)
uvicorn main:app --reload
```

Then open:

- **http://localhost:8000** — the website
- **http://localhost:8000/docs** — interactive API documentation (Swagger UI)

### Option B — Next.js frontend (the primary app)

```bash
cd frontend
npm install
npm run dev
```

Then open **http://localhost:3000**.


#### Running both together (optional)

Run the backend (Option A) and the frontend (Option B) at the same time. The frontend's
booking form will automatically POST to the FastAPI API at `http://localhost:8000`. If the
backend isn't running, the form still works and generates a local confirmation reference,
so the frontend is fully usable on its own.

To point the frontend at a different API URL, create `frontend/.env.local`:

```
NEXT_PUBLIC_API_BASE=http://localhost:8000
```

### Option C — Just look at it

Double-click **`preview.html`**. It's one self-contained file (all CSS and JS inlined) and
needs no install or server. Branded placeholders show in place of photos until you run the
downloader; the 3D spine and all interactions work as long as you're online (it loads
Three.js and the fonts from a CDN).

---

## Features

- **Two independent frontends** from one shared design system — a Next.js + TypeScript app
  and a zero-build static site, kept visually identical.
- **Interactive 3D spine** (Three.js) — drag to rotate, auto-rotates when idle, lazy-loads
  only when scrolled into view, and falls back to an SVG illustration if WebGL is
  unavailable.
- **Stethoscope custom cursor** — only on fine-pointer (mouse) devices, and disabled when
  the visitor prefers reduced motion.
- **Animated ECG divider** and on-scroll reveal animations throughout.
- **Fully responsive** — tested layouts for phone, tablet/iPad, laptop and desktop.
- **Accessible** — keyboard-operable cards and modals, focus styles, `aria` labelling, and
  full `prefers-reduced-motion` support.
- **Booking flow** — an appointment modal that posts to the FastAPI API, with a graceful
  local-reference fallback when the API isn't running.
- **Treatment & article modals**, a **gallery lightbox** (with keyboard arrows), a
  testimonials carousel, animated stat counters, WhatsApp & back-to-top floating buttons,
  and an embedded Google map.
- **FastAPI backend** — typed JSON endpoints for clinic info, treatments, testimonials,
  updates, gallery, facilities and stats, plus an appointments endpoint, all documented at
  `/docs`.
- **Performance-minded** — local assets, lazy-loaded media and 3D, deferred scripts, and
  self-hosted fonts in the Next.js build for low latency.

---

## API reference (FastAPI)

Base URL: `http://localhost:8000`

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/health` | Health check |
| GET | `/api/site` | Entire site payload in one call |
| GET | `/api/clinic` | Clinic details |
| GET | `/api/doctor` | Doctor profile |
| GET | `/api/treatments` | All treatments |
| GET | `/api/treatments/{slug}` | A single treatment |
| GET | `/api/facilities` | Facilities list |
| GET | `/api/stats` | Headline statistics |
| GET | `/api/testimonials` | Patient testimonials |
| GET | `/api/updates` | Articles / updates |
| GET | `/api/updates/{id}` | A single article |
| GET | `/api/gallery` | Gallery image paths |
| GET | `/api/pages` | SEO landing-page metadata |
| POST | `/api/appointments` | Submit an appointment request → returns a reference |

Example:

```bash
curl http://localhost:8000/api/treatments/spinal-surgery
curl -X POST http://localhost:8000/api/appointments \
  -H "Content-Type: application/json" \
  -d '{"name":"Asha","phone":"9876543210","treatment":"Knee Replacement"}'
```

---

## Tech stack

- **Frontend:** Next.js 14 (App Router), React 18, TypeScript 5, Tailwind CSS 3, Three.js.
- **Backend:** FastAPI, Uvicorn, Pydantic.
- **Standalone site:** vanilla HTML / CSS / JavaScript, Three.js via CDN.
- **Fonts:** Sora (display), Plus Jakarta Sans (body), Space Mono (mono).

---


