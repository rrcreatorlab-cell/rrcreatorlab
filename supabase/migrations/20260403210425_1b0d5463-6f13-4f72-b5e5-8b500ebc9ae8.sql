
ALTER TABLE public.portfolio_items ADD COLUMN aspect_ratio text NOT NULL DEFAULT '16:9';
ALTER TABLE public.portfolio_items ADD COLUMN website_url text NOT NULL DEFAULT '';
ALTER TABLE public.portfolio_items DROP COLUMN views;
