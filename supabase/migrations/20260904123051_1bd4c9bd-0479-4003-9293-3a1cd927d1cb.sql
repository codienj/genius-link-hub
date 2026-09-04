
DROP POLICY IF EXISTS "categories public read" ON public.categories;
DROP POLICY IF EXISTS "categories public write" ON public.categories;
DROP TABLE IF EXISTS public.categories CASCADE;

DROP POLICY IF EXISTS "agents public read" ON public.agents;
DROP POLICY IF EXISTS "agents public write" ON public.agents;
DROP TABLE IF EXISTS public.agents CASCADE;

DROP POLICY IF EXISTS "products public read" ON public.products;
DROP POLICY IF EXISTS "products public write" ON public.products;
DROP TABLE IF EXISTS public.products CASCADE;

DROP POLICY IF EXISTS "guide public read" ON public.guide_steps;
DROP POLICY IF EXISTS "guide public write" ON public.guide_steps;
DROP TABLE IF EXISTS public.guide_steps CASCADE;

DROP POLICY IF EXISTS "settings public read" ON public.settings;
DROP POLICY IF EXISTS "settings public write" ON public.settings;
DROP TABLE IF EXISTS public.settings CASCADE;

DROP POLICY IF EXISTS "product images read" ON storage.objects;
DROP POLICY IF EXISTS "product images insert" ON storage.objects;
DROP POLICY IF EXISTS "product images update" ON storage.objects;
DROP POLICY IF EXISTS "product images delete" ON storage.objects;
