"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useCursor } from "@/lib/context/CursorContext";
import { useMediaQuery } from "@/lib/hooks/useMediaQuery";

export default function CustomCursor() {
  const isFinePointer = useMediaQuery("(hover: hover) and (pointer: fine)");
  const { variant, label } = useCursor();
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 700, damping: 45, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 700, damping: 45, mass: 0.4 });

  // Trailing ring lags slightly behind for a hand-drawn "ink settling" feel
  const ringX = useSpring(x, { stiffness: 220, damping: 30, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 220, damping: 30, mass: 0.6 });

  useEffect(() => {
    if (!isFinePointer) return;
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);
    };
    const hide = () => setVisible(false);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseleave", hide);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseleave", hide);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFinePointer]);

  if (!isFinePointer) return null;

  const isExpanded = variant !== "default";

  return (
    <div
      className="pointer-events-none fixed inset-0 z-cursor"
      aria-hidden="true"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 0.2s" }}
    >
      {/* Outer ink ring */}
      <motion.div
        className="absolute rounded-full border border-ink-950"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isExpanded ? 68 : 30,
          height: isExpanded ? 68 : 30,
          borderWidth: variant === "copy" ? 0 : 1,
          backgroundColor:
            variant === "view" || variant === "frame"
              ? "rgba(13,13,13,1)"
              : "rgba(13,13,13,0)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 26 }}
      />

      {/* Inner crosshair dot */}
      <motion.div
        className="absolute rounded-full bg-ink-950"
        style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: isExpanded ? 4 : 6,
          height: isExpanded ? 4 : 6,
          opacity: variant === "view" || variant === "frame" ? 0 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />

      {/* Crosshair ticks for the default editorial-marker state */}
      {!isExpanded && (
        <motion.svg
          className="absolute"
          style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
          width="30"
          height="30"
          viewBox="0 0 30 30"
        >
          <line x1="15" y1="0" x2="15" y2="7" stroke="#0D0D0D" strokeWidth="1" />
          <line x1="15" y1="23" x2="15" y2="30" stroke="#0D0D0D" strokeWidth="1" />
          <line x1="0" y1="15" x2="7" y2="15" stroke="#0D0D0D" strokeWidth="1" />
          <line x1="23" y1="15" x2="30" y2="15" stroke="#0D0D0D" strokeWidth="1" />
        </motion.svg>
      )}

      <AnimatePresence>
        {isExpanded && label && (
          <motion.span
            className="absolute whitespace-nowrap font-sfx text-[10px] tracking-widest2 text-paper-0"
            style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.15 }}
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
