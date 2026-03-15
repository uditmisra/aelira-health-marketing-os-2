// The UI is a self-contained ui.html — no bundling needed.
// This script just verifies the output files are in place.

const fs = require("fs");
const path = require("path");

const distCode = path.join(__dirname, "../dist/code.js");
const ui = path.join(__dirname, "../ui.html");

if (!fs.existsSync(distCode)) {
  console.error("ERROR: dist/code.js not found. Run tsc first.");
  process.exit(1);
}

if (!fs.existsSync(ui)) {
  console.error("ERROR: ui.html not found.");
  process.exit(1);
}

const stats = fs.statSync(distCode);
console.log(`✓ dist/code.js  (${(stats.size / 1024).toFixed(1)} KB)`);
console.log(`✓ ui.html`);
console.log("\nPlugin is ready to load in Figma Desktop:");
console.log("  Plugins → Development → Import plugin from manifest…");
console.log("  Select: figma-plugin/manifest.json");
