"use client";

import { useEffect, useState } from "react";
import { breakfast, dinner, lounge, menuNotes, type MenuItem, type MenuSection, type MenuTab } from "@/lib/menu";
import MenuArt from "./MenuArt";

const TABS: MenuTab[] = [dinner, breakfast, lounge];

/**
 * The printed menu, on screen: cream paper, red frame, ornate red headings, brown ink, dotted leaders.
 * Three tabs (Lunch & Dinner, Breakfast, Hob-Nob Lounge); every tab's content is in the HTML, so search engines
 * and the no-JS view still get the whole menu. #breakfast / #lounge in the address opens that tab.
 */
export default function MenuBoard() {
  const [tab, setTab] = useState(dinner.id);

  useEffect(() => {
    const fromHash = () => {
      const h = location.hash.slice(1);
      const owner = TABS.find((t) => t.id === h || t.sections.some((s) => s.id === h));
      if (owner) setTab(owner.id);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, []);

  function pick(id: string) {
    setTab(id);
    history.replaceState(null, "", `#${id}`);
    document.getElementById("menu-paper")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const current = TABS.find((t) => t.id === tab)!;

  return (
    <div>
      {/* Tabs + section chips. Sticky under the header so long menus stay navigable on phones. */}
      <div className="sticky top-[6.3rem] z-30 -mx-4 border-y border-brass/15 bg-walnut-950/95 px-4 py-2 sm:-mx-6 sm:px-6 lg:top-[4.75rem] lg:mx-0 lg:rounded-2xl lg:border-x">
        <div role="tablist" aria-label="Menus" className="flex gap-2">
          {TABS.map((t) => (
            <button
              key={t.id}
              role="tab"
              id={`tab-${t.id}`}
              aria-selected={tab === t.id}
              aria-controls={`panel-${t.id}`}
              onClick={() => pick(t.id)}
              className={`deco-clip tap min-h-10 flex-1 px-3 text-sm font-semibold sm:flex-none sm:px-5 ${
                tab === t.id ? "brass" : "bg-white/[0.04] text-linen hover:text-cream"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <nav aria-label={`${current.label} sections`} className="swipe -mx-1 mt-2 flex gap-1 overflow-x-auto px-1">
          {current.sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="shrink-0 rounded-full px-3 py-1.5 text-[0.78rem] font-semibold text-tan hover:bg-white/5 hover:text-cream"
            >
              {s.title.replace(/[“”]/g, '"')}
            </a>
          ))}
        </nav>
      </div>

      <div id="menu-paper" className="scroll-mt-44 lg:scroll-mt-40">
        {TABS.map((t) => (
          <section
            key={t.id}
            id={`panel-${t.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${t.id}`}
            hidden={t.id !== tab}
            className="mt-6"
          >
            <Paper tab={t} />
          </section>
        ))}
      </div>
    </div>
  );
}

function Paper({ tab }: { tab: MenuTab }) {
  return (
    <div className="relative overflow-hidden rounded-[1.4rem] bg-paper text-ink shadow-[0_40px_80px_-30px_rgb(0_0_0/0.9)]">
      {/* red frame, like the printed menu's border */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[1.4rem] border-[10px] border-red max-sm:border-[6px]" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-[18px] rounded-xl border border-red/40 max-sm:inset-[11px]" />
      <Flourish className="absolute left-3 top-3 h-20 w-20 max-sm:h-12 max-sm:w-12" />
      <Flourish className="absolute right-3 top-3 h-20 w-20 -scale-x-100 max-sm:h-12 max-sm:w-12" />

      <div className="relative px-12 pb-12 pt-10 max-lg:px-8 max-sm:px-5 max-sm:pb-8 max-sm:pt-8">
        <header className="text-center">
          <p className="font-blackletter text-6xl leading-none text-red max-sm:text-[2.6rem]">
            Chances &ldquo;R&rdquo;
          </p>
          <p className="mt-1 font-script text-3xl text-red max-sm:text-2xl">
            {tab.id === "breakfast" ? "Breakfast" : tab.id === "lounge" ? "Hob Nob Lounge" : "Restaurant and Hob Nob Lounge"}
          </p>
          {tab.intro && <p className="mx-auto mt-4 max-w-2xl text-balance text-[0.95rem] italic leading-relaxed text-ink/85 max-sm:text-sm">{tab.intro}</p>}
        </header>

        {/* Two balanced columns on desktop. On phones the column wrappers dissolve (display: contents)
            and each section's `order` puts them back in printed order. */}
        <div className="mt-10 flex flex-col max-sm:mt-7 lg:grid lg:grid-cols-2 lg:gap-x-12">
          {balance(tab.sections).map((col, ci) => (
            <div key={ci} className="contents lg:block">
              {col.map(({ s, i }) => (
                <Section key={s.id} section={s} order={i} />
              ))}
            </div>
          ))}
        </div>

        {tab.id !== "lounge" && (
          <div className="mt-6 space-y-2 border-t border-red/30 pt-5 text-center text-[0.8rem] text-ink/75">
            {tab.id === "dinner" && (
              <p className="mx-auto inline-block rounded border border-red/50 px-3 py-1.5 font-semibold text-ink">{menuNotes.healthyHeart}</p>
            )}
            <p>
              <span className="text-red">*</span> {menuNotes.advisory}
            </p>
            {tab.id === "dinner" && <p className="font-semibold">{menuNotes.gratuity}</p>}
          </div>
        )}
      </div>
    </div>
  );
}

/** Rough rendered height of a section, for splitting the menu into two even columns. */
function estimate(s: MenuSection) {
  const lines = (t = "", per = 58) => Math.ceil(t.length / per);
  let h = 70 + (s.boxed ? 40 : 0) + lines(s.note) * 20 + lines(s.footer) * 18;
  for (const it of s.items) h += (s.columns ? 34 : 30) + lines(it.desc) * 18 + (s.columns ? 0 : (it.prices?.length ?? 0) * 20);
  return h;
}

/** Greedy split into two columns, keeping printed order within each column. */
function balance(sections: MenuSection[]) {
  const cols: { s: MenuSection; i: number }[][] = [[], []];
  const total = sections.reduce((a, s) => a + estimate(s), 0);
  let left = 0;
  sections.forEach((s, i) => {
    const h = estimate(s);
    // Fill the left column in order until it holds about half the menu, then the rest go right.
    if (cols[1].length === 0 && left + h / 2 <= total / 2) {
      cols[0].push({ s, i });
      left += h;
    } else cols[1].push({ s, i });
  });
  return cols;
}

function Section({ section: s, order }: { section: MenuSection; order: number }) {
  return (
    <section
      style={{ order }}
      id={s.id}
      aria-labelledby={`${s.id}-h`}
      className={`mb-9 scroll-mt-48 break-inside-avoid max-sm:mb-7 lg:scroll-mt-44 ${
        s.boxed ? "rounded-lg border border-red/35 bg-paper-box p-5 max-sm:p-4" : ""
      }`}
    >
      {/* The printed menu sets a little drawing just after the heading */}
      <div className="flex items-center gap-3">
        <h2
          id={`${s.id}-h`}
          className="font-tuscan text-[1.75rem] uppercase leading-[1.05] tracking-wide text-red [text-shadow:2px_2px_0_rgb(165_28_48/0.18)] max-sm:text-[1.45rem]"
        >
          {s.title}
        </h2>
        {s.art && <MenuArt name={s.art} className="h-14 w-auto max-w-20 shrink-0 object-contain max-sm:h-11 max-sm:max-w-16" />}
      </div>
      {s.note && <p className="mt-2 text-[0.85rem] italic leading-snug text-ink/80">{s.note}</p>}

      {s.columns ? <WineTable section={s} /> : (
        <ul className="mt-4 space-y-3">
          {s.items.map((it, i) => (
            <Item key={it.name + i} item={it} />
          ))}
        </ul>
      )}
      {s.footer && <p className="mt-3 text-[0.8rem] italic text-ink/75">{s.footer}</p>}
    </section>
  );
}

function Leader({ label, price, bold = true }: { label: React.ReactNode; price?: string; bold?: boolean }) {
  return (
    <div className="flex items-baseline gap-2">
      <span className={bold ? "font-bold" : ""}>{label}</span>
      {price !== undefined && (
        <>
          <span aria-hidden="true" className="min-w-4 flex-1 translate-y-[-3px] border-b-2 border-dotted border-ink/30" />
          <span className={`shrink-0 font-bold tabular-nums ${price === "Market Price" ? "text-[0.8rem] uppercase tracking-wide text-red" : ""}`}>
            {price}
          </span>
        </>
      )}
    </div>
  );
}

function Item({ item: it }: { item: MenuItem }) {
  return (
    <li className="text-[0.95rem] leading-snug">
      <Leader
        label={
          <>
            {it.star && (
              <span className="mr-0.5 text-red" aria-label="see consumer advisory">
                *
              </span>
            )}
            {it.name}
          </>
        }
        price={it.price}
      />
      {it.desc && <p className="mt-0.5 text-[0.85rem] text-ink/80">{it.desc}</p>}
      {it.prices && (
        <div className="mt-1 space-y-0.5 pl-4 text-[0.88rem]">
          {it.prices.map((p) => (
            <Leader key={p.label} label={p.label} price={p.price} bold={false} />
          ))}
        </div>
      )}
    </li>
  );
}

function WineTable({ section: s }: { section: MenuSection }) {
  const cols = s.columns!;
  return (
    <table className="mt-4 w-full text-[0.9rem]">
      <thead>
        <tr className="label text-[0.6rem] text-red">
          <th className="pb-2 text-left font-semibold">
            <span className="sr-only">Wine</span>
          </th>
          {cols.map((c) => (
            <th key={c} className="w-16 pb-2 text-right font-semibold max-sm:w-12">
              {c}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="align-top">
        {s.items.map((it) => (
          <tr key={it.name} className="border-t border-ink/10">
            <td className="py-1.5 pr-2">
              <span className="font-bold">{it.name}</span>
              {it.desc && <span className="block text-[0.8rem] text-ink/75">{it.desc}</span>}
            </td>
            {it.prices!.map((p, i) => (
              <td key={i} className="py-1.5 text-right font-semibold tabular-nums">
                {p.price || <span className="text-ink/30">&mdash;</span>}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/** Corner scrollwork, after the printed menu's brown-and-taupe corners. */
export function Flourish({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 80" className={`pointer-events-none ${className}`} aria-hidden="true">
      <path d="M 6 74 C 4 40 14 14 40 8 C 52 5 66 6 74 8" fill="none" stroke="#4a3022" strokeWidth="5" strokeLinecap="round" />
      <path d="M 40 8 C 44 2 54 2 56 8 C 58 14 50 18 46 14" fill="none" stroke="#4a3022" strokeWidth="3" strokeLinecap="round" />
      <path d="M 8 40 C 2 44 2 54 8 56 C 14 58 18 50 14 46" fill="none" stroke="#4a3022" strokeWidth="3" strokeLinecap="round" />
      <path d="M 14 30 C 18 18 26 14 34 14 C 30 22 24 28 14 30 Z" fill="#9b8579" />
      <path d="M 22 22 L 12 12" stroke="#4a3022" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="10" cy="10" r="3" fill="#a51c30" />
    </svg>
  );
}
