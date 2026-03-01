
-- Create storage bucket for admin uploads
INSERT INTO storage.buckets (id, name, public, file_size_limit)
VALUES ('admin-uploads', 'admin-uploads', true, 52428800);

-- Allow anyone to view uploaded files (public bucket)
CREATE POLICY "Public read access for admin uploads"
ON storage.objects FOR SELECT
USING (bucket_id = 'admin-uploads');

-- Only admins can upload files
CREATE POLICY "Admin users can upload files"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'admin-uploads'
  AND public.has_role(auth.uid(), 'admin')
);

-- Only admins can update files
CREATE POLICY "Admin users can update files"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'admin-uploads'
  AND public.has_role(auth.uid(), 'admin')
);

-- Only admins can delete files
CREATE POLICY "Admin users can delete files"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'admin-uploads'
  AND public.has_role(auth.uid(), 'admin')
);
