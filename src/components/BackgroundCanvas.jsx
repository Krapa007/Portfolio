import { useEffect, useRef } from "react";

export default function BackgroundCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const c = canvasRef.current;
    const x = c.getContext("2d");
    let W, H, animId, pauseId;
    let staticDrawn = false;

    const resize = () => {
      W = c.width = window.innerWidth;
      H = c.height = window.innerHeight;
      staticDrawn = false; // force redraw after resize
    };
    resize();
    window.addEventListener("resize", resize);

    let cmx = W / 2, cmy = H / 2, smx = W / 2, smy = H / 2;
    const onMM = (e) => { cmx = e.clientX; cmy = e.clientY; };
    document.addEventListener("mousemove", onMM);

    // Particles array — built once
    const N = 130;
    const pts = Array.from({ length: N }, () => {
      const vx = (Math.random() - 0.5) * 0.4, vy = (Math.random() - 0.5) * 0.4;
      return {
        x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight,
        ox: vx, oy: vy, vx, vy,
        r: Math.random() * 2.2 + 0.8, a: Math.random() * 0.6 + 0.2,
        ph: Math.random() * Math.PI * 2, burst: false, life: 1,
      };
    });

    const ripples = [];
    const onCk = (e) => {
      ripples.push({ x: e.clientX, y: e.clientY, r: 0, life: 1 });
      for (let i = 0; i < 8; i++) {
        const ang = Math.random() * Math.PI * 2, spd = 2 + Math.random() * 4;
        pts.push({
          x: e.clientX, y: e.clientY,
          vx: Math.cos(ang) * spd, vy: Math.sin(ang) * spd,
          ox: 0, oy: 0, r: 1.5 + Math.random() * 2,
          a: 0.8, ph: Math.random() * Math.PI * 2, burst: true, life: 1,
        });
      }
    };
    document.addEventListener("click", onCk);

    // ── bg:accent — skills row signals a color, fades back to orange ──
    const BASE = { r: 255, g: 69, b: 0 };
    let accent = { ...BASE };
    let accentStr = 0; // 0–1, decays each frame

    const onAccent = (e) => {
      const col = e?.detail?.color;
      if (col && col.length >= 3) {
        accent = { r: col[0], g: col[1], b: col[2] };
        accentStr = 1;
      } else {
        accentStr = 0;
      }
    };
    window.addEventListener("bg:accent", onAccent);

    const blnd = (a, b, t) => Math.round(a + (b - a) * t);
    const getAccent = () =>
      accentStr <= 0.01
        ? BASE
        : { r: blnd(BASE.r, accent.r, accentStr), g: blnd(BASE.g, accent.g, accentStr), b: blnd(BASE.b, accent.b, accentStr) };

    const isLt = () => document.body.classList.contains("light");
    const AR = (a) => {
      const ac = getAccent();
      return isLt()
        ? `rgba(${Math.max(0, ac.r - 31)},${Math.max(0, ac.g - 16)},${Math.max(0, ac.b - 24)},${a})`
        : `rgba(${ac.r},${ac.g},${ac.b},${a})`;
    };
    const AB = (a) => {
      const ac = getAccent();
      return isLt()
        ? `rgba(${Math.max(0, ac.r - 55)},${Math.max(0, ac.g - 29)},${Math.max(0, ac.b - 40)},${a})`
        : `rgba(${Math.min(255, ac.r + 20)},${Math.min(255, ac.g + 51)},${Math.min(255, ac.b + 40)},${a})`;
    };

    // ── bg:matrix — Konami code activates matrix rain for 5s ──
    let matrixMode = false, matrixTimer = null;
    const matrixCols = [];
    const onMatrix = () => {
      matrixMode = true;
      // Init columns
      matrixCols.length = 0;
      const cols = Math.floor(W / 16);
      for (let i = 0; i < cols; i++) matrixCols.push({ y: Math.random() * H, speed: 1 + Math.random() * 3 });
      clearTimeout(matrixTimer);
      matrixTimer = setTimeout(() => { matrixMode = false; }, 5000);
    };
    window.addEventListener("bg:matrix", onMatrix);

    const auroraWaves = [
      { y: 0.18, amp: 100, freq: 0.003,  spd: 0.001,  phase: 0,   col: [240, 90, 40]  },
      { y: 0.36, amp: 80,  freq: 0.004,  spd: 0.0014, phase: 2.1, col: [255, 120, 50]  },
      { y: 0.55, amp: 90,  freq: 0.0035, spd: 0.0011, phase: 4.2, col: [220, 60, 20]   },
      { y: 0.74, amp: 65,  freq: 0.005,  spd: 0.0018, phase: 1.3, col: [255, 150, 70]  },
      { y: 0.91, amp: 55,  freq: 0.006,  spd: 0.0022, phase: 3.5, col: [200, 80, 30]   },
    ];

    const mkMeteor = () => ({
      x: Math.random() * window.innerWidth * 1.5 - window.innerWidth * 0.25, y: -60,
      vx: 2 + Math.random() * 4, vy: 3 + Math.random() * 5,
      len: 120 + Math.random() * 180, alpha: 0.8 + Math.random() * 0.2,
      active: Math.random() > 0.5, delay: Math.random() * 400,
    });
    const meteors = Array.from({ length: 9 }, mkMeteor);

    const orbiters = [
      { a: 0,              spd: 0.009, rad: 200, sz: 220, op: 0.28 },
      { a: Math.PI * 0.66, spd: 0.013, rad: 150, sz: 170, op: 0.22 },
      { a: Math.PI * 1.33, spd: 0.007, rad: 250, sz: 280, op: 0.14 },
    ];

    let blobX = W * 0.5, blobY = H * 0.5, t = 0;

    const shouldAnimate = () => !document.body.classList.contains("reduced-motion");

    // Static fallback — drawn once when animations are off
    const drawStatic = () => {
      x.clearRect(0, 0, W, H);
      const ac = getAccent();
      const glow = x.createRadialGradient(W * 0.15, H * 0.2, 0, W * 0.15, H * 0.2, 360);
      glow.addColorStop(0, `rgba(${ac.r},${ac.g},${ac.b},${isLt() ? 0.08 : 0.18})`);
      glow.addColorStop(1, "transparent");
      x.fillStyle = glow;
      x.beginPath(); x.arc(W * 0.15, H * 0.2, 360, 0, Math.PI * 2); x.fill();
    };

    const tick = () => {
      if (!shouldAnimate()) {
        if (!staticDrawn) { drawStatic(); staticDrawn = true; }
        pauseId = setTimeout(tick, 220);
        return;
      }

      // ── Matrix rain override ──
      if (matrixMode) {
        x.fillStyle = isLt() ? "rgba(245,240,232,0.18)" : "rgba(13,14,20,0.18)";
        x.fillRect(0, 0, W, H);
        x.font = "14px 'Fira Code', monospace";
        matrixCols.forEach((col, i) => {
          const char = String.fromCharCode(0x30A0 + Math.random() * 96);
          const brightness = Math.random();
          x.fillStyle = brightness > 0.92 ? "#ffffff" : `rgba(240,90,40,${0.4 + brightness * 0.5})`;
          x.fillText(char, i * 16, col.y);
          col.y += col.speed;
          if (col.y > H + 20) col.y = -20;
        });
        animId = requestAnimationFrame(tick);
        return;
      }

      // ── Normal animation ──
      staticDrawn = false;
      t += 0.007;
      x.clearRect(0, 0, W, H);

      // Decay accent color back to orange
      accentStr *= 0.94;
      if (accentStr < 0.01) accentStr = 0;

      smx += (cmx - smx) * 0.055; smy += (cmy - smy) * 0.055;
      blobX += (cmx - blobX) * 0.04; blobY += (cmy - blobY) * 0.04;

      // 1. Aurora bands
      auroraWaves.forEach((w) => {
        w.phase += w.spd;
        const yBase = H * w.y;
        const [r, g, b] = w.col;
        const ao = isLt() ? 0.10 : 0.22;
        const grad = x.createLinearGradient(0, yBase - w.amp * 2, 0, yBase + w.amp * 2);
        grad.addColorStop(0, "transparent");
        grad.addColorStop(0.3, `rgba(${r},${g},${b},${ao})`);
        grad.addColorStop(0.5, `rgba(${r},${g},${b},${ao * 1.7})`);
        grad.addColorStop(0.7, `rgba(${r},${g},${b},${ao})`);
        grad.addColorStop(1, "transparent");
        x.fillStyle = grad; x.beginPath();
        x.moveTo(0, yBase + Math.sin(w.phase) * w.amp);
        for (let px = 0; px <= W; px += 12) {
          const py = yBase
            + Math.sin(w.phase + px * w.freq) * w.amp
            + Math.sin(w.phase * 0.7 + px * w.freq * 0.6) * w.amp * 0.4;
          x.lineTo(px, py);
        }
        x.lineTo(W, yBase + w.amp * 4); x.lineTo(0, yBase + w.amp * 4);
        x.closePath(); x.fill();
      });

      // 2. Grid
      const GRID = 80;
      for (let gx = 0; gx <= W; gx += GRID)
        for (let gy = 0; gy <= H; gy += GRID) {
          const d = Math.hypot(gx - smx, gy - smy), bright = Math.max(0, 1 - d / 420);
          x.strokeStyle = AR(isLt() ? 0.04 + bright * 0.22 : 0.08 + bright * 0.32);
          x.lineWidth = 0.7;
          if (gx + GRID <= W) { x.beginPath(); x.moveTo(gx, gy); x.lineTo(gx + GRID, gy); x.stroke(); }
          if (gy + GRID <= H) { x.beginPath(); x.moveTo(gx, gy); x.lineTo(gx, gy + GRID); x.stroke(); }
        }

      // 3. Cursor blob + orbiters
      {
        const g = x.createRadialGradient(blobX, blobY, 0, blobX, blobY, 380);
        g.addColorStop(0, AR(isLt() ? 0.20 : 0.36));
        g.addColorStop(0.45, AR(isLt() ? 0.07 : 0.13));
        g.addColorStop(1, "transparent");
        x.fillStyle = g; x.beginPath(); x.arc(blobX, blobY, 380, 0, Math.PI * 2); x.fill();
      }
      orbiters.forEach((ob) => {
        ob.a += ob.spd;
        const ox = smx + Math.cos(ob.a) * ob.rad, oy = smy + Math.sin(ob.a) * ob.rad;
        const g = x.createRadialGradient(ox, oy, 0, ox, oy, ob.sz);
        g.addColorStop(0, AB(ob.op)); g.addColorStop(1, "transparent");
        x.fillStyle = g; x.beginPath(); x.arc(ox, oy, ob.sz, 0, Math.PI * 2); x.fill();
      });

      // 4. Magnetic field lines (dark mode only)
      if (!isLt()) {
        for (let fi = 0; fi < 12; fi++) {
          const baseAngle = (fi / 12) * Math.PI * 2 + t * 0.2;
          x.beginPath(); let fx = smx, fy = smy; x.moveTo(fx, fy);
          for (let s = 0; s < 28; s++) {
            const ang = baseAngle + Math.sin(t + s * 0.3) * 0.6;
            fx += Math.cos(ang) * (8 + s * 0.5) * 0.4;
            fy += Math.sin(ang) * (8 + s * 0.5) * 0.4;
            x.lineTo(fx, fy);
          }
          x.strokeStyle = AR(Math.max(0, 0.12 - fi * 0.005)); x.lineWidth = 0.6; x.stroke();
        }
      }

      // 5. Ambient blobs
      [
        { bx: W * 0.85 + Math.cos(t * 0.52) * W * 0.06, by: H * 0.18 + Math.sin(t * 0.44) * H * 0.09, r: 240, o: isLt() ? 0.12 : 0.22 },
        { bx: W * 0.12 + Math.sin(t * 0.76) * W * 0.06, by: H * 0.82 + Math.cos(t * 0.58) * H * 0.07, r: 200, o: isLt() ? 0.10 : 0.18 },
        { bx: W * 0.5  + Math.cos(t * 0.33) * W * 0.08, by: H * 0.5  + Math.sin(t * 0.41) * H * 0.06, r: 180, o: isLt() ? 0.06 : 0.12 },
      ].forEach((b) => {
        const g = x.createRadialGradient(b.bx, b.by, 0, b.bx, b.by, b.r);
        g.addColorStop(0, AR(b.o)); g.addColorStop(1, "transparent");
        x.fillStyle = g; x.beginPath(); x.arc(b.bx, b.by, b.r, 0, Math.PI * 2); x.fill();
      });

      // 6. Meteors
      meteors.forEach((m) => {
        if (!m.active) { m.delay--; if (m.delay <= 0) m.active = true; return; }
        m.x += m.vx; m.y += m.vy;
        if (m.x > W + 200 || m.y > H + 200) {
          Object.assign(m, mkMeteor()); m.active = false; m.delay = 60 + Math.random() * 300;
        }
        const ang = Math.atan2(m.vy, m.vx);
        const mg = x.createLinearGradient(m.x - Math.cos(ang) * m.len, m.y - Math.sin(ang) * m.len, m.x, m.y);
        mg.addColorStop(0, "transparent");
        mg.addColorStop(0.6, AR(isLt() ? m.alpha * 0.5 : m.alpha * 0.75));
        mg.addColorStop(1, AR(isLt() ? m.alpha * 0.9 : m.alpha));
        x.strokeStyle = mg; x.lineWidth = 2; x.lineCap = "round";
        x.beginPath(); x.moveTo(m.x - Math.cos(ang) * m.len, m.y - Math.sin(ang) * m.len); x.lineTo(m.x, m.y); x.stroke();
        const mg2 = x.createRadialGradient(m.x, m.y, 0, m.x, m.y, 14);
        mg2.addColorStop(0, AR(isLt() ? 0.7 : 1)); mg2.addColorStop(1, "transparent");
        x.fillStyle = mg2; x.beginPath(); x.arc(m.x, m.y, 14, 0, Math.PI * 2); x.fill();
      });

      // 7. Particles
      for (let i = pts.length - 1; i >= 0; i--) {
        const p = pts[i];
        if (p.burst) {
          p.life -= 0.018;
          if (p.life <= 0) { pts.splice(i, 1); continue; }
          p.vx *= 0.94; p.vy *= 0.94; p.vy += 0.05;
        }
        const pd = Math.hypot(p.x - smx, p.y - smy);
        if (pd < 120 && pd > 0 && !p.burst) {
          const f = (120 - pd) / 120;
          p.vx += (p.x - smx) / pd * f * 1.4;
          p.vy += (p.y - smy) / pd * f * 1.4;
        }
        if (!p.burst) { p.vx += (p.ox - p.vx) * 0.04; p.vy += (p.oy - p.vy) * 0.04; }
        p.x += p.vx; p.y += p.vy; p.ph += 0.022;
        if (!p.burst) {
          if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
          if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        }
        const prox = Math.max(0, 1 - pd / 200);
        const al = (p.burst ? p.life * 0.7 : p.a) * (0.5 + Math.sin(p.ph) * 0.5) + prox * 0.3;
        const pg = x.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 8);
        pg.addColorStop(0, AR(al * 0.8)); pg.addColorStop(1, "transparent");
        x.fillStyle = pg; x.beginPath(); x.arc(p.x, p.y, p.r * 8, 0, Math.PI * 2); x.fill();
        x.beginPath(); x.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        x.fillStyle = AR(Math.min(al * 2, 1)); x.fill();
      }

      // 8. Connection lines
      const stable = pts.filter((p) => !p.burst);
      for (let i = 0; i < stable.length; i++)
        for (let j = i + 1; j < stable.length; j++) {
          const d = Math.hypot(stable[i].x - stable[j].x, stable[i].y - stable[j].y);
          if (d < 150) {
            const md = Math.hypot((stable[i].x + stable[j].x) / 2 - smx, (stable[i].y + stable[j].y) / 2 - smy);
            x.strokeStyle = AR((1 - d / 150) * 0.22 + Math.max(0, 1 - md / 200) * 0.4);
            x.lineWidth = 0.9;
            x.beginPath(); x.moveTo(stable[i].x, stable[i].y); x.lineTo(stable[j].x, stable[j].y); x.stroke();
          }
        }

      // 9. Cursor spotlight
      const sp = x.createRadialGradient(smx, smy, 0, smx, smy, 140);
      sp.addColorStop(0, AR(0.1)); sp.addColorStop(1, "transparent");
      x.fillStyle = sp; x.beginPath(); x.arc(smx, smy, 140, 0, Math.PI * 2); x.fill();

      // 10. Click ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i]; rp.r += 8; rp.life -= 0.018;
        if (rp.life <= 0) { ripples.splice(i, 1); continue; }
        x.beginPath(); x.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
        x.strokeStyle = AR(rp.life * 0.55); x.lineWidth = 2.5; x.stroke();
        if (rp.r > 30) {
          x.beginPath(); x.arc(rp.x, rp.y, rp.r * 0.62, 0, Math.PI * 2);
          x.strokeStyle = AB(rp.life * 0.35); x.lineWidth = 1.5; x.stroke();
        }
        if (rp.r > 60) {
          x.beginPath(); x.arc(rp.x, rp.y, rp.r * 0.3, 0, Math.PI * 2);
          x.strokeStyle = AR(rp.life * 0.2); x.lineWidth = 1; x.stroke();
        }
      }

      animId = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(pauseId);
      clearTimeout(matrixTimer);
      window.removeEventListener("resize", resize);
      document.removeEventListener("mousemove", onMM);
      document.removeEventListener("click", onCk);
      window.removeEventListener("bg:accent", onAccent);
      window.removeEventListener("bg:matrix", onMatrix);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
        width: "100%", height: "100%",
        zIndex: 0, pointerEvents: "none",
        display: "block",
      }}
    />
  );
}
