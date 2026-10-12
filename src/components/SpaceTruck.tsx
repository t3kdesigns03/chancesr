"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Footer easter egg for the preview: a Chances "R" food truck, refit for space, flies a lazy wave across the
 * footer's bottom row and parks over the little T3KDesigns planet beside the credit. It launches the first
 * time the footer scrolls into view; with reduced motion it's simply parked there.
 *
 * The flight path is built in pixels from the real layout (CSS offset-path), so it lands on the planet at any width.
 */
export default function SpaceTruck({ target }: { target: React.RefObject<HTMLElement | null> }) {
  const lane = useRef<HTMLDivElement>(null);
  const [path, setPath] = useState<string | null>(null);
  const [state, setState] = useState<"idle" | "flying" | "parked">("idle");

  // Measure: start off the left edge, wave across, end just above the planet.
  useEffect(() => {
    const box = lane.current;
    const planet = target.current;
    if (!box || !planet) return;
    const measure = () => {
      const b = box.getBoundingClientRect();
      const p = planet.getBoundingClientRect();
      const tx = p.left - b.left + p.width / 2;
      const ty = p.top - b.top - 14;
      const w = b.width;
      const h = b.height;
      const sx = -80;
      const sy = h * 0.55;
      setPath(
        `path('M ${sx} ${sy} C ${w * 0.12} ${h * 0.05}, ${w * 0.22} ${h * 0.95}, ${w * 0.36} ${h * 0.45} S ${w * 0.6} ${h * 0.05}, ${Math.max(tx - w * 0.12, w * 0.5)} ${h * 0.5} S ${tx - 30} ${ty - 20}, ${tx} ${ty}')`,
      );
    };
    measure();
    // Web fonts change the credit's width, which moves the planet: measure again once they're in.
    document.fonts?.ready.then(measure);
    const ro = new ResizeObserver(measure);
    ro.observe(box);
    ro.observe(planet);
    return () => ro.disconnect();
  }, [target]);

  // Launch once, the first time the footer is on screen.
  useEffect(() => {
    const box = lane.current;
    if (!box) return;
    // Reduced motion: CSS parks the truck on the planet from the start, so there's nothing to launch.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        setState("flying");
        io.disconnect();
      },
      { threshold: 0.6 },
    );
    io.observe(box);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={lane} aria-hidden="true" className="pointer-events-none absolute inset-x-0 -top-16 bottom-0 overflow-visible">
      {path && (
        <div
          className={`space-truck ${state}`}
          style={{ offsetPath: path, offsetRotate: state === "parked" ? "0deg" : "auto 0deg" }}
          onAnimationEnd={(e) => {
            if (e.animationName === "truck-fly") setState("parked");
          }}
        >
          <Truck />
        </div>
      )}
    </div>
  );
}

/** Side view, nose right: a supper-club food truck with a bubble cockpit, a striped awning and a brass thruster. */
function Truck() {
  return (
    <svg viewBox="0 0 88 50" width="88" height="50" className="block overflow-visible">
      <defs>
        <linearGradient id="st-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f5ead6" />
          <stop offset="1" stopColor="#cdbd9c" />
        </linearGradient>
        <linearGradient id="st-brass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f3cd80" />
          <stop offset="1" stopColor="#8a6424" />
        </linearGradient>
        <radialGradient id="st-glass" cx="0.35" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#e6f6ff" stopOpacity="0.9" />
          <stop offset="1" stopColor="#6f8fb6" stopOpacity="0.35" />
        </radialGradient>
        <radialGradient id="st-flame" cx="1" cy="0.5" r="1">
          <stop offset="0" stopColor="#fff6d0" />
          <stop offset="0.4" stopColor="#ffb547" />
          <stop offset="1" stopColor="#ff5a2a" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* thruster flame, out the back */}
      <g className="truck-flame">
        <path d="M 6 30 C -6 26 -16 30 -22 31 C -16 32 -6 36 6 34 Z" fill="url(#st-flame)" />
      </g>
      {/* tail fin */}
      <path d="M 10 18 L 2 6 L 16 14 Z" fill="#a51c30" />
      {/* bubble cockpit with a tiny driver */}
      <path d="M 52 14 C 52 2 74 2 74 14 Z" fill="url(#st-glass)" stroke="#cfe6ff" strokeOpacity="0.6" />
      <circle cx="63" cy="10" r="3" fill="#3b2a20" />
      {/* the truck */}
      <rect x="6" y="14" width="74" height="24" rx="6" fill="url(#st-body)" stroke="#8a6424" strokeWidth="1.2" />
      <path d="M 80 20 C 86 22 87 30 80 34 Z" fill="#a51c30" />
      <rect x="6" y="30" width="74" height="4" fill="#a51c30" />
      {/* service window + striped awning */}
      <rect x="22" y="18" width="26" height="10" rx="1.5" fill="#2a1d11" />
      <rect x="23.5" y="22" width="23" height="5" fill="#ffc56a" opacity="0.6" />
      <path d="M 20 18 L 50 18 L 47 13 L 23 13 Z" fill="#f5ead6" />
      {[0, 1, 2, 3, 4].map((i) => (
        <path key={i} d={`M ${23 + i * 6} 13 L ${26 + i * 6} 13 L ${26 + i * 6.4} 18 L ${20 + i * 6.4} 18 Z`} fill="#a51c30" />
      ))}
      {/* the R badge */}
      <circle cx="61" cy="24" r="5.5" fill="#17100a" stroke="url(#st-brass)" strokeWidth="1.4" />
      <text x="61" y="27.6" textAnchor="middle" fontFamily="var(--font-unifraktur), serif" fontSize="9" fill="#e8bb63">
        R
      </text>
      {/* thruster pods where the wheels used to be */}
      <rect x="14" y="36" width="16" height="6" rx="3" fill="url(#st-brass)" />
      <rect x="56" y="36" width="16" height="6" rx="3" fill="url(#st-brass)" />
      <ellipse cx="22" cy="44" rx="5" ry="2" fill="#ffc56a" opacity="0.5" />
      <ellipse cx="64" cy="44" rx="5" ry="2" fill="#ffc56a" opacity="0.5" />
    </svg>
  );
}
