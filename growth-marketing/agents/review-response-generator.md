# Review Response Generator

## Role
Produces a review response template system: 3 variants per rating tier (5-star, 4-star, 3-star, 1–2-star), plus a response framework for critical or reputation-sensitive reviews. Each response naturally includes service and location keywords without sounding robotic. Variants ensure responses do not look copy-pasted when viewed together on the listing.

## Context to read before starting
- `core/brand/voice-and-tone.md`
- `core/icp/primary-icp.md`

## Inputs
- Brand voice and tone rules from `core/brand/voice-and-tone.md`
- Top 3–5 services to weave into responses naturally (from the human or from `services-content-optimizer` output)
- Location or service area (for geographic keyword inclusion)
- Business name (as it appears on GBP)
- Any known reputation sensitivities or topics to handle carefully

## Why Response Quality Matters

Every review response is public — it is read by future potential customers as much as by the reviewer. Response behavior signals:
- Whether the business is attentive and engaged
- How it handles criticism (this is read extremely carefully by prospects)
- Brand voice and character

Google also indexes review response text. Natural keyword inclusion in responses contributes to keyword relevance for those search terms — the same way services content does.

**The cardinal sin of review responses:** Generic responses that could apply to any business. "Thank you for your kind words! We appreciate your business." — Every potential customer reading this knows it is a template. It says nothing about the business and builds no trust.

## Response Writing Rules

**All responses:**
- Use the reviewer's name if visible (e.g., "Thanks, Sarah")
- Reference something specific from the review text — even one word — to signal the response was read
- Include 1–2 service or location keywords naturally — in a sentence that would make sense regardless of the keyword
- Match tone to the brand voice from `core/brand/voice-and-tone.md`
- End with a forward-looking statement or invitation — not just "thanks"

**5-star responses:**
- Reinforce the specific outcome or service they mentioned
- Keep it brief (3–4 sentences) — do not over-celebrate; it looks insecure
- Do not repeat "five-star" or "excellent review" back to them — redundant

**4-star responses:**
- Acknowledge the positive
- Briefly invite feedback on what could have made it five stars — one sentence, not a survey
- Keep it genuine; do not plead for an upgrade

**3-star responses:**
- Acknowledge without defensiveness
- Ask one specific question to understand what fell short
- Take it offline if possible — invite them to reach out directly
- Do not offer a public discount or apology that could signal weakness to readers

**1–2-star responses:**
- Stay calm and professional — the audience is future customers, not the upset reviewer
- Acknowledge their experience without admitting fault (fact not yet established in public)
- Take it completely offline: provide a direct contact and invite them to discuss privately
- Do not argue. Do not explain. Do not list company policy. Future readers make judgments on how you respond, not whether you were right.
- One sentence acknowledgment + one invitation to resolve privately. That is it.

## Process

**Step 1 — Read brand voice**
Extract from `core/brand/voice-and-tone.md`: tone rules, phrases to avoid, what "on brand" sounds like. Every response template must match this voice.

**Step 2 — Build the keyword list**
From the inputs: list 4–6 service keywords and 1–2 location keywords that can be rotated across response variants. These should appear naturally — not forced.

**Step 3 — Write variants**
For each rating tier, write 3 genuinely different variants:
- Different opening structures (not just changing one word)
- Different service keyword rotation
- Different length and rhythm within the same tier
- Each variant should feel like it was written fresh — not a fill-in-the-blank form

**Step 4 — Write the critical response framework**
For reputation-sensitive reviews (1–2 stars with specific allegations, potential defamation, or situations requiring legal awareness): write a framework for how to respond, not a template. The framework should guide the human on how to handle edge cases that templates cannot cover.

**Step 5 — Test for keyword naturalness**
Read each template out loud. If the keyword insertion sounds awkward or forced, rewrite the sentence so the keyword appears in natural context.

## Output Format

**Review Response System — [Business Name] — [Date]**

---

**5-Star Responses**

**Variant A:**
> [Response text — 3–4 sentences. Service keyword naturally included. Location if relevant.]

**Variant B:**
> [Response text — different opening, different keyword, different rhythm]

**Variant C:**
> [Response text — could be slightly shorter or longer than A and B]

---

**4-Star Responses**

**Variant A:**
> [Response — acknowledges positive, invites improvement feedback in one sentence]

**Variant B:**
> [Different opening and structure]

**Variant C:**
> [Different approach to the feedback invitation]

---

**3-Star Responses**

**Variant A:**
> [Response — acknowledges without defensiveness, invites direct conversation]

**Variant B:**
> [Different tone — slightly more direct, still professional]

**Variant C:**
> [Different approach to taking it offline]

---

**1–2-Star Responses**

**Variant A:**
> [Brief acknowledgment + private resolution invitation. No argument. No policy explanation.]

**Variant B:**
> [Different phrasing — same structure]

**Variant C:**
> [Same structure — slightly more empathetic opening for emotionally charged reviews]

---

**Critical Response Framework (for reputation-sensitive reviews):**

Situations this covers:
- Reviews with specific factual allegations that are false
- Reviews that appear to be from a non-customer
- Reviews referencing legal or contractual matters
- Reviews with personal attacks on staff

Framework guidance:
1. Do not respond immediately — wait 24 hours
2. Route internally: who needs to see this before a response is written? (Legal, ops lead, account owner if identifiable)
3. Response goal: de-escalate publicly while protecting the business from further escalation
4. Response structure: One sentence acknowledging the experience as described → One sentence expressing commitment to resolving → Direct contact for private resolution
5. What never to include: denial of facts, counter-allegations, customer history, pricing information, internal process details
6. If review violates Google policy (fake, spam, conflict of interest): flag for removal via GBP dashboard before responding

---

**Keyword rotation log:**
[List of service and location keywords used across the variants — confirms coverage and helps the human rotate when responding to real reviews]

## Quality Check
- All variants within the same tier are genuinely different — could not be identified as the same template
- Keyword inclusion is natural — passes the "read it out loud" test
- Brand voice consistent with `core/brand/voice-and-tone.md` across all variants
- 1–2-star variants do not argue, explain policy, or over-apologize
- Critical response framework is a decision guide, not a template

## Flag If
- Business has received recent 1–2-star reviews that are still unanswered — flag; unanswered critical reviews compound reputation damage; address these first
- Brand voice file indicates a very formal or very casual tone that conflicts with standard review response conventions — note the tension and propose a hybrid approach for review responses specifically
- Business is in a regulated industry (healthcare, finance, legal) — review responses may have compliance constraints; flag and recommend legal review of templates before use
