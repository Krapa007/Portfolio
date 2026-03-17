import { useState } from "react";
import { useActiveSection } from "../hooks/useActiveSection";

const NAV_LINKS = [
  { id: "projects", label: "Projects" },
  { id: "stack",    label: "Skills"   },
  { id: "certs",    label: "Certs"    },
  { id: "about",    label: "About"    },
];

export default function Navbar({ light, toggleLight }) {
  const [mobOpen, setMobOpen] = useState(false);
  const active = useActiveSection();

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobOpen(false);
  };

  return (
    <>
      <style>{`
        .nav-link {
          font-family: 'Sora', sans-serif; font-size: 13px; font-weight: 400;
          color: var(--muted); text-decoration: none; cursor: none;
          transition: color .2s; background: none; border: none; padding: 0;
        }
        .nav-link:hover, .nav-link.active { color: var(--text); }
        .nav-hire {
          font-family: 'Sora', sans-serif; font-weight: 700; font-size: 13px;
          background: var(--accent); color: #fff; border: none;
          padding: 9px 22px; cursor: none; transition: all .2s; letter-spacing: .2px;
        }
        .nav-hire:hover { background: var(--accent2); transform: translateY(-1px); }
        .toggle-pill {
          display: flex; align-items: center; gap: 8px; cursor: none;
          padding: 6px 14px; border: 1px solid rgba(255,255,255,.15);
          font-size: 12px; color: var(--muted); background: rgba(255,255,255,.04);
          transition: all .2s; font-family: 'Fira Code', monospace;
        }
        .toggle-pill:hover { border-color: var(--accent); color: var(--accent); }
        body.light .toggle-pill { border-color: rgba(0,0,0,.15); background: rgba(0,0,0,.04); }
        .ham-btn {
          display: none; background: none; border: 1px solid rgba(255,255,255,.15);
          color: var(--text); padding: 7px 11px; font-size: 17px; cursor: none;
        }
        @media(max-width: 900px) {
          .nav-center-links, .nav-hire { display: none !important; }
          .ham-btn { display: block !important; }
        }
      `}</style>

      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 5000,
        height: 52, display: "flex", alignItems: "center",
        justifyContent: "space-between", padding: "0 60px",
        background: light ? "rgba(245,240,232,.55)" : "rgba(13,14,20,.65)",
        backdropFilter: "blur(40px) saturate(180%)",
        WebkitBackdropFilter: "blur(40px) saturate(180%)",
        boxShadow: light
          ? "0 1px 0 rgba(255,255,255,.8) inset, 0 4px 24px rgba(0,0,0,.08)"
          : "0 1px 0 rgba(255,255,255,.07) inset, 0 4px 24px rgba(0,0,0,.4)",
      }}>
        {/* Logo */}
        <button onClick={() => scrollTo("home")} style={{
          fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: 20,
          color: "var(--white)", letterSpacing: "-.5px",
          background: "none", border: "none", cursor: "none",
        }}>
          KC<span style={{ color: "var(--accent)" }}>.</span>
        </button>

        {/* Center links */}
        <div className="nav-center-links" style={{ display: "flex", gap: 36 }}>
          {NAV_LINKS.map((l) => (
            <button
              key={l.id}
              className={`nav-link${active === l.id ? " active" : ""}`}
              onClick={() => scrollTo(l.id)}
            >
              {l.label}
            </button>
          ))}
        </div>

        {/* Right — theme toggle + hire me */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button className="toggle-pill" onClick={toggleLight}>
            {light ? "🌙 Dark" : "☀️ Light"}
          </button>
          <button className="nav-hire" onClick={() => scrollTo("contact")}>
            Hire Me
          </button>
          <button className="ham-btn" onClick={() => setMobOpen(!mobOpen)}>
            ☰
          </button>
        </div>
      </nav>

      {/* Mobile menu — includes theme toggle so mobile users can switch */}
      {mobOpen && (
        <div style={{
          position: "fixed", top: 52, left: 0, right: 0, zIndex: 4999,
          background: light ? "rgba(245,240,232,.96)" : "rgba(13,14,20,.97)",
          backdropFilter: "blur(32px)", display: "flex", flexDirection: "column",
        }}>
          {[...NAV_LINKS, { id: "contact", label: "Contact" }].map((l) => (
            <button key={l.id} onClick={() => scrollTo(l.id)} style={{
              padding: "15px 40px", color: "var(--muted)",
              fontFamily: "'Sora', sans-serif", fontSize: 14, textAlign: "left",
              background: "none", border: "none", cursor: "none",
              borderBottom: "1px solid rgba(255,255,255,.06)",
            }}>
              {l.label}
            </button>
          ))}
          {/* Theme toggle in mobile menu */}
          <button onClick={() => { toggleLight(); setMobOpen(false); }} style={{
            padding: "15px 40px", color: "var(--accent)",
            fontFamily: "'Fira Code', monospace", fontSize: 12, textAlign: "left",
            background: "none", border: "none", cursor: "none",
          }}>
            {light ? "🌙 Switch to Dark" : "☀️ Switch to Light"}
          </button>
        </div>
      )}
    </>
  );
}
