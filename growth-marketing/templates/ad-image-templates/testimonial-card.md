# Testimonial Card

## Best For
- business_model: all
- stage: consideration
- platforms: LinkedIn Single Image, Meta Feed, Meta Story, Google Display (rectangle)
- when to use: When you have a real customer quote with a specific outcome — a time saved, a deal closed, a problem eliminated. Most effective mid-funnel when prospects are evaluating alternatives and need peer validation from someone who looks like them.

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
│  [clean white or light gray bg]     │
│                                     │
│  "  [large opening quote mark]      │
│                                     │
│     {{headline}}                    │  ← the pull quote, large, 50% frame height
│     (customer quote in large type)  │
│                                     │
│  "  [closing quote mark]            │
│                                     │
│  ┌────┐  [Name, Title]              │
│  │ av │  [Company Name]             │  ← avatar circle + attribution row
│  └────┘  [1 outcome stat/badge]     │
│                                     │
│  {{body_copy}} (optional fine print)│  ← 8% frame height, light gray
│                                     │
│  [brand logo]    [{{cta}} button]   │  ← bottom bar
└─────────────────────────────────────┘
```

Zones:
- Background: white or very light warm gray (#F7F7F5) — clean, document-like, trustworthy
- Quote marks: oversized, in brand primary color, 25% opacity decorative element
- Quote zone: 48-55% of frame height, centered vertically upper-half
- Attribution row: avatar circle (48px), name/title/company in two lines, outcome stat or verification badge
- Body copy: optional — used only for short legal attribution or source note
- Bottom bar: brand logo bottom-left, CTA button bottom-right, thin top border at 10% opacity

## FAL Prompt Template
```
{{brand_dna}}

A professional testimonial advertising card. Background is clean white (#FFFFFF) or warm light gray (#F5F5F3) — no gradients, no texture, minimal and trustworthy.

In the upper 55% of the frame, a large customer pull-quote in medium-weight sans-serif type (weight: 500, dark gray #1A1A1A): "{{headline}}" — with oversized decorative opening and closing quotation marks in the brand primary color at 25% opacity.

Below the quote, a horizontal attribution row: a small circular avatar photo (40-50px diameter, placeholder silhouette in light gray if no photo), followed by two lines of small type — the customer's full name and title in dark gray (weight: 600), and their company name in medium gray (weight: 400). To the right of the attribution, a small outcome badge or stat in brand primary color: a pill shape containing a short metric.

The body copy line "{{body_copy}}" appears below the attribution in light gray, small, 10px equivalent, used as a source note or secondary stat.

At the bottom: a thin horizontal rule, brand logo bottom-left at small size, and a CTA button bottom-right reading "{{cta}}" — rounded corners, brand primary fill, white text.

Generous whitespace throughout. No photography beyond the avatar. No busy elements.

Negative prompt: stock photography of handshakes or teams, speech bubbles, clipart stars for ratings, low contrast, serif body text, busy backgrounds, gradient fills, multiple competing colors, social media UI chrome.
```

## Headline Guidance
- Character limit: 120 chars (the quote itself — this is the most you can fit at legible size)
- Style: Should read as a real human wrote it — not polished marketing copy. Includes a specific outcome ("cut review time from 3 days to 4 hours"), not a vague compliment ("amazing product"). First person. Past tense if describing result already achieved.

## Body Copy Guidance
- Character limit: 60 chars
- Style: Attribution note or outcome stat — "General Counsel, Acme Corp" or "Reviewed 400+ contracts in Q1". Factual, secondary. Can be blank if attribution is handled in the quote zone layout.

## CTA Guidance
- Style: Low-friction, mid-funnel — "READ THE CASE STUDY", "SEE MORE RESULTS", "BOOK A DEMO". Button, bottom-right. Rounded corners, brand primary color.

## Performance Notes
No data yet — update after first 3 runs.
