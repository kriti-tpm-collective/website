export type Author = {
  name: string;
  slug: string;
  role?: string;
  bio?: string;
  imageUrl?: string;
};

export type Topic = {
  title: string;
  slug: string;
  description?: string;
};

export type Article = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  readingTimeMinutes: number;
  coverImageUrl?: string;
  featured?: boolean;
  topics: Topic[];
  author: Author;
  body: PortableBlock[];
};

export type EventItem = {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  startDate: string;
  endDate?: string;
  location: string;
  locationType: "in-person" | "virtual" | "hybrid";
  registrationUrl?: string;
  featured?: boolean;
  body?: PortableBlock[];
};

export type Resource = {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  category: string;
  url?: string;
  featured?: boolean;
  body: PortableBlock[];
};

export type SiteSettings = {
  siteTitle: string;
  tagline: string;
  mission: string;
  newsletterBlurb: string;
};

export type PortableBlock = {
  _type: string;
  _key: string;
  style?: string;
  children?: Array<{
    _type: string;
    _key: string;
    text: string;
    marks?: string[];
  }>;
  markDefs?: Array<{ _type: string; _key: string; href?: string }>;
  listItem?: "bullet" | "number";
  level?: number;
};
