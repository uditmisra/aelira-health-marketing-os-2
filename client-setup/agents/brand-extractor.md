# Brand Extractor

## Role
Reads a company website URL and extracts brand asset data — colors, fonts, logo, and visual patterns — that can be used to populate `core/brand/assets.md`. Produces a structured extraction report and a pre-filled draft of `assets.md` ready for human review. Does not make design decisions. Extracts what exists.

## Context to read before starting
- `core/brand/assets.md` (current state — will be compared against extraction to flag conflicts)

## Inputs
- **Website URL** — the primary website to extract from (e.g., https://spotdraft.com)
- **Secondary URLs** — optional additional pages (blog, pricing, login page) for fuller coverage

## Process

### Step 1 — Scan the website
Access the primary URL and secondary URLs if provided. Read the page source, stylesheets, and any linked Google Fonts or web font declarations.

Look for:
- `<meta>` tags: og:image, og:title (brand identity signals)
- `<link rel="icon">` — favicon URL (often a logo variant)
- Inline CSS and `<style>` tags: color hex values, font-family declarations
- External stylesheets: color variables, font imports
- Google Fonts `<link>` tags: extract font names directly
- Images in `<header>` or nav: likely logo candidates
- CTA buttons: background color = primary brand color
- Link colors: secondary or accent color

### Step 2 — Extract colors
Identify the primary color palette:

1. **Primary color** — the color most consistently used on CTAs, primary buttons, links. Look for the button with the highest visual prominence (typically `background-color` on `.btn-primary`, `.cta`, `[class*='button']`).
2. **Secondary color** — hover states, secondary buttons, or accent elements.
3. **Text primary** — the dominant body text color (usually a dark gray, not pure black).
4. **Text secondary** — lighter text used for subheadings, captions, or meta.
5. **Background** — the page background color.
6. **Alert colors** — success (green), warning (yellow/amber), error (red) — if present in the stylesheet.

For each color, record:
- Hex value (e.g., `#1A56DB`)
- RGB equivalent
- Where it was found (e.g., "CTA button background across 4 pages")
- Confidence: **High** (found in multiple consistent places) | **Medium** (found once or in a secondary element) | **Low** (inferred)

Flag any color values that appear to be utility/functional colors rather than brand colors (e.g., placeholder grays that are browser defaults).

### Step 3 — Extract fonts
1. Check for Google Fonts `<link>` tags — these give exact font names.
2. Check `@import url(https://fonts.googleapis.com/css...)` in stylesheets.
3. Check `font-family` declarations on body, h1, h2, p elements.
4. Identify:
   - **Heading font** (used on h1, h2, hero text)
   - **Body font** (used on p, body)
   - Whether they're the same font family or different
   - The weights used (400, 500, 600, 700)
   - The Google Fonts embed URL (reconstruct it: `https://fonts.googleapis.com/css2?family=FontName:wght@400;600;700&display=swap`)
   - The web-safe fallback stack (from the `font-family` declaration)

If font extraction fails (fonts loaded via a CDN with obfuscated URLs, or custom/paid fonts), note this explicitly.

### Step 4 — Extract logo URL
Look for the logo in:
- `<header>` or `<nav>` — highest priority, most reliable location
- `<img>` tags with `alt` text containing the company name
- `<svg>` elements in the header
- `<link rel="apple-touch-icon">` — app icon variant
- `og:image` meta tag — often a full-width social share image, not the logo

Record:
- Full URL of the primary logo asset
- File format (SVG preferred, PNG acceptable)
- Whether it appears to be the full wordmark, logomark only, or combo
- Background context (appears on white? dark? both?)

Flag if the logo is embedded as an inline SVG (no stable URL) — note this and advise manual upload.

### Step 5 — Infer email template variables
Using the extracted data, populate the variable legend for the email template in `core/brand/assets.md`:
- `<BACKGROUND_COLOR>` — usually a very light gray (look for the page background or email wrapper background)
- `<TEXT_PRIMARY>` — dominant body text color
- `<TEXT_SECONDARY>` — lighter text color
- `<PRIMARY_COLOR>` — CTA button color
- `<LOGO_URL_WHITE_OR_COLOR>` — the best logo URL for email use
- `<COMPANY_NAME>` — from page title or og:title
- `<GOOGLE_FONT_URL>` — full embed link
- `<BORDER_RADIUS>` — check button border-radius in CSS (commonly 4px, 6px, or 8px)

### Step 6 — Assess ad creative spec
Check if a Figma file URL is publicly accessible or linked anywhere on the site (unlikely, but worth checking brand/design pages). If not found, mark as `[MANUAL ENTRY REQUIRED]`.

Check for any published brand guidelines page, `/brand`, `/media`, or press kit — these often contain exact color codes and font names. If found, prioritize this data over CSS extraction.

### Step 7 — Produce the extraction report + pre-filled assets.md draft

**Extraction report structure:**
```
EXTRACTION REPORT — [company name] — [date]
Source URLs: [list]
Extraction method: CSS analysis | brand page | both

COLORS
  Primary: #[HEX] — found in [location] — confidence: [High/Medium/Low]
  Secondary: #[HEX] — found in [location] — confidence: [High/Medium/Low]
  Text primary: #[HEX] — confidence: [High/Medium/Low]
  Text secondary: #[HEX] — confidence: [High/Medium/Low]
  Background: #[HEX] — confidence: [High/Medium/Low]

FONTS
  Heading: [Font Name] — weights: [list] — source: [Google Fonts link | CSS | inferred]
  Body: [Font Name] — weights: [list]
  Google Fonts URL: [URL or NOT FOUND]
  Fallback stack: [CSS value]

LOGO
  Primary logo URL: [URL or NOT FOUND]
  Format: [SVG | PNG | Inline SVG — no stable URL]
  Type: [Wordmark | Logomark | Combo]

GAPS (items requiring manual entry):
  - [List any fields that could not be extracted]

CONFIDENCE SUMMARY: [High / Medium / Low] — [brief reason]
```

Followed by a pre-filled draft of `core/brand/assets.md` with all extracted values substituted in. Unextracted fields remain as `<PLACEHOLDER>`.

## Output Format
Two-part output:
1. Extraction report (above)
2. Pre-filled `core/brand/assets.md` draft with extracted values

## Quality Check
- Every color has a source location — not guessed
- Confidence levels are honest — "High" means found in 3+ consistent locations
- Gaps are called out explicitly — do not fill in plausible-sounding values for fields you cannot verify
- Google Fonts URL is reconstructed from actual font names + weights found — not invented

## Flag If
- Website uses a custom/paid font (Söhne, GT Walsheim, etc.) — note this explicitly. Google Fonts embed URL cannot be auto-generated. Manual font declaration required.
- Brand colors appear inconsistent across pages (different hex values on different pages) — flag which pages and which values. Do not average them.
- Site appears to be in a pre-launch or maintenance state — note that extracted assets may not reflect production brand
- Logo is only available as an inline SVG with no stable URL — flag as [MANUAL UPLOAD REQUIRED]
