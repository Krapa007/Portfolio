import { useEffect, useRef } from "react";

export default function ScrollProgress() {
  const fillRef = useRef(null);
  const capRef = useRef(null);

  useEffect(() => {
    let frame = 0;
    let target = 0;
    let current = 0;

    const measure = () => {
      const el = document.documentElement;
      const scrolled = el.scrollTop || document.body.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      target = total > 0 ? Math.min(scrolled / total, 1) : 0;
      if (!frame) frame = requestAnimationFrame(render);
    };

    const render = () => {
      // Critically-damped lerp toward target: catches up fast, never overshoots.
      current += (target - current) * 0.18;
      if (Math.abs(target - current) < 0.0002) current = target;

      const fill = fillRef.current;
      const cap = capRef.current;
      if (fill) fill.style.transform = `scaleX(${current})`;
      if (cap) {
        cap.style.left = `${current * 100}%`;
        cap.style.opacity = current > 0.005 && current < 0.999 ? "1" : "0";
      }

      frame = current === target ? 0 : requestAnimationFrame(render);
    };

    measure();
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, height: 2,
      zIndex: 6000, background: "rgba(255,255,255,.05)",
      pointerEvents: "none",
    }}>
      <div
        ref={fillRef}
        style={{
          height: "100%", width: "100%",
          transform: "scaleX(0)", transformOrigin: "left center",
          willChange: "transform",
          background: "linear-gradient(90deg, var(--accent), var(--accent2))",
          boxShadow: "0 0 8px var(--accent)",
        }}
      />
      <div
        ref={capRef}
        style={{
          position: "absolute", top: "50%", left: 0,
          width: 7, height: 7, borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          background: "var(--accent2)",
          boxShadow: "0 0 10px 2px var(--accent), 0 0 4px #fff",
          opacity: 0, transition: "opacity .25s ease-out",
          willChange: "left, opacity",
        }}
      />
    </div>
  );
}
