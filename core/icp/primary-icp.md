# Primary ICP — SpotDraft

> Last updated: 2026-03-12
> The customer profile we are optimizing everything for.
> Validate and update against closed-won revenue cohort every 6 months.

## Company profile

- **Industry:** B2B SaaS, fintech, marketplace, growth-stage tech — any company that runs on contracts and has enough volume to feel the pain
- **Size:** 100–1,000 employees (sweet spot: 150–500)
- **Stage:** Series B through Series D (post-PMF, scaling GTM, legal team recently formed or growing)
- **Geography:** US primary; UK and India secondary
- **Contract volume:** 100+ contracts/month being generated, reviewed, or tracked
- **Legal team size:** 1–5 in-house lawyers (solo GC to small team — they are overwhelmed, not under-resourced by choice)

**Tech stack signals (positive fit indicators):**
- Uses Salesforce or HubSpot as CRM (contract requests come from sales)
- Uses Slack for internal communication (integration needed for approval workflows)
- Uses Google Workspace (Docs = where contracts live today — pain point is visible)
- Uses DocuSign for e-sign but doesn't have a full CLM layer on top (common wedge case)

## Buying signals

**What triggers them to look:**
1. Company just hired their first General Counsel and the GC's first job is cleaning up the contract mess
2. A contract obligation was missed (auto-renewal trap, SLA breach, data processing agreement expired)
3. The sales team is complaining loudly that legal is blocking deals
4. Someone in a Series C fundraise asks "can you show us your standard vendor contract process?" and the answer is uncomfortable
5. Legal is spending 70%+ of time on routine review instead of high-value work
6. Company is expanding internationally and needs contract templates for new jurisdictions

**What they've tried before:**
- Google Drive / Dropbox folders (total chaos at scale)
- DocuSign alone (handles signatures, not review, tracking, or storage coherently)
- Contract spreadsheet ("the tracker") that one person maintains and everyone ignores
- A previous enterprise CLM (Ironclad, ContractPodAi) that was over-engineered and never fully adopted

**What made previous solutions fail:**
- Too complex — required months of implementation, consultants, or dedicated legal ops to manage
- Legal team didn't use it because it wasn't faster than their existing workflow
- Business teams didn't use it because it added steps instead of removing them
- IT couldn't prioritize the integration work required to connect to existing tools

## Primary buyer

- **Title:** General Counsel, VP Legal, Head of Legal (the most senior in-house lawyer)
- **Goals:** Protect the business from legal risk, enable revenue (make sales faster, not slower), build a legal function that scales with the company, not one that grows headcount linearly
- **Fears:** Missing an obligation and it becoming a company-level problem. Being seen as the bottleneck. Buying a tool the team won't use. Another failed CLM implementation.
- **How they measure success:** Turnaround time on contracts, legal-related deal delays, team capacity freed for strategic work, zero missed renewals
- **What they read/follow:** Contrary (legal ops publication), General Counsel roundtables, CLOC community, ACC (Association of Corporate Counsel), peers in Slack/WhatsApp groups for in-house lawyers
- **How they buy:** High-trust, reference-driven. They ask peers before looking at G2. Demo is high-stakes — they test with real contracts immediately. Long sales cycle (4–8 weeks) with multiple stakeholders.

## Economic buyer

- **Title:** COO, CFO, CRO (whoever owns "business efficiency" or has a stake in deal velocity)
- **What they care about:** How much revenue is being delayed by legal bottlenecks? What's the cost of the current manual process? Is this a one-time cost or recurring cost?
- **How they evaluate ROI:** Hours saved × hourly cost of legal talent + revenue acceleration from faster deal cycle. SpotDraft's ROI calculator should anchor to deal velocity first (more immediately felt than risk reduction).

## End user

- **Title:** Legal Operations Manager, Contract Manager, or the GC themselves (in smaller teams, the buyer and user are the same person)
- **Day-to-day pain:** Answering "where is the contract?" 10 times a day. Maintaining the contract tracking spreadsheet. Re-reading the same standard clauses to spot variations. Chasing approvals over email. Manually setting calendar reminders for renewals.
- **What a great day looks like:** Business team submits a contract request. Standard NDA goes out automatically. Non-standard MSA lands in a review queue with the non-standard clauses flagged. GC reviews only the deltas. Contract signed same day. Tracked automatically. Zero chasing.

## Disqualifiers (who is NOT a good fit)

- Pure law firms or outside counsel (they are the service provider, not the in-house buyer)
- Companies with fewer than 50 contracts/month — not enough pain to justify switching costs
- Large enterprise (5,000+ employees) with dedicated legal ops teams and deep IT requirements — Ironclad or Icertis is better fit
- Companies that need heavy procurement workflow (sourcing, RFP management) — not SpotDraft's strength
- Regulated industries with very specific compliance requirements (healthcare, defense) that require custom workflow automation beyond SpotDraft's current scope
- Companies that have zero in-house legal — there's no internal champion to drive adoption
