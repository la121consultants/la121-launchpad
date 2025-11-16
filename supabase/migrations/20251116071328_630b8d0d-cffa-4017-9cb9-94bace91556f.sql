-- Create job_postings table
CREATE TABLE IF NOT EXISTS public.job_postings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name text NOT NULL,
  company_email text NOT NULL,
  company_website text,
  company_logo text,
  job_title text NOT NULL,
  job_location text NOT NULL,
  job_type text NOT NULL CHECK (job_type IN ('full-time', 'part-time', 'contract', 'temporary', 'internship')),
  salary_range text,
  job_description text NOT NULL,
  requirements text,
  benefits text,
  application_email text NOT NULL,
  application_url text,
  featured boolean DEFAULT false,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'expired')),
  expires_at timestamp with time zone,
  views_count integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Create indexes
CREATE INDEX idx_job_postings_status ON public.job_postings(status);
CREATE INDEX idx_job_postings_company_email ON public.job_postings(company_email);
CREATE INDEX idx_job_postings_featured ON public.job_postings(featured);
CREATE INDEX idx_job_postings_expires_at ON public.job_postings(expires_at);

-- Enable RLS
ALTER TABLE public.job_postings ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Anyone can view approved non-expired jobs"
  ON public.job_postings FOR SELECT
  USING (
    status = 'approved' AND 
    (expires_at IS NULL OR expires_at > now())
  );

CREATE POLICY "Anyone can submit job postings"
  ON public.job_postings FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view all job postings"
  ON public.job_postings FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update job postings"
  ON public.job_postings FOR UPDATE
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete job postings"
  ON public.job_postings FOR DELETE
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Trigger for updated_at
CREATE TRIGGER update_job_postings_updated_at
  BEFORE UPDATE ON public.job_postings
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();