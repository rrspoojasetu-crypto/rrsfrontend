-- Create service categories table
create table public.service_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  icon text,
  color text,
  bg_color text,
  display_order integer default 0,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Create services table
create table public.services (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references public.service_categories(id) on delete cascade,
  name text not null,
  description text,
  duration text,
  price decimal(10,2),
  currency text default 'INR',
  is_active boolean default true,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Add new columns to rituals table
alter table public.rituals add column if not exists caste text;
alter table public.rituals add column if not exists google_meet_link text;
alter table public.rituals add column if not exists meeting_analysis_url text;
alter table public.rituals add column if not exists service_id uuid references public.services(id) on delete set null;
alter table public.rituals add column if not exists personal_info_detected boolean default false;
alter table public.rituals add column if not exists admin_notified boolean default false;
alter table public.rituals add column if not exists time_required time;

-- Enable RLS on new tables
alter table public.service_categories enable row level security;
alter table public.services enable row level security;

-- Service categories policies (public read, admin write)
create policy "Anyone can view service categories"
on public.service_categories for select
using (true);

create policy "Admins can manage service categories"
on public.service_categories for all
using (public.is_admin(auth.uid()));

-- Services policies (public read active services, admin write)
create policy "Anyone can view active services"
on public.services for select
using (is_active = true or public.is_admin(auth.uid()));

create policy "Admins can manage services"
on public.services for all
using (public.is_admin(auth.uid()));

-- Create trigger for service_categories updated_at
create trigger update_service_categories_updated_at
before update on public.service_categories
for each row
execute function public.update_updated_at_column();

-- Create trigger for services updated_at
create trigger update_services_updated_at
before update on public.services
for each row
execute function public.update_updated_at_column();

-- Insert default service categories
insert into public.service_categories (name, description, icon, color, bg_color, display_order) values
  ('Nitya Karma (Daily Rituals)', 'Daily sacred rituals and worship', 'Flame', 'text-orange-600', 'bg-orange-50', 1),
  ('Nimitta Karma (Votive Rituals)', 'Votive rituals and vratas', 'Star', 'text-yellow-600', 'bg-yellow-50', 2),
  ('Apara Karma (Ancestral Rites)', 'Ancestral rites and shraddha ceremonies', 'Heart', 'text-purple-600', 'bg-purple-50', 3),
  ('Vishesha Dinagalu / Saptaha (Special Occasions)', 'Special occasion discourses and ceremonies', 'BookOpen', 'text-blue-600', 'bg-blue-50', 4),
  ('Bhajane & Haadugalu (Devotional Music)', 'Devotional music and singing', 'Users', 'text-green-600', 'bg-green-50', 5);

-- Insert default services
insert into public.services (category_id, name, description, duration, price) 
select 
  sc.id,
  s.name,
  s.description,
  s.duration,
  s.price
from public.service_categories sc
cross join lateral (
  values
    -- Nitya Karma services
    ('Sandhyavandane', 'Daily sacred ritual performed at dawn, noon, and dusk', '30-45 mins', 500.00),
    ('Deva Puje', 'Daily worship of household deities with proper procedures', '45-60 mins', 800.00)
) as s(name, description, duration, price)
where sc.name = 'Nitya Karma (Daily Rituals)'

union all

select 
  sc.id,
  s.name,
  s.description,
  s.duration,
  s.price
from public.service_categories sc
cross join lateral (
  values
    -- Nimitta Karma services
    ('Ganesha Vrata', 'Vrata dedicated to Lord Ganesha for removing obstacles', '2-3 hours', 2000.00),
    ('Gowri Vrata', 'Sacred vrata for Goddess Gowri for marital bliss', '2-3 hours', 2000.00),
    ('Lakshmi Vrata', 'Worship of Goddess Lakshmi for prosperity', '2-3 hours', 2000.00),
    ('Ananta Vrata', 'Vrata for Lord Vishnu in Ananta form', '2-3 hours', 2000.00),
    ('Saraswati Vrata', 'Worship of Goddess Saraswati for knowledge', '2-3 hours', 2000.00)
) as s(name, description, duration, price)
where sc.name = 'Nimitta Karma (Votive Rituals)'

union all

select 
  sc.id,
  s.name,
  s.description,
  s.duration,
  s.price
from public.service_categories sc
cross join lateral (
  values
    -- Apara Karma services
    ('Sankalpa Shradda', 'Ritual for ancestors with sankalpam', '2-3 hours', 3000.00),
    ('Pinda Pradhana Shradda', 'Offering pinda to ancestors', '3-4 hours', 3500.00),
    ('Mahalaya Vidhi', 'Special ancestral ritual during Mahalaya Paksha', '2-3 hours', 3000.00),
    ('Tarpana Karya', 'Water oblation for ancestors', '1-2 hours', 1500.00),
    ('Garuda Purana', 'Recitation and discourse on Garuda Purana', 'Multiple sessions', 5000.00)
) as s(name, description, duration, price)
where sc.name = 'Apara Karma (Ancestral Rites)'

union all

select 
  sc.id,
  s.name,
  s.description,
  s.duration,
  s.price
from public.service_categories sc
cross join lateral (
  values
    -- Vishesha Dinagalu services
    ('Bhagavatha Upanyaasa', 'Seven-day discourse on Bhagavatam', '7 days', 15000.00),
    ('Srinivasa Kalyana Upanyaasa', 'Discourse on Lord Venkateshwara''s wedding', '3-7 days', 12000.00),
    ('Itare Upanyaasagalu', 'Other spiritual discourses and kathas', 'Varies', 8000.00)
) as s(name, description, duration, price)
where sc.name = 'Vishesha Dinagalu / Saptaha (Special Occasions)'

union all

select 
  sc.id,
  s.name,
  s.description,
  s.duration,
  s.price
from public.service_categories sc
cross join lateral (
  values
    -- Bhajane services
    ('Harikathamrutasaara', 'Singing of devotional compositions', '2-3 hours', 2500.00),
    ('Lakshmi Shobhane', 'Devotional songs for Goddess Lakshmi', '2-3 hours', 2500.00),
    ('Dasara Padagalu', 'Special Dasara devotional songs', '2-3 hours', 2500.00),
    ('Ekadashi Jaagra Vishesha', 'Night-long devotional singing on Ekadashi', '4-8 hours', 4000.00)
) as s(name, description, duration, price)
where sc.name = 'Bhajane & Haadugalu (Devotional Music)';
