
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TABLE public.others_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT SELECT ON public.others_items TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.others_items TO authenticated;
GRANT ALL ON public.others_items TO service_role;

ALTER TABLE public.others_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active others_items"
  ON public.others_items FOR SELECT
  USING (active = true OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert others_items"
  ON public.others_items FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update others_items"
  ON public.others_items FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete others_items"
  ON public.others_items FOR DELETE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER update_others_items_updated_at
  BEFORE UPDATE ON public.others_items
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.others_items (title, display_order) VALUES
  ('Landing Page Development', 1),
  ('AI Voice Agents', 2),
  ('Google Ads Management', 3),
  ('Branding & Logo Design', 4),
  ('Business Automation', 5),
  ('Website Development', 6),
  ('Social Media Management', 7),
  ('YouTube Management', 8),
  ('Content Marketing', 9);
