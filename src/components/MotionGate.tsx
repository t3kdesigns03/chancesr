"use client";

import { useEffect } from "react";

/**
 * Pauses looping animations (lamp flicker, steam, the live-status pulse) in any section that's off
 * screen, via a data-offscreen attribute the CSS keys on. Nothing loops where nobody's looking.
 */
export default function MotionGate() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.removeAttribute("data-offscreen");
          else e.target.setAttribute("data-offscreen", "");
        }),
      { rootMargin: "120px 0px" },
    );
    document.querySelectorAll("main > section, header, footer").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
