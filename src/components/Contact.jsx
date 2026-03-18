export default function Contact() {
  return (
    <section id="contact" style={{
      minHeight: "60vh", display: "flex", alignItems: "center",
      justifyContent: "center", padding: "100px clamp(20px,4vw,40px)", overflow: "hidden",
    }}>
      <div className="rv" style={{
        width: "100%", maxWidth: 800, padding: "clamp(40px,6vw,72px) clamp(24px,6vw,80px)", textAlign: "center",
        background: "rgba(255,255,255,.05)",
        border: "1px solid rgba(255,255,255,.12)",
        backdropFilter: "blur(48px) saturate(180%)",
        WebkitBackdropFilter: "blur(48px) saturate(180%)",
        boxShadow: "0 0 0 1px rgba(255,255,255,.06) inset, 0 24px 80px rgba(0,0,0,.4), 0 1px 0 rgba(255,255,255,.15) inset",
        position: "relative", overflow: "hidden",
      }}>
        {/* Top shimmer */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 1,
          background: "linear-gradient(90deg,transparent,rgba(255,255,255,.4) 40%,rgba(255,255,255,.2) 70%,transparent)",
        }} />
        {/* Diagonal refraction */}
        <div style={{
          position: "absolute", top: "-80%", left: "-30%", width: "60%", height: "200%",
          background: "linear-gradient(105deg,rgba(255,255,255,.06) 0%,rgba(255,255,255,.01) 50%,transparent 100%)",
          transform: "skewX(-12deg)", pointerEvents: "none",
        }} />

        {/* Flanked eyebrow */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 14,
          fontFamily: "'Fira Code', monospace", fontSize: 10, letterSpacing: "3px",
          textTransform: "uppercase", color: "var(--accent)", marginBottom: 28,
        }}>
          <span style={{ width: 40, height: 1, background: "var(--accent)", display: "inline-block" }} />
          Get in Touch
          <span style={{ width: 40, height: 1, background: "var(--accent)", display: "inline-block" }} />
        </div>

        {/* Big heading */}
        <div style={{ lineHeight: 0.88, marginBottom: 0 }}>
          <span style={{
            fontWeight: 800, fontSize: "clamp(52px,10vw,120px)",
            color: "var(--white)", letterSpacing: "-5px", display: "block",
          }}>
            Have a
          </span>
          <span style={{
            fontWeight: 800, fontSize: "clamp(52px,10vw,120px)",
            letterSpacing: "-5px", display: "block",
            WebkitTextStroke: "2px var(--outline-stroke)", color: "transparent",
          }}>
            role for me?
          </span>
        </div>

        {/* Tagline + email */}
        <div style={{ marginTop: 18, marginBottom: 36 }}>
          <p style={{ fontSize: 15, fontWeight: 300, color: "var(--muted)", marginBottom: 10 }}>
            Let's build something great together.
          </p>
          <button
            onClick={() => {
              navigator.clipboard.writeText("krapa.kalyan@gmail.com").then(() => {
                // show toast
                const el = document.createElement("div");
                el.textContent = "📋 Copied to clipboard!";
                el.style.cssText = `position:fixed;bottom:32px;left:50%;transform:translateX(-50%) translateY(20px);
                  z-index:99995;background:rgba(20,20,20,0.92);color:#fff;padding:12px 28px;
                  font-family:'Fira Code',monospace;font-size:13px;border:1px solid rgba(255,255,255,.15);
                  letter-spacing:.5px;backdrop-filter:blur(20px);opacity:0;
                  transition:opacity .25s ease,transform .25s ease;`;
                document.body.appendChild(el);
                requestAnimationFrame(() => { el.style.opacity="1"; el.style.transform="translateX(-50%) translateY(0)"; });
                setTimeout(() => { el.style.opacity="0"; setTimeout(() => el.remove(), 300); }, 2200);
              });
            }}
            style={{
              fontFamily: "'Fira Code', monospace", fontSize: "clamp(15px,2vw,22px)",
              fontWeight: 400, color: "var(--accent)", background: "none", border: "none",
              cursor: "none", transition: "color .2s", letterSpacing: "-.2px", padding: 0,
            }}
            onMouseEnter={(e) => e.target.style.color = "var(--accent2)"}
            onMouseLeave={(e) => e.target.style.color = "var(--accent)"}
            title="Click to copy"
          >
            krapa.kalyan@gmail.com
          </button>
        </div>

        {/* Buttons */}
        <div style={{
          display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center",
          paddingTop: 32, marginTop: 8, borderTop: "1px solid rgba(255,255,255,.08)",
        }}>
          {[
            { icon: "🐙", label: "GitHub",   href: "https://github.com/Krapa007",                          primary: false },
            { icon: "💼", label: "LinkedIn",  href: "https://www.linkedin.com/in/kalyan-krapa-556282229/",  primary: false },
            { icon: "✉️", label: "Email Me",  href: "mailto:krapa.kalyan@gmail.com",                        primary: true  },
          ].map((btn) => (
            <a
              key={btn.label}
              href={btn.href}
              onMouseEnter={(e) => {
                if (!btn.primary) {
                  e.currentTarget.style.borderColor = "var(--accent)";
                  e.currentTarget.style.color = "var(--text)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }
              }}
              onMouseLeave={(e) => {
                if (!btn.primary) {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,.15)";
                  e.currentTarget.style.color = "var(--muted)";
                  e.currentTarget.style.transform = "none";
                }
              }}
              style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "14px 26px",
                fontFamily: "'Fira Code', monospace", fontSize: 11,
                fontWeight: 400, letterSpacing: "1.5px", textTransform: "uppercase",
                textDecoration: "none", cursor: "none", transition: "all .22s",
                background: btn.primary ? "var(--accent)" : "transparent",
                border: `1px solid ${btn.primary ? "var(--accent)" : "rgba(255,255,255,.15)"}`,
                color: btn.primary ? "#fff" : "var(--muted)",
              }}
            >
              <span style={{ fontSize: 14 }}>{btn.icon}</span> {btn.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
