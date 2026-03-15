# Seasonal Campaign

## Best For
- business_model: healthcare_services | all
- stage: awareness | consideration
- platforms: Meta Feed, Meta Story, Google Display (rectangle), LinkedIn Single Image
- when to use: When there is a real-world seasonal trigger, regulatory deadline, weather event, or calendar moment that creates a spike in demand or urgency for your product — and when tying your message to that moment makes it feel immediately relevant rather than generic. The seasonal hook must be genuine; forced seasonality reads as lazy.

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
│  [contextual seasonal bg —          │
│   weather, calendar, news visual    │
│   at 40-50% opacity]                │  ← full-frame contextual imagery
│                                     │
│  ┌────────────────────────────────┐ │
│  │  [DATE / SEASON / EVENT]       │ │  ← urgency anchor — large, top of panel
│  │  (the moment — large, bold)    │ │     20% frame height
│  └────────────────────────────────┘ │
│                                     │
│  ┌────────────────────────────────┐ │
│  │  {{headline}}                  │ │  ← the hook tied to the moment
│  │  (moment-tied message)         │ │     35% frame height
│  └────────────────────────────────┘ │
│                                     │
│  {{body_copy}}                      │  ← offer or action details
│  (offer or next step)               │     12% frame height
│                                     │
│  [logo]           [ {{cta}} ]       │
└─────────────────────────────────────┘
```

Zones:
- Background: Contextual visual specific to the seasonal moment — an air quality meter for AQI/pollution season, a calendar with a deadline circled, a budget spreadsheet for Q4 planning season, a filing cabinet for tax season. Rendered at 40-50% opacity over a dark brand-toned base. The image is evocative, not literal — an atmosphere, not a stock photo.
- Urgency anchor block: Top 18-22% of frame, full-width dark panel. Contains the date, season name, or event identifier in large uppercase type — "AQI: 400+", "Q4 BUDGET SEASON", "TAX DEADLINE: 30 DAYS." This is the temporal hook. Brand secondary color or high-contrast orange/amber for this element.
- Headline zone: Below the urgency anchor, full-width, semi-transparent dark background (60-70% opacity). Contains {{headline}} in large white type — the benefit or action tied to the seasonal moment.
- Body copy zone: Below the headline panel, smaller text on the semi-transparent background. Offer details, next step, or urgency amplifier.
- Footer: Logo and CTA button.

## FAL Prompt Template
```
{{brand_dna}}

A seasonal urgency advertising creative that uses a real-world moment or deadline as the visual and emotional anchor.

BACKGROUND (full frame): A contextual photographic or illustrative background specific to the seasonal moment — for air quality campaigns: an atmospheric hazy city skyline with an AQI meter graphic overlay at low opacity; for Q4 budget season: a desk with a calendar showing Q4, a spreadsheet on screen; for tax deadline: a filing pile with a red deadline stamp. Background is at 40% opacity layered over a dark brand-toned base (#0A1628), ensuring all text elements are fully legible.

URGENCY ANCHOR BLOCK (top 20% of frame, full-width): A solid dark panel (#0F0F0F at 90% opacity). Within this block: the temporal hook — the season, date, event, or urgency signal — in uppercase sans-serif (weight: 800, color: amber #E07000 or high-contrast orange, size: 50% of block height). This element reads in under 1 second.

HEADLINE PANEL (35% of frame height, full-width): Semi-transparent dark overlay (#000000 at 65% opacity). The headline "{{headline}}" in white sans-serif (weight: 700, size: 35% of panel height). The headline ties the seasonal moment to a specific, relevant action or outcome.

BODY COPY ZONE (15% of frame height): On the same semi-transparent dark background, "{{body_copy}}" in white (weight: 400, size: 20% of zone height). Contains offer details, deadline specifics, or urgency reinforcement.

FOOTER (10% of frame height): brand logo bottom-left in white at small size. CTA button bottom-right reading "{{cta}}" — high-contrast fill (brand primary or amber if urgency-forward), white text, rounded corners, weight 700.

Negative prompt: generic seasonal stock photos (snowflakes, pumpkins unrelated to product), calendar clip art, alarm clock icons, artificial scarcity messaging, stock photo crowds, countdown timers as graphics.
```

## Headline Guidance
- Character limit: 60 chars
- Style: Directly connects the seasonal moment to the audience's relevant pain or opportunity — "AQI is 400 today. Your clinic should be ready." or "Q4 budget approvals close in 3 weeks. Your contracts should be done." The seasonal hook is in the urgency anchor block — the headline is the relevance bridge to the product. Conversational and specific.

## Body Copy Guidance
- Character limit: 80 chars
- Style: The offer, the next step, or the urgency amplifier — "Book your review before October 31." or "Legal teams using SpotDraft cut approval time by 67% this quarter." Time-bounded where appropriate. Factual.

## CTA Guidance
- Style: Moment-specific urgency — "ACT BEFORE THE DEADLINE", "PREPARE NOW", "BOOK FOR Q4", "SCHEDULE THIS WEEK." Urgency without false scarcity. Pill button — amber or brand primary depending on whether urgency or brand is the primary signal. White text, weight 700.

## Performance Notes
No data yet — update after first 3 runs.
