## Hero "Context Sphere" — Canvas 3D Animation

Replace the current static bloom/particles in the hero with a lightweight 3D rotating sphere of glowing nodes ("silos") connected by lavender wires that pulse — echoing the wires/pulses motif used elsewhere in `big-context.html`. Pure Canvas 2D with a hand-rolled 3D projection. No three.js, no new dependencies.

### Visual concept
- ~80–120 nodes distributed on a sphere via a Fibonacci lattice (even coverage, no clumping).
- Connect each node to its 2–3 nearest neighbors → a wireframe globe of "context" links.
- Slow auto-rotation around the Y axis (~one revolution / 40s) with a small X tilt.
- Subtle parallax: cursor position nudges rotation (±6°); scroll position pushes the sphere down/back so it feels anchored to the hero.
- Depth cues: nodes/wires further from the camera fade in opacity + shrink in size (true z-sorting), giving a real 3D feel without WebGL.
- Pulses: every ~1.2s a single lavender pulse travels along a random visible edge — same vocabulary as the figure pulses.
- A soft bloom (existing `.bc-bloom`) stays behind the sphere as the light source.

### Theme alignment
- Uses the existing palette: `--lavender` for wires/pulses, white-ish nodes, dark bg.
- Reinforces the metaphor of "connecting silos into one context layer" — the sphere literally *is* the big context.
- Sleek/modern: thin 1px wires, small node dots, generous negative space, slow motion.

### Where it lives
- Replaces `#bc-particles` canvas inside the hero in `src/legacy/big-context.html`. The bloom stays.
- Sphere sits centered behind the headline (`left:50%`, slightly lower than the eyebrow), sized ~min(620px, 70vw).

### Technical details
- Single `<canvas id="bc-sphere">` absolutely positioned in the hero, `pointer-events:none`.
- One `requestAnimationFrame` loop; DPR-aware (caps at 2).
- 3D math: rotate points with Y+X rotation matrices, project with simple perspective (`x' = x*f/(f-z)`).
- Edge list precomputed once (kNN). Pulses are just an animated `t∈[0,1]` along a chosen edge.
- Resize observer keeps it crisp on orientation change.
- **Performance guards (lightweight budget):**
  - Mobile (≤760px): node count drops to ~60, pulses every 2s, no cursor parallax.
  - `prefers-reduced-motion`: render one static frame, no rotation, no pulses.
  - `navigator.hardwareConcurrency < 4` or `navigator.deviceMemory < 4`: same as reduced motion (static frame).
  - Pauses via `IntersectionObserver` when hero scrolls out of view.
- Estimated added weight: ~4–5 KB of inline JS, zero deps.

### CSS adjustments
- `#bc-sphere { position:absolute; inset:0; width:100%; height:100%; pointer-events:none; opacity:.85; mix-blend-mode:screen; }`
- Keep `#bc-particles` removed or repurposed; bloom unchanged.
- Mobile: `opacity:.55` so headline stays crisp (matches the earlier mobile pass).

### Verification
- Desktop 1280–1920: sphere rotates smoothly behind headline, pulses visible, cursor parallax subtle.
- Mobile 390: sphere is smaller, dimmer, static-ish; no horizontal scroll; headline still primary.
- Reduced motion: single static frame, no animation.
- Confirm 60fps in DevTools perf panel; rest of page (wires, figure, marquee) untouched.

### Out of scope
- No three.js / WebGL.
- No changes to the figure section, wire bundles, or any other section.
- No new dependencies.
