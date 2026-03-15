# Local Context

## Best For
- business_model: healthcare_services | professional_services
- stage: awareness | consideration
- platforms: Meta Feed, Meta Story, Google Display (rectangle), Google Local Campaigns
- when to use: When geographic proximity is itself a trust signal or a decision driver — for clinics, gyms, local law firms, agencies, and any service where "near me" searches indicate high intent and local familiarity builds trust faster than any brand message. The location must be genuinely specific and recognizable to the local audience; generic "city name" drops are transparent and ineffective.

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
│  [city skyline, local landmark,     │
│   or neighborhood visual —          │
│   recognizable to locals]           │  ← background, 100% frame
│                                     │
│  ┌────────────────────────────────┐ │
│  │  [pin icon]  {{headline}}      │ │  ← location-anchored headline
│  │  "In [Neighborhood/City]"      │ │     with map pin or location icon
│  │  (geographic identity signal)  │ │     20% frame height
│  └────────────────────────────────┘ │
│                                     │
│  ┌────────────────────────────────┐ │
│  │  {{body_copy}}                 │ │  ← local proof element
│  │  "[N] patients/clients nearby" │ │     local reviews, local social proof
│  │  "★★★★★ [N] reviews in [area]" │ │     30% frame height
│  └────────────────────────────────┘ │
│                                     │
│  [logo]           [ {{cta}} ]       │  ← bottom, location-specific CTA
└─────────────────────────────────────┘
```

Zones:
- Background: A recognizable local visual — a city skyline (Mumbai, Delhi, Bengaluru, New York, etc.), a well-known neighborhood landmark, or a street-level scene recognizable to the target geography. Rendered at 45-55% opacity over a dark brand-toned overlay. Do NOT use stock photo generic city skylines — the visual must be unmistakably the right city.
- Location headline block: Top or center panel with brand primary background at 85% opacity. Contains a map pin icon (small, white, left of text) followed by the headline. The geographic identifier ("In Koramangala", "Serving South Delhi", "NYC Legal Teams") is prominent — it is the first thing the local audience reads.
- Local proof block: Below the location headline, semi-transparent dark panel. Contains the local social proof element — number of local customers, star rating with review count attributed to the local area, or a neighborhood-specific customer name/quote snippet.
- Footer: Logo and location-specific CTA.

## FAL Prompt Template
```
{{brand_dna}}

A local-context advertising creative designed to signal geographic relevance immediately to a local audience.

BACKGROUND (full frame): A recognizable location-specific visual — a well-known city skyline, a neighborhood street, or a local landmark rendered photographically or as a clean illustration. The visual must be unmistakably associated with a specific, recognizable place (not a generic "city" stock photo). Background is at 50% opacity over a dark navy overlay (#0A1628), ensuring text legibility throughout.

LOCATION HEADLINE BLOCK (upper 22% of frame, full-width): A semi-transparent panel in brand primary at 88% opacity. Left side: a map pin icon (white, 24px, with a subtle drop shadow) followed by the headline "{{headline}}" in white sans-serif (weight: 700, size: 42% of block height). The headline leads with the geographic identifier — neighborhood, city, or service area. Right side: small map icon or distance indicator in lighter brand secondary tone.

LOCAL PROOF BLOCK (middle 32% of frame, full-width): Dark semi-transparent panel (#000000 at 65% opacity). Contains the body copy "{{body_copy}}" in two visual elements:
- Line 1: A star rating display (5 filled stars in amber #F5A623, 16px each) followed by review count in white (weight: 600, "240+ reviews in Koramangala" or "[N] clients served in [area]")
- Line 2: A short, specific local proof statement in white (weight: 400, size: 85% of line 1 height) — a neighborhood-specific customer count, a local award, or a community recognition.

FOOTER (10% of frame height): Dark strip (#0A0A0A at 95% opacity). Brand logo bottom-left in white at small size. CTA button bottom-right reading "{{cta}}" — brand primary fill, white text, rounded corners, weight 700. The CTA text references the location where possible.

Negative prompt: generic world map pins, tourist stock photos, aerial city views without local character, clip art location markers, multiple city names competing for attention, non-local star ratings without location context.
```

## Headline Guidance
- Character limit: 50 chars
- Style: Geographic identity first, then value — "Trusted by legal teams across Bengaluru" or "Koramangala's preferred contract platform." The location is the lead. Do not bury the location in the middle of the sentence. Residents and professionals recognize their neighborhood signal instantly.

## Body Copy Guidance
- Character limit: 85 chars total across two display elements: (1) star rating + review count with location attribution; (2) one sentence of local social proof — customer count, years in the area, or a named local recognition. Both elements must be factually accurate and location-specific.

## CTA Guidance
- Style: Location-specific where possible — "FIND YOUR NEAREST OFFICE", "SERVING [CITY] TEAMS", "BOOK IN [NEIGHBORHOOD]". If location-specific is too long, use proximity signal: "NEAR YOU — GET STARTED", "FIND US TODAY." Pill button, full brand-primary fill, white text. Sense of local access, not generic urgency.

## Performance Notes
No data yet — update after first 3 runs.
