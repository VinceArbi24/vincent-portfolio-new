// GRAPHIC DESIGN — categorized static work.
// Only real, provided files should be listed here.
// All files sit FLAT in /public/projects/graphic-design/ — no subfolders.
export type GraphicCategory =
  | "GRAPHIC DESIGN"
  | "THUMBNAILS"
  | "ADVERTISING"
  | "SOCIAL MEDIA"
  | "CAROUSELS";

export type GraphicItem = {
  id: string;
  title: string;
  category: GraphicCategory;
  src: string;
};

export const GRAPHIC_CATEGORIES: GraphicCategory[] = [
  "GRAPHIC DESIGN",
  "THUMBNAILS",
  "ADVERTISING",
  "SOCIAL MEDIA",
  "CAROUSELS",
];

// Mapped to Vincent's actual export: ad-1.png, thumbnail.png,
// carousel-1.png — all sitting flat in /public/projects/graphic-design/.
// "GRAPHIC DESIGN" and "SOCIAL MEDIA" have no files yet — their tabs
// will just show an empty state until you add some.
export const GRAPHIC_ITEMS: GraphicItem[] = [
  {
    id: "thumbnail-1",
    title: "YouTube Thumbnail",
    category: "THUMBNAILS",
    src: "/projects/graphic-design/thumbnail.png",
  },
  {
    id: "ad-1",
    title: "Ad Creative 01",
    category: "ADVERTISING",
    src: "/projects/graphic-design/ad-1.png",
  },
  {
    id: "carousel-1",
    title: "Carousel — Slide 01",
    category: "CAROUSELS",
    src: "/projects/graphic-design/carousel-1.png",
  },
];
