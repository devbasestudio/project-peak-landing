import { notFound } from "next/navigation";
import { PostEditor } from "@/components/admin/post-editor";
import { getAdminPost } from "@/lib/blog";

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getAdminPost(id);
  if (!post) notFound();
  return <PostEditor post={post} />;
}
