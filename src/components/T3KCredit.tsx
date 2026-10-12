"use client";

import { useRef } from "react";
import SpaceTruck from "./SpaceTruck";

/**
 * "Proposed site by T3KDesigns", with the studio's own world beside it: the dark violet hub with its
 * slender lavender ring, as it appears in the galaxy on t3kdesigns.app. The food truck lands on it.
 * Shown only while site.spec is true, like the rest of the preview credit.
 */
export default function T3KCredit() {
  const planet = useRef<HTMLSpanElement>(null);
  return (
    <>
      <a
        href="https://t3kdesigns.app"
        target="_blank"
        rel="noopener"
        className="group inline-flex items-center gap-2.5 self-start py-1.5 hover:text-cream sm:self-auto"
      >
        <span ref={planet} className="inline-block h-9 w-12 shrink-0">
          <T3KPlanet />
        </span>
        <span>
          Proposed site by <span className="font-semibold text-linen group-hover:text-cream">T3KDesigns</span>
        </span>
      </a>
      <SpaceTruck target={planet} />
    </>
  );
}

function T3KPlanet() {
  return (
    <svg viewBox="0 0 48 36" className="h-full w-full overflow-visible" aria-hidden="true">
      <defs>
        <radialGradient id="t3k-body" cx="0.38" cy="0.32" r="0.75">
          <stop offset="0" stopColor="#3a3156" />
          <stop offset="0.6" stopColor="#15121e" />
          <stop offset="1" stopColor="#08070d" />
        </radialGradient>
        <radialGradient id="t3k-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0.6" stopColor="#9d8ad6" stopOpacity="0" />
          <stop offset="0.85" stopColor="#9d8ad6" stopOpacity="0.35" />
          <stop offset="1" stopColor="#9d8ad6" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* back half of the ring */}
      <ellipse className="t3k-ring" cx="24" cy="18" rx="22" ry="5.5" transform="rotate(-14 24 18)" fill="none" stroke="#cfc2f2" strokeWidth="1.1" strokeOpacity="0.7" />
      <circle cx="24" cy="18" r="15" fill="url(#t3k-glow)" />
      <circle cx="24" cy="18" r="11" fill="url(#t3k-body)" stroke="#9d8ad6" strokeOpacity="0.55" strokeWidth="0.8" />
      {/* city lights on the night side */}
      {[[28, 22], [30.5, 19], [26, 25], [31, 23.5], [27.5, 20.5]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="0.6" fill="#d9ccff" />
      ))}
      {/* front half of the ring, over the planet */}
      <path d="M 2.6 23.3 A 22 5.5 -14 0 0 45.4 12.7" className="t3k-ring" fill="none" stroke="#cfc2f2" strokeWidth="1.4" />
    </svg>
  );
}
