import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: "/Brickell-Barber-s-demo",
  assetPrefix: "/Brickell-Barber-s-demo",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
