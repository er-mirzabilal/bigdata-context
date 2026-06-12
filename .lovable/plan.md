
## Goal

Replace the always-on, independent pulse loops in the first figure with a clear, directional **request → gather → return** cycle initiated by individual agents, anchored by a new **Context Core** node in the visual center.

Scope: only the figure inside `<section class="stage st-cl">` in `src/legacy/big-context.html` (CSS block `.cl-*` and the matching markup). No other section, no new dependencies.

---

## New structure

Today the figure is a 5-column grid: `silos | wires | (gap) | wires | agents`. We collapse the two middle wire columns into a single SVG canvas that spans silos→agents with the **Context Core** sitting in the middle.

```text
┌──────────┐                                            ┌──────────┐
│  SILOS   │── wireL₁ ──╲                  ╱── wireR₁ ──│  AGENT 1 │
│  (chips) │── wireL₂ ──╲╲   ┌────────┐   ╱╱── wireR₂ ──│  AGENT 2 │
│          │── wireL₃ ───┼──▶│  CORE  │──┼──── wireR₃ ──│  AGENT 3 │
│          │── wireL₄ ──╱╱   │ MERGE  │   ╲╲── wireR₄ ──│  AGENT 4 │
│          │── wireL₅ ──╱    └────────┘    ╲── wireR₅ ──│  AGENT 5 │
└──────────┘                                            └──────────┘
```

- Wires + Core live in one absolutely-positioned `<svg>` overlay so endpoints can be anchored to real DOM nodes (silo cards and agent cards) via a small layout pass on resize.
- Silo cards and agent cards keep their existing styling; we only add `data-cl-node` ids so the SVG layer can find their connection points.

---

## The Context Core

A floating node centered between the two columns:

- ~64px hexagon (SVG `<polygon>`), thin lavender stroke, soft outer glow, subtle 8s idle rotation + 3s breath (scale 1 → 1.02).
- Inside: a `<text>` element in JetBrains Mono cycling through states driven by the cycle phase:
  - idle → `· · ·`
  - gathering → `JOIN`
  - merging → `MERGE`
  - returning → `→`
- Label below: `CONTEXT LAYER` in mono caps + a tiny live counter (`N ops/s`) computed from cycle completions over the last 5s.
- On silo pulses arrival: one-shot ring expansion (scale 1 → 1.06, opacity 1 → 0).
- On dispatch to agent: a single bright dot ejects from the core's right edge along the chosen wire.

---

## Cycle state machine

Per agent, one cycle is:

1. **Wake (120ms)** — agent card lifts 2px, icon glows, small mono `[ requesting ]` chip fades in on the card. Latency badge starts ticking (`000ms` → up).
2. **Request (400ms)** — single bright pulse travels agent → core along that agent's right-side wire. Core glyph switches to `· · ·` → `JOIN` on arrival.
3. **Gather (700ms)** — core fires pulses to 3–5 randomly chosen silo wires **simultaneously** (same animation start time). Each chosen silo briefly highlights one row (`li` gets `.cl-row-active` for 600ms).
4. **Return (900ms)** — all chosen silos send pulses back to the core, arriving within a 250ms window (staggered slightly for organic feel). Core glyph switches to `MERGE`, ring pulses outward.
5. **Dispatch (500ms)** — one thicker, brighter pulse travels core → agent. Latency badge settles on its final value (180–340ms range), agent card glow fades, `[ requesting ]` chip swaps to `[ resolved ]` for 400ms then fades.

Scheduler:
- A single `requestAnimationFrame` loop drives all cycles.
- Every 1.8–2.6s (jittered) it picks an agent from a shuffled queue (no agent repeats until all have fired once) and starts a cycle.
- Hovering an agent immediately enqueues a cycle for it (with a 1-cycle cooldown to prevent spam).
- Max 2 concurrent cycles so the diagram stays readable.

At rest: wires render as dim static SVG paths with a faint lavender→transparent gradient indicating direction. No pulses on idle wires.

---

## Directional cues (still-frame readable)

- Each wire uses a `<linearGradient>` along its length: dim at origin, brighter at destination, so direction reads even without motion.
- During an active segment, an SVG `<marker>` arrowhead fades in at 60% opacity at the destination end, then fades out when the pulse completes.
- Request wires (agent → core) use a dashed stroke (`stroke-dasharray: 3 4`); response wires (core → agent, silo → core) are solid. This gives "asking" vs "answering" a permanent visual difference.

---

## Parallel silo selection

- Each cycle picks `3 + floor(random*3)` silo wires (3–5) from the available 5–7 endpoints.
- Selection is biased so the two silo cards (`Locked-in silos`, `Tribal knowledge`) are both represented at least once per cycle.
- The selected wires animate concurrently (same `performance.now()` start), unlike today's staggered loop.

---

## Responsive + accessibility

- **Desktop (>900px):** full layout as described.
- **Tablet (640–900px):** Core shrinks to 48px, wire count visually reduced to 4 by hiding 2 with `opacity:0` but logic unchanged.
- **Mobile (≤640px):** stack vertical (silos top, core middle, agents bottom). Replace the two wire SVGs with a single vertical SVG. Run **one cycle at a time**, no concurrency, slower cadence (3.5s).
- **`prefers-reduced-motion`:** render one static frame — dim wires + arrowheads + core in idle state. No cycles, no rotations, no breath. Hover still highlights the agent card but does not trigger animation.
- **Hardware budget:** if `navigator.hardwareConcurrency < 4` or `deviceMemory < 4`, behave like reduced-motion.
- **IntersectionObserver:** pause the scheduler when the figure is out of view.
- **A11y:** the SVG stays `aria-hidden="true"`; the section's existing visually-hidden `<h2>` and silo/agent text continue to carry meaning for screen readers. Latency badges get `aria-hidden`.

---

## Implementation steps

1. **Markup pass** (`src/legacy/big-context.html`, the `st-cl` section):
   - Add `data-cl-node` ids to each silo card and each agent card.
   - Replace the two `<div class="cl-wires">` blocks with one `<div class="cl-stage">` containing: one absolutely-positioned `<svg class="cl-canvas">` + a `<div class="cl-core">` (hexagon + glyph + label + ops counter).
   - Keep silo cards and agent cards exactly as they are.

2. **CSS pass** (in the same `<style>` block, near the existing `.cl-*` rules):
   - New rules: `.cl-stage`, `.cl-canvas`, `.cl-core`, `.cl-core-hex`, `.cl-core-glyph`, `.cl-core-label`, `.cl-core-ops`, `.cl-agent-badge`, `.cl-agent.is-active`, `.cl-row-active`, plus dashed vs solid wire classes.
   - Remove now-unused `.cl-pulse`, `.cl-mwire`, and the inline `<animateMotion>` styles.
   - Add reduced-motion overrides and mobile vertical layout.

3. **JS pass** (new `<script>` block at the bottom of the file, next to the existing sphere script):
   - `layoutWires()` — measure silo/agent card positions relative to `.cl-stage`, compute wire endpoints + core anchor, write `<path>` `d` attributes and gradient stops. Re-run on `ResizeObserver`.
   - `Cycle` class — manages one agent's request/response cycle through the 5 phases via `performance.now()` offsets.
   - `Scheduler` — `requestAnimationFrame` loop, shuffled agent queue, hover override, concurrency cap, IntersectionObserver pause, capability gates.
   - `Core` controller — drives glyph text, ring pulse, ops/s counter.
   - All inline, no imports, ~6–8 KB.

4. **Verification**:
   - Desktop 1280–1920: cycles fire every ~2s, parallel silo pulses arrive at core simultaneously, core glyph cycles through states, agent latency badge ticks, arrows readable.
   - Hover an agent: that agent fires a cycle immediately.
   - Mobile 390: vertical layout, single cycle at a time, no horizontal scroll.
   - Reduced motion: static frame only.
   - 60fps in DevTools perf panel; rest of page (hero sphere, marquee, other sections) untouched.

---

## Out of scope

- No changes to hero, navbar, marquee, or any other section.
- No three.js / WebGL — pure SVG + DOM + rAF.
- No new dependencies.
- No copy changes to silo names, agent names, eyebrows, or headings.
