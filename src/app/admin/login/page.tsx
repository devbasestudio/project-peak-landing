import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { GoogleLoginButton } from "@/components/auth/google-login-button";
import { getViewer } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  const viewer = await getViewer();
  if (viewer?.isAdmin) redirect("/admin");
  return <main lang="my" className="grid min-h-screen bg-paper lg:grid-cols-[1.08fr_.92fr]"><section className="relative hidden overflow-hidden bg-ink lg:block"><Image src="/brand/hero-athlete-branded.jpg" fill priority sizes="54vw" className="object-cover opacity-75" alt="Project Peak athlete" /><div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" /><div className="absolute inset-x-10 bottom-10 text-white"><p className="mono text-[10px] tracking-[.22em] text-peak-blue">PROJECT PEAK · EDITORIAL DESK</p><h1 className="mt-4 max-w-xl text-5xl font-bold leading-tight">အတွေးအမြင်တွေကို<br />စာအဖြစ်ပြောင်းမယ်။</h1></div></section><section className="flex items-center px-5 py-12 sm:px-12"><div className="mx-auto w-full max-w-md"><Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-black/45"><ArrowLeft size={15} />Website ပြန်မယ်</Link><Image src="/brand/logo-dark.svg" width={190} height={52} className="mt-12" alt="Project Peak" /><p className="mono mt-12 text-[10px] tracking-[.2em] text-peak-blue">ADMIN ACCESS</p><h2 className="mt-3 text-4xl font-bold">Blog Admin Panel</h2><p className="mt-4 text-sm leading-7 text-black/50">သတ်မှတ်ထားတဲ့ Project Peak Admin Google account နဲ့ပဲ ဝင်ရောက်နိုင်ပါတယ်။</p><GoogleLoginButton />{viewer && !viewer.isAdmin ? <p className="mt-4 rounded-xl bg-red-50 p-4 text-sm text-red-700">ဒီ Google account မှာ Admin access မရှိပါ။</p> : null}</div></section></main>;
}
