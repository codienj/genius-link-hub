
CREATE OR REPLACE VIEW public.sellers_public
WITH (security_invoker = on) AS
SELECT id, name, slug, logo_url, banner_url, description, active, external_url, link_mode, created_at
FROM public.sellers;

GRANT SELECT ON public.sellers_public TO anon, authenticated;
