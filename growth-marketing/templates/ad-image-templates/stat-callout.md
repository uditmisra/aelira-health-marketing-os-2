# Stat Callout

## Best For
- business_model: b2b_saas | professional_services
- stage: consideration
- platforms: LinkedIn Single Image, Google Display (leaderboard), Google Display (rectangle)
- when to use: When you have a single, verifiable, impressive number that does the selling — a time saved, a percentage improved, a volume handled. The number must be specific and credible. Do not use this template for vague or inflated stats.

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
│   [high-contrast bg — dark or       │
│    brand primary]                   │
│                                     │
│                                     │
│         ┌─────────────────┐         │
│         │                 │         │
│         │   {{headline}}  │         │  ← the number itself: 65-70% frame height
│         │   (THE STAT)    │         │     massive, centered, weight 900
│         │                 │         │
│         └─────────────────┘         │
│                                     │
│    contextual label (small, muted)  │  ← "of contracts reviewed in <1 day"
│    ─────────────────────────────    │  ← thin horizontal rule
│    {{body_copy}} (supporting fact)  │  ← 8% frame height
│                                     │
│  [logo]          [{{cta}} button]   │
└─────────────────────────────────────┘
```

Zones:
- Background: High contrast — deep navy (#0A0F1E), dark charcoal (#1C1C1C), or brand primary at full saturation. No gradients, no photography.
- Stat zone: 60-70% of frame height — the number only, no label inside this zone. Weight 900. White or near-white. No decorative elements around the number.
- Context label: Directly below the stat, in smaller type (18-20% of frame height), brand secondary color or light gray — the clause that explains what the number means.
- Horizontal rule: Thin 1px line in white at 20% opacity, separating context label from body copy.
- Body copy: Supporting stat or source citation. Very small, below the rule.
- Footer: logo bottom-left, CTA button bottom-right.

## FAL Prompt Template
```
{{brand_dna}}

A minimal, high-impact advertising creative. Background is deep navy (#0A0F1E) or dark charcoal — flat, no texture, no photography. High contrast throughout.

Dominating the center 65% of the frame: the large number from the headline "{{headline}}" rendered in massive sans-serif type (weight: 900, tracking: -2px). The number is white or off-white (#F5F5F5). The number alone — no label, no unit suffix in the same size. The number takes up the full vertical center of the frame.

Directly below the number, in a smaller weight (weight: 400, size: 14% of frame height), a contextual label in brand secondary color or light gray (#A0AEC0) that completes the stat's meaning. This is the first line of {{body_copy}}.

A thin horizontal rule (1px, white at 20% opacity) separates the context label from a secondary supporting line in even smaller type (weight: 300, size: 8% of frame height, medium gray) — the second line of {{body_copy}} if present, or a source attribution.

Brand logo appears bottom-left, white, small. A CTA pill button bottom-right reads "{{cta}}" — brand primary color background, white text, rounded corners, weight 600.

No icons. No charts. No people. The number is the entire message.

Negative prompt: pie charts, bar graphs, infographic elements, decorative borders, stock photography, gradients in background, serif fonts, multiple numbers competing for attention, decorative circles around the number.
```

## Headline Guidance
- Character limit: 8 chars (this IS the stat — e.g., "4 hours", "67%", "2 days", "10×")
- Style: The raw number or metric. No verb. No context yet — context goes in body copy. Must be a real, sourced figure. Round numbers feel fake — prefer exact ("67%" over "70%", "4.2 hours" over "4 hours") unless the round number is genuinely accurate.

## Body Copy Guidance
- Character limit: 90 chars total, split into two lines: Line 1 (50 chars) = the context clause ("of legal teams close contracts 67% faster"); Line 2 (40 chars) = source or secondary supporting fact ("Based on 200+ SpotDraft customers, 2025")
- Style: Line 1 completes the stat. Line 2 provides source or additional proof. Both factual, no fluff.

## CTA Guidance
- Style: Proof-forward — "SEE THE DATA", "READ THE REPORT", "GET YOUR BENCHMARK". Pill button, bottom-right. White text on brand primary fill.

## Performance Notes
No data yet — update after first 3 runs.
