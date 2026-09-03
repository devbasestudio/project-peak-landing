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

const readPublishedPosts = unstable_cache(async () => {
  const supabase = createPublicClient();
  const query = supabase.from("blog_posts").select(postColumns).eq("status", "published").order("featured", { ascending: false }).order("published_at", { ascending: false });
  const { data, error } = await query;
  if (error) return [] as BlogPost[];
  return (data ?? []) as BlogPost[];
}, ["project-peak-published-posts"], { revalidate: 60, tags: ["project-peak-posts"] });

export async function getPublishedPosts(limit?: number) {
  const posts = await readPublishedPosts();
  return limit ? posts.slice(0, limit) : posts;
}

export async function getPublishedPost(slug: string) {
  const posts = await readPublishedPosts();
  return posts.find((post) => post.slug === slug) ?? null;
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
