"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SITE } from "@/lib/data/site";
import MangaButton from "@/components/ui/MangaButton";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const rise = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.2, 0.8, 0.2, 1] } },
};

const ROLES = ["VIDEO EDITOR", "GRAPHIC DESIGNER", "SOCIAL MEDIA MANAGER"];
// Repeated to comfortably fill wide screens, then rendered twice back-to-back
// so animating to exactly -50% loops seamlessly.
const TICKER_GROUP = Array(6).fill(ROLES).flat();

const glowText = {
  textShadow:
    "0 0 30px rgba(241,241,237,0.45), 0 0 70px rgba(241,241,237,0.2)",
};

export default function Hero({ ready }: { ready: boolean }) {
  const [imgError, setImgError] = useState(false);

  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[100svh] w-full flex-col overflow-hidden border-b-2 border-ink-950 bg-ink-950"
    >
      {/* Moving background video, dimmed to 20% so the typography stays the
          focus. Uses the same clip as the opening splash — drop your file
          at /public/videos/intro-background.mp4 and it plays here too. */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover opacity-20"
      >
        <source src="/videos/intro-background.mp4" type="video/mp4" />
      </video>

      {/* Screentone wash for texture over the dark backdrop */}
      <div className="screentone-lg pointer-events-none absolute -right-24 -top-24 -z-10 h-[420px] w-[420px] text-paper-100 opacity-[0.08]" />
      <div className="screentone-lg pointer-events-none absolute -bottom-24 -left-24 -z-10 h-[420px] w-[420px] text-paper-100 opacity-[0.06]" />

      {/* Photo — pinned to the right edge, bleeding off it and down behind
          the ticker strip. Use a transparent-background PNG here (see
          README) for a true cutout; without one this still shows its
          source background, just without any box/border around it.
          Hidden on small screens. */}
      <div className="pointer-events-none absolute right-0 top-16 bottom-0 hidden w-[42%] items-end justify-end sm:flex lg:w-[40%]">
        {!imgError ? (
          <motion.img
            initial={{ opacity: 0, x: 30 }}
            animate={ready ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1], delay: 0.2 }}
            src="/images/profile/profile.png"
            alt="Vincent Arbitrario"
            onError={() => setImgError(true)}
            className="h-[98%] w-auto object-contain object-bottom grayscale contrast-125"
          />
        ) : (
          <span className="mb-16 mr-6 rotate-[-4deg] font-hand text-xl text-paper-100/30">
            add profile.png →
            <br />
            /public/images/profile/
          </span>
        )}
      </div>

      {/* Text content, left-aligned */}
      <motion.div
        variants={container}
        initial="hidden"
        animate={ready ? "show" : "hidden"}
        className="relative z-10 flex flex-1 flex-col justify-center px-6 pb-24 pt-28 sm:max-w-[62%] sm:px-10 sm:pt-24 lg:max-w-[60%] lg:px-16"
      >
        <motion.p
          variants={rise}
          className="mb-5 font-sfx text-xs tracking-widest2 text-paper-100/70"
        >
          CHAPTER 01 — OPENING
        </motion.p>

        <motion.h1
          variants={rise}
          style={glowText}
          className="font-display text-[15vw] uppercase leading-[0.85] tracking-tightest text-paper-0 sm:text-[8vw] lg:text-[5.6vw]"
        >
          Vincent
        </motion.h1>
        <motion.h1
          variants={rise}
          style={glowText}
          className="font-display text-[15vw] uppercase leading-[0.85] tracking-tightest text-paper-0 sm:text-[8vw] lg:text-[5.6vw]"
        >
          Arbitrario
        </motion.h1>

        <motion.p
          variants={rise}
          className="mt-6 max-w-md font-sans text-base leading-relaxed text-paper-100/80 sm:text-lg"
        >
          {SITE.tagline}
        </motion.p>

        <motion.div variants={rise} className="mt-10 flex flex-wrap items-center gap-4">
          <MangaButton
            variant="solid"
            tone="dark"
            cursorLabel="GO"
            icon={<span className="transition-transform group-hover:translate-x-1">→</span>}
            onClick={() =>
              document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            READ THE WORK
          </MangaButton>

          <MangaButton
            variant="outline"
            tone="dark"
            cursorLabel="GO"
            onClick={() =>
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            CONTACT ME
          </MangaButton>
        </motion.div>
      </motion.div>

      {/* Scrolling role ticker — the "conveyor belt". Positioned as an
          overlay (not in normal flow) with a translucent backing so the
          photo shows through behind it. */}
      <div className="absolute inset-x-0 bottom-0 z-20 overflow-hidden border-t border-paper-100/20 bg-ink-950/70 py-3.5 backdrop-blur-[2px]">
        <motion.div
          className="flex w-max whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        >
          {[...TICKER_GROUP, ...TICKER_GROUP].map((role, i) => (
            <span
              key={i}
              className="mx-5 flex items-center font-sfx text-xs tracking-widest2 text-paper-100/70"
            >
              {role}
              <span className="ml-5 text-paper-100/25">◆</span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
