
CREATE POLICY "Public read cms" ON storage.objects FOR SELECT USING (bucket_id = 'cms');
CREATE POLICY "Admin upload cms" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'cms' AND public.is_admin());
CREATE POLICY "Admin update cms" ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'cms' AND public.is_admin());
CREATE POLICY "Admin delete cms" ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'cms' AND public.is_admin());
