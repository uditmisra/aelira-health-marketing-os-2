# /seo-audit

## What it does
Runs the SEO content strategy audit — produces a topic cluster map, priority keyword list, content gap analysis, and 90-day SEO content plan. Note: technical SEO audit is a human step (requires SEMrush/Ahrefs/Search Console); this command handles the content strategy layer.

## Workflow it runs
`growth-marketing/workflows/seo-audit-sprint.md`

## Required inputs
When this command is run, ask the user for the following if not already provided:
1. **Website URL**
2. **Top keywords** (optional but recommended): paste the top 20 keywords from Google Search Console (last 90 days, by clicks)
3. **Top landing pages** (optional): URLs and topics of best-performing organic pages
4. **Competitors for keyword gap analysis:** list 2–3 competitor domains
5. **Any known content priorities:** (optional) e.g., "we need content around [topic] for an upcoming launch"

## What Claude does when this command runs

**Step 1 — Read context files**
- `core/icp/primary-icp.md` (what does the target buyer search for?)
- `core/brand/messaging-pillars.md` (what topics should our content own?)
- `core/competitive/landscape-overview.md` (which competitor domains to analyze for keyword gaps)

**Step 2 — Run seo-content-strategist**

Produces:
1. **Topic cluster map** — organized around the messaging pillars:
   - One pillar page per messaging pillar (long-form, 2,000+ words, targets the broadest keyword in that topic)
   - 5–8 cluster pages per pillar (each targeting a more specific keyword, linking back to the pillar)
   - Supporting content types: comparison pages ("us vs. [competitor]"), use case pages, FAQ pages

2. **Keyword prioritization** — for each cluster and supporting page:
   - Target keyword
   - Search intent (Informational / Comparison / Solution / Branded)
   - Funnel stage (Top / Mid / Bottom)
   - Priority score (volume × ICP relevance × conversion potential ÷ difficulty)
   - Content status (existing page / gap — new page needed / existing page needs optimization)

3. **Competitor keyword gap** — keywords competitors rank for that the company doesn't, filtered to ICP-relevant terms only. Note: if competitor domain data isn't available, this section flags which tool to use (Ahrefs, SEMrush) and what seed terms to enter.

4. **Content audit** — for each existing page provided:
   - Current keyword targeting accuracy (does the page target the right keyword for its topic?)
   - Recommended action: Keep as-is / Optimize (target keyword refinement) / Rewrite (significant content improvement) / Consolidate (merge with another page) / Retire (no search value, remove or noindex)

**Step 3 — Return outputs**

## Output format

**SEO Content Strategy — [Website] — [Date]**

**Note on technical SEO:** This command covers the content strategy layer. Before investing in new content, run the technical audit (crawl errors, page speed, indexation) in SEMrush/Ahrefs/Search Console. Technical issues block content investment — fix them first.

---

**Topic Cluster Map**
[One section per messaging pillar: pillar page + cluster pages + supporting content, each with target keyword and funnel stage]

---

**Priority Keyword List (Top 30)**
| Keyword | Intent | Funnel stage | Priority score | Content status | Recommended action |
|---|---|---|---|---|---|

---

**Competitor Keyword Gaps (Top 20)**
| Keyword | Competitor ranking | Search volume (est.) | ICP relevance | Priority |
|---|---|---|---|---|

---

**Content Audit**
| Page URL | Current keyword | Recommended keyword | Action | Rationale |
|---|---|---|---|---|

---

**90-Day Content Plan**
| Week | Content piece | Type | Target keyword | Funnel stage | Owner |
|---|---|---|---|---|---|
| 1–4 | [Technical fixes if flagged] | Technical | — | — | Engineering |
| 5–8 | [Existing page optimizations] | Optimize | [keyword] | [stage] | Content/PMM |
| 9–12 | [New pillar pages — most important first] | New content | [keyword] | Top | Content/PMM |

## Notes
- If `core/brand/messaging-pillars.md` is not yet populated, the topic cluster map cannot be built around your actual positioning — the output will be generic. Populate messaging pillars first.
- The SEO content plan prioritizes in order: technical fixes → existing page optimization → new content. Do not skip to new content if there are technical issues or underperforming existing pages.
- Keyword volume estimates without a paid SEO tool will be directional. If exact volume data is needed, provide a Search Console export or SEMrush data.
