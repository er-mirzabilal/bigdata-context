## Mobile audit + optimization plan

All changes live in `src/legacy/big-context.html` (CSS in `<style>`, JS in IIFEs). No design / content changes — only mobile breakpoints and animation gating.

### Findings (from the mobile screenshot + CSS audit)

**Layout**
- `.st-atom { min-height: 720px }` causes a massive empty band on phones once the layout collapses to one column.
- `.bc-section { padding: clamp(108px,13vh,168px) 0 ... }` stacks 100+ px top *and* bottom of every section — visible as the huge gaps between sections in the screenshot.
- `.st-atom`, `.st-lin`, `.st-prob`, `.st-cl` default to `padding: ... 56px`. Already overridden for some at 520px, but `.st-atom` only drops to 22px at 900px — fine, but vertical padding stays generous.
- `.headline { white-space: nowrap }` is only relaxed inside the atom section's 900px query; other places using `.bc-h2` or hero copy are already fluid, but the "Make enterprise data work at AI-scale" closer relies on a single-line layout that wraps awkwardly on 360px.
- Nav: `.bc-nav-links a:not(.bc-btn) { display: none }` ≤860px leaves only the "Get Started" pill. No hamburger — acceptable for a one-page site, but I'll keep it as is unless you want a menu.

**Performance (mobile is the worst case)**
- `#bc-particles` (hero canvas) runs full-tilt rAF with DPR up to 2 — same problem class we already fixed for `#bc-neural`. Drains battery and stutters scroll on phones.
- The atom orbit SVG continuously mutates `<circle>` attributes every frame (confirmed by the session replay) even when off-screen — significant cost on lower-end phones.
- The marquee track and typewriter `bc-flip` keep running off-screen.
- Several decorative shadows / blurs (`.bc-bloom` with `filter: blur(10px)` + infinite animation) are expensive on mobile GPUs.

### Plan

**1. Layout / spacing (mobile only, ≤640px)**
- Cut `.bc-section` vertical padding roughly in half on mobile: `padding: clamp(56px, 9vw, 80px) 0`.
- Remove `min-height: 720px` from `.st-atom` on mobile; let content determine height.
- Reduce remaining `56px` horizontal section padding to `20px` on `.st-atom` / `.st-lin` / `.st-prob` / `.st-cl` at ≤640px (currently only `.st-cl` / `.st-prob` / `.st-lin` get this at 520px; extend to 640px and include `.st-atom`).
- Allow the closer headline ("Make enterprise data work at AI-scale.") to wrap and shrink: `font-size: clamp(1.75rem, 7vw, 2.6rem)` on ≤640px.
- Tighten `.bc-hero` top padding to `64px` and let `min-height` drop to `auto` on ≤640px so it sizes to content (currently `100vh` reserves a full viewport even when the headline is short).
- Reduce gap inside the `.cl-body` stacked layout on mobile (already 1-col ≤880px, but rows could use ~16px gap instead of 0).

**2. Animation gating (the big perf win)**

Apply the same pattern we used for `#bc-neural` to every other always-on animation:
- `#bc-particles` (hero canvas): IntersectionObserver on hero, pause when off-screen and on `visibilitychange`; cap DPR to 1.5; halve particle count on mobile.
- Atom orbit SVG script: stop the rAF loop when `#what` section is off-screen and when the tab is hidden.
- Marquee (`.bc-mq-track`): pause CSS animation when off-screen via `animation-play-state: paused`.
- Typewriter (`bc-flip`): already starts on IntersectionObserver — also stop the `setTimeout` loop when it leaves the viewport (today it keeps running forever once started).
- `.bc-bloom`: drop the `filter: blur(10px)` and the infinite breathe animation on ≤640px (keep the radial gradient look, lose the GPU cost).

**3. Reduce particle / star count on mobile**
- `#bc-particles` and `#bc-neural`: when `innerWidth < 720`, further reduce density (already partially done for neural). Halve max counts again on phones.

**4. Verify**
- After edits, re-screenshot the full mobile page and confirm gaps are gone and sections are densely stacked.
- Spot-check at 360×800 and 414×896.
- Open the preview and scroll past hero / atom / closer sections to confirm no jank.

### Out of scope (ask if you want them)
- A hamburger mobile nav.
- Replacing the orbit SVG animation with a static state on mobile.
- Image/asset format optimization (no large raster assets in this page).
