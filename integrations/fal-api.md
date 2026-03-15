# FAL API Integration Guide

## What This Is

FAL is the image generation API used by Marketing OS for Phase 11 creative generation. It provides fast, high-quality text-to-image and image-to-image via FLUX models.

In Marketing OS, FAL generates:
- Ad creative images from approved copy + Brand DNA
- Educational infographics for healthcare and B2B content
- Organic social visuals
- Seasonal campaign images

---

## Setup

### Step 1 — Get your API key

1. Go to [fal.ai](https://fal.ai) and create an account
2. Navigate to **Dashboard → API Keys**
3. Create a new key — name it "Marketing OS"
4. Copy the key (format: `xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx`)

### Step 2 — Add to Marketing OS

1. Open the web app → **Settings → Integrations**
2. Find **FAL (Image Generation)** and click **Connect**
3. Paste your API key and click **Save**

The key is stored in Supabase and used server-side only — it never appears in client-side code.

### Step 3 — Verify

After connecting, go to any Day 1 Pack run that has ad copy → "Generate Images" section → generate a test image. If you see an image appear, the integration is working.

---

## Models

Marketing OS uses two FAL models depending on the workflow:

### Text-to-image (default)
**Model:** `fal-ai/flux/schnell`

Used for:
- All B2B SaaS, professional services, and healthcare image generation
- Any brief where no product reference photos are available

FLUX Schnell is optimized for speed (4 inference steps) — suitable for batch generation across multiple copy variants. High quality output for typography-dominant and environmental compositions.

**Endpoint:** `https://fal.run/fal-ai/flux/schnell`

### Image-to-image (DTC product businesses)
**Model:** `fal-ai/flux/dev/image-to-image`

Used for:
- DTC and product SMBs where the client has uploaded product reference photos
- Any brief where showing the actual product in context is critical

Reference photos are stored in FAL storage during setup (one-time upload from Settings). The model uses up to 14 reference images, composing the product into the ad scene described in the prompt.

**Endpoint:** `https://fal.run/fal-ai/flux/dev/image-to-image`

---

## API Reference

### Text-to-image request

```
POST https://fal.run/fal-ai/flux/schnell
Authorization: Key {your_api_key}
Content-Type: application/json

{
  "prompt": "...",
  "negative_prompt": "...",
  "image_size": "landscape_16_9",
  "num_inference_steps": 4,
  "num_images": 1,
  "enable_safety_checker": true
}
```

**Image size values:**
| FAL value | Dimensions | Use case |
|---|---|---|
| `"landscape_16_9"` | 1280×720 | LinkedIn, Google Display leaderboard |
| `"landscape_4_3"` | 1280×960 | Google Display rectangle, general |
| `"square_hd"` | 1080×1080 | Meta Feed, Instagram |
| `"portrait_4_3"` | 960×1280 | Meta Story, Instagram Story |

**Response:**
```json
{
  "images": [
    {
      "url": "https://fal.media/files/...",
      "width": 1280,
      "height": 720,
      "content_type": "image/jpeg"
    }
  ],
  "seed": 123456789,
  "has_nsfw_concepts": [false],
  "prompt": "..."
}
```

### Image-to-image request (DTC)

```
POST https://fal.run/fal-ai/flux/dev/image-to-image
Authorization: Key {your_api_key}
Content-Type: application/json

{
  "prompt": "...",
  "image_url": "https://fal.media/files/your-product-reference.jpg",
  "strength": 0.75,
  "negative_prompt": "...",
  "image_size": "landscape_16_9",
  "num_inference_steps": 28,
  "num_images": 1
}
```

`strength` controls how much the output differs from the reference image:
- `0.6`: Preserves product shape strongly, changes scene/background
- `0.75`: Balanced — recommended default
- `0.9`: More creative composition, looser product likeness

---

## Cost

| Model | Cost per image | Notes |
|---|---|---|
| `flux/schnell` | ~$0.003–0.006 | 4 steps, very fast (~2s) |
| `flux/dev` | ~$0.025–0.04 | 28 steps, higher quality |
| `flux/dev/image-to-image` | ~$0.025–0.04 | Same as flux/dev |

**Typical generation runs:**
- Day 1 Pack full creative suite (13 templates × key copy variants): ~30–50 images → ~$0.15–$0.30 (schnell)
- Targeted run (3 templates × 5 variants): 15 images → ~$0.05–$0.09

At a $500/mo retainer, image generation is < 0.1% of revenue.

---

## Uploading Product Reference Photos (DTC)

For DTC clients, product reference photos must be uploaded to FAL storage before image-to-image generation.

### Via the web app
Settings → **FAL Product Images** → drag and drop product photos (up to 14 images, max 5MB each).

The web app uploads to FAL storage via the `/api/creative/upload` route and saves the resulting FAL storage URLs to Supabase.

### Manual upload via FAL API
```
POST https://rest.alpha.fal.ai/storage/upload
Authorization: Key {your_api_key}
Content-Type: multipart/form-data

file: [binary file data]
```

Response: `{ "url": "https://fal.media/files/..." }`

Save this URL — it's used as `image_url` in image-to-image requests.

---

## Troubleshooting

**`401 Unauthorized`** — API key is incorrect or expired. Reconnect in Settings.

**`422 Unprocessable Entity`** — Prompt or payload is malformed. Check that `image_size` uses a valid FAL value (see table above). Check that `prompt` is not empty.

**Safety checker rejection** — Prompt contains content that triggered the safety check. Review the Image Generation Prompt Modifier and the template's negative prompt. For healthcare content, ensure the prompt uses clinical language, not sensational language.

**Poor brand consistency across generations** — The Image Generation Prompt Modifier is too generic. Re-run `brand-dna-extractor` with more specific visual references.

**Product not recognizable in DTC image-to-image** — Lower `strength` to 0.6. Ensure reference photos show the product clearly on a clean background.

---

## Notes for Healthcare Clients

- FAL's safety checker may flag certain medical imagery (anatomical diagrams, condition-specific visuals). Use clinical, educational framing in prompts — not sensational.
- For trust/credentials templates, use real doctor photos (uploaded as style reference) rather than generating fictional medical professionals.
- Any generated image that will claim a specific clinical outcome (e.g. "Reduces COPD symptoms") requires human medical review before use in ads. The `brand-dna.md` compliance flag section tracks these.
