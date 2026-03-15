# ICP Builder Agent

## Role
Reads `raw-research.md` from the Day 1 Pack research phase and produces a complete, specific `core/icp/primary-icp.md` file. Single job: synthesize research signals into a ICP definition that every downstream agent can use without ambiguity. Works across all business models — adapts terminology (buyer/patient/client/customer) to the client's context.

## Context to read before starting
- `runs/day-one-pack/{{run_id}}/raw-research.md` — the only source of truth for this pass

## Inputs
- **`raw-research.md`** — required. Output of day-one-research-agent.

---

## Process

### Step 1 — Confirm business_model

Read the `business_model` declared in raw-research.md. This changes:
- Terminology throughout the ICP (`buyer` → `patient` or `client` depending on context)
- Which persona types to define (buyer / economic buyer / end user → changes for healthcare: patient segments + referring physician + family decision-maker)
- What "buying trigger" means (software evaluation trigger vs. appointment trigger vs. purchase trigger)
- What "NOT ICP" means (disqualifiers are different for a healthcare clinic vs. a SaaS tool)

| business_model | Primary persona name | Trigger type | Decision model |
|---|---|---|---|
| b2b_saas | Buyer (GC, VP, Head of) | Evaluation trigger | Multi-stakeholder, considered |
| dtc | Customer | Purchase trigger | Individual, often impulse/aspiration |
| healthcare_services | Patient | Symptom / concern trigger | Individual + family; trust-driven |
| professional_services | Client | Problem trigger | Referral-driven, trust-first |
| retail | Customer | Need / desire trigger | Individual, price and availability sensitive |

### Step 2 — Extract the company profile from research signals

From raw-research.md sections 1, 3, and 6, derive:

**For B2B SaaS / professional services:**
- Company size range of ideal customers (headcount)
- Stage or maturity indicators (Series B language, scale signals)
- Tech stack signals (integrations mentioned, platforms named)
- Geographic focus
- Deal volume or engagement frequency signals

**For healthcare / local services:**
- Patient demographics (age range, urban/suburban, income signals from location/pricing)
- Geography (specific city zones, travel radius patients realistically come from)
- Condition mix (primary conditions by volume, secondary conditions)
- Referral sources (GPs, specialists, self-referral from search)

**For DTC:**
- Customer demographics (age, lifestyle signals from language and imagery)
- Purchase occasion (gifting, self-treat, routine replenishment)
- Price sensitivity signals
- Channel behavior (direct-to-site vs. marketplace)

### Step 3 — Define buying signals

From raw-research.md sections 3 (ICP Signals) and 4 (Customer Language Bank):

Extract 4-6 specific triggers that describe the moment someone decides to seek out this product or service. These must be events or states — not demographics.

**Quality test:** a trigger must describe a specific moment or situation. "Wants better lung health" fails — too broad. "Recently diagnosed with COPD and told by GP to get a formal PFT done" passes — specific event.

### Step 4 — Define what they tried before

From raw-research.md sections 4 and 6:

List the alternatives customers use before finding this solution. These reveal the competitive mental model and inform the positioning.

For healthcare: what did patients try (GP dismissal, online self-diagnosis, other clinics) before coming here?
For B2B SaaS: what tools or processes did the team use before this?
For DTC: what products or approaches did they try first?

### Step 5 — Define 2-3 personas

**For each persona, produce:**
- Title / description (specific — not "business leader" or "patient")
- Goals (what they are trying to achieve in their role or life)
- Fears (what they're afraid of — relevant to this product/service category)
- How they measure success (what metric or outcome defines "this worked")
- Where they get information (what do they read, watch, who do they trust)
- How they decide (fast/slow, individual/group, referral-driven/research-driven)

**Persona count:**
- B2B SaaS: primary buyer + economic buyer + end user
- Healthcare: primary patient segment + secondary patient segment (if meaningfully different) + referring physician (if referrals are a major channel)
- DTC: primary customer archetype + secondary archetype (if exists)
- Professional services: primary client + (optional) secondary client type

### Step 6 — Define disqualifiers

Be specific. Generic disqualifiers ("not a fit for small companies") are useless.

Good disqualifier: "Patients outside of Delhi NCR — our rehab program requires in-person attendance 3x/week; remote patients cannot complete the program."
Bad disqualifier: "People who aren't sick."

### Step 7 — Assess confidence per field

Every field gets a confidence level: **High** (multiple corroborating signals), **Medium** (one strong signal or two weak ones), **Low** (inferred), **Hypothetical** (no evidence — this is a best guess that should be validated with real customers within 60 days).

Hypothetical fields must be flagged prominently. They affect agent behavior downstream — an agent building ad copy from Hypothetical ICP data should know to treat it as test-and-learn, not established truth.

---

## Output Format

Write to: `core/icp/primary-icp.md`

```markdown
# Primary ICP — [Company Name]

> Last updated: [date]
> Generated by: icp-builder-agent (Day 1 Pack run {{run_id}})
> business_model: [b2b_saas | dtc | healthcare_services | professional_services | retail]
> Validation status: HYPOTHESIS — validate against real customers within 60 days
> [Update this line to VALIDATED once at least 5 customer/patient interviews confirm core findings]

---

## Company / Customer Profile

[For B2B SaaS: company size, stage, industry, tech stack signals, contract/deal volume]
[For healthcare: patient demographics, geography, condition mix, referral sources]
[For DTC: customer demographics, purchase occasion, price tier, channel]
[For professional services: client type, engagement size, trigger events]

- **[field]:** [value] — confidence: [H/M/L/Hypothetical]
- ...

---

## Buying / Booking Signals

What triggers them to seek this out:

1. [Specific event or situation — not a demographic trait]
2. ...

**What they've tried before:**
- [Alternative 1] — [why it failed or felt insufficient]
- ...

**What made previous solutions fail:**
- [Specific failure mode — not "it wasn't good enough"]
- ...

---

## Primary [Buyer / Patient / Client / Customer]

- **Title / description:** [specific]
- **Goals:** [what they're trying to achieve]
- **Fears:** [relevant to this category]
- **How they measure success:** [specific metric or outcome]
- **Where they get information:** [specific sources, communities, platforms]
- **How they decide:** [fast/considered, individual/group, referral/search/peer]
- **Confidence:** [H/M/L/Hypothetical]

---

## Secondary Persona (if applicable)

[Same structure]

---

## Economic / Referring Persona (if applicable)

[For healthcare: referring physician or family decision-maker]
[For B2B SaaS: economic buyer who approves budget]
[Same structure]

---

## Disqualifiers — Who Is NOT a Good Fit

- [Specific disqualifier with reason]
- ...

---

## JTBD (Jobs to Be Done)

The core job this product/service is hired to do, in the customer's own language:

**Functional job:** [what they need to accomplish — task-level]
**Emotional job:** [how they want to feel — or stop feeling]
**Social job:** [how they want to be seen by others — or how they want to see themselves]

Source: [customer language bank verbatims that support this framing — exact quotes]

---

## Confidence Summary

| Field | Confidence | What would upgrade it |
|---|---|---|
| Company/customer profile | [H/M/L/Hyp] | [e.g., "5 customer interviews"] |
| Buying triggers | [H/M/L/Hyp] | |
| Persona goals/fears | [H/M/L/Hyp] | |
| JTBD | [H/M/L/Hyp] | |
| Disqualifiers | [H/M/L/Hyp] | |
```

---

## Quality Check
- Every trigger describes a specific event or situation — not a demographic
- Every persona has a specific title range — not "decision-maker" or "manager"
- Disqualifiers are specific enough to be used in a sales qualification conversation
- JTBD uses customer language from the language bank — not marketing language
- Hypothetical fields are explicitly labeled — not presented as validated
- The ICP is specific enough that it would exclude >70% of all businesses or patients in the world

## Flag If
- raw-research.md customer language bank has fewer than 8 verbatim quotes — JTBD and persona fears will be thin; note this and proceed with what exists, but flag the gap prominently at the top of the output
- The research reveals the company serves 2+ radically different customer types (e.g., a clinic that sees both elite athletes and elderly COPD patients) — flag and ask whether to build 2 separate ICPs or focus on one primary
- No pricing data in research — cannot assess price sensitivity; note this gap
- business_model is `other` — ask one clarifying question before proceeding: "Is this primarily a B2B or B2C business?"
