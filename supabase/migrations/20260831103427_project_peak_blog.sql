-- Standalone Project Peak landing site journal.
-- Public visitors may only read published posts. Existing Project Peak admins
-- can create, edit, publish, and delete posts through the shared auth project.

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references auth.users(id) on delete restrict,
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  language text not null default 'mm' check (language in ('mm', 'en')),
  title text not null check (char_length(title) between 1 and 180),
  excerpt text not null default '' check (char_length(excerpt) <= 420),
  content text not null default '',
  cover_image_url text,
  cover_image_path text,
  seo_title text check (seo_title is null or char_length(seo_title) <= 180),
  seo_description text check (seo_description is null or char_length(seo_description) <= 320),
  status text not null default 'draft' check (status in ('draft', 'published')),
  featured boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (status <> 'published' or published_at is not null)
);

create index if not exists blog_posts_public_feed_idx
on public.blog_posts (published_at desc)
where status = 'published';

create index if not exists blog_posts_featured_idx
on public.blog_posts (featured, published_at desc)
where status = 'published';

drop trigger if exists blog_posts_set_updated_at on public.blog_posts;
create trigger blog_posts_set_updated_at
before update on public.blog_posts
for each row execute function private.set_updated_at();

alter table public.blog_posts enable row level security;

drop policy if exists blog_posts_public_read on public.blog_posts;
create policy blog_posts_public_read
on public.blog_posts for select
to anon, authenticated
using (status = 'published');

drop policy if exists blog_posts_admin_read on public.blog_posts;
create policy blog_posts_admin_read
on public.blog_posts for select
to authenticated
using ((select private.is_admin()));

drop policy if exists blog_posts_admin_insert on public.blog_posts;
create policy blog_posts_admin_insert
on public.blog_posts for insert
to authenticated
with check (
  (select private.is_admin())
  and author_id = (select auth.uid())
);

drop policy if exists blog_posts_admin_update on public.blog_posts;
create policy blog_posts_admin_update
on public.blog_posts for update
to authenticated
using ((select private.is_admin()))
with check (
  (select private.is_admin())
  and author_id = (select auth.uid())
);

drop policy if exists blog_posts_admin_delete on public.blog_posts;
create policy blog_posts_admin_delete
on public.blog_posts for delete
to authenticated
using ((select private.is_admin()));

revoke all on public.blog_posts from anon, authenticated;
grant select on public.blog_posts to anon;
grant select, insert, update, delete on public.blog_posts to authenticated;
