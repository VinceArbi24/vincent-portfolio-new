"use client";

import { motion } from "framer-motion";
import SectionFrame from "@/components/ui/SectionFrame";
import { REVIEWS } from "@/lib/data/reviews";

const rotations = [-1.5, 1, -0.5, 1.5, -1];

export default function Reviews() {
  return (
    <SectionFrame
      id="reviews"
      frame="08"
      total="09"
      eyebrow="CHAPTER 08 — REVIEWS"
      title="What Clients Say"
    >
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {REVIEWS.map((review, i) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 24, rotate: 0 }}
            whileInView={{ opacity: 1, y: 0, rotate: rotations[i % rotations.length] }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.55, delay: (i % 3) * 0.1, ease: [0.2, 0.8, 0.2, 1] }}
            whileHover={{ rotate: 0, scale: 1.02 }}
            className={`panel-corners relative flex flex-col justify-between border-2 border-ink-950 bg-paper-0 p-6 shadow-panel transition-shadow duration-300 hover:shadow-panel-lg ${
              i === 0 ? "sm:col-span-2 lg:col-span-1" : ""
            }`}
          >
            <span className="pointer-events-none absolute -top-5 left-5 font-display text-7xl leading-none text-ink-950/10">
              &ldquo;
            </span>
            <p className="relative font-sans text-base leading-relaxed text-ink-950 sm:text-lg">
              {review.quote}
            </p>
            <div className="relative mt-6 flex items-center justify-between border-t border-line-300 pt-4">
              <span className="font-hand text-lg text-fog-600">
                Anonymous Client
              </span>
              <span className="font-sfx text-[10px] tracking-widest2 text-ink-700">
                {review.tag.toUpperCase()}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionFrame>
  );
}
