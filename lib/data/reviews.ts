export type Review = {
  id: string;
  quote: string;
  tag: string; // e.g. "Video Editing"
};

export const REVIEWS: Review[] = [
  {
    id: "r1",
    quote:
      "Vincent understood exactly what I was looking for and delivered clean, engaging edits. He was easy to communicate with and very open to feedback.",
    tag: "Video Editing",
  },
  {
    id: "r2",
    quote:
      "The edits were creative, well-paced, and fit the style I wanted. Vincent paid attention to the small details and made the content feel much more polished.",
    tag: "Short-form Content",
  },
  {
    id: "r3",
    quote:
      "Vincent was reliable, responsive, and easy to work with. He took feedback seriously and consistently improved the work.",
    tag: "Creative Services",
  },
  {
    id: "r4",
    quote:
      "I really liked how Vincent handled the visual direction. The final designs were clean, professional, and captured the idea I had in mind.",
    tag: "Graphic Design",
  },
  {
    id: "r5",
    quote:
      "Working with Vincent was a smooth experience. He understood the brief, communicated clearly, and delivered quality work.",
    tag: "Video Editing & Design",
  },
];
