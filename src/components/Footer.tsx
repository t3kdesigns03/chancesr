import { site } from "@/lib/site";
import { BrandLockup } from "./BrandMark";
import { Container } from "./ui";

export default function Footer() {
  return (
    <footer className="border-t border-brass/15 bg-walnut-950 pb-10 pt-12 max-lg:pt-8">
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
          <a href={`mailto:${site.cateringEmail}`} className="block break-all hover:text-cream">
            {site.cateringEmail}
          </a>
          <a href={site.facebook} target="_blank" rel="noopener" className="mt-1 block hover:text-cream">
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
        </div>
      </Container>
      <Container className="mt-10 flex flex-col gap-1 border-t border-white/[0.06] pt-6 text-sm text-tan/70 max-sm:mt-6 max-sm:pt-4 max-sm:text-xs sm:flex-row sm:justify-between">
        <p>
          © {new Date().getFullYear()} {site.fullName}
        </p>
        {site.spec && <p>Proposed site by T3KDesigns</p>}
      </Container>
    </footer>
  );
}
