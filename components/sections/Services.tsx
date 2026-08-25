"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionFrame from "@/components/ui/SectionFrame";
import { SERVICES } from "@/lib/data/services";

export default function Services() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <SectionFrame
      id="services"
      frame="06"
      total="09"
      eyebrow="CHAPTER 06 — SERVICES"
      title="Services"
      kicker="table of contents, of a kind."
    >
      <ul className="border-t-2 border-ink-950">
        {SERVICES.map((service) => {
          const isHovered = hovered === service.id;
          return (
            <motion.li
              key={service.id}
              onMouseEnter={() => setHovered(service.id)}
              onMouseLeave={() => setHovered(null)}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.45 }}
              className="group relative flex flex-col gap-2 border-b-2 border-ink-950 py-6 sm:flex-row sm:items-center sm:gap-8 sm:py-8"
            >
              {/* Ink sweep background on hover */}
              <motion.span
                className="pointer-events-none absolute inset-0 origin-left bg-ink-950"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: isHovered ? 1 : 0 }}
                transition={{ duration: 0.4, ease: [0.65, 0, 0.35, 1] }}
              />

              <span
                className={`relative z-10 flex-none font-sfx text-sm tracking-widest2 transition-colors duration-200 ${
                  isHovered ? "text-paper-100" : "text-ink-700"
                }`}
              >
                {service.number}
              </span>

              <h3
                className={`relative z-10 flex-none font-display text-3xl uppercase leading-none tracking-tight transition-colors duration-200 sm:w-[380px] sm:text-4xl ${
                  isHovered ? "text-paper-0" : "text-ink-950"
                }`}
              >
                {service.title}
              </h3>

              <p
                className={`relative z-10 max-w-xl font-sans text-sm transition-colors duration-200 sm:text-base ${
                  isHovered ? "text-paper-100/85" : "text-fog-600"
                }`}
              >
                {service.description}
              </p>

              <motion.span
                animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -8 }}
                transition={{ duration: 0.2 }}
                className="relative z-10 ml-auto hidden flex-none font-sfx text-xs tracking-widest2 text-paper-0 sm:block"
              >
                →
              </motion.span>
            </motion.li>
          );
        })}
      </ul>
    </SectionFrame>
  );
}
