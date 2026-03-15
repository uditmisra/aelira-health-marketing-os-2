// ─── Assembled Ads Table Row ─────────────────────────────────────────────────
// Matches the column spec from ad-assembler-agent.md
// platform | format | headline | body_copy | cta | cta_url |
// headline_chars | body_chars | pillar | frame_type | quality_status | run_id

export interface AdRow {
  platform: string;       // "LinkedIn Ads", "Google Ads"
  format: string;         // "linkedin_single_image", "google_display_medium"
  headline: string;
  body_copy: string;
  cta: string;
  cta_url: string;
  headline_chars: number;
  body_chars: number;
  pillar: string;         // e.g. "Speed Without Sacrifice"
  frame_type: string;     // "problem-led", "benefit-led", "social-proof", "curiosity", "specificity"
  quality_status: string; // "approved" | "conditional" | "failed"
  run_id: string;
}

// ─── Format → Figma Master Frame Name ────────────────────────────────────────
// The format value in the ads table maps to a predictable frame name in Figma.
// Designers must name their master frames exactly as listed here.

export const FORMAT_TO_FRAME_NAME: Record<string, string> = {
  linkedin_single_image:       "[Master] LinkedIn Single Image",
  linkedin_square:             "[Master] LinkedIn Square",
  linkedin_carousel:           "[Master] LinkedIn Carousel",
  google_display_medium:       "[Master] Google Display 300x250",
  google_display_leaderboard:  "[Master] Google Display 728x90",
  google_display_large:        "[Master] Google Display 336x280",
  meta_feed_square:            "[Master] Meta Feed Square",
  meta_feed_portrait:          "[Master] Meta Feed Portrait",
  meta_story:                  "[Master] Meta Story",
};

// ─── AI Image entry (from images.json in run directory) ──────────────────────
export interface RunImage {
  url: string;           // data:image/...;base64,... URL
  mimeType: string;
  prompt: string;
  negativePrompt: string;
  template: string;
  aspectRatio: string;
  imageSize: string;
  generatedAt: string;
}

// ─── Plugin → UI messages ─────────────────────────────────────────────────────
export type PluginToUIMsg =
  | { type: "FRAMES_FOUND";    frames: string[] }
  | { type: "PROGRESS";        current: number; total: number; label: string }
  | { type: "DONE";            generated: number; skipped: number; errors: string[] }
  | { type: "IMAGES_APPLIED";  applied: number; errors: string[] }
  | { type: "ERROR";           message: string };

// ─── UI → Plugin messages ─────────────────────────────────────────────────────
export type UIToPluginMsg =
  | { type: "GENERATE";      rows: AdRow[]; includeConditional: boolean; pagePrefix: string }
  | { type: "SCAN_FRAMES" }
  | { type: "APPLY_IMAGES";  images: Array<{ bytes: ArrayBuffer; mimeType: string; name: string }> }
  | { type: "CANCEL" };
