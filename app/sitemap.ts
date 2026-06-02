import type { MetadataRoute } from "next";
import { podSlugs } from "@/lib/pods";

/**
 * Sitemap — automatically generates `/sitemap.xml` at build time.
 *
 * Submitted to Google Search Console so every page is discoverable.
 * `/site-maps/*.pdf` are intentionally excluded (guest-only pre-arrival
 * PDFs, blocked from indexation by `public/robots.txt`).
 *
 * Priority + changeFrequency are loose hints — Google largely ignores
 * them now, but they don't hurt. Lastmod is set to the build date so
 * Google sees a fresh signal on every deploy.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://threepondsestate.com";
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/stay`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/story`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/explore`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/book`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${base}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${base}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  const podRoutes: MetadataRoute.Sitemap = podSlugs.map((slug) => ({
    url: `${base}/stay/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  return [...staticRoutes, ...podRoutes];
}
