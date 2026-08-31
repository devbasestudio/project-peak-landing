import Link from "next/link";

export default function NotFound() {
  return <main className="grid min-h-screen place-items-center bg-ink px-5 text-white"><div className="text-center"><p className="mono text-[10px] tracking-[.2em] text-peak-blue">404 · OFF THE TRAIL</p><h1 className="mt-5 text-6xl font-bold sm:text-8xl">Peak မတွေ့ပါ</h1><p className="mt-5 text-white/55">ဒီစာမျက်နှာ မရှိတော့ပါဘူး။</p><Link href="/" className="mt-8 inline-flex min-h-12 items-center bg-peak-blue px-6 font-bold text-ink">Home ပြန်မယ်</Link></div></main>;
}
