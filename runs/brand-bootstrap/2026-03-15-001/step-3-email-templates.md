# Step 3 — Email Templates
**Workflow:** brand-bootstrap  
**Run ID:** 2026-03-15-001  
**Date:** 2026-03-15  
**Brand values applied:** from step-1-brand-extraction-revised.md (screenshot visual extraction)  

---

## Brand Variables Applied

| Variable | Value | Confidence |
|---|---|---|
| Primary color | `#2E6B40` | Medium |
| Heading dark green | `#1B5E30` | Medium |
| Accent mint | `#86D08A` | Medium |
| Background | `#F0EBE0` | Medium |
| Text primary | `#1B5E30` | Medium |
| Text secondary | `#6B7B6E` | Medium |
| Font | DM Sans | Medium |
| Border-radius | 50px (pill) | Medium |
| Logo URL | https://aelira.in/aelira-logo-v2.png | High |
| Company name | Aelira Lung Care | High |

---

## Template 1 — Marketing HTML Email

**Use for:** Newsletters, lung health campaigns, service announcements, patient education emails  
**File:** `client-setup/templates/email-template-marketing.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>{{subject_line}}</title>
  <!-- MEDIUM CONFIDENCE: Verify font name via DevTools before sending -->
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    /* Reset */
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }

    body {
      margin: 0;
      padding: 0;
      /* MEDIUM CONFIDENCE: Verify #F0EBE0 via DevTools */
      background-color: #F0EBE0;
      font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    }

    .email-wrapper {
      max-width: 600px;
      margin: 0 auto;
      padding: 40px 20px;
    }

    .email-header {
      padding: 0 0 28px 0;
      text-align: left;
    }

    .email-header img {
      height: 36px;
      width: auto;
      display: block;
    }

    .email-body {
      background-color: #FFFFFF;
      border-radius: 12px;
      padding: 44px 48px;
    }

    h1 {
      font-size: 28px;
      font-weight: 700;
      /* MEDIUM CONFIDENCE: Verify #1B5E30 via DevTools */
      color: #1B5E30;
      margin: 0 0 16px 0;
      line-height: 1.2;
      font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    }

    h2 {
      font-size: 20px;
      font-weight: 600;
      color: #1B5E30;
      margin: 32px 0 12px 0;
      font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    }

    p {
      font-size: 16px;
      line-height: 1.65;
      /* MEDIUM CONFIDENCE: Verify #6B7B6E via DevTools */
      color: #6B7B6E;
      margin: 0 0 20px 0;
      font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    }

    .accent {
      /* MEDIUM CONFIDENCE: Verify #86D08A via DevTools */
      color: #86D08A;
    }

    .highlight-box {
      background-color: #F0EBE0;
      border-left: 4px solid #2E6B40;
      border-radius: 6px;
      padding: 16px 20px;
      margin: 24px 0;
    }

    .highlight-box p {
      margin: 0;
      color: #1B5E30;
      font-weight: 500;
    }

    /* CTA Button — pill shape matching website */
    .cta-button {
      display: inline-block;
      /* MEDIUM CONFIDENCE: Verify #2E6B40 via DevTools */
      background-color: #2E6B40;
      color: #FFFFFF !important;
      font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      font-size: 16px;
      font-weight: 600;
      text-decoration: none !important;
      padding: 16px 36px;
      border-radius: 50px;
      margin: 8px 0 28px 0;
      letter-spacing: 0.01em;
    }

    .divider {
      height: 1px;
      background-color: #E8E2D8;
      margin: 32px 0;
    }

    .stats-row {
      display: table;
      width: 100%;
      margin: 24px 0;
    }

    .stat-cell {
      display: table-cell;
      text-align: center;
      padding: 0 12px;
      width: 33.33%;
    }

    .stat-number {
      font-size: 28px;
      font-weight: 700;
      color: #2E6B40;
      display: block;
      margin-bottom: 4px;
    }

    .stat-label {
      font-size: 13px;
      color: #6B7B6E;
      display: block;
    }

    .email-footer {
      padding: 28px 0 0 0;
      font-size: 13px;
      color: #9CA3AF;
      text-align: center;
      line-height: 1.6;
    }

    .email-footer a {
      color: #9CA3AF;
      text-decoration: underline;
    }

    .footer-address {
      font-size: 12px;
      color: #B0B8B4;
      margin-top: 8px;
    }

    /* Mobile */
    @media screen and (max-width: 600px) {
      .email-wrapper { padding: 20px 12px; }
      .email-body { padding: 28px 24px; }
      h1 { font-size: 22px; }
      .cta-button { display: block; text-align: center; }
      .stat-cell { display: block; width: 100%; padding: 8px 0; }
    }
  </style>
</head>
<body>
  <div class="email-wrapper">
    
    <!-- HEADER: Logo -->
    <div class="email-header">
      <!-- MEDIUM CONFIDENCE: Logo URL confirmed. Replace with white variant if sending on dark background. -->
      <img 
        src="https://aelira.in/aelira-logo-v2.png" 
        alt="Aelira Lung Care" 
        height="36"
      >
    </div>

    <!-- BODY -->
    <div class="email-body">
      
      <!-- Hero: Headline -->
      <h1>{{headline}}</h1>
      
      <!-- Body paragraphs -->
      <p>{{body_paragraph_1}}</p>
      <p>{{body_paragraph_2}}</p>

      <!-- Optional: Highlight box (remove if not needed) -->
      <div class="highlight-box">
        <p>{{highlight_text}}</p>
      </div>

      <!-- CTA -->
      <a href="{{cta_url}}" class="cta-button">{{cta_text}}</a>

      <!-- Optional: Stats row (remove if not needed) -->
      <div class="divider"></div>
      <div class="stats-row">
        <div class="stat-cell">
          <span class="stat-number">{{stat_1_number}}</span>
          <span class="stat-label">{{stat_1_label}}</span>
        </div>
        <div class="stat-cell">
          <span class="stat-number">{{stat_2_number}}</span>
          <span class="stat-label">{{stat_2_label}}</span>
        </div>
        <div class="stat-cell">
          <span class="stat-number">{{stat_3_number}}</span>
          <span class="stat-label">{{stat_3_label}}</span>
        </div>
      </div>

    </div>

    <!-- FOOTER -->
    <div class="email-footer">
      <p>
        <a href="{{unsubscribe_url}}">Unsubscribe</a> &middot;
        <a href="{{preferences_url}}">Email preferences</a>
      </p>
      <p class="footer-address">
        Aelira Lung Care &mdash; Ground Floor, C-4, Block C, Green Park Extension, New Delhi 110016
      </p>
    </div>

  </div>
</body>
</html>
```

### Usage Guide — Marketing Template

**Fill in before sending:**
- `{{subject_line}}` — appears in `<title>`, copy to your ESP subject line field
- `{{headline}}` — main H1, 8–12 words max for readability
- `{{body_paragraph_1}}` and `{{body_paragraph_2}}` — body content
- `{{highlight_text}}` — use for a key stat, quote, or callout. Delete the `.highlight-box` div entirely if not needed.
- `{{cta_text}}` — e.g. "Book your lung test", "Start your assessment", "Learn more"
- `{{cta_url}}` — booking URL or landing page
- `{{stat_1/2/3_number}}` and `{{stat_1/2/3_label}}` — optional. Use Aelira's clinical stats (e.g., "25–50%", "Reduction in Breathlessness"). Delete entire stats-row section if not using.
- `{{unsubscribe_url}}` and `{{preferences_url}}` — paste from your ESP

**How to use in HubSpot:**
1. Marketing → Email → Create email → Custom HTML
2. Paste the entire HTML above into the HTML editor
3. Replace `{{variables}}` with HubSpot personalization tokens (e.g., `{{ contact.firstname }}`)
4. Preview in desktop and mobile view before sending
5. HubSpot will add its own unsubscribe URL — replace `{{unsubscribe_url}}` with `{{ unsubscribe_link }}`

**Common mistakes to avoid:**
- Don't use the logo on a dark background — the current logo is for light/cream backgrounds only
- Don't delete the `<meta viewport>` tag
- Keep max-width at 600px — wider emails break in many clients
- Don't use `<button>` elements — many ESPs strip them. CTA is already built as `<a>` tag.

---

## Template 2 — Outbound (Sales/SDR) Email

**Use for:** Sales sequences, SDR outreach, follow-up emails, doctor referral outreach  
**Design principle:** Deliverability first. No logo, no background colors, no decorative styling. Looks like a personal email.
  
**File:** `client-setup/templates/email-template-outbound.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{{subject_line}}</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #FFFFFF;
      font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
      color: #1B5E30;
    }
    .wrapper {
      max-width: 560px;
      margin: 0 auto;
      padding: 40px 20px;
    }
    p {
      font-size: 16px;
      line-height: 1.65;
      color: #374151;
      margin: 0 0 18px 0;
    }
    a {
      color: #2E6B40;
      text-decoration: underline;
    }
    .signature {
      margin-top: 32px;
      padding-top: 20px;
      border-top: 1px solid #E5E7EB;
    }
    .signature p {
      font-size: 14px;
      color: #6B7280;
      margin: 0 0 4px 0;
    }
    .signature .name {
      font-size: 15px;
      font-weight: 600;
      color: #1B5E30;
    }
    .footer {
      margin-top: 40px;
      font-size: 12px;
      color: #9CA3AF;
    }
    .footer a {
      color: #9CA3AF;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    
    <p>Hi {{first_name}},</p>
    
    <p>{{body_paragraph_1}}</p>
    
    <p>{{body_paragraph_2}}</p>
    
    <p>{{body_paragraph_3}}</p>
    
    <p>{{cta_line}}</p>
    <!-- cta_line example: "Would a 15-minute call this week make sense? Here's my calendar: [link]" -->
    
    <div class="signature">
      <p class="name">{{sender_name}}</p>
      <p>{{sender_title}}, Aelira Lung Care</p>
      <p>+91 966 711 7222</p>
      <p>aelira.in</p>
    </div>

    <div class="footer">
      <a href="{{unsubscribe_url}}">Unsubscribe</a>
    </div>

  </div>
</body>
</html>
```

### Usage Guide — Outbound Template

**Fill in before sending:**
- `{{first_name}}` — recipient first name
- `{{body_paragraph_1/2/3}}` — 3 short paragraphs. Keep total email under 150 words for best reply rates.
- `{{cta_line}}` — one clear ask. Never two CTAs.
- `{{sender_name}}` — the individual sending (e.g., Dr. A.K. Singh, or team member name)
- `{{sender_title}}` — role (e.g., Pulmonologist, Patient Coordinator)
- `{{unsubscribe_url}}` — from your ESP

**Outbound best practices for Aelira:**
- Lead with a specific observation about the recipient (city AQI, their specialty, a common patient profile)
- One CTA only: book a call, visit the centre, or request a referral pack
- Keep total word count under 150
- Do not attach files — kills deliverability
- Send from a personal inbox (yourname@aelira.in), not a marketing alias

---

## Placeholders Log

These `assets.md` values were not yet confirmed when templates were built. Verify before first send:

| Placeholder | Used in | How to resolve |
|---|---|---|
| `#2E6B40` primary color | Marketing template: CTA button | DevTools → button background-color |
| `#1B5E30` heading color | Marketing template: h1, h2 | DevTools → h1 color |
| `#6B7B6E` body text | Marketing template: p color | DevTools → body color |
| `#F0EBE0` background | Marketing template: wrapper bg | DevTools → body background-color |
| `DM Sans` font | Both templates | DevTools → font-family on h1 or p |
| Logo white variant | Marketing template header | Upload white version to CDN |
| `{{unsubscribe_url}}` | Both templates | Paste from HubSpot |
| `{{preferences_url}}` | Marketing template | Paste from HubSpot |
