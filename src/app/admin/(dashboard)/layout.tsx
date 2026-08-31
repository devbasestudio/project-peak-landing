import Image from "next/image";
import Link from "next/link";
import { ExternalLink, LogOut, Newspaper, Plus } from "lucide-react";
import { signOut } from "@/app/actions";
import { requireAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const viewer = await requireAdmin();
  const name = viewer.user.user_metadata?.full_name ?? viewer.user.email ?? "Admin";
  const avatar = viewer.user.user_metadata?.avatar_url ?? viewer.user.user_metadata?.picture ?? null;
  return <div className="admin-shell"><header className="sticky top-0 z-40 border-b border-black/8 bg-white/95 backdrop-blur-xl"><div className="mx-auto flex min-h-16 max-w-[1280px] items-center justify-between gap-3 px-4 sm:px-6"><Link href="/admin" className="flex items-center gap-3"><Image src="/brand/icon-gradient.svg" width={32} height={32} alt="" /><span><strong className="block text-sm">PROJECT PEAK</strong><small className="mono block text-[8px] tracking-[.16em] text-black/35">EDITORIAL DESK</small></span></Link><nav className="hidden items-center gap-1 rounded-xl bg-[#f2f4f3] p-1 sm:flex"><Link href="/admin" className="flex min-h-10 items-center gap-2 rounded-lg bg-white px-4 text-xs font-bold shadow-sm"><Newspaper size={15} />Posts</Link><Link href="/admin/posts/new" className="flex min-h-10 items-center gap-2 rounded-lg px-4 text-xs font-bold"><Plus size={15} />New</Link></nav><div className="flex items-center gap-2"><Link href="/" target="_blank" className="grid h-10 w-10 place-items-center rounded-lg border border-black/10" aria-label="Open website"><ExternalLink size={16} /></Link><div className="hidden items-center gap-2 pl-1 md:flex">{avatar ? <Image src={avatar} width={32} height={32} className="rounded-full" alt="" /> : <span className="grid h-8 w-8 place-items-center rounded-full bg-peak-blue text-xs font-bold">{name[0]}</span>}<span className="max-w-28 truncate text-xs font-bold">{name}</span></div><form action={signOut}><button className="grid h-10 w-10 place-items-center rounded-lg border border-black/10" aria-label="Sign out"><LogOut size={16} /></button></form></div></div></header><main className="mx-auto w-full max-w-[1280px] px-4 py-7 sm:px-6 sm:py-10">{children}</main></div>;
}
