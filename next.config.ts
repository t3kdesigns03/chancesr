import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static: `next build` writes plain HTML/CSS/JS to ./out (no server functions).
  output: "export",
  // Images are pre-optimized by scripts/build-assets.mjs, so skip the runtime optimizer
  // (which needs a server and isn't available in static export).
  images: { unoptimized: true },
  trailingSlash: false,
};

export default nextConfig;
