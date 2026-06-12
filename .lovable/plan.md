# Figure refinements

Four targeted changes to the central figure in `src/legacy/big-context.html` (the three‑rail Sources → Pragmatic Context Layer → Agents diagram). Scope is presentational — no JS/business‑logic changes.

## 1. Make flow feel one‑directional (fix the "writing back" read)

Today the right‑side wires curve from the core *outward* with pulses traveling out — combined with the lavender glow, the right rail reads as electric bolts going *back* into agents.

Changes:
- Both wire panels (left and right) animate strictly **left → right**: Sources → Core, Core → Agents. Pulse `animateMotion` paths and `keyPoints` set so dots always travel rightward.
- Add a subtle directional taper: thin at the origin, slightly thicker near the destination, with a short fading "comet tail" on each pulse (SVG `<linearGradient>` along the path) so motion direction is unambiguous even when paused.
- Add a layer of **faint static paths** behind the active wires (lower opacity, no animation) so the structure reads as a flow field, not just five lit cables. Matches the "faint paths too" note.
- Drop the lavender end‑cap dot on the right wires (it currently looks like a spark hitting the source).

## 2. Two concentric word orbits around the core

Replace the single outer ring of words with two counter‑rotating rings.

- **Outer ring (slower, brighter):** `TASKS · METRICS · ENTITIES · POLICIES · DEFINITIONS · BUSINESS LOGIC · SCHEMA · SEMANTICS`
- **Inner ring (faster, dimmer, smaller type):** `DECISION TRACES · EXPERTISE · NUANCES · TRIBAL KNOWLEDGE · EXCEPTIONS · PREFERENCES`

Implementation: enable the existing `.cl-orbit-in` group (currently `display:none`), repoint its `textPath` at `#cl-orb-inner`, swap in the new word list, and tune `font-size` / `letter-spacing` / animation duration so the two rings read as a hierarchy (structured outside, latent inside) rather than noise.

## 3. Add a "Latent" sources cluster on the left rail

The left rail currently has two clusters: **Systems** (Snowflake, Databricks, BigQuery, AWS, Oracle, SAP, Salesforce, HubSpot) and **Knowledge** (Slack, Notion, Sheets, Confluence). Add a third:

- **Latent** — represented as soft token chips rather than vendor logos, since these aren't products. Suggested chips: *People*, *Tribal knowledge*, *Decisions*, *Inferred concepts*, *Conventions*. Styled with a dotted/soft outline to visually distinguish from the system tiles and signal "not a SaaS source."
- Add a `cl-cluster-caption` of "Latent" beneath them, matching the existing Systems/Knowledge captions.
- Re‑weight the wire bundle so a couple of pulses originate from the Latent cluster too, so the rail visually delivers what the orbit's inner ring promises.

## 4. Add a "Semantics" cluster on the left rail

New fourth cluster on the Sources rail for semantic/modeling tools:

- **Semantics** — tiles for *Atlan*, *Cube*, *AtScale*, *Unity Catalog*, *Semantic Views*, *dbt*, *Confluence*. Uses simple‑icons brand logos where available (atlan, cube, dbt, databricks for Unity Catalog, confluence); the abstract ones (AtScale, Semantic Views) get a neutral glyph tile in the same visual family.
- Caption: "Semantics".
- Place after Systems and Knowledge, before Latent, so the rail reads top‑to‑bottom as: **Systems → Knowledge → Semantics → Latent** (concrete → abstract).

## Technical notes

- All edits are in `src/legacy/big-context.html` only.
- Orbit ring change reuses the existing `#cl-orb-inner` path def and `.cl-orbit-in` styles already in the stylesheet — mostly an un‑hide + content swap.
- Pulse direction fix is purely SVG attribute changes on the right `.cl-wires` block (line 609) — paths reversed so `M` starts at the core side and ends at the rail side, then `animateMotion` plays start→end as usual.
- New left‑rail tiles slot into the existing `.cl-silo-grid` markup; no grid/layout refactor needed beyond letting the grid grow two more rows.

## Out of scope

- No changes to the right‑rail Agents list, the page copy, the hero, or any non‑figure section.
- No changes to JS interactivity (hover states, active tier sync, etc.).
