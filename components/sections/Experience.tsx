"use client";

import { motion } from "framer-motion";
import SectionFrame from "@/components/ui/SectionFrame";
import { EXPERIENCE } from "@/lib/data/experience";

export default function Experience() {
  return (
    <SectionFrame
      id="experience"
      frame="07"
      total="09"
      eyebrow="CHAPTER 07 — EXPERIENCE"
      title="Experience"
    >
      <div className="relative max-w-2xl border-l-2 border-ink-950 pl-8 sm:pl-10">
        {EXPERIENCE.map((entry, i) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.55, delay: i * 0.1 }}
            className="relative pb-2"
          >
            <span className="absolute -left-[42px] top-1.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-ink-950 bg-paper-100 sm:-left-[50px]">
              <span className="h-2 w-2 rounded-full bg-ink-950" />
            </span>

            <p className="font-sfx text-[11px] tracking-widest2 text-ink-700">
              {entry.period.toUpperCase()}
            </p>
            <h3 className="mt-2 font-display text-3xl uppercase leading-none tracking-tight text-ink-950 sm:text-4xl">
              {entry.role}
            </h3>
            <p className="mt-1 font-hand text-2xl text-fog-600">{entry.org}</p>
            <p className="mt-4 max-w-lg font-sans text-base leading-relaxed text-ink-700">
              {entry.description}
            </p>
          </motion.div>
        ))}
      </div>
    </SectionFrame>
  );
}
