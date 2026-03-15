# UGC Style

## Best For
- business_model: dtc
- stage: awareness
- platforms: Meta Feed, Meta Story, TikTok (static preview)
- when to use: When the goal is to blend into the organic feed — lower perceived ad-ness, higher initial engagement, and the trust that comes from content that looks like a real person made it. Best for top-of-funnel DTC where trust is earned before interest, and for audiences who scroll past polished ads instinctively.

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
│  [phone screenshot UI chrome —      │
│   optional, subtle top bar]         │  ← looks like a screenshot
│                                     │
│  [slightly off-center or tilted     │
│   product or lifestyle photo —      │
│   casual framing, natural light]    │  ← 55-70% of frame, organic feel
│                                     │
│  "{{headline}}"                     │  ← handwritten-style or casual sans
│   (personal caption style,          │     overlaid mid-frame or below photo
│    slightly imperfect placement)    │
│                                     │
│  {{body_copy}}                      │  ← smaller, like a social caption
│  (casual, first-person)             │
│                                     │
│  {{cta}}                            │  ← text link style, not a button
│  (low-fi — "tap here", "link in     │
│   bio style", arrow emoji)          │
└─────────────────────────────────────┘
```

Zones:
- Background: The photo IS the background — natural setting, real-looking space (kitchen, desk, outdoor). No studio. Natural or window light. Slightly underexposed or slightly washed-out is fine — authenticity over polish.
- Photo zone: 55-70% of frame. Product or person using product. Off-center composition intentional. Photo can appear slightly cropped, as if taken quickly and not perfectly framed.
- Caption zone: Overlaid text, slightly imperfect positioning (not mathematically centered). Font is casual sans-serif or a handwriting-style typeface. Text has natural color — white, cream, or dark based on what the background allows. No text panels, no background strips behind text.
- CTA: Text-style, no button, no pill. Feels like a note or a suggestion — "link in bio" style or an arrow pointing down/right.

## FAL Prompt Template
```
{{brand_dna}}

A UGC-style (user-generated content) social media advertising image designed to look organic and unpolished — as if a real customer took this photo and posted it to their Instagram or TikTok.

The photo occupies the full frame: a natural, slightly imperfect lifestyle shot of a product in a real setting — a kitchen counter, a desk with natural window light, or an outdoor moment. The photo uses natural light (not studio flash), slightly warm color temperature, and a slightly imperfect crop — the product may not be perfectly centered. The image may appear to have been shot on a phone camera.

Overlaid on the photo in the middle or lower-third of the frame: the caption text "{{headline}}" in a casual, humanistic sans-serif typeface (weight: 400-500, slightly imperfect kerning as if hand-typed). The text is white or cream, with a very subtle text shadow (1px, black at 30%) for legibility. The text placement is slightly off-center — intentionally asymmetric.

Below the main caption, in smaller size (60% of headline size), the secondary text "{{body_copy}}" reads like a personal note or observation — honest, first-person, specific.

At the bottom: the CTA "{{cta}}" appears as plain text with a right-pointing arrow (→) or underline, not as a button. Feels like a typed link annotation.

The entire image has a subtle film grain overlay (3-5% intensity) to enhance the organic feel. No brand logo watermark in the main frame — only the smallest possible brand mention embedded in the CTA text if needed.

Negative prompt: studio lighting, perfect centering, polished typography, button CTAs, brand-color backgrounds, drop shadows on text boxes, stock photo people, overly saturated colors, professional retouching, advertising chrome.
```

## Headline Guidance
- Character limit: 80 chars
- Style: First-person, conversational, honest. Sounds like something a real customer would write in a caption — "Okay I finally tried this and it's genuinely different." Specific detail beats generic enthusiasm. Mild informality is intentional. Avoid exclamation marks used three times in a row.

## Body Copy Guidance
- Character limit: 100 chars
- Style: Reads like the rest of a social caption — extends the headline with a specific detail, a personal context note, or a concrete observation. Can include informal punctuation (ellipsis, dash). Should NOT sound like marketing copy.

## CTA Guidance
- Style: Text-link, not a button. Arrow or annotation style — "→ see it here", "link in description", "swipe to get it." Lowercase preferred. No branding in the CTA text unless essential.

## Performance Notes
No data yet — update after first 3 runs.
