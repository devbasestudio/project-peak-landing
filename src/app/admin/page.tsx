import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default function AdminRedirect() {
  const adminAppUrl = process.env.ADMIN_APP_URL;
  if (!adminAppUrl) throw new Error("ADMIN_APP_URL is not configured");
  redirect(`${adminAppUrl.replace(/\/$/, "")}/website/posts`);
}
