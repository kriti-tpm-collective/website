import type { MetadataRoute } from "next";
import { getChapters, getOverviews, getPillars } from "@/content/prepare";
import { listPublishedStories } from "@/lib/community-store";
import { getArticles, getEvents, getResources } from "@/lib/content";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.tpmcollective.org";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, events, resources, stories] = await Promise.all([
    getArticles(),
    getEvents(),
    getResources(),
    listPublishedStories(),
  ]);

  const staticRoutes = ["", "/articles", "/blogs", "/prepare", "/events", "/resources", "/about"].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
  }));

  const prepareGuideRoutes = getOverviews().map((guide) => ({
    url: `${siteUrl}/prepare/guides/${guide.slug}`,
    lastModified: new Date(),
  }));

  const preparePillarRoutes = getPillars().map((pillar) => ({
    url: `${siteUrl}/prepare/pillars/${pillar.letter.toLowerCase()}`,
    lastModified: new Date(),
  }));

  const prepareSkillRoutes = getChapters().map((chapter) => ({
    url: `${siteUrl}/prepare/skills/${chapter.slug}`,
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

  const storyRoutes = stories.map((story) => ({
    url: `${siteUrl}/blogs/${story.slug}`,
    lastModified: new Date(story.updatedAt),
  }));

  const authorRoutes = [...new Set(stories.map((story) => story.author.id))].map((id) => ({
    url: `${siteUrl}/authors/${id}`,
    lastModified: new Date(),
  }));

  return [
    ...staticRoutes,
    ...prepareGuideRoutes,
    ...preparePillarRoutes,
    ...prepareSkillRoutes,
    ...articleRoutes,
    ...eventRoutes,
    ...resourceRoutes,
    ...storyRoutes,
    ...authorRoutes,
  ];
}
