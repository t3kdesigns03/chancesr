import type { CSSProperties, ReactNode } from "react";
import { site } from "@/lib/site";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

/** Numbered narrative label: brass numeral, a hairline, then the letterspaced kicker. */
export function SectionLabel({ n, children, className = "" }: { n: string; children: ReactNode; className?: string }) {
  return (
    <p data-reveal="" className={`mb-5 flex items-center gap-3 text-brass max-sm:mb-3 ${className}`}>
      <span className="display text-3xl italic text-brass-bright max-sm:text-2xl">{n}</span>
      <span aria-hidden="true" className="h-px w-10 shrink-0 bg-gradient-to-r from-brass to-brass/0 sm:w-16" />
      <span className="label">{children}</span>
    </p>
  );
}

export function SectionTitle({ id, children, className = "" }: { id?: string; children: ReactNode; className?: string }) {
  return (
    <h2 id={id} data-reveal="" className={`display text-[2.4rem] text-cream sm:text-6xl lg:text-7xl ${className}`}>
      {children}
    </h2>
  );
}

/** "Call (402) 362-7755 for a table." The CTA sounds like a person talking. */
export function CallButton({
  className = "",
  size = "md",
  children,
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
  children?: ReactNode;
}) {
  const sz =
    size === "lg"
      ? "min-h-14 px-6 text-lg gap-3 max-sm:min-h-13 max-sm:px-4 max-sm:text-base"
      : size === "sm"
        ? "min-h-10 px-3.5 text-sm gap-2"
        : "min-h-12 px-5 text-base gap-2.5";
  return (
    <a
      href={site.phone.href}
      className={`brass deco-clip tap inline-flex items-center justify-center font-semibold ${sz} ${className}`}
    >
      <PhoneIcon className={size === "sm" ? "h-4 w-4" : "h-5 w-5"} />
      {children ?? (
        <span>
          Call <span className="whitespace-nowrap tabular-nums">{site.phone.display}</span> for a table
        </span>
      )}
    </a>
  );
}

export function PhoneIcon({ className = "", style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" className={className} style={style} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
    </svg>
  );
}

export function PinIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22s7-6.1 7-12a7 7 0 1 0-14 0c0 5.9 7 12 7 12z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export function MailIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2.5" y="4.5" width="19" height="15" rx="2" />
      <path d="m3 6 9 7 9-7" />
    </svg>
  );
}

const STAR = "M10 1.5l2.6 5.5 6 .7-4.5 4.1 1.2 6L10 14.8 4.7 17.8l1.2-6L1.4 7.7l6-.7z";

/** Five stars, the last one partly filled. A clipped inner <svg> does the partial fill, so there are no gradient IDs to collide. */
export function Stars({ score = 4.3, className = "" }: { score?: number; className?: string }) {
  return (
    <span className={`inline-flex gap-0.5 ${className}`} aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => {
        const w = Math.max(0, Math.min(1, score - i)) * 20;
        return (
          <svg key={i} viewBox="0 0 20 20" className="h-[1em] w-[1em]">
            <path d={STAR} fill="currentColor" opacity="0.25" />
            <svg width={w} height="20" viewBox={`0 0 ${w} 20`} overflow="hidden">
              <path d={STAR} fill="currentColor" />
            </svg>
          </svg>
        );
      })}
    </span>
  );
}
