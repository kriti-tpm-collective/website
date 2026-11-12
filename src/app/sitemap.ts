import type { MetadataRoute } from "next";
import { getArticles, getEvents, getResources } from "@/lib/content";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.tpmcollective.org";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, events, resources] = await Promise.all([
    getArticles(),
    getEvents(),
    getResources(),
  ]);

  const staticRoutes = ["", "/articles", "/events", "/resources", "/about"].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
  }));

  const articleRoutes = articles.map((article) => ({
    url: `${siteUrl}/articles/${article.slug}`,
    lastModified: new Date(article.publishedAt),
  }));

  const eventRoutes = events.map((event) => ({
    url: `${siteUrl}/events/${event.slug}`,
    lastModified: new Date(event.startDate),
  }));

  const resourceRoutes = resources.map((resource) => ({
    url: `${siteUrl}/resources/${resource.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...articleRoutes, ...eventRoutes, ...resourceRoutes];
}
