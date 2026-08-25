"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Mail, MessageCircle, Linkedin } from "lucide-react";
import { NAV_ITEMS, SITE } from "@/lib/data/site";
import { useActiveSection } from "@/lib/hooks/useActiveSection";

const ids = NAV_ITEMS.map((n) => n.id);

const listVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: 24 },
  show: { opacity: 1, x: 0, transition: { duration: 0.35, ease: [0.2, 0.8, 0.2, 1] } },
};

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const activeId = useActiveSection(ids);

  const scrollTo = (id: string) => {
    setOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 350);
  };

  return (
    <>
      {/* Top bar */}
      <div className="fixed inset-x-0 top-0 z-nav flex items-center justify-between border-b-2 border-ink-950 bg-paper-100 px-5 py-3.5 lg:hidden">
        <span className="font-display text-lg uppercase tracking-tight text-ink-950">
          Vincent Arbitrario
        </span>
        <button
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          aria-expanded={open}
          className="flex h-9 w-9 flex-col items-center justify-center gap-[5px] border-2 border-ink-950"
        >
          <span className="h-[2px] w-4 bg-ink-950" />
          <span className="h-[2px] w-4 bg-ink-950" />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0 0 0 100%)" }}
            animate={{ clipPath: "inset(0 0 0 0%)" }}
            exit={{ clipPath: "inset(0 0 0 100%)" }}
            transition={{ duration: 0.45, ease: [0.65, 0, 0.35, 1] }}
            className="fixed inset-0 z-modal flex flex-col bg-ink-950 text-paper-100 lg:hidden"
          >
            <div className="screentone pointer-events-none absolute inset-0 opacity-[0.06]" />

            <div className="flex items-center justify-between border-b border-paper-100/20 px-5 py-3.5">
              <span className="font-sfx text-xs tracking-widest2 text-paper-100/70">
                CHAPTER INDEX
              </span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex h-9 w-9 items-center justify-center border-2 border-paper-100"
              >
                <motion.span
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 45 }}
                  className="relative block h-[2px] w-4 bg-paper-100 before:absolute before:h-[2px] before:w-4 before:rotate-90 before:bg-paper-100"
                />
              </button>
            </div>

            <motion.ul
              variants={listVariants}
              initial="hidden"
              animate="show"
              className="flex flex-1 flex-col justify-center gap-1 px-6"
            >
              {NAV_ITEMS.map((item) => {
                const isActive = activeId === item.id;
                return (
                  <motion.li key={item.id} variants={itemVariants} className="border-b border-paper-100/15 py-3">
                    <button
                      onClick={() => scrollTo(item.id)}
                      className="flex w-full items-center justify-between"
                    >
                      <span className="flex items-baseline gap-4">
                        <span className="font-sfx text-xs text-paper-100/50">
                          {item.chapter}
                        </span>
                        <span
                          className={`font-display text-4xl uppercase tracking-tight ${
                            isActive ? "text-paper-0" : "text-paper-100/80"
                          }`}
                        >
                          {item.label}
                        </span>
                      </span>
                      {isActive && (
                        <motion.span
                          layoutId="mobile-active-dot"
                          className="h-2 w-2 rounded-full bg-paper-0"
                        />
                      )}
                    </button>
                  </motion.li>
                );
              })}
            </motion.ul>

            <div className="flex items-center gap-3 border-t border-paper-100/20 px-6 py-6">
              <a
                href={SITE.gmailCompose}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Email"
                className="flex h-10 w-10 items-center justify-center border border-paper-100"
              >
                <Mail size={16} />
              </a>
              <button
                onClick={() => scrollTo("contact")}
                aria-label="Contact"
                className="flex h-10 w-10 items-center justify-center border border-paper-100"
              >
                <MessageCircle size={16} />
              </button>
              <a
                href={SITE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center border border-paper-100"
              >
                <Linkedin size={16} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
