"use client";

import { useCursor } from "@/lib/context/CursorContext";
import { motion } from "framer-motion";

type MangaButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "solid" | "outline";
  /** "light" = for use on paper/white backgrounds (default).
   *  "dark"  = for use on ink/black backgrounds (e.g. the hero). */
  tone?: "light" | "dark";
  target?: string;
  rel?: string;
  className?: string;
  icon?: React.ReactNode;
  cursorLabel?: string;
};

export default function MangaButton({
  children,
  href,
  onClick,
  variant = "outline",
  tone = "light",
  target,
  rel,
  className = "",
  icon,
  cursorLabel = "OPEN",
}: MangaButtonProps) {
  const { setCursor, resetCursor } = useCursor();

  const isDark = tone === "dark";

  const base =
    "group relative inline-flex items-center justify-center gap-2.5 overflow-hidden border-2 px-7 py-4 font-sfx text-xs tracking-widest2 transition-colors duration-300";

  const borderColor = isDark ? "border-paper-100" : "border-ink-950";
  const solid = isDark ? "bg-paper-0 text-ink-950" : "bg-ink-950 text-paper-100";
  const outline = isDark ? "bg-transparent text-paper-0" : "bg-transparent text-ink-950";
  const sweepColor = isDark ? "bg-paper-0" : "bg-ink-950";
  const sweepHoverText = isDark ? "group-hover:text-ink-950" : "group-hover:text-paper-100";

  const content = (
    <>
      {/* Ink fill sweep on hover */}
      <span
        className={`pointer-events-none absolute inset-0 -translate-x-full ${sweepColor} transition-transform duration-300 ease-ink group-hover:translate-x-0 ${
          variant === "solid" ? "hidden" : ""
        }`}
      />
      <span className={`relative z-10 flex items-center gap-2.5 ${sweepHoverText}`}>
        {children}
        {icon}
      </span>
    </>
  );

  const sharedProps = {
    onMouseEnter: () => setCursor("link", cursorLabel),
    onMouseLeave: () => resetCursor(),
    className: `${base} ${borderColor} ${variant === "solid" ? solid : outline} ${className}`,
  };

  if (href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel}
        whileTap={{ scale: 0.97 }}
        {...sharedProps}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button onClick={onClick} whileTap={{ scale: 0.97 }} {...sharedProps}>
      {content}
    </motion.button>
  );
}
