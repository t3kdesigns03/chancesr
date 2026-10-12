import { useId } from "react";

/** Badge artwork in a 64×64 box: a quoted "R" over 1932, like a supper-club matchbook stamp. */
function BadgeArt({ id }: { id: string }) {
  return (
    <>
      <defs>
        <linearGradient id={`${id}-b`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f3cd80" />
          <stop offset="0.55" stopColor="#c9963c" />
          <stop offset="1" stopColor="#8a6424" />
        </linearGradient>
        <radialGradient id={`${id}-f`} cx="0.5" cy="0.35" r="0.7">
          <stop offset="0" stopColor="#2a1d11" />
          <stop offset="1" stopColor="#0d0805" />
        </radialGradient>
      </defs>
      <circle cx="32" cy="32" r="30.5" fill={`url(#${id}-f)`} stroke={`url(#${id}-b)`} strokeWidth="2.2" />
      <circle cx="32" cy="32" r="26.4" fill="none" stroke="#c9963c" strokeOpacity="0.45" strokeWidth="0.7" />
      <text x="32.5" y="40" textAnchor="middle" fontFamily="var(--font-fraunces), Georgia, serif" fontStyle="italic" fontWeight="600" fontSize="30" fill={`url(#${id}-b)`}>
        R
      </text>
      <text x="17.5" y="27" textAnchor="middle" fontFamily="var(--font-fraunces), Georgia, serif" fontWeight="600" fontSize="14" fill="#c9963c">
        &ldquo;
      </text>
      <text x="47" y="27" textAnchor="middle" fontFamily="var(--font-fraunces), Georgia, serif" fontWeight="600" fontSize="14" fill="#c9963c">
        &rdquo;
      </text>
      <text x="32" y="51.5" textAnchor="middle" fontFamily="var(--font-hanken), sans-serif" fontWeight="700" fontSize="5.4" letterSpacing="1.6" fill="#e8dbc2" fillOpacity="0.8">
        1932
      </text>
    </>
  );
}

/** The round brass badge. Static versions (favicon, share card) are outlined in scripts/build-brand.mts. */
export function BrandMark({ className = "" }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <BadgeArt id={id} />
    </svg>
  );
}

/** The badge set in an art-deco crest: a fan of brass rays above, stepped tiers below. */
export function DecoCrest({ className = "" }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  // Rays fan out on both sides; the gap at the top is where the crown sits.
  const rays = Array.from({ length: 13 }, (_, i) => i).filter((i) => i < 5 || i > 7).map((i) => {
    const a = ((200 + i * (140 / 12)) * Math.PI) / 180;
    return { x1: 60 + Math.cos(a) * 33, y1: 46 + Math.sin(a) * 33, x2: 60 + Math.cos(a) * (i % 2 ? 41 : 46), y2: 46 + Math.sin(a) * (i % 2 ? 41 : 46) };
  });
  return (
    <svg viewBox="0 0 120 92" className={className} aria-hidden="true">
      <g stroke="#c9963c" strokeLinecap="round">
        {rays.map((r, i) => (
          <line key={i} x1={r.x1.toFixed(1)} y1={r.y1.toFixed(1)} x2={r.x2.toFixed(1)} y2={r.y2.toFixed(1)} strokeWidth={i % 2 ? 0.9 : 1.4} strokeOpacity={i % 2 ? 0.55 : 0.9} />
        ))}
        <path d="M 22 82 H 98 M 30 87 H 90 M 38 91.2 H 82" strokeWidth="1.2" strokeOpacity="0.8" />
        <path d="M 14 77 L 26 77 L 32 70 M 106 77 L 94 77 L 88 70" fill="none" strokeWidth="1.1" strokeOpacity="0.7" />
      </g>
      {/* the crown from the hanging sign out front */}
      <path d="M 50.5 15 L 49 5.5 L 54.5 9.5 L 60 2.5 L 65.5 9.5 L 71 5.5 L 69.5 15 Z" fill="#e8bb63" stroke="#8a6424" strokeWidth="0.6" strokeLinejoin="round" />
      <circle cx="49" cy="5" r="1.3" fill="#f3cd80" />
      <circle cx="60" cy="2" r="1.4" fill="#f3cd80" />
      <circle cx="71" cy="5" r="1.3" fill="#f3cd80" />
      <svg x="31" y="17" width="58" height="58" viewBox="0 0 64 64">
        <BadgeArt id={id} />
      </svg>
    </svg>
  );
}

/** Mark + wordmark. `compact` keeps it to one line for the phone header; `crest` uses the deco crest. */
export function BrandLockup({ className = "", compact = false, crest = false }: { className?: string; compact?: boolean; crest?: boolean }) {
  return (
    <span className={`flex min-w-0 items-center gap-2.5 ${className}`}>
      {crest ? (
        <DecoCrest className="-my-1 h-[3.9rem] w-auto shrink-0" />
      ) : (
        <BrandMark className={compact ? "h-10 w-10 shrink-0" : "h-12 w-12 shrink-0"} />
      )}
      <span className="min-w-0 leading-none">
        <span className={`display block whitespace-nowrap text-cream ${compact ? "text-[1.35rem]" : "text-[1.6rem]"}`}>
          Chances <span className="italic text-brass-bright">&ldquo;R&rdquo;</span>
        </span>
        <span className={`label mt-1 block truncate text-tan ${compact ? "text-[0.52rem] tracking-[0.2em]" : "text-[0.58rem]"}`}>
          Restaurant &amp; Lounge{compact ? "" : " · York"}
        </span>
      </span>
    </span>
  );
}
