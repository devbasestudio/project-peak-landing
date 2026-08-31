import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

const allowed = new Set(["image/jpeg", "image/png", "image/webp"]);

export async function POST(request: Request) {
  await requireAdmin();
  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File)) return NextResponse.json({ error: "Image file လိုအပ်ပါတယ်" }, { status: 400 });
  if (!allowed.has(file.type) || file.size > 8 * 1024 * 1024) return NextResponse.json({ error: "JPG, PNG, WEBP 8MB အောက်ပဲ တင်နိုင်ပါတယ်" }, { status: 400 });
  const extension = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
  const objectPath = `blog/${crypto.randomUUID()}.${extension}`;
  const supabase = await createClient();
  const { error } = await supabase.storage.from("site-assets").upload(objectPath, file, { contentType: file.type, cacheControl: "31536000", upsert: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  const { data } = supabase.storage.from("site-assets").getPublicUrl(objectPath);
  return NextResponse.json({ url: data.publicUrl, path: objectPath });
}
