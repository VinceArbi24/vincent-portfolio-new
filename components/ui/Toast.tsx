"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";

type ToastProps = {
  show: boolean;
  title: string;
  subtitle?: string;
};

export default function Toast({ show, title, subtitle }: ToastProps) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-toast flex justify-center sm:bottom-10 sm:right-10 sm:left-auto sm:justify-end sm:pr-10">
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            exit={{ scaleX: 0, opacity: 0, transition: { duration: 0.2 } }}
            transition={{ duration: 0.28, ease: [0.65, 0, 0.35, 1] }}
            style={{ transformOrigin: "left center" }}
            className="relative flex origin-left items-center gap-4 border-2 border-ink-950 bg-paper-0 px-5 py-4 shadow-panel"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-ink-950 text-paper-0"
            >
              <Check size={16} strokeWidth={3} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.18 }}
            >
              <p className="font-sfx text-xs tracking-widest2 text-ink-950">
                {title}
              </p>
              {subtitle && (
                <p className="mt-1 font-sans text-sm text-ink-700">
                  {subtitle}
                </p>
              )}
            </motion.div>
            <div className="panel-corners absolute inset-0" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
