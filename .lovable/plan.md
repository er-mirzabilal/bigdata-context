# Hero Mobile Refinement

Scope: `src/legacy/big-context.html` only. CSS-only edits inside a `@media(max-width:640px)` block. No JS, no animation logic changes.

## Changes

### 1. Calm the background on mobile
- Reduce `.bc-bloom` size from `60vw` → `78vw` but drop opacity (`.55`) and shift its center up/left so it sits behind the headline area instead of bleeding into the tagline.
- Reduce `#bc-particles` opacity to `.45` on mobile so the network graphic recedes behind text.
- Keep all animations intact (no perf change requested here).

### 2. Headline legibility
- Tighten `.bc-name` to `font-size: clamp(2.2rem, 9.5vw, 3rem)` and `line-height: 1.05` on mobile so "Big Context™ & Company" breaks cleanly on 2 lines with the `&` not landing on the bright bloom.
- Shrink the `sup` ™ slightly and pull it closer (`top:-1.2em`) so it doesn't float visually detached.

### 3. Tagline spacing
- Reduce `.bc-tag` `margin-top` from `32px` → `20px` and font-size to `clamp(1.15rem, 5vw, 1.4rem)` so "Make enterprise data work at AI-scale." reads as one tight 2-line block.

### 4. CTA stack
- Change `.bc-hero-cta` to `flex-direction: column; gap: 10px; margin-top: 28px` on mobile.
- Make both buttons full-width (`width:100%; justify-content:center`) for clear tap targets.
- Keeps existing button styling/colors.

### 5. Hero rhythm
- Reduce `.bc-hero` `padding-top` from `80px` → `64px` on mobile and set `min-height: auto; padding-bottom: 100px` so the SCROLL cue is reachable without an oversized empty stretch.

### 6. Optional: section-edge padding
- Tighten `.bc-hero .bc-wrap` horizontal padding floor to `20px` (currently `clamp(22px,…)`) so headline gets a couple more px to breathe.

## Files touched
- `src/legacy/big-context.html` — extend the existing `@media(max-width:640px)` block (around line 48) with the new rules. ~20 lines of CSS, no markup changes.

## Out of scope
- Particle simulation perf (already addressed earlier).
- Desktop hero — untouched.
- Copy changes.
