# Intro background video

Add your opening background video here as:

```
intro-background.mp4
```

This plays behind the "VINCENT ARBITRARIO" opening splash, muted and
looping. It's automatically dimmed to 20% opacity in code
(`components/layout/PageIntro.tsx`), so upload your clip at normal
brightness — don't pre-darken it yourself, or it'll end up too dim.

A few practical notes:

- Since it's muted + autoplay, browsers require it to be **silent** (or at
  least start muted) — the code already sets `muted`, so this works
  regardless of the source audio, but it's best to use a version with no
  audio track to keep the file smaller.
- Keep it short and loop-friendly (a few seconds, first/last frame close
  in composition) since it repeats continuously while the intro is on
  screen.
- Keep the file size light (a few MB) — this is the very first thing that
  loads on the site.
- Until this file exists, the intro simply shows the plain black
  background with the typography animating on top, exactly as before —
  nothing breaks.
