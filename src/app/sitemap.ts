import type { MetadataRoute } from "next";
import { getPublishedPosts } from "@/lib/blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const posts = await getPublishedPosts();
  return [
    { url: base, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/journal`, changeFrequency: "weekly", priority: 0.8 },
    ...posts.map((post) => ({ url: `${base}/journal/${post.slug}`, lastModified: post.updated_at, changeFrequency: "monthly" as const, priority: 0.7 })),
  ];
}
