// Builds the static brand assets from the same badge the live header draws (BrandMark.tsx).
// Run: npm run brand
//
//   src/app/icon.svg                     favicon (Next serves it automatically)
//   src/app/apple-icon.png               180×180 home-screen icon
//   public/og-image.png                  1200×630 share card for texts and Facebook
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

/** Text as outlined path data, with letter-spacing. align: 0 = left, 0.5 = center. */
function outline(font: opentype.Font, text: string, x: number, y: number, size: number, tracking = 0, align = 0) {
  const adv = (ch: string) => ((font.charToGlyph(ch).advanceWidth ?? 0) * size) / font.unitsPerEm;
  const width = [...text].reduce((w, ch) => w + adv(ch) + tracking, -tracking);
  let cx = x - width * align;
  let d = "";
  for (const ch of text) {
    d += font.charToGlyph(ch).getPath(cx, y, size).toPathData(2);
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

// ---- Share card (1200×630) -------------------------------------------------------
const W = 1200;
const H = 630;
const kicker = outline(sans, "SINCE 1932 · DOWNTOWN YORK, NEBRASKA", W / 2, 236, 17, 5, 0.5);
const l1 = outline(serif, "Supper, the way", W / 2, 330, 86, -1.5, 0.5);
const l2 = outline(serifItalic, "York remembers it.", W / 2, 428, 86, -1.5, 0.5);
const line = outline(sans, "PRIME RIB YOU CAN CUT WITH A BUTTER KNIFE", W / 2, 498, 16, 4, 0.5);
const phone = outline(sans, "(402) 362-7755", W / 2, 560, 26, 1.5, 0.5);
const og = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>${BRASS}${FACE}
    <radialGradient id="lamp" cx="0.5" cy="0.3" r="0.6"><stop offset="0" stop-color="#e8bb63" stop-opacity="0.28"/><stop offset="1" stop-color="#e8bb63" stop-opacity="0"/></radialGradient>
    <linearGradient id="wood" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#24180e"/><stop offset="1" stop-color="#120c07"/></linearGradient>
    <pattern id="grain" width="26" height="${H}" patternUnits="userSpaceOnUse"><rect width="3" height="${H}" x="4" fill="#000" opacity="0.16"/><rect width="2" height="${H}" x="15" fill="#ffdcaa" opacity="0.025"/></pattern>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#wood)"/>
  <rect width="${W}" height="${H}" fill="url(#grain)"/>
  <rect width="${W}" height="${H}" fill="url(#lamp)"/>
  <rect x="24" y="24" width="${W - 48}" height="${H - 48}" fill="none" stroke="#c9963c" stroke-opacity="0.45" stroke-width="2"/>
  <g transform="translate(${W / 2 - 56} 62) scale(1.75)">${badge()}</g>
  <path d="${kicker.d}" fill="#c9963c"/>
  <path d="${l1.d}" fill="#f5ead6"/>
  <path d="${l2.d}" fill="url(#b)"/>
  <path d="${line.d}" fill="#b7a284"/>
  <path d="${phone.d}" fill="#e8bb63"/>
</svg>`;
// The gradient on the italic line spans one glyph box per path; give it a tall userSpace version instead.
const ogFixed = og.replace(
  `<path d="${l2.d}" fill="url(#b)"/>`,
  `<linearGradient id="b2" gradientUnits="userSpaceOnUse" x1="0" y1="360" x2="0" y2="440"><stop offset="0" stop-color="#f3cd80"/><stop offset="0.6" stop-color="#c9963c"/><stop offset="1" stop-color="#9c7026"/></linearGradient><path d="${l2.d}" fill="url(#b2)"/>`,
);
await sharp(Buffer.from(ogFixed)).png().toFile(join(root, "public", "og-image.png"));

console.log(`brand assets -> src/app/icon.svg, src/app/apple-icon.png, public/og-image.png, public/brand (lockup ${LW}×64)`);
