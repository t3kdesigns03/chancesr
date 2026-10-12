import { hours, site } from "@/lib/site";
import T3KCredit from "./T3KCredit";
import { BrandLockup } from "./BrandMark";
import { Container } from "./ui";

export default function Footer() {
  return (
    <footer className="overflow-hidden border-t border-brass/15 bg-walnut-950 pb-10 pt-12 max-lg:pt-8">
      <Container className="grid gap-8 max-sm:gap-5 sm:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <BrandLockup />
          <p className="mt-4 max-w-xs text-tan max-sm:mt-3 max-sm:text-sm">
            Chances are you&rsquo;ll like it. Supper downtown since {site.founded}.
          </p>
        </div>
        <div className="text-tan max-sm:text-sm">
          <p className="label text-brass">Call for a table</p>
          <a href={site.phone.href} className="mt-2 block text-lg font-semibold tabular-nums text-cream hover:text-brass-bright">
            {site.phone.display}
          </a>
          <a href={`mailto:${site.cateringEmail}`} className="block break-all py-1.5 hover:text-cream">
            {site.cateringEmail}
          </a>
          <a href="/menu" className="block py-1.5 hover:text-cream">
            The menu
          </a>
          <a href={site.facebook} target="_blank" rel="noopener" className="block py-1.5 hover:text-cream">
            Facebook
          </a>
        </div>
        <div className="text-tan max-sm:text-sm">
          <p className="label text-brass">Downtown York</p>
          <address className="mt-2 not-italic">
            {site.address.street}
            <br />
            {site.address.city}, {site.address.region} {site.address.zip}
          </address>
          <ul className="mt-3 space-y-0.5 text-sm">
            {hours.map((h) => (
              <li key={h.label} className="flex justify-between gap-4">
                <span>{h.label}</span>
                <span className="tabular-nums text-linen">{h.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
      <Container className="relative mt-10 flex flex-col gap-3 border-t border-white/[0.06] pt-6 text-sm text-tan max-sm:mt-6 max-sm:pt-4 max-sm:text-xs sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {site.fullName}
        </p>
        {site.spec && <T3KCredit />}
      </Container>
    </footer>
  );
}
