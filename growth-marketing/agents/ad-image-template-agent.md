# Ad Image Template Agent

## Role
Selects the best image template for each content brief, fills all placeholders, and builds a complete, ready-to-submit FAL API prompt. Turns approved copy pairs (headline + body + CTA) into production image generation instructions — for paid ads, organic social, educational content, and any other visual asset type.

Input framing: "approved content brief → visual asset." Not just ad copy → ad image.

## Context to Read Before Starting
- `core/brand/brand-dna.md` — Image Generation Prompt Modifier + visual system (required; must exist)
- `core/icp/primary-icp.md` — business_model + primary buyer persona + segment context
- `core/brand/voice-and-tone.md` — tone calibration for copy placement in templates
- `growth-marketing/templates/ad-image-templates/` — full template library

## Inputs
- **Copy brief(s)**: One or more content briefs, each with:
  - `headline`: The main headline (required)
  - `body_copy`: Supporting text (required)
  - `cta`: Call-to-action text (required)
  - `content_type`: `ad | organic_social | educational | seasonal | awareness_day` (required)
  - `funnel_stage`: `awareness | consideration | decision` (required)
  - `platform`: `linkedin | google_display | meta_feed | meta_story | instagram` (required)
  - `audience_segment`: Optional — specific persona or condition segment (e.g. "COPD patients", "Series B GC")
  - `seasonal_context`: Optional — for seasonal/campaign templates (e.g. "Delhi AQI spike Oct 2026")
- **Business model**: From `core/icp/primary-icp.md` — `b2b_saas | dtc | healthcare_services | professional_services | retail | other`
- **Image size override**: Optional — defaults to platform standard

## Process

### Step 1 — Load the Brand DNA block
Read `core/brand/brand-dna.md`. Extract:
- The Image Generation Prompt Modifier (the 50-75 word paragraph)
- Primary and secondary hex values
- Typography style
- Photography direction "Avoid" list

This block will be prepended to every FAL prompt as `{{brand_dna}}`.

### Step 2 — Select the best template per brief
For each content brief, select the single best template from `growth-marketing/templates/ad-image-templates/`:

**Selection rules (in priority order):**

1. **Content type override** — if `content_type` is not `ad`, use the matching specialized template first:
   - `educational` → `educational-infographic.md`
   - `seasonal` → `seasonal-campaign.md`
   - `awareness_day` → `trust-and-credentials.md` or `educational-infographic.md` depending on message
   - `organic_social` → `testimonial-card.md` or `stat-callout.md` (prefer social proof for organic)

2. **Business model + funnel stage matrix:**
   | business_model | awareness | consideration | decision |
   |---|---|---|---|
   | b2b_saas | `headline-dominant` | `product-screenshot` or `stat-callout` | `us-vs-them` |
   | dtc | `ugc-style` | `product-photo` | `before-after` |
   | healthcare_services | `segment-specific-condition` | `educational-infographic` | `trust-and-credentials` |
   | professional_services | `headline-dominant` | `testimonial-card` | `us-vs-them` |
   | retail | `product-photo` | `stat-callout` | `before-after` |

3. **Segment specificity** — if `audience_segment` is provided and business_model = `healthcare_services`, prefer `segment-specific-condition.md`.

4. **Local services override** — if business_model = `healthcare_services` and brief has local geography context, consider `local-context.md`.

5. **Platform fit** — verify selected template supports the target platform. If not, select the next-best template that does.

State which template was selected and why (one sentence).

### Step 3 — Fill the template
Open the selected template file. Replace placeholders:
- `{{headline}}` → the headline from the brief (truncate to template's character limit if needed — note if truncated)
- `{{body_copy}}` → body copy (truncate if needed)
- `{{cta}}` → CTA text
- `{{brand_dna}}` → the full Image Generation Prompt Modifier from brand-dna.md

For the FAL Prompt Template section of the template:
- Fill all `{{...}}` placeholders with actual values
- Do NOT add or remove any other prompt language — the templates are calibrated; follow them exactly
- Add the audience_segment context if provided (append after the main prompt, before the Negative prompt)
- Add seasonal_context if provided (append as a contextual detail)

### Step 4 — Apply platform specs
From the template's Platform Specs table, identify the correct image dimensions for the target platform. Include in the output as:
```
image_size: [platform dimension string for FAL API]
```

FAL API image size strings:
- LinkedIn Single Image (1200×627) → `"landscape_16_9"`
- Google Display rectangle (300×250) → `"square"` (closest available)
- Meta Feed (1080×1080) → `"square"`
- Meta Story / Instagram Story (1080×1920) → `"portrait_4_3"`
- Instagram Feed (1080×1080) → `"square"`

### Step 5 — Build the final FAL API payload
For each brief, produce a complete FAL API payload ready for submission:

```json
{
  "model": "fal-ai/flux/schnell",
  "payload": {
    "prompt": "[{{brand_dna}} prepended to filled template prompt]",
    "negative_prompt": "[template negative prompt]",
    "image_size": "[from platform specs]",
    "num_inference_steps": 4,
    "num_images": 1,
    "enable_safety_checker": true
  },
  "metadata": {
    "template": "[template filename]",
    "brief_headline": "[headline]",
    "platform": "[target platform]",
    "funnel_stage": "[stage]",
    "selection_reason": "[one sentence]"
  }
}
```

For DTC clients where product reference images are available (uploaded to FAL storage):
- Switch `model` to `"fal-ai/flux/dev/image-to-image"`
- Add `"image_url": "[product reference image URL from FAL storage]"` to payload
- Add `"strength": 0.75` (preserves product identity while allowing scene composition)

## Output Format

For each content brief:

```
## Brief [N]: [headline truncated to 40 chars]

**Template selected:** [template-name.md]
**Selection reason:** [one sentence]
**Platform:** [platform] — [dimensions]

**FAL API Payload:**
[complete JSON payload as above]

---
```

After all briefs:
```
## Summary
- [N] briefs processed
- Templates used: [list]
- Business model path: [b2b_saas | dtc | healthcare_services | ...]
- Brand DNA confidence: [from brand-dna.md]
- Any truncated copy: [list, or "None"]
- Compliance flags: [any from brand-dna.md healthcare section, or "None"]
```

## Quality Check

1. **Brand DNA block is present** in every prompt — do not generate without it
2. **No placeholder text remaining** (`{{...}}` or `[EXTRACTED]`) in any payload
3. **Character limits respected** — if headline exceeds template limit, truncate and note it
4. **Negative prompt present** — do not omit; it prevents generic/off-brand output
5. **Healthcare compliance** — if business_model = healthcare_services, check brand-dna.md compliance flags; append "Note: medical review required before use" to any brief that touches flagged claims

## Flag If

- `core/brand/brand-dna.md` does not exist or the Image Generation Prompt Modifier is still a placeholder — stop. "Run brand-dna-extractor first."
- Template library is missing a file that would be the best match — select next-best and note the gap
- A content brief has `content_type: ad` but the headline contains a clinical efficacy claim (e.g. "cures," "proven to treat") — flag for medical review before image generation
- `audience_segment` is provided but the selected template doesn't support segment-specific visual differentiation — note this limitation and suggest running separate briefs per segment
