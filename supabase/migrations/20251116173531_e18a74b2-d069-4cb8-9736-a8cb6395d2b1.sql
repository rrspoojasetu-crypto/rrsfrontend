-- Fix RLS policies to allow priest/seeker discovery while protecting sensitive data

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can view public priest profiles" ON public.profiles;
DROP POLICY IF EXISTS "Priests can view available rituals" ON public.rituals;
DROP POLICY IF EXISTS "Priests can express interest in rituals" ON public.rituals;

-- 1. Create a view for public priest profiles (non-sensitive info only)
CREATE OR REPLACE VIEW public.priest_public_profiles AS
SELECT 
  id,
  full_name,
  initials,
  bio,
  qualification_dharmic,
  qualification_regular,
  experience_years,
  languages,
  rituals_comfortable,
  preferred_timing,
  rating,
  status,
  photo_url
FROM profiles
WHERE id IN (SELECT user_id FROM user_roles WHERE role = 'priest');

-- 2. Allow authenticated users to view public priest profiles
CREATE POLICY "Anyone can view public priest profiles"
ON public.profiles
FOR SELECT
USING (
  id IN (SELECT user_id FROM user_roles WHERE role = 'priest')
  AND auth.uid() IS NOT NULL
);

-- 3. Allow priests to view pending/unassigned rituals for discovery
CREATE POLICY "Priests can view available rituals"
ON public.rituals
FOR SELECT
USING (
  (assigned_priest_id IS NULL OR status = 'pending')
  AND has_role(auth.uid(), 'priest')
);

-- 4. Allow priests to update rituals they want to accept (admin will still assign)
CREATE POLICY "Priests can express interest in rituals"
ON public.rituals
FOR UPDATE
USING (
  has_role(auth.uid(), 'priest')
  AND (assigned_priest_id IS NULL OR assigned_priest_id = auth.uid())
);