# Vincent Arbitrario — Portfolio

A black & white, manga/editorial-styled portfolio site built with
**Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and
**Framer Motion**.

---

## 1. Getting started

You'll need [Node.js](https://nodejs.org) 18.18+ installed.

```bash
# install dependencies
npm install

# run the local dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The page hot-reloads
as you edit files.

```bash
# production build (also type-checks + lints)
npm run build

# run the production build locally
npm start
```

### Deploying

This is a standard Next.js app, so it deploys as-is to
[Vercel](https://vercel.com) (recommended, zero config — just import the
repo), Netlify, or any Node host. No environment variables are required.

> **Note on fonts:** the site loads Anton, Inter, Reggae One, and Caveat
> via `next/font/google`, which fetches and self-hosts them at build
> time. This requires internet access during `npm run build` — normal on
> your machine, Vercel, or any standard CI/deploy environment.

---

## 2. Adding your real content

Almost nothing is hardcoded into components — everything lives in
`/lib/data/` and `/public/`. To go from placeholder to real site:

| What | Edit | Also drop files in |
|---|---|---|
| Portrait photo | — | `public/images/profile/` |
| Selected Work videos | `lib/data/projects.ts` | `public/projects/videos/` |
| Shop Listing images | `lib/data/shop.ts` | `public/projects/shop-listing/` |
| Graphic Design work | `lib/data/graphicDesign.ts` | `public/projects/graphic-design/` |
| Services | `lib/data/services.ts` | — |
| Experience | `lib/data/experience.ts` | — |
| Reviews | `lib/data/reviews.ts` | — |
| Nav items, contact details | `lib/data/site.ts` | — |

Each `public/projects/**` folder has its own `README.md` with the exact
filenames the sample data expects. Add a new project/review/service by
adding a new object to the relevant array — no component code needs to
change. Every data file is fully typed, so TypeScript will flag anything
you get wrong.

Until real media is added, the site still renders correctly: missing
photos fall back to a labeled ink placeholder panel instead of a broken
image icon.

---

## 3. Project structure

```
app/
  layout.tsx         Root layout — fonts, global providers
  page.tsx            Assembles the whole single-page site
  globals.css         Design tokens, manga texture utilities
  icon.svg             Favicon

components/
  layout/              Sidebar, mobile menu, custom cursor, intro, footer
  sections/            Hero, WorkGallery, ShopListing, GraphicDesign,
                        About, Services, Experience, Reviews, Contact
  ui/                   Reusable pieces — SectionFrame, VideoCard,
                         ProjectModal, MangaButton, Toast, SFX

lib/
  data/                 All editable content (see table above)
  hooks/                 useActiveSection (scroll-spy), useMediaQuery
  context/               CursorContext (drives the custom cursor)

public/
  images/profile/        Portrait photo goes here
  projects/               Videos, shop listing, and graphic design assets
```

---

## 4. Design system notes

- **Strictly monochrome UI** — colors live only in `tailwind.config.ts`
  as `ink`, `paper`, `fog`, and `line` shades. Portfolio media (photos,
  videos) keeps its natural color; only the interface chrome is B&W.
- **Fonts**: `Anton` (display/editorial headlines), `Inter` (body/UI),
  `Reggae One` (SFX / chapter labels / small punchy tags), `Caveat`
  (handwritten annotations).
- **The sidebar (desktop) / panel menu (mobile)** is the primary nav —
  there's no top navbar. Section order and labels are controlled by
  `NAV_ITEMS` in `lib/data/site.ts`.
- **Frame numbering**: every section is wrapped in `<SectionFrame>`,
  which renders the "FRAME 0X / 09" folio tag and corner ticks — this is
  the running visual motif tying the whole page together as one
  continuous manga volume. If you add or remove a whole section, update
  the `frame` / `total` props passed to each `<SectionFrame>` instance.
- **Custom cursor** only activates on fine-pointer (mouse) devices; it's
  automatically disabled on touch.
- **Reduced motion**: a `prefers-reduced-motion` media query in
  `globals.css` shortens/removes animations for users who request it.

---

## 5. Contact details

Sourced from `lib/data/site.ts` — update this file if any contact info
changes:

- **Email**: vince.arbi@gmail.com (Gmail-compose button + mailto fallback)
- **WhatsApp**: +639 950378736 (copy-to-clipboard button, not an auto-open link)
- **LinkedIn**: linkedin.com/in/vincent-arbitrario-54aa09380
