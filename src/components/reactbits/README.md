# React Bits components

These components are copied from [React Bits](https://github.com/DavidHDev/react-bits)
(MIT license, JS + CSS variants from `src/content/`). React Bits is meant to be
copied into projects and edited, so treat these files as our own code.

| Component | Used by |
| --- | --- |
| CountUp, Magnet, Masonry, Noise, ScrollReveal | Shared |
| ChromaGrid, DecryptedText, FlowingMenu, Radar, ScrollVelocity, SplitFlapText | Mission (design 01) |
| CircularGallery, LogoLoop, MaskedHeading, ScrollStack, SplitText | Aerospace (design 02) |
| BlurText, PillNav, RotatingText, SpotlightCard, Stack, TiltedCard, Topography | Familia (design 03) |

## Local edits

- `ScrollReveal`: added an `as` prop (it always rendered an `<h2>`), and replaced
  `aria-label` with a visually hidden copy of the text so paragraphs stay readable
  by screen readers.
- `BlurText`: added an `as` prop (it always rendered a `<p>`, which can't go
  inside a heading).

## Lint

They don't follow every React Compiler lint rule (they write "latest props" refs
during render, a common and safe pattern). `eslint.config.js` relaxes those rules
for this folder only.

Once a final design is picked, delete the components it doesn't use.
