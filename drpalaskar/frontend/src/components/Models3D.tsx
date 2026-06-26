"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

function mat(color: number, opts: Record<string, unknown> = {}) {
  return new THREE.MeshStandardMaterial(Object.assign({ color, roughness: 0.55, metalness: 0.06 }, opts));
}

function buildSpine() {
  const g = new THREE.Group();
  const bone = mat(0xf1ecdf, { roughness: 0.5 });
  const disc = mat(0x18c4bd, { roughness: 0.3, metalness: 0.25, emissive: 0x0a6463, emissiveIntensity: 0.3 });
  const N = 24, H = 15;
  const pts: { y: number; z: number }[] = [];
  for (let i = 0; i < N; i++) {
    const t = i / (N - 1);
    const y = (0.5 - t) * H;
    const z = Math.sin(t * Math.PI) * 1.7 - Math.sin(t * Math.PI * 2) * 0.9 - 0.3;
    const r = 0.45 + t * 0.75;
    pts.push({ y, z });
    const v = new THREE.Group();
    v.add(new THREE.Mesh(new THREE.CylinderGeometry(r * 0.82, r, 0.42 + t * 0.12, 20), bone));
    const sp = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.4, 0.95 + t * 0.5), bone);
    sp.position.set(0, -0.04, -r * 1.05); sp.rotation.x = 0.5; v.add(sp);
    [-1, 1].forEach((s) => {
      const tp = new THREE.Mesh(new THREE.BoxGeometry(0.85 + t * 0.4, 0.22, 0.3), bone);
      tp.position.set(s * (r * 0.85), 0, -r * 0.2); tp.rotation.z = s * -0.2; v.add(tp);
    });
    v.position.set(0, y, z);
    if (i > 0) v.rotation.x = Math.atan2(z - pts[i - 1].z, H / N) * 0.6;
    g.add(v);
    if (i > 0) {
      const d = new THREE.Mesh(new THREE.CylinderGeometry(r * 0.8, r * 0.8, 0.16, 18), disc);
      d.position.set(0, (y + pts[i - 1].y) / 2, (z + pts[i - 1].z) / 2);
      d.rotation.x = v.rotation.x; g.add(d);
    }
  }
  const skull = new THREE.Mesh(new THREE.SphereGeometry(1.0, 20, 16), bone);
  skull.position.set(0, pts[0].y + 1.1, pts[0].z + 0.2); skull.scale.set(1, 1.1, 1.05); g.add(skull);
  const sac = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 1.3, 1.8, 18), bone);
  sac.position.set(0, pts[N - 1].y - 1.0, pts[N - 1].z + 0.1); g.add(sac);
  g.scale.setScalar(0.92);
  return g;
}

export default function Models3D() {
  const stageRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    let cleanup = () => {};
    try {
      cleanup = build(stage);
    } catch (e) {
      console.warn("[spine] init failed:", e);
      setFailed(true);
    }
    return () => cleanup();
  }, []);

  return (
    <div className="spine-stage" ref={stageRef} aria-label="Interactive 3D spine — cervical to lumbar">
      <div className="spine-hint">Drag to rotate</div>
      {failed && (
        <div className="spine-fallback" aria-hidden="true">
          <svg width="150" height="320" viewBox="0 0 150 320">
            <path d="M75 14 C 40 90,110 220,75 306" fill="none" stroke="rgba(11,31,42,.3)" strokeWidth="3" />
            {Array.from({ length: 10 }).map((_, i) => {
              const y = 24 + i * 28, w = 30 + i * 3;
              return (
                <g key={i}>
                  <rect x={75 - w / 2} y={y} width={w} height="16" rx="7" fill="rgba(11,31,42,.85)" />
                  <rect x={75 - w / 2} y={y + 17} width={w} height="6" rx="3" fill="rgba(22,191,184,.9)" />
                </g>
              );
            })}
          </svg>
        </div>
      )}
    </div>
  );
}

function build(stage: HTMLDivElement): () => void {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const W = stage.clientWidth || 480;
  const H = stage.clientHeight || 480;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, W / H, 0.1, 100);
  camera.position.set(0, 0, 20);
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(W, H);
  renderer.domElement.style.cssText = "position:relative;z-index:1;cursor:grab";
  stage.appendChild(renderer.domElement);

  scene.add(new THREE.AmbientLight(0xffffff, 0.74));
  const key = new THREE.DirectionalLight(0xffffff, 1.18); key.position.set(6, 9, 11); scene.add(key);
  const rim = new THREE.DirectionalLight(0x9fc6d6, 0.5); rim.position.set(-8, -3, -6); scene.add(rim);
  const warm = new THREE.DirectionalLight(0xffe3c8, 0.45); warm.position.set(-4, 6, 7); scene.add(warm);

  const spine = buildSpine();
  scene.add(spine);

  let ry = -0.5, rx = 0.1, tRy = -0.5, tRx = 0.1, auto = !reduced, dragging = false, lx = 0, ly = 0;
  const el = renderer.domElement;
  const down = (x: number, y: number) => { dragging = true; auto = false; lx = x; ly = y; el.style.cursor = "grabbing"; };
  const move = (x: number, y: number) => {
    if (!dragging) return;
    tRy += (x - lx) * 0.01; tRx += (y - ly) * 0.01;
    tRx = Math.max(-0.8, Math.min(0.8, tRx)); lx = x; ly = y;
  };
  const up = () => { dragging = false; el.style.cursor = "grab"; };
  const onMouseDown = (e: MouseEvent) => down(e.clientX, e.clientY);
  const onMouseMove = (e: MouseEvent) => move(e.clientX, e.clientY);
  const onTouchStart = (e: TouchEvent) => down(e.touches[0].clientX, e.touches[0].clientY);
  const onTouchMove = (e: TouchEvent) => move(e.touches[0].clientX, e.touches[0].clientY);
  el.addEventListener("mousedown", onMouseDown);
  window.addEventListener("mousemove", onMouseMove, { passive: true });
  window.addEventListener("mouseup", up);
  el.addEventListener("touchstart", onTouchStart, { passive: true });
  el.addEventListener("touchmove", onTouchMove, { passive: true });
  el.addEventListener("touchend", up);

  let visible = true;
  let io: IntersectionObserver | undefined;
  if ("IntersectionObserver" in window) {
    io = new IntersectionObserver((ents) => { visible = ents[0].isIntersecting; }, { threshold: 0.01 });
    io.observe(stage);
  }
  const onVis = () => { visible = !document.hidden; };
  document.addEventListener("visibilitychange", onVis);

  let cw = W, ch = H;
  const onResize = () => {
    const w = stage.clientWidth, h = stage.clientHeight;
    if (!w || !h || (w === cw && h === ch)) return;
    cw = w; ch = h; camera.aspect = w / h; camera.updateProjectionMatrix(); renderer.setSize(w, h);
  };
  window.addEventListener("resize", onResize, { passive: true });

  let raf = 0;
  const loop = () => {
    raf = requestAnimationFrame(loop);
    if (!visible) return;
    if (auto) tRy += 0.004;
    ry += (tRy - ry) * 0.08; rx += (tRx - rx) * 0.08;
    spine.rotation.y = ry; spine.rotation.x = rx;
    renderer.render(scene, camera);
  };
  loop();

  return () => {
    cancelAnimationFrame(raf);
    io?.disconnect();
    document.removeEventListener("visibilitychange", onVis);
    window.removeEventListener("resize", onResize);
    window.removeEventListener("mousemove", onMouseMove);
    window.removeEventListener("mouseup", up);
    el.removeEventListener("mousedown", onMouseDown);
    el.removeEventListener("touchstart", onTouchStart);
    el.removeEventListener("touchmove", onTouchMove);
    el.removeEventListener("touchend", up);
    scene.traverse((o: THREE.Object3D) => {
      const mesh = o as THREE.Mesh;
      if (mesh.geometry) mesh.geometry.dispose();
      const m = mesh.material;
      if (m) (Array.isArray(m) ? m : [m]).forEach((mm) => mm.dispose());
    });
    renderer.dispose();
    if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
  };
}
