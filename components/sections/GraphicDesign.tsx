"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ImageOff } from "lucide-react";
import SectionFrame from "@/components/ui/SectionFrame";
import ImageStage from "@/components/ui/ImageStage";
import {
  GRAPHIC_CATEGORIES,
  GRAPHIC_ITEMS,
  type GraphicCategory,
} from "@/lib/data/graphicDesign";
import { useCursor } from "@/lib/context/CursorContext";

const ALL = "ALL" as const;

export default function GraphicDesign() {
  const [filter, setFilter] = useState<GraphicCategory | typeof ALL>(ALL);
  const [failed, setFailed] = useState<Record<string, boolean>>({});
  const [stageIndex, setStageIndex] = useState<number | null>(null);
  const { setCursor, resetCursor } = useCursor();

  const items = useMemo(
    () =>
      filter === ALL
        ? GRAPHIC_ITEMS
        : GRAPHIC_ITEMS.filter((i) => i.category === filter),
    [filter]
  );

  const tabs: (GraphicCategory | typeof ALL)[] = [ALL, ...GRAPHIC_CATEGORIES];

  return (
    <SectionFrame
      id="graphics"
      frame="04"
      total="09"
      eyebrow="CHAPTER 04 — GRAPHIC DESIGN"
      title="Graphic Design"
      kicker="thumbnails, ads, carousels &amp; social creative — sorted like a tankōbon index."
    >
      {/* Category tabs, styled like spine index tabs */}
      <div className="mb-10 flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`relative border-2 px-4 py-2 font-sfx text-[11px] tracking-widest2 transition-colors duration-200 ${
              filter === tab
                ? "border-ink-950 bg-ink-950 text-paper-100"
                : "border-ink-950 bg-transparent text-ink-950 hover:bg-line-200"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {items.length === 0 ? (
        <p className="font-hand text-2xl text-fog-600">
          no files in this category yet — add some to /public/projects/graphic-design/
        </p>
      ) : (
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
          <AnimatePresence mode="popLayout">
            {items.map((item, i) => (
              <motion.button
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
                onMouseEnter={() => setCursor("frame", "VIEW")}
                onMouseLeave={resetCursor}
                onClick={() => setStageIndex(i)}
                className="panel-corners group relative mb-5 block w-full break-inside-avoid border-2 border-ink-950 bg-ink-950 text-left text-paper-100"
              >
                {!failed[item.id] ? (
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    onError={() =>
                      setFailed((prev) => ({ ...prev, [item.id]: true }))
                    }
                    loading="lazy"
                  />
                ) : (
                  <div className="flex aspect-[4/5] w-full flex-col items-center justify-center gap-2 p-4 text-center text-paper-100/50">
                    <ImageOff size={22} />
                    <span className="font-hand text-lg text-paper-100/50">
                      missing file — add it at
                    </span>
                    <span className="font-sans text-xs text-paper-100/40">
                      {item.src}
                    </span>
                  </div>
                )}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-ink-950/90 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div>
                    <p className="font-sfx text-[9px] tracking-widest2 text-paper-100/70">
                      {item.category}
                    </p>
                    <p className="font-display text-base uppercase text-paper-0">
                      {item.title}
                    </p>
                  </div>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      )}

      <ImageStage
        images={items.map((i) => ({
          id: i.id,
          title: i.title,
          subtitle: i.category,
          src: i.src,
        }))}
        index={stageIndex}
        onClose={() => setStageIndex(null)}
        onNavigate={setStageIndex}
      />
    </SectionFrame>
  );
}
