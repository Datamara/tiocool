-- Tío Cool · Supabase schema
-- Run in Supabase SQL Editor or via CLI

create extension if not exists "pgcrypto";

-- Books
create table if not exists public.books (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  quote text not null,
  description text not null,
  price numeric(10, 2) not null,
  price_note text,
  cover_url text not null,
  buy_url text not null,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Courses
create table if not exists public.courses (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description text,
  start_date timestamptz,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

-- Course interest registrations
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

-- Contact form submissions
create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text,
  message text not null,
  source text not null default 'historia',
  created_at timestamptz not null default now()
);

-- Updated at trigger for books
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists books_updated_at on public.books;
create trigger books_updated_at
before update on public.books
for each row execute function public.set_updated_at();

-- Row Level Security
alter table public.books enable row level security;
alter table public.courses enable row level security;
alter table public.course_interests enable row level security;
alter table public.contact_submissions enable row level security;

drop policy if exists "Public read active books" on public.books;
create policy "Public read active books"
on public.books for select
using (is_active = true);

drop policy if exists "Public read active courses" on public.courses;
create policy "Public read active courses"
on public.courses for select
using (is_active = true);

drop policy if exists "Public insert course interests" on public.course_interests;
create policy "Public insert course interests"
on public.course_interests for insert
with check (true);

drop policy if exists "Public insert contact submissions" on public.contact_submissions;
create policy "Public insert contact submissions"
on public.contact_submissions for insert
with check (true);

-- Seed course
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

-- Seed books
insert into public.books (slug, title, quote, description, price, price_note, cover_url, buy_url, sort_order)
values
  (
    'dos-veces-viuda',
    'Dos Veces Viuda',
    'Carácter es destino.',
    'Once historias de mujeres que vivieron la pérdida en más de una ocasión y lograron reinventarse. Resiliencia, amor propio y la fortaleza de quienes, a pesar del dolor, encontraron una nueva oportunidad.',
    300,
    'Tapa blanda · Bonobos Editores',
    '/libros/dos_veces_viuda.png',
    'https://www.tiocool.org/',
    1
  ),
  (
    'momentos-inesperados',
    'Momentos Inesperados',
    'El Seguro de Gastos Médicos no es un lujo, es una necesidad.',
    'Redefine el papel del seguro en nuestra vida, pasando de ser un «por si acaso» a una protección esencial. Ideal para asesores, empresarios y familias que buscan entender su verdadero valor.',
    279,
    'Bonobos Editores',
    '/libros/momentos_inesperados.png',
    'https://www.tiocool.org/',
    2
  ),
  (
    'cambiando-vidas',
    'Cambiando Vidas',
    'Historias que transforman la manera de emprender.',
    'Recopila relatos del sector financiero, consejos prácticos y estrategias para que emprendedores evolucionen a empresarios, basados en experiencias reales del sector asegurador y bancario.',
    279,
    'AM Editores',
    '/libros/cambiando_vidas.png',
    'https://www.ameditores.com/product/cambiando-vidas/',
    3
  ),
  (
    'camino-chingonario',
    'Camino al Chingonario',
    'Dos caminos: abundancia o mediocridad. Tú decides.',
    'Guía para desbloquear tu máximo potencial y alcanzar la prosperidad desde la paz interior, el autoconocimiento y la valentía. Un proceso claro y comprobado para emprendedores y buscadores de éxito.',
    279,
    'Edición digital e impresa',
    '/libros/camino_al_chingonario.png',
    'https://www.tiocool.org/',
    4
  )
on conflict (slug) do update set
  title = excluded.title,
  quote = excluded.quote,
  description = excluded.description,
  price = excluded.price,
  price_note = excluded.price_note,
  cover_url = excluded.cover_url,
  buy_url = excluded.buy_url,
  sort_order = excluded.sort_order,
  is_active = excluded.is_active;
