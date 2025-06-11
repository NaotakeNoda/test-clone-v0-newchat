import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard/", "/messages/", "/login", "/register"],
    },
    sitemap: "https://tutor-matching-portal.example.com/sitemap.xml",
  }
}
