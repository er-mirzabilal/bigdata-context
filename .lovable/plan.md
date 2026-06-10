# Improve the "Evolution" Card on Mobile (Stage 02)

Two targeted improvements to the Pragmatic Context Layer card on small screens, cutting height and adding kinetic energy to the climax stage.

## 1. Two-column checklist

- On mobile (max-width: 880px), switch the five `.cl-feats li` items from a single vertical stack to a 2-column CSS grid with short labels left-aligned.
- Shrink the check-circle icon to 14×14 and reduce gap for a dense, scannable layout.
- Roughly halves the list section from ~5 rows to ~3 rows.

## 2. Animated network glyph

- The four-node diamond glyph inside `.cl-core-chip` gets a subtle living treatment on mobile:
  - Nodes pulse scale/fade with staggered timing to feel like active signal.
  - Connection lines draw-on via a repeating dash-offset animation.
- Uses an inline `<style>` scoped to `@media (max-width:880px)` so desktop remains static.
- Respects `prefers-reduced-motion`.

## Scope

- Changes are isolated to the `.cl-core` card and `.cl-feats` list styles under the existing 880px and 520px breakpoints in `src/legacy/big-context.html`.
- Desktop layout untouched.

## Verification

- Preview at 390px: checklist is two-column, glyph pulses subtly.
- Desktop at 1280px: static glyph, single-column checklist, no visual change.