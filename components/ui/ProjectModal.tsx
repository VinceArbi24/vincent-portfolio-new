"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Pause,
  Play,
  Volume2,
  VolumeX,
  Maximize,
  X,
} from "lucide-react";
import type { WorkProject } from "@/lib/data/projects";
import { useCursor } from "@/lib/context/CursorContext";

export default function ProjectModal({
  project,
  onClose,
}: {
  project: WorkProject | null;
  onClose: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const { resetCursor } = useCursor();

  useEffect(() => {
    if (!project) return;
    setPlaying(true);
    setMuted(true);
    setProgress(0);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  if (!project) return null;

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const toggleFullscreen = () => {
    wrapRef.current?.requestFullscreen?.();
  };

  const onTimeUpdate = () => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    setProgress((v.currentTime / v.duration) * 100);
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    v.currentTime = ratio * v.duration;
  };

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-modal flex items-center justify-center bg-ink-950/95 p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          {/* Screentone backdrop texture */}
          <div className="screentone-lg pointer-events-none absolute inset-0 text-paper-100 opacity-[0.04]" />

          <motion.div
            ref={wrapRef}
            initial={{ clipPath: "inset(50% 50% 50% 50%)", opacity: 0 }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
            exit={{ clipPath: "inset(50% 50% 50% 50%)", opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.65, 0, 0.35, 1] }}
            className="panel-corners relative flex max-h-[90vh] w-full max-w-5xl flex-col border-2 border-paper-100 bg-ink-900 text-paper-100"
          >
            <button
              onClick={() => {
                onClose();
                resetCursor();
              }}
              aria-label="Close project"
              className="absolute -top-4 -right-4 z-10 flex h-10 w-10 items-center justify-center border-2 border-ink-950 bg-paper-0 text-ink-950 transition-transform hover:rotate-90"
            >
              <X size={18} strokeWidth={2.5} />
            </button>

            <div className="flex items-center justify-center bg-black p-4 sm:p-8">
              <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                poster={project.poster}
                onTimeUpdate={onTimeUpdate}
                className="max-h-[62vh] w-auto max-w-full"
              >
                <source src={project.src} type="video/mp4" />
              </video>
            </div>

            {/* Progress bar */}
            <div
              onClick={seek}
              className="relative h-1.5 w-full cursor-pointer bg-paper-100/20"
            >
              <div
                className="h-full bg-paper-0"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="flex flex-col gap-4 border-t border-paper-100/20 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div>
                <p className="font-sfx text-[10px] tracking-widest2 text-paper-100/60">
                  {project.category} — {project.year}
                  {project.client ? ` — ${project.client}` : ""}
                </p>
                <h3 className="font-display text-2xl uppercase tracking-tight text-paper-0 sm:text-3xl">
                  {project.title}
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  aria-label={playing ? "Pause" : "Play"}
                  className="flex h-10 w-10 items-center justify-center border border-paper-100 text-paper-0 transition-colors hover:bg-paper-0 hover:text-ink-950"
                >
                  {playing ? <Pause size={16} /> : <Play size={16} />}
                </button>
                <button
                  onClick={toggleMute}
                  aria-label={muted ? "Unmute" : "Mute"}
                  className="flex h-10 w-10 items-center justify-center border border-paper-100 text-paper-0 transition-colors hover:bg-paper-0 hover:text-ink-950"
                >
                  {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>
                <button
                  onClick={toggleFullscreen}
                  aria-label="Fullscreen"
                  className="flex h-10 w-10 items-center justify-center border border-paper-100 text-paper-0 transition-colors hover:bg-paper-0 hover:text-ink-950"
                >
                  <Maximize size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
