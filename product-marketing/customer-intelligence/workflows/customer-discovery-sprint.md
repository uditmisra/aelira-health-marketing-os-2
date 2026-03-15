# Customer Discovery Sprint

## Purpose
A focused 10-business-day sprint to refresh customer intelligence when ICP signals drift, win rate is declining without clear cause, or the team lacks recent interview data. The output is not a report — it is an updated operating picture: refreshed ICP files, new jaw-dropping moments, objection handler updates, and a clear set of messaging implications that PMM can act on.

Eight to ten interviews over two weeks is a high-leverage investment. A single strong insight from this sprint — one reframe of the primary pain, one unexpected use case, one jaw-dropping quote — can improve conversion across every downstream channel.

---

## Trigger

This sprint is initiated when any of the following conditions are met:

- **ICP quarterly review flags drift:** the icp-refinement-agent detects a consistent directional shift across 2+ dimensions and recommends a full discovery sprint rather than a data-only ICP update
- **90-day interview gap:** the quarterly audit of `core/customer-voice/interview-transcripts/` shows no new interviews have been added in 90+ days
- **Win rate declining without clear cause:** win rate has dropped for 2+ consecutive months and the cause is not attributable to pipeline quality, pricing, or competitive moves — suggesting a positioning or ICP alignment issue
- **PMM judgment:** the PMM owner believes current messaging feels disconnected from how customers actually talk about the problem, regardless of whether a formal trigger has fired

**Who initiates:** PMM owner or Customer Intelligence sub-domain owner. Sprint cannot be initiated by an agent alone — a human must confirm the trigger and kick off the sprint.

---

## Agents involved

1. **interview-synthesizer** — processes all transcripts in batch mode at end of sprint; also used at the midpoint gate for first 4-5 transcripts
2. **persona-builder** — updates ICP persona profiles after full synthesis batch is complete
3. **icp-refinement-agent** — updates ICP definition based on combined synthesis + win/loss patterns; runs at the end of the sprint, not during

---

## Sprint Structure

### Pre-sprint: Interview planning (Day 0-1)

**Human decision required:** PMM defines the interview mix and recruits participants before the sprint begins. The target mix is:

| Interview type | Count | Goal |
|---------------|-------|------|
| Recent wins (closed in last 90 days) | 3-4 | Why did they buy? What was the trigger? What tipped the decision? |
| Recent losses (closed-lost in last 90 days) | 2-3 | Why didn't they buy? What did they choose instead? What was missing? |
| Long-term customers (12+ months) | 2-3 | What's changed in how they use it? What would make them leave? What do they value now that they didn't at purchase? |
| **Total** | **8-10** | |

**Interview guide:** PMM prepares or refreshes the interview guide before interviews begin. Focus the guide on: the situation before the product, what triggered the evaluation, how they decided, and what outcomes they've experienced. Do not over-structure — the best discovery insights come from following threads.

**Scheduling note:** aim to complete all scheduling on Day 0-1 so interviews can begin Day 2-3. Gaps in scheduling will compress the sprint.

---

### Week 1: First interview wave (Days 2-6)

**Step 1:** Conduct interviews 1-5. Record verbatim transcripts where possible. If recording is not possible, take verbatim notes during the interview, not summaries.

**Step 2 (end of Day 5):** run interview-synthesizer in batch mode on the first 4-5 transcripts.

---

### [GATE] Midpoint review (End of Day 5)

**Human decision required.** PMM reviews the first synthesis batch from interview-synthesizer and answers:

1. Are patterns already emerging clearly? (Consistent language, recurring pain, consistent buying trigger?)
2. Are the remaining interviews (week 2) likely to confirm or challenge what we're seeing?
3. Should the remaining interview questions be adjusted to probe emerging patterns more deeply?

**Possible outcomes of the midpoint gate:**
- **Patterns are clear and consistent:** keep remaining interviews on schedule; use week 2 to confirm and pressure-test the emerging finding
- **Patterns are weak or contradictory:** adjust week 2 interviews to probe the specific points of divergence; consider adding a different customer segment to the remaining interviews
- **A surprising finding has emerged:** one unexpected signal should not redirect the entire sprint — flag it, schedule a specific interview to probe it if possible, but do not reorient all remaining interviews around one data point

PMM documents the midpoint gate outcome in the sprint log.

---

### Week 2: Second interview wave (Days 7-10)

**Step 3:** Conduct interviews 6-10 with any adjustments from the midpoint gate.

**Step 4 (Day 9-10):** run interview-synthesizer in batch mode on the full set of 8-10 transcripts, including the first batch. The full-batch synthesis produces the cross-transcript pattern analysis that is the sprint's primary output.

---

### Post-sprint: Synthesis and update (Day 10-11, can extend to Day 12)

**Step 5:** run persona-builder with the full synthesis batch as input. Persona-builder updates `core/icp/primary-icp.md` persona attributes that meet the 3+ data point threshold.

**Step 6:** run icp-refinement-agent with the full synthesis batch + any win/loss data compiled during the sprint. ICP refinement agent updates ICP dimensions that meet the refinement threshold.

**Step 7:** PMM reviews all agent outputs before any core/ files are updated.

---

### [GATE] Sprint findings review (Post Day 10)

**Human decision required.** PMM reviews:

1. **ICP updates:** are the proposed updates well-evidenced? Do they make intuitive sense given what you heard in the interviews?
2. **Persona updates:** do the updated persona attributes feel like a real person, or like a regression to a more generic description?
3. **Jaw-dropping moments:** are the flagged quotes strong enough to use? Which ones belong in active rotation?
4. **Messaging implications:** what are the top 2-3 things the marketing system should do differently based on this sprint?

PMM approves, modifies, or rejects each proposed update. No core/ file is updated without PMM sign-off.

---

## Output

The sprint produces the following outputs upon completion:

| Output | Location | Agent responsible |
|--------|----------|------------------|
| Full interview synthesis batch (all 8-10 transcripts) | `core/customer-voice/interview-transcripts/` | interview-synthesizer |
| Updated jaw-dropping moments | `core/customer-voice/jaw-dropping-moments.md` | interview-synthesizer (PMM approves additions) |
| Updated ICP persona file | `core/icp/primary-icp.md` | persona-builder (PMM approves) |
| Updated ICP definition | `core/icp/primary-icp.md` | icp-refinement-agent (PMM approves) |
| Objection handler update queue | objection-handler agent input | interview-synthesizer (objections category) |
| Competitor mentions log | competitive-monitor input | interview-synthesizer (competitor category) |
| Sprint findings summary | `core/signal-log.md` | PMM writes; agents contribute source material |
| Messaging implications brief | PMM to distribute | PMM writes based on gate review |

---

## Human Decision Points

| Decision | Owner | When |
|---------|-------|------|
| Confirm sprint trigger and authorize sprint | PMM | Before Day 0 |
| Define interview mix and recruit participants | PMM | Day 0-1 |
| Prepare/refresh interview guide | PMM | Day 0-1 |
| Conduct all interviews | PMM or PMM + CS/Sales | Days 2-9 |
| Midpoint gate: review first synthesis batch, adjust week 2 | PMM | End of Day 5 |
| Post-sprint gate: approve/reject all proposed ICP and persona updates | PMM | Day 10-12 |
| Write messaging implications brief | PMM | Day 12-13 |
| Update core/ files (persona, ICP, jaw-dropping moments, signal log) | PMM | After gate approval |

---

## What the agent system does not do

Agents do not conduct interviews. Agents do not decide which ICP updates to apply — they propose updates with evidence, and PMM decides. Agents do not write the messaging implications brief — that requires PMM judgment about what the findings mean for active campaigns, the sales team, and the narrative.
