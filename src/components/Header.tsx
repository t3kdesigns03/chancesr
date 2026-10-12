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
export default function Header() {
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
        scrolled ? "border-brass/15 bg-walnut-950/90 backdrop-blur-md" : "border-transparent bg-walnut-950/40 backdrop-blur-sm"
      }`}
    >
      {/* Desktop */}
      <div className="mx-auto hidden h-[4.75rem] max-w-7xl items-center justify-between gap-6 px-8 lg:flex">
        <NavLink href="#top" aria-label={`${site.fullName}, back to top`} className="rounded-full">
          <BrandLockup crest />
        </NavLink>
        <nav aria-label="Sections" className="flex items-center gap-1">
          {nav.map((n) => (
            <NavLink key={n.href} href={n.href} className="label px-3 py-2 text-[0.68rem] text-cream transition-colors hover:text-brass-bright xl:px-4">
              {n.label}
            </NavLink>
          ))}
          <a href={site.menus.main} target="_blank" rel="noopener" className="label px-3 py-2 text-[0.68rem] text-cream transition-colors hover:text-brass-bright xl:px-4">
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
          <NavLink href="#top" aria-label={`${site.fullName}, back to top`} className="min-w-0 rounded-full py-1 pr-1">
            <BrandLockup compact />
          </NavLink>
          <a href={site.phone.href} className="brass deco-clip tap inline-flex min-h-10 shrink-0 items-center gap-2 px-4 text-sm font-semibold">
            <PhoneIcon className="h-4 w-4" />
            Call
          </a>
        </div>
        <JumpBar />
      </div>
    </header>
  );
}

function JumpBar() {
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
        p!.style.opacity = "0";
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
        className="relative mx-auto flex max-w-6xl gap-1 overflow-x-auto px-3 py-1.5 [scrollbar-width:none] sm:justify-center sm:px-5 [&::-webkit-scrollbar]:hidden"
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
              href={j.href}
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
      </div>
    </nav>
  );
}
