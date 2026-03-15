# Figma Integration — Ad Creative Generator Plugin

## What this unlocks

The Marketing OS Figma plugin mass-generates ad frame variants from your assembled ads table — up to 100 variations in under a second. Each variant has its `headline`, `body_copy`, and `cta` text layers swapped from the data. No copy-paste. No manual designer time per variant.

**The pipeline:**
```
ad-copy-generation workflow
  → step-4-assembled-ads.md (or Google Sheet)
  → paste TSV / Sheet URL into the plugin
  → plugin duplicates [Master] frames + swaps text layers
  → output pages in Figma: one page per format
  → export all frames → upload to ad platform
```

This is the same workflow the Anthropic growth marketing team uses internally: "developed a Figma plugin that identifies frames and programmatically generates up to 100 ad variations by swapping headlines and descriptions, reducing what would take hours of copy-paste to half a second per batch."

---

## Plugin setup (one-time)

### 1. Build the plugin

```bash
cd figma-plugin
npm install
npm run build
```

### 2. Load in Figma Desktop

1. Open Figma Desktop
2. **Plugins → Development → Import plugin from manifest…**
3. Select `figma-plugin/manifest.json`

The plugin is now available under **Plugins → Development → Marketing OS — Ad Creative Generator**.

---

## Figma file setup (one-time, done by designer)

### Master frames

Create one frame per ad format you run. Name each frame **exactly** as shown:

| Ad format | Required frame name |
|---|---|
| LinkedIn Single Image | `[Master] LinkedIn Single Image` |
| LinkedIn Square | `[Master] LinkedIn Square` |
| LinkedIn Carousel | `[Master] LinkedIn Carousel` |
| Google Display 300×250 | `[Master] Google Display 300x250` |
| Google Display 728×90 | `[Master] Google Display 728x90` |
| Google Display 336×280 | `[Master] Google Display 336x280` |
| Meta Feed Square | `[Master] Meta Feed Square` |
| Meta Feed Portrait | `[Master] Meta Feed Portrait` |
| Meta Story | `[Master] Meta Story` |

You don't need all of them — only create the formats you actively run.

### Text layer naming (non-negotiable)

Inside each master frame, create text layers named **exactly**:

| Layer name | Content |
|---|---|
| `headline` | Main headline text |
| `body_copy` | Body / description text |
| `cta` | CTA button label (e.g. "Book a demo") |

Layer names are case-insensitive (`Headline` works as well as `headline`). Layers can be nested inside groups or auto-layout frames — the plugin searches recursively. Additional decorative layers (logo, background, badge) are fine and will not be modified.

**Text layers must be set to Auto Height** so longer headlines don't get cut off. Do not use fixed-height text layers with overflow hidden.

### Save the Figma file URL

After setting up the master frames:

1. Open the Figma file → **Share → Copy link**
2. Add to `core/brand/assets.md`:

```yaml
figma_integration:
  status: connected
  template_url: [paste Figma file URL here]
  last_updated: [YYYY-MM-DD]
```

---

## Running the plugin

1. Open the Figma file with your master frames
2. Run **Plugins → Development → Marketing OS — Ad Creative Generator**
3. Click **Scan** — verify your [Master] frames are detected (green badges)
4. Paste your assembled ads TSV from `step-4-assembled-ads.md`, or enter the Google Sheet URL and click Import
5. Click **Parse data** to validate (check that row counts look right)
6. Set the page prefix (default: "Marketing OS Ads")
7. Click **Generate variants**

Output pages are created automatically: `{prefix} — LinkedIn Single Image`, `{prefix} — Google Display 300x250`, etc.

Each variant is named: `[Ad] {run_id} — {pillar} — {frame_type} — {format} — #001`

---

## After generation

1. Navigate to an output page in Figma
2. Select all frames (Cmd+A)
3. In the right panel → **Export** → PNG @ 2x → Export all
4. Upload exported PNGs to your ad platform

For platforms that accept image + copy separately (LinkedIn Sponsored Content, Google RSAs), use the assembled_ad_table Google Sheet directly for the text fields. The Figma export gives you the visual asset; the Sheet gives you the copy fields.

---

## Data format

The plugin reads the assembled ads table column spec from `ad-assembler-agent.md`:

```
platform | format | headline | body_copy | cta | cta_url |
headline_chars | body_chars | pillar | frame_type | quality_status | run_id
```

Tab-separated (from the markdown file) or comma-separated (from the Google Sheet export). Only rows with `quality_status = approved` are processed by default. The plugin UI has a checkbox to also include `conditional` rows.

---

## Troubleshooting

**"Master frame not found" error**
The frame name in the plugin's format map doesn't match your Figma file. Check exact spelling, capitalization, and brackets. Common issue: `[master]` (lowercase) instead of `[Master]`.

**Text layer not updating**
The layer name doesn't match `headline`, `body_copy`, or `cta`. Open the Figma Layers panel and verify exact spelling. Trailing spaces will cause a mismatch.

**Google Sheets import fails**
The sheet must be shared as "Anyone with the link can view." If your org restricts public sharing, use the TSV paste method instead (copy from the assembled_ads markdown file).

**Font substitution warning**
Cosmetic — text is still updated. Install the font or replace it in the master frame with a font you have installed.

**Text is cut off**
Text layers need Auto Height set in Figma's text properties. Fixed-height layers will clip longer headlines.

---

## Status tracking

Update `core/brand/assets.md` after setup:

```yaml
figma_integration:
  status: connected       # not_configured | connected
  plugin_version: "1.0.0"
  template_url: [Figma file URL]
  master_frames_configured:
    - linkedin_single_image
    - linkedin_square
    - google_display_medium
  last_used: [YYYY-MM-DD]
```
