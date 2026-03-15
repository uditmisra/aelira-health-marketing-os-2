# Before After

## Best For
- business_model: all
- stage: consideration
- platforms: Meta Feed, LinkedIn Single Image, Google Display (rectangle)
- when to use: When the transformation your product or service delivers is visual or clearly describable in two contrasting states — chaos vs. order, slow vs. fast, risky vs. protected. Best when the "before" state is something the target audience is currently experiencing and will immediately recognize in themselves.

## Platform Specs
| Platform | Dimensions | Safe Zone |
|---|---|---|
| LinkedIn Single Image | 1200×627 | Center 80% |
| Google Display (leaderboard) | 728×90 | — |
| Google Display (rectangle) | 300×250 | Center 80% |
| Meta Feed | 1080×1080 | Center 80% |
| Meta Story | 1080×1920 | Top/bottom 14% |

## Visual Layout
```
┌─────────────────────────────────────┐
│   {{headline}}                      │  ← full-width top bar, 12% frame height
│   (spans both panels)               │     dark bg, white text
├──────────────────┬──────────────────┤
│                  │                  │
│   LEFT PANEL     │   RIGHT PANEL    │
│   "BEFORE"       │   "AFTER"        │
│                  │                  │
│  [messy, dark,   │  [clean, bright, │
│   stressed,      │   resolved,      │
│   cluttered]     │   organized]     │  ← 70% frame height total
│                  │                  │
│  "BEFORE"  label │  "AFTER"  label  │  ← label badges at panel base
│  [muted orange   │  [brand primary  │
│   or red badge]  │   color badge]   │
│                  │                  │
├──────────────────┴──────────────────┤
│  {{body_copy}}     [ {{cta}} ]      │  ← bottom bar, 12% frame height
└─────────────────────────────────────┘
```

Zones:
- Top bar: full-width, dark (#111111 or brand dark), 12-14% frame height. Contains {{headline}} in white, centered, weight 700. This bar unifies both panels visually.
- Left panel (BEFORE): 48% of frame width. Slightly desaturated palette — cooler, grayer, darker tones. Visual represents the problem state: clutter, disorder, stress, inefficiency. "BEFORE" badge bottom-center of panel in muted orange/amber (#E06000) rectangular label, white text, weight 700.
- Center divider: thin 3px line in neutral gray or white at 30% opacity.
- Right panel (AFTER): 48% of frame width. Warmer, brighter, brand primary accent — the resolved state. Visual represents order, speed, ease, success. "AFTER" badge bottom-center of panel in brand primary color rectangular label, white text, weight 700.
- Bottom bar: full-width, brand primary or dark, 12% frame height. Contains {{body_copy}} left-aligned in white (weight: 400, small) and CTA button right-aligned (white background, brand primary text, 4px rounded corners).

## FAL Prompt Template
```
{{brand_dna}}

A before-and-after advertising creative with three horizontal zones stacked vertically.

TOP BAR (12% frame height): Full-width dark background (#111111). Centered in this bar: the headline "{{headline}}" in white sans-serif (weight: 700, size: 40% of bar height). No other elements.

MIDDLE ZONE (76% frame height): Two panels side by side separated by a thin 3px neutral divider.

LEFT PANEL — BEFORE state (48% width): The visual represents a painful, cluttered, or inefficient state — for a B2B SaaS context: a desktop covered in email threads, sticky notes, and open browser tabs; or an overwhelmed professional buried in paperwork. Desaturated color palette, slightly darker exposure. At the bottom center of this panel: a rectangular badge reading "BEFORE" in white uppercase sans-serif (weight: 700) on a muted amber background (#B84A00).

RIGHT PANEL — AFTER state (48% width): The visual represents order, resolution, and ease — a clean, organized dashboard view; a satisfied professional in a spacious, bright workspace. Warm, brighter palette with brand primary color accents. At the bottom center of this panel: a rectangular badge reading "AFTER" in white uppercase sans-serif (weight: 700) on the brand primary color background.

BOTTOM BAR (12% frame height): Full-width in brand primary color. Left side: "{{body_copy}}" in white sans-serif (weight: 400, small). Right side: a CTA button reading "{{cta}}" — white background, brand primary text, 4px rounded corners, weight 600.

No people's faces — hands and desks only. No logos of other companies.

Negative prompt: literal medical before-after (weight loss, skin), real people's faces, competitor logos, cartoonish illustrations, stock photo handshakes, drop shadows that bleed between panels, blurry "before" photos, oversaturated "after" photos.
```

## Headline Guidance
- Character limit: 55 chars
- Style: Names the transformation concisely — "From inbox chaos to every contract tracked." or "Legal review: 3 days vs. 3 hours." Uses a contrast structure (X vs. Y, or "From X to Y"). Does not name the product in the headline — the headline describes the transformation, the CTA introduces the brand.

## Body Copy Guidance
- Character limit: 75 chars
- Style: One specific supporting detail — a time metric, a customer count, a named feature. Reinforces that the "after" state is achievable. Factual. Can name the product: "SpotDraft customers close contracts 67% faster."

## CTA Guidance
- Style: Transformation-forward — "SEE HOW IT WORKS", "GET THE AFTER", "START YOUR TRIAL". Mid-funnel directness. Button with white bg and brand primary text, or full brand-primary pill with white text.

## Performance Notes
No data yet — update after first 3 runs.
