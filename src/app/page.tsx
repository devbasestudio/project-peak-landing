import { LandingPage } from "@/components/landing/landing-page";
import { getPublishedPosts } from "@/lib/blog";

export const revalidate = 60;

export default async function Home() {
  const posts = await getPublishedPosts(3);
  return <LandingPage posts={posts} />;
}
