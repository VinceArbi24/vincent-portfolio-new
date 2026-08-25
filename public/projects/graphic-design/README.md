# Graphic Design work

Files sit **flat** in this folder — no subfolders. List each one in
`/lib/data/graphicDesign.ts` (`GRAPHIC_ITEMS`).

## What's wired up right now

```
graphic-design/
├── thumbnail.png     → category: "THUMBNAILS"
├── ad-1.png           → category: "ADVERTISING"
└── carousel-1.png     → category: "CAROUSELS"
```

Drop those three files directly in this folder (not in subfolders) and
they'll appear on the site immediately.

## Categories with nothing yet

"GRAPHIC DESIGN" (general) and "SOCIAL MEDIA" have no files listed yet —
their filter tabs will simply show an empty state until you add some.
When you have files for them, add them here too (still flat, e.g.
`gd-01.jpg`, `social-01.jpg`) and add a matching entry to `GRAPHIC_ITEMS`
in `/lib/data/graphicDesign.ts`.

Only files listed in that array show up — nothing appears by accident.
Add as many per category as you like; the masonry grid and filter tabs
handle any number automatically. Click any image on the site to open it
full-screen and browse between items in that filtered view.
