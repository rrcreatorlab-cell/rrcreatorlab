-- Tighten testimonials public INSERT: enforce length limits at DB level
ALTER TABLE public.testimonials
  ADD CONSTRAINT testimonials_name_length CHECK (char_length(name) BETWEEN 2 AND 100),
  ADD CONSTRAINT testimonials_role_length CHECK (char_length(role) BETWEEN 2 AND 100),
  ADD CONSTRAINT testimonials_review_length CHECK (char_length(review) BETWEEN 20 AND 500),
  ADD CONSTRAINT testimonials_company_length CHECK (char_length(company) <= 100),
  ADD CONSTRAINT testimonials_rating_range CHECK (rating BETWEEN 1 AND 5);

-- Replace permissive insert policy: still allow public submissions but force featured=false
DROP POLICY IF EXISTS "Anyone can submit testimonials" ON public.testimonials;
CREATE POLICY "Anyone can submit unapproved testimonials"
  ON public.testimonials
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (featured = false);

-- Storage: remove the broad public SELECT that allows bucket LISTING.
-- Public bucket files remain accessible via their direct public URLs.
DROP POLICY IF EXISTS "Public read access for admin uploads" ON storage.objects;