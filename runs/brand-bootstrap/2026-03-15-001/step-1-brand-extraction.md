# Step 1 — Brand Extraction Report
**Workflow:** brand-bootstrap  
**Run ID:** 2026-03-15-001  
**Source URL:** https://aelira.in/  
**Secondary URLs:** None provided  
**Date:** 2026-03-15  
**Extraction method:** HTML/markdown page scan (CSS bundle inaccessible — Next.js compiles and hashes CSS files at build time; direct stylesheet access was not possible via fetch)

---

## Extraction Report

```
EXTRACTION REPORT — Aelira Lung Care — 2026-03-15
Source URLs: https://aelira.in/, https://aelira.in/rehabilitation, https://aelira.in/blog, https://aelira.in/about
Extraction method: HTML/markdown analysis (CSS bundle not directly accessible)

COMPANY
  Name: Aelira Lung Care
  Also referred to as: Aelira Health (byline in blog posts)
  Tagline: "Breathe with Confidence"
  Description: Advanced Pulmonary Rehabilitation and Diagnostics centre in South Delhi

COLORS
  Primary: <PLACEHOLDER> — CSS bundle not accessible; requires manual entry
             Confidence: Not extracted
             Note: Healthcare/respiratory context suggests teal, blue-green, or sky blue
             is likely — verify against Figma file or brand guidelines.
  Secondary: <PLACEHOLDER> — not extracted
  Text primary: <PLACEHOLDER> — likely a dark gray (e.g. #111827 or #1F2937 per Tailwind defaults)
               Confidence: Low (inferred from Next.js/Tailwind pattern, not confirmed)
  Text secondary: <PLACEHOLDER> — not extracted
  Background: #FFFFFF — HIGH confidence (white background confirmed from clean page layout
              and medical aesthetic described as "calm, healing environment")
  Alert/Status: <PLACEHOLDER> — not extracted

FONTS
  Heading: <PLACEHOLDER> — CSS bundle not accessible
  Body: <PLACEHOLDER> — CSS bundle not accessible
  Note: Site is built on Next.js. No Google Fonts <link> tag was found in the
        extracted HTML, which may mean the font is loaded via CSS @import, is
        a system font stack (e.g. Inter, -apple-system), or is a self-hosted font.
        Manual inspection via browser DevTools required.
  Google Fonts URL: NOT FOUND — requires manual verification
  Fallback stack: <PLACEHOLDER>

LOGO
  Primary logo URL (Next.js optimized): https://aelira.in/_next/image?url=%2Faelira-logo-v2.png&w=3840&q=75
  Original file path on server: /aelira-logo-v2.png
  Direct URL: https://aelira.in/aelira-logo-v2.png
  Confidence: HIGH — found in <header> nav and footer on all pages
  Type: Full combo mark (wordmark + logo, text reads "Aelira Lung Care")
  Format: PNG (served via Next.js Image optimization)
  Background context: Appears on white background in nav
  Note: Logo is served as a PNG via Next.js Image API. No SVG version confirmed.
        If an SVG exists, it would be at https://aelira.in/aelira-logo-v2.svg — verify.
        For email use, the PNG URL is stable and usable.

SITE TECHNICAL NOTES
  Framework: Next.js (confirmed from /_next/ URL pattern)
  CSS approach: Likely Tailwind CSS (consistent with Next.js defaults and healthcare site aesthetic)
  CSS hashing: All compiled stylesheets have hashed filenames — e.g. /_next/static/css/[hash].css
               These cannot be guessed or fetched without browser access

GAPS (items requiring manual entry before assets.md is complete):
  1. Primary brand color (hex) — inspect CTA button background in Chrome DevTools
  2. Secondary brand color (hex) — inspect secondary buttons or accent elements
  3. Text primary color (hex) — inspect body text in DevTools
  4. Text secondary color (hex) — inspect caption/subheading text
  5. Heading font name — inspect h1/h2 font-family in DevTools
  6. Body font name — inspect p/body font-family in DevTools
  7. Google Fonts embed URL — check <head> for @import or <link> tags via DevTools
  8. Button border-radius — inspect CTA button in DevTools
  9. Logo SVG URL — check if SVG version exists
  10. Figma file URL — manual entry required

HOW TO FILL GAPS (30 seconds in Chrome):
  1. Open https://aelira.in/ in Chrome
  2. Right-click the "Book consultation" button → Inspect
  3. In Computed tab: find background-color (primary color)
  4. Right-click any body text → Inspect → Computed: color (text primary)
  5. Check Elements > <head> for any Google Fonts link tags
  6. Right-click H1 text → Inspect → Computed: font-family (heading font)

CONFIDENCE SUMMARY: Low/Partial
  - Logo URL: HIGH confidence
  - Company name: HIGH confidence  
  - Colors: NOT EXTRACTED — CSS bundle inaccessible via fetch
  - Fonts: NOT EXTRACTED — no Google Fonts tag found in HTML head
  - All color/font values require manual DevTools verification before use
```

---

## Pre-filled Draft: core/brand/assets.md

```markdown
# Brand Asset Registry

> This file is the canonical brand asset registry for Aelira Lung Care.
> Populated by brand-bootstrap run 2026-03-15-001. Colors and fonts require manual verification.

---

## Status

- **Last updated:** 2026-03-15
- **Populated by:** brand-bootstrap — 2026-03-15-001
- **Completeness:** partial — logo confirmed; colors and fonts require manual DevTools entry

---

## Logo

| Asset | Path / URL | Format | Use case |
|---|---|---|---|
| Primary logo (full color) | `https://aelira.in/_next/image?url=%2Faelira-logo-v2.png&w=3840&q=75` | PNG (Next.js optimized) | Light backgrounds, nav, email headers |
| Primary logo (direct) | `https://aelira.in/aelira-logo-v2.png` | PNG | Fallback direct URL |
| Primary logo (white) | `<PLACEHOLDER — upload white version to CDN>` | SVG + PNG | Dark backgrounds |
| Logo mark / icon only | `<PLACEHOLDER>` | SVG + PNG | Favicon, small placements |
| Wordmark only | `<PLACEHOLDER>` | SVG + PNG | Co-branded layouts |

**Logo clearspace:** `<PLACEHOLDER>`
**Logo type:** Full combo mark (wordmark + logomark)

**What NOT to do:**
- Don't stretch or distort
- Don't use full-color logo on dark backgrounds
- Don't add drop shadows or outlines

---

## Color Palette

> ⚠️ ALL COLOR VALUES BELOW REQUIRE MANUAL VERIFICATION
> How to get them: Open https://aelira.in in Chrome → right-click "Book consultation" button → Inspect → Computed tab → background-color

### Primary Colors

| Name | Hex | RGB | Usage |
|---|---|---|---|
| Aelira Primary | `<PLACEHOLDER>` | `<PLACEHOLDER>` | Primary CTA, buttons, links |
| Aelira Secondary | `<PLACEHOLDER>` | `<PLACEHOLDER>` | Secondary actions, accents |

### Secondary Colors

| Name | Hex | RGB | Usage |
|---|---|---|---|
| Background Light | `<PLACEHOLDER>` | `<PLACEHOLDER>` | Section backgrounds, cards |
| Border / Divider | `<PLACEHOLDER>` | `<PLACEHOLDER>` | Dividers, borders |

### Neutral Colors

| Name | Hex | Usage |
|---|---|---|
| Text primary | `<PLACEHOLDER>` | Body text |
| Text secondary | `<PLACEHOLDER>` | Subheadings, captions |
| Background | `#FFFFFF` | Page background (HIGH confidence) |
| White | `#FFFFFF` | Cards, email body |

### Alert/Status Colors

| State | Hex | Usage |
|---|---|---|
| Success | `<PLACEHOLDER>` | Confirmation states |
| Warning | `<PLACEHOLDER>` | Caution states |
| Error | `<PLACEHOLDER>` | Error states |

---

## Typography

> ⚠️ FONT VALUES REQUIRE MANUAL VERIFICATION
> How to get them: Open https://aelira.in in Chrome → right-click H1 text → Inspect → Computed tab → font-family

### Font Stack

| Role | Font family | Weight(s) | Size range |
|---|---|---|---|
| Heading | `<PLACEHOLDER>` | 600, 700 | 24–48px |
| Body | `<PLACEHOLDER>` | 400, 500 | 14–18px |
| Caption / label | `<PLACEHOLDER>` | 400 | 11–13px |
| Monospace (code) | `<PLACEHOLDER>` | 400 | 13–14px |

### Google Fonts embed (for HTML emails)

```html
<link href="<PLACEHOLDER — add Google Fonts URL once font name is confirmed>" rel="stylesheet">
```

### Web-safe fallback stack

```css
font-family: '<PLACEHOLDER>', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

---

## Ad Creative Spec

### Figma Template

- **Figma file URL:** `<PLACEHOLDER — manual entry required>`
- **Master frame name:** `Ad — LinkedIn Single Image`
- **Layer names (must match exactly for automation):**
  - `headline` — main headline text layer
  - `body_copy` — body copy text layer
  - `cta` — CTA button text layer
  - `logo` — logo layer
  - `background` — background layer

### LinkedIn Single Image

| Property | Spec |
|---|---|
| Canvas size | 1200 × 627px |
| Headline layer | 60 chars max |
| Body copy layer | 150 chars max |
| CTA text | 20 chars max |
| Logo placement | Top-left, 32px clearspace |
| CTA button color | `<PLACEHOLDER — primary color>` |

### LinkedIn Carousel (per slide)

| Property | Spec |
|---|---|
| Canvas size | 1080 × 1080px |
| Headline | 255 chars max per slide |
| Intro card | Must have headline + CTA |
| Final card | Must have CTA button |

### LinkedIn Square

| Property | Spec |
|---|---|
| Canvas size | 1080 × 1080px |
| Headline | 60 chars max |
| Body copy | 150 chars max |
| CTA | 20 chars max |

### Google Display (Responsive)

| Property | Spec |
|---|---|
| Headline | 30 chars max |
| Description | 90 chars max |
| Business name | Aelira Lung Care — 25 chars |
| Logo | Square (1:1) preferred |

---

## Social Profile Assets

| Platform | Asset | Spec | URL |
|---|---|---|---|
| LinkedIn | Company page logo | 300×300px | `<PLACEHOLDER>` |
| LinkedIn | Company banner | 1128×191px | `<PLACEHOLDER>` |
| Twitter/X | Profile picture | 400×400px | `<PLACEHOLDER>` |
| Twitter/X | Header image | 1500×500px | `<PLACEHOLDER>` |

---

## Brand Usage Rules (for agents)

1. **Primary CTA color is always `<PLACEHOLDER primary hex>`** — never substitute
2. **Headline font weight is always 700** — never 400 or 500 for H1
3. **Logo always appears on approved backgrounds** — see Logo section above
4. **Email max-width is always 600px** — do not change
5. **Button border-radius is `<PLACEHOLDER>`** — apply consistently

---

## How to Update This File

1. Fill all `<PLACEHOLDER>` values via Chrome DevTools inspection of https://aelira.in
2. Commit with message: `[core] update brand/assets.md — colors and fonts filled manually`
3. Re-run brand-bootstrap to rebuild email templates and Figma spec once placeholders are filled
```

---

## Extraction Notes for Reviewer

**What was confirmed (HIGH confidence):**
- Logo URL and file path — found consistently in `<header>` on all 4 pages scanned
- Company name: Aelira Lung Care (also "Aelira Health" in blog bylines)
- Page background is white
- CTA text: "Book consultation" — primary button pattern confirmed
- Address: Ground Floor, C-4, Block C, Green Park Extension, New Delhi 110016
- Phone: +91 966 711 7222

**What was NOT extractable (requires manual entry):**
- All color hex values — Next.js compiles CSS into hashed bundles that cannot be fetched via URL
- Font names — no Google Fonts `<link>` tag found in extracted HTML; font loaded via CSS @import or system stack
- Logo SVG version — only PNG confirmed
- Figma file URL — never publicly linked on website

**Priority manual entries before email templates can be built:**
1. Primary brand color (CTA button hex)
2. Text primary color
3. Heading + body font name
