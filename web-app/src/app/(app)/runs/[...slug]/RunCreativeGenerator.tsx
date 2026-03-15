"use client";

import { useState } from "react";

interface GeneratedImage {
  url: string;
  width: number;
  height: number;
  prompt: string;
  template: string;
  imageSize: string;
  generatedAt: string;
}

interface Props {
  runPath: string;
  brandDna: string | null;
  falConnected: boolean;
  /** Images already saved to images.json in this run dir */
  savedImages: GeneratedImage[];
}

const IMAGE_SIZES: { value: string; label: string; platform: string }[] = [
  { value: "landscape_16_9", label: "Landscape 16:9 (1280×720)", platform: "LinkedIn · Google Display" },
  { value: "landscape_4_3",  label: "Landscape 4:3 (1280×960)",  platform: "Google Display rectangle" },
  { value: "square_hd",      label: "Square (1080×1080)",         platform: "Meta Feed · Instagram" },
  { value: "portrait_4_3",   label: "Portrait 4:3 (960×1280)",    platform: "Meta Story · Instagram Story" },
];

const TEMPLATES = [
  "headline-dominant",
  "testimonial-card",
  "us-vs-them",
  "stat-callout",
  "product-screenshot",
  "before-after",
  "educational-infographic",
  "trust-and-credentials",
  "segment-specific-condition",
  "seasonal-campaign",
  "local-context",
];

function extractPromptModifier(brandDna: string): string {
  const match = brandDna.match(/##\s*Image Generation Prompt Modifier\s*\n+(?:>.*\n+)*\n*([\s\S]+?)(?:\n\n---|\n\n##|$)/);
  if (!match) return "";
  return match[1].trim().replace(/^\[GENERATED.*?\]$/m, "").trim();
}

export function RunCreativeGenerator({ runPath, brandDna, falConnected, savedImages }: Props) {
  const promptModifier = brandDna ? extractPromptModifier(brandDna) : "";

  const [prompt, setPrompt] = useState(promptModifier ? `${promptModifier}\n\n` : "");
  const [negativePrompt, setNegativePrompt] = useState(
    "stock photo clichés, handshakes, generic diversity shots, blurry text, illegible typography, distorted faces, watermarks"
  );
  const [imageSize, setImageSize] = useState("landscape_16_9");
  const [template, setTemplate] = useState("headline-dominant");
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sessionImages, setSessionImages] = useState<GeneratedImage[]>([]);

  const allImages = [...savedImages, ...sessionImages];

  async function generate() {
    if (!prompt.trim() || generating) return;
    setGenerating(true);
    setError(null);

    try {
      const res = await fetch("/api/creative/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          negativePrompt,
          imageSize,
          template,
          runPath,
        }),
      });

      const data = await res.json() as { url?: string; width?: number; height?: number; error?: string };

      if (!res.ok || !data.url) {
        setError(data.error ?? "Generation failed");
        return;
      }

      const newImage: GeneratedImage = {
        url: data.url,
        width: data.width ?? 1280,
        height: data.height ?? 720,
        prompt,
        template,
        imageSize,
        generatedAt: new Date().toISOString(),
      };

      setSessionImages((prev) => [newImage, ...prev]);
    } catch {
      setError("Network error — check your connection");
    } finally {
      setGenerating(false);
    }
  }

  if (!falConnected) {
    return (
      <div className="mb-5">
        <div className="bg-white border border-gray-200 rounded-xl px-5 py-4 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-700">Generate Ad Images</p>
            <p className="text-xs text-gray-400 mt-0.5">Connect FAL API in Settings to generate images from this run's copy.</p>
          </div>
          <a
            href="/settings"
            className="px-3 py-1.5 text-xs font-medium border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors whitespace-nowrap"
          >
            Connect FAL →
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-5">
      <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Generate Images</h2>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        {/* Controls */}
        <div className="p-5 space-y-4">
          {/* Template + size row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Template</label>
              <select
                value={template}
                onChange={(e) => setTemplate(e.target.value)}
                className="w-full text-xs border border-gray-200 rounded-lg px-2.5 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400 bg-white"
              >
                {TEMPLATES.map((t) => (
                  <option key={t} value={t}>{t.replace(/-/g, " ")}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 mb-1.5">Image Size</label>
              <select
                value={imageSize}
                onChange={(e) => setImageSize(e.target.value)}
                className="w-full text-xs border border-gray-200 rounded-lg px-2.5 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400 bg-white"
              >
                {IMAGE_SIZES.map((s) => (
                  <option key={s.value} value={s.value}>{s.label} — {s.platform}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Prompt */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">
              Prompt
              {promptModifier && (
                <span className="ml-1.5 text-green-600 font-normal">· Brand DNA loaded</span>
              )}
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={5}
              placeholder="Brand DNA prompt modifier pre-loaded above. Add your headline, context, and composition details below..."
              className="w-full text-xs border border-gray-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-1 focus:ring-gray-400 font-mono resize-y"
            />
          </div>

          {/* Negative prompt */}
          <div>
            <label className="block text-xs font-medium text-gray-500 mb-1.5">Negative Prompt</label>
            <input
              type="text"
              value={negativePrompt}
              onChange={(e) => setNegativePrompt(e.target.value)}
              className="w-full text-xs border border-gray-200 rounded-lg px-2.5 py-2 focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
          </div>

          {/* Generate button */}
          <div className="flex items-center gap-3">
            <button
              onClick={generate}
              disabled={!prompt.trim() || generating}
              className="px-4 py-2 bg-gray-900 text-white text-xs font-medium rounded-lg hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              {generating ? (
                <>
                  <svg className="animate-spin" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
                  </svg>
                  Generating…
                </>
              ) : (
                <>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
                  </svg>
                  Generate Image
                </>
              )}
            </button>
            {error && <p className="text-xs text-red-500">{error}</p>}
            <p className="text-xs text-gray-400 ml-auto">~$0.004 per image · FLUX Schnell</p>
          </div>
        </div>

        {/* Image gallery */}
        {allImages.length > 0 && (
          <div className="border-t border-gray-100 p-5">
            <p className="text-xs font-medium text-gray-500 mb-3">
              {allImages.length} image{allImages.length !== 1 ? "s" : ""} generated
            </p>
            <div className="grid grid-cols-2 gap-3">
              {allImages.map((img, i) => (
                <div key={`${img.url}-${i}`} className="group relative bg-gray-50 rounded-lg overflow-hidden border border-gray-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.url}
                    alt={img.template}
                    className="w-full object-cover"
                    style={{ aspectRatio: img.width && img.height ? `${img.width}/${img.height}` : "16/9" }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-end">
                    <div className="w-full p-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-between">
                      <span className="text-white text-xs font-medium capitalize">
                        {img.template.replace(/-/g, " ")}
                      </span>
                      <a
                        href={img.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        download
                        className="px-2 py-1 bg-white text-gray-900 text-xs font-medium rounded hover:bg-gray-100 transition-colors"
                      >
                        Download
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
