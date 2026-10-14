// The red-and-white spot illustrations from inside their printed menu, written by scripts/build-photos.mjs.
// [width, height] of each file on disk; they're shown at their own size or smaller.
const ART = {
  burger: [210, 193],
  chicken: [222, 179],
  mug: [163, 266],
  pasta: [222, 129],
  pastries: [184, 145],
  ribs: [290, 237],
  salad: [159, 159],
  seafood: [362, 372],
  "shrimp-cocktail": [190, 183],
  sides: [230, 180],
  steak: [183, 184],
} as const;

export type ArtName = keyof typeof ART;

/** One of the menu's own drawings. Decorative: the heading or card next to it already says what it is. */
export default function MenuArt({ name, className = "" }: { name: ArtName; className?: string }) {
  const [w, h] = ART[name];
  return (
    // eslint-disable-next-line @next/next/no-img-element -- static export; files pre-cut by scripts/build-photos.mjs
    <img src={`/images/art/${name}.webp`} width={w} height={h} alt="" aria-hidden="true" loading="lazy" decoding="async" className={className} />
  );
}
