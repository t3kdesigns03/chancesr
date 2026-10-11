import { site } from "@/lib/site";
import { Container, SectionLabel, SectionTitle } from "./ui";

const beats = [
  { k: "1932", t: `${site.founders.him} & ${site.founders.her} open the doors downtown. He names it after his odds.` },
  { k: "Since", t: "After-church brunch lines. Service-club lunches. Prime-rib anniversaries." },
  { k: "Today", t: `Three generations on, ${site.hosts} run the room. Bryan carves. Renee bakes.` },
];

export default function Story() {
  return (
    <section id="story" aria-labelledby="story-title" className="grain relative overflow-hidden border-t border-brass/10 bg-walnut-900 py-24 max-lg:py-14">
      <Container className="grid items-center gap-12 max-sm:gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <SectionLabel n="01">The story</SectionLabel>
          <SectionTitle id="story-title">
            &ldquo;Chances are <em className="brass-text">we&rsquo;ll go broke.&rdquo;</em>
          </SectionTitle>
          <p data-reveal="" className="mt-6 max-w-xl text-lg text-linen max-sm:mt-4 max-sm:text-base">
            1932, bottom of the Depression. {site.founders.him} opened a restaurant in downtown York anyway, and told his
            wife {site.founders.her} exactly what he thought of the odds. The name stuck. So did the restaurant.
          </p>

          <ol className="mt-10 border-l border-brass/25 max-sm:mt-6">
            {beats.map((b) => (
              <li key={b.k} data-reveal="" className="relative pb-7 pl-7 last:pb-0 max-sm:pb-5 max-sm:pl-5">
                <span aria-hidden="true" className="absolute -left-[5px] top-2 h-[9px] w-[9px] rounded-full bg-brass shadow-[0_0_12px_rgb(232_187_99/0.7)]" />
                <p className="label text-brass">{b.k}</p>
                <p className="mt-1 text-linen max-sm:text-[0.95rem]">{b.t}</p>
              </li>
            ))}
          </ol>
        </div>

        <div data-reveal="" className="relative mx-auto w-full max-w-sm max-lg:max-w-[17rem] max-sm:hidden">
          <Matchbook />
        </div>
      </Container>

      {/* Hosts: a person at the door, not a nav bar */}
      <Container className="mt-16 max-sm:mt-8">
        <div data-reveal="" className="card flex flex-col items-center gap-5 rounded-3xl p-6 text-center sm:flex-row sm:p-8 sm:text-left">
          <div className="flex shrink-0 -space-x-3" aria-hidden="true">
            <Monogram letter="B" />
            <Monogram letter="R" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="label text-brass">Your hosts</p>
            <p className="display mt-1 text-3xl text-cream sm:text-4xl">
              Bryan carves. <em className="brass-text">Renee bakes.</em>
            </p>
            <p className="mt-2 text-tan max-sm:text-sm">
              {site.hosts}. The hands behind the prime rib and the dessert tray.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Monogram({ letter }: { letter: string }) {
  return (
    <span className="grid h-16 w-16 place-items-center rounded-full border-2 border-brass bg-walnut-950 shadow-[0_8px_24px_-8px_rgb(0_0_0/0.8)] ring-4 ring-walnut-900">
      <span className="display brass-text text-3xl italic">{letter}</span>
    </span>
  );
}

/** A Chances "R" matchbook with one match lit beside it. Illustration, not a historical artifact. */
function Matchbook() {
  return (
    <svg viewBox="0 0 360 440" className="h-auto w-full" role="img" aria-label="Illustrated Chances R matchbook, est. 1932, with a lit match">
      <defs>
        <linearGradient id="mb-cover" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#9b2f30" />
          <stop offset="1" stopColor="#5c1718" />
        </linearGradient>
        <linearGradient id="mb-brass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f3cd80" />
          <stop offset="0.6" stopColor="#c9963c" />
          <stop offset="1" stopColor="#9c7026" />
        </linearGradient>
        <radialGradient id="mb-flame" cx="0.5" cy="0.7" r="0.6">
          <stop offset="0" stopColor="#fff6d0" />
          <stop offset="0.45" stopColor="#ffc24a" />
          <stop offset="1" stopColor="#e2551c" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="mb-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ffbe55" stopOpacity="0.45" />
          <stop offset="1" stopColor="#ffbe55" stopOpacity="0" />
        </radialGradient>
        <filter id="mb-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="6" dy="14" stdDeviation="12" floodColor="#000" floodOpacity="0.6" />
        </filter>
      </defs>

      <circle cx="292" cy="98" r="120" fill="url(#mb-glow)" className="flicker" style={{ transformOrigin: "292px 98px" }} />

      <g transform="rotate(-6 150 230)" filter="url(#mb-shadow)">
        <rect x="40" y="50" width="230" height="330" rx="10" fill="url(#mb-cover)" />
        {/* tucked flap + striker */}
        <rect x="40" y="318" width="230" height="62" rx="8" fill="#6e1c1d" />
        <rect x="40" y="318" width="230" height="3" fill="#000" opacity="0.25" />
        <rect x="56" y="336" width="198" height="22" rx="3" fill="#3a2418" />
        <rect x="56" y="336" width="198" height="22" rx="3" fill="url(#mb-brass)" opacity="0.12" />
        {/* cover print */}
        <rect x="56" y="66" width="198" height="238" rx="5" fill="none" stroke="url(#mb-brass)" strokeWidth="2" />
        <rect x="62" y="72" width="186" height="226" rx="3" fill="none" stroke="#c9963c" strokeOpacity="0.5" strokeWidth="0.8" />
        <text x="155" y="102" textAnchor="middle" fontFamily="var(--font-hanken), sans-serif" fontWeight="700" fontSize="11" letterSpacing="4" fill="#e8dbc2">
          EST. 1932
        </text>
        <text x="155" y="150" textAnchor="middle" fontFamily="var(--font-fraunces), Georgia, serif" fontSize="40" fill="#f5ead6">
          Chances
        </text>
        <text x="157" y="238" textAnchor="middle" fontFamily="var(--font-fraunces), Georgia, serif" fontStyle="italic" fontWeight="600" fontSize="96" fill="url(#mb-brass)">
          &ldquo;R&rdquo;
        </text>
        <path d="M 100 258 L 210 258" stroke="#c9963c" strokeOpacity="0.6" />
        <text x="155" y="277" textAnchor="middle" fontFamily="var(--font-hanken), sans-serif" fontWeight="700" fontSize="9" letterSpacing="3" fill="#e8dbc2">
          RESTAURANT &amp; LOUNGE
        </text>
        <text x="155" y="292" textAnchor="middle" fontFamily="var(--font-hanken), sans-serif" fontWeight="600" fontSize="8" letterSpacing="3" fill="#c9963c">
          YORK · NEBRASKA
        </text>
      </g>

      {/* the lit match */}
      <g transform="rotate(14 290 260)">
        <rect x="286" y="120" width="8" height="250" rx="2" fill="#e5c58d" />
        <rect x="286" y="120" width="3" height="250" fill="#fff" opacity="0.25" />
        <ellipse cx="290" cy="122" rx="8" ry="11" fill="#4a1a12" />
        <ellipse cx="290" cy="128" rx="7" ry="6" fill="#a8262a" />
        <g className="flicker" style={{ transformOrigin: "290px 118px" }}>
          <path d="M 290 52 C 304 78 308 98 300 112 C 296 120 284 120 280 112 C 272 98 278 78 290 52 Z" fill="url(#mb-flame)" />
          <path d="M 290 86 C 296 98 297 106 293 112 C 291 115 289 115 287 112 C 284 106 285 98 290 86 Z" fill="#fffbe8" opacity="0.9" />
        </g>
      </g>
    </svg>
  );
}
