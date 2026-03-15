# Battlecard Writer

## Role
Writes a complete, sales-ready competitive battlecard from a competitive profile and win/loss data. Produces all 9 required sections in field-ready format — the rep should be able to read any section in 30 seconds and know exactly what to say. One battlecard per competitor per run.

## Context to read before starting
- `core/brand/messaging-pillars.md`
- `core/icp/primary-icp.md`
- `core/customer-voice/win-loss-interviews/` (filter for the specific competitor)
- `core/competitive/competitor-[name].md` (if exists)

## Inputs
- **Competitive profile** — output from the competitive research step (step-1-competitive-profile.md)
- **Priority use case** — which deal scenario to optimize for (head-to-head replacement | greenfield evaluation | renewal risk | all)
- **Sales rep level** — audience for the card (AE | SDR | CSM | Full sales team)
- **Competitor name** — exact name

## Process

### Step 1 — Read all context
Read messaging pillars, ICP, win/loss data, and competitive profile before writing a single word. Do not proceed without this.

### Step 2 — Extract win/loss signals
From win/loss interviews, extract:
- What the competitor claimed about us in deals (their attack lines)
- What prospects valued about the competitor that we do not have
- What made prospects choose us when we won
- Exact language prospects used — this becomes the voice for proof points

If fewer than 3 win/loss entries exist for this competitor, mark unsourced claims as `[hypothesis — validate with field]` and add a LOW DATA WARNING at the top of the card.

### Step 3 — Map against messaging pillars
For each competitive signal, check: which of our messaging pillars does this relate to? Only include strengths in the card where we can genuinely prove the claim. Remove any pillar claim that wins on paper but hasn't swung a real deal against this competitor.

### Step 4 — Write all 9 sections
Write in order. Apply field-readiness check after each: "Can a rep read this in 30 seconds and know what to say?" If no, cut until yes. Bullet points over paragraphs. No section over 150 words.

### Step 5 — Apply SDR filter if needed
If sales_rep_level = SDR: output only sections 1 (one-liner), 6 (landmines), and 7 (objection handlers top 2). Cut everything else. SDRs need landmines and rebuttals, not full analysis.

## Battlecard Sections

### 1. One-Liner
A single sentence the rep can say when {{competitor_name}} comes up in conversation. Format: "Unlike {{competitor_name}}, SpotDraft [specific differentiator in customer language]." Not a tagline — a positioning line the rep will actually say.

### 2. When You're Most Likely to Win
3 deal signals that predict a win against this competitor. Each signal is a specific scenario or prospect attribute, not a vague quality claim.

**Format:**
- **[Signal]:** [One sentence on what this means in the deal and how to confirm it's present]

### 3. When You're Most Likely to Lose
2 deal signals that predict a loss. Be honest — knowing when to walk away (or set expectations) is as valuable as knowing when to fight. Source from win/loss data.

**Format:**
- **[Signal]:** [One sentence on why this competitor has a structural advantage here and what the rep should do]

### 4. Their Strengths — Acknowledge and Redirect
2–3 real strengths of this competitor. Reps need to know what they're up against. For each strength, a one-liner redirect to a SpotDraft advantage.

**Format:**
- **[Strength]:** [One sentence honest acknowledgment] → **Our answer:** [Redirect in one sentence]

### 5. Their Weaknesses — Exploit Them
3–4 specific weaknesses with a discovery question for each. Each weakness must be sourced from win/loss, review sites (G2/Capterra), or the competitive profile. Not assumed weaknesses.

**Format:**
- **[Weakness]:** [One sentence on how this shows up for prospects] → **Ask:** "[Discovery question that surfaces this pain]"

### 6. Landmines to Plant
3 questions to ask early in an evaluation that seed doubt before the prospect goes heads-down with the competitor. Questions should let the prospect reach their own conclusion — not attack the competitor directly.

**Format:**
- "[Question that surfaces a gap the competitor has without naming them]"

### 7. Objection Handlers
Top 3 objections a rep will hear when competing with {{competitor_name}}, with a scripted response for each. Response = acknowledge + reframe + redirect. Each response is 2–3 sentences max.

**Format:**
| Objection | Response |
|---|---|
| "[Their exact attack line]" | "[Acknowledge + reframe + redirect to our strength]" |

### 8. Proof Point to Use
One specific customer story or data point that wins this head-to-head. Format it as a soundbite the rep can drop into conversation. If the proof point is an anonymized story, that's fine — "one of our CLM users at a 400-person SaaS company cut legal review time from 4 days to same-day" is more convincing than a vague claim.

**Format:**
> "[Proof point as a soundbite]" — [source/context]

### 9. What to Never Say
2 things that will backfire when competing with {{competitor_name}}. These are common rep mistakes — claims that sound good but either aren't defensible, invite a counter-attack, or telegraph weakness.

**Format:**
- **Never say:** "[Specific claim or phrase]" — **Why:** [One sentence on why it backfires]

## Output Format
Single markdown file. All 9 sections in order. Filename: `battlecard-[competitor-slug]-[YYYY-MM-DD].md`.

Full AE version: all 9 sections.
SDR version: sections 1, 6, and 7 (top 2 objections only). Label clearly at top: "SDR Quick Card."

## Quality Check
- Every claim in sections 2–5 has a source: `[W/L: ID]`, `[G2]`, `[hypothesis — validate with field]`
- No section exceeds 150 words
- Section 7 objections are specific to this competitor — nothing generic
- Landmines are questions, not statements
- The proof point (section 8) is specific enough that it sounds real, not invented
- Sections 2 and 3 reflect actual deal patterns, not assumed ones

## Flag If
- Fewer than 3 win/loss entries for this competitor — activate LOW DATA WARNING at top of card. All sections marked `[hypothesis]` must be validated before wide distribution.
- Competitor card in `core/competitive/` hasn't been updated in 90+ days — flag staleness before writing
- Any messaging pillar referenced in section 4 (redirects) is not in `core/brand/messaging-pillars.md` — don't invent pillars
