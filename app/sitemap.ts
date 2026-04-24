import type { MetadataRoute } from "next";
import { getApiBase } from "@/lib/api";
import { getSiteUrl } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getSiteUrl();
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1 },
    {
      url: `${base}/projects`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${base}/contact`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.7,
    },
  ];

  const api = getApiBase();
  try {
    const res = await fetch(`${api}/projects/`, { next: { revalidate: 3600 } });
    if (!res.ok) return staticEntries;
    const data: unknown = await res.json();
    if (!Array.isArray(data)) return staticEntries;

    const projectEntries: MetadataRoute.Sitemap = data
      .filter((p: { is_active?: boolean; id?: number }) => p?.is_active)
      .map((p: { id: number }) => ({
        url: `${base}/projects/${p.id}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: 0.6,
      }));

    return [...staticEntries, ...projectEntries];
  } catch {
    return staticEntries;
  }
}
