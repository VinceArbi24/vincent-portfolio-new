export type NavItem = {
  id: string;
  chapter: string; // e.g. "01"
  label: string;
  sfx?: string; // small hover sound-effect word
};

export const NAV_ITEMS: NavItem[] = [
  { id: "work", chapter: "01", label: "WORK", sfx: "SHNK" },
  { id: "shop", chapter: "02", label: "SHOP", sfx: "POP" },
  { id: "graphics", chapter: "03", label: "GRAPHICS", sfx: "SWISH" },
  { id: "about", chapter: "04", label: "ABOUT", sfx: "HEY" },
  { id: "services", chapter: "05", label: "SERVICES", sfx: "ZAP" },
  { id: "experience", chapter: "06", label: "EXPERIENCE", sfx: "RUN" },
  { id: "reviews", chapter: "07", label: "REVIEWS", sfx: "OOH" },
  { id: "contact", chapter: "08", label: "CONTACT", sfx: "PING" },
];

export const SITE = {
  name: "Vincent Arbitrario",
  role: "Graphic Designer / Video Editor",
  tagline:
    "Hi, I'm Vincent, a graphic designer and video editor focused on creating engaging visual content, short-form videos, social media creatives, advertisements, thumbnails, and branded content.",
  email: "vince.arbi@gmail.com",
  whatsapp: "+63 995 037 8736",
  whatsappRaw: "639950378736",
  linkedin: "https://www.linkedin.com/in/vincent-arbitrario-54aa09380",
  gmailCompose:
    "https://mail.google.com/mail/?view=cm&fs=1&to=vince.arbi@gmail.com",
  mailto: "mailto:vince.arbi@gmail.com",
  year: 2026,
};
