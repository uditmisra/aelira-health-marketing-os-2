# Assembled Ad Table — Aelira Lung Care Inquiry Campaign
**Run ID:** 2026-03-15-003
**Format:** assembled_ad_table (TSV-ready)
**Platforms:** Google Ads + Meta Ads
**Status:** All assets gate-approved. Ready for platform upload.

---

## GOOGLE ADS — RESPONSIVE SEARCH ADS

Upload instructions: Google Ads → New Ad → Responsive Search Ad → paste headlines and descriptions. Google assembles combinations automatically.

### Campaign 1: Lung Testing — Problem/Curiosity (South Delhi)

**Headlines (paste all 10 — Google selects best combinations):**
1. Getting breathless in Delhi?
2. Delhi air hurting your lungs?
3. Breathless more than before?
4. Finally know your lungs.
5. Leave with answers today.
6. Who's checking your lungs?
7. What your PFT missed
8. Beyond basic spirometry
9. Not a hospital. Only lungs.
10. Dedicated lung centre, Delhi

**Descriptions (paste all 3):**
1. Aelira gives you PFT, FeNO & Lung Oscillometry in one visit. Results same day.
2. 50+ lung metrics. Full report before you leave. Green Park, South Delhi.
3. Dedicated lung centre. No hospital queue. WhatsApp +91 966 711 7222 to book.

**Final URL:** https://aelira.in
**Display path:** aelira.in/lung-test

---

### Campaign 2: Lung Testing — Benefit/Social Proof

**Headlines (paste all 10):**
1. Finally know your lungs.
2. Leave with answers today.
3. Stop guessing. Know.
4. Best lung test I've ever had
5. 50 metrics. Same-day results.
6. ATS & WHO-endorsed rehab
7. Is Delhi air damaging yours?
8. Your spirometry missed this.
9. South Delhi's lung specialist
10. More than basic spirometry

**Descriptions (paste all 3):**
1. One visit. PFT, FeNO & Lung Oscillometry. 50+ metrics. Report before you leave.
2. Stop wondering what Delhi's air has done. One session. Full picture. Same day.
3. Endorsed by ATS, WHO & BTS. South Delhi's dedicated lung centre. WhatsApp us.

**Final URL:** https://aelira.in
**Display path:** aelira.in/lung-assessment

---

## META ADS — UPLOAD-READY AD SETS

Upload instructions: Meta Ads Manager → Create Campaign → Traffic / Leads objective → Ad creative → Single Image Ad → paste headline + primary text.

### Ad Set 1: Post-COVID breathlessness
**Targeting signal:** Interests: COVID-19 recovery, respiratory health; Age 25–55; Delhi NCR
**Primary text (short):** Post-COVID breathlessness doesn't always go away. A FeNO test at Aelira identifies airway inflammation in 15 minutes.
**Headline:** Still breathless after COVID?
**CTA button:** Learn More → https://aelira.in
**WhatsApp CTA alternative:** Send Message → wa.me/919667117222

---

### Ad Set 2: Delhi pollution — problem hook
**Targeting signal:** Delhi location; Age 30–60; Interests: health & wellness, air quality
**Primary text (short):** Doctors call Delhi's air equivalent to 25 cigarettes a day. Most people never test their lungs until symptoms are serious.
**Headline:** Delhi's air damaging your lungs?
**CTA button:** Learn More → https://aelira.in

---

### Ad Set 3: Benefit — emotional (certainty)
**Targeting signal:** Delhi NCR; Age 35–65; Retargeting: site visitors who didn't convert
**Primary text (short):** Stop wondering what's happening with your lungs. One visit at Aelira: 4 tests, 50+ metrics, full report before you leave.
**Headline:** Finally know your lungs.
**CTA button:** Learn More → https://aelira.in

---

### Ad Set 4: Benefit — emotional (answers)
**Targeting signal:** Delhi NCR; Age 35–65; Lookalike of WhatsApp enquiry contacts
**Primary text (short):** At Aelira, you leave the same session knowing exactly what your lung health looks like. No 3-day wait. No vague summary.
**Headline:** Leave with answers today.
**CTA button:** Send Message → wa.me/919667117222

---

### Ad Set 5: Social proof — patient reviews
**Targeting signal:** Delhi NCR; Age 30–65; Interests: health checkups, preventive care
**Primary text (short):** "The entire experience, end-to-end, was amongst the best I have had." Book your comprehensive lung assessment at Aelira.
**Headline:** "Best experience end-to-end"
**CTA button:** Learn More → https://aelira.in

---

### Ad Set 6: Comparison — vs. hospital
**Targeting signal:** Delhi NCR; Age 35–65; Interests: hospitals, pulmonology
**Primary text (short):** A hospital fits you around 40 other patients. Aelira fits around your lungs. Dedicated session, 4 tests, same-day results.
**Headline:** Not a hospital. Only lungs.
**CTA button:** Learn More → https://aelira.in

---

### Ad Set 7: Rehab — COPD/ILD segment
**Targeting signal:** Delhi NCR; Age 45–75; Interests: COPD, lung disease, respiratory therapy
**Primary text (short):** Breathlessness doesn't have to be your new normal. Pulmonary rehab at Aelira — endorsed by ATS, WHO & BTS. Free consult.
**Headline:** Breathless more than before?
**CTA button:** Send Message → wa.me/919667117222

---

## A/B TEST SETUP — H-001

**Hypothesis:** Problem-led framing outperforms benefit-led (emotional) framing for inquiry generation at awareness/consideration stage.

**How to tag in Meta:**
- Problem-led ads (Ad Sets 1, 2): Label campaign "[H001-P] Problem frames"
- Benefit-led ads (Ad Sets 3, 4): Label campaign "[H001-B] Benefit frames"
- Keep all other variables identical (targeting, budget, image, CTA)

**How to tag in Google:**
- Campaign 1 (Problem/Curiosity headlines): Label "[H001-P]"
- Campaign 2 (Benefit/Social proof headlines): Label "[H001-B]"

**Signal to read back:** After 2+ weeks and ≥100 clicks per variant, compare CTR and inquiry rate (WhatsApp/call conversions). Log result in `core/system-intelligence/signal-log/` and update `core/system-intelligence/ad-hypotheses.md`.

**Decision threshold:** If one variant shows >20% higher CTR with statistical significance (≥95%), shift budget 70/30 toward winner. If no significant difference, test a new dimension (e.g., image style).
