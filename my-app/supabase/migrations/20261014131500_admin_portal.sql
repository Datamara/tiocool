-- Portal de admin, contacto e interés del curso de IA.
-- Se puede correr en una base vacía.

create extension if not exists "pgcrypto";

create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description text,
  start_date timestamptz,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.course_interests (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references public.courses (id) on delete cascade,
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text,
  company text,
  message text,
  created_at timestamptz not null default now()
);

create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text,
  message text not null,
  source text not null default 'contacto',
  created_at timestamptz not null default now()
);

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

create index if not exists contact_submissions_created_at_idx
  on public.contact_submissions (created_at desc);

create index if not exists course_interests_created_at_idx
  on public.course_interests (created_at desc);

alter table public.courses enable row level security;
alter table public.course_interests enable row level security;
alter table public.contact_submissions enable row level security;
alter table public.admin_users enable row level security;

grant usage on schema public to anon, authenticated;

grant select on public.courses to anon, authenticated;
grant insert on public.course_interests to anon, authenticated;
grant select on public.course_interests to authenticated;
grant insert on public.contact_submissions to anon, authenticated;
grant select on public.contact_submissions to authenticated;
grant select on public.admin_users to authenticated;

drop policy if exists "Public read active courses" on public.courses;
create policy "Public read active courses"
on public.courses
for select
to anon, authenticated
using (is_active = true);

drop policy if exists "Public insert course interests" on public.course_interests;
create policy "Public insert course interests"
on public.course_interests
for insert
to anon, authenticated
with check (true);

drop policy if exists "Public insert contact submissions" on public.contact_submissions;
create policy "Public insert contact submissions"
on public.contact_submissions
for insert
to anon, authenticated
with check (true);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users
    where user_id = auth.uid()
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

drop policy if exists "Admins read own membership" on public.admin_users;
create policy "Admins read own membership"
on public.admin_users
for select
to authenticated
using (user_id = auth.uid());

drop policy if exists "Admins read contact submissions" on public.contact_submissions;
create policy "Admins read contact submissions"
on public.contact_submissions
for select
to authenticated
using (public.is_admin());

drop policy if exists "Admins read course interests" on public.course_interests;
create policy "Admins read course interests"
on public.course_interests
for select
to authenticated
using (public.is_admin());

insert into public.courses (slug, title, description, start_date, is_active)
values (
  'ia-completo-2026',
  'Curso Completo de IA',
  'Domina la Inteligencia Artificial aplicada al sector asegurador y financiero.',
  '2026-12-10 09:00:00-06',
  true
)
on conflict (slug) do update set
  title = excluded.title,
  description = excluded.description,
  start_date = excluded.start_date,
  is_active = excluded.is_active;

-- Primer acceso:
-- 1. Crea el usuario en Authentication → Users.
-- 2. Copia su UUID y corre:
-- insert into public.admin_users (user_id) values ('UUID-DEL-USUARIO');
