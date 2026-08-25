"use client";

import { SITE } from "@/lib/data/site";
import { useCursor } from "@/lib/context/CursorContext";

export default function Footer() {
  const { setCursor, resetCursor } = useCursor();
  const linkProps = (label: string) => ({
    onMouseEnter: () => setCursor("link", label),
    onMouseLeave: resetCursor,
  });

  return (
    <footer className="border-t-2 border-ink-950 bg-paper-100 px-6 py-10 sm:px-10 lg:pl-[calc(var(--sidebar-w)+2.5rem)] lg:pr-16">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-display text-2xl uppercase tracking-tight text-ink-950">
            {SITE.name}
          </p>
          <p className="mt-1 font-sfx text-[10px] tracking-widest2 text-fog-600">
            {SITE.role.toUpperCase()}
          </p>
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-2 font-sans text-sm text-ink-700">
          <a href={SITE.gmailCompose} target="_blank" rel="noopener noreferrer" className="hover:text-ink-950" {...linkProps("MAIL")}>
            Gmail
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="hover:text-ink-950"
            {...linkProps("CHAT")}
          >
            WhatsApp
          </a>
          <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-ink-950" {...linkProps("IN")}>
            LinkedIn
          </a>
        </div>

        <p className="font-sfx text-[10px] tracking-widest2 text-fog-500">
          © {SITE.year} {SITE.name}
        </p>
      </div>
    </footer>
  );
}
