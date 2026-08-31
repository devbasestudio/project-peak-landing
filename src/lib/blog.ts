import { createClient } from "@/lib/supabase/server";

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

export async function getPublishedPosts(limit?: number) {
  const supabase = await createClient();
  let query = supabase.from("blog_posts").select(postColumns).eq("status", "published").order("featured", { ascending: false }).order("published_at", { ascending: false });
  if (limit) query = query.limit(limit);
  const { data, error } = await query;
  if (error) return [] as BlogPost[];
  return (data ?? []) as BlogPost[];
}

export async function getPublishedPost(slug: string) {
  const supabase = await createClient();
  const { data } = await supabase.from("blog_posts").select(postColumns).eq("slug", slug).eq("status", "published").maybeSingle();
  return data as BlogPost | null;
}

export async function getAdminPosts() {
  const supabase = await createClient();
  const { data, error } = await supabase.from("blog_posts").select(postColumns).order("updated_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as BlogPost[];
}

export async function getAdminPost(id: string) {
  const supabase = await createClient();
  const { data } = await supabase.from("blog_posts").select(postColumns).eq("id", id).maybeSingle();
  return data as BlogPost | null;
}
