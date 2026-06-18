## Services Page — Mobile Audit (390×844)

Tested at iPhone 12/13 width. Findings ordered by impact.

### 1. Hero is mostly empty space

- `min-height: clamp(520px,68vh,760px)` plus `padding:90px 0` leaves the viewport with just an eyebrow + headline and ~50% blank canvas before the next section.
- The decorative `.sv-lockup` (`TRANSFORMATION × FIRM × DATA OPS`) and `.sv-lead` paragraph aren't visible in the mobile screenshot — they exist in markup but get pushed/clipped by the fixed orb stacking.
- **Fix**: drop `min-height` on mobile, tighten hero padding to ~64px top / 40px bottom, ensure lockup + lead render below the H1 with proper z-index.

### 2. Excessive vertical whitespace between sections

- `.bc-section` uses `padding: clamp(108px,13vh,168px) 0` — on a 844px viewport that's 108px top + 108px bottom per section, creating the long blank stretches seen between "By the Job", "Transformation Services", "The Firm", and "Get Started".
- **Fix**: add a mobile override `@media(max-width:640px){.bc-section{padding:64px 0}}` and tighten `.sv-hero` similarly.

### 5. Team bios unreachable on touch

- Bios reveal only on `:hover` / `:focus-within`. Touch devices have no hover, so the bio content stays hidden.
- **Fix**: on mobile, toggle bio open on tap (click handler adds `.is-open`) or always show bios in a stacked layout.

### 6. Buckets list — touch-target & truncation

- `.sv-bucket li { padding:15px 0 }` gives ~46px tap targets — borderline. Hover effect (`padding-left:5px` + color change) is invisible on touch.
- Long items like "Metrics & Models Harmonization" sit fine, but lack any affordance that they're interactive (they currently aren't links — if they should be, wire them; if not, remove the hover state).
- **Fix**: decide intent — make items linkable with chevron, or drop the hover affordance so they don't look clickable.

### 7. Get Started card — small polish

- The eyebrow `GET STARTED / 04` and the `HELLO@BIGCONTEXT.CO` line read well, but the "Back to overview" link is ambiguous on a standalone services page (overview of what?).
- **Fix**: relabel to "Back to home" with `to="/"`, or remove.

### 8. Fixed orb canvas — perf

- `.sv-orb` is `position:fixed; width:100%; height:100%` running a particle animation across the whole viewport on every frame. On mobile this drains battery and can cause scroll jank.
- **Fix**: pause via `IntersectionObserver` when hero leaves viewport, throttle to 30fps on `(max-width:640px)`, respect `prefers-reduced-motion`.

### 9. Footer

- Footer columns reflow to 2-up on mobile, which is fine. Brand block ("Make enterprise data work at AI-scale.") sits above a large gap before "PRODUCT" — caused by `.bc-foot-top { margin-bottom:46px }`. Tighten to 24px on mobile.

10. I think the team profiles in mobile should be stacked  


### Out of scope (not touched)

- Desktop layout, copy changes beyond the two small relabels above, business logic, routing structure.

