import { carryOut, site } from "@/lib/site";
import { HoursTable, OpenBadge } from "./OpenStatus";
import { NextBuffet } from "./UpcomingBuffets";
import { CallButton, Container, MailIcon, PinIcon, Stars } from "./ui";

const numbers = [
  { big: String(site.founded), small: "Downtown since the Cozy Lunch" },
  { big: site.rating.google.score, small: `From ${site.rating.google.count} Google reviews`, stars: true },
  { big: `#${site.rating.tripadvisor.rank}`, small: `Of ${site.rating.tripadvisor.of} restaurants in York on TripAdvisor (${site.rating.tripadvisor.count} reviews)` },
  { big: String(site.seats), small: "Seats, across the dining rooms" },
];

const straight: { q: string; a: React.ReactNode }[] = [
  { q: "Fancy?", a: "No. Antiques on the walls, prime rib on the plate, no pretense." },
  { q: "Buffet tonight?", a: <NextBuffet /> },
  { q: "Coming off I-80?", a: "Your GPS will send you downtown. Trust it." },
  { q: "Is it 5 stars?", a: `It's ${site.rating.google.score}. Busy Sundays mean a line. We think the prime rib is worth it.` },
];

export function Trust() {
  return (
    <section aria-labelledby="trust-title" className="relative overflow-hidden border-t border-brass/10 bg-walnut-950 py-24 max-lg:py-14">
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-0 h-80 w-[50rem] -translate-x-1/2 bg-[radial-gradient(closest-side,rgb(232_187_99/0.12),transparent)]" />
      <Container className="relative">
        <p data-reveal="" className="label text-center text-brass">
          The straight story
        </p>
        <h2 id="trust-title" data-reveal="" className="display mx-auto mt-4 max-w-4xl text-center text-4xl text-cream sm:text-5xl lg:text-6xl">
          We&rsquo;re not fancy. We&rsquo;re just the room York&rsquo;s been celebrating in since {site.founded}.{" "}
          <em className="brass-text">No pretense. Just supper.</em>
        </h2>

        <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-brass/20 bg-brass/20 max-sm:mt-8 lg:grid-cols-4">
          {numbers.map((n) => (
            <div key={n.small} data-reveal="" className="bg-walnut-950 p-6 text-center max-sm:p-4">
              <dt className="sr-only">{n.small}</dt>
              <dd>
                <span className="display block text-5xl text-brass-bright max-sm:text-4xl">{n.big}</span>
                {n.stars && <Stars score={4.3} className="mt-1 text-brass-bright" />}
                <span className="mt-2 block text-sm text-tan max-sm:text-xs">{n.small}</span>
              </dd>
            </div>
          ))}
        </dl>

        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {straight.map((s) => (
            <li key={s.q} data-reveal="" className="card rounded-2xl px-5 py-4 max-sm:px-4 max-sm:py-3">
              <p className="font-semibold text-cream">{s.q}</p>
              <p className="mt-0.5 text-sm text-linen">{s.a}</p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

export function Visit() {
  return (
    <section id="visit" aria-labelledby="visit-title" className="tabletop grain relative border-t border-brass/10 py-24 max-lg:py-14">
      <Container className="grid gap-10 max-sm:gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p data-reveal="" className="label text-brass">
            Come on in
          </p>
          <h2 id="visit-title" data-reveal="" className="display mt-3 text-5xl text-cream sm:text-6xl lg:text-7xl">
            Save us <em className="brass-text">a table.</em>
          </h2>
          <p data-reveal="" className="mt-4 max-w-md text-lg text-linen max-sm:text-base">
            Anniversary, after church, or just passing through on <span className="whitespace-nowrap">I-80</span>. Call and we&rsquo;ll hold a seat.
          </p>
          <div data-reveal="" className="mt-7 flex flex-col items-start gap-4 max-sm:mt-5">
            <CallButton size="lg" />
            <OpenBadge />
          </div>

          <div className="mt-10 grid gap-5 max-sm:mt-7 sm:grid-cols-2">
            <a href={site.maps.directions} target="_blank" rel="noopener" className="group flex gap-3">
              <PinIcon className="mt-0.5 h-5 w-5 shrink-0 text-brass" />
              <span>
                <span className="label block text-brass">Find us</span>
                <span className="mt-1 block text-cream group-hover:text-brass-bright">{site.address.street}</span>
                <span className="block text-linen">
                  {site.address.city}, {site.address.region} {site.address.zip}
                </span>
                <span className="mt-1 block text-sm text-brass-bright underline decoration-brass/40 underline-offset-4">Directions</span>
              </span>
            </a>
            <a href={`mailto:${site.cateringEmail}`} className="group flex gap-3">
              <MailIcon className="mt-0.5 h-5 w-5 shrink-0 text-brass" />
              <span className="min-w-0">
                <span className="label block text-brass">Banquets & catering</span>
                <span className="mt-1 block break-all text-cream group-hover:text-brass-bright">{site.cateringEmail}</span>
                <span className="block text-sm text-linen">Shir-Ra Room, Tommy-Suz Beer Garden, or your place.</span>
              </span>
            </a>
          </div>
        </div>

        <div data-reveal="" className="card self-start rounded-3xl p-6 max-sm:p-5">
          <p className="label text-brass">Hours</p>
          <div className="mt-3">
            <HoursTable />
          </div>
          <div className="mt-5 rounded-2xl bg-walnut-950/60 p-4">
            <p className="label text-brass">{carryOut.note}</p>
            <p className="mt-1 tabular-nums text-cream">{carryOut.time}</p>
            <p className="mt-1 text-xs text-tan">{carryOut.fine}</p>
          </div>
          <p className="mt-4 text-sm text-tan">
            <NextBuffet />
          </p>
        </div>
      </Container>
    </section>
  );
}
