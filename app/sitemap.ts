import type { MetadataRoute } from "next";

import { site } from "@/lib/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/fonctionnalites",
    "/tarifs",
    "/a-propos",
    "/contact",
    "/legal/mentions-legales",
    "/legal/cgu",
    "/legal/confidentialite",
    "/legal/cookies",
  ];

  return routes.map((route) => ({
    url: `${site.url}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route.startsWith("/legal") ? 0.3 : 0.8,
  }));
}
