-- Create role enum
create type public.app_role as enum ('seeker', 'priest', 'admin', 'owner');

-- Create profiles table for both priests and seekers
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  initials text,
  gender text,
  dob date,
  email text not null,
  phone text,
  address text,
  nationality text,
  religion text,
  community text,
  sub_sect text,
  gotra text,
  nakshatra text,
  rashi text,
  languages text[],
  rituals_comfortable text[],
  language_preferences text[],
  qualification_regular text,
  qualification_dharmic text,
  experience_years integer,
  preferred_timing text,
  occupation text,
  bio text,
  resume_url text,
  photo_url text,
  status text default 'offline',
  rating text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Create user_roles table (separate from profiles for security)
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role app_role not null,
  unique (user_id, role)
);

-- Create rituals table
create table public.rituals (
  id uuid primary key default gen_random_uuid(),
  seeker_id uuid references auth.users(id) on delete cascade not null,
  ritual_type text not null,
  details text,
  date_required timestamp with time zone not null,
  place_address text,
  power_available text,
  broadband_available text,
  signal_strength text,
  other_info text,
  guideline_confirmed boolean default false,
  budget_range text,
  preferred_community text,
  assigned_priest_id uuid references auth.users(id) on delete set null,
  status text default 'pending',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Create audit logs table
create table public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid references auth.users(id) on delete set null,
  action text not null,
  target_collection text,
  target_id uuid,
  detail text,
  timestamp timestamp with time zone default now()
);

-- Enable RLS
alter table public.profiles enable row level security;
alter table public.user_roles enable row level security;
alter table public.rituals enable row level security;
alter table public.audit_logs enable row level security;

-- Create security definer function to check roles
create or replace function public.has_role(_user_id uuid, _role app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.user_roles
    where user_id = _user_id
      and role = _role
  )
$$;

-- Create function to check if user is admin or owner
create or replace function public.is_admin(_user_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.user_roles
    where user_id = _user_id
      and role in ('admin', 'owner')
  )
$$;

-- Profiles policies
create policy "Users can view their own profile"
on public.profiles for select
using (auth.uid() = id);

create policy "Users can update their own profile"
on public.profiles for update
using (auth.uid() = id);

create policy "Users can insert their own profile"
on public.profiles for insert
with check (auth.uid() = id);

create policy "Admins can view all profiles"
on public.profiles for select
using (public.is_admin(auth.uid()));

create policy "Admins can update all profiles"
on public.profiles for update
using (public.is_admin(auth.uid()));

-- User roles policies
create policy "Users can view their own roles"
on public.user_roles for select
using (auth.uid() = user_id);

create policy "Admins can view all roles"
on public.user_roles for select
using (public.is_admin(auth.uid()));

create policy "Admins can manage all roles"
on public.user_roles for all
using (public.is_admin(auth.uid()));

-- Rituals policies
create policy "Seekers can view their own rituals"
on public.rituals for select
using (auth.uid() = seeker_id);

create policy "Priests can view assigned rituals"
on public.rituals for select
using (auth.uid() = assigned_priest_id);

create policy "Admins can view all rituals"
on public.rituals for select
using (public.is_admin(auth.uid()));

create policy "Seekers can create rituals"
on public.rituals for insert
with check (auth.uid() = seeker_id);

create policy "Admins can update rituals"
on public.rituals for update
using (public.is_admin(auth.uid()));

create policy "Admins can delete rituals"
on public.rituals for delete
using (public.is_admin(auth.uid()));

-- Audit logs policies
create policy "Admins can view audit logs"
on public.audit_logs for select
using (public.is_admin(auth.uid()));

create policy "Admins can insert audit logs"
on public.audit_logs for insert
with check (public.is_admin(auth.uid()));

-- Create function to update updated_at timestamp
create or replace function public.update_updated_at_column()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Create triggers for updated_at
create trigger update_profiles_updated_at
before update on public.profiles
for each row
execute function public.update_updated_at_column();

create trigger update_rituals_updated_at
before update on public.rituals
for each row
execute function public.update_updated_at_column();