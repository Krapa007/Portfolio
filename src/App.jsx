import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

import BackgroundCanvas from "./components/BackgroundCanvas";
import DogCanvas        from "./components/DogCanvas";
import Navbar           from "./components/Navbar";
import ScrollProgress   from "./components/ScrollProgress";
import Hero             from "./components/Hero";
import Projects         from "./components/Projects";
import Skills           from "./components/Skills";
import Certifications   from "./components/Certifications";
import About            from "./components/About";
import Contact          from "./components/Contact";
import Footer           from "./components/Footer";

import { useReveal }    from "./hooks/useReveal";

export default function App() {
  const [light, setLight] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useReveal();

  // ── Ball cursor — injected directly onto body, no stacking context parent ──
  useEffect(() => {
    const ball = document.createElement("div");
    ball.id = "kk-ball";
    document.body.appendChild(ball);
    const onMove = (e) => {
      ball.style.left = e.clientX + "px";
      ball.style.top  = e.clientY + "px";
    };
    window.addEventListener("mousemove", onMove, { capture: true, passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove, { capture: true });
      ball.remove();
    };
  }, []);

  // Respect OS-level reduced motion preference
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setPrefersReducedMotion(media.matches);
    onChange();
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  // Sync body classes
  useEffect(() => {
    document.body.classList.toggle("light", light);
    document.body.classList.toggle("reduced-motion", prefersReducedMotion);
  }, [light, prefersReducedMotion]);

  return (
    <>
      {/* DogCanvas and BackgroundCanvas rendered via portal directly on document.body
          so they are NEVER inside a stacking context — they always sit above everything */}
      {createPortal(<BackgroundCanvas />, document.body)}
      {createPortal(<DogCanvas />, document.body)}

      {/* Page content wrapper */}
      <div style={{ position: "relative", zIndex: 1 }}>
        <ScrollProgress />
        <Navbar light={light} toggleLight={() => setLight((p) => !p)} />
        <Hero reducedMotion={prefersReducedMotion} />
        <Projects />
        <Skills />
        <Certifications />
        <About />
        <Contact />
        <Footer />
      </div>
    </>
  );
}
