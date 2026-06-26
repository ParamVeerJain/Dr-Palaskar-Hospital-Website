#!/usr/bin/env python3
"""
Dr. Palaskar Hospital — asset downloader.

Downloads every image used by the website (logo, doctor, hospital cover,
gallery photos, patient photos), then writes
each file into BOTH front-ends:

    backend/static/assets/media/      (the standalone site served by FastAPI)
    frontend/public/assets/media/     (the Next.js app)

Why a script?  The original photos live on remote image CDNs. Running this on
your own machine pulls them down once and stores them locally, so the site is
fully self-hosted and low-latency. If any URL is unreachable, the site still
looks complete thanks to built-in SVG placeholders.

Usage:
    pip install requests          # (already in requirements.txt)
    python download_assets.py            # download missing files
    python download_assets.py --force    # re-download everything
"""

from __future__ import annotations

import sys
from pathlib import Path

try:
    import requests
except ImportError:
    sys.exit("This script needs 'requests'.  Run:  pip install requests")

# --------------------------------------------------------------------------- #
# Paths
# --------------------------------------------------------------------------- #
BACKEND_DIR = Path(__file__).resolve().parent
REPO_ROOT = BACKEND_DIR.parent
TARGET_DIRS = [
    BACKEND_DIR / "static" / "assets" / "media",
    REPO_ROOT / "frontend" / "public" / "assets" / "media",
]

# --------------------------------------------------------------------------- #
# Asset map  (local filename -> remote URL)
# --------------------------------------------------------------------------- #
FP = "https://fpimages.withfloats.com/actual/"
LOGO = "https://fplogoimages.withfloats.com/actual/"
STAFF = "https://productimages.withfloats.com/staffimages/actual/"
TESTI = "https://web.s-cdn.boostkit.dev/website-files/689727362350dd445d802fe1/"

ASSETS: dict[str, str] = {
    # branding & people
    "logo.png": LOGO + "689c2d6de43292c3810019a1.png",
    "doctor.jpg": STAFF + "68a417a33c5b770f0c19af08palaskar.jpg",
    "about-cover.jpg": FP + "689c2c82810b91026b4e621c.jpg",

    # gallery
    "gallery-01.jpg":  FP + "68c665ddec1521649f95de74.jpg",
    "gallery-02.jpeg": FP + "68c665dbbe469c166211b51c.jpeg",
    "gallery-03.jpg":  FP + "68c665d9de368f38c7b95f32.jpg",
    "gallery-04.jpeg": FP + "68c665d84016e03e45ff1a3f.jpeg",
    "gallery-05.jpeg": FP + "68c3a5d38a314345e01f8135.jpeg",
    "gallery-06.jpeg": FP + "68c3a5d1576bfb2ee7b27258.jpeg",
    "gallery-07.jpeg": FP + "68c3a5d0167de5e45f3154f3.jpeg",
    "gallery-08.jpeg": FP + "68c3a5ce9853f8ddce375af2.jpeg",
    "gallery-09.jpeg": FP + "68c3a5cd8674b1992584da22.jpeg",
    "gallery-10.jpeg": FP + "68c3a5cbbb26a011c86aee63.jpeg",
    "gallery-11.jpg":  FP + "68a94110880090459d6734a3.jpg",
    "gallery-12.jpg":  FP + "689d8985e2350529304d8def.jpg",

    # patient photos
    "testi-01.jpeg": TESTI + "689d780c4f48e325cfe0c7c9-689d780d177f804acc12dee5.jpeg",
    "testi-02.jpeg": TESTI + "689d764214107587d8f95a6f-689d76426d3fc651f48f37f6.jpeg",
    "testi-03.jpeg": TESTI + "689d67dcfa5aa0e879f80c5d-689d67dc5f37e7c86e30225e.jpeg",
    "testi-04.jpeg": TESTI + "689d674d8f225fb4a88827dd-689d674dab66d765f6f1f988.jpeg",
    "testi-05.jpeg": TESTI + "689d64234450b8ebc5c469ad-689d6423357cf39666762feb.jpeg",
    "testi-06.jpeg": TESTI + "689d63a93c5b770f0c19aa79-689d63a9ff12d04eca5c3d48.jpeg",
    "testi-07.jpeg": TESTI + "689d6319fa5aa0e879f80c54-689d6319ff12d04eca5c3d44.jpeg",
    "testi-08.jpeg": TESTI + "689d620b3c5b770f0c19aa75-689d620bd7339ab59f7c9842.jpeg",
    "testi-09.jpeg": TESTI + "689d619a8f225fb4a88827d2-689d619adc0a2f275e9c5f9a.jpeg",
    "testi-10.jpeg": TESTI + "689d6105db1757efe1efb3b4-689d61051f1826405d664251.jpeg",
    "testi-11.jpeg": TESTI + "689c2879f473fa5a0122f1a7-689c2879dc0a2f275e9c5f20.jpeg",
    "testi-12.jpeg": TESTI + "689c25c37a108cde1f59f202-689c25c3c44204d4876d1fdf.jpeg",
}

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
        "(KHTML, like Gecko) Chrome/124.0 Safari/537.36"
    ),
    "Accept": "image/avif,image/webp,image/png,image/*,*/*;q=0.8",
    "Referer": "https://www.drpalaskarhospital.com/",
}


# --------------------------------------------------------------------------- #
# Helpers
# --------------------------------------------------------------------------- #
def fetch(url: str) -> bytes | None:
    try:
        r = requests.get(url, headers=HEADERS, timeout=25, stream=True)
        if r.status_code == 200 and r.content:
            return r.content
        print(f"    ! HTTP {r.status_code}")
    except requests.RequestException as exc:
        print(f"    ! {exc.__class__.__name__}: {exc}")
    return None


def write_all(filename: str, blob: bytes) -> None:
    for d in TARGET_DIRS:
        d.mkdir(parents=True, exist_ok=True)
        (d / filename).write_bytes(blob)


def already_present(filename: str) -> bool:
    return all((d / filename).exists() and (d / filename).stat().st_size > 0 for d in TARGET_DIRS)


# --------------------------------------------------------------------------- #
# Main
# --------------------------------------------------------------------------- #
def main() -> None:
    force = "--force" in sys.argv
    for d in TARGET_DIRS:
        d.mkdir(parents=True, exist_ok=True)

    print("Dr. Palaskar Hospital — downloading assets")
    print("Targets:")
    for d in TARGET_DIRS:
        print(f"  • {d}")
    print("-" * 60)

    ok = skipped = failed = 0
    failures: list[str] = []

    # regular images
    for name, url in ASSETS.items():
        if not force and already_present(name):
            print(f"= {name}  (exists, skipping)")
            skipped += 1
            continue
        print(f"↓ {name}")
        blob = fetch(url)
        if blob:
            write_all(name, blob)
            print(f"    ✓ {len(blob) // 1024} KB")
            ok += 1
        else:
            failed += 1
            failures.append(name)

    print("-" * 60)
    print(f"Done.  downloaded={ok}  skipped={skipped}  failed={failed}")
    if failures:
        print("\nThese could not be downloaded (the site will use SVG placeholders):")
        for f in failures:
            print(f"  - {f}")
        print("\nTip: re-run later, or drop the files into the media folders manually.")


if __name__ == "__main__":
    main()
