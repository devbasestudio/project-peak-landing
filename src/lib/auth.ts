import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function getViewer() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user) return null;
  const { data: admin } = await supabase.from("admin_users").select("user_id").eq("user_id", user.id).maybeSingle();
  return { user, isAdmin: Boolean(admin) };
}

export async function requireAdmin() {
  const viewer = await getViewer();
  if (!viewer) redirect("/admin/login");
  if (!viewer.isAdmin) redirect("/?notice=admin");
  return viewer;
}
