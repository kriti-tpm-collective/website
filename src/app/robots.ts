import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.tpmcollective.org";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/studio", "/api", "/login", "/signup", "/write", "/me"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
