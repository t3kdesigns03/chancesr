"use client";

import { useEffect, useState } from "react";
import { openStatus, type OpenStatus as Status } from "@/lib/hours";
import { hours } from "@/lib/site";

/** Live "Open now" badge (York time). Renders nothing until mounted so the static HTML never lies. */
export function OpenBadge({ className = "" }: { className?: string }) {
  const s = useStatus();
  if (!s) return <span className={`inline-block h-7 ${className}`} />;
  return (
    <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm font-semibold ${s.open ? "border-go/40 text-go" : "border-tan/30 text-tan"} ${className}`}>
      <span className={`h-2 w-2 rounded-full ${s.open ? "pulse-dot bg-go" : "bg-tan/60"}`} />
      {s.text}
    </span>
  );
}

/** The hours table, with today's row lit. */
export function HoursTable() {
  const s = useStatus();
  return (
    <dl className="divide-y divide-white/[0.06]">
      {hours.map((h) => {
        const today = s ? h.days.includes(s.today) : false;
        return (
          <div key={h.label} className={`flex items-baseline justify-between gap-4 py-2.5 ${today ? "text-cream" : "text-linen"}`}>
            <dt className="flex items-center gap-2">
              {h.label}
              {today && <span className="label rounded-full bg-brass/20 px-2 py-0.5 text-[0.55rem] text-brass-bright">Today</span>}
            </dt>
            <dd className={`tabular-nums ${today ? "font-semibold" : ""}`}>
              {h.time}
              {h.note && <span className="ml-1.5 text-brass">· {h.note}</span>}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}

function useStatus() {
  const [s, setS] = useState<Status | null>(null);
  useEffect(() => {
    const tick = () => setS(openStatus());
    tick();
    const t = window.setInterval(tick, 60_000);
    return () => clearInterval(t);
  }, []);
  return s;
}
