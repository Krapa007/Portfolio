import { useState } from "react";
import { PROJECTS } from "../data/constants";

function ProjectRow({ p }) {
  const [hov, setHov] = useState(false);

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "grid", gridTemplateColumns: "1fr auto",
        gap: 48, alignItems: "start", padding: "44px 20px",
        background: hov ? "rgba(255,255,255,.04)" : "transparent",
        backdropFilter: hov ? "blur(16px)" : "none",
        WebkitBackdropFilter: hov ? "blur(16px)" : "none",
        boxShadow: hov ? "0 0 0 1px rgba(255,255,255,.05) inset" : "none",
        transition: "all .3s", position: "relative", marginBottom: 2,
      }}
    >
      {/* Left accent bar */}
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0, width: 3,
        background: "var(--accent)", opacity: hov ? 1 : 0, transition: "opacity .25s",
      }} />

      {/* Left content */}
      <div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 14 }}>
          {p.tags.map((tag, i) => (
            <span key={tag} style={{
              fontFamily: "'Fira Code', monospace", fontSize: 10,
              letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--accent)",
            }}>
              {i > 0 && <span style={{ marginRight: 8, color: "var(--muted)" }}>•</span>}
              {tag}
            </span>
          ))}
        </div>

        <div style={{
          fontWeight: 800, fontSize: "clamp(22px,3vw,36px)",
          letterSpacing: "-1.5px", color: "var(--white)", marginBottom: 14,
        }}>
          {p.name}
        </div>

        <p style={{
          fontSize: 14, fontWeight: 300, color: "var(--muted)",
          lineHeight: 1.8, maxWidth: 640, marginBottom: 18,
        }}>
          {p.desc}
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
          {p.tech.map((t) => (
            <span key={t} style={{
              fontFamily: "'Fira Code', monospace", fontSize: 10,
              border: "1px solid rgba(255,255,255,.1)", color: "var(--muted2)", padding: "3px 10px",
            }}>
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Right — number + buttons */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8, paddingTop: 2 }}>
        <span style={{ fontFamily: "'Fira Code', monospace", fontSize: 11, color: "var(--muted)", letterSpacing: 0.5 }}>
          {p.num}
        </span>
        <a
          href={p.gh}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.color = "var(--accent)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,.12)"; e.currentTarget.style.color = "var(--muted)"; }}
          style={{
            display: "flex", alignItems: "center", gap: 8,
            fontFamily: "'Fira Code', monospace", fontSize: 11,
            letterSpacing: 0.5, color: "var(--muted)",
            border: "1px solid rgba(255,255,255,.12)", padding: "8px 16px",
            textDecoration: "none", cursor: "none", transition: "all .2s",
          }}
        >
          🐙 View on GitHub
        </a>
        <a
          href={p.live}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={(e) => { e.currentTarget.style.background = "var(--green)"; e.currentTarget.style.color = "#000"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--green)"; }}
          style={{
            display: "flex", alignItems: "center", gap: 8,
            fontFamily: "'Fira Code', monospace", fontSize: 11,
            letterSpacing: 0.5, color: "var(--green)",
            border: "1px solid var(--green)", padding: "8px 16px",
            textDecoration: "none", cursor: "none", transition: "all .2s",
          }}
        >
          <span style={{
            width: 6, height: 6, borderRadius: "50%", background: "var(--green)",
            animation: "gdot 2s infinite", display: "inline-block",
          }} />
          Live Demo
        </a>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" style={{ padding: "100px 60px", background: "rgba(255,255,255,.015)" }}
      onMouseEnter={() => window.dispatchEvent(new CustomEvent("dog:tether:projects"))}
      onMouseLeave={() => window.dispatchEvent(new CustomEvent("dog:untether"))}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>

        <div className="rv" style={{
          display: "flex", alignItems: "center", gap: 14,
          fontFamily: "'Fira Code', monospace", fontSize: 10,
          letterSpacing: "2.5px", color: "var(--accent)", textTransform: "uppercase", marginBottom: 10,
        }}>
          Featured Work
          <span style={{ width: 40, height: 1, background: "var(--accent)", display: "inline-block" }} />
        </div>

        <h2 className="rv" style={{
          fontWeight: 800, fontSize: "clamp(42px,6vw,80px)",
          letterSpacing: "-3px", lineHeight: 0.92, marginBottom: 56, color: "var(--white)",
        }}>
          Projects
        </h2>

        <div>
          {PROJECTS.map((p, i) => (
            <div key={p.name} className="rv" style={{ transitionDelay: `${i * 0.1}s` }}>
              <ProjectRow p={p} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
