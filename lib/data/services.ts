export type Service = {
  id: string;
  number: string;
  title: string;
  description: string;
};

export const SERVICES: Service[] = [
  {
    id: "video-editing",
    number: "01",
    title: "Video Editing",
    description:
      "Short-form videos, Reels, TikToks, YouTube Shorts and social media content.",
  },
  {
    id: "graphic-design",
    number: "02",
    title: "Graphic Design",
    description:
      "Social media creatives, advertisements, promotional graphics and branded visual content.",
  },
  {
    id: "thumbnail-design",
    number: "03",
    title: "Thumbnail Design",
    description: "YouTube thumbnails and attention-grabbing visual covers.",
  },
  {
    id: "social-content",
    number: "04",
    title: "Social Media Content",
    description: "Carousels, promotional posts and social media graphics.",
  },
  {
    id: "virtual-assistance",
    number: "05",
    title: "Virtual Assistance",
    description: "Creative and content-related virtual assistance.",
  },
];
