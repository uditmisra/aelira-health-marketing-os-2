# Audience Variant Generator

## Role
Takes the master positioning and message hierarchy and generates audience-specific variants for each key persona. Same product, same positioning foundation — but different emphasis, different language, different proof, and different entry point for each persona. Output is a set of persona-specific messaging variants that sales, demand gen, and content can execute against.

## Framework embedded
**April Dunford's positioning application to personas** — the positioning canvas is universal, but the message emphasis shifts by audience. The economic buyer needs to hear the business case first. The technical evaluator needs the mechanism first. The end user needs the daily-life improvement first.

**Key principle:** These are NOT different positioning strategies — they are the same positioning expressed through different lenses. If variants start to contradict each other or make different fundamental claims, something is wrong with the master positioning.

## Context to read before starting
- Completed, approved positioning canvas (required)
- `core/brand/messaging-pillars.md` (approved message hierarchy — required)
- `core/icp/primary-icp.md`
- `core/icp/personas/` (individual persona files if populated)
- `core/customer-voice/win-loss-interviews/` (persona-specific objections surface here)
- `core/customer-voice/jaw-dropping-moments.md` (which moments resonate with which persona)

## Inputs
- Approved positioning canvas
- Approved message hierarchy
- List of personas to generate variants for (defaults to the four standard personas below — adjust based on the actual buying process)
- Any existing persona-specific messaging (to identify what is worth keeping)

## Standard personas (adjust per client's actual buying process)

**1. Economic buyer** (CFO, CEO, VP Finance, or whoever controls budget and final approval)
- Controls: budget and final yes/no
- Cares about: business outcome, risk, ROI, strategic fit, total cost of ownership
- Fears: wrong investment, business disruption, hidden costs, looking bad to the board

**2. Technical evaluator / champion** (CTO, VP Engineering, IT Director, Security team)
- Controls: build vs. buy recommendation, technical feasibility, security/compliance sign-off
- Cares about: integration complexity, data security, reliability, implementation burden, future technical debt
- Fears: creating integration nightmares, owning a security vulnerability, backing the wrong technical bet

**3. Business buyer / champion** (VP Marketing, VP Sales, VP Operations — whoever owns the problem being solved)
- Controls: internal recommendation, business case, urgency narrative
- Cares about: solving the specific problem, making their team more effective, looking good to leadership
- Fears: buying something that does not actually solve the problem, low adoption, implementation taking too long

**4. End user** (the person using the product daily)
- Controls: adoption (directly), renewal signals (indirectly), internal advocacy
- Cares about: whether it makes daily work easier, learning curve, whether it replaces something hated
- Fears: more tools to learn, work getting harder before it gets easier, losing a workflow they already know

## Process

For each persona, work through the following six steps:

### Step 1: Identify the primary entry point
What is the first thing this persona needs to believe to be open to a conversation? This is not the primary claim — it is the angle from which that claim becomes relevant to them.

Example using the master claim "Cut revenue recognition errors by 80%":
- Economic buyer entry point: the cost of errors to the business (business case angle)
- Technical evaluator entry point: why existing tools cannot prevent errors at the source (mechanism angle)
- Business buyer entry point: the daily pain of managing errors manually (problem angle)
- End user entry point: not having to be the one who catches and fixes errors (relief angle)

### Step 2: Identify which pillar leads for this persona
From the three pillars in the message hierarchy, which one is most directly relevant to this persona's goals and fears? Lead with that one. The others are supporting context, not the opener.

### Step 3: Select the right proof points
From the full proof point library in the message hierarchy, which evidence is most credible to this persona?
- Economic buyer: business outcome data, ROI, payback period, case studies with financial metrics
- Technical evaluator: mechanism explanation, integration architecture, security certifications, reliability data
- Business buyer: operational improvements, adoption rates, time-to-value, peer company case studies
- End user: before/after of daily work, specific friction removed, time saved, "up and running in X minutes"

### Step 4: Anticipate the primary objection for this persona
Each persona has a predictable first objection. Source from win/loss data where possible.

Common patterns by persona:
- Economic buyer: "We already have something that does this" / "The ROI isn't proven enough for this investment"
- Technical evaluator: "We can build this internally" / "The integration with [system] will be a nightmare"
- Business buyer: "We've tried tools like this before and adoption was low" / "I don't have the headcount to manage another vendor"
- End user: "This is going to make my job harder before it gets easier" / "I don't have time to learn a new system"

Write a specific response for each. Do not write generic reassurances.

### Step 5: Write the one-sentence message for this persona
One sentence that combines their entry point, the relevant pillar, and their primary value. Plain language. No buzzwords. Something they could repeat to a colleague in a hallway.

Test: if this persona told a colleague about the product in one sentence, would they say this? If not, it is still written for the marketing team, not for the persona.

### Step 6: Write the word-of-mouth message
How does this persona describe the product to someone else in their network who also has the problem?

This is usually more casual, more specific, and more about relief than features: "I found this thing that actually catches reconciliation errors before they hit the system — we went from 40 hours of manual fixes per month to basically nothing."

## Output format

For each persona:

```
## [Persona: Title / Role]

**Entry point:** [The angle that makes them open to a conversation — one sentence]

**Lead pillar:** [Which of the three pillars leads, and one sentence on why it is the right lead for this persona]

**Primary value for them:** [The value from the canvas reframed in their language and career context]

**Proof points to lead with:**
1. [Most credible evidence for this persona]
2. [Second most credible evidence]

**Primary objection:** [Their most likely first challenge]
**Response:** [Specific, evidence-backed response — cite source if from win/loss data]

**One-sentence message:** [Something they could repeat to a colleague]

**Word-of-mouth message:**
"[Casual, specific, first-person — what they'd actually say]"

---
```

After all four personas, produce a consistency check:

```
## Cross-persona consistency check

All variants derive from the same positioning canvas: [ Yes / Issues: ]
No variant contradicts another's fundamental claims: [ Yes / Issues: ]
Word-of-mouth messages are complementary (hearing multiple variants won't confuse a buyer): [ Yes / Issues: ]
Each persona's message is genuinely different from the others (not four versions of the same message): [ Yes / Issues: ]
```

## Quality check
- Each variant leads with a different angle (same product, different entry point) — if they all lead the same way, the variants are not doing their job
- One-sentence messages use the persona's language, not marketing language
- Proof points are credible to that specific persona — financial data for the economic buyer, mechanism for the technical evaluator, not swapped
- Word-of-mouth messages sound like something a real person would say, not a press release
- No variant makes a claim not supported by the master positioning canvas

## Flag if
- Persona definitions in `core/icp/primary-icp.md` are thin — the variants will be generic. Request populated persona files before proceeding, or note specifically what is missing.
- Two personas have essentially the same role in the buying process — ask whether they need separate variants or whether one covers both
- The buying process has a highly technical evaluation step not covered by the standard four personas — add the relevant technical persona before proceeding
- The word-of-mouth messages for different personas are identical or near-identical — this means the master positioning is not differentiated enough to have multiple angles
