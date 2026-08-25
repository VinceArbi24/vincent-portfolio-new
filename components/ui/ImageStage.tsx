"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ImageOff, X } from "lucide-react";

export type StageImage = {
  id: string;
  title: string;
  subtitle?: string;
  src: string;
};

export default function ImageStage({
  images,
  index,
  onClose,
  onNavigate,
}: {
  images: StageImage[];
  index: number | null;
  onClose: () => void;
  onNavigate: (nextIndex: number) => void;
}) {
  const open = index !== null;
  const current = open ? images[index as number] : null;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && index !== null && index < images.length - 1) {
        onNavigate(index + 1);
      }
      if (e.key === "ArrowLeft" && index !== null && index > 0) {
        onNavigate(index - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, index, images.length, onClose, onNavigate]);

  return (
    <AnimatePresence>
      {open && current && (
        <motion.div
          className="fixed inset-0 z-modal flex items-center justify-center bg-ink-950/95 p-4 sm:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <div className="screentone-lg pointer-events-none absolute inset-0 text-paper-100 opacity-[0.04]" />

          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center border-2 border-paper-100 bg-ink-950 text-paper-0 transition-transform hover:rotate-90 sm:right-8 sm:top-8"
          >
            <X size={18} strokeWidth={2.5} />
          </button>

          {index !== null && index > 0 && (
            <button
              onClick={() => onNavigate(index - 1)}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border-2 border-paper-100 bg-ink-950/80 text-paper-0 transition-colors hover:bg-paper-0 hover:text-ink-950 sm:left-6"
            >
              <ChevronLeft size={20} />
            </button>
          )}
          {index !== null && index < images.length - 1 && (
            <button
              onClick={() => onNavigate(index + 1)}
              aria-label="Next image"
              className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border-2 border-paper-100 bg-ink-950/80 text-paper-0 transition-colors hover:bg-paper-0 hover:text-ink-950 sm:right-6"
            >
              <ChevronRight size={20} />
            </button>
          )}

          <motion.div
            key={current.id}
            initial={{ clipPath: "inset(50% 50% 50% 50%)", opacity: 0 }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.65, 0, 0.35, 1] }}
            className="panel-corners relative flex max-h-[88vh] w-full max-w-4xl flex-col border-2 border-paper-100 bg-ink-900 text-paper-100"
          >
            <div className="flex flex-1 items-center justify-center overflow-hidden bg-black p-4 sm:p-8">
              <ImgWithFallback src={current.src} alt={current.title} />
            </div>
            <div className="flex items-center justify-between gap-4 border-t border-paper-100/20 p-5 sm:p-6">
              <div>
                {current.subtitle && (
                  <p className="font-sfx text-[10px] tracking-widest2 text-paper-100/60">
                    {current.subtitle}
                  </p>
                )}
                <h3 className="font-display text-xl uppercase tracking-tight text-paper-0 sm:text-2xl">
                  {current.title}
                </h3>
              </div>
              <span className="flex-none font-sfx text-xs tracking-widest2 text-paper-100/60">
                {String((index ?? 0) + 1).padStart(2, "0")} /{" "}
                {String(images.length).padStart(2, "0")}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ImgWithFallback({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="flex flex-col items-center gap-2 p-8 text-center text-paper-100/50">
        <ImageOff size={24} />
        <span className="font-hand text-lg">missing file</span>
        <span className="font-sans text-xs">{src}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="max-h-full max-w-full object-contain"
      onError={() => setFailed(true)}
    />
  );
}
