-- Overlander MVP1 schema

create extension if not exists pgcrypto;
create extension if not exists "uuid-ossp";

-- profiles
create table if not exists public.profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique references auth.users(id) on delete cascade,
  handle text unique,
  display_name text,
  avatar_url text,
  home_country text,
  membership_no text unique,
  membership_tier text check (membership_tier in ('explorer','adventurer','trailblazer')) default 'explorer',
  brand_affinity text check (brand_affinity in ('bmw','harley','other')) default 'other',
  created_at timestamptz default now(),
  updated_at timestamptz
);

-- bikes
create table if not exists public.bikes (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references public.profiles(id) on delete cascade,
  make text,
  model text,
  year int,
  plate_no text,
  nickname text,
  photo_url text,
  odo_start_km int,
  created_at timestamptz default now(),
  updated_at timestamptz
);

-- trips
create table if not exists public.trips (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references public.profiles(id) on delete cascade,
  title text not null,
  start_at timestamptz,
  end_at timestamptz,
  start_loc text,
  end_loc text,
  distance_km int,
  gpx_path text,
  gpx_hash text unique,
  cover_url text,
  is_overlander_official boolean default false,
  visibility text check (visibility in ('private','friends','public')) default 'private',
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz
);

create table if not exists public.trip_participants (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid references public.trips(id) on delete cascade,
  profile_id uuid references public.profiles(id) on delete cascade,
  role text check (role in ('owner','rider','support')) default 'rider',
  unique (trip_id, profile_id)
);

create table if not exists public.trip_photos (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid references public.trips(id) on delete cascade,
  url text,
  caption text,
  taken_at timestamptz,
  lat double precision,
  lng double precision,
  created_at timestamptz default now()
);

-- badges
create table if not exists public.badges (
  slug text primary key,
  name text not null,
  description text,
  icon text,
  criteria jsonb
);

create table if not exists public.profile_badges (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid references public.profiles(id) on delete cascade,
  badge_slug text references public.badges(slug) on delete cascade,
  awarded_at timestamptz default now(),
  unique (profile_id, badge_slug)
);

-- events (stub for future)
create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  region text,
  start_at timestamptz,
  end_at timestamptz,
  difficulty text,
  price_cents int,
  currency text default 'MYR',
  max_slots int,
  route_overview text,
  cover_url text,
  status text check (status in ('draft','published','closed')) default 'draft',
  created_at timestamptz default now(),
  updated_at timestamptz
);

-- RLS
alter table public.profiles enable row level security;
create policy "profiles are viewable by all" on public.profiles for select using (true);
create policy "users manage own profile" on public.profiles for all using (auth.uid() = user_id);

alter table public.bikes enable row level security;
create policy "owners manage bikes" on public.bikes for all using (owner_id in (select id from profiles where user_id = auth.uid()));

alter table public.trips enable row level security;
create policy "owners manage trips" on public.trips for all using (owner_id in (select id from profiles where user_id = auth.uid()));
create policy "public trips readable" on public.trips for select using (visibility = 'public' or owner_id in (select id from profiles where user_id = auth.uid()));
