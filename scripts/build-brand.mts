// Builds the static brand assets from the same badge the live header draws (BrandMark.tsx).
// Run: npm run brand
//
//   src/app/icon.svg                     favicon (Next serves it automatically)
//   src/app/apple-icon.png               180×180 home-screen icon
//   public/og-image.png                  1200×630 share card (needs `npm run hero` first for the painting)
//   public/brand/chancesr-lockup.svg/.png    badge + wordmark, transparent (for dark backgrounds)
//   public/brand/chancesr-profile.png        1080×1080 profile picture; everything sits inside the circle
//
// All text is converted to outlines, so the files look the same everywhere with no fonts installed.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import opentype from "opentype.js";
import sharp from "sharp";

const root = process.cwd();
const brandDir = join(root, "public", "brand");
mkdirSync(brandDir, { recursive: true });

const loadFont = (rel: string) => {
  const buf = readFileSync(join(root, "node_modules", rel));
  return opentype.parse(buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength));
};
const serif = loadFont("@fontsource/fraunces/files/fraunces-latin-400-normal.woff");
const serifItalic = loadFont("@fontsource/fraunces/files/fraunces-latin-600-italic.woff");
const sans = loadFont("@fontsource/hanken-grotesk/files/hanken-grotesk-latin-700-normal.woff");

// opentype's own toPathData() emits malformed data for some glyphs (e.g. a second "m"), and librsvg
// stops drawing the whole path at the first bad token. Serialize the commands ourselves.
const n = (v: number) => (Math.round(v * 100) / 100).toString();
function pathData(p: opentype.Path) {
  return p.commands
    .map((c) =>
      c.type === "Z"
        ? "Z"
        : c.type === "Q"
          ? `Q${n(c.x1)} ${n(c.y1)} ${n(c.x)} ${n(c.y)}`
          : c.type === "C"
            ? `C${n(c.x1)} ${n(c.y1)} ${n(c.x2)} ${n(c.y2)} ${n(c.x)} ${n(c.y)}`
            : `${c.type}${n(c.x)} ${n(c.y)}`,
    )
    .join("");
}

/** Text as outlined path data, with letter-spacing. align: 0 = left, 0.5 = center. */
function outline(font: opentype.Font, text: string, x: number, y: number, size: number, tracking = 0, align = 0) {
  const adv = (ch: string) => ((font.charToGlyph(ch).advanceWidth ?? 0) * size) / font.unitsPerEm;
  const width = [...text].reduce((w, ch) => w + adv(ch) + tracking, -tracking);
  let cx = x - width * align;
  let d = "";
  for (const ch of text) {
    d += pathData(font.charToGlyph(ch).getPath(cx, y, size));
    cx += adv(ch) + tracking;
  }
  return { d, width };
}

const BRASS = `<linearGradient id="b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f3cd80"/><stop offset="0.55" stop-color="#c9963c"/><stop offset="1" stop-color="#8a6424"/></linearGradient>`;
const FACE = `<radialGradient id="f" cx="0.5" cy="0.35" r="0.7"><stop offset="0" stop-color="#2a1d11"/><stop offset="1" stop-color="#0d0805"/></radialGradient>`;

/** The badge in a 64×64 box, same layout as BrandMark.tsx. */
function badge(withYear = true) {
  const r = outline(serifItalic, "R", 32.5, 40, 30, 0, 0.5);
  const lq = outline(serif, "“", 17.5, 27, 14, 0, 0.5);
  const rq = outline(serif, "”", 47, 27, 14, 0, 0.5);
  const yr = outline(sans, "1932", 32, 51.5, 5.4, 1.6, 0.5);
  return `<circle cx="32" cy="32" r="30.5" fill="url(#f)" stroke="url(#b)" stroke-width="2.2"/>
  <circle cx="32" cy="32" r="26.4" fill="none" stroke="#c9963c" stroke-opacity="0.45" stroke-width="0.7"/>
  <path d="${r.d}" fill="url(#b)"/>
  <path d="${lq.d}${rq.d}" fill="#c9963c"/>
  ${withYear ? `<path d="${yr.d}" fill="#e8dbc2" fill-opacity="0.8"/>` : ""}`;
}

// ---- Favicon + apple icon --------------------------------------------------
const icon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs>${BRASS}${FACE}</defs>${badge(false)}</svg>`;
writeFileSync(join(root, "src", "app", "icon.svg"), icon);
const apple = `<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="-4 -4 72 72"><defs>${BRASS}${FACE}</defs><rect x="-4" y="-4" width="72" height="72" fill="#17100a"/>${badge()}</svg>`;
await sharp(Buffer.from(apple)).png().toFile(join(root, "src", "app", "apple-icon.png"));

// ---- Lockup ------------------------------------------------------------------
const word = outline(serif, "Chances", 76, 34, 30);
const wordR = outline(serifItalic, "“R”", 76 + word.width + 8, 34, 30);
const sub = outline(sans, "RESTAURANT & LOUNGE · YORK", 77, 52, 8.6, 2.6);
const LW = Math.ceil(Math.max(76 + word.width + 8 + wordR.width, 77 + sub.width) + 4);
const lockup = `<svg xmlns="http://www.w3.org/2000/svg" width="${LW * 4}" height="${64 * 4}" viewBox="0 0 ${LW} 64">
  <defs>${BRASS}${FACE}</defs>${badge()}
  <path d="${word.d}" fill="#f5ead6"/><path d="${wordR.d}" fill="#e8bb63"/><path d="${sub.d}" fill="#b7a284"/>
</svg>`;
writeFileSync(join(brandDir, "chancesr-lockup.svg"), lockup);
await sharp(Buffer.from(lockup)).png().toFile(join(brandDir, "chancesr-lockup.png"));

// ---- Profile picture -----------------------------------------------------------
const profile = `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1080" viewBox="-6 -6 76 76"><defs>${BRASS}${FACE}</defs><rect x="-6" y="-6" width="76" height="76" fill="#17100a"/>${badge()}</svg>`;
await sharp(Buffer.from(profile)).png().toFile(join(brandDir, "chancesr-profile.png"));

// ---- Share card (1200×630): copy left, the hero painting right -----------------
const W = 1200;
const H = 630;
// Feather the painting's edges per pixel (librsvg won't composite SVG masks): horizontal × vertical alpha ramps.
const PW = 720;
const PH = 550;
const smooth = (t: number) => t * t * (3 - 2 * t);
const ramp = (t: number, inEnd: number, outStart: number) =>
  t < inEnd ? smooth(t / inEnd) : t > outStart ? smooth((1 - t) / (1 - outStart)) : 1;
const { data: rgb } = await sharp(join(root, "assets-src", "hero-plate-og.png"))
  .resize(PW, PH, { fit: "cover" })
  .removeAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });
const rgba = Buffer.alloc(PW * PH * 4);
for (let y = 0; y < PH; y++) {
  const ay = ramp(y / (PH - 1), 0.12, 0.86);
  for (let x = 0; x < PW; x++) {
    const i = y * PW + x;
    rgba[i * 4] = rgb[i * 3];
    rgba[i * 4 + 1] = rgb[i * 3 + 1];
    rgba[i * 4 + 2] = rgb[i * 3 + 2];
    rgba[i * 4 + 3] = Math.round(255 * ay * ramp(x / (PW - 1), 0.4, 0.94));
  }
}
const painting = (await sharp(rgba, { raw: { width: PW, height: PH, channels: 4 } }).png().toBuffer()).toString("base64");
const kicker = outline(sans, "EST. 1932 · YORK, NEBRASKA", 72, 214, 15, 4.5);
const l1 = outline(serif, "Supper, the way", 70, 296, 58, -1.1);
const l2 = outline(serifItalic, "York remembers it.", 70, 364, 58, -1.1);
const line = outline(sans, "PRIME RIB YOU CAN CUT", 72, 424, 13, 3.4);
const line2 = outline(sans, "WITH A BUTTER KNIFE", 72, 446, 13, 3.4);
const phone = outline(sans, "(402) 362-7755", 72, 524, 28, 1.2);
const name = outline(serif, "Chances", 136, 122, 30);
const nameR = outline(serifItalic, "“R”", 136 + name.width + 8, 122, 30);
const og = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>${BRASS}${FACE}
    <linearGradient id="wood" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1f150c"/><stop offset="1" stop-color="#110b06"/></linearGradient>
    <radialGradient id="lamp" cx="0.72" cy="0.45" r="0.6"><stop offset="0" stop-color="#e8bb63" stop-opacity="0.16"/><stop offset="1" stop-color="#e8bb63" stop-opacity="0"/></radialGradient>
    <linearGradient id="b2" gradientUnits="userSpaceOnUse" x1="0" y1="320" x2="0" y2="390"><stop offset="0" stop-color="#f3cd80"/><stop offset="0.6" stop-color="#c9963c"/><stop offset="1" stop-color="#9c7026"/></linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#wood)"/>
  <rect width="${W}" height="${H}" fill="url(#lamp)"/>
  <image x="${W - PW}" y="${(H - PH) / 2}" width="${PW}" height="${PH}" xlink:href="data:image/png;base64,${painting}" href="data:image/png;base64,${painting}"/>
  <g transform="translate(66 74) scale(0.95)">${badge()}</g>
  <path d="${name.d}" fill="#f5ead6"/><path d="${nameR.d}" fill="#e8bb63"/>
  <path d="${kicker.d}" fill="#c9963c"/>
  <path d="${l1.d}" fill="#f5ead6"/>
  <path d="${l2.d}" fill="url(#b2)"/>
  <path d="${line.d}${line2.d}" fill="#b7a284"/>
  <rect x="72" y="476" width="60" height="1.5" fill="#c9963c" opacity="0.7"/>
  <path d="${phone.d}" fill="#e8bb63"/>
</svg>`;
await sharp(Buffer.from(og)).png().toFile(join(root, "public", "og-image.png"));

console.log(`brand assets -> src/app/icon.svg, src/app/apple-icon.png, public/og-image.png, public/brand (lockup ${LW}×64)`);
