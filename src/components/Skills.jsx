import { useState } from "react";
import { SKILLS } from "../data/constants";

function SkillRow({ s, delay }) {
  const [hov, setHov] = useState(false);

  const dispatchAccent = (active) => {
    if (typeof window === "undefined") return;
    if (active && s.signal) {
      window.dispatchEvent(new CustomEvent("bg:accent", {
        detail: { color: [s.signal.r, s.signal.g, s.signal.b] },
      }));
    } else {
      window.dispatchEvent(new CustomEvent("bg:accent", { detail: {} }));
    }
  };

  return (
    <div className="rv" style={{ transitionDelay: `${delay}s` }}>
      <div
        onMouseEnter={() => { setHov(true); dispatchAccent(true); }}
        onMouseLeave={() => { setHov(false); dispatchAccent(false); }}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 180px), auto))",
          gap: "clamp(16px,2vw,32px)", alignItems: "start", padding: "28px clamp(12px,2vw,20px)",
          transition: "all .3s", borderRadius: 2, marginBottom: 2,
          background: hov ? "rgba(255,255,255,.04)" : "transparent",
          backdropFilter: hov ? "blur(16px)" : "none",
          WebkitBackdropFilter: hov ? "blur(16px)" : "none",
          boxShadow: hov ? "0 0 0 1px rgba(255,255,255,.06) inset, 0 4px 20px rgba(0,0,0,.2)" : "none",
          transform: hov ? "translateX(4px)" : "none",
        }}
      >
        <div>
          <div style={{ fontWeight: 700, fontSize: 15, color: "var(--white)", marginBottom: 4, letterSpacing: "-.2px" }}>{s.name}</div>
          <div style={{ fontFamily: "'Fira Code', monospace", fontSize: 9, letterSpacing: "2px", textTransform: "uppercase", color: "var(--accent)" }}>{s.cat}</div>
        </div>
        <div>
          <p style={{ fontSize: 13, fontWeight: 300, color: "var(--muted)", lineHeight: 1.7, marginBottom: 12 }}>{s.desc}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {s.chips.map((chip) => (
              <span key={chip} style={{
                fontFamily: "'Fira Code', monospace", fontSize: 10,
                border: "1px solid rgba(255,255,255,.1)", color: "var(--muted2)", padding: "3px 10px",
              }}>{chip}</span>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "flex-end" }}>
          {s.projs.map((pr) => (
            <span key={pr} style={{
              fontFamily: "'Fira Code', monospace", fontSize: 10,
              border: "1px solid var(--accent)", color: "var(--accent)",
              padding: "3px 10px", whiteSpace: "nowrap",
            }}>{pr}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="stack" style={{ padding: "100px clamp(20px,4vw,60px)" }}
      onMouseEnter={() => window.dispatchEvent(new CustomEvent("dog:tether:skills"))}
      onMouseLeave={() => window.dispatchEvent(new CustomEvent("dog:untether"))}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div className="rv" style={{
          display: "flex", alignItems: "center", gap: 14,
          fontFamily: "'Fira Code', monospace", fontSize: 10,
          letterSpacing: "2.5px", color: "var(--accent)", textTransform: "uppercase", marginBottom: 10,
        }}>
          Technical Stack
          <span style={{ width: 40, height: 1, background: "var(--accent)", display: "inline-block" }} />
        </div>
        <h2 className="rv" style={{
          fontWeight: 800, fontSize: "clamp(42px,6vw,80px)",
          letterSpacing: "-3px", lineHeight: 0.92, marginBottom: 56, color: "var(--white)",
        }}>
          Skills
        </h2>
        <div>
          {SKILLS.map((s, i) => (
            <SkillRow key={s.name} s={s} delay={i * 0.06} />
          ))}
        </div>
      </div>
    </section>
  );
}
