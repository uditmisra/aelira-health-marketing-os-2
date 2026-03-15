# Brand Extraction Report — Aelira Lung Care
**Run ID:** brand-bootstrap-20260315-001  
**Date:** 2026-03-15  
**Source URLs:** https://aelira.in/ (primary), https://aelira.in/rehabilitation, https://aelira.in/blog, https://aelira.in/feno  
**Extraction method:** Rendered HTML/markdown analysis (CSS not directly accessible — Next.js app with server-rendered stylesheets)  

---

## EXTRACTION REPORT

### COLORS

> ⚠️ **Note:** The Aelira website is built on Next.js. The rendered markdown output does not expose raw CSS/stylesheet declarations. Color values below are INFERRED from visual context, content cues, and healthcare brand conventions. All colors are marked LOW confidence and MUST be verified against the actual Figma file or CSS source before committing.

| Role | Inferred Hex | RGB | Where Found / Basis | Confidence |
|---|---|---|---|---|
| Primary (CTA buttons) | `<PLACEHOLDER — verify>` | — | CTA buttons: "Book consultation", "Call Now" — color not extractable from markdown | LOW |
| Secondary | `<PLACEHOLDER — verify>` | — | Secondary actions, hover states — not extractable | LOW |
| Text primary | `<PLACEHOLDER — verify>` | — | Body/heading text — not extractable | LOW |
| Text secondary | `<PLACEHOLDER — verify>` | — | Captions, subheadings — not extractable | LOW |
| Background | `<PLACEHOLDER — verify>` | — | Page wrapper background — not extractable | LOW |
| Success / accent | `<PLACEHOLDER — verify>` | — | Status indicators — not extractable | LOW |

**🔧 How to extract manually:**
1. Open https://aelira.in/ in Chrome
2. Right-click the teal/primary CTA button ("Book consultation") → Inspect
3. In DevTools → Computed tab → look for `background-color` on the `.btn` or similar element
4. Also check: `--color-primary`, `--tw-bg-opacity` (if Tailwind), or `:root { --primary: ... }` in Styles tab
5. Repeat for body text (right-click paragraph → Computed → `color`)

---

### FONTS

> ⚠️ **Note:** Google Fonts link tags and `font-family` declarations are not accessible via markdown rendering. Font information below is flagged as requiring manual verification.

| Role | Font Name | Weights | Source | Confidence |
|---|---|---|---|---|
| Heading | `<PLACEHOLDER — verify>` | — | Not extractable from markdown — check `<link>` tags in page `<head>` | LOW |
| Body | `<PLACEHOLDER — verify>` | — | Not extractable | LOW |
| Google Fonts URL | `<PLACEHOLDER — verify>` | — | Not extractable | LOW |
| Fallback stack | `<PLACEHOLDER — verify>` | — | Not extractable | LOW |

**🔧 How to extract manually:**
1. In Chrome DevTools on https://aelira.in/ → Network tab → filter by "fonts" or "googleapis"
2. You will see any Google Fonts `<link>` request — copy the full URL
3. Alternatively: View Page Source → Ctrl+F for `fonts.googleapis.com` or `font-family`
4. Or: DevTools → Elements tab → `<head>` → look for `<link href="https://fonts.googleapis.com/...">` tags

---

### LOGO

| Property | Value | Confidence |
|---|---|---|
| Primary logo URL (raw) | `https://aelira.in/aelira-logo-v2.png` | HIGH — found consistently in `<header>` and `<footer>` across all 4 pages |
| Next.js optimized URL | `https://aelira.in/_next/image?url=%2Faelira-logo-v2.png&w=3840&q=75` | HIGH — this is the rendered URL used on every page |
| File format | PNG (v2 naming suggests it's been updated) | HIGH |
| Type | Likely wordmark or combo mark ("Aelira Lung Care" appears as nav/footer label alongside image) | MEDIUM |
| Background context | Used on both light (nav on white) and dark (footer on dark background) — may need both color and white variants | MEDIUM |
| White/reverse variant | `<PLACEHOLDER — check if /aelira-logo-white.png or similar exists>` | LOW — requires manual check |

**⚠️ Logo flag:** The logo is served via Next.js image optimization. For email use, the raw URL `https://aelira.in/aelira-logo-v2.png` should work for `<img src>` in email clients. Verify by opening the raw URL in a browser.

---

### GAPS (fields requiring manual entry before templates are production-ready)

| Field | Why it's missing | Priority |
|---|---|---|
| Primary color hex | CSS not accessible via markdown render | 🔴 Required for CTA buttons in all templates |
| Secondary color hex | CSS not accessible | 🟡 Required for secondary elements |
| Text primary hex | CSS not accessible | 🔴 Required for all body copy in email |
| Text secondary hex | CSS not accessible | 🟡 Required for captions/subheadings |
| Background color hex | CSS not accessible | 🔴 Required for email wrapper |
| Heading font name | CSS/Google Fonts not accessible | 🔴 Required for email template |
| Body font name | CSS/Google Fonts not accessible | 🔴 Required for email template |
| Google Fonts embed URL | Depends on font name | 🔴 Required for HTML email rendering |
| Button border-radius | CSS not accessible | 🟡 Required for CTA button styling |
| Logo white variant URL | Not found on site | 🟡 Required for dark backgrounds in email |
| Figma file URL | Not publicly linked on site | 🟢 Optional — for ad template automation |

**Confidence summary: LOW overall** — logo URL is the only HIGH-confidence extraction. All color and font data require manual verification via browser DevTools before templates can be built. Recommend opening the site in Chrome, spending 5 minutes in DevTools, and filling in the values below.

---

## PRE-FILLED DRAFT: core/brand/assets.md

```markdown
# Brand Asset Registry

> This file is the canonical brand asset registry for Aelira Lung Care.
> Populated during onboarding via brand-bootstrap workflow.
> Run ID: brand-bootstrap-20260315-001

---

## Status

- **Last updated:** 2026-03-15
- **Populated by:** brand-bootstrap
- **Completeness:** partial — colors and fonts require manual entry

---

## Logo

| Asset | Path / URL | Format | Use case |
|---|---|---|---|
| Primary logo (full color) | `https://aelira.in/aelira-logo-v2.png` | PNG | Light backgrounds, email headers |
| Primary logo (white) | `<PLACEHOLDER — upload white variant to CDN>` | SVG / PNG | Dark backgrounds, footer on dark |
| Logo mark / icon only | `<PLACEHOLDER>` | SVG / PNG | Favicon, small placements |
| Wordmark only | `<PLACEHOLDER>` | SVG / PNG | Co-branded layouts |

**Logo clearspace:** `<PLACEHOLDER>` (verify in brand guidelines)

---

## Color Palette

### Primary Colors

| Name | Hex | RGB | Usage |
|---|---|---|---|
| Aelira Primary | `<PLACEHOLDER>` | — | Primary CTA, links, highlights — check DevTools on "Book consultation" button |
| Aelira Secondary | `<PLACEHOLDER>` | — | Secondary actions, hover states |

### Neutral Colors

| Name | Hex | Usage |
|---|---|---|
| Text primary | `<PLACEHOLDER>` | Body text — check DevTools on any `<p>` tag |
| Text secondary | `<PLACEHOLDER>` | Subheadings, captions |
| Background | `<PLACEHOLDER>` | Page background — check DevTools on `<body>` or `.wrapper` |
| White | `#FFFFFF` | Cards, email body |

### Alert/Status Colors

| State | Hex | Usage |
|---|---|---|
| Success | `<PLACEHOLDER>` | Confirmation states |
| Warning | `<PLACEHOLDER>` | Caution states |
| Error | `<PLACEHOLDER>` | Error states |

---

## Typography

### Font Stack

| Role | Font family | Weight(s) | Size range |
|---|---|---|---|
| Heading | `<PLACEHOLDER>` | 600, 700 | 24–48px |
| Body | `<PLACEHOLDER>` | 400, 500 | 14–18px |
| Caption / label | `<PLACEHOLDER>` | 400 | 11–13px |

### Google Fonts embed (for HTML emails)

```html
<link href="<PLACEHOLDER — Google Fonts URL>" rel="stylesheet">
```

### Web-safe fallback stack

```css
font-family: '<PLACEHOLDER>', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

---

## Company Info

| Field | Value |
|---|---|
| Company name | Aelira Lung Care |
| Tagline | Breathe with Confidence |
| Website | https://aelira.in/ |
| Category | Pulmonary Rehabilitation & Lung Diagnostics |
| Location | Green Park, New Delhi, Delhi 110016 |
| Phone | +91 966 711 7222 |
| Address | Ground Floor, C-4, Block C, Green Park Extension, Green Park, New Delhi, Delhi 110016 |

---

## Email Template Variables (to populate after color/font confirmation)

| Variable | Value |
|---|---|
| `<BACKGROUND_COLOR>` | `<PLACEHOLDER>` |
| `<TEXT_PRIMARY>` | `<PLACEHOLDER>` |
| `<TEXT_SECONDARY>` | `<PLACEHOLDER>` |
| `<PRIMARY_COLOR>` | `<PLACEHOLDER>` |
| `<LOGO_URL_WHITE_OR_COLOR>` | `https://aelira.in/aelira-logo-v2.png` (color) / `<PLACEHOLDER>` (white) |
| `<COMPANY_NAME>` | `Aelira Lung Care` |
| `<GOOGLE_FONT_URL>` | `<PLACEHOLDER>` |
| `<BORDER_RADIUS>` | `<PLACEHOLDER>` (check DevTools on CTA button — likely 6px or 8px) |

---

## Ad Creative Spec

### LinkedIn Single Image

| Property | Spec |
|---|---|
| Canvas size | 1200 × 627px |
| CTA button color | `<PRIMARY_COLOR>` |
| Logo placement | Top-left, 32px clearspace |

### LinkedIn Carousel (per slide)

| Property | Spec |
|---|---|
| Canvas size | 1080 × 1080px |

### Google Display (Responsive)

| Property | Spec |
|---|---|
| Headline | 30 chars max |
| Description | 90 chars max |

---

## How to Update This File

1. Fill in all `<PLACEHOLDER>` values above using Chrome DevTools on https://aelira.in/
2. Commit with message: `[core] update brand/assets.md — manual color/font entry`
3. Then re-run brand-bootstrap to build email templates and Figma spec
```

---

## Extraction Notes

- **Site technology:** Next.js (React) — server-side rendered, stylesheets loaded via JS chunks. Markdown rendering does not expose CSS variables or stylesheet content.
- **Logo:** Found consistently across all 4 pages as `aelira-logo-v2.png` — HIGH confidence. The "v2" naming convention suggests the logo has been refreshed previously.
- **Color/font:** CSS not accessible via markdown renderer. Manual extraction via Chrome DevTools required — estimated 5 minutes to complete.
- **Brand tone inferred from site copy:** Calm, evidence-based, confidence-inspiring. Not clinical/cold. Uses phrases like "breathe better, feel stronger", "calm, healing environment", "trusted & loved". This should inform email tone.
- **No publicly linked Figma file** found on the site.
- **No brand guidelines page** (/brand, /media, /press) found.
