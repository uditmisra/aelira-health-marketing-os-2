# /gen-ads

## What it does
Generates a complete ad copy batch for a specified channel — headlines across all 5 frame types, matching body copy, and quality-gate scores — ready for upload.

## Workflow it runs
`growth-marketing/workflows/ad-copy-generation.md`

## Required inputs
When this command is run, ask the user for the following if not already provided:
1. **Channel:** Google / Meta / LinkedIn
2. **Campaign objective:** Awareness / Consideration / Conversion
3. **Offer or angle:** What is being promoted? (e.g., "free trial", "book a demo", "ROI calculator download", "new feature launch")
4. **Any constraints:** (optional) e.g., "avoid price mentions", "founder-led voice", "competitor comparison ok"

If ICP, messaging pillars, or voice and tone are not yet populated in `core/`, flag this before generating — output quality depends entirely on these files.

## What Claude does when this command runs

**Step 1 — Read context files**
- `core/brand/voice-and-tone.md`
- `core/icp/primary-icp.md`
- `core/brand/messaging-pillars.md`
- `core/customer-voice/jaw-dropping-moments.md` (for proof language)
- `core/ad-library/top-performers/_index.md` (for performance benchmarks)

**Step 2 — Run creative-headline-agent**
Produces 3+ headlines per frame type for the specified channel:

| Frame type | Structure | Platform char limits |
|---|---|---|
| Problem-led | Names the pain the ICP feels | Google: 30 / Meta: 27 / LinkedIn: 70 |
| Benefit-led | Leads with the outcome | Same limits |
| Curiosity-led | Opens a loop the ICP wants closed | Same limits |
| Social proof-led | Third-party validation | Same limits |
| Comparison-led | Direct or implied competitor contrast | Same limits |

Minimum output: 15 headlines (3 per frame type). More for platforms with responsive ad formats (Google RSAs need 10–15 headlines).

**Step 3 — Run creative-copy-agent**
Produces matching body copy for each headline variant. Structure patterns:
- Problem → Agitate → Solve
- Outcome → Proof → CTA
- Insight → Implication → CTA

Platform body copy specs:
- Google: 90 characters per description
- Meta: 125 characters visible before "See more"
- LinkedIn: 150 characters visible before "See more"

**Step 4 — Run asset-quality-gate**
Scores every headline + body copy combination on three criteria (1–5 each):
1. On-message per `core/brand/messaging-pillars.md`
2. ICP-relevant per `core/icp/primary-icp.md`
3. Specific not generic (no claim that could apply to any SaaS product)

Pass threshold: ≥ 3 on all three criteria. Assets below threshold are revised once before presenting. Assets that fail after one revision are excluded with a note explaining why.

**Step 5 — Return final batch**
Only quality-gate-passing assets are presented. Organized by frame type for systematic A/B testing.

## Output format

**Ad Copy Batch — [Channel] — [Date]**

| Frame type | Headline | Body copy | Char count | QG: On-message | QG: ICP-relevant | QG: Specific | Status |
|---|---|---|---|---|---|---|---|
| Problem-led | [headline] | [copy] | H:XX / B:XX | X/5 | X/5 | X/5 | Pass |

Followed by: copy organized by format for direct upload to the platform's ad creation interface.

## Notes
- Run `/creative-sprint` first if you want to base the creative on competitive intelligence
- Character counts are provided for every asset — verify platform-specific limits before upload
- Organize uploads by frame type so you can test frames against each other, not just individual ads
