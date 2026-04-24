import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allowed quality values. Next 16 requires this to be explicitly listed.
    qualities: [60, 75, 85, 90],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
