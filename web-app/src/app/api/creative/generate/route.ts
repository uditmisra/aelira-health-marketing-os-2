/**
 * POST /api/creative/generate
 *
 * Generates an image via Nano Banana 2 (Gemini 3.1 Flash Image) and optionally
 * saves the result to images.json in the run directory on GitHub.
 *
 * Body: {
 *   prompt: string            — full prompt (brand DNA already prepended)
 *   negativePrompt?: string   — appended to prompt as exclusions
 *   aspectRatio?: string      — "16:9" | "1:1" | "4:5" | "9:16" etc. (default "16:9")
 *   imageSize?: string        — "512" | "1K" | "2K" | "4K" (default "1K")
 *   runPath?: string          — if provided, appends result to images.json in this run dir
 *   template?: string         — template name used, for metadata
 * }
 *
 * Response: { url: string, mimeType: string }
 */

import { auth } from "@/lib/auth";
import { getIntegrationToken } from "@/lib/integration-kv";
import { getFile, writeFile } from "@/lib/github";
import { NextRequest, NextResponse } from "next/server";

const NB2_ENDPOINT =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-image-preview:generateContent";

interface NB2Part {
  text?: string;
  inline_data?: { mime_type: string; data: string };
}

interface NB2Response {
  candidates?: { content?: { parts?: NB2Part[] } }[];
}

interface SavedImage {
  url: string;
  mimeType: string;
  prompt: string;
  negativePrompt: string;
  template: string;
  aspectRatio: string;
  imageSize: string;
  generatedAt: string;
}

interface ImagesManifest {
  images: SavedImage[];
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const {
    prompt,
    negativePrompt = "",
    aspectRatio = "16:9",
    imageSize = "1K",
    runPath,
    template = "",
  } = await req.json() as {
    prompt: string;
    negativePrompt?: string;
    aspectRatio?: string;
    imageSize?: string;
    runPath?: string;
    template?: string;
  };

  if (!prompt?.trim()) {
    return NextResponse.json({ error: "prompt is required" }, { status: 400 });
  }

  // Get Gemini API key from Supabase (stored under integration id "gemini")
  const apiKey = await getIntegrationToken(session.user.email, "gemini");
  if (!apiKey) {
    return NextResponse.json(
      { error: "Gemini API key not connected — go to Settings to add it" },
      { status: 400 }
    );
  }

  // Build full prompt — append negative instructions inline (NB2 has no discrete negative_prompt param)
  const fullPrompt = negativePrompt.trim()
    ? `${prompt.trim()}\n\nExclude from image: ${negativePrompt.trim()}`
    : prompt.trim();

  const nb2Res = await fetch(NB2_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-goog-api-key": apiKey,
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: fullPrompt }] }],
      generationConfig: {
        responseModalities: ["TEXT", "IMAGE"],
        imageConfig: { aspectRatio, imageSize },
      },
    }),
  });

  if (!nb2Res.ok) {
    const errText = await nb2Res.text();
    console.error("Nano Banana 2 API error:", nb2Res.status, errText);
    return NextResponse.json(
      { error: `Image generation failed: ${nb2Res.status}` },
      { status: 502 }
    );
  }

  const nb2Data = await nb2Res.json() as NB2Response;
  const parts = nb2Data.candidates?.[0]?.content?.parts ?? [];
  const imagePart = parts.find((p) => p.inline_data);

  if (!imagePart?.inline_data) {
    return NextResponse.json({ error: "No image returned from Nano Banana 2" }, { status: 502 });
  }

  const { data: imageBase64, mime_type: mimeType } = imagePart.inline_data;

  // Convert base64 to a data URL for immediate use in the browser
  const dataUrl = `data:${mimeType};base64,${imageBase64}`;

  // Optionally save to images.json in the run directory
  if (runPath) {
    const imagesPath = `${runPath}/images.json`;
    const existing = await getFile(imagesPath);
    const manifest: ImagesManifest = existing
      ? (JSON.parse(existing) as ImagesManifest)
      : { images: [] };

    manifest.images.push({
      url: dataUrl,
      mimeType,
      prompt: fullPrompt,
      negativePrompt,
      template,
      aspectRatio,
      imageSize,
      generatedAt: new Date().toISOString(),
    });

    await writeFile(
      imagesPath,
      JSON.stringify(manifest, null, 2),
      `[web-app] add generated image — ${template || "custom"} — ${new Date().toISOString().slice(0, 10)}`
    );
  }

  return NextResponse.json({ url: dataUrl, mimeType });
}
