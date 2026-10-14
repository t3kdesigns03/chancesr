import type { ReactNode } from "react";
import { quotes, site } from "@/lib/site";
import MenuArt from "./MenuArt";
import Photo, { type PhotoName } from "./Photo";
import { Container, SectionLabel, SectionTitle } from "./ui";
import UpcomingBuffets from "./UpcomingBuffets";

type Dish = { photo?: PhotoName; alt?: string; name: string; line: string; quote: string };

// Prime rib and mashed are close-ups of the hero painting; the carrot cake is the restaurant's own photo.
const dishes: Dish[] = [
  {
    photo: "rib",
    alt: "Painting of a thick slice of prime rib in au jus",
    name: "Prime rib",
    line: "The butter-knife cut, with au jus ladled on.",
    quote: `“${quotes.bestInState}”`,
  },
  { name: "Pan-fried chicken", line: "The famous one. Regulars order it all white meat.", quote: `“${quotes.chicken}”` },
  {
    photo: "mash",
    alt: "Painting of real mashed potatoes beside the prime rib",
    name: "Real mashed potatoes",
    line: "Real potatoes. Not instant. A point of pride, and we'll keep saying it.",
    quote: "",
  },
  {
    photo: "cake",
    alt: "A whole carrot cake with cream cheese frosting and piped carrots, from the Chances R kitchen",
    name: "Pastries & desserts",
    line: "Homemade, like this carrot cake. Save room for the dessert tray.",
    quote: `The dessert tray: “${quotes.dessert}.”`,
  },
];

export default function Food() {
  return (
    <section id="food" aria-labelledby="food-title" className="relative border-t border-brass/10 bg-walnut-950 py-24 max-lg:py-14">
      <Container>
        <SectionLabel n="02">The food</SectionLabel>
        <div className="flex flex-wrap items-end justify-between gap-x-10 gap-y-5">
          <div>
            <SectionTitle id="food-title">
              What people <em className="brass-text">drive in for.</em>
            </SectionTitle>
            <p data-reveal="" className="mt-4 max-w-md text-linen max-sm:text-sm">
              Steakhouse supper, done the downtown way since {site.founded}. Breakfast Wednesday through Sunday, too.
            </p>
          </div>
          <div data-reveal="" className="flex flex-wrap gap-3 max-sm:w-full">
            <MenuLink href="/menu">See the full menu</MenuLink>
            <MenuLink href="/menu#breakfast">Breakfast menu</MenuLink>
          </div>
        </div>

        {/* Phones: swipe sideways instead of scrolling down through four cards */}
        <ul className="swipe mt-10 grid gap-4 max-sm:-mx-4 max-sm:mt-6 max-sm:flex max-sm:overflow-x-auto max-sm:px-4 sm:grid-cols-2 lg:grid-cols-4">
          {dishes.map((d) => (
            <li key={d.name} data-reveal="" className="card flex flex-col overflow-hidden rounded-3xl max-sm:w-[78%] max-sm:shrink-0">
              <div className="relative aspect-[4/3] overflow-hidden">
                {d.photo ? (
                  <Photo name={d.photo} alt={d.alt!} sizes="(min-width: 1024px) 18rem, (min-width: 640px) 45vw, 78vw" className="h-full w-full object-cover" />
                ) : (
                  <ChickenPlate />
                )}
                <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-walnut-950/70 to-transparent" />
              </div>
              <div className="flex flex-1 flex-col p-5 pt-4">
                <h3 className="display text-2xl text-cream">{d.name}</h3>
                <p className="mb-4 mt-2 text-sm text-linen">{d.line}</p>
                {d.quote && <blockquote className="mt-auto border-t border-brass/15 pt-4 text-sm italic text-tan">{d.quote}</blockquote>}
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-center text-xs text-tan sm:hidden" aria-hidden="true">
          Swipe for more →
        </p>

        {/* "R" Buffets: their photo, the real upcoming dates */}
        <div data-reveal="" className="relative mt-6 grid grid-cols-[minmax(0,1fr)] overflow-hidden rounded-3xl border border-brass/40 bg-gradient-to-br from-oxblood/45 via-walnut-900 to-walnut-900 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
          <div className="relative max-md:aspect-[16/8] md:min-h-48">
            <Photo
              name="buffet"
              alt="The buffet table at Chances R: fresh fruit, salads and sides in the Tommy-Suz Beer Garden"
              sizes="(min-width: 768px) 32rem, 100vw"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-walnut-950/80 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-walnut-900/90" />
            <p className="label absolute bottom-4 left-5 text-brass-bright md:hidden">&ldquo;R&rdquo; Buffets</p>
          </div>
          <div className="p-7 max-sm:p-5">
            <p className="label text-brass-bright max-md:hidden">&ldquo;R&rdquo; Buffets</p>
            <p className="display mt-2 text-4xl text-cream max-sm:mt-0 max-sm:text-3xl">
              Prime rib buffet <em className="brass-text">and Sunday brunch</em>
            </p>
            <p className="mt-3 italic text-linen">&ldquo;{quotes.buffet}&rdquo;</p>
            <p className="label mt-6 text-tan">Coming up</p>
            <UpcomingBuffets />
            <p className="mt-4 text-sm text-linen">
              About once a month right now, so reservations are highly suggested.{" "}
              <a href={site.phone.href} className="font-semibold text-brass-bright underline decoration-brass/40 underline-offset-4 hover:decoration-brass">
                Call {site.phone.display}
              </a>
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

function MenuLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} className="deco-clip tap inline-flex bg-brass/60 p-px hover:bg-brass max-sm:flex-1">
      <span className="deco-clip inline-flex min-h-12 w-full items-center justify-center gap-2 bg-walnut-950 px-5 font-semibold text-cream max-sm:px-3 max-sm:text-sm">
        {children}
        <span aria-hidden="true" className="text-brass">→</span>
      </span>
    </a>
  );
}

/** No photo of the chicken yet, so it gets a brass-framed menu card with the drumsticks drawn on their printed menu. */
function ChickenPlate() {
  return (
    <div className="tabletop relative h-full w-full">
      <span aria-hidden="true" className="absolute inset-4 rounded-xl border border-brass/50" />
      <span aria-hidden="true" className="absolute inset-[22px] rounded-lg border border-brass/20" />
      <div className="relative flex h-full flex-col items-center justify-center gap-2 pb-5 pt-7">
        <p className="label text-[0.55rem] text-brass">The famous &middot; family recipe</p>
        <MenuArt name="chicken" className="h-[62%] min-h-0 w-auto -rotate-6 drop-shadow-[0_8px_12px_rgb(0_0_0/0.55)]" />
      </div>
    </div>
  );
}
