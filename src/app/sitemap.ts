
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  const now = new Date();
  return [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/#rezervasyon`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/(legal)/impressum`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/(legal)/datenschutz`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/(legal)/agb`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];
}
