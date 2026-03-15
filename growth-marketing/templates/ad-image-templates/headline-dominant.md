# Headline Dominant

## Best For
- business_model: b2b_saas | professional_services
- stage: awareness
- platforms: LinkedIn Single Image, Google Display (leaderboard), Google Display (rectangle)
- when to use: When the message is the product — a bold claim, a sharp positioning statement, or a category-defining headline that needs no supporting imagery to land. Works when you have a headline strong enough to carry the entire ad.

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
│                                     │
│   [gradient or geometric bg fill]   │
│                                     │
│        ┌───────────────────┐        │
│        │                   │        │
│        │   {{headline}}    │        │  ← 60% of frame height, centered
│        │   (large, bold)   │        │
│        │                   │        │
│        └───────────────────┘        │
│                                     │
│      {{body_copy}} (small, muted)   │  ← 15% of frame height
│                                     │
│   ┌───────────────────────────┐     │
│   │         {{cta}}           │     │  ← bottom strip or pill button
│   └───────────────────────────┘     │
│                                     │
│  [brand logo — bottom-left corner]  │
└─────────────────────────────────────┘
```

Zones:
- Background: 100% of frame — gradient (brand primary to dark) or abstract geometric shapes at low opacity
- Headline zone: vertically centered, horizontally centered, occupies 55-65% of frame height
- Body copy zone: directly below headline, 10-15% frame height
- CTA zone: bottom 12% of frame — full-width strip at low opacity, or pill-shaped button centered
- Logo: bottom-left, 5% of frame width, at 70% opacity

## FAL Prompt Template
```
{{brand_dna}}

A clean, modern advertising creative in landscape format. The background is a deep navy-to-black gradient with subtle abstract geometric lines at 15% opacity — no photography, no people, no stock imagery. The entire frame is typographic-dominant.

Centered in the frame, in large bold sans-serif type (weight: 800, size: approximately 38% of frame height), the headline reads: "{{headline}}". The headline is white with a 2px letter-spacing. No text shadow.

Directly below the headline in a smaller, lighter weight (weight: 400, size: 14% of frame height), a single line of supporting copy reads: "{{body_copy}}". This text is light gray at 85% opacity.

At the bottom of the frame, a full-width horizontal strip at 20% opacity in the brand primary color contains the CTA text "{{cta}}" in all caps, centered, in white, 12% frame height.

Brand logo appears bottom-left corner, small, white. Composition is balanced, breathing room is generous, no clutter.

Negative prompt: stock photography, people, hands, icons, busy backgrounds, drop shadows on text, beveled text, skeuomorphic elements, clip art, low contrast, serif fonts, multiple competing focal points.
```

## Headline Guidance
- Character limit: 45 chars (LinkedIn/Display); 30 chars (leaderboard 728×90)
- Style: Declarative or provocative. One idea per headline — no conjunctions. Reads in under 2 seconds. Leads with outcome or category claim, not feature name.

## Body Copy Guidance
- Character limit: 80 chars
- Style: One supporting clause that earns the headline — a specific number, a time frame, a named pain point. Not a complete sentence — a sharp fragment is fine.

## CTA Guidance
- Style: 2-4 word action phrase in all caps — "SEE HOW IT WORKS", "GET THE DEMO", "START FREE". Button or bottom strip. High contrast against background.

## Performance Notes
No data yet — update after first 3 runs.
