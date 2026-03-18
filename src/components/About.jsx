export default function About() {
  return (
    <section id="about" style={{ padding: "100px 60px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>

        <div className="rv" style={{
          display: "flex", alignItems: "center", gap: 14,
          fontFamily: "'Fira Code', monospace", fontSize: 10,
          letterSpacing: "2.5px", color: "var(--accent)", textTransform: "uppercase", marginBottom: 24,
        }}>
          About Me
          <span style={{ width: 40, height: 1, background: "var(--accent)", display: "inline-block" }} />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 100, alignItems: "start" }}>

          {/* Left — big title + bio */}
          <div className="rv">
            <div style={{
              fontWeight: 800, fontSize: "clamp(48px,7vw,88px)",
              lineHeight: 0.9, letterSpacing: "-4px", color: "var(--white)", marginBottom: 36,
            }}>
              A little bit
              <span style={{ color: "var(--accent)", fontStyle: "normal", display: "block" }}>about me.</span>
            </div>

            <p style={{ fontSize: 15, fontWeight: 300, lineHeight: 1.9, color: "var(--muted)", marginBottom: 18 }}>
              I graduated with a <strong style={{ color: "var(--text)", fontWeight: 600 }}>B.Tech in IT from DIET in 2024</strong> — and
              honestly, those first few months after college were spent figuring things out, sharpening my skills,
              and building things just to see if I could. That time taught me more than I expected.
            </p>
            <p style={{ fontSize: 15, fontWeight: 300, lineHeight: 1.9, color: "var(--muted)", marginBottom: 18 }}>
              Eventually it led me to <strong style={{ color: "var(--text)", fontWeight: 600 }}>Stackular</strong>, where I got the chance
              to work on real products with a real team. I build full-stack apps — the kind with live data, proper auth,
              and interfaces that actually feel good to use. Not just things that work, but things people enjoy.
            </p>
            <p style={{ fontSize: 15, fontWeight: 300, lineHeight: 1.9, color: "var(--muted)", marginBottom: 28 }}>
              I'm now looking for the next step — a team where I can keep growing, ship meaningful work, and go deep on{" "}
              <strong style={{ color: "var(--text)", fontWeight: 600 }}>Full Stack development</strong>. If that sounds like your team,
              I'd love to talk.
            </p>

            {/* Award */}
            <div style={{
              display: "flex", gap: 12, alignItems: "flex-start",
              borderLeft: "3px solid #fbbf24", padding: "14px 18px",
              background: "rgba(251,191,36,.04)",
            }}>
              <span style={{ fontSize: 22, flexShrink: 0 }}>🏆</span>
              <span style={{ fontSize: 13, fontWeight: 300, lineHeight: 1.6, color: "var(--text)" }}>
                <strong style={{ color: "#fbbf24", fontWeight: 700 }}>Best Paper Award</strong> —
                International Conference on Recent Innovations in Engineering and Technology
              </span>
            </div>
          </div>

          {/* Right — key-value table */}
          <div className="rv" style={{ transitionDelay: ".15s" }}>
            <div style={{
              fontFamily: "'Fira Code', monospace", fontSize: 10,
              letterSpacing: "2px", textTransform: "uppercase",
              color: "var(--accent)", marginBottom: 24,
            }}>
              // Details
            </div>

            {[
              ["Name",         "Kalyan Krapa",          false],
              ["Current Role", "Junior Software Engineer",      true ],
              ["Company",      "Stackular",              false],
              ["Education",    "B.Tech IT — DIET 2024",  false],
              ["Location",     "India 🇮🇳",              false],
              ["Status",       "Open to Work 🟢",        true ],
            ].map(([k, v, hi]) => (
              <div key={k} style={{
                display: "flex", justifyContent: "space-between", alignItems: "baseline",
                padding: "16px 0", borderBottom: "1px solid rgba(255,255,255,.05)",
              }}>
                <span style={{
                  fontFamily: "'Fira Code', monospace", fontSize: 10,
                  letterSpacing: "2px", textTransform: "uppercase", color: "var(--muted)",
                }}>
                  {k}
                </span>
                <span style={{ fontWeight: 700, fontSize: 14, color: hi ? "var(--accent)" : "var(--white)", textAlign: "right" }}>
                  {v}
                </span>
              </div>
            ))}

            {/* Soft skill tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 28 }}>
              {["// team_player", "// adaptable", "// time_mgmt", "// communicator"].map((tag) => (
                <span key={tag} style={{
                  fontFamily: "'Fira Code', monospace", fontSize: 11, color: "var(--muted)",
                  background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.08)",
                  padding: "6px 12px", transition: "all .2s",
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
