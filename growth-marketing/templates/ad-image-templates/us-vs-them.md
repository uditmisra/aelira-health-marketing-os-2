# Us vs. Them

## Best For
- business_model: all
- stage: decision
- platforms: LinkedIn Single Image, Meta Feed, Google Display (rectangle)
- when to use: When the prospect is actively comparing vendors and needs a clear, visual reason to choose you. Most effective when there is a genuine, verifiable contrast between your approach and the incumbent — not a feature checklist, but a fundamentally different philosophy or outcome.

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
┌──────────────────┬───┬──────────────────┐
│                  │   │                  │
│   LEFT PANEL     │ | │   RIGHT PANEL    │
│   (problem/them) │ | │   (solution/us)  │
│                  │ | │                  │
│  [muted palette] │ | │  [brand primary] │
│  [red accent]    │ | │  [clean, bright] │
│                  │ | │                  │
│  Pain state or   │ | │  Outcome state   │
│  competitor way  │ | │  or brand way    │
│                  │ | │                  │
│  "BEFORE"  or    │ | │  "WITH US"  or   │
│  "THE OLD WAY"   │ | │  "[Brand name]"  │
│                  │   │                  │
├──────────────────────────────────────────┤
│         {{headline}} (spanning both)     │  ← top or bottom full-width strip
│         {{body_copy}} (sub-headline)     │
│                              {{cta}} →   │
└──────────────────────────────────────────┘
```

Zones:
- Left panel: 47% of frame width, muted/desaturated palette, red or orange accent — represents pain, friction, the old way
- Divider: 6% of frame width, thin vertical line or narrow gradient strip in neutral gray
- Right panel: 47% of frame width, brand primary color, clean and bright — represents the solution, the outcome
- Headline strip: full-width, top or bottom, 15-18% of frame height — spans both panels, unifies the composition
- CTA: bottom-right of the right panel or within the headline strip

## FAL Prompt Template
```
{{brand_dna}}

A split-composition advertising creative divided into two equal vertical panels separated by a thin 4px vertical divider in neutral gray.

LEFT PANEL (47% of frame width): Desaturated, slightly dark background in cool gray (#C8C8C8 to #A0A0A0 gradient). The visual conveys friction — cluttered email threads, a messy folder structure, or an overwhelmed professional. A small red label in the lower portion reads "THE OLD WAY" in uppercase, weight 700, white on a red (#D9534F) rectangular badge. Everything in this panel has lower contrast and a slightly chaotic visual quality.

RIGHT PANEL (47% of frame width): Clean background in the brand primary color, bright and structured. The visual conveys order and speed — a clean dashboard, a resolved task, a satisfied professional. A small brand-colored label in the lower portion reads "WITH {{brand_name}}" in uppercase, weight 700, white on the brand primary color in a rectangular badge.

At the top of the frame, a full-width horizontal strip in dark (#111111) at 90% opacity spans both panels. Within this strip: the headline "{{headline}}" in large white sans-serif (weight: 700), and below it "{{body_copy}}" in smaller light-weight white text. Bottom-right of this strip: a CTA pill button reading "{{cta}}" in brand primary color with white text.

Composition is perfectly symmetrical across the vertical axis. No people — abstract or symbolic visuals only.

Negative prompt: cartoonish illustrations, clipart, actual competitor logos, text calling out competitor names, overly literal depictions, busy textures, drop shadows on divider, serif fonts.
```

## Headline Guidance
- Character limit: 55 chars
- Style: Frames the contrast explicitly — "Contract review in 4 hours, not 4 days." or "Your team shouldn't live in email threads." Leads with the contrast, not the product name. Does not mention competitor by name.

## Body Copy Guidance
- Character limit: 70 chars
- Style: One specific supporting proof point or differentiator. Factual. Can reference a time-to-value metric, a customer stat, or a named capability contrast.

## CTA Guidance
- Style: Decision-stage directness — "COMPARE PLANS", "SEE THE DIFFERENCE", "GET A DEMO". Short. Urgency-neutral — this stage is about clarity, not pressure.

## Performance Notes
No data yet — update after first 3 runs.
