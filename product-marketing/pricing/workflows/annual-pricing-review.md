# Annual Pricing Review

## Purpose
A full annual audit of pricing and packaging: is the price right for the current market, does the packaging still match how the ICP grows, and does the pricing page accurately represent the current product? Produces concrete recommendations for the next pricing cycle. This workflow requires more stakeholders than most marketing decisions because pricing touches product, finance, sales, legal, and existing customers simultaneously.

## Trigger
Run once per year, anchored to Q4 planning (so any pricing changes take effect at the start of the next fiscal year, after sales and customer communication is complete). Can also be triggered mid-cycle if: price loss rate rises above 30% for two consecutive quarters, a major competitor makes a significant pricing move, or a packaging change has made the current page materially inaccurate.

## Agents involved
- competitive-pricing-mapper
- price-sensitivity-analyst
- packaging-designer
- pricing-page-reviewer

## Steps

**Step 1: Run competitive-pricing-mapper (annual refresh)**
Pull current pricing data for all competitors in `core/competitive/landscape-overview.md`. Do not use data from the previous run — competitive pricing changes frequently enough that year-old data produces wrong conclusions.

Deliverable: Updated competitive pricing table with date stamp, category convention summary, and opportunity notes.

Input to next steps: the updated table feeds price-sensitivity-analyst (context on market price floor/ceiling) and packaging-designer (context on category packaging conventions).

**Step 2: Run price-sensitivity-analyst on the full year's data**
Analyze win/loss data, deal notes, discount patterns, and churn-at-price signals from the past 12 months. Segment analysis by ICP if multiple segments are being sold into.

The analyst should produce: price loss rate by segment, the root cause diagnosis (price problem, value communication problem, or targeting problem), and recommended price range per segment.

Deliverable: Price sensitivity report with confidence level. If confidence is Low (fewer than 10 data points per segment), note that findings are directional and the pricing decision will carry higher uncertainty.

Input to next steps: feeds packaging-designer (context on willingness to pay by stage) and the Gate 1 finance/PMM/sales alignment meeting.

**Step 3: Run packaging-designer review**
Question: does current packaging still match ICP growth stages, or has the ICP evolved in a way that makes the current tier structure no longer natural?

The packaging-designer agent should not redesign from scratch. It should assess the current structure against:
- ICP growth stage mapping: are the tier boundaries still aligned to the transitions the ICP experiences?
- Usage data: are the features in each tier still the features customers at that stage actually value?
- Aha moment placement: is the indispensability-driving feature still in an accessible tier, or has product growth pushed it higher?
- Competitive landscape: does the current packaging still compare favorably against the updated competitive map?

Deliverable: Packaging review document with a clear recommendation: maintain current structure, adjust tier contents, or redesign tier boundaries. Include rationale for the recommendation. If redesign is recommended, a full new tier architecture document is required before Gate 1.

Input to Gate 1: all three agent outputs (competitive map, price sensitivity report, packaging review) are bundled for the stakeholder review.

---

**[GATE 1] Finance + PMM + Sales alignment: pricing strategy decision**

*Who is in this meeting:* PMM lead, finance lead (responsible for revenue modeling), sales lead (VP or Head of Sales), and optionally a CS lead if expansion pricing is under review.

*What they decide:*
- Do we change prices? If yes, by how much, in which direction, and for which segments or tiers?
- Do we restructure packaging? If yes, which tiers change, and what is the transition plan for customers currently on affected tiers?
- What is the effective date for any changes?
- What is the expected revenue impact (modeled by finance)?

*What they need to decide:* the three agent deliverables from Steps 1–3. Do not run this gate without all three reports complete.

*Human decision required.* Agents do not make the pricing strategy decision. They provide the analysis. The decision is made by humans who are accountable for the revenue, the customer relationships, and the sales team's ability to execute.

*Gate output:* a signed-off pricing decision document that specifies: new prices (if changing), new packaging (if changing), effective date, and any transition terms for existing customers. This document initiates Steps 5–8.

---

**Step 5: Run pricing-page-reviewer**
Once the pricing decision is made and the new packaging is confirmed, run the pricing-page-reviewer against the new structure.

The reviewer should assess: does the new pricing page accurately represent the new packaging? Does the page communicate the upgrade triggers clearly? Are the tier names and descriptions still correct given any packaging changes? Does the page hold up against the updated competitive pricing map?

Deliverable: Section-by-section page review with the top 5 priority changes ranked by expected conversion impact.

---

**[GATE 2] Legal and Finance sign-off on new pricing**
Before the pricing page goes live, legal reviews for any compliance implications (particularly for international pricing, regulated industries, or SaaS contract terms that reference pricing). Finance reviews the updated pricing page against the modeled revenue impact to confirm the page matches the decision made at Gate 1.

*Human sign-off required.* Do not publish new pricing without this sign-off.

*Gate output:* signed approval from legal and finance that the pricing page may go live.

---

**Step 7: Communicate pricing change to existing customers**
Before the new pricing page goes live, existing customers on affected tiers must be notified. This step is retention-sensitive — badly communicated price changes produce churn spikes.

Communication requirements:
- Notice period: minimum 30 days before new pricing takes effect for existing customers; 60 days is preferable for annual contracts
- Grandfathering decision: will existing customers be moved to new pricing at their next renewal, or immediately? Finance and CS lead must agree on this at Gate 1.
- Message framing: the pricing change communication should explain what the customer is getting for the new price (or what has changed in the packaging), not just announce the new number
- Channel: email directly from the account or CS team for customers with a named CSM; in-app notification and email for self-serve customers
- Escalation path: for customers who push back, who is the escalation contact? CS lead or sales lead should be briefed before communication goes out.

Deliverable: Draft pricing change communication (email and in-app message if applicable), reviewed by PMM and CS lead before sending.

---

**Step 8: Update all sales enablement materials**
Any sales collateral, pitch decks, one-pagers, competitive battle cards, or objection handling guides that reference pricing must be updated before the new pricing takes effect. Sales should not be caught quoting old pricing.

Deliverable: Updated materials checklist confirmed complete by PMM and sales enablement lead.

---

## Output
At the end of this workflow, the human has:
1. An updated competitive pricing map with date stamp
2. A price sensitivity report for the past year with root cause diagnosis
3. A packaging review with a clear maintain / adjust / redesign recommendation
4. A pricing strategy decision document (signed off at Gate 1)
5. A pricing page review with the top 5 priority changes
6. Legal and finance sign-off (Gate 2)
7. Sent or scheduled customer pricing change communication
8. Updated sales enablement materials

## Human decision points
- **Gate 1 (Step 4):** Finance + PMM + Sales must agree on: change prices (yes/no), change packaging (yes/no), effective date, grandfathering terms, expected revenue impact. This is the most important human decision in the workflow — all subsequent steps execute against this decision.
- **Gate 2 (Step 6):** Legal and Finance must sign off on the final pricing page before it goes live. No exceptions.
- **Step 7 approval:** PMM and CS lead must review the customer communication draft before it sends. A pricing change communicated poorly can undo months of retention work.
- **Step 8 sign-off:** PMM and sales enablement lead must confirm all sales materials are updated before new pricing is in effect. A sales rep quoting old pricing after a change is a credibility problem in the field.

## Notes
- Do not run this workflow on a compressed timeline. The minimum realistic timeline from Step 1 through Step 8 is 6–8 weeks. Compressing it produces either bad analysis or bad customer communication.
- Pricing changes require a legal review checkpoint even when the changes seem minor. Contract language, terms of service, and pricing pages interact in ways that require legal review.
- The most common mistake in annual pricing reviews is making the decision before completing the analysis. Gate 1 must receive all three agent reports before convening — not after the decision has already been informally made.
