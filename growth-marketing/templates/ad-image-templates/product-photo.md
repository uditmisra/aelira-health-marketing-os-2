# Product Photo

## Best For
- business_model: dtc
- stage: all
- platforms: Meta Feed, Meta Story, LinkedIn Single Image, Google Display (rectangle)
- when to use: When the product's visual appearance, packaging, or physical form is itself a reason to buy — or when lifestyle context communicates the aspiration around using the product. The product is the hero of the frame. Best for physical goods, packaged products, or any brand where aesthetics drive desire.

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
│  [clean or lifestyle background]    │
│                                     │
│  {{headline}}                       │  ← top-left or top-center overlay
│  (minimal, light/white text)        │     12% frame height, no bg panel needed
│                                     │
│                                     │
│         ┌─────────────────┐         │
│         │                 │         │
│         │  [hero product  │         │  ← 55-65% of frame, centered
│         │   shot — clean, │         │
│         │   lit, sharp]   │         │
│         │                 │         │
│         └─────────────────┘         │
│                                     │
│  {{body_copy}} (tiny, below product)│  ← 6% frame height, centered below product
│                                     │
│  [brand logo]         [{{cta}}]     │  ← bottom bar or floating elements
└─────────────────────────────────────┘
```

Zones:
- Background: Clean white, neutral lifestyle surface (marble, wood, fabric), or outdoor lifestyle context. Background supports the product — never competes.
- Headline zone: Top of frame, overlaid directly on background (no panel). White or brand primary text. No drop shadow — background must be light or muted enough for text to float.
- Product zone: 55-65% of frame height, centered horizontally and slightly above vertical center (rule of thirds). Product is sharp, fully lit from front-above, no harsh shadows. Clean product shot preferred over complex lifestyle.
- Body copy: Small, centered below product, in medium gray or brand color. Secondary.
- Footer: Logo and CTA float at bottom. CTA can be a pill button (brand primary) or text-only link style depending on stage.

## FAL Prompt Template
```
{{brand_dna}}

A clean product advertising photograph. The scene is well-lit, the product is the undisputed hero of the frame.

Background: clean white or warm neutral lifestyle surface — marble countertop, linen fabric, or light wood — with soft, even lighting. No props competing with the product. No clutter. Depth of field is shallow — product sharp, background softly blurred.

Center of frame (55-65% of frame height): the hero product shot, positioned slightly above center. Product is photographed straight-on or at a 15-degree angle with professional lighting — soft box from front-left, subtle fill from right, no harsh specular highlights. The product appears premium and aspirational. Colors are true-to-life and saturated.

Top of frame: in the upper 12% of the frame, the headline "{{headline}}" is set in clean white sans-serif (weight: 600, no background panel) if the background is dark enough, or dark brand color if background is pale. The headline does not obstruct the product.

Directly below the product, centered, in small sans-serif (weight: 400, medium gray, 6% frame height): "{{body_copy}}".

Bottom of frame: brand logo bottom-left at small size, in brand primary color. A CTA element bottom-right reading "{{cta}}" — either a pill button in brand primary with white text, or understated text link in brand primary color.

Negative prompt: cluttered backgrounds, multiple products, lifestyle scenes with people obscuring product, overexposed highlights, plastic-looking renders, harsh shadows, lens distortion, studio equipment visible, watermarks.
```

## Headline Guidance
- Character limit: 40 chars
- Style: Benefit or aspiration — speaks to what the product does for the person, not what it is. Sensory or emotional language works here. Short fragments preferred over complete sentences. Should be readable floating on the background without a panel.

## Body Copy Guidance
- Character limit: 60 chars
- Style: Product descriptor, key benefit, or offer hook. Small, secondary. Reinforces headline, doesn't repeat it. At later funnel stages, can include price or offer.

## CTA Guidance
- Style: Stage-dependent. Awareness: "DISCOVER [PRODUCT]", "SEE THE COLLECTION." Consideration: "SHOP NOW", "EXPLORE THE LINE." Decision: "BUY NOW — FREE SHIPPING", "GET YOURS TODAY." Pill button at decision stage, text link or subtle button at awareness.

## Performance Notes
No data yet — update after first 3 runs.
