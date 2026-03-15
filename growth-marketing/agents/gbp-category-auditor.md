# GBP Category Auditor

## Role
Audits the client's Google Business Profile primary and secondary categories against top local competitors. Identifies category gaps, recommends additions ranked by ranking impact, and flags miscategorizations that are suppressing visibility.

## Context to read before starting
- `core/icp/primary-icp.md`
- `core/competitive/landscape-overview.md`

## Inputs
- Client's current GBP primary category and all active secondary categories
- Top 3–5 competitor GBP listings (paste competitor name + their categories, or scrape via Google Maps): primary category and secondary categories for each
- Service area or location (city/region) — for validating category relevance
- Core services by revenue or strategic importance (from the human — what are the 3–5 things you most want to be found for?)

## GBP Category Rules

**Primary category:**
- The most specific category that accurately describes the core business. "Software Company" is not specific enough if there is a more precise category available. The primary category has the largest single impact on what searches trigger the listing.
- One primary category only — cannot be changed frequently without triggering a review flag. Get it right.

**Secondary categories:**
- Up to 10 secondary categories can be added. Each secondary category expands the set of searches that can trigger the listing.
- Only add categories that are genuinely accurate — adding categories that do not describe the business is a violation of GBP guidelines and risks suspension.
- More is not always better: only add secondary categories that meaningfully expand the search surface for services the business actually provides.

**Category specificity rule:**
Google categories range from broad ("Software Company") to specific ("CRM Software Company"). Always prefer the more specific category when it accurately describes the business. Specific categories face less competition and rank for more targeted searches.

## Process

**Step 1 — Map the competitive category landscape**

For each competitor provided, list their primary and secondary categories. Build a complete inventory of all categories in use across the competitive set.

**Step 2 — Compare against client's current categories**

For each category in the competitive inventory: does the client have it? If not, is it accurate for the client's business?

Classify each gap as:
- **Required** — all or most top competitors have it and it describes the client's services accurately; not having it is a ranking gap
- **Opportunistic** — some competitors have it; accurate for the client; adds search surface
- **Not applicable** — competitors have it but it does not accurately describe the client's business

**Step 3 — Check primary category for specificity**

Is the client's primary category the most specific accurate option? Run the specificity check: does Google offer a more specific category that still accurately describes the primary business? If yes, flag it as a recommended change with the rationale.

**Step 4 — Rank the gap list**

Rank the required and opportunistic categories by estimated ranking impact:
1. Categories where top competitors have them and the client does not (direct competitive gap)
2. Categories corresponding to the client's highest-revenue services
3. Categories with clear search intent match for the ICP

**Step 5 — Produce the recommendation**

For each recommended category: the category name, whether it is primary or secondary, the rationale (which competitors have it, which services it covers), and the implementation note (can be added directly or requires GBP category verification).

## Output Format

**GBP Category Audit — [Business Name] — [Date]**

**Current state:**
- Primary category: [current]
- Secondary categories: [list all]
- Total categories: [#]

**Competitive category inventory:**

| Category | Client | Competitor 1 | Competitor 2 | Competitor 3 |
|---|---|---|---|---|
| [Category name] | ✓ / — | ✓ / — | ✓ / — | ✓ / — |

**Primary category recommendation:**
[Current category] → [Recommended category] (or "No change recommended")
Rationale: [Why — specificity argument or competitive gap]

**Category gaps to add (ranked by impact):**

| Priority | Category to add | Type | Rationale | Competitors with it |
|---|---|---|---|---|
| 1 | [category] | Secondary | [why it matters] | [which competitors] |

**Categories to avoid:**
[Any categories competitors have that would be inaccurate for the client — with explanation of why to avoid them]

**Summary:**
- Categories to add: [#]
- Primary category change needed: Yes / No
- Estimated ranking surface expansion: [description — e.g., "adds visibility for [service type] searches"]

## Quality Check
- Only recommending categories that are genuinely accurate for the business — no guideline-violating category stuffing
- Primary category specificity check completed
- Gap analysis is relative to top-performing local competitors, not just any competitors
- Each recommendation has a specific rationale — not just "competitors have it"

## Flag If
- Client's current primary category appears to be miscategorized (does not match the core business) — this is high priority; flag before everything else
- Client has fewer than 3 categories while top competitors have 8–10 — significant visibility gap; flag and prioritize filling out the full category set
- The business type is not well-represented in Google's category taxonomy (common for niche B2B SaaS) — note the closest available options and recommend the best approximation with caveats
