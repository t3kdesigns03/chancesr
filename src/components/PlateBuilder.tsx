"use client";

import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";
import { cuts, doneness, MAX_LADLES, quotes, sides, site, type CutId, type SideId } from "@/lib/site";
import PlateArt, { Steam } from "./PlateArt";
import { CallButton, Stars } from "./ui";

const buzz = (ms = 10) => {
  if (typeof navigator !== "undefined") navigator.vibrate?.(ms);
};

const LADLE_LINES = ["Dry plate. Your call.", "One ladle. Just right.", "Two. Now we're talking.", "Three. Swimming in it."];

/**
 * Hero + "Build Your Plate", the centerpiece. Desktop sets the plate on the table between two
 * menu cards (01–02 left, 03–04 right) so the whole thing sits above the fold. Phones get the
 * plate first, then one step at a time behind numbered tabs, to keep scrolling short.
 */
export default function PlateBuilder() {
  const [cut, setCut] = useState<CutId>("house");
  const [done, setDone] = useState(1);
  const [picked, setPicked] = useState<Set<SideId>>(() => new Set<SideId>(["mash"]));
  const [ladles, setLadles] = useState(1);
  const [isCut, setIsCut] = useState(false);
  const [pourKey, setPourKey] = useState(0);
  const [knifeKey, setKnifeKey] = useState(0);
  const [tab, setTab] = useState(0);
  const timers = useRef<number[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const c = cuts.find((x) => x.id === cut)!;
  const d = doneness[done];

  function toggleSide(id: SideId) {
    buzz();
    setPicked((s) => {
      const n = new Set(s);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });
  }

  function ladle() {
    if (ladles >= MAX_LADLES) return;
    buzz(16);
    setPourKey((k) => k + 1);
    setLadles((l) => l + 1);
  }

  function butterKnife() {
    if (isCut) {
      buzz();
      setIsCut(false);
      return;
    }
    buzz(24);
    setKnifeKey((k) => k + 1);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    timers.current.push(window.setTimeout(() => setIsCut(true), reduce ? 0 : 420));
  }

  // Swipe sideways across the slice to cut it. pan-y keeps vertical page scrolling free on phones.
  const swipe = useRef<{ x: number; y: number } | null>(null);
  function onDown(e: PointerEvent) {
    swipe.current = { x: e.clientX, y: e.clientY };
  }
  function onMove(e: PointerEvent) {
    const s = swipe.current;
    if (!s || isCut) return;
    if (Math.abs(e.clientX - s.x) > 42 && Math.abs(e.clientY - s.y) < 60) {
      swipe.current = null;
      butterKnife();
    }
  }

  const ticketSides = sides.filter((s) => picked.has(s.id)).map((s) => s.ticket);
  const jusLine = ladles === 0 ? "no jus" : ladles === 1 ? "au jus" : `au jus ×${ladles}`;

  const steps: { n: string; title: string; tab: string; body: ReactNode }[] = [
    {
      n: "01",
      title: "The cut",
      tab: "Cut",
      body: (
        <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-label="Cut size">
          {cuts.map((x) => {
            const on = x.id === cut;
            return (
              <button
                key={x.id}
                role="radio"
                aria-checked={on}
                onClick={() => {
                  buzz();
                  setCut(x.id);
                }}
                className={`tap rounded-xl border px-2 py-2.5 text-center transition-colors ${
                  on ? "border-brass bg-brass/15 text-cream" : "border-white/10 text-tan hover:border-brass/50 hover:text-cream"
                }`}
              >
                <span className="display block text-xl">{x.name}</span>
                <span className="label mt-1 block text-[0.6rem] text-brass-bright">{x.oz} oz</span>
              </button>
            );
          })}
          <p key={c.id} className="panel-in col-span-3 mt-1 text-sm text-tan">
            {c.line}
          </p>
        </div>
      ),
    },
    {
      n: "02",
      title: "Doneness",
      tab: "Cook",
      body: (
        <div>
          <input
            type="range"
            min={0}
            max={doneness.length - 1}
            step={1}
            value={done}
            onChange={(e) => {
              buzz(6);
              setDone(Number(e.target.value));
            }}
            className="doneness-range"
            aria-label="Doneness"
            aria-valuetext={d.name}
          />
          <div className="-mt-1 flex justify-between text-[0.68rem] font-semibold uppercase tracking-wider text-tan">
            {doneness.map((x, i) => (
              <button
                key={x.id}
                onClick={() => setDone(i)}
                className={`transition-colors ${i === done ? "text-brass-bright" : "hover:text-cream"}`}
                tabIndex={-1}
              >
                {x.short}
              </button>
            ))}
          </div>
          <p key={d.id} className="panel-in mt-3 text-sm text-tan">
            <span className="font-semibold text-cream">{d.name}.</span> {d.line}
          </p>
        </div>
      ),
    },
    {
      n: "03",
      title: "Sides",
      tab: "Sides",
      body: (
        <div className="flex flex-col gap-2">
          {sides.map((s) => {
            const on = picked.has(s.id);
            return (
              <button
                key={s.id}
                aria-pressed={on}
                onClick={() => toggleSide(s.id)}
                className={`tap flex items-center gap-3 rounded-xl border px-3 py-2.5 text-left transition-colors ${
                  on ? "border-brass bg-brass/15" : "border-white/10 hover:border-brass/50"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border text-[0.7rem] font-bold transition-colors ${
                    on ? "border-brass bg-brass text-walnut-950" : "border-tan/50 text-transparent"
                  }`}
                >
                  ✓
                </span>
                <span className="min-w-0">
                  <span className={`block font-semibold leading-tight ${on ? "text-cream" : "text-linen"}`}>{s.name}</span>
                  <span className="block text-xs text-tan">{s.line}</span>
                </span>
              </button>
            );
          })}
        </div>
      ),
    },
    {
      n: "04",
      title: "Au jus",
      tab: "Jus",
      body: (
        <div>
          <div className="flex items-center gap-2">
            <button
              onClick={ladle}
              disabled={ladles >= MAX_LADLES}
              className="brass tap inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-full px-4 font-semibold disabled:opacity-40"
            >
              <LadleIcon className="h-5 w-5" />
              {ladles >= MAX_LADLES ? "That's plenty" : "Ladle it on"}
            </button>
            <button
              onClick={() => {
                buzz();
                setLadles(0);
              }}
              disabled={ladles === 0}
              className="tap min-h-11 rounded-full border border-white/15 px-4 text-sm font-semibold text-tan hover:border-brass/50 hover:text-cream disabled:opacity-40"
            >
              None
            </button>
          </div>
          <div className="mt-3 flex items-center gap-3">
            <span className="flex gap-1.5" aria-hidden="true">
              {Array.from({ length: MAX_LADLES }).map((_, i) => (
                <span
                  key={i}
                  className={`h-2.5 w-2.5 rounded-full transition-colors duration-500 ${i < ladles ? "bg-[#8a3d16] ring-1 ring-brass/60" : "bg-white/10"}`}
                />
              ))}
            </span>
            <p key={ladles} className="panel-in text-sm text-tan" aria-live="polite">
              {LADLE_LINES[ladles]}
            </p>
          </div>
        </div>
      ),
    },
  ];

  const knife = (
    <div className="card rounded-2xl p-4 max-lg:hidden">
      <button
        onClick={butterKnife}
        className="tap flex w-full items-center justify-center gap-2 rounded-full border border-brass/60 px-4 py-2.5 font-semibold text-brass-bright hover:bg-brass/10"
      >
        <KnifeIcon className="h-5 w-5" />
        {isCut ? "Put it back together" : "Cut it with a butter knife"}
      </button>
      <p className="mt-2 text-center text-xs text-tan">…or drag across the slice.</p>
    </div>
  );

  const ticket = (
    <GuestCheck>
      <li key={`c-${cut}`} className="ticket-line">
        1 · Prime rib, {c.name.toLowerCase()} {c.oz} oz
      </li>
      <li key={`d-${done}`} className="ticket-line pl-6">
        {d.name.toLowerCase()}
      </li>
      <li key={`s-${ticketSides.join()}`} className="ticket-line pl-6">
        {ticketSides.length ? `w/ ${ticketSides.join(", ")}` : "no sides. bold."}
      </li>
      <li key={`j-${ladles}`} className="ticket-line pl-6">
        {jusLine}
      </li>
    </GuestCheck>
  );

  return (
    <section id="top" className="tabletop grain relative overflow-hidden pb-12 pt-8 max-lg:pb-8 max-sm:pt-5 lg:pt-6" aria-labelledby="hero-title">
      {/* Lamp glow from above */}
      <div aria-hidden="true" className="flicker pointer-events-none absolute left-1/2 top-[-18rem] h-[36rem] w-[60rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(232_187_99/0.18),transparent)]" />

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Headline */}
        <div className="text-center">
          <p className="label text-brass max-sm:text-[0.6rem]">
            Since {site.founded} <span className="text-brass/50">·</span> Downtown York, Nebraska
          </p>
          <h1 id="hero-title" className="display mx-auto mt-3 max-w-4xl text-[2.6rem] text-cream sm:text-6xl lg:max-w-6xl lg:text-[4.6rem]">
            Supper, the way <em className="brass-text pr-1">York remembers&nbsp;it.</em>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-linen max-sm:mt-3 max-sm:text-base lg:mt-3 lg:max-w-none">
            Prime rib you can cut with a butter knife.<span className="max-sm:hidden"> Bryan carves, Renee bakes. Build a plate, then come eat it.</span>
          </p>
          <p className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm text-tan max-sm:hidden">
            <span className="inline-flex items-center gap-1.5">
              <Stars score={4.3} className="text-brass-bright" />
              {site.rating.google.score} from {site.rating.google.count} Google reviews
            </span>
            <span className="max-sm:hidden" aria-hidden="true">
              ·
            </span>
            <span>
              #{site.rating.tripadvisor.rank} of {site.rating.tripadvisor.of} in York on TripAdvisor
            </span>
          </p>
        </div>

        {/* Builder */}
        <div id="plate" className="mt-8 lg:mt-5 grid items-center gap-6 max-sm:mt-5 lg:grid-cols-[minmax(0,19rem)_minmax(0,1fr)_minmax(0,19rem)] xl:gap-10">
          <h2 className="sr-only">Build your plate</h2>

          {/* Left menu card: 01, 02, knife (desktop) */}
          <div className="flex flex-col gap-4 max-lg:hidden">
            <p className="label text-center text-brass">Build your plate</p>
            {steps.slice(0, 2).map((s) => (
              <Step key={s.n} n={s.n} title={s.title}>
                {s.body}
              </Step>
            ))}
            {knife}
          </div>

          {/* The plate */}
          <div className="relative mx-auto w-full max-w-[34rem] max-lg:max-w-[28rem]">
            <PlateArt
              scale={c.scale}
              center={d.center}
              band={d.band}
              size={d.size}
              juicy={0.24 - done * 0.045}
              sides={picked}
              ladles={ladles}
              isCut={isCut}
              pourKey={pourKey}
              knifeKey={knifeKey}
            />
            <Steam />
            {/* Swipe zone over the slice */}
            <div
              aria-hidden="true"
              onPointerDown={onDown}
              onPointerMove={onMove}
              onPointerUp={() => (swipe.current = null)}
              onPointerCancel={() => (swipe.current = null)}
              className="absolute left-[24%] top-[33%] h-[34%] w-[40%] cursor-ew-resize rounded-full"
              style={{ touchAction: "pan-y" }}
            />
            {/* The butter-knife line, woven into the cut */}
            <div className="pointer-events-none absolute inset-x-0 bottom-[-0.5rem] flex justify-center max-sm:bottom-[-1rem]">
              {isCut ? (
                <figure key="q" className="panel-in max-w-sm rounded-2xl border border-brass/30 bg-walnut-950/85 px-4 py-2.5 text-center backdrop-blur-sm">
                  <blockquote className="display text-lg italic leading-snug text-cream max-sm:text-base">
                    &ldquo;{quotes.butterKnife}&rdquo;
                  </blockquote>
                  <figcaption className="label mt-1 text-[0.55rem] text-brass">Google review</figcaption>
                </figure>
              ) : (
                <p key="h" className="panel-in label rounded-full bg-walnut-950/70 px-3 py-1.5 text-[0.6rem] text-brass-bright backdrop-blur-sm">
                  Swipe across the slice<span className="max-sm:hidden">. Butter knife only</span>.
                </p>
              )}
            </div>
          </div>

          {/* Right menu card: 03, 04, guest check (desktop) */}
          <div className="flex flex-col gap-4 max-lg:hidden">
            {steps.slice(2).map((s) => (
              <Step key={s.n} n={s.n} title={s.title}>
                {s.body}
              </Step>
            ))}
            {ticket}
          </div>

          {/* Phones & tablets: one step at a time */}
          <div className="mx-auto w-full max-w-xl lg:hidden">
            <div className="flex items-center gap-2">
              <div role="tablist" aria-label="Build your plate" className="grid flex-1 grid-cols-4 gap-1 rounded-full border border-white/10 bg-walnut-950/60 p-1">
                {steps.map((s, i) => (
                  <button
                    key={s.n}
                    role="tab"
                    aria-selected={tab === i}
                    aria-controls={`step-${s.n}`}
                    onClick={() => {
                      buzz(6);
                      setTab(i);
                    }}
                    className={`tap rounded-full py-2 text-center text-[0.78rem] font-semibold leading-none transition-colors ${
                      tab === i ? "brass" : "text-tan"
                    }`}
                  >
                    <span className="display italic max-[360px]:hidden">{s.n}</span> {s.tab}
                  </button>
                ))}
              </div>
              <button
                onClick={butterKnife}
                aria-label={isCut ? "Put the slice back together" : "Cut it with a butter knife"}
                className={`tap grid h-10 w-10 shrink-0 place-items-center rounded-full border border-brass/60 text-brass-bright ${isCut ? "bg-brass/20" : ""}`}
              >
                <KnifeIcon className="h-5 w-5" />
              </button>
            </div>
            <div id={`step-${steps[tab].n}`} role="tabpanel" key={tab} className="panel-in card mt-3 min-h-[9.5rem] rounded-2xl p-4">
              <p className="label mb-3 text-brass">
                {steps[tab].n} · {steps[tab].title}
              </p>
              {steps[tab].body}
            </div>
            <p className="mt-3 truncate text-center font-hand text-xl text-linen">
              {c.name} {c.oz} oz · {d.short.toLowerCase()} · {ticketSides.length ? ticketSides.join(", ") : "no sides"} · {jusLine}
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center gap-2 text-center max-lg:mt-4">
          <CallButton size="lg" />
          <p className="text-sm text-tan">
            Prime rib buffet weekends &amp; Sunday brunch rotate. Ask for the next one when you call.
          </p>
        </div>
      </div>
    </section>
  );
}

function Step({ n, title, children }: { n: string; title: string; children: ReactNode }) {
  return (
    <div className="card rounded-2xl p-4">
      <p className="mb-3 flex items-baseline gap-2">
        <span className="display text-xl italic text-brass-bright">{n}</span>
        <span className="label text-linen">{title}</span>
      </p>
      {children}
    </div>
  );
}

/** Green-ruled guest check with the order in the server's handwriting. */
function GuestCheck({ children }: { children: ReactNode }) {
  return (
    <div className="relative rotate-[1.2deg] rounded-sm bg-[#f3ead3] px-4 pb-4 pt-3 text-[#2b2117] shadow-[0_18px_40px_-12px_rgb(0_0_0/0.7)]">
      <div className="flex items-baseline justify-between border-b-2 border-[#3f6b4c] pb-1">
        <span className="label text-[0.6rem] text-[#3f6b4c]">Guest check</span>
        <span className="label text-[0.55rem] text-[#3f6b4c]/70">No. 1932</span>
      </div>
      <ul
        aria-live="polite"
        className="mt-1 font-hand text-[1.35rem] leading-[1.6rem] [background:repeating-linear-gradient(transparent_0,transparent_calc(1.6rem-1px),rgb(63_107_76/0.28)_calc(1.6rem-1px),rgb(63_107_76/0.28)_1.6rem)]"
      >
        {children}
      </ul>
      <p className="mt-2 border-t border-dashed border-[#3f6b4c]/40 pt-2 text-center font-hand text-lg text-[#7d2324]">
        Thank you! Call {site.phone.display}
      </p>
    </div>
  );
}

function LadleIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 3 11.5 12" />
      <path d="M3.5 12.5h11a5.5 5.5 0 0 1-11 0z" />
    </svg>
  );
}

export function KnifeIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 20 13.5 10.5" />
      <path d="M13.5 10.5 19 5c1.5-1.5 2.5.5 1.5 2L15 13z" />
    </svg>
  );
}
