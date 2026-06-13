## Goal
Reduce the vertical height of the left "Siloed Data" column in the Silos → Core → Agents figure so the figure feels balanced and the page doesn't have to scroll as much past it.

## Why it's tall today
The left column renders 14 tiles in a 3-column grid plus 4 cluster captions ("Systems / Knowledge / Semantics / Latent"), so it grows to ~6 rows and ends up taller than the center orbit and the right agents column. Nothing has `overflow:auto`, so the extra height pushes the whole section taller.

## Changes (all in `src/legacy/big-context.html`, desktop only — mobile already collapses differently)
1. Denser grid: change `.cl-silo-grid` from `repeat(3,1fr)` to `repeat(4,1fr)` and reduce `gap` from `8px` to `6px`. With 4 columns the 14 tiles fit in ~4 rows instead of 6.
2. Smaller tiles: drop the `aspect-ratio:1/1` to `aspect-ratio:1.1/1` (slightly shorter) and shrink the brand mask from `54%` to `50%`. Keeps icons legible but trims ~20% of column height.
3. Inline the cluster captions: change `.cl-cluster-caption` to span the full row at `height:14px` with smaller `font-size:9px` and tighter `margin:2px 0` so the four labels don't each consume a full row of grid space.
4. Cap the column with `align-self:center` on `.cl-col.cl-silos` and add `max-height:min(520px, 56vh)` on `.cl-silo-grid` (no scrollbar — content fits after steps 1–3; the cap is just insurance so a future addition can't blow the figure up again).

## Out of scope
- No content removal (all 14 source tiles stay).
- No changes to the center orbit or the right agents column.
- No changes to mobile (≤640px) — that layout already uses a single vertical rail.

## Verification
Reload `/#pragmatics`, confirm the silos column height is close to the orbit + headline height of the center column, no scrollbar appears, and all tiles + cluster labels are still visible.
