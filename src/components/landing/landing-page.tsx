"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  Menu,
  MoveRight,
  X,
} from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import type { BlogPost } from "@/lib/blog";
import styles from "./landing.module.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const telegramUrl = "https://t.me/wayneax21";
const coachingUrl = "https://project-peak-coaching.vercel.app";
const workoutUrl = "https://project-peak-beta.vercel.app/mm/login";

const methodSteps = [
  {
    no: "01",
    label: "UNDERSTAND",
    title: "Knowledge",
    text: "ဘာလုပ်ရမလဲဆိုတာတင်မဟုတ်ဘဲ ဘာကြောင့်လုပ်ရတယ်ဆိုတာ နားလည်စေမယ့် အဓိကအသိကို တည်ဆောက်မယ်။",
    meta: "LEARN THE WHY",
  },
  {
    no: "02",
    label: "REPEAT",
    title: "Habits",
    text: "Motivation ကိုစောင့်မနေဘဲ ကိုယ့်နေ့စဉ်ဘဝထဲမှာ လွယ်လွယ်ကူကူ ဆက်လုပ်ဖြစ်စေမယ့် စနစ်ကို ဖန်တီးမယ်။",
    meta: "BUILD THE RHYTHM",
  },
  {
    no: "03",
    label: "BECOME",
    title: "Identity",
    text: "လိုချင်တဲ့ Body နဲ့ထိုက်တန်တဲ့ လူတစ်ယောက်အဖြစ် ကိုယ့်ကိုယ်ကိုမြင်ပြီး ရေရှည်တည်တံ့အောင် ပြောင်းလဲမယ်။",
    meta: "LIVE THE CHANGE",
  },
];

function dateLabel(value: string | null) {
  if (!value) return "PROJECT PEAK";
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
    .format(new Date(value))
    .toUpperCase();
}

export function LandingPage({ posts }: { posts: BlogPost[] }) {
  const root = useRef<HTMLDivElement>(null);
  const cursor = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;
    const lenis = new Lenis({
      duration: 1.12,
      smoothWheel: true,
      wheelMultiplier: 0.82,
    });
    lenis.on("scroll", ScrollTrigger.update);
    const ticker = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(ticker);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useGSAP(
    () => {
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduced) {
        gsap.set("[data-intro]", { display: "none" });
        return;
      }

      const intro = gsap.timeline({ defaults: { ease: "power4.inOut" } });
      intro
        .from("[data-intro-mark]", { scale: 0.68, opacity: 0, duration: 0.7 })
        .from(
          "[data-intro-word]",
          { yPercent: 120, duration: 0.82, stagger: 0.06 },
          "-=0.45",
        )
        .to("[data-intro-line]", { scaleX: 1, duration: 0.62 }, "-=0.45")
        .to("[data-intro-word]", {
          yPercent: -120,
          duration: 0.65,
          stagger: 0.035,
          delay: 0.18,
        })
        .to(
          "[data-intro]",
          {
            clipPath: "inset(0 0 100% 0)",
            duration: 1.05,
            pointerEvents: "none",
          },
          "-=0.35",
        )
        .from(
          "[data-hero-reveal]",
          { y: 52, opacity: 0, duration: 0.88, stagger: 0.08 },
          "-=0.68",
        )
        .from(
          "[data-hero-media]",
          { clipPath: "inset(0 0 0 100%)", duration: 1.25 },
          "-=1.05",
        );

      gsap.to("[data-hero-media-inner]", {
        yPercent: 10,
        scale: 1.05,
        ease: "none",
        scrollTrigger: {
          trigger: "[data-hero]",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to("[data-ticker-track]", {
        xPercent: -18,
        ease: "none",
        scrollTrigger: {
          trigger: "[data-ticker]",
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
        },
      });
      gsap.utils
        .toArray<HTMLElement>("[data-reveal]")
        .forEach((element) =>
          gsap.from(element, {
            y: 64,
            opacity: 0,
            duration: 0.95,
            ease: "power3.out",
            scrollTrigger: { trigger: element, start: "top 88%", once: true },
          }),
        );
      gsap.utils
        .toArray<HTMLElement>("[data-wipe]")
        .forEach((element) =>
          gsap.from(element, {
            clipPath: "inset(0 100% 0 0)",
            duration: 1.05,
            ease: "power4.inOut",
            scrollTrigger: { trigger: element, start: "top 88%", once: true },
          }),
        );
      gsap.utils
        .toArray<HTMLElement>("[data-method-row]")
        .forEach((row) =>
          gsap.from(row.children, {
            y: 42,
            opacity: 0,
            duration: 0.78,
            stagger: 0.055,
            ease: "power3.out",
            scrollTrigger: { trigger: row, start: "top 87%", once: true },
          }),
        );
      gsap.to("[data-vision-media]", {
        scale: 1.1,
        ease: "none",
        scrollTrigger: {
          trigger: "[data-vision]",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      const finePointer = window.matchMedia("(pointer: fine)").matches;
      if (finePointer && cursor.current) {
        const x = gsap.quickTo(cursor.current, "x", {
          duration: 0.24,
          ease: "power3",
        });
        const y = gsap.quickTo(cursor.current, "y", {
          duration: 0.24,
          ease: "power3",
        });
        const move = (event: PointerEvent) => {
          x(event.clientX);
          y(event.clientY);
        };
        const activate = () =>
          cursor.current?.classList.add(styles.cursorActive);
        const deactivate = () =>
          cursor.current?.classList.remove(styles.cursorActive);
        const targets = root.current?.querySelectorAll("a, button") ?? [];
        window.addEventListener("pointermove", move);
        targets.forEach((target) => {
          target.addEventListener("mouseenter", activate);
          target.addEventListener("mouseleave", deactivate);
        });
        return () => {
          window.removeEventListener("pointermove", move);
          targets.forEach((target) => {
            target.removeEventListener("mouseenter", activate);
            target.removeEventListener("mouseleave", deactivate);
          });
        };
      }
    },
    { scope: root },
  );

  const closeMenu = () => setMenuOpen(false);

  return (
    <div ref={root} className={styles.site}>
      <div className={styles.cursor} ref={cursor} aria-hidden="true" />

      <div className={styles.intro} data-intro aria-hidden="true">
        <Image
          data-intro-mark
          src="/brand/icon-gradient.svg"
          width={82}
          height={82}
          alt=""
          className={styles.introMark}
        />
        <div className={styles.introWords}>
          <span className={styles.introMask}>
            <span data-intro-word>PROJECT</span>
          </span>
          <span className={styles.introMask}>
            <span data-intro-word>PEAK</span>
          </span>
        </div>
        <div className={styles.introLine} data-intro-line />
        <p>KNOWLEDGE · HABITS · IDENTITY</p>
      </div>

      <header className={styles.header}>
        <Link
          href="#top"
          className={styles.brand}
          aria-label="Project Peak home"
          onClick={closeMenu}
        >
          <Image
            src="/brand/logo-light.svg"
            width={178}
            height={45}
            priority
            alt="Project Peak"
          />
        </Link>
        <nav className={styles.nav} aria-label="Main navigation">
          <Link href="#method">Method</Link>
          <Link href="#mission">Mission</Link>
          <Link href="#programs">Programs</Link>
          <Link href="/journal">Journal</Link>
        </nav>
        <Link href="#programs" className={styles.headerCta}>
          START <ArrowUpRight size={15} />
        </Link>
        <button
          type="button"
          className={styles.menuButton}
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      <div
        className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ""}`}
      >
        <nav aria-label="Mobile navigation">
          <Link href="#method" onClick={closeMenu}>
            <span>01</span>Method
          </Link>
          <Link href="#mission" onClick={closeMenu}>
            <span>02</span>Mission
          </Link>
          <Link href="#programs" onClick={closeMenu}>
            <span>03</span>Programs
          </Link>
          <Link href="/journal" onClick={closeMenu}>
            <span>04</span>Journal
          </Link>
        </nav>
        <p>KNOWLEDGE · HABITS · IDENTITY</p>
      </div>

      <main>
        <section id="top" className={styles.hero} data-hero>
          <div className={styles.heroMedia} data-hero-media>
            <div className={styles.heroMediaInner} data-hero-media-inner>
              <Image
                src="/brand/hero-peak-training-v5.webp"
                fill
                priority
                sizes="100vw"
                alt="Project Peak athlete moving with focused strength in a dark training studio"
              />
            </div>
          </div>
          <div className={styles.heroGradient} />
          <div className={styles.heroGrid} aria-hidden="true" />
          <div className={styles.heroGhost} aria-hidden="true">
            PEAK
          </div>
          <div className={styles.heroContent}>
            <p className={styles.eyebrow} data-hero-reveal>
              <span />
              12 WEEKS · ONE SYSTEM · YOUR PACE
            </p>
            <h1 data-hero-reveal>
              စိတ်ကူးထဲက
              <br />
              <em>Body</em> ကို တကယ်
              <br />
              <span>လိုက်လုပ်ဖြစ်အောင်</span>
            </h1>
            <p className={styles.heroCopy} data-hero-reveal>
              အလွယ်တကူစတင်နိုင်ပြီး ရေရှည်ဆက်လုပ်ဖြစ်စေမယ့် Knowledge၊ Habits
              နဲ့ Identity ကို 12 ပတ်အတွင်း တည်ဆောက်ပါ။
            </p>
            <div className={styles.heroActions} data-hero-reveal>
              <Link href="#programs" className={styles.primaryButton}>
                Program ရွေးမယ် <ArrowUpRight size={19} />
              </Link>
              <Link href="#method" className={styles.ghostButton}>
                Method ကိုကြည့်မယ် <ArrowDown size={17} />
              </Link>
            </div>
          </div>
          <div className={styles.heroMetrics} data-hero-reveal>
            <div>
              <strong>12</strong>
              <span>WEEKS</span>
            </div>
            <div>
              <strong>48</strong>
              <span>SESSIONS</span>
            </div>
            <div>
              <strong>01</strong>
              <span>SYSTEM</span>
            </div>
          </div>
          <div className={styles.scrollCue} data-hero-reveal>
            <i />
            <span>SCROLL TO ASCEND</span>
          </div>
        </section>

        <section
          className={styles.ticker}
          data-ticker
          aria-label="Project Peak principles"
        >
          <div className={styles.tickerTrack} data-ticker-track>
            <span>KNOWLEDGE</span>
            <i />
            <span>HABITS</span>
            <i />
            <span>IDENTITY</span>
            <i />
            <span>KNOWLEDGE</span>
            <i />
            <span>HABITS</span>
            <i />
            <span>IDENTITY</span>
            <i />
          </div>
        </section>

        <section id="method" className={styles.method}>
          <div className={styles.sectionLabel} data-reveal>
            <span>01</span>
            <p>THE PROJECT PEAK METHOD</p>
            <i />
          </div>
          <div className={styles.methodLead}>
            <p className={styles.methodQuote} data-reveal>
              “ငါ သေချာပြန်လုပ်မယ်” ဆိုတဲ့ သံသရာထဲက ထွက်ဖို့။
            </p>
            <h2 data-wipe>
              Body နောက်ကို ခဏခဏ
              <br />
              လိုက်နေတာထက်—
              <em>
                {" "}
                Body က ကိုယ့်နောက်ကို
                <br />
                လိုက်လာမယ့်စနစ်
              </em>{" "}
              တည်ဆောက်ပါ။
            </h2>
          </div>
          <div className={styles.methodRows}>
            {methodSteps.map((step) => (
              <article
                className={styles.methodRow}
                key={step.no}
                data-method-row
              >
                <span className={styles.methodNo}>{step.no}</span>
                <div className={styles.methodTitle}>
                  <small>{step.label}</small>
                  <h3>{step.title}</h3>
                </div>
                <p>{step.text}</p>
                <div className={styles.methodMeta}>
                  <span>{step.meta}</span>
                  <ArrowUpRight size={18} />
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="mission" className={styles.mission} data-vision>
          <div className={styles.missionMedia}>
            <div data-vision-media>
              <Image
                src="/brand/vision-peak-yangon-v5.webp"
                fill
                sizes="(max-width: 800px) 100vw, 58vw"
                alt="Two Project Peak athletes walking confidently after training in Yangon"
              />
            </div>
            <div className={styles.missionImageShade} />
            <p>BUILT FOR A STRONGER MYANMAR</p>
          </div>
          <div className={styles.missionContent}>
            <div
              className={`${styles.sectionLabel} ${styles.sectionLabelLight}`}
              data-reveal
            >
              <span>02</span>
              <p>MISSION + VISION</p>
              <i />
            </div>
            <p className={styles.missionKicker} data-reveal>
              FITNESS SHOULD FEEL POSSIBLE
            </p>
            <h2 data-reveal>
              မလုပ်ချင်တဲ့သူပါ
              <br />
              <em>လိုက်လုပ်ဖြစ်ဖို့။</em>
            </h2>
            <div className={styles.missionCopy} data-reveal>
              <p>
                Fit ဖြစ်ချင်ပေမယ့် အစကနေအဆုံး လိုက်လေ့လာရတာ လူတိုင်း
                ဝါသနာမပါဘူး။ Information အများကြီးကြားမှာ စိတ်ရှုပ်သွားတာလည်း
                ဖြစ်တတ်ပါတယ်။
              </p>
              <p>
                Project Peak က တကယ်အပြောင်းအလဲဖြစ်စေမယ့် Knowledge ကို
                ရှင်းလင်းပြီး လက်တွေ့လုပ်ရလွယ်အောင် စီစဉ်ထားပါတယ်။ ပိုကျစ်လစ်၊
                စိတ်ကောကိုယ်ကော ပိုကျန်းမာတဲ့ လူနေမှုပုံစံတစ်ခုဆီ ရောက်ဖို့ပါ။
              </p>
            </div>
            <div className={styles.missionStatement} data-reveal>
              <strong>BETTER BODY.</strong>
              <strong>BETTER LIFE.</strong>
              <strong>BETTER MYANMAR.</strong>
            </div>
          </div>
        </section>

        <section id="programs" className={styles.programs}>
          <div className={styles.sectionLabel} data-reveal>
            <span>03</span>
            <p>CHOOSE YOUR PATH</p>
            <i />
          </div>
          <div className={styles.programHeading}>
            <h2 data-wipe>
              စတင်ဖို့
              <br />
              <em>လမ်းကြောင်း ၂ ခု</em>
            </h2>
            <p data-reveal>
              ကိုယ်တိုင်သွားမယ့် complete system နဲ့ Coach တစ်ယောက်နဲ့အတူ
              သွားမယ့် personal system—ကိုယ့်အတွက် မှန်တဲ့လမ်းကို ရွေးပါ။
            </p>
          </div>
          <div className={styles.programList}>
            <article className={styles.programRow} data-reveal>
              <div className={styles.programIndex}>
                <span>01</span>
                <small>PERSONAL</small>
              </div>
              <div className={styles.programName}>
                <h3>1:1 Coaching</h3>
                <p>3 MONTHS · PERSONAL GUIDANCE</p>
              </div>
              <ul>
                <li>
                  <Check size={15} />
                  Personalized program
                </li>
                <li>
                  <Check size={15} />
                  Progress review
                </li>
                <li>
                  <Check size={15} />
                  Direct support
                </li>
              </ul>
              <div className={styles.programPrice}>
                <strong>550K</strong>
                <span>MMK / PACKAGE</span>
              </div>
              <a
                href={coachingUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Open the Project Peak 1 on 1 coaching website"
              >
                <ArrowUpRight />
              </a>
            </article>
            <article
              className={`${styles.programRow} ${styles.programFeatured}`}
              data-reveal
            >
              <div className={styles.programIndex}>
                <span>02</span>
                <small>START ANYWHERE</small>
              </div>
              <div className={styles.programName}>
                <h3>Home Workout</h3>
                <p>12 WEEKS · COMPLETE SYSTEM</p>
              </div>
              <ul>
                <li>
                  <Check size={15} />
                  48 guided sessions
                </li>
                <li>
                  <Check size={15} />
                  Progress tracking
                </li>
                <li>
                  <Check size={15} />
                  No gym required
                </li>
              </ul>
              <div className={styles.programPrice}>
                <strong>75K</strong>
                <span>MMK / PROGRAM</span>
              </div>
              <a
                href={workoutUrl}
                target="_blank"
                rel="noreferrer"
                aria-label="Start the 12 week home workout program"
              >
                <ArrowUpRight />
              </a>
            </article>
          </div>
          <div className={styles.programFoot} data-reveal>
            <p>မသေချာသေးဘူးလား?</p>
            <a href={telegramUrl} target="_blank" rel="noreferrer">
              Coach နဲ့အရင်ဆွေးနွေးမယ် <MoveRight size={19} />
            </a>
          </div>
        </section>

        <section className={styles.journal}>
          <div className={styles.journalHeading}>
            <div className={styles.sectionLabel} data-reveal>
              <span>04</span>
              <p>PEAK JOURNAL</p>
              <i />
            </div>
            <h2 data-wipe>
              TRAIN YOUR
              <br />
              <em>MIND FIRST.</em>
            </h2>
            <Link href="/journal" data-reveal>
              စာအားလုံးဖတ်မယ် <ArrowRight size={18} />
            </Link>
          </div>
          {posts.length > 0 ? (
            <div className={styles.postList}>
              {posts.map((post, index) => (
                <Link
                  href={`/journal/${post.slug}`}
                  className={styles.postRow}
                  key={post.id}
                  data-reveal
                >
                  <span className={styles.postIndex}>0{index + 1}</span>
                  <div className={styles.postImage}>
                    {post.cover_image_url ? (
                      <Image
                        src={post.cover_image_url}
                        fill
                        sizes="(max-width: 800px) 100vw, 28vw"
                        alt=""
                      />
                    ) : (
                      <span>
                        PEAK
                        <br />
                        NOTES
                      </span>
                    )}
                  </div>
                  <div className={styles.postText}>
                    <p>
                      {dateLabel(post.published_at)} ·{" "}
                      {post.language === "mm" ? "မြန်မာ" : "ENGLISH"}
                    </p>
                    <h3>{post.title}</h3>
                    <span>{post.excerpt}</span>
                  </div>
                  <ArrowUpRight className={styles.postArrow} />
                </Link>
              ))}
            </div>
          ) : (
            <div className={styles.emptyJournal} data-reveal>
              <span>FIELD NOTES / 001</span>
              <p>
                Training, habits နဲ့ fitness lifestyle အကြောင်း Project Peak
                Journal မှာ မကြာခင် စတင်ဖတ်ရှုနိုင်ပါမယ်။
              </p>
              <ArrowUpRight />
            </div>
          )}
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerTop}>
          <p>READY TO ASCEND?</p>
          <Link href="#programs">
            ဒီနေ့စတင်မယ် <ArrowUpRight />
          </Link>
        </div>
        <div className={styles.footerWord} aria-label="Project Peak">
          PROJECT <span>PEAK</span>
        </div>
        <div className={styles.footerBottom}>
          <Image
            src="/brand/logo-light.svg"
            width={168}
            height={43}
            alt="Project Peak"
          />
          <p>
            Knowledge. Habits. Identity.
            <br />
            Built for a stronger Myanmar.
          </p>
          <nav aria-label="Footer navigation">
            <Link href="#method">Method</Link>
            <Link href="#programs">Programs</Link>
            <Link href="/journal">Journal</Link>
          </nav>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} PROJECT PEAK
          </p>
        </div>
      </footer>
    </div>
  );
}
