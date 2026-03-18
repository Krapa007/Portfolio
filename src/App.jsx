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
  // Detect touch-only devices once on mount — no canvas layers needed
  const isTouch = typeof window !== "undefined"
    && window.matchMedia("(hover: none) and (pointer: coarse)").matches;

  useReveal();

  // ── Ball cursor — only on pointer devices, not touch ──
  useEffect(() => {
    // Touch devices have no cursor — skip entirely
    if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) return;

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
      {/* Canvas layers — skipped entirely on touch/mobile devices */}
      {!isTouch && createPortal(<BackgroundCanvas />, document.body)}
      {!isTouch && createPortal(<DogCanvas />, document.body)}

      {/* Page content wrapper — zIndex:1 layers content above canvas at zIndex:0 */}
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
