-- Allow admins to select ALL testimonials (including unapproved)
CREATE POLICY "Admins can view all testimonials"
ON public.testimonials
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));