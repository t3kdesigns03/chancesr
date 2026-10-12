import { site } from "@/lib/site";
import NavLink from "./NavLink";
import { OpenText } from "./OpenStatus";
import { CallButton, PinIcon, Stars } from "./ui";

// Lamp glints floating in the dark behind the copy, like the bokeh in the painting.
const LIGHTS = [
  { l: "1%", t: "6%", s: 110, o: 0.22 },
  { l: "30%", t: "4%", s: 50, o: 0.3 },
  { l: "36%", t: "90%", s: 90, o: 0.16 },
  { l: "-2%", t: "70%", s: 140, o: 0.12 },
];

/**
 * Header hero: the painted prime-rib plate. Desktop runs it off the right edge with the copy on the
 * left; phones lead with it full-bleed and lift the headline up onto its faded bottom edge.
 */
export default function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="grain relative isolate overflow-hidden bg-walnut-900">
      {/* Warm room behind everything */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_60%_at_70%_45%,rgb(201_150_60/0.16),transparent_70%),linear-gradient(180deg,#1c140c,#120c07)]" />
      {LIGHTS.map((b, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="flicker pointer-events-none absolute -z-10 rounded-full bg-[radial-gradient(closest-side,#ffc56a,transparent)] blur-md max-lg:hidden"
          style={{ left: b.l, top: b.t, width: b.s, height: b.s, opacity: b.o, animationDelay: `${i * 0.8}s` }}
        />
      ))}

      {/* The painting */}
      <div className="relative lg:absolute lg:right-0 lg:top-1/2 lg:aspect-[11/8.2] lg:w-[60%] lg:max-w-[64rem] lg:-translate-y-1/2 xl:w-[58%]">
        <div className="hero-art relative h-full max-lg:aspect-[11/8.2] max-lg:max-h-[30rem] max-lg:w-full">
          <picture>
            <source media="(min-width: 1024px)" srcSet="/images/hero-plate-1600.webp" />
            <img
              src="/images/hero-plate-900.webp"
              alt="Painting of a slice of prime rib on a dark plate with mashed potatoes, roasted carrots and au jus"
              width={900}
              height={687}
              fetchPriority="high"
              className="hero-zoom h-full w-full object-cover object-[50%_45%]"
            />
          </picture>
          {/* Steam off the slice */}
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="pointer-events-none absolute left-[30%] top-[6%] h-[42%] w-[30%] blur-[4px] lg:left-[26%] lg:top-[12%]" aria-hidden="true">
            <g className="steam" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" opacity="0.28">
              <path d="M 30 95 C 18 70 42 58 30 36 C 22 20 36 10 32 0" />
              <path d="M 55 98 C 44 74 66 60 55 38 C 47 22 62 12 58 2" />
              <path d="M 78 95 C 68 72 88 60 78 40 C 70 26 84 14 80 4" />
            </g>
          </svg>
        </div>
        {/* Deco frame corners, drawn in brass over the painting */}
        <DecoCorners className="pointer-events-none absolute inset-y-[4%] left-[14%] right-[6%] max-lg:hidden" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-4 sm:px-6 lg:flex lg:min-h-[min(calc(100svh-4.5rem),50rem)] lg:items-center lg:px-8">
        <div className="relative max-w-[37rem] pb-10 max-lg:-mt-20 max-lg:mx-auto max-lg:text-center max-sm:-mt-14 lg:py-16">
          <p className="label text-brass-bright max-sm:text-[0.58rem]">
            <span className="max-sm:hidden">Steakhouse <Dot /> Supper club <Dot /> </span>Est. {site.founded} <Dot /> York, Nebraska
          </p>
          <h1 id="hero-title" className="display mt-4 text-[2.4rem] text-cream min-[400px]:text-[2.7rem] drop-shadow-[0_4px_24px_rgb(0_0_0/0.6)] sm:text-6xl lg:text-[4.6rem] xl:text-[5rem]">
            Supper, the way <em className="brass-text pr-1">York remembers&nbsp;it.</em>
          </h1>
          <p className="display mt-5 text-[1.35rem] leading-snug text-linen max-sm:mt-4 max-sm:text-lg">
            Prime rib you can cut with a butter knife. Pan-fried chicken. The Hobnob Lounge. Downtown since {site.founded}.
          </p>
          <p className="mt-4 text-[1.02rem] leading-relaxed text-tan max-lg:hidden">
            Family-run, three generations on. After-church brunch, service-club lunches, prime-rib anniversaries, and the
            I-80 travelers whose GPS sends them downtown. Bryan carves. Renee bakes.
          </p>

          <div className="mt-8 flex flex-wrap gap-3 max-lg:justify-center max-sm:mt-6 max-sm:flex-col max-sm:items-stretch">
            <CallButton size="lg" />
            <NavLink href="#plate" className="deco-clip tap inline-flex bg-brass/70 p-px hover:bg-brass">
              <span className="deco-clip inline-flex min-h-[3.4rem] w-full items-center justify-center gap-2 bg-walnut-900 px-6 text-lg font-semibold text-cream max-sm:min-h-13 max-sm:text-base">
                Build your plate
                <svg viewBox="0 0 20 20" className="h-4 w-4 text-brass-bright" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <path d="M10 4v12M5 11l5 5 5-5" />
                </svg>
              </span>
            </NavLink>
          </div>

          {/* Divider + the real details, not "valet parking" */}
          <div aria-hidden="true" className="mt-9 flex items-center gap-3 text-brass max-sm:mt-7">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-brass/50 lg:from-brass/50" />
            <span className="flex gap-1.5">
              <i className="block h-1.5 w-1.5 rotate-45 bg-brass/60" />
              <i className="block h-1.5 w-1.5 rotate-45 bg-brass" />
              <i className="block h-1.5 w-1.5 rotate-45 bg-brass/60" />
            </span>
            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-brass/50" />
          </div>
          <ul className="label mt-4 flex flex-wrap gap-x-5 gap-y-2.5 text-[0.62rem] text-linen max-lg:justify-center">
            <li className="flex items-center gap-2">
              <OpenText />
            </li>
            <li>
              <a href={site.maps.directions} target="_blank" rel="noopener" className="flex items-center gap-1.5 hover:text-brass-bright">
                <PinIcon className="h-3.5 w-3.5 text-brass" />
                {site.address.street}, downtown York
              </a>
            </li>
            <li className="flex items-center gap-1.5">
              <Stars score={4.3} className="text-[0.8rem] text-brass-bright" />
              {site.rating.google.score} · {site.rating.google.count} Google reviews
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

function Dot() {
  return <span className="mx-1 text-brass/50">·</span>;
}

/** Brass corner brackets with a stepped deco notch, matching the frame painted into the art. */
function DecoCorners({ className = "" }: { className?: string }) {
  const corner = "M 0 46 V 0 H 46 M 8 30 V 8 H 30 M 0 0 L 14 14";
  return (
    <div className={className} aria-hidden="true">
      {/* Left side only: the painting carries its own brass corners on the right. */}
      {["left-0 top-0", "bottom-0 left-0 -scale-y-100"].map((pos) => (
        <svg key={pos} viewBox="0 0 48 48" className={`absolute h-14 w-14 ${pos}`}>
          <path d={corner} fill="none" stroke="#c9963c" strokeWidth="1.2" strokeOpacity="0.85" />
          <path d="M 18 4 h 6 M 4 18 v 6" stroke="#e8bb63" strokeWidth="1.2" />
        </svg>
      ))}
    </div>
  );
}
