"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SITE } from "@/lib/data/site";

const INTRO_DURATION_MS = 2600;

export default function PageIntro({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [show, setShow] = useState(true);
  const completedRef = useRef(false);

  const finish = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    setShow(false);
    onComplete();
  };

  useEffect(() => {
    const timer = setTimeout(finish, INTRO_DURATION_MS);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          onClick={finish}
          className="fixed inset-0 z-modal isolate flex cursor-pointer flex-col items-center justify-center overflow-hidden bg-ink-950"
          exit={{
            clipPath: "inset(0% 0% 100% 0%)",
            transition: { duration: 0.55, ease: [0.65, 0, 0.35, 1] },
          }}
        >
          {/* Moving background video, dimmed so typography stays the focus.
              Drop your file at /public/videos/intro-background.mp4 — until
              then this simply shows nothing and the black backdrop holds. */}
          <video
            autoPlay
            muted
            loop
            playsInline
            className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover opacity-20"
          >
            <source src="/videos/intro-background.mp4" type="video/mp4" />
          </video>

          {/* Panel line draws across */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, ease: [0.65, 0, 0.35, 1] }}
            style={{ transformOrigin: "left" }}
            className="absolute top-1/2 h-px w-full bg-paper-100/40"
          />

          {/* Chapter tag */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.4 }}
            className="mb-6 font-sfx text-xs tracking-widest2 text-paper-100/70"
          >
            CHAPTER 01 — OPENING
          </motion.p>

          {/* Ink spread */}
          <motion.div
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 3.2, opacity: 0 }}
            transition={{ delay: 0.5, duration: 1.1, ease: "easeOut" }}
            className="pointer-events-none absolute h-40 w-40 rounded-full bg-paper-100"
          />

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
            style={{ WebkitTextStroke: "1.5px #0D0D0D" }}
            className="text-center font-display text-[13vw] uppercase leading-[0.85] tracking-tightest text-paper-0 sm:text-7xl"
          >
            {SITE.name}
          </motion.h1>

          {/* Role */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15, duration: 0.5 }}
            className="mt-4 font-sfx text-xs tracking-widest2 text-paper-100/80 sm:text-sm"
          >
            {SITE.role.toUpperCase()}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.9, duration: 0.5 }}
            className="absolute bottom-8 font-hand text-lg text-paper-100/50"
          >
            click anywhere to skip
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
