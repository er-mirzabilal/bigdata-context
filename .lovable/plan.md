## Goal
Rework the thesis figure (`section.stage.st-cl`) mobile layout (≤880px, polished further at ≤520px) so it reads as a vertical Sources → Core → Agents story with simplified visuals — keeping the new desktop version untouched.

## Scope
- File: `src/legacy/big-context.html` only (CSS inside the existing `@media (max-width:880px)` / `(max-width:520px)` blocks around lines 268–294 and 510–512).
- No HTML, JS, or desktop CSS changes.

## Changes

### 1. Vertical layout + connecting wires
- Keep `.cl-body` single column, but center every column (`.cl-silos`, `.cl-core-col`, `.cl-agents`) and remove the current asymmetric offsets (`.cl-silos .cl-silo{margin-right:26px}`, `.cl-core{margin-left:26px}`, `.cl-agents{padding-right:26px}`, the right/left `text-align` overrides on heads).
- Heads become center-aligned; eyebrow numerals (01/02/03) sit above each block.
- `.cl-wires` between blocks: keep the `.cl-mwire` SVG visible (the existing 390×74 horizontal connector), but redraw it as a centered vertical pulse — set `height:56px`, hide the 3 decorative paths, keep a single centered animated dot traveling top→bottom so the eye flows downward. Add a soft fade mask top/bottom.
- Add a small numeric tick ("01 → 02", "02 → 03") in `--mono` 9.5px under each wire for narrative cueing.

### 2. Simplified core (Pragmatic Context Layer)
- Hide the orbiting text rings on mobile: `.cl-core-orbit{display:none}`.
- Keep `.cl-core-hex` (with pulse), `.cl-core-glyph` (Puller logo chip), and `.cl-core-tagline` ("One layer. Every agent.").
- Tighten `.cl-core` padding (`22px 18px`), shrink hex to ~96px, center the chip inside it, increase tagline to 13.5px with more breathing room (`margin-top:14px`).
- Add a subtle outer glow ring (`box-shadow:0 0 60px -10px rgba(var(--p-lav),.55)`) so the core reads as the visual hero of the stack.

### 3. Sources tiles (keep 4-col, polish)
- Keep `.cl-silo-grid{grid-template-columns:repeat(4,1fr)}` at both 880px and 520px.
- Slightly tighten gap to 5px at ≤520px and reduce tile padding so 4 columns breathe at 360px width.
- Cluster captions stay hidden (already are at ≤880px).

### 4. Agents block
- Change `.cl-agents` from 5-col to `repeat(4,1fr)` at ≤880px to align visually with the 4-col sources grid above (currently 5 cols at 880px collapsing to 4 at 520px — unify to 4 throughout mobile).
- Keep `.cl-agent.span2` collapsed via existing `grid-column:auto` rule.

### 5. Section heads / rhythm
- Add `text-align:center` to `.cl-head` on mobile (overrides the current left/right alignments).
- Reduce `.cl-head` bottom margin to 10px and add 4px top margin on each `.cl-col` so the wires hug the blocks.
- Keep `.cl-rail-header` and `.cl-cluster-caption` hidden (already are).

## Verification
- Screenshot at 390×844 and 360×800. Confirm:
  - Three blocks stack centered with a thin vertical pulse wire between each
  - Core shows hex + Puller chip + tagline only (no orbital text)
  - Sources = 4-col logo grid, Agents = 4-col chip grid, both centered
  - No horizontal overflow at 360px
