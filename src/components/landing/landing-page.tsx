"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Check, MoveRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import type { BlogPost } from "@/lib/blog";
import styles from "./landing.module.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const telegramUrl = "https://t.me/wayneax21";
const workoutUrl = "https://project-peak-beta.vercel.app/mm/login";

function dateLabel(value: string | null) {
  if (!value) return "PROJECT PEAK";
  return new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" })
    .format(new Date(value)).toUpperCase();
}

export function LandingPage({ posts }: { posts: BlogPost[] }) {
  const root = useRef<HTMLDivElement>(null);
  const cursor = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const lenis = new Lenis({ duration: 1.08, smoothWheel: true, wheelMultiplier: 0.82 });
    lenis.on("scroll", ScrollTrigger.update);
    const ticker = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(ticker);
      lenis.destroy();
    };
  }, []);

  useGSAP(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      gsap.set("[data-intro]", { display: "none" });
      return;
    }

    const intro = gsap.timeline({ defaults: { ease: "power4.inOut" } });
    intro
      .from("[data-intro-word]", { yPercent: 120, duration: 0.9, stagger: 0.08 })
      .to("[data-intro-line]", { scaleX: 1, duration: 0.7 }, "-=0.55")
      .to("[data-intro-word]", { yPercent: -120, duration: 0.7, stagger: 0.04, delay: 0.18 })
      .to("[data-intro]", { yPercent: -100, duration: 1.05, pointerEvents: "none" }, "-=0.25")
      .from("[data-hero-reveal]", { y: 46, opacity: 0, duration: 0.9, stagger: 0.09 }, "-=0.55");

    gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
      gsap.from(element, {
        y: 64,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: element, start: "top 88%", once: true },
      });
    });

    gsap.utils.toArray<HTMLElement>("[data-line-reveal]").forEach((element) => {
      gsap.from(element, {
        yPercent: 110,
        duration: 1.05,
        ease: "power4.out",
        scrollTrigger: { trigger: element, start: "top 91%", once: true },
      });
    });

    gsap.to("[data-hero-image]", {
      yPercent: 12,
      ease: "none",
      scrollTrigger: { trigger: "[data-hero]", start: "top top", end: "bottom top", scrub: true },
    });
    gsap.to("[data-vision-image]", {
      scale: 1.08,
      ease: "none",
      scrollTrigger: { trigger: "[data-vision]", start: "top bottom", end: "bottom top", scrub: true },
    });

    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (finePointer && cursor.current) {
      const x = gsap.quickTo(cursor.current, "x", { duration: 0.28, ease: "power3" });
      const y = gsap.quickTo(cursor.current, "y", { duration: 0.28, ease: "power3" });
      const move = (event: PointerEvent) => { x(event.clientX); y(event.clientY); };
      window.addEventListener("pointermove", move);
      return () => window.removeEventListener("pointermove", move);
    }
  }, { scope: root });

  return (
    <div ref={root} className={styles.site}>
      <div className={styles.cursor} ref={cursor} aria-hidden="true" />
      <div className={styles.intro} data-intro aria-hidden="true">
        <div className={styles.introBrand}>
          <span className={styles.introMask}><span data-intro-word>PROJECT</span></span>
          <span className={styles.introMask}><span data-intro-word>PEAK</span></span>
        </div>
        <div className={styles.introLine} data-intro-line />
        <p className={styles.introMeta}>KNOWLEDGE · HABITS · IDENTITY</p>
      </div>

      <header className={styles.header}>
        <Link href="#top" className={styles.brand} aria-label="Project Peak home">
          <Image src="/brand/logo-dark.svg" width={180} height={45} priority alt="Project Peak" style={{ height: "auto" }} />
        </Link>
        <nav className={styles.nav} aria-label="Main navigation">
          <Link href="#method">Method</Link>
          <Link href="#mission">Mission</Link>
          <Link href="#offers">Programs</Link>
          <Link href="/journal">Journal</Link>
        </nav>
        <Link href="#offers" className={styles.headerCta}>စတင်မယ် <ArrowDown size={14} /></Link>
      </header>

      <main>
        <section id="top" className={styles.hero} data-hero>
          <div className={styles.heroImage} data-hero-image>
            <Image src="/brand/hero-athlete-branded.jpg" fill priority sizes="100vw" alt="Project Peak athlete training" />
          </div>
          <div className={styles.heroShade} />
          <div className={styles.heroGrid}>
            <p className={styles.eyebrow} data-hero-reveal><span />12 WEEKS · ONE SYSTEM</p>
            <h1 data-hero-reveal>
              စိတ်ကူးထဲက <em>Body</em> ကို<br />
              တကယ်နားလည်ပြီး<br />
              <span>လိုက်လုပ်ဖြစ်အောင်</span>
            </h1>
            <p className={styles.heroCopy} data-hero-reveal>
              စနစ်တကျ စီစဉ်ထားတဲ့ 12 Weeks Plan နဲ့ ဒီနေ့ပဲ စတင်လိုက်ပါ။
            </p>
            <div className={styles.heroActions} data-hero-reveal>
              <Link href="#offers" className={styles.primaryButton}>Program ရွေးမယ် <ArrowUpRight size={18} /></Link>
              <Link href="#method" className={styles.textButton}>Project Peak Method <MoveRight size={20} /></Link>
            </div>
          </div>
          <div className={styles.heroFoot}>
            <span>PROJECT PEAK · MYANMAR</span><span>SCROLL TO ASCEND ↓</span>
          </div>
        </section>

        <section id="method" className={styles.manifesto}>
          <div className={styles.sectionIndex} data-reveal><span>01</span><p>THE REAL SHIFT</p></div>
          <div className={styles.manifestoBody}>
            <p className={styles.quote} data-reveal>“ငါ သေချာပြန်လုပ်မယ်” ဆိုတဲ့<br />သံသရာထဲ ပြန်မဝင်ရတော့ဘူး။</p>
            <div className={styles.bigStatement}>
              <div className={styles.lineMask}><span data-line-reveal>ခဏတာ Body နောက်ကိုပဲ</span></div>
              <div className={styles.lineMask}><span data-line-reveal>လိုက်နေရုံနဲ့ မလုံလောက်ဘူး။</span></div>
            </div>
            <div className={styles.methodGrid}>
              <div className={styles.methodNumber} data-reveal>02</div>
              <p data-reveal>
                တစ်ခါသိပြီးရင် တစ်သက်တာ အသုံးဝင်မယ့် အဓိက <b>Knowledge</b> နဲ့ သိထားတာကို အလိုအလျောက် လိုက်လုပ်စေမယ့် <b>Habits</b> ရှိရင် ဘယ်အခြေအနေမှာမဆို Body က သေချာပေါက် လိုက်လာလိမ့်မယ်။
              </p>
            </div>
          </div>
        </section>

        <section className={styles.pillars}>
          <article className={styles.pillar} data-reveal>
            <span className={styles.pillarNo}>01 / KNOW</span>
            <h2>Knowledge</h2>
            <p>ဘာလုပ်ရမလဲဆိုတာတင်မဟုတ်ဘဲ ဘာကြောင့်လုပ်ရတယ်ဆိုတာ နားလည်စေမယ့် အခြေခံအသိ။</p>
            <div className={styles.miniGraph}><i /><i /><i /><i /></div>
          </article>
          <article className={`${styles.pillar} ${styles.pillarBlue}`} data-reveal>
            <span className={styles.pillarNo}>02 / REPEAT</span>
            <h2>Habits</h2>
            <p>Motivation မလိုဘဲ ကိုယ့်နေ့စဉ်ဘဝထဲမှာ လွယ်လွယ်ကူကူ ဆက်လုပ်ဖြစ်စေမယ့် စနစ်။</p>
            <div className={styles.habitTrack}>{Array.from({ length: 12 }).map((_, index) => <i key={index} className={index < 9 ? styles.active : ""} />)}</div>
          </article>
          <article className={styles.pillar} data-reveal>
            <span className={styles.pillarNo}>03 / BECOME</span>
            <h2>Identity</h2>
            <p>Body နဲ့ထိုက်တန်တဲ့ လူတစ်ယောက်အဖြစ် ကိုယ့်ကိုယ်ကို မြင်ပြီး ရေရှည်တည်တံ့စေမယ့် Identity။</p>
            <div className={styles.identityMark}>P<span>↗</span></div>
          </article>
        </section>

        <section id="mission" className={styles.mission}>
          <div className={styles.sectionIndex} data-reveal><span>02</span><p>OUR MISSION</p></div>
          <div className={styles.missionGrid}>
            <h2 data-reveal>မလုပ်ချင်တဲ့သူပါ<br /><em>လိုက်လုပ်ဖြစ်ဖို့။</em></h2>
            <div className={styles.missionCopy} data-reveal>
              <p>Fit ဖြစ်ချင်ပေမယ့် အစကနေအဆုံး လိုက်လေ့လာရတာ လူတိုင်း ဝါသနာမပါဘူး။ လေ့လာချင်ရင်တောင် Information အများကြီးကြားမှာ စိတ်ရှုပ်သွားတတ်ကြတယ်။</p>
              <p>ဒါပေမယ့် လူတိုင်းက ကိုယ်လိုချင်တဲ့ Body နဲ့ ကျန်းမာတဲ့ဘဝကို ပိုင်ဆိုင်ဖို့ ထိုက်တန်ပါတယ်။ တကယ်အပြောင်းအလဲဖြစ်စေမယ့် Knowledge ကို လက်တွေ့လိုက်လုပ်ရလွယ်အောင်၊ လိုက်လုပ်ချင်စရာကောင်းအောင် စီစဉ်ပြီး Goal Fitness Lifestyle အထိ ရောက်စေဖို့က Project Peak ရဲ့ Mission ပါ။</p>
            </div>
          </div>
        </section>

        <section className={styles.vision} data-vision>
          <div className={styles.visionImage} data-vision-image>
            <Image src="/brand/backpack-load-branded.jpg" fill sizes="100vw" alt="Training toward a stronger life" />
          </div>
          <div className={styles.visionShade} />
          <div className={styles.visionContent}>
            <div className={`${styles.sectionIndex} ${styles.lightIndex}`} data-reveal><span>03</span><p>OUR VISION</p></div>
            <h2 data-reveal>ပိုကျစ်လစ်။<br />ပိုကျန်းမာ။<br /><em>ပိုကောင်းတဲ့ဘဝ။</em></h2>
            <p data-reveal>Fit ဖြစ်လာတာက အပြင်ပန်း Body တင်မဟုတ်ပါဘူး။ စိတ်နဲ့ကိုယ် ကျန်းမာလာပြီး ဘဝတစ်ခုလုံးကို မယုံနိုင်လောက်အောင် ပိုကောင်းစေနိုင်ပါတယ်။ Gym ကို ဘဝကြီးလို ဆော့ဖို့မဟုတ်ဘဲ မြန်မာလူမျိုးတိုင်း ပိုကျစ်လစ်၊ ပိုကျန်းမာပြီး ပိုကောင်းတဲ့ လူ့ပတ်ဝန်းကျင်တစ်ခုဖြစ်လာဖို့ ကြိုးစားသွားမယ်။</p>
          </div>
        </section>

        <section id="offers" className={styles.offers}>
          <div className={styles.sectionIndex} data-reveal><span>04</span><p>CHOOSE YOUR PATH</p></div>
          <div className={styles.offerHeading}>
            <h2 data-reveal>စတင်ဖို့<br />လမ်းကြောင်း <em>၂ ခု</em></h2>
            <p data-reveal>ကိုယ်တိုင်သွားမယ့် system နဲ့ coach တစ်ယောက်နဲ့အတူ သွားမယ့် system—ကိုယ့်အတွက် အဆင်ပြေမယ့်လမ်းကို ရွေးပါ။</p>
          </div>
          <div className={styles.offerList}>
            <article className={styles.offer} data-reveal>
              <div className={styles.offerTop}><span>01</span><span>PERSONAL GUIDANCE</span></div>
              <div><h3>1:1 Coaching</h3><p className={styles.duration}>3 Months · Personal coaching</p></div>
              <ul><li><Check size={15} />တစ်ဦးချင်းလိုက်ဖက်တဲ့ Program</li><li><Check size={15} />Progress review & accountability</li><li><Check size={15} />Direct coaching support</li></ul>
              <div className={styles.price}><strong>550,000</strong><span>MMK / PACKAGE</span></div>
              <a href={telegramUrl} target="_blank" rel="noreferrer" className={styles.offerButton}>Coach နဲ့ဆွေးနွေးမယ် <ArrowUpRight /></a>
            </article>
            <article className={`${styles.offer} ${styles.featuredOffer}`} data-reveal>
              <div className={styles.offerTop}><span>02</span><span>START ANYWHERE</span></div>
              <div><h3>Home Workout</h3><p className={styles.duration}>12 Weeks · Complete system</p></div>
              <ul><li><Check size={15} />48 guided sessions</li><li><Check size={15} />Baseline & progress tracking</li><li><Check size={15} />No gym required</li></ul>
              <div className={styles.price}><strong>75,000</strong><span>MMK / PROGRAM</span></div>
              <a href={workoutUrl} target="_blank" rel="noreferrer" className={styles.offerButton}>12 Weeks စတင်မယ် <ArrowUpRight /></a>
            </article>
          </div>
        </section>

        <section className={styles.journal}>
          <div className={styles.journalHead} data-reveal>
            <div className={styles.sectionIndex}><span>05</span><p>PEAK JOURNAL</p></div>
            <h2>Train your<br /><em>mind first.</em></h2>
            <Link href="/journal">စာအားလုံးဖတ်မယ် <MoveRight size={18} /></Link>
          </div>
          {posts.length > 0 ? (
            <div className={styles.postGrid}>
              {posts.map((post, index) => (
                <Link href={`/journal/${post.slug}`} className={styles.postCard} key={post.id} data-reveal>
                  <div className={styles.postImage}>
                    {post.cover_image_url ? <Image src={post.cover_image_url} fill sizes="(max-width: 800px) 100vw, 33vw" alt="" /> : <span>0{index + 1}</span>}
                  </div>
                  <p className={styles.postMeta}>{dateLabel(post.published_at)} · {post.language === "mm" ? "မြန်မာ" : "ENGLISH"}</p>
                  <h3>{post.title}</h3><p>{post.excerpt}</p>
                </Link>
              ))}
            </div>
          ) : (
            <div className={styles.emptyJournal} data-reveal>
              <span>FIELD NOTES / 001</span><p>Training, habits နဲ့ fitness lifestyle အကြောင်း Project Peak Journal မှာ မကြာခင် စတင်ဖတ်ရှုနိုင်ပါမယ်။</p>
            </div>
          )}
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerWord}>PROJECT <span>PEAK</span></div>
        <div className={styles.footerGrid}>
          <Image src="/brand/logo-light.svg" width={190} height={48} alt="Project Peak" />
          <p>Knowledge. Habits. Identity.<br />Built for a stronger Myanmar.</p>
          <div><Link href="#method">Method</Link><Link href="#offers">Programs</Link><Link href="/journal">Journal</Link><Link href="/admin">Admin</Link></div>
          <p className={styles.copyright}>© {new Date().getFullYear()} PROJECT PEAK</p>
        </div>
      </footer>
    </div>
  );
}
