import { useState, useEffect } from "react";
import { useTypewriter } from "../hooks/useTypewriter";
import { useGimmicks } from "../hooks/useGimmicks";
import { GLASS_STYLE } from "../data/constants";

const JSON_LINES = [
  ["jm", '// profile.json'],
  ["jc", '{'],
  ["entry", ["name",     "Kalyan Krapa"             ]],
  ["entry", ["role",     "Full Stack Intern"         ]],
  ["entry", ["company",  "Stackular"                 ]],
  ["entry", ["stack",    '["React","Node","MongoDB"]']],
  ["entry", ["projects", "3 shipped"                ]],
  ["entry", ["learning", ".NET"                      ]],
  ["entry", ["status",   "open_to_work"              ]],
  ["entry", ["award",    "🏆 Best Paper Award"       ]],
  ["entry", ["location", "India 🇮🇳"                 ]],
  ["jc", '}'],
];

export default function Hero({ reducedMotion = false }) {
  const typed = useTypewriter({ disabled: reducedMotion });
  useGimmicks();

  // JSON typing animation — reveal lines one by one
  const [visibleLines, setVisibleLines] = useState(reducedMotion ? JSON_LINES.length : 0);
  useEffect(() => {
    if (reducedMotion) { setVisibleLines(JSON_LINES.length); return; }
    if (visibleLines >= JSON_LINES.length) return;
    const t = setTimeout(() => setVisibleLines((v) => v + 1), 120);
    return () => clearTimeout(t);
  }, [visibleLines, reducedMotion]);

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="home"
      style={{
        minHeight: "100vh", display: "flex", alignItems: "center",
        padding: "120px 60px 80px", position: "relative",
      }}
    >
      <div style={{
        maxWidth: 1280, margin: "0 auto", width: "100%",
        display: "flex", gap: 60, alignItems: "center", flexWrap: "wrap",
      }}>
        {/* ── LEFT ── */}
        <div className="rv" style={{ flex: "1 1 460px" }}>

          {/* Available pill */}
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 22,
            padding: "7px 16px", fontFamily: "'Fira Code', monospace", fontSize: 11,
            letterSpacing: ".5px", color: "var(--green)",
            background: "rgba(74,222,128,.08)", border: "1px solid rgba(74,222,128,.25)",
            backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
            boxShadow: "0 0 0 1px rgba(74,222,128,.05) inset, 0 0 20px rgba(74,222,128,.06)",
          }}>
            <span style={{
              width: 7, height: 7, borderRadius: "50%", background: "var(--green)",
              animation: "gdot 2s infinite", display: "inline-block",
            }} />
            Available for full-time roles
          </div>

          {/* Subtitle */}
          <div style={{
            fontFamily: "'Fira Code', monospace", fontSize: 13,
            color: "var(--muted)", marginBottom: 14, letterSpacing: 0.5,
          }}>
            // Full Stack Developer
          </div>

          {/* Name */}
          <div style={{
            fontWeight: 800, fontSize: "clamp(64px,10vw,120px)",
            lineHeight: 0.88, letterSpacing: "-5px", marginBottom: 20,
          }}>
            <span style={{ color: "var(--white)", display: "block" }}>Kalyan</span>
            <span style={{
              display: "block",
              WebkitTextStroke: "2px var(--outline-stroke)", color: "transparent",
            }}>
              Krapa.
            </span>
          </div>

          {/* Typewriter */}
          <div style={{
            fontFamily: "'Fira Code', monospace", fontSize: "clamp(13px,1.6vw,17px)",
            fontWeight: 300, color: "var(--muted2)", marginBottom: 22, minHeight: 28,
          }}>
            <span style={{ color: "var(--code)" }}>{typed}</span>
            <span style={{ color: "var(--accent)", animation: "bc .85s infinite" }}>▋</span>
          </div>

          {/* Bio */}
          <p style={{
            fontSize: 15, fontWeight: 300, lineHeight: 1.85,
            color: "var(--muted)", maxWidth: 420, marginBottom: 36,
          }}>
            <strong style={{ color: "var(--text)", fontWeight: 600 }}>MERN Stack developer</strong>{" "}
            building fast, scalable, real-world web apps with clean code and interfaces people love.
            Currently a{" "}
            <strong style={{ color: "var(--text)", fontWeight: 600 }}>Full Stack Intern at Stackular</strong>.
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 44 }}>
            <button
              onClick={() => scrollTo("projects")}
              onMouseEnter={(e) => { e.target.style.background = "var(--accent2)"; e.target.style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { e.target.style.background = "var(--accent)"; e.target.style.transform = "none"; }}
              style={{
                fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 14,
                background: "var(--accent)", color: "#fff", border: "none",
                padding: "14px 34px", cursor: "none", transition: "all .22s", letterSpacing: ".2px",
              }}
            >
              View Projects →
            </button>
            <button
              onClick={() => scrollTo("contact")}
              onMouseEnter={(e) => { e.target.style.borderColor = "var(--accent)"; e.target.style.color = "var(--accent)"; e.target.style.transform = "translateY(-2px)"; }}
              onMouseLeave={(e) => { e.target.style.borderColor = "rgba(255,255,255,.15)"; e.target.style.color = "var(--text)"; e.target.style.transform = "none"; }}
              style={{
                fontFamily: "'Sora', sans-serif", fontWeight: 600, fontSize: 14,
                background: "transparent", color: "var(--text)",
                border: "1px solid rgba(255,255,255,.15)",
                padding: "14px 34px", cursor: "none", transition: "all .22s",
              }}
            >
              Get In Touch
            </button>
          </div>

          {/* Stats glass bar */}
          <div style={{ ...GLASS_STYLE, display: "flex", flexWrap: "wrap", overflow: "hidden", position: "relative" }}>
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, height: 1,
              background: "linear-gradient(90deg,transparent,rgba(255,255,255,.3),transparent)",
            }} />
            {[
              { num: "3",  suffix: "",   label: "Live Projects"  },
              { num: "3",  suffix: "+",  label: "Certifications" },
              { num: "1",  suffix: "🏆", label: "Award Won"      },
            ].map(({ num, suffix, label }) => (
              <div key={label} style={{
                display: "flex", flexDirection: "column",
                padding: "20px 32px", borderRight: "1px solid rgba(255,255,255,.08)",
              }}>
                <span style={{ fontWeight: 800, fontSize: 38, color: "var(--white)", lineHeight: 1 }}>
                  {num}<span style={{ color: "var(--accent)" }}>{suffix}</span>
                </span>
                <span style={{
                  fontFamily: "'Fira Code', monospace", fontSize: 10,
                  color: "var(--muted)", letterSpacing: 0.5,
                  textTransform: "uppercase", marginTop: 4,
                }}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT — profile.json ── */}
        <div className="rv" style={{ flex: "0 0 340px", width: 340, alignSelf: "center", transitionDelay: ".2s" }}>
          <div style={{ ...GLASS_STYLE, overflow: "hidden", position: "relative" }}>
            {/* Shimmer */}
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, height: 1,
              background: "linear-gradient(90deg,transparent,rgba(255,255,255,.5) 30%,rgba(255,255,255,.25) 70%,transparent)", zIndex: 2,
            }} />
            {/* Accent bar */}
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0, height: 2,
              background: "linear-gradient(90deg,var(--accent),var(--accent2),transparent)", zIndex: 3,
            }} />
            {/* Title bar */}
            <div style={{
              background: "rgba(0,0,0,.3)", borderBottom: "1px solid rgba(255,255,255,.08)",
              padding: "9px 14px", display: "flex", alignItems: "center", gap: 7,
            }}>
              {["#ff5f57", "#febc2e", "#28c840"].map((col) => (
                <div key={col} style={{ width: 10, height: 10, borderRadius: "50%", background: col }} />
              ))}
              <span style={{ fontFamily: "'Fira Code', monospace", fontSize: 10, color: "var(--muted)", marginLeft: 6 }}>
                profile.json
              </span>
            </div>
            {/* JSON body — types itself in */}
            <div style={{ padding: "16px 18px", fontFamily: "'Fira Code', monospace", fontSize: 12, lineHeight: 1.9 }}>
              {JSON_LINES.slice(0, visibleLines).map((row, i) => {
                if (row[0] === "entry") return (
                  <div key={i} style={{ paddingLeft: 16 }}>
                    <span style={{ color: "#7dd3fc" }}>"{row[1][0]}"</span>
                    <span style={{ color: "var(--accent)" }}>: </span>
                    <span style={{ color: "#a8ff78" }}>"{row[1][1]}"</span>
                    <span style={{ color: "#555" }}>,</span>
                  </div>
                );
                return (
                  <div key={i}>
                    <span style={{ color: row[0] === "jm" ? "#555" : "#555", fontStyle: row[0] === "jm" ? "italic" : "normal" }}>
                      {row[1]}
                    </span>
                  </div>
                );
              })}
              {/* Blinking cursor while typing */}
              {visibleLines < JSON_LINES.length && (
                <span style={{ color: "var(--accent)", animation: "bc .7s infinite" }}>▋</span>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
