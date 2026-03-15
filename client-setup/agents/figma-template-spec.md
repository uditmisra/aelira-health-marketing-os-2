# Figma Template Spec

## Role
Produces a complete, actionable Figma template specification document for a designer to build ad creative frames. Takes brand data from `core/brand/assets.md` and ad format requirements from the campaign brief (or defaults) and outputs a spec that a designer can follow to create a Figma file ready for the Google Sheets data plugin automation. This spec enables the ad production pipeline described in CLAUDE.md: Google Sheet → Figma data plugin → export → ad platform.

## Context to read before starting
- `core/brand/assets.md` — required for colors, fonts, logo specs, and ad creative spec section
- `core/icp/primary-icp.md` — for visual tone guidance (enterprise B2B vs. startup vs. SMB signals)

## Inputs
- **Ad formats to spec** — list of ad formats to create Figma frames for. Defaults to all standard B2B paid social formats if not provided:
  - LinkedIn Single Image (1200 × 627px)
  - LinkedIn Square (1080 × 1080px)
  - LinkedIn Carousel slide (1080 × 1080px)
  - Google Display (300 × 250px, 728 × 90px, 160 × 600px)
- **Campaign theme** (optional) — if a creative brief exists, any visual direction to incorporate
- **Figma skill level of designer** — `beginner` | `intermediate` | `expert` (adjusts spec verbosity)

## Process

### Step 1 — Read assets.md
Extract and record:
- Primary color (hex) → CTA button, accent elements
- Secondary color (hex) → hover states, secondary elements
- Text primary (hex) → headline text
- Background (hex) → frame background
- Logo URL → reference image for designer to import
- Heading font name + weight → headline text layer
- Body font name + weight → body copy text layer
- Ad creative spec section → check if Figma file URL already exists

If a Figma file URL already exists in assets.md → note it at the top of the spec. The designer should update the existing file, not create a new one.

### Step 2 — Define the layer naming convention
The automation pipeline (Google Sheets data plugin) requires exact layer names. These are non-negotiable:

| Layer name | Content | Notes |
|---|---|---|
| `headline` | Main headline text | Must be a text layer, not a shape |
| `body_copy` | Body copy text | Must be a text layer |
| `cta` | CTA button text only | Text layer inside the button group |
| `logo` | Logo image | Place logo here; plugin toggles visibility only |
| `background` | Background layer | Image or solid color layer; plugin can swap image |
| `cta_button` | CTA button group | Contains `cta` text layer + button shape |

Any layer not in this list is ignored by the plugin. Designer can add additional decorative layers — they just won't be automated.

### Step 3 — Spec each format frame

For each ad format, produce a complete specification block:

```
FRAME: [Format Name]
Canvas size: [W × H px]
Background: [hex from assets.md | or "Image layer — use background layer for photo/illustration"]

LAYERS (in order, top to bottom in Layers panel):
1. logo
   Type: Image (linked or embedded)
   Position: [top-left | top-center]
   Size: [height px] tall, width auto
   Clearspace: [from assets.md logo clearspace rule]
   Import from: [logo URL from assets.md]

2. headline
   Type: Text layer
   Font: [font name from assets.md], [weight] (e.g., Inter 700)
   Size: [px] — [rationale: e.g., "fills ~40% of frame height for LinkedIn single image"]
   Color: [text primary hex from assets.md]
   Max characters: [from ad format spec in assets.md]
   Position: [center | top-left aligned, with margins described]
   Line height: 1.2

3. body_copy
   Type: Text layer
   Font: [font name from assets.md], [weight]
   Size: [px]
   Color: [text secondary hex from assets.md]
   Max characters: [from ad format spec]
   Position: [below headline, with X px gap]

4. cta_button
   Type: Group (contains cta text layer + rectangle)
   Rectangle: [W × H px], border-radius [from assets.md], fill [primary color hex]
   cta text layer: Font [font name], [weight], [size px], color #FFFFFF

5. background
   Type: Rectangle (solid) or Image frame
   Fill: [background hex from assets.md]
   Note: If using image backgrounds, this layer holds the image. Plugin can swap this.
```

### Step 4 — Specify the auto-population setup

Explain how the Google Sheets data plugin connects to these frames:

**Plugin used:** Any of these work — "Google Sheets Sync", "Data Populator", or "Figma Tokens" with a Sheets connector.

**Sheet structure the plugin expects:**
The ad copy Google Sheet (output of ad-copy-generation workflow, `assembled_ad_table` format) has columns: `headline`, `body_copy`, `cta`. These must match the layer names exactly.

**How to use:**
1. Designer opens the Figma file with the master frame
2. Opens the Sheets plugin, connects the assembled_ad_table Sheet
3. Plugin reads each row → creates a duplicate of the master frame → populates `headline`, `body_copy`, `cta` layers with the row's values
4. Result: N frames (one per ad variant), all branded, ready to export
5. Export all frames as PNG or JPG → upload to ad platform

**What the designer needs to do once:**
- Create the master frame for each format with layers named exactly as specified
- Connect the Google Sheet via the plugin
- Set up the frame → Sheet column mapping

After that, every ad copy generation run can be pushed to Figma in minutes.

### Step 5 — Produce the delivery checklist

```
FIGMA FILE DELIVERY CHECKLIST

Before handing off to the automation pipeline, verify:
- [ ] Each frame has all 5 required layers: headline, body_copy, cta, logo, background
- [ ] Layer names match exactly (case-sensitive): headline, body_copy, cta, logo, background, cta_button
- [ ] cta text layer is INSIDE the cta_button group
- [ ] logo layer has the correct logo asset imported
- [ ] All text layers use the correct font from assets.md ([font name])
- [ ] Primary color (#[hex]) is applied to CTA button background
- [ ] Text layers have auto-height or are sized generously to accommodate variable-length copy
- [ ] Figma file is shared with "Anyone with the link can view" (required for plugin access)
- [ ] Figma file URL added to core/brand/assets.md Figma Template section
```

## Output Format
Single document structured as:
1. **Brand variables summary** — quick reference for the designer: all hex values, font names, logo URL
2. **Layer naming convention** — the non-negotiable table
3. **Frame spec** — one spec block per ad format
4. **Auto-population setup guide** — how the Sheets plugin connects
5. **Delivery checklist**

## Quality Check
- Layer names in every frame spec are exactly: `headline`, `body_copy`, `cta`, `logo`, `background`, `cta_button`
- All hex values are sourced from `core/brand/assets.md` — no invented colors
- Ad dimensions match industry specs (LinkedIn 1200 × 627 is always 1200 × 627)
- Spec is specific enough that a designer who has never seen the brand can execute it correctly without a call

## Flag If
- `core/brand/assets.md` has unfilled placeholders for color or font — produce the spec with what's available, flag each gap explicitly: "MISSING: primary color hex — run brand-bootstrap or fill manually before designer starts"
- Logo URL is marked [MANUAL UPLOAD REQUIRED] — instruct designer to obtain logo files directly from brand assets folder and import manually
- A Figma file already exists (URL in assets.md) — lead with: "A Figma template already exists at [URL]. This spec should be used to UPDATE the existing file, not create a new one."
