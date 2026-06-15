import { CERTS } from "../data/constants";

const CERT_STYLE = `
  .cert-wrap { text-decoration: none; display: block; cursor: none; }
  .cert-card {
    display: flex; gap: 16px; align-items: flex-start; padding: 24px;
    background: rgba(255,255,255,.05);
    border: 1px solid rgba(255,255,255,.12);
    backdrop-filter: blur(24px) saturate(140%);
    -webkit-backdrop-filter: blur(24px) saturate(140%);
    box-shadow: 0 0 0 1px rgba(255,255,255,.04) inset, 0 4px 20px rgba(0,0,0,.2);
    transform: translateY(0);
    transition: background .3s, border-color .3s, box-shadow .3s, transform .3s;
    position: relative; overflow: hidden;
  }
  /* CSS :hover so styles also apply on scroll, not just on pointer move */
  .cert-wrap:hover .cert-card {
    background: rgba(255,255,255,.09);
    border-color: rgba(255,69,0,.35);
    box-shadow: 0 0 0 1px rgba(255,69,0,.08) inset, 0 12px 40px rgba(0,0,0,.3), 0 0 30px rgba(255,69,0,.06);
    transform: translateY(-3px);
  }
  .cert-view { opacity: 0; transition: opacity .2s; align-self: center; flex-shrink: 0; }
  .cert-wrap:hover .cert-view { opacity: 1; }
`;

function CertCard({ cert, delay }) {
  const hasUrl = Boolean(cert.url);
  const Wrapper = hasUrl ? "a" : "div";
  const wrapperProps = hasUrl
    ? { href: cert.url, target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <div className="rv" style={{ transitionDelay: `${delay}s` }}>
      <Wrapper className="cert-wrap" {...wrapperProps}>
        <div className="cert-card">
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
          {/* View arrow — shows on hover, only when a link exists */}
          {hasUrl && (
            <div className="cert-view" style={{
              fontFamily: "'Fira Code', monospace", fontSize: 10, color: "var(--accent)",
            }}>
              View ↗
            </div>
          )}
        </div>
      </Wrapper>
    </div>
  );
}

export default function Certifications() {
  return (
    <section id="certs" style={{ padding: "100px clamp(20px,4vw,60px)", background: "rgba(255,255,255,.015)" }}>
      <style>{CERT_STYLE}</style>
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
