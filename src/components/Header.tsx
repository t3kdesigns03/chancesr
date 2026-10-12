"use client";

import { useEffect, useRef, useState } from "react";
import { nav, site } from "@/lib/site";
import { BrandLockup } from "./BrandMark";
import NavLink from "./NavLink";
import { PhoneIcon } from "./ui";

/**
 * Sticky header. Desktop: lockup, section links, the call button.
 * Phones/tablets: lockup + Call, then a jump bar whose brass pill follows the section you're in.
 */
/** `home` is false on other pages (the menu): section links then point back to the homepage. */
export default function Header({ home = true }: { home?: boolean }) {
  const base = home ? "" : "/";
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled ? "border-brass/15 bg-walnut-950" : "border-transparent bg-walnut-950 lg:bg-walnut-950/40 lg:backdrop-blur-sm"
      }`}
    >
      {/* Desktop */}
      <div className="mx-auto hidden h-[4.75rem] max-w-7xl items-center justify-between gap-6 px-8 lg:flex">
        <NavLink href={home ? "#top" : "/"} className="rounded-full">
          <BrandLockup crest />
          <span className="sr-only">{home ? ", back to top" : ", home"}</span>
        </NavLink>
        <nav aria-label="Sections" className="flex items-center gap-1">
          {nav.map((n) => (
            <NavLink key={n.href} href={base + n.href} className="label px-3 py-2 text-[0.68rem] text-cream transition-colors hover:text-brass-bright xl:px-4">
              {n.label}
            </NavLink>
          ))}
          <a href="/menu" aria-current={home ? undefined : "page"} className={`label px-3 py-2 text-[0.68rem] transition-colors hover:text-brass-bright xl:px-4 ${home ? "text-cream" : "text-brass-bright"}`}>
            Menu
          </a>
        </nav>
        <a href={site.phone.href} className="brass deco-clip tap inline-flex min-h-11 items-center gap-2 px-5 font-semibold">
          <PhoneIcon className="h-4 w-4" />
          <span className="tabular-nums">{site.phone.display}</span>
        </a>
      </div>

      {/* Phones & tablets */}
      <div className="lg:hidden">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
          <NavLink href={home ? "#top" : "/"} className="min-w-0 rounded-full py-1 pr-1">
            <BrandLockup compact crest />
            <span className="sr-only">{home ? ", back to top" : ", home"}</span>
          </NavLink>
          <a href={site.phone.href} className="brass deco-clip tap inline-flex min-h-10 shrink-0 items-center gap-2 px-4 text-sm font-semibold">
            <PhoneIcon className="h-4 w-4" />
            Call
          </a>
        </div>
        <JumpBar base={base} />
      </div>
    </header>
  );
}

function JumpBar({ base }: { base: string }) {
  const [active, setActive] = useState<string | null>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const pill = useRef<HTMLSpanElement>(null);

  // Scrollspy: whichever section crosses the middle band of the screen is "active".
  useEffect(() => {
    const ids = nav.map((j) => j.href.slice(1));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(`#${e.target.id}`);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  // Slide the pill under the active chip. Re-measure on resize: the bar is display:none on
  // desktop, so a measurement taken there is zero.
  useEffect(() => {
    const box = scroller.current;
    const p = pill.current;
    if (!box || !p) return;
    function place(scroll: boolean) {
      const chip = active ? box!.querySelector<HTMLElement>(`[data-jump="${active}"]`) : null;
      if (!chip || !chip.offsetWidth) {
        // Back in the hero (or nothing active yet): hide the pill and rest the strip at its start.
        p!.style.opacity = "0";
        box!.scrollTo({ left: 0, behavior: scroll ? "smooth" : "auto" });
        return;
      }
      p!.style.opacity = "1";
      p!.style.width = `${chip.offsetWidth}px`;
      p!.style.transform = `translateX(${chip.offsetLeft}px)`;
      if (scroll) box!.scrollTo({ left: chip.offsetLeft - box!.clientWidth / 2 + chip.offsetWidth / 2, behavior: "smooth" });
    }
    place(true);
    const ro = new ResizeObserver(() => place(false));
    ro.observe(box);
    return () => ro.disconnect();
  }, [active]);

  return (
    <nav aria-label="Jump to section" className="border-t border-white/[0.05]">
      <div
        ref={scroller}
        className="relative mx-auto flex max-w-6xl justify-[safe_center] gap-1 overflow-x-auto px-3 py-1.5 [scrollbar-width:none] sm:px-5 [&::-webkit-scrollbar]:hidden"
      >
        <span
          ref={pill}
          aria-hidden="true"
          className="brass pointer-events-none absolute left-0 top-1.5 h-8 rounded-full opacity-0 transition-[transform,width,opacity] duration-300 ease-out"
        />
        {nav.map((j) => {
          const on = active === j.href;
          return (
            <NavLink
              key={j.href}
              href={base + j.href}
              data-jump={j.href}
              aria-current={on ? "true" : undefined}
              className={`tap relative inline-flex h-8 shrink-0 items-center rounded-full px-3.5 text-[0.82rem] font-semibold transition-colors duration-300 ${
                on ? "text-walnut-950" : "text-tan"
              }`}
            >
              {j.label}
            </NavLink>
          );
        })}
        <a
          href="/menu"
          className={`tap relative inline-flex h-8 shrink-0 items-center rounded-full border px-3.5 text-[0.82rem] font-semibold ${
            base ? "border-brass bg-brass/20 text-cream" : "border-brass/40 text-brass-bright"
          }`}
        >
          Menu
        </a>
      </div>
    </nav>
  );
}
