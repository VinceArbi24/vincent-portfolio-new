"use client";

import { motion } from "framer-motion";
import SectionFrame from "@/components/ui/SectionFrame";

const SPECIALTIES = [
  "Short-form video editing",
  "Social media content",
  "Graphic design",
  "Promotional graphics",
  "Advertisements",
  "YouTube thumbnails",
  "Carousel designs",
  "Branded visual content",
];

export default function About() {
  return (
    <SectionFrame
      id="about"
      frame="05"
      total="09"
      eyebrow="CHAPTER 05 — ABOUT"
      title="About Vincent"
    >
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7"
        >
          <p className="font-sans text-lg leading-relaxed text-ink-700 sm:text-xl">
            <span className="float-left mr-3 mt-1 font-display text-6xl leading-[0.8] text-ink-950 sm:text-7xl">
              V
            </span>
            incent Arbitrario is a graphic designer and video editor who
            shapes raw footage and blank canvases into content built to stop
            the scroll. The work spans fast-paced short-form edits,
            attention-grabbing thumbnails, and branded visuals designed for
            social feeds, storefronts, and campaigns alike — always with an
            eye for pacing, clarity, and a clean editorial finish.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="panel-corners relative border-2 border-ink-950 p-6 lg:col-span-5"
        >
          <p className="mb-4 font-sfx text-[11px] tracking-widest2 text-ink-700">
            SPECIALTIES
          </p>
          <ul className="flex flex-col gap-3">
            {SPECIALTIES.map((s, i) => (
              <li key={s} className="flex items-center gap-3 border-b border-line-300 pb-3 last:border-none last:pb-0">
                <span className="flex h-5 w-5 flex-none items-center justify-center border border-ink-950 font-sfx text-[9px] text-ink-950">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-sans text-sm text-ink-950 sm:text-base">
                  {s}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </SectionFrame>
  );
}
