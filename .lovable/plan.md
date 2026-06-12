## Hero "Silos → Context Column" — Atmospheric 3D Convergence

Replace the current rotating sphere in the hero with a looping 3D animation that dramatizes Big Context's core promise — fragmented data silos converging into a single luminous "context" column — but rendered atmospherically, not as a literal infographic. Pure Canvas 2D with a hand-rolled 3D projection. No new dependencies.

### Visual concept (one ~14s loop)
1. **Scatter (0–3s)** — ~28 translucent "silo" shards (small upright 3D rectangles, each a thin stack of horizontal lines suggesting tabular data) appear scattered across a wide 3D volume behind the headline, drifting slowly with subtle individual rotation. Each shard glows faintly in lavender at its edges.
2. **Drift inward (3–8s)** — shards begin a slow, eased migration toward the vertical center axis. As they get closer they shed faint particle trails (lavender pulses) that streak along their path.
3. **Converge (8–11s)** — shards collapse into a tall vertical column of light at center: a soft lavender-to-white gradient beam ~30% viewport-height tall, with a bright core and feathered edges. Trails compress into the beam.
4. **Hold + breathe (11–13s)** — the column gently pulses (breath), occasional vertical light streaks travel up the beam (echoing the wires/pulses motif used elsewhere in the page).
5. **Dissolve (13–14s)** — column softly disperses back into scattered shards; loop seamlessly.

Atmospheric, not literal: shards are abstract geometric forms, no labels, no arrows. Reads as "scattered → unified light" mood.

### Theme alignment
- Reuses the existing palette: `--lavender`, `--bloom-1/2`, paper-white core. Bloom stays as the ambient light source behind the beam.
- The vertical light column visually rhymes with the wire/pulse vocabulary used throughout `big-context.html` (bundles, pulses, neural canvas).
- Subliminally communicates BCOS's value prop without being a diagram.

### Where it lives
- Same `<canvas id="bc-sphere">` element in the hero (rename internally to keep CSS hooks). Bloom unchanged. Headline/eyebrow/CTA layer on top untouched.
- Sized to fill the hero, but visual mass concentrated in the central ~40% width so the headline still dominates.

### Technical details
- Single canvas, one rAF loop, DPR-capped at 2.
- Each shard: position (x,y,z), velocity, rotation, target lane on the column. Drawn as 4–6 stacked horizontal strokes inside a projected quad → reads as "data slab" without being literal.
- 3D: simple perspective projection (`s = F/(F-z)`), z-sort shards back-to-front each frame for correct overlap.
- Column: vertical gradient + additive radial glow + 2–3 traveling pulse highlights (sin-wave along height).
- Trails: short particle arrays per shard, faded over ~0.6s.
- Loop driver: single normalized `t∈[0,1]` over 14s, with named phase functions (scatter / converge / hold / dissolve).
- Subtle cursor parallax (±5° tilt of the whole scene) on desktop only.
- **Performance & a11y guards:**
  - Mobile (≤760px): shard count drops to ~16, no cursor parallax, opacity .5.
  - `prefers-reduced-motion`: render a single static "held" frame (column + faint surrounding shards), no motion, no pulses.
  - `navigator.hardwareConcurrency < 4` or `deviceMemory < 4`: same static frame.
  - `IntersectionObserver` pauses the loop when hero scrolls out of view.
- Estimated weight: ~5–6 KB inline JS, zero deps.

### CSS adjustments
- Keep `#bc-sphere` styles (position, blend, opacity). No new selectors needed.
- Bloom kept; possibly nudge `--bloom` opacity slightly during the "converge" phase via the canvas itself (no CSS change required).

### Files touched
- `src/legacy/big-context.html` only — replace the existing sphere IIFE (the one added last turn) with the new convergence renderer. CSS and markup stay as-is.

### Verification
- Desktop 1280–1920: loop runs smoothly at 60fps; column is centered, headline remains the focal point.
- Mobile 390 / 768: fewer shards, dimmer, no parallax; no horizontal overflow.
- Reduced motion: static held frame, no animation.
- Confirm no regressions in the figure section, wire bundles, marquee, or any other section.

### Out of scope
- No three.js / WebGL, no new dependencies.
- No changes to any other section.
- No copy/headline changes.
