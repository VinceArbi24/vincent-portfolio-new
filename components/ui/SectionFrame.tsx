"use client";

import { motion } from "framer-motion";

type SectionFrameProps = {
  id: string;
  frame: string; // "03"
  total: string; // "09"
  eyebrow: string; // "CHAPTER 03"
  title: string;
  kicker?: string;
  children: React.ReactNode;
  className?: string;
};

/**
 * Every section on the page is a numbered "frame" of the manga, consistent
 * with the running folio in the sidebar. Corner ticks + a live frame number
 * turn the (functionally necessary) section wrapper into part of the fiction.
 */
export default function SectionFrame({
  id,
  frame,
  total,
  eyebrow,
  title,
  kicker,
  children,
  className = "",
}: SectionFrameProps) {
  return (
    <section
      id={id}
      className={`relative mx-auto w-full max-w-[1400px] scroll-mt-10 px-6 py-24 sm:px-10 md:py-32 lg:px-16 ${className}`}
    >
      <div className="panel-corners relative border-y border-line-300 py-14 sm:py-20">
        {/* Frame folio, top right */}
        <div className="absolute -top-3 right-0 hidden items-center gap-2 bg-paper-200 pl-3 font-sfx text-[11px] tracking-widest2 text-ink-700 sm:flex">
          <span>
            FRAME {frame} / {total}
          </span>
        </div>

        <div className="mb-12 flex flex-col gap-4 sm:mb-16">
          <motion.p
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
            className="font-sfx text-xs tracking-widest2 text-ink-700"
          >
            {eyebrow}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
            className="font-display text-[13vw] uppercase leading-[0.95] tracking-tight text-ink-950 sm:text-6xl md:text-7xl"
          >
            {title}
          </motion.h2>
          {kicker && (
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="max-w-xl font-hand text-xl text-ink-700 sm:text-2xl"
            >
              {kicker}
            </motion.p>
          )}
        </div>

        {children}
      </div>
    </section>
  );
}
