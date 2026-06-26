import type { MetadataRoute } from "next";

const base = "https://www.drpalaskarhospital.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = ["", "/treatments", "/about", "/doctor", "/gallery", "/testimonials", "/updates", "/contact"];
  return routes.map((r) => ({
    url: `${base}${r}`,
    lastModified: now,
    changeFrequency: r === "" || r === "/updates" ? "weekly" : "monthly",
    priority: r === "" ? 1 : 0.8,
  }));
}
