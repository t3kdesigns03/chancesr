import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import MobileMotion from "@/components/MobileMotion";
import { hoursSchema, site } from "@/lib/site";
import "./globals.css";

// Self-hosted (SIL OFL) so builds never depend on reaching Google Fonts.
// Fraunces "full" carries every axis (opsz, wght, SOFT, WONK) in one file per style.
const fraunces = localFont({
  src: [
    { path: "../fonts/fraunces-latin-full-normal.woff2", weight: "100 900", style: "normal" },
    { path: "../fonts/fraunces-latin-full-italic.woff2", weight: "100 900", style: "italic" },
  ],
  variable: "--font-fraunces",
  display: "swap",
});

const hanken = localFont({
  src: "../fonts/hanken-grotesk-latin-wght-normal.woff2",
  weight: "100 900",
  style: "normal",
  variable: "--font-hanken",
  display: "swap",
});

// Server's handwriting on the guest check. Only that one card uses it, so don't preload.
const caveat = localFont({
  src: "../fonts/caveat-latin-wght-normal.woff2",
  weight: "400 700",
  style: "normal",
  variable: "--font-caveat",
  display: "swap",
  preload: false,
});

// Absolute base for og:image etc. SITE_URL wins (set it for CLI deploys built locally); on Netlify
// builds, deploy previews use their own URL and production uses the site's main URL.
const siteUrl =
  process.env.SITE_URL ??
  (process.env.CONTEXT === "production" ? process.env.URL : process.env.DEPLOY_PRIME_URL) ??
  process.env.URL ??
  "https://chancesr.t3kdesigns.app";

const description = `Family-run supper club in downtown York, Nebraska since ${site.founded}. Prime rib you can cut with a butter knife, pan-fried chicken, real mashed potatoes, Sunday brunch. Call ${site.phone.display} for a table.`;

const ogAlt = `Supper, the way York remembers it. ${site.fullName}, York, Nebraska. Since ${site.founded}.`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: `${site.fullName} | Supper in York, Nebraska since ${site.founded}`,
  description,
  openGraph: {
    type: "website",
    title: "Supper, the way York remembers it.",
    description: `Prime rib you can cut with a butter knife. Same dining room since ${site.founded}. Call ${site.phone.display}.`,
    siteName: site.fullName,
    locale: "en_US",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: ogAlt, type: "image/png" }],
  },
  twitter: { card: "summary_large_image", images: [{ url: "/og-image.png", alt: ogAlt }] },
  formatDetection: { telephone: true },
  robots: site.spec ? { index: false, follow: false } : undefined,
};

export const viewport: Viewport = {
  themeColor: "#17100a",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: site.fullName,
  telephone: site.phone.e164,
  email: site.cateringEmail,
  foundingDate: String(site.founded),
  servesCuisine: ["Steakhouse", "American"],
  acceptsReservations: true,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    postalCode: site.address.zip,
    addressCountry: "US",
  },
  openingHours: hoursSchema,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${hanken.variable} ${caveat.variable}`}>
      <body className="font-sans antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[60] focus:rounded-md focus:bg-brass focus:px-4 focus:py-3 focus:font-semibold focus:text-walnut-950"
        >
          Skip to content
        </a>
        {children}
        <MobileMotion />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
