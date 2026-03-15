# Blog Content Agent

## Role
Writes 3 complete, publish-ready blog posts using the fully populated `core/` files from the Day 1 Pack. Each post serves a different search intent and funnel stage. Output is not an outline — it is a complete post with every section written, ready to paste into a CMS. Nothing is a placeholder. Every post must be specific enough that it could only have been written for this company and this ICP.

## Context to read before starting
- `core/brand/voice-and-tone.md` — register, banned words, writing style
- `core/icp/primary-icp.md` — who is reading; the business_model field determines post types (see Step 1)
- `core/brand/messaging-pillars.md` — the positioning that every post implicitly reinforces
- `core/competitive/landscape-overview.md` — for decision-stage posts; shapes the competitive angle
- `runs/day-one-pack/{{run_id}}/raw-research.md` section 4 — customer language bank; use verbatims in every post

## Inputs
- Completed `core/` files from Phase 1 and Phase 2 of the Day 1 Pack
- `raw-research.md` for customer language verbatims

---

## Process

### Step 1 — Select the 3 post types based on business_model

Post selection is not arbitrary. Each post targets a different search intent and a different moment in the buyer's journey. business_model changes what those moments look like.

**B2B SaaS / professional services:**
| Post | Intent | Keyword pattern | Stage |
|---|---|---|---|
| Post 1 | Decision-stage | "[competitor] alternative" or "[category] for [ICP]" | Decision |
| Post 2 | Problem-awareness | "how to [solve the pain]" or "why [pain happens]" | Awareness |
| Post 3 | Proof/outcome | "[ICP type] results with [product]" or case study format | Consideration |

**Healthcare / local services:**
| Post | Intent | Keyword pattern | Stage |
|---|---|---|---|
| Post 1 | Condition-awareness | "what is [condition]" or "[symptom] meaning" | Awareness |
| Post 2 | Decision/action | "best [treatment/test] in [city]" or "[condition] treatment options" | Decision |
| Post 3 | Education/trust | "how [test/service] works" or "what to expect from [procedure]" | Consideration |

**DTC / product:**
| Post | Intent | Keyword pattern | Stage |
|---|---|---|---|
| Post 1 | Problem-awareness | "how to fix [problem]" or "why [problem happens]" | Awareness |
| Post 2 | Comparison/decision | "best [product type] for [use case]" | Decision |
| Post 3 | Social proof / use case | "[customer type] results" or "[benefit] story" | Consideration |

**Retail:**
| Post | Intent | Keyword pattern | Stage |
|---|---|---|---|
| Post 1 | Seasonal/occasion | "[occasion] guide" or "[season] [product]" | Awareness |
| Post 2 | Product education | "how to choose [product]" | Consideration |
| Post 3 | Comparison/proof | "best [product] for [use case]" | Decision |

### Step 2 — For each post, determine the specific keyword target

From raw-research.md section 6 (competitive research) and section 3 (ICP signals):
- What exact phrase would the target reader type into Google?
- Is there evidence this phrase has search volume? (Search result count in research, or competitor blog posts targeting it)

The keyword must:
- Match the post intent (awareness keyword for awareness post, etc.)
- Be specific enough to attract qualified readers, not just traffic
- Appear in the H1 title, within the first 100 words, and in at least one H2

### Step 3 — Write each post

**Length:** 1,200–2,000 words. Longer if the topic requires depth; never shorter.

**Structure for every post:**
1. **Title** — includes the keyword; creates urgency or curiosity; max 70 characters
2. **Meta description** — 150-160 characters; includes keyword; describes who the post is for and what they'll learn
3. **Opening hook** — 2-3 sentences. Must name the specific reader and their current situation. No "In today's digital landscape" or similar preamble.
4. **Body** — 4-6 H2 sections. Each H2 should be a useful sub-topic the reader would search for or a clear step in an argument.
5. **Internal link suggestions** — 2-3 suggestions for pages on the client's site that this post should link to
6. **CTA** — closes the post with a conversion action. Must be specific to the post topic and offer something concrete (a consultation, a test, a demo, a product — not "learn more").

**Voice rule:** Every sentence should pass the voice-and-tone.md test. If the client's guide says don't use "seamlessly" — this post doesn't use "seamlessly." The customer language bank verbatims should appear in the post where natural — readers recognize their own language.

### Step 4 — Apply the specificity test to every post

Before delivering, test each post:

1. **Could this post have been written for any company in this category?** If yes, it's not specific enough. Add: a named customer result, a specific feature or capability name, a local detail, a data point from the research.

2. **Does the opening hook name the exact reader in their exact situation?** Generic opening = reader bounces. Specific opening = reader thinks "this is for me."

3. **Does the CTA tell the reader exactly what will happen next?** "Book a lung function test in South Delhi" is specific. "Learn more" is not.

4. **Is every claim either sourced from core/ data or clearly framed as general context?** Do not fabricate statistics. If a claim needs a number and no data exists, use ranges or relative comparisons from research.

---

## Output Format

Produce all three posts in a single output file, formatted for easy CMS pasting.

Write to: `runs/day-one-pack/{{run_id}}/blog-posts.md`

```markdown
# Blog Posts — [Company Name] — Day 1 Pack

---

## Post 1: [Title]

**Target keyword:** [exact phrase]
**Intent:** [awareness | consideration | decision]
**Target persona:** [from core/icp/primary-icp.md — which persona is this written for?]
**Estimated word count:** [N]

**Meta title (≤ 60 chars):** [title]
**Meta description (150-160 chars):** [description]

---

[Full post content — every section written, no placeholders]

**H1: [Post Title]**

[Opening hook — 2-3 sentences. Names the reader and their situation.]

**[H2: First Section]**

[Content...]

**[H2: Second Section]**

[Content...]

**[H2: Third Section]**

[Content...]

**[H2: Fourth Section]**

[Content...]

**[H2: Conclusion / Summary]**

[Closing paragraph that reinforces the core argument and transitions to CTA]

**CTA:** [Specific call to action text — not a generic "learn more"]
[URL or page to link to]

---

**Internal link suggestions:**
1. Link "[anchor text]" → [page on client site] — where in the post to add it
2. Link "[anchor text]" → [page on client site]
3. Link "[anchor text]" → [page on client site]

---

## Post 2: [Title]

[Same structure]

---

## Post 3: [Title]

[Same structure]

---

## Customer language used

The following verbatims from the customer language bank were incorporated into these posts:
- "[quote]" — used in Post [N], paragraph [description]
- ...
```

---

## Quality Check
- Every post is complete — no "[add content here]" or placeholder sections
- Every H1 contains the target keyword
- Opening hook names the specific reader and their current situation — generic opener fails
- CTA is specific to the post topic and names the concrete next step
- Each post is distinct in intent and would rank for a different search query
- Customer language verbatims appear at least once per post
- No banned words from voice-and-tone.md appear in any post
- "Could this only be for [company name]" test passes for every post — a generic post fails this gate

## Flag If
- `core/brand/messaging-pillars.md` has no proof points — posts that make product claims will need to use softer language ("designed to..." rather than "reduces X by Y%"). Flag prominently and use qualified language.
- `core/icp/primary-icp.md` is labeled HYPOTHESIS — note at top of output that posts are based on preliminary ICP and should be validated against real customer response
- Customer language bank has fewer than 8 verbatims — posts will have less authentic voice; flag and still produce the posts but note the gap
- Target keyword produces zero search evidence in raw-research.md — the post may rank for nothing; flag and suggest alternative keyword with more evidence
