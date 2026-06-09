## Goal
You're deploying to Vercel, so the 8 brand logos need to live in the git repo (not Lovable's CDN at `/__l5e/assets-v1/...`, which only resolves on Lovable's infrastructure).

## What I'll do

1. **Re-download the 8 logos from the Lovable CDN** back into the project as real binary files:
   - `public/logos/herschel.png`
   - `public/logos/puma-golf.png`
   - `public/logos/otherwise.png`
   - `public/logos/my-trove.webp`
   - `public/logos/palm-tree-crew.png`
   - `public/logos/cotopaxi.png`
   - `public/logos/and-marketing.png`
   - `public/logos/hotmex-express.png`

   I'll put them under `public/logos/` so they're served as static files at `/logos/<name>` on Vercel with no bundler/import gymnastics — this works cleanly for `src/legacy/big-context.html` which references plain URLs.

2. **Rewrite the `<img src="...">` references** in `src/legacy/big-context.html` (both the forward and reverse marquee tracks, 16 entries total) from the current `/__l5e/assets-v1/...` URLs to `/logos/<filename>`.

3. **Delete the 8 `.asset.json` pointer files** in `src/assets/logos/` so the repo no longer carries dead CDN pointers.

4. **Delete the CDN-hosted copies** via `assets--delete_asset` so we're not leaving orphaned uploads behind (optional — say the word if you'd rather keep them as a backup).

## Notes
- Nothing else changes — the logo styling (invert filter, padding, hover) and marquee markup stay exactly as they are.
- Total added repo weight: ~317 KB across the 8 files.
- After this, the ecosystem section will render identically on Lovable preview and on Vercel.

Want me to proceed?
