-- Create FAQs table
CREATE TABLE public.faqs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create Stats table
CREATE TABLE public.stats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  icon TEXT NOT NULL DEFAULT 'users',
  value INTEGER NOT NULL,
  suffix TEXT NOT NULL DEFAULT '',
  label TEXT NOT NULL,
  color TEXT NOT NULL DEFAULT 'text-primary',
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create Client Logos table
CREATE TABLE public.client_logos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  handle TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.client_logos ENABLE ROW LEVEL SECURITY;

-- FAQs policies
CREATE POLICY "Anyone can view FAQs" ON public.faqs FOR SELECT USING (true);
CREATE POLICY "Admins can insert FAQs" ON public.faqs FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update FAQs" ON public.faqs FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete FAQs" ON public.faqs FOR DELETE USING (public.has_role(auth.uid(), 'admin'));

-- Stats policies
CREATE POLICY "Anyone can view stats" ON public.stats FOR SELECT USING (true);
CREATE POLICY "Admins can insert stats" ON public.stats FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update stats" ON public.stats FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete stats" ON public.stats FOR DELETE USING (public.has_role(auth.uid(), 'admin'));

-- Client logos policies
CREATE POLICY "Anyone can view client logos" ON public.client_logos FOR SELECT USING (true);
CREATE POLICY "Admins can insert client logos" ON public.client_logos FOR INSERT WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update client logos" ON public.client_logos FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete client logos" ON public.client_logos FOR DELETE USING (public.has_role(auth.uid(), 'admin'));

-- Insert default FAQs
INSERT INTO public.faqs (question, answer, display_order) VALUES
('How quickly will I see results?', 'Most clients start seeing noticeable improvements within 30-60 days. However, significant growth typically happens over 3-6 months as we implement and optimize our strategies. YouTube''s algorithm rewards consistency, which we help you maintain.', 1),
('Do you guarantee subscriber growth?', 'While we can''t guarantee specific numbers (no one honestly can), our proven strategies have helped creators achieve 200-500%+ growth. We focus on sustainable, organic growth through content optimization, SEO, and audience engagement strategies.', 2),
('What platforms do you work with?', 'We specialize in YouTube and Instagram management. For each plan, you choose one platform to focus on. This allows us to dedicate our expertise and resources to maximizing your growth on that specific platform.', 3),
('Do I need to have an existing audience?', 'Not at all! We work with creators at all stages - from those just starting out to established channels looking to accelerate growth. Our strategies are customized based on where you are in your creator journey.', 4),
('What''s included in the video editing service?', 'Our editing service includes cutting and trimming, color correction, audio enhancement, transitions, text overlays, thumbnails, and platform-specific optimizations. The number of videos per month depends on your chosen plan.', 5),
('Can I upgrade or downgrade my plan?', 'Absolutely! You can change your plan at any time. Upgrades take effect immediately, while downgrades will apply from your next billing cycle. We''re flexible and want to match our services to your current needs.', 6),
('How do we communicate and collaborate?', 'We use a combination of WhatsApp for quick updates, email for detailed reports, and video calls for strategy sessions. You''ll have direct access to your dedicated manager who knows your channel inside-out.', 7),
('What makes RR Creator Lab different?', 'Unlike agencies that treat you as just another number, we limit our client roster to ensure personalized attention. Our founder personally oversees every account, and we treat your channel''s growth as if it were our own.', 8);

-- Insert default stats
INSERT INTO public.stats (icon, value, suffix, label, color, display_order) VALUES
('users', 50, '+', 'Creators Helped', 'text-primary', 1),
('trending-up', 500, '%', 'Avg. Growth Rate', 'text-green-400', 2),
('users', 15, 'K+', 'Subscribers Brought', 'text-blue-400', 3),
('award', 95, '%', 'Client Satisfaction', 'text-accent', 4);

-- Insert default client logos
INSERT INTO public.client_logos (name, handle, display_order) VALUES
('The Currency India Official', '@thecurrencyindiaofficial', 1),
('Sambodhi', '@sambodhi', 2),
('Shilpa Art House', '@shilpaarthouse', 3),
('Startup Stories', '@startupstories', 4),
('V Filmy Steps', '@vfilmysteps', 5),
('Homzyee Property Management', '@homzyee', 6),
('Rahul Sharma', '@rahulsharma', 7),
('Sneha Reddy', '@snehareddy', 8);