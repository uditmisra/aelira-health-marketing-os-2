# Brand Asset Registry

> This file is the canonical brand asset registry for Aelira Lung Care.
> Populated by brand-bootstrap workflow — run 2026-03-15-001.
> Every agent that produces visual or email output reads this file first.

---

## Status

- **Last updated:** 2026-03-15
- **Populated by:** brand-bootstrap — run 2026-03-15-001
- **Completeness:** partial — logo confirmed (High); colors and font are Medium confidence (visual screenshot extraction). Verify via DevTools before first campaign goes live.
- **Next action:** Confirm hex values in Chrome DevTools → update this file → re-run email-template-builder if any values change.

---

## Logo

| Asset | Path / URL | Format | Use case |
|---|---|---|---|
| Primary logo (full color) | `https://aelira.in/aelira-logo-v2.png` | PNG | Light backgrounds, email headers, nav |
| Primary logo (Next.js CDN) | `https://aelira.in/_next/image?url=%2Faelira-logo-v2.png&w=3840&q=75` | PNG (optimized) | Fallback CDN URL |
| Primary logo (white) | `<PLACEHOLDER — upload white variant to CDN>` | SVG + PNG | Dark backgrounds, dark carousel slides |
| Logo mark / icon only | `<PLACEHOLDER>` | SVG + PNG | Favicon, small placements |
| Wordmark only | `<PLACEHOLDER>` | SVG + PNG | Co-branded, horizontal layouts |

**Logo type:** Full combo mark (wordmark + logomark). Text reads "Aelira Lung Care".
**Logo clearspace:** `<PLACEHOLDER — equal to approx. height of the logomark icon>`

**What NOT to do:**
- Don't stretch or distort
- Don't use the full-color logo on dark backgrounds (get the white variant)
- Don't add drop shadows or outlines

---

## Color Palette

> ⚠️ CONFIDENCE: Medium — all hex values below were read from a screenshot of the hero section.
> Verify via Chrome DevTools before first campaign: open aelira.in → right-click any element → Inspect → Computed tab.

### Primary Colors

| Name | Hex | RGB | Confidence | Usage |
|---|---|---|---|---|
| Aelira Primary Green | `#2E6B40` | `rgb(46, 107, 64)` | Medium | Primary CTA buttons, key accents |
| Aelira Dark Green | `#1B5E30` | `rgb(27, 94, 48)` | Medium | Headline text, logo background option |
| Aelira Mint Accent | `#86D08A` | `rgb(134, 208, 138)` | Medium | Highlight/accent words, decorative elements |

### Secondary Colors

| Name | Hex | RGB | Confidence | Usage |
|---|---|---|---|---|
| Warm Cream | `#F0EBE0` | `rgb(240, 235, 224)` | Medium | Page background, email wrapper, frame backgrounds |
| White | `#FFFFFF` | `rgb(255, 255, 255)` | High | Email body cards, content areas |

### Neutral Colors

| Name | Hex | Confidence | Usage |
|---|---|---|---|
| Text primary (dark green) | `#1B5E30` | Medium | Headings, strong emphasis |
| Text secondary (gray-green) | `#6B7B6E` | Medium | Body copy, subheadings, captions |
| Background (warm cream) | `#F0EBE0` | Medium | Page/email background |
| White | `#FFFFFF` | High | Cards, content blocks |

### Alert/Status Colors

| State | Hex | Usage |
|---|---|---|
| Success | `<PLACEHOLDER>` | Confirmation states |
| Warning | `<PLACEHOLDER>` | Caution states |
| Error | `<PLACEHOLDER>` | Error states |

---

## Typography

> ⚠️ CONFIDENCE: Medium — font identified visually as DM Sans from screenshot letterforms.
> Could also be Plus Jakarta Sans. Verify: Chrome DevTools → right-click H1 → Inspect → Computed → font-family.

### Font Stack

| Role | Font family | Weight(s) | Size range | Confidence |
|---|---|---|---|---|
| Heading | `DM Sans` | 700 | 24–48px | Medium |
| Body | `DM Sans` | 400, 500 | 14–18px | Medium |
| Caption / label | `DM Sans` | 400 | 11–13px | Medium |
| Monospace (code) | `<PLACEHOLDER>` | 400 | 13–14px | — |

### Google Fonts embed (for HTML emails)

```html
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### Web-safe fallback stack

```css
font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

---

## Button Spec

| Property | Value | Confidence |
|---|---|---|
| Border-radius | `50px` (pill shape) | Medium — confirmed from screenshot |
| Primary fill | `#2E6B40` | Medium |
| Text color | `#FFFFFF` | High |
| Font | DM Sans, weight 600 | Medium |

---

## Email Templates

> Full production HTML templates are in `client-setup/templates/`.
> Use those files — do not build from the shell below for production.

### Variable Legend (resolved values)

| Variable | Value | Confidence |
|---|---|---|
| `BACKGROUND_COLOR` | `#F0EBE0` | Medium |
| `TEXT_PRIMARY` | `#1B5E30` | Medium |
| `TEXT_SECONDARY` | `#6B7B6E` | Medium |
| `PRIMARY_COLOR` | `#2E6B40` | Medium |
| `LOGO_URL` | `https://aelira.in/aelira-logo-v2.png` | High |
| `LOGO_URL_WHITE` | `<PLACEHOLDER>` | — |
| `COMPANY_NAME` | `Aelira Lung Care` | High |
| `GOOGLE_FONT_URL` | `https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap` | Medium |
| `FONT_NAME` | `DM Sans` | Medium |
| `BORDER_RADIUS` | `50px` | Medium |
| `COMPANY_ADDRESS` | `Ground Floor, C-4, Block C, Green Park Extension, New Delhi 110016` | High |
| `COMPANY_PHONE` | `+91 966 711 7222` | High |

### Templates built

| Template | File | Use case |
|---|---|---|
| Marketing | `client-setup/templates/email-template-marketing.html` | Newsletters, campaigns, announcements |
| Outbound | `client-setup/templates/email-template-outbound.html` | Sales/SDR sequences, referral outreach |

---

## Ad Creative Spec

### Figma Template

- **Figma file URL:** `<PLACEHOLDER — add after designer creates the file>`
- **Figma file name (when created):** `Aelira Lung Care — Ad Templates`
- **Full spec:** `client-setup/templates/figma-spec-2026-03-15-001.md`
- **Layer names (must match exactly for automation):**
  - `headline` — main headline text layer
  - `body_copy` — body copy text layer
  - `cta` — CTA button text layer (inside `cta_button` group)
  - `cta_button` — group containing button shape + `cta` text
  - `logo` — logo image layer
  - `background` — background rectangle or image layer

### Ad Format Specs

#### LinkedIn Single Image

| Property | Spec |
|---|---|
| Canvas size | 1200 × 627px |
| Headline layer | 60 chars max |
| Body copy layer | 100 chars max |
| CTA text | 20 chars max |
| Logo placement | Top-left, 40px clearspace |
| CTA button color | `#2E6B40` |
| CTA border-radius | 50px (pill) |

#### LinkedIn Square

| Property | Spec |
|---|---|
| Canvas size | 1080 × 1080px |
| Headline | 60 chars max |
| Body copy | 120 chars max |
| CTA | 20 chars max |

#### LinkedIn Carousel (per slide)

| Property | Spec |
|---|---|
| Canvas size | 1080 × 1080px |
| Headline | 80 chars max per slide (255 LinkedIn limit, 80 recommended) |
| Intro card | Must have headline + CTA button |
| Final card | Must have CTA button, use dark green (#1B5E30) background |

#### Google Display (Responsive)

| Property | Spec |
|---|---|
| Short headline | 30 chars max |
| Long headline | 90 chars max |
| Description | 90 chars max |
| Business name | `Aelira Lung Care` (17 chars ✓) |
| Logo | Square 1200×1200px, horizontal 1200×300px |

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

When producing any output that includes brand elements, apply these rules:

1. **Primary CTA color is always `#2E6B40`** — never substitute another green
2. **Headline font weight is always 700** — never 400 or 500 for H1
3. **Font is DM Sans** — with `-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` fallback
4. **Button border-radius is 50px (pill)** — apply consistently across all CTAs
5. **Logo always appears on cream or white backgrounds** — white variant required for dark slides
6. **Email max-width is always 600px** — do not change
7. **Background color for emails and ad frames is `#F0EBE0`** (warm cream) — not pure white
8. **Accent mint `#86D08A` is for highlights only** — not for primary actions or large fills

> ⚠️ All color and font values above are Medium confidence. Flag this note when producing creative assets until DevTools verification is complete.

---

## Placeholders Remaining

Fill these before full production use:

| Placeholder | Priority | How to resolve |
|---|---|---|
| All hex values — DevTools confirmation | High | Chrome DevTools on aelira.in |
| Font name confirmation | High | Chrome DevTools → Computed → font-family on H1 |
| White logo variant URL | Medium | Request from design team; upload to CDN |
| Figma file URL | Medium | Designer to share after building the file |
| Logo SVG version | Low | Check if `/aelira-logo-v2.svg` exists |
| Alert/status colors | Low | Inspect error/success states on site if they exist |
| Logo clearspace rule | Low | Check brand guidelines if available |
| Social profile asset URLs | Low | Screenshot and upload current social assets |

---

## How to Update This File

1. Verify hex values via Chrome DevTools → edit the table above → commit with: `[core] update brand/assets.md — hex values confirmed via DevTools`
2. After adding Figma file URL → update the Ad Creative Spec section → commit with: `[core] update brand/assets.md — Figma file URL added`
3. After any update, log the change in `core/system-intelligence/changelog.md`
4. To rebuild templates with updated values: re-run `client-setup/workflows/brand-bootstrap.yaml` or run `email-template-builder` agent directly
