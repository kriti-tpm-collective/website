import {
  articles as localArticles,
  events as localEvents,
  resources as localResources,
  siteSettings as localSettings,
} from "@/content";
import type { Article, EventItem, Resource, SiteSettings } from "@/lib/types";

export async function getSiteSettings(): Promise<SiteSettings> {
  return localSettings;
}

export async function getArticles(): Promise<Article[]> {
  return [...localArticles].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export async function getFeaturedArticles(): Promise<Article[]> {
  const articles = await getArticles();
  return articles.filter((article) => article.featured);
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const articles = await getArticles();
  return articles.find((article) => article.slug === slug) ?? null;
}

export async function getEvents(): Promise<EventItem[]> {
  return [...localEvents].sort(
    (a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
  );
}

export async function getEventBySlug(slug: string): Promise<EventItem | null> {
  const events = await getEvents();
  return events.find((event) => event.slug === slug) ?? null;
}

export async function getResources(): Promise<Resource[]> {
  return localResources;
}

export async function getResourceBySlug(slug: string): Promise<Resource | null> {
  const resources = await getResources();
  return resources.find((resource) => resource.slug === slug) ?? null;
}
