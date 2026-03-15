# Figma Frame Population Runbook

## What this does
Reads the assembled_ad_table Google Sheet produced by `ad-copy-generation`, calls the Figma REST API to populate the master frame template with each row's copy, and returns a list of frame export URLs. Result: N branded ad variants ready to download and upload to your ad platform — no manual copy-paste.

**When to run:** After `ad-copy-generation` completes and the Google Sheet has been created. Requires a Figma PAT stored in Settings and a Figma file with correctly-named layers.

---

## Prerequisites

Before running:
- [ ] `ad-copy-generation` completed — assembled_ad_table Sheet exists with URL in run-summary.md
- [ ] Figma PAT stored in web app Settings → Integrations → Figma (or in `FIGMA_PAT` env var)
- [ ] Figma file URL stored in `core/brand/assets.md` → `figma_integration.template_url`
- [ ] Master frames in the Figma file have correct layer names: `headline`, `body_copy`, `cta`, `logo`, `background`

---

## Step 1 — Read the assembled_ad_table Sheet

The Sheet produced by ad-copy-generation has these columns:
`platform | format | headline | body_copy | cta | cta_url | headline_chars | body_chars | pillar | frame_type | quality_status | run_id`

Read only rows where `quality_status = approved` (skip conditional passes unless explicitly included).

Group rows by `format` — each format (LinkedIn Single Image, LinkedIn Square, etc.) maps to a different master frame in the Figma file.

---

## Step 2 — Identify the correct master frame per format

In the Figma file, master frames are named with the format name as a prefix:

| Sheet `format` value | Expected Figma frame name |
|---|---|
| `linkedin_single_image` | `[Master] LinkedIn Single Image` |
| `linkedin_square` | `[Master] LinkedIn Square` |
| `linkedin_carousel` | `[Master] LinkedIn Carousel` |
| `google_display_medium` | `[Master] Google Display 300x250` |
| `google_display_leaderboard` | `[Master] Google Display 728x90` |

If a format has no corresponding master frame, skip it and log: `"No master frame found for format: [format] — skipping [N] variants"`

---

## Step 3 — Call the Figma API to duplicate and populate frames

For each approved ad row:

1. **Duplicate the master frame** via Figma REST API:
   ```
   POST https://api.figma.com/v1/files/{file_key}/nodes
   ```
   Clone the master frame node. Name the duplicate: `[Ad] {run_id} — {pillar} — {frame_type} — {format} — row {N}`

2. **Update the text layers** in the duplicate frame:
   ```
   PATCH https://api.figma.com/v1/files/{file_key}/nodes/{node_id}
   ```
   Update each named text layer:
   - Layer `headline` → `row.headline`
   - Layer `body_copy` → `row.body_copy`
   - Layer `cta` → `row.cta`

3. **Log the frame node ID** for export in Step 4.

**API authentication:**
All requests require: `X-Figma-Token: {FIGMA_PAT}` header.

**Rate limits:** Figma API allows ~300 requests/minute. For large batches (>50 ads), add a 200ms delay between frame operations.

---

## Step 4 — Export frames as PNG

After all frames are populated, trigger exports:

```
POST https://api.figma.com/v1/images/{file_key}
Body: {
  "ids": ["node_id_1", "node_id_2", ...],
  "scale": 2,
  "format": "png"
}
```

The response returns signed S3 URLs for each exported image. These URLs are valid for ~14 days.

Collect all export URLs into a manifest:

```
EXPORT MANIFEST — {run_id}
Generated: {timestamp}

| Ad ID | Format | Headline (truncated) | Frame type | Export URL |
|---|---|---|---|---|
| {run_id}-001 | LinkedIn Single Image | ... | problem-led | https://... |
| {run_id}-002 | LinkedIn Single Image | ... | benefit-led | https://... |
...

Total exported: N
Formats: {unique formats}
```

---

## Step 5 — Write export manifest to run directory

Write the manifest to:
`runs/ad-copy-generation/{run_id}/step-figma-exports.md`

Also append to run-summary.md:
```
**Figma exports:** {N} frames exported — see step-figma-exports.md
**Figma file:** {figma_template_url}
```

---

## Step 6 — Upload to ad platform

The export URLs can be used directly as image sources for ad platform uploads. Recommended flow:

**LinkedIn Campaign Manager:**
1. Go to Account Assets → Images
2. Upload PNG files (download from export URLs, or use LinkedIn's URL import if available)
3. Create new ad → select uploaded creative → attach approved headline/body/CTA from the Sheet

**Google Ads:**
1. Go to Assets → Image assets
2. Upload PNG files for display ads
3. Responsive Display Ads: upload image + copy directly from the assembled_ad_table

**Time estimate:** 15-30 minutes to upload a batch of 20-30 ad variants, vs. 2-3 hours to produce them manually.

---

## Error handling

**"Layer not found" error from Figma API:**
The layer name in the API call doesn't match the layer in the file. Check the exact layer name in Figma (case-sensitive). Common issue: layer named `Headline` instead of `headline`.

**Export returns empty URLs:**
The Figma file wasn't saved after frame creation. Wait 30 seconds and retry the export call.

**PAT expired:**
Rotate the PAT in Figma Settings → update in the web app Settings → Integrations → Figma.

**Google Sheet not accessible:**
Verify the Sheet is shared with "Anyone with the link can view." The script reads the Sheet via the Google Sheets API using the OAuth token stored in Supabase.

---

## Output
- `runs/ad-copy-generation/{run_id}/step-figma-exports.md` — export manifest with all URLs
- Figma file updated with N new frames (one per approved ad variant)
- run-summary.md updated with Figma export count and file link
