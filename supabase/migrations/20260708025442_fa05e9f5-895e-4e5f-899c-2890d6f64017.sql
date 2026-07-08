
-- Roles
CREATE TYPE public.app_role AS ENUM ('admin');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users read own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role);
$$;

CREATE OR REPLACE FUNCTION public.is_admin() RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT public.has_role(auth.uid(), 'admin'::app_role);
$$;

-- Trigger: auto-grant admin to the studio owner email
CREATE OR REPLACE FUNCTION public.handle_new_user_admin()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF NEW.email = 'yttoppoer@gmail.com' THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin'::app_role)
    ON CONFLICT DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created_admin
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_admin();

-- Timestamp helper
CREATE OR REPLACE FUNCTION public.set_updated_at() RETURNS TRIGGER
LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

-- Work section text overrides
CREATE TABLE public.work_sections (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.work_sections TO anon, authenticated;
GRANT ALL ON public.work_sections TO service_role;
GRANT INSERT, UPDATE, DELETE ON public.work_sections TO authenticated;
ALTER TABLE public.work_sections ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone reads work sections" ON public.work_sections FOR SELECT USING (true);
CREATE POLICY "Admin writes work sections" ON public.work_sections FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE TRIGGER work_sections_updated BEFORE UPDATE ON public.work_sections
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Admin-added brand blocks per Work category
CREATE TABLE public.work_brands (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL,
  name TEXT NOT NULL,
  headline TEXT NOT NULL,
  subtext TEXT,
  year TEXT,
  images TEXT[] NOT NULL DEFAULT '{}',
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.work_brands TO anon, authenticated;
GRANT ALL ON public.work_brands TO service_role;
GRANT INSERT, UPDATE, DELETE ON public.work_brands TO authenticated;
ALTER TABLE public.work_brands ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone reads work brands" ON public.work_brands FOR SELECT USING (true);
CREATE POLICY "Admin writes work brands" ON public.work_brands FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE TRIGGER work_brands_updated BEFORE UPDATE ON public.work_brands
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Journal posts with composable sections
CREATE TABLE public.journal_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  dek TEXT,
  category TEXT NOT NULL DEFAULT 'Essay',
  published_date DATE NOT NULL DEFAULT CURRENT_DATE,
  reading_time TEXT,
  cover_url TEXT,
  author TEXT NOT NULL DEFAULT 'Brand Bull Studio',
  sections JSONB NOT NULL DEFAULT '[]'::jsonb,
  is_published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.journal_posts TO anon, authenticated;
GRANT ALL ON public.journal_posts TO service_role;
GRANT INSERT, UPDATE, DELETE ON public.journal_posts TO authenticated;
ALTER TABLE public.journal_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone reads published posts" ON public.journal_posts FOR SELECT USING (is_published = true);
CREATE POLICY "Admin reads all posts" ON public.journal_posts FOR SELECT TO authenticated USING (public.is_admin());
CREATE POLICY "Admin writes posts" ON public.journal_posts FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE TRIGGER journal_posts_updated BEFORE UPDATE ON public.journal_posts
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
