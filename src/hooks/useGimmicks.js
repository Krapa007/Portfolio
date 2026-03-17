import { useEffect } from "react";

// ── Confetti burst ──────────────────────────────────────────────
export function spawnConfetti() {
  const colors = ["#f05a28", "#ff7a45", "#fbbf24", "#4ade80", "#38bdf8", "#f472b6"];
  for (let i = 0; i < 80; i++) {
    const el = document.createElement("div");
    const size = 6 + Math.random() * 8;
    el.style.cssText = `
      position:fixed;z-index:99990;pointer-events:none;
      width:${size}px;height:${size}px;
      border-radius:${Math.random() > 0.5 ? "50%" : "2px"};
      background:${colors[Math.floor(Math.random() * colors.length)]};
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
    border:1px solid rgba(240,90,40,.35);
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

// ── Main gimmicks hook ──────────────────────────────────────────
export function useGimmicks() {
  useEffect(() => {

    // Konami hint — shows once per session, 3s after load
    if (!sessionStorage.getItem("kk-hint")) {
      setTimeout(() => {
        showToast("💡 Hint: try the Konami code — ↑↑↓↓←→←→BA", 3800);
        sessionStorage.setItem("kk-hint", "1");
      }, 3000);
    }

    // 1. Type "hireme" anywhere on the page (no spaces needed)
    let typed = "";
    const TARGET = "hireme";
    const onKey = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
      // Only collect printable single characters
      if (e.key.length !== 1) return;
      typed += e.key.toLowerCase();
      if (typed.length > TARGET.length) typed = typed.slice(-TARGET.length);
      if (typed === TARGET) {
        typed = "";
        spawnConfetti();
        showToast("🎉 You found the easter egg!", 2500);
        window.dispatchEvent(new CustomEvent("dog:spin"));
      }
    };
    document.addEventListener("keydown", onKey);

    // 2. Konami code → matrix rain on background canvas
    const KONAMI = [
      "ArrowUp","ArrowUp","ArrowDown","ArrowDown",
      "ArrowLeft","ArrowRight","ArrowLeft","ArrowRight",
      "b","a",
    ];
    let ki = 0;
    const onKonami = (e) => {
      if (e.key === KONAMI[ki]) {
        ki++;
      } else {
        ki = e.key === KONAMI[0] ? 1 : 0;
      }
      if (ki === KONAMI.length) {
        ki = 0;
        window.dispatchEvent(new CustomEvent("bg:matrix"));
        showToast("🟢 Matrix mode — 5 seconds", 2000);
      }
    };
    document.addEventListener("keydown", onKonami);

    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("keydown", onKonami);
    };
  }, []);
}
