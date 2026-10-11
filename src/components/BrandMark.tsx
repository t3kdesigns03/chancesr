import { useId } from "react";

/**
 * The round brass badge: a quoted "R" over 1932, like the stamp on a supper-club matchbook.
 * Static versions (favicon, share card) are outlined from the same layout in scripts/build-brand.mts.
 */
export function BrandMark({ className = "" }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
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
      <text
        x="32.5"
        y="40"
        textAnchor="middle"
        fontFamily="var(--font-fraunces), Georgia, serif"
        fontStyle="italic"
        fontWeight="600"
        fontSize="30"
        fill={`url(#${id}-b)`}
      >
        R
      </text>
      <text x="17.5" y="27" textAnchor="middle" fontFamily="var(--font-fraunces), Georgia, serif" fontWeight="600" fontSize="14" fill="#c9963c">
        &ldquo;
      </text>
      <text x="47" y="27" textAnchor="middle" fontFamily="var(--font-fraunces), Georgia, serif" fontWeight="600" fontSize="14" fill="#c9963c">
        &rdquo;
      </text>
      <text
        x="32"
        y="51.5"
        textAnchor="middle"
        fontFamily="var(--font-hanken), sans-serif"
        fontWeight="700"
        fontSize="5.4"
        letterSpacing="1.6"
        fill="#e8dbc2"
        fillOpacity="0.8"
      >
        1932
      </text>
    </svg>
  );
}

/** Mark + wordmark. `compact` keeps it to one line for the phone header. */
export function BrandLockup({ className = "", compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span className={`flex min-w-0 items-center gap-2.5 ${className}`}>
      <BrandMark className={compact ? "h-10 w-10 shrink-0" : "h-12 w-12 shrink-0"} />
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
