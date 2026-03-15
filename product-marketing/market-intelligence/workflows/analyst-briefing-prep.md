# Analyst Briefing Prep

## Purpose
Produces a complete analyst briefing package: analyst profile, 2-page briefing document, analyst-specific talking points, anticipated Q&A, and post-briefing capture template. Used for both proactive briefings and inbound analyst inquiry responses.

## Trigger
One of three conditions:
1. An analyst briefing is scheduled (proactive or inbound)
2. An L1 launch is in the T-14 window (analyst prebrief is part of the L1 playbook)
3. A new analyst has been identified via the analyst-landscape-mapper as a priority relationship to build

## Agents Involved
1. `analyst-landscape-mapper` (analyst profile and category framing)
2. `analyst-prebrief-agent` (from Launches sub-domain — reused here)

## Steps

**Step 1 — Identify the analyst (human)**

Confirm: analyst name, firm, coverage area, briefing format (30-min intro briefing / 60-min deep dive / inquiry call), date and time, NDA status (required for roadmap disclosure or customer names).

If the analyst is not yet in the analyst landscape map, update the map before proceeding.

**Step 2 — analyst-landscape-mapper runs (analyst profile)**

Input: analyst name, firm, any prior coverage or known views, company category and positioning.

Output: analyst profile covering — specific coverage area, current category framing (how do they define the market?), known biases or evaluation criteria, current relationship status, recommended positioning angle for this specific analyst.

Key question the profile must answer: does this analyst's current category frame include our positioning? If not, part of the briefing objective must be shifting their frame — which requires a more strategic approach than a standard product overview.

**Step 3 — analyst-prebrief-agent runs (briefing materials)**

Input: analyst profile (from Step 2), positioning canvas, message hierarchy, launch brief (if L1 launch context), customer evidence available, roadmap direction (under NDA if applicable).

Output:
1. **2-page briefing document** — company overview, market context (why now), product overview, customer evidence, roadmap direction (NDA section)
2. **Analyst-specific talking points** — tailored to this analyst's known coverage angle and evaluation criteria (not a generic pitch)
3. **Anticipated Q&A** — 8–12 questions this analyst is likely to ask, with recommended responses. Include adversarial questions (the questions you hope they don't ask but should be prepared for)
4. **Briefing invite copy** — short email template for scheduling/confirming

**Step 4 — [GATE] PMM + Executive Sponsor Review (30 minutes)**

PMM lead and the executive who will present in the briefing review all materials together:
- Briefing document: is the narrative accurate and compelling?
- Talking points: do they match how the executive naturally speaks? (Talking points that feel unnatural will not be used)
- Q&A: are the adversarial question responses defensible? Would you be comfortable if the response was quoted?
- NDA scope: confirm what is and isn't under NDA before the call

This is a required gate. A briefing without preparation risks giving the analyst a poor first impression that is very difficult to reverse.

**Step 5 — Pre-briefing logistics (human)**
- Confirm call logistics (calendar invite, dial-in)
- Confirm NDA if needed (analyst NDA is standard for roadmap disclosure; some firms require firm-level NDA, not individual)
- Brief the executive presenter on: the analyst's current category frame, their likely questions, and the one thing we most want them to walk away understanding

**Step 6 — Post-briefing capture (human, within 24 hours)**
Within 24 hours of the briefing, the human captures:
- What questions did the analyst ask that weren't in the Q&A prep?
- What topics generated the most interest or skepticism?
- Did the analyst's category framing shift at all during the conversation?
- What did the analyst say they're watching in the market?
- Any follow-up requests (additional data, customer references, product demo)?

**Step 7 — Update analyst landscape map**
Update the analyst's entry in the analyst landscape map with: relationship status change (e.g., "On radar" → "Briefed"), date of briefing, summary of analyst reaction, follow-up commitments.

## Output
1. **Analyst profile** — from analyst-landscape-mapper: who they are, how they frame the category, what matters to them
2. **2-page briefing document** — ready to send as a leave-behind or pre-read
3. **Analyst-specific talking points** — tailored, not generic
4. **Anticipated Q&A** — 8–12 questions with recommended responses, including adversarial questions
5. **Post-briefing capture notes** — filed in `core/competitive/analyst-relationships/[analyst-name].md`
6. **Updated analyst landscape map**

## Human Decision Points
- **[GATE] Step 4** — PMM + executive review of all materials; mandatory before the briefing
- **NDA scope decision** — what is disclosed under NDA must be decided before the call, not during
- **Post-briefing follow-up** — analyst requests (customer references, data) require human judgment before committing
- **Relationship investment decision** — after the briefing, the analyst landscape map is updated with a recommendation: continue relationship / increase investment / no follow-up warranted

## Notes
- Analyst briefings are investments, not transactions. One briefing rarely produces coverage. The goal of early briefings is to get on the analyst's radar so when they're writing their next report, they call you.
- Adversarial question prep is not pessimism — analysts are paid to be skeptical. If you haven't prepared for the hardest questions, you will stumble on them.
- Post-briefing capture within 24 hours is important. Analyst conversations contain competitive intelligence (who else is briefing them, what they're hearing in the market) that decays quickly if not captured.
