-- Create job_applications table to track user applications
CREATE TABLE IF NOT EXISTS public.job_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  job_posting_id uuid REFERENCES public.job_postings(id) ON DELETE CASCADE NOT NULL,
  applicant_name text NOT NULL,
  applicant_email text NOT NULL,
  applicant_phone text,
  resume_url text,
  cover_letter text,
  status text DEFAULT 'submitted' CHECK (status IN ('submitted', 'reviewed', 'shortlisted', 'rejected', 'hired')),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  UNIQUE(user_id, job_posting_id)
);

-- Enable RLS
ALTER TABLE public.job_applications ENABLE ROW LEVEL SECURITY;

-- Users can view their own applications
CREATE POLICY "Users can view their own applications"
ON public.job_applications
FOR SELECT
USING (auth.uid() = user_id);

-- Users can create their own applications
CREATE POLICY "Users can create their own applications"
ON public.job_applications
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Admins can view all applications
CREATE POLICY "Admins can view all applications"
ON public.job_applications
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Admins can update all applications
CREATE POLICY "Admins can update all applications"
ON public.job_applications
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

-- Create trigger for updated_at
CREATE TRIGGER update_job_applications_updated_at
BEFORE UPDATE ON public.job_applications
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();