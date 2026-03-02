
-- Create portfolio_items table
CREATE TABLE public.portfolio_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'YT Video',
  thumbnail_url TEXT NOT NULL DEFAULT '',
  video_url TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  views TEXT NOT NULL DEFAULT '',
  client TEXT NOT NULL DEFAULT '',
  active BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.portfolio_items ENABLE ROW LEVEL SECURITY;

-- Public can view active items
CREATE POLICY "Anyone can view active portfolio items"
  ON public.portfolio_items FOR SELECT
  USING (active = true);

-- Admin CRUD
CREATE POLICY "Admins can insert portfolio items"
  ON public.portfolio_items FOR INSERT
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update portfolio items"
  ON public.portfolio_items FOR UPDATE
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete portfolio items"
  ON public.portfolio_items FOR DELETE
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Admin can view all (including inactive)
CREATE POLICY "Admins can view all portfolio items"
  ON public.portfolio_items FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));
