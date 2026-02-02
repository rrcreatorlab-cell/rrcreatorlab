-- 1. Create hero_section table
CREATE TABLE public.hero_section (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  badge_text TEXT NOT NULL DEFAULT 'Content Growth Studio',
  heading_line_1 TEXT NOT NULL DEFAULT 'Content Growth &',
  heading_line_2 TEXT NOT NULL DEFAULT 'Social Media Management Studio',
  subtitle TEXT NOT NULL DEFAULT 'Building Creators. Scaling Reach.',
  primary_cta_text TEXT NOT NULL DEFAULT 'Book a Free Call',
  secondary_cta_text TEXT NOT NULL DEFAULT 'View Our Work',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.hero_section ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view hero section" ON public.hero_section FOR SELECT USING (true);
CREATE POLICY "Admins can insert hero section" ON public.hero_section FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can update hero section" ON public.hero_section FOR UPDATE USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can delete hero section" ON public.hero_section FOR DELETE USING (has_role(auth.uid(), 'admin'::app_role));

-- 2. Create services table
CREATE TABLE public.services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  features TEXT NOT NULL DEFAULT '',
  icon TEXT NOT NULL DEFAULT 'Sparkles',
  active BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Admins can insert services" ON public.services FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can update services" ON public.services FOR UPDATE USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can delete services" ON public.services FOR DELETE USING (has_role(auth.uid(), 'admin'::app_role));

-- 3. Create pricing_plans table
CREATE TABLE public.pricing_plans (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  price_min INTEGER NOT NULL,
  price_max INTEGER NOT NULL,
  duration TEXT NOT NULL DEFAULT 'Monthly',
  features TEXT NOT NULL DEFAULT '',
  popular BOOLEAN NOT NULL DEFAULT false,
  active BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.pricing_plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view pricing plans" ON public.pricing_plans FOR SELECT USING (true);
CREATE POLICY "Admins can insert pricing plans" ON public.pricing_plans FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can update pricing plans" ON public.pricing_plans FOR UPDATE USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can delete pricing plans" ON public.pricing_plans FOR DELETE USING (has_role(auth.uid(), 'admin'::app_role));

-- 4. Create one_time_services table
CREATE TABLE public.one_time_services (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  price_min INTEGER NOT NULL,
  price_max INTEGER NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  highlight BOOLEAN NOT NULL DEFAULT false,
  active BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.one_time_services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view one time services" ON public.one_time_services FOR SELECT USING (true);
CREATE POLICY "Admins can insert one time services" ON public.one_time_services FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can update one time services" ON public.one_time_services FOR UPDATE USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can delete one time services" ON public.one_time_services FOR DELETE USING (has_role(auth.uid(), 'admin'::app_role));

-- 5. Create process_steps table
CREATE TABLE public.process_steps (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  step_title TEXT NOT NULL,
  step_description TEXT NOT NULL,
  step_number INTEGER NOT NULL,
  active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.process_steps ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view process steps" ON public.process_steps FOR SELECT USING (true);
CREATE POLICY "Admins can insert process steps" ON public.process_steps FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can update process steps" ON public.process_steps FOR UPDATE USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can delete process steps" ON public.process_steps FOR DELETE USING (has_role(auth.uid(), 'admin'::app_role));

-- 6. Create team table
CREATE TABLE public.team (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  bio TEXT NOT NULL DEFAULT '',
  image_url TEXT NOT NULL DEFAULT '',
  socials JSONB NOT NULL DEFAULT '{}',
  active BOOLEAN NOT NULL DEFAULT true,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.team ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view team members" ON public.team FOR SELECT USING (true);
CREATE POLICY "Admins can insert team members" ON public.team FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can update team members" ON public.team FOR UPDATE USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can delete team members" ON public.team FOR DELETE USING (has_role(auth.uid(), 'admin'::app_role));

-- 7. Update client_logos table (add active and logo_url columns)
ALTER TABLE public.client_logos ADD COLUMN IF NOT EXISTS logo_url TEXT NOT NULL DEFAULT '';
ALTER TABLE public.client_logos ADD COLUMN IF NOT EXISTS active BOOLEAN NOT NULL DEFAULT true;

-- 8. Update testimonials table (add company, image_url, featured columns)
ALTER TABLE public.testimonials ADD COLUMN IF NOT EXISTS company TEXT NOT NULL DEFAULT '';
ALTER TABLE public.testimonials ADD COLUMN IF NOT EXISTS image_url TEXT NOT NULL DEFAULT '';
ALTER TABLE public.testimonials RENAME COLUMN approved TO featured;

-- Insert default hero section row
INSERT INTO public.hero_section (badge_text, heading_line_1, heading_line_2, subtitle, primary_cta_text, secondary_cta_text)
VALUES ('Content Growth Studio', 'Content Growth &', 'Social Media Management Studio', 'Building Creators. Scaling Reach. We help content creators and businesses grow their social media presence with data-driven strategies.', 'Book a Free Call', 'View Our Work');