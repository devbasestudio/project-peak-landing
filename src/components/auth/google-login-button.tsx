"use client";

import { useState } from "react";
import Image from "next/image";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";

export function GoogleLoginButton() {
  const [loading, setLoading] = useState(false);
  async function login() {
    try {
      setLoading(true);
      const { error } = await createClient().auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: `${window.location.origin}/auth/callback?next=/admin` },
      });
      if (error) throw error;
    } catch (error) {
      setLoading(false);
      toast.error("Google Login မဝင်နိုင်သေးပါ", { description: error instanceof Error ? error.message : undefined });
    }
  }
  return <button type="button" onClick={login} disabled={loading} className="mt-8 flex min-h-14 w-full items-center justify-center gap-3 rounded-xl border border-black/10 bg-white px-5 text-sm font-bold shadow-sm transition hover:-translate-y-0.5 hover:border-peak-blue disabled:opacity-50">{loading ? <LoaderCircle className="animate-spin" size={20} /> : <Image src="/brand/google-g.svg" width={20} height={20} alt="" />}Google နဲ့ Admin ဝင်မယ်</button>;
}
