import "server-only";
import { unstable_cache } from "next/cache";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { requirePublicEnv } from "@/lib/env";

export type BlogPost = {
  id: string;
  author_id: string;
  slug: string;
  language: "mm" | "en";
  title: string;
  excerpt: string;
  content: string;
  cover_image_url: string | null;
  cover_image_path: string | null;
  seo_title: string | null;
  seo_description: string | null;
  status: "draft" | "published";
  featured: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

const postColumns = "id,author_id,slug,language,title,excerpt,content,cover_image_url,cover_image_path,seo_title,seo_description,status,featured,published_at,created_at,updated_at";

function createPublicClient() {
  const { supabaseUrl, supabasePublishableKey } = requirePublicEnv();
  return createSupabaseClient(supabaseUrl, supabasePublishableKey, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
  });
}

const readPublishedPosts = unstable_cache(async (limit?: number) => {
  const supabase = createPublicClient();
  const posts: BlogPost[] = [];
  const listColumns = "id,author_id,slug,language,title,excerpt,cover_image_url,cover_image_path,seo_title,seo_description,status,featured,published_at,created_at,updated_at";
  const pageSize = 500;
  for (let from = 0; ; from += pageSize) {
    const size = limit ? Math.min(pageSize, limit - posts.length) : pageSize;
    const { data, error } = await supabase.from("blog_posts").select(listColumns)
      .eq("status", "published").order("featured", { ascending: false })
      .order("published_at", { ascending: false }).order("id").range(from, from + size - 1);
    if (error) throw error;
    posts.push(...(data ?? []).map((post) => ({ ...post, content: "" }) as unknown as BlogPost));
    if (!data || data.length < size || (limit && posts.length >= limit)) return posts;
  }
}, ["project-peak-published-posts"], { revalidate: 60, tags: ["project-peak-posts"] });

export async function getPublishedPosts(limit?: number) {
  return readPublishedPosts(limit);
}

export async function getPublishedPost(slug: string) {
  const { data, error } = await createPublicClient().from("blog_posts").select(postColumns)
    .eq("status", "published").eq("slug", slug).maybeSingle();
  if (error) throw error;
  return data as BlogPost | null;
}

export async function getAdminPosts() {
  const supabase = createPublicClient();
  const { data, error } = await supabase.from("blog_posts").select(postColumns).order("updated_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as BlogPost[];
}

export async function getAdminPost(id: string) {
  const supabase = createPublicClient();
  const { data } = await supabase.from("blog_posts").select(postColumns).eq("id", id).maybeSingle();
  return data as BlogPost | null;
}
