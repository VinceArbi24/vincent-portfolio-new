"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { WorkProject } from "@/lib/data/projects";
import { useCursor } from "@/lib/context/CursorContext";

const SIZE_CLASSES: Record<WorkProject["size"], string> = {
  feature: "aspect-[4/5] md:aspect-auto md:col-span-2 md:row-span-2",
  wide: "aspect-[4/5] md:aspect-auto md:col-span-2 md:row-span-1",
  tall: "aspect-[4/5] md:aspect-auto md:col-span-1 md:row-span-2",
  regular: "aspect-[4/5] md:aspect-auto md:col-span-1 md:row-span-1",
};

export default function VideoCard({
  project,
  index,
  onOpen,
}: {
  project: WorkProject;
  index: number;
  onOpen: (p: WorkProject) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hovered, setHovered] = useState(false);
  const [inView, setInView] = useState(false);
  const { setCursor, resetCursor } = useCursor();

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.35 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (inView) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [inView]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
      onMouseEnter={() => {
        setHovered(true);
        setCursor("frame", "WATCH →");
      }}
      onMouseLeave={() => {
        setHovered(false);
        resetCursor();
      }}
      onClick={() => onOpen(project)}
      className={`group relative cursor-pointer overflow-hidden border-2 border-ink-950 bg-ink-950 ${SIZE_CLASSES[project.size]}`}
    >
      {/* Landscape matting the vertical video sits inside */}
      <div className="absolute inset-0 bg-ink-950">
        <div className="screentone absolute inset-0 text-paper-100 opacity-[0.15]" />
      </div>

      <div className="relative flex h-full w-full items-center justify-center p-3 sm:p-4">
        <motion.video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="metadata"
          poster={project.poster}
          animate={{ scale: hovered ? 1.035 : 1 }}
          transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
          className="h-full max-h-full w-auto max-w-full bg-ink-900 object-contain shadow-panel"
        >
          <source src={project.src} type="video/mp4" />
        </motion.video>
      </div>

      {/* Ink border draw-in on hover */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full" fill="none">
        <motion.rect
          x="4"
          y="4"
          width="calc(100% - 8px)"
          height="calc(100% - 8px)"
          stroke="#F1F1ED"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
        />
      </svg>

      {/* Title plate */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 sm:p-5">
        <motion.div
          animate={{ x: hovered ? 4 : 0 }}
          transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <p className="font-sfx text-[10px] tracking-widest2 text-paper-100/70">
            {project.category}
          </p>
          <p className="font-display text-xl uppercase leading-none tracking-tight text-paper-0 sm:text-2xl">
            {project.title}
          </p>
        </motion.div>
        <motion.span
          initial={{ opacity: 0, x: 8 }}
          animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : 8 }}
          transition={{ duration: 0.25 }}
          className="whitespace-nowrap border border-paper-100 px-2.5 py-1 font-sfx text-[10px] tracking-widest2 text-paper-0"
        >
          WATCH →
        </motion.span>
      </div>

      {project.note && (
        <motion.span
          initial={{ opacity: 0, rotate: -8, scale: 0.8 }}
          animate={{
            opacity: hovered ? 1 : 0,
            rotate: -8,
            scale: hovered ? 1 : 0.8,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className="pointer-events-none absolute right-4 top-4 rounded-full border border-paper-100 bg-ink-950 px-3 py-1 font-hand text-base text-paper-0"
        >
          {project.note}
        </motion.span>
      )}

      <div className="panel-corners pointer-events-none absolute inset-0 text-paper-100" />
    </motion.div>
  );
}
