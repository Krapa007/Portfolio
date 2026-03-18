import { useEffect, useRef } from "react";

const C = {
  white: "#f8f4ee", spot: "#1c1c1c", nose: "#0d0d0d", eye: "#1a0f00",
  shine: "#fff", tongue: "#d94f6e", inner: "#f4a0b0",
  collar: "#cc1a00", tag: "#f5c800", outline: "#d4ccbd",
};

function drawDog(dc, cx, cy, flip, state, f) {
  const S = 0.5, lw = 1.4;
  dc.save(); dc.translate(cx, cy); if (flip) dc.scale(-1, 1); dc.scale(S, S);

  const ell = (ex, ey, rx, ry, rot, fill, stroke, sw) => {
    dc.save(); dc.translate(ex, ey); if (rot) dc.rotate(rot);
    dc.beginPath(); dc.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
    if (fill) { dc.fillStyle = fill; dc.fill(); }
    if (stroke) { dc.strokeStyle = stroke; dc.lineWidth = sw || lw; dc.stroke(); }
    dc.restore();
  };

  // Shadow
  dc.save(); dc.globalAlpha = 0.15; dc.fillStyle = "#000";
  dc.beginPath(); dc.ellipse(0, 30, 30, 6, 0, 0, Math.PI * 2); dc.fill(); dc.restore();

  const wag = state === "spin" || state === "backflip" ? Math.sin(f * 0.6) * 30
    : state === "run" ? Math.sin(f * 0.22) * 14
    : Math.sin(f * 0.1) * 20;

  dc.save(); dc.strokeStyle = C.white; dc.lineWidth = 5; dc.lineCap = "round";
  dc.beginPath(); dc.moveTo(-24, -8); dc.bezierCurveTo(-38, -16 - wag * 0.5, -44, -28 - wag, -36, -38 - wag); dc.stroke();
  dc.strokeStyle = "rgba(180,170,155,0.4)"; dc.lineWidth = 1.2; dc.stroke();
  ell(-36, -38 - wag, 4, 4, 0, C.spot, null); dc.restore();

  const legT = f * (state === "spin" || state === "backflip" ? 0.5 : 0.20);
  const running = state === "run" || state === "spin" || state === "backflip";

  if (running) {
    const bkA = Math.sin(legT + Math.PI) * 20, bkB = Math.sin(legT) * 20;
    dc.save(); dc.strokeStyle = C.white; dc.lineWidth = 6; dc.lineCap = "round";
    dc.beginPath(); dc.moveTo(-14, 12); dc.lineTo(-14 + bkA * 0.4, 24); dc.lineTo(-14 + bkA * 0.7, 36); dc.stroke();
    dc.strokeStyle = C.outline; dc.lineWidth = 1; dc.stroke(); ell(-14 + bkA * 0.7, 38, 5, 2.5, 0.2, C.white, C.outline, 1);
    dc.beginPath(); dc.strokeStyle = C.white; dc.lineWidth = 5.5;
    dc.moveTo(-18, 12); dc.lineTo(-18 + bkB * 0.4, 24); dc.lineTo(-18 + bkB * 0.7, 36); dc.stroke();
    dc.strokeStyle = C.outline; dc.lineWidth = 1; dc.stroke(); ell(-18 + bkB * 0.7, 38, 4.5, 2.5, 0.2, C.white, C.outline, 1); dc.restore();
  } else {
    dc.save(); dc.strokeStyle = C.white; dc.lineWidth = 6; dc.lineCap = "round";
    dc.beginPath(); dc.moveTo(-14, 12); dc.lineTo(-14, 26); dc.lineTo(-12, 36); dc.stroke();
    dc.strokeStyle = C.outline; dc.lineWidth = 1; dc.stroke(); ell(-12, 38, 5, 2.5, 0.1, C.white, C.outline, 1);
    dc.beginPath(); dc.strokeStyle = C.white; dc.lineWidth = 5;
    dc.moveTo(-18, 12); dc.lineTo(-18, 26); dc.lineTo(-16, 36); dc.stroke();
    dc.strokeStyle = C.outline; dc.lineWidth = 1; dc.stroke(); ell(-16, 38, 4.5, 2.5, 0.1, C.white, C.outline, 1); dc.restore();
  }

  dc.fillStyle = C.white; dc.strokeStyle = C.outline; dc.lineWidth = lw;
  dc.beginPath(); dc.moveTo(-24, 0);
  dc.bezierCurveTo(-24, -16, -10, -20, 4, -18); dc.bezierCurveTo(16, -17, 24, -12, 24, 0);
  dc.bezierCurveTo(24, 14, 14, 18, 0, 18); dc.bezierCurveTo(-12, 18, -24, 14, -24, 0);
  dc.closePath(); dc.fill(); dc.stroke();

  [
    { x: -16, y: -10, rx: 7,   ry: 4.5, a: 0.5  },
    { x: 2,   y: -14, rx: 5,   ry: 3.5, a: -0.3 },
    { x: 14,  y: -7,  rx: 6,   ry: 3.5, a: 0.2  },
    { x: -4,  y: 10,  rx: 5,   ry: 3,   a: 0.1  },
    { x: 10,  y: 10,  rx: 4,   ry: 3,   a: -0.2 },
    { x: -20, y: 6,   rx: 3.5, ry: 2.5, a: 0.6  },
    { x: 20,  y: 4,   rx: 3.5, ry: 2,   a: -0.1 },
  ].forEach((s) => {
    dc.save(); dc.translate(s.x, s.y); dc.rotate(s.a); dc.fillStyle = C.spot;
    dc.beginPath(); dc.ellipse(0, 0, s.rx, s.ry, 0, 0, Math.PI * 2); dc.fill(); dc.restore();
  });

  if (running) {
    const frA = Math.sin(legT + Math.PI * 0.5) * 22, frB = Math.sin(legT + Math.PI * 1.5) * 22;
    dc.save(); dc.strokeStyle = C.white; dc.lineWidth = 6.5; dc.lineCap = "round";
    dc.beginPath(); dc.moveTo(14, 10); dc.lineTo(14 + frA * 0.35, 22); dc.lineTo(14 + frA * 0.65, 34); dc.stroke();
    dc.strokeStyle = C.outline; dc.lineWidth = 1; dc.stroke(); ell(14 + frA * 0.65, 37, 5.5, 2.5, 0.1, C.white, C.outline, 1);
    dc.beginPath(); dc.strokeStyle = C.white; dc.lineWidth = 6;
    dc.moveTo(10, 10); dc.lineTo(10 + frB * 0.35, 22); dc.lineTo(10 + frB * 0.65, 34); dc.stroke();
    dc.strokeStyle = C.outline; dc.lineWidth = 1; dc.stroke(); ell(10 + frB * 0.65, 37, 5, 2.5, 0.1, C.white, C.outline, 1); dc.restore();
  } else {
    dc.save(); dc.strokeStyle = C.white; dc.lineWidth = 6.5; dc.lineCap = "round";
    dc.beginPath(); dc.moveTo(14, 10); dc.lineTo(14, 24); dc.lineTo(15, 34); dc.stroke();
    dc.strokeStyle = C.outline; dc.lineWidth = 1; dc.stroke(); ell(15, 37, 5.5, 2.5, 0.1, C.white, C.outline, 1);
    dc.beginPath(); dc.strokeStyle = C.white; dc.lineWidth = 6;
    dc.moveTo(10, 10); dc.lineTo(10, 24); dc.lineTo(11, 34); dc.stroke();
    dc.strokeStyle = C.outline; dc.lineWidth = 1; dc.stroke(); ell(11, 37, 5, 2.5, 0.1, C.white, C.outline, 1); dc.restore();
  }

  dc.fillStyle = C.white; dc.strokeStyle = C.outline; dc.lineWidth = lw;
  dc.beginPath(); dc.moveTo(18, -14); dc.bezierCurveTo(26, -14, 30, -24, 28, -30);
  dc.bezierCurveTo(26, -36, 20, -36, 18, -30); dc.bezierCurveTo(16, -24, 12, -18, 18, -14);
  dc.closePath(); dc.fill(); dc.stroke();
  dc.fillStyle = C.spot; dc.save(); dc.translate(23, -22); dc.rotate(0.1);
  dc.beginPath(); dc.ellipse(0, 0, 3.5, 2.5, 0, 0, Math.PI * 2); dc.fill(); dc.restore();

  ell(28, -36, 12, 10, 0.1, C.white, C.outline, lw);
  dc.fillStyle = C.spot; dc.save(); dc.translate(24, -42); dc.rotate(0.2);
  dc.beginPath(); dc.ellipse(0, 0, 5.5, 4, 0, 0, Math.PI * 2); dc.fill(); dc.restore();
  ell(38, -34, 10, 6, 0.05, "#ede6d8", C.outline, 1);
  dc.fillStyle = C.spot; dc.save(); dc.translate(40, -30); dc.rotate(-0.1);
  dc.beginPath(); dc.ellipse(0, 0, 3, 2, 0, 0, Math.PI * 2); dc.fill(); dc.restore();
  ell(47, -36, 5, 3.5, 0, C.nose, null);
  dc.strokeStyle = "rgba(255,255,255,0.25)"; dc.lineWidth = 0.8;
  dc.beginPath(); dc.moveTo(45, -37); dc.lineTo(44, -36); dc.stroke();
  dc.strokeStyle = "rgba(100,80,60,0.5)"; dc.lineWidth = 1;
  dc.beginPath(); dc.moveTo(44, -30); dc.quadraticCurveTo(40, -28, 36, -30); dc.stroke();

  if (running) {
    dc.fillStyle = C.tongue; dc.beginPath(); dc.ellipse(40, -26, 4.5, 6, 0.1, 0, Math.PI * 2); dc.fill();
    dc.fillStyle = C.inner; dc.beginPath(); dc.ellipse(40, -25, 2.5, 4, 0, 0, Math.PI * 2); dc.fill();
  }

  ell(31, -40, 4, 3.8, 0, "#fff", C.outline, 0.8);
  ell(32, -40, 2.4, 2.6, 0, C.eye, null);
  ell(33, -41, 1, 1, 0, C.shine, null);

  dc.fillStyle = C.spot; dc.strokeStyle = "rgba(0,0,0,0.25)"; dc.lineWidth = 1;
  dc.beginPath(); dc.moveTo(22, -44); dc.bezierCurveTo(14, -52, 18, -62, 24, -58);
  dc.bezierCurveTo(30, -54, 30, -46, 26, -44); dc.closePath(); dc.fill(); dc.stroke();
  dc.fillStyle = "rgba(255,255,255,.15)"; dc.beginPath(); dc.ellipse(24, -52, 3.5, 5, 0.1, 0, Math.PI * 2); dc.fill();

  dc.fillStyle = C.collar; dc.strokeStyle = "rgba(150,0,0,0.6)"; dc.lineWidth = 0.8;
  dc.beginPath(); dc.moveTo(18, -20); dc.bezierCurveTo(22, -16, 30, -16, 34, -18);
  dc.bezierCurveTo(30, -22, 22, -24, 18, -20); dc.closePath(); dc.fill(); dc.stroke();
  dc.fillStyle = C.tag; dc.beginPath(); dc.arc(27, -15, 3.5, 0, Math.PI * 2); dc.fill();
  dc.strokeStyle = "rgba(180,140,0,0.6)"; dc.lineWidth = 0.8; dc.stroke();

  // ── Sleep hat (late night mode) ──
  if (state === "sleepy") {
    dc.save(); dc.translate(28, -52);
    // Hat brim
    dc.fillStyle = "#1e40af"; dc.strokeStyle = "#1e3a8a"; dc.lineWidth = 1;
    dc.beginPath(); dc.ellipse(0, 0, 14, 4, -0.1, 0, Math.PI * 2); dc.fill(); dc.stroke();
    // Hat body
    dc.beginPath(); dc.moveTo(-9, 0); dc.lineTo(-6, -22); dc.lineTo(10, -18); dc.lineTo(8, 0); dc.closePath();
    dc.fillStyle = "#1d4ed8"; dc.fill(); dc.stroke();
    // Pompom
    dc.fillStyle = "#fff"; dc.beginPath(); dc.arc(9, -19, 4, 0, Math.PI * 2); dc.fill();
    // Zzz
    dc.fillStyle = "#93c5fd"; dc.font = "bold 14px sans-serif";
    dc.fillText("z", 18, -22); dc.font = "bold 10px sans-serif"; dc.fillText("z", 24, -28);
    dc.restore();
  }

  dc.restore();
}

function drawPaw(dc, p) {
  dc.save(); dc.globalAlpha = p.life * 0.35; dc.translate(p.x, p.y);
  if (!p.fr) dc.scale(-1, 1);
  dc.fillStyle = p.heart ? "#f43f5e" : "#f97316";
  if (p.heart) {
    // Draw a heart
    dc.font = `${14 * p.life + 6}px sans-serif`;
    dc.textAlign = "center"; dc.textBaseline = "middle";
    dc.fillText("❤️", 0, 0);
  } else {
    dc.beginPath(); dc.ellipse(0, 0, 5, 4, 0, 0, Math.PI * 2); dc.fill();
    [[-5,-5],[0,-7],[5,-5]].forEach(([ox,oy])=>{dc.beginPath();dc.ellipse(ox,oy,2.5,2,0,0,Math.PI*2);dc.fill();});
  }
  dc.restore();
}

function drawBubble(dc, x, y, msg) {
  dc.save(); dc.font = "bold 13px 'Sora', sans-serif";
  const tw = dc.measureText(msg).width;
  const bw = tw + 22, bh = 28, bx = x - bw / 2, by = y - 72;
  dc.fillStyle = "rgba(255,255,255,.95)"; dc.strokeStyle = "rgba(200,190,180,.5)"; dc.lineWidth = 1;
  dc.beginPath();
  if (dc.roundRect) dc.roundRect(bx, by, bw, bh, 8); else dc.rect(bx, by, bw, bh);
  dc.fill(); dc.stroke();
  dc.beginPath(); dc.moveTo(x - 5, by + bh); dc.lineTo(x, by + bh + 8); dc.lineTo(x + 5, by + bh);
  dc.closePath(); dc.fillStyle = "rgba(255,255,255,.95)"; dc.fill();
  dc.fillStyle = "#111"; dc.fillText(msg, bx + 11, by + bh - 7);
  dc.restore();
}

export default function DogCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const cnv = canvasRef.current;
    const dc = cnv.getContext("2d");
    let animId, pauseId;
    let W = window.innerWidth, H = window.innerHeight;

    const rsz = () => { W = window.innerWidth; H = window.innerHeight; cnv.width = W; cnv.height = H; };
    rsz(); window.addEventListener("resize", rsz);

    let mx = W / 2, my = H / 2, bx = mx, by = my;
    const onMM = (e) => { mx = e.clientX; my = e.clientY; };
    document.addEventListener("mousemove", onMM);

    let dx = 200, dy = 400, dvx = 0, dvy = 0;
    let facingR = true, frame = 0, dogState = "sit";
    const paws = []; let pawDist = 0, woofLife = 0;
    const onCk = () => { woofLife = 120; };
    document.addEventListener("click", onCk);

    // ── Tether ──────────────────────────────────────────────
    let tether = null, tetherBubble = "";
    const onTetherSkills   = () => { tether = { x: W-80, y: H-80 }; tetherBubble = "studying 📚"; };
    const onTetherProjects = () => { tether = { x: 80,   y: H-80 }; tetherBubble = "inspecting 🔍"; };
    const onUntether       = () => {
      // Don't untether if in footer mode
      if (tetherBubble === "that's all folks! 🐾") return;
      tether = null; tetherBubble = "";
    };
    window.addEventListener("dog:tether:skills",   onTetherSkills);
    window.addEventListener("dog:tether:projects", onTetherProjects);
    window.addEventListener("dog:untether",        onUntether);

    // ── Spin ────────────────────────────────────────────────
    let spinFrames = 0, spinAngle = 0;
    const onSpin = () => { spinFrames = 90; };
    window.addEventListener("dog:spin", onSpin);

    // ── Backflip (double spin, faster) ──────────────────────
    let backflipFrames = 0, backflipAngle = 0;
    const onBackflip = () => { backflipFrames = 120; };
    window.addEventListener("dog:backflip", onBackflip);

    // ── Heart paw trail ─────────────────────────────────────
    let heartsActive = false, heartsTimer = null;
    const onHearts = () => {
      heartsActive = true;
      clearTimeout(heartsTimer);
      heartsTimer = setTimeout(() => { heartsActive = false; }, 3000);
    };
    window.addEventListener("dog:hearts", onHearts);

    // ── Footer sit ──────────────────────────────────────────
    const onFooter = () => { tether = { x: W-100, y: H-70 }; tetherBubble = "that's all folks! 🐾"; };
    const onFooterLeave = () => { if (tetherBubble === "that's all folks! 🐾") { tether = null; tetherBubble = ""; } };
    window.addEventListener("dog:footer",       onFooter);
    window.addEventListener("dog:footer:leave", onFooterLeave);

    // ── Late night mode ──────────────────────────────────────
    let isLateNight = false;
    const onLateNight = () => { isLateNight = true; };
    window.addEventListener("dog:latenight", onLateNight);

    const shouldAnimate = () => !document.body.classList.contains("reduced-motion");

    const loop = () => {
      if (!shouldAnimate()) { pauseId = setTimeout(loop, 220); return; }

      frame++;
      dc.clearRect(0, 0, W, H);

      bx += (mx - bx) * 0.14; by += (my - by) * 0.14;

      // Update tether on resize
      if (tether) {
        if (tetherBubble === "studying 📚")         { tether.x = W-80;  tether.y = H-80; }
        if (tetherBubble === "inspecting 🔍")       { tether.x = 80;    tether.y = H-80; }
        if (tetherBubble === "that's all folks! 🐾"){ tether.x = W-100; tether.y = H-70; }
      }

      const chaseX = tether ? tether.x : bx;
      const chaseY = tether ? tether.y : by;

      const ddx = chaseX - dx, ddy = chaseY - dy;
      dvx += ddx * 0.032; dvy += ddy * 0.032;
      dvx *= 0.76; dvy *= 0.76;
      dx += dvx; dy += dvy;
      dx = Math.max(50, Math.min(W-50, dx));
      dy = Math.max(50, Math.min(H-50, dy));

      const spd = Math.hypot(dvx, dvy);
      if (dvx > 0.5) facingR = true;
      if (dvx < -0.5) facingR = false;

      // State priority: backflip > spin > normal
      if (backflipFrames > 0) {
        backflipFrames--; backflipAngle += 0.38; // faster than spin
        dogState = "backflip";
      } else if (spinFrames > 0) {
        spinFrames--; spinAngle += 0.23;
        dogState = "spin";
      } else {
        backflipAngle = 0; spinAngle = 0;
        dogState = isLateNight && spd < 2 ? "sleepy" : spd > 1.5 ? "run" : isLateNight ? "sleepy" : "sit";
      }

      // Paw trail
      if (spd > 2 && !tether) {
        pawDist += spd;
        if (pawDist > 32) {
          pawDist = 0;
          paws.push({ x: dx, y: dy+30, fr: facingR, life: 1, heart: heartsActive });
        }
      }
      // Heart paws burst even when standing still
      if (heartsActive && frame % 12 === 0) {
        const spread = (Math.random() - 0.5) * 60;
        paws.push({ x: dx + spread, y: dy + 20 + Math.random()*20, fr: facingR, life: 1, heart: true });
      }
      for (let i = paws.length-1; i>=0; i--) {
        paws[i].life -= 0.008;
        if (paws[i].life <= 0) { paws.splice(i, 1); continue; }
        drawPaw(dc, paws[i]);
      }

      // Draw dog
      const rotAngle = backflipFrames > 0 ? backflipAngle : spinAngle;
      const isRotating = dogState === "spin" || dogState === "backflip";
      if (isRotating) {
        dc.save(); dc.translate(dx, dy); dc.rotate(rotAngle);
        drawDog(dc, 0, 0, !facingR, dogState, frame);
        dc.restore();
      } else {
        drawDog(dc, dx, dy, !facingR, dogState, frame);
      }

      // Bubbles
      if (tether && tetherBubble && spd < 2) {
        drawBubble(dc, dx, dy, tetherBubble);
      } else if (woofLife > 0) {
        woofLife--;
        drawBubble(dc, dx, dy, "woof! 🐾");
      }

      animId = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(pauseId);
      clearTimeout(heartsTimer);
      window.removeEventListener("resize", rsz);
      document.removeEventListener("mousemove", onMM);
      document.removeEventListener("click", onCk);
      window.removeEventListener("dog:tether:skills",   onTetherSkills);
      window.removeEventListener("dog:tether:projects", onTetherProjects);
      window.removeEventListener("dog:untether",        onUntether);
      window.removeEventListener("dog:spin",            onSpin);
      window.removeEventListener("dog:backflip",        onBackflip);
      window.removeEventListener("dog:hearts",          onHearts);
      window.removeEventListener("dog:footer",          onFooter);
      window.removeEventListener("dog:footer:leave",    onFooterLeave);
      window.removeEventListener("dog:latenight",       onLateNight);
    };
  }, []);

  return (
    <canvas ref={canvasRef} className="dog-canvas"
      style={{ position: "fixed", inset: 0, zIndex: 999998, pointerEvents: "none" }} />
  );
}
