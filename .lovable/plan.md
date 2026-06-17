## Services Page Improvement Plan

### Current State

The Services page has a clean structure (Hero → Approach → Services buckets → Firm/Team → Footer) with the home-page floating navbar. However, several issues hold it back:

### Prioritized Improvements

1. **Add an on-page Contact / Get Started section**
  - The nav "Get Started" jumps to the home page (`/#get-started`), pulling users away from the services context.
  - **Fix**: Add a `#get-started` contact section at the bottom of the services page (before the footer) with a form or clear CTA so users convert without leaving.
2. **Fix all broken footer links**
  - Every footer link points to `big-context-aubergine.html#` (a non-existent file).
  - **Fix**: Update links to real routes — `/#product` (or disable until pages exist), `/services`, `mailto:` for Contact, etc.
3. **Fix self-referencing / circular links**
  - The "Transformation Firm" widget on the home page links to `/services`, but on the services page there's no reciprocal clarity. The "Learn more" CTA in the home-page widget also points to `/services` (same page when visited from services).
  - **Fix**: Already fixed in previous edits, but verify no other self-links remain.
4. **Expose team bios or remove dead code**
  - `.sv-bio { display:none }` hides the team member bios permanently. Either show them on hover/click or remove the hidden markup.
  - **Fix**: Show bios on partner card hover, or remove the unused HTML.
5. **Polish responsive behavior**
  - The orb canvas is centered at `W*0.69` which pushes it off-screen on narrow viewports; the grid breakpoints for buckets look okay but should be verified.

### Scope Decision

All the above are frontend/HTML/CSS changes within `src/legacy/services.html` and `src/routes/services.tsx` — no backend or new dependencies needed.

Which of these would you like to tackle first, or should I implement all of them?