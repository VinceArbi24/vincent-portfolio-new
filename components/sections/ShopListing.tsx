"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ImageOff } from "lucide-react";
import SectionFrame from "@/components/ui/SectionFrame";
import ImageStage from "@/components/ui/ImageStage";
import { SHOP_ITEMS } from "@/lib/data/shop";
import { useCursor } from "@/lib/context/CursorContext";

export default function ShopListing() {
  const trackRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const [failed, setFailed] = useState<Record<string, boolean>>({});
  const [stageIndex, setStageIndex] = useState<number | null>(null);
  const { setCursor, resetCursor } = useCursor();

  // Geometry-based active-index tracking. This avoids IntersectionObserver
  // race conditions during smooth-scroll animations, which could make the
  // "previous" arrow appear to do nothing.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let raf = 0;
    const updateActive = () => {
      const items = itemRefs.current;
      if (!items.length) return;
      const center = track.scrollLeft + track.clientWidth / 2;
      let closest = 0;
      let closestDist = Infinity;
      items.forEach((el, i) => {
        if (!el) return;
        const elCenter = el.offsetLeft + el.offsetWidth / 2;
        const dist = Math.abs(elCenter - center);
        if (dist < closestDist) {
          closestDist = dist;
          closest = i;
        }
      });
      setActive(closest);
    };

    const onScroll = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(updateActive);
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    updateActive();

    return () => {
      track.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const goTo = (i: number) => {
    const clamped = Math.max(0, Math.min(SHOP_ITEMS.length - 1, i));
    itemRefs.current[clamped]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  };

  return (
    <SectionFrame
      id="shop"
      frame="03"
      total="09"
      eyebrow="CHAPTER 03 — SHOP LISTING"
      title="Shop Listing"
      kicker="Amazon &amp; e-commerce listing graphics, shown true to their original frame."
    >
      <div className="relative">
        <div
          ref={trackRef}
          className="scrollbar-none -mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-6 sm:-mx-10 sm:px-10 lg:-mx-16 lg:px-16"
          style={{ scrollbarWidth: "none" }}
        >
          {SHOP_ITEMS.map((item, i) => (
            <div
              key={item.id}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              onMouseEnter={() => setCursor("frame", "VIEW")}
              onMouseLeave={resetCursor}
              onClick={() => setStageIndex(i)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter") setStageIndex(i);
              }}
              className="panel-corners relative flex w-[82vw] flex-none cursor-pointer snap-center flex-col border-2 border-ink-950 bg-paper-0 sm:w-[58vw] lg:w-[42vw]"
            >
              <div
                className="w-full bg-ink-950"
                style={{ aspectRatio: `${item.width} / ${item.height}` }}
              >
                {!failed[item.id] ? (
                  <img
                    src={item.src}
                    alt={item.title}
                    className="h-full w-full object-cover"
                    onError={() =>
                      setFailed((prev) => ({ ...prev, [item.id]: true }))
                    }
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-2 p-4 text-center text-paper-100/50">
                    <ImageOff size={22} />
                    <span className="font-hand text-lg text-paper-100/50">
                      missing file — add it at{" "}
                      <span className="font-sans text-xs">{item.src}</span>
                    </span>
                  </div>
                )}
              </div>
              <div className="flex items-center justify-between gap-3 border-t-2 border-ink-950 p-4">
                <div>
                  <p className="font-display text-lg uppercase leading-tight tracking-tight text-ink-950">
                    {item.title}
                  </p>
                  <p className="mt-1 font-sans text-sm text-fog-600">{item.brief}</p>
                </div>
                <span className="flex-none font-sfx text-xs tracking-widest2 text-ink-700">
                  {String(i + 1).padStart(2, "0")} / {String(SHOP_ITEMS.length).padStart(2, "0")}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Side arrows, floating over the gallery */}
        <button
          onClick={() => goTo(active - 1)}
          disabled={active === 0}
          aria-label="Previous"
          className="absolute left-1 top-[38%] z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border-2 border-ink-950 bg-paper-0/90 text-ink-950 shadow-panel backdrop-blur-sm transition-all hover:bg-ink-950 hover:text-paper-100 disabled:pointer-events-none disabled:opacity-30 sm:left-3"
        >
          <ArrowLeft size={17} />
        </button>
        <button
          onClick={() => goTo(active + 1)}
          disabled={active === SHOP_ITEMS.length - 1}
          aria-label="Next"
          className="absolute right-1 top-[38%] z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border-2 border-ink-950 bg-paper-0/90 text-ink-950 shadow-panel backdrop-blur-sm transition-all hover:bg-ink-950 hover:text-paper-100 disabled:pointer-events-none disabled:opacity-30 sm:right-3"
        >
          <ArrowRight size={17} />
        </button>

        {/* Pagination dots */}
        <div className="mt-6 flex justify-center gap-2">
          {SHOP_ITEMS.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 transition-all duration-300 ${
                active === i ? "w-8 bg-ink-950" : "w-3 bg-line-400"
              }`}
            />
          ))}
        </div>
      </div>

      <ImageStage
        images={SHOP_ITEMS.map((i) => ({
          id: i.id,
          title: i.title,
          subtitle: i.brief,
          src: i.src,
        }))}
        index={stageIndex}
        onClose={() => setStageIndex(null)}
        onNavigate={setStageIndex}
      />
    </SectionFrame>
  );
}
