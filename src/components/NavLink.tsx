"use client";

import type { MouseEvent, ReactNode } from "react";
import { jumpTo } from "@/lib/jump";

/** In-page anchor that always lands (see jumpTo). */
export default function NavLink({
  href,
  className,
  children,
  onJump,
  ...rest
}: {
  href: string;
  className?: string;
  children: ReactNode;
  onJump?: () => void;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "onClick">) {
  function onClick(e: MouseEvent<HTMLAnchorElement>) {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    onJump?.();
    if (jumpTo(href)) e.preventDefault();
  }

  return (
    <a href={href} onClick={onClick} className={className} {...rest}>
      {children}
    </a>
  );
}
