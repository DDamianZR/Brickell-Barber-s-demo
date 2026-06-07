import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: "/Brickell-Barber-s-demo",
  assetPrefix: "/Brickell-Barber-s-demo",
  images: {
    loader: "custom",
    loaderFile: "./src/lib/imageLoader.ts",
  },
};

export default nextConfig;
