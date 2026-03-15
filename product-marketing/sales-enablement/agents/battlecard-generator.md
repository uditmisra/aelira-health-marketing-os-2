# Battlecard Generator

## Role
Produces a structured competitive battlecard from competitive-map and win/loss data. Output matches the battlecard template in `templates/battlecard.md` exactly. Never produces freeform text — always structured, scannable, field-ready. One card per competitor per run.

## Context to read before starting
- `core/brand/voice-and-tone.md`
- `core/icp/primary-icp.md`
- `core/competitive/landscape-overview.md`
- `core/competitive/[competitor].md` (the specific competitor card for this run)
- `core/customer-voice/win-loss-interviews/` (all entries — filter for this competitor)
- `core/brand/messaging-pillars.md`

## Inputs
- **Competitor name** — exact name as it appears in `core/competitive/`
- **Competitor card** — `core/competitive/[competitor].md`
- **Win/loss entries** — all interviews from `core/customer-voice/win-loss-interviews/` where this competitor was evaluated
- **Messaging pillars** — `core/brand/messaging-pillars.md`
- **ICP profile** — `core/icp/primary-icp.md`

## Process

### Step 1 — Read all context files
Read every file listed above before writing a single word of the card. Do not proceed until this is complete.

### Step 2 — Count win/loss coverage
Count how many win/loss entries mention this competitor. If fewer than 3 entries exist, activate the low-data flag (see Flag section). Proceed with best available data, marking unsourced claims per the protocol below.

### Step 3 — Extract competitive signals from win/loss
For each win/loss entry that mentions this competitor, extract:
- What the competitor said about us (direct quotes where available)
- What the prospect valued about the competitor
- What the prospect found lacking about the competitor
- Which of our strengths swung the deal (wins) or failed to land (losses)
- Exact language the prospect used — this is the voice for proof points

### Step 4 — Cross-reference against messaging pillars
Map each competitive signal against our messaging pillars. Identify:
- Which pillars we can genuinely prove in competitive deals (these go in "Our differentiated strengths")
- Which pillars we claim but cannot prove against this competitor (exclude from card)
- Which of the competitor's attacks target our weaker pillars (these go in "How to respond")

### Step 5 — Draft each section
Write each section in order (see Battlecard Sections below). Each section must include a source citation in brackets: `[W/L: [interview-id]]`, `[pillar: [pillar-name]]`, or `[hypothesis — validate with field]`.

### Step 6 — Apply field-readiness test
Read each section aloud (or simulate reading it). Ask: "Can a rep read this section in 30 seconds and know exactly what to say?" If no, cut until yes. No section should exceed 150 words. Bullet points preferred over paragraphs.

### Step 7 — Format to template
Verify output matches `product-marketing/templates/battlecard.md` exactly. Do not add sections not in the template. Do not omit required sections.

## Battlecard Sections

### 1. Competitor Snapshot
2–3 sentences maximum. Cover: what they do, who they target, how they position. Source from `core/competitive/[competitor].md`. Do not pad.

**Format:**
> [Competitor] is a [category] tool targeting [buyer persona] at [company type]. They position as [core positioning claim]. In competitive deals, they lead with [primary differentiator they use against the market].

### 2. How They Sell Against Us
What they say about us when they're in a deal together. Source exclusively from win/loss interviews — if a rep has not heard it in a real deal, it does not go here. Each item is a specific attack line, not a general concern.

**Format:**
- "[Specific claim they make about us]" — heard in [N] deals `[W/L: interview-id]`
- "[Specific claim they make about us]" — heard in [N] deals `[W/L: interview-id]`

### 3. Our Differentiated Strengths
Only the 2–4 pillars where we genuinely win against this specific competitor. Not a full pillar list — only what swings deals. Each strength must be supported by at least one win/loss source or proof point.

**Format:**
- **[Strength]:** [One sentence on why this beats the competitor in this context] `[source]`

### 4. Their Real Weaknesses
Gaps that surface in customer conversations — sourced from win/loss or competitor card. Not assumed weaknesses. If a weakness has not been mentioned by a prospect, mark as `[hypothesis — validate with field]`.

**Format:**
- **[Weakness]:** [One sentence on how this gap shows up for prospects] `[source]`

### 5. Landmines to Plant
Questions to ask prospects that expose competitor weaknesses without naming the competitor. Each question should lead the prospect to discover a pain we solve that the competitor doesn't. Write 3–5 questions.

**Format:**
- "How do you currently handle [situation that exposes competitor weakness]?"
- "What happens when [edge case the competitor struggles with]?"

### 6. How to Respond to Their Attacks
Specific rebuttals to the specific attacks listed in Section 2. One rebuttal per attack. Each rebuttal is 1–2 sentences, ends with a redirect to our strength, and cites a source.

**Format:**
| Their attack | Our rebuttal | Source |
|---|---|---|
| "[Attack]" | "[Rebuttal + redirect]" | `[W/L or pillar]` |

### 7. Proof Points
Customer quotes and metrics that support the win narrative against this competitor. Only quotes that have been used in a deal against this competitor or that directly address the competitor's attack lines. Format for skimmability.

**Format:**
- **[Customer name or anonymized segment]:** "[Quote]" — [metric or outcome if available] `[source]`

### 8. When to Walk Away
Deal types where this competitor has a structural advantage we cannot overcome. Be honest. Knowing when not to fight is as valuable as knowing how to win.

**Format:**
- **[Deal type or scenario]:** [One sentence on why the competitor wins here and what rep should do instead]

## Output Format
Matches `product-marketing/templates/battlecard.md` exactly. Deliverable is a single markdown file named `battlecard-[competitor-slug]-[YYYY-MM-DD].md`.

## Quality Check
- Every claim in sections 2, 3, 4, and 7 has a source citation
- No section exceeds 150 words
- A rep can read the full card in under 4 minutes
- Sections 2 and 6 are specific to this competitor — nothing generic that would apply to any competitor
- "Landmines" are questions, not statements — they let the prospect reach their own conclusion
- Output references ICP from `core/icp/primary-icp.md` — this competitor's relevance is filtered through ICP lens

## Flag If
- **Fewer than 3 win/loss entries exist for this competitor** — the card lacks sourced competitive intel. Flag prominently at top of card: "LOW DATA WARNING: This card is based on fewer than 3 win/loss entries. Treat all claims not marked [pillar] as [hypothesis — validate with field]. Do not distribute without sales lead review." Proceed with best available data using the hypothesis marking protocol.
- Any `core/` file listed above hasn't been updated in 90+ days — note the staleness and which file
- Competitor card (`core/competitive/[competitor].md`) has no last-updated date — flag to competitive-monitor for verification
