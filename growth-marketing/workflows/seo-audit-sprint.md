# SEO Audit Sprint

## Purpose
Produces a prioritized 90-day SEO action plan: technical fixes, content gaps to fill, and existing content to update. Combines a technical audit (human-led) with a content strategy audit (agent-led).

## Trigger
One of the following:
- New client onboarding (always run before any SEO content investment)
- Organic traffic declining for 2+ consecutive months with no clear cause
- Major site redesign or migration (run immediately after)
- 6+ months since the last audit

## Agents Involved
1. `seo-content-strategist`

## Steps

**Step 1 — Technical audit (human-led, Week 1)**

Human runs a technical crawl using SEMrush, Ahrefs, or Screaming Frog. Collect:
- **Crawl errors:** broken links (4xx), redirect chains, duplicate content, canonical issues
- **Indexation:** pages indexed vs. pages that should be indexed; any pages accidentally noindexed
- **Page speed:** Core Web Vitals (LCP, FID, CLS) — Google Search Console or PageSpeed Insights
- **Mobile usability:** mobile-first indexing issues from Search Console
- **Site architecture:** click depth to important pages (target: no important page more than 3 clicks from home)

Output: technical issues list sorted by severity (Critical / High / Medium / Low). Critical issues block everything else — fix these first before any content investment.

If critical technical issues exist (e.g., site accidentally noindexed, major crawl errors), stop the audit and flag to engineering immediately. Content investment is wasted if the technical foundation is broken.

**Step 2 — Current state input collection (human, Week 1)**

Supply to `seo-content-strategist`:
- Top 20 keywords from Google Search Console (by clicks, last 90 days)
- Top 10 landing pages by organic traffic
- Current content inventory (page URLs + titles + approximate topics)
- Primary competitors for keyword gap analysis
- Any known content priorities from the messaging pillars

**Step 3 — seo-content-strategist runs (Week 1–2)**

Input: ICP profile, messaging pillars, competitive landscape, current keyword data, current content inventory, competitor list.

Output:
1. **Topic cluster map** — one pillar page per messaging pillar + 5–8 cluster pages per pillar + supporting content (comparison pages, FAQ pages, use case pages)
2. **Keyword prioritization** — scored on: search volume × ICP relevance × conversion potential ÷ difficulty. Top 20–30 priority keywords with content mapping (which existing page targets it, or "gap — new page needed")
3. **Competitor keyword gap analysis** — keywords competitors rank for that the company doesn't, filtered to ICP-relevant terms
4. **Content audit** — for each existing page: current performance, keyword targeting accuracy, recommended action (keep as-is / optimize / rewrite / consolidate / retire)

**Step 4 — [GATE] Priority review (Week 2)**

PMM lead or growth lead reviews the full output and makes prioritization decisions:

**Priority order (enforce this):**
1. Technical fixes — they block everything else
2. Existing page optimization — faster wins than new content; pages already indexed just need improvement
3. New content for high-priority keyword gaps — build out the topic cluster
4. Competitor keyword gap content — go after the comparison and alternative keywords once the core cluster is solid

This gate prevents the common mistake of writing new content while technical issues and underperforming existing content go unaddressed.

**Step 5 — Produce 90-day SEO action plan**

Based on the technical audit + agent output + priority review decisions:

| # | Action | Type | Priority | Effort | Expected impact | Owner | Deadline |
|---|---|---|---|---|---|---|---|
| 1 | [Technical fix or content action] | Technical / Optimize / New content | High/Med/Low | High/Med/Low | [Organic traffic or ranking impact] | [Engineering / PMM / Content] | [Date] |

Week 1–4: all Critical and High technical fixes
Week 5–8: highest-priority existing page optimizations
Week 9–12: first new content pieces (pillar pages before cluster pages)

## Output
1. **Technical issues list** — from human audit: sorted by severity with recommended fixes
2. **Topic cluster map** — from seo-content-strategist: full content architecture
3. **Priority keyword list** — top 20–30 keywords with content mapping
4. **Content audit** — existing page recommendations
5. **90-day SEO action plan** — prioritized table with owners and deadlines

## Human Decision Points
- **Technical issues escalation** — Critical issues must be flagged to engineering before any other work proceeds
- **[GATE] Step 4** — Priority review is required before the 90-day plan is finalized; do not skip this gate or the plan will likely prioritize new content over technical and optimization work
- **Content production** — the sprint produces a content plan, not content. Content production is a human (or separate workflow) responsibility. The plan tells you what to write; the writing is done separately.

## Notes
- Technical SEO is not optional. A well-written piece of content on a slow, poorly-structured site will underperform mediocre content on a fast, well-structured site.
- The most common audit finding: existing pages are targeting the wrong keywords (targeting brand terms instead of category terms, or targeting keywords nobody searches for). Fixing this is faster and cheaper than writing new content.
- SEO compounds. The action plan prioritizes the investments that produce compounding returns over 6–12 months, not just 30-day wins.
