import type { MetadataRoute } from "next";

import { site } from "@/lib/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  // Legal pages are intentionally excluded: they're marked `robots: { index: false }`
  // and shouldn't be submitted for indexing via the sitemap.
  const routes = ["", "/fonctionnalites", "/tarifs", "/faq", "/a-propos", "/contact"];

  return routes.map((route) => ({
    url: `${site.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
