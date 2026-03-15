# Marketing OS — Figma Ad Creative Generator

A Figma plugin that reads your assembled ads table and mass-generates ad frame variants by swapping headline, body copy, and CTA into named text layers — up to 100 variants in under a second.

Replicates the workflow described in Anthropic's internal growth marketing case study: "developed a Figma plugin that identifies frames and programmatically generates up to 100 ad variations by swapping headlines and descriptions, reducing what would take hours of copy-paste to half a second per batch."

---

## How it works

```
ad-copy-generation workflow
  → step-4-assembled-ads.md (or Google Sheet)
  → Copy TSV / paste Sheet URL into the plugin
  → Plugin duplicates [Master] frames
  → Swaps headline / body_copy / cta text layers
  → Places variants on output pages, 1 page per format
  → Export all frames → upload to ad platform
```

---

## Setup

### 1. Install dependencies

```bash
cd figma-plugin
npm install
npm run build
```

### 2. Load in Figma

1. Open Figma Desktop
2. **Plugins** → **Development** → **Import plugin from manifest…**
3. Select `figma-plugin/manifest.json`

### 3. Prepare your Figma file

Create master frames for each ad format you use. Name them **exactly**:

| Ad format | Frame name |
|---|---|
| LinkedIn Single Image | `[Master] LinkedIn Single Image` |
| LinkedIn Square | `[Master] LinkedIn Square` |
| LinkedIn Carousel | `[Master] LinkedIn Carousel` |
| Google Display 300×250 | `[Master] Google Display 300x250` |
| Google Display 728×90 | `[Master] Google Display 728x90` |
| Meta Feed Square | `[Master] Meta Feed Square` |
| Meta Story | `[Master] Meta Story` |

Inside each master frame, add text layers named **exactly** (case-insensitive):

- `headline` — the ad headline
- `body_copy` — the body / description text
- `cta` — the call-to-action text (button label)

These names must match exactly. The plugin searches recursively, so layers can be nested inside groups or auto-layout frames.

### 4. Run the plugin

1. Open the plugin from **Plugins → Development → Marketing OS — Ad Creative Generator**
2. Click **Scan** to verify your master frames are detected
3. Paste your assembled ads TSV (from `step-4-assembled-ads.md`) or enter your Google Sheet URL
4. Click **Parse data** to validate
5. Set a page prefix (defaults to "Marketing OS Ads")
6. Click **Generate variants**

Output frames are placed on new pages: `{prefix} — LinkedIn Single Image`, `{prefix} — Google Display 300x250`, etc.

---

## Data format

The plugin expects the assembled ads table column order from `ad-assembler-agent.md`:

```
platform | format | headline | body_copy | cta | cta_url | headline_chars | body_chars | pillar | frame_type | quality_status | run_id
```

Tab-separated (TSV) or comma-separated (CSV). First row must be the header.

Only rows with `quality_status = approved` are processed by default. Enable "Include conditional passes" to also include `quality_status = conditional`.

---

## After generation

1. **Review** the output pages — each variant is named `[Ad] {run_id} — {pillar} — {frame_type} — {format} — #001`
2. **Export** all frames: select all on an output page → **Export** → PNG @ 2x
3. **Upload** exported PNGs to your ad platform (LinkedIn Campaign Manager, Google Ads, Meta Ads Manager)

For platforms that accept image + copy separately (LinkedIn Sponsored Content, Google RSA), use the assembled_ad_table Sheet directly for the text fields.

---

## Development

```bash
npm run watch     # TypeScript watch mode
npm run typecheck # Type-check without building
```

The plugin has two parts:
- `src/code.ts` — runs in the Figma sandbox, has access to `figma.*` API
- `ui.html` — the panel UI, runs in a sandboxed iframe, communicates via `postMessage`

To add a new ad format: add an entry to `FORMAT_TO_FRAME_NAME` in `src/types.ts` and add the corresponding master frame to your Figma file.

---

## Troubleshooting

**"Master frame not found"** — The frame name in the plugin's `FORMAT_TO_FRAME_NAME` map doesn't match what's in your Figma file. Check for trailing spaces, capitalization, or bracket differences.

**Text layer not updating** — The layer name in Figma doesn't match `headline`, `body_copy`, or `cta`. Layer names are case-insensitive but must otherwise be exact. Check for trailing spaces.

**Google Sheets import fails** — The sheet must be shared as "Anyone with the link can view." If the sheet is in a Workspace domain, the "anyone" share may be restricted by your org's settings. Use the TSV paste method instead.

**Font substitution warning** — Figma may show a warning if the font in the master frame isn't available. This is cosmetic — the text is still updated. Install the font or swap it in the master frame.
