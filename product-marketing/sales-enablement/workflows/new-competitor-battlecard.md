# New Competitor Battlecard Workflow

## Purpose
When a new competitor is identified — either by the competitive-monitor or by sales flagging a competitor appearing in deals — this workflow produces a field-ready battlecard within 5 business days of the first competitive mention. Speed matters here: a rep in an active competitive deal without a battlecard is at a structural disadvantage.

## Target Timeline
**5 business days from first competitive mention to published battlecard.**

| Day | Action |
|---|---|
| Day 1 | Trigger received, research sprint begins |
| Day 2 | Competitor card drafted |
| Day 3 | Battlecard-generator runs |
| Day 4 | PMM + sales lead review |
| Day 5 | Published to sales team |

If there are active deals involving this competitor right now, compress to 3 business days. Alert the relevant AEs directly with a draft card marked "PRELIMINARY — UNDER REVIEW" if the Day 5 deadline cannot be met faster.

## Trigger
One of the following:
- **competitive-monitor flags** a new competitor: new entrant to the category, existing vendor entering our space, or a prospect has mentioned a company not currently in `core/competitive/`
- **field-feedback-synthesizer flags** a new competitor: a company appears in 3 or more field feedback entries without a corresponding card in `core/competitive/landscape-overview.md`
- **AE or sales lead directly reports** a competitor appearing in a deal — this is the most urgent trigger; if a rep is in an active deal against a competitor we have no card for, treat it as Day 0 and start immediately

## Agents Involved
1. competitive-monitor (research and profile the competitor)
2. field-feedback-synthesizer (surface any existing deal mentions of this competitor)
3. battlecard-generator (produce the card)
4. [GATE] PMM review + sales lead review before distribution

## Steps

### Day 1 — Trigger and Research Sprint

**Step 1.1 — Confirm the competitor is genuinely new**
Before beginning work, verify the competitor is not already tracked under a different name or abbreviation in `core/competitive/`. Search `core/competitive/landscape-overview.md` and `core/competitive/` directory for: the competitor's full name, any known aliases, parent company name (if applicable). If a card already exists under a different name, update the existing card rather than creating a new one.

**Step 1.2 — Gather competitor intelligence (competitive-monitor)**
Research the competitor from available public sources. Minimum required:
- Website: positioning statement, product description, target customer, pricing page (if public)
- G2 or equivalent reviews: what customers love, what they complain about — this is your sourcing for "their real weaknesses"
- LinkedIn: company size, growth rate, key executive backgrounds
- Job postings: reveals product roadmap priorities and GTM strategy better than press releases
- Ad library (Google/Meta): what they're advertising — this is their top-of-funnel positioning claim, often more revealing than their website
- Recent press: funding announcements, product launches, customer wins

**Step 1.3 — Run field-feedback-synthesizer on existing deal mentions**
Query `core/system-intelligence/signal-log/` and `core/customer-voice/win-loss-interviews/` for any existing mentions of this competitor. Even 1–2 entries are valuable; they ground the card in real deal dynamics rather than theoretical positioning. If zero deal mentions exist, note this and proceed — the card will be lower-confidence and should be marked accordingly.

**Step 1.4 — Draft competitor card**
Create `core/competitive/[competitor-slug].md` using the standard competitor card format. This card is the permanent intelligence record for this competitor — it is separate from the battlecard, which is the sales-facing derivative. The competitor card includes: company overview, ICP, pricing (if known), key positioning claims, known strengths, known weaknesses, and intelligence sources with retrieval dates.

---

### Day 2 — Competitor Card Completion and Battlecard Prep

**Step 2.1 — Complete the competitor card**
Finalize `core/competitive/[competitor-slug].md`. Include a last-updated date. Add the competitor to `core/competitive/landscape-overview.md` with a one-line summary.

**Step 2.2 — Assess data confidence**
Count available win/loss entries for this competitor. Flag if fewer than 3 (see battlecard-generator flag protocol). Note which sections of the upcoming battlecard will be hypothesis-marked due to low data.

**Step 2.3 — Identify the 3 most likely deal scenarios**
Based on the research, where is this competitor most likely to appear in our deals? What deal types, ICP segments, or buying situations are they strongest in? This context helps the battlecard-generator prioritize what matters most for field use.

---

### Day 3 — Run Battlecard Generator

**Step 3.1 — Run battlecard-generator**
Pass to battlecard-generator: competitor name, competitor card path, all available win/loss entries for this competitor, messaging pillars, ICP profile.

**Step 3.2 — Apply low-data protocol if triggered**
If the generator flags fewer than 3 win/loss entries, all hypothesis-marked claims must be clearly labeled in the output card. The card is still published — reps need something — but hypothesis sections are clearly marked for field validation.

**Step 3.3 — Tag the card for field validation**
For any section where data is thin, add a validation request in the notes to sales: "We need reps to report back on whether [specific section] matches what they're hearing in deals. Submit feedback via [channel]." This activates the field-feedback loop that will improve the card over the next 1–2 deal cycles.

---

### Day 4 — [GATE] PMM Review + Sales Lead Review

**This gate must happen before the card is distributed to the sales team. No exceptions.**

**Step 4.1 — PMM review**
PMM lead reads the full card and checks:
- [ ] Competitor card accurately reflects the competitor's actual positioning (not outdated or distorted)
- [ ] Our differentiated strengths are ones we can actually prove — no overreach
- [ ] "When to walk away" is honest — PMM must approve the honest assessment of where we lose
- [ ] Hypothesis-marked sections are clearly identified
- [ ] Landmine questions are genuinely useful and not embarrassingly obvious

PMM approves or returns with specific edits. Target: same-day turnaround on Day 4.

**Step 4.2 — Sales lead review**
The sales lead (VP Sales, Head of Sales, or a senior AE with direct experience in competitive deals) reads the card and checks:
- [ ] "How they sell against us" matches what reps are actually hearing in deals (not what we think they say)
- [ ] Landmine questions would work in a real discovery call — not too blunt, not too vague
- [ ] "When to walk away" is accurate — sales lead confirms the deal types where we genuinely lose
- [ ] Overall: would this card make a rep more effective in a live competitive deal?

Sales lead approves or returns with specific edits. Target: same-day turnaround on Day 4.

**Step 4.3 — Resolve review feedback**
Incorporate feedback from both reviewers. If PMM and sales lead disagree on a point (especially "when to walk away"), escalate to a 15-minute alignment call rather than arbitrating in the document. The goal is a card both sides trust.

---

### Day 5 — Publish and Distribute

**Step 5.1 — Publish to sales team**
Distribute the battlecard via the team's standard channel (Slack, sales enablement platform, Notion, etc.). Include:
- The battlecard file
- A 3-sentence summary of the competitor and the key competitive angle
- A note on which sections are hypothesis-marked and how reps should submit field validation feedback

**Step 5.2 — Brief active deal reps directly**
If any AEs have active deals involving this competitor, reach out directly — do not rely on them finding the Slack post. Send the card directly and offer a 10-minute briefing if the deal is significant.

**Step 5.3 — Add to battlecard-maintenance schedule**
Schedule the card for its first maintenance review:
- 30-day check-in: have reps used it? What feedback is coming back on hypothesis-marked sections?
- 90-day full review: standard battlecard-maintenance cycle
- Add to `core/competitive/landscape-overview.md` with maintenance schedule

**Step 5.4 — Log the workflow completion**
Add an entry to `core/system-intelligence/signal-log/` noting: competitor name, card publication date, data confidence level (how many W/L entries backed it), and which sections are hypothesis-marked.

## Output
At the end of this workflow, the following exist:
- `core/competitive/[competitor-slug].md` — permanent competitor intelligence card
- `product-marketing/sales-enablement/battlecard-[competitor-slug]-[date].md` — published battlecard
- Entry in `core/competitive/landscape-overview.md` — competitor added to landscape
- Maintenance schedule entry — card is not orphaned after publication
- Field validation requests to reps for hypothesis-marked sections

## Human Decision Points

| Decision | Who | When | Non-negotiable? |
|---|---|---|---|
| Confirm competitor is genuinely new (not a known competitor under a different name) | PMM | Day 1 | Yes |
| Approve competitor card for accuracy | PMM | Day 4 | Yes |
| Confirm "how they sell against us" matches field reality | Sales lead | Day 4 | Yes |
| Approve "when to walk away" as honest assessment | PMM + Sales lead | Day 4 | Yes |
| Approve overall card for distribution | PMM lead | Day 4 | Yes |
| Decide whether active deal reps need direct briefing | Sales lead | Day 5 | Judgment call |

## Flag If
- **Active deals exist against this competitor with no card** — compress timeline, alert AEs with preliminary card marked as draft
- **Research sprint turns up insufficient public data** (e.g., early-stage startup with no G2 presence, no press) — publish a minimal card covering only what is known; label all sections as `[hypothesis — validate with field]`; shorten the maintenance check-in to 30 days
- **Competitor appears to be a strategic threat** (well-funded, targeting identical ICP, strong G2 reviews) — flag to PMM lead and sales leadership for a dedicated competitive strategy session beyond the standard battlecard workflow
