"use client";

import { useEffect, useState } from "react";
import { buffets, site } from "@/lib/site";

const fmt = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });

/** The next few buffet dates from site.ts, hiding any that have passed (York time). */
export default function UpcomingBuffets() {
  const [today, setToday] = useState<string | null>(null);
  useEffect(() => {
    const check = () => setToday(new Date().toLocaleDateString("en-CA", { timeZone: "America/Chicago" }));
    check();
    const t = window.setInterval(check, 60 * 60_000);
    return () => clearInterval(t);
  }, []);
  // Before mount (static HTML) show the list as built; after, drop past dates.
  const list = buffets.filter((b) => !today || b.date >= today);

  if (!list.length)
    return (
      <p className="mt-3 text-linen">
        Dates rotate.{" "}
        <a href={site.phone.href} className="font-semibold text-brass-bright underline decoration-brass/40 underline-offset-4">
          Call {site.phone.display} for the next one.
        </a>
      </p>
    );

  return (
    <ul className="mt-4 divide-y divide-brass/15 border-y border-brass/15">
      {list.map((b) => (
        <li key={b.date + b.label} className="flex items-baseline justify-between gap-4 py-2.5">
          <span>
            <span className="label mr-3 inline-block w-[5.5rem] text-[0.62rem] text-brass-bright">{fmt(b.date)}</span>
            <span className="text-cream">{b.label}</span>
          </span>
          <span className="shrink-0 text-sm tabular-nums text-tan">{b.time}</span>
        </li>
      ))}
    </ul>
  );
}
