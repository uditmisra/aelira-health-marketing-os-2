# Step 4 — Figma Template Specification
**Workflow:** brand-bootstrap  
**Run ID:** 2026-03-15-001  
**Date:** 2026-03-15  
**Designer skill level:** Beginner  
**Ad formats:** LinkedIn Single Image, LinkedIn Square, LinkedIn Carousel, Google Display  
**Brand values:** from step-1-brand-extraction-revised.md (screenshot visual extraction, Medium confidence)

---

## 1. Brand Variables — Quick Reference for Designer

Print this or keep it open while building.

| Variable | Value | Notes |
|---|---|---|
| **Primary green** | `#2E6B40` | CTA buttons, key accents |
| **Dark green** | `#1B5E30` | Headline text, logo background option |
| **Mint accent** | `#86D08A` | Highlight words, secondary elements |
| **Background cream** | `#F0EBE0` | Frame backgrounds |
| **White** | `#FFFFFF` | Card backgrounds, text on dark |
| **Body text** | `#6B7B6E` | Body copy color |
| **Heading font** | DM Sans, weight 700 | ⚠️ Verify in DevTools — may be Plus Jakarta Sans |
| **Body font** | DM Sans, weight 400 | Same as above |
| **Button radius** | 50px (pill) | Confirmed from screenshot |
| **Logo (PNG)** | https://aelira.in/aelira-logo-v2.png | Download and import into Figma |
| **Logo (white)** | Not yet available | Ask team to share white variant |

> ⚠️ **Confidence note:** All color hex values and the font name are Medium confidence (read from a screenshot). Before the Figma file goes to production, confirm hex values via Chrome DevTools (right-click any element on aelira.in → Inspect → Computed tab → `background-color` / `color` / `font-family`).

---

## 2. Layer Naming Convention (Non-Negotiable)

These exact layer names enable the Google Sheets data plugin to auto-populate your ad frames. A typo here breaks the automation. Use copy-paste to be safe.

| Layer name | What it is | Plugin behaviour |
|---|---|---|
| `headline` | Main headline text | Plugin replaces text with each ad's headline |
| `body_copy` | Body copy text | Plugin replaces with body copy |
| `cta` | Text inside the button | Plugin replaces with CTA text |
| `logo` | Logo image | Plugin toggles visibility — don't rename |
| `background` | Background rectangle or image | Plugin can swap the image |
| `cta_button` | Group: button shape + `cta` text | Contains `cta` text layer inside |

**Beginner tip:** In Figma's Layers panel (left sidebar), double-click a layer name to rename it. After renaming, click elsewhere to confirm. Names are case-sensitive — `headline` ≠ `Headline`.

---

## 3. Frame Specifications

---

### Frame 1 — LinkedIn Single Image

```
FRAME: LinkedIn Single Image
Canvas size: 1200 × 627 px
Background: #F0EBE0 (warm cream) — or use a clinical/lung health photograph
Border radius on frame: 0 (LinkedIn displays full bleed)

LAYERS (build in this order, top to bottom in Layers panel):

1. headline
   ├── Type: Text layer
   ├── Font: DM Sans, weight 700
   ├── Size: 52–60px
   ├── Color: #1B5E30 (dark green)
   ├── Max characters: 60 — anything longer gets cut off by LinkedIn
   ├── Position: Left-aligned, 64px from left edge, centered vertically in upper 60% of frame
   ├── Line height: 1.15
   ├── Width: 700px (leaves space for logo on right if needed)
   └── Beginner tip: Set text box to Fixed Width so it wraps properly

2. body_copy
   ├── Type: Text layer
   ├── Font: DM Sans, weight 400
   ├── Size: 22px
   ├── Color: #6B7B6E
   ├── Max characters: 100
   ├── Position: 64px from left, 20px below bottom of headline
   ├── Line height: 1.5
   └── Width: 600px

3. cta_button (Group)
   ├── Contains: rectangle + cta text layer
   ├── Rectangle: W 220px × H 60px
   ├── Rectangle fill: #2E6B40
   ├── Rectangle border-radius: 50px (pill)
   ├── cta text layer:
   │   ├── Font: DM Sans, weight 600
   │   ├── Size: 20px
   │   ├── Color: #FFFFFF
   │   └── Max characters: 20
   └── Position: 64px from left, 28px below body_copy

4. logo
   ├── Type: Image (import from https://aelira.in/aelira-logo-v2.png)
   ├── Height: 40px, width auto
   ├── Position: Top-left, 40px from left edge, 40px from top
   └── Beginner tip: File → Place image → select downloaded logo PNG

5. background
   ├── Type: Rectangle (or image frame)
   ├── Size: 1200 × 627px (full frame)
   ├── Fill: #F0EBE0 — or import a lung health photograph here
   ├── Position: Bottom of layers stack (behind everything)
   └── Beginner tip: Press R, draw to fill frame, then press Cmd+[ to send to back
```

**What the finished ad should look like:**  
Cream background. Dark green bold headline on the left. Body copy below in gray-green. Pill-shaped button. Logo top-left. Clean, clinical, calm.

---

### Frame 2 — LinkedIn Square

```
FRAME: LinkedIn Square
Canvas size: 1080 × 1080 px
Background: #F0EBE0 (warm cream) — or photograph

LAYERS (top to bottom in Layers panel):

1. headline
   ├── Font: DM Sans, weight 700
   ├── Size: 58–68px
   ├── Color: #1B5E30
   ├── Max characters: 60
   ├── Position: Left-aligned, 72px from left, starting 200px from top
   ├── Width: 936px (full width minus margins)
   └── Line height: 1.15

2. body_copy
   ├── Font: DM Sans, weight 400
   ├── Size: 26px
   ├── Color: #6B7B6E
   ├── Max characters: 120
   ├── Position: 72px from left, 28px below headline
   ├── Width: 800px
   └── Line height: 1.5

3. cta_button (Group)
   ├── Rectangle: W 280px × H 72px, border-radius 50px, fill #2E6B40
   ├── cta text: DM Sans 600, 22px, #FFFFFF, max 20 chars
   └── Position: 72px from left, 36px below body_copy

4. logo
   ├── Height: 48px, width auto
   └── Position: Top-left, 48px from left, 48px from top

5. background
   ├── Fill: #F0EBE0 (or image)
   └── Size: 1080 × 1080px, bottom of stack

   OPTIONAL — Accent bar:
   ├── Add a 8px × 240px rectangle, fill #86D08A (mint accent)
   ├── Place vertically on the left edge to create a colored left border effect
   └── Name it: accent_bar (not automated, purely decorative)
```

---

### Frame 3 — LinkedIn Carousel (Per Slide)

```
FRAME: LinkedIn Carousel Slide
Canvas size: 1080 × 1080 px
Note: Build a MASTER SLIDE. Duplicate it for each slide in the carousel.

SPECIAL CAROUSEL RULES:
- Slide 1 (Intro): Must have headline + CTA. Grabs attention in the feed.
- Slides 2–N (Content): One point per slide. Headline only or headline + body.
- Final slide: Must have CTA button prominently. This is where conversions happen.

LAYERS (per slide):

1. headline
   ├── Font: DM Sans, weight 700
   ├── Size: 52–64px
   ├── Color: #1B5E30
   ├── Max characters: 80 per slide (LinkedIn carousel allows up to 255 per slide,
   │   but 80 reads better on screen)
   ├── Position: Center-left, 72px margins, vertically centered in frame
   └── Line height: 1.2

2. body_copy
   ├── Font: DM Sans, weight 400
   ├── Size: 24px
   ├── Color: #6B7B6E
   ├── Max characters: 100 per slide
   ├── Position: 72px margins, 24px below headline
   └── Note: Leave blank for headline-only slides — just keep the layer, set opacity 0

3. slide_number (decorative — not automated)
   ├── Font: DM Sans, weight 600
   ├── Size: 18px
   ├── Color: #86D08A (mint)
   ├── Content: e.g. "01 / 05"
   └── Position: Top-right, 72px from right edge, 48px from top

4. cta_button (Group) — REQUIRED on Slide 1 and Final Slide only
   ├── Rectangle: W 280px × H 72px, border-radius 50px, fill #2E6B40
   ├── cta text: DM Sans 600, 22px, #FFFFFF, max 20 chars
   └── Position: Bottom-left, 72px from left, 80px from bottom
   └── On content slides (not intro or final): set layer opacity to 0 (hidden)

5. logo
   ├── Height: 40px, width auto
   └── Position: Top-left, 48px from left, 48px from top

6. background
   ├── Fill: Alternate between #F0EBE0 and #FFFFFF for visual rhythm across slides
   └── Or: #1B5E30 (dark green) for the final CTA slide for high contrast

BEGINNER TIP: How to build a carousel in Figma:
1. Build one master slide with all layers named correctly
2. Select the frame → right-click → Duplicate (repeat for each slide)
3. Edit each duplicate: update headline text, toggle body_copy visibility
4. For the final slide: switch background to #1B5E30, update headline/CTA text,
   change headline and CTA text colors to #FFFFFF
5. Export all slides: select all carousel frames → Export as PNG 1× → upload to LinkedIn
```

---

### Frame 4 — Google Display (Responsive)

Note: Google Responsive Display Ads don't use a Figma template in the traditional sense — you upload individual assets and Google assembles combinations. However, a Figma file is useful for creating the logo asset and any supplementary static display banners.

```
GOOGLE DISPLAY — ASSET CHECKLIST

Assets to prepare in Figma and export:

LOGO ASSETS (required for Responsive Display):
  Square logo:
    ├── Canvas: 1200 × 1200px
    ├── Background: #F0EBE0 or #FFFFFF
    ├── Logo centered
    └── Export as PNG, min 128×128px, max 5MB
  
  Horizontal logo (optional but recommended):
    ├── Canvas: 1200 × 300px
    ├── Logo left-aligned with clearspace
    └── Export as PNG

HEADLINE ASSETS (text only — entered directly in Google Ads, not Figma):
  Short headline 1: Max 30 characters — e.g. "Delhi's Lung Care Centre"
  Short headline 2: Max 30 characters — e.g. "Breathe With Confidence"
  Short headline 3: Max 30 characters — e.g. "Advanced Lung Tests & Rehab"
  Long headline: Max 90 characters — e.g. "Expert pulmonary tests & rehabilitation in South Delhi — book today"

DESCRIPTION ASSETS (text only — entered in Google Ads):
  Description 1: Max 90 chars — e.g. "Comprehensive PFT, FeNO, FOT testing + evidence-based rehab programs. Green Park, Delhi."
  Description 2: Max 90 chars — e.g. "Helping COPD, asthma & post-COVID patients breathe better. Book a consultation today."

BUSINESS NAME:
  Aelira Lung Care (17 chars — within 25 char limit ✓)

OPTIONAL: Static display banners (for campaigns that need specific sizes)
Build these as Figma frames using the same layer naming convention:

  Banner 1: 300 × 250px (Medium Rectangle — highest traffic)
    ├── Background: #F0EBE0
    ├── Logo: top-left, height 24px
    ├── headline: DM Sans 700, 20px, #1B5E30, max 25 chars
    ├── cta_button: W 120 × H 40px, radius 20px, fill #2E6B40
    └── cta text: DM Sans 600, 14px, #FFFFFF
  
  Banner 2: 728 × 90px (Leaderboard)
    ├── Background: #F0EBE0
    ├── Logo: left, height 28px
    ├── headline: DM Sans 700, 18px, #1B5E30 — center of banner
    └── cta_button: Right side, W 140 × H 50px, radius 25px
  
  Banner 3: 160 × 600px (Wide Skyscraper)
    ├── Background: #1B5E30 (dark green for contrast in sidebar)
    ├── Text: #FFFFFF
    ├── Logo: white variant — top, height 28px
    ├── headline: DM Sans 700, 20px, #FFFFFF
    ├── body_copy: DM Sans 400, 14px, #86D08A (mint)
    └── cta_button: Bottom-center, W 130 × H 48px, radius 24px, fill #86D08A, text #1B5E30
```

---

## 4. Auto-Population Setup Guide

**What this does:** Connects your ad copy Google Sheet to Figma. One click generates N ad frames — one per row in the sheet.

**Step-by-step for beginners:**

1. **Get the plugin.** In Figma: Menu → Plugins → Browse plugins → search "Google Sheets Sync" or "Data Populator" → Install.

2. **Prepare your Google Sheet.** When the `ad-copy-generation` workflow runs, it produces an "assembled ad table" with these column headers (exactly):
   - `headline`
   - `body_copy`  
   - `cta`

   These column names must match the Figma layer names exactly. They already do if you've followed this spec.

3. **In Figma:** Select the master frame for the format you want to populate (e.g., LinkedIn Single Image).

4. **Run the plugin.** Paste your Google Sheet URL → plugin reads each row → creates a duplicate frame for each row → fills in `headline`, `body_copy`, and `cta` text layers.

5. **Review.** Scroll through the generated frames. Check for headline overflow (text too long). The layer has a 60-character limit rule — the sheet should already respect this if the ad-copy-generation workflow was used.

6. **Export.** Select all generated frames → File → Export → PNG 1× → Save.

7. **Upload to LinkedIn Ads / Google Ads.** Each frame becomes one ad creative.

**What the plugin does NOT do:**
- Does not populate the `logo` layer (it's always the same — the plugin ignores it)
- Does not change colors or fonts (those are baked into the master frame)
- Does not export automatically — you still do that manually

---

## 5. Delivery Checklist

Before handing the Figma file to the automation pipeline, verify every item:

```
FIGMA FILE DELIVERY CHECKLIST — Aelira Lung Care

SETUP
[ ] Figma file created and named: "Aelira Lung Care — Ad Templates"
[ ] File shared: Anyone with the link can VIEW (required for plugin access)
[ ] Figma file URL copied and added to core/brand/assets.md Figma Template section

LAYER NAMES (check each format frame)
[ ] headline layer exists and is named exactly: headline
[ ] body_copy layer exists and is named exactly: body_copy
[ ] cta text layer exists inside cta_button group, named exactly: cta
[ ] logo layer exists and is named exactly: logo
[ ] background layer exists and is named exactly: background
[ ] cta_button group exists and is named exactly: cta_button

BRAND APPLICATION
[ ] DM Sans font applied to all text layers (verify font name with DevTools)
[ ] Primary color #2E6B40 applied to all CTA button backgrounds
[ ] Heading color #1B5E30 applied to all headline text layers
[ ] Background cream #F0EBE0 applied to all frame backgrounds (unless using dark variant)
[ ] Logo PNG imported from https://aelira.in/aelira-logo-v2.png
[ ] Button border-radius: 50px on all CTA buttons

FORMATS
[ ] LinkedIn Single Image frame: 1200 × 627px ✓
[ ] LinkedIn Square frame: 1080 × 1080px ✓
[ ] LinkedIn Carousel master slide: 1080 × 1080px ✓
[ ] Google Display logo assets prepared (square 1200×1200, horizontal 1200×300)

CONTENT VARIABLES
[ ] All text layers have sufficient auto-height (not fixed height that clips text)
[ ] Tested with a short headline (4 words) and a long one (10 words) — both render correctly
[ ] CTA button group stays centered/aligned even when CTA text length varies

PLACEHOLDERS TO RESOLVE BEFORE PRODUCTION
[ ] Verify all hex values in DevTools — correct if different from spec
[ ] Obtain white logo variant for dark-background carousel final slides
[ ] Add Figma file URL to core/brand/assets.md
```

---

## 6. Notes for Beginner Designer

**You don't need to know everything to get started.** Here's the order of operations:

1. Download the logo: go to `https://aelira.in/aelira-logo-v2.png` in your browser → right-click → Save image
2. Create a new Figma file. Name it "Aelira Lung Care — Ad Templates"
3. Add a frame: Press F → type 1200 → Tab → type 627 → Enter (LinkedIn Single Image)
4. Name the frame: double-click it in the Layers panel → type "LinkedIn Single Image"
5. Follow the layer-by-layer spec above for that frame
6. Once one format works, duplicate the frame (right-click → Duplicate) and resize for the next format
7. When done, share the file (top-right → Share → change to "Anyone with the link" → Copy link)
8. Paste the link into the `core/brand/assets.md` Figma Template section

**Questions?** Ask the team for access to any existing brand files or the Figma org account.
