import { useState } from "react";
import { CERTS } from "../data/constants";

function CertCard({ cert, delay }) {
  const [hov, setHov] = useState(false);

  return (
    <div className="rv" style={{ transitionDelay: `${delay}s` }}>
      <a
        href={cert.url}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{ textDecoration: "none", display: "block", cursor: "none" }}
      >
      <div
        style={{
          display: "flex", gap: 16, alignItems: "flex-start", padding: 24,
          background: hov ? "rgba(255,255,255,.09)" : "rgba(255,255,255,.05)",
          border: `1px solid ${hov ? "rgba(255,69,0,.35)" : "rgba(255,255,255,.12)"}`,
          backdropFilter: "blur(24px) saturate(140%)",
          WebkitBackdropFilter: "blur(24px) saturate(140%)",
          boxShadow: hov
            ? "0 0 0 1px rgba(255,69,0,.08) inset, 0 12px 40px rgba(0,0,0,.3), 0 0 30px rgba(255,69,0,.06)"
            : "0 0 0 1px rgba(255,255,255,.04) inset, 0 4px 20px rgba(0,0,0,.2)",
          transform: hov ? "translateY(-3px)" : "none",
          transition: "all .3s", position: "relative", overflow: "hidden",
        }}
      >
        {/* Top shimmer */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 1,
          background: "linear-gradient(90deg,transparent,rgba(255,255,255,.25),transparent)",
        }} />
        <span style={{ fontSize: 32, lineHeight: 1, flexShrink: 0 }}>{cert.ico}</span>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: "var(--white)", marginBottom: 4 }}>
            {cert.name}
          </div>
          <div style={{ fontFamily: "'Fira Code', monospace", fontSize: 10, color: "var(--muted)", letterSpacing: 0.5 }}>
            {cert.org}
          </div>
        </div>
        {/* View arrow — shows on hover */}
        <div style={{
          fontFamily: "'Fira Code', monospace", fontSize: 10, color: "var(--accent)",
          opacity: hov ? 1 : 0, transition: "opacity .2s", alignSelf: "center", flexShrink: 0,
        }}>
          View ↗
        </div>
      </div>
      </a>
    </div>
  );
}

export default function Certifications() {
  return (
    <section id="certs" style={{ padding: "100px clamp(20px,4vw,60px)", background: "rgba(255,255,255,.015)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>

        <div className="rv" style={{
          display: "flex", alignItems: "center", gap: 14,
          fontFamily: "'Fira Code', monospace", fontSize: 10,
          letterSpacing: "2.5px", color: "var(--accent)", textTransform: "uppercase", marginBottom: 10,
        }}>
          Credentials
          <span style={{ width: 40, height: 1, background: "var(--accent)", display: "inline-block" }} />
        </div>

        <h2 className="rv" style={{
          fontWeight: 800, fontSize: "clamp(28px,4vw,56px)",
          letterSpacing: "-2px", color: "var(--white)", marginBottom: 40,
        }}>
          Certifications
        </h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: 12,
        }}>
          {CERTS.map((cert, i) => (
            <CertCard key={cert.name} cert={cert} delay={i * 0.1} />
          ))}
        </div>

      </div>
    </section>
  );
}
