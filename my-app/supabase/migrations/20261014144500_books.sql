-- Libros. Corre esto en el SQL Editor si public.books no existe.

create extension if not exists "pgcrypto";

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

alter table public.books enable row level security;

grant select on public.books to anon, authenticated;

drop policy if exists "Public read active books" on public.books;
create policy "Public read active books"
on public.books
for select
to anon, authenticated
using (is_active = true);

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
  is_active = true;

notify pgrst, 'reload schema';
