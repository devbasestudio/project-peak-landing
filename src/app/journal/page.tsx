import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getPublishedPosts } from "@/lib/blog";
import styles from "./journal.module.css";

export const metadata: Metadata = {
  title: "Journal",
  description: "Training, habits, mindset နဲ့ sustainable fitness lifestyle အတွက် Project Peak field notes။",
};

export const revalidate = 60;

function formatDate(value: string | null) {
  if (!value) return "PROJECT PEAK";
  return new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(value)).toUpperCase();
}

export default async function JournalPage() {
  const posts = await getPublishedPosts();
  return <div className={styles.shell}>
    <header className={styles.header}><Link href="/"><Image src="/brand/logo-dark.svg" width={180} height={45} alt="Project Peak" style={{ height: "auto" }} /></Link><Link href="/">← Back to home</Link></header>
    <main>
      <section className={styles.hero}><p className={styles.kicker}>PROJECT PEAK · FIELD NOTES</p><h1>Train your<br /><span>mind first.</span></h1><p>Training, habits နဲ့ mindset ကို ရှင်းရှင်းလင်းလင်း နားလည်ပြီး ရေရှည်လိုက်လုပ်နိုင်ဖို့ ရေးထားတဲ့ Project Peak Journal။</p></section>
      {posts.length ? <section className={styles.grid}>{posts.map((post, index) => <Link href={`/journal/${post.slug}`} className={styles.card} key={post.id}><div className={styles.image}>{post.cover_image_url ? <Image src={post.cover_image_url} fill sizes="(max-width: 820px) 50vw, 33vw" alt="" /> : <span className={styles.placeholder}>{String(index + 1).padStart(2, "0")}</span>}</div><p className={styles.meta}>{formatDate(post.published_at)} · {post.language === "mm" ? "မြန်မာ" : "ENGLISH"}</p><h2>{post.title}</h2><p className={styles.excerpt}>{post.excerpt}</p></Link>)}</section> : <div className={styles.empty}>Project Peak Journal ကို မကြာခင် စတင်ဖတ်ရှုနိုင်ပါမယ်။</div>}
    </main>
    <footer className={styles.footer}><Image src="/brand/logo-light.svg" width={180} height={45} alt="Project Peak" /><p>KNOWLEDGE · HABITS · IDENTITY</p></footer>
  </div>;
}
