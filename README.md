# Chances "R" Restaurant & Lounge: v1 preview

Proposed site for Chances "R", 124 W 5th St, York, NE. Next.js 16 static export + Tailwind 4, deployed on Netlify.
Preview: https://chancesr.t3kdesigns.app

```bash
npm run dev     # http://localhost:3000
npm run build   # static site in ./out (Netlify publishes this)
```

## Where things live

- `src/lib/site.ts`: every business fact (address, phone, hours, ratings, review quotes, upcoming buffet dates, menu
  PDF links) plus the Build Your Plate options (cuts, doneness colors, sides). Edit copy here. Past buffet dates hide
  themselves; when the list runs dry the site says "call for the next one".
- `src/lib/menu.ts`: the full menu (lunch & dinner, breakfast, Hob-Nob Lounge, to-go, brunch), transcribed exactly
  from their printed PDFs (May/June 2026). `/menu` (`src/app/menu/page.tsx` + `src/components/MenuBoard.tsx`) shows it on
  cream "menu paper" with their red, the blackletter wordmark and Rye headings. Update prices here when the menu changes.
- `src/components/Hero.tsx`: the header hero, built around the painted prime-rib plate. Desktop runs the painting off
  the right edge with the copy on the left; phones lead with it full-bleed and lift the headline onto its faded edge.
- `src/components/PlateBuilder.tsx`: the "Build Your Plate" section right under the hero. Desktop puts the plate
  between two menu cards; phones get the plate, then one step at a time behind numbered tabs.
- `src/components/PlateArt.tsx`: the builder's plate, hand-drawn SVG. The slice's cooked band and center color follow
  doneness; it's drawn twice (top/bottom halves) so the butter knife can actually separate it. Steam is a separate
  overlay SVG on purpose (animating it inside the plate would repaint the noise-textured meat every frame).
- `src/components/Story.tsx` (01, with the matchbook), `Food.tsx` (02, with "R" Buffets dates and menu links),
  `Rooms.tsx` (03, with the dining room illustration), `Visit.tsx` (trust block + hours/visit).
- Photos: `npm run photos` grades the restaurant's own photos (scraped from chancesryork.com into gitignored
  `assets-src/scrape/photos`) with one warm low-light treatment, cuts close-ups from the painting, and sizes the menu
  cover. Output in `public/images/photos`; `src/components/Photo.tsx` serves them.
- The hero painting `npm run hero` cuts it from the approved mockup
  (`assets-src/hero-mockup.webp`, gitignored because the mockup has placeholder text baked in, like "Omaha").
  Everything else is drawn in code.

## Brand assets

```bash
npm run hero    # painting -> public/images/hero-plate-{1600,1200,900}.webp (+ a copy for the share card)
npm run photos  # their photos + painting close-ups + menu cover -> public/images/photos
npm run brand   # favicon, share card, lockups (run hero first)
```

`brand` regenerates `src/app/icon.svg`, `src/app/apple-icon.png`, `public/og-image.png` (1200x630 share card with the
painting) and `public/brand/chancesr-lockup.svg/.png` + `chancesr-profile.png` (1080x1080 for Facebook/Google). Text
is outlined, so no fonts are needed. The header crest (`DecoCrest`, with the crown from the hanging sign out front)
and badge (`BrandMark`) live in `src/components/BrandMark.tsx`.

## Mobile vs desktop

Phone/tablet-only behavior uses `max-lg:` / `max-sm:` variants. Phones get: the painting full-bleed up top, a compact
header with the badge + Call, a jump bar with a sliding brass pill, the stepped plate builder, and swipe rows for the
food and room cards. Motion respects `prefers-reduced-motion`.

## Go-live checklist

1. **Flip `site.spec` to `false`** in `src/lib/site.ts`. That one switch drops the `noindex, nofollow` robots tag and
   removes the "Proposed site by T3KDesigns" footer credit.
2. **Re-check numbers** in `site.rating` against Google and TripAdvisor (Oct 2026: 4.3 from 320+, #1 of 33 with 440+).
3. **Confirm with Bryan & Renee:** upcoming buffet dates (`buffets` in site.ts, from their "R" Buffets page, Oct 2026)
   and that `src/lib/menu.ts` still matches the printed menu.
4. **Printable PDFs** still link to their current Squarespace site (`site.menus`). Copy them over before that site goes away.
5. **Web address:** point their own address at the Netlify site and set `SITE_URL` (or let Netlify's `URL` do it).

## Deploying

Netlify site `chancesr`, connected to `github.com/t3kdesigns03/chancesr` (branch `main`). Pushing to `main` deploys.
Custom address `chancesr.t3kdesigns.app`: DNS for t3kdesigns.app is at Porkbun, which needs a CNAME
`chancesr -> chancesr.netlify.app`.
