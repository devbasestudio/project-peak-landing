import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublishedPost } from "@/lib/blog";
import { MarkdownContent } from "@/components/journal/markdown-content";
import styles from "../journal.module.css";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPost(slug);
  if (!post) return { title: "Post not found" };
  return {
    title: post.seo_title || post.title,
    description: post.seo_description || post.excerpt,
    openGraph: post.cover_image_url ? { images: [{ url: post.cover_image_url }] } : undefined,
  };
}

export const revalidate = 60;

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPublishedPost(slug);
  if (!post) notFound();
  const date = post.published_at ? new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "long", year: "numeric" }).format(new Date(post.published_at)) : "Project Peak";
  return <div className={styles.shell}>
    <header className={styles.header}><Link href="/"><Image src="/brand/logo-dark.svg" width={180} height={45} alt="Project Peak" style={{ height: "auto" }} /></Link><Link href="/journal">Journal</Link></header>
    <article className={styles.article}>
      <Link href="/journal" className={styles.back}>← Journal ပြန်မယ်</Link>
      <header className={styles.articleHead}><p className={styles.kicker}>{date.toUpperCase()} · {post.language === "mm" ? "မြန်မာ" : "ENGLISH"}</p><h1>{post.title}</h1><p className={styles.lead}>{post.excerpt}</p></header>
      {post.cover_image_url ? <div className={styles.cover}><Image src={post.cover_image_url} fill priority sizes="900px" alt="" /></div> : null}
      <MarkdownContent content={post.content} className={styles.content} />
    </article>
    <footer className={styles.footer}><Image src="/brand/logo-light.svg" width={180} height={45} alt="Project Peak" /><p>KNOWLEDGE · HABITS · IDENTITY</p></footer>
  </div>;
}
