import Link from "next/link";
import { site } from "@/lib/site";

export default function NotFound() {
  return (
    <main className="tabletop grain grid min-h-dvh place-items-center px-6 text-center">
      <div>
        <p className="label text-brass">Wrong room</p>
        <h1 className="display mt-3 text-5xl text-cream">
          Chances are <em className="brass-text">this isn&rsquo;t it.</em>
        </h1>
        <Link href="/" className="brass tap mt-8 inline-flex min-h-12 items-center rounded-full px-6 font-semibold">
          Back to the dining room
        </Link>
        <p className="mt-4 text-sm text-tan">Or call {site.phone.display}.</p>
      </div>
    </main>
  );
}
