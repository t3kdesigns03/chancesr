import type { ReactNode } from "react";
import { rooms, site } from "@/lib/site";
import Photo, { type PhotoName } from "./Photo";
import { Container, MailIcon, SectionLabel, SectionTitle } from "./ui";

type Room = { kicker: string; name: string; line: string; photo?: PhotoName; alt?: string; extra?: ReactNode };

const everyday: Room[] = [
  {
    kicker: `Happy hour · ${rooms.hobnob.happyHour}`,
    name: rooms.hobnob.name,
    line: rooms.hobnob.line,
    photo: "hobnob",
    alt: "Stained-glass windows and leaded glass over the tables in the Hob-Nob Lounge",
  },
  { kicker: "Elegant", ...rooms.dining[0] },
  { kicker: "Casual", ...rooms.dining[1] },
];

const parties: Room[] = [
  {
    kicker: rooms.private[0].seats,
    name: rooms.private[0].name,
    line: rooms.private[0].line,
    photo: "private",
    alt: "A long private-room table set with white linens and red napkins",
  },
  { kicker: rooms.private[1].seats, name: rooms.private[1].name, line: rooms.private[1].line },
  {
    kicker: rooms.catering.range,
    name: "Off-site catering",
    line: `${rooms.catering.line} ${rooms.catering.area}.`,
    extra: (
      <a href={`mailto:${site.cateringEmail}`} className="mt-auto inline-flex items-center gap-2 break-all pt-4 text-sm font-semibold text-brass-bright hover:text-cream">
        <MailIcon className="h-4 w-4 shrink-0" />
        {site.cateringEmail}
      </a>
    ),
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
        <p data-reveal="" className="mt-4 max-w-xl text-linen max-sm:text-sm">
          Mahogany, stained glass and brass since 1983. Walk in through the stained-glass doors and pick your room.
        </p>

        <figure data-reveal="" className="relative mt-10 overflow-hidden rounded-3xl border border-brass/25 max-sm:-mx-4 max-sm:mt-6 max-sm:rounded-none max-sm:border-x-0">
          <Photo
            name="bar"
            alt="The Chances R bar: carved mahogany, stained-glass panels, brass rail and leather stools"
            sizes="(min-width: 1280px) 76rem, 100vw"
            className="aspect-[16/8] w-full object-cover max-sm:aspect-[4/3]"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-walnut-950/85 via-walnut-950/10 to-transparent" />
          <figcaption className="absolute bottom-5 left-6 right-6 max-sm:bottom-4 max-sm:left-4">
            <p className="label text-brass-bright">The bar</p>
            <p className="display mt-1 text-3xl text-cream max-sm:text-2xl">Mahogany, stained glass &amp; brass.</p>
          </figcaption>
        </figure>

        <RoomRow rooms={everyday} />

        <h3 data-reveal="" className="display mt-14 text-3xl text-cream max-sm:mt-10 max-sm:text-2xl">
          Private rooms <em className="brass-text">&amp; catering</em>
        </h3>
        <p data-reveal="" className="mt-2 max-w-2xl text-sm text-tan">
          Company parties, trainings, retirements, wedding receptions. Groups of any size. {rooms.fine}
        </p>
        <RoomRow rooms={parties} />
      </Container>
    </section>
  );
}

/**
 * One row of four columns on desktop: the photo room is a wide card (two columns, photo beside the text),
 * the other two take a column each. Phones: the photo room full width, the short ones side by side.
 */
function RoomRow({ rooms: list }: { rooms: Room[] }) {
  return (
    <ul className="mt-6 grid grid-cols-2 gap-4 max-sm:gap-3 lg:grid-cols-4">
      {list.map((r) =>
        r.photo ? (
          <li key={r.name} data-reveal="" className="card col-span-2 flex flex-col overflow-hidden rounded-3xl sm:flex-row">
            <Photo
              name={r.photo}
              alt={r.alt!}
              sizes="(min-width: 1024px) 18rem, (min-width: 640px) 45vw, 100vw"
              className="aspect-[16/8] w-full object-cover sm:aspect-auto sm:w-[48%]"
            />
            <div className="flex flex-1 flex-col p-5 max-sm:p-4">
              <p className="label text-brass">{r.kicker}</p>
              <h3 className="display mt-2 text-2xl text-cream">{r.name}</h3>
              <p className="mt-2 text-sm text-linen">{r.line}</p>
              {r.extra}
            </div>
          </li>
        ) : (
          <li key={r.name} data-reveal="" className="card flex flex-col rounded-3xl p-5 max-sm:rounded-2xl max-sm:p-4">
            <p className="label text-brass max-sm:text-[0.6rem]">{r.kicker}</p>
            <h3 className="display mt-2 text-2xl text-cream max-sm:text-xl">{r.name}</h3>
            <p className="mt-2 text-sm text-linen max-sm:text-[0.82rem]">{r.line}</p>
            {r.extra}
          </li>
        ),
      )}
    </ul>
  );
}
