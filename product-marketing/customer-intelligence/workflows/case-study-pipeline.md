# Case Study Pipeline

## Purpose
Maintains a steady pipeline of customer case studies so that the sales team and demand gen always have fresh, specific social proof. The target is at least 2 new case studies per quarter. A pipeline without fresh case studies is a slow-burning sales enablement problem — prospects can tell when the references are old, and old case studies often describe problems and use cases that don't match current buyers.

The pipeline runs monthly to identify candidates, then moves each candidate through interview, synthesis, production, approval, and publication.

---

## Trigger

- **Monthly cadence:** on the first of each month, PMM reviews candidate sources and advances any candidates in the pipeline
- **Event-driven triggers:** a customer achieves a notable outcome (shared with CS, mentioned in a QBR, or flagged in a Gong recording); a customer scores 9-10 on NPS and writes a detailed verbatim; a customer mentions a result in a renewal or expansion conversation

---

## Pipeline health target

- **2 new case studies per quarter** minimum
- At any given time, maintain 3-5 active candidates in the pipeline at various stages — this creates a buffer against candidates who drop out (approval delays, customer goes dark, metrics can't be confirmed)
- Prioritize case studies from the primary ICP — a case study from outside the ICP can confuse the target buyer about who the product is for

---

## Agents involved

1. **interview-synthesizer** — processes the post-sale interview transcript and extracts story material, language, and the jaw-dropping moment candidate quote
2. **case-study-producer** — produces the case study draft, social proof variant, and approval package from the synthesis output

---

## Steps

### Step 1: Monthly candidate identification (Day 1-3 of each month)

**Who:** PMM, with input from CS and Sales

Review the following sources for case study candidates:

| Source | What to look for |
|--------|-----------------|
| CS team (QBR notes, account health) | Customers who have hit a measurable outcome milestone; customers who have expanded use and can articulate why |
| Gong / call recordings | Customers who mentioned a specific result, said something quotable, or described a workflow change in detail |
| NPS responses (from survey-analyzer output) | Promoters (9-10) who wrote a detailed verbatim — especially those whose language passes the jaw-dropping moment test |
| Win interviews | Recent wins where the buying rationale is particularly compelling — even without post-sale outcomes, a strong "why us" story has value |
| Expansion / renewal conversations | Customers who recently expanded and articulated why — expansion rationale is often the clearest outcome statement |

**Candidate criteria (all three required for a candidate to advance):**
1. The customer has a story with a before-state, a use case, and at least a directional outcome
2. The customer has expressed positive sentiment toward the product (NPS 8+, a positive quote on a call, or a reference offer)
3. The customer's company profile matches the primary ICP (if it doesn't, flag as a secondary ICP or niche reference, not a primary case study)

**Human decision required:** PMM selects candidates to advance. Not every candidate who meets the criteria should be approached — prioritize by ICP fit, story quality, and relationship health.

---

### Step 2: Interview request (Days 3-7)

**Who:** PMM or CSM (whoever has the warmest relationship with the customer)

Request a 30-minute interview focused on the customer's experience and outcomes. Frame it as an opportunity to share their story — not a testimonial exercise. Customers are more forthcoming when the framing is "we want to learn from your experience" rather than "we'd like to feature you."

**Interview request note:**
- Keep it brief and specific: "We'd love to hear about [specific outcome or use case we know about from the CS team]"
- Set expectations: 30 minutes, their story will be shared as a case study (with their approval before any use), no obligation to share metrics if they're not comfortable

**If the customer declines:** note it in the pipeline and remove from active candidates. Do not re-approach the same customer within 6 months. A declined interview request that is pushed can damage the relationship.

---

### Step 3: Conduct the post-sale interview

**Who:** PMM

Use the standard post-sale interview guide:
1. Before state: "Walk me through what the situation looked like before [product]. What was the problem you were trying to solve?"
2. Trigger: "What made you decide to look for a solution at that point? What was the moment that said 'we need to fix this'?"
3. Evaluation: "What made you choose [product] over alternatives?"
4. Use case: "How does your team actually use it day-to-day? Walk me through a typical use."
5. Outcomes: "What's different now? If you had to describe the before and after to someone on your team who wasn't involved, what would you say?"
6. Quote prompt: "If you were recommending us to a peer, what would you tell them?"

Record verbatim. If recording is not possible, take verbatim notes. Paraphrased notes will degrade the output of interview-synthesizer and case-study-producer.

---

### Step 4: Run interview-synthesizer

**Who:** agent (automated, triggered by PMM after interview)

interview-synthesizer processes the transcript and extracts:
- Story arc elements (before state, trigger, why us, use case, outcome language)
- Best verbatim quotes, including the jaw-dropping moment candidate
- Any surprise moments or new ICP signals (logged but not the focus of a case study interview)
- Outcome language — particularly any specific metrics or behavioral descriptions

PMM reviews the synthesis output and confirms the story arc is complete. If gaps exist (missing outcome data, weak quote), PMM conducts a short follow-up call or sends a targeted follow-up email to fill the gap before advancing to production.

---

### [GATE] Story quality check (before production)

**Human decision required.** PMM reviews the synthesis output and confirms:

1. Is the outcome specific enough? Does it pass the specificity rule (no "saved time," "more productive," or "easier")?
2. Is there a quote strong enough to anchor the case study?
3. Does the customer's profile represent the ICP in a way that will resonate with target buyers?
4. Are there any sensitive details (internal politics mentioned, competitor named, metrics that might be confidential) that need to be flagged before the draft is produced?

**If the story quality is insufficient:** do not advance to production. Two options: (a) schedule a follow-up call to address the specific gaps, or (b) downgrade to a limited-format reference (named logo or single quote) and remove from the case study pipeline. A weak case study is worse than no case study.

---

### Step 5: Run case-study-producer

**Who:** agent (automated, triggered by PMM after story quality gate)

case-study-producer receives:
- interview-synthesizer output
- Deal data (company profile, use case, outcomes confirmed)
- Any existing quotes or stats from the customer

Agent produces:
- Full case study draft in template format
- Social proof variant (1 sentence for ads/battlecards)
- Approval package (approval request note to send to customer)

PMM reviews the draft. Edits for brand voice, accuracy, and narrative flow. This is a draft, not a final — PMM polish before customer review is expected.

---

### Step 6: Customer approval

**Who:** PMM sends approval request; customer responds; PMM tracks

Send the customer the case study draft with the approval request note from the case-study-producer output. Be specific about what you're asking them to approve and what you'll do with it.

**Approval tracking:**
- Send with a 2-week response deadline
- If no response after 2 weeks, send one follow-up
- If no response after the follow-up, move to inactive pipeline; do not use any part of the draft

**What requires approval:**
- Every element of the published case study (all sections, all quotes)
- The social proof variant (it is a separate use case and may need separate approval if the customer is particular about how they're quoted)
- Any logo usage

**If the customer requests changes:** make the changes. Do not negotiate against the customer's comfort. A case study they're proud of will be used more actively — they'll share it, reference it, and extend its reach.

**[GATE] Approval received → publication cleared.** No element of the case study or social proof variant is used externally before written approval is in hand.

---

### Step 7: Publication and distribution

**Who:** PMM

Once approval is received:

1. Publish the case study to the appropriate channels (website, sales enablement library, battlecard updates)
2. Add the social proof variant to the relevant battlecards and ad copy pools
3. Notify the sales team of the new reference — include the one-sentence social proof variant and which ICP or use case it supports
4. Log the case study in the signal log and update the pipeline tracker

---

## Pipeline tracker

Maintain a simple pipeline tracker with each candidate's current stage:

| Customer | ICP fit | Interview date | Synthesis status | Production status | Approval status | Published |
|----------|---------|----------------|-----------------|------------------|-----------------|---------:|
| [name] | Primary / Adjacent | [date] | Done / Pending | Done / Pending | Pending / Approved / Declined | Yes / No |

---

## Human Decision Points

| Decision | Owner | When |
|---------|-------|------|
| Monthly candidate identification and selection | PMM | Day 1-3 of each month |
| Interview request (approach the customer) | PMM or CSM | After candidate selection |
| Conduct post-sale interview | PMM | Scheduled with customer |
| Story quality gate: advance to production or downgrade/hold | PMM | After synthesis review |
| Review and edit case study draft before customer review | PMM | After case-study-producer output |
| Send approval request | PMM | After draft is PMM-approved |
| Manage approval follow-up | PMM | 2-week cadence |
| Publication decision and distribution | PMM | After written approval received |

---

## What to do when the pipeline runs dry

If the monthly review consistently produces zero candidates, the pipeline has a sourcing problem. Possible causes:

- **CS team is not flagging outcomes:** add a standing agenda item to CS-PMM syncs: "Which customers hit a milestone this month?"
- **NPS verbatims are not being reviewed:** ensure survey-analyzer output is reviewed by PMM after each NPS cycle
- **Customers are not achieving outcomes:** if there are genuinely no strong outcome stories, that is a product-market fit signal worth escalating, not a pipeline management problem
- **Approval process is too burdensome:** if customers are approving in principle but the approval process is creating friction, simplify the format or reduce what requires approval
