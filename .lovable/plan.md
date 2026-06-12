## Goal
Strip the figure to the minimum text needed to read it in ~3 seconds, while keeping the current icon-only rail behavior and the Tribal Knowledge group.

## Changes to `src/legacy/big-context.html`

### 1. Column headers (rewrite the 3 eyebrow + title + subtitle blocks)
Replace the current verbose headers with short, parallel three-beat headers:

- **Left:** title `Siloed Data` · subtitle `Locked in tools`
- **Center:** title `Pragmatic Context Layer` · subtitle `Independent · Open`
- **Right:** title `AI Agents` · subtitle `Across your enterprise`

Remove the long "The world we need: a pragmatic context layer" phrasing — the center title now carries it.

### 2. Left rail — keep two icon groups, no names
Current rail already renders icons only. Keep the structure but:

- Keep the **Locked-in Silos** group (Microsoft Fabric, Databricks, Snowflake, BigQuery, AWS, Oracle, SAP, ServiceNow, Workday) as icon chips only.
- Keep the **Tribal Knowledge** group as a second icon cluster below it (docs, spreadsheet, chat/slack, person-head glyphs) — icon-only, no item names.
- Remove the `LOCKED-IN SILOS` and `TRIBAL KNOWLEDGE` eyebrow labels and the `… AND MORE` text. Replace each group's identity with a single tiny caption under the cluster: `Systems` and `Knowledge`. That's the only text in the left column besides the header.

### 3. Center core — remove the checkmark bullet list
The orbit tokens (`METRICS · ENTITIES · POLICIES · TASKS`) already communicate "what flows through." Remove the 5-item checklist:
- Semantic definitions
- Relationships & ontologies
- Business context
- Governance & trust
- Works across all data

Keep: hex frame + logo glyph + orbit rings + pulse dot + the single label `Pragmatic Context Layer` (now the column title, so the in-core duplicate label `BIG CONTEXT OS` / `Pragmatic Context Layer` block collapses to just the logo + orbit). One small caption under the core: `One layer. Every agent.`

### 4. Right rail — icon-only, no names
Already icon-only in current build. Confirm no agent name labels render at rest (Finance, HR, Procurement, Support, Risk, Data, Analytics, Marketing, Strategy). Keep hover/active latency badge behavior as-is. Single tiny caption under the cluster: `Agents`.

### 5. Cleanup
- Delete the now-unused CSS rules for `.cl-silo-eyebrow`, `.cl-bullets`, `.cl-core-title`, `.cl-and-more`, and any agent-name label classes if they exist.
- Keep all wire/animation/JS logic untouched — only markup + a handful of class removals.

## Resulting text inventory (down from ~30 phrases to 8)
1. `Siloed Data` / `Locked in tools`
2. `Pragmatic Context Layer` / `Independent · Open`
3. `AI Agents` / `Across your enterprise`
4. `Systems` (under silo cluster)
5. `Knowledge` (under tribal cluster)
6. `One layer. Every agent.` (under core)
7. `Agents` (under agent cluster)
8. Orbit tokens: `METRICS · ENTITIES · POLICIES · TASKS`

## Out of scope
No changes to wires, orbit animation, hex frame, pulse dot, latency badges, hover behavior, responsive breakpoints, or reduced-motion fallback.
