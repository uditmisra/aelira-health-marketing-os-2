# Brand Asset Registry

> This file is the canonical brand asset registry for {{COMPANY_NAME}}.
> It is populated during onboarding via the brand-bootstrap workflow and updated whenever brand assets change.
> Every agent that produces visual or email output reads this file first.

---

## Status

- **Last updated:** `<DATE>`
- **Populated by:** `<brand-bootstrap | manual>`
- **Completeness:** `<partial | complete>`

---

## Logo

| Asset | Path / URL | Format | Use case |
|---|---|---|---|
| Primary logo (full color) | `<URL_OR_PATH>` | SVG + PNG | Light backgrounds |
| Primary logo (white) | `<URL_OR_PATH>` | SVG + PNG | Dark backgrounds, email headers |
| Logo mark / icon only | `<URL_OR_PATH>` | SVG + PNG | Favicon, small placements |
| Wordmark only | `<URL_OR_PATH>` | SVG + PNG | Co-branded, horizontal layouts |

**Logo clearspace:** `<minimum_clearspace>` (e.g., "equal to height of the 'S' in the wordmark")

**What NOT to do:**
- Don't stretch or distort
- Don't use the full-color logo on dark backgrounds
- Don't add drop shadows or outlines

---

## Color Palette

### Primary Colors

| Name | Hex | RGB | Usage |
|---|---|---|---|
| `<COLOR_NAME>` (e.g., "SpotDraft Blue") | `#<HEX>` | `rgb(<R>, <G>, <B>)` | Primary CTA, links, highlights |
| `<COLOR_NAME>` | `#<HEX>` | `rgb(<R>, <G>, <B>)` | Secondary actions |

### Secondary Colors

| Name | Hex | RGB | Usage |
|---|---|---|---|
| `<COLOR_NAME>` | `#<HEX>` | `rgb(<R>, <G>, <B>)` | Backgrounds, cards |
| `<COLOR_NAME>` | `#<HEX>` | `rgb(<R>, <G>, <B>)` | Dividers, borders |

### Neutral Colors

| Name | Hex | Usage |
|---|---|---|
| Text primary | `#<HEX>` | Body text |
| Text secondary | `#<HEX>` | Subheadings, captions |
| Background | `#<HEX>` | Page background |
| White | `#FFFFFF` | Cards, email body |

### Alert/Status Colors

| State | Hex | Usage |
|---|---|---|
| Success | `#<HEX>` | Confirmation states |
| Warning | `#<HEX>` | Caution states |
| Error | `#<HEX>` | Error states |

---

## Typography

### Font Stack

| Role | Font family | Weight(s) | Size range |
|---|---|---|---|
| Heading | `<FONT_NAME>` | 600, 700 | 24–48px |
| Body | `<FONT_NAME>` | 400, 500 | 14–18px |
| Caption / label | `<FONT_NAME>` | 400 | 11–13px |
| Monospace (code) | `<FONT_NAME>` | 400 | 13–14px |

### Google Fonts embed (for HTML emails)

```html
<link href="https://fonts.googleapis.com/css2?family=<FONT_NAME>:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### Web-safe fallback stack

```css
font-family: '<FONT_NAME>', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

---

## Email Templates

### Template Shell

> Base HTML email structure. Copy this, swap in content. Do NOT change structural elements.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{subject_line}}</title>
  <link href="<GOOGLE_FONT_URL>" rel="stylesheet">
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: <BACKGROUND_COLOR>;
      font-family: '<FONT_NAME>', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      -webkit-text-size-adjust: 100%;
    }
    .email-wrapper {
      max-width: 600px;
      margin: 0 auto;
      padding: 40px 20px;
    }
    .email-header {
      padding: 0 0 32px 0;
    }
    .email-header img {
      height: 32px;
      width: auto;
    }
    .email-body {
      background-color: #FFFFFF;
      border-radius: 8px;
      padding: 40px;
    }
    h1 {
      font-size: 28px;
      font-weight: 700;
      color: <TEXT_PRIMARY>;
      margin: 0 0 16px 0;
      line-height: 1.2;
    }
    h2 {
      font-size: 20px;
      font-weight: 600;
      color: <TEXT_PRIMARY>;
      margin: 32px 0 12px 0;
    }
    p {
      font-size: 16px;
      line-height: 1.6;
      color: <TEXT_SECONDARY>;
      margin: 0 0 16px 0;
    }
    .cta-button {
      display: inline-block;
      background-color: <PRIMARY_COLOR>;
      color: #FFFFFF !important;
      font-size: 15px;
      font-weight: 600;
      text-decoration: none;
      padding: 14px 28px;
      border-radius: 6px;
      margin: 8px 0 24px 0;
    }
    .email-footer {
      padding: 24px 0 0 0;
      font-size: 13px;
      color: #9ca3af;
      text-align: center;
    }
    .email-footer a {
      color: #9ca3af;
    }
  </style>
</head>
<body>
  <div class="email-wrapper">
    <div class="email-header">
      <img src="<LOGO_URL_WHITE_OR_COLOR>" alt="<COMPANY_NAME>">
    </div>
    <div class="email-body">
      <!-- CONTENT GOES HERE -->
      <h1>{{headline}}</h1>
      <p>{{body_paragraph_1}}</p>
      <p>{{body_paragraph_2}}</p>
      <a href="{{cta_url}}" class="cta-button">{{cta_text}}</a>
    </div>
    <div class="email-footer">
      <p>
        <a href="{{unsubscribe_url}}">Unsubscribe</a> ·
        <a href="{{preferences_url}}">Email preferences</a> ·
        <company_address>
      </p>
    </div>
  </div>
</body>
</html>
```

### Variable legend

| Variable | Value |
|---|---|
| `<BACKGROUND_COLOR>` | `<HEX>` |
| `<TEXT_PRIMARY>` | `<HEX>` |
| `<TEXT_SECONDARY>` | `<HEX>` |
| `<PRIMARY_COLOR>` | `<HEX>` |
| `<LOGO_URL_WHITE_OR_COLOR>` | `<URL>` |
| `<COMPANY_NAME>` | `<NAME>` |
| `<GOOGLE_FONT_URL>` | `<URL>` |

---

## Ad Creative Spec

### Figma Template

- **Figma file URL:** `<FIGMA_FILE_URL>`
- **Master frame name:** `<MASTER_FRAME_NAME>` (e.g., "Ad — LinkedIn Single Image")
- **Layer names (must match exactly for automation):**
  - `headline` — main headline text layer
  - `body_copy` — body copy text layer
  - `cta` — CTA button text layer
  - `logo` — logo layer (do not swap, only toggle visibility)
  - `background` — background layer (can swap image)

### LinkedIn Single Image

| Property | Spec |
|---|---|
| Canvas size | 1200 × 627px |
| Headline layer | 60 chars max |
| Body copy layer | 150 chars max |
| CTA text | 20 chars max |
| Logo placement | Top-left, 32px clearspace |
| CTA button color | `<PRIMARY_COLOR>` |

### LinkedIn Carousel (per slide)

| Property | Spec |
|---|---|
| Canvas size | 1080 × 1080px |
| Headline | 255 chars max per slide |
| Intro card | Must have headline + CTA |
| Final card | Must have CTA button |

### Google Display (Responsive)

| Property | Spec |
|---|---|
| Headline | 30 chars max |
| Description | 90 chars max |
| Business name | 25 chars max |
| Logo | Square (1:1) preferred |

---

## Social Profile Assets

| Platform | Asset | Spec | URL |
|---|---|---|---|
| LinkedIn | Company page logo | 300×300px | `<URL>` |
| LinkedIn | Company banner | 1128×191px | `<URL>` |
| Twitter/X | Profile picture | 400×400px | `<URL>` |
| Twitter/X | Header image | 1500×500px | `<URL>` |

---

## Brand Usage Rules (for agents)

When producing any output that includes brand elements, apply these rules:

1. **Primary CTA color is always `<PRIMARY_COLOR>`** — never substitute
2. **Headline font weight is always 700** — never 400 or 500 for H1
3. **Logo always appears on approved backgrounds** — see Logo section above
4. **Email max-width is always 600px** — do not change
5. **Button border-radius is `<BORDER_RADIUS>`** — apply consistently (e.g., 6px)

---

## How to Update This File

1. Run `client-setup/workflows/brand-bootstrap.yaml` to auto-populate from website
2. Or edit manually and commit with message: `[core] update brand/assets.md — [what changed]`
3. After any update, notify agents via `core/system-intelligence/changelog.md`
