
# Trim source clusters & improve cluster separation

The left rail's Sources column currently packs **23 tiles** (Systems 8, Knowledge 4, Semantics 6, Latent 5) into a 3-column grid — that's ~8 rows, which overflows the canvas and forces vertical scroll. Cluster captions are also just thin labels between rows, so the four groups visually blur together.

Scope: presentational edits to `src/legacy/big-context.html` only.

## 1. Reduce tile count (23 → 14)

Keep the most recognizable/representative item per category, drop the redundant or niche ones.

- **Systems (8 → 4):** keep **Snowflake, Databricks, Salesforce, SAP**.
  Drop: BigQuery (redundant with Snowflake/Databricks for "warehouse"), AWS (too generic — it's infra, not a data source), Oracle (covered by SAP for legacy ERP), HubSpot (Salesforce already represents CRM).
- **Knowledge (4 → 3):** keep **Slack, Notion, Confluence**.
  Drop: Sheets (overlaps Notion as a doc/table surface; Slack+Notion+Confluence already tell the "wiki + chat" story).
- **Semantics (6 → 4):** keep **dbt, Cube, Unity Catalog, Atlan**.
  Drop: AtScale (less recognizable), Semantic Views (abstract — already implied by Cube/Unity).
- **Latent (5 → 3):** keep **People, Tribal knowledge, Decisions**.
  Drop: Inferred concepts, Conventions (both overlap heavily with Tribal knowledge and clutter the dashed-tile row).

Result: 4 + 3 + 4 + 3 = **14 tiles**. In the 3-col grid that's ~5 rows instead of 8 — fits the figure height without scroll, and each cluster row stays visually balanced (a single row of 3, or 3+1 for the 4-tile groups).

## 2. Stronger cluster separation (pick one direction — recommend A)

Currently clusters are only separated by a small all-caps caption between rows. Options to make the four groups read as distinct chambers:

**A. Boxed cluster cards (recommended).** Wrap each cluster's tiles in a subtle bordered container (`rgba(20,12,30,.35)` bg, 1px hairline border, 14px radius, 10px inner padding). Caption sits at the top-left of the box as an eyebrow label, not floating between rows. Each cluster becomes a clearly defined "shelf" — reads instantly, and the existing tile styling stays intact inside.

**B. Left rail with vertical accent.** Keep the flat grid but add a 2px lavender vertical accent bar on the far left of each cluster group, with the caption rotated 90° alongside it. More editorial / blueprint feel, less boxy.

**C. Alternating background bands.** Give every other cluster a faint horizontal band (`rgba(var(--p-lav),.04)` full-width behind that group's tiles). Lightest touch — separation without new borders — but weaker than A.

A is the safest fit with the current dark, card-heavy aesthetic and matches how Agents are grouped on the right rail. Going with A unless you say otherwise.

## 3. Caption restyle (paired with option A)

- Move `.cl-cluster-caption` from a between-rows line to the top edge of each new cluster box.
- Slightly tighter letter-spacing, add a 1px lavender underline tick (12px wide) under the caption so each chamber gets a small flag.
- Keep mobile behavior (`display:none` under 880px) unchanged — the existing mobile rail handles separation differently and works.

## Technical notes

- Edit only `src/legacy/big-context.html` (the cluster `<div class="cl-silo-grid">` block around line 615 and the `.cl-silo-grid` / `.cl-cluster-caption` CSS around lines 444 and 508).
- Introduce a new wrapper class, e.g. `.cl-cluster { ... }`, and group each cluster's tiles inside it. The outer `.cl-silo-grid` becomes a vertical flex of 4 clusters; each cluster internally uses the existing 3-col grid.
- Update the wire-bundle origin points if any of the dropped tiles were used as endpoints (Snowflake/Databricks/Slack/Notion are kept, so most pulses are unaffected — verify only).
- No JS changes; hover/active states keep working because tile markup is unchanged.

## Out of scope

- No changes to the core orbit rings, the Agents rail, or any copy outside the figure.
- No new icons — only dropping existing tiles.
- No responsive/mobile rework.
