# Step 1 — Brand Extraction Report (Revised)
**Workflow:** brand-bootstrap  
**Run ID:** 2026-03-15-001  
**Source URL:** https://aelira.in/  
**Date:** 2026-03-15  
**Extraction method:** HTML scan + visual screenshot analysis (screenshot provided by human reviewer)

---

## Gate 1 Resolution
Human reviewer provided a hero section screenshot. Colors and font extracted visually. Confidence upgraded from Low to Medium. Proceeding to email template and Figma spec build.

---

## Final Extraction Report

```
EXTRACTION REPORT — Aelira Lung Care — 2026-03-15 (revised)

COMPANY
  Name: Aelira Lung Care
  Also referred to as: Aelira Health (blog bylines)
  Tagline: "Breathe with Confidence"
  Description: Advanced Pulmonary Rehabilitation and Diagnostics centre in South Delhi

COLORS — from visual screenshot analysis
  Primary (CTA button):        #2E6B40   rgb(46, 107, 64)    Confidence: Medium
                               Source: "Book consultation" button background, hero section
  Heading dark green:          #1B5E30   rgb(27, 94, 48)     Confidence: Medium
                               Source: H1 text "An exclusive centre caring for your lungs"
  Accent (light mint):         #86D08A   rgb(134, 208, 138)  Confidence: Medium
                               Source: Word "your" in H1 — accent/highlight color
  Background (warm cream):     #F0EBE0   rgb(240, 235, 224)  Confidence: Medium
                               Source: Page background, hero section
  Text secondary (body):       #6B7B6E   rgb(107, 123, 110)  Confidence: Medium
                               Source: Body paragraph text below H1
  White (cards/email):         #FFFFFF                       Confidence: High

  NOTE: All hex values read from screenshot. Recommend DevTools verification before
        final production use. Open https://aelira.in → Inspect → Computed tab.

FONTS — from visual screenshot analysis
  Heading: DM Sans, weight 700
           Confidence: Medium — letterform roundness, open apertures, and geometric
           construction are consistent with DM Sans. Could also be Plus Jakarta Sans.
           VERIFY: Chrome DevTools → right-click H1 → Inspect → Computed → font-family
  Body: DM Sans, weight 400
        Confidence: Medium
  Google Fonts URL: https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap
  Fallback stack: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif

LOGO
  Primary logo URL (direct):         https://aelira.in/aelira-logo-v2.png
  Primary logo URL (Next.js CDN):    https://aelira.in/_next/image?url=%2Faelira-logo-v2.png&w=3840&q=75
  Confidence: High — found in header/footer across all pages
  Type: Full combo mark (wordmark + logomark)
  Format: PNG
  White version: <PLACEHOLDER — upload white variant to CDN for dark background use>

BUTTON
  Border-radius: 50px (pill shape — confirmed from screenshot)
  Confidence: Medium

AD CREATIVE
  Figma file URL: <PLACEHOLDER — manual entry required>

GAPS REMAINING (manual entry required):
  1. Exact hex values — recommend DevTools confirmation
  2. White logo version URL — for dark backgrounds and email headers
  3. Figma file URL — share once designer creates the file
  4. Logo SVG version — if available
  5. Alert/status colors (success, warning, error) — not visible on homepage

CONFIDENCE SUMMARY: Medium overall
  Good enough to build email templates and Figma spec.
  Recommend DevTools pass before first campaign goes live.
```
