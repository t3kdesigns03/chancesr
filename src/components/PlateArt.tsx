import { useId } from "react";
import type { PotatoId } from "@/lib/site";

/**
 * The plate, drawn top-down on the tabletop. Pure SVG, no photos.
 * Prime rib is a cut-face-up slice: peppered crust, a fat edge, the seam that splits the cap
 * from the eye, a cooked band whose color follows the doneness, and a soft center that does too.
 *
 * Geometry (viewBox 600×600): plate centered at (300, 305). Meat at (252, 300).
 * The slice outline lives in local coords around (0, 0) and is scaled by cut size.
 */

const MEAT =
  "M -112 6 C -116 -44 -84 -84 -30 -90 C 10 -94 52 -86 84 -64 C 110 -46 122 -14 116 20 C 110 58 80 86 42 90 C 18 92 4 82 -14 84 C -44 88 -76 76 -94 56 C -106 42 -111 26 -112 6 Z";
// Fat along the outer edge of the cap, drawn as a thick stroke and clipped to the slice.
const FAT_EDGE = "M -112 -4 C -112 -48 -80 -86 -30 -92 C 4 -96 34 -92 58 -82";
// The seam between the cap (top) and the eye (center), with the little fat "kernel".
const SEAM = "M -100 -12 C -70 -40 -30 -52 6 -50 C 40 -48 70 -40 98 -22";
const KERNEL = "M -14 -40 c 6 -6 18 -6 22 0 c 3 5 -3 10 -10 10 c -8 1 -14 -4 -12 -10 Z";
const MARBLE = [
  "M -64 18 c 10 -6 18 2 28 -3",
  "M 20 34 c 8 4 14 -2 24 3",
  "M -24 6 c 6 5 12 -1 18 4",
  "M 44 0 c 5 -6 13 -3 18 -8",
  "M -46 54 c 8 -3 14 3 22 0",
  "M -60 -58 c 10 -3 20 0 28 -4",
  "M 30 -66 c 8 2 14 -1 20 2",
];
// Cracked pepper on the crust, just inside the edge.
const PEPPER: [number, number, number][] = [
  [-106, -20, 2.4], [-104, 22, 1.7], [-90, 50, 2.2], [-58, 76, 1.8], [-14, 80, 2.2], [30, 84, 1.7], [70, 72, 2.3],
  [100, 42, 1.9], [110, 4, 2.1], [104, -32, 1.7], [76, -64, 2], [30, -86, 1.6], [-20, -86, 2.1], [-70, -72, 1.8],
  [-100, -44, 1.6], [90, 60, 1.4], [-76, 66, 1.5], [52, 86, 1.3], [-40, -88, 1.4], [112, -12, 1.5],
];

// A scoop of mashed potatoes: a lumpy round outline (polar wobble), drawn once at module load.
const MASH = (() => {
  const pts: string[] = [];
  for (let i = 0; i <= 48; i++) {
    const t = (i / 48) * Math.PI * 2;
    const r = 56 + 5 * Math.sin(t * 7) + 3.5 * Math.sin(t * 3 + 1) + 2 * Math.cos(t * 11);
    pts.push(`${(Math.cos(t) * r).toFixed(1)} ${(Math.sin(t) * r * 0.9).toFixed(1)}`);
  }
  return `M ${pts.join(" L ")} Z`;
})();

// Deterministic scatter so the drawings never change between renders.
const rand = (seed: number) => () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
const BAKED_SPECKS: [number, number][] = (() => {
  const r = rand(11);
  return Array.from({ length: 22 }, () => [(r() - 0.5) * 108, (r() - 0.5) * 66] as [number, number]).filter(([x, y]) => Math.abs(y) > 12 || Math.abs(x) > 44);
})();
const HASH_STRANDS: [number, number, number, string][] = (() => {
  const r = rand(23);
  const cols = ["#f0c46e", "#b8782a", "#e6ae52", "#8f5a1e"];
  return Array.from({ length: 46 }, (_, i) => [(r() - 0.5) * 92, (r() - 0.5) * 72, r() * 180, cols[i % 4]] as [number, number, number, string]);
})();
const FRIES: [number, number, number, number][] = (() => {
  const r = rand(5);
  return Array.from({ length: 13 }, () => [(r() - 0.5) * 70, (r() - 0.5) * 46, -60 + r() * 120, 44 + r() * 22] as [number, number, number, number]);
})();
const PILAF: [number, number, number, string][] = (() => {
  const r = rand(41);
  const cols = ["#fbf3dc", "#f5e8c4", "#fffaf0", "#d9c08a"];
  const pts: [number, number, number, string][] = [];
  while (pts.length < 150) {
    const x = (r() - 0.5) * 100;
    const y = (r() - 0.5) * 78;
    if ((x / 50) ** 2 + (y / 39) ** 2 < 0.85) pts.push([x, y, r() * 180, cols[pts.length % 4]]);
  }
  // a few bits of parsley and carrot
  for (let i = 0; i < 10; i++) pts.push([(r() - 0.5) * 70, (r() - 0.5) * 50, r() * 180, i % 2 ? "#4f7a2e" : "#e07b2c"]);
  return pts;
})();

const BEANS: [number, number, number][] = [
  [-28, -14, -32], [-12, -22, -18], [6, -16, -40], [-30, 4, -24], [-4, 2, -30], [22, -6, -20], [-16, 18, -36],
];
const CARROTS: [number, number][] = [[30, 18], [44, 2], [14, 30], [40, -22], [-38, 26]];
const SHROOMS: [number, number, number][] = [[-34, 2, -20], [-12, -8, 15], [8, 4, -35], [28, -6, 25], [-20, 14, 40], [14, 16, -5], [36, 12, 60]];

/**
 * Steam off the hot slice: soft HTML puffs over the plate. Animating anything inside the plate SVG
 * would make the browser repaint the noise-textured meat every frame.
 */
export function Steam() {
  return (
    <div aria-hidden="true" className="steam-puffs left-[30%] top-[14%] h-[30%] w-[26%]">
      <i />
      <i />
      <i />
    </div>
  );
}

export default function PlateArt({
  scale,
  center,
  band,
  size,
  juicy,
  potato,
  mushrooms,
  ladles,
  isCut,
  pourKey,
  knifeKey,
}: {
  scale: number;
  center: string;
  band: string;
  size: number;
  juicy: number;
  potato: PotatoId;
  mushrooms: boolean;
  ladles: number;
  isCut: boolean;
  pourKey: number;
  knifeKey: number;
}) {
  const id = useId().replace(/:/g, "");
  const u = (n: string) => `${id}-${n}`;
  const poolScale = [0, 0.95, 1.06, 1.17][ladles] ?? 1.17;

  const slice = (
    <>
      {/* crust */}
      <path d={MEAT} fill={`url(#${u("crust")})`} stroke="#160602" strokeWidth="3.5" />
      <rect x="-130" y="-110" width="260" height="220" fill="#000" filter={`url(#${u("bark")})`} clipPath={`url(#${u("whole")})`} opacity="0.8" />
      <path d={FAT_EDGE} fill="none" stroke={`url(#${u("fat")})`} strokeWidth="13" strokeLinecap="round" clipPath={`url(#${u("whole")})`} opacity="0.9" />
      {/* cooked band, then the pink-to-red center */}
      <path d={MEAT} className="plate-fill" fill={band} transform="scale(0.9)" />
      <g filter={`url(#${u("soft")})`} clipPath={`url(#${u("inner")})`}>
        <path d={MEAT} className="plate-fill plate-ease" fill={center} style={{ transform: `translate(4px, 12px) scale(${size})` }} />
      </g>
      {/* muscle grain over the face */}
      <rect x="-130" y="-110" width="260" height="220" fill="#000" filter={`url(#${u("grain")})`} clipPath={`url(#${u("inner")})`} opacity="1" />
      <path d={MEAT} transform="scale(0.9)" fill={`url(#${u("shade")})`} />
      <path d={MEAT} transform="scale(0.9)" fill="none" stroke="#2a0c06" strokeOpacity="0.45" strokeWidth="4" filter={`url(#${u("blur4")})`} />
      <path d={SEAM} fill="none" stroke="#efdcb4" strokeWidth="5" strokeLinecap="round" opacity="0.85" />
      <path d={SEAM} fill="none" stroke="#fff6e0" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" transform="translate(0 -1.5)" />
      <path d={KERNEL} fill="#ecd6a8" opacity="0.9" />
      {MARBLE.map((d, i) => (
        <path key={i} d={d} fill="none" stroke="#f1dcb4" strokeWidth="1.6" strokeLinecap="round" opacity="0.35" />
      ))}
      {PEPPER.map(([x, y, r], i) => (
        <circle key={i} cx={x * 0.98} cy={y * 0.98} r={r} fill="#140904" opacity="0.9" />
      ))}
      {/* the glisten fades as it cooks */}
      <g style={{ opacity: juicy, transition: "opacity .6s" }}>
        <ellipse cx="-24" cy="16" rx="58" ry="18" transform="rotate(-14)" fill="#fff" filter={`url(#${u("soft")})`} />
        <path d="M -60 -2 C -40 -12 -10 -14 14 -8" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity="0.9" />
        <circle cx="40" cy="40" r="3" fill="#fff" />
        <circle cx="-70" cy="30" r="2" fill="#fff" />
      </g>
    </>
  );

  return (
    <svg viewBox="0 0 600 600" className="h-auto w-full select-none" role="img" aria-label="Your plate">
      <defs>
        <radialGradient id={u("rim")} cx="0.42" cy="0.38" r="0.7">
          <stop offset="0" stopColor="#fdf7ea" />
          <stop offset="0.75" stopColor="#efe3cb" />
          <stop offset="1" stopColor="#d9c8a8" />
        </radialGradient>
        <radialGradient id={u("well")} cx="0.45" cy="0.4" r="0.7">
          <stop offset="0" stopColor="#faf2e2" />
          <stop offset="1" stopColor="#e6d7bb" />
        </radialGradient>
        <linearGradient id={u("gold")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f0cb7c" />
          <stop offset="0.5" stopColor="#b8862f" />
          <stop offset="1" stopColor="#e3b762" />
        </linearGradient>
        <radialGradient id={u("crust")} cx="0.45" cy="0.4" r="0.65">
          <stop offset="0.5" stopColor="#6a2e12" />
          <stop offset="0.85" stopColor="#3a1607" />
          <stop offset="1" stopColor="#1e0a03" />
        </radialGradient>
        {/* Shading over the cut face: lit in the middle, falling off toward the seared edge */}
        <radialGradient id={u("shade")} cx="0.42" cy="0.42" r="0.62">
          <stop offset="0" stopColor="#fff2e6" stopOpacity="0.16" />
          <stop offset="0.45" stopColor="#3a0a08" stopOpacity="0" />
          <stop offset="0.8" stopColor="#3a0a08" stopOpacity="0.32" />
          <stop offset="1" stopColor="#1e0504" stopOpacity="0.6" />
        </radialGradient>
        <linearGradient id={u("fat")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#e6c890" />
          <stop offset="0.5" stopColor="#f4e3bd" />
          <stop offset="1" stopColor="#d9b77d" />
        </linearGradient>
        <radialGradient id={u("jus")} cx="0.45" cy="0.45" r="0.6">
          <stop offset="0" stopColor="#3e1205" stopOpacity="0.97" />
          <stop offset="0.75" stopColor="#5e1f0a" stopOpacity="0.92" />
          <stop offset="1" stopColor="#8a3a17" stopOpacity="0.7" />
        </radialGradient>
        <radialGradient id={u("mash")} cx="0.38" cy="0.32" r="0.75">
          <stop offset="0" stopColor="#fffdf6" />
          <stop offset="0.6" stopColor="#f6edd9" />
          <stop offset="1" stopColor="#dccaa5" />
        </radialGradient>
        <linearGradient id={u("steel")} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#8f8a82" />
          <stop offset="0.45" stopColor="#f2efe8" />
          <stop offset="1" stopColor="#a39d93" />
        </linearGradient>
        <linearGradient id={u("handle")} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#3a2414" />
          <stop offset="0.5" stopColor="#6b4426" />
          <stop offset="1" stopColor="#2e1c0f" />
        </linearGradient>
        <filter id={u("soft")} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="10" />
        </filter>
        <filter id={u("blur4")} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
        <filter id={u("shadow")} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="12" />
        </filter>
        <filter id={u("drop")} x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="2" dy="5" stdDeviation="4" floodColor="#3a2410" floodOpacity="0.35" />
        </filter>
        {/* Long, stringy muscle fibers: stretched noise, dark-red where dense, clear where not */}
        <filter id={u("grain")} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.04 0.22" numOctaves="3" seed="7" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.3  0 0 0 0 0.03  0 0 0 0 0.05  0 0 0 -2.8 1.7" />
        </filter>
        {/* Seared bark: coarse dark speckle */}
        <filter id={u("bark")} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.22" numOctaves="2" seed="3" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.08  0 0 0 0 0.03  0 0 0 0 0.01  0 0 0 -3 2" />
        </filter>
        <clipPath id={u("whole")}>
          <path d={MEAT} />
        </clipPath>
        <clipPath id={u("inner")}>
          <path d={MEAT} transform="scale(0.9)" />
        </clipPath>
        {/* The butter-knife cut runs across the slice at local y = 14 */}
        <clipPath id={u("top")}>
          <rect x="-140" y="-120" width="280" height="134" />
        </clipPath>
        <clipPath id={u("bottom")}>
          <rect x="-140" y="14" width="280" height="120" />
        </clipPath>
      </defs>

      {/* Plate */}
      <ellipse cx="312" cy="330" rx="272" ry="266" fill="#000" opacity="0.55" filter={`url(#${u("shadow")})`} />
      <circle cx="300" cy="305" r="272" fill={`url(#${u("rim")})`} />
      <circle cx="300" cy="305" r="258" fill="none" stroke={`url(#${u("gold")})`} strokeWidth="3" />
      <circle cx="300" cy="305" r="252" fill="none" stroke="#c9963c" strokeOpacity="0.5" strokeWidth="0.8" />
      <circle cx="300" cy="305" r="216" fill={`url(#${u("well")})`} />
      <circle cx="300" cy="305" r="216" fill="none" stroke="#8a6a3e" strokeOpacity="0.16" strokeWidth="7" filter={`url(#${u("soft")})`} />
      <path d="M 82 220 A 235 235 0 0 1 214 84" fill="none" stroke="#fff" strokeOpacity="0.7" strokeWidth="9" strokeLinecap="round" filter={`url(#${u("soft")})`} />

      {/* Au jus pool, under the meat, pooling toward the low side */}
      <g transform="translate(240 320)">
        <g className="plate-pool" style={{ transform: `scale(${poolScale * scale})`, opacity: ladles ? 1 : 0 }}>
          <path
            d="M -140 20 C -150 -40 -110 -96 -40 -100 C 30 -104 110 -80 128 -30 C 140 10 130 60 96 92 C 60 122 -10 128 -60 116 C -110 104 -136 70 -140 20 Z"
            fill={`url(#${u("jus")})`}
            stroke="#9c4a22"
            strokeOpacity="0.45"
            strokeWidth="2"
          />
          <path d="M -124 40 C -116 74 -88 98 -50 106" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" opacity="0.32" />
          <path d="M 70 98 C 92 86 112 66 120 44" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity="0.22" />
          <circle cx="-110" cy="74" r="3.5" fill="#fff" opacity="0.4" />
          <circle cx="104" cy="74" r="2.5" fill="#fff" opacity="0.35" />
          <circle cx="-20" cy="112" r="2" fill="#fff" opacity="0.3" />
        </g>
      </g>

      {/* Prime rib: two halves so the butter knife can actually separate them */}
      <g transform="translate(252 300)">
        <g className="plate-ease" style={{ transform: `scale(${scale})` }}>
          <g filter={`url(#${u("drop")})`}>
            <g clipPath={`url(#${u("top")})`}>{slice}</g>
            <g className="plate-cut" style={{ transform: isCut ? "translate(6px, 16px) rotate(-3deg)" : "none", transformOrigin: "0px 14px" }}>
              <g clipPath={`url(#${u("bottom")})`}>{slice}</g>
            </g>
          </g>
        </g>
      </g>

      {/* The potato (one of the printed menu's six), then the mushrooms */}
      {potato === "baked" && (
        <g transform="translate(438 200)">
          <g className="side-drop">
            <ellipse cx="6" cy="16" rx="64" ry="42" fill="#5a3a1c" opacity="0.3" filter={`url(#${u("blur4")})`} />
            <g transform="rotate(-14)">
              <ellipse rx="62" ry="40" fill="#7a4e26" />
              <ellipse rx="60" ry="38" fill="none" stroke="#5b3818" strokeWidth="3" />
              {BAKED_SPECKS.map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r="1.6" fill="#4a2c12" opacity="0.7" />
              ))}
              <path d="M -40 -2 C -20 -18 22 -18 42 -2 C 24 12 -22 12 -40 -2 Z" fill="#f2e2bb" />
              <path d="M -30 -2 C -12 -10 14 -10 32 -2" fill="none" stroke="#e2cb96" strokeWidth="3" />
            </g>
            <rect x="-10" y="-14" width="20" height="15" rx="3" transform="rotate(10)" fill="#f8da74" stroke="#deb346" />
            <path d="M 8 -8 C 14 -22 34 -20 34 -8 C 40 -2 30 8 20 4 C 10 8 2 0 8 -8 Z" fill="#fffaf0" />
            {[[16, -12], [24, -6], [12, -2], [28, -14]].map(([x, y], i) => (
              <rect key={i} x={x} y={y} width="4" height="1.8" rx="0.9" fill="#4f7a2e" transform={`rotate(${i * 40} ${x} ${y})`} />
            ))}
          </g>
        </g>
      )}
      {potato === "hash" && (
        <g transform="translate(436 198)">
          <g className="side-drop">
            <ellipse cx="6" cy="14" rx="62" ry="46" fill="#6e4a22" opacity="0.3" filter={`url(#${u("blur4")})`} />
            <path d="M -58 4 C -60 -30 -24 -50 8 -48 C 44 -46 62 -20 58 8 C 54 36 22 50 -8 48 C -38 46 -56 30 -58 4 Z" fill="#d49a42" />
            <path d="M -58 4 C -60 -30 -24 -50 8 -48 C 44 -46 62 -20 58 8 C 54 36 22 50 -8 48 C -38 46 -56 30 -58 4 Z" fill="none" stroke="#a96a24" strokeWidth="4" />
            {HASH_STRANDS.map(([x, y, r, c], i) => (
              <path key={i} d={`M ${x} ${y} q 9 -3 18 1`} transform={`rotate(${r} ${x} ${y})`} fill="none" stroke={c} strokeWidth="2.6" strokeLinecap="round" />
            ))}
          </g>
        </g>
      )}
      {potato === "fries" && (
        <g transform="translate(440 196)">
          <g className="side-drop">
            <ellipse cx="4" cy="14" rx="66" ry="44" fill="#6e4a22" opacity="0.28" filter={`url(#${u("blur4")})`} />
            {FRIES.map(([x, y, r, l], i) => (
              <g key={i} transform={`translate(${x} ${y}) rotate(${r})`}>
                <rect x={-l / 2} y="-5" width={l} height="10" rx="3" fill="#e9b452" stroke="#c48a2e" strokeWidth="1.2" />
                <path d={`M ${-l / 2 + 4} -2 L ${l / 2 - 4} -2`} stroke="#f8d98a" strokeWidth="2" strokeLinecap="round" />
              </g>
            ))}
            {[[-20, -6], [14, 10], [30, -16], [-8, 20]].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="1.5" fill="#fff" opacity="0.8" />
            ))}
          </g>
        </g>
      )}
      {potato === "pilaf" && (
        <g transform="translate(436 198)">
          <g className="side-drop">
            <ellipse cx="6" cy="14" rx="60" ry="42" fill="#6e5a32" opacity="0.28" filter={`url(#${u("blur4")})`} />
            <path d="M -54 6 C -56 -26 -22 -44 6 -42 C 38 -40 58 -18 54 8 C 50 32 20 44 -6 42 C -34 40 -52 28 -54 6 Z" fill="#eadcb8" />
            {PILAF.map(([x, y, r, c], i) => (
              <ellipse key={i} cx={x} cy={y} rx="4.2" ry="1.7" transform={`rotate(${r} ${x} ${y})`} fill={c} />
            ))}
          </g>
        </g>
      )}

      {potato === "mash" && (
        <g transform="translate(436 196)">
          <g className="side-drop">
            <ellipse cx="6" cy="14" rx="62" ry="50" fill="#6e5230" opacity="0.35" filter={`url(#${u("blur4")})`} />
            <path d={MASH} fill={`url(#${u("mash")})`} />
            {/* spoon swirl: shadowed ridge + lit edge */}
            <path d="M -38 4 C -40 -26 -6 -40 18 -30 C 40 -20 40 10 20 18 C 2 26 -16 14 -12 -2 C -9 -14 6 -16 12 -8" fill="none" stroke="#d8c39a" strokeWidth="5" strokeLinecap="round" />
            <path d="M -36 1 C -38 -27 -6 -42 18 -33 C 40 -23 41 7 22 15" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity="0.9" />
            <path d="M -44 26 C -30 40 -4 46 20 40" fill="none" stroke="#d8c39a" strokeWidth="4" strokeLinecap="round" opacity="0.8" />
            <path d="M 34 30 C 44 22 50 10 50 -4" fill="none" stroke="#d8c39a" strokeWidth="3.5" strokeLinecap="round" opacity="0.7" />
            {/* real potatoes leave a few honest lumps */}
            <circle cx="-30" cy="-20" r="4.5" fill="#efe2c4" stroke="#dccaa5" />
            <circle cx="34" cy="-30" r="3.5" fill="#efe2c4" stroke="#dccaa5" />
            <circle cx="-8" cy="36" r="4" fill="#efe2c4" stroke="#dccaa5" />
            {/* melting butter in the well */}
            <ellipse cx="2" cy="-4" rx="18" ry="11" fill="#f2c94c" opacity="0.5" />
            <rect x="-9" y="-14" width="21" height="16" rx="4" transform="rotate(14 1 -6)" fill="#f8da74" stroke="#deb346" strokeWidth="1.2" />
            <rect x="-6" y="-12" width="9" height="4" rx="2" transform="rotate(14 1 -6)" fill="#fff6c9" opacity="0.85" />
            {[[-24, 12], [22, -12], [36, 14], [-40, -6], [8, 28], [-12, -32]].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="1.3" fill="#3b2a1a" opacity="0.75" />
            ))}
            {[[-18, 22], [26, 4], [-34, -30], [12, -38]].map(([x, y], i) => (
              <rect key={i} x={x} y={y} width="5" height="2.2" rx="1" fill="#4f7a2e" transform={`rotate(${i * 50} ${x} ${y})`} />
            ))}
          </g>
        </g>
      )}

      {potato === "veg" && (
        <g transform="translate(440 408) scale(1.2)">
          <g className="side-drop">
            <ellipse cx="4" cy="10" rx="62" ry="40" fill="#5a4a2a" opacity="0.25" filter={`url(#${u("blur4")})`} />
            {BEANS.map(([x, y, r], i) => (
              <g key={i} transform={`translate(${x} ${y}) rotate(${r})`}>
                <rect x="-26" y="-5" width="52" height="10" rx="5" fill="#557f30" />
                <path d="M -20 -2 L 20 -2" stroke="#93ba5b" strokeWidth="1.6" strokeLinecap="round" opacity="0.8" />
                <circle cx="-26" cy="0" r="2" fill="#3f6022" />
              </g>
            ))}
            {CARROTS.map(([x, y], i) => (
              <g key={i} transform={`translate(${x} ${y})`}>
                <circle r="11" fill="#e0742a" stroke="#b9561a" strokeWidth="1.2" />
                <circle r="6.5" fill="none" stroke="#f3a45c" strokeWidth="1.6" />
                <circle cx="-3" cy="-3" r="2.5" fill="#fff" opacity="0.4" />
              </g>
            ))}
          </g>
        </g>
      )}

      {mushrooms && (
        <g transform="translate(292 474) scale(1.1)">
          <g className="side-drop">
            <ellipse cx="0" cy="8" rx="58" ry="24" fill="#4a3018" opacity="0.3" filter={`url(#${u("blur4")})`} />
            {SHROOMS.map(([x, y, r], i) => (
              <g key={i} transform={`translate(${x} ${y}) rotate(${r}) scale(1.25)`}>
                <path d="M -13 0 C -13 -13 13 -13 13 0 C 13 3 7 3 5 3 L 5 11 C 5 13 -5 13 -5 11 L -5 3 C -7 3 -13 3 -13 0 Z" fill="#6e4424" />
                <path d="M -9.5 -0.5 C -9.5 -9 9.5 -9 9.5 -0.5 C 8 1 4 1 3 1 L 3 9 C 3 10 -3 10 -3 9 L -3 1 C -4 1 -8 1 -9.5 -0.5 Z" fill="#c49064" />
                <path d="M -6 -6 C -2 -9 3 -9 6 -6" fill="none" stroke="#fff" strokeWidth="1.2" opacity="0.35" strokeLinecap="round" />
              </g>
            ))}
          </g>
        </g>
      )}

      {/* Ladle pours a little more jus each time */}
      {pourKey > 0 && (
        <g key={`pour-${pourKey}`}>
          <path
            className="jus-stream"
            d="M 138 186 C 134 220 144 250 156 290"
            fill="none"
            stroke="#5e1f0a"
            strokeWidth="7"
            strokeLinecap="round"
            strokeDasharray="120"
            strokeDashoffset="120"
            opacity="0"
          />
          <g transform="translate(164 172)">
            <g className="ladle-pour" style={{ opacity: 0 }}>
              <path d="M 22 -10 L 120 -150" stroke={`url(#${u("steel")})`} strokeWidth="8" strokeLinecap="round" />
              <path d="M 120 -150 c 8 -12 22 -8 18 6" fill="none" stroke="#b4aea4" strokeWidth="6" strokeLinecap="round" />
              <ellipse cx="0" cy="0" rx="30" ry="24" fill="#cfc9be" stroke="#8f8a82" strokeWidth="2" />
              <ellipse cx="0" cy="-3" rx="24" ry="16" fill="#5e1f0a" />
              <ellipse cx="-6" cy="-7" rx="8" ry="3" fill="#fff" opacity="0.3" />
            </g>
          </g>
        </g>
      )}

      {/* Butter knife resting on the rim; it swipes across the slice when you cut */}
      <g transform="translate(518 392)">
        <g key={`knife-${knifeKey}`} className={knifeKey > 0 ? "knife-swipe" : ""}>
          <g transform="rotate(-28)" filter={`url(#${u("drop")})`}>
            <path d="M -9 0 L -9 -98 C -9 -118 9 -120 9 -100 L 9 0 Z" fill={`url(#${u("steel")})`} stroke="#8f8a82" strokeWidth="1" />
            <path d="M -5 -12 L -5 -96" stroke="#fff" strokeWidth="1.6" opacity="0.6" strokeLinecap="round" />
            <rect x="-11" y="-2" width="22" height="8" rx="3" fill="#b9b2a6" />
            <rect x="-10" y="5" width="20" height="92" rx="9" fill={`url(#${u("handle")})`} />
            <circle cx="0" cy="26" r="2.2" fill="#c9963c" />
            <circle cx="0" cy="56" r="2.2" fill="#c9963c" />
          </g>
        </g>
      </g>
    </svg>
  );
}
