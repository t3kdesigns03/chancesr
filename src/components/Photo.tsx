// Graded photos written by scripts/build-photos.mjs: [width, height] for each size on disk.
const PHOTOS = {
  bar: [[800, 608], [1600, 1216]],
  buffet: [[700, 377], [1200, 647]],
  cake: [[600, 566], [900, 849]],
  hobnob: [[700, 525], [1200, 900]],
  mash: [[600, 451]],
  "menu-cover": [[520, 884], [900, 1530]],
  private: [[700, 420], [1200, 720]],
  rib: [[600, 450], [900, 675]],
  sign: [[600, 589], [1000, 982]],
} as const;

export type PhotoName = keyof typeof PHOTOS;

/** Lazy, responsive <img> for one of the graded photos. `sizes` says how wide it shows. */
export default function Photo({
  name,
  alt,
  sizes,
  className = "",
  priority = false,
}: {
  priority?: boolean;
  name: PhotoName;
  alt: string;
  sizes: string;
  className?: string;
}) {
  const set = PHOTOS[name];
  const [w, h] = set[0];
  return (
    // eslint-disable-next-line @next/next/no-img-element -- static export; sizes pre-cut by scripts/build-photos.mjs
    <img
      src={`/images/photos/${name}-${w}.webp`}
      srcSet={set.map(([sw]) => `/images/photos/${name}-${sw}.webp ${sw}w`).join(", ")}
      sizes={sizes}
      width={w}
      height={h}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      className={className}
    />
  );
}
