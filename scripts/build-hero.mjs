// Cuts the painted prime-rib plate out of the approved hero mockup and writes web-ready sizes.
// Run: npm run hero   (source: assets-src/hero-mockup.webp = the approved apex_logo_main.webp mockup, kept out of
// git because it has placeholder text baked in, like "Omaha")
//
//   public/images/hero-plate-1600.webp   desktop
//   public/images/hero-plate-900.webp    phones
//   assets-src/hero-plate-og.png         used by scripts/build-brand.mts for the share card

import { mkdirSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const root = process.cwd();
const src = join(root, "assets-src", "hero-mockup.webp");
const out = join(root, "public", "images");
mkdirSync(out, { recursive: true });

// The painting only, below the mockup's header band and right of its headline.
// Measured on the 2000px-wide copy; scale to whatever size the source is (apex_logo_main.webp is 2048).
const { width: srcW } = await sharp(src).metadata();
const k = srcW / 2000;
const crop = { left: Math.round(900 * k), top: Math.round(222 * k), width: Math.round(1100 * k), height: Math.round(840 * k) };
const base = sharp(src).extract(crop);

for (const w of [1600, 900]) {
  await base
    .clone()
    .resize({ width: w, kernel: "lanczos3" })
    .sharpen({ sigma: 0.6 })
    .webp({ quality: 80, effort: 6 })
    .toFile(join(out, `hero-plate-${w}.webp`));
}
await base.clone().resize({ width: 1100 }).png().toFile(join(root, "assets-src", "hero-plate-og.png"));

console.log("hero -> public/images/hero-plate-{1600,900}.webp, assets-src/hero-plate-og.png");
