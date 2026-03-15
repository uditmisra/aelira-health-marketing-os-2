# Segment Specific Condition

## Best For
- business_model: healthcare_services | b2b_saas
- stage: awareness | consideration
- platforms: Meta Feed, LinkedIn Single Image, Google Display (rectangle), Meta Story
- when to use: When you are running persona-specific campaigns and need the ad to immediately signal "this is for you" — by naming the audience's condition, job title, company stage, or specific situation in the visual itself. The goal is to stop the scroll by showing the audience that this message is specifically about their world, not a generic ad they happened to see.

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
│  [segment-specific bg or image —    │
│   condition illustration, or        │
│   persona-appropriate workspace]    │  ← background, 100% frame
│                                     │
│  ┌────────────────────────────────┐ │
│  │                                │ │
│  │   {{headline}}                 │ │  ← segment identifier — large, dominant
│  │   (the condition / segment     │ │     40-50% frame height
│  │    name — "Series B GC",       │ │     dark or brand-colored panel
│  │    "Asthma", "eComm founder")  │ │
│  │                                │ │
│  └────────────────────────────────┘ │
│                                     │
│  {{body_copy}}                      │  ← segment-specific pain/hook
│  (their exact pain, their language) │     18% frame height
│                                     │
│  [logo]           [ {{cta}} ]       │  ← bottom, segment-specific CTA
└─────────────────────────────────────┘
```

Zones:
- Background: Segment-specific visual signal — for healthcare: a condition-relevant illustration (lungs, heart, etc.) in muted brand tones; for B2B SaaS: a workspace or context signal relevant to the persona (legal desk, ops dashboard). Background is at 30-40% opacity to allow text to read clearly.
- Condition/segment headline zone: a large panel (brand primary or dark) occupying 40-50% of frame height. The segment identifier or condition name is the dominant typographic element — very large, weight 800+. This single word or phrase IS the scroll-stopper.
- Body copy zone: Below the panel, the segment-specific pain statement in legible type. This text speaks directly in the language of that persona — their jargon, their specific complaint, their situation.
- Footer: Logo and segment-specific CTA — the CTA should reference the segment's context, not generic brand language.

## FAL Prompt Template
```
{{brand_dna}}

A persona-targeting advertising creative that opens with the audience's identity. The entire visual is organized around a single signal: "this is for you."

BACKGROUND (full frame): A segment-relevant background visual — for a legal/B2B SaaS context: a clean, slightly abstract representation of a contract-heavy workspace — organized stacks of documents, a glowing monitor with legal text, or an abstract flow of contract icons. For a healthcare context: a clean medical illustration of the relevant body system or condition in muted, professional tones. The background is rendered at 30% opacity over a dark brand-toned base (#0A1628 or brand dark), ensuring text remains legible.

HEADLINE PANEL (45% of frame height, vertically centered): A solid rectangular panel in the brand primary color (100% opacity) with generous horizontal padding. Within this panel: the segment identifier "{{headline}}" — the condition name, job title, or audience segment — rendered in ultra-bold white sans-serif (weight: 900, size: 55% of panel height, tracking: -1px). This word or phrase is the full visual focal point of the ad. Nothing else competes with it.

BODY COPY ZONE (below the panel, 18% frame height): On the semi-transparent dark background, the sub-headline "{{body_copy}}" in white sans-serif (weight: 400, size: 14% of zone height). This text speaks directly in the segment's language — their specific pain, their situation. Left-aligned with 24px left padding.

FOOTER (10% frame height): brand logo bottom-left at small size, white. CTA button bottom-right: "{{cta}}" — white background, brand primary text, 4px rounded corners, weight 600.

Negative prompt: generic office stock photography, diverse-team-stock-photos, clip art medical icons, cartoonish illustrations, multiple competing visual elements, busy backgrounds at full opacity, non-segment-specific imagery.
```

## Headline Guidance
- Character limit: 25 chars (this IS the segment identifier — shorter is more impactful)
- Style: The exact word or phrase the audience uses to describe themselves or their situation. For healthcare: the condition name as the audience knows it ("Chronic Back Pain", "Type 2 Diabetes"). For B2B SaaS: the role or stage ("Series B GC", "First Legal Hire", "Contract-Heavy Ops Lead"). No verb. No sentence. Just the identity signal.

## Body Copy Guidance
- Character limit: 85 chars
- Style: Speaks to that segment's most specific pain — in their language, not marketing language. "Your contracts are buried in email threads and no one knows what was agreed." or "Your team reviews 100+ contracts a month in Word. One clause gets missed." First or second person. Specific to the segment. Should feel like the brand read their mind.

## CTA Guidance
- Style: Segment-specific where possible — "GET THE GUIDE FOR GCS", "SEE HOW LEGAL TEAMS USE IT", "FIND A SPECIALIST NEAR YOU." If segment-specific language is too long, fallback to direct action: "SEE HOW IT WORKS", "GET YOUR ASSESSMENT." Pill button, bottom-right.

## Performance Notes
No data yet — update after first 3 runs.
