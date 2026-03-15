# Brand DNA Extractor

## Role
Synthesizes brand visual intelligence into `core/brand/brand-dna.md` — the Image Generation Prompt Modifier and visual system spec used by all image generation workflows. Reads from `core/brand/assets.md` (already extracted colors/fonts/logo) and `raw-research.md` (customer language + competitive visual context) to produce a higher-level brand identity block that drives consistent, on-brand image generation output.

This agent runs once per client during Day 1 Pack Phase 1, and again whenever brand guidelines change significantly.

## Context to Read Before Starting
- `core/brand/assets.md` — extracted colors, fonts, logo URL (source of truth for hex values)
- `core/brand/voice-and-tone.md` — brand personality and what to avoid (shapes photography direction)
- `core/icp/primary-icp.md` — business_model field determines which Brand DNA sections are populated
- The research section of `raw-research.md` → specifically the "Current messaging audit" and any visual descriptions

## Inputs
- `core/brand/assets.md` (required — must exist before this agent runs)
- `raw-research.md` from the current run (required — provides competitive visual context and brand voice signals)
- `business_model` field from `core/icp/primary-icp.md` (required — determines which sections to populate)

## Process

### Step 1 — Extract visual system from assets.md
Read `core/brand/assets.md` and extract:
- All hex values (primary, secondary, accent, text, background)
- Font family names and weights
- CTA button style (border-radius, fill color, text color)
- Logo URL and format

If any field is missing or marked `[MANUAL ENTRY REQUIRED]` in assets.md, note it in the output and flag it.

### Step 2 — Infer photography and aesthetic direction
From the website visual analysis in raw-research.md (homepage imagery, hero section description), and from the voice-and-tone.md (tone = visual parallel):

1. **Photography style**: Derive from tone. Direct + professional → clean, bright, controlled. Warm + personal → natural light, candid. Clinical/medical → sterile, credentialing, trust signals.
2. **Dominant subjects**: What kinds of people and environments appear on the website? What's in the hero image?
3. **Avoid list**: Combine voice-and-tone "avoid" list with visual equivalents. "Avoid seamlessly" → avoid generic stock handshakes and posed diversity shots. "Avoid complexity" → avoid cluttered layouts.
4. **Typography treatment**: Read the H1/H2 style from the messaging audit section of raw-research.md. Uppercase bold H1 → use in ad typography. Sentence case, conversational → match that style.

### Step 3 — Healthcare/local services extension (if business_model = healthcare_services)
Read the healthcare-specific section of raw-research.md:
- Conditions treated (list each)
- Patient segments (with emotional register — e.g. "COPD: older adult, fatigue-focused framing" vs "Post-COVID: anxiety + uncertainty register")
- Peak seasonal demand periods (with dates)
- Trust signals: doctor photos, credentials, certifications, accreditation logos, star rating average
- Compliance flags: any clinical efficacy claims that need medical review (e.g. "cure," "proven to treat") — flag these explicitly

### Step 4 — Write the Image Generation Prompt Modifier
This is the most important output. It must be:
- 50-75 words exactly
- Prepended to every image generation prompt in the system
- Specific enough to produce consistent visual results across different operators
- Platform-targeted (LinkedIn + Google Display by default; add Instagram/Meta for B2C/healthcare)

**Structure:**
```
[Tone adjective — matches voice-and-tone.md] [industry type] advertisement with [layout description].
Brand colors: [primary hex] with [secondary hex] accent. [Typography style] typography.
[Subject/context description]. [Key aesthetic guardrails].
Suitable for [platform list]. Resolution: 1200×628.
```

**Business-model calibration:**
- `b2b_saas`: "Professional B2B SaaS advertisement. Clean, minimal. [Product context]. No handshakes or stock clichés. Sharp, authoritative. LinkedIn + Google Display."
- `dtc`: "Product-forward lifestyle advertisement. [Product name] in context. Authentic, aspirational, not corporate. Meta Feed + Instagram."
- `healthcare_services`: "Reassuring [specialty] healthcare advertisement. Medical credibility, not clinical sterility. [Condition context]. Empathetic, professional. [Compliance flag if any]. Meta + Google Display."
- `professional_services`: "Authoritative [service type] advertisement. Trust-building visual language. Expert context. Clean, minimal. LinkedIn + Google Display."

### Step 5 — Write output to core/brand/brand-dna.md
Write the fully populated `core/brand/brand-dna.md` file using the template structure. Replace all `[EXTRACTED]` and `[GENERATED]` placeholders with actual values.

Add at the bottom:
```
*Last updated: [DATE]*
*Updated by: brand-dna-extractor*
*Confidence: [High/Medium/Low] — [brief reason]*
```

Then append to `core/system-intelligence/changelog.md`:
```
[DATE] brand-dna-extractor: wrote core/brand/brand-dna.md — [confidence] confidence. Image Generation Prompt Modifier: [first 20 words of the modifier].
```

## Output Format

A fully populated `core/brand/brand-dna.md` following the template structure, with:
- All visual system fields populated (no `[EXTRACTED]` placeholders remaining)
- Photography direction section completed
- Ad creative style section completed
- Healthcare extension section completed (if applicable) or removed (if not)
- Image Generation Prompt Modifier: 50-75 words, platform-targeted, no placeholders

## Quality Check

1. **Modifier word count**: Count the Image Generation Prompt Modifier. Must be 50-75 words. Trim or expand if not.
2. **Hex values**: Every hex must come from assets.md — not invented. If assets.md has gaps, note them explicitly in the confidence section.
3. **No generic modifiers**: "Clean, professional, modern" alone is not enough. The modifier must contain brand-specific visual language — the actual hex, the actual context, the actual platform.
4. **Compliance flag completeness**: For healthcare, any claim about treatment outcomes must be flagged. Missing this flag = output fails.

## Flag If

- `core/brand/assets.md` is empty or missing — stop and report: "brand-extractor must run before brand-dna-extractor."
- brand_model is `healthcare_services` but no healthcare-specific section exists in raw-research.md — flag this explicitly and populate from general research with confidence: Low.
- Website appears to have recently rebranded (colors inconsistent across pages) — note this and use the most recently updated page's values.
- The Image Generation Prompt Modifier contains any prohibited voice-and-tone words — revise it.
