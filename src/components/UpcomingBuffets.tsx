"use client";

import { useEffect, useState } from "react";
import { buffets, site } from "@/lib/site";

const fmt = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", timeZone: "America/Chicago" });

/** Buffet dates from site.ts that haven't passed yet (York time). Before mount, the list as built. */
function useUpcoming() {
  const [today, setToday] = useState<string | null>(null);
  useEffect(() => {
    const check = () => setToday(new Date().toLocaleDateString("en-CA", { timeZone: "America/Chicago" }));
    check();
    const t = window.setInterval(check, 60 * 60_000);
    return () => clearInterval(t);
  }, []);
  return buffets.filter((b) => !today || b.date >= today);
}

/** The full list for the "R" Buffets card. */
export default function UpcomingBuffets() {
  const list = useUpcoming();

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
    <ul className="mt-3 divide-y divide-brass/15 border-y border-brass/15">
      {list.map((b) => (
        <li key={b.date + b.label} className="grid grid-cols-[auto_1fr_auto] items-baseline gap-x-4 py-2.5 max-sm:grid-cols-[1fr_auto] max-sm:gap-y-0.5">
          <span className="label whitespace-nowrap text-[0.62rem] text-brass-bright max-sm:col-span-2">{fmt(b.date)}</span>
          <span className="text-cream">{b.label}</span>
          <span className="whitespace-nowrap text-sm tabular-nums text-tan">{b.time}</span>
        </li>
      ))}
    </ul>
  );
}

/** One line: the next buffet, or "call for the next one" when the list runs out. */
export function NextBuffet({ className = "" }: { className?: string }) {
  const next = useUpcoming()[0];
  if (!next)
    return (
      <span className={className}>
        Buffet dates rotate. Call <span className="whitespace-nowrap">{site.phone.display}</span> for the next one.
      </span>
    );
  return (
    <span className={className}>
      Next buffet: <span className="whitespace-nowrap font-semibold text-cream">{fmt(next.date)}</span>, {next.label} {next.time}. Reservations
      highly suggested.
    </span>
  );
}
