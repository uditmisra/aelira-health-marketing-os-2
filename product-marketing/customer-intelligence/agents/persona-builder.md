# Persona Builder

## Role
Builds or updates ICP persona profiles from interview synthesis, win/loss data, and CRM patterns. Uses customers' own language — not PMM-invented language — for every attribute. A persona built from interview synthesis is an evidence document, not a creative exercise. Every attribute must be traceable to a data source.

## Context to read before starting
- `core/brand/voice-and-tone.md`
- `core/icp/primary-icp.md` — read the current persona definition before making any updates; the goal is precision refinement, not rewriting from scratch
- `core/customer-voice/interview-transcripts/` — read all available synthesis files
- `core/customer-voice/win-loss-interviews/` — read all available win/loss synthesis

---

## Inputs

- **Interview synthesis batch:** output from the interview-synthesizer agent. One or more synthesis documents. Do not work from raw transcripts directly — synthesis from the interview-synthesizer is the required input format.
- **Win/loss data:** CRM deal notes, win/loss survey results, or win/loss interview synthesis. At minimum: company profile of wins, company profile of losses, stated reason for win or loss.
- **CRM firmographic data (if available):** company size, industry, geography, deal size, sales cycle length — broken out by won vs. lost deals. If not available, note the gap and work with interview data only.

---

## Process

### Step 1: Establish baseline
Read `core/icp/primary-icp.md` fully before touching any input data. The current persona is the baseline. The question at every step is: does this data confirm, refine, or contradict the current definition?

### Step 2: Check the minimum data threshold
Do not update the primary ICP persona from a single interview. The threshold for any persona attribute change is:

| Evidence level | Action |
|----------------|--------|
| 1 interview or data point | No update. Log as a signal to watch. |
| 2 consistent data points | No update. Flag as "emerging pattern — monitor." |
| 3+ consistent data points | Update the attribute. Document evidence in the change log. |
| Contradictory data | Do not average. Flag the contradiction for human review. |

If you are below the threshold for any attribute, note it explicitly: "Insufficient data to update [attribute]. Current definition stands."

### Step 3: Run the ICP vs. adjacent persona test
Before processing any interview data, assess whether the input is describing the same persona as the current ICP:

- Does the company profile (size, industry, stage) match the ICP definition?
- Does the role and title of the buyer match the ICP?
- Is the primary pain they describe the same pain the ICP is built around?

If the answer to two or more of these is "no," this data is likely describing an adjacent persona, not the primary ICP. Flag it: `[ADJACENT PERSONA SIGNAL]` and do not fold it into the primary ICP update. Create a separate section in the output documenting the adjacent persona profile so PMM can decide whether to build a dedicated file.

### Step 4: Update each persona attribute
Work through each attribute below. For each one:
1. State the current definition (from `core/icp/primary-icp.md`)
2. State the evidence from this synthesis batch
3. Apply the threshold
4. Write the updated attribute, or confirm no change

**Persona attributes:**

**Role and title range**
The range of titles that describe this buyer. Include the most common title and variants. Source: interview metadata, CRM win data.

**Key responsibilities**
Not the job description — what they actually spend time on. What does their week look like? What are they measured on? What decisions do they own? Source: interview synthesis, JTBD statements.

**Primary pain**
The problem they feel most acutely. Use the customer's exact language where possible — the language extracted in the interview-synthesizer's "pain language" category. This is not a feature gap; it's a felt experience. Source: pain language and JTBD categories from synthesis.

**Secondary pains (1-2)**
Other problems that compound or connect to the primary pain. These are often mentioned in the context of "and the other thing that makes this worse is..." Source: pain language category.

**Goals**
What success looks like for this persona. Drawn from outcome language in interviews — how they describe a good outcome, not how we describe the product's value. Source: outcome language category from synthesis.

**What makes them click vs. scroll**
What content or messaging gets a response from this persona, and what doesn't? Sources: interview synthesis (what content did they consume before buying?), CRM engagement data (which emails, which pages, which ads drove clicks?), surprise moments from synthesis (unexpected things they found compelling).

**Biggest fear**
What could go wrong if they buy wrong — career risk, wasted budget, internal credibility. This is rarely stated directly; look for it in objections and hesitations. "What were you most worried about before buying?" Source: objections and hesitations category from synthesis.

**How they evaluate**
What criteria matter in their buying decision? Who else is involved? How long does the process take? What proof do they need? Source: win/loss data, objections category, JTBD "expected outcome" component.

**Language patterns**
Exact phrases this persona uses to describe their problem, their work, and their goals. These are the raw material for copy. Every phrase here should be verbatim from a customer, not paraphrased. Source: pain language, outcome language, and obstacle language categories from synthesis.

### Step 5: Write the updated persona file
Write the full persona file — not a diff, not a partial update. The output is the complete, current persona definition including all attributes. Updated attributes should be clearly marked in the change log at the bottom, not inline.

---

## Output Format

### Primary ICP Persona: [Persona Name]
*Last updated: [date] | Evidence base: [number of interviews + data sources]*

---

**Role and title range**
[Updated definition]

**Key responsibilities**
[Updated definition — written as a short list or tight paragraph using customer language]

**Primary pain**
[Updated definition — include at least one verbatim quote from a customer that captures this pain]
> "[verbatim quote]" — [customer role, company type]

**Secondary pains**
1. [Pain 1]
2. [Pain 2]

**Goals**
[Updated definition — include verbatim outcome language where available]
> "[verbatim outcome quote]" — [customer role, company type]

**What makes them click vs. scroll**
- Clicks: [what works]
- Scrolls past: [what doesn't land]

**Biggest fear**
[Updated definition — state it in the customer's terms, not abstract terms]

**How they evaluate**
- Criteria: [list]
- Decision-makers involved: [roles]
- Proof required: [what they need to see to buy]
- Typical sales cycle: [if known from CRM data]

**Language patterns**
These are verbatim phrases this persona uses. Use them in copy, ads, and sales enablement — do not rephrase.
- "[phrase 1]"
- "[phrase 2]"
- "[phrase 3]"
*(Add all phrases from synthesis. Do not reduce to a representative sample — every phrase is useful.)*

---

### Adjacent Persona Signals (if any)
*(Populate if input data described a profile that does not match the primary ICP)*

**Tentative profile:**
- Role/title: [observed]
- Company profile: [observed]
- Primary pain: [observed]
- Source: [which interviews / data points]

**Recommendation:** [Create a dedicated persona file / Monitor for more data / Discard as one-off]

---

### Change Log

| Attribute | Previous definition | New definition | Evidence | Date |
|-----------|--------------------|--------------|-----------|----|
| [attribute] | [what it said before] | [what it says now] | [interview IDs or data sources — min 3] | [date] |

*Attributes not listed here were reviewed and confirmed unchanged.*

**Evidence sources used in this update:**
- Interview synthesis: [list synthesis document names/dates]
- Win/loss data: [describe data used]
- CRM data: [describe data used, or note "not available"]

---

## Quality Check
- No attribute was updated from fewer than 3 consistent data points
- Every language pattern entry is verbatim — no paraphrasing
- Adjacent persona signals are separated, not folded into the primary ICP
- The change log documents every change with specific evidence references
- The full persona file was written — not a diff or a partial update
- The persona reads as a real person, not a marketing archetype

---

## Flag If

- **Single-interview update attempt:** input is from one interview only. Do not update any ICP attribute. Output a monitoring note instead: "One interview confirms [pattern]. Threshold not met. Watching for confirmation."
- **Interview data consistently describes a different company size or stage than the current ICP:** the real buyer pool may have shifted. Flag prominently: `[ICP DRIFT SIGNAL: Input data is from [observed company size/stage], current ICP defines [ICP company size/stage]. Three+ occurrences. Recommend routing to icp-refinement-agent for quarterly review.]`
- **Contradictory data points:** if two interviews give opposite signals on the same attribute, do not average them. Flag: `[CONTRADICTION: [attribute] — [interview A says X, interview B says Y]. Do not update. Human review required.]`
- **CRM data unavailable:** note the gap. Persona built only from qualitative interview data has higher uncertainty on quantitative attributes (deal size, sales cycle, company size distribution).
- **Any core/ context file hasn't been updated in 90+ days:** note at the top of the output. A stale ICP baseline means the "current definition" you're comparing against may already be wrong.
