import type { NextConfig } from "next";

const securityHeaders = [
  // Prevent the site being embedded in an <iframe> on other origins.
  // SAMEORIGIN (rather than DENY) keeps any same-origin iframe use
  // (e.g. the Google Maps embed on pod detail pages) working.
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  // Stop browsers guessing MIME types — reduces XSS risk from
  // user-uploaded or third-party content served with a wrong content-type.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Send the full origin on same-origin requests; only the origin
  // (no path/query) on cross-origin. Avoids leaking page paths to
  // third-party analytics/social embeds.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Restrict access to browser features that aren't used on the site.
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  // Tell browsers to only connect via HTTPS for the next 12 months.
  // Only enable once you're confident the site will always serve HTTPS
  // (Vercel guarantees this for custom domains).
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Apply to every route served by Next.js.
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
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
