CREATE TABLE public.site_media (
  key text PRIMARY KEY,
  url text NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.site_media TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.site_media TO authenticated;
GRANT ALL ON public.site_media TO service_role;
ALTER TABLE public.site_media ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone reads site media" ON public.site_media FOR SELECT USING (true);
CREATE POLICY "Admin writes site media" ON public.site_media FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());

CREATE TABLE public.music_tracks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  release_label text,
  cover_url text,
  audio_url text,
  sort_order integer NOT NULL DEFAULT 0,
  is_published boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.music_tracks TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.music_tracks TO authenticated;
GRANT ALL ON public.music_tracks TO service_role;
ALTER TABLE public.music_tracks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone reads published tracks" ON public.music_tracks FOR SELECT USING (is_published = true OR public.is_admin());
CREATE POLICY "Admin writes tracks" ON public.music_tracks FOR ALL TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());