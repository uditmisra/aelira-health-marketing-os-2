# /experiment-log

## What it does
Documents a completed marketing experiment, extracts the finding, and routes it to the right place in the system so the learning is retained and actionable.

## Workflow it runs
`growth-marketing/workflows/experiment-cycle.md` (closing phase only)

## Required inputs
When this command is run, ask the user for the following:
1. **Experiment name/ID:** (e.g., "Q1-2026-LinkedIn-LGF-vs-Website-Click")
2. **Hypothesis:** what were you testing? (the original hypothesis statement)
3. **What changed:** the single variable that was tested
4. **Results:** what happened — include: primary metric and change (e.g., "CPL: $280 LGF vs. $340 website click, -18%"), sample size on each variant, time period
5. **Conclusion:** did the hypothesis hold? (Confirmed / Denied / Inconclusive)
6. **Applied:** was the winning variant applied to live campaigns? (Yes / No / Partial)

## What Claude does when this command runs

**Step 1 — Validate the inputs**
Check that the conclusion is consistent with the results. A 5% difference with low sample size should be "Inconclusive," not "Confirmed." Flag if the conclusion appears to overstate what the data supports.

**Step 2 — Classify the signal type**
| Signal type | Definition |
|---|---|
| Messaging | A message frame, headline, or claim performed differently than expected |
| Creative | A visual format, creative concept, or copy structure performed differently |
| Audience | A targeting segment performed differently than expected |
| Offer | A specific offer or CTA performed differently |
| Channel | A platform or channel performed differently than expected |

**Step 3 — Generate signal log entry**

Formats the experiment as a structured entry for `core/system-intelligence/signal-log/`:

File name: `[YYYY-MM-DD]-experiment-[signal-type]-[brief-name].md`

Contents:
```
Experiment: [name/ID]
Date: [date range]
Hypothesis: [full hypothesis text]
Variant tested: [what changed — single variable]
Result: [Confirmed / Denied / Inconclusive]
Primary metric change: [+/-X% vs. control, sample size, confidence]
Interpretation: [one paragraph — what this tells us about ICP, channel, or message]
Applied: [Yes / No / Partial — and if partial, what was applied]
Next experiment: [what this result suggests testing next]
```

**Step 4 — Route the finding**

Based on signal type and conclusion:

| Signal type | If Confirmed | If Denied | If Inconclusive |
|---|---|---|---|
| Messaging | Queue for `message-testing-analyst` review; update `core/ad-library/top-performers/` if it's a new top performer | Note which frame/claim does NOT resonate; flag for `message-hierarchy-builder` | Log sample size issue; note minimum volume needed to retest |
| Creative | Update `core/ad-library/top-performers/_index.md` with new winner | Archive the losing creative concept | Log as underpowered; recommend retest at higher volume |
| Audience | Flag for `icp-refinement-agent` input if it reveals unexpected ICP signal | Note which audience does NOT perform; update targeting guidance | Log sample size issue |
| Offer | Update campaign briefs to reflect winning offer | Note non-performing offer; remove from rotation | Log as underpowered |
| Channel | Update `distribution-optimizer` input with new channel performance data | Flag channel for budget reduction review | Log as underpowered; recommend minimum budget to retest |

**Step 5 — Suggest next experiment**
Based on what was learned, suggest one specific follow-on experiment. A Confirmed result often suggests: "now test X variation of the winner." A Denied result often suggests: "if this didn't work, what does the ICP actually respond to?" An Inconclusive result often suggests: "retest at [X] volume."

## Output format

**Experiment Log Entry — [Name/ID]**

[Formatted signal log entry — ready to save to `core/system-intelligence/signal-log/[filename].md`]

---

**Routing actions:**
- Signal log: [filename to create]
- [downstream system]: [specific action]
- [downstream system]: [specific action]

---

**Suggested next experiment:**
[Specific hypothesis for the follow-on test, in the required hypothesis format]

## Notes
- Every experiment gets logged regardless of outcome. Denied and Inconclusive results are as valuable as Confirmed — they prevent the team from re-running the same test.
- The next experiment suggestion is not a commitment — it's a prompt. The growth team decides whether to run it.
- If you ran an experiment without a formal hypothesis (it just happened), log it anyway — capture what you can — but note that the results should be treated as directional only.
