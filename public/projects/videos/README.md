# Selected Work — videos

Drop your 7 clips in here, named to match `/lib/data/projects.ts`:

| File                | Currently titled           | Category     |
|-----------------------|------------------------------|----------------|
| `podcast-1.mp4`       | Podcast Clip 01               | Podcast        |
| `podcast-2.mp4`       | Podcast Clip 02               | Podcast        |
| `real-estate-1.mp4`   | Property Walkthrough 01       | Real Estate    |
| `real-estate-2.mp4`   | Property Walkthrough 02       | Real Estate    |
| `shorts-1.mp4`        | Short-form Edit 01            | Shorts         |
| `shorts-2.mp4`        | Short-form Edit 02            | Shorts         |
| `youtube-1.mp4`       | YouTube Highlight             | YouTube        |

The titles/categories above are placeholders guessed from the filenames —
open `/lib/data/projects.ts` and rename them to the real project/client
names whenever you're ready. No poster images are required (the field is
optional); the panel is already matted in black so nothing looks broken
while the video loads.

## Adding / removing / reordering projects

Everything is data-driven — you don't need to touch any component. Open
`/lib/data/projects.ts` and edit the `WORK_PROJECTS` array:

- `title`, `category`, `client`, `year` — shown on the panel and in the modal.
- `src` — path into this folder. `poster` is optional.
- `size` — controls how big the panel is in the gallery grid:
  `"feature"` (large), `"wide"`, `"tall"`, or `"regular"`.
- `note` — optional small handwritten annotation (e.g. "client favorite").

Videos should ideally be vertical (9:16) — they're displayed inside a
landscape frame without cropping or stretching. Keep file sizes reasonable
(compress to ~5–15MB) since previews autoplay when scrolled into view.
