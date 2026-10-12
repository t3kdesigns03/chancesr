import { carryOut, site } from "@/lib/site";
import { Container, MailIcon, SectionLabel, SectionTitle } from "./ui";

const rooms = [
  {
    kicker: `Seats ${site.seats}`,
    name: "The dining rooms",
    line: "Room after room of dark wood and antiques. Booth for two or a table for the whole reunion.",
  },
  {
    kicker: "Happy hour",
    name: "Hobnob Lounge",
    line: "The bar side of the house. Happy hour, a stool, and somebody you know two seats down.",
  },
  {
    kicker: "Banquets & catering",
    name: "West Room · East Room",
    line: "Company parties, trainings, retirements, wedding receptions. The West Room for the corporate crowd, the East Room for smaller gatherings. Or we bring supper to you.",
    email: true,
  },
  {
    kicker: carryOut.time,
    name: "Carry-out & local delivery",
    line: "Same kitchen, your kitchen table. Pick it up, or we'll bring it, as staffing allows.",
  },
];

export default function Rooms() {
  return (
    <section id="rooms" aria-labelledby="rooms-title" className="grain relative overflow-hidden border-t border-brass/10 bg-walnut-900 py-24 max-lg:py-14">
      <Container>
        <SectionLabel n="03">The rooms</SectionLabel>
        <SectionTitle id="rooms-title">
          {site.seats} seats. <em className="brass-text">One dining room feeling.</em>
        </SectionTitle>
      </Container>

      <div data-reveal="" className="mx-auto mt-10 max-w-7xl px-4 max-sm:mt-6 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-brass/20">
          <DiningRoom />
        </div>
      </div>

      <Container>
        <ul className="swipe mt-6 grid gap-4 max-sm:-mx-4 max-sm:flex max-sm:overflow-x-auto max-sm:px-4 sm:grid-cols-2 lg:grid-cols-4">
          {rooms.map((r) => (
            <li key={r.name} data-reveal="" className="card flex flex-col rounded-3xl p-5 max-sm:w-[78%] max-sm:shrink-0">
              <p className="label text-brass">{r.kicker}</p>
              <h3 className="display mt-2 text-2xl text-cream">{r.name}</h3>
              <p className="mt-2 text-sm text-linen">{r.line}</p>
              {r.email && (
                <a
                  href={`mailto:${site.cateringEmail}`}
                  className="mt-auto inline-flex items-center gap-2 break-all pt-4 text-sm font-semibold text-brass-bright hover:text-cream"
                >
                  <MailIcon className="h-4 w-4 shrink-0" />
                  {site.cateringEmail}
                </a>
              )}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/** The dining room in warm tones: paneling, brass sconces, framed antiques, an oxblood booth, a set table. */
function DiningRoom() {
  const frames = [
    { x: 150, y: 70, w: 70, h: 90 },
    { x: 240, y: 86, w: 52, h: 52 },
    { x: 560, y: 64, w: 110, h: 76 },
    { x: 860, y: 80, w: 64, h: 84 },
    { x: 944, y: 96, w: 44, h: 44 },
  ];
  const sconces = [110, 440, 760, 1060];
  return (
    <svg viewBox="0 0 1200 380" className="block h-auto w-full max-sm:h-48" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Illustration of the dining room: wood paneling, brass sconces, antiques on the walls, an oxblood booth and a set table">
      <defs>
        <linearGradient id="dr-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2a1b0f" />
          <stop offset="1" stopColor="#3a2614" />
        </linearGradient>
        <linearGradient id="dr-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1c120a" />
          <stop offset="1" stopColor="#0d0805" />
        </linearGradient>
        <linearGradient id="dr-booth" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#9b2f30" />
          <stop offset="1" stopColor="#4f1213" />
        </linearGradient>
        <radialGradient id="dr-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ffc56a" stopOpacity="0.5" />
          <stop offset="1" stopColor="#ffc56a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="dr-cloth" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f6eedd" />
          <stop offset="1" stopColor="#cdbd9c" />
        </linearGradient>
        <pattern id="dr-panel" width="80" height="140" patternUnits="userSpaceOnUse" y="210">
          <rect x="8" y="10" width="64" height="120" rx="3" fill="none" stroke="#5a3d22" strokeWidth="2" />
          <rect x="14" y="16" width="52" height="108" rx="2" fill="#000" opacity="0.08" />
        </pattern>
      </defs>

      <rect width="1200" height="380" fill="url(#dr-wall)" />
      {/* vertical board lines */}
      {Array.from({ length: 30 }).map((_, i) => (
        <path key={i} d={`M ${i * 40 + 20} 0 V 210`} stroke="#000" strokeOpacity="0.18" />
      ))}
      {/* wainscot */}
      <rect y="206" width="1200" height="8" fill="#6b4a2a" />
      <rect y="214" width="1200" height="136" fill="#2b1c10" />
      <rect y="214" width="1200" height="136" fill="url(#dr-panel)" />
      <rect y="340" width="1200" height="40" fill="url(#dr-floor)" />

      {/* sconce glow + framed antiques */}
      {sconces.map((x) => (
        <circle key={`g${x}`} cx={x} cy="96" r="120" fill="url(#dr-glow)" />
      ))}
      {frames.map((f, i) => (
        <g key={i}>
          <rect x={f.x - 5} y={f.y - 5} width={f.w + 10} height={f.h + 10} rx="2" fill="#a37526" />
          <rect x={f.x} y={f.y} width={f.w} height={f.h} fill={i % 2 ? "#3b2e22" : "#4a3a28"} />
          <path d={`M ${f.x + 8} ${f.y + f.h - 10} L ${f.x + f.w * 0.4} ${f.y + f.h * 0.45} L ${f.x + f.w * 0.65} ${f.y + f.h * 0.7} L ${f.x + f.w - 8} ${f.y + f.h * 0.35}`} fill="none" stroke="#c9a66a" strokeOpacity="0.45" strokeWidth="2" />
        </g>
      ))}
      {/* antique clock */}
      <g transform="translate(400 120)">
        <circle r="30" fill="#a37526" />
        <circle r="25" fill="#efe3c8" />
        <path d="M 0 0 V -16 M 0 0 L 11 6" stroke="#2b1c10" strokeWidth="2.4" strokeLinecap="round" />
      </g>
      {sconces.map((x) => (
        <g key={`s${x}`} transform={`translate(${x} 96)`}>
          <rect x="-3" y="0" width="6" height="22" fill="#a37526" />
          <path d="M -16 -2 L 16 -2 L 10 -22 L -10 -22 Z" fill="#f2c66c" />
          <path d="M -16 -2 L 16 -2 L 10 -22 L -10 -22 Z" fill="#fff3c9" opacity="0.35" />
        </g>
      ))}

      {/* booth, left */}
      <g>
        <rect x="40" y="196" width="300" height="120" rx="18" fill="url(#dr-booth)" />
        {[0, 1, 2, 3].map((i) => (
          <path key={i} d={`M ${70 + i * 70} 206 V 300`} stroke="#000" strokeOpacity="0.25" strokeWidth="3" />
        ))}
        <rect x="30" y="290" width="320" height="34" rx="8" fill="#6e1c1d" />
        <rect x="30" y="290" width="320" height="6" rx="3" fill="#b9474a" opacity="0.4" />
      </g>

      {/* set table, center */}
      <g transform="translate(640 0)">
        <ellipse cx="0" cy="356" rx="200" ry="18" fill="#000" opacity="0.45" />
        <path d="M -170 250 L 170 250 L 186 350 L -186 350 Z" fill="url(#dr-cloth)" />
        <ellipse cx="0" cy="250" rx="170" ry="26" fill="#fbf5e8" />
        {[-90, 90].map((x) => (
          <g key={x} transform={`translate(${x} 250)`}>
            <ellipse rx="40" ry="10" fill="#efe3c8" stroke="#c9963c" strokeWidth="1.2" />
            <ellipse cx="0" cy="-1" rx="18" ry="5" fill="#93503f" />
            <ellipse cx="0" cy="0" rx="13" ry="3.4" fill="#bf3346" />
          </g>
        ))}
        {/* candle */}
        <circle cx="0" cy="206" r="60" fill="url(#dr-glow)" className="flicker" style={{ transformOrigin: "0px 206px" }} />
        <rect x="-6" y="214" width="12" height="34" rx="2" fill="#f2e8d2" />
        <path d="M 0 196 C 6 204 6 210 0 214 C -6 210 -6 204 0 196 Z" fill="#ffcf6a" />
        <rect x="-18" y="244" width="36" height="6" rx="3" fill="#c9963c" />
        {/* water glasses */}
        <path d="M -40 222 L -32 222 L -33 246 L -39 246 Z" fill="#fff" opacity="0.35" />
        <path d="M 34 222 L 42 222 L 41 246 L 35 246 Z" fill="#fff" opacity="0.35" />
      </g>

      {/* chairs, right */}
      {[930, 1100].map((x) => (
        <g key={x} transform={`translate(${x} 0)`}>
          <rect x="-34" y="190" width="68" height="100" rx="10" fill="#4a2f19" />
          <rect x="-26" y="198" width="52" height="84" rx="8" fill="url(#dr-booth)" />
          <rect x="-40" y="286" width="80" height="14" rx="4" fill="#5b3a1f" />
          <rect x="-34" y="300" width="7" height="48" fill="#3a2414" />
          <rect x="27" y="300" width="7" height="48" fill="#3a2414" />
        </g>
      ))}

      {/* warm vignette */}
      <rect width="1200" height="380" fill="url(#dr-glow)" opacity="0.15" />
    </svg>
  );
}
