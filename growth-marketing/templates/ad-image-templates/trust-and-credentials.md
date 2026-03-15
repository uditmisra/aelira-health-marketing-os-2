# Trust and Credentials

## Best For
- business_model: healthcare_services | professional_services
- stage: awareness | consideration
- platforms: Meta Feed, Meta Story, Google Display (rectangle), LinkedIn Single Image
- when to use: When the primary purchase barrier is trust — the audience needs to believe in the person behind the service before they will consider the service itself. Effective for healthcare providers, legal professionals, financial advisors, consultants, and any high-stakes service where the expert's identity is the product.

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
│  ┌───────────────┐  ┌─────────────┐ │
│  │               │  │             │ │
│  │  [expert or   │  │ {{headline}} │ │
│  │   founder     │  │ (pull quote) │ │  ← photo 45-50% frame width
│  │   photo —     │  │             │ │     quote zone 45-50% frame width
│  │   facing      │  │ [credential │ │
│  │   camera,     │  │  badges row]│ │
│  │   approx 50%  │  │             │ │
│  │   frame       │  │ [Name]      │ │
│  │   height]     │  │ [Title]     │ │
│  │               │  │ [Practice]  │ │
│  └───────────────┘  └─────────────┘ │
│                                     │
│  {{body_copy}}                      │  ← full-width, 8% frame height
│  [logo]              [ {{cta}} ]    │
└─────────────────────────────────────┘
```

Zones:
- Background: clean white or very light warm gray (#F5F3F0). Professional, document-like quality — nothing busy.
- Photo zone: 45-50% of frame width, full height of content area. The photo is the expert or founder, facing camera, professional attire, warm and confident expression. Photo is cropped to show head and shoulders or head and torso. A thin 3px border in brand primary color frames the left edge of the photo.
- Quote zone: 45-50% of frame width. Contains: (1) pull quote in large weight type, (2) a row of small credential badge logos or certification icons, (3) name/title/practice attribution at the base.
- Footer strip: full-width, very light gray, thin top border. Body copy left, logo center, CTA button right.

## FAL Prompt Template
```
{{brand_dna}}

A professional trust-building advertising creative centered on expert authority and credentials. The composition uses a two-column layout with a clean white or warm off-white background (#F5F3F0).

LEFT COLUMN (48% of frame width): A professional photograph of a subject — doctor, lawyer, founder, or expert — in professional attire, directly facing the camera with a confident, approachable expression. Warm, soft lighting from front-left. The subject's expression is calm and reassuring, not stiff or stock-photo-like. The photo is cropped at mid-torso or below-shoulder level. A 3px vertical line in the brand primary color runs along the right edge of this column, separating it from the text column. The photo has no filters or color treatment.

RIGHT COLUMN (48% of frame width, 4% gutter): Three stacked zones:

Zone 1 — Pull Quote (upper 40% of column): The headline text "{{headline}}" in large sans-serif (weight: 600, dark gray #1A1A1A, size: 18% of column height). An oversized opening quotation mark in brand primary at 30% opacity sits top-left of the quote block.

Zone 2 — Credential Badges (middle 25% of column): A horizontal row of 2-4 small credential or certification badge icons — board certifications, professional association logos, years-in-practice badge, or award icons. Each badge is small (24-32px height), displayed at original colors, evenly spaced.

Zone 3 — Attribution (lower 35% of column): In three lines: Name in dark gray weight 700 (18px equivalent), Title in medium gray weight 500 (14px), Practice or Company in brand primary weight 600 (14px).

FOOTER STRIP (10% frame height): Very light gray (#F0EFED), thin 1px top border in neutral gray. Left: "{{body_copy}}" in small gray text. Center: brand logo at small size. Right: CTA button reading "{{cta}}" — brand primary fill, white text, rounded corners.

Negative prompt: stock photo doctors with stethoscopes posed artificially, actors posing as professionals, unclear or fake credentials, overly formal corporate stock photo poses, backgrounds with hospital equipment or law book shelves, clip art badge icons, multiple people in the frame.
```

## Headline Guidance
- Character limit: 100 chars (this is a pull quote — it should sound like something the expert actually said)
- Style: First person, specific, honest. Sounds like a real professional speaking to a peer or a patient: "Most people wait until there's a problem. By then, it's already cost them." or "I've reviewed contracts for 12 years. The worst ones always come from email threads." Authentic voice. Not a marketing tagline.

## Body Copy Guidance
- Character limit: 70 chars
- Style: Context that establishes scope and credibility — "20 years in practice. 3,000+ cases handled. Serving [City/Region]." or "Trusted by 500+ in-house legal teams across the US." Factual, concise. Can include a service area or location signal.

## CTA Guidance
- Style: Low-friction, trust-appropriate — "MEET THE TEAM", "BOOK A CONSULTATION", "GET YOUR ASSESSMENT". Avoid urgent pressure tactics in this template — the audience is evaluating trust, not responding to urgency. Button, right-aligned, brand primary fill.

## Performance Notes
No data yet — update after first 3 runs.
