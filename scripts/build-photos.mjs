// Turns the restaurant's own photos (scraped from chancesryork.com into assets-src/scrape/photos, gitignored)
// and close-ups of the hero painting into graded, web-sized images.
// Run: npm run photos   (after npm run hero)
//
// Every photo gets the same warm, low-light grade so phone snapshots sit next to the painting:
// slightly darker and less saturated, a soft-light brass wash, and a gentle vignette.

import { mkdirSync, readdirSync } from "node:fs";
import { join } from "node:path";
import sharp from "sharp";

const root = process.cwd();
const src = join(root, "assets-src", "scrape", "photos");
const out = join(root, "public", "images", "photos");
mkdirSync(out, { recursive: true });

// name -> source file, crop as fractions of the (rotated) original, output aspect
const photos = [
  { name: "bar", file: "ChancesR-3.jpg", crop: [0, 0.06, 1, 0.82], widths: [1600, 800] },
  { name: "hobnob", file: "Hob-Nob-Lounge.jpg", crop: [0, 0, 1, 1], widths: [1200, 700] },
  { name: "sign", file: "IMG_3307.JPG", crop: [0.05, 0.08, 0.62, 0.92], widths: [1000, 600] },
  { name: "buffet", file: "Beer-Garden.jpg", crop: [0, 0.32, 1, 0.68], widths: [1200, 700] },
  { name: "cake", file: "Carrot-Cake.jpg", crop: [0.1, 0.04, 0.8, 0.92], widths: [900, 600] },
  { name: "private", file: "Private-Events.jpg", crop: [0, 0.1, 1, 0.9], widths: [1200, 700] },
];

// Close-ups from the hero painting (assets-src/hero-plate-og.png, 1100×840)
const painting = join(root, "assets-src", "hero-plate-og.png");
const closeups = [
  { name: "rib", box: { left: 230, top: 300, width: 480, height: 360 }, widths: [900, 600] },
  { name: "mash", box: { left: 105, top: 285, width: 290, height: 218 }, widths: [600] },
];

const vignette = (w, h) =>
  Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><defs><radialGradient id="v" cx="0.5" cy="0.5" r="0.75"><stop offset="0.55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#0d0805" stop-opacity="0.55"/></radialGradient></defs><rect width="100%" height="100%" fill="url(#v)"/></svg>`,
  );
const wash = (w, h) =>
  Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}"><rect width="100%" height="100%" fill="#c9963c" fill-opacity="0.35"/></svg>`);

async function grade(img, w, h, file) {
  const base = await img.resize(w, h, { fit: "cover" }).modulate({ brightness: 0.86, saturation: 0.9 }).toBuffer();
  await sharp(base)
    .composite([
      { input: wash(w, h), blend: "soft-light" },
      { input: vignette(w, h), blend: "over" },
    ])
    .webp({ quality: 78, effort: 6 })
    .toFile(file);
}

for (const p of photos) {
  const rotated = await sharp(join(src, p.file)).rotate().toBuffer();
  const m = await sharp(rotated).metadata();
  const [x0, y0, x1, y1] = p.crop;
  const box = {
    left: Math.round(m.width * x0),
    top: Math.round(m.height * y0),
    width: Math.round(m.width * (x1 - x0)),
    height: Math.round(m.height * (y1 - y0)),
  };
  for (const w of p.widths) {
    const h = Math.round((w * box.height) / box.width);
    await grade(sharp(rotated).extract(box), w, h, join(out, `${p.name}-${w}.webp`));
  }
  console.log(`${p.name}: ${box.width}×${box.height} -> ${p.widths.join(", ")}`);
}

// The cover of their printed menu (sepia storefront + blackletter logo), rendered from the PDF into
// assets-src/menu/cover.png. Already toned, so it's only resized.
for (const w of [520, 900]) {
  await sharp(join(root, "assets-src", "menu", "cover.png"))
    .resize({ width: w, kernel: "lanczos3" })
    .webp({ quality: 80, effort: 6 })
    .toFile(join(out, `menu-cover-${w}.webp`));
}
console.log("menu-cover: 520, 900");

// The little red-and-white spot illustrations from inside the printed menu (pages 2-4), pulled out of the PDF
// with their transparency into assets-src/menu/art/<name>.png. Small to begin with (130-370px), so they're
// trimmed and kept at their own size, never enlarged.
const artSrc = join(root, "assets-src", "menu", "art");
const artOut = join(root, "public", "images", "art");
mkdirSync(artOut, { recursive: true });
for (const f of readdirSync(artSrc).filter((f) => f.endsWith(".png"))) {
  const info = await sharp(join(artSrc, f))
    .trim()
    .webp({ quality: 90, alphaQuality: 100, effort: 6 })
    .toFile(join(artOut, f.replace(/\.png$/, ".webp")));
  console.log(`art ${f}: ${info.width}×${info.height}`);
}

for (const c of closeups) {
  for (const w of c.widths) {
    const h = Math.round((w * c.box.height) / c.box.width);
    await sharp(painting)
      .extract(c.box)
      .resize(w, h, { kernel: "lanczos3" })
      .sharpen({ sigma: 0.5 })
      .webp({ quality: 80, effort: 6 })
      .toFile(join(out, `${c.name}-${w}.webp`));
  }
  console.log(`${c.name} (painting): ${c.widths.join(", ")}`);
}
