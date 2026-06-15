## Goal

Make the "From siloed data, through the Pragmatic Context Layer, to AI agents" figure render cleanly on phones (390px wide and down), keeping the existing top-to-bottom three-stage flow with connector wires.

## Current problems (verified at 390×844)

1. Source tiles (Snowflake, SAP, dbt, People, …) overflow the right edge of the section — the 4-column grid is wider than the viewport because tile labels like "Unity Catalog" / "Tribal knowledge" force a min content width and no `min-width:0` is set on the tile.
2. The Pragmatic Context Layer "core" renders the rotating TASKS · METRICS · … orbital text and hex frame at default SVG size (~300px wide), pushing the middle column off-screen. The desktop sizing rules for `.cl-core-orbit` / `.cl-core-hex` live only inside `@media (min-width:881px)`, so on mobile they have no width at all.
3. Layout offsets created for the old m-wire layout (`.cl-silos .cl-silo{margin-right:26px}`, `.cl-core{margin-left:26px}`, `.cl-agents{padding-right:26px}`) shift content asymmetrically; the m-wire SVG no longer aligns with the chosen single-column layout.
4. The "Pragmatic Context Layer" heading itself clips at the right edge because `.cl-core-col .cl-head{text-align:right}` plus the 26px left margin push it past the container.
5. Latent tiles ("People", "Tribal knowledge", "Decisions") look orphaned because the mobile breakpoint hides `.cl-cluster-caption`, leaving them visually identical to data sources — fine to keep hidden, but their long labels need handling.

## Changes (all in `src/legacy/big-context.html`)

### 1. Contain the figure inside the section
- In `@media (max-width:880px)`:
  - Remove `.cl-silos .cl-silo{margin-right:26px}`, `.cl-core{margin-left:26px}`, `.cl-agents{padding-right:26px}` (legacy offsets for the old list-based silos).
  - Restore symmetric layout: `.cl-col{min-width:0}` so flex/grid children can shrink.
  - Change `.cl-core-col .cl-head{text-align:right}` → `text-align:left` so the "Pragmatic Context Layer" title aligns with the rest of the column and doesn't clip.

### 2. Source tile grid — fix overflow, shrink labels
- Add inside `@media (max-width:880px)`:
  - `.cl-silo-tile{min-width:0;padding:8px 4px;aspect-ratio:1/1}`
  - `.cl-silo-tile .cl-silo-label{font-size:9px;line-height:1.15;text-align:center;overflow:hidden;text-overflow:ellipsis}`
  - `.cl-silo-tile .cl-brand{width:40%;height:40%}`
  - Stack icon over label inside each tile: `.cl-silo-tile{flex-direction:column;gap:4px}`
- At `@media (max-width:520px)` keep the 4-column grid but tighten gap to 5px and clamp label to single line for tribal/unity labels — allow 2-line wrap with `-webkit-line-clamp:2`.

### 3. Compact orbit + hex core (~200px)
- Add inside `@media (max-width:880px)`:
  - `.cl-core-col{display:flex;flex-direction:column;align-items:center}`
  - `.cl-core{width:200px;height:200px;padding:0;background:none;border:none;box-shadow:none;border-radius:50%;display:flex;align-items:center;justify-content:center;overflow:visible;margin:8px auto 0}`
  - `.cl-core::before,.cl-core::after{display:none}`
  - `.cl-core-tag,.cl-core-title,.cl-core-tagline{display:none}` (heading already lives in `.cl-head`)
  - `.cl-core-orbit{position:absolute;inset:0;width:200px;height:200px;display:block;pointer-events:none}`
  - `.cl-core-hex{position:absolute;inset:0;margin:auto;width:98px;height:98px;display:flex;align-items:center;justify-content:center}`
  - `.cl-core-hex svg{position:absolute;inset:0;width:100%;height:100%}`
  - `.cl-hex-frame{stroke:rgba(var(--p-lav),.5);fill:rgba(var(--p-lav),.04)}`
  - `.cl-core-glyph{position:relative;z-index:3;margin:0;display:flex}`
  - `.cl-core-chip{padding:0;background:none;border:none;box-shadow:none}`
  - `.cl-core-chip img{width:52px;height:52px}`
  - `.cl-orbit-text{font-size:8px;letter-spacing:.32em}` `.cl-orbit-in .cl-orbit-text{font-size:6.5px}`
  - Reapply the slow rotation already defined in keyframes: `.cl-orbit-in{display:block;animation:cl-rot-rev 60s linear infinite}` (matches desktop intent).
- After the core, render a compact tagline below: re-show `.cl-core-tagline` on mobile in a follow-up rule with `display:block;font-size:12px;margin-top:10px;text-align:center` so "One layer. Every agent." still appears.

### 4. Agents grid polish
- Inside `@media (max-width:880px)` `.cl-agents` already 2-col; keep as-is but add `min-width:0` to `.cl-agent` and shrink the bottom-bleed: `.cl-agent{padding:10px 8px}` plus `.cl-agent-label{font-size:10px;letter-spacing:.1em}` so "Procurement"/"Marketing" don't truncate.

### 5. M-wire connectors
- Keep `.cl-mwire` shown but tighten: `.cl-wires{height:48px;margin:4px 0}` on mobile so the visual link between stages is shorter and the wire path origin/destination roughly align with the now-centered core. Update the existing wire path's terminal x-coords to land near the section's horizontal center (`x≈195`) instead of the old `78`/`296` anchors that assumed offset layout. (Two `<path d="…">` updates per `.cl-mwire` SVG.)

### 6. Section padding
- `@media (max-width:520px) .st-cl{padding:36px 14px}` to give a tiny bit more horizontal room for the 4-col silo grid.

## Out of scope

- No JS changes; the cycle animation already guards on `isMobile()` and stays inert below 880px.
- No copy / taxonomy changes (Latent vs Systems framing is a separate thread).
- Tablet (>880px) and desktop layouts remain untouched.

## Verification

After edits, view `/` at 390×844 and 360×800 and confirm:
- No horizontal scroll on the section.
- All 12 source tiles visible inside the viewport, labels legible.
- Core shows a ~200px orbit ring + hex + Puller AI chip, with rotating text readable.
- "Pragmatic Context Layer" heading and "One layer. Every agent." tagline both visible and not clipped.
- 9 agent tiles in 2 columns with Strategy spanning full width.
