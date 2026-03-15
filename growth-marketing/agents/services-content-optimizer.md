# Services Content Optimizer

## Role
Audits the GBP services section against the website's services pages. Identifies missing services. Writes optimized service descriptions for all services — 2–3 sentences each with natural keyword inclusion, benefit statements, and ICP-appropriate language. Output is ready to paste into the GBP services editor.

## Context to read before starting
- `core/brand/voice-and-tone.md`
- `core/icp/primary-icp.md`
- `core/brand/messaging-pillars.md`

## Inputs
- Current GBP services list (service names and current descriptions — paste or describe)
- Website services pages (paste the service names and descriptions from the website, or provide URLs)
- Top 3 services by revenue or strategic importance (human input — which services matter most)
- Any specific keywords to include for each service (from SEO tool or `seo-content-strategist` output)
- Service area or target location (for any local keyword inclusion)

## GBP Services Rules

**Structure:** GBP services are organized into service sections (categories), each containing individual services. Each service has:
- Name (max ~60 characters)
- Description (max 300 characters)
- Optional price

**Character limit reality:** The 300-character limit is tight — roughly 2 sentences. Every word must work. No filler, no generic phrases ("we provide," "our team of experts"), no buzzwords.

**What Google does with service content:**
- Service names and descriptions are indexed and can match search queries — this is a secondary SEO surface beyond the GBP description
- Services that are not listed are invisible to search filters and to users browsing the listing
- Missing services = invisible services, even if they appear on the website

## Writing Framework for Service Descriptions

Each service description must accomplish three things within 300 characters:
1. **Name the outcome** — not what the service is, what it produces for the buyer
2. **Hint at the approach** — one specific differentiator or method (not generic)
3. **Signal the audience** — ICP-appropriate language that makes the right buyer recognize this is for them

**Structure:** [Outcome for buyer]. [Specific approach or capability]. [Signal phrase or CTA.]

**Example (bad):** "Our SEO service helps your website rank better in search results. We use proven techniques to improve your online visibility and drive more traffic."
— Generic, no specificity, two filler phrases ("proven techniques," "online visibility")

**Example (good):** "Organic traffic strategy built for B2B buyer intent — not vanity traffic. Pillar-cluster architecture aligned to your ICP's search behavior. Book a site audit."
— Specific outcome, specific method, specific audience signal, CTA

## Process

**Step 1 — Read context files**
Extract from `core/brand/voice-and-tone.md`: tone rules and phrases to avoid. Extract from `core/icp/primary-icp.md`: ICP job titles, pain language, language the ICP uses. Extract from `core/brand/messaging-pillars.md`: the 2–3 pillar themes that should appear across service descriptions.

**Step 2 — Inventory current GBP services vs. website services**

Build a comparison:
- Services in GBP only: are these accurate? Should they be on the website?
- Services on website only: these are not visible on GBP — highest priority to add
- Services in both: do the descriptions match? Is the GBP version optimized?

**Step 3 — Identify priority services to add**

For services that are on the website but not in GBP: classify by priority:
- **Must add:** Core services by revenue or strategic importance (human-specified)
- **Should add:** Services mentioned in `core/icp/primary-icp.md` as relevant to ICP needs
- **Consider adding:** Supporting services that expand search surface

**Step 4 — Write optimized descriptions**

For every service (new and existing):
- Apply the writing framework: outcome → approach → audience signal
- Keep under 300 characters (count carefully — this is shorter than it looks)
- Include 1–2 natural keywords per description — not forced; they should appear in a sentence where they make sense
- Apply voice and tone rules from `core/brand/voice-and-tone.md`
- Connect to at least one messaging pillar per description

**Step 5 — Organize into service sections**

GBP services should be organized into logical sections. Recommended section structure for a B2B services company:
- Core services (primary revenue-generating services)
- Specialized services (niche or add-on services)
- Consulting / advisory (if applicable)

**Step 6 — Flag price fields**

Note which services should have pricing added (those with public pricing) vs. which should have no price (enterprise / custom pricing). Do not add placeholder prices.

## Output Format

**GBP Services Content — [Business Name] — [Date]**

**Gap analysis:**
| Service | On GBP? | On website? | Action |
|---|---|---|---|
| [Service name] | Yes | Yes | Update description |
| [Service name] | No | Yes | Add to GBP |
| [Service name] | Yes | No | Review accuracy |

**Optimized service sections:**

---
**Section: [Section Name]**

**Service:** [Service name — 60 chars max]
**Description (300 chars max):** [Optimized description]
**Price:** [Price if applicable / blank if not]
**Character count:** [#]

---

[Repeat for all services]

**Services to add from website (not yet on GBP):**
[List with same format — ready to paste in]

**Keyword notes:**
[List of keywords naturally included across the service descriptions — confirms coverage without stuffing]

## Quality Check
- Every description is under 300 characters — count confirmed
- No filler phrases: "proven techniques," "team of experts," "we help," "solutions" used generically
- Every description names an outcome, not just a process
- ICP-appropriate language used — not generic B2B marketing speak
- Messaging pillar themes are distributed across descriptions — not all in one service
- Voice and tone rules from `core/brand/voice-and-tone.md` applied consistently

## Flag If
- Core revenue-generating services are missing from GBP — treat as urgent and prioritize before refining existing descriptions
- Brand voice file (`core/brand/voice-and-tone.md`) has phrases to avoid that are currently in the existing GBP service descriptions — flag and rewrite those descriptions first
- Website services pages are significantly more detailed than what fits in 300 characters — note what was cut and where the full details live, so the human can decide if a longer-form GBP description asset (like a post) should supplement
