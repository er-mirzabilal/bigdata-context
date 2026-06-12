## Goal

Restructure the first figure (`.st-cl` in `src/legacy/big-context.html`) into a **3-vertical-rail** layout: thin silo rail (left) · orbiting Context Core (center) · thin agent rail (right). Keep all existing content, brand logos, cycle state machine, latency badges, hover-to-fire, and reduced-motion fallback.

---

## Layout

```text
┌──────┐                                          ┌──────┐
│  ▢   │                                          │  ◯   │
│  ▢   │ ─╲                                    ╱─ │  ◯   │
│  ▢   │ ──╲        ╭───────────────╮       ╱── │  ◯   │
│  ▢   │ ───┼──────▶│   METRICS     │◀─────┼─── │  ◯   │
│ silo │ ───┤       │  ╱ HEX+LOGO ╲ │      ├─── │ agent│
│ rail │ ───┤       │  ╲   ENT.   ╱ │      ├─── │ rail │
│  ▢   │ ──╱        ╰── POLICIES ──╯       ╲── │  ◯   │
│  ▢   │ ─╱            TASKS                ╲─ │  ◯   │
└──────┘                                          └──────┘
   12 chips         orbit ring + hex + glyph         10 chips
```

- **Silo rail**: single column of 28–32px monochrome logo chips with a faint vertical spine line behind them. Label appears only on hover (tooltip-style, mono caps).
- **Agent rail**: mirrored vertical column, same chip size, each with a small status dot (idle/active/resolved). Permanent labels removed; label on hover only.
- **Core**: just the existing logo glyph (no card, no bullet list, no tagline) inside a **faint hex frame** (thin 1px lavender stroke, low opacity, breathing softly).

---

## Orbiting Context Core

- **Logo + faint hex frame** in the center. Hex breathes (scale 1 → 1.04, 3s) at rest; hard flash on cycle completion.
- **Two concentric SVG circles** with `<textPath>` carrying the tokens:
  - Outer ring (radius ~78px, rotates clockwise 40s): `METRICS · ENTITIES · POLICIES · TASKS · METRICS · ENTITIES · POLICIES · TASKS` (duplicated so text fills the full circumference).
  - Inner ring (radius ~58px, counter-rotates 60s): same 4 tokens, smaller, dimmer — adds depth.
- Tokens in JetBrains Mono, 9–10px, letter-spaced, lavender at ~55% opacity.
- On request arrival at core: outer ring brightens briefly (opacity 0.55 → 0.9, 300ms).
- On dispatch: one matching token (whichever is nearest the chosen agent's wire angle) "snaps off" the orbit — clones into a free `<text>` that flies along the wire to the agent chip, then fades.
- Hex frame ring pulse (scale 1 → 1.08, opacity 1 → 0, 600ms) on each cycle completion.

---

## Wires

- Single SVG canvas spanning the full figure width.
- Each silo chip → core hex edge; core hex edge → each agent chip.
- Wires stay dim at rest with the existing direction gradient. No permanent arrowheads — arrowheads fade in only during an active pulse.
- Subtle vertical spine line behind each rail (1px, very low opacity) to ground the chip column visually.

---

## Density reductions

- Remove silo card containers, list items, eyebrow labels per silo card. Silos become a flat vertical chip list grouped only by a small section header (`SILOS` mono caps, top of rail).
- Remove agent card containers, permanent agent labels, descriptions.
- Remove the "One context layer for every agent" tagline.
- Remove the visible `N ops/s` counter. Replace with a tiny 6px pulse-meter dot under the hex that blinks once per cycle completion.
- Latency badges stay but float above the agent chip on hover/active only (already implemented).

---

## Motion

- **Core hex**: 3s breath at rest; 600ms hard flash + ring pulse on cycle completion.
- **Orbit rings**: continuously rotate; outer 40s CW, inner 60s CCW.
- **Token snap-off**: per dispatch, clone nearest token, animate along wire path to agent chip over 500ms with ease-out, fade at end.
- **Silo chips**: selected chips during gather phase get the existing `.cl-row-active` glow (lavender outline + scale 1.06) for 600ms.
- **Agent chips**: gentle ±2px vertical float, staggered phase per chip. On active: status dot turns lavender, slight scale.
- **Pulses on wires**: keep existing request → gather → return → dispatch state machine and timing.

---

## Responsive

- **>900px**: full 3-rail layout as described.
- **640–900px**: rails narrower, chip size 24px, orbit radius reduced, inner ring hidden.
- **≤640px**: stack vertical — silos top (horizontal chip row), core middle, agents bottom (horizontal chip row). Orbit rings shrink; one cycle at a time.
- **`prefers-reduced-motion`**: static frame — dim wires, hex frame, rings shown but not rotating, no breath, no pulses.

---

## Implementation steps (in `src/legacy/big-context.html`, `.st-cl` section only)

1. **Markup**:
   - Replace the silo logo grid wrapper with `.cl-silo-rail` containing the 12 existing brand chips in a single column + small `SILOS` header.
   - Replace the agent grid with `.cl-agent-rail` containing the 10 existing agent chips in a single column + small `AGENTS` header + status dot per chip.
   - Replace `.cl-core` card with a minimal `.cl-core` containing: hex SVG frame, existing logo glyph, two `<circle>` + `<text><textPath>` orbit rings, pulse-meter dot. Remove tagline + ops counter + bullet list.
   - Keep all `data-cl-node` ids so wire layout still resolves.

2. **CSS** (in same `<style>` block):
   - Add `.cl-silo-rail`, `.cl-agent-rail`, `.cl-rail-spine`, `.cl-rail-header`.
   - Add `.cl-hex-frame`, `.cl-orbit-outer`, `.cl-orbit-inner`, `.cl-orbit-text`, `.cl-pulse-dot`.
   - Add `.cl-agent-status` (dot states: idle/active/resolved).
   - Restyle chips to 28–32px circular with hover-only label tooltips.
   - Update grid to a 3-column layout: `auto 1fr auto` (rails fixed-width, canvas flexes).
   - Reduced-motion overrides for orbit rotation and breath.

3. **JS** (existing `<script>` block):
   - Update `layoutWires()` endpoint anchors to use rail chip centers (already keyed off `data-cl-node`, just verify positions).
   - On dispatch, compute angle of agent chip relative to core, pick nearest orbit token, clone its `<text>` into the canvas SVG, animate along that wire's path using `getPointAtLength()` over 500ms.
   - Drive pulse-meter dot opacity from cycle-completion timestamps (one blink per resolved cycle).
   - Remove `N ops/s` counter logic. Keep cycle scheduler, hover override, IntersectionObserver pause, capability gates exactly as-is.

4. **Verification**:
   - Desktop ≥900px: 3 rails visible, orbit text rotates smoothly, tokens snap off on dispatch, hex breathes.
   - Hover silo/agent chip: label tooltip appears; hovering an agent fires a cycle.
   - Mobile 390: stacked layout, single cycle at a time.
   - Reduced motion: static frame, no rotation.
   - 60fps; no other section affected.

---

## Out of scope

- No copy changes to silo/agent names or section eyebrow/headline.
- No changes to any other section.
- No new dependencies; pure SVG + DOM + rAF.
