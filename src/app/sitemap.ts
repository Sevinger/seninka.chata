import type { MetadataRoute } from "next";

import { navigace, site } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const zmeneno = new Date();

  return navigace.map((polozka) => ({
    url: `${site.url}${polozka.href === "/" ? "" : polozka.href}`,
    lastModified: zmeneno,
    changeFrequency: "monthly",
    priority: polozka.href === "/" ? 1 : 0.8,
  }));
}
