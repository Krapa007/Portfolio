import { useEffect } from "react";

// ── Confetti burst ──────────────────────────────────────────────
export function spawnConfetti(colors) {
  const cols = colors || ["#ff4500","#ff6b35","#fbbf24","#4ade80","#38bdf8","#f472b6"];
  for (let i = 0; i < 80; i++) {
    const el = document.createElement("div");
    const size = 6 + Math.random() * 8;
    el.style.cssText = `
      position:fixed;z-index:99990;pointer-events:none;
      width:${size}px;height:${size}px;
      border-radius:${Math.random() > 0.5 ? "50%" : "2px"};
      background:${cols[Math.floor(Math.random() * cols.length)]};
      left:${Math.random() * 100}vw;top:-10px;
    `;
    document.body.appendChild(el);
    const vx = (Math.random() - 0.5) * 14;
    let y = -10, vy = 4 + Math.random() * 8, life = 1;
    const tick = () => {
      y += vy; vy += 0.35; life -= 0.012;
      el.style.transform = `translate(${vx * (1 - life) * 20}px, ${y}px) rotate(${y * 2}deg)`;
      el.style.opacity = life;
      if (life > 0 && y < window.innerHeight + 20) requestAnimationFrame(tick);
      else el.remove();
    };
    setTimeout(() => requestAnimationFrame(tick), Math.random() * 300);
  }
}

// ── Toast notification ──────────────────────────────────────────
export function showToast(msg, duration = 2200) {
  const el = document.createElement("div");
  el.textContent = msg;
  el.style.cssText = `
    position:fixed;bottom:32px;left:50%;
    transform:translateX(-50%) translateY(16px);
    z-index:99995;
    background:rgba(13,14,20,0.93);
    color:#e8e2d9;
    padding:11px 26px;
    font-family:'Fira Code',monospace;
    font-size:13px;letter-spacing:.5px;
    border:1px solid rgba(255,69,0,.35);
    backdrop-filter:blur(20px);
    opacity:0;
    transition:opacity .22s ease, transform .22s ease;
    white-space:nowrap;
  `;
  document.body.appendChild(el);
  requestAnimationFrame(() => {
    el.style.opacity = "1";
    el.style.transform = "translateX(-50%) translateY(0)";
  });
  setTimeout(() => {
    el.style.opacity = "0";
    el.style.transform = "translateX(-50%) translateY(10px)";
    setTimeout(() => el.remove(), 250);
  }, duration);
}

// ── Text glitch effect ──────────────────────────────────────────
function triggerGlitch() {
  const CHARS = "!@#$%^&*<>?/\\|[]{}~";
  const textNodes = [];

  // Collect all visible text nodes in sections
  const walker = document.createTreeWalker(
    document.getElementById("root") || document.body,
    NodeFilter.SHOW_TEXT,
    { acceptNode: (n) => n.textContent.trim().length > 2 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT }
  );
  while (walker.nextNode()) textNodes.push(walker.currentNode);

  const originals = textNodes.map(n => n.textContent);
  let elapsed = 0;
  const glitchInterval = setInterval(() => {
    elapsed += 60;
    textNodes.forEach((n, i) => {
      if (elapsed < 900) {
        // Scramble
        n.textContent = originals[i].split("").map(c =>
          c === " " ? " " : (Math.random() > 0.4 ? CHARS[Math.floor(Math.random() * CHARS.length)] : c)
        ).join("");
      } else {
        // Restore
        n.textContent = originals[i];
      }
    });
    if (elapsed >= 1000) {
      clearInterval(glitchInterval);
      textNodes.forEach((n, i) => { n.textContent = originals[i]; });
    }
  }, 60);
}

// ── 404 overlay ─────────────────────────────────────────────────
function show404() {
  const el = document.createElement("div");
  el.style.cssText = `
    position:fixed;inset:0;z-index:99980;
    display:flex;flex-direction:column;align-items:center;justify-content:center;
    background:rgba(13,14,20,.96);backdrop-filter:blur(24px);
    font-family:'Sora',sans-serif;
    opacity:0;transition:opacity .3s ease;
    cursor:none;
  `;
  el.innerHTML = `
    <div style="font-size:clamp(80px,18vw,160px);font-weight:800;color:#ff4500;letter-spacing:-6px;line-height:1;">404</div>
    <div style="font-size:20px;font-weight:600;color:#f0ece4;margin-top:8px;">Page not found.</div>
    <div style="font-size:15px;color:#a0a0b0;margin-top:8px;">...just kidding 😄</div>
    <div style="font-family:'Fira Code',monospace;font-size:11px;color:#ff4500;margin-top:32px;letter-spacing:2px;">// click anywhere to dismiss</div>
  `;
  document.body.appendChild(el);
  requestAnimationFrame(() => { el.style.opacity = "1"; });
  const dismiss = () => {
    el.style.opacity = "0";
    setTimeout(() => el.remove(), 300);
    el.removeEventListener("click", dismiss);
  };
  setTimeout(() => el.addEventListener("click", dismiss), 300);
  setTimeout(dismiss, 4000);
}

// ── Rave mode ────────────────────────────────────────────────────
function triggerRave() {
  const RAINBOW = ["#ff0000","#ff6600","#ffcc00","#33ff00","#00ccff","#0066ff","#cc00ff","#ff00aa"];
  let ri = 0;
  const raveInterval = setInterval(() => {
    const col = RAINBOW[ri % RAINBOW.length];
    document.documentElement.style.setProperty("--accent", col);
    document.documentElement.style.setProperty("--accent2", col);
    // Signal background canvas with the rave color
    const r = parseInt(col.slice(1,3),16), g = parseInt(col.slice(3,5),16), b = parseInt(col.slice(5,7),16);
    window.dispatchEvent(new CustomEvent("bg:accent", { detail: { color: [r,g,b] } }));
    ri++;
  }, 180);
  setTimeout(() => {
    clearInterval(raveInterval);
    // Restore original accent
    document.documentElement.style.setProperty("--accent", "#ff4500");
    document.documentElement.style.setProperty("--accent2", "#ff6b35");
    window.dispatchEvent(new CustomEvent("bg:accent", { detail: {} }));
  }, 5000);
}

// ── Secret message ───────────────────────────────────────────────
function showSecretMessage() {
  // Overlay — NO backdrop-filter. That CSS property creates a new stacking context
  // which traps the cursor ball (z-index:99999) behind it no matter what.
  // Plain dark background is sufficient and doesn't break stacking.
  const overlay = document.createElement("div");
  overlay.style.cssText = `
    position:fixed;inset:0;
    z-index:99980;
    background:rgba(10,11,18,.80);
    opacity:0;
    transition:opacity .35s ease;
    pointer-events:none;
  `;
  document.body.appendChild(overlay);

  // Card — z-index above overlay but BELOW the ball (99999)
  // backdrop-filter only on the card itself (small area) — won't trap the ball
  // because the ball is not a child of this element
  const card = document.createElement("div");
  card.style.cssText = `
    position:fixed;top:50%;left:50%;
    transform:translate(-50%,-50%) scale(0.88);
    z-index:99981;
    width:min(520px,90vw);
    padding:48px 56px;
    text-align:center;
    font-family:'Sora',sans-serif;
    background:rgba(22,24,36,.92);
    border:1px solid rgba(255,69,0,.35);
    box-shadow:
      0 0 0 1px rgba(255,255,255,.06) inset,
      0 40px 80px rgba(0,0,0,.7),
      0 0 60px rgba(255,69,0,.08);
    opacity:0;
    overflow:hidden;
    transition:opacity .35s ease, transform .35s ease;
    cursor:none;
    pointer-events:none;
  `;

  // Top shimmer line
  const shimmer = document.createElement("div");
  shimmer.style.cssText = `
    position:absolute;top:0;left:0;right:0;height:1px;
    background:linear-gradient(90deg,transparent,rgba(255,255,255,.3) 40%,rgba(255,255,255,.12) 70%,transparent);
    pointer-events:none;
  `;
  card.appendChild(shimmer);

  // Diagonal glass sheen
  const sheen = document.createElement("div");
  sheen.style.cssText = `
    position:absolute;top:-80%;left:-30%;width:60%;height:200%;
    background:linear-gradient(105deg,rgba(255,255,255,.04) 0%,rgba(255,255,255,.01) 50%,transparent 100%);
    transform:skewX(-12deg);pointer-events:none;
  `;
  card.appendChild(sheen);

  // Accent top bar
  const accentBar = document.createElement("div");
  accentBar.style.cssText = `
    position:absolute;top:0;left:0;right:0;height:2px;
    background:linear-gradient(90deg,#ff4500,#ff6b35,transparent);
    pointer-events:none;
  `;
  card.appendChild(accentBar);

  // Content
  card.innerHTML += `
    <div style="position:relative;z-index:1;pointer-events:auto;">
      <div style="font-size:10px;font-family:'Fira Code',monospace;color:#ff4500;letter-spacing:3px;text-transform:uppercase;margin-bottom:20px;">
        // secret unlocked
      </div>
      <div style="font-size:clamp(22px,3vw,34px);font-weight:800;color:#f0ece4;letter-spacing:-1.5px;line-height:1.1;margin-bottom:10px;">
        You found the developer.
      </div>
      <div style="font-size:14px;font-weight:300;color:#a0a0b0;margin-bottom:32px;line-height:1.7;">
        Now hire them. 🐾
      </div>
      <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;">
        <a href="mailto:krapa.kalyan@gmail.com" style="
          font-family:'Fira Code',monospace;font-size:11px;letter-spacing:1.5px;
          text-transform:uppercase;text-decoration:none;
          background:#ff4500;color:#fff;
          padding:13px 28px;border:1px solid #ff4500;cursor:none;
        ">✉️ Email Me →</a>
        <a href="https://www.linkedin.com/in/kalyan-krapa-556282229/" target="_blank" rel="noopener noreferrer" style="
          font-family:'Fira Code',monospace;font-size:11px;letter-spacing:1.5px;
          text-transform:uppercase;text-decoration:none;
          background:transparent;color:#f0ece4;
          padding:13px 28px;border:1px solid rgba(255,255,255,.2);cursor:none;
        ">💼 LinkedIn</a>
      </div>
      <div style="margin-top:24px;font-family:'Fira Code',monospace;font-size:10px;color:rgba(255,255,255,.25);letter-spacing:1px;">
        click anywhere outside to close  •  Esc
      </div>
    </div>
  `;

  document.body.appendChild(card);

  // Animate in
  requestAnimationFrame(() => {
    overlay.style.opacity = "1";
    card.style.opacity = "1";
    card.style.transform = "translate(-50%,-50%) scale(1)";
  });

  const dismiss = (e) => {
    if (card.contains(e.target)) return;
    overlay.style.opacity = "0";
    card.style.opacity = "0";
    card.style.transform = "translate(-50%,-50%) scale(0.92)";
    setTimeout(() => { overlay.remove(); card.remove(); }, 350);
    document.removeEventListener("click", dismiss);
    document.removeEventListener("keydown", onEsc);
  };
  const onEsc = (e) => { if (e.key === "Escape") { dismiss({ target: document.body }); } };
  setTimeout(() => {
    document.addEventListener("click", dismiss);
    document.addEventListener("keydown", onEsc);
  }, 400);
}

// ── Main gimmicks hook ──────────────────────────────────────────
export function useGimmicks() {
  useEffect(() => {

    // ── Birthday check — July 12 ──────────────────────────────
    const now = new Date();
    if (now.getMonth() === 6 && now.getDate() === 12) {
      setTimeout(() => {
        spawnConfetti(["#ff4500","#ff6b35","#fbbf24","#f472b6","#a855f7","#38bdf8"]);
        showToast("🎂 Happy Birthday Kalyan! 🎉", 4000);
      }, 1200);
    }

    // ── Late night check — midnight to 4am ───────────────────
    const hour = now.getHours();
    if (hour >= 0 && hour < 4) {
      window.dispatchEvent(new CustomEvent("dog:latenight"));
    }

    // ── Scroll to bottom → dog footer sit ────────────────────
    const onScroll = () => {
      const nearBottom = window.scrollY + window.innerHeight >= document.body.scrollHeight - 80;
      if (nearBottom) {
        window.dispatchEvent(new CustomEvent("dog:footer"));
      } else {
        window.dispatchEvent(new CustomEvent("dog:footer:leave"));
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // ── Konami hint — once per session ───────────────────────
    if (!sessionStorage.getItem("kk-hint")) {
      setTimeout(() => {
        showToast("💡 Hint: try the Konami code — ↑↑↓↓←→←→BA", 3800);
        sessionStorage.setItem("kk-hint", "1");
      }, 3000);
    }

    // ── Typed word detection ─────────────────────────────────
    const WORDS = {
      hireme:  () => { spawnConfetti(); showToast("🎉 You found the easter egg!", 2500); window.dispatchEvent(new CustomEvent("dog:spin")); },
      dog:     () => { window.dispatchEvent(new CustomEvent("dog:backflip")); showToast("✨ that's me!", 2000); },
      kalyan:  () => { triggerGlitch(); showToast("⚡ system glitch detected", 1500); },
      "404":   () => { show404(); },
      rave:    () => { triggerRave(); showToast("🎵 rave mode — 5 seconds", 2000); },
    };
    const MAX_LEN = Math.max(...Object.keys(WORDS).map(w => w.length));
    let typed = "";

    const onKey = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
      if (e.key.length !== 1) return;
      typed += e.key.toLowerCase();
      if (typed.length > MAX_LEN) typed = typed.slice(-MAX_LEN);
      for (const word of Object.keys(WORDS)) {
        if (typed.endsWith(word)) {
          typed = "";
          WORDS[word]();
          break;
        }
      }
    };
    document.addEventListener("keydown", onKey);

    // ── Konami code ──────────────────────────────────────────
    const KONAMI = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];
    let ki = 0;
    const onKonami = (e) => {
      if (e.key === KONAMI[ki]) { ki++; } else { ki = e.key === KONAMI[0] ? 1 : 0; }
      if (ki === KONAMI.length) {
        ki = 0;
        window.dispatchEvent(new CustomEvent("bg:matrix"));
        showToast("🟢 Matrix mode — 5 seconds", 2000);
      }
    };
    document.addEventListener("keydown", onKonami);

    // ── Triple-click → heart paw trail ───────────────────────
    let clicks = 0, clickTimer = null;
    const onTripleClick = () => {
      clicks++;
      clearTimeout(clickTimer);
      clickTimer = setTimeout(() => { clicks = 0; }, 500);
      if (clicks >= 3) {
        clicks = 0;
        window.dispatchEvent(new CustomEvent("dog:hearts"));
        showToast("❤️ sending love!", 1800);
      }
    };
    document.addEventListener("click", onTripleClick);

    // ── KC logo click counter (tracked via custom event from Navbar) ──
    let logoClicks = 0, logoTimer = null;
    const onLogoClick = () => {
      logoClicks++;
      clearTimeout(logoTimer);
      logoTimer = setTimeout(() => { logoClicks = 0; }, 2000);
      if (logoClicks >= 2) {
        logoClicks = 0;
        showSecretMessage();
      }
    };
    window.addEventListener("logo:click", onLogoClick);

    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("keydown", onKonami);
      document.removeEventListener("click", onTripleClick);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("logo:click", onLogoClick);
      clearTimeout(clickTimer);
      clearTimeout(logoTimer);
    };
  }, []);
}
