# Mobile Polish for the First Figure

Six improvements to the "Old World → Context Layer → AI Agents" transformation figure on mobile, taking it from ~4 screens of scroll to ~2.5 with a clearer story. All changes are mobile-scoped (max-width media queries) — desktop layout stays exactly as it is.

## 1. Compress "The old world" lists into pill chips

- On mobile, the 9 silo bullets and 4 tribal-knowledge bullets become compact 2-column pill chips (small rounded tags in a wrap grid).
- Cuts that section's height by roughly 60% and visually reads as a "wall of fragmentation," which fits the message.
- The "… AND MORE" label becomes a final muted chip instead of a floating footnote.

## 2. Animated flow connector between stages

- The faint vertical line between stages gets a downward-traveling pulse dot (reusing the existing pulse animation from the desktop wires) plus a small chevron at the bottom.
- Reads as past → core → future even when only one stage is on screen.
- Hidden under `prefers-reduced-motion`, consistent with the rest of the figure.

## 3. Numbered stage eyebrows

- Eyebrows become "01 — The Past", "02 — The Evolution", "03 — The Future" so users stay oriented in the sequence during the long scroll.
- Applied on all breakpoints (it helps on desktop too, but is subtle).

## 4. Tighter agents grid

- Smaller cards on mobile: reduced icon size, tighter padding, smaller gap.
- "Strategy" (the 9th, orphaned card) spans both columns so the grid ends cleanly.
- Saves about half a screen of height.

## 5. Scroll-reveal animation per stage

- Each stage (header + cards) fades and slides up subtly as it enters the viewport, using a lightweight IntersectionObserver already-in-page script pattern.
- One-time reveal, ~0.5s ease-out, disabled under `prefers-reduced-motion`.

## 6. Reduced vertical padding on mobile

- Gaps between the three stages and around the figure shrink ~30% on small screens to keep scroll momentum.

## Technical details

- All changes live in `src/legacy/big-context.html` (CSS + markup + a small inline IntersectionObserver script for reveals).
- Mobile rules scoped under the existing figure mobile breakpoint; desktop wires, pulses, and 3-column layout untouched.
- Verification: preview at 390px width, walk the figure top to bottom, and confirm desktop at 1280px is unchanged.
