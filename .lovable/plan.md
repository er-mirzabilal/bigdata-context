## Goal
Keep the existing dual-row marquee in `#ecosystem` but apply the selected "Premium logo grid" treatment to the surrounding chrome: centered Instrument Serif headline, gradient underline, ambient purple glow, quieter logos with hover spotlight, and a hairline footer microcopy.

## Scope
- File: `src/legacy/big-context.html` (ecosystem section + CSS)
- Keep all 23 existing logos and the two reversed `.bc-mq-track` rows. No new logos.

## Changes

### 1. Markup (lines ~631–644)
Wrap the existing marquee in a new header + glow stage; do not remove `.bc-marquee` / `.bc-mq-track`.

```text
<section class="bc-section" id="ecosystem" style="padding:96px 0 48px">
  <div class="bc-wrap">
    <div class="bc-eco-head bc-reveal">
      <div class="bc-eyebrow" style="justify-content:center"><span class="bar"></span>Ecosystem&nbsp;&nbsp;/&nbsp;&nbsp;02</div>
      <h2 class="bc-eco-title">Multi-Ecosystem Coverage</h2>
      <div class="bc-eco-rule"></div>
      <p class="bc-eco-sub">Trusted by teams turning enterprise data into context for AI.</p>
    </div>

    <div class="bc-eco-stage bc-reveal">
      <div class="bc-eco-glow"></div>
      <div class="bc-marquee">
        <div class="bc-mq-track"> … existing logos … </div>
        <div class="bc-mq-track rev"> … existing logos … </div>
      </div>
    </div>
  </div>
</section>
```

The current left-aligned eyebrow + `.bc-eco-intro` paragraph are removed (replaced by the new centered head block).

### 2. CSS (append; also lighten existing `.bc-logo`)

```text
.bc-eco-head { text-align:center; max-width:720px; margin:0 auto; }
.bc-eco-head .bc-eyebrow { display:inline-flex; }
.bc-eco-title { font-family:var(--serif); font-size:clamp(2.4rem,4.2vw,3.4rem);
                color:#fff; letter-spacing:-.01em; margin-top:18px; }
.bc-eco-rule  { width:160px; height:1px; margin:18px auto 0;
                background:linear-gradient(90deg,transparent,rgba(var(--p-lav),.9),transparent);
                box-shadow:0 0 18px rgba(var(--p-lav),.45); border-radius:2px; }
.bc-eco-sub   { margin:22px auto 0; max-width:56ch; color:var(--muted);
                font-size:.95rem; line-height:1.55; }

.bc-eco-stage { position:relative; margin-top:56px; }
.bc-eco-glow  { position:absolute; left:50%; top:50%; width:760px; height:280px;
                transform:translate(-50%,-50%); pointer-events:none; z-index:0;
                background:radial-gradient(ellipse at center, rgba(var(--p-lav),.18), transparent 65%);
                filter:blur(60px); }
.bc-eco-stage .bc-marquee { position:relative; z-index:1; }

/* Quieter, more uniform logos inside the marquee */
.bc-logo { background:transparent; border:0; }
.bc-logo img { filter:grayscale(1) brightness(1.4); opacity:.55;
               transition:opacity .35s, filter .35s, transform .35s; }
.bc-logo:hover img { opacity:1; filter:grayscale(0) brightness(1); transform:scale(1.05); }
```

### 3. Footer note
Add below `.bc-eco-stage`:
```text
<div class="bc-eco-foot">+ more partners and connectors</div>
```
```text
.bc-eco-foot { margin:48px auto 0; max-width:760px; padding-top:20px; text-align:center;
               border-top:1px solid rgba(255,255,255,.06);
               font-family:var(--mono); font-size:11px; letter-spacing:.3em;
               text-transform:uppercase; color:var(--muted-2); }
```

### 4. Cleanup
- Remove the old `.bc-eco-intro` rule (line ~403) and its mobile override; no longer used.
- Keep marquee animation, mask, and reversed track untouched.

## Verification
- Screenshot the section at 1440 and 390 widths.
- Confirm: marquee still scrolls in both directions, headline is centered with glowing underline, logos read as quiet grayscale and spotlight on hover, microcopy footer visible.
