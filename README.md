# Project Peak

Project Peak ရဲ့ standalone brand website နဲ့ Supabase-backed editorial journal ဖြစ်ပါတယ်။

## Features

- Myanmar-first responsive landing page
- GSAP scroll reveals, parallax and Lenis smooth scrolling
- Mission, vision and two program offers
- Google-only protected admin panel
- Draft/publish blog workflow, cover uploads and SEO fields
- Supabase Auth, Postgres RLS and Storage
- Open Graph, sitemap, robots and PWA manifest metadata

## Local setup

```bash
cp .env.example .env.local
npm install
npm run dev
```

The required variables are documented in `.env.example`. The blog schema lives in `supabase/migrations`.

## Checks

```bash
npm run lint
npm run build
```
