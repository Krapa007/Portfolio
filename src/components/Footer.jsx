export default function Footer() {
  return (
    <footer style={{
      padding: "24px clamp(20px,4vw,60px)",
      display: "flex", alignItems: "center",
      justifyContent: "space-between", flexWrap: "wrap", gap: 10,
    }}>
      <div style={{ fontWeight: 800, fontSize: 16, color: "var(--white)", letterSpacing: "-.3px" }}>
        KC<span style={{ color: "var(--accent)" }}>.</span>
      </div>

      <span style={{ fontFamily: "'Fira Code', monospace", fontSize: 10, color: "var(--muted)", letterSpacing: 0.3 }}>
        © 2025 Kalyan Krapa
      </span>

      <div style={{ display: "flex", gap: 16 }}>
        {[
          { label: "GitHub",   href: "https://github.com/Krapa007" },
          { label: "LinkedIn", href: "https://www.linkedin.com/in/kalyan-krapa-556282229/" },
        ].map(({ label, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={(e) => (e.target.style.color = "var(--accent)")}
            onMouseLeave={(e) => (e.target.style.color = "var(--muted)")}
            style={{
              fontFamily: "'Fira Code', monospace", fontSize: 10,
              color: "var(--muted)", textDecoration: "none",
              letterSpacing: 0.3, cursor: "none", transition: "color .2s",
            }}
          >
            {label}
          </a>
        ))}
        <span style={{ fontFamily: "'Fira Code', monospace", fontSize: 10, color: "var(--muted)" }}>
          Hyderabad, India
        </span>
      </div>
    </footer>
  );
}
