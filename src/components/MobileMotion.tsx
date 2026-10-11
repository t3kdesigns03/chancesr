"use client";

import { useEffect } from "react";

export const MOBILE_MOTION = "(max-width: 1023.98px) and (prefers-reduced-motion: no-preference)";

/**
 * Scroll-triggered reveals for phones/tablets. Anything marked `data-reveal` that starts
 * below the fold gets `data-pending` (hidden by CSS) and fades/rises in as it enters the
 * screen. Only this script sets or clears `data-pending`, never React, so re-renders can't
 * re-hide anything, and elements mounted later are simply visible. On desktop, with reduced
 * motion, or without JS, nothing is ever hidden.
 */
export default function MobileMotion() {
  useEffect(() => {
    const mq = window.matchMedia(MOBILE_MOTION);
    const html = document.documentElement;
    let io: IntersectionObserver | undefined;

    function setup() {
      io?.disconnect();
      document.querySelectorAll("[data-pending]").forEach((el) => el.removeAttribute("data-pending"));
      if (!mq.matches) {
        html.classList.remove("m-motion");
        return;
      }
      io = new IntersectionObserver(
        (entries) =>
          entries.forEach((e) => {
            if (!e.isIntersecting) return;
            e.target.removeAttribute("data-pending");
            io?.unobserve(e.target);
          }),
        { rootMargin: "0px 0px -8% 0px" },
      );
      // Only hide what's below the fold right now, so nothing on screen flashes.
      document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight) return;
        el.setAttribute("data-pending", "");
        io!.observe(el);
      });
      html.classList.add("m-motion");
    }

    setup();
    mq.addEventListener("change", setup);
    return () => {
      mq.removeEventListener("change", setup);
      io?.disconnect();
    };
  }, []);

  return null;
}
