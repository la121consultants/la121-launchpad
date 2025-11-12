-- Create app_role enum for role-based access control
CREATE TYPE public.app_role AS ENUM ('admin', 'editor');

-- Create user_roles table (separate from profiles for security)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- RLS policy for user_roles (admins can manage roles)
CREATE POLICY "Admins can manage all roles"
ON public.user_roles
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Reviews table
CREATE TABLE public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT,
  company TEXT,
  avatar_url TEXT,
  testimonial TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5) DEFAULT 5,
  status TEXT CHECK (status IN ('pending', 'approved', 'rejected')) DEFAULT 'pending',
  featured BOOLEAN DEFAULT false,
  source TEXT DEFAULT 'web_form',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view approved reviews"
ON public.reviews FOR SELECT
TO anon, authenticated
USING (status = 'approved');

CREATE POLICY "Admins can manage all reviews"
ON public.reviews FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Services table
CREATE TABLE public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  short_description TEXT,
  long_description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  sale_price DECIMAL(10, 2),
  billing_type TEXT CHECK (billing_type IN ('one-off', 'subscription')) DEFAULT 'one-off',
  sku TEXT UNIQUE,
  stripe_price_id TEXT,
  active BOOLEAN DEFAULT true,
  cta_label TEXT DEFAULT 'Book Now',
  cta_url TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active services"
ON public.services FOR SELECT
TO anon, authenticated
USING (active = true);

CREATE POLICY "Admins can manage services"
ON public.services FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Blog posts table
CREATE TABLE public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  hero_image TEXT,
  content TEXT NOT NULL,
  excerpt TEXT,
  tags TEXT[],
  category TEXT,
  status TEXT CHECK (status IN ('draft', 'scheduled', 'published')) DEFAULT 'draft',
  scheduled_publish TIMESTAMP WITH TIME ZONE,
  author_id UUID REFERENCES auth.users(id),
  seo_meta_title TEXT,
  seo_meta_description TEXT,
  og_image TEXT,
  canonical_url TEXT,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view published posts"
ON public.blog_posts FOR SELECT
TO anon, authenticated
USING (status = 'published' AND (scheduled_publish IS NULL OR scheduled_publish <= now()));

CREATE POLICY "Admins and editors can manage posts"
ON public.blog_posts FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));

-- Ebooks table
CREATE TABLE public.ebooks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category TEXT,
  file_url TEXT NOT NULL,
  cover_image TEXT,
  description TEXT,
  access_type TEXT CHECK (access_type IN ('free', 'paid')) DEFAULT 'free',
  price DECIMAL(10, 2) DEFAULT 0,
  stripe_price_id TEXT,
  featured BOOLEAN DEFAULT false,
  active BOOLEAN DEFAULT true,
  download_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.ebooks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active ebooks"
ON public.ebooks FOR SELECT
TO anon, authenticated
USING (active = true);

CREATE POLICY "Admins can manage ebooks"
ON public.ebooks FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Audit logs table
CREATE TABLE public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  action TEXT NOT NULL,
  resource_type TEXT NOT NULL,
  resource_id UUID,
  details JSONB,
  ip_address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view audit logs"
ON public.audit_logs FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Site settings table
CREATE TABLE public.site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  category TEXT DEFAULT 'general',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view site settings"
ON public.site_settings FOR SELECT
TO anon, authenticated
USING (true);

CREATE POLICY "Admins can manage site settings"
ON public.site_settings FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Create update timestamp triggers
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON public.reviews
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON public.services
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_blog_posts_updated_at BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_ebooks_updated_at BEFORE UPDATE ON public.ebooks
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON public.site_settings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial ebooks data (migrating from hardcoded data)
INSERT INTO public.ebooks (title, category, description, file_url, price, access_type, stripe_price_id, active, featured) VALUES
('Returning to Work After Having a Baby', 'Career Transition', 'A comprehensive guide to help new mothers navigate their return to the workplace with confidence and practical strategies.', '/ebooks/returning-to-work-after-baby.pdf', 9.99, 'paid', 'price_1QqOQ5P5fk0fQK5aGIcOZhtB', true, true),
('Smart Ways to Use AI to Land Your Next Job', 'Job Search', 'Discover how to leverage AI tools and technology to enhance your job search, optimize your CV, and ace interviews.', '/ebooks/smart-ways-to-use-ai.pdf', 9.99, 'paid', 'price_1QqOQXP5fk0fQK5a7JH2TsZi', true, true),
('Side Hustle Success Playbook', 'Entrepreneurship', 'Your complete guide to starting, growing, and monetizing a successful side hustle while maintaining your day job.', '/ebooks/side-hustle-success-playbook.pdf', 14.99, 'paid', 'price_1QqOQsP5fk0fQK5aVMfn5Jgg', true, true),
('Networking: Unlocking Career Success', 'Professional Development', 'Master the art of professional networking with proven strategies to build meaningful connections that accelerate your career.', '/ebooks/networking-career-success.pdf', 9.99, 'paid', 'price_1QqORBP5fk0fQK5a1qJ6YBhj', true, true);