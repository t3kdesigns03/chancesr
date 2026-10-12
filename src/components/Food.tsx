import { quotes, site } from "@/lib/site";
import { Container, SectionLabel, SectionTitle } from "./ui";
import UpcomingBuffets from "./UpcomingBuffets";

type Dish = { art: "rib" | "chicken" | "mash" | "pie"; name: string; line: string; quote: string };

const dishes: Dish[] = [
  { art: "rib", name: "Prime rib", line: "The butter-knife cut, with au jus ladled on.", quote: `“${quotes.bestInState}”` },
  { art: "chicken", name: "Pan-fried chicken", line: "The famous one. Regulars order it all white meat.", quote: `“${quotes.chicken}”` },
  { art: "mash", name: "Real mashed potatoes", line: "Real potatoes. Not instant. A point of pride, and we'll keep saying it.", quote: "" },
  { art: "pie", name: "Pastries & desserts", line: "Homemade. Renee bakes. Save room for the dessert tray.", quote: `The dessert tray: “${quotes.dessert}.”` },
];

export default function Food() {
  return (
    <section id="food" aria-labelledby="food-title" className="relative border-t border-brass/10 bg-walnut-950 py-24 max-lg:py-14">
      <Container>
        <SectionLabel n="02">The food</SectionLabel>
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
          <SectionTitle id="food-title">
            Cut it with a <em className="brass-text">butter knife.</em>
          </SectionTitle>
          <p data-reveal="" className="max-w-sm text-linen max-sm:text-sm">
            Steakhouse supper the way it&rsquo;s been done downtown since {site.founded}. Here&rsquo;s what people drive in for.
          </p>
        </div>

        {/* Phones: swipe sideways instead of scrolling down through four cards */}
        <ul className="swipe mt-10 grid gap-4 max-sm:-mx-4 max-sm:mt-6 max-sm:flex max-sm:overflow-x-auto max-sm:px-4 sm:grid-cols-2 lg:grid-cols-4">
          {dishes.map((d) => (
            <li key={d.name} data-reveal="" className="card flex flex-col rounded-3xl p-5 max-sm:w-[78%] max-sm:shrink-0">
              <div className="tabletop -mx-1 -mt-1 grid aspect-[4/3] place-items-center overflow-hidden rounded-2xl">
                <FoodArt kind={d.art} />
              </div>
              <h3 className="display mt-5 text-2xl text-cream">{d.name}</h3>
              <p className="mb-4 mt-2 text-sm text-linen">{d.line}</p>
              {d.quote && (
                <blockquote className="mt-auto border-t border-brass/15 pt-4 text-sm italic text-tan">{d.quote}</blockquote>
              )}
            </li>
          ))}
        </ul>
        <p className="mt-3 text-center text-xs text-tan/70 sm:hidden" aria-hidden="true">
          Swipe for more →
        </p>

        {/* "R" Buffets: the real upcoming dates, plus the real menus */}
        <div data-reveal="" className="relative mt-6 grid gap-6 overflow-hidden rounded-3xl border border-brass/40 bg-gradient-to-br from-oxblood/45 via-walnut-900 to-walnut-900 p-7 max-sm:p-5 md:grid-cols-[0.9fr_1.1fr] md:gap-10">
          <div>
            <p className="label text-brass-bright">&ldquo;R&rdquo; Buffets</p>
            <p className="display mt-2 text-4xl text-cream max-sm:text-3xl">
              Prime rib buffet <em className="brass-text">&amp; Sunday brunch</em>
            </p>
            <p className="mt-3 italic text-linen">&ldquo;{quotes.buffet}&rdquo;</p>
            <p className="mt-4 text-linen max-sm:text-sm">
              Reservations highly suggested.{" "}
              <a href={site.phone.href} className="font-semibold text-brass-bright underline decoration-brass/40 underline-offset-4 hover:decoration-brass">
                Call {site.phone.display}.
              </a>
            </p>
          </div>
          <div>
            <p className="label text-tan">Coming up</p>
            <UpcomingBuffets />
          </div>
        </div>

        <div data-reveal="" className="mt-4 flex flex-wrap items-center justify-center gap-3 text-sm max-sm:flex-col max-sm:items-stretch">
          <MenuLink href={site.menus.main}>The full menu</MenuLink>
          <MenuLink href={site.menus.breakfast}>Breakfast menu</MenuLink>
        </div>
      </Container>
    </section>
  );
}

function MenuLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener" className="deco-clip tap inline-flex bg-brass/50 p-px hover:bg-brass">
      <span className="deco-clip inline-flex min-h-12 w-full items-center justify-center gap-2 bg-walnut-950 px-6 font-semibold text-cream">
        {children}
        <span className="label text-[0.55rem] text-brass">PDF</span>
      </span>
    </a>
  );
}

/** Small illustrated plates, drawn here. No stock photos. */
function FoodArt({ kind }: { kind: Dish["art"] }) {
  return (
    <svg viewBox="0 0 200 150" className="h-full w-full" aria-hidden="true">
      <defs>
        <radialGradient id={`fa-plate-${kind}`} cx="0.42" cy="0.38" r="0.7">
          <stop offset="0" stopColor="#fdf7ea" />
          <stop offset="1" stopColor="#dccbab" />
        </radialGradient>
        <filter id={`fa-sh-${kind}`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="2" dy="6" stdDeviation="6" floodColor="#000" floodOpacity="0.55" />
        </filter>
      </defs>
      <g filter={`url(#fa-sh-${kind})`}>
        <ellipse cx="100" cy="78" rx="78" ry="58" fill={`url(#fa-plate-${kind})`} />
        <ellipse cx="100" cy="78" rx="71" ry="52" fill="none" stroke="#c9963c" strokeWidth="1.5" />
        <ellipse cx="100" cy="78" rx="56" ry="40" fill="#f5ecda" />
      </g>
      {kind === "rib" && (
        <g transform="translate(100 78) scale(0.42 0.34)">
          <path d="M -128 -4 C -132 -66 -66 -104 4 -102 C 74 -100 128 -60 130 -6 C 132 54 86 108 10 110 C -62 112 -124 66 -128 -4 Z" fill="#6a2a0e" opacity="0.9" />
          <path d="M -105 -8 C -109 -58 -62 -88 -6 -87 C 46 -86 93 -70 109 -30 C 121 4 109 54 71 76 C 35 93 -21 91 -61 77 C -96 63 -103 32 -105 -8 Z" fill="#6e3417" />
          <path transform="scale(0.93)" d="M -105 -8 C -109 -58 -62 -88 -6 -87 C 46 -86 93 -70 109 -30 C 121 4 109 54 71 76 C 35 93 -21 91 -61 77 C -96 63 -103 32 -105 -8 Z" fill="#93503f" />
          <path transform="translate(0 8) scale(0.8)" d="M -105 -8 C -109 -58 -62 -88 -6 -87 C 46 -86 93 -70 109 -30 C 121 4 109 54 71 76 C 35 93 -21 91 -61 77 C -96 63 -103 32 -105 -8 Z" fill="#bf3346" />
          <path d="M -82 -60 C -44 -86 40 -90 101 -48 C 98 -42 94 -38 90 -35 C 42 -70 -32 -73 -72 -50 Z" fill="#efd9ad" />
          <path d="M -88 -36 C -40 -60 38 -62 96 -24" fill="none" stroke="#ecd7ab" strokeWidth="4" opacity="0.7" />
        </g>
      )}
      {kind === "chicken" && (
        <g>
          <path d="M 62 86 C 56 66 70 50 92 52 C 110 50 124 62 120 80 C 118 96 100 104 84 102 C 72 100 64 96 62 86 Z" fill="#b8742c" />
          <path d="M 98 70 C 104 56 126 50 140 60 C 150 68 148 86 136 92 C 122 98 104 92 98 82 Z" fill="#c98a3a" />
          {[[72, 70], [86, 62], [100, 84], [80, 90], [112, 66], [128, 62], [138, 78], [120, 86], [92, 76], [70, 84]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={2.6 + (i % 3)} fill={i % 2 ? "#e0a659" : "#8f5320"} opacity="0.85" />
          ))}
          <path d="M 76 60 C 86 56 98 56 106 60" fill="none" stroke="#f3c77e" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
          <path d="M 116 60 C 124 56 134 58 140 64" fill="none" stroke="#f3c77e" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
        </g>
      )}
      {kind === "mash" && (
        <g>
          <path d="M 58 82 C 54 62 72 46 92 46 C 104 36 128 42 134 56 C 148 62 148 84 138 92 C 132 104 110 108 96 104 C 76 108 58 98 58 82 Z" fill="#f6ecd6" />
          <path d="M 72 74 C 84 60 106 58 118 70" fill="none" stroke="#dcc79f" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 76 92 C 90 82 112 84 126 94" fill="none" stroke="#dcc79f" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 92 52 C 102 48 114 50 120 56" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
          <circle cx="70" cy="84" r="3.5" fill="#e8d8b5" />
          <circle cx="126" cy="80" r="3" fill="#e8d8b5" />
          <ellipse cx="100" cy="72" rx="15" ry="8" fill="#f4cf55" opacity="0.55" />
          <rect x="91" y="62" width="18" height="13" rx="3" transform="rotate(10 100 68)" fill="#f8db78" stroke="#e0b94a" />
          <circle cx="82" cy="66" r="1.2" fill="#3b2a1a" />
          <circle cx="116" cy="90" r="1.2" fill="#3b2a1a" />
        </g>
      )}
      {kind === "pie" && (
        <g>
          <path d="M 58 94 L 126 50 C 140 62 146 78 144 96 Z" fill="#c4874a" />
          <path d="M 62 92 L 126 54 C 138 64 142 78 140 92 Z" fill="#8e2f3a" />
          <path d="M 58 94 L 144 96 L 144 104 L 58 102 Z" fill="#d79b55" />
          <path d="M 126 50 C 140 62 146 78 144 96" fill="none" stroke="#e6b06b" strokeWidth="7" strokeLinecap="round" />
          <path d="M 84 80 L 128 64 M 96 86 L 136 76 M 100 64 L 120 92 M 116 58 L 134 90" stroke="#e2a965" strokeWidth="4" strokeLinecap="round" opacity="0.9" />
          <path d="M 60 112 C 70 104 84 104 90 112 C 84 118 68 120 60 112 Z" fill="#fffaf0" />
          <circle cx="72" cy="108" r="2" fill="#fff" />
        </g>
      )}
    </svg>
  );
}
