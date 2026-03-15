# Marketing OS — Onboarding Checklist

Work through this in order. Do not skip phases — later phases depend on earlier ones.

> **Critical warning:** Do not skip Phase 2 (populating `core/`). Every agent reads from `core/` before producing output. An empty `core/` layer produces generic output. A rich `core/` layer produces output you can ship.

---

## Phase 1: Configure (Day 1)

**Goal:** The system knows who you are and what you're trying to do.

### 1.1 Fill out CLAUDE.md

Open `CLAUDE.md` and complete the `## Client Configuration` block. Use `client-setup/config-template.md` as a guided questionnaire — it explains what each field means and gives examples.

- [ ] Company name, product name, one-line description
- [ ] Market category and company stage
- [ ] Primary website URL
- [ ] Primary and secondary competitors (names only for now — full cards come in Phase 2)
- [ ] Key differentiator (what makes you win deals)
- [ ] Primary value proposition (the outcome you deliver)
- [ ] Primary ICP: company profile (size, stage, industry)
- [ ] Buyer persona titles (primary, secondary, end user)
- [ ] Key pain (why they need you)
- [ ] Key trigger (what makes them buy now, not later)
- [ ] Brand tone and what to avoid
- [ ] Full marketing tech stack
- [ ] Current quarter goals: growth marketing + PMM + key metric

**If you're unsure about any field:** Put your best current answer and mark it `[NEEDS VALIDATION]`. Do not leave fields blank — a rough answer is better than an empty one.

### 1.2 Run a discovery interview with the OS

Once CLAUDE.md is filled out, open a Claude Code session in this repo and say:

> "I've just filled out CLAUDE.md. I want you to interview me about our company so you can flag any gaps, push on anything that sounds generic, and help me identify which core/ files to prioritize first."

Claude will ask 10-15 targeted questions. Answer them conversationally. The session surfaces:
- Positioning assumptions that need pressure-testing
- Missing context that will limit agent output quality
- The 1-2 `core/` files to prioritize first

**Time:** 30 minutes. Do not skip this.

---

## Phase 2: Populate core/ (Days 1–5)

**Goal:** The shared intelligence layer is rich enough that agents produce specific, usable output without asking for more information.

> **Do not skip `core/icp/primary-icp.md` and `core/brand/messaging-pillars.md`.** These two files are read by more agents than any others. If they are empty or generic, every agent output will be generic.

---

### 2.1 `core/brand/voice-and-tone.md`

**What goes here:** How your brand sounds. Not adjectives — examples.

**Minimum viable:**
- 3-5 sentences describing your tone
- 3 "we sound like this" examples — actual sentences you would publish
- 3 "we don't sound like this" examples — sentences that are off-brand

**How to fill it:** Pull 5-10 pieces of existing content you're proud of. Read them out loud. What do they have in common? That's your voice. Pull 5 pieces that feel off. What makes them wrong? That's your "what to avoid" list.

- [ ] Tone description written (3-5 sentences)
- [ ] "We sound like this" examples added (3 minimum)
- [ ] "We don't sound like this" examples added (3 minimum)
- [ ] Style rules documented (case, punctuation, formatting)
- [ ] Banned words and phrases listed

---

### 2.2 `core/brand/messaging-pillars.md`

**What goes here:** The 3-4 proof-backed reasons customers choose you over alternatives, in order of importance.

**Minimum viable:**
- Primary claim (the one thing you'd say if you could only say one thing)
- 3 supporting pillars (proof-backed, not aspirational)
- One customer quote or metric per pillar

**How to fill it:**
- **Option A (positioning is clear):** Translate your existing positioning into the template format. Ask Claude Code to help.
- **Option B (positioning is unclear):** Run `product-marketing/positioning/workflows/new-positioning-sprint.md` first. That workflow produces a positioning canvas and message hierarchy that feeds directly into this file.

- [ ] Primary claim written (one sentence — specific, proof-backed)
- [ ] 3 messaging pillars written, each with supporting evidence
- [ ] Reviewed by a human who owns positioning

---

### 2.3 `core/icp/primary-icp.md`

**What goes here:** A precise definition of the company profile and buyer your system is optimized for.

**Minimum viable:**
- Company profile: size, stage, industry verticals
- Primary buyer: title, what they own, how they're measured, what they're afraid of
- Key pain: the problem before they find you
- Key trigger: the event that makes them buy now

**How to fill it:**
- Pull your last 20 closed-won deals from CRM. Who bought? What title? What company size? What was the trigger?
- If you have call recordings, run `customer-discovery-sprint` to extract ICP signals from transcripts.

- [ ] Company profile filled in (size, stage, industry)
- [ ] Primary buyer: title, ownership, metrics, fears
- [ ] Key pain written in customer language (from call recordings, not internal language)
- [ ] Key trigger documented
- [ ] Negative ICP noted (who to disqualify early)

---

### 2.4 `core/icp/personas/`

**Minimum viable:** One persona — the primary buyer.

**Complete:** Primary buyer, secondary buyer, end user.

- [ ] Primary buyer persona file created
- [ ] Secondary buyer persona file created (if applicable)
- [ ] End user persona file created (if different from buyer)

---

### 2.5 `core/competitive/`

**Minimum viable:** One card per top 3 competitors — their pitch, why you beat them, their real weaknesses (sourced, not guessed).

**How to fill it:**
- Start with your last 10 win/loss reviews. What did you learn about each competitor?
- Run `product-marketing/market-intelligence/agents/competitive-monitor.md` to pull recent public signals.

- [ ] `competitor-[name].md` created for primary competitor
- [ ] `competitor-[name].md` created for secondary competitor
- [ ] `competitor-[name].md` created for third competitor (if applicable)
- [ ] `landscape-overview.md` updated

---

### 2.6 `core/customer-voice/jaw-dropping-moments.md`

**What goes here:** 5-10 customer quotes so good you'd put them on the homepage. Not polished testimonials — raw verbatim moments from calls.

**Why this matters:** Growth creative agents use these as headline inspiration. The quality of your ad copy and case studies is directly tied to what lives here.

**How to fill it:**
- Listen to your last 20 customer calls. When a customer says something striking, paste the verbatim quote with attribution.
- Run `interview-synthesizer.md` on existing transcripts to surface these moments systematically.

- [ ] 5 customer quotes added (minimum)
- [ ] 10 customer quotes added (complete)
- [ ] Each quote has: verbatim text, speaker title, company size (anonymized is fine)

---

### 2.7 `core/measurement/kpi-framework.md`

**Minimum viable:** 3-5 metrics with current baseline, quarterly target, and measurement owner.

- [ ] Growth marketing KPIs: MQL target, pipeline target, CAC target
- [ ] PMM KPIs: launch goals, win rate targets, enablement coverage
- [ ] Attribution model documented
- [ ] Reporting cadence set

---

## Phase 3: Brand Bootstrap (Day 2–3)

**Goal:** Populate `core/brand/assets.md` so every agent that produces visual or email output has your brand colors, fonts, and logo. Without this, email templates use placeholders and the Figma ad template cannot be built.

### 3.1 Run brand-bootstrap workflow

Open claude.ai and run:

```
Run client-setup/workflows/brand-bootstrap.yaml with these inputs:
website_url: [your website URL]
```

This workflow:
1. Extracts colors, fonts, and logo from your website automatically
2. Asks you to review and confirm the extraction (< 5 minutes)
3. Builds your HTML email template (marketing + outbound variants)
4. Produces a Figma ad template spec to hand off to your designer
5. Commits everything to `core/brand/assets.md`

- [ ] `core/brand/assets.md` populated (run brand-bootstrap or fill manually)
- [ ] HTML email templates saved to `client-setup/templates/`
- [ ] Figma spec handed off to designer (if running paid social ads)
- [ ] Any remaining placeholders in `assets.md` filled manually

**Manual option:** If brand-bootstrap extraction is incomplete (custom fonts, logo behind auth), fill `core/brand/assets.md` directly. The template structure is in the file — replace each `<PLACEHOLDER>` value.

---

## Phase 4: First Run (Week 1–2)

**Goal:** Run one workflow end-to-end to validate the system produces specific, usable output with your data.

**Choose based on your most urgent need:**

| Priority | Start here |
|---|---|
| Positioning is unclear or under pressure | `product-marketing/positioning/workflows/new-positioning-sprint.yaml` |
| Paid performance is the priority | `growth-marketing/workflows/ad-copy-generation.yaml` |
| Sales win rate is low | `product-marketing/sales-enablement/workflows/new-competitor-battlecard.yaml` |
| Launches are coming | `product-marketing/launches/workflows/l2-launch-playbook.yaml` |

**After your first run:**
- [ ] Is the output specific to your company, or could it apply to any competitor in your category?
- [ ] If generic: identify which `core/` file is thin and go back to Phase 2.
- [ ] If specific and usable: proceed to Phase 5.

---

## Phase 5: Integrate (Week 2–4)

**Goal:** Connect your marketing tech stack so agents can pull live data.

See `integrations/` for step-by-step setup guides.

**Priority order:**

1. **Call recording (Gong / Chorus)** — unlocks customer voice mining, win/loss analysis, ICP refinement
2. **CRM (Salesforce / HubSpot)** — unlocks pipeline analysis, ICP validation, win/loss data
3. **Paid channels (Google Ads / Meta / LinkedIn)** — unlocks creative performance analysis
4. **SEO tool (Semrush / Ahrefs)** — unlocks content gap analysis
5. **Analytics (GA4)** — unlocks conversion path analysis

- [ ] Call recording integration connected and tested
- [ ] CRM integration connected and tested
- [ ] Paid search integration connected and tested
- [ ] Paid social integration connected and tested
- [ ] Email platform integration connected and tested
- [ ] SEO tool integration connected and tested
- [ ] Analytics integration connected and tested

---

## Phase 6: Cadence (Ongoing)

### Weekly (every Monday)

- [ ] `growth-marketing/workflows/weekly-performance-review.md`
- [ ] `product-marketing/market-intelligence/workflows/weekly-competitive-pulse.md`
- [ ] `system-intelligence/workflows/weekly-system-review.md`

**Time per week:** 60-90 minutes total.

### Monthly

- [ ] 2-4 customer interviews → `interview-synthesizer.md`
- [ ] Review and apply pending system-intelligence proposals in `core/system-intelligence/proposals/`
- [ ] Update competitor cards if signals have changed

### Quarterly

- [ ] `product-marketing/market-intelligence/workflows/quarterly-win-loss-review.md`
- [ ] `product-marketing/customer-intelligence/workflows/icp-quarterly-review.md`
- [ ] `product-marketing/sales-enablement/workflows/quarterly-enablement-refresh.md`
- [ ] `system-intelligence/workflows/quarterly-system-audit.md`

---

## What Good Looks Like: 30 / 60 / 90 Days

### 30 days
- `core/` is fully populated (not perfect — fully populated)
- At least 3 workflows run end-to-end
- All major integrations connected
- Weekly cadence running
- At least one shipped asset (ad copy, battlecard, one-pager)

**Leading indicator:** Workflow outputs require minimal editing before use.

### 60 days
- System Intelligence has produced first proposals; 2+ applied
- `core/customer-voice/` has 10+ jaw-dropping moments
- Competitor cards updated at least once from real signal
- Creative rotating based on performance data, not gut feel
- Win/loss analysis has changed how sales handles at least one objection

**Leading indicator:** You stop having to explain your positioning to Claude — it already knows it.

### 90 days
- Agents producing output calibrated to your ICP language
- Cross-system feedback loop active: PMM positioning changes showing in growth creative
- System Intelligence has made 5+ applied changes to agent files
- Measurable baseline for every KPI in the framework

**Leading indicator:** New team members onboard to your marketing context by reading `core/` — not a 3-hour meeting.
