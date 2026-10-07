import { NextResponse } from "next/server";
import { safeRedirectPath } from "@/lib/safe-redirect";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const nextParam = requestUrl.searchParams.get("next") ?? "/admin";
  const next = safeRedirectPath(nextParam, requestUrl.origin, "/admin");
  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) return NextResponse.redirect(new URL(next, requestUrl.origin));
  }
  return NextResponse.redirect(new URL("/admin/login?error=auth", requestUrl.origin));
}
