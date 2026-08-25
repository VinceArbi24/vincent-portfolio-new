// SHOP LISTING — e-commerce / Amazon listing graphics.
// Images keep their original aspect ratio; do not force-crop in the UI.
export type ShopItem = {
  id: string;
  title: string;
  brief: string;
  src: string;
  width: number; // intrinsic px, used to preserve aspect ratio
  height: number;
};

// Mapped to Vincent's actual export: amazon-1.png, amazon-2.png,
// amazon-3.png (the "ARBI SERUM" listing) — see
// /public/projects/shop-listing/README.md.
//
// NOTE: width/height below are placeholder guesses. Update them to match
// your real image dimensions (in pixels) so each panel frames correctly
// instead of cropping or letterboxing.
export const SHOP_ITEMS: ShopItem[] = [
  {
    id: "amazon-1",
    title: "Amazon Listing 01",
    brief: "Add a short description of this listing graphic here.",
    src: "/projects/shop-listing/amazon-1.png",
    width: 1600,
    height: 1600,
  },
  {
    id: "amazon-2",
    title: "Amazon Listing 02",
    brief: "Add a short description of this listing graphic here.",
    src: "/projects/shop-listing/amazon-2.png",
    width: 1600,
    height: 1600,
  },
  {
    id: "amazon-3",
    title: "ARBI Serum — Feature Graphic",
    brief: "Product feature panel for the ARBI Serum listing.",
    src: "/projects/shop-listing/amazon-3.png",
    width: 1600,
    height: 1600,
  },
];
