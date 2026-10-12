import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MenuBoard, { Flourish } from "@/components/MenuBoard";
import Photo from "@/components/Photo";
import { CallButton, Container } from "@/components/ui";
import { NextBuffet } from "@/components/UpcomingBuffets";
import { brunch, menuNotes, takeHome } from "@/lib/menu";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Menu | ${site.fullName}, York, Nebraska`,
  description: `The full Chances "R" menu: prime rib (Regular and Husker cuts), Nebraska steaks, pan-fried chicken, sandwiches, burgers, breakfast, desserts from the Bake Shoppe, and the Hob-Nob Lounge.`,
  alternates: { canonical: "/menu" },
};

export default function MenuPage() {
  return (
    <>
      <Header home={false} />
      <main id="main" className="bg-walnut-900">
        {/* Hero: their printed menu's cover, set on the table */}
        <section className="tabletop grain relative overflow-hidden pb-10 pt-12 max-sm:pt-8">
          <Container className="grid items-center gap-10 max-sm:gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="max-lg:text-center">
              <p className="label text-brass-bright">The menu</p>
              <h1 className="mt-3 font-blackletter text-[4.5rem] leading-[0.95] text-cream max-sm:text-[3.2rem]">
                Chances <span className="text-red-bright">&ldquo;R&rdquo;</span>
              </h1>
              <p className="font-script text-4xl text-brass-bright max-sm:text-3xl">Restaurant and Hob Nob Lounge</p>
              <p className="mx-auto mt-5 max-w-lg text-lg text-linen max-sm:text-base lg:mx-0">
                Straight from the printed menu: Nebraska steaks, prime rib by the Regular or Husker cut, pan-fried chicken from
                the family recipe, and the Bake Shoppe.
              </p>
              <div className="mt-6 flex flex-wrap gap-3 max-lg:justify-center">
                <CallButton />
                <a
                  href={site.menus.main}
                  target="_blank"
                  rel="noopener"
                  className="deco-clip tap inline-flex bg-brass/60 p-px hover:bg-brass"
                >
                  <span className="deco-clip inline-flex min-h-12 items-center gap-2 bg-walnut-950 px-5 font-semibold text-cream">
                    Printable menu <span className="label text-[0.55rem] text-brass">PDF</span>
                  </span>
                </a>
              </div>
              <p className="mt-4 text-xs text-tan">Prices as printed on the current menu. Steaks and prime rib are market price; ask your server.</p>
            </div>
            <div className="relative mx-auto w-full max-w-[19rem] max-sm:max-w-[9.5rem]">
              <div className="rotate-[2.5deg] overflow-hidden rounded-md shadow-[0_40px_70px_-20px_rgb(0_0_0/0.95)] ring-1 ring-black/40">
                <Photo
                  name="menu-cover"
                  priority
                  alt="The cover of the Chances R menu: a sepia photo of the storefront and its crowned sign, with the blackletter Chances R logo"
                  sizes="(min-width: 1024px) 19rem, 13rem"
                  className="h-auto w-full"
                />
              </div>
            </div>
          </Container>
        </section>

        <Container className="pb-16 max-sm:pb-10">
          <MenuBoard />

          {/* The back page of the printed menu */}
          <div className="relative mt-10 overflow-hidden rounded-[1.4rem] bg-paper text-ink max-sm:mt-8">
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-[1.4rem] border-[10px] border-red max-sm:border-[6px]" />
            <Flourish className="absolute bottom-3 left-3 h-16 w-16 -scale-y-100 max-sm:h-11 max-sm:w-11" />
            <Flourish className="absolute bottom-3 right-3 h-16 w-16 -scale-100 max-sm:h-11 max-sm:w-11" />

            <div className="relative grid gap-8 px-12 py-10 max-lg:px-8 max-sm:px-5 max-sm:py-8 lg:grid-cols-3">
              <section id="to-go" aria-labelledby="to-go-h" className="scroll-mt-40">
                <h2 id="to-go-h" className="text-2xl font-bold text-red">Take Something Home</h2>
                <p className="font-bold text-red">Deli &amp; Pastry Shop</p>
                <ul className="mt-2 grid grid-cols-2 gap-x-4 text-[0.9rem]">
                  {takeHome.deli.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
                <h3 className="mt-5 text-lg font-bold">Chicken To Go</h3>
                <p className="text-[0.88rem] text-ink/80">{takeHome.chicken.note}</p>
                <div className="mt-1 space-y-0.5 text-[0.92rem]">
                  {takeHome.chicken.prices.map((p) => (
                    <div key={p.label} className="flex items-baseline gap-2">
                      <span>{p.label}</span>
                      <span aria-hidden="true" className="flex-1 translate-y-[-3px] border-b-2 border-dotted border-ink/30" />
                      <span className="font-bold tabular-nums">{p.price}</span>
                    </div>
                  ))}
                </div>
                <h3 className="mt-5 text-lg font-bold">Menu Take-Home</h3>
                <p className="text-[0.88rem] text-ink/80">{takeHome.menuNote}</p>

                <h2 className="mt-7 text-2xl font-bold text-red">&ldquo;R&rdquo; Catering Is Famous</h2>
                <p className="text-[0.9rem]">We cater for miles around to large and small parties. Our catering includes:</p>
                <ul className="mt-1 list-disc pl-5 text-[0.9rem]">
                  {takeHome.catering.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
                <a href={`mailto:${site.cateringEmail}`} className="mt-2 inline-block break-all text-sm font-bold text-red underline underline-offset-4">
                  {site.cateringEmail}
                </a>
              </section>

              <section id="brunch" aria-labelledby="brunch-h" className="scroll-mt-40 rounded-lg border border-red/40 bg-[#f4d4d2]/60 p-5 text-center">
                <h2 id="brunch-h" className="text-2xl font-bold leading-tight text-red">{brunch.title}</h2>
                {brunch.groups.map((g) => (
                  <div key={g.title} className="mt-4">
                    <h3 className="font-bold">{g.title}</h3>
                    <ul className="text-[0.92rem]">
                      {g.items.map((i) => (
                        <li key={i}>{i}</li>
                      ))}
                    </ul>
                  </div>
                ))}
                <p className="mt-4 font-bold">{brunch.plus}</p>
                <p className="mt-2 font-bold text-red">{brunch.when}</p>
              </section>

              <section aria-labelledby="buffet-h" className="text-center">
                <h2 id="buffet-h" className="text-2xl font-bold leading-tight text-red">{brunch.buffet.title}</h2>
                {brunch.buffet.lines.map((l) => (
                  <p key={l}>{l}</p>
                ))}
                <p className="mx-auto mt-3 max-w-xs text-sm text-ink/80">
                  <NextBuffet className="[&_.text-cream]:text-ink" />
                </p>

                <h2 className="mt-7 text-2xl font-bold leading-tight text-red">Have A Meeting Or Party Here</h2>
                <div className="mt-2 space-y-3 text-left text-[0.9rem]">
                  <p>
                    <span className="font-bold">Shir-Ra Meeting Room</span> &mdash; Perfect for Club Meetings, Bridge Parties, Ladies
                    Luncheons, Small to Medium Receptions or Banquets. It holds up to 100 people.
                  </p>
                  <p>
                    <span className="font-bold">Tommy-Suz Beer Garden</span> &mdash; Available for Larger Parties, Wedding Receptions,
                    and Dances. The Atmosphere can be tailored to Fit YOUR Event.
                  </p>
                </div>

                <div className="mt-7">
                  <p className="font-bold">A Closing Note&hellip;</p>
                  <p className="text-[0.95rem]">{menuNotes.closing}</p>
                  <p className="font-bold">{menuNotes.signed}</p>
                  <p className="mt-3 font-blackletter text-5xl leading-none text-red">Chances &ldquo;R&rdquo;</p>
                  <p className="font-script text-2xl leading-tight text-red">
                    Restaurant and
                    <br />
                    Hob Nob Lounge
                  </p>
                </div>
              </section>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
