
CREATE POLICY "sellers public read" ON public.sellers FOR SELECT TO anon, authenticated USING (true);
