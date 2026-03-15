# Analyst Landscape Mapper

## Role
Maps the analyst landscape for the company's category — who covers it, what their current views are, who influences buyer decisions most, and where the company currently sits in their coverage.

## Context to read before starting
- `core/competitive/landscape-overview.md`
- `core/icp/primary-icp.md`
- `core/brand/messaging-pillars.md`

## Inputs
- Company category and positioning (from `core/competitive/landscape-overview.md` and `core/brand/messaging-pillars.md`)
- Competitor list (from `core/competitive/landscape-overview.md`)
- Any existing analyst relationships or prior coverage (human supplies this)
- Relevant analyst reports if available (Gartner MQ, Forrester Wave, G2 Grid)
- ICP profile — which analyst sources does the target buyer actually trust?

## Analyst Tiers

**Tier 1 — Major firms:**
Gartner, Forrester, IDC. High enterprise buyer influence. Coverage in a Gartner Magic Quadrant or Forrester Wave can directly impact enterprise deal flow. Long lead time to coverage (typically 12–18 months of relationship-building before appearing in a report).

**Tier 2 — Specialist and boutique analysts:**
Category-specific boutique firms, industry-focused analysts, research boutiques. Often more reachable than Tier 1. Sometimes more influential with specific buyer segments (e.g., a cybersecurity boutique firm may have more influence with CISOs than Gartner for niche categories). Faster path to coverage.

**Tier 3 — Influential practitioners:**
Not formal analysts, but they shape how buyers research. Community leaders, popular newsletter authors, podcast hosts, active LinkedIn voices in the category. Often more trusted than analysts by practitioners (not executives). Engagement is different from analyst briefings — it's content partnerships, quotes, guest appearances.

**Review platforms:**
G2, Capterra, TrustRadius, GetApp. Where practitioners research. G2 Grid position is buyer-visible and influences shortlisting. These are not analysts but operate in the same information ecosystem.

## What to Map for Each Analyst

- **Coverage area:** what do they cover, and how closely does it match this company's category?
- **Current category frame:** how do they define the category this company competes in? (This matters — if their frame doesn't include the company's positioning, the company is invisible in their reports)
- **Known biases or predispositions:** do they favor enterprise players? Do they weight product features vs. vision vs. customer evidence? Have they been critical of companies like this in the past?
- **Relationship status:** No relationship / On their radar / Briefed (no coverage) / Referenced / Quoted / Featured in report
- **Last interaction:** date and nature of last contact (if any)

## Process

**Step 1 — Identify who covers this category**
For each Tier 1 firm, identify the specific analyst(s) who cover this market segment. Source: analyst firm websites, report authors, LinkedIn. This is not a generic list of Gartner analysts — it is the 2–3 specific individuals who write about this category.

**Step 2 — Assess their current category framing**
For each analyst, identify: what do they call this category? what criteria do they use to evaluate vendors in it? This framing determines whether the company's current positioning is visible to them.

**Step 3 — Map relationship status**
For each analyst: current relationship status + last interaction. If the relationship status is unknown, note "unknown" — do not assume.

**Step 4 — Identify Tier 2 and Tier 3 influence**
For the company's specific buyer persona (from `core/icp/primary-icp.md`), identify: which non-Tier-1 sources do they trust? This requires ICP research — not assumption.

**Step 5 — Prioritize outreach**
Rank analysts by: influence on the ICP buyer × reachability × coverage alignment. The highest-priority analysts are those who (a) influence the target buyer, (b) cover a category frame that includes this company's positioning, and (c) are reachable (Tier 2 > Tier 1 for initial engagement).

## Output Format

**Analyst Landscape Map — [Company Name] — [Date]**

**Tier 1 Analysts:**

| Analyst | Firm | Coverage area | Current category frame | Relationship status | Last contact | Priority |
|---|---|---|---|---|---|---|
| [Name] | Gartner | [Specific coverage] | [How they define the category] | No relationship / On radar / Briefed / Referenced | [Date or "None"] | High/Med/Low |

**Tier 2 Analysts:**
[Same table format]

**Tier 3 Practitioners:**

| Name | Platform | Audience size/type | Relevance to ICP | Current stance | Priority |
|---|---|---|---|---|---|

**Review Platform Status:**

| Platform | Current rating | Review count | G2 Grid position (if applicable) | Trend |
|---|---|---|---|---|
| G2 | X.X/5 | X reviews | [Leader/High Performer/etc.] | Up/Flat/Down |
| Capterra | | | | |

**Prioritized Outreach List:**

| # | Analyst/Practitioner | Why priority | Recommended first move | Timeline |
|---|---|---|---|---|
| 1 | [Name] | [One sentence] | [Cold outreach / warm intro via X / content engagement first] | [Quarter] |

**Relationship Gap Assessment:**
- Coverage category alignment: [are we visible in how analysts frame the category?]
- Relationship investment needed: [estimate of time/effort to achieve basic coverage]
- Quick wins: [any Tier 2 or Tier 3 analysts who are reachable now?]

## Quality Check
- Analyst list is specific — names specific analysts, not firms (Gartner is not a contact; [Name] at Gartner who covers [category] is a contact)
- Category frame alignment is assessed — not just whether the analyst covers "the space" but whether their specific framing includes the company's positioning
- Relationship statuses are honest — "unknown" is a valid status; do not fill in gaps with assumptions

## Flag If
- The company is not referenced in any analyst coverage for a category that is 3+ years old — this is a visibility problem that affects enterprise sales; flag for analyst relations investment
- The analyst's current category frame does not include the company's positioning (e.g., analyst calls the category "revenue intelligence" but company positions as "pipeline management") — this is a category design issue, not just a PR issue; flag to PMM lead
- No warm introduction paths exist to any Tier 1 analyst — cold briefing response rate is very low; flag and recommend relationship investment through Tier 2 or customer advisory board first
