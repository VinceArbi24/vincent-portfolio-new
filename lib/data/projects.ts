// SELECTED WORK — video projects.
// Data-driven: add a new project by adding an object here, no component changes needed.
//
// `size` controls the panel's footprint in the asymmetric gallery grid:
//   "feature" -> large hero panel (spans 2 cols x 2 rows on desktop)
//   "wide"    -> spans 2 cols x 1 row
//   "tall"    -> spans 1 col x 2 rows
//   "regular" -> 1 col x 1 row
//
// `src` should point to a file under /public/projects/videos/
// `poster` is optional — a still shown before the video loads. If you
// don't have poster images, just omit it; the panel is already matted in
// black so there's no broken-image flash either way.
export type WorkProject = {
  id: string;
  title: string;
  category: string;
  client?: string;
  year: string;
  src: string;
  poster?: string;
  size: "feature" | "wide" | "tall" | "regular";
  note?: string; // small handwritten-style annotation
};

// Mapped to Vincent's actual export: podcast-1/2, real-estate-1/2,
// shorts-1/2, youtube-1 (all .mp4 — see /public/projects/videos/README.md).
// Titles/categories below are placeholders based on the filenames — edit
// freely to match the real client/project names.
export const WORK_PROJECTS: WorkProject[] = [
  {
    id: "podcast-1",
    title: "Podcast Clip 01",
    category: "Podcast",
    year: "2026",
    src: "/projects/videos/podcast-1.mp4",
    size: "feature",
  },
  {
    id: "real-estate-1",
    title: "Property Walkthrough 01",
    category: "Real Estate",
    year: "2026",
    src: "/projects/videos/real-estate-1.mp4",
    size: "wide",
  },
  {
    id: "shorts-1",
    title: "Short-form Edit 01",
    category: "Shorts",
    year: "2026",
    src: "/projects/videos/shorts-1.mp4",
    size: "tall",
  },
  {
    id: "youtube-1",
    title: "YouTube Highlight",
    category: "YouTube",
    year: "2026",
    src: "/projects/videos/youtube-1.mp4",
    size: "regular",
  },
  {
    id: "podcast-2",
    title: "Podcast Clip 02",
    category: "Podcast",
    year: "2026",
    src: "/projects/videos/podcast-2.mp4",
    size: "regular",
  },
  {
    id: "real-estate-2",
    title: "Property Walkthrough 02",
    category: "Real Estate",
    year: "2026",
    src: "/projects/videos/real-estate-2.mp4",
    size: "regular",
  },
  {
    id: "shorts-2",
    title: "Short-form Edit 02",
    category: "Shorts",
    year: "2026",
    src: "/projects/videos/shorts-2.mp4",
    size: "regular",
  },
];
