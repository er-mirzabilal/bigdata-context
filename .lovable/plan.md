# Mobile UI/UX Improvement Pass — Home Page

A section-by-section polish pass applied only within the mobile breakpoint (≤880px / ≤640px where noted). Desktop stays pixel-identical.

## 1. Hero
- Tighten vertical rhythm: reduce the dead space between the CTA group and the "Scroll" cue.
- Stack CTAs with clear hierarchy — primary button full-width, secondary links smaller beneath it.
- Lower the particle constellation opacity behind text (or shift it) so the headline stays crisp.

## 2. Thesis / 01
- Promote the closing line ("We build the context layer…") from footnote-style to a visually distinct pull-quote block (left accent border, larger type).
- Trim/split long paragraphs to shorter mobile line counts with slightly increased line-height.

## 3. First Figure (silo chips)
- Reduce silo pill chip font-size and gaps on mobile so the chip cloud reads as compact tags, not a wall.
- Cap chips per card if needed with a "+N more" style overflow chip.

## 4. Ecosystem / 02
- Add edge fade masks (CSS mask gradients) on the logo marquee so logos don't clip abruptly.
- Normalize logo sizing/brightness so none render dim or tiny.
- Add a short eyebrow + one-line intro above the logos for context.

## 5. Pragmatics / 03
- Enlarge "SEE OPS RESOURCES →" into a proper tappable link/button (≥44px touch target).
- Break the three dense paragraphs into 2 shorter ones + a key-point list.

## 6. What We Do / 04
- Shrink the orbit visual to ~40% of viewport height on mobile and add small labels to the orbit nodes.
- Give tier cards visible touch affordance: chevron, pressed/active state, full-card tap area.

## 7. Our Advantage / 05
- Replace stacked plain-text stats (500+ / 40+ / 98%+) with compact stat cards in a 3-up row (or 1×3 stack with tight height).
- Add a count-up animation on scroll-into-view, disabled under `prefers-reduced-motion`.

## 8. Legacy vs BCOS + 12 Failure Modes
- Collapse the 12 failure-mode cards: show the first 4, with a "Show all 12" expander button (animated reveal).
- Improve Legacy/BCOS toggle affordance: clearer active state, larger tap targets, subtle press feedback.

## 9. Resources / 06
- Make the entire resource card the tap target (stretched link) with an active/pressed state.

## 10. Final CTA + Footer
- Fix layout shift from the word-flip headline by reserving width (fixed min-width on the flipping span sized to the longest word).

## Global
- Add `scroll-margin-top` to all anchor target sections so the sticky nav doesn't cover headings.
- Collapse/shrink the sticky nav on scroll-down, reveal on scroll-up (mobile only).

## Technical details
- All changes live in `src/legacy/big-context.html` (CSS inside the existing `@media (max-width:880px)` block plus small markup tweaks; the expander, count-up, and nav-collapse use small vanilla JS appended to the existing script blocks).
- All new animations respect `prefers-reduced-motion`, consistent with the accessibility pass already done on the first figure.
- No desktop rules touched; every override is scoped inside mobile media queries.

## Verification
- Preview at 390px: walk every section top-to-bottom, confirm no horizontal overflow, tap targets ≥44px, expander and count-up work.
- Preview at 1280–1920px: confirm desktop is unchanged.
- Toggle reduced motion: count-up, expander animation, and word-flip all degrade to static.

## Suggested order (if done in phases)
1. Sections 8 + 7 (biggest vertical-space wins)
2. Sections 4 + 6 (visual clarity)
3. Sections 1, 2, 3, 5, 9, 10 + global nav/anchors (polish)
