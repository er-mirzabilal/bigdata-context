## Optimize the "Make enterprise data work at AI‑scale" background animation

Edit only the `#bc-neural` IIFE in `src/legacy/big-context.html` (lines ~693–767). No design or markup changes.

### Changes

1. **Pause when off-screen** — IntersectionObserver on `#get-started`; only `requestAnimationFrame` while `isIntersecting`. Cancel rAF and clear `trail` / `shoots` when hidden.
2. **Pause when tab hidden** — `visibilitychange` listener mirrors the same start/stop.
3. **Lower DPR cap** from 2 → 1.5 (≈45% fewer pixels to fill).
4. **Reduce star count** — density divisor 950 → 1600; cap 720 → 380 (220 on widths < 720).
5. **Drop per‑star `shadowBlur`** (Canvas2D's most expensive op) — replace with a cheap additive arc, drawn only when `s.flash > 0.25`. Big stars still twinkle but without the blur tax every frame.
6. **Cache the two background radial gradients** once in `size()` instead of recreating them per frame.
7. **Cap frame rate to ~60fps** — skip rAF tick if `dt < 1/60 - 2ms` (prevents 120Hz monitors from doubling the cost).
8. **Skip cursor trail block** entirely when the trail array is empty.

### Expected result

- Smooth scroll into and past the section.
- 0 CPU when the section is off-screen or the tab is hidden.
- Visually identical (slight DPR drop is imperceptible on the soft particle field; shadow glow on idle big stars is the only visible nuance and is replaced with an equivalent additive glow on flashing stars).

### Not changed

- Hero `#bc-particles` canvas and the atom/orbit animation. Same treatment can be applied if you want — say the word.
