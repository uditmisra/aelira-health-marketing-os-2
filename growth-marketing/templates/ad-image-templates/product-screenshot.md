# Product Screenshot

## Best For
- business_model: b2b_saas
- stage: consideration
- platforms: LinkedIn Single Image, Meta Feed, Google Display (rectangle)
- when to use: When the UI itself is the proof — a dashboard view, a workflow step, an AI output, or a feature moment that shows exactly what the product does in a way words cannot. Most effective when the screenshot is cropped tightly to a single high-value moment rather than showing the full application.

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
│  ┌─────────────────────────────┐    │
│  │  {{headline}}               │    │  ← semi-transparent overlay strip, top
│  │  (small, high contrast)     │    │     full-width, 14% frame height
│  └─────────────────────────────┘    │
│                                     │
│  ┌─────────────────────────────┐    │
│  │                             │    │
│  │   [product UI screenshot]   │    │  ← 60-65% of frame height
│  │   (cropped, high-res)       │    │
│  │                             │    │
│  │   [optional: callout arrow  │    │
│  │    or highlight box on      │    │
│  │    key UI element]          │    │
│  └─────────────────────────────┘    │
│                                     │
│  [brand color bg strip]             │
│  {{body_copy}} (small, white)       │  ← 10% frame height
│                                     │
│  [logo]         [ {{cta}} button ]  │  ← bottom bar, 10% frame height
└─────────────────────────────────────┘
```

Zones:
- Top overlay strip: full-width, dark semi-transparent background (#000000 at 70% opacity), 13-15% frame height. Contains headline text only.
- Screenshot zone: centered, 60-65% of frame height. The UI screenshot is framed with a subtle drop shadow (4px, black at 20%). A thin 2px border in brand secondary color surrounds the screenshot.
- Optional callout: a single arrow or highlight rectangle in brand primary color pointing to the most important UI element in the screenshot. No labels on the callout — the headline does the explaining.
- Bottom strip: full brand-primary-color rectangle, 10-12% frame height, contains body copy in white.
- Footer: logo bottom-left (white), CTA button bottom-right (white text, dark border or white outline).

## FAL Prompt Template
```
{{brand_dna}}

A B2B SaaS advertising creative showing a software product UI. The background behind the screenshot area is very light gray (#F0F2F5) or white — clean, professional, no gradients.

At the top of the frame: a full-width horizontal banner with a dark semi-transparent background (#0A0A0A at 75% opacity). Within this banner, in white sans-serif (weight: 600, size: approximately 13% of frame height), the headline reads: "{{headline}}". The text is left-aligned with 24px left padding.

Occupying the center 65% of the frame height: a realistic-looking software UI screenshot, cropped to show a single high-value view — a contract dashboard, an AI review panel, or a workflow step. The screenshot is rendered with a 4px rounded corner, a subtle drop shadow (offset: 0 8px 24px rgba(0,0,0,0.15)), and a 2px border in the brand secondary color. A single bright callout highlight — a rounded rectangle in the brand primary color at 40% opacity — overlays the most important element in the UI to draw the eye.

Below the screenshot: a full-width horizontal strip in the brand primary color (14% of frame height). Within this strip, centered, in white sans-serif (weight: 400, size: 11% of strip height): "{{body_copy}}".

At the very bottom: brand logo bottom-left in white at small size, and a CTA button bottom-right reading "{{cta}}" — white background, brand primary text, 4px rounded corners.

Negative prompt: blurry screenshots, watermarked UI, multiple browser windows, desktop clutter, real user data visible, low-resolution UI, full-page screenshots showing too much, stock photo office settings.
```

## Headline Guidance
- Character limit: 55 chars
- Style: Names the specific thing the screenshot is showing — "See every contract's status in one view" or "AI flags risky clauses before you sign." Should match what is visible in the screenshot so the viewer's eye confirms the claim immediately.

## Body Copy Guidance
- Character limit: 80 chars
- Style: One supporting outcome or feature detail — "SpotDraft gives your team one place to create, review, sign, and track." Factual extension of the headline. Can name the specific feature visible in the screenshot.

## CTA Guidance
- Style: Feature-specific or demo-oriented — "SEE IT LIVE", "WATCH THE DEMO", "TRY IT FREE". Avoid generic "LEARN MORE." Button, bottom-right, white background with brand primary text or full brand-primary pill.

## Performance Notes
No data yet — update after first 3 runs.
