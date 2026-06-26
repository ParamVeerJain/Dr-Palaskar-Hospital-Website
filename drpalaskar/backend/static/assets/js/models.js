/* ============================================================
   models.js — interactive 3D spine (cervical → lumbar)
   Auto-rotates only (no dragging). Uses global THREE (r128).
   ============================================================ */
(function () {
  "use strict";

  function mat(THREE, color, opts) {
    return new THREE.MeshStandardMaterial(
      Object.assign({ color: color, roughness: 0.55, metalness: 0.06 }, opts || {})
    );
  }

  function buildSpine(THREE) {
    var g = new THREE.Group();
    var bone = mat(THREE, 0xf1ecdf, { roughness: 0.5 });
    var disc = mat(THREE, 0x18c4bd, { roughness: 0.3, metalness: 0.25, emissive: 0x0a6463, emissiveIntensity: 0.3 });
    var N = 24, H = 15, pts = [];
    for (var i = 0; i < N; i++) {
      var t = i / (N - 1);
      var y = (0.5 - t) * H;
      var z = Math.sin(t * Math.PI) * 1.7 - Math.sin(t * Math.PI * 2) * 0.9 - 0.3;
      var r = 0.45 + t * 0.75;
      pts.push({ y: y, z: z });
      var v = new THREE.Group();
      v.add(new THREE.Mesh(new THREE.CylinderGeometry(r * 0.82, r, 0.42 + t * 0.12, 20), bone));
      var sp = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.4, 0.95 + t * 0.5), bone);
      sp.position.set(0, -0.04, -r * 1.05); sp.rotation.x = 0.5; v.add(sp);
      [-1, 1].forEach(function (s) {
        var tp = new THREE.Mesh(new THREE.BoxGeometry(0.85 + t * 0.4, 0.22, 0.3), bone);
        tp.position.set(s * (r * 0.85), 0, -r * 0.2); tp.rotation.z = s * -0.2; v.add(tp);
      });
      v.position.set(0, y, z);
      if (i > 0) v.rotation.x = Math.atan2(z - pts[i - 1].z, H / N) * 0.6;
      g.add(v);
      if (i > 0) {
        var d = new THREE.Mesh(new THREE.CylinderGeometry(r * 0.8, r * 0.8, 0.16, 18), disc);
        d.position.set(0, (y + pts[i - 1].y) / 2, (z + pts[i - 1].z) / 2);
        d.rotation.x = v.rotation.x; g.add(d);
      }
    }
    var skull = new THREE.Mesh(new THREE.SphereGeometry(1.0, 20, 16), bone);
    skull.position.set(0, pts[0].y + 1.1, pts[0].z + 0.2); skull.scale.set(1, 1.1, 1.05); g.add(skull);
    var sac = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 1.3, 1.8, 18), bone);
    sac.position.set(0, pts[N - 1].y - 1.0, pts[N - 1].z + 0.1); g.add(sac);
    g.scale.setScalar(0.92);
    return g;
  }

  window.initModels = function (stage) {
    if (!stage) return;
    if (!window.THREE) {
      stage.insertAdjacentHTML("beforeend",
        '<div class="spine-fallback"><svg width="150" height="320" viewBox="0 0 150 320">' +
        '<path d="M75 14 C 40 90,110 220,75 306" fill="none" stroke="rgba(11,31,42,.3)" stroke-width="3"/>' +
        Array.from({ length: 10 }).map(function (_, i) {
          var y = 24 + i * 28, w = 30 + i * 3;
          return '<rect x="' + (75 - w / 2) + '" y="' + y + '" width="' + w + '" height="16" rx="7" fill="rgba(11,31,42,.85)"/>' +
                 '<rect x="' + (75 - w / 2) + '" y="' + (y + 17) + '" width="' + w + '" height="6" rx="3" fill="rgba(22,191,184,.9)"/>';
        }).join("") + "</svg></div>");
      return;
    }
    var THREE = window.THREE;
    var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    var W = stage.clientWidth || 480, H = stage.clientHeight || 480;
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(34, W / H, 0.1, 100);
    camera.position.set(0, 0, 20);
    var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(W, H);
    renderer.domElement.style.cssText = "position:relative;z-index:1;pointer-events:none";
    stage.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 0.74));
    var key = new THREE.DirectionalLight(0xffffff, 1.18); key.position.set(6, 9, 11); scene.add(key);
    var rim = new THREE.DirectionalLight(0x9fc6d6, 0.5); rim.position.set(-8, -3, -6); scene.add(rim);
    var warm = new THREE.DirectionalLight(0xffe3c8, 0.45); warm.position.set(-4, 6, 7); scene.add(warm);

    var spine = buildSpine(THREE);
    spine.rotation.x = 0.1;
    scene.add(spine);

    var visible = true;
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (e) { visible = e[0].isIntersecting; }, { threshold: 0.01 }).observe(stage);
    }
    document.addEventListener("visibilitychange", function () { visible = !document.hidden; });
    var cw = W, ch = H;
    addEventListener("resize", function () {
      var w = stage.clientWidth, h = stage.clientHeight;
      if (!w || !h || (w === cw && h === ch)) return;
      cw = w; ch = h; camera.aspect = w / h; camera.updateProjectionMatrix(); renderer.setSize(w, h);
    }, { passive: true });

    (function loop() {
      requestAnimationFrame(loop);
      if (!visible) return;
      if (!reduced) spine.rotation.y += 0.005;
      renderer.render(scene, camera);
    })();
  };
})();