"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MessageCircle, Linkedin } from "lucide-react";
import { NAV_ITEMS, SITE } from "@/lib/data/site";
import { useActiveSection } from "@/lib/hooks/useActiveSection";
import { useCursor } from "@/lib/context/CursorContext";

const ids = NAV_ITEMS.map((n) => n.id);

export default function Sidebar() {
  const activeId = useActiveSection(ids);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const { setCursor, resetCursor } = useCursor();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <aside className="fixed left-0 top-0 z-nav hidden h-screen w-[var(--sidebar-w)] flex-col border-r-2 border-ink-950 bg-paper-100 lg:flex">
      {/* Header / signature */}
      <div className="panel-corners relative m-5 mb-2 border-2 border-ink-950 px-5 py-6">
        <p className="font-sfx text-[11px] tracking-widest2 text-ink-700">
          PORTFOLIO VOL. 01
        </p>
        <h1 className="mt-2 font-display text-3xl uppercase leading-[0.95] tracking-tight text-ink-950">
          Vincent
          <br />
          Arbitrario
        </h1>
        <p className="mt-3 border-t border-line-300 pt-3 font-sans text-[11px] uppercase tracking-widest text-fog-600">
          {SITE.role}
        </p>
      </div>

      {/* Nav list */}
      <nav className="relative flex-1 overflow-y-auto px-5 py-6">
        <ul className="relative flex flex-col">
          {NAV_ITEMS.map((item) => {
            const isActive = activeId === item.id;
            const isHovered = hoveredId === item.id;
            return (
              <li key={item.id} className="relative">
                <button
                  onClick={() => scrollTo(item.id)}
                  onMouseEnter={() => {
                    setHoveredId(item.id);
                    setCursor("link", "GO");
                  }}
                  onMouseLeave={() => {
                    setHoveredId(null);
                    resetCursor();
                  }}
                  className="group relative flex w-full items-center gap-3 py-3.5 text-left"
                >
                  {isActive && (
                    <motion.span
                      layoutId="sidebar-active-ink"
                      className="absolute -left-5 h-full w-1 bg-ink-950"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}

                  <span
                    className={`font-sfx text-[11px] tabular-nums transition-colors duration-200 ${
                      isActive ? "text-ink-950" : "text-fog-500"
                    }`}
                  >
                    {item.chapter}
                  </span>

                  <span className="relative flex-1 overflow-hidden">
                    <motion.span
                      animate={{ x: isHovered || isActive ? 6 : 0 }}
                      transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
                      className={`block font-display text-lg uppercase tracking-tight transition-colors duration-200 ${
                        isActive ? "text-ink-950" : "text-ink-700 group-hover:text-ink-950"
                      }`}
                    >
                      {item.label}
                    </motion.span>
                    {/* hand-drawn underline that draws in on hover */}
                    <motion.span
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: isHovered ? 1 : 0 }}
                      transition={{ duration: 0.3, ease: [0.65, 0, 0.35, 1] }}
                      style={{ transformOrigin: "left" }}
                      className="absolute -bottom-0.5 left-0 h-[2px] w-full bg-ink-950"
                    />
                  </span>

                  <motion.span
                    animate={{
                      opacity: isHovered || isActive ? 1 : 0,
                      x: isHovered || isActive ? 0 : -6,
                    }}
                    transition={{ duration: 0.2 }}
                    className="font-sfx text-xs text-ink-950"
                  >
                    →
                  </motion.span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer / socials */}
      <div className="m-5 mt-2 border-t-2 border-ink-950 pt-4">
        <p className="mb-3 font-sfx text-[10px] tracking-widest2 text-fog-600">
          FIND ME
        </p>
        <div className="flex items-center gap-3">
          <a
            href={SITE.gmailCompose}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Email Vincent"
            onMouseEnter={() => setCursor("link", "MAIL")}
            onMouseLeave={resetCursor}
            className="flex h-9 w-9 items-center justify-center border border-ink-950 text-ink-950 transition-colors hover:bg-ink-950 hover:text-paper-100"
          >
            <Mail size={15} />
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              scrollTo("contact");
            }}
            aria-label="WhatsApp contact"
            onMouseEnter={() => setCursor("link", "CHAT")}
            onMouseLeave={resetCursor}
            className="flex h-9 w-9 items-center justify-center border border-ink-950 text-ink-950 transition-colors hover:bg-ink-950 hover:text-paper-100"
          >
            <MessageCircle size={15} />
          </a>
          <a
            href={SITE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            onMouseEnter={() => setCursor("link", "IN")}
            onMouseLeave={resetCursor}
            className="flex h-9 w-9 items-center justify-center border border-ink-950 text-ink-950 transition-colors hover:bg-ink-950 hover:text-paper-100"
          >
            <Linkedin size={15} />
          </a>
        </div>
        <p className="mt-4 font-sfx text-[10px] tracking-widest2 text-fog-500">
          © {SITE.year}
        </p>
      </div>
    </aside>
  );
}
