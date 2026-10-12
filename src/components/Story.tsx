import { history, honors, site } from "@/lib/site";
import Photo from "./Photo";
import { Container, SectionLabel, SectionTitle } from "./ui";

export default function Story() {
  return (
    <section id="story" aria-labelledby="story-title" className="grain relative overflow-hidden border-t border-brass/10 bg-walnut-900 py-24 max-lg:py-14">
      <Container className="grid items-start gap-12 max-sm:gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        {/* min-w-0: without it the swipeable timeline stretches this grid column past the screen */}
        <div className="min-w-0">
          <SectionLabel n="01">The story</SectionLabel>
          <SectionTitle id="story-title">
            &ldquo;Chances are, <em className="brass-text">we&rsquo;ll go broke.&rdquo;</em>
          </SectionTitle>
          <p data-reveal="" className="mt-6 max-w-xl text-lg text-linen max-sm:mt-4 max-sm:text-base">
            That&rsquo;s what {site.founders.him} Reetz told {site.founders.her} in {site.named}, about to more than triple the
            size of the little Cozy Lunch downtown. &ldquo;But I want to give it a try.&rdquo; The new name said the rest.
          </p>

          {/* Timeline: a list on desktop, a sideways swipe of year cards on phones */}
          <ol className="swipe mt-10 max-sm:-mx-4 max-sm:mt-6 max-sm:flex max-sm:gap-3 max-sm:overflow-x-auto max-sm:px-4 sm:border-l sm:border-brass/25">
            {history.map((b) => (
              <li
                key={b.year}
                data-reveal=""
                className="relative max-sm:card max-sm:w-[68%] max-sm:shrink-0 max-sm:rounded-2xl max-sm:p-4 sm:pb-5 sm:pl-7 sm:last:pb-0"
              >
                <span aria-hidden="true" className="absolute -left-[5px] top-2 h-[9px] w-[9px] rounded-full bg-brass shadow-[0_0_12px_rgb(232_187_99/0.7)] max-sm:hidden" />
                <p className="display text-2xl italic text-brass-bright sm:hidden">{b.year}</p>
                <p className="label text-brass max-sm:hidden">{b.year}</p>
                <p className="mt-1 text-linen max-sm:text-sm">{b.text}</p>
              </li>
            ))}
          </ol>
          <p className="mt-3 text-center text-xs text-tan sm:hidden" aria-hidden="true">
            Swipe through the years →
          </p>
        </div>

        <figure data-reveal="" className="relative mx-auto w-full max-w-md lg:sticky lg:top-28">
          <div className="relative overflow-hidden rounded-3xl border border-brass/30 shadow-[0_30px_60px_-20px_rgb(0_0_0/0.8)]">
            <Photo
              name="sign"
              alt="The red Chances R sign with its crown, hanging over the sidewalk on West 5th Street"
              sizes="(min-width: 1024px) 28rem, 90vw"
              className="aspect-[4/4.2] w-full object-cover max-sm:aspect-[4/3]"
            />
          </div>
          <figcaption className="mt-3 text-center text-sm text-tan">
            The sign out front, {site.address.street}. Crown and all.
          </figcaption>
          <ul className="mt-5 space-y-2 max-sm:mt-4">
            {honors.map((h) => (
              <li key={h} className="card flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm text-linen">
                <span aria-hidden="true" className="text-brass-bright">
                  ★
                </span>
                {h}
              </li>
            ))}
          </ul>
        </figure>
      </Container>

      {/* Hosts: a person at the door, not a nav bar */}
      <Container className="mt-16 max-sm:mt-8">
        <div data-reveal="" className="card flex flex-col items-center gap-5 rounded-3xl p-6 text-center sm:flex-row sm:p-8 sm:text-left">
          <div className="flex shrink-0 -space-x-3" aria-hidden="true">
            <Monogram letter="B" />
            <Monogram letter="R" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="label text-brass">Your hosts since 2021</p>
            <p className="display mt-1 text-3xl text-cream sm:text-4xl">
              Bryan carves. <em className="brass-text">Renee bakes.</em>
            </p>
            <p className="mt-2 text-tan max-sm:text-sm">
              {site.hosts} took over from the family in September 2021, and kept the prime rib, the pan-fried chicken and the
              dessert tray right where York left them.
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
