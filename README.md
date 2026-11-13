# SHPE @ El Camino College Website

The website for the El Camino College chapter of the Society of Hispanic Professional Engineers. It's built with
React 19, React Router 8 and Vite 8, and deployed on Vercel.

New to the project? Start with the onboarding guide: [`docs/ONBOARDING.md`](docs/ONBOARDING.md).

## Quick start

Requires Node.js 22.22 or newer.

```bash
npm install
npm run dev      # local dev server at http://localhost:5173
npm run lint     # ESLint
npm run build    # production build into dist/
```

## Where things live

| To change...                         | Edit                                  |
| ------------------------------------ | ------------------------------------- |
| Menu items, social links, form links | `src/data/site.js`                    |
| Executive Cabinet / LeaderSHPE       | `src/data/leadership.js`              |
| Alumni                               | `src/data/alumni.js`                  |
| Gallery albums                       | `src/data/gallery.js`                 |
| Website Team cards                   | `src/data/websiteTeam.js`             |
| Page text (redesigns)                | `src/data/content.js`                 |
| Hero video / slideshow               | `src/data/media.js`                   |
| Page text (current design)           | `src/pages/*Page.jsx`                 |
| Styles (current design)              | `src/styles/app.css`                  |
| Images                               | `public/images/` (see below)          |

## Design previews

The site currently ships three redesign candidates plus the current design, switchable with the floating
**Design** control at the bottom of the page (or `Alt+Shift+1`–`4`). The choice is remembered, and a link can pick
one with `?design=mission`, `?design=aerospace`, `?design=familia` or `?design=classic`.

| Design        | Feel                                   | Code                       |
| ------------- | -------------------------------------- | -------------------------- |
| 01 Mission    | Dark, technical (Anduril, Mach)        | `src/designs/mission/`     |
| 02 Aerospace  | Cinematic, corporate (Northrop Grumman) | `src/designs/aerospace/`   |
| 03 Familia    | Bright, community-first (SHPE LMU)     | `src/designs/familia/`     |
| 00 Current    | The site before the redesign           | `src/designs/classic/`     |

All four read the people, links and gallery data in `src/data/`; the three redesigns also share their page text
through `src/data/content.js`. The registry, default design and
switcher toggle are in `src/designs/registry.js`. Animated components come from React Bits and are copied into
`src/components/reactbits/` (see its README). Once a design is chosen, point `src/App.jsx` at it and delete the rest.

### Images

```text
public/images/
├─ brand/         logos
├─ headshots/     one file per person, named first-last.jpg
├─ gallery/       one folder per event, named YYYY-term-event-name/
└─ placeholders/
```

Use lowercase, hyphenated file names, and resize photos before you add them. Gallery photos should be about 1600 px
on the long edge and headshots about 400 px. Vercel serves files case-sensitively, so `Photo.JPG` and `photo.jpg` are
different files there.
