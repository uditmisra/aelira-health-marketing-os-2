# Ad Copy Hypothesis Log

This file is the memory system for ad creative iteration. It logs what we believe, what we've tested, and what we've learned — so every new batch builds on the last one rather than starting from scratch.

**Agents that read this file:** `creative-headline-agent`, `creative-copy-agent`
**Agents that write to this file:** `log_and_archive` step of `ad-copy-generation` workflow
**Human review:** The pattern analyst cross-references this file against signal log outcomes quarterly.

---

## How to use this file (for agents reading it)

### Confirmed findings → treat as generation constraints
If a finding is marked `confirmed`, encode it directly into your generation. Do not test it again. Do not hedge. "Problem-led frames outperform" means: generate at least 40% problem-led in this batch.

### Active hypotheses → design the batch to answer the question
If a hypothesis is marked `active`, consciously include variants that would test it. Make the test specific enough to be readable in the data: if the hypothesis is about language ("contract review" vs. "legal review"), generate variants with each phrasing in parallel rather than mixing them.

### Refuted findings → hard guardrails
If a finding is marked `refuted`, do not generate in that direction. A refuted hypothesis is not a maybe. It is evidence that this approach does not work for this ICP at this funnel stage. Budget is being burned if you repeat it.

### Inconclusive → allowed, not prioritized
Generate inconclusive approaches if they fit the brief, but do not prioritize them over active hypotheses.

---

## Confirmed findings

> These are encoded truths. Treat them as constraints, not suggestions.

*No confirmed findings yet — this system is newly initialized. Findings will be logged here after each run.*

---

## Active hypotheses

> Open questions. Design each batch to test at least one.

### H-001 — Problem-led frames outperform benefit-led for General Counsel persona
**Hypothesis:** Headlines that name a specific legal pain (contracts stuck in email, missed obligations, weeks to review) will outperform benefit-led headlines (close faster, cut review time) for the General Counsel / VP Legal ICP because GCs are risk-minimizers, not outcome-optimizers. They click when they feel understood, not when they see a promise.

**Basis:** ICP profile in `core/icp/primary-icp.md` — GC's primary motivation is "not getting surprised." Customer language in `core/customer-voice/jaw-dropping-moments.md` is predominantly pain-oriented, not outcome-oriented.

**How to test:** In the next batch, generate equal numbers of problem-led and benefit-led variants for the same platform. Tag clearly in the assembled_ad_table so A/B data can be read back.

**Status:** `active`
**Logged:** 2026-03-14
**Run IDs tested:** none yet
**Outcome:** pending

---

### H-002 — "Contract review" language converts better than "contract management" for LinkedIn
**Hypothesis:** "Contract review" is the job the GC is doing every day. "Contract management" sounds like a category of software. The former is task-language the persona uses internally; the latter is how vendors describe themselves. Using task-language in headlines and copy will reduce the cognitive distance between the ad and the reader's actual problem.

**Basis:** B2B copy principle: use the language the buyer uses, not the language the category uses. No direct test data yet.

**How to test:** Generate parallel variants with "contract review" vs. "contract management" (and "CLM" as a third variant for comparison) in otherwise identical LinkedIn copy.

**Status:** `active`
**Logged:** 2026-03-14
**Run IDs tested:** none yet
**Outcome:** pending

---

### H-003 — Specificity of onboarding time claim improves conversion
**Hypothesis:** "Live in days, not months" is a strong differentiator claim but may be too vague to be believed. Testing a specific version — "Most teams are live in under a week" or "First contracts in 2 days" — will improve CTR because specificity signals credibility.

**Basis:** Messaging pillar differentiator: "fastest time-to-value in the category." The question is whether vague ("days, not months") or specific ("under a week") performs better for conversion campaigns.

**How to test:** In the next conversion-stage batch, generate one variant with the vague claim and one with the specific claim per platform.

**Status:** `active`
**Logged:** 2026-03-14
**Run IDs tested:** none yet
**Outcome:** pending

---

### H-004 — COO / Chief of Staff persona responds to velocity framing, not risk framing
**Hypothesis:** The secondary ICP (COO / VP Operations) is an outcome-optimizer, not a risk-minimizer. They care about deals closing faster, contracts not blocking business. Benefit-led and velocity-framed copy will outperform problem-led / risk-framed copy for this persona segment.

**Basis:** ICP role profile — COOs are measured on business velocity, not legal risk avoidance. The GC persona responds to "stay in control"; the COO persona responds to "close faster."

**How to test:** Run a segmented campaign — same funnel stage, different persona targeting — with persona-matched creative. GC-targeted ads: problem-led + risk framing. COO-targeted ads: benefit-led + velocity framing. Compare CTR and conversion rate.

**Status:** `active`
**Logged:** 2026-03-14
**Run IDs tested:** none yet
**Outcome:** pending

---

## Refuted findings

> Do not generate in these directions. These have been tested and lost.

*No refuted findings yet.*

---

## Inconclusive

> Allowed but not prioritized. More data needed before encoding.

*No inconclusive findings yet.*

---

## Log format (for log_and_archive step to append)

When logging a new hypothesis after a run, append to the **Active hypotheses** section using this format:

```markdown
### H-[NNN] — [One-line description]
**Hypothesis:** [What you believe will happen, and why it matters]

**Basis:** [Where this belief comes from — ICP data, customer voice, prior signal, intuition]

**How to test:** [Exactly what variants to generate in the next batch to get a readable answer]

**Status:** `active`
**Logged:** [YYYY-MM-DD]
**Run IDs tested:** none yet
**Outcome:** pending
```

When a hypothesis has been tested (performance data logged in signal-log), move it to the appropriate section and update:

```markdown
**Status:** `confirmed` | `refuted` | `inconclusive`
**Run IDs tested:** [run-id-1], [run-id-2]
**Outcome:** [What the data showed — be specific: CTR delta, conversion rate delta, sample size]
**Confirmed finding (if confirmed):** [The rule to encode — short, imperative, no hedging]
```
