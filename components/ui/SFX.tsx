"use client";

import { motion } from "framer-motion";

export default function SFX({
  children,
  show,
  className = "",
}: {
  children: React.ReactNode;
  show: boolean;
  className?: string;
}) {
  return (
    <motion.span
      initial={false}
      animate={
        show
          ? { opacity: 1, scale: 1, rotate: -6 }
          : { opacity: 0, scale: 0.4, rotate: -6 }
      }
      transition={{ type: "spring", stiffness: 500, damping: 18 }}
      className={`pointer-events-none select-none font-sfx text-ink-950 ${className}`}
    >
      {children}
    </motion.span>
  );
}
