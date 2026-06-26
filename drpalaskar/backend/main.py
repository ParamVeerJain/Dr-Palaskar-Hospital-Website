"""
Dr. Palaskar Hospital — FastAPI backend.

Serves:
  • A JSON API under /api/*  (consumed by the Next.js frontend, or anyone)
  • The standalone static site at /  (backend/static/index.html), so the whole
    website runs from FastAPI alone — no Node / Next.js required.

Run:
    uvicorn main:app --reload --port 8000
Then open http://localhost:8000  (site)  and  http://localhost:8000/docs  (API).
"""

from datetime import datetime
from pathlib import Path
from random import choices
from string import ascii_uppercase, digits

from fastapi import APIRouter, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field

import data

BASE_DIR = Path(__file__).resolve().parent
STATIC_DIR = BASE_DIR / "static"

app = FastAPI(
    title="Dr. Palaskar Hospital API",
    description="Content & appointment API for Dr. Palaskar Hospital, Vasai-Virar.",
    version="1.0.0",
)

# CORS — open for local development so the Next.js dev server (:3000) can call it.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

api = APIRouter(prefix="/api")


# --------------------------------------------------------------------------- #
# Models
# --------------------------------------------------------------------------- #
class Appointment(BaseModel):
    name: str = Field(..., min_length=2, max_length=120)
    phone: str = Field(..., min_length=5, max_length=30)
    treatment: str | None = Field(default="General consultation", max_length=120)
    date: str | None = Field(default=None, max_length=40)
    time: str | None = Field(default=None, max_length=40)
    message: str | None = Field(default=None, max_length=1000)


# --------------------------------------------------------------------------- #
# Routes
# --------------------------------------------------------------------------- #
@api.get("/health", tags=["meta"])
def health():
    return {"status": "ok", "time": datetime.utcnow().isoformat() + "Z"}


@api.get("/site", tags=["content"])
def get_site():
    """The full content payload in a single request."""
    return data.site_payload()


@api.get("/clinic", tags=["content"])
def get_clinic():
    return data.CLINIC


@api.get("/doctor", tags=["content"])
def get_doctor():
    return data.DOCTOR


@api.get("/treatments", tags=["content"])
def get_treatments():
    return data.TREATMENTS


@api.get("/treatments/{slug}", tags=["content"])
def get_treatment(slug: str):
    for t in data.TREATMENTS:
        if t["slug"] == slug:
            return t
    raise HTTPException(status_code=404, detail="Treatment not found")


@api.get("/facilities", tags=["content"])
def get_facilities():
    return data.FACILITIES


@api.get("/stats", tags=["content"])
def get_stats():
    return data.STATS


@api.get("/testimonials", tags=["content"])
def get_testimonials():
    return data.TESTIMONIALS


@api.get("/updates", tags=["content"])
def get_updates():
    return data.UPDATES


@api.get("/updates/{update_id}", tags=["content"])
def get_update(update_id: int):
    for u in data.UPDATES:
        if u["id"] == update_id:
            return u
    raise HTTPException(status_code=404, detail="Update not found")


@api.get("/gallery", tags=["content"])
def get_gallery():
    return data.GALLERY


@api.get("/pages", tags=["content"])
def get_pages():
    return data.PAGES


@api.post("/appointments", tags=["appointments"])
def create_appointment(appt: Appointment):
    """
    Accept an appointment request and return a reference id.
    (Demo: this does not persist or send anything — wire it to your CRM/email.)
    """
    ref = "DP-" + "".join(choices(ascii_uppercase + digits, k=6))
    return JSONResponse(
        status_code=201,
        content={
            "ok": True,
            "reference": ref,
            "received": appt.model_dump(),
            "message": "Appointment request received. Our team will call you to confirm.",
        },
    )


app.include_router(api)


# --------------------------------------------------------------------------- #
# Static site (mounted LAST so /api/* keeps priority)
# html=True makes "/" serve index.html and unknown paths fall back to it.
# --------------------------------------------------------------------------- #
if STATIC_DIR.exists():
    app.mount("/", StaticFiles(directory=str(STATIC_DIR), html=True), name="static")
else:  # pragma: no cover
    @app.get("/")
    def _missing_static():
        return {
            "message": "Static site not found. Expected ./static/index.html",
            "api_docs": "/docs",
        }
