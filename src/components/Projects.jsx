import { useState } from "react";
import { PROJECTS } from "../data/constants";

function ProjectRow({ p }) {
  const [hov, setHov] = useState(false);

  return (
    <>
      {/* Inject responsive style once */}
      <style>{`
        .proj-row {
          display: flex;
          flex-direction: column;
          gap: 20px;
          padding: clamp(24px,4vw,44px) clamp(12px,2vw,20px);
          transition: all .3s;
          position: relative;
          margin-bottom: 2px;
        }
        .proj-row-inner {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: clamp(16px,3vw,48px);
          align-items: start;
        }
        .proj-btns {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 8px;
          padding-top: 2px;
        }
        /* On mobile: stack everything, buttons go full-width below content */
        @media (max-width: 600px) {
          .proj-row-inner {
            grid-template-columns: 1fr;
          }
          .proj-btns {
            align-items: stretch;
            flex-direction: row;
            flex-wrap: wrap;
          }
          .proj-btns a {
            flex: 1 1 auto;
            text-align: center;
            justify-content: center;
          }
          .proj-num { display: none; }
        }
      `}</style>

      <div
        className="proj-row"
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          background: hov ? "rgba(255,255,255,.04)" : "transparent",
          backdropFilter: hov ? "blur(16px)" : "none",
          WebkitBackdropFilter: hov ? "blur(16px)" : "none",
          boxShadow: hov ? "0 0 0 1px rgba(255,255,255,.05) inset" : "none",
        }}
      >
        {/* Left accent bar */}
        <div style={{
          position: "absolute", left: 0, top: 0, bottom: 0, width: 3,
          background: "var(--accent)", opacity: hov ? 1 : 0, transition: "opacity .25s",
        }} />

        <div className="proj-row-inner">
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
              lineHeight: 1.8, marginBottom: 18,
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

          {/* Right — number + buttons (desktop only via grid, hidden number on mobile) */}
          <div className="proj-btns">
            <span className="proj-num" style={{
              fontFamily: "'Fira Code', monospace", fontSize: 11,
              color: "var(--muted)", letterSpacing: 0.5,
            }}>
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
                whiteSpace: "nowrap",
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
                whiteSpace: "nowrap",
              }}
            >
              <span style={{
                width: 6, height: 6, borderRadius: "50%", background: "var(--green)",
                animation: "gdot 2s infinite", display: "inline-block",
                flexShrink: 0,
              }} />
              Live Demo
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default function Projects() {
  return (
    <section id="projects" style={{ padding: "100px clamp(20px,4vw,60px)", background: "rgba(255,255,255,.015)" }}
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
