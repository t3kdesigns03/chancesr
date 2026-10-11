/**
 * Scroll to an in-page section and always land. CSS smooth scrolling can stall (an
 * interrupted scroll, a throttled tab, some automated browsers): the hash changes but the
 * page never moves, which reads as a dead link. We start the smooth scroll ourselves and,
 * if the page hasn't moved shortly after, jump straight there.
 * Returns false when there's no such section, so the caller can let the browser handle it.
 */
export function jumpTo(href: string): boolean {
  const target = document.getElementById(href.slice(1));
  if (!target) return false;

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const startY = window.scrollY;
  target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  history.pushState(null, "", href);

  window.setTimeout(() => {
    const offset = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
    const away = Math.abs(target.getBoundingClientRect().top - offset) > 4;
    if (away && window.scrollY === startY) {
      const html = document.documentElement;
      const prev = html.style.scrollBehavior;
      html.style.scrollBehavior = "auto";
      target.scrollIntoView({ block: "start" });
      html.style.scrollBehavior = prev;
    }
  }, 350);
  return true;
}
