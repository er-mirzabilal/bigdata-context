# Mobile Figure: Offset Titles + Crossing Wires

Apply the chosen "Offset titles + wires" direction to the first figure on mobile, breaking the centered, linear stack into an alternating left/right composition with bundles of curved connector lines.

## What changes (mobile only, ≤880px)

### 1. Offset stage headers
- **Stage 01 — The Past**: header left-aligned, flush to the left edge.
- **Stage 02 — The Evolution**: header right-aligned, title in italic for contrast.
- **Stage 03 — The Future**: header left-aligned again.
- Eyebrow, title, and subtitle keep their existing styles — only alignment changes.

### 2. Offset content blocks (zig-zag rhythm)
- Stage 01 silo cards shift slightly left (small right margin).
- Stage 02 core card shifts slightly right (small left margin) so the eye travels diagonally.
- Stage 03 agents grid shifts slightly left, mirroring stage 01.

### 3. Multi-line curved wire connectors
- Replace the single straight vertical line + chevron between stages with a small SVG of **3 curved bezier paths** that sweep diagonally:
  - Between 01 → 02: curves flow from the left side (under the silo cards) across to the right (where the core card begins), with fading opacities (.4/.2/.1) and a glowing dot at the convergence point.
  - Between 02 → 03: mirrored — curves flow from right back to the left toward the agents grid.
- Reuse the existing pulse-dot treatment (`lavender-hot` glow); a traveling pulse animates along the strongest path via SMIL `animateMotion`, consistent with the desktop wires. Hidden under `prefers-reduced-motion`.
- Connector height stays compact (~70–80px), so this also trims vertical space versus the current 52px line + heading gaps.

### 4. Tighter vertical rhythm
- Because connectors now do diagonal work, the gaps around them shrink further; net effect is a figure that reads less like a list and more like one continuous circuit.

## Technical details

- All changes live in `src/legacy/big-context.html`:
  - Two small inline `<svg>` connector blocks (mobile-only, replacing the current `.cl-wires` mobile background hack) with `viewBox="0 0 390 80"` and `preserveAspectRatio="none"` so curves stretch with width.
  - CSS scoped under the existing `@media (max-width:880px)` block: header alignment overrides, card offset margins, connector sizing, pulse animation.
- Desktop is untouched: the 3-column grid, horizontal wire bundles, and pulses keep their current rules; new mobile CSS only overrides within the breakpoint.
- The existing desktop `.cl-wires` SVGs stay in the markup (hidden on mobile as today); the new mobile connector SVGs are hidden on desktop.

## Verification

- Preview at 390px: confirm zig-zag alignment, wires connect visually card-to-card, pulse dots animate, no horizontal overflow.
- Preview at 1280px: confirm desktop figure is pixel-identical to current.
- Toggle `prefers-reduced-motion`: pulses hidden, static wires remain.