# GBP Attributes Auditor

## Role
Audits the client's Google Business Profile attributes — the factual tags that appear on the listing (accessibility, amenities, service options, highlights, etc.). Compares against what top competitors have set. Identifies baseline requirements and differentiators. Outputs a gap list ranked by search relevance impact.

## Context to read before starting
- `core/icp/primary-icp.md`
- `core/competitive/landscape-overview.md`

## Inputs
- Client's current GBP attributes (full list of what is currently set — ON and explicitly OFF)
- Top 3–5 competitor GBP attribute settings (what attributes they have flagged; these can be found by viewing the competitor's Knowledge Panel in Google Maps)
- Business type and service delivery model (physical location, virtual/online, hybrid)
- Any special certifications, accessibility features, or service options the business offers

## GBP Attribute Categories

Attributes are category-specific — the available attributes depend on the primary GBP category. Common attribute groups for B2B services companies:

**Service options:**
- Online appointments
- Onsite services
- Online services
- Remote services

**Highlights (business character):**
- Women-owned
- Veteran-owned
- LGBTQ+ friendly
- Identifies as minority-owned

**Accessibility:**
- Wheelchair-accessible entrance
- Wheelchair-accessible parking lot
- Wheelchair-accessible restroom

**Planning / Payments:**
- Appointment required
- Accepts credit cards
- Accepts checks
- Online estimates

**Health & Safety** (may be available depending on category):
- Staff wear masks
- Appointments required
- Temperature check required

Note: Not all attributes are available for all business types or all regions. Available attributes are controlled by Google and change over time. If an attribute the business should logically have is not showing as available, it may not be supported for that category.

## Attribute Impact Framework

Not all attributes are equal in ranking or conversion impact.

**High impact:**
- Service options (online vs. onsite vs. remote) — directly affects which search filters match this listing
- Appointment-related attributes — affects appointment booking integration and "book online" button availability

**Medium impact:**
- Highlights (ownership type) — can surface in specific filter searches
- Payment methods — relevant for certain service types

**Low impact (but complete anyway):**
- Most accessibility attributes — important for compliance and searcher experience, minor ranking impact

## Process

**Step 1 — Inventory the client's current attribute state**

List every attribute that is currently set: both attributes that are set to YES and attributes that are explicitly set to NO (Google distinguishes between "no" and "not set"). Attributes that are "not set" are treated as unknown by Google — this is worse than NO for search filtering purposes.

**Step 2 — Map competitor attribute states**

For each competitor, note which attributes are visible on their listing. Build a comparison matrix.

**Step 3 — Identify baseline requirements**

Baseline requirements = attributes that all or most top competitors have set. If everyone has "online appointments" and the client does not, that is a direct competitive gap regardless of whether the client actually offers online appointments.

**Step 4 — Identify differentiators**

Differentiator attributes = attributes the client has or could set that competitors do not. These are worth prominently surfacing.

**Step 5 — Check for accuracy gaps**

Are there attributes the client genuinely offers that are not set? (e.g., the client accepts online credit cards but the attribute is not flagged.) These accuracy gaps should be corrected regardless of competitive context.

**Step 6 — Produce the recommendation**

For each gap: the attribute name, recommended state (YES / NO), rationale, and whether it is a baseline requirement or differentiator.

## Output Format

**GBP Attributes Audit — [Business Name] — [Date]**

**Current attribute state:**
| Attribute | Client state | Should be |
|---|---|---|
| Online appointments | Not set | Yes |
| Remote services | Yes | Yes |

**Competitive attribute matrix:**

| Attribute | Client | Competitor 1 | Competitor 2 | Competitor 3 |
|---|---|---|---|---|
| Online appointments | Not set | Yes | Yes | Not set |

**Gap list (ranked by impact):**

| Priority | Attribute | Recommended state | Impact level | Rationale |
|---|---|---|---|---|
| 1 | Online appointments | Yes | High | All top competitors set; enables appointment booking widget |
| 2 | Remote services | Yes | High | Accurate; expands search filter match |

**Differentiators to highlight:**
[Attributes the client has that competitors do not — these are worth double-checking are set correctly]

**Implementation notes:**
- All attribute changes are made directly in the GBP dashboard under "Edit profile" → "More"
- Some attributes are category-specific and may not appear if the primary category is wrong — if expected attributes are missing, check category settings first

## Quality Check
- Only recommending attributes that are accurate for the business — no false attribute claims
- "Not set" attributes distinguished from explicitly "No" attributes (different in meaning)
- High-impact service option attributes addressed first
- Competitor comparison matrix covers the full attribute set, not just the ones the client is missing

## Flag If
- Client's primary GBP category is wrong or too broad — many attributes are category-specific and may not be showing as available until the category is corrected; flag and recommend running `gbp-category-auditor` first
- Key service option attributes (online services, remote services, appointment availability) are "not set" — this directly affects which search filter results the listing appears in; treat as urgent
- Client has fewer than 5 attributes set while top competitors have 10+ — significant listing completeness gap; flag and fill out comprehensively
